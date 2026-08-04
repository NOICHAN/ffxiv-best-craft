# BestCraft UI/UX 改善 — 分期設計

日期：2026-08-04
分支：`docker-dev-env`（起點 commit `cb5786d`）

## 本文件的範圍

這份文件只定義**分期切法、每期的完成條件、以及全程適用的邊界**。
各期的細項需求由使用者分批提供；每一期開工前另外寫該期的實作計畫。
本文件不含任何一期的細部設計。

## 背景

使用者提出三項需求：

1. 網站符合無障礙標準，顏色對比度達 AAA
2. 新增主題顏色功能，可自由切換，選擇記錄在瀏覽器上
3. 改善多處使用不順的地方

技術現況（探索結果）：

- UI 框架是 Element Plus，所有顏色走 `--el-*` CSS 變數；`src/App.vue` 已覆寫一批（圓角、`--el-fill-color-blank`、`--el-menu-bg-color` 等）
- 深／淺色模式由 `useColorMode()`（`@vueuse/core`）驅動，存在它自己的 localStorage key，完全不經過 settings store
- `src/main.ts` 載入 `element-plus/theme-chalk/dark/css-vars.css`
- `src/App.vue` 的 `watchEffect` 中有 `invoke('set_theme')`，為 Tauri 桌面版專用（Mica 透明背景）
- 前端共 39 個 `.vue` 檔、約 11,000 行
- 專案沒有任何測試（無 vitest、無 playwright、無 `#[cfg(test)]`）；CI 只做 build 與 type-check

## 已鎖定的決策

| # | 議題 | 決定 |
|---|---|---|
| D1 | AAA 適用範圍 | 文字達 7:1、大字達 4.5:1；非文字元素（圖示、邊框、進度條）達 3:1。FFXIV 風格的技能／buff 圖示素材維持原樣不動 |
| D2 | 主題功能形態 | 固定幾組預設主題，無自由取色。每組在開發期通過對比度驗證，使用者選不出不合格的配色 |
| D3 | 主題持久化 | 獨立 localStorage key，比照現有 `useColorMode` 的做法。**不碰 settings store、不改 `toJson`、不動持久化格式** |
| D4 | 驗收方式 | 對比度用 scratchpad 內的 Node 腳本掃描全部 token 組合並輸出報表；其餘由逐項檢查清單搭配使用者在 `localhost:5173` 人工驗收。不動 `package.json`、不動 CI |
| D5 | `src/App.vue` 放行 | 准許修改 `<style>` 與純呈現用途的 `<script>`。`invoke('set_theme')` 那段 `watchEffect` 維持原樣，不增不減不改參數 |
| D6 | 新檔位置 | 主題清單的 TS 定義放 `src/libs/Theme.ts`（全新檔案，不觸及 `src/libs/` 內任何現有檔案）；主題的 CSS token 放 `src/assets/` |

## 分期切法

三項需求在實作上沿兩條軸交錯，直接照 1→2→3 執行會重工：

- **顏色軸** — AAA 對比度是調色盤的性質，主題色是替換調色盤。兩者是同一份 CSS token。先做 AAA 再加主題，等於每加一組主題就要重跑一次對比度稽核。
- **DOM 軸** — 無障礙的非顏色部分（語意結構、鍵盤順序、focus 可見、ARIA、表單標籤）綁在 DOM 上，而 UX 改版會動 DOM。

因此重新切為三期，順序為 **P1 → P2 → P3**（採用方案 A）：

### P1 — 色彩層

涵蓋原項目 2 的全部，加上原項目 1 的顏色部分。

內容：

- 把散落的顏色收斂成一層 CSS token
- 定義預設主題（每組含淺色與深色兩種變體）；組數與各組色相在 P1 的實作計畫中決定
- 主題切換 UI 與獨立 localStorage 持久化
- 對比度驗證腳本，涵蓋每一組主題 × 每一種模式 × 全部前景／背景組合

完成條件：

- 驗證腳本對全部主題組合輸出全綠（文字 ≥ 7:1、大字 ≥ 4.5:1、非文字 ≥ 3:1）
- 使用者在 `localhost:5173` 逐一切換每組主題，確認外觀可接受、重新整理後選擇保留
- `pnpm tsc --noEmit` 通過

