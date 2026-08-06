# Designer 錯誤處理 UX 改善 — 設計

日期：2026-08-06
分支：`docker-dev-env`（起點 commit `ba8f85f`）

## 背景

使用者選好配方進入製作介面後，有時整頁被一張錯誤畫面取代：

> ✕ 載入配方時出現了一些錯誤
> 玩家等級未達到所選配方最低要求
> [重新整理]
> 由於技術原因，出現錯誤後暫時只能透過重新整理頁面恢復，對此造成的不便我們深表歉意

畫面上唯一的出路是「重新整理」。使用者已經選好配方、可能已經排了一長串技能序列，
重新整理會把這些全部洗掉，而且重整後回到同一個配方仍然是同一張錯誤畫面 ——
真正該做的（換配裝、調等級、重選配方）在這個畫面上一件都做不到。

## 現況盤查

### 錯誤畫面本體

`src/components/designer/Page.vue:65-73` 用 `onErrorCaptured` 攔截**整棵 designer 子樹**
的所有錯誤，設一次 `errorMessage` 就永遠不清除，`return false` 阻止繼續傳播。
沒有任何路徑會把 `errorMessage` 清空，所以只剩 `window.location.reload()`。

全專案只有這一處錯誤邊界，沒有 app 層級的 `errorHandler`，也沒有
`unhandledrejection` 監聽。

### 會打到這個畫面的來源

Vue 的 `handleError` 會沿 parent 鏈往上找 `errorCaptured`，所以除了 async setup，
**watcher 與生命週期 hook 內的 async rejection 一樣會打到 Page.vue**。

| # | 來源 | 觸發情境 |
|---|---|---|
| 1 | `Designer.vue:196` setup 頂層 `await newStatus` | 截圖這個。`recipe.job_level > attrs.level + 5`（`src-libs/src/lib.rs:45`） |
| 2 | `Designer.vue:203` watch → `newStatus` | 進入介面**之後**才切配裝／換食藥 → 整頁炸掉，技能序列一併消失 |
| 3 | `Designer.vue:251,255` watch → `simulate` | 模擬呼叫失敗 |
| 4 | `Simulator.vue:89,96` | 同 1、2，模擬器模式 |
| 5 | `AttrEnhSelector.vue:82-83` `onMounted`／`watch` | 資料源抓食藥失敗（斷網／API 掛）→ 整頁炸掉，即使使用者根本沒開那個分頁 |
| 6 | `InitialQualitySetting.vue:80-92` watch immediate | 抓配方素材失敗，同上 |
| 7 | WASM 載入／初始化失敗 | 舊瀏覽器、COOP/COEP 標頭掉了 |
| 8 | 子樹任何 render 錯誤 | 未知 bug |

### 靜默失敗（不會打到錯誤畫面，但使用者也看不到任何提示）

- `Analyzers.vue:181` 在 `setTimeout` callback 內 await，rejection 不經過 Vue →
  分析分頁永遠空白，沒有任何訊息
- `Analyzers.vue:117` `catch {}` 完全吞掉
- `Designer.vue:220` `simulate(...).then()` 沒有 catch

### 處理得當、可作為範本的既有程式碼

- `solvers/List.vue:99` — catch 後 `ElMessage` 顯示，不影響其他區域
- `tabs/MacroImporter.vue`、`tabs/MacroExporter.vue` — 各自 catch 並就地提示

### 附帶發現的 bug

`Page.vue:88` 的 `errorMessage.search('WebAssembly') > 0`：`String.search` 在
**開頭**命中時回 0，`> 0` 為偽。也就是說訊息開頭就是 `WebAssembly` 時 ——
正是最需要「請更新瀏覽器」提示的情況 —— 提示反而不會顯示。

## 已鎖定的決策

1. **等級不足降級成頁內攔阻面板**，不再顯示整頁錯誤畫面
2. **錯誤分三級處理**：可修正 → 攔阻面板；局部失敗 → 區塊內重試；致命 → 整頁畫面但有出口
3. **攔阻面板提供**：切換配裝下拉 + 就地改配裝等級 + 同步配方導引文案 + 兩個導覽按鈕
4. **致命錯誤先試重載元件**，重試仍失敗才顯示「重新整理」
5. `common.ts` 的 `selectRecipe` 一併改成單一 options 物件

