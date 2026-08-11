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
                const parsed = JSON.parse(
                    json,
                ) as Partial<GearsetSelectionData>;
                this.alwaysUseDefault = parsed?.alwaysUseDefault === true;
                // 逐欄正規化：壞資料最差只讓記憶失效、退回規則 3，不該讓頁面壞掉。
                const byJob: Partial<Record<Jobs, number>> = {};
                const source = parsed?.byJob;
                if (source != null && typeof source == 'object') {
                    for (const [job, id] of Object.entries(source)) {
                        // 配裝 id 一律是非負整數（gearsets store 的 nextId 由
                        // 0 起遞增）。用 Number.isInteger 而非 typeof number，
                        // 才擋得掉 NaN、Infinity、1.5、-3 這些永遠找不到列的值。
                        if (
                            jobValues.includes(job) &&
                            Number.isInteger(id) &&
                            id >= 0
                        ) {
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
    },
});
