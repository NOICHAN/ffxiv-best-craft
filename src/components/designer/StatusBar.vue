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
import { ElProgress } from 'element-plus';
import { computed, ref } from 'vue';
import { asyncComputed, useElementSize } from '@vueuse/core';
import {
    Attributes,
    CollectablesShopRefine,
    Status,
    highQualityProbability,
} from '@/libs/Craft';
import Buffs from './Buffs.vue';
import Condition from './Condition.vue';
import DurabilityProgressBar from './DurabilityProgressBar.vue';
import CollectabilityRefineMark from './CollectabilityRefineMark.vue';
import { collectabilityPalette } from './consts';

const props = defineProps<{
    status: Status;
    attributes: Attributes;
    showCondition: boolean;
    collectableShopRefine?: CollectablesShopRefine;
    // 是否顯示「可點擊屬性區塊」的視覺提示（游標樣式等）。
    // 這支元件同時被 Designer.vue（未監聽 click-attributes）與
    // Simulator.vue（有監聽並開啟配裝／食藥對話框）使用，
    // 若不論有沒有監聽者都套用 cursor: pointer，Designer 那邊
    // 就會出現「看起來能點但點了沒反應」的假提示，因此需要由呼叫端自行宣告。
    attributesClickable?: boolean;
}>();

const qualityProgressBar = ref();
const { width: qualityProgressBarWidth } = useElementSize(qualityProgressBar);

const progress = computed<number>(() =>
    props.status.recipe.difficulty == 0
        ? 100
        : (props.status.progress / props.status.recipe.difficulty) * 100,
);
const remainingProgress = computed(
    () => props.status.recipe.difficulty - props.status.progress,
);
const quality = computed<number>(() =>
    props.status.recipe.quality == 0
        ? 100
        : (props.status.quality / props.status.recipe.quality) * 100,
);

const progressColor = computed<string>(() => {
    if (props.status.progress >= props.status.recipe.difficulty)
        return '#4ade80';
    if (props.status.durability <= 0) return '#ff8f8f';
    return '#63b0ff';
});

const qualityColor = computed<string>(() =>
    props.status.quality >= props.status.recipe.quality ? '#4ade80' : '#63b0ff',
);

const craftPointPercentage = computed(() =>
    props.status.attributes.craft_points == 0
        ? 100
        : (props.status.craft_points / props.status.attributes.craft_points) *
          100,
);

const collectabilityLevel = computed(() => {
    if (props.collectableShopRefine == undefined) {
        return undefined;
    }
    const { low_collectability, mid_collectability, high_collectability } =
        props.collectableShopRefine;
    const collectability = props.status.quality / 10;
    if (collectability < low_collectability) {
        return 0;
    }
    if (collectability < mid_collectability) {
        return 1;
    }
    if (collectability < high_collectability) {
        return 2;
    }
    return 3;
});
const collectabilityColor = computed(() => {
    const i = collectabilityLevel.value;
    if (i === undefined || i === 0 || i > collectabilityPalette.length) {
        return undefined;
    }
    return collectabilityPalette[i - 1];
});

const hqPerc = asyncComputed(() => highQualityProbability(props.status), null);

// emit 本身無條件觸發即可：沒有監聽者的元件（例如 Designer.vue）
// 不會受影響，只是沒有人接收這個事件。
const emit = defineEmits<{
    'click-attributes': [];
}>();

// 鍵盤觸發（Enter／空白）。在模擬器裡這個區塊是開啟配裝／食藥對話框的
// 唯一入口，沒有這段鍵盤使用者完全打不開。
// 這裡必須看 attributesClickable：role/tabindex 只在可點擊時才加，
// 否則 Designer 會多出一個按了沒反應的 tab stop；空白鍵的 preventDefault
// 同理，不可以在不可點擊時擋掉頁面捲動。
function onAttributesKeydown(e: KeyboardEvent) {
    if (!props.attributesClickable) return;
    e.preventDefault();
    emit('click-attributes');
}
</script>

