<!--
    This file is part of BestCraft.
    Copyright (C) 2026  Tnze

    BestCraft is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published
    by the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    BestCraft is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
-->

<script setup lang="ts">
import { ref, reactive, watch, onMounted, watchEffect } from 'vue';
import {
    ElInput,
    ElButton,
    ElTable,
    ElTableColumn,
    ElPagination,
    ElMessage,
    ElForm,
    ElFormItem,
    ElSelect,
    ElOption,
    ElInputNumber,
    ElTooltip,
    ElIcon,
} from 'element-plus';
import type { TableColumnCtx } from 'element-plus';
import {
    EditPen,
    QuestionFilled,
    Star,
    StarFilled,
} from '@element-plus/icons-vue';
import {
    CollectablesShopRefine,
    Item,
    newRecipe,
    Recipe,
    RecipeInfo,
    RecipeLevel,
} from '@/libs/Craft';
import { useRouter } from 'vue-router';
import { useFluent } from 'fluent-vue';
import { CraftType, DataSource, DataSourceType } from '@/datasource/source';
import useSettingsStore from '@/stores/settings';
import { refDebounced, useMediaQuery } from '@vueuse/core';
import ConfirmDialog from './ConfirmDialog.vue';
import useRecipeFavoritesStore from '@/stores/recipe-favorites';

const searchingDelayMs = 200;
// 同步等級輸入的防抖時間。打「90」會依序產生 9 → 90 兩個值，若不防抖，
// 每一輪都會先把等級同步配方那幾列清成「—」再填回，打字時該欄會閃爍。
const syncLevelDelayMs = 250;
// 難度查詢的併發上限。一頁最多 200 列，不同 rlv 可能有數十個，
// 若一次全部發出會瞬間對資料來源打出數十個請求（遠端來源沒有 Cache-Control，
// 瀏覽器 HTTP 快取幫不上忙）。限制同時在途的請求數量以免壓垮資料來源。
const maxConcurrentRequests = 6;

// 配方等級表快取。rlv 表是靜態不變的資料（同一個 rlv 永遠對應同一張表），
// 因此可以無限期快取。刻意放在「模組層級」而非元件層級，讓跨頁、
// 跨元件實例都能重用——否則每次換頁／搜尋都可能對資料來源打出接近列數的
// 請求（recipeTablePageSize 預設 100、上限 200），而兩個 DataSource 實作
// 都沒有自己的快取（web-source 直接 fetch、local-source 直接 invoke）。
// 存的是 Promise 而非結果，順便讓「同一個 key 的併發查詢」共用同一次請求。
//
// key 由「資料來源 + 語系 + rlv（或 job level）」組成：不同來源（本地 SQLite／
// 遠端 API）可能對應不同的遊戲版本，只用 rlv 當 key 會在切換來源後沿用過期難度。
// 把來源併進 key 之後，切換來源自然就查不到舊快取，不需要另外掛一個清空用的
// watch——那種寫法能生效是靠 watch 的註冊順序，是會被日後改動靜默弄壞的隱性耦合。
const recipeLevelCache = new Map<string, Promise<RecipeLevel>>();
const recipeLevelByJobLevelCache = new Map<
    string,
    Promise<RecipeLevel | null>
>();

// 取配方等級表，優先走快取。查詢失敗時把該筆從快取移除，
// 避免失敗結果被永久快取而卡死後續查詢。
function cachedRecipeLevelTable(
    ds: DataSource,
    cacheScope: string,
    rlv: number,
): Promise<RecipeLevel> {
    const key = `${cacheScope}|${rlv}`;
    let cached = recipeLevelCache.get(key);
    if (cached == undefined) {
        cached = ds.recipeLevelTable(rlv);
        cached.catch(() => recipeLevelCache.delete(key));
        recipeLevelCache.set(key, cached);
    }
    return cached;
}

