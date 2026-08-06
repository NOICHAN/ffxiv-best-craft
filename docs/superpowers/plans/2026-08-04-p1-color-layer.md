# P1 色彩層 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把 BestCraft 的淺色與深色兩套配色重做成符合 WCAG AAA 的 CSS token 層，並把遊戲語意色隔離到固定軌道上，使其不受主題背景影響。

**Architecture:** 新增一支 `src/assets/theme.css`，以 `:root` 與 `html.dark` 兩個選擇器覆寫 Element Plus 的根層 CSS 變數，由 `src/App.vue` 的無 scoped `<style>` 匯入。顏色依角色拆成「文字版」（達 7:1）與「填色版」（配深色文字達 7:1），按鈕邊界改由 1px 邊框負責。遊戲語意條改畫在固定軌道 `#3a3f45` 上並加描邊，語意色只需對軌道達 3:1。

**Tech Stack:** Vue 3 SFC、Element Plus（CSS 變數主題）、`@vueuse/core` 的 `useColorMode`（已存在，本期不動）、Node 腳本做對比度驗證。

## Global Constraints

- 只改前端呈現。禁區：全部 Rust crate、`src/datasource/`、`src/libs/` 的 `Craft.ts`/`Solver.ts`/`SolverWorker.ts`/`Analyzer.ts`/`AnalyzerWorker.ts`/`Gearsets.ts`/`Enhancer.ts`、`vite.config.ts`、`docker/`、`docker-compose.dev.yml`、`.github/workflows/`、`versions.json`、`src-tauri/Tauri.toml`、`package.json`。
- `src/App.vue` 已放行，但 `invoke('set_theme')` 所在的 `watchEffect` 不增不減不改參數。
- 不新增／移除任何 `invoke()` 或 wasm 呼叫。
- 任何計算結果、數值、巨集輸出、API 請求形狀都不得改變。
- 不碰 `src/stores/`、`src/router.ts`、`src/libs/Consts.ts`、`src/libs/Utils.ts`。
- 新檔案必須帶 AGPL-3.0 header；註解用繁體中文。
- Commit 訊息用繁體中文，不得有任何 AI 署名。
- 對比度門檻：文字 ≥ 7:1、大字 ≥ 4.5:1、非文字元素 ≥ 3:1。
- 驗證腳本放 scratchpad，不進 repo、不改 `package.json`、不動 CI。
- 完成後執行 `pnpm tsc --noEmit` 必須通過。

## 色票（已求解並驗證通過）

文字角色（淺色 / 深色）：

| Token | 淺色 | 深色 |
|---|---|---|
| `--el-bg-color-page` | `#f7f8fa` | `#0e1013` |
| `--el-bg-color` | `#ffffff` | `#191c20` |
| `--el-text-color-primary` | `#1c1e21` | `#f2f4f6` |
| `--el-text-color-regular` | `#33373d` | `#d3d7dc` |
| `--el-text-color-secondary` | `#51555d` | `#a8aeb6` |
| `--el-text-color-placeholder` | `#6d737b` | `#8d949d` |
| `--el-color-primary` | `#0053aa` | `#57aaff` |
| `--el-color-success` | `#096231` | `#13CE66` |
| `--el-color-warning` | `#754c0f` | `#E6A23C` |
| `--el-color-danger` / `--el-color-error` | `#ac0c0c` | `#f78585` |
| `--el-color-info` | `#53555a` | `#a3a6ab` |
| `--el-border-color` | `#8b9098` | `#666d76` |
| `--tnze-bar-outline` | `#8b9098` | `#9aa1aa` |

填色角色（兩套共用，其上文字一律 `#10131a`）：

| Token | 值 | 備註 |
|---|---|---|
| `--tnze-fill-primary` | `#49a3ff` | 原 `#409EFF` 微調 |
| `--tnze-fill-success` | `#13CE66` | Element Plus 原色不變 |
| `--tnze-fill-warning` | `#E6A23C` | Element Plus 原色不變 |
| `--tnze-fill-danger` | `#f67979` | 原 `#F56C6C` 微調 |
| `--tnze-fill-info` | `#9d9fa4` | 原 `#909399` 微調 |
| `--tnze-on-fill` | `#10131a` | 填色上的文字色 |
| `--tnze-bar-track` | `#3a3f45` | 語意條固定軌道，兩套主題共用 |