## 設計

### 一、等級不足 → 頁內攔阻面板

#### 為什麼不放在 Page.vue

攔阻面板需要「配方要求等級」與「玩家目前等級」兩個數字，但 Rust 只回一個字串常數
`player-level-lower-than-recipe-requirement`，不帶數字。這兩個值只有
`Designer.vue` / `Simulator.vue` 內部拿得到；而且 gearset 的選擇狀態 `gearsetId`
就住在 `Designer.vue:92`，`Page.vue` 不知道 Designer 會用哪個配裝。

#### 做法：前置檢查，讓它根本不要拋

在 `Designer.vue` / `Simulator.vue` 的 setup 內加一個純前端判斷，與
`src-libs/src/lib.rs:45` 同一條規則：

```ts
const levelShortfall = computed(() => {
    const need = props.recipe.job_level;
    const have = enhancedAttributes.value.level;
    return need > have + 5 ? { need, have } : undefined;
});
```

模板頂層 `v-if="levelShortfall"` 顯示 `LevelRequirementPanel`，`v-else` 顯示原本
整個 `.main-page`。攔阻狀態下求解器、分析器等子元件不會掛載。

**不動 Rust**：那條檢查同時保護 solver 與 analyzer，是正確的防線，前端只是提前一步攔住。

#### setup 頂層 await 的處理

`Designer.vue:196` 的 `await newStatus(...)` 不能拿掉 —— 拿掉的話 `initStatus`
要變成 optional，下游十餘個 props 全部得處理 undefined。改成呼叫前把等級 clamp 住：

```ts
// 等級不足時模板不會渲染主體，此處僅為讓 setup 與 watch 不致拋錯而墊高等級；
// 使用者修正後 watch 會以真實屬性重算。
const level = Math.max(attrs.level, props.recipe.job_level - 5);
```

同樣的 clamp 也要套用在 `Designer.vue:203` 與 `Simulator.vue:89,96` 的
`newStatus` 呼叫上，否則進入介面後才切成低等配裝仍會拋。

#### 新元件 `src/components/designer/LevelRequirementPanel.vue`

純呈現 + emit，不含任何資料存取。

Props：

- `need: number` — 配方要求等級
- `have: number` — 目前配裝等級
- `gearsets?: GearsetsRow[]` — 可切換的相容配裝清單（Simulator 不傳）
- `gearsetId?: number` — 目前配裝 id（Simulator 不傳）
- `gearsetName: string` — 用於「將更新配裝『木工師』的特職等級」文案
- `syncLevel?: number` — 同步配方時顯示導引文案

Emits：

- `update:gearsetId` — 切換配裝
- `applyLevel(level: number)` — 就地改等級，由父層寫回 gearsets store
- （導覽按鈕在元件內直接用 `useRouter()`）

版面：

```
┌──────────────────────────────────────┐
│  ⚠  特職等級不足                      │
│  「白橡木木材」需要 Lv.94 以上         │
│  目前配裝「木工師」為 Lv.90           │
│                                      │
│  使用配裝 [ 木工師 Lv.90  ▾ ]         │
│            ├ 預設      Lv.100 ✓      │
│            └ 木工師    Lv.90  ✗      │
│                                      │
│  或直接改等級 [ 90 ↑↓]  [套用]        │
│  └ 將更新配裝「木工師」的特職等級      │
│                                      │
│  [ 前往配裝頁 ]   [ 重選配方 ]        │
└──────────────────────────────────────┘
```

配裝下拉每一項標示其等級與是否滿足（✓／✗），滿足與否以 `need > level + 5` 判定。

#### Simulator 的差異

`Simulator.vue` 的配裝是 `Page.vue` 算好後以 prop 傳入的，它沒有 `gearsetId` 狀態。
因此它的面板**不顯示配裝下拉**，只有「就地改等級」「前往配裝頁」「重選配方」。

但目前 `Page.vue:50-57` 的 `attributes` computed 只回傳 `Attributes`，丟掉了是哪一個
gearset 的資訊，Simulator 因此**無從得知要把新等級寫回哪一列**。所以要一併調整：
把該 computed 改成回傳 `GearsetsRow`（命名為 `gearset`），`attributes` 由它衍生，
並額外傳 `:gearset-id="gearset.id"` 給 Simulator。