// 同上，但以同步等級（job level）為 key。
// 呼叫端必須先 feature-detect ds.recipeLevelTablebyJobLevel 再進來。
function cachedRecipeLevelTableByJobLevel(
    fetchTable: (jobLevel: number) => Promise<RecipeLevel | null>,
    cacheScope: string,
    jobLevel: number,
): Promise<RecipeLevel | null> {
    const key = `${cacheScope}|${jobLevel}`;
    let cached = recipeLevelByJobLevelCache.get(key);
    if (cached == undefined) {
        cached = fetchTable(jobLevel);
        cached.catch(() => recipeLevelByJobLevelCache.delete(key));
        recipeLevelByJobLevelCache.set(key, cached);
    }
    return cached;
}

// 以固定數量的 worker 消耗任務佇列，限制同時在途的任務數。
// shouldStop 會在每次取用下一個任務之前檢查一次：這一批已經過期時（例如使用者
// 又換了頁）就不再送出剩下的請求，已在途的那幾個則讓它們自然結束
// （DataSource 介面不接受 AbortSignal，取消不了底層請求）。
// 未執行到的項目在結果陣列中留為 undefined。
async function mapWithConcurrencyLimit<T, R>(
    items: T[],
    limit: number,
    shouldStop: () => boolean,
    task: (item: T) => Promise<R>,
): Promise<(R | undefined)[]> {
    const results = new Array<R | undefined>(items.length);
    let nextIndex = 0;
    const runWorker = async () => {
        while (nextIndex < items.length) {
            if (shouldStop()) return;
            const index = nextIndex++;
            results[index] = await task(items[index]);
        }
    };
    const workers = [];
    for (let i = 0; i < Math.min(limit, items.length); i++) {
        workers.push(runWorker());
    }
    await Promise.all(workers);
    return results;
}

const settingStore = useSettingsStore();
const router = useRouter();
const { $t } = useFluent();

const searchText = ref('');
const pagination = reactive({
    Page: 1,
    PageTotal: 1,
});
const displayTable = ref<RecipeInfo[]>([]);
const isRecipeTableLoading = ref(false);
const compactLayout = useMediaQuery('screen and (max-width: 500px)');
const filterCraftType = ref<number>();
const filterLevel = ref<number>();
const craftTypeOptions = ref<CraftType[]>([]);
const filterRecipeLevel = ref<number>();
const stellarSteadyHandCount = ref<number>(0);
// 等級同步：月球（宇宙探索）配方的難度取決於此值，未填時該類配方的難度欄顯示為「—」
// 此控制項不觸發搜尋，只影響難度欄的顯示。
// 型別含 null：el-input-number 清空時依 valueOnClear 預設回傳 null 而非 undefined，
// 因此下游一律用鬆散的 `== undefined`（同時涵蓋 null 與 undefined）判斷「未填」。
const syncLevel = ref<number | null>();
// 難度查詢用的是防抖後的值，避免打字過程中每一個中間值都觸發一輪查詢。
// 帶進 ConfirmDialog 的仍是未防抖的 syncLevel（點進配方時早已停止輸入）。
const debouncedSyncLevel = refDebounced(syncLevel, syncLevelDelayMs);
// 難度對照表：key 為配方 id，value 為算好的難度；查不到的列在畫面上顯示「—」或「…」
const difficultyMap = ref<Map<number, number>>(new Map());
// 難度是否正在載入。用來區分「還沒算完」（顯示「…」）與「算完了但沒有值」
// （未填同步等級／查詢失敗，顯示「—」）——兩者都缺值，但意義完全不同。
const isDifficultyLoading = ref(false);
// 遞增的請求序號，用來丟棄過期結果（快速切換分頁／篩選／同步等級時，
// 舊查詢可能晚於新查詢返回，只有最後發出的那次才能寫回 difficultyMap）
let difficultyRequestId = 0;

const recipeFavoritesStore = useRecipeFavoritesStore();

async function craftTypeRemoteMethod() {
    const source = await settingStore.getDataSource();
    filterCraftType.value = undefined;
    craftTypeOptions.value = await source.craftTypeList();
}

let loadRecipeTableResult: Promise<{
    results: RecipeInfo[];
    totalPages: number;
}> | null = null;

