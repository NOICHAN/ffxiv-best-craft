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
