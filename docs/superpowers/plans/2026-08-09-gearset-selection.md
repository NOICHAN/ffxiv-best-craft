# 製作介面的配裝挑選 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 讓求解器與模擬器兩個模式對同一個配方解析出相同的配裝，並讓使用者能表達「這個職業用哪一列」與「所有職業都用預設」兩種偏好，兩者都被記住。

**Architecture:** 新增 `gearset-selection` store，把「該用哪一列配裝」的規則收斂成它的 `resolveRowFor` getter，兩個模式都呼叫它，不再各自實作。`Page.vue` 那段永遠命中「預設」列的挑選邏輯連同它傳下去的兩個 prop 一併刪除，改由 `Simulator` 自己解析（與 `Designer` 對齊）。`Simulator` 那個被註解掉的配裝／食藥對話框一併解除。偏好透過專案既有的持久化慣例存成 `gearset-selection.json`。

**Tech Stack:** Vue 3 `<script setup>`、Element Plus、Pinia、fluent-vue（四語系 SFC `<fluent>` 區塊）。

設計文件：[docs/superpowers/specs/2026-08-09-gearset-selection-design.md](../specs/2026-08-09-gearset-selection-design.md)

## Global Constraints

- **語言規範**：與使用者對話用繁體中文；程式碼識別字用英文；**程式碼註解用繁體中文**；**Commit 訊息用繁體中文**。
- **Commit 訊息不得加上任何 AI 屬名或署名** —— 不要 `Co-Authored-By: Claude ...`、不要 `🤖 Generated with Claude Code`，PR 內文同理。
- **既有檔案沿用其原本註解風格**。`src-libs/` 的簡體中文註解、`.ftl` 各語系內容不要為了套規則去改寫。
- **新建的 `.ts` 檔案必須以 AGPL-3.0 標頭開頭**，從 `src/stores/recipe-favorites.ts` 複製，年份 `2026`，作者沿用 `Tnze`。
- **i18n 必須四語系齊備**：`zh-CN`、`zh-TW`、`en-US`、`ja-JP`。元件級字串放在該 `.vue` 檔的 `<fluent locale="...">` 區塊，四個區塊都要有。
- **Prettier 設定**：4 空格縮排、單引號、arrow function 單參數不加括號。每個 task 收尾都要跑 `pnpm run fmt`。
- **本次不動 Rust**。`src-libs/`、`src-tauri/`、`src-wasm/`、`src-db/`、`src-server/`、`src-data/` 一行都不改。
- **不動 `gearsets` store 的 schema**（`GearsetsStoreSchema` / `GearsetsRowSchema` / `AttributesSchema` 一個字都不改）。
- **不刪 `Gearset.vue` 裡那組沒人用的 `inherit-from-default` 四語系字串**，維持原樣。
- **食藥加成不持久化**。`attributesEnhancers` 在兩個元件裡都維持普通的 `ref`，
  不要「順手」把它也存起來——食藥是每次製作的臨時決定，改版後清單還會變。
- **本計畫的行號以動手前的檔案為準**。每個 task 的 Step 1 通常會先加 import，
  之後的行號就會往下位移；請用引述的程式碼片段當錨點定位，不要硬套行號。

### 兩個不變式，違反就是 bug

**一、`resolveRowFor` 只能收真正的配方職業，自訂配方傳 `undefined`。**
`Page.vue` 提供的 `displayJobKey` 是 `computed(() => designerStore.content?.job ?? Jobs.Culinarian)`，
自訂配方時它會假裝成烹調師。直接把 `displayJob` 傳進去，自訂配方會靜默套用「烹調師」那一列。
呼叫端一律傳 `props.isCustomRecipe ? undefined : displayJob.value`。

**二、只有使用者主動選擇才寫入 `byJob`。**
元件掛載時的初始解析、換配方時的重新解析、`$subscribe` 守衛觸發的重新解析，
都只更新元件內的 `gearsetId` ref，**不可以**呼叫 `selectionStore.select()`。
自動結果一旦回寫，「這個職業沒選過」的狀態就永遠消失，規則 3 之後再也不會生效。

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

```bash
docker compose -f docker-compose.dev.yml up
```

Vite dev server 在 <http://localhost:5173>，自架資料 API 在 8080。

沒有 Playwright，但可以用系統 Chrome 開 CDP 自行驗證：

