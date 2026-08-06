# Designer 錯誤處理 UX 改善 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 讓製作介面的錯誤不再一律變成「只能重新整理」的整頁死畫面 —— 等級不足改成可就地修正的頁內攔阻面板，資料源／分析失敗改成區塊內可重試，真正的致命錯誤保留整頁畫面但提供重試與返回出口。

**Architecture:** 錯誤分三級。第一級（等級不足）以前端前置檢查攔在 `Designer.vue` / `Simulator.vue` 內，模板 `v-if` 切換到 `LevelRequirementPanel.vue`，`newStatus` 呼叫前把等級 clamp 住讓 setup 不拋。第二級（資料源／分析失敗）由各元件自己 try/catch，就地顯示共用的 `BlockLoadError.vue` 與重試鈕，絕不往上冒泡。第三級（WASM／未知）仍由 `Page.vue` 的 `onErrorCaptured` 接住，但改成可重試（清狀態 + `:key` 遞增重建元件），重試失敗才建議重新整理。

**Tech Stack:** Vue 3 `<script setup>`、Element Plus、Pinia、fluent-vue（四語系 SFC `<fluent>` 區塊）、vue-router（hash history）。

設計文件：[docs/superpowers/specs/2026-08-06-designer-error-ux-design.md](../specs/2026-08-06-designer-error-ux-design.md)

## Global Constraints

- **語言規範**：與使用者對話用繁體中文；程式碼識別字用英文；**程式碼註解用繁體中文**；**Commit 訊息用繁體中文**。
- **Commit 訊息不得加上任何 AI 屬名或署名** —— 不要 `Co-Authored-By: Claude ...`、不要 `🤖 Generated with Claude Code`。
- **既有檔案沿用其原本註解風格**。`src-libs/` 的簡體中文註解、`.ftl` 各語系內容不要為了套規則去改寫。
- **每個新建的 `.vue` / `.ts` 檔案都必須以 AGPL-3.0 標頭開頭**，從既有檔案複製（`.vue` 用 `<!-- -->` 包住，`.ts` 用 `//`），年份寫 `2026`，作者 `Tnze`。
- **i18n 必須四語系齊備**：`zh-CN`、`zh-TW`、`en-US`、`ja-JP`。元件級字串放在該 `.vue` 檔的 `<fluent locale="...">` 區塊，四個區塊都要有。
- **Prettier 設定**：4 空格縮排、單引號、arrow function 單參數不加括號。每個 task 收尾都要跑 `pnpm run fmt`。
- **本次不動 Rust**。`src-libs/`、`src-tauri/`、`src-wasm/` 一行都不改。
- **本次不加 app 層級的 `errorHandler` 或 `unhandledrejection` 全域兜底。**
- **不得移除既有功能**。所有改動只增加錯誤處理路徑，正常路徑的行為必須完全不變。

### 型別檢查基準線

專案**沒有任何測試框架**（無 vitest、無 playwright、無 `#[cfg(test)]`），CI 只做 build 與 type-check。因此每個 task 的驗證是「型別檢查 + 格式化 + 手動情境」。

型別檢查指令（**不要**用 `pnpm tsc --noEmit`，那條在本專案會檢查 0 個檔案，是空的）：

```bash
pnpm exec vue-tsc -p tsconfig.app.json --noEmit
```

**目前基準線是以下 4 個既有錯誤**，與本次無關，出現它們算通過：

```
src/components/designer/solvers/DpSolver.vue(241,43): error TS2345: Argument of type 'DefaultRow' is not assignable to parameter of type 'Solver'.
src/libs/AnalyzerWorker.ts(25,26): error TS2307: Cannot find module '../../pkg-wasm/app_wasm' or its corresponding type declarations.
src/libs/Craft.ts(24,32): error TS2307: Cannot find module '@/../pkg-wasm/app_wasm' or its corresponding type declarations.
src/libs/SolverWorker.ts(26,26): error TS2307: Cannot find module '../../pkg-wasm/app_wasm' or its corresponding type declarations.
```

**只要出現第 5 個錯誤，或上述任一條的檔案／行號改變成你剛動過的地方，就是你造成的，必須修掉。**

---

## File Structure

新增：

| 檔案 | 責任 |
|---|---|
| `src/components/designer/errors.ts` | 唯一一個把 `unknown` 錯誤轉成可顯示字串的函式。所有 catch 區塊共用。 |
| `src/components/designer/BlockLoadError.vue` | 區塊級錯誤條 + 重試鈕。純呈現，props 進 emit 出。 |
| `src/components/designer/LevelRequirementPanel.vue` | 等級不足攔阻面板。純呈現 + emit，不碰 store、不碰資料源。 |

修改：

| 檔案 | 改什麼 |
|---|---|
| `src/stores/designer.ts` | `content` 與 `selectRecipe` payload 加 `syncLevel?: number` |
| `src/components/recipe-manager/common.ts` | `selectRecipe` 由 9 個位置參數改為單一 options 物件 |
| `src/components/recipe-manager/ConfirmDialog.vue` | 配合新簽名；傳入 `syncLevel` |
| `src/components/recipe-manager/CustomizeRecipe.vue` | 配合新簽名 |
| `src/components/designer/tabs/AttrEnhSelector.vue` | 載入失敗就地顯示與重試；修「永遠轉圈」 |
| `src/components/designer/tabs/InitialQualitySetting.vue` | 載入失敗就地顯示與重試；退回手動輸入 |
| `src/components/designer/tabs/Analyzers.vue` | 三個分析區塊各自的錯誤顯示與重試；移除靜默 catch |
| `src/components/designer/Designer.vue` | 前置檢查、clamp、攔阻分支、`simulate` catch、修 `$subscribe` 覆蓋問題 |
| `src/components/designer/Simulator.vue` | 前置檢查、clamp、攔阻分支、接收 `gearsetId` |
| `src/components/designer/Page.vue` | `attributes` computed 改回傳 `GearsetsRow`；錯誤畫面重做 |

---

## Task 1: 共用錯誤工具與區塊錯誤條

建立後續每個 task 都會 import 的兩個基礎件。此 task 結束時它們還沒有任何使用者，但可獨立通過型別檢查。

**Files:**
- Create: `src/components/designer/errors.ts`
- Create: `src/components/designer/BlockLoadError.vue`

**Interfaces:**
- Consumes: 無
- Produces:
  - `describeError(err: unknown, $t: (id: string) => string): string` —— Task 2、3、4、7、8 都會用
  - `BlockLoadError` 元件，props `{ message: string }`，emit `retry`（無參數）—— Task 2、3、4 都會用

- [ ] **Step 1: 建立 `src/components/designer/errors.ts`**

```ts
// This file is part of BestCraft.
// Copyright (C) 2026 Tnze
//
// BestCraft is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// BestCraft is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

/**
 * 把任意錯誤值轉成可以顯示給使用者看的字串。
 *
 * Rust 那端（tauri 的 invoke reject 與 wasm 的 throw）回的是 .ftl 內的訊息 id，
 * 例如 `player-level-lower-than-recipe-requirement`，所以先試著查表在地化。
 * 查不到（例如 JS 自己拋的 Error）時 fluent 可能拋例外，退回原始字串。
 *
 * $t 的型別刻意寫得寬鬆，好讓 fluent-vue 的 $t（帶第二個 args 參數）能直接傳進來。
 */
export function describeError(
    err: unknown,
    $t: (id: string, ...args: never[]) => string,
): string {
    const raw = String(err);
    try {
        return $t(raw);
    } catch {
        return raw;
    }
}
```

- [ ] **Step 2: 建立 `src/components/designer/BlockLoadError.vue`**

AGPL 標頭直接從 `src/components/designer/Page.vue` 開頭那 17 行複製（`<!-- ... -->` 形式），把年份改成 2026。

