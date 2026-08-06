# src-server 部署到 Render free plan — 設計

日期：2026-08-06
分支：`render-deploy`（起點 commit `384068e`）

## 背景

[src-server/](../../../src-server/) 是網頁版的自架資料 API（Salvo + SeaORM，唯讀查
SQLite）。目前它只跑得起來在兩個地方：開發者本機，以及
[docker-compose.dev.yml](../../../docker-compose.dev.yml) 的 `api` service。兩者都靠
「把工作目錄切到放了 `.env` 與 `config.toml` 的目錄下」才啟動得了。

目標是讓它能部署到 Render 的 free plan，成為一台自己的、長期可用的資料 API。

## 現況盤查

### 三處會讓它在 Render 上直接 panic

| # | 位置 | 問題 |
|---|---|---|
| 1 | [main.rs:62](../../../src-server/src/main.rs#L62) | `dotenvy::dotenv().unwrap()` — Render 用環境變數注入，容器內沒有 `.env` 檔，這行直接 panic |
| 2 | [main.rs:63-64](../../../src-server/src/main.rs#L63-L64) | `HOST`／`PORT` 用 `expect` 硬性要求。Render 只注入 `PORT`（值由平台決定，不保證是 8080），完全不給 `HOST` |
| 3 | [main.rs:58](../../../src-server/src/main.rs#L58) | `read_to_string("config.toml")` 相對於工作目錄；而 [src-server/.gitignore](../../../src-server/.gitignore) 排除了 `config.toml`，repo 內根本沒有這個檔 |

`docker-compose.dev.yml` 是靠 `cd /app/docker/server` 再啟動來繞過 1 和 3 的，
[docker/server/.env](../../../docker/server/.env) 的註解也明講「找不到 `.env` 檔會直接
panic，光靠 compose 的 `environment:` 餵變數救不了」。這是既有的設計缺陷，不是 Render
的特例需求。

### 沒有健康檢查端點

現有路由全部掛在 `{lang}` 底下（[main.rs:88-104](../../../src-server/src/main.rs#L88-L104)），
沒有任何不需要語系參數就能打的端點。Render 部署時要有一個能回 200 的路徑才能判定
服務起來了。

### 資料語系：只可能有 zh-CN

- repo 內建的 [src-tauri/assets/xiv.db](../../../src-tauri/assets/xiv.db)（3.3 MB，已納管於 git）是**簡體中文**。
- `Items` 表只有單一個 `Name` 欄位（[src-db/src/items.rs](../../../src-db/src/items.rs)），一份資料庫裝不下多語言。
- [src-data/src/main.rs:110-126](../../../src-data/src/main.rs#L110-L126) 是從本機安裝的 FFXIV 遊戲本體用 `ironworks` 抽資料，語系取決於客戶端有哪些字串。FFXIV 沒有官方繁體中文客戶端，這條路產不出繁中資料庫。
- 官方 API（`tnze.yyyy.games`）的 zh-TW 是上游自行維護的獨立資料集，用詞與 zh-CN 不同（锻冶↔鍛造、铸甲↔甲冑、雕金↔金工），不是簡繁字元轉換的結果，本 repo 無法複製。

因此這台伺服器**只供 zh-CN**。前端維持打官方 API，繁體中文照常。

### 前端不在本次範圍，但要知道它的行為

[web-source.ts:275-277](../../../src/datasource/web-source.ts#L275-L277) 的
`VITE_DATASOURCE_API_BASE` 一旦設定，會把**六個語系全部**改打同一個 base，沒有分語系
路由也沒有 fallback；而 [main.rs:145-146](../../../src-server/src/main.rs#L145-L146) 對未
註冊的語系直接回 400。所以未來若真要把前端指過來，繁中會壞。本次不做這件事。

## 目標

1. `src-server` 在「只有環境變數、沒有 `.env`、工作目錄任意」的情況下能正常啟動。
2. 有一顆自足的正式用 Docker image：binary + 資料庫 + 設定全部烤在裡面。
3. Render free plan 上實際跑起來一台服務，端點回得了真實資料。

## 非目標

- 前端串接（不動 `VITE_DATASOURCE_API_BASE`、不動 `dataSourceList`）。
- 多語系／繁中資料來源。
- 未命中語系轉發到官方 API 的代理行為。
- 持久化磁碟（資料唯讀，不需要）。
- 獨立的部署說明文件（設定要點寫在 `render.yaml` 與 `config.render.toml` 的註解裡）。
- 既有 `docker-compose.dev.yml` 開發流程的任何改動（改完之後那邊的 `.env` 與
  `config.toml` 仍然有效，只是從「必要」變成「可選」）。

## 設計

### 1. `src-server/src/main.rs` — 設定載入改為有預設值且可覆寫

把 `main()` 開頭的設定區塊改成：

```rust
// .env 是本機開發用的便利設施；雲端平台直接注入環境變數，沒有這個檔也要能跑
dotenvy::dotenv().ok();

// 設定檔路徑可用環境變數覆寫，容器內就不必把工作目錄切到設定檔旁邊
let config_path =
    env::var("BESTCRAFT_SERVER_CONFIG").unwrap_or_else(|_| "config.toml".to_string());
let config_str = std::fs::read_to_string(&config_path)
    .unwrap_or_else(|err| panic!("failed to read config file {config_path}: {err}"));
let config: ServerConfig = toml::from_str(&config_str).unwrap();

// HOST 預設綁全介面，否則容器外連不進來；PORT 由平台注入，本機開發沿用 8080
let host = env::var("HOST").unwrap_or_else(|_| "0.0.0.0".to_string());
let port = env::var("PORT").unwrap_or_else(|_| "8080".to_string());
let server_url = format!("{host}:{port}");
```

順序上 `dotenv()` 必須排在最前面，`.env` 才有機會定義 `BESTCRAFT_SERVER_CONFIG`。
設定檔讀不到仍然是 panic（伺服器沒有資料庫也沒有意義），但錯誤訊息會帶上實際路徑。

### 2. `src-server/src/main.rs` — 健康檢查端點

新增：

```rust
#[handler]
async fn health(res: &mut Response) {
    res.render(Json(serde_json::json!({ "status": "ok" })));
}
```

`serde_json` 已經在 [src-server/Cargo.toml](../../../src-server/Cargo.toml) 的相依裡，
不需要加新套件。

路由掛在 `{lang}` **之前**，避免 `health` 被當成語系參數吃掉：

```rust
let router = Router::with_hoop(cors)
    .hoop(affix_state::inject(state))
    .push(Router::with_path("health").get(health))
    .push(Router::with_path("{lang}")/* 以下不變 */);
```

### 3. `docker/Dockerfile.server`（新增）

Multi-stage。與 [docker/Dockerfile.dev](../../../docker/Dockerfile.dev) 無關 —— 那顆是
開發用的、刻意不 COPY 原始碼。

```dockerfile
FROM rust:1-slim-bookworm AS builder

# sea-orm 走 runtime-tokio-native-tls 要 openssl；git 供 workspace 內以 tag 釘選的 git 相依使用
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        build-essential ca-certificates git libssl-dev pkg-config \
    && rm -rf /var/lib/apt/lists/*

ENV CARGO_NET_GIT_FETCH_WITH_CLI=true

WORKDIR /build
COPY . .

# rust-toolchain 指定 nightly，rustup 會在這一步自動補裝。
# -p 只建 web-source-server，不會去碰需要 GUI 系統相依的 src-tauri。
RUN cargo build --release --locked -p web-source-server

FROM debian:bookworm-slim AS runtime

RUN apt-get update \
    && apt-get install -y --no-install-recommends ca-certificates libssl3 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY --from=builder /build/target/release/web-source-server /app/web-source-server
COPY src-tauri/assets/xiv.db /app/xiv.db
COPY docker/server/config.render.toml /app/config.toml

ENV BESTCRAFT_SERVER_CONFIG=/app/config.toml
ENV HOST=0.0.0.0
ENV PORT=8080
EXPOSE 8080

CMD ["/app/web-source-server"]
```

`PORT=8080` 只是本機直接 `docker run` 時的預設值；Render 會用自己注入的 `PORT`
覆寫它。SQLite 由 `libsqlite3-sys` 靜態連入，runtime 階段不需要額外裝 sqlite。

### 4. `.dockerignore`（新增，repo 根目錄）

沒有這個檔的話 `COPY . .` 會把 `node_modules` 與 `target` 一起塞進 build context，
量級是 GB。

```
.git
node_modules
target
pkg-wasm
dist
docs
.vscode
.idea
```

不能排除 `src-tauri/assets/`，資料庫在裡面。

### 5. `docker/server/config.render.toml`（新增）

與 [docker/server/config.toml](../../../docker/server/config.toml) 並存，差別只在資料庫
路徑（開發環境是 bind mount 到 `/data`，正式映像檔是 COPY 到 `/app`）。

```toml
[lang.zh-CN]
database = "sqlite:/app/xiv.db?mode=ro"
```

檔案內以註解記錄「為何只有 zh-CN」，內容同上面〈資料語系〉一節的結論。

### 6. `render.yaml`（新增，repo 根目錄）

宣告式紀錄。實際服務由 Render API 建立（Render 不會自動套用 repo 內的 `render.yaml`，
除非在 dashboard 建立 Blueprint），兩者設定必須保持一致。

```yaml
services:
    - type: web
      name: bestcraft-datasource
      runtime: docker
      plan: free
      region: singapore
      branch: main
      dockerfilePath: ./docker/Dockerfile.server
      dockerContext: .
      healthCheckPath: /health
      autoDeploy: true
```

`region` 選 singapore（free plan 可用區域中離台灣最近）。建立服務前先確認該區域對 free
plan 開放；若不開放則退回 `oregon`（帳號上既有的兩台 free 服務都在 oregon），並同步更新
`render.yaml`。

### 7. 部署流程

帳號現況（已用 Render API 確認）：workspace `tea-cspg2vtumphs73d1cir0`，已連結
GitHub，且已有一台 docker runtime + free plan 的服務在跑，所以這條路線在此帳號上
可行。repo `NOICHAN/ffxiv-best-craft` 是 public，Render 拉得到。

1. 以上改動 commit 在 `render-deploy` 分支，push 到 `origin`。
2. 用 Render API 建立服務，**branch 先指向 `render-deploy`** —— 先證明 build 過得了，
   再決定要不要動 `main`。
3. 部署成功、端點驗證通過後，合併 `render-deploy` 到 `main` 並把服務的 branch 切成
   `main`（與 `render.yaml` 一致）。若 build 失敗，`main` 完全沒被汙染。
4. Render API key 只在指令中使用，不寫進 repo 任何檔案。

## 驗證

部署完成後對 `https://<service>.onrender.com` 依序打：

| 請求 | 預期 |
|---|---|
| `GET /health` | 200，`{"status":"ok"}` |
| `GET /zh-CN/craft_type` | 200，八個職業的 JSON 陣列（簡體用詞：锻冶、铸甲、雕金） |
| `GET /zh-CN/recipe_table?page_id=0&search_name=%25&page_size=3` | 200，`{"data":[...3 筆...],"p":<總頁數>}` |
| `GET /zh-CN/item_info?item_id=5056` | 200，單一物品 JSON |
| `GET /zh-TW/craft_type` | **400** —— 這是預期行為，不是 bug，證明語系未註冊時的處理正確 |

第一個請求若在服務休眠後發出，會有約一分鐘的冷啟動延遲，屬正常。

另外驗證既有開發環境沒被弄壞：`docker compose -f docker-compose.dev.yml up` 的 `api`
service 仍能起來並回應 `http://localhost:8080/zh-CN/craft_type`。

## 風險與已知限制

**建置時間／資源。** workspace 的 `[profile.release]` 設了 `lto = true`
（[Cargo.toml](../../../Cargo.toml)），sea-orm + sqlx + salvo 這條相依鏈全程 LTO 會相當
慢，且 Render free plan 的建置不使用快取（每次都從頭來）。若建置逾時或 OOM，對策是在
builder 階段加 `ENV CARGO_PROFILE_RELEASE_LTO=false` —— 這只影響映像檔內的建置，不動
repo 的 profile 設定，也不影響桌面版發行建置。

**free plan 的執行時數是整個 workspace 共用的。** 帳號上已有兩台 free 服務
（`nuxt3-hexagon-hotel`、`freyja`），這是第三台。free 服務閒置會休眠、休眠不計時數，
但三台都活躍時額度會消耗得比較快。

**`healthCheckPath` 不會讓服務保持清醒。** 它是部署時判定服務就緒用的，free plan
閒置 15 分鐘照樣休眠。此為已接受的取捨。

**更新資料要重新部署。** 資料庫烤在映像檔裡，換 `xiv.db` 必須重建映像檔。以這份資料
的更新頻率（跟著遊戲版本走）而言可以接受。

**AGPL-3.0。** 對外提供這個服務時，授權條款要求提供對應原始碼。repo 本來就是公開的，
已滿足。
