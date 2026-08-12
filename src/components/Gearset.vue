<!-- 
    This file is part of BestCraft.
    Copyright (C) 2025  Tnze

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
    ElForm,
    ElFormItem,
    ElInputNumber,
    ElInput,
    ElCheckboxGroup,
    ElCheckboxButton,
    ElSwitch,
    ElText,
} from 'element-plus';
import { Jobs } from '@/libs/Craft';
import useGearsets from '@/stores/gearsets';
import useGearsetSelection from '@/stores/gearset-selection';
import { choiceGearsetDisplayName } from '@/libs/Gearsets';

const store = useGearsets();
const selection = useGearsetSelection();
const props = defineProps<{
    index: number;
    simplify?: boolean;
}>();
</script>

<template>
    <el-form label-position="right" label-width="auto">
        <template v-if="!simplify && store.gearsets[index].id != 0">
            <el-form-item :label="$t('gearset-name')">
                <el-input
                    v-model="store.gearsets[index].name"
                    class="set-name-input"
                    :maxlength="10"
                    :placeholder="
                        choiceGearsetDisplayName(store.gearsets[index])
                    "
                />
            </el-form-item>
            <el-form-item :label="$t('job')">
                <el-checkbox-group
                    v-model="store.gearsets[index].compatibleJobs"
                    size="small"
                >
                    <el-checkbox-button
                        v-for="job in Object.values(Jobs)"
                        :label="$t(job)"
                        :value="job"
                    />
                </el-checkbox-group>
            </el-form-item>
        </template>
        <template v-if="!simplify && store.gearsets[index].id == 0">
            <el-form-item>
                <el-switch
                    v-model="selection.alwaysUseDefault"
                    :active-text="$t('always-use-default')"
                />
            </el-form-item>
            <el-form-item>
                <el-text size="small" type="info">
                    {{ $t('always-use-default-hint') }}
                </el-text>
            </el-form-item>
        </template>
        <el-form-item :label="$t('level')">
            <el-input-number
                v-model="store.gearsets[index].value.level"
                :min="1"
                :max="100"
                :step-strictly="true"
                :value-on-clear="0"
            />
        </el-form-item>
        <el-form-item :label="$t('craftsmanship')">
            <el-input-number
                v-model="store.gearsets[index].value.craftsmanship"
                :min="0"
                :step-strictly="true"
                :value-on-clear="0"
            />
        </el-form-item>
        <el-form-item :label="$t('control')">
            <el-input-number
                v-model="store.gearsets[index].value.control"
                :min="0"
                :step-strictly="true"
                :value-on-clear="0"
            />
        </el-form-item>
        <el-form-item :label="$t('craft-point')">
            <el-input-number
                v-model="store.gearsets[index].value.craft_points"
                :min="0"
                :step-strictly="true"
                :value-on-clear="0"
            />
        </el-form-item>
    </el-form>
</template>

<style scoped>
.set-name-input {
    width: 200px;
}
</style>

<fluent locale="zh-CN">
gearset-name = 配装名称
job = 适配职业
attributes = 装备属性
inherit-from-default = 继承自默认
always-use-default = 所有职业都使用这组属性
always-use-default-hint = 开启后，制作界面一律使用这一列。各职业的个别选择会被保留，关闭后重新生效。
</fluent>

<fluent locale="zh-TW">
gearset-name = 配裝名稱
job = 適配職業
attributes = 裝備屬性
inherit-from-default = 繼承自預設
always-use-default = 所有職業都使用這組屬性
always-use-default-hint = 開啟後，製作介面一律使用這一列。各職業的個別選擇會被保留，關閉後重新生效。
</fluent>

<fluent locale="en-US">
gearset-name = Gearset Name
job = Fit Job
attributes = Crafter Attributes
inherit-from-default = Inherit from default
always-use-default = Use these attributes for every job
always-use-default-hint = While this is on, the crafting screens always use this row. Per-job choices are kept and take effect again when you turn it off.
</fluent>

<fluent locale="ja-JP">
gearset-name = ギアセット名
attributes = 属性
inherit-from-default = デフォルトから継承
always-use-default = すべてのクラスでこの属性を使う
always-use-default-hint = オンの間、製作画面は常にこの行を使用します。クラスごとの選択は保持され、オフにすると再び有効になります。
</fluent>