async function updateRecipePage(
    dataSource: DataSource,
    pageNumber: number,
    searching: string,
) {
    let timer = setTimeout(() => (isRecipeTableLoading.value = true), 200);
    try {
        let promise = dataSource.recipeTable(
            pageNumber,
            searching,
            filterRecipeLevel.value,
            filterCraftType.value,
            filterLevel.value ? filterLevel.value * 10 - 9 : undefined,
            filterLevel.value ? filterLevel.value * 10 : undefined,
            settingStore.recipeTablePageSize,
        );
        loadRecipeTableResult = promise;
        let { results, totalPages } = await promise;
        if (loadRecipeTableResult == promise) {
            displayTable.value = results;
            pagination.PageTotal = totalPages;
            loadRecipeTableResult = null;
        }
    } catch (e: any) {
        ElMessage.error(String(e));
    } finally {
        clearTimeout(timer);
        isRecipeTableLoading.value = false;
    }
}

let searchTimer: any = null;
watch(searchText, async searching => {
    const source = await settingStore.getDataSource();
    if (searchTimer != null) {
        clearTimeout(searchTimer);
    }
    switch (source.sourceType) {
        case DataSourceType.Realtime:
            updateRecipePage(source, pagination.Page, searching);
            break;
        case DataSourceType.RemoteRealtime:
            searchTimer = setTimeout(() => {
                pagination.Page = 1;
                updateRecipePage(source, pagination.Page, searching);
                searchTimer = null;
            }, searchingDelayMs);
            break;
    }
});

watch(
    () => pagination.Page,
    async pageNumber => {
        const source = await settingStore.getDataSource();
        await updateRecipePage(source, pageNumber, searchText.value);
    },
);

async function triggerSearch() {
    const source = await settingStore.getDataSource();
    const searching = searchText.value;
    pagination.Page = 1;
    await updateRecipePage(source, 1, searching);
}

onMounted(async () => {
    triggerSearch();
    craftTypeRemoteMethod();
});

watch(
    () => [settingStore.dataSource, settingStore.dataSourceLang],
    () => {
        triggerSearch();
        craftTypeRemoteMethod();
    },
);

watch(
    () => settingStore.recipeTablePageSize,
    () => {
        triggerSearch();
    },
);

watchEffect(() => {
    const recipeId = router.currentRoute.value.query.recipeId;
    if (recipeId !== undefined) {
        selectRecipeById(Number(recipeId));
    }
});

// 判定是否為等級同步配方（宇宙探索 A 級以下配方存在等級同步規則）。
// 注意：此判定與 ConfirmDialog.vue 的 isDynRecipe 相同，兩處必須同步維護。
// 之所以刻意重複而非抽出共用函式，是因為兩者的資料來源不同
// （ConfirmDialog 讀 props.recipeInfo，這裡讀表格傳入的 row），
// 而要共用就必須改動 src/libs/，不在本次變更範圍內。
function isDynamicRecipe(row: RecipeInfo): boolean {
    const notebook = row.recipe_notebook_list;
    const range1 = notebook >= 1496 && notebook <= 1503;
    const range2 = notebook >= 1528 && notebook <= 1535;
    return (range1 || range2) && row.rlv == 690;
}