```vue
<script setup lang="ts">
import { ElAlert, ElButton } from 'element-plus';
import { useFluent } from 'fluent-vue';

defineProps<{
    // 已經過 describeError 處理的可讀訊息
    message: string;
}>();

const emit = defineEmits<{
    (e: 'retry'): void;
}>();

const { $t } = useFluent();
</script>

<template>
    <el-alert
        class="block-load-error"
        type="error"
        :closable="false"
        show-icon
    >
        <template #title>{{ $t('load-failed') }}</template>
        <div class="block-load-error-body">
            <span class="block-load-error-message">{{ message }}</span>
            <el-button size="small" @click="emit('retry')">
                {{ $t('retry') }}
            </el-button>
        </div>
    </el-alert>
</template>

<style scoped>
.block-load-error {
    margin-bottom: 10px;
}

.block-load-error-body {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
}

.block-load-error-message {
    flex: 1 1 auto;
    min-width: 0;
    word-break: break-word;
}
</style>

<fluent locale="zh-CN">
load-failed = 载入失败
retry = 重试
</fluent>

<fluent locale="zh-TW">
load-failed = 載入失敗
retry = 重試
</fluent>

<fluent locale="en-US">
load-failed = Loading failed
retry = Retry
</fluent>

<fluent locale="ja-JP">
load-failed = 読み込みに失敗しました
retry = 再試行
</fluent>
```

- [ ] **Step 3: 型別檢查**

Run: `pnpm exec vue-tsc -p tsconfig.app.json --noEmit`
Expected: 只有基準線那 4 個錯誤，沒有新增。

- [ ] **Step 4: 格式化**

Run: `pnpm run fmt`
然後 `git diff --stat` 確認只有你剛建的兩個檔案（或完全沒有 diff）。

- [ ] **Step 5: Commit**

```bash
git add src/components/designer/errors.ts src/components/designer/BlockLoadError.vue
git commit -m "新增錯誤描述工具與區塊級錯誤提示元件"
```

---

## Task 2: 食藥清單載入失敗不再炸掉整頁

`AttrEnhSelector.vue:82-93` 的 `onMounted` / `watch` 沒有 catch，rejection 會沿 parent 鏈打到 `Page.vue` 的 `onErrorCaptured`，把整個製作介面換成錯誤畫面 —— 即使使用者根本沒開「食藥&裝備」那個分頁。另外 `:loading="!meals"` 讓載入失敗後兩個下拉永遠轉圈，沒有任何提示。

**Files:**
- Modify: `src/components/designer/tabs/AttrEnhSelector.vue`

**Interfaces:**
- Consumes: `describeError` (Task 1)、`BlockLoadError` (Task 1)
- Produces: 無（此元件對外介面不變）

- [ ] **Step 1: 加 import 與狀態**

在 script 的 import 區加：

```ts
import BlockLoadError from '../BlockLoadError.vue';
import { describeError } from '../errors';
```

`const medicineSearchKeyword = ref('');`（約在第 56 行）之後加：

```ts
const loading = ref(false);
const loadError = ref<string>();
// 遞增即可觸發重載；納入下方 watch 的相依
const retryToken = ref(0);
```

- [ ] **Step 2: 改寫載入函式與觸發點**

把現有的（約第 82-94 行）：

```ts
onMounted(async () => loadMealsAndMedicine(setting.getDataSource()));
watch(() => setting.getDataSource(), loadMealsAndMedicine);
```

以及

```ts
async function loadMealsAndMedicine(datasource: Promise<DataSource>) {
    let ds = await datasource;
    await Promise.all([loadMeals(ds), loadMedicines(ds)]);
}
```

改成：

```ts
onMounted(() => loadMealsAndMedicine(setting.getDataSource()));
watch([() => setting.getDataSource(), retryToken], ([ds]) =>
    loadMealsAndMedicine(ds),
);
```

```ts
async function loadMealsAndMedicine(datasource: Promise<DataSource>) {
    loading.value = true;
    loadError.value = undefined;
    try {
        const ds = await datasource;
        await Promise.all([loadMeals(ds), loadMedicines(ds)]);
    } catch (err) {
        // 就地顯示並提供重試，絕不往上冒泡：這個 rejection 會被 Page.vue 的
        // onErrorCaptured 接走，把整個製作介面換成錯誤畫面，而食藥清單只是
        // 一個分頁的內容，不該有這種殺傷力。
        loadError.value = describeError(err, $t);
    } finally {
        loading.value = false;
    }
}
```

- [ ] **Step 3: 模板加錯誤條、修 loading**

在 `<el-form :model="enhancers" label-width="auto">` 之後、第一個 `<el-form-item :label="$t('meal')">` 之前插入：

```vue
        <BlockLoadError
            v-if="loadError"
            :message="loadError"
            @retry="retryToken++"
        />
```

把兩個 `el-select-v2` 的 `:loading="!meals"` 與 `:loading="!medicine"` 都改成：

```
                :loading="loading"
```

原本綁 `!meals` 的問題是：載入失敗時 `meals` 永遠是 undefined，`!meals` 恆真，下拉永遠轉圈。

- [ ] **Step 4: 型別檢查**

Run: `pnpm exec vue-tsc -p tsconfig.app.json --noEmit`
Expected: 只有基準線那 4 個錯誤。

- [ ] **Step 5: 手動驗證**

啟動 `pnpm run dev-web`（或用容器環境），進入任一配方的製作介面，開瀏覽器 DevTools 的 Network 面板切成 Offline，然後切到「食藥&裝備」分頁重新載入頁面。

Expected：
- 整頁**不會**變成錯誤畫面
- 「食藥&裝備」分頁頂端出現紅色「載入失敗」條與「重試」鈕
- 兩個下拉**停止轉圈**
- 關掉 Offline 後按「重試」，清單正常載入、錯誤條消失

- [ ] **Step 6: 格式化並 Commit**

```bash
pnpm run fmt
git add src/components/designer/tabs/AttrEnhSelector.vue
git commit -m "食藥清單載入失敗改為就地提示與重試，不再讓整頁進入錯誤畫面"
```

---

## Task 3: 配方素材載入失敗不再炸掉整頁

`InitialQualitySetting.vue:80-92` 的 `watch(..., { immediate: true })` 沒有 catch，資料源抓素材失敗一樣會把整頁換掉。失敗時要退回「手動輸入初期品質」，讓這個分頁仍然可用。

**Files:**
- Modify: `src/components/designer/tabs/InitialQualitySetting.vue`

**Interfaces:**
- Consumes: `describeError` (Task 1)、`BlockLoadError` (Task 1)
- Produces: 無

- [ ] **Step 1: 加 import 與狀態**

script 的 import 區加（注意這個檔案原本**沒有** `useFluent`，模板的 `$t` 是 fluent-vue 的全域注入，但 script 內要用就得自己取）：

```ts
import { useFluent } from 'fluent-vue';
import BlockLoadError from '../BlockLoadError.vue';
import { describeError } from '../errors';
```

`const settingStore = useSettingsStore();` 之後加：

```ts
const { $t } = useFluent();
```

`const items = ref<...>([]);`（約第 72 行）之後加：

```ts
const loadError = ref<string>();
// 遞增即可觸發重載；納入下方 watch 的相依
const retryToken = ref(0);
```

- [ ] **Step 2: 改寫 watch**

把現有的（約第 80-92 行）：

```ts
watch(
    [settingStore.getDataSource, () => props.recipeId],
    async ([dataSource, recipeId]) => {
        const source = await dataSource;
        if (recipeId === undefined) {
            items.value = [];
        } else {
            const ri = await source.recipesIngredients(recipeId);
            items.value = reactive(await calcItems(source, ri));
        }
    },
    { immediate: true },
);
```

改成：

```ts
watch(
    [settingStore.getDataSource, () => props.recipeId, retryToken],
    async ([dataSource, recipeId]) => {
        loadError.value = undefined;
        try {
            const source = await dataSource;
            if (recipeId === undefined) {
                items.value = [];
            } else {
                const ri = await source.recipesIngredients(recipeId);
                items.value = reactive(await calcItems(source, ri));
            }
        } catch (err) {
            // 不往上冒泡，否則整個製作介面會被 Page.vue 的錯誤畫面取代。
            // 退回手動輸入，讓這個分頁仍然可用。
            items.value = [];
            inputType.value = 'manully';
            loadError.value = describeError(err, $t);
        }
    },
    { immediate: true },
);
```

**注意**：`inputType` 宣告在（約第 68 行）這個 watch 之前，可以直接用。

- [ ] **Step 3: 模板加錯誤條**

