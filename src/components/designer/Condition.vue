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

    /* 底座的幾何先在這裡定好（邊框透明），讓 normal 與其他狀態切換時
       不會因為多出邊框與內距而位移 */
    padding: 0 8px;
    border: 1px solid transparent;
    border-radius: var(--el-border-radius-round);
}

#text {
    font-size: small;
    vertical-align: middle;
    /* vertical-align: baseline; */
}

/* .normal {
    color: var(--el-text-color-primary);
} */

/* 遊戲製作狀態是語意色，色相必須保留，但 red/black/blue/darkblue/purple…
   這些 CSS 具名色在深色底上最低只有 1.06:1。比照 D8 的做法，把圖示畫在
   固定底座 --tnze-bar-track 上並以 --tnze-bar-outline 描邊：底座對兩套
   主題的表面都由描邊負責 3:1，狀態色只要對底座達 3:1 即可，因此深淺兩套
   主題可以共用同一組色（token 見 theme.css 的 --tnze-cond-*）。 */
#icon.good,
#icon.excellent,
#icon.poor,
#icon.centered,
#icon.sturdy,
#icon.pliant,
#icon.malleable,
#icon.primed,
#icon.goodomen,
#icon.robust {
    background-color: var(--tnze-bar-track);
    border-color: var(--tnze-bar-outline);
}

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
