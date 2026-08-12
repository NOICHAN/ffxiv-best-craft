import"./rolldown-runtime-BYbx6iT9.js";import{An as e,Cn as t,Ct as n,Gt as r,It as i,Jt as a,St as o,Tt as s,_t as c,dn as l,gt as u,ht as d,nr as f,st as p,vt as m,yt as h}from"./dist-B0Pc-_8x.js";import{t as g}from"./button-n89xPMHt.js";import{t as _}from"./css-DSFJZ_wV.js";import{t as v}from"./css-B6TcRP8B.js";import{E as y,_r as b,t as x,vr as S}from"./main-PcyNe_tj.js";import{t as C}from"./eastereggs-tV-3FKe0.js";var w={class:`container`},T={class:`greeting-box`},E={class:`confirm-button`},D=s({__name:`Welcome`,emits:[`setTitle`],setup(s,{emit:x}){let S=x;i(()=>S(`setTitle`,``));let{$t:D}=b(),O=t(``),k=d(()=>{let e=new Date().getHours();return e>=4&&e<6?`beforedawn`:e>=6&&e<11?`morning`:e>=11&&e<14?`noon`:e>=14&&e<19?`afternoon`:e>=19&&e<21?`evening`:`night`});return(t,i)=>(r(),h(`div`,w,[u(`div`,T,[n(e(v),{class:`greeting`},{default:l(()=>[o(f(O.value?O.value:e(D)(`welcome`,{time:k.value})),1)]),_:1})]),u(`div`,E,[n(e(g),{type:`primary`,size:`large`,onClick:i[0]||=e=>t.$router.push(`/recipe`)},{default:l(()=>[o(f(e(D)(`select-recipe`)),1)]),_:1}),(r(!0),h(p,null,a(e(C),t=>(r(),c(e(g),{key:t.t0,type:`warning`,size:`large`,onClick:e=>O.value+=t.t0},{default:l(()=>[o(f(t.t1),1)]),_:2},1032,[`onClick`]))),128))]),e(!0)&&e(y)?(r(),c(e(_),{key:0,target:`_blank`,href:`https://beian.miit.gov.cn/`,type:`info`},{default:l(()=>[...i[1]||=[o(` 粤ICP备2021156196号-1 `,-1)]]),_:1})):m(``,!0),n(e(v),{class:`info-text`,type:`info`},{default:l(()=>[o(f(e(D)(`copyright-notices`)),1)]),_:1})]))}});function O(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`zh-CN`]=new S(`greeting = 
    { $time ->
        [beforedawn] 日出东方隈，似从地底来
        [morning] 早上好
        [noon] 中午好
        [afternoon] 下午好
        [evening] 晚上好
        [night] 夜深了
        *[other] 很高兴见到你
    }
welcome = { greeting }，欢迎使用生产模拟器
input-recipe-name = 输入配方名称
loading = 加载中
no-match = 没有匹配的配方
no-data = 无配方

confirm = 确认
select-recipe = 选择配方
download-desktop-edition = 下载桌面客户端`)}function k(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`zh-TW`]=new S(`greeting = 
    { $time ->
        [beforedawn] 日出東方隈，似從地底來
        [morning] 早上好
        [noon] 中午好
        [afternoon] 下午好
        [evening] 晚上好
        [night] 夜深了
        *[other] 很高興見到你
    }
welcome = { greeting }，歡迎使用生產計算器
input-recipe-name = 輸入配方名稱
loading = 載入中
no-match = 沒有匹配的配方
no-data = 無配方

confirm = 確認
select-recipe = 選擇配方
download-desktop-edition = 下載桌面客戶端`)}function A(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`en-US`]=new S(`greeting = 
    { $time ->
        [beforedawn] Good morning
        [morning] Good morning
        [noon] Good afternoon
        [afternoon] Good afternoon
        [evening] Good evening
        [night] It's getting late at night
        *[other] Nice to see you
    }
welcome = { greeting }. Welcome using BestCraft for FFXIV DAWNTRAIL.
input-recipe-name = Input recipe name
loading = Loading
no-match = No match recipe
no-data = No recipe

confirm = Confirm
select-recipe = Select recipe
download-desktop-edition = Download Desktop Edition`)}function j(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`ja-JP`]=new S(`greeting = 
    { $time ->
        [beforedawn] おはようございます
        [morning] おはようございます
        [noon] こんにちは
        [afternoon] こんにちは
        [evening] こんばんは
        [night] 夜も更けてまいりました
        *[other] はじめまして
    }
welcome = { greeting }、BestCraftへようこそ
input-recipe-name = レシピ名を入力
loading = 読み込み中
no-match = 一致するレシピがありません
no-data = レシピがありません

confirm = 確認
select-recipe = レシピを選択
download-desktop-edition = デスクトップ版のダウンロード`)}typeof O==`function`&&O(D),typeof k==`function`&&k(D),typeof A==`function`&&A(D),typeof j==`function`&&j(D);var M=x(D,[[`__scopeId`,`data-v-ccece24c`]]);export{M as default};
//# sourceMappingURL=Welcome-BuREkj3w.js.map