在最外層 `<div style="display: flex; flex-direction: column">` 之後、`<el-form label-width="auto" @submit.prevent>` 之前插入：

```vue
        <BlockLoadError
            v-if="loadError"
            :message="loadError"
            @retry="retryToken++"
        />
```

- [ ] **Step 4: 型別檢查**

Run: `pnpm exec vue-tsc -p tsconfig.app.json --noEmit`
Expected: 只有基準線那 4 個錯誤。

- [ ] **Step 5: 手動驗證**

DevTools Network 切 Offline，進入某個**有素材**的配方（例如任一裝備配方，不要用自訂配方），切到「初期品質」分頁。

Expected：
- 整頁不會變成錯誤畫面
- 分頁頂端出現「載入失敗」條與重試鈕
- 輸入模式自動切到「手動輸入」，且**初期品質輸入框仍可正常打字**
- 恢復網路後按重試 → 素材清單出現、錯誤條消失、「選擇 HQ 素材」選項變成可選

- [ ] **Step 6: 格式化並 Commit**

```bash
pnpm run fmt
git add src/components/designer/tabs/InitialQualitySetting.vue
git commit -m "配方素材載入失敗改為就地提示並退回手動輸入"
```

---

## Task 4: 分析與模擬失敗不再靜默

`Analyzers.vue` 的三個非同步工作各有問題：`runBatchSimulatios` 在 `setTimeout` callback 內被 await，rejection 不經過 Vue，使用者只會看到分析分頁永遠空白、沒有任何訊息；`calcScope` 用 `catch {}` 完全吞掉；`runSimulateDetail` 完全沒有 catch。另外 `Designer.vue` 有三處 `simulate` 呼叫缺 catch。

三個分析工作各自獨立，用**三個**錯誤 ref 而不是一個 —— 用一個的話「模擬成功但範圍計算失敗」會在成功的結果上蓋一條錯誤訊息，是誤導。

**Files:**
- Modify: `src/components/designer/tabs/Analyzers.vue`
- Modify: `src/components/designer/Designer.vue:220,251-257`

**Interfaces:**
- Consumes: `describeError` (Task 1)、`BlockLoadError` (Task 1)
- Produces: 無

- [ ] **Step 1: Analyzers.vue 加 import 與狀態**

這個檔案的 script 內**沒有** `useFluent`（模板的 `$t` 是 fluent-vue 的全域注入），script 內要用就得自己取。import 區加：

```ts
import { useFluent } from 'fluent-vue';
import BlockLoadError from '../BlockLoadError.vue';
import { describeError } from '../errors';
```

`const store = useStore();` 之後加：

```ts
const { $t } = useFluent();
```

`const attributesScope = ref<Scope>();` 附近加：

```ts
// 三個分析工作互相獨立，各自記錄錯誤，避免其中一個失敗時
// 在另一個成功的結果上蓋錯誤訊息
const simulationError = ref<string>();
const scopeError = ref<string>();
const detailError = ref<string>();
```

- [ ] **Step 2: 三個函式各自 catch**

`runBatchSimulatios`（約第 86 行）改成：

```ts
async function runBatchSimulatios(n: number) {
    simulationResult.value = undefined;
    simulationButtonDisabled.value = true;
    simulationError.value = undefined;
    try {
        if (props.collectableShopRefine == undefined) {
            simulationResult.value = await rand_simulation(
                props.initStatus,
                props.actions,
                n,
                options.ignoreErrors,
            );
        } else {
            simulationResult.value = await rand_collectables_simulation(
                props.initStatus,
                props.actions,
                n,
                options.ignoreErrors,
                props.collectableShopRefine,
            );
        }
    } catch (err) {
        // 原本沒有 catch，而呼叫點在 setTimeout 內，rejection 不經過 Vue，
        // 使用者只會看到一片空白、毫無提示。
        simulationError.value = describeError(err, $t);
    } finally {
        simulationButtonDisabled.value = false;
    }
}
```

`calcScope`（約第 110 行）改成：

```ts
async function calcScope() {
    scopeError.value = undefined;
    try {
        attributesScope.value = await calc_attributes_scope(
            props.initStatus,
            props.actions,
        );
    } catch (err) {
        // 原本是 `catch {}`，完全吞掉，失敗與「還沒算」無從分辨
        scopeError.value = describeError(err, $t);
    }
}
```

`runSimulateDetail`（第 119 行起）改成把既有主體整段包進 try/catch。骨架如下，`（既有主體原樣搬進來，只往內縮排一層，一行都不要改邏輯）` 那個位置放的是原本從 `const result = await simulateDetail(...)` 開始到函式結尾的所有內容：

```ts
async function runSimulateDetail() {
    detailError.value = undefined;
    try {
        // （既有主體原樣搬進來，只往內縮排一層，一行都不要改邏輯）
    } catch (err) {
        detailError.value = describeError(err, $t);
    }
}
```

搬完後跑一次 `pnpm run fmt`，讓 prettier 把縮排整平，再目視確認邏輯沒有被動到。

- [ ] **Step 3: 模板加三個錯誤條**

三個錯誤條各自緊鄰它所描述的那顆按鈕，都放在該按鈕所在 `</el-form-item>` 的**正下方**。

1. 包著 `<el-dropdown ... @click="runBatchSimulatios(defaultSimulationCounts)">` 的那個 `</el-form-item>` 之後（在 `<Transition>` 之前）：

```vue
        <el-form-item v-if="simulationError">
            <BlockLoadError
                :message="simulationError"
                @retry="runBatchSimulatios(defaultSimulationCounts)"
            />
        </el-form-item>
```

2. 含 `<el-button @click="calcScope">`（第 315 行）的那個 `</el-form-item>` 之後：

```vue
        <el-form-item v-if="scopeError">
            <BlockLoadError :message="scopeError" @retry="calcScope()" />
        </el-form-item>
```

3. 含 `<el-button @click="runSimulateDetail">`（第 344 行）的那個 `</el-form-item>` 之後：

```vue
        <el-form-item v-if="detailError">
            <BlockLoadError
                :message="detailError"
                @retry="runSimulateDetail()"
            />
        </el-form-item>
```

- [ ] **Step 4: Designer.vue 補三處 simulate catch**

import 區把 `ElMessage` 加進 element-plus 的具名 import：

```ts
import {
    ElScrollbar,
    ElAlert,
    ElTabs,
    ElTabPane,
    ElMessage,
} from 'element-plus';
```

並加：

```ts
import { describeError } from './errors';
```

第 220 行：

```ts
simulate(initStatus.value, []).then(v => (activeRst.value = v));
```

改成：

```ts
simulate(initStatus.value, [])
    .then(v => (activeRst.value = v))
    .catch(err => ElMessage.error(describeError(err, $t)));
```

第 251-257 行那兩個 watch 改成：

```ts
// Saved Sequence
watch(initStatus, async newInitStatus => {
    // re-simulate activeSeq
    try {
        activeRst.value = await simulate(newInitStatus, actions.value);
    } catch (err) {
        // 刻意不清空 activeRst：清掉會讓狀態列整個變空白，
        // 保留上一次的結果再配一則提示比較不會讓人以為是自己弄壞的
        ElMessage.error(describeError(err, $t));
    }
});
watch(actions, async a => {
    try {
        activeRst.value = await simulate(initStatus.value, a);
    } catch (err) {
        ElMessage.error(describeError(err, $t));
    }
});
```

- [ ] **Step 5: 型別檢查**

Run: `pnpm exec vue-tsc -p tsconfig.app.json --noEmit`
Expected: 只有基準線那 4 個錯誤。

- [ ] **Step 6: 手動驗證**

進入任一配方，排幾個技能，切到「分析」分頁確認統計圖正常出現（**確認沒有破壞正常路徑**）。錯誤路徑不易人為觸發，改用暫時性注入驗證：在 `runBatchSimulatios` 的 `try {` 下一行暫時插入 `throw new Error('injected');`，重跑分析。

Expected：分析分頁出現「載入失敗 / injected」錯誤條與重試鈕，其他分頁不受影響，整頁**不會**變錯誤畫面。驗證完**務必移除**那行注入的 `throw`，並重跑一次確認統計圖恢復正常。