<template>
    <div class="conatiner">
        <div id="durability-and-condition">
            <div id="durability">
                <span class="bar-title">{{ $t('durability') }} &nbsp;</span>
                <span>
                    {{ status.durability }} /
                    {{ status.recipe.durability }}
                </span>
                <DurabilityProgressBar
                    v-model="status.durability"
                    :max="status.recipe.durability"
                />

                <span class="bar-title">{{ $t('craft-point') }} &nbsp;</span>
                <span>
                    {{ status.craft_points }} /
                    {{ status.attributes.craft_points }}
                </span>
                <el-progress
                    :stroke-width="12"
                    :percentage="craftPointPercentage"
                    :show-text="false"
                    color="#ffb0b0"
                    striped
                />

                <Condition v-if="showCondition" :cond="status.condition" />
            </div>
        </div>
        <div id="progress-and-buffs">
            <span class="bar-title">{{ $t('progress') }} &nbsp;</span>
            <span>
                {{ status.progress }} / {{ status.recipe.difficulty }}
            </span>
            <template v-if="remainingProgress > 0">
                <span class="bar-title">
                    &nbsp; {{ $t('remaining') }} &nbsp;
                </span>
                <span>{{ remainingProgress }}</span>
            </template>
            <el-progress
                :percentage="progress"
                :color="progressColor"
                :show-text="false"
                :stroke-width="10"
            />
            <div style="height: 1em"></div>
            <span class="bar-title">{{ $t('quality') }} &nbsp;</span>
            <span> {{ status.quality }} / {{ status.recipe.quality }} </span>
            <template v-if="hqPerc != null">
                <span class="bar-title">
                    &nbsp; {{ $t('hq-probability') }} &nbsp;
                </span>
                <span> {{ hqPerc }}% </span>
            </template>
            <template v-if="collectableShopRefine != undefined">
                <span class="bar-title">
                    &nbsp; {{ $t('collectability-stage') }} &nbsp;
                </span>
                <span>{{ collectabilityLevel }}</span>
            </template>
            <el-progress
                ref="qualityProgressBar"
                :percentage="quality"
                :color="collectabilityColor ?? qualityColor"
                :show-text="false"
                :stroke-width="10"
            />
            <CollectabilityRefineMark
                v-if="
                    collectableShopRefine != undefined &&
                    status.recipe.quality > 0 &&
                    qualityProgressBarWidth > 0
                "
                :collectableShopRefine="collectableShopRefine"
                :max-collectability="status.recipe.quality / 10"
                :progres-bar-width="qualityProgressBarWidth"
            />
            <Buffs id="buffs" :buffs="status.buffs" />
        </div>
        <div
            id="attributes"
            :class="{ clickable: attributesClickable }"
            :role="attributesClickable ? 'button' : undefined"
            :tabindex="attributesClickable ? 0 : undefined"
            @click="emit('click-attributes')"
            @keydown.enter="onAttributesKeydown"
            @keydown.space="onAttributesKeydown"
        >
            <div class="attr-block">
                <span class="attr-label">
                    {{ $t('display-attrs-label', { label: $t('level') }) }}
                </span>
                <span class="attr-value"> {{ status.attributes.level }}</span>
            </div>
            <div class="attr-block">
                <span class="attr-label">
                    {{
                        $t('display-attrs-label', {
                            label: $t('craftsmanship'),
                        })
                    }}
                </span>
                <span class="attr-value">
                    {{ status.attributes.craftsmanship }}
                </span>
            </div>
            <div class="attr-block">
                <span class="attr-label">
                    {{ $t('display-attrs-label', { label: $t('control') }) }}
                </span>
                <span class="attr-value">
                    {{ status.attributes.control }}
                </span>
            </div>
            <div class="attr-block">
                <span class="attr-label">
                    {{
                        $t('display-attrs-label', { label: $t('craft-point') })
                    }}
                </span>
                <span class="attr-value">
                    {{ status.attributes.craft_points }}
                </span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.conatiner {
    width: 100%;
    display: flex;
    font-size: 14px;
    color: var(--el-text-color-regular);
}

#durability-and-condition {
    /* padding: 3px 10px 5px 5px; */
    flex: none;
}

#durability {
    padding: 5px;
}

#craft-point {
    margin-top: 7px;
}

#progress-and-buffs {
    padding: 7px;
    flex-grow: 5;
}

#buffs {
    margin-top: 7px;
}

#attributes {
    font-size: 14px;
    line-height: 1.5;
    padding: 0px 20px 0px 10px;
    /* flex-grow: 2; */
    color: var(--el-text-color-secondary);
}

/* 只有呼叫端明確宣告 attributesClickable 時才顯示可點擊提示，
   避免在沒有監聽 click-attributes 的地方（例如 Designer.vue）
   出現點了沒反應的假游標 */
#attributes.clickable {
    cursor: pointer;
}

.attr-block {
    display: flex;
    justify-content: space-between;
}

.attr-label {
    text-align: left;
    display: inline-block;
    margin-right: 10px;
}

.attr-value {
    display: inline-block;
}

.bar-title {
    user-select: none;
}

/* 語意條的軌道固定不隨主題變色，邊界由描邊負責，
   使語意色的對比只跟軌道比較，一次驗證永久成立 */
:deep(.el-progress-bar__outer) {
    background-color: var(--tnze-bar-track);
    outline: 1px solid var(--tnze-bar-outline);
}

@media screen and (max-width: 480px) {
    .conatiner {
        flex-wrap: wrap;
    }

    #progress-and-buffs {
        flex: 1 0 100%;
        padding: 5px;
    }

    #durability-and-condition {
        order: -2;
        flex: auto;
    }

    #attributes {
        order: -1;
    }
}
</style>

<fluent locale="zh-CN">
display-attrs-label = { $label }：
remaining = 剩余
collectability-stage = 收藏价值等级
hq-probability = 优质率
</fluent>

<fluent locale="zh-TW">
display-attrs-label = { $label }：
remaining = 剩餘
collectability-stage = 收藏價值等級
hq-probability = 優質率
</fluent>

<fluent locale="en-US">
display-attrs-label = { $label }: 
remaining = Remaining
collectability-stage = Collectability Stage
hq-probability = HQ
</fluent>

<fluent locale="ja-JP">
display-attrs-label = { $label }：
remaining = 残り
collectability-stage = 収集価値ランク
hq-probability = HQ率
</fluent>
