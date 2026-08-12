# 配方篩選條件持久化 Design

日期：2026-08-09

## 問題

配方選擇頁（[src/components/recipe-manager/RecipeSelector.vue](../../../src/components/recipe-manager/RecipeSelector.vue)）
篩選列上的四個欄位全部是元件內的普通 `ref`，重新整理或關掉網頁再開就歸零。
使用者每次回到這一頁都要重設一次「製作職業／等級／配方等級／等級同步」。

| 畫面欄位 | 目前的變數 | 目前型別 |
|---|---|---|
| 製作職業 | `filterCraftType` | `number \| undefined` |
| 等級 | `filterLevel` | `number \| undefined` |
| 配方等級 | `filterRecipeLevel` | `number \| undefined` |
| 等級同步 | `syncLevel` | `number \| null \| undefined` |

另有一個既有缺陷會直接擋住這個需求：`craftTypeRemoteMethod()` 在載入職業選項前
**無條件**執行 `filterCraftType.value = undefined`，而它在 `onMounted` 就會被呼叫一次。
就算把值存起來、開頁時帶回，也會立刻被這一行清掉。

## 目標

使用者調整這四個欄位後自動記錄，重新打開網頁時直接帶入並套用到搜尋結果。

## 非目標（本次不做）

- **不存搜尋文字 `searchText`**。開頁時自動帶回上次的關鍵字會讓人以為資料只剩那幾筆，
  而且它與篩選不同——篩選是長期偏好，關鍵字是一次性查詢。
- **不存頁碼 `pagination.Page`**。篩選條件變了頁碼本來就會被重設成 1，存了沒有意義。
- **不存 `stellarSteadyHandCount`**。它不在篩選列上，屬於配方確認對話框的參數。
- **不加「清除全部篩選」按鈕**。四個欄位本身都有 `clearable`，夠用。
- **不動 Rust**。`src-libs/`、`src-tauri/`、`src-wasm/` 一行都不改。

## 架構

### 決策一：新開一個 pinia store，沿用既有持久化機制

專案已有一套持久化慣例：store 提供 `toJson` getter 與 `fromJson` action，
由 [src/App.vue](../../../src/App.vue) 在 `onMounted` 讀檔灌入、再用 `$subscribe` 訂閱寫回。
Tauri 寫 AppData 檔案、網頁寫 localStorage，同一份程式碼兩個產品都能用。

新增 `src/stores/recipe-filters.ts`（pinia id `recipe-filters`，檔名 `recipe-filters.json`），
掛進 App.vue 的既有清單即可，網頁版自然就落在 localStorage，桌面版也順便有了。

**為什麼不塞進 `settings` store**：`settings` 是使用者設定（語言、資料來源、每頁筆數），
語意上與「上次用的篩選條件」不同；混在一起會讓 settings 的 schema 越長越雜。
獨立 store 的成本只是 App.vue 四行。

**為什麼不自己寫一支 `localStorage.setItem`**：那會在專案裡開第二套持久化風格，
而且桌面版拿不到（Tauri 下 localStorage 不是使用者資料的存放處）。

### 決策二：狀態一律用 `number | null`，不用 `undefined`

`JSON.stringify` 會把 `undefined` 的欄位整個丟掉，存回來的字串會缺鍵，
讀取端就得多一層防禦。統一用 `null` 表示「未填」，`toJson` 時用 `?? null` 正規化，
`fromJson` 時用 `?? null` 兜底。

代價：`DataSource.recipeTable(page, searchName?, rlv?, craftTypeId?, ...)` 這些參數是
`?: number`，傳 `null` 會型別錯誤，呼叫點要補 `?? undefined`。這是唯一的轉換點，可以接受。

`syncLevel` 原本就已經是 `number | null`（`el-input-number` 的 `valueOnClear` 預設回 `null`），
下游一律用鬆散的 `== undefined` 同時涵蓋 `null` 與 `undefined`，這個慣例維持不變。

### 決策三：`craftTypeRemoteMethod` 改成「選項裡沒有才清空」

```
載入職業選項
若目前選的 craftType 不在新選項裡 → 清成 null
否則 → 保留
```