#### 配裝顯示名稱

面板上的「配裝『木工師』」一律用 `src/libs/Gearsets.ts` 既有的
`choiceGearsetDisplayName(row)`，不要自己拼名稱 —— 該函式已處理「預設」「通用」
「自定義 N」與職業在地化名稱。

#### 同步配方導引

宇宙探索 A 級以下配方（`rlv == 690` 且 `recipe_notebook_list` 落在特定區間，見
`ConfirmDialog.vue:64-70`）的 `job_level` **等於使用者在選配方對話框自己填的同步等級**
（`ConfirmDialog.vue:89-101`）。這種情況「把同步等級調低」比「提升角色等級」合理。

但 `designer` store 只存組好的 `recipe`，沒有 `difficulty_factor` /
`recipe_notebook_list` / `rlv`，無法在面板內重建同步配方。因此：

- `src/stores/designer.ts` 的 `content` 加 `syncLevel?: number`
- `ConfirmDialog.vue:158-177` 在 `isDynRecipe && dynRecipeLevel != undefined` 時帶入
- 面板偵測到 `syncLevel` 就多顯示一行：
  「此為等級同步配方，Lv.100 是你在選配方時填入的，可回配方頁改填較低的值」
  並把「重選配方」改為主要按鈕

**明確不做**：面板內就地修改同步等級。那需要把 `difficulty_factor` 等一併存進
store 並在面板內重呼叫 `recipeLevelTablebyJobLevel`，超出這次範圍。

#### `selectRecipe` 改為 options 物件

`src/components/recipe-manager/common.ts:100-122` 的 `selectRecipe` 已經是 9 個
位置參數，再加 `syncLevel` 成為第 10 個很容易傳錯位。改成單一 options 物件，
欄位名與 `designerStore.selectRecipe` 的 payload 對齊。

呼叫點只有兩處：`ConfirmDialog.vue:166`、`CustomizeRecipe.vue:132`。
`CustomizeRecipe` 是自訂配方，不傳 `syncLevel`。

### 二、局部失敗 → 區塊內重試

原則：每個會碰資料源或 wasm 的**非核心**區塊自己吞掉錯誤，就地顯示可重試的提示，
絕不往上冒泡。

| 位置 | 現況 | 改成 |
|---|---|---|
| `AttrEnhSelector.vue:82-93` | 未 catch → 整頁炸掉；且 `:loading="!meals"` 讓下拉永遠轉圈，無任何提示 | `loadMealsAndMedicine` 包 try/catch 記 `loadError`；表單頂端插 `BlockLoadError`；`:loading` 改綁獨立的 `loading` ref，失敗時停轉 |
| `InitialQualitySetting.vue:80-92` | 未 catch → 整頁炸掉 | 同上。素材清單區塊顯示錯誤與重試；**手動輸入初期品質仍可用**（`inputType` 切 `manully`） |
| `Analyzers.vue:86-116` | 在 `setTimeout` 內 await，rejection 靜默 → 分析頁永遠空白 | `runBatchSimulatios` / `runSimulateDetail` 加 catch，結果區顯示錯誤 + 「重新分析」 |
| `Analyzers.vue:117` | `catch {}` 完全吞掉 | 改為記錄錯誤並顯示，不再靜默 |
| `Designer.vue:220` | `.then()` 無 catch → 靜默 | 加 catch → `ElMessage` error |
| `Designer.vue:251-257` | 兩個 watch 內 `simulate` 未 catch → 整頁炸掉 | 包 try/catch → `ElMessage` error，且**不清空**既有模擬結果 |

#### 重試機制

各元件內一個 `retryToken = ref(0)`，重試就 `retryToken.value++`，載入函式的 watch
把它列入相依。不引入新的狀態管理、不新增 store。

#### 新元件 `src/components/designer/BlockLoadError.vue`

上表五處的「錯誤條 + 重試鈕」樣式相同，抽成共用元件避免重複。

- Props：`message: string`
- Emits：`retry`
- 內容：`el-alert` type=error、`:closable="false"`，右側一顆「重試」`el-button`

### 三、致命錯誤 → 整頁畫面但有出口