```bash
"C:\Program Files\Google\Chrome\Application\chrome.exe" --headless=new \
  --remote-debugging-port=9333 --user-data-dir=<暫存目錄>
```

接著 `http://127.0.0.1:9333/json/list` 取 page target 的 `webSocketDebuggerUrl`，
用 `Runtime.evaluate` / `Page.navigate` 讀 localStorage、模擬操作、reload 比對。
Node v24 有 global `WebSocket`，不需安裝套件。dev build 可直接取得 pinia：
`document.querySelector('#app').__vue_app__.config.globalProperties.$pinia.state.value.<storeId>`

---

## File Structure

新增：

| 檔案 | 責任 |
|---|---|
| `src/stores/gearset-selection.ts` | 偏好狀態（`alwaysUseDefault` / `byJob`）、持久化的 `toJson` / `fromJson`、**唯一**的挑選規則 `resolveRowFor` |

修改：

| 檔案 | 改什麼 |
|---|---|
| `src/App.vue` | 掛上 `gearset-selection.json` |
| `src/components/Gearset.vue` | 「預設」分頁新增 `alwaysUseDefault` 開關與說明 + 2 個 key × 4 語系 |
| `src/components/designer/tabs/AttrEnhSelector.vue` | 開關開啟時停用配裝下拉並顯示提示與就地關閉按鈕 + 2 個 key × 4 語系 |
| `src/components/designer/Designer.vue` | 改呼叫共用 getter；兩個使用者選擇入口寫回記憶 |
| `src/components/designer/Simulator.vue` | 自持 `gearsetId`；解除對話框註解；新增 `isCustomRecipe` prop |
| `src/components/designer/Page.vue` | 刪除 `gearset` / `attributes` computed 與傳給 Simulator 的兩個 prop |

---

## Task 1：新增 `gearset-selection` store

**Files:**
- Create: `src/stores/gearset-selection.ts`

**Interfaces:**
- Consumes: `Jobs`（`@/libs/Craft`）、`GearsetsRow`（`@/libs/Gearsets`）、`useGearsetsStore`（`./gearsets`）
- Produces:
  - `useGearsetSelectionStore()` — default export
  - state：`alwaysUseDefault: boolean`、`byJob: Partial<Record<Jobs, number>>`
  - getter `toJson: string`
  - getter `resolveRowFor: (job: Jobs | undefined) => GearsetsRow`
  - action `fromJson(json: string): void`
  - action `select(job: Jobs | undefined, gearsetId: number): void`
  - action `setAlwaysUseDefault(value: boolean): void`

- [ ] **Step 1：建立檔案**

`src/stores/gearset-selection.ts`：

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

import { defineStore } from 'pinia';
import { Jobs } from '@/libs/Craft';
import { GearsetsRow } from '@/libs/Gearsets';
import useGearsetsStore from './gearsets';

interface GearsetSelectionData {
    alwaysUseDefault: boolean;
    byJob: Partial<Record<Jobs, number>>;
}

const jobValues = Object.values(Jobs) as string[];