## File Structure

| 檔案 | 責任 |
|---|---|
| `src/assets/theme.css`（新增） | 全部 CSS 變數定義，`:root` 為淺色、`html.dark` 為深色。唯一的顏色真相來源。 |
| `src/App.vue`（修改） | 匯入 `theme.css`；把 `watchEffect` 內寫死的背景色改讀變數。 |
| `src/components/designer/DurabilityProgressBar.vue`（修改） | 軌道與描邊改讀變數。 |
| `src/components/designer/StatusBar.vue`（修改） | 進度／品質／CP 條改用填色版與固定軌道。 |
| `src/components/designer/consts.ts`（修改） | 收藏品階級色改讀變數。 |
| scratchpad `palette.mjs` | 對比度驗證腳本，每個任務結束時重跑。 |

---

### Task 1: 建立色彩 token 層

**Files:**
- Create: `src/assets/theme.css`
- Modify: `src/App.vue`（`<style>` 區塊的 `:root`；`watchEffect` 內的 `bgColor` / `bgMicaColor` 指派）
- Verify: scratchpad `palette.mjs`

**Interfaces:**
- Produces: 上表全部 CSS 變數，後續任務一律透過 `var(--…)` 取用，不得再出現裸 hex。

- [ ] **Step 1: 建立 `src/assets/theme.css`**

檔首放 AGPL-3.0 header（從 `src/main.ts` 複製 `//` 註解版，改寫成 `/* */` 形式）。內容：

```css
:root {
    --el-bg-color-page: #f7f8fa;
    --el-bg-color: #ffffff;
    --el-text-color-primary: #1c1e21;
    --el-text-color-regular: #33373d;
    --el-text-color-secondary: #51555d;
    --el-text-color-placeholder: #6d737b;
    --el-color-primary: #0053aa;
    --el-color-success: #096231;
    --el-color-warning: #754c0f;
    --el-color-danger: #ac0c0c;
    --el-color-error: #ac0c0c;
    --el-color-info: #53555a;
    --el-border-color: #8b9098;

    /* 語意條：軌道與描邊 */
    --tnze-bar-track: #3a3f45;
    --tnze-bar-outline: #8b9098;

    /* 填色角色：按鈕、標籤的底色，其上文字用 --tnze-on-fill */
    --tnze-fill-primary: #49a3ff;
    --tnze-fill-success: #13ce66;
    --tnze-fill-warning: #e6a23c;
    --tnze-fill-danger: #f67979;
    --tnze-fill-info: #9d9fa4;
    --tnze-on-fill: #10131a;

    /* 頁面底色，供 App.vue 的 Mica 背景邏輯取用 */
    --tnze-app-bg-light: #f7f8fa;
    --tnze-app-bg-dark: #0e1013;
    --tnze-mica-opaque-light: #ffffff;
    --tnze-mica-opaque-dark: #191c20;
}

html.dark {
    --el-bg-color-page: #0e1013;
    --el-bg-color: #191c20;
    --el-text-color-primary: #f2f4f6;
    --el-text-color-regular: #d3d7dc;
    --el-text-color-secondary: #a8aeb6;
    --el-text-color-placeholder: #8d949d;
    --el-color-primary: #57aaff;
    --el-color-success: #13ce66;
    --el-color-warning: #e6a23c;
    --el-color-danger: #f78585;
    --el-color-error: #f78585;
    --el-color-info: #a3a6ab;
    --el-border-color: #666d76;

    --tnze-bar-outline: #9aa1aa;
}
```

- [ ] **Step 2: 從 App.vue 匯入**

在 `src/App.vue` 的**無 scoped** `<style>` 區塊最上方（`@font-face` 之前）加入：

```css
@import './assets/theme.css';
```

- [ ] **Step 3: 把 App.vue 寫死的背景色改讀變數**

`watchEffect` 內目前是：

```js
if (shouldBeTransparent) {
    bgMicaColor.value = 'transparent';
    bgColor.value = isDark ? '#2e2e2e' : '#FFFFFF';
} else {
    bgMicaColor.value = 'var(--el-bg-color)';
    bgColor.value = isDark ? '#242424' : 'var(--el-bg-color-page)';
}
```

改為（**只改這四行的色值來源，`invoke('set_theme')` 與 `shouldBeTransparent` 的取得方式完全不動**）：