#### `Page.vue` 狀態

```ts
const fatalError = ref<{ message: string; detail: string }>();
const hasRetried = ref(false);
const contentKey = ref(0);        // 遞增即可強制重建 Designer / Simulator

onErrorCaptured((err, instance, info) => {
    console.error(err, instance, info);
    const raw = String(err);
    fatalError.value = {
        message: (() => { try { return $t(raw); } catch { return raw; } })(),
        // 保留原始字串給使用者複製回報 —— $t 之後的訊息對 issue 沒有幫助
        detail: [raw, info, (err as Error)?.stack].filter(Boolean).join('\n'),
    };
    return false;
});

function retry() {
    hasRetried.value = true;
    fatalError.value = undefined;
    contentKey.value++;
}
```

模板加 `<Designer :key="contentKey" …>` 與 `<Simulator :key="contentKey" …>`。
清空 `fatalError` 只是讓 `v-if` 切回內容；`:key` 遞增才會真正重建那個 async setup
已經 reject 的元件實例。兩者缺一不可。

#### 畫面兩態

- **首次出錯**：`[重試]` `[回配方檢索]`，加一個可展開的「錯誤詳情」（`el-collapse`
  內放 `<pre>` 顯示 `detail`，附複製鈕）
- **重試後又失敗**（`hasRetried == true`）：多出 `[重新整理]`，並顯示
  「若持續發生，歡迎回報至專案倉庫」

`hasRetried` 在 `Page.vue:44` 既有的 `onActivated` 中歸零（代表使用者換了配方回到本頁）。

#### 複製鈕

沿用 `MacroExporter.vue:181-185` 的 Tauri / web 雙路徑：Tauri 走
`@tauri-apps/plugin-clipboard-manager`，web 走 `@vueuse/core` 的 `useClipboard`。

#### 文案調整

- 移除 `sorry`（「由於技術原因，出現錯誤後暫時只能透過刷新頁面恢復…深表歉意」）——
  重試存在之後這句話已經不成立
- `invite` 改寫為「若這個問題持續發生，歡迎回報至專案倉庫」，且只在 `hasRetried` 態顯示

#### 修 `WebAssembly` 判斷

`Page.vue:88` 的 `errorMessage.search('WebAssembly') > 0` 改為
`fatalError.detail.includes('WebAssembly')`。改判 `detail` 而非 `message` 的原因：
`message` 可能已被 `$t` 換成在地化字串，原始的 `WebAssembly` 字樣只保證留在 `detail`。

### 四、i18n

四個語系（`zh-CN` / `zh-TW` / `en-US` / `ja-JP`）都要補齊：

- `LevelRequirementPanel.vue`、`BlockLoadError.vue` 的 `<fluent>` 區塊 —— 新元件，四語系全新寫
- `Page.vue` 既有 `<fluent>` 區塊 —— 現況 `en-US` 缺 `error-happens`、`ja-JP` 缺
  `error-happens` 與 `not-selected` 與 `upgrade-browser`，這次一併補齊
- 各被改動元件（`AttrEnhSelector`、`InitialQualitySetting`、`Analyzers`、`Designer`）
  新增的錯誤／重試字串

## 邊界情況

### `gearsetsStore.$subscribe` 會覆蓋使用者在面板上的選擇

`Designer.vue:100-102` 對 gearsets store 掛了 `$subscribe`，**任何**變動都會呼叫
`selectDefaultGearset()`，把 `gearsetId` 重設為「該職業的第一個相容配裝」。

這會撞到面板的兩個操作：

1. 使用者用下拉切到配裝 A（滿足等級）→ 若此時 store 有任何寫入，選擇被打回原本那個
   不滿足的配裝，面板又冒出來
2. 使用者按「套用」就地改等級 → 寫入 store → `$subscribe` 觸發 →
   `selectDefaultGearset()` 把選擇重設，可能正好切回剛才那個等級不足的配裝

處理方式：`selectDefaultGearset()` 增加「目前選中的配裝仍然相容就不動它」的判斷 ——
這其實正是 `Designer.vue:104-119` 那個 watch 已經在做的事，`$subscribe` 這條路徑
少了同一層防護。修正後兩條路徑行為一致。