- [ ] **Step 7: 格式化並 Commit**

```bash
pnpm run fmt
git add src/components/designer/tabs/Analyzers.vue src/components/designer/Designer.vue
git commit -m "分析與模擬失敗改為就地提示與重試，移除靜默吞錯"
```

---

## Task 5: 把同步等級帶進 designer store

等級同步配方（宇宙探索 A 級以下，`ConfirmDialog.vue:64-70` 的判定）的 `job_level` 就是使用者自己在對話框填的同步等級（`ConfirmDialog.vue:89-101`）。攔阻面板需要知道這件事才能給出正確的引導。順帶把 `common.ts` 的 `selectRecipe` 從 9 個位置參數改成 options 物件 —— 再加第 10 個位置參數很容易傳錯位。

**Files:**
- Modify: `src/stores/designer.ts:28-38,64-76`
- Modify: `src/components/recipe-manager/common.ts:100-122`
- Modify: `src/components/recipe-manager/ConfirmDialog.vue:158-179`
- Modify: `src/components/recipe-manager/CustomizeRecipe.vue:132-141`

**Interfaces:**
- Consumes: 無
- Produces:
  - `designerStore.content.syncLevel?: number` —— Task 7 讀取
  - `selectRecipe(opts: SelectRecipeOptions)` 新簽名，欄位見下

- [ ] **Step 1: designer store 加欄位**

`src/stores/designer.ts` 的 `state.content` 型別（第 28-38 行）在 `stellarSteadyHandCount: number;` 之後加：

```ts
            // 等級同步配方（宇宙探索）使用者當初填入的同步等級。
            // 只用於顯示引導文案，不用它重建配方。
            syncLevel?: number;
```

`actions.selectRecipe` 的 payload 型別（第 64-74 行）同樣在 `stellarSteadyHandCount: number;` 之後加：

```ts
            syncLevel?: number;
```

`selectRecipe` 的實作是 `this.content = payload;`，不需要改。

- [ ] **Step 2: common.ts 改成 options 物件**

把 `src/components/recipe-manager/common.ts` 第 100-122 行整段：

```ts
export const selectRecipe = (
    recipe: Recipe,
    recipeId: number | undefined,
    materialQualityFactor: number,
    requirements: RecipeRequirements,
    collectability: CollectablesShopRefine | undefined,
    item: Item,
    craftType: string,
    simulatorMode: boolean,
    stellarSteadyHandCount: number,
) => {
    designerStore.selectRecipe({
        job: craftTypeTojobs(craftType),
        item,
        recipe,
        recipeId,
        materialQualityFactor,
        requirements,
        collectability,
        simulatorMode,
        stellarSteadyHandCount,
    });
};
```

換成：

```ts
export interface SelectRecipeOptions {
    recipe: Recipe;
    recipeId?: number;
    materialQualityFactor: number;
    requirements: RecipeRequirements;
    collectability?: CollectablesShopRefine;
    item: Item;
    craftType: string;
    simulatorMode: boolean;
    stellarSteadyHandCount: number;
    // 等級同步配方（宇宙探索）使用者填入的同步等級
    syncLevel?: number;
}

export const selectRecipe = (opts: SelectRecipeOptions) => {
    designerStore.selectRecipe({
        job: craftTypeTojobs(opts.craftType),
        item: opts.item,
        recipe: opts.recipe,
        recipeId: opts.recipeId,
        materialQualityFactor: opts.materialQualityFactor,
        requirements: opts.requirements,
        collectability: opts.collectability,
        simulatorMode: opts.simulatorMode,
        stellarSteadyHandCount: opts.stellarSteadyHandCount,
        syncLevel: opts.syncLevel,
    });
};
```

- [ ] **Step 3: ConfirmDialog.vue 改呼叫並傳 syncLevel**

`src/components/recipe-manager/ConfirmDialog.vue` 第 166-176 行：

```ts
    selectRecipe(
        recipe.value,
        props.recipeInfo.id,
        props.recipeInfo.material_quality_factor,
        props.recipeInfo,
        props.collectability,
        itemInfo,
        props.recipeInfo.job,
        mode == 'simulator',
        props.stellarSteadyHandCount,
    );
```

改成：

```ts
    selectRecipe({
        recipe: recipe.value,
        recipeId: props.recipeInfo.id,
        materialQualityFactor: props.recipeInfo.material_quality_factor,
        requirements: props.recipeInfo,
        collectability: props.collectability,
        item: itemInfo,
        craftType: props.recipeInfo.job,
        simulatorMode: mode == 'simulator',
        stellarSteadyHandCount: props.stellarSteadyHandCount,
        syncLevel:
            isDynRecipe.value && dynRecipeLevel.value != undefined
                ? dynRecipeLevel.value
                : undefined,
    });
```

**注意**：`syncLevel` 的判定條件與同一函式第 160 行既有的 `if (isDynRecipe.value && dynRecipeLevel.value != undefined)` 完全一致，兩者必須同進同退。

- [ ] **Step 4: CustomizeRecipe.vue 改呼叫**

`src/components/recipe-manager/CustomizeRecipe.vue` 第 132-141 行：

```ts
    selectRecipe(
        customRecipe.value,
        undefined,
        0,
        requirements,
        undefined,
        itemInfo,
        '',
        simulatorMode,
        3,
    );
```

改成：

```ts
    selectRecipe({
        recipe: customRecipe.value,
        materialQualityFactor: 0,
        requirements,
        item: itemInfo,
        craftType: '',
        simulatorMode,
        stellarSteadyHandCount: 3,
    });
```

自訂配方不是同步配方，不傳 `syncLevel`；`recipeId` 與 `collectability` 原本傳 `undefined`，改成 optional 後直接省略。

- [ ] **Step 5: 確認沒有漏掉的呼叫點**

Run: `grep -rn "selectRecipe(" src/ | grep -v "designerStore.selectRecipe\|selectRecipe(opts\|function selectRecipe\|selectRecipeRow\|selectRecipeById"`
Expected: 只列出 `ConfirmDialog.vue` 與 `CustomizeRecipe.vue` 兩處，且都已改成物件形式。

- [ ] **Step 6: 型別檢查**

Run: `pnpm exec vue-tsc -p tsconfig.app.json --noEmit`
Expected: 只有基準線那 4 個錯誤。這一步是本 task 最重要的驗證 —— 位置參數改物件若有漏改，型別檢查一定會抓到。

- [ ] **Step 7: 手動驗證**

- 從配方檢索選一個普通配方進入製作介面 → 正常
- 從「自定義配方」頁建一個配方進入 → 正常
- 選一個宇宙探索的等級同步配方、填入同步等級進入 → 正常，且 DevTools console 執行檢查：配方進入後在 Vue devtools 看 designer store 的 `content.syncLevel` 應等於剛才填的值

- [ ] **Step 8: 格式化並 Commit**

```bash
pnpm run fmt
git add src/stores/designer.ts src/components/recipe-manager/common.ts src/components/recipe-manager/ConfirmDialog.vue src/components/recipe-manager/CustomizeRecipe.vue
git commit -m "記錄配方的同步等級，selectRecipe 改為 options 物件"
```

---

## Task 6: 等級不足攔阻面板元件

純呈現元件，不碰 store、不碰資料源、不碰路由以外的副作用。此 task 結束時還沒有使用者。

**Files:**
- Create: `src/components/designer/LevelRequirementPanel.vue`

**Interfaces:**
- Consumes: `choiceGearsetDisplayName`、`GearsetsRow`（`@/libs/Gearsets`）
- Produces: `LevelRequirementPanel` 元件 —— Task 7、8 使用
  - Props: `need: number`、`have: number`、`gearsetName: string`、`gearsets?: GearsetsRow[]`、`gearsetId?: number`、`syncLevel?: number`
  - Emits: `selectGearset(id: number)`、`applyLevel(level: number)`

**刻意不用 `defineModel`**：`gearsets` / `gearsetId` 對 Simulator 是不傳的，`defineModel<number>('gearsetId')` 的型別會是 `number | undefined`，而 Designer 那邊要綁的是 `Ref<number>` —— v-model 的雙向檢查會因為「不能把 undefined 賦給 number」而報型別錯。改用一般 prop 進、emit 出就沒有這個問題。