```js
if (shouldBeTransparent) {
    bgMicaColor.value = 'transparent';
    bgColor.value = isDark
        ? 'var(--tnze-mica-opaque-dark)'
        : 'var(--tnze-mica-opaque-light)';
} else {
    bgMicaColor.value = 'var(--el-bg-color)';
    bgColor.value = isDark
        ? 'var(--tnze-app-bg-dark)'
        : 'var(--tnze-app-bg-light)';
}
```

- [ ] **Step 4: 跑驗證腳本**

Run: `node "C:/Users/Noi/AppData/Local/Temp/claude/c--project-private-project-ffxiv-best-craft/60c3572d-6106-42a1-aa92-a15cf7018df4/scratchpad/palette.mjs"`
Expected: 最後一行 `✅ 全部通過`

- [ ] **Step 5: 型別檢查與目視**

Run: `pnpm tsc --noEmit`（需先有 `pkg-wasm/`；容器內已具備）
Expected: 無錯誤

在 `http://localhost:5173` 切換設定頁的「淺色／深色」，確認：整站文字清晰、沒有出現純黑或純白的突兀色塊、側邊欄與主區塊仍有層次。

- [ ] **Step 6: Commit**

```bash
git add src/assets/theme.css src/App.vue
git commit -m "新增 AAA 對比度色彩 token 層"
```

---

### Task 2: 按鈕與標籤改用填色角色

**Files:**
- Modify: `src/assets/theme.css`（追加元件層覆寫）

**Interfaces:**
- Consumes: Task 1 的 `--tnze-fill-*`、`--tnze-on-fill`、`--el-border-color`
- Produces: 實心按鈕與標籤的最終外觀規則，Task 3 不依賴此項

- [ ] **Step 1: 追加按鈕覆寫規則**

在 `src/assets/theme.css` 末尾加入。Element Plus 的實心按鈕以 `--el-button-bg-color` / `--el-button-text-color` / `--el-button-border-color` 驅動：

```css
/* 實心按鈕：鮮豔填色 + 深色文字；邊界由 1px 邊框負責，
   因為「配深字達 7:1」與「對白底達 3:1」在數學上互斥 */
.el-button--primary {
    --el-button-bg-color: var(--tnze-fill-primary);
    --el-button-text-color: var(--tnze-on-fill);
    --el-button-border-color: var(--el-border-color);
    --el-button-hover-text-color: var(--tnze-on-fill);
    --el-button-active-text-color: var(--tnze-on-fill);
}
.el-button--success {
    --el-button-bg-color: var(--tnze-fill-success);
    --el-button-text-color: var(--tnze-on-fill);
    --el-button-border-color: var(--el-border-color);
    --el-button-hover-text-color: var(--tnze-on-fill);
    --el-button-active-text-color: var(--tnze-on-fill);
}
.el-button--warning {
    --el-button-bg-color: var(--tnze-fill-warning);
    --el-button-text-color: var(--tnze-on-fill);
    --el-button-border-color: var(--el-border-color);
    --el-button-hover-text-color: var(--tnze-on-fill);
    --el-button-active-text-color: var(--tnze-on-fill);
}
.el-button--danger {
    --el-button-bg-color: var(--tnze-fill-danger);
    --el-button-text-color: var(--tnze-on-fill);
    --el-button-border-color: var(--el-border-color);
    --el-button-hover-text-color: var(--tnze-on-fill);
    --el-button-active-text-color: var(--tnze-on-fill);
}
.el-button--info {
    --el-button-bg-color: var(--tnze-fill-info);
    --el-button-text-color: var(--tnze-on-fill);
    --el-button-border-color: var(--el-border-color);
    --el-button-hover-text-color: var(--tnze-on-fill);
    --el-button-active-text-color: var(--tnze-on-fill);
}
```

- [ ] **Step 2: 目視確認每一種按鈕**

在 `http://localhost:5173` 找出實心按鈕出現的位置（設定頁的儲存動作、配方選擇器的確認鈕、求解器的執行鈕），確認：按鈕文字是深色且清晰、按鈕有可見外框、hover 與 active 時文字沒有變回白色而消失。

淺色與深色各看一次。

- [ ] **Step 3: 跑驗證腳本**