// 計算目前這頁每一列的難度。
// 難度一律交給 @/libs/Craft 的 newRecipe 換算（純算術、無 wasm），不自行複製公式。
async function loadDifficulties(
    rows: RecipeInfo[],
    syncLv: number | null | undefined,
) {
    const requestId = ++difficultyRequestId;
    // 這一批是否已經過期（有更新的一批被發出）。過期後就不該再送出剩下的請求。
    const isStale = () => requestId != difficultyRequestId;
    // 在任何 await 之前取快照：快取 key 必須對應「觸發這一批時」的資料來源，
    // 中途切換來源會產生新的一批，由那一批用新的 scope 重查。
    const cacheScope = `${settingStore.dataSource}|${settingStore.dataSourceLang}`;
    isDifficultyLoading.value = true;
    const dynRows = rows.filter(isDynamicRecipe);
    const staticRows = rows.filter(row => !isDynamicRecipe(row));

    // 先把等級同步配方那幾列退回「—」。它們的難度取決於 syncLevel，而改動
    // syncLevel 時列的 id 並不會變，若不先清掉，新結果回來前畫面會持續顯示
    // 用「舊同步等級」算出的難度——一個看起來合理但錯誤的數字，比「—」更糟。
    // 一般配方的難度與 syncLevel 無關，且換頁／換篩選時 id 自然改變，
    // 會自己退化成「—」，不需要清（清了反而在快取命中時徒增閃爍）。
    if (dynRows.length > 0) {
        const cleared = new Map(difficultyMap.value);
        for (const row of dynRows) {
            cleared.delete(row.id);
        }
        difficultyMap.value = cleared;
    }

    const next = new Map<number, number>();
    try {
        const ds = await settingStore.getDataSource();

        // 等級同步配方：整頁共用同一個同步等級，因此只查一次配方等級表
        const dynTask = (async () => {
            if (dynRows.length == 0 || syncLv == undefined) return;
            // recipeLevelTablebyJobLevel 是 DataSource 的 optional 成員，呼叫前必須偵測
            const fetchTable = ds.recipeLevelTablebyJobLevel;
            if (fetchTable == undefined) return;
            try {
                const rlv = await cachedRecipeLevelTableByJobLevel(
                    fetchTable.bind(ds),
                    cacheScope,
                    syncLv,
                );
                if (rlv == null) return;
                for (const row of dynRows) {
                    const r = await newRecipe(
                        rlv,
                        row.difficulty_factor,
                        row.quality_factor,
                        row.durability_factor,
                    );
                    next.set(row.id, r.difficulty);
                }
            } catch (e: any) {
                // 查詢失敗時這些列維持「—」，不打斷整個表格、也不彈錯誤訊息
                console.error('Failed to load synced recipe level table', e);
            }
        })();

        // 一般配方：依 rlv 去重，同一個 rlv 的所有列共用同一次查詢；
        // 再經由 cachedRecipeLevelTable 走跨頁快取，換頁時通常一次請求都不用發。
        // 即使如此，冷啟動時一頁仍可能有數十個未快取的 rlv，故加上併發上限。
        const uniqueRlvs = [...new Set(staticRows.map(row => row.rlv))];
        const staticTask = (async () => {
            const entries = await mapWithConcurrencyLimit(
                uniqueRlvs,
                maxConcurrentRequests,
                isStale,
                async rlv => {
                    try {
                        return [
                            rlv,
                            await cachedRecipeLevelTable(ds, cacheScope, rlv),
                        ] as const;
                    } catch (e: any) {
                        console.error(
                            `Failed to load recipe level table ${rlv}`,
                            e,
                        );
                        return [rlv, undefined] as const;
                    }
                },
            );
            const tables = new Map<number, RecipeLevel | undefined>();
            for (const entry of entries) {
                // 這一批中途過期時，未執行到的項目為 undefined
                if (entry == undefined) continue;
                tables.set(entry[0], entry[1]);
            }
            for (const row of staticRows) {
                const rlv = tables.get(row.rlv);
                if (rlv == undefined) continue;
                const r = await newRecipe(
                    rlv,
                    row.difficulty_factor,
                    row.quality_factor,
                    row.durability_factor,
                );
                next.set(row.id, r.difficulty);
            }
        })();

        await Promise.all([dynTask, staticTask]);
    } catch (e: any) {
        console.error('Failed to load recipe difficulties', e);
    }
    // 只有最後一次發出的請求能寫回結果，避免過期結果蓋掉新資料。
    // 載入狀態同理：過期的那一批不能把 loading 關掉，否則畫面會在還有查詢
    // 在跑的時候先顯示「—」，之後又跳出數字。
    if (!isStale()) {
        difficultyMap.value = next;
        isDifficultyLoading.value = false;
    }
}

watch([displayTable, debouncedSyncLevel], ([rows, syncLv]) => {
    loadDifficulties(rows, syncLv);
});

const confirmDialogVisible = ref(false);
const recipe = ref<Recipe>();
const recipeInfo = ref<RecipeInfo>();
const itemInfo = ref<Item>();
const collectability = ref<CollectablesShopRefine>();

async function clickRecipeRow(
    row: RecipeInfo,
    _column: TableColumnCtx<RecipeInfo> | null,
    event: PointerEvent,
) {
    const target = event.target as HTMLElement;
    if (target.closest('.favorite-column')) {
        return;
    }
    await selectRecipeRow(row);
}

