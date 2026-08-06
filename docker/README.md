# Docker 開發環境

網頁版前端 + 自架資料 API + SQLite 資料庫，一鍵起在容器裡。不需要在本機裝
nightly Rust、wasm-pack 或任何 Rust 工具鏈。

> 桌面版（Tauri）不在此範圍內。它是原生應用程式，沒辦法跑在容器裡。

## 啟動

```bash
docker compose -f docker-compose.dev.yml up
```

首次啟動要做三件慢事：建映像檔（下載 nightly 工具鏈、編 wasm-bindgen-cli）、
`pnpm install`、以及用 `-Z build-std` 編 wasm 模組。合計可能 20–40 分鐘。
之後啟動只剩 `pnpm install` 的幾十秒，Rust 產物都在 named volume 裡。

| 服務 | 位址 | 說明 |
| --- | --- | --- |
| 前端 | <http://localhost:5173> | Vite dev server |
| API | <http://localhost:8080> | 自架資料源，僅簡體中文 |

### 讓它常駐（開機自動起來）

兩個服務都設了 `restart: unless-stopped`，所以只要**用背景模式起過一次**，
之後 Docker Desktop 或主機重開都會自己回來，不用再手動 `up`：

```bash
docker compose -f docker-compose.dev.yml up -d
```

前提是 Docker Desktop 本身會自動啟動（Settings → General →
_Start Docker Desktop when you sign in_）。restart policy 是 daemon 在執行的，
daemon 沒起來就沒有人叫醒容器。

真的想讓它停著別再自己回來，用 `stop`（不要用 `down`，`down` 會連容器一起刪掉）：

```bash
docker compose -f docker-compose.dev.yml stop
```

`unless-stopped` 記得住這個「是你手動停的」狀態，下次開機就不會擅自拉起來；
要恢復常駐再 `up -d` 一次即可。

## 資料來源：預設走線上 API

前端**預設打官方的 <https://tnze.yyyy.games/api/datasource/>**，六個語系都能用
（zh-CN、zh-TW、en、de、fr、ja），繁體中文的譯名正確（鍛造／甲冑／金工）。

想改用容器內自架的 API：

```bash
VITE_DATASOURCE_API_BASE=http://localhost:8080/ docker compose -f docker-compose.dev.yml up
```

兩個必知的限制：

1. **只有簡體中文。** `Items` 表只有單一個 `Name` 欄位（見
   [`src-db/src/items.rs`](../src-db/src/items.rs)），一份資料庫裝不下多語言。內建的
   `xiv.db` 是簡中，所以 `docker/server/config.toml` 只註冊得了 `zh-CN`。在前端設定頁選其他
   語系會拿到 HTTP 400。
2. **位址是 `localhost` 不是 `api`。** 發請求的是你主機上的瀏覽器，不是 web 容器，
   所以解析不到 Docker 內部的服務名。

要補其他語系，得有對應語系的 FFXIV 遊戲本體，再用
[`src-data`](../src-data) 匯出成獨立的資料庫檔，然後在 `config.toml` 加一個
`[lang.xx]` 區塊、在 compose 多掛一個檔案。繁體中文沒有官方客戶端，這條路產不出來。

## 改了 Rust 之後

Vue / TypeScript 存檔即時生效，不用做任何事。改到 Rust 才需要手動重建：

```bash
# 改了 src-libs 或 src-wasm（前端的模擬與求解核心）
docker compose -f docker-compose.dev.yml exec web pnpm run predev-web

# 改了 src-server 或 src-db（後端 API）
docker compose -f docker-compose.dev.yml restart api
```

## 疑難排解

**前端打不開 / 白畫面**
先看 `docker compose -f docker-compose.dev.yml logs web`。如果 wasm 還在編，畫面會
一直轉。wasm 是硬性相依：[`src/libs/Craft.ts`](../src/libs/Craft.ts) 在網頁模式下會
直接 import `pkg-wasm`，沒編好整個 app 起不來。

**主控台出現 SharedArrayBuffer 相關錯誤**
wasm 模組是用 `--shared-memory` 編的（見 [`.cargo/config.toml`](../.cargo/config.toml)），
必須有 COOP/COEP 標頭才能實例化。Vite dev server 已經設好了；如果你另外用其他
伺服器代理，記得把這兩個標頭帶上，否則不是變慢而是直接載入失敗。

**存檔沒有觸發 hot reload**
Windows 的 bind mount 傳不進 inotify 事件，所以 compose 有設
`VITE_USE_POLLING=1` 讓 Vite 改用輪詢。若仍失效，把
`vite.config.ts` 裡的 `interval` 調小。

**想砍掉重來**

```bash
docker compose -f docker-compose.dev.yml down -v   # -v 會一併刪除快取 volume
```

## 這裡有哪些檔案

| 檔案 | 用途 |
| --- | --- |
| `Dockerfile.dev` | web 與 api 共用的映像檔 |
| `server/config.toml` | src-server 的語系→資料庫對應 |
| `server/.env` | `HOST` / `PORT`。必須存在，否則 src-server 會 panic |
| `../docker-compose.dev.yml` | 服務、連接埠、volume 定義 |