- [ ] **Step 1: 建立檔案**

AGPL 標頭從 `src/components/designer/Page.vue` 開頭 17 行複製，年份 2026。

```vue
<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import {
    ElButton,
    ElInputNumber,
    ElOption,
    ElResult,
    ElSelect,
    ElText,
} from 'element-plus';
import { useRouter } from 'vue-router';
import { useFluent } from 'fluent-vue';
import { choiceGearsetDisplayName, GearsetsRow } from '@/libs/Gearsets';

const props = defineProps<{
    // 配方的 job_level
    need: number;
    // 目前使用中的配裝特職等級
    have: number;
    // 目前使用中的配裝顯示名稱
    gearsetName: string;
    // 可切換的相容配裝清單。Simulator 沒有配裝選擇狀態，不傳這個 prop，
    // 屆時下拉整塊不顯示。
    gearsets?: GearsetsRow[];
    // 目前選中的配裝 id，與 gearsets 同進同退
    gearsetId?: number;
    // 等級同步配方時，使用者當初填入的同步等級
    syncLevel?: number;
}>();

const emit = defineEmits<{
    (e: 'selectGearset', id: number): void;
    (e: 'applyLevel', level: number): void;
}>();

// el-select 需要可寫的綁定，但選擇權在父層，所以寫入一律轉成 emit
const selectedGearsetId = computed({
    get: () => props.gearsetId,
    set: v => {
        if (v != undefined) emit('selectGearset', v);
    },
});

const router = useRouter();
const { $t } = useFluent();

// 遊戲規則：配方等級最多可高於玩家等級 5 級。
// 與 src-libs/src/lib.rs 的 `recipe.job_level > attrs.level + 5` 同一條規則，
// 兩邊改動必須同步。
const LEVEL_TOLERANCE = 5;

// 玩家實際需要達到的最低等級
const requiredLevel = computed(() => props.need - LEVEL_TOLERANCE);

// 輸入框的暫存值，按下「套用」才送出，避免每打一個字就寫一次 store
const draftLevel = ref(props.have);
watch(
    () => props.have,
    v => (draftLevel.value = v),
);

const gearsetOptions = computed(() =>
    props.gearsets?.map(row => ({
        id: row.id,
        label: choiceGearsetDisplayName(row),
        level: row.value.level,
        meets: props.need <= row.value.level + LEVEL_TOLERANCE,
    })),
);
</script>

<template>
    <div class="level-gate">
        <el-result icon="warning" :title="$t('level-not-enough')">
            <template #sub-title>
                <div>
                    {{ $t('level-requirement', { need: requiredLevel }) }}
                </div>
                <div>
                    {{ $t('level-current', { gearset: gearsetName, have }) }}
                </div>
            </template>
            <template #extra>
                <div class="level-gate-body">
                    <div v-if="gearsetOptions != undefined" class="level-gate-row">
                        <span>{{ $t('use-gearset') }}</span>
                        <el-select
                            v-model="selectedGearsetId"
                            style="width: 240px"
                        >
                            <el-option
                                v-for="opt in gearsetOptions"
                                :key="opt.id"
                                :value="opt.id"
                                :label="`${opt.label} Lv.${opt.level}`"
                            >
                                <span>{{ opt.label }}</span>
                                <span class="level-gate-option-level">
                                    Lv.{{ opt.level }}
                                    {{ opt.meets ? '✓' : '✗' }}
                                </span>
                            </el-option>
                        </el-select>
                    </div>

                    <div class="level-gate-row">
                        <span>{{ $t('or-set-level') }}</span>
                        <el-input-number
                            v-model="draftLevel"
                            :min="1"
                            :max="100"
                            :step="1"
                            step-strictly
                            value-on-clear="min"
                            style="width: 140px"
                        />
                        <el-button
                            type="primary"
                            :disabled="draftLevel == have"
                            @click="emit('applyLevel', draftLevel)"
                        >
                            {{ $t('apply') }}
                        </el-button>
                    </div>
                    <el-text size="small" type="info">
                        {{ $t('apply-hint', { gearset: gearsetName }) }}
                    </el-text>

                    <el-text v-if="syncLevel != undefined" type="warning">
                        {{ $t('sync-recipe-hint', { syncLevel }) }}
                    </el-text>

                    <div class="level-gate-row">
                        <el-button @click="router.push({ name: 'gearsets' })">
                            {{ $t('goto-gearsets') }}
                        </el-button>
                        <el-button
                            :type="syncLevel != undefined ? 'primary' : ''"
                            @click="router.push({ name: 'recipe' })"
                        >
                            {{ $t('reselect-recipe') }}
                        </el-button>
                    </div>
                </div>
            </template>
        </el-result>
    </div>
</template>

<style scoped>
.level-gate {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.level-gate-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
}

.level-gate-row {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
}

.level-gate-option-level {
    float: right;
    color: var(--el-text-color-secondary);
}
</style>

<fluent locale="zh-CN">
level-not-enough = 特职等级不足
level-requirement = 此配方需要特职等级 Lv.{ $need } 以上
level-current = 当前装备配置「{ $gearset }」为 Lv.{ $have }
use-gearset = 使用装备配置
or-set-level = 或直接改等级
apply = 应用
apply-hint = 将更新装备配置「{ $gearset }」的特职等级
sync-recipe-hint = 这是一个等级同步配方，Lv.{ $syncLevel } 是您在选择配方时填入的，可回配方页改填较低的值
goto-gearsets = 前往装备配置
reselect-recipe = 重选配方
</fluent>

<fluent locale="zh-TW">
level-not-enough = 特職等級不足
level-requirement = 此配方需要特職等級 Lv.{ $need } 以上
level-current = 目前配裝「{ $gearset }」為 Lv.{ $have }
use-gearset = 使用配裝
or-set-level = 或直接改等級
apply = 套用
apply-hint = 將更新配裝「{ $gearset }」的特職等級
sync-recipe-hint = 這是一個等級同步配方，Lv.{ $syncLevel } 是您在選擇配方時填入的，可回配方頁改填較低的值
goto-gearsets = 前往配裝頁
reselect-recipe = 重選配方
</fluent>

<fluent locale="en-US">
level-not-enough = Class level too low
level-requirement = This recipe requires class level Lv.{ $need } or above
level-current = Current gearset "{ $gearset }" is Lv.{ $have }
use-gearset = Use gearset
or-set-level = Or set level directly
apply = Apply
apply-hint = This will update the class level of gearset "{ $gearset }"
sync-recipe-hint = This is a level-synced recipe. Lv.{ $syncLevel } is the value you entered when selecting the recipe; you can go back and enter a lower one.
goto-gearsets = Go to gearsets
reselect-recipe = Choose another recipe
</fluent>

<fluent locale="ja-JP">
level-not-enough = クラスレベルが不足しています
level-requirement = このレシピはクラスレベル Lv.{ $need } 以上が必要です
level-current = 現在の装備セット「{ $gearset }」は Lv.{ $have } です
use-gearset = 装備セット
or-set-level = またはレベルを直接変更
apply = 適用
apply-hint = 装備セット「{ $gearset }」のクラスレベルを更新します
sync-recipe-hint = これはレベルsyncレシピです。Lv.{ $syncLevel } はレシピ選択時に入力した値です。レシピ画面に戻って低い値を入力できます。
goto-gearsets = 装備セットへ
reselect-recipe = レシピを選び直す
</fluent>
```

- [ ] **Step 2: 型別檢查**

Run: `pnpm exec vue-tsc -p tsconfig.app.json --noEmit`
Expected: 只有基準線那 4 個錯誤。

- [ ] **Step 3: 格式化並 Commit**

```bash
pnpm run fmt
git add src/components/designer/LevelRequirementPanel.vue
git commit -m "新增等級不足攔阻面板元件"
```

---

## Task 7: Designer 接上攔阻面板

這是本次改善的核心。三件事：前置檢查與 clamp、模板 `v-if` 分支、修 `gearsetsStore.$subscribe` 會覆蓋使用者選擇的問題。

