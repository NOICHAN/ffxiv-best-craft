# 配方篩選條件持久化 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 讓配方選擇頁篩選列的四個欄位（製作職業、等級、配方等級、等級同步）在使用者每次修改後自動記錄，重新打開網頁時直接帶入並套用到搜尋結果。

**Architecture:** 新增一個 pinia store `recipe-filters`，沿用專案既有的持久化慣例（store 出 `toJson` / `fromJson`，由 `App.vue` 讀檔灌入並用 `$subscribe` 寫回），因此網頁版落在 localStorage、桌面版落在 AppData 檔案，一套程式碼兩個產品都有。`RecipeSelector.vue` 的四個本地 `ref` 換成 `storeToRefs` 取得的 store ref，其餘邏輯不動。另外修掉兩個會擋住這個需求的既有缺陷：`craftTypeRemoteMethod()` 無條件清空已選職業、以及非同步還原的值不會觸發模板上的 `@change`。

**Tech Stack:** Vue 3 `<script setup>`、Element Plus、Pinia、`@vueuse/core`、fluent-vue、vue-router（hash history）。

設計文件：[docs/superpowers/specs/2026-08-09-recipe-filter-persistence-design.md](../specs/2026-08-09-recipe-filter-persistence-design.md)

## Global Constraints

- **語言規範**：與使用者對話用繁體中文；程式碼識別字用英文；**程式碼註解用繁體中文**；**Commit 訊息用繁體中文**。
- **Commit 訊息不得加上任何 AI 屬名或署名** —— 不要 `Co-Authored-By: Claude ...`、不要 `🤖 Generated with Claude Code`，PR 內文同理。
- **既有檔案沿用其原本註解風格**。`src-libs/` 的簡體中文註解、`.ftl` 各語系內容不要為了套規則去改寫。
- **新建的 `.ts` 檔案必須以 AGPL-3.0 標頭開頭**，從既有檔案複製（`.ts` 用 `//`），年份寫 `2026`，作者沿用 `Tnze`。
- **本次不需要新增任何 i18n 字串**。沒有新的 UI 元素，四個欄位的 label 與 tooltip 都沿用既有的。若你發現自己在寫 `<fluent>` 區塊，代表偏離計畫了，停下來。
- **Prettier 設定**：4 空格縮排、單引號、arrow function 單參數不加括號。每個 task 收尾都要跑 `pnpm run fmt`。
- **本次不動 Rust**。`src-libs/`、`src-tauri/`、`src-wasm/`、`src-db/`、`src-server/`、`src-data/` 一行都不改。
- **不得改變既有功能行為**，除了計畫中明確列出的兩處缺陷修正。

### 型別檢查基準線

專案**沒有任何測試框架**（無 vitest、無 playwright、無 `#[cfg(test)]`），CI 只做 build 與 type-check。因此每個 task 的驗證是「型別檢查 + 格式化 + 手動情境」。

型別檢查指令（**不要**用 `pnpm tsc --noEmit`，那條在本專案會檢查 0 個檔案，是空的）：

```bash
pnpm exec vue-tsc -p tsconfig.app.json --noEmit
```

**目前基準線是以下 4 個既有錯誤**（2026-08-09 實測），與本次無關，出現它們算通過：

```
src/components/designer/solvers/DpSolver.vue(241,43): error TS2345: Argument of type 'DefaultRow' is not assignable to parameter of type 'Solver'.
src/libs/AnalyzerWorker.ts(25,26): error TS2307: Cannot find module '../../pkg-wasm/app_wasm' or its corresponding type declarations.
src/libs/Craft.ts(24,32): error TS2307: Cannot find module '@/../pkg-wasm/app_wasm' or its corresponding type declarations.
src/libs/SolverWorker.ts(26,26): error TS2307: Cannot find module '../../pkg-wasm/app_wasm' or its corresponding type declarations.
```

**只要出現第 5 個錯誤，或上述任一條的檔案／行號改變成你剛動過的地方，就是你造成的，必須修掉。**

### 開發環境

專案有容器化的網頁開發環境，不需要本機 Rust 工具鏈：

```bash
docker compose -f docker-compose.dev.yml up
```

Vite dev server 在 <http://localhost:5173>，自架資料 API 在 8080。前端預設打公開 API。

---

## File Structure

新增：

| 檔案 | 責任 |
|---|---|
| `src/stores/recipe-filters.ts` | 四個篩選欄位的狀態 + `toJson` / `fromJson` |

修改：

| 檔案 | 改什麼 |
|---|---|
| `src/App.vue` | import store、取得實例、加進 `loadStorages()` 讀取清單、加一個 `$subscribe` |
| `src/components/recipe-manager/RecipeSelector.vue` | 四個 `ref` 換成 `storeToRefs`；修 `craftTypeRemoteMethod`；加 watch 驅動搜尋；移除三個 `@change`；`recipeTable` 呼叫處補 `?? undefined` |

