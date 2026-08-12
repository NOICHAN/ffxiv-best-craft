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

import { ComputedRef, Ref, computed, ref, watch } from 'vue';
import { Attributes, Jobs } from '@/libs/Craft';
import { GearsetsRow, choiceGearsetDisplayName } from '@/libs/Gearsets';
import useGearsetsStore from '@/stores/gearsets';
import useGearsetSelection from '@/stores/gearset-selection';

export interface GearsetResolution {
    // 目前實際使用中的配裝 id。刻意是唯讀的：自動解析與使用者選擇是兩條
    // 語意不同的路徑（見 gearset-selection store 的 select），全部都要
    // 經過本 composable，元件不該自己寫這個 ref。
    gearsetId: Readonly<Ref<number>>;
    // 目前使用中的那一列。找不到時退回「預設」列，因此永遠有值。
    gearsetRow: ComputedRef<GearsetsRow>;
    // 目前使用中的配裝顯示名稱（等級不足面板要顯示它，讓使用者看得出
    // 「套用等級」會改到哪一列）
    gearsetName: ComputedRef<string>;
    // 目前使用中的裝備屬性，尚未套用食藥加成
    attributes: ComputedRef<Attributes>;
    // 給 AttrEnhSelector 的 v-model：讀是目前選擇，寫一律視為使用者操作
    gearsetIdModel: Ref<number>;
    // 使用者主動選擇配裝：唯一會寫入記憶的路徑
    selectGearset: (id: number) => void;
    // 等級不足面板的配裝下拉清單。undefined 表示「不該提供這個入口」，
    // 面板會整塊隱藏下拉。
    compatibleGearsets: ComputedRef<GearsetsRow[] | undefined>;
}

// 製作介面（Designer / Simulator）共用的配裝解析接線。
//
// 抽成 composable 不只是為了少寫一次：兩份手抄的接線已經分岔過
// （初始化時機、找不到列時的 fallback、換配方的 watch 是否為死碼都不一樣），
// 而「等級不足面板的下拉要不要受 alwaysUseDefault 管」這種修正只要漏改一邊，
// 兩個模式就又會對同一個配方算出不同的配裝——正是這整批改動要消滅的缺陷。
//
// 呼叫時機的硬約束：必須在元件 setup 的 top-level `await` **之前**呼叫，
// 內部的 $subscribe 與 watch 才會綁進元件的 effect scope、卸載時自動釋放。
//
// resolveJob 必須是真正的配方職業，自訂配方要傳 undefined。
// 絕對不要把 Page.vue 注入的 displayJob 直接傳進來——它在自訂配方時會
// 假裝成烹調師，那個 fallback 只給呈現用途。
export function useGearsetResolution(
    resolveJob: ComputedRef<Jobs | undefined>,
): GearsetResolution {
    const gearsetsStore = useGearsetsStore();
    const selectionStore = useGearsetSelection();

    // 建 ref 時就地解析，而不是靠 immediate watch 補上：Simulator 是
    // async setup，initStatus 在 setup 期間就會讀 attributes，晚一步就會
    // 拿預設列的屬性去算第一次的 newStatus。
    const gearsetId = ref(selectionStore.resolveRowFor(resolveJob.value).id);

    const gearsetRow = computed<GearsetsRow>(
        () =>
            gearsetsStore.gearsets.find(
                (v: GearsetsRow) => v.id == gearsetId.value,
            ) ?? gearsetsStore.default,
    );
    const gearsetName = computed(() =>
        choiceGearsetDisplayName(gearsetRow.value),
    );
    const attributes = computed<Attributes>(() => gearsetRow.value.value);

    // 自動解析：只更新元件內的 ref，絕不寫回 store。
    // 自動結果一旦回寫，「這個職業沒選過」的狀態就永遠消失了。
    function resolveGearset() {
        gearsetId.value = selectionStore.resolveRowFor(resolveJob.value).id;
    }

    // 使用者主動選擇：這是唯一會寫入記憶的路徑。
    function selectGearset(id: number) {
        gearsetId.value = id;
        selectionStore.select(resolveJob.value, id);
    }

    const gearsetIdModel = computed<number>({
        get: () => gearsetId.value,
        set: (id: number) => selectGearset(id),
    });

    // Gearsets changed：只有在目前選中的配裝已不存在／不再相容時才重選。
    // 無條件重選會讓使用者在等級不足面板上按「套用」改等級（寫入 store）時，
    // 剛選好的配裝被打回預設，面板因此永遠關不掉。
    gearsetsStore.$subscribe(() => {
        const job = resolveJob.value;
        const current = gearsetsStore.gearsets.find(
            (v: GearsetsRow) => v.id == gearsetId.value,
        );
        if (
            current == undefined ||
            (job != undefined && !current.compatibleJobs.includes(job))
        ) {
            resolveGearset();
        }
    });

    // 換配方、以及 gearset-selection store 裡的偏好（alwaysUseDefault、各職業
    // 記憶）改變時都要跟上。兩者都會讓解析結果改變，所以直接監看解析結果即可，
    // 不需要另外一個監看 job 的 watch。
    //
    // 監看的是「id」而非整列物件：等級不足面板按「套用」會改寫某一列的 level，
    // 若監看整列會被 level 變動觸發，把剛選好的配裝打回預設，導致面板永遠
    // 關不掉。id 不受 level 影響，安全。
    watch(
        () => selectionStore.resolveRowFor(resolveJob.value).id,
        id => (gearsetId.value = id),
    );

    // 等級不足面板的配裝下拉。只有在「使用者的選擇真的會被 resolveRowFor
    // 採納」時才提供這個入口，否則面板會寫進一個馬上被解析規則推翻的值：
    // 元件內的 gearsetId 變了、resolveRowFor 卻還是回原本那列，於是切到另一個
    // 模式又變回去，兩個模式再度不一致。
    // 對應 resolveRowFor 的規則 0（自訂配方）與規則 1（alwaysUseDefault）。
    // 這兩種情況使用者仍有「或直接改等級」與「前往配裝頁」兩條路。
    const compatibleGearsets = computed<GearsetsRow[] | undefined>(() => {
        const job = resolveJob.value;
        if (job == undefined || selectionStore.alwaysUseDefault) {
            return undefined;
        }
        return gearsetsStore.gearsets.filter((v: GearsetsRow) =>
            v.compatibleJobs.includes(job),
        );
    });

    return {
        gearsetId,
        gearsetRow,
        gearsetName,
        attributes,
        gearsetIdModel,
        selectGearset,
        compatibleGearsets,
    };
}
