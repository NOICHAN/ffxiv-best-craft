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
import { ElAlert, ElButton } from 'element-plus';
import { useFluent } from 'fluent-vue';

defineProps<{
    // 已經過 describeError 處理的可讀訊息
    message: string;
}>();

const emit = defineEmits<{
    (e: 'retry'): void;
}>();

const { $t } = useFluent();
</script>

<template>
    <el-alert class="block-load-error" type="error" :closable="false" show-icon>
        <template #title>{{ $t('load-failed') }}</template>
        <div class="block-load-error-body">
            <span class="block-load-error-message">{{ message }}</span>
            <el-button size="small" @click="emit('retry')">
                {{ $t('retry') }}
            </el-button>
        </div>
    </el-alert>
</template>

<style scoped>
.block-load-error {
    margin-bottom: 10px;
}

.block-load-error-body {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
}

.block-load-error-message {
    flex: 1 1 auto;
    min-width: 0;
    word-break: break-word;
}
</style>

<fluent locale="zh-CN">
load-failed = 载入失败
retry = 重试
</fluent>

<fluent locale="zh-TW">
load-failed = 載入失敗
retry = 重試
</fluent>

<fluent locale="en-US">
load-failed = Loading failed
retry = Retry
</fluent>

<fluent locale="ja-JP">
load-failed = 読み込みに失敗しました
retry = 再試行
</fluent>