---

## Task 1：新增 `recipe-filters` store

- [ ] 建立 `src/stores/recipe-filters.ts`，開頭複製 AGPL-3.0 標頭（參考 `src/stores/recipe-favorites.ts` 的格式，年份 `2026`，作者 `Tnze`）
- [ ] 定義 state：四個欄位皆為 `number | null`，預設全部 `null`

  | 欄位 | 對應畫面 |
  |---|---|
  | `craftType` | 製作職業 |
  | `level` | 等級（1~10，代表 1~10 級距，實際換算成 `level*10-9` ~ `level*10`） |
  | `recipeLevel` | 配方等級 |
  | `syncLevel` | 等級同步 |

- [ ] `toJson` getter：`JSON.stringify` 四個欄位，每個都用 `?? null` 正規化（`el-select` 清空時會給 `undefined`，`JSON.stringify` 會把該鍵整個丟掉，正規化成 `null` 才不會缺鍵）
- [ ] `fromJson` action：`try/catch` 包住 `JSON.parse`，失敗時 `console.error` 並維持預設值；逐欄用 `typeof v === 'number' ? v : null` 正規化，**不要**引入 ajv schema（理由見設計文件）
- [ ] 註解用繁體中文，說明「為什麼用 `null` 而不是 `undefined`」

**驗證：**
- [ ] `pnpm exec vue-tsc -p tsconfig.app.json --noEmit` 仍是那 4 個基準線錯誤
- [ ] `pnpm run fmt`

---

## Task 2：把 store 掛進 `App.vue` 的持久化流程

在 [src/App.vue](../../../src/App.vue) 四個地方比照 `recipeFavoritesStore` 加上對應的行：

- [ ] import：`import useRecipeFiltersStore from '@/stores/recipe-filters';`
- [ ] 取得實例：`const recipeFiltersStore = useRecipeFiltersStore();`
- [ ] `loadStorages()`：Tauri 分支 `readTextFile('recipe-filters.json', options)`、web 分支 `window.localStorage.getItem('recipe-filters.json')`，並加進底下那個 `for...of` 的陣列（`{ dst: recipeFiltersStore.fromJson, src: recipeFiltersJson }`）
- [ ] `onMounted` 內加 `recipeFiltersStore.$subscribe(() => writeJson('recipe-filters.json', recipeFiltersStore.toJson));`，位置放在既有四個 `$subscribe` 之後

**注意：** `$subscribe` 必須維持在 `await loadStorages()` **之後**註冊（既有註解 `// subscribe only after storage load` 說明了原因）——先訂閱會讓載入本身觸發一次寫回。

**驗證：**
- [ ] `pnpm exec vue-tsc -p tsconfig.app.json --noEmit` 仍是那 4 個基準線錯誤
- [ ] `pnpm run fmt`
- [ ] 開 <http://localhost:5173/#/recipe>，在 DevTools Console 執行 `Object.keys(localStorage)`；改任一篩選欄位後再執行一次，應出現 `recipe-filters.json`

---

## Task 3：`RecipeSelector.vue` 改綁 store

檔案：[src/components/recipe-manager/RecipeSelector.vue](../../../src/components/recipe-manager/RecipeSelector.vue)

- [ ] import `storeToRefs`（來自 `pinia`）與 `useRecipeFiltersStore`
- [ ] 刪掉這四行本地 `ref` 宣告（約 159-168 行），改由 `storeToRefs` 取得同名變數，讓檔案其餘部分不用改名：

  ```
  filterCraftType   ← craftType
  filterLevel       ← level
  filterRecipeLevel ← recipeLevel
  syncLevel         ← syncLevel
  ```

  `syncLevel` 上方那三段既有註解（`el-input-number` 清空回 `null`、下游用鬆散 `== undefined`）要保留，並補一句說明現在來自 store。
- [ ] `refDebounced(syncLevel, syncLevelDelayMs)` 不動——`storeToRefs` 回傳的是可寫的 `Ref`，`refDebounced` 照常運作
- [ ] `updateRecipePage()` 內呼叫 `dataSource.recipeTable(...)` 處，`filterRecipeLevel.value` 與 `filterCraftType.value` 補上 `?? undefined`（該 API 的參數是 `rlv?: number` / `craftTypeId?: number`，傳 `null` 會型別錯誤）。`filterLevel.value ? ... : undefined` 是真值判斷，`null` 已被涵蓋，不用改。

**驗證：**
- [ ] `pnpm exec vue-tsc -p tsconfig.app.json --noEmit` 仍是那 4 個基準線錯誤
- [ ] `pnpm run fmt`
- [ ] 頁面能正常搜尋、四個欄位能正常操作（此時「重開帶回」還不會完全正確，Task 4 才補完）

