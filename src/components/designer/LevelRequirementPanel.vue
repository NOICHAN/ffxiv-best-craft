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
import { computed, ref, watch } from 'vue';
import {
    ElButton,
    ElInputNumber,
    ElOption,
    ElResult,
    ElSelect,
    ElText,
} from 'element-plus';
import { useRouter } from 'vue-router';
import { useFluent } from 'fluent-vue';
import { choiceGearsetDisplayName, GearsetsRow } from '@/libs/Gearsets';

const props = defineProps<{
    // 配方的 job_level
    need: number;
    // 目前使用中的配裝特職等級
    have: number;
    // 目前使用中的配裝顯示名稱
    gearsetName: string;
    // 可切換的相容配裝清單。Simulator 沒有配裝選擇狀態，不傳這個 prop，
    // 屆時下拉整塊不顯示。
    gearsets?: GearsetsRow[];
    // 目前選中的配裝 id，與 gearsets 同進同退
    gearsetId?: number;
    // 等級同步配方時，使用者當初填入的同步等級
    syncLevel?: number;
}>();

const emit = defineEmits<{
    (e: 'selectGearset', id: number): void;
    (e: 'applyLevel', level: number): void;
}>();

const router = useRouter();
const { $t } = useFluent();

// 遊戲規則：配方等級最多可高於玩家等級 5 級。
// 與 src-libs/src/lib.rs 的 `recipe.job_level > attrs.level + 5` 同一條規則，
// 兩邊改動必須同步。
const LEVEL_TOLERANCE = 5;

// 玩家實際需要達到的最低等級
const requiredLevel = computed(() => props.need - LEVEL_TOLERANCE);

// el-select 需要可寫的綁定，但選擇權在父層，所以寫入一律轉成 emit
const selectedGearsetId = computed({
    get: () => props.gearsetId,
    set: v => {
        if (v != undefined) emit('selectGearset', v);
    },
});

// 輸入框的暫存值，按下「套用」才送出，避免每打一個字就寫一次 store
const draftLevel = ref(props.have);
watch(
    () => props.have,
    v => (draftLevel.value = v),
);

const gearsetOptions = computed(() =>
    props.gearsets?.map(row => ({
        id: row.id,
        label: choiceGearsetDisplayName(row),
        level: row.value.level,
        meets: props.need <= row.value.level + LEVEL_TOLERANCE,
    })),
);
</script>

<template>
    <div class="level-gate">
        <el-result icon="warning" :title="$t('level-not-enough')">
            <template #sub-title>
                <div>
                    {{ $t('level-requirement', { need: requiredLevel }) }}
                </div>
                <div>
                    {{ $t('level-current', { gearset: gearsetName, have }) }}
                </div>
            </template>
            <template #extra>
                <div class="level-gate-body">
                    <div
                        v-if="gearsetOptions != undefined"
                        class="level-gate-row"
                    >
                        <span>{{ $t('use-gearset') }}</span>
                        <el-select
                            v-model="selectedGearsetId"
                            style="width: 240px"
                        >
                            <el-option
                                v-for="opt in gearsetOptions"
                                :key="opt.id"
                                :value="opt.id"
                                :label="`${opt.label} Lv.${opt.level}`"
                            >
                                <span>{{ opt.label }}</span>
                                <span class="level-gate-option-level">
                                    Lv.{{ opt.level }}
                                    {{ opt.meets ? '✓' : '✗' }}
                                </span>
                            </el-option>
                        </el-select>
                    </div>

                    <div class="level-gate-row">
                        <span>{{ $t('or-set-level') }}</span>
                        <el-input-number
                            v-model="draftLevel"
                            :min="1"
                            :max="100"
                            :step="1"
                            step-strictly
                            value-on-clear="min"
                            style="width: 140px"
                        />
                        <el-button
                            type="primary"
                            :disabled="draftLevel == have"
                            @click="emit('applyLevel', draftLevel)"
                        >
                            {{ $t('apply') }}
                        </el-button>
                    </div>
                    <el-text size="small" type="info">
                        {{ $t('apply-hint', { gearset: gearsetName }) }}
                    </el-text>

                    <el-text v-if="syncLevel != undefined" type="warning">
                        {{ $t('sync-recipe-hint', { syncLevel }) }}
                    </el-text>

                    <div class="level-gate-row">
                        <el-button @click="router.push({ name: 'gearsets' })">
                            {{ $t('goto-gearsets') }}
                        </el-button>
                        <el-button
                            :type="syncLevel != undefined ? 'primary' : ''"
                            @click="router.push({ name: 'recipe' })"
                        >
                            {{ $t('reselect-recipe') }}
                        </el-button>
                    </div>
                </div>
            </template>
        </el-result>
    </div>
</template>

<style scoped>
.level-gate {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.level-gate-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
}

.level-gate-row {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
}

.level-gate-option-level {
    float: right;
    color: var(--el-text-color-secondary);
}
</style>

<fluent locale="zh-CN">
level-not-enough = 特职等级不足
level-requirement = 此配方需要特职等级 Lv.{ $need } 以上
level-current = 当前装备配置「{ $gearset }」为 Lv.{ $have }
use-gearset = 使用装备配置
or-set-level = 或直接改等级
apply = 应用
apply-hint = 将更新装备配置「{ $gearset }」的特职等级
sync-recipe-hint = 这是一个等级同步配方，Lv.{ $syncLevel } 是您在选择配方时填入的，可回配方页改填较低的值
goto-gearsets = 前往装备配置
reselect-recipe = 重选配方
</fluent>

<fluent locale="zh-TW">
level-not-enough = 特職等級不足
level-requirement = 此配方需要特職等級 Lv.{ $need } 以上
level-current = 目前配裝「{ $gearset }」為 Lv.{ $have }
use-gearset = 使用配裝
or-set-level = 或直接改等級
apply = 套用
apply-hint = 將更新配裝「{ $gearset }」的特職等級
sync-recipe-hint = 這是一個等級同步配方，Lv.{ $syncLevel } 是您在選擇配方時填入的，可回配方頁改填較低的值
goto-gearsets = 前往配裝頁
reselect-recipe = 重選配方
</fluent>

<fluent locale="en-US">
level-not-enough = Class level too low
level-requirement = This recipe requires class level Lv.{ $need } or above
level-current = Current gearset "{ $gearset }" is Lv.{ $have }
use-gearset = Use gearset
or-set-level = Or set level directly
apply = Apply
apply-hint = This will update the class level of gearset "{ $gearset }"
sync-recipe-hint = This is a level-synced recipe. Lv.{ $syncLevel } is the value you entered when selecting the recipe; you can go back and enter a lower one.
goto-gearsets = Go to gearsets
reselect-recipe = Choose another recipe
</fluent>

<fluent locale="ja-JP">
level-not-enough = クラスレベルが不足しています
level-requirement = このレシピはクラスレベル Lv.{ $need } 以上が必要です
level-current = 現在の装備セット「{ $gearset }」は Lv.{ $have } です
use-gearset = 装備セット
or-set-level = またはレベルを直接変更
apply = 適用
apply-hint = 装備セット「{ $gearset }」のクラスレベルを更新します
sync-recipe-hint = これはレベルsyncレシピです。Lv.{ $syncLevel } はレシピ選択時に入力した値です。レシピ画面に戻って低い値を入力できます。
goto-gearsets = 装備セットへ
reselect-recipe = レシピを選び直す
</fluent>
