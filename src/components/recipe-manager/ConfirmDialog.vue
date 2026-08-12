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
import {
    ElDialog,
    ElDescriptions,
    ElDescriptionsItem,
    ElButton,
    ElInputNumber,
    ElAlert,
    ElTag,
} from 'element-plus';
import {
    CollectablesShopRefine,
    Conditions,
    Item,
    newRecipe,
    Recipe,
    RecipeInfo,
} from '@/libs/Craft';
import { selectRecipe } from './common';
import { useMediaQuery } from '@vueuse/core';
import { useRouter } from 'vue-router';
import { computed, onWatcherCleanup, ref, watch } from 'vue';
import useSettingStore from '@/stores/settings';
import { useFluent } from 'fluent-vue';
import Condition from '../designer/Condition.vue';

const props = defineProps<{
    recipeInfo: RecipeInfo;
    itemInfo: Item;
    collectability?: CollectablesShopRefine;
    stellarSteadyHandCount: number;
}>();
const router = useRouter();
const { $t } = useFluent();
const settingsStore = useSettingStore();
const visible = defineModel<boolean>({ required: true });
const rawRecipe = defineModel<Recipe>('recipe', { required: true });
const compactLayout = useMediaQuery('screen and (max-width: 500px)');

// 等級同步值。與配方清單的篩選列共用同一個值（RecipeSelector.vue 以
// v-model:sync-level 綁到 recipe-filters store），所以在對話框內改動會即時
// 反映回清單的欄位、也會一併被持久化；反之亦然。
// 未被父層綁定時（例如收藏頁的 RecipeFavored.vue）defineModel 退化成一般的
// ref，行為與過去的純內部狀態相同。
// 型別含 null：來源是 el-input-number，清空時依 valueOnClear 預設回傳 null 而非
// undefined，因此下方一律用鬆散的 `!= undefined`（同時涵蓋 null 與 undefined）。
const dynRecipeLevel = defineModel<number | null>('syncLevel');
const isDynRecipe = computed(() => {
    // 宇宙探索A级以下配方存在等级同步规则
    const notebook = props.recipeInfo.recipe_notebook_list;
    const range1 = notebook >= 1496 && notebook <= 1503;
    const range2 = notebook >= 1528 && notebook <= 1535;
    return (range1 || range2) && props.recipeInfo.rlv == 690;
});
const dynRecipeLoading = ref(false);
const dynRecipe = ref<Recipe>();
const recipe = computed(() =>
    isDynRecipe.value && dynRecipe.value != undefined
        ? dynRecipe.value
        : rawRecipe.value,
);

async function loadDynRecipe(
    isDynRecipe: boolean,
    dynRecipeLevel: number | null | undefined,
    recipeInfo: RecipeInfo,
    abortSignal: AbortSignal,
): Promise<Recipe | undefined> {
    if (!isDynRecipe || dynRecipeLevel == undefined) {
        return undefined;
    }
    const ds = await settingsStore.getDataSource();
    const recipeLevel = await ds.recipeLevelTablebyJobLevel!(dynRecipeLevel);
    if (recipeLevel == null) {
        return undefined;
    }

    abortSignal.throwIfAborted();

    return await newRecipe(
        recipeLevel,
        recipeInfo.difficulty_factor,
        recipeInfo.quality_factor,
        recipeInfo.durability_factor,
    );
}

// 必須 immediate：元件由 v-if="recipe && recipeInfo && itemInfo" 控制，一旦三者皆有值
// 就會保持掛載，而 dynRecipeLevel 在 setup 當下就已經帶著父層的值（defineModel 直接
// 讀 prop，不需要另一個 watch 去 seed）。若不是 immediate，掛載時三個 dep 都不會變動，
// 這個 callback 永遠不會執行：dynRecipe 恆為 undefined、確認鈕被 :disabled 鎖死，
// 使用者看到輸入框有值卻仍報「請輸入同步等級」，比不帶入更難理解。
watch(
    [isDynRecipe, dynRecipeLevel, () => props.recipeInfo],
    async ([isDynRecipe, dynRecipeLevel, recipeInfo]) => {
        try {
            dynRecipeLoading.value = true;
            let cancel = new AbortController();
            onWatcherCleanup(() => cancel.abort('watcher is cleanup'));
            dynRecipe.value = await loadDynRecipe(
                isDynRecipe,
                dynRecipeLevel,
                recipeInfo,
                cancel.signal,
            );
        } finally {
            dynRecipeLoading.value = false;
        }
    },
    { immediate: true },
);