---

## Task 4：修 `craftTypeRemoteMethod` 清空已選職業

**這是擋住整個需求的關鍵缺陷。** 現況（約 183-187 行）在載入選項**之前**無條件執行
`filterCraftType.value = undefined`，而 `onMounted` 就會呼叫它一次，
所以還原回來的職業會立刻被清掉。

- [ ] 改成先載入選項、再判斷：目前選的 `craftType` **不在**新選項裡才清成 `null`，在裡面就保留
- [ ] 加繁體中文註解說明：這條規則同時服務兩個呼叫點——`onMounted` 時保留還原值；切換資料來源／語系時舊 id 對不上新選項就自然被清掉
- [ ] 清空時給的是 `null`（不是 `undefined`），與 store 的型別一致

**驗證：**
- [ ] `pnpm exec vue-tsc -p tsconfig.app.json --noEmit` 仍是那 4 個基準線錯誤
- [ ] `pnpm run fmt`
- [ ] 選一個製作職業 → F5 → 該職業仍被選中（搜尋結果是否同步更新由 Task 5 保證）
- [ ] 到設定頁切換資料來源或語系 → 回配方頁 → 職業選項重載，若舊選擇對不上就被清空、對得上就保留

---

## Task 5：改用 watch 驅動搜尋

非同步還原的值不會觸發模板上的 `@change`（`App.vue` 的 `loadStorages()` 在父元件的
`onMounted` 裡跑，比子元件 `RecipeSelector` 的 `onMounted` 晚），所以要改成 watch。

- [ ] 加一個 watch 監看三個**會影響查詢**的欄位 `[filterCraftType, filterLevel, filterRecipeLevel]`，變動時呼叫 `triggerSearch()`
- [ ] 從模板移除這三個控制項上的 `@change="triggerSearch"`（約 557、570、590 行），避免使用者操作時搜兩次
- [ ] **`syncLevel` 絕對不要加進這個 watch**——它不觸發搜尋，只影響難度欄，既有的 `refDebounced` → `loadDifficulties` 路徑不變。模板上 `syncLevel` 那個 `el-input-number` 若原本就沒有 `@change="triggerSearch"`，維持原狀
- [ ] 加繁體中文註解說明為什麼是 watch 而不是 `@change`（要同時涵蓋「使用者操作」與「非同步還原」兩條路徑）
- [ ] 註解記下已知取捨：有存過篩選的使用者開頁時會發出兩次查詢（`onMounted` 一次、還原後 watch 再一次）；沒存過的不受影響，因為 `fromJson` 根本不會被呼叫

**驗證：**
- [ ] `pnpm exec vue-tsc -p tsconfig.app.json --noEmit` 仍是那 4 個基準線錯誤
- [ ] `pnpm run fmt`

---

## Task 6：手動驗收

在 <http://localhost:5173/#/recipe> 逐條走完：

- [ ] 四個欄位各自修改後，DevTools 的 `localStorage.getItem('recipe-filters.json')` 立即反映新值
- [ ] 四個欄位都填 → F5 → 四個欄位都帶回原值，**且表格內容符合那組篩選**（不是未篩選的全部結果）
- [ ] 只填部分欄位 → F5 → 有填的帶回、沒填的維持空白
- [ ] 把欄位一一清空（`clearable`）→ F5 → 維持空白，不會冒出舊值
- [ ] 「等級同步」改動時**不會**觸發配方搜尋（表格不重載），只影響難度欄
- [ ] 全新無痕視窗（localStorage 為空）→ 四個欄位皆空、頁面正常載入、Console 無錯誤
- [ ] 手動把 `localStorage.setItem('recipe-filters.json', '{壞掉的 json')` 再 F5 → 頁面正常，欄位回到空白，Console 有一則 `console.error` 但沒有未捕捉例外
- [ ] 切換資料來源／語系後篩選行為正確（見 Task 4 的驗證）
- [ ] Console 全程沒有新的錯誤或警告

---

## Task 7：收尾

- [ ] `pnpm run fmt`
- [ ] `pnpm exec vue-tsc -p tsconfig.app.json --noEmit` 最終確認仍是那 4 個基準線錯誤
- [ ] 建立分支並提交（**不要**直接推 `main`）
- [ ] Commit 訊息用繁體中文，**不得**含任何 AI 屬名或署名

建議的 commit 訊息：

```
配方篩選條件改存進 localStorage，重開網頁自動帶回

新增 recipe-filters store，沿用 App.vue 既有的持久化機制，
桌面版同時落在 AppData。順帶修掉兩個擋住這件事的既有缺陷：
craftTypeRemoteMethod 無條件清空已選職業、以及非同步還原的值
不會觸發模板上的 @change。
```