**注意**：這代表就地改等級後 `gearsetId` 必須維持不變，`enhancedAttributes` 才會因為
store 內容變動而重算、`levelShortfall` 才會轉為 undefined、面板才會消失。

### 兩個 build target 的錯誤字串形狀不同

`Craft.ts` 的錯誤在 tauri 是 `invoke` reject 出的字串，在 web 是 wasm throw 出的值，
`String(err)` 結果不一定相同。`levelShortfall` 走前置檢查不依賴字串比對，不受影響；
但 `Page.vue` 的 `$t(String(err))` 與 `WebAssembly` 判斷兩邊都要實測。

### 攔阻面板出現時技能序列的去向

面板以 `v-if` 取代主體，`ActionQueue` 等子元件會被卸載，但 `activeSeq` 是
`Designer.vue` setup 內的 `reactive`，Designer 本身沒有被卸載，所以序列仍在記憶體中。
使用者修好等級後面板消失，序列原樣回來。這正是本次改善相對「整頁錯誤 + 重新整理」
最大的價值，實作時不要把 `activeSeq` 搬進被 `v-if` 包住的子元件。

## 不在範圍內

- 不改 Rust。`src-libs` 的等級檢查維持原樣，前端只是提前攔
- 不加 app 層級的 `errorHandler` 或 `unhandledrejection` 全域兜底。全域攔截容易把
  已經處理好的錯誤重複彈一次
- 攔阻面板不提供就地修改同步等級
- 不做技能序列的 sessionStorage 快照與還原

## 驗證方式

專案沒有測試框架（無 vitest、無 `#[cfg(test)]`），CI 只做 build 與 type-check。
因此驗證以手動情境為主：

1. `vue-tsc -p tsconfig.app.json` 通過（`pnpm tsc --noEmit` 在缺 `pkg-wasm/` 時
   檢查 0 個檔案，不能當作驗證）
2. `pnpm run fmt` 無 diff
3. 手動情境：
   - 把某職業配裝等級調到 90，選一個 Lv.94+ 的配方 → 應見攔阻面板，非錯誤畫面
   - 在攔阻面板切換到滿足等級的配裝 → 面板消失，正常進入
   - 在攔阻面板就地改等級並套用 → 面板消失，且配裝頁看得到新等級
   - 正常進入後，切到低等配裝 → 出現攔阻面板，**技能序列不消失**（切回去後仍在）
   - 選一個同步配方並填高於自己等級的同步等級 → 面板顯示同步配方導引文案
   - 斷網後開啟製作介面 → 整頁正常，只有「食藥&裝備」「初期品質」分頁顯示載入失敗與重試
   - 恢復網路後按重試 → 該區塊正常載入
   - 模擬器模式重跑上述等級不足情境
4. 兩個 build target 都要驗（`pnpm run dev-web` 與 `cargo tauri dev`），因為
   `Craft.ts` 的錯誤在 tauri（`invoke` reject）與 web（wasm throw）兩邊的字串形狀不同

## 檔案異動總覽

新增：

- `src/components/designer/LevelRequirementPanel.vue`
- `src/components/designer/BlockLoadError.vue`

修改：

- `src/components/designer/Page.vue` — 錯誤畫面重做、`:key` 重建、修 `WebAssembly` 判斷、
  `attributes` computed 改回傳 `GearsetsRow`
- `src/components/designer/Designer.vue` — 前置檢查、clamp、攔阻分支、simulate catch、
  修 `selectDefaultGearset` 的覆蓋問題
- `src/components/designer/Simulator.vue` — 前置檢查、clamp、攔阻分支、接收 `gearsetId`
- `src/components/designer/tabs/AttrEnhSelector.vue` — 區塊錯誤與重試、修 loading
- `src/components/designer/tabs/InitialQualitySetting.vue` — 區塊錯誤與重試
- `src/components/designer/tabs/Analyzers.vue` — 區塊錯誤與重試、移除靜默 catch
- `src/stores/designer.ts` — `content` 加 `syncLevel?`
- `src/components/recipe-manager/common.ts` — `selectRecipe` 改 options 物件
- `src/components/recipe-manager/ConfirmDialog.vue` — 傳入 `syncLevel`、配合新簽名
- `src/components/recipe-manager/CustomizeRecipe.vue` — 配合新簽名