### P2 — 無障礙基礎

原項目 1 扣掉顏色的其餘部分。

內容：

- 語意結構（landmark、標題層級、清單）
- 鍵盤可達性與 tab 順序、focus 陷阱
- `:focus-visible` 樣式（需與 P1 的 token 相容）
- 表單標籤與錯誤訊息關聯
- 必要的 ARIA 屬性與動態內容的播報
- `prefers-reduced-motion`（目前 `App.vue` 有多處 0.5s transition 未做此判斷）

這一期同時產出一份**無障礙規範清單**，成為 P3 每批改動的驗收條件之一。

完成條件：

- 逐項檢查清單全部通過，使用者人工驗收
- 新增或修改的文案四語系（zh-CN / zh-TW / en-US / ja-JP）齊備
- `pnpm tsc --noEmit` 通過

### P3 — UX 改善

原項目 3。使用者分批提供「用起來不順」的具體項目。

每批獨立走完「實作 → 驗收 → 使用者確認」再進下一批。每批的驗收條件包含 P2 產出的無障礙規範清單，避免改版製造新的無障礙債。

完成條件：由使用者逐批認定。

### 為什麼不是其他順序

- **P1 → P3 → P2**（無障礙押後總掃）：理論上對定案的 DOM 只稽核一次、零重工，但無障礙當事後補丁是典型反模式。P3 期間很可能產出 `<div @click>` 當按鈕這類結構，最後要拆掉重做反而更貴。且 P3 是開放式、分批進行，沒有天然終點，會無限期延後無障礙落地。
- **P1 → P2（僅骨幹）→ P3（每批自帶驗收）**：P2 縮減為只立規範並修 `App.vue`、`Menu.vue`、`Settings.vue` 等骨幹，其餘隨 P3 逐批處理。最快看到成果，代價是「無障礙做完了」的時間點被拖到 P3 結束，與使用者「一項做完測完才進下一項」的要求不符。

採用 P1 → P2 → P3 的理由：每一期都有明確且可判定的完成條件，符合使用者要求的逐項收尾節奏。P3 若大動版型，動過的元件需回頭複驗，但屆時已有 P2 的檢查清單，複驗成本低。

## 全程適用的邊界

以下在三期中一律適用。

### 禁區（要碰一律先問，取得明確同意才動）

- 全部 Rust crate：`src-libs/`、`src-tauri/`、`src-wasm/`、`src-db/`、`src-server/`、`src-data/`，以及所有 `Cargo.toml`、`.cargo/`
- 資料庫：`src-tauri/assets/xiv.db` 及任何 DB 檔、SeaORM entity
- 資料來源層：`src/datasource/` 全部
- 模擬／求解／分析橋接層：`src/libs/` 之 `Craft.ts`、`Solver.ts`、`SolverWorker.ts`、`Analyzer.ts`、`AnalyzerWorker.ts`、`Gearsets.ts`、`Enhancer.ts`
- 建置與部署：`vite.config.ts`、`docker/`、`docker-compose.dev.yml`、`.github/workflows/`、`versions.json`、`src-tauri/Tauri.toml`、`package.json`

### 灰色地帶（動之前先問）

`src/stores/`、`src/router.ts`、`src/libs/Consts.ts`、`src/libs/Utils.ts`

依 D3，P1 不需要碰 `src/stores/`。

### 不變式（每期完成前自我檢查）

1. 任何計算結果、數值、巨集輸出、API 請求形狀都不變
2. 不新增也不移除 `invoke()` 或 wasm 呼叫，不改其參數
3. 不動 `DataSource` 介面與其 optional 成員的 feature-detect 邏輯
4. 新增文案四語系齊備（zh-CN / zh-TW / en-US / ja-JP）
5. 新檔案帶 AGPL-3.0 header；註解用繁體中文
6. Commit 訊息用繁體中文，且不含任何 AI 署名
7. Tauri 桌面版不因這些改動而失效（特別是 `set_theme` 相關的透明背景行為）

### 工作節奏

一期做完、驗收完，才進下一期。P3 內部再細分為批，一批做完、確認完，才進下一批。
不擴張範圍去修沒被點名的東西。