**極重要**：`activeSeq`（使用者排的技能序列）必須留在 `Designer.vue` 的 setup 內，不可搬進被 `v-if` 包住的地方。Designer 本身不會被卸載，序列因此在攔阻期間仍存活，使用者修好等級後原樣回來 —— 這正是這次改善相對「整頁錯誤 + 重新整理」最大的價值。

**Files:**
- Modify: `src/components/designer/Designer.vue`

**Interfaces:**
- Consumes: `LevelRequirementPanel` (Task 6)、`designerStore.content.syncLevel` (Task 5)
- Produces: 無

- [ ] **Step 1: 加 import**

```ts
import LevelRequirementPanel from './LevelRequirementPanel.vue';
```

把既有的 `import { GearsetsRow } from '@/libs/Gearsets';` 改成：

```ts
import { choiceGearsetDisplayName, GearsetsRow } from '@/libs/Gearsets';
```

同時確認 `Attributes` 已在 `@/libs/Craft` 的具名 import 中（目前有）。

- [ ] **Step 2: 加入前置檢查與 clamp 函式**

在 `const enhancedAttributes = computed<Attributes>(...)` 定義之後（約第 140 行）插入：

```ts
// 遊戲規則：配方等級最多可高於玩家等級 5 級。
// 與 src-libs/src/lib.rs 的 `recipe.job_level > attrs.level + 5` 同一條規則，
// 兩邊改動必須同步。
const LEVEL_TOLERANCE = 5;

// 等級不足時模板改渲染攔阻面板，主體整塊不掛載
const levelShortfall = computed(() => {
    const need = props.recipe.job_level;
    const have = enhancedAttributes.value.level;
    return need > have + LEVEL_TOLERANCE ? { need, have } : undefined;
});

// 等級不足時模板不會渲染主體，這裡把等級墊高只是為了讓 setup 頂層的 await 與
// 下方的 watch 不致拋錯——那會被 Page.vue 的 onErrorCaptured 接走，整頁換成
// 錯誤畫面。使用者修正等級後 watch 會以真實屬性重算。
function attributesForSimulation(
    attrs: Attributes,
    recipe: Recipe,
): Attributes {
    const minLevel = recipe.job_level - LEVEL_TOLERANCE;
    return attrs.level >= minLevel ? attrs : { ...attrs, level: minLevel };
}
```

- [ ] **Step 3: 兩處 newStatus 套用 clamp**

第 195-212 行那段改成：

```ts
// Simulation Input
const initQuality = ref(0);
const initStatus = ref<Status>({
    ...(await newStatus(
        attributesForSimulation(enhancedAttributes.value, props.recipe),
        props.recipe,
        store.content?.stellarSteadyHandCount ?? 0,
    )),
    quality: initQuality.value,
});
watch([props, enhancedAttributes, initQuality], async ([p, ea, iq]) => {
    initStatus.value = {
        ...(await newStatus(
            attributesForSimulation(ea, p.recipe),
            p.recipe,
            store.content?.stellarSteadyHandCount ?? 0,
        )),
        quality: iq,
    };
});
```

- [ ] **Step 4: 修 `$subscribe` 覆蓋使用者選擇的問題**

第 99-102 行：

```ts
// Gearsets changed
gearsetsStore.$subscribe((_, state) => {
    selectDefaultGearset();
});
```

改成：

```ts
// Gearsets changed
gearsetsStore.$subscribe(() => {
    // 只有在目前選中的配裝已不存在／不再相容時才重選。
    // 原本是無條件呼叫 selectDefaultGearset()，會讓使用者在等級不足面板上
    // 按「套用」改等級（寫入 store）時，剛選好的配裝被打回預設，
    // 面板因此永遠關不掉。
    const current = selectedGearsetRow.value;
    if (
        current == undefined ||
        (!props.isCustomRecipe &&
            !current.compatibleJobs.includes(displayJob.value))
    ) {
        selectDefaultGearset();
    }
});
```

**不要改 `selectDefaultGearset` 本身**。第 104-119 行那個 watch 對「換配方」另有 `id == 0` 的重選邏輯，那是不同意圖（換配方時優先挑職業專屬配裝），必須維持原樣。

- [ ] **Step 5: 加面板需要的 computed 與 handler**

在 `attributionAlert` computed 之後插入：

```ts
// 攔阻面板用：可切換的相容配裝清單
const compatibleGearsets = computed<GearsetsRow[]>(() =>
    props.isCustomRecipe
        ? gearsetsStore.gearsets
        : gearsetsStore.gearsets.filter(v =>
              v.compatibleJobs.includes(displayJob.value),
          ),
);
const currentGearsetName = computed(() =>
    choiceGearsetDisplayName(selectedGearsetRow.value ?? gearsetsStore.default),
);

// 攔阻面板的「套用」：直接改寫 gearsets store 中該列的等級。
// 這會觸發上方的 $subscribe，但那裡已加了「仍相容就不動」的判斷，
// gearsetId 不會被重設，enhancedAttributes 因此重算、面板隨即消失。
function applyGearsetLevel(level: number) {
    const row = selectedGearsetRow.value ?? gearsetsStore.default;
    row.value.level = level;
}
```

- [ ] **Step 6: 模板加 v-if 分支**

把 `<template>` 內最外層的 `<div class="main-page">` 改成 `<div v-else class="main-page">`，並在它之前插入面板：

```vue
<template>
    <LevelRequirementPanel
        v-if="levelShortfall"
        :need="levelShortfall.need"
        :have="levelShortfall.have"
        :gearset-name="currentGearsetName"
        :gearsets="compatibleGearsets"
        :gearset-id="gearsetId"
        :sync-level="store.content?.syncLevel"
        @select-gearset="(id: number) => (gearsetId = id)"
        @apply-level="applyGearsetLevel"
    />
    <div v-else class="main-page">
        <!-- 以下原有內容一行都不要改 -->
```

`.main-page` 內部的內容**一行都不要動**。

- [ ] **Step 7: 型別檢查**

Run: `pnpm exec vue-tsc -p tsconfig.app.json --noEmit`
Expected: 只有基準線那 4 個錯誤。

- [ ] **Step 8: 手動驗證（本 task 的重點，逐條做完）**

前置：到「裝備屬性」頁，把某個職業（例如木工師）的配裝等級調到 90。

1. 選一個該職業 Lv.96 以上的配方進入製作介面
   → 出現攔阻面板，**不是**整頁錯誤畫面；面板顯示「需要 Lv.9x 以上」與「目前配裝『木工師』為 Lv.90」
2. 在面板的配裝下拉切到「預設」（Lv.100）
   → 面板立刻消失，正常進入製作介面
3. 回上一步，改用「或直接改等級」輸入 100 按「套用」
   → 面板消失；到「裝備屬性」頁確認木工師配裝等級確實變成 100
4. **序列存活測試**：正常進入後排 5 個技能，切到「食藥&裝備」分頁把配裝換成一個低等的
   → 出現攔阻面板；再切回高等配裝 → **剛才那 5 個技能還在**
5. 選一個宇宙探索的等級同步配方，同步等級填得比自己高
   → 面板多顯示一行同步配方說明，「重選配方」是主要（藍色）按鈕
6. 「前往配裝頁」「重選配方」兩個按鈕都能正確跳轉
7. 用一個等級充足的普通配方進入 → **完全看不到面板**，行為與改動前一致

- [ ] **Step 9: 格式化並 Commit**

```bash
pnpm run fmt
git add src/components/designer/Designer.vue
git commit -m "製作介面等級不足改為頁內攔阻面板，可就地切換配裝或調整等級"
```

---

## Task 8: Simulator 接上攔阻面板

`Simulator.vue` 的配裝是 `Page.vue` 算好後以 prop 傳入的，它沒有 `gearsetId` 狀態，因此**不顯示配裝下拉**。但目前 `Page.vue:50-57` 的 `attributes` computed 只回傳 `Attributes`，丟掉了是哪一列配裝，Simulator 無從得知要把新等級寫回哪裡 —— 所以要先調整 `Page.vue`。

**Files:**
- Modify: `src/components/designer/Page.vue:50-57,114-120`
- Modify: `src/components/designer/Simulator.vue`