export default defineStore('gearset-selection', {
    state: (): GearsetSelectionData => ({
        alwaysUseDefault: false,
        byJob: {},
    }),
    getters: {
        toJson(): string {
            const data: GearsetSelectionData = {
                alwaysUseDefault: this.alwaysUseDefault,
                byJob: this.byJob,
            };
            return JSON.stringify(data);
        },
        // 「這個職業該用哪一列配裝」的唯一真相來源。求解器與模擬器都必須走這裡，
        // 兩邊各自實作正是它們過去會算出不同結果的原因。
        //
        // job 必須是真正的配方職業，自訂配方請傳 undefined。
        // 絕對不要傳 Page.vue 注入的 displayJob——它在自訂配方時會假裝成烹調師
        // （見 Page.vue 的 displayJobKey provide），那個 fallback 只給呈現用途。
        resolveRowFor(): (job: Jobs | undefined) => GearsetsRow {
            return (job: Jobs | undefined) => {
                const gearsets = useGearsetsStore();
                const fallback = gearsets.default;
                // 規則 0：自訂配方沒有職業可對應，一律用預設列
                if (job == undefined) return fallback;
                // 規則 1：使用者在裝備屬性頁選了「所有職業都使用這組屬性」
                if (this.alwaysUseDefault) return fallback;
                // 規則 2：該職業有記憶，且那一列仍存在、且仍相容於此職業。
                // 「仍相容」不可省：使用者可以事後改某列的適配職業或直接刪掉它。
                const rememberedId = this.byJob[job];
                if (rememberedId != undefined) {
                    const row = gearsets.gearsets.find(
                        v => v.id == rememberedId,
                    );
                    if (row != undefined && row.compatibleJobs.includes(job)) {
                        return row;
                    }
                }
                // 規則 3：第一個相容的「非預設」列。i != 0 不可省——第 0 列
                // （預設）的 compatibleJobs 含全部八個職業，不排除就永遠命中它。
                const jobRow = gearsets.gearsets.find(
                    (v, i) => i != 0 && v.compatibleJobs.includes(job),
                );
                // 規則 4：連相容的職業列都沒有就退回預設列
                return jobRow ?? fallback;
            };
        },
    },
    actions: {
        fromJson(json: string) {
            try {
                const parsed = JSON.parse(json) as Partial<GearsetSelectionData>;
                this.alwaysUseDefault = parsed?.alwaysUseDefault === true;
                // 逐欄正規化：壞資料最差只讓記憶失效、退回規則 3，不該讓頁面壞掉。
                const byJob: Partial<Record<Jobs, number>> = {};
                const source = parsed?.byJob;
                if (source != null && typeof source == 'object') {
                    for (const [job, id] of Object.entries(source)) {
                        if (jobValues.includes(job) && typeof id == 'number') {
                            byJob[job as Jobs] = id;
                        }
                    }
                }
                this.byJob = byJob;
            } catch (err) {
                console.error(err);
            }
        },
        // 只在使用者主動選擇配裝時呼叫。
        // 掛載時的初始解析、換配方的重新解析、$subscribe 守衛的重新解析
        // 都不可以走這裡——自動結果一旦回寫，「這個職業沒選過」的狀態就永遠
        // 消失，規則 3 之後再也不會生效，行為看起來像凍結在舊選擇上。
        select(job: Jobs | undefined, gearsetId: number) {
            if (job == undefined) return; // 自訂配方不記憶
            this.byJob[job] = gearsetId;
        },
        setAlwaysUseDefault(value: boolean) {
            this.alwaysUseDefault = value;
        },
    },
});
```

- [ ] **Step 2：型別檢查**

Run: `pnpm exec vue-tsc -p tsconfig.app.json --noEmit`
Expected: 仍是那 4 個基準線錯誤

- [ ] **Step 3：格式化**

Run: `pnpm run fmt`

- [ ] **Step 4：Commit**

```bash
git add src/stores/gearset-selection.ts
git commit -m "新增 gearset-selection store，收斂配裝挑選規則"
```

---

## Task 2：把 store 掛進 `App.vue` 的持久化流程

**Files:**
- Modify: `src/App.vue`

**Interfaces:**
- Consumes: Task 1 的 `useGearsetSelectionStore`、`toJson`、`fromJson`
- Produces: `gearset-selection.json` 這個持久化檔名（web 落 localStorage、Tauri 落 AppData）

- [ ] **Step 1：加 import 與 store 實例**

在既有的 `import useRecipeFavoritesStore from '@/stores/recipe-favorites';` 下一行加：

```ts
import useGearsetSelectionStore from '@/stores/gearset-selection';
```

在既有的 `const recipeFavoritesStore = useRecipeFavoritesStore();` 下一行加：

```ts
const gearsetSelectionStore = useGearsetSelectionStore();
```

- [ ] **Step 2：加進 `loadStorages()`**

把宣告那一串補上一個變數（與既有四個並列）：

```ts
let settingsJson: Promise<string> | string | null,
    gearsetsJson: Promise<string> | string | null,
    designerJson: Promise<string> | string | null,
    recipeFavoritesJson: Promise<string> | string | null,
    gearsetSelectionJson: Promise<string> | string | null;
```

Tauri 分支加：

```ts
gearsetSelectionJson = readTextFile('gearset-selection.json', options);
```

web 分支加：

```ts
gearsetSelectionJson = window.localStorage.getItem('gearset-selection.json');
```

底下那個 `for...of` 的陣列尾端加一項：

```ts
{ dst: gearsetSelectionStore.fromJson, src: gearsetSelectionJson },
```

- [ ] **Step 3：加 `$subscribe`**

在 `onMounted` 內既有四個 `$subscribe` 之後加：

```ts
gearsetSelectionStore.$subscribe(() =>
    writeJson('gearset-selection.json', gearsetSelectionStore.toJson),
);
```

**位置必須在 `await loadStorages()` 之後**（既有註解 `// subscribe only after storage load` 說明了原因：先訂閱會讓載入本身觸發一次寫回）。

