# 製作介面的配裝挑選 Design

日期：2026-08-09

## 問題

同一個配方在兩個製作模式下會套用**不同的**裝備屬性，而且模擬器模式套用的那一組是錯的。

`src/components/designer/Page.vue` 的 `gearset` computed 這樣挑配裝：

```ts
gearsetsStore.gearsets.find(v => v.compatibleJobs.includes(job))
```

第 0 列（「預設」）的 `compatibleJobs` 含全部八個職業（見 `src/stores/gearsets.ts` 的 `state()`），
所以 `.find()` 永遠第一個就命中它。已用瀏覽器實測確認：把九列配裝的 CP 設成 500~508 後，
八個職業全部解析到 `id=0 CP=500`。

對照 `Designer.vue` 的 `selectDefaultGearset()`，同樣的需求就有寫 `i != 0`，解析結果各自正確。

**影響**：走模擬器模式（`designerStore.content.simulatorMode === true`）時，
不論配方是什麼職業，一律套用「預設」分類的屬性；使用者為木工師／烹調師各別設定的
作業精度、加工精度、CP 全都不生效。Simulator 顯示的配裝名稱、以及等級不足面板
「套用」寫回的目標列，也都指向預設那列。

### 連帶發現：模擬器模式沒有配裝選擇器

`Simulator.vue` 裡那個 `AttrEnhSelector` 對話框是**被註解掉**的，而
`@click-attributes="openAttrEnhSelector = true"` 還留著——點屬性列只會設一個沒人讀的 flag，
畫面上什麼都不會發生。食藥加成連帶完全無法使用（`attributesEnhancers` 永遠是空陣列）。

git 追下來是**程式碼腐化而非產品決策**：上游 `3e53eb5` 先把 `<AttrEnhSelector>` 註解掉留一個空對話框，
`f91cb72` 再把整個對話框註解掉。時間點正好在 `AttrEnhSelector` 多了 required 的 `gearsetId` model 之後，
而 Simulator 的 `gearsetId` 是唯讀 prop，給不出來。沒有任何註解說明這是刻意停用。

### 為什麼不能只補 `i != 0`

`src/stores/gearsets.ts` 的 `state()` 會**預先**幫八個職業各建一列並填入 `DEFAULT_ATTRIBUTS`。
因此「只編輯過預設列、沒碰過職業列」的使用者，他的木工師那列裝的是**過期的出廠數字**。
單純補上 `i != 0` 會讓這群人的數值直接倒退，而且模擬器模式沒有選擇器，他們無從改回來。

兩派使用者的需求都是合理的：有人所有職業共用一組裝備，有人每個職業各有一套。
真正的缺陷是**介面從來沒給過使用者表達這件事的地方**。

## 目標

1. 兩個製作模式對同一個配方解析出**相同**的配裝。
2. 使用者能表達「這個職業用哪一列」，並且被記住。
3. 使用者能一次表達「所有職業都用預設」，不必逐職業設定八次。

## 非目標（本次不做）

- **食藥加成不持久化**。`attributesEnhancers` 維持元件內 `ref`。食藥是每次製作的臨時決定，
  且遊戲改版後清單會變，記住舊選擇的價值低於它帶來的困惑。
- **自訂配方不提供配裝選擇器**。`AttrEnhSelector` 的選擇器有 `v-if="job != undefined"`，
  自訂配方本來就沒有；維持現狀一律用「預設」列。
- **不動 `gearsets` store 的 schema**、不動裝備屬性頁既有的欄位、不動 Rust。
- **不恢復「繼承自預設」的資料模型**（舊 schema 的 `value?: Attributes`）。
  那要改 schema 加遷移，而本設計用「選擇 + 記憶」已經涵蓋同樣的使用情境。
  `Gearset.vue` 裡四個語系那組沒人用的 `inherit-from-default` 字串維持原樣，不刪也不用。

## 架構

### 決策一：挑選規則收斂成單一真相來源

現在兩個模式各寫各的挑選邏輯，這就是它們會不一致的原因。新設計讓兩邊呼叫同一個 getter。