async function selectRecipeRow(row: RecipeInfo) {
    try {
        isRecipeTableLoading.value = true;
        const source = await settingStore.getDataSource();

        const [
            recipeLevel,
            itemInfoTmp,
            collectabilityTmp,
            temporaryActionInfo,
        ] = await Promise.all([
            source.recipeLevelTable(row.rlv),
            source.itemInfo(row.item_id),
            (async () => {
                if (source.recipeCollectableShopRefine == undefined) {
                    return undefined;
                }
                try {
                    return await source.recipeCollectableShopRefine(row.id);
                } catch (e: any) {
                    console.error('Failed to fatch recipe collectability', e);
                    return undefined;
                }
            })(),
            (async () => {
                if (source.temporaryActionInfo) {
                    try {
                        return await source.temporaryActionInfo(row.id);
                    } catch (err: any) {
                        ElMessage({
                            type: 'warning',
                            message: $t(
                                'failed-to-load-temporary-action-info',
                                { err: String(err) },
                            ),
                        });
                    }
                }
                return undefined;
            })(),
        ]);
        recipe.value = await newRecipe(
            recipeLevel,
            row.difficulty_factor,
            row.quality_factor,
            row.durability_factor,
        );
        recipeInfo.value = row;
        itemInfo.value = itemInfoTmp;
        collectability.value = collectabilityTmp;
        confirmDialogVisible.value = true;
        stellarSteadyHandCount.value =
            temporaryActionInfo?.action == 46843
                ? temporaryActionInfo.count
                : 0;
    } catch (e: any) {
        ElMessage.error(String(e));
    } finally {
        isRecipeTableLoading.value = false;
    }
}

// single request
async function selectRecipeById(recipeId: number) {
    const source = await settingStore.getDataSource();
    if (source.recipeInfo == undefined) {
        ElMessage.error($t('datasource-unsupport-recipe-info'));
        return;
    }
    try {
        isRecipeTableLoading.value = true;
        const selectedRecipeInfo = await source.recipeInfo(recipeId);
        await selectRecipeRow(selectedRecipeInfo);
    } catch (e: any) {
        ElMessage.error($t('select-recipe-by-id-error', { err: String(e) }));
        isRecipeTableLoading.value = false;
    }
}

function toggleRecipeFavorite(row: RecipeInfo) {
    recipeFavoritesStore.toggleRecipe(row.id);
}
</script>