**Interfaces:**
- Consumes: `LevelRequirementPanel` (Task 6)、`designerStore.content.syncLevel` (Task 5)
- Produces: `Simulator` 元件新增必要 prop `gearsetId: number`

- [ ] **Step 1: Page.vue 的 attributes computed 改回傳 GearsetsRow**

第 50-57 行：

```ts
const attributes = computed(() => {
    const job = designerStore.content?.job;
    if (job == undefined) return gearsetsStore.default.value;
    const gearset = gearsetsStore.gearsets.find((v: GearsetsRow) =>
        v.compatibleJobs.includes(job),
    );
    return (gearset ?? gearsetsStore.default).value;
});
```

改成：

```ts
// 回傳整列而非只有 value：Simulator 的等級不足面板需要知道要把新等級寫回哪一列
const gearset = computed<GearsetsRow>(() => {
    const job = designerStore.content?.job;
    if (job == undefined) return gearsetsStore.default;
    return (
        gearsetsStore.gearsets.find((v: GearsetsRow) =>
            v.compatibleJobs.includes(job),
        ) ?? gearsetsStore.default
    );
});
const attributes = computed(() => gearset.value.value);
```

- [ ] **Step 2: Page.vue 傳 gearsetId 給 Simulator**

第 114-120 行的 `<Simulator ... />` 加一個 prop：

```vue
                :gearset-id="gearset.id"
```

- [ ] **Step 3: Simulator.vue 加 import 與 prop**

import 區加：

```ts
import useGearsetsStore from '@/stores/gearsets';
import { choiceGearsetDisplayName } from '@/libs/Gearsets';
import LevelRequirementPanel from './LevelRequirementPanel.vue';
```

`computed` 已在 vue 的 import 中（目前有）。

props（第 50-55 行）加 `gearsetId`：

```ts
const props = defineProps<{
    recipe: Recipe;
    item: Item;
    attributes: Attributes;
    gearsetId: number;
    collectableShopRefine?: CollectablesShopRefine;
}>();
```

`const store = useStore();` 之後加：

```ts
const gearsetsStore = useGearsetsStore();
```

- [ ] **Step 4: 加入前置檢查、clamp 與 handler**

在 `enhancedAttributes` computed 之後（約第 87 行，`initStatus` 之前）插入：

```ts
// 遊戲規則：配方等級最多可高於玩家等級 5 級。
// 與 src-libs/src/lib.rs 的 `recipe.job_level > attrs.level + 5` 同一條規則，
// 兩邊改動必須同步。
const LEVEL_TOLERANCE = 5;

const levelShortfall = computed(() => {
    const need = props.recipe.job_level;
    const have = enhancedAttributes.value.level;
    return need > have + LEVEL_TOLERANCE ? { need, have } : undefined;
});

// 等級不足時模板不會渲染主體，這裡把等級墊高只是為了讓 setup 頂層的 await 與
// 下方的 watch 不致拋錯——那會被 Page.vue 的 onErrorCaptured 接走，整頁換成
// 錯誤畫面。使用者修正等級後 watch 會以真實屬性重算。
function attributesForSimulation(
    attrs: Attributes,
    recipe: Recipe,
): Attributes {
    const minLevel = recipe.job_level - LEVEL_TOLERANCE;
    return attrs.level >= minLevel ? attrs : { ...attrs, level: minLevel };
}

const currentGearsetRow = computed(
    () =>
        gearsetsStore.gearsets.find(v => v.id == props.gearsetId) ??
        gearsetsStore.default,
);
const currentGearsetName = computed(() =>
    choiceGearsetDisplayName(currentGearsetRow.value),
);

function applyGearsetLevel(level: number) {
    currentGearsetRow.value.value.level = level;
}
```

- [ ] **Step 5: 兩處 newStatus 套用 clamp**

第 88-105 行那段改成：

```ts
const initStatus = ref<Status>({
    ...(await newStatus(
        attributesForSimulation(enhancedAttributes.value, props.recipe),
        props.recipe,
        store.content?.stellarSteadyHandCount ?? 0,
    )),
    quality: 0,
});
watch([props, enhancedAttributes], async ([p, attr]) => {
    initStatus.value = {
        ...(await newStatus(
            attributesForSimulation(attr, p.recipe),
            p.recipe,
            store.content?.stellarSteadyHandCount ?? 0,
        )),
        quality: 0,
    };
});
```

- [ ] **Step 6: 模板加 v-if 分支**

把 `<template>` 內最外層的 `<div class="main-page">` 改成 `<div v-else class="main-page">`，並在它之前插入（**不傳 `gearsets`，所以面板不會顯示配裝下拉**）：

```vue
<template>
    <LevelRequirementPanel
        v-if="levelShortfall"
        :need="levelShortfall.need"
        :have="levelShortfall.have"
        :gearset-name="currentGearsetName"
        :sync-level="store.content?.syncLevel"
        @apply-level="applyGearsetLevel"
    />
    <div v-else class="main-page">
```

`.main-page` 內部一行都不要動。

- [ ] **Step 7: 型別檢查**

Run: `pnpm exec vue-tsc -p tsconfig.app.json --noEmit`
Expected: 只有基準線那 4 個錯誤。若 `Simulator` 缺 `gearsetId` 會在 `Page.vue` 報錯 —— 那代表 Step 2 漏了。

- [ ] **Step 8: 手動驗證**

前置：把某職業配裝等級調到 90。

1. 從配方檢索選一個該職業 Lv.96 以上的配方，用**模擬器模式**進入（`ConfirmDialog` 上的模擬器按鈕）
   → 出現攔阻面板，且**沒有配裝下拉**，只有「或直接改等級」與兩個導覽按鈕
2. 輸入 100 按「套用」 → 面板消失，模擬器正常運作；到裝備屬性頁確認等級已改
3. 用等級充足的配方進模擬器 → 看不到面板，行為與改動前一致

- [ ] **Step 9: 格式化並 Commit**

```bash
pnpm run fmt
git add src/components/designer/Page.vue src/components/designer/Simulator.vue
git commit -m "模擬器模式的等級不足改為頁內攔阻面板"
```

---

## Task 9: 致命錯誤畫面重做

剩下真正不可預期的錯誤（WASM 載入失敗、未知 render 錯誤）仍由 `Page.vue` 的 `onErrorCaptured` 接住。改成：先讓使用者「重試」（清錯誤 + `:key` 遞增重建元件），重試仍失敗才顯示「重新整理」。另外修掉 `WebAssembly` 判斷的 bug、拿掉自貶文案、補齊四語系缺鍵。

**Files:**
- Modify: `src/components/designer/Page.vue`

**Interfaces:**
- Consumes: 無（`describeError` 的 try/catch 邏輯此處內聯，因為還要保留原始字串）
- Produces: 無

- [ ] **Step 1: 改寫 script 的錯誤處理段落**

import 區改成（新增 `ElCollapse`、`ElCollapseItem`、`ElMessage`、`useRouter`）：

```ts
import {
    ElEmpty,
    ElResult,
    ElButton,
    ElText,
    ElSkeleton,
    ElCollapse,
    ElCollapseItem,
    ElMessage,
} from 'element-plus';
```

```ts
import { useRouter } from 'vue-router';
import { isTauri } from '@/libs/Consts';
```

`isTauri` 是 `MacroExporter.vue` 既有的複製實作所用的判斷方式，這裡沿用同一套。

把第 58 行的 `const errorMessage = ref<string>();` 與第 65-76 行的 `onErrorCaptured` / `reload` 整段換成：