- [ ] **Step 4：型別檢查**

Run: `pnpm exec vue-tsc -p tsconfig.app.json --noEmit`
Expected: 仍是那 4 個基準線錯誤

- [ ] **Step 5：手動驗證**

開 <http://localhost:5173/#/>，DevTools Console：

```js
const p = document.querySelector('#app').__vue_app__.config.globalProperties.$pinia;
p.state.value['gearset-selection'].alwaysUseDefault = true;
```

等一秒後執行 `localStorage.getItem('gearset-selection.json')`，
應得到 `{"alwaysUseDefault":true,"byJob":{}}`。F5 後再查 pinia，`alwaysUseDefault` 應仍是 `true`。
驗完把它改回 `false`。

- [ ] **Step 6：格式化並 Commit**

```bash
pnpm run fmt
git add src/App.vue
git commit -m "gearset-selection 接上既有的持久化流程"
```

---

## Task 3：裝備屬性頁的「預設」分頁新增開關

**Files:**
- Modify: `src/components/Gearset.vue`

**Interfaces:**
- Consumes: Task 1 的 `useGearsetSelectionStore`、`alwaysUseDefault`
- Produces: 使用者可切換 `alwaysUseDefault` 的入口（開與關都可）

- [ ] **Step 1：加 import**

`element-plus` 的具名匯入加上 `ElSwitch` 與 `ElText`；並加：

```ts
import useGearsetSelection from '@/stores/gearset-selection';
```

在 `const store = useGearsets();` 下一行加：

```ts
const selection = useGearsetSelection();
```

- [ ] **Step 2：加模板區塊**

在 `<el-form ...>` 開頭、**既有那個 `v-if="!simplify && store.gearsets[index].id != 0"` 的 `<template>` 之後**、
`:label="$t('level')"` 那個 `el-form-item` 之前，插入：

```html
<template v-if="!simplify && store.gearsets[index].id == 0">
    <el-form-item>
        <el-switch
            v-model="selection.alwaysUseDefault"
            :active-text="$t('always-use-default')"
        />
    </el-form-item>
    <el-form-item>
        <el-text size="small" type="info">
            {{ $t('always-use-default-hint') }}
        </el-text>
    </el-form-item>
</template>
```

**`!simplify` 的 gate 不可省**：`AttrEnhSelector.vue` 就是用 `<Gearset ... simplify />` 渲染這個元件的，
少了它，開關會跑進製作介面的配裝對話框裡。

- [ ] **Step 3：四語系字串**

在既有四個 `<fluent>` 區塊各自加入（**不要動既有的 `inherit-from-default`**）：

`zh-CN`：
```
always-use-default = 所有职业都使用这组属性
always-use-default-hint = 开启后，制作界面一律使用这一列。各职业的个别选择会被保留，关闭后重新生效。
```

`zh-TW`：
```
always-use-default = 所有職業都使用這組屬性
always-use-default-hint = 開啟後，製作介面一律使用這一列。各職業的個別選擇會被保留，關閉後重新生效。
```

`en-US`：
```
always-use-default = Use these attributes for every job
always-use-default-hint = While this is on, the crafting screens always use this row. Per-job choices are kept and take effect again when you turn it off.
```

`ja-JP`：
```
always-use-default = すべてのクラスでこの属性を使う
always-use-default-hint = オンの間、製作画面は常にこの行を使用します。クラスごとの選択は保持され、オフにすると再び有効になります。
```

- [ ] **Step 4：型別檢查**

Run: `pnpm exec vue-tsc -p tsconfig.app.json --noEmit`
Expected: 仍是那 4 個基準線錯誤

- [ ] **Step 5：手動驗證**

<http://localhost:5173/#/gearsets>：
- 「預設」分頁看得到開關與說明
- 「木工師」等其他分頁**看不到**開關
- 切開關後 `localStorage.getItem('gearset-selection.json')` 立即反映

- [ ] **Step 6：格式化並 Commit**