這條規則同時滿足兩個呼叫點：`onMounted` 時保留剛帶回來的值；
切換資料來源／語系時，舊的 craftType id 對不上新選項就自然被清掉。

順帶把清空的時機從「await 之前」移到「await 之後」——原本會在載入中先閃一下空值。

### 決策四：用 watch 驅動重新搜尋，取代模板上的 `@change`

篩選值是非同步帶回來的（App.vue 的 `loadStorages()` 在自己的 `onMounted` 裡跑，
而子元件 `RecipeSelector` 的 `onMounted` 比父元件早執行），
所以帶回來的值不會觸發模板上的 `@change="triggerSearch"`。

改成 watch 三個會影響查詢的欄位（`craftType`、`level`、`recipeLevel`），
同時涵蓋「使用者操作」與「非同步還原」兩條路徑，並移除模板上的三個 `@change` 以免搜兩次。

`syncLevel` **不進這個 watch**——它不觸發搜尋，只影響難度欄，既有的 `refDebounced` 路徑不變。

**已知取捨**：對於有存過篩選的使用者，開頁時會發出兩次查詢（`onMounted` 一次、
還原後 watch 再一次）。沒存過的使用者不受影響（`fromJson` 根本不會被呼叫，值沒變、watch 不觸發）。
要消掉這一次多餘查詢就得讓 App.vue 對外公開「storage 已載入」的訊號，
那是動到全域載入流程的改動，為了一次請求不值得。

## 資料流

```
使用者改篩選
  → v-model 寫進 recipe-filters store
  → App.vue 的 $subscribe 觸發 → writeJson('recipe-filters.json', toJson)
  → localStorage（網頁）／AppData 檔案（桌面）

重開網頁
  → App.vue onMounted → loadStorages() → fromJson(存的字串)
  → store 的值改變
  → RecipeSelector 的 storeToRefs 是同一份響應式狀態，輸入框直接顯示
  → watch 偵測到三個查詢欄位變動 → triggerSearch()
```

## 錯誤處理

`fromJson` 用 `try/catch` 包住 `JSON.parse` 並 `console.error`，解析失敗就維持預設值——
與 [src/stores/recipe-favorites.ts](../../../src/stores/recipe-favorites.ts) 同樣的做法。
本次刻意**不引入 ajv schema**：這四個欄位全是可為 null 的數字，
`gearsets` 那種 schema 驗證是因為它有跨版本的資料遷移需求，這裡沒有。
讀進來的值逐欄做 `typeof === 'number' ? v : null` 的正規化就足夠，
而且壞資料的最差後果只是篩選條件回到未填，不會讓頁面壞掉。

## 測試

專案沒有測試框架（無 vitest、無 playwright、無 `#[cfg(test)]`），CI 只做 build 與 type-check。
驗證方式是型別檢查 + 格式化 + 手動情境，情境清單放在實作計畫裡。

## i18n

**不需要**新增任何字串。本次沒有新的 UI 元素，四個欄位的 label 與 tooltip 都沿用既有的。

## 影響範圍

新增：

| 檔案 | 責任 |
|---|---|
| `src/stores/recipe-filters.ts` | 四個篩選欄位的狀態 + `toJson` / `fromJson` |

修改：

| 檔案 | 改什麼 |
|---|---|
| `src/App.vue` | import store、取得實例、加進 `loadStorages()` 的讀取清單、加一個 `$subscribe` |
| `src/components/recipe-manager/RecipeSelector.vue` | 四個 `ref` 換成 `storeToRefs`、修 `craftTypeRemoteMethod`、加 watch、移除三個 `@change`、呼叫 `recipeTable` 處補 `?? undefined` |

## 未解的相鄰議題（不在本次範圍）

`src/components/designer/Page.vue:66-74` 挑配裝時沒有排除第 0 列（預設），
而預設列的 `compatibleJobs` 含全部八個職業，`.find()` 永遠命中它，
導致模擬器模式一律套用預設配裝的屬性。已用瀏覽器實測確認。
與本次的篩選持久化無關，另案處理。