```
resolveRowFor(job) 的規則，由上而下第一個成立者勝出

  0. job == undefined（自訂配方）        → 「預設」列
  1. alwaysUseDefault 為 true            → 「預設」列
  2. byJob[job] 有記憶，且該列仍存在、
     且其 compatibleJobs 仍含 job        → 該列
  3. 第一個相容的「非預設」列
     （i != 0 && compatibleJobs 含 job）  → 該列
  4. 以上皆無                            → 「預設」列
```

規則 2 的「仍相容」檢查不能省：使用者可以在裝備屬性頁改一列的適配職業，也可以刪掉一列，
記憶會因此失效，此時必須乾淨地退回規則 3 而不是報錯或卡住。

規則 2 同時也是「習慣用預設」那派的出口：「預設」列相容全部職業，所以幫某個職業選「預設」
是合法且會被記住的，而且它是**活的參照**——之後改預設列的數值，該職業會跟著變。

規則 3 保留 `Designer.vue` 現有的行為，作為「沒選過」時的預設。

### 決策二：獨立 store，不動 `gearsets.json`

新增 `src/stores/gearset-selection.ts`（pinia id `gearset-selection`，檔名 `gearset-selection.json`）：

```ts
{
    alwaysUseDefault: boolean,              // 預設 false
    byJob: Partial<Record<Jobs, number>>,   // 職業 → 配裝 id
}
```

沿用專案既有的持久化慣例（store 出 `toJson` / `fromJson`，`App.vue` 讀檔灌入並 `$subscribe` 寫回），
因此網頁版落在 localStorage、桌面版落在 AppData。

**刻意不塞進 `gearsets` store**：`GearsetsStoreSchema` 是 `additionalProperties: false`，
一旦多存一個欄位，使用者若拿到舊版 bundle（網頁版有 `coi-serviceworker` 快取，這是真的會發生的）
驗證就會整包失敗，**八列裝備屬性全部歸零**。配裝數值是使用者最不能掉的資料，
不值得為了省一個檔案冒這個險。獨立檔案壞掉最多就是選擇記憶回到規則 3。

`resolveRowFor` 放在這個 store 的 getter 裡，內部呼叫 `useGearsetsStore()` 取得列表，
呼叫端因此不必自己傳 gearsets，也不可能各自寫出不同版本的規則。

### 決策三：「所有職業都使用這組屬性」開關放在裝備屬性頁的「預設」分頁

放在使用者正在看「預設」那一頁的地方，不必跑去設定頁找；順帶回答了
「預設這一列到底什麼用」這個介面上從來沒說清楚的問題。新增職業列也自動適用。

`Gearset.vue` 已有 `v-if="!simplify && store.gearsets[index].id != 0"` 的區塊放名稱與適配職業，
新增一個互補的 `v-if="!simplify && store.gearsets[index].id == 0"` 區塊放這個開關。
`simplify` 的 gate 不可省——`AttrEnhSelector` 就是用 `simplify` 渲染 `Gearset` 的，
少了它開關會跑進模擬器的配裝對話框裡。

**開關開啟時選擇器的行為**：選擇器**不停用**，仍可操作，但會顯示提示說明目前一律使用預設；
使用者若在此改選其他配裝，就**關掉** `alwaysUseDefault` 並記錄該選擇。
理由是「使用者的直接操作勝過全域開關」，而且提示已經先講明白，不是靜默的狀態變更。
若改成停用選擇器，使用者會停在一個沒有出口的畫面上——他得自己想到要離開製作介面、
走到裝備屬性頁去關掉開關。

關掉 `alwaysUseDefault` **不會**清空 `byJob`，所以再打開、再關掉之後個別選擇都還在。

### 決策四：刪掉 `Page.vue` 的挑選邏輯，而不是修補它

`Page.vue` 是路由分派層，本來就不該決定用哪一列配裝。
`gearset` 與 `attributes` 兩個 computed 連同傳給 `Simulator` 的 `:attributes` / `:gearset-id`
一併移除，改由 `Simulator` 自己解析——與 `Designer` 的結構對齊。
`Simulator` 因此需要新的 `isCustomRecipe` prop（`Designer` 已經有了）。

那個有問題的 `find` 是被**刪除**而不是打補丁，缺陷沒有留下第二個藏身處。