```bash
pnpm run fmt
git add src/components/Gearset.vue
git commit -m "裝備屬性頁的預設分頁加上「所有職業都使用這組屬性」開關"
```

---

## Task 4：配裝下拉在開關開啟時停用並提供就地關閉

**Files:**
- Modify: `src/components/designer/tabs/AttrEnhSelector.vue`

**Interfaces:**
- Consumes: Task 1 的 `useGearsetSelectionStore`、`alwaysUseDefault`、`setAlwaysUseDefault`
- Produces: 使用者在製作介面內關掉 `alwaysUseDefault` 的入口（**只能關，不能開**）

- [ ] **Step 1：加 import**

`element-plus` 的具名匯入確認含 `ElButton` 與 `ElText`（缺就補）；並加：

```ts
import useGearsetSelection from '@/stores/gearset-selection';
```

在 `const gearsets = useGearsetsStore();` 下一行加：

```ts
const selection = useGearsetSelection();
```

- [ ] **Step 2：改模板**

把既有的配裝下拉那段（`<el-form-item :label="$t('select-gearset')">` 開始）改成：

```html
<el-form-item :label="$t('select-gearset')">
    <el-select
        v-model="selectedGearset"
        :disabled="selection.alwaysUseDefault"
    >
        <el-option
            v-for="gearset in gearsetsList"
            :key="gearset.id"
            :label="choiceGearsetDisplayName(gearset)"
            :value="gearset.id"
        />
    </el-select>
</el-form-item>
<!--
    開關開啟時停用下拉，但必須在原地給出口——否則使用者得自己想到要離開
    製作介面、走到裝備屬性頁去關掉它。
    刻意不做成「改選配裝就自動關掉開關」：那會連帶讓另外七個職業一起從
    「預設」跳回各自的專屬列，使用者以為只動了一個職業，實際上八個都變了。
-->
<el-form-item v-if="selection.alwaysUseDefault">
    <el-text size="small" type="info">
        {{ $t('gearset-locked-to-default') }}
    </el-text>
    <el-button
        class="item"
        size="small"
        link
        type="primary"
        @click="selection.setAlwaysUseDefault(false)"
    >
        {{ $t('switch-to-per-job-gearset') }}
    </el-button>
</el-form-item>
```

- [ ] **Step 3：四語系字串**

在既有四個 `<fluent>` 區塊各自加入：

`zh-CN`：
```
gearset-locked-to-default = 当前所有职业都使用「默认」配装。
switch-to-per-job-gearset = 改用各职业配装
```

`zh-TW`：
```
gearset-locked-to-default = 目前所有職業都使用「預設」配裝。
switch-to-per-job-gearset = 改用各職業配裝
```

`en-US`：
```
gearset-locked-to-default = Every job is currently using the Default gearset.
switch-to-per-job-gearset = Use per-job gearsets
```

`ja-JP`：
```
gearset-locked-to-default = 現在、すべてのクラスが「デフォルト」ギアセットを使用しています。
switch-to-per-job-gearset = クラスごとのギアセットを使う
```

- [ ] **Step 4：型別檢查、格式化、Commit**

Run: `pnpm exec vue-tsc -p tsconfig.app.json --noEmit`（仍是 4 個基準線錯誤）

```bash
pnpm run fmt
git add src/components/designer/tabs/AttrEnhSelector.vue
git commit -m "配裝下拉在「一律用預設」開啟時停用，並就地提供關閉入口"
```

---

## Task 5：`Designer.vue` 改用共用解析

**Files:**
- Modify: `src/components/designer/Designer.vue`

**Interfaces:**
- Consumes: Task 1 的 `resolveRowFor`、`select`
- Produces: `onUserSelectGearset(id: number): void`、`gearsetIdModel`（寫入即記憶的 computed）

- [ ] **Step 1：加 import 與解析用的 job**

加：

```ts
import useGearsetSelection from '@/stores/gearset-selection';
```

在 `const gearsetsStore = useGearsetsStore();` 下一行加：

```ts
const selectionStore = useGearsetSelection();
```

- [ ] **Step 2：改寫配裝解析區塊**

