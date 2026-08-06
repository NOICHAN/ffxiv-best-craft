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
import { useDark } from '@vueuse/core';
import { Conditions } from '@/libs/Craft';

const props = defineProps<{
    cond: Conditions;
}>();

const dark = useDark();
</script>

<template>
    <span id="icon" :class="props.cond.toLowerCase()">
        {{ cond == Conditions.Normal && !dark ? '○' : '●' }}
    </span>
    &nbsp;
    <span id="text">{{ $t(cond.toLowerCase()) }}</span>
</template>

<style>
#icon {
    font-size: x-large;
    vertical-align: middle;
    /* vertical-align: baseline; */
}

#text {
    font-size: small;
    vertical-align: middle;
    /* vertical-align: baseline; */
}

/* .normal {
    color: var(--el-text-color-primary);
} */

/* 狀態色改讀 --tnze-cond-*（見 theme.css）。淺色主題的 token 值就是原本的
   CSS 具名色，外觀完全不變；深色主題另有一組提亮版，解決 black/darkblue/
   purple 在深色底上只有 1.06:1 而消失的問題。 */
.good {
    color: var(--tnze-cond-red);
}

.excellent {
    color: var(--tnze-cond-red);
    animation: excellent-color 1s infinite;
}

@keyframes excellent-color {
    0% {
        color: var(--tnze-cond-gray);
    }

    12% {
        color: var(--tnze-cond-red);
    }

    24% {
        color: var(--tnze-cond-gray);
    }

    36% {
        color: var(--tnze-cond-yellow);
    }

    48% {
        color: var(--tnze-cond-blue);
    }

    60% {
        color: var(--tnze-cond-green);
    }

    72% {
        color: var(--tnze-cond-navy);
    }

    100% {
        color: var(--tnze-cond-purple);
    }
}

.poor {
    color: var(--tnze-cond-gray);
}

.centered {
    color: var(--tnze-cond-yellow);
    text-shadow: 0px 0px 10px var(--tnze-bar-track);
}

.sturdy {
    color: var(--tnze-cond-blue);
}

.pliant {
    color: var(--tnze-cond-green);
}

.malleable {
    color: var(--tnze-cond-navy);
}

.primed {
    color: var(--tnze-cond-purple);
}

.goodomen {
    color: var(--tnze-cond-pink);
}

.robust {
    color: var(--tnze-cond-skyblue);
}
</style>

<fluent locale="zh-CN">
condition = 制作状态
</fluent>

<fluent locale="zh-TW">
condition = 製作狀態
</fluent>

<fluent locale="en-US">
condition = Condition
</fluent>

<fluent locale="ja-JP">
condition = 製作状態
</fluent>
