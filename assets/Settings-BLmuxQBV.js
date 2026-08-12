import"./rolldown-runtime-BYbx6iT9.js";import{An as e,Cn as t,Ct as n,Gt as r,It as i,Jt as a,St as o,Tt as s,_n as c,_t as l,dn as u,gt as d,ht as f,m as p,nr as m,st as h,vt as g,yt as _}from"./dist-B0Pc-_8x.js";import{n as v,t as y}from"./css-BTx7bOcw.js";import{o as b,s as x,t as S,u as C}from"./css-CH9SXEs6.js";import{t as ee}from"./css-BBodHXwG.js";import{n as w,t as T}from"./css-C5L4HwiV.js";import{t as E}from"./css-CQXHairq.js";import{t as D}from"./button-n89xPMHt.js";import{n as O,t as k}from"./css-DbNXgHsh.js";import{t as A}from"./css-DSFJZ_wV.js";import{t as j}from"./css-B6TcRP8B.js";import"./preload-helper-rX7koMlN.js";import{E as M,T as N,_r as P,n as F,t as I,vr as L,w as R}from"./main-PcyNe_tj.js";import{r as z}from"./Utils-BrVsjK-A.js";import{n as B}from"./eastereggs-tV-3FKe0.js";var V=s({__name:`SupportUs`,setup(t){return(t,i)=>(r(),l(e(y),{column:1,border:!0},{default:u(()=>[n(e(v),{label:`支持软件开发维护`},{default:u(()=>[i[2]||=o(` 欢迎至项目 Github 仓库贡献 `,-1),n(e(C),{effect:`plain`,round:``},{default:u(()=>[...i[0]||=[o(`PR`,-1)]]),_:1}),i[3]||=o(` 或 `,-1),n(e(C),{effect:`plain`,round:``},{default:u(()=>[...i[1]||=[o(`Star`,-1)]]),_:1})]),_:1}),n(e(v),{label:`支持 YYYY.GAMES 服务器运行`},{default:u(()=>[...i[4]||=[d(`a`,{href:`https://ifdian.net/@ffxivtk`,target:`_blank`},[d(`img`,{src:`/ffxiv-best-craft/assets/coffee-5tP2pl7z.png`,alt:`Buy Me a Coffee`,style:{"vertical-align":`middle`}})],-1)]]),_:1})]),_:1}))}}),H={style:{float:`left`}},U={class:`data-source-option-note`},W={style:{float:`left`}},G=10,K=200,q=s({__name:`Settings`,emits:[`setTitle`],setup(s,{emit:v}){let y=v;i(()=>y(`setTitle`,`settings`));let{$t:C}=P(),I=N(),L=p().store;t(`BestCraft`);let q=t(``),J=t(``);var Y=t(!1),X=async()=>{};let Z=t(!1),Q=t(!1);function te(){let e=R.get(I.dataSource),t=I.dataSourceLang;e&&e.length>0&&e.find(e=>e==t)==null&&(I.dataSourceLang=e[0])}let $=f({get:()=>I.recipeTablePageSize,set:e=>I.setRecipeTablePageSize(e)});return(t,i)=>(r(),l(e(E),null,{default:u(()=>[n(e(T),{class:`setting-page`,"label-width":`120px`},{default:u(()=>[n(e(w),{label:e(C)(`language`)},{default:u(()=>[n(e(x),{modelValue:e(I).language,"onUpdate:modelValue":i[0]||=t=>e(I).language=t},{default:u(()=>[n(e(b),{label:e(C)(`system-lang`),value:`system`},null,8,[`label`]),(r(!0),_(h,null,a(e(F),([t,n])=>(r(),l(e(b),{label:n,value:t},null,8,[`label`,`value`]))),256))]),_:1},8,[`modelValue`])]),_:1},8,[`label`]),n(e(w),{label:e(C)(`theme`)},{default:u(()=>[n(e(O),{modelValue:e(L),"onUpdate:modelValue":i[1]||=e=>c(L)?L.value=e:null},{default:u(()=>[n(e(k),{value:`light`},{default:u(()=>[o(m(e(C)(`light`)),1)]),_:1}),n(e(k),{value:`dark`},{default:u(()=>[o(m(e(C)(`dark`)),1)]),_:1}),n(e(k),{value:`auto`},{default:u(()=>[o(m(e(C)(`auto`)),1)]),_:1})]),_:1},8,[`modelValue`])]),_:1},8,[`label`]),n(e(w),{label:e(C)(`data-source`)},{default:u(()=>[n(e(x),{modelValue:e(I).dataSource,"onUpdate:modelValue":i[2]||=t=>e(I).dataSource=t,onChange:te},{default:u(()=>[(r(!0),_(h,null,a(e(R),t=>(r(),l(e(b),{label:e(C)(`ds-${t[0].replace(`.`,``)}`),value:t[0]},{default:u(()=>[d(`span`,H,m(e(C)(`ds-${t[0].replace(`.`,``)}`)),1),d(`span`,U,m(e(C)(`ds-${t[0].replace(`.`,``)}-desc`)),1)]),_:2},1032,[`label`,`value`]))),256))]),_:1},8,[`modelValue`])]),_:1},8,[`label`]),n(e(w),{label:e(C)(`page-size`)},{default:u(()=>[n(e(ee),{modelValue:$.value,"onUpdate:modelValue":i[3]||=e=>$.value=e,min:G,max:K,step:10,precision:0,"controls-position":`right`},null,8,[`modelValue`])]),_:1},8,[`label`]),(e(R).get(e(I).dataSource)?.length??0)>1?(r(),l(e(w),{key:0},{default:u(()=>[n(e(x),{modelValue:e(I).dataSourceLang,"onUpdate:modelValue":i[4]||=t=>e(I).dataSourceLang=t},{default:u(()=>[(r(!0),_(h,null,a(e(R).get(e(I).dataSource),t=>(r(),l(e(b),{label:e(C)(`dslang-${t}`),value:t},{default:u(()=>[d(`span`,W,m(e(C)(`dslang-${t}`)),1)]),_:2},1032,[`label`,`value`]))),256))]),_:1},8,[`modelValue`])]),_:1})):g(``,!0),e(!0)?(r(),l(e(w),{key:1,label:e(C)(`switch-lines`)},{default:u(()=>[n(e(D),{onClick:i[5]||=e=>Q.value=!0},{default:u(()=>[o(m(e(C)(`detail`)),1)]),_:1}),n(e(S),{modelValue:Q.value,"onUpdate:modelValue":i[6]||=e=>Q.value=e,title:e(C)(`switch-lines`)},{default:u(()=>[i[17]||=d(`p`,null,` BestCraft 是开源软件，可以在多个不同的服务器上部署，以下是目前已知的部署了本软件的网站： `,-1),d(`p`,null,[n(e(A),{href:`https://tnze.yyyy.games/`,type:`primary`},{default:u(()=>[...i[11]||=[o(` YYYY.GAMES `,-1)]]),_:1}),n(e(j),{size:`small`,type:`info`},{default:u(()=>[...i[12]||=[o(` 由 `,-1),d(`span`,null,`瑤瑤瑤影@神意之地`,-1),o(` 运营 `,-1)]]),_:1})]),d(`p`,null,[n(e(A),{href:`https://bestcraft.nbb.fan/`,type:`primary`},{default:u(()=>[...i[13]||=[o(` NBB.FAN `,-1)]]),_:1}),n(e(j),{size:`small`,type:`info`},{default:u(()=>[...i[14]||=[o(` 由 `,-1),d(`span`,null,`N.B.B`,-1),o(` 运营 `,-1)]]),_:1})]),d(`p`,null,[n(e(A),{href:`https://ffxiv-best-craft.pages.dev/`,type:`primary`},{default:u(()=>[...i[15]||=[o(` Cloudflare Pages `,-1)]]),_:1}),n(e(j),{size:`small`,type:`info`},{default:u(()=>[...i[16]||=[o(` 由 `,-1),d(`span`,null,`Tnze`,-1),o(` 随意地设置在 Cloudflare 上，不适合国内访问 `,-1)]]),_:1})])]),_:1},8,[`modelValue`,`title`])]),_:1},8,[`label`])):g(``,!0),e(!1)?(r(),_(h,{key:2},[n(e(w),{label:e(C)(`version-number`)},{default:u(()=>[o(m(q.value),1)]),_:1},8,[`label`]),n(e(w),{label:e(C)(`tauri`)},{default:u(()=>[o(m(J.value),1)]),_:1},8,[`label`]),n(e(w),null,{default:u(()=>[n(e(D),{type:`primary`,onClick:e(X),loading:e(Y)},{default:u(()=>[o(m(e(Y)?e(C)(`checking-update`):e(C)(`check-update`)),1)]),_:1},8,[`onClick`,`loading`])]),_:1})],64)):g(``,!0),n(e(w),{label:e(C)(`developer`)},{default:u(()=>[o(m(e(B)),1)]),_:1},8,[`label`]),n(e(w),{label:e(C)(`source`)},{default:u(()=>[n(e(A),{onClick:i[7]||=t=>e(z)(`https://gitee.com/Tnze/ffxiv-best-craft`)},{default:u(()=>[...i[18]||=[o(` Gitee `,-1)]]),_:1}),n(e(A),{onClick:i[8]||=t=>e(z)(`https://github.com/Tnze/ffxiv-best-craft`)},{default:u(()=>[...i[19]||=[o(` Github `,-1)]]),_:1})]),_:1},8,[`label`]),n(e(w),{label:e(C)(`license`)},{default:u(()=>[n(e(D),{onClick:i[9]||=e=>Z.value=!0},{default:u(()=>[...i[20]||=[o(`AGPL`,-1)]]),_:1}),n(e(S),{class:`licenses-dialog`,modelValue:Z.value,"onUpdate:modelValue":i[10]||=e=>Z.value=e,title:e(C)(`license`),width:`50%`},{default:u(()=>[d(`p`,null,m(e(C)(`licenses-notices-1`)),1),d(`p`,null,m(e(C)(`licenses-notices-2`)),1),d(`p`,null,m(e(C)(`licenses-notices-3`)),1)]),_:1},8,[`modelValue`,`title`])]),_:1},8,[`label`]),e(M)?(r(),l(e(w),{key:3,label:e(C)(`donate`)},{default:u(()=>[n(V)]),_:1},8,[`label`])):g(``,!0)]),_:1})]),_:1}))}});function J(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`zh-CN`]=new L(`# language =
theme = 主题
light = 亮
dark = 暗
auto = 自动

page-size = 每页显示行数

data-source = 数据源
ds-local = 本地
# ds-yyyygames =
ds-xivapi = Xivapi
ds-cafe-xivapi = 咖啡 Xivapi
ds-local-desc = 简中数据
ds-yyyygames-desc = 混合
ds-xivapi-desc = 多语言
ds-cafe-xivapi-desc = 多语言
switch-lines = 切换线路
dslang-zh-CN = 简体中文
dslang-zh-TW = 繁体中文
dslang-en = 英语
dslang-ja = 日语
dslang-de = 德语
dslang-fr = 法语
dslang-ko = 韩语
system-lang = 跟随系统
version-number = 版本号
tauri = Tauri
developer = 作者
feedback = 反馈 / 聊天
license = 许可
source = 源代码
donate = 捐赠
detail = 详情

check-update = 检查更新
checking-update = 正在检查更新`)}function Y(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`zh-TW`]=new L(`# language =
theme = 主題
light = 亮
dark = 暗
auto = 自動

page-size = 每頁顯示行數

data-source = 資料來源
ds-local = 本地
# ds-yyyygames =
ds-xivapi = Xivapi
ds-cafe-xivapi = Cafe Xivapi
ds-local-desc = 國服資料
ds-yyyygames-desc = 混合
ds-xivapi-desc = 多语言
ds-cafe-xivapi-desc = 多语言
switch-lines = 切換線路
dslang-zh-CN = 簡體中文
dslang-zh-TW = 繁體中文
dslang-en = 英語
dslang-ja = 日語
dslang-de = 德語
dslang-fr = 法語
system-lang = 跟隨系統
version-number = 版本號
tauri = Tauri
developer = 作者
feedback = 反饋 / 聊天
license = 許可
source = 原始碼
donate = 捐贈
detail = 詳情

check-update = 檢查更新
checking-update = 正在檢查更新`)}function X(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`en-US`]=new L(`language = Language
theme = Theme
light = Light
dark = Dark
auto = Auto

page-size = Rows per page

data-source = Data Source
ds-local = Local
ds-yyyygames = YYYY.GAMES
ds-xivapi = Xivapi
ds-cafe-xivapi = Cafe Xivapi
ds-local-desc = Chinese
ds-yyyygames-desc = Latest
ds-xivapi-desc = Latest
ds-cafe-xivapi-desc = Latest
switch-lines = Switch Lines
dslang-zh-CN = Simplified Chinese
dslang-zh-TW = Traditional Chinese
dslang-en = English
dslang-ja = Japanese
dslang-de = German
dslang-fr = French
system-lang = System
version-number = Version
tauri = Tauri
developer = Author
feedback = Feedback
license = License
source = Source
donate = Donate
detail = Detail

check-update = Check Update
checking-update = Checking Update`)}function Z(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`ja-JP`]=new L(`# language =
data-source = データソース
ds-local = ローカル
# ds-xivapi =
# ds-cafe =

page-size = ページ表示行数

switch-lines = サーバの切り替え
dslang-zh-CN = 簡体字中国語
dslang-zh-TW = 繁体字中国語
dslang-en = 英語
dslang-ja = 日本語
dslang-de = ドイツ語
dslang-fr = フランス語
version-number = バージョン
tauri = Tauri
developer = 作者
feedback = フィードバック
license = ライセンス
source = ソースコード
donate = 寄付する
detail = 詳細

check-update = 更新のチェック
checking-update = 更新をチェックしています`)}typeof J==`function`&&J(q),typeof Y==`function`&&Y(q),typeof X==`function`&&X(q),typeof Z==`function`&&Z(q);var Q=I(q,[[`__scopeId`,`data-v-95c62e28`]]);export{Q as default};
//# sourceMappingURL=Settings-BLmuxQBV.js.map