把從註解 `// 装备属性` 開始、到 `selectDefaultGearset()` 函式結尾（`gearsetId.value = newGearset?.id ?? 0;` 那一行的閉括號）為止的**整段**換成下面這段。
被取代的範圍包含 `gearsetId`、`selectedGearsetRow`、`attributes`、`gearsetsStore.$subscribe`、
`watch([displayJob, ...])`、`selectDefaultGearset` 六個東西，一個都不要留：

```ts
// 装备属性
const gearsetId = ref(0);
const selectedGearsetRow = computed<GearsetsRow | undefined>(() => {
    return gearsetsStore.gearsets.find(v => v.id == gearsetId.value);
});
const attributes = computed<Attributes>(
    () => (selectedGearsetRow.value ?? gearsetsStore.default).value,
);
// 傳給 resolveRowFor 的必須是真正的配方職業。displayJob 在自訂配方時會
// 假裝成烹調師（見 Page.vue 的 displayJobKey provide），直接拿去解析
// 會靜默套用「烹調師」那一列。
const resolveJob = computed(() =>
    props.isCustomRecipe ? undefined : displayJob.value,
);

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
// Recipe changed：換配方就無條件重新解析。
// 這裡不能沿用上面那個「仍相容就不動」的守衛——「預設」列相容全部職業，
// 若目前選的是它，換到另一個職業的配方時守衛會判定仍相容而不重選，
// 新職業的個別記憶就永遠不會生效。
watch([displayJob, () => props.isCustomRecipe], () => selectDefaultGearset(), {
    immediate: true,
});

// 自動解析：只更新元件內的 ref，絕不寫回 store。
function selectDefaultGearset() {
    gearsetId.value = selectionStore.resolveRowFor(resolveJob.value).id;
}

// 使用者主動選擇：這是唯一會寫入記憶的路徑。
function onUserSelectGearset(id: number) {
    gearsetId.value = id;
    selectionStore.select(resolveJob.value, id);
}

// 給 AttrEnhSelector 的 v-model：讀是目前選擇，寫一律視為使用者操作。
const gearsetIdModel = computed<number>({
    get: () => gearsetId.value,
    set: (id: number) => onUserSelectGearset(id),
});
```

- [ ] **Step 3：把兩個使用者選擇入口接上**

模板第 401 行，`LevelRequirementPanel` 的：

```html
@select-gearset="(id: number) => (gearsetId = id)"
```

改成：

```html
@select-gearset="onUserSelectGearset"
```

模板第 493 行，`AttrEnhSelector` 的：

```html
v-model:gearset-id="gearsetId"
```

改成：

```html
v-model:gearset-id="gearsetIdModel"
```

- [ ] **Step 4：型別檢查**

Run: `pnpm exec vue-tsc -p tsconfig.app.json --noEmit`
Expected: 仍是那 4 個基準線錯誤

- [ ] **Step 5：手動驗證（求解器模式）**

先在 <http://localhost:5173/#/gearsets> 把木工師 CP 設 600、預設 CP 設 533。
選一個木工師配方進求解器（**不是**模擬器）：

- 屬性列顯示 CP 600
- 在「食藥&裝備」分頁把配裝改選「預設」→ 屬性列變 533，且
  `localStorage.getItem('gearset-selection.json')` 出現 `"carpenter":0`
- 退出、重新進同一個配方 → 仍是「預設」
- 回裝備屬性頁開啟「所有職業都使用這組屬性」→ 進任何職業的配方都用預設，
  且配裝下拉停用、顯示提示與「改用各職業配裝」按鈕
- 按下該按鈕 → 開關關閉，配裝回到各職業的記憶／規則 3

- [ ] **Step 6：格式化並 Commit**

```bash
pnpm run fmt
git add src/components/designer/Designer.vue
git commit -m "求解器改用共用的配裝解析，使用者選擇會被記住"
```

---

## Task 6：`Simulator.vue` 自持配裝，`Page.vue` 移除挑選邏輯

這兩個檔案**必須在同一個 task 內一起改**：`Simulator` 的 props 一變，`Page` 傳的東西就跟著要變，
拆開會留下一個型別檢查不會過的中間狀態。

**Files:**
- Modify: `src/components/designer/Simulator.vue`
- Modify: `src/components/designer/Page.vue`

**Interfaces:**
- Consumes: Task 1 的 `resolveRowFor`、`select`
- Produces: `Simulator` 的新 props 介面 —— `{ recipe, item, collectableShopRefine?, isCustomRecipe }`
  （移除 `attributes` 與 `gearsetId`）

