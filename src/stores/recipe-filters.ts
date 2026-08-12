// This file is part of BestCraft.
// Copyright (C) 2026  Tnze
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

// 配方選擇頁篩選列的四個欄位。
//
// 「未填」一律用 null 表示而不是 undefined：JSON.stringify 會把值為 undefined
// 的鍵整個丟掉，存回來的字串就會缺鍵，讀取端得多一層防禦。統一成 null 之後
// toJson / fromJson 兩邊都只要處理一種「空」。
// 代價是 DataSource.recipeTable() 那些參數是 `?: number`，呼叫點得補 `?? undefined`。
interface RecipeFiltersData {
    // 製作職業（CraftType id）
    craftType: number | null;
    // 等級級距，1~10，實際換算成 level*10-9 ~ level*10
    level: number | null;
    // 配方等級（rlv）
    recipeLevel: number | null;
    // 等級同步（不影響搜尋，只影響難度欄的顯示）
    syncLevel: number | null;
}

export default defineStore('recipe-filters', {
    state: (): RecipeFiltersData => ({
        craftType: null,
        level: null,
        recipeLevel: null,
        syncLevel: null,
    }),
    getters: {
        toJson(): string {
            // el-select / el-input-number 清空時可能給的是 undefined，
            // 這裡用 ?? null 正規化，確保四個鍵永遠都寫得出來。
            const data: RecipeFiltersData = {
                craftType: this.craftType ?? null,
                level: this.level ?? null,
                recipeLevel: this.recipeLevel ?? null,
                syncLevel: this.syncLevel ?? null,
            };
            return JSON.stringify(data);
        },
    },
    actions: {
        fromJson(json: string) {
            try {
                const parsed = JSON.parse(json) as Partial<RecipeFiltersData>;
                // 逐欄正規化。這四個欄位全是可為 null 的數字，沒有跨版本遷移需求，
                // 因此不引入 ajv schema；壞資料的最差後果只是篩選回到未填。
                this.craftType = normalizeField(parsed?.craftType);
                this.level = normalizeField(parsed?.level);
                this.recipeLevel = normalizeField(parsed?.recipeLevel);
                this.syncLevel = normalizeField(parsed?.syncLevel);
            } catch (err) {
                console.error(err);
            }
        },
    },
});

function normalizeField(v: unknown): number | null {
    return typeof v === 'number' ? v : null;
}