<template>
    <div class="container">
        <ConfirmDialog
            v-if="recipe && recipeInfo && itemInfo"
            v-model="confirmDialogVisible"
            v-model:recipe="recipe"
            :recipe-info="recipeInfo"
            :item-info="itemInfo"
            :collectability="collectability"
            :stellarSteadyHandCount="stellarSteadyHandCount"
            :sync-level="syncLevel"
        />
        <el-input
            v-model="searchText"
            @keydown.enter="triggerSearch"
            class="search-input"
            :placeholder="$t('search')"
            clearable
        >
            <template #append>
                <el-button
                    :icon="EditPen"
                    @click="router.push('/recipe/customize')"
                >
                    {{ $t('custom-recipe') }}
                </el-button>
            </template>
        </el-input>
        <div class="filter-row">
            <el-form class="select-filters">
                <el-form-item :label="$t('craft-type')">
                    <el-select
                        v-model="filterCraftType"
                        clearable
                        :remote-method="craftTypeRemoteMethod"
                        @change="triggerSearch"
                    >
                        <el-option
                            v-for="{ id, name } in craftTypeOptions"
                            :key="id"
                            :value="id"
                            :label="name"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('level')">
                    <el-select
                        v-model="filterLevel"
                        @change="triggerSearch"
                        clearable
                    >
                        <el-option
                            v-for="i in 10"
                            :key="i"
                            :value="i"
                            :label="`${i * 10 - 9} ~ ${i * 10}`"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('recipe-level')">
                    <el-input-number
                        v-model="filterRecipeLevel"
                        clearable
                        :min="1"
                        :max="799"
                        :step="1"
                        step-strictly
                        :controls="false"
                        @change="triggerSearch"
                    />
                </el-form-item>
                <!--
                    max=100 取的是目前遊戲的職業等級上限。
                    注意：ConfirmDialog.vue 對應的同步等級輸入框只有 :min="1"、
                    沒有上限，等級上限提升時兩處會漂移，請一併檢查。
                -->
                <el-form-item>
                    <!--
                        這一項排在三個 filter 之間、外觀也像 filter，但它不觸發搜尋，
                        只影響難度欄、且只對宇宙探索的等級同步配方有意義，
                        因此在 label 旁附一個說明用的 tooltip。
                    -->
                    <template #label>
                        <span class="filter-label">
                            {{ $t('level-sync') }}
                            <el-tooltip
                                :content="$t('level-sync-hint')"
                                placement="top"
                            >
                                <el-icon class="filter-label-hint">
                                    <QuestionFilled />
                                </el-icon>
                            </el-tooltip>
                        </span>
                    </template>
                    <el-input-number
                        v-model="syncLevel"
                        clearable
                        :min="1"
                        :max="100"
                        :step="1"
                        step-strictly
                        :controls="false"
                    />
                </el-form-item>
            </el-form>
        </div>
        <el-table
            v-tnze-loading="isRecipeTableLoading"
            :element-loading-text="$t('please-wait')"
            highlight-current-row
            @row-click="clickRecipeRow"
            :data="displayTable"
            height="100%"
            style="width: 100%"
        >
            <el-table-column
                width="56"
                align="center"
                class-name="favorite-column"
            >
                <template #default="{ row }">
                    <el-button
                        rectangle
                        text
                        size="small"
                        style="width: 100%; height: 100%"
                        :type="
                            recipeFavoritesStore.hasRecipe(row.id)
                                ? 'warning'
                                : 'info'
                        "
                        :icon="
                            recipeFavoritesStore.hasRecipe(row.id)
                                ? StarFilled
                                : Star
                        "
                        :title="
                            recipeFavoritesStore.hasRecipe(row.id)
                                ? $t('unfavorite')
                                : $t('favorite')
                        "
                        @click.stop="toggleRecipeFavorite(row as RecipeInfo)"
                    />
                </template>
            </el-table-column>
            <el-table-column
                prop="id"
                label="ID"
                :width="compactLayout ? undefined : 100"
            />
            <el-table-column
                prop="rlv"
                :label="$t('recipe-level')"
                :width="compactLayout ? undefined : 100"
            />
            <el-table-column
                prop="job"
                :label="$t('type')"
                :width="compactLayout ? undefined : 200"
            />
            <el-table-column
                :label="$t('difficulty')"
                :width="compactLayout ? undefined : 90"
            >
                <template #default="{ row }">
                    <!--
                        「…」＝還在算；「—」＝算完了但沒有值（等級同步配方尚未
                        填同步等級，或查詢失敗）。兩者都缺值但意義不同，不能共用
                        同一個字元，否則冷啟動時整欄的「—」看起來像壞掉。
                    -->
                    {{
                        difficultyMap.get((row as RecipeInfo).id) ??
                        (isDifficultyLoading ? '…' : '—')
                    }}
                </template>
            </el-table-column>
            <el-table-column prop="item_name" :label="$t('name')" />
        </el-table>
        <el-pagination
            v-if="pagination.PageTotal > 1"
            layout="prev, pager, next"
            v-model:current-page="pagination.Page"
            :page-count="pagination.PageTotal"
        />
    </div>
</template>

<style scoped>
.container {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: transparent !important;
}

.search-input {
    margin: 10px 0;
    width: 80%;
}

.filter-row {
    display: flex;
    justify-content: space-between;
    width: 80%;
    gap: 5%;
    max-width: 800px;
}

.el-table {
    user-select: none;
    --el-fill-color-blank: transparent;
}

.el-pagination {
    justify-content: center;
    --el-fill-color-blank: transparent;
}

.select-filters {
    flex: 1;
    display: flex;
    /* 加入第四個篩選項後，窄螢幕（.filter-row 只有視窗寬的 80%）單行放不下，
       四個 CJK label 幾乎會吃掉整格寬度，故允許換行做優雅降級 */
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    /* 直向間距用固定值：百分比的 row-gap 會以自身高度為基準，不適合這裡 */
    gap: 8px 5%;
}