Run: `node "C:/Users/Noi/AppData/Local/Temp/claude/c--project-private-project-ffxiv-best-craft/60c3572d-6106-42a1-aa92-a15cf7018df4/scratchpad/palette.mjs"`
Expected: `✅ 全部通過`

- [ ] **Step 4: Commit**

```bash
git add src/assets/theme.css
git commit -m "實心按鈕改用填色角色與深色文字"
```

---

### Task 3: 遊戲語意條隔離到固定軌道

**Files:**
- Modify: `src/components/designer/DurabilityProgressBar.vue`
- Modify: `src/components/designer/StatusBar.vue`
- Modify: `src/components/designer/consts.ts`

**Interfaces:**
- Consumes: Task 1 的 `--tnze-bar-track`、`--tnze-bar-outline`
- Produces: 無下游依賴

**注意：** 這三個檔案內的顏色只影響顯示，不參與任何計算。`StatusBar.vue` 的 `progress` / `quality` / `craftPointPercentage` / `collectabilityLevel` 等 computed 的**數值邏輯一律不動**，只改它們回傳的顏色字串與樣板上的顏色屬性。

- [ ] **Step 1: DurabilityProgressBar 的軌道與描邊改讀變數**

目前 `fill="#424242"` 與 `stroke="black"` 是寫死的。把 `<g>` 的 `stroke` 與底層 `<rect>` 的 `fill` 改為：

```html
<g
    :stroke="'var(--tnze-bar-outline)'"
    stroke-linecap="round"
    transform="translate(1.5, 1.5)"
>
    <rect
        v-for="i in Math.ceil(max / 10)"
        :x="(i - 1) * blockTotal"
        :width="blockWidth"
        :height="blockHeight"
        fill="var(--tnze-bar-track)"
    />
```

`durabilityColor` 陣列的三組色值維持不變（`#FF5757` / `#FFE957` / `#57bbff` 已驗證對軌道達 3.42:1 / 8.62:1 / 5.04:1）。

- [ ] **Step 2: StatusBar 的進度／品質／CP 條**

`progressColor` 與 `qualityColor` 兩個 computed 的**判斷條件完全不動**，只換回傳色值，改用已驗證的填色版：

```js
const progressColor = computed<string>(() => {
    if (props.status.progress >= props.status.recipe.difficulty)
        return '#4ade80';
    if (props.status.durability <= 0) return '#ff8f8f';
    return '#63b0ff';
});

const qualityColor = computed<string>(() =>
    props.status.quality >= props.status.recipe.quality
        ? '#4ade80'
        : '#63b0ff',
);
```

CP 條的樣板屬性 `color="#FF9999"` 改為 `color="#ffb0b0"`。

三條 `el-progress` 都要加上固定軌道與描邊，在 `<style scoped>` 內追加：

```css
/* 語意條的軌道固定不隨主題變色，邊界由描邊負責，
   使語意色的對比只跟軌道比較，一次驗證永久成立 */
:deep(.el-progress-bar__outer) {
    background-color: var(--tnze-bar-track);
    outline: 1px solid var(--tnze-bar-outline);
}
```

- [ ] **Step 3: 收藏品階級色**

`src/components/designer/consts.ts` 的 `collectabilityPalette` 三個色值（`#79c7ec` / `#fbc800` / `#c0ffc0`）對軌道已達 5.66:1 / 6.76:1 / 9.26:1，**色值不變**。需確認它們被套用的位置也坐落在有軌道的容器上——檢查 `StatusBar.vue` 與 `CollectabilityRefineMark.vue` 內 `collectabilityColor` 的用法，若是直接畫在卡片背景上（而非條狀軌道上），則在該元素加：

```css
outline: 1px solid var(--tnze-bar-outline);
```

- [ ] **Step 4: 確認模擬結果沒有改變**

在 `http://localhost:5173` 進入製作模擬器，跑一次任意配方的完整流程，確認：耐久度、CP、進度、品質的**數字**與改動前一致（顏色可以變，數字不能變）。

- [ ] **Step 5: 目視確認語意條**

淺色與深色各看一次，確認：四種條在兩套主題下都有清楚的軌道邊界、耐久度低於 20% 時的紅色仍然醒目、收藏品階級色可辨識。

- [ ] **Step 6: 跑驗證腳本與型別檢查**