## 元件改動

| 檔案 | 改什麼 |
|---|---|
| `src/stores/gearset-selection.ts`（新增） | 狀態、`toJson` / `fromJson`、`resolveRowFor` getter、`select` / `setAlwaysUseDefault` action |
| `src/App.vue` | 掛上 `gearset-selection.json`（比照既有四個 store） |
| `src/components/designer/Page.vue` | 刪 `gearset` / `attributes` computed 與兩個 prop；改傳 `:is-custom-recipe` 給 Simulator |
| `src/components/designer/Simulator.vue` | 自己持有 `gearsetId`；解除 `el-dialog` 註解；新增 `isCustomRecipe` prop |
| `src/components/designer/Designer.vue` | `selectDefaultGearset()` 改呼叫共用 getter；使用者選擇時寫回 store |
| `src/components/designer/tabs/AttrEnhSelector.vue` | 只加 `alwaysUseDefault` 開啟時的提示。寫回記憶不必動它——它已經是 `defineModel('gearsetId')`，父層（Designer / Simulator）從 v-model 就看得到變更 |
| `src/components/Gearset.vue` | 「預設」分頁新增 `alwaysUseDefault` 開關與說明 |

## 資料流

```
使用者在製作介面選配裝
  → AttrEnhSelector 更新 v-model:gearset-id
  → Designer / Simulator 寫進 gearset-selection store（byJob[job] = id）
  → App.vue 的 $subscribe → writeJson('gearset-selection.json', toJson)

使用者在裝備屬性頁切「所有職業都使用這組屬性」
  → 同一個 store 的 alwaysUseDefault
  → 同上寫回

開啟製作介面
  → Designer / Simulator 呼叫 resolveRowFor(job)
  → 規則 0~4 解析出該用哪一列 → attributes computed → 模擬／求解
```

## 錯誤處理

`fromJson` 用 `try/catch` 包住 `JSON.parse` 並 `console.error`，解析失敗就維持預設值——
與 `src/stores/recipe-favorites.ts` 同樣的做法。逐欄正規化：
`alwaysUseDefault` 不是 boolean 就當 false，`byJob` 只收「key 是合法 `Jobs`、value 是 number」的項目。

不引入 ajv schema：這份資料壞掉的最差後果只是選擇記憶失效、退回規則 3，不會讓頁面壞掉，
也沒有跨版本遷移需求。`gearsets` 那種 schema 驗證是因為它有真實的遷移歷史。

**`resolveRowFor` 必須對任何 store 狀態都回得出一列**——`gearsets[0]` 永遠存在
（`delGearset` 在 `Gearsets.vue` 被擋掉，id 0 不可刪），規則 4 因此永遠有解。

## 既有陷阱，改動時不可弄丟

`Designer.vue:108-121` 的 `$subscribe` 有段註解說明：等級不足面板按「套用」會寫入 gearsets store，
早期版本會因此把剛選好的配裝打回預設，導致**面板永遠關不掉**。
改寫時那個守衛（只在目前選擇已消失／不再相容時才重新解析）必須原樣保留。
`Simulator` 現在也有同一個面板（`applyGearsetLevel`），改動後兩邊都要驗。

## i18n

需要新增字串，四個語系（`zh-CN`、`zh-TW`、`en-US`、`ja-JP`）都要齊：

| 元件 | key | 用途 |
|---|---|---|
| `Gearset.vue` | `always-use-default` | 開關標籤 |
| `Gearset.vue` | `always-use-default-hint` | 開關下方說明 |
| `AttrEnhSelector.vue` | `gearset-locked-to-default` | 開關開啟時選擇器旁的提示 |

`Simulator.vue` 的 `meal-and-potion` 四語系已存在，解除註解可直接用，不需新增。

## 測試

專案沒有測試框架（無 vitest、無 playwright、無 `#[cfg(test)]`），CI 只做 build 與 type-check。
驗證方式是型別檢查 + 格式化 + 手動情境，情境清單放在實作計畫裡。

關鍵驗收：**同一個配方分別用求解器與模擬器開啟，屬性列顯示的數值必須一致。**
這是整個設計的目的，也是最容易在改動中回歸的一條。
