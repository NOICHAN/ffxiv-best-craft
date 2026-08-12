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
    ElScrollbar,
    ElDialog,
    ElButton,
    ElTable,
    ElTableColumn,
    ElCard,
    ElSwitch,
} from 'element-plus';
import { Ref, computed, inject, ref, watch } from 'vue';
import {
    Recipe,
    Item,
    Attributes,
    Jobs,
    newStatus,
    Status,
    Actions,
    Conditions,
    simulateOneStep,
    CollectablesShopRefine,
} from '@/libs/Craft';
import { Enhancer } from '@/libs/Enhancer';
import StatusBarVue from './StatusBar.vue';
import ActionPanelVue from './ActionPanel.vue';
import ActionQueueVue from './ActionQueue.vue';
import AttrEnhSelector from './tabs/AttrEnhSelector.vue';
import { displayJobKey } from './injectionkeys';
import useStore from '@/stores/designer';
import { useGearsetResolution } from '@/composables/useGearsetResolution';
import LevelRequirementPanel from './LevelRequirementPanel.vue';

const props = defineProps<{
    recipe: Recipe;
    item: Item;
    collectableShopRefine?: CollectablesShopRefine;
    isCustomRecipe: boolean;
}>();
const store = useStore();
const displayJob = inject(displayJobKey) as Ref<Jobs>;

interface Slot {
    id: number;
    action: Actions;
    condition: Conditions;
}

// 装备属性
// 傳給 resolveRowFor 的必須是真正的配方職業。displayJob 在自訂配方時會
// 假裝成烹調師（見 Page.vue 的 displayJobKey provide），直接拿去解析
// 會靜默套用「烹調師」那一列。
const resolveJob = computed(() =>
    props.isCustomRecipe ? undefined : displayJob.value,
);
// 解析接線與 Designer 共用同一份實作，兩個模式才不會對同一個配方算出
// 不同的配裝。這段必須在下方 top-level await 之前（也必須在
// enhancedAttributes 之前——它會解構 attributes.value），內部的
// $subscribe 與 watch 才會綁進本元件的 effect scope。
const {
    gearsetId,
    gearsetRow,
    gearsetName,
    attributes,
    gearsetIdModel,
    selectGearset,
    compatibleGearsets,
} = useGearsetResolution(resolveJob);

const attributesEnhancers = ref<Enhancer[]>([]);
const enhancedAttributes = computed<Attributes>(() => {
    let { level, craftsmanship, control, craft_points } = attributes.value;
    const sum = (prev: number, curr: number) => prev + curr;
    craftsmanship += attributesEnhancers.value
        .filter(v => v.cm && v.cm_max)
        .map(v => Math.min((craftsmanship * v.cm!) / 100, v.cm_max!))
        .reduce(sum, 0);
    control += attributesEnhancers.value
        .filter(v => v.ct && v.ct_max)
        .map(v => Math.min((control * v.ct!) / 100, v.ct_max!))
        .reduce(sum, 0);
    craft_points += attributesEnhancers.value
        .filter(v => v.cp && v.cp_max)
        .map(v => Math.min((craft_points * v.cp!) / 100, v.cp_max!))
        .reduce(sum, 0);
    return {
        level,
        craftsmanship,
        control,
        craft_points,
    };
});
// 遊戲規則：配方等級最多可高於玩家等級 5 級。
// 與 src-libs/src/lib.rs 的 `recipe.job_level > attrs.level + 5` 同一條規則，
// 兩邊改動必須同步。
const LEVEL_TOLERANCE = 5;

const levelShortfall = computed(() => {
    const need = props.recipe.job_level;
    const have = enhancedAttributes.value.level;
    return need > have + LEVEL_TOLERANCE ? { need, have } : undefined;
});

// 等級不足時模板不會渲染主體，這裡把等級墊高只是為了讓 setup 頂層的 await 與
// 下方的 watch 不致拋錯——那會被 Page.vue 的 onErrorCaptured 接走，整頁換成
// 錯誤畫面。使用者修正等級後 watch 會以真實屬性重算。
function attributesForSimulation(
    attrs: Attributes,
    recipe: Recipe,
): Attributes {
    const minLevel = recipe.job_level - LEVEL_TOLERANCE;
    return attrs.level >= minLevel ? attrs : { ...attrs, level: minLevel };
}

// 攔阻面板的「套用」：直接改寫 gearsets store 中該列的等級。
// 這會觸發 composable 內的 $subscribe，但那裡已加了「仍相容就不動」的判斷，
// gearsetId 不會被重設，enhancedAttributes 因此重算、面板隨即消失。
function applyGearsetLevel(level: number) {
    gearsetRow.value.value.level = level;
}

const initStatus = ref<Status>({
    ...(await newStatus(
        attributesForSimulation(enhancedAttributes.value, props.recipe),
        props.recipe,
        store.content?.stellarSteadyHandCount ?? 0,
    )),
    quality: 0,
});
const currentStatus = ref<Status>(initStatus.value);
const seq = ref<Slot[]>([]);
const openAttrEnhSelector = ref(false);
const results = ref<Status[]>([]);
const waiting = ref(false);
const preview = ref<Status | null>(null);
const rapidMode = ref(true);
let timer: any;