Run: `node "C:/Users/Noi/AppData/Local/Temp/claude/c--project-private-project-ffxiv-best-craft/60c3572d-6106-42a1-aa92-a15cf7018df4/scratchpad/palette.mjs"`
Expected: `✅ 全部通過`

Run: `pnpm tsc --noEmit`
Expected: 無錯誤

- [ ] **Step 7: Commit**

```bash
git add src/components/designer/DurabilityProgressBar.vue src/components/designer/StatusBar.vue src/components/designer/consts.ts
git commit -m "遊戲語意條改用固定軌道與描邊"
```

---

### Task 4: 清除殘餘硬編碼顏色並收尾

**Files:**
- Modify: `src/App.vue`（`.overlay` 的遮罩色、`.main` 註解掉的背景色）
- Modify: `src/components/designer/Condition.vue`（`#393939`）
- Modify: `src/components/designer/tabs/Analyzers.vue`（`#ccc`）
- Modify: `src/components/DesktopEditionDownload.vue`（`#fff`）
- Modify: `src/components/bom/Curves.vue`（`rgba(255, 100, 255, 0.5)`）

**Interfaces:**
- Consumes: Task 1 的全部變數
- Produces: 無

**注意：** `src/components/designer/Action.vue` 內的 `#fff` / `#000` 是技能圖示的外框與陰影，屬於 FFXIV 風格素材，依 D1 **維持原樣不動**。

- [ ] **Step 1: 逐檔替換**

- `src/App.vue` 的 `.overlay` 遮罩 `rgba(0, 0, 0, 0.6)` 維持不變（modal scrim 建議 40–60% 黑，0.6 在範圍內且已足夠隔離前景）。
- `src/App.vue` 的 `.main` 內註解掉的 `/* background-color: rgba(246, 246, 246, 0.5); */` 直接刪除該註解行。
- `src/components/designer/Condition.vue` 的 `#393939` 改為 `var(--tnze-bar-track)`。
- `src/components/designer/tabs/Analyzers.vue` 的 `#ccc` 改為 `var(--el-border-color)`。
- `src/components/DesktopEditionDownload.vue` 的 `#fff` 改為 `var(--el-bg-color)`。
- `src/components/bom/Curves.vue` 的 `rgba(255, 100, 255, 0.5)` 改為 `var(--tnze-fill-primary)`。

- [ ] **Step 2: 確認沒有遺漏**

Run:

```bash
grep -rnoE '#[0-9a-fA-F]{3,8}\b' src --include=*.vue --include=*.ts | grep -v 'src/assets/theme.css'
```

Expected: 只剩下 `src/components/designer/Action.vue`（技能圖示外框，D1 豁免）、`src/components/designer/DurabilityProgressBar.vue` 的 `durabilityColor` 三色、`src/components/designer/StatusBar.vue` 的語意色、`src/components/designer/consts.ts` 的階級色。其餘都應該消失。

若出現預期外的殘留，逐一判斷是「介面色」（改成變數）或「遊戲語意色」（保留並確認對軌道達 3:1）。

- [ ] **Step 3: 全站目視走查**

淺色與深色各走一次，路徑：Welcome → 配方選擇 → 模擬器（含求解器分頁、巨集匯出分頁、分析分頁）→ 裝備配置 → BOM → 設定。

檢查每一頁：文字都看得清楚、沒有色塊消失、沒有兩個相鄰區塊糊在一起。

- [ ] **Step 4: 最終驗證**

Run: `node "C:/Users/Noi/AppData/Local/Temp/claude/c--project-private-project-ffxiv-best-craft/60c3572d-6106-42a1-aa92-a15cf7018df4/scratchpad/palette.mjs"`
Expected: `✅ 全部通過`

Run: `pnpm tsc --noEmit`
Expected: 無錯誤

- [ ] **Step 5: Commit**

```bash
git add -A src/
git commit -m "清除殘餘硬編碼顏色，統一改用色彩 token"
```

---

## 驗收（P1 完成條件）

- [ ] 驗證腳本輸出 `✅ 全部通過`
- [ ] `pnpm tsc --noEmit` 無錯誤
- [ ] 使用者在 `localhost:5173` 切換淺／深色走查全站，確認外觀可接受
- [ ] 模擬器的數值輸出與改動前一致
- [ ] `git diff cb5786d --stat` 顯示沒有任何禁區檔案被改動
