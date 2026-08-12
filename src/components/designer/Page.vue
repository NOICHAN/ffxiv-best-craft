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
    ElEmpty,
    ElResult,
    ElButton,
    ElText,
    ElSkeleton,
    ElCollapse,
    ElCollapseItem,
    ElMessage,
} from 'element-plus';
import {
    computed,
    defineAsyncComponent,
    onErrorCaptured,
    ref,
    provide,
    onActivated,
} from 'vue';
import useDesignerStore from '@/stores/designer';
import { useFluent } from 'fluent-vue';
import { displayJobKey } from './injectionkeys';
import { Jobs } from '@/libs/Craft';
import { useRouter } from 'vue-router';
import { isTauri } from '@/libs/Consts';

const emit = defineEmits<{
    (e: 'setTitle', title: string): void;
}>();

const designerStore = useDesignerStore();
const { $t } = useFluent();

onActivated(() => {
    emit('setTitle', designerStore.content?.item.name ?? '');
    // 使用者換了配方回到本頁，重試計數歸零
    hasRetried.value = false;
});

const Designer = defineAsyncComponent(() => import('./Designer.vue'));
const Simulator = defineAsyncComponent(() => import('./Simulator.vue'));

const isCustomRecipe = computed(() => designerStore.content?.job === undefined);

provide(
    displayJobKey,
    computed(() => designerStore.content?.job ?? Jobs.Culinarian),
);

const router = useRouter();

const fatalError = ref<{ message: string; detail: string }>();
// 使用者已經按過一次「重試」；重試仍失敗才建議重新整理
const hasRetried = ref(false);
// 遞增即可強制重建 Designer / Simulator。清 fatalError 只是讓 v-if 切回內容，
// async setup 已經 reject 的那個元件實例必須靠 key 變動才會被換掉，兩者缺一不可。
const contentKey = ref(0);

onErrorCaptured((err: unknown, instance, info) => {
    console.error(err, instance, info);
    const raw = String(err);
    let message: string;
    try {
        message = $t(raw);
    } catch {
        message = raw;
    }
    fatalError.value = {
        message,
        // 保留原始字串與 stack 給使用者複製回報，$t 之後的在地化訊息對 issue 沒有幫助
        detail: [raw, info, (err as Error)?.stack].filter(Boolean).join('\n'),
    };
    return false;
});

// 訊息可能已被 $t 換成在地化字串，原始的 WebAssembly 字樣只保證留在 detail。
// 原本寫的是 `errorMessage.search('WebAssembly') > 0`，String.search 在開頭命中
// 時回 0，`> 0` 為偽——正是最需要這個提示的情況反而不顯示。
const isWasmError = computed(
    () => fatalError.value?.detail.includes('WebAssembly') ?? false,
);

function retry() {
    hasRetried.value = true;
    fatalError.value = undefined;
    contentKey.value++;
}

function reload() {
    window.location.reload();
}

function backToRecipe() {
    router.push({ name: 'recipe' });
}

async function copyDetail() {
    const text = fatalError.value?.detail ?? '';
    try {
        if (isTauri) {
            const { writeText } =
                await import('@tauri-apps/plugin-clipboard-manager');
            await writeText(text);
        } else {
            const { useClipboard } = await import('@vueuse/core');
            await useClipboard().copy(text);
        }
        ElMessage.success($t('copied'));
    } catch (e) {
        ElMessage.error(String(e));
    }
}
</script>