- [ ] **Step 1：改 `Simulator.vue` 的 props**

把第 53~59 行的 `defineProps` 改成：

```ts
const props = defineProps<{
    recipe: Recipe;
    item: Item;
    collectableShopRefine?: CollectablesShopRefine;
    isCustomRecipe: boolean;
}>();
```

加 import：

```ts
import useGearsetSelection from '@/stores/gearset-selection';
```

在 `const gearsetsStore = useGearsetsStore();` 下一行加：

```ts
const selectionStore = useGearsetSelection();
```

- [ ] **Step 2：`Simulator.vue` 自持 `gearsetId`**

把既有的 `currentGearsetRow` / `currentGearsetName` / `applyGearsetLevel` 那一段
（第 115~127 行）換成下面這整段。**位置很重要**：必須在 `const initStatus = ref<Status>({...await newStatus(...)})`
**之前**，因為 `initStatus` 在 setup 期間就會讀 `enhancedAttributes`。

```ts
// 傳給 resolveRowFor 的必須是真正的配方職業。displayJob 在自訂配方時會
// 假裝成烹調師（見 Page.vue 的 displayJobKey provide），直接拿去解析
// 會靜默套用「烹調師」那一列。
const resolveJob = computed(() =>
    props.isCustomRecipe ? undefined : displayJob.value,
);
// 初始值直接解析出來，setup 期間的 newStatus 才拿得到正確屬性
const gearsetId = ref(selectionStore.resolveRowFor(resolveJob.value).id);
const currentGearsetRow = computed(
    () =>
        gearsetsStore.gearsets.find(
            (v: GearsetsRow) => v.id == gearsetId.value,
        ) ?? gearsetsStore.default,
);
const currentGearsetName = computed(() =>
    choiceGearsetDisplayName(currentGearsetRow.value),
);
const attributes = computed<Attributes>(() => currentGearsetRow.value.value);

// 自動解析：只更新元件內的 ref，絕不寫回 store。
function selectDefaultGearset() {
    gearsetId.value = selectionStore.resolveRowFor(resolveJob.value).id;
}

// 使用者主動選擇：這是唯一會寫入記憶的路徑。
const gearsetIdModel = computed<number>({
    get: () => gearsetId.value,
    set: (id: number) => {
        gearsetId.value = id;
        selectionStore.select(resolveJob.value, id);
    },
});

// Gearsets changed：與 Designer.vue 同樣的守衛。等級不足面板按「套用」會
// 寫入 gearsets store，無條件重選會把剛選好的配裝打回預設，面板因此關不掉。
gearsetsStore.$subscribe(() => {
    const current = gearsetsStore.gearsets.find(v => v.id == gearsetId.value);
    if (
        current == undefined ||
        (!props.isCustomRecipe &&
            !current.compatibleJobs.includes(displayJob.value))
    ) {
        selectDefaultGearset();
    }
});
// Recipe changed：換配方無條件重新解析（理由同 Designer.vue）
watch([displayJob, () => props.isCustomRecipe], () => selectDefaultGearset());

function applyGearsetLevel(level: number) {
    currentGearsetRow.value.value.level = level;
}
```

- [ ] **Step 3：把 `props.attributes` 的用處換成新的 `attributes`**

`Simulator.vue` 內原本讀 `props.attributes` 的地方（`enhancedAttributes` 的
`let { level, craftsmanship, control, craft_points } = props.attributes;`）
改成 `attributes.value`。模板裡 `:attributes="attributes"` 不必改（名字一樣）。

用 `Grep` 確認檔案內**沒有任何 `props.attributes` 或 `props.gearsetId` 殘留**。

- [ ] **Step 4：解除對話框註解**

把第 234~241 行那段註解掉的 `el-dialog` 還原並接上新的 model：

```html
<el-dialog v-model="openAttrEnhSelector" :title="$t('meal-and-potion')">
    <AttrEnhSelector
        v-model="attributesEnhancers"
        v-model:gearset-id="gearsetIdModel"
        :job="isCustomRecipe ? undefined : displayJob"
        :attributes="attributes"
    />
</el-dialog>
```

`meal-and-potion` 四語系已存在於本檔的 `<fluent>` 區塊，不需新增。

- [ ] **Step 5：改 `Page.vue`**