async function confirm(mode: 'simulator' | 'designer') {
    const itemInfo = { ...props.itemInfo };
    if (isDynRecipe.value && dynRecipeLevel.value != undefined) {
        itemInfo.name = $t('sync-level-item-name', {
            itemName: itemInfo.name,
            syncLevel: dynRecipeLevel.value,
        });
    }
    selectRecipe({
        recipe: recipe.value,
        recipeId: props.recipeInfo.id,
        materialQualityFactor: props.recipeInfo.material_quality_factor,
        requirements: props.recipeInfo,
        collectability: props.collectability,
        item: itemInfo,
        craftType: props.recipeInfo.job,
        simulatorMode: mode == 'simulator',
        stellarSteadyHandCount: props.stellarSteadyHandCount,
        // 判定條件與上方 itemInfo.name 的加註完全一致，兩者必須同進同退
        syncLevel:
            isDynRecipe.value && dynRecipeLevel.value != undefined
                ? dynRecipeLevel.value
                : undefined,
    });
    router.push({ name: 'designer' });
    visible.value = false;
}
</script>

<template>
    <el-dialog
        v-model="visible"
        :title="$t('please-confirm')"
        :align-center="true"
        :width="compactLayout ? '90%' : '70%'"
    >
        <template v-if="isDynRecipe">
            <el-alert
                :title="$t('alert-sync-level')"
                :type="dynRecipe != undefined ? 'success' : 'error'"
                :closable="false"
            />
            <br />
        </template>
        <el-descriptions loading="true" :border="true">
            <el-descriptions-item
                v-if="isDynRecipe"
                :label="$t('sync-level')"
                :span="3"
            >
                <!--
                    max 取的是目前遊戲的職業等級上限，與 RecipeSelector.vue 篩選列
                    那個同步等級輸入框一致——兩者現在共用同一個值，界線若不同，
                    在其中一邊填得出、另一邊顯示卻被夾住的數字，等級上限提升時請一併檢查。
                -->
                <el-input-number
                    style="margin-left: 14px"
                    v-model="dynRecipeLevel"
                    :min="1"
                    :max="100"
                />
            </el-descriptions-item>

            <!-- Item Info -->
            <el-descriptions-item :label="$t('item-info')" :span="3">
                {{ recipeInfo.item_name }}
                <template v-if="recipeInfo.item_amount">
                    × {{ recipeInfo.item_amount }}
                </template>
            </el-descriptions-item>

            <!-- Recipe Data -->
            <el-descriptions-item :label="$t('recipe-id')">
                {{ recipeInfo.id }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('recipe-level')">
                {{ recipe.rlv.id }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('level')">
                {{ recipe.job_level }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('difficulty')">
                {{ recipe.difficulty }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('quality')">
                {{ recipe.quality }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('durability')">
                {{ recipe.durability }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('conditions')" :span="3">
                <el-alert
                    v-if="recipe.conditions_flag != 15 && !recipeInfo.is_expert"
                    type="warning"
                    show-icon
                    style="margin-bottom: 6px"
                >
                    {{
                        $t(
                            'conditions-will-not-take-effect-for-non-expert-recipe',
                        )
                    }}
                </el-alert>
                <div class="conditions-list">
                    <template v-for="(cond, i) in Object.values(Conditions)">
                        <el-tag
                            v-if="recipe.conditions_flag & (1 << i)"
                            type="info"
                        >
                            <Condition :cond="cond" />
                        </el-tag>
                    </template>
                </div>
            </el-descriptions-item>

            <!-- Recipe Info -->
            <el-descriptions-item :label="$t('difficulty-factor')">
                {{ recipeInfo.difficulty_factor }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('quality-factor')">
                {{ recipeInfo.quality_factor }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('durability-factor')">
                {{ recipeInfo.durability_factor }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('type')">
                {{ recipeInfo.job }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('material-quality-factor')">
                {{ recipeInfo.material_quality_factor }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('can-hq')">
                {{ $t(String(recipeInfo.can_hq)) }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('required-craftsmanship')">
                {{ recipeInfo.required_craftsmanship }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('required-control')">
                {{ recipeInfo.required_control }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('is-expert')">
                {{ $t(String(recipeInfo.is_expert)) }}
            </el-descriptions-item>
        </el-descriptions>
        <div class="notice">
            {{
                recipeInfo.is_expert
                    ? $t('confirm-select2')
                    : $t('confirm-select', { itemName: recipeInfo.item_name })
            }}
        </div>
        <template #footer>
            <span class="footer">
                <el-button @click="visible = false">
                    {{ $t('cancel') }}
                </el-button>
                <el-button
                    v-if="recipeInfo.is_expert"
                    type="primary"
                    @click="confirm('simulator')"
                >
                    {{ $t('simulator-mode') }}
                </el-button>
                <el-button
                    type="primary"
                    :loading="dynRecipeLoading"
                    :disabled="isDynRecipe && dynRecipe == undefined"
                    @click="confirm('designer')"
                >
                    {{ $t(recipeInfo.is_expert ? 'designer-mode' : 'confirm') }}
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<style scoped>
.conditions-list {
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
}

.notice {
    margin: 15px 0;
}
</style>

<fluent locale="zh-CN">
confirm-select = 开始制作“{ $itemName }”吗？
confirm-select2 = 这是一个高难度配方，请选择模式。
alert-sync-level = 这是一个等级同步配方，请输入同步等级
please-confirm = 请确认
conditions-will-not-take-effect-for-non-expert-recipe = 非高难度配方制作状态标志不会生效

cancel = 取消
confirm = 确认
designer-mode = 普通模式
simulator-mode = 高难模式
sync-level-item-name = { $itemName }（等级同步：{ $syncLevel }）

sync-level = 等级同步
type = 制作类型
level = 等级
recipe-id = 配方编号
item-info = 物品信息

true = 是
false = 否
can-hq = 存在HQ
is-expert = 高难度配方

required-craftsmanship = 最低{ craftsmanship }
required-control = 最低{ control }
</fluent>

<fluent locale="zh-TW">
confirm-select = 開始製作“{ $itemName }”嗎？
confirm-select2 = 這是一個高難度配方，請選擇模式。
alert-sync-level = 這是一個等級同步配方，請輸入同步等級
please-confirm = 請確認
conditions-will-not-take-effect-for-non-expert-recipe = 非高難度配方製作狀態標誌不會生效

cancel = 取消
confirm = 確認
designer-mode = 普通模式
simulator-mode = 高難模式
sync-level-item-name = { $itemName }（等級同步：{ $syncLevel }）

sync-level = 等級同步
type = 製作職業
level = 等級
recipe-id = 配方編號
item-info = 物品資訊

true = 是
false = 否
can-hq = 存在HQ
is-expert = 高難度配方

required-craftsmanship = 最低{ craftsmanship }
required-control = 最低{ control }
</fluent>

<fluent locale="en-US">
confirm-select = Start crafting "{ $itemName }"?
confirm-select2 = This is a hard recipe. Please make a choice.
alert-sync-level = This recipe is variant with job level, please setting it
please-confirm = Please confirm
conditions-will-not-take-effect-for-non-expert-recipe = The conditions flag for non expert recipe will not take effect

cancel = Cancel
confirm = Confirm
designer-mode = Normal Mode
simulator-mode = Simulator Mode
sync-level-item-name = { $itemName } (Lv. { $syncLevel })

sync-level = Level Sync
type = Crafting Type
level = Level
recipe-id = Recipe ID
item-info = Item info

true = True
false = False
can-hq = Can be HQ
is-expert = Is Expert

required-craftsmanship = Required { craftsmanship }
required-control = Required { control }
</fluent>

<fluent locale="ja-JP">
confirm-select = 「{ $itemName }」の製作を開始しますか？
confirm-select2 = これは高難易度レシピです。モードを選択してください。
alert-sync-level = これはレベルsyncレシピです。syncレベルを入力してください
please-confirm = 確認してください
conditions-will-not-take-effect-for-non-expert-recipe = 非高難易度レシピでは製作状態フラグは効果がありません

cancel = キャンセル
confirm = 確認
designer-mode = 通常モード
simulator-mode = 高難易度モード
sync-level-item-name = { $itemName }（レベルsync：{ $syncLevel }）

sync-level = レベルsync
type = 製作タイプ
level = レベル
recipe-id = レシピID
item-info = アイテム情報

true = はい
false = いいえ
can-hq = HQ可
is-expert = 高難易度レシピ

required-craftsmanship = 最低{ craftsmanship }
required-control = 最低{ control }
</fluent>