<template>
    <Suspense :timeout="30">
        <el-result
            v-if="fatalError"
            icon="error"
            :title="$t('error-happens')"
            :sub-title="fatalError.message"
        >
            <template #extra>
                <template v-if="isWasmError">
                    <el-text type="warning">
                        {{ $t('upgrade-browser') }}
                    </el-text>
                    <br />
                </template>
                <div class="error-actions">
                    <el-button type="primary" @click="retry">
                        {{ $t('retry') }}
                    </el-button>
                    <el-button @click="backToRecipe">
                        {{ $t('back-to-recipe') }}
                    </el-button>
                    <el-button v-if="hasRetried" @click="reload">
                        {{ $t('reload') }}
                    </el-button>
                </div>
                <el-text v-if="hasRetried" type="info">
                    {{ $t('report-invite') }}
                </el-text>
                <el-collapse class="error-detail">
                    <el-collapse-item :title="$t('error-detail')">
                        <pre class="error-detail-text">{{
                            fatalError.detail
                        }}</pre>
                        <el-button size="small" @click="copyDetail">
                            {{ $t('copy') }}
                        </el-button>
                    </el-collapse-item>
                </el-collapse>
            </template>
        </el-result>
        <template v-else-if="designerStore.content != null">
            <Designer
                v-if="!designerStore.content.simulatorMode"
                :key="contentKey"
                :item="designerStore.content.item"
                :recipe="designerStore.content.recipe"
                :recipe-id="designerStore.content.recipeId"
                :material-quality-factor="
                    designerStore.content.materialQualityFactor
                "
                :requirements="designerStore.content.requirements"
                :collectable-shop-refine="designerStore.content.collectability"
                :is-custom-recipe="isCustomRecipe"
            />
            <Simulator
                v-else
                :key="contentKey"
                :item="designerStore.content.item"
                :recipe="designerStore.content.recipe"
                :collectable-shop-refine="designerStore.content.collectability"
                :is-custom-recipe="isCustomRecipe"
            />
        </template>
        <el-empty
            v-else
            :description="$t('not-selected')"
            style="height: 100%"
        />

        <template #fallback>
            <el-skeleton :rows="5" animated />
        </template>
    </Suspense>
</template>

<style scoped>
.el-result {
    vertical-align: middle;
}

.error-actions {
    display: flex;
    gap: 10px;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 10px;
}

.error-detail {
    margin-top: 15px;
    text-align: left;
}

.error-detail-text {
    white-space: pre-wrap;
    word-break: break-all;
    font-size: 12px;
    color: var(--el-text-color-secondary);
    margin: 0 0 10px;
}
</style>

<fluent locale="zh-CN">
error-happens = 加载配方时出现了一些错误
not-selected = 请先选择配方
upgrade-browser = 这个问题似乎是浏览器版本过旧导致的，请尝试更新您的浏览器
retry = 重试
back-to-recipe = 回配方检索
reload = 刷新
error-detail = 错误详情
copy = 复制
copied = 已复制
report-invite = 如果这个问题持续发生，欢迎回报至本项目仓库
</fluent>

<fluent locale="zh-TW">
error-happens = 載入配方時出現了一些錯誤
not-selected = 請先選擇配方
upgrade-browser = 這個問題似乎是瀏覽器版本過舊導致的，請嘗試更新您的瀏覽器
retry = 重試
back-to-recipe = 回配方檢索
reload = 重新整理
error-detail = 錯誤詳情
copy = 複製
copied = 已複製
report-invite = 如果這個問題持續發生，歡迎回報至本專案倉庫
</fluent>

<fluent locale="en-US">
error-happens = Something went wrong while loading the recipe
not-selected = Please select recipe first
upgrade-browser = Please try upgrade your browser
retry = Retry
back-to-recipe = Back to recipes
reload = Reload
error-detail = Error details
copy = Copy
copied = Copied
report-invite = If this keeps happening, please report it to the project repository
</fluent>

<fluent locale="ja-JP">
error-happens = レシピの読み込み中にエラーが発生しました
not-selected = 先にレシピを選択してください
upgrade-browser = ブラウザのバージョンが古い可能性があります。更新をお試しください
retry = 再試行
back-to-recipe = レシピ検索へ
reload = 再ロード
error-detail = エラーの詳細
copy = コピー
copied = コピーしました
report-invite = この問題が続く場合は、リポジトリまでご報告ください
</fluent>