刪掉第 66~75 行的 `gearset` 與 `attributes` 兩個 computed（整段，含註解）。

`<Simulator>` 的 `:attributes="attributes"` 與 `:gearset-id="gearset.id"` 兩行刪掉，改成：

```html
:is-custom-recipe="isCustomRecipe"
```

刪掉因此不再被使用的 import：`useGearsetsStore`、`const gearsetsStore = ...`、
以及型別 `GearsetsRow`（用 `Grep` 確認 `Page.vue` 內確實沒有其他地方用到才刪）。

- [ ] **Step 6：型別檢查**

Run: `pnpm exec vue-tsc -p tsconfig.app.json --noEmit`
Expected: 仍是那 4 個基準線錯誤

- [ ] **Step 7：格式化並 Commit**

```bash
pnpm run fmt
git add src/components/designer/Simulator.vue src/components/designer/Page.vue
git commit -m "模擬器自行解析配裝並恢復配裝與食藥對話框"
```

---

## Task 7：手動驗收

**Files:** 無（純驗證）

前置：在 <http://localhost:5173/#/gearsets> 把各職業的 CP 設成好認的不同值
（預設 500、木工師 501、鍛造師 502 … 烹調師 508），「所有職業都使用這組屬性」保持關閉。

- [ ] **兩模式一致（本設計的核心驗收）**：同一個木工師配方分別用求解器與模擬器開啟，
      屬性列顯示的作業精度／加工精度／CP **完全相同**，且都是 501 而不是 500
- [ ] **自動對應職業**：開金工師配方 → 自動 503；開烹調師配方 → 自動 508。全程零操作
- [ ] **記住個別選擇**：在模擬器把金工師配方的配裝改選「預設」→ 屬性變 500；
      `localStorage.getItem('gearset-selection.json')` 含 `"goldsmith":0`；
      關掉分頁重開 → 金工師配方仍是 500，而木工師配方仍是 501
- [ ] **兩模式共用記憶**：承上，改用求解器開同一個金工師配方 → 也是 500
- [ ] **一律用預設**：裝備屬性頁開啟開關 → 任何職業的配方在兩個模式都顯示 500；
      配裝下拉停用並顯示提示
- [ ] **就地關閉**：在製作介面按「改用各職業配裝」→ 開關關閉，木工師回到 501、
      金工師回到先前記住的 500（記憶沒被清掉）
- [ ] **自訂配方**：`/#/recipe/customize` 建一個自訂配方進模擬器 →
      使用「預設」的 500，**不是**烹調師的 508；且沒有配裝下拉
- [ ] **食藥復活**：模擬器點屬性列 → 對話框開得起來，能選食物／藥水，
      屬性列的數值隨之改變（這在改動前是完全無反應的）
- [ ] **等級不足面板**：把某職業的等級調到低於配方需求 → 面板出現，
      顯示的配裝名稱是實際被解析出來的那一列；按「套用」後面板關閉**且不再跳回來**
      （求解器與模擬器都要驗；這是 `$subscribe` 守衛的回歸測試）
- [ ] **刪除已記住的配裝列**：為木工師選一個自建配裝並記住 → 回裝備屬性頁刪掉那一列 →
      回配方頁 → 乾淨退回 501，Console 無錯誤
- [ ] **改動已記住配裝列的適配職業**：為木工師記住某列 → 把該列的適配職業取消勾選木工師 →
      回配方頁 → 乾淨退回 501
- [ ] **壞資料**：`localStorage.setItem('gearset-selection.json', '{壞掉的')` → F5 →
      頁面正常、行為回到規則 3、Console 有一則 `console.error` 但無未捕捉例外
- [ ] **全新無痕視窗**：所有職業自動對應各自的職業列，Console 無錯誤
- [ ] 全程 Console 沒有新的錯誤或警告

---

## Task 8：收尾

- [ ] `pnpm run fmt`
- [ ] `pnpm exec vue-tsc -p tsconfig.app.json --noEmit` 最終確認仍是那 4 個基準線錯誤
- [ ] 確認 `git status` 乾淨，且**沒有**動到 `src-libs/`、`src-tauri/`、`src-wasm/`、
      `src/stores/gearsets.ts`、`src/libs/Gearsets.ts`
- [ ] 分支 `feat/gearset-selection` 上的提交訊息全部是繁體中文且**不含任何 AI 屬名或署名**