.select-filters :deep(.el-form-item) {
    /* 基準寬度 150px：寬螢幕時四項的基準相同、又都 grow，等分結果與原本一致；
       容器不足 4 × 150px 時才換行 */
    flex: 1 1 150px;
    margin-bottom: 0;
}

.select-filters :deep(.el-select),
.select-filters :deep(.el-input-number) {
    width: 100%;
}

.filter-label {
    display: inline-flex;
    align-items: center;
    gap: 4px;
}

.filter-label-hint {
    color: var(--el-text-color-secondary);
    cursor: help;
}
</style>

<fluent locale="zh-CN">
datasource-unsupport-recipe-info = 当前数据源不支持从外部选择配方
select-recipe-by-id-error = 获取配方信息失败：{ $err }，请尝试切换数据源
failed-to-load-temporary-action-info = 获取任务指令失败：{ $err }

search = 键入以搜索
please-wait = 请稍等...

type = 类型
craft-type = 制作类型
level = 等级
name = 名称
can-hq = 存在HQ
level-sync = 等级同步
level-sync-hint = 仅影响「难度」列的显示。只有月球（宇宙探索）的等级同步配方会用到，其他配方的难度不受此值影响。不会触发搜索。

favorite = 收藏
unfavorite = 取消收藏
clear-all-favorites = 清空收藏
clear-all-favorites-confirm = 确认要重置所有收藏的配方吗？
</fluent>

<fluent locale="zh-TW">
datasource-unsupport-recipe-info = 當前資料來源不支援從外部選擇配方
select-recipe-by-id-error = 獲取配方資訊失敗：{ $err }，請嘗試切換資料來源
failed-to-load-temporary-action-info = 獲取任務指令失敗：{ $err }

search = 鍵入以搜尋
please-wait = 請稍等...

type = 職業
craft-type = 製作職業
level = 等級
name = 名稱
can-hq = 存在HQ
level-sync = 等級同步
level-sync-hint = 僅影響「難度」欄的顯示。只有月球（宇宙探索）的等級同步配方會用到，其他配方的難度不受此值影響。不會觸發搜尋。

favorite = 收藏
unfavorite = 取消收藏
clear-all-favorites = 清空收藏
clear-all-favorites-confirm = 確認要重置所有收藏的配方嗎？
</fluent>

<fluent locale="en-US">
datasource-unsupport-recipe-info = Current data-source doesn't support choice recipe from external pages
select-recipe-by-id-error = Error fetching recipe data: { $err }. Please try choosing another DataSource
failed-to-load-temporary-action-info = Failed to load temporary action info: { $err }

search = Search
please-wait = Please wait...

type = Type
craft-type = Craft Type
level = Level
name = Name
can-hq = Can HQ
level-sync = Level Sync
level-sync-hint = Only affects the Difficulty column. It is used solely by the level-sync recipes of Cosmic Exploration (the Moon); the difficulty of other recipes is unaffected. It does not trigger a search.

favorite = Favorite
unfavorite = Unfavorite
clear-all-favorites = Clear Favorites
clear-all-favorites-confirm = Reset all favorite recipes?
</fluent>

<fluent locale="ja-JP">
datasource-unsupport-recipe-info = 現在のデータソースは外部からのレシピ選択をサポートしていません
select-recipe-by-id-error = レシピ情報の取得に失敗しました：{ $err }。データソースの切り替えをお試しください
failed-to-load-temporary-action-info = コンテンツアクションの取得に失敗しました：{ $err }

search = 入力して検索
please-wait = お待ちください...

type = タイプ
craft-type = 製作タイプ
level = レベル
name = アイテム
can-hq = HQ可
level-sync = レベルsync
level-sync-hint = 「必要工数」列の表示にのみ影響します。月（宇宙探索）のレベルsyncレシピでのみ使用され、他のレシピの必要工数には影響しません。検索は実行されません。

favorite = お気に入り
unfavorite = お気に入り解除
clear-all-favorites = お気に入り消去
clear-all-favorites-confirm = 登録したレシピをすべて消去しますか？
</fluent>