watch([props, enhancedAttributes], async ([p, attr]) => {
    initStatus.value = {
        ...(await newStatus(
            attributesForSimulation(attr, p.recipe),
            p.recipe,
            store.content?.stellarSteadyHandCount ?? 0,
        )),
        quality: 0,
    };
    // 換裝備／換配方後，正在進行中的模擬（已消耗的耐久、CP、動作序列）全部
    // 不再成立，必須重設。不可呼叫 restart()——那會把 currentStatus 記錄進
    // results，使用者只是換裝備、沒有完成一次製作，不該留下一筆成績。
    currentStatus.value = initStatus.value;
    seq.value.splice(0);
    // 狀態列顯示的是 preview ?? currentStatus，而 preview 是用舊屬性算出來的，
    // 不清掉會在新屬性下繼續顯示一組對不上的數字。
    preview.value = null;
    // results（歷史成績）刻意不清：那是使用者先前真的完成過的製作紀錄，
    // 換裝備不會讓它們沒發生過。waiting／timer 也不需重設，
    // 進行中的那一步會自己在 finally 收尾。
});

const sleep = (t: number) => new Promise(resolve => setTimeout(resolve, t));
async function pushAction(action: Actions) {
    if (waiting.value) return;
    leaveAction();
    try {
        let wait;
        waiting.value = true;
        if (!rapidMode.value) {
        }
        wait = sleep(rapidMode.value ? 300 : 1500);
        const { status, is_success } = await simulateOneStep(
            currentStatus.value,
            action,
            false,
        );
        await wait;
        currentStatus.value = status;
        if (!is_success) {
            action = <Actions>action.concat('_fail');
        }
        seq.value.push({
            id: seq.value.length,
            action,
            condition: currentStatus.value.condition,
        });
        if (
            status.progress >= status.recipe.difficulty ||
            status.durability <= 0
        ) {
            await sleep(2500);
            restart();
        }
    } catch (e: unknown) {
        console.error(e);
    } finally {
        if (timer != null) clearTimeout(timer);
        waiting.value = false;
    }
}

function restart() {
    results.value.push(currentStatus.value);
    seq.value.splice(0);
    currentStatus.value = initStatus.value;
}

function hoverAction(action: Actions) {
    if (timer != null) clearTimeout(timer);
    timer = setTimeout(() => {
        simulateOneStep(currentStatus.value, action, true)
            .then(
                v =>
                    (preview.value = {
                        ...v.status,
                        condition: Conditions.Normal,
                    }),
            )
            .catch(_e => {});
    }, 1000);
}

function leaveAction() {
    if (timer != null) clearTimeout(timer);
    preview.value = null;
}
</script>

<template>
    <LevelRequirementPanel
        v-if="levelShortfall"
        :need="levelShortfall.need"
        :have="levelShortfall.have"
        :gearset-name="gearsetName"
        :gearsets="compatibleGearsets"
        :gearset-id="gearsetId"
        :sync-level="store.content?.syncLevel"
        @select-gearset="selectGearset"
        @apply-level="applyGearsetLevel"
    />
    <div v-else class="main-page">
        <el-dialog v-model="openAttrEnhSelector" :title="$t('meal-and-potion')">
            <AttrEnhSelector
                v-model="attributesEnhancers"
                v-model:gearset-id="gearsetIdModel"
                :job="isCustomRecipe ? undefined : displayJob"
                :attributes="attributes"
            />
        </el-dialog>
        <StatusBarVue
            class="status-bar"
            :attributes="attributes"
            :enhancers="attributesEnhancers"
            :status="preview ?? currentStatus"
            :show-condition="true"
            :collectableShopRefine="collectableShopRefine"
            :attributesClickable="true"
            @click-attributes="openAttrEnhSelector = true"
        />
        <el-scrollbar class="action-queue">
            <ActionQueueVue :job="displayJob" :list="seq" disabled no-hover />
        </el-scrollbar>
        <div class="actionpanel">
            <el-scrollbar class="action-panel">
                <ActionPanelVue
                    @clicked-action="pushAction"
                    :disable="waiting"
                    :job="displayJob"
                    :status="currentStatus"
                    simulator-mode
                    #lower
                    @mousehover-action="hoverAction"
                    @mouseleave-action="leaveAction"
                />
                <el-button class="drop" @click="restart" type="danger">{{
                    $t('restart')
                }}</el-button>
                <el-switch
                    v-model="rapidMode"
                    inline-prompt
                    active-text="高速模式"
                    inactive-text="真实体验"
                />
            </el-scrollbar>
            <el-card class="results">
                <el-scrollbar>
                    <el-table :data="results">
                        <el-table-column prop="step" :label="$t('steps')" />
                        <el-table-column
                            prop="progress"
                            :label="$t('progress')"
                        />
                        <el-table-column
                            prop="quality"
                            :label="$t('quality')"
                        />
                    </el-table>
                </el-scrollbar>
            </el-card>
        </div>
    </div>
</template>

<style scoped>
.el-main {
    background-color: transparent !important;
}

.main-page {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.actionpanel {
    display: flex;
    flex: auto;
    overflow: hidden;
}

.action-queue {
    height: calc(48px * 1.7);
    margin: 5px 6px;
    padding: 5px 0px 0px 0px;
    border-top: 1px solid var(--el-border-color);
    border-bottom: 1px solid var(--el-border-color);
}

.action-panel {
    margin-bottom: 6px;
    max-width: 50%;
}

.results {
    flex: auto;
    margin: 20px;
}

.drop {
    margin: 10px;
}

.el-table {
    --el-table-header-bg-color: transparent;
    --el-table-tr-bg-color: transparent;
}
</style>

<fluent locale="zh-CN">
meal-and-potion = 食物 & 药水
restart = 倒
</fluent>

<fluent locale="zh-TW">
meal-and-potion = 食物 & 藥水
restart = 倒
</fluent>

<fluent locale="en-US">
meal-and-potion = Meal & Potions
restart = Restart
</fluent>

<fluent locale="ja-JP">
meal-and-potion = 食事 & 薬品
restart = リスタート
</fluent>