```ts
const router = useRouter();

const fatalError = ref<{ message: string; detail: string }>();
// 使用者已經按過一次「重試」；重試仍失敗才建議重新整理
const hasRetried = ref(false);
// 遞增即可強制重建 Designer / Simulator。清 fatalError 只是讓 v-if 切回內容，
// async setup 已經 reject 的那個元件實例必須靠 key 變動才會被換掉，兩者缺一不可。
const contentKey = ref(0);

onErrorCaptured((err: unknown, instance, info) => {
    console.error(err, instance, info);
    const raw = String(err);
    let message: string;
    try {
        message = $t(raw);
    } catch {
        message = raw;
    }
    fatalError.value = {
        message,
        // 保留原始字串與 stack 給使用者複製回報，$t 之後的在地化訊息對 issue 沒有幫助
        detail: [raw, info, (err as Error)?.stack].filter(Boolean).join('\n'),
    };
    return false;
});

// 訊息可能已被 $t 換成在地化字串，原始的 WebAssembly 字樣只保證留在 detail。
// 原本寫的是 `errorMessage.search('WebAssembly') > 0`，String.search 在開頭命中
// 時回 0，`> 0` 為偽——正是最需要這個提示的情況反而不顯示。
const isWasmError = computed(
    () => fatalError.value?.detail.includes('WebAssembly') ?? false,
);

function retry() {
    hasRetried.value = true;
    fatalError.value = undefined;
    contentKey.value++;
}

function reload() {
    window.location.reload();
}

function backToRecipe() {
    router.push({ name: 'recipe' });
}

async function copyDetail() {
    const text = fatalError.value?.detail ?? '';
    try {
        if (isTauri) {
            const { writeText } = await import(
                '@tauri-apps/plugin-clipboard-manager'
            );
            await writeText(text);
        } else {
            const { useClipboard } = await import('@vueuse/core');
            await useClipboard().copy(text);
        }
        ElMessage.success($t('copied'));
    } catch (e) {
        ElMessage.error(String(e));
    }
}
```

第 44 行既有的 `onActivated` 改成：

```ts
onActivated(() => {
    emit('setTitle', designerStore.content?.item.name ?? '');
    // 使用者換了配方回到本頁，重試計數歸零
    hasRetried.value = false;
});
```

- [ ] **Step 2: 改寫模板的錯誤畫面**

第 81-100 行整個 `<el-result>` 換成：

```vue
        <el-result
            v-if="fatalError"
            icon="error"
            :title="$t('error-happens')"
            :sub-title="fatalError.message"
        >
            <template #extra>
                <template v-if="isWasmError">
                    <el-text type="warning">{{ $t('upgrade-browser') }}</el-text>
                    <br />
                </template>
                <div class="error-actions">
                    <el-button type="primary" @click="retry">
                        {{ $t('retry') }}
                    </el-button>
                    <el-button @click="backToRecipe">
                        {{ $t('back-to-recipe') }}
                    </el-button>
                    <el-button v-if="hasRetried" @click="reload">
                        {{ $t('reload') }}
                    </el-button>
                </div>
                <el-text v-if="hasRetried" type="info">
                    {{ $t('report-invite') }}
                </el-text>
                <el-collapse class="error-detail">
                    <el-collapse-item :title="$t('error-detail')">
                        <pre class="error-detail-text">{{
                            fatalError.detail
                        }}</pre>
                        <el-button size="small" @click="copyDetail">
                            {{ $t('copy') }}
                        </el-button>
                    </el-collapse-item>
                </el-collapse>
            </template>
        </el-result>
```

`<Designer ... />` 與 `<Simulator ... />` 各加一個 `:key="contentKey"`。

style 區塊加：

```css
.error-actions {
    display: flex;
    gap: 10px;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 10px;
}

.error-detail {
    margin-top: 15px;
    text-align: left;
}

.error-detail-text {
    white-space: pre-wrap;
    word-break: break-all;
    font-size: 12px;
    color: var(--el-text-color-secondary);
    margin: 0 0 10px;
}
```

- [ ] **Step 3: 改寫四個 `<fluent>` 區塊**

刪掉 `sorry`（「由於技術原因…深表歉意」，重試存在之後這句已不成立）與 `invite`，換成完整的四語系。**四個區塊都要有全部的鍵**，現況 `en-US` 缺 `error-happens`、`ja-JP` 缺 `error-happens` / `not-selected` / `upgrade-browser`，一併補齊。

```
<fluent locale="zh-CN">
error-happens = 加载配方时出现了一些错误
not-selected = 请先选择配方
upgrade-browser = 这个问题似乎是浏览器版本过旧导致的，请尝试更新您的浏览器
retry = 重试
back-to-recipe = 回配方检索
reload = 刷新
error-detail = 错误详情
copy = 复制
copied = 已复制
report-invite = 如果这个问题持续发生，欢迎回报至本项目仓库
</fluent>

<fluent locale="zh-TW">
error-happens = 載入配方時出現了一些錯誤
not-selected = 請先選擇配方
upgrade-browser = 這個問題似乎是瀏覽器版本過舊導致的，請嘗試更新您的瀏覽器
retry = 重試
back-to-recipe = 回配方檢索
reload = 重新整理
error-detail = 錯誤詳情
copy = 複製
copied = 已複製
report-invite = 如果這個問題持續發生，歡迎回報至本專案倉庫
</fluent>

<fluent locale="en-US">
error-happens = Something went wrong while loading the recipe
not-selected = Please select recipe first
upgrade-browser = Please try upgrade your browser
retry = Retry
back-to-recipe = Back to recipes
reload = Reload
error-detail = Error details
copy = Copy
copied = Copied
report-invite = If this keeps happening, please report it to the project repository
</fluent>

<fluent locale="ja-JP">
error-happens = レシピの読み込み中にエラーが発生しました
not-selected = 先にレシピを選択してください
upgrade-browser = ブラウザのバージョンが古い可能性があります。更新をお試しください
retry = 再試行
back-to-recipe = レシピ検索へ
reload = 再ロード
error-detail = エラーの詳細
copy = コピー
copied = コピーしました
report-invite = この問題が続く場合は、リポジトリまでご報告ください
</fluent>
```

- [ ] **Step 4: 型別檢查**

Run: `pnpm exec vue-tsc -p tsconfig.app.json --noEmit`
Expected: 只有基準線那 4 個錯誤。

- [ ] **Step 5: 確認舊鍵沒有殘留參照**

Run: `grep -n "errorMessage\|\$t('sorry')\|\$t('invite')" src/components/designer/Page.vue`
Expected: 沒有任何輸出。

- [ ] **Step 6: 手動驗證**

錯誤路徑要人為注入。在 `src/components/designer/Designer.vue` 的 setup 頂端暫時插入 `throw new Error('injected fatal');`，然後進入任一配方。

1. 出現錯誤畫面，副標顯示 `injected fatal`，有 `[重試] [回配方檢索]`，**沒有**「重新整理」
2. 展開「錯誤詳情」→ 看得到原始訊息與 stack；按「複製」→ 出現「已複製」提示，貼到別處內容正確
3. 按「重試」→ 因為注入的 throw 還在，錯誤再次出現，這次**多了「重新整理」**與「如果這個問題持續發生…」
4. 按「回配方檢索」→ 正確跳回配方頁
5. **移除注入的 throw**，重新選配方進入 → 正常顯示製作介面
6. 移除後，先注入一次讓錯誤畫面出現、按重試、再回配方頁選新配方進入 → 一切正常，且再次觸發錯誤時「重新整理」按鈕**不應該**一開始就在（`hasRetried` 已由 `onActivated` 歸零）

**驗證完務必確認注入的 `throw` 已完全移除**，`git diff src/components/designer/Designer.vue` 應該沒有輸出。

- [ ] **Step 7: 格式化並 Commit**

```bash
pnpm run fmt
git add src/components/designer/Page.vue
git commit -m "錯誤畫面改為可重試並提供返回入口，修正瀏覽器提示的判斷式"
```

---

## 全部完成後的整體驗收

- [ ] `pnpm exec vue-tsc -p tsconfig.app.json --noEmit` 仍只有基準線那 4 個錯誤
- [ ] `pnpm run fmt` 後 `git status` 乾淨
- [ ] `pnpm run build-web` 成功
- [ ] **兩個 build target 都要跑過**：`pnpm run dev-web` 與 `cargo tauri dev`。`Craft.ts` 的錯誤在 tauri（`invoke` reject 字串）與 web（wasm throw）兩邊的 `String(err)` 形狀不同，`Page.vue` 的 `$t(String(err))` 與 `WebAssembly` 判斷兩邊都要實測
- [ ] 四語系各切一次（設定頁切換語言），確認新增字串都有正確翻譯、沒有出現裸露的訊息 id
- [ ] 用一個等級充足的普通配方走完「選配方 → 排技能 → 求解 → 匯出巨集」全程，確認正常路徑完全沒有被破壞
