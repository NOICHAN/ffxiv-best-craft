# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 語言規範

| 項目 | 語言 |
|---|---|
| 與使用者對話 | **繁體中文** |
| 程式碼（識別字、函式名、變數名、型別、字串常數） | **英文** |
| 程式碼註解 | **繁體中文** |
| Commit 訊息 | **繁體中文** |

Commit 訊息**不得**加上任何 AI 屬名或署名 —— 不要 `Co-Authored-By: Claude ...`、不要 `🤖 Generated with Claude Code`，PR 內文同理。此規則覆寫預設行為。

例外：既有檔案沿用其原本風格（例如 [src-libs/](src-libs/) 內既有的簡體中文註解、`.ftl` 各語系翻譯內容），不要為了套用這條規則而去改寫無關的既有內容。

## Project

BestCraft — an FFXIV (Final Fantasy XIV) crafting simulator with automatic solver algorithms. Vue 3 frontend, Rust core, shipped as **two products from one codebase**: a Tauri 2 desktop app and a web app (online at <https://tnze.yyyy.games/#/>). Licensed AGPL-3.0.

## Commands

Package manager is **pnpm** (`packageManager` is pinned; `corepack enable` in CI). Rust toolchain is **nightly** (pinned in [rust-toolchain](rust-toolchain)) — the wasm build needs `-Z build-std`, which requires the `rust-src` component.

```bash
pnpm install

# Desktop (Tauri) — runs the Rust backend; `cargo tauri dev` drives `pnpm run dev` for the frontend
cargo install tauri-cli        # once
cargo tauri dev                # debug; solvers are MUCH slower than release
cargo tauri dev --release
cargo tauri build              # needs TAURI_PRIVATE_KEY / TAURI_KEY_PASSWORD env for signed updater artifacts

# Web — `predev-web`/`prebuild-web` auto-run wasm-pack (enabled by enable-pre-post-scripts in .npmrc)
cargo install wasm-pack wasm-bindgen-cli   # once
pnpm run dev-web
pnpm run build-web

pnpm tsc --noEmit   # type check — only valid AFTER pkg-wasm/ exists, since src/libs/Craft.ts imports it
pnpm run fmt        # prettier; Rust dirs are excluded via .prettierignore, use `cargo fmt` there
```

There is also a containerized web-dev environment (`docker compose -f docker-compose.dev.yml up`) that needs no local Rust toolchain — see [docker/README.md](docker/README.md). It runs the Vite dev server on 5173 and a self-hosted [src-server/](src-server/) on 8080; the frontend defaults to the public API unless `VITE_DATASOURCE_API_BASE` is set.

Linting runs automatically inside Vite via `vite-plugin-oxlint`; there is no separate lint script.

There is no test suite (no vitest, no `#[cfg(test)]` modules). CI ([.github/workflows](.github/workflows)) only builds and type-checks.

Frontend scripts use POSIX env syntax (`VITE_BESTCRAFT_TARGET=tauri vite`); this works on Windows because `shellEmulator: true` is set in [pnpm-workspace.yaml](pnpm-workspace.yaml). Invoke them through pnpm, not directly.

## Build-target duality — the central architectural concern

Nearly every cross-cutting decision follows from the fact that the same Vue app runs on two different backends, selected by `VITE_BESTCRAFT_TARGET` (`tauri` | `web`):

- A custom Vite plugin (`defineTarget` in [vite.config.ts](vite.config.ts)) textually inlines `import.meta.env.VITE_BESTCRAFT_TARGET` **before** other transforms, so `if (import.meta.env.VITE_BESTCRAFT_TARGET == 'tauri')` blocks are dead-code-eliminated and the unused backend is never bundled. The plugin is registered for the worker pipeline too.
- [src/libs/Consts.ts](src/libs/Consts.ts) exports `isTauri` / `isWebsite` for runtime branches that don't need tree-shaking.
- Adding a capability usually means touching **three** places: the Rust implementation in [src-libs/](src-libs/), a `#[tauri::command]` wrapper in [src-tauri/src/main.rs](src-tauri/src/main.rs), and a `#[wasm_bindgen]` wrapper in [src-wasm/src/lib.rs](src-wasm/src/lib.rs) — then the TS branch that picks between `invoke(...)` and the wasm module.

Files that own this branching: [src/libs/Craft.ts](src/libs/Craft.ts) (simulation), [src/libs/Solver.ts](src/libs/Solver.ts) (solvers), [src/libs/Utils.ts](src/libs/Utils.ts) (opening URLs), [src/stores/settings.ts](src/stores/settings.ts) (which data sources are offered).

## Cargo workspace

| Crate | Role |
|---|---|
| [src-libs/](src-libs/) | `app-libs` — the real core: crafting simulation (wraps the `ffxiv-crafting` crate), `solver/` (DFS, normal-progress DP, reflect, and the vendored [raphael-rs](https://github.com/KonaeAkira/raphael-rs) solver pinned by git tag), `analyzer/` (Monte-Carlo `rand_simulations`, `scope_of_application`). Compiles for both native and wasm; native-only deps are `cfg`-gated. |
| [src-tauri/](src-tauri/) | `app` — desktop shell. Thin `#[tauri::command]` layer over `app-libs` plus SQLite recipe queries. Config lives in [src-tauri/Tauri.toml](src-tauri/Tauri.toml) (TOML, not `tauri.conf.json`). |
| [src-wasm/](src-wasm/) | `app-wasm` — `cdylib` exposing the same surface to the browser; uses `wasm-bindgen-rayon` for threads. |
| [src-db/](src-db/) | `app-db` — generated SeaORM entities. Regenerate with `sea-orm-cli generate entity` (see [src-db/README.md](src-db/README.md)); don't hand-edit. |
| [src-server/](src-server/) | `web-source-server` — Salvo HTTP server backing the web edition's remote data source. Needs a `config.toml` (per-language DB URLs) and a `.env` with `HOST`/`PORT`. |
| [src-data/](src-data/) | `app-data` — CLI that extracts game data from an FFXIV installation via `ironworks` into a DB; this is how `xiv.db` is produced. |

Wasm builds need the `[target.wasm32-unknown-unknown]` rustflags in [.cargo/config.toml](.cargo/config.toml) (atomics, shared memory, simd128). Consequently the dev server sets COOP/COEP headers in [vite.config.ts](vite.config.ts) — cross-origin isolation is required for `SharedArrayBuffer`; any hosting change must preserve those headers.

Solving and analysis run off the main thread via dedicated workers ([src/libs/SolverWorker.ts](src/libs/SolverWorker.ts), [src/libs/AnalyzerWorker.ts](src/libs/AnalyzerWorker.ts)) on the web target only; on Tauri the equivalent work happens in Rust behind async commands.

## Data sources

Game data (recipes, items, food/medicine) is fetched through the `DataSource` interface in [src/datasource/source.ts](src/datasource/source.ts). Two implementations: `LocalRecipeSource` ([local-source.ts](src/datasource/local-source.ts)) invokes Tauri commands backed by the bundled read-only SQLite at `src-tauri/assets/xiv.db`; `WebSource` ([web-source.ts](src/datasource/web-source.ts)) hits the remote HTTP API. The active source is chosen by user settings in [src/stores/settings.ts](src/stores/settings.ts), keyed by `DataSourceID` + `DataSourceLangID` — `local` is removed from the list when not running under Tauri.

Several `DataSource` members are optional (`?`) because not every backend supports them; callers must feature-detect rather than assume.

## Frontend layout

- Router uses **hash history** ([src/router.ts](src/router.ts)) — required for both the Tauri custom protocol and the static web deploy. All routes are lazily imported.
- Pinia stores in [src/stores/](src/stores/) (`designer`, `gearsets`, `settings`, `bom`, `recipe-favorites`). Each exposes a `toJson` getter — stores are persisted by serializing that.
- The crafting workspace lives in [src/components/designer/](src/components/designer/): `Page.vue` composes `Designer.vue` / `Simulator.vue`, `solvers/` holds one component per solver algorithm, `tabs/` holds macro import/export and analyzers. Cross-component wiring uses provide/inject keys in [injectionkeys.ts](src/components/designer/injectionkeys.ts).
- UI is Element Plus (auto-imported via `unplugin-element-plus`); `@` aliases `src/`.

## i18n (Fluent)

Four locales: `zh-CN`, `zh-TW`, `en-US`, `ja-JP`. Component-scoped strings live in `<fluent locale="...">` SFC blocks — **all four locales in the same `.vue` file**, so adding a string means adding four blocks' worth of entries. App-wide strings live in [src/assets/locales/](src/assets/locales/) `*.ftl`. Bundles are registered in [src/fluent.ts](src/fluent.ts) with locale-specific fallback chains; Element Plus locale mapping is in [src/lang.ts](src/lang.ts).

## Conventions

- Every source file (TS, Vue, Rust) starts with the AGPL-3.0 header block — copy it into new files.
- Prettier: 4 spaces, single quotes, avoid arrow parens.
- Desktop releases are auto-updated: bumping the version means updating [src-tauri/Tauri.toml](src-tauri/Tauri.toml) and [versions.json](versions.json) (the latter is one of the updater endpoints, served from the repo's `main` branch).
