import"./rolldown-runtime-BYbx6iT9.js";import{An as e,Cn as t,Ct as n,Gt as r,Ht as i,It as a,J as o,Jt as s,Nt as c,St as l,Tt as u,Zt as d,_n as f,_t as p,bn as m,cn as h,dn as g,fn as ee,gt as _,ht as v,ln as y,nr as b,rn as x,st as S,vt as C,x as te,xn as w,yt as T}from"./dist-B0Pc-_8x.js";import{n as E,t as D}from"./css-BTx7bOcw.js";import{o as O,s as k,t as A,u as j}from"./css-CH9SXEs6.js";import{t as ne}from"./css-BBodHXwG.js";import{n as M,r as N,t as re}from"./css-09Ru8Qey.js";import{n as P,t as ie}from"./css-C5L4HwiV.js";import{t as ae}from"./input-CO8XBFKI.js";import{n as F,t as I}from"./css-BFjZ7Fav.js";import{t as L}from"./button-n89xPMHt.js";import{t as oe}from"./message-box-80wrHldE.js";import{t as se}from"./css-CRxaWGO7.js";import{t as ce}from"./source-CUpLRx-q.js";import{D as le,I as ue,K as de,O as R,Or as fe,T as pe,Tt as me,_r as he,a as ge,br as _e,d as ve,i as ye,kr as be,pt as xe,t as z,vr as B,wt as Se,xt as Ce,y as V}from"./main-PcyNe_tj.js";import{t as H}from"./common-CKnCae_h.js";import{t as U}from"./Condition-BMEQJLB6.js";var W={class:`conditions-list`},we={class:`notice`},G={class:`footer`},K=u({__name:`ConfirmDialog`,props:c({recipeInfo:{},itemInfo:{},collectability:{},stellarSteadyHandCount:{}},{modelValue:{type:Boolean,required:!0},modelModifiers:{},recipe:{required:!0},recipeModifiers:{},syncLevel:{},syncLevelModifiers:{}}),emits:[`update:modelValue`,`update:recipe`,`update:syncLevel`],setup(i){let a=i,o=le(),{$t:c}=he(),u=pe(),d=x(i,`modelValue`),f=x(i,`recipe`),ee=te(`screen and (max-width: 500px)`),y=x(i,`syncLevel`),w=v(()=>{let e=a.recipeInfo.recipe_notebook_list;return(e>=1496&&e<=1503||e>=1528&&e<=1535)&&a.recipeInfo.rlv==690}),O=t(!1),k=t(),M=v(()=>w.value&&k.value!=null?k.value:f.value);async function re(e,t,n,r){if(!e||t==null)return;let i=await(await u.getDataSource()).recipeLevelTablebyJobLevel(t);if(i!=null)return r.throwIfAborted(),await V(i,n.difficulty_factor,n.quality_factor,n.durability_factor)}h([w,y,()=>a.recipeInfo],async([e,t,n])=>{try{O.value=!0;let r=new AbortController;m(()=>r.abort(`watcher is cleanup`)),k.value=await re(e,t,n,r.signal)}finally{O.value=!1}},{immediate:!0});async function P(e){let t={...a.itemInfo};w.value&&y.value!=null&&(t.name=c(`sync-level-item-name`,{itemName:t.name,syncLevel:y.value})),H({recipe:M.value,recipeId:a.recipeInfo.id,materialQualityFactor:a.recipeInfo.material_quality_factor,requirements:a.recipeInfo,collectability:a.collectability,item:t,craftType:a.recipeInfo.job,simulatorMode:e==`simulator`,stellarSteadyHandCount:a.stellarSteadyHandCount,syncLevel:w.value&&y.value!=null?y.value:void 0}),o.push({name:`designer`}),d.value=!1}return(t,a)=>(r(),p(e(A),{modelValue:d.value,"onUpdate:modelValue":a[4]||=e=>d.value=e,title:e(c)(`please-confirm`),"align-center":!0,width:e(ee)?`90%`:`70%`},{footer:g(()=>[_(`span`,G,[n(e(L),{onClick:a[1]||=e=>d.value=!1},{default:g(()=>[l(b(e(c)(`cancel`)),1)]),_:1}),i.recipeInfo.is_expert?(r(),p(e(L),{key:0,type:`primary`,onClick:a[2]||=e=>P(`simulator`)},{default:g(()=>[l(b(e(c)(`simulator-mode`)),1)]),_:1})):C(``,!0),n(e(L),{type:`primary`,loading:O.value,disabled:w.value&&k.value==null,onClick:a[3]||=e=>P(`designer`)},{default:g(()=>[l(b(e(c)(i.recipeInfo.is_expert?`designer-mode`:`confirm`)),1)]),_:1},8,[`loading`,`disabled`])])]),default:g(()=>[w.value?(r(),T(S,{key:0},[n(e(N),{title:e(c)(`alert-sync-level`),type:k.value==null?`error`:`success`,closable:!1},null,8,[`title`,`type`]),a[5]||=_(`br`,null,null,-1)],64)):C(``,!0),n(e(D),{loading:`true`,border:!0},{default:g(()=>[w.value?(r(),p(e(E),{key:0,label:e(c)(`sync-level`),span:3},{default:g(()=>[n(e(ne),{style:{"margin-left":`14px`},modelValue:y.value,"onUpdate:modelValue":a[0]||=e=>y.value=e,min:1,max:100},null,8,[`modelValue`])]),_:1},8,[`label`])):C(``,!0),n(e(E),{label:e(c)(`item-info`),span:3},{default:g(()=>[l(b(i.recipeInfo.item_name)+` `,1),i.recipeInfo.item_amount?(r(),T(S,{key:0},[l(` × `+b(i.recipeInfo.item_amount),1)],64)):C(``,!0)]),_:1},8,[`label`]),n(e(E),{label:e(c)(`recipe-id`)},{default:g(()=>[l(b(i.recipeInfo.id),1)]),_:1},8,[`label`]),n(e(E),{label:e(c)(`recipe-level`)},{default:g(()=>[l(b(M.value.rlv.id),1)]),_:1},8,[`label`]),n(e(E),{label:e(c)(`level`)},{default:g(()=>[l(b(M.value.job_level),1)]),_:1},8,[`label`]),n(e(E),{label:e(c)(`difficulty`)},{default:g(()=>[l(b(M.value.difficulty),1)]),_:1},8,[`label`]),n(e(E),{label:e(c)(`quality`)},{default:g(()=>[l(b(M.value.quality),1)]),_:1},8,[`label`]),n(e(E),{label:e(c)(`durability`)},{default:g(()=>[l(b(M.value.durability),1)]),_:1},8,[`label`]),n(e(E),{label:e(c)(`conditions`),span:3},{default:g(()=>[M.value.conditions_flag!=15&&!i.recipeInfo.is_expert?(r(),p(e(N),{key:0,type:`warning`,"show-icon":``,style:{"margin-bottom":`6px`}},{default:g(()=>[l(b(e(c)(`conditions-will-not-take-effect-for-non-expert-recipe`)),1)]),_:1})):C(``,!0),_(`div`,W,[(r(!0),T(S,null,s(Object.values(e(ve)),(t,i)=>(r(),T(S,null,[M.value.conditions_flag&1<<i?(r(),p(e(j),{key:0,type:`info`},{default:g(()=>[n(U,{cond:t},null,8,[`cond`])]),_:2},1024)):C(``,!0)],64))),256))])]),_:1},8,[`label`]),n(e(E),{label:e(c)(`difficulty-factor`)},{default:g(()=>[l(b(i.recipeInfo.difficulty_factor),1)]),_:1},8,[`label`]),n(e(E),{label:e(c)(`quality-factor`)},{default:g(()=>[l(b(i.recipeInfo.quality_factor),1)]),_:1},8,[`label`]),n(e(E),{label:e(c)(`durability-factor`)},{default:g(()=>[l(b(i.recipeInfo.durability_factor),1)]),_:1},8,[`label`]),n(e(E),{label:e(c)(`type`)},{default:g(()=>[l(b(i.recipeInfo.job),1)]),_:1},8,[`label`]),n(e(E),{label:e(c)(`material-quality-factor`)},{default:g(()=>[l(b(i.recipeInfo.material_quality_factor),1)]),_:1},8,[`label`]),n(e(E),{label:e(c)(`can-hq`)},{default:g(()=>[l(b(e(c)(String(i.recipeInfo.can_hq))),1)]),_:1},8,[`label`]),n(e(E),{label:e(c)(`required-craftsmanship`)},{default:g(()=>[l(b(i.recipeInfo.required_craftsmanship),1)]),_:1},8,[`label`]),n(e(E),{label:e(c)(`required-control`)},{default:g(()=>[l(b(i.recipeInfo.required_control),1)]),_:1},8,[`label`]),n(e(E),{label:e(c)(`is-expert`)},{default:g(()=>[l(b(e(c)(String(i.recipeInfo.is_expert))),1)]),_:1},8,[`label`])]),_:1}),_(`div`,we,b(i.recipeInfo.is_expert?e(c)(`confirm-select2`):e(c)(`confirm-select`,{itemName:i.recipeInfo.item_name})),1)]),_:1},8,[`modelValue`,`title`,`width`]))}});function Te(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`zh-CN`]=new B(`confirm-select = 开始制作“{ $itemName }”吗？
confirm-select2 = 这是一个高难度配方，请选择模式。
alert-sync-level = 这是一个等级同步配方，请输入同步等级
please-confirm = 请确认
conditions-will-not-take-effect-for-non-expert-recipe = 非高难度配方制作状态标志不会生效

cancel = 取消
confirm = 确认
designer-mode = 普通模式
simulator-mode = 高难模式
sync-level-item-name = { $itemName }（等级同步：{ $syncLevel }）

sync-level = 等级同步
type = 制作类型
level = 等级
recipe-id = 配方编号
item-info = 物品信息

true = 是
false = 否
can-hq = 存在HQ
is-expert = 高难度配方

required-craftsmanship = 最低{ craftsmanship }
required-control = 最低{ control }`)}function q(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`zh-TW`]=new B(`confirm-select = 開始製作“{ $itemName }”嗎？
confirm-select2 = 這是一個高難度配方，請選擇模式。
alert-sync-level = 這是一個等級同步配方，請輸入同步等級
please-confirm = 請確認
conditions-will-not-take-effect-for-non-expert-recipe = 非高難度配方製作狀態標誌不會生效

cancel = 取消
confirm = 確認
designer-mode = 普通模式
simulator-mode = 高難模式
sync-level-item-name = { $itemName }（等級同步：{ $syncLevel }）

sync-level = 等級同步
type = 製作職業
level = 等級
recipe-id = 配方編號
item-info = 物品資訊

true = 是
false = 否
can-hq = 存在HQ
is-expert = 高難度配方

required-craftsmanship = 最低{ craftsmanship }
required-control = 最低{ control }`)}function J(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`en-US`]=new B(`confirm-select = Start crafting "{ $itemName }"?
confirm-select2 = This is a hard recipe. Please make a choice.
alert-sync-level = This recipe is variant with job level, please setting it
please-confirm = Please confirm
conditions-will-not-take-effect-for-non-expert-recipe = The conditions flag for non expert recipe will not take effect

cancel = Cancel
confirm = Confirm
designer-mode = Normal Mode
simulator-mode = Simulator Mode
sync-level-item-name = { $itemName } (Lv. { $syncLevel })

sync-level = Level Sync
type = Crafting Type
level = Level
recipe-id = Recipe ID
item-info = Item info

true = True
false = False
can-hq = Can be HQ
is-expert = Is Expert

required-craftsmanship = Required { craftsmanship }
required-control = Required { control }`)}function Ee(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`ja-JP`]=new B(`confirm-select = 「{ $itemName }」の製作を開始しますか？
confirm-select2 = これは高難易度レシピです。モードを選択してください。
alert-sync-level = これはレベルsyncレシピです。syncレベルを入力してください
please-confirm = 確認してください
conditions-will-not-take-effect-for-non-expert-recipe = 非高難易度レシピでは製作状態フラグは効果がありません

cancel = キャンセル
confirm = 確認
designer-mode = 通常モード
simulator-mode = 高難易度モード
sync-level-item-name = { $itemName }（レベルsync：{ $syncLevel }）

sync-level = レベルsync
type = 製作タイプ
level = レベル
recipe-id = レシピID
item-info = アイテム情報

true = はい
false = いいえ
can-hq = HQ可
is-expert = 高難易度レシピ

required-craftsmanship = 最低{ craftsmanship }
required-control = 最低{ control }`)}typeof Te==`function`&&Te(K),typeof q==`function`&&q(K),typeof J==`function`&&J(K),typeof Ee==`function`&&Ee(K);var De=z(K,[[`__scopeId`,`data-v-3d4b4ed7`]]),Oe={class:`container`},ke={class:`filter-row`},Ae={class:`filter-label`},je=200,Me=250,Ne=6,Y=u({__name:`RecipeSelector`,setup(a){let c=new Map,u=new Map;function m(e,t,n){let r=`${t}|${n}`,i=c.get(r);return i??(i=e.recipeLevelTable(n),i.catch(()=>c.delete(r)),c.set(r,i)),i}function v(e,t,n){let r=`${t}|${n}`,i=u.get(r);return i??(i=e(n),i.catch(()=>u.delete(r)),u.set(r,i)),i}async function x(e,t,n,r){let i=Array(e.length),a=0,o=async()=>{for(;a<e.length;){if(n())return;let t=a++;i[t]=await r(e[t])}},s=[];for(let n=0;n<Math.min(t,e.length);n++)s.push(o());return await Promise.all(s),i}let E=pe(),D=le(),{$t:A}=he(),j=t(``),N=w({Page:1,PageTotal:1}),F=t([]),I=t(!1),oe=te(`screen and (max-width: 500px)`),ve=t([]),z=t(0),{craftType:B,level:H,recipeLevel:U,syncLevel:W}=_e(ye()),we=o(W,Me),G=t(new Map),K=t(!1),Te=0,q=ge();async function J(){let e=await(await E.getDataSource()).craftTypeList();ve.value=e,B.value!=null&&!e.some(e=>e.id==B.value)&&(B.value=null)}let Ee=null;async function Y(e,t,n){let r=setTimeout(()=>I.value=!0,200);try{let r=e.recipeTable(t,n,U.value??void 0,B.value??void 0,H.value?H.value*10-9:void 0,H.value?H.value*10:void 0,E.recipeTablePageSize);Ee=r;let{results:i,totalPages:a}=await r;Ee==r&&(F.value=i,N.PageTotal=a,Ee=null)}catch(e){R.error(String(e))}finally{clearTimeout(r),I.value=!1}}let X=null;h(j,async e=>{let t=await E.getDataSource();switch(X!=null&&clearTimeout(X),t.sourceType){case ce.Realtime:Y(t,N.Page,e);break;case ce.RemoteRealtime:X=setTimeout(()=>{N.Page=1,Y(t,N.Page,e),X=null},je);break}}),h(()=>N.Page,async e=>{await Y(await E.getDataSource(),e,j.value)});async function Z(){let e=await E.getDataSource(),t=j.value;N.Page=1,await Y(e,1,t)}i(async()=>{Z(),J()}),h([B,H,U],()=>{Z()}),h(()=>[E.dataSource,E.dataSourceLang],()=>{Z(),J()}),h(()=>E.recipeTablePageSize,()=>{Z()}),y(()=>{let e=D.currentRoute.value.query.recipeId;e!==void 0&&He(Number(e))});function Pe(e){let t=e.recipe_notebook_list;return(t>=1496&&t<=1503||t>=1528&&t<=1535)&&e.rlv==690}async function Fe(e,t){let n=++Te,r=()=>n!=Te,i=`${E.dataSource}|${E.dataSourceLang}`;K.value=!0;let a=e.filter(Pe),o=e.filter(e=>!Pe(e));if(a.length>0){let e=new Map(G.value);for(let t of a)e.delete(t.id);G.value=e}let s=new Map;try{let e=await E.getDataSource(),n=(async()=>{if(a.length==0||t==null)return;let n=e.recipeLevelTablebyJobLevel;if(n!=null)try{let r=await v(n.bind(e),i,t);if(r==null)return;for(let e of a){let t=await V(r,e.difficulty_factor,e.quality_factor,e.durability_factor);s.set(e.id,t.difficulty)}}catch(e){console.error(`Failed to load synced recipe level table`,e)}})(),c=[...new Set(o.map(e=>e.rlv))],l=(async()=>{let t=await x(c,Ne,r,async t=>{try{return[t,await m(e,i,t)]}catch(e){return console.error(`Failed to load recipe level table ${t}`,e),[t,void 0]}}),n=new Map;for(let e of t)e!=null&&n.set(e[0],e[1]);for(let e of o){let t=n.get(e.rlv);if(t==null)continue;let r=await V(t,e.difficulty_factor,e.quality_factor,e.durability_factor);s.set(e.id,r.difficulty)}})();await Promise.all([n,l])}catch(e){console.error(`Failed to load recipe difficulties`,e)}r()||(G.value=s,K.value=!1)}h([F,we],([e,t])=>{Fe(e,t)});let Ie=t(!1),Le=t(),Re=t(),Q=t(),ze=t();async function Be(e,t,n){n.target.closest(`.favorite-column`)||await Ve(e)}async function Ve(e){try{I.value=!0;let t=await E.getDataSource(),[n,r,i,a]=await Promise.all([t.recipeLevelTable(e.rlv),t.itemInfo(e.item_id),(async()=>{if(t.recipeCollectableShopRefine!=null)try{return await t.recipeCollectableShopRefine(e.id)}catch(e){console.error(`Failed to fatch recipe collectability`,e);return}})(),(async()=>{if(t.temporaryActionInfo)try{return await t.temporaryActionInfo(e.id)}catch(e){R({type:`warning`,message:A(`failed-to-load-temporary-action-info`,{err:String(e)})})}})()]);Le.value=await V(n,e.difficulty_factor,e.quality_factor,e.durability_factor),Re.value=e,Q.value=r,ze.value=i,Ie.value=!0,z.value=a?.action==46843?a.count:0}catch(e){R.error(String(e))}finally{I.value=!1}}async function He(e){let t=await E.getDataSource();if(t.recipeInfo==null){R.error(A(`datasource-unsupport-recipe-info`));return}try{I.value=!0,await Ve(await t.recipeInfo(e))}catch(e){R.error(A(`select-recipe-by-id-error`,{err:String(e)})),I.value=!1}}function Ue(e){q.toggleRecipe(e.id)}return(t,i)=>{let a=d(`tnze-loading`);return r(),T(`div`,Oe,[Le.value&&Re.value&&Q.value?(r(),p(De,{key:0,modelValue:Ie.value,"onUpdate:modelValue":i[0]||=e=>Ie.value=e,recipe:Le.value,"onUpdate:recipe":i[1]||=e=>Le.value=e,"recipe-info":Re.value,"item-info":Q.value,collectability:ze.value,stellarSteadyHandCount:z.value,"sync-level":e(W),"onUpdate:syncLevel":i[2]||=e=>f(W)?W.value=e:null},null,8,[`modelValue`,`recipe`,`recipe-info`,`item-info`,`collectability`,`stellarSteadyHandCount`,`sync-level`])):C(``,!0),n(e(ae),{modelValue:j.value,"onUpdate:modelValue":i[4]||=e=>j.value=e,onKeydown:fe(Z,[`enter`]),class:`search-input`,placeholder:e(A)(`search`),clearable:``},{append:g(()=>[n(e(L),{icon:e(xe),onClick:i[3]||=t=>e(D).push(`/recipe/customize`)},{default:g(()=>[l(b(e(A)(`custom-recipe`)),1)]),_:1},8,[`icon`])]),_:1},8,[`modelValue`,`placeholder`]),_(`div`,ke,[n(e(ie),{class:`select-filters`},{default:g(()=>[n(e(P),{label:e(A)(`craft-type`)},{default:g(()=>[n(e(k),{modelValue:e(B),"onUpdate:modelValue":i[5]||=e=>f(B)?B.value=e:null,clearable:``,"remote-method":J},{default:g(()=>[(r(!0),T(S,null,s(ve.value,({id:t,name:n})=>(r(),p(e(O),{key:t,value:t,label:n},null,8,[`value`,`label`]))),128))]),_:1},8,[`modelValue`])]),_:1},8,[`label`]),n(e(P),{label:e(A)(`level`)},{default:g(()=>[n(e(k),{modelValue:e(H),"onUpdate:modelValue":i[6]||=e=>f(H)?H.value=e:null,clearable:``},{default:g(()=>[(r(),T(S,null,s(10,t=>n(e(O),{key:t,value:t,label:`${t*10-9} ~ ${t*10}`},null,8,[`value`,`label`])),64))]),_:1},8,[`modelValue`])]),_:1},8,[`label`]),n(e(P),{label:e(A)(`recipe-level`)},{default:g(()=>[n(e(ne),{modelValue:e(U),"onUpdate:modelValue":i[7]||=e=>f(U)?U.value=e:null,clearable:``,min:1,max:799,step:1,"step-strictly":``,controls:!1},null,8,[`modelValue`])]),_:1},8,[`label`]),n(e(P),null,{label:g(()=>[_(`span`,Ae,[l(b(e(A)(`level-sync`))+` `,1),n(e(ue),{content:e(A)(`level-sync-hint`),placement:`top`},{default:g(()=>[n(e(de),{class:`filter-label-hint`},{default:g(()=>[n(e(Ce))]),_:1})]),_:1},8,[`content`])])]),default:g(()=>[n(e(ne),{modelValue:e(W),"onUpdate:modelValue":i[8]||=e=>f(W)?W.value=e:null,clearable:``,min:1,max:100,step:1,"step-strictly":``,controls:!1},null,8,[`modelValue`])]),_:1})]),_:1})]),ee((r(),p(e(re),{"element-loading-text":e(A)(`please-wait`),"highlight-current-row":``,onRowClick:Be,data:F.value,height:`100%`,style:{width:`100%`}},{default:g(()=>[n(e(M),{width:`56`,align:`center`,"class-name":`favorite-column`},{default:g(({row:t})=>[n(e(L),{rectangle:``,text:``,size:`small`,style:{width:`100%`,height:`100%`},type:e(q).hasRecipe(t.id)?`warning`:`info`,icon:e(q).hasRecipe(t.id)?e(me):e(Se),title:e(q).hasRecipe(t.id)?e(A)(`unfavorite`):e(A)(`favorite`),onClick:be(e=>Ue(t),[`stop`])},null,8,[`type`,`icon`,`title`,`onClick`])]),_:1}),n(e(M),{prop:`id`,label:`ID`,width:e(oe)?void 0:100},null,8,[`width`]),n(e(M),{prop:`rlv`,label:e(A)(`recipe-level`),width:e(oe)?void 0:100},null,8,[`label`,`width`]),n(e(M),{prop:`job`,label:e(A)(`type`),width:e(oe)?void 0:200},null,8,[`label`,`width`]),n(e(M),{label:e(A)(`difficulty`),width:e(oe)?void 0:90},{default:g(({row:e})=>[l(b(G.value.get(e.id)??(K.value?`…`:`—`)),1)]),_:1},8,[`label`,`width`]),n(e(M),{prop:`item_name`,label:e(A)(`name`)},null,8,[`label`])]),_:1},8,[`element-loading-text`,`data`])),[[a,I.value]]),N.PageTotal>1?(r(),p(e(se),{key:1,layout:`prev, pager, next`,"current-page":N.Page,"onUpdate:currentPage":i[9]||=e=>N.Page=e,"page-count":N.PageTotal},null,8,[`current-page`,`page-count`])):C(``,!0)])}}});function X(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`zh-CN`]=new B(`datasource-unsupport-recipe-info = 当前数据源不支持从外部选择配方
select-recipe-by-id-error = 获取配方信息失败：{ $err }，请尝试切换数据源
failed-to-load-temporary-action-info = 获取任务指令失败：{ $err }

search = 键入以搜索
please-wait = 请稍等...

type = 类型
craft-type = 制作类型
level = 等级
name = 名称
can-hq = 存在HQ
level-sync = 等级同步
level-sync-hint = 仅影响「难度」列的显示。只有月球（宇宙探索）的等级同步配方会用到，其他配方的难度不受此值影响。不会触发搜索。

favorite = 收藏
unfavorite = 取消收藏
clear-all-favorites = 清空收藏
clear-all-favorites-confirm = 确认要重置所有收藏的配方吗？`)}function Z(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`zh-TW`]=new B(`datasource-unsupport-recipe-info = 當前資料來源不支援從外部選擇配方
select-recipe-by-id-error = 獲取配方資訊失敗：{ $err }，請嘗試切換資料來源
failed-to-load-temporary-action-info = 獲取任務指令失敗：{ $err }

search = 鍵入以搜尋
please-wait = 請稍等...

type = 職業
craft-type = 製作職業
level = 等級
name = 名稱
can-hq = 存在HQ
level-sync = 等級同步
level-sync-hint = 僅影響「難度」欄的顯示。只有月球（宇宙探索）的等級同步配方會用到，其他配方的難度不受此值影響。不會觸發搜尋。

favorite = 收藏
unfavorite = 取消收藏
clear-all-favorites = 清空收藏
clear-all-favorites-confirm = 確認要重置所有收藏的配方嗎？`)}function Pe(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`en-US`]=new B(`datasource-unsupport-recipe-info = Current data-source doesn't support choice recipe from external pages
select-recipe-by-id-error = Error fetching recipe data: { $err }. Please try choosing another DataSource
failed-to-load-temporary-action-info = Failed to load temporary action info: { $err }

search = Search
please-wait = Please wait...

type = Type
craft-type = Craft Type
level = Level
name = Name
can-hq = Can HQ
level-sync = Level Sync
level-sync-hint = Only affects the Difficulty column. It is used solely by the level-sync recipes of Cosmic Exploration (the Moon); the difficulty of other recipes is unaffected. It does not trigger a search.

favorite = Favorite
unfavorite = Unfavorite
clear-all-favorites = Clear Favorites
clear-all-favorites-confirm = Reset all favorite recipes?`)}function Fe(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`ja-JP`]=new B(`datasource-unsupport-recipe-info = 現在のデータソースは外部からのレシピ選択をサポートしていません
select-recipe-by-id-error = レシピ情報の取得に失敗しました：{ $err }。データソースの切り替えをお試しください
failed-to-load-temporary-action-info = コンテンツアクションの取得に失敗しました：{ $err }

search = 入力して検索
please-wait = お待ちください...

type = タイプ
craft-type = 製作タイプ
level = レベル
name = アイテム
can-hq = HQ可
level-sync = レベルsync
level-sync-hint = 「必要工数」列の表示にのみ影響します。月（宇宙探索）のレベルsyncレシピでのみ使用され、他のレシピの必要工数には影響しません。検索は実行されません。

favorite = お気に入り
unfavorite = お気に入り解除
clear-all-favorites = お気に入り消去
clear-all-favorites-confirm = 登録したレシピをすべて消去しますか？`)}typeof X==`function`&&X(Y),typeof Z==`function`&&Z(Y),typeof Pe==`function`&&Pe(Y),typeof Fe==`function`&&Fe(Y);var Ie=z(Y,[[`__scopeId`,`data-v-afd82665`]]),Le={class:`container`},Re={class:`content`},Q=u({__name:`RecipeFavored`,props:{active:{type:Boolean}},setup(i){let a=i,{$t:o}=he(),s=pe(),c=ge(),u=te(`screen and (max-width: 500px)`),f=t([]),m=w({Page:1}),y=t(!1),x=t(!1),S=t(),E=t(),D=t(),O=t(),k=t(0),A=0,j=v(()=>Math.max(1,Math.ceil(f.value.length/s.recipeTablePageSize))),ne=v(()=>{let e=s.recipeTablePageSize,t=(m.Page-1)*e;return f.value.slice(t,t+e)});function N(){m.Page>j.value?m.Page=j.value:m.Page<1&&(m.Page=1)}async function P(){if(!a.active)return;let e=++A;y.value=!0;try{let t=await s.getDataSource(),n=c.recipes.slice();if(n.length===0){e===A&&(f.value=[]);return}let r;if(t.recipeInfoList)r=await t.recipeInfoList(n);else if(t.recipeInfo)r=await Promise.all(n.map(e=>t.recipeInfo(e)));else{R.error(o(`datasource-unsupport-recipe-info`));return}let i=new Map(r.map(e=>[e.id,e]));e===A&&(f.value=n.map(e=>i.get(e)).filter(e=>e!=null))}catch(e){R.error(String(e))}finally{e===A&&(y.value=!1,N())}}h(()=>a.active,e=>{e&&P()},{immediate:!0}),h(()=>c.recipes.slice(),()=>{P()}),h(()=>[s.dataSource,s.dataSourceLang],()=>{m.Page=1,P()}),h(()=>s.recipeTablePageSize,()=>{m.Page=1,N()}),h(()=>f.value.length,()=>{N()});async function ie(e){try{y.value=!0;let t=await s.getDataSource(),[n,r,i,a]=await Promise.all([t.recipeLevelTable(e.rlv),t.itemInfo(e.item_id),(async()=>{if(t.recipeCollectableShopRefine!=null)try{return await t.recipeCollectableShopRefine(e.id)}catch(e){console.error(`Failed to fatch recipe collectability`,e);return}})(),(async()=>{if(t.temporaryActionInfo)try{return await t.temporaryActionInfo(e.id)}catch(e){R({type:`warning`,message:o(`failed-to-load-temporary-action-info`,{err:String(e)})})}})()]);S.value=await V(n,e.difficulty_factor,e.quality_factor,e.durability_factor),E.value=e,D.value=r,O.value=i,k.value=a?.action==46843?a.count:0,x.value=!0}catch(e){R.error(String(e))}finally{y.value=!1}}async function ae(e,t,n){n.target.closest(`.favorite-column`)||await ie(e)}function F(e){c.toggleRecipe(e.id)}async function I(){if(c.recipes.length!==0){try{await oe.confirm(o(`clear-all-favorites-confirm`),o(`clear-all-favorites`),{type:`warning`})}catch{return}c.clearRecipes()}}return(t,i)=>{let a=d(`tnze-loading`);return r(),T(`div`,Le,[S.value&&E.value&&D.value?(r(),p(De,{key:0,modelValue:x.value,"onUpdate:modelValue":i[0]||=e=>x.value=e,recipe:S.value,"onUpdate:recipe":i[1]||=e=>S.value=e,"recipe-info":E.value,"item-info":D.value,collectability:O.value,stellarSteadyHandCount:k.value},null,8,[`modelValue`,`recipe`,`recipe-info`,`item-info`,`collectability`,`stellarSteadyHandCount`])):C(``,!0),_(`div`,Re,[n(e(L),{type:`primary`,class:`clear-button`,onClick:I},{default:g(()=>[l(b(e(o)(`clear-all-favorites`)),1)]),_:1}),ee((r(),p(e(re),{"element-loading-text":e(o)(`please-wait`),"highlight-current-row":``,onRowClick:ae,data:ne.value,height:`100%`,style:{width:`100%`}},{default:g(()=>[n(e(M),{width:`56`,align:`center`,"class-name":`favorite-column`},{default:g(({row:t})=>[n(e(L),{rectangle:``,text:``,size:`small`,style:{width:`100%`,height:`100%`},type:e(c).hasRecipe(t.id)?`warning`:`info`,icon:e(c).hasRecipe(t.id)?e(me):e(Se),title:e(c).hasRecipe(t.id)?e(o)(`unfavorite`):e(o)(`favorite`),onClick:be(e=>F(t),[`stop`])},null,8,[`type`,`icon`,`title`,`onClick`])]),_:1}),n(e(M),{prop:`id`,label:`ID`,width:e(u)?void 0:100},null,8,[`width`]),n(e(M),{prop:`rlv`,label:e(o)(`recipe-level`),width:e(u)?void 0:100},null,8,[`label`,`width`]),n(e(M),{prop:`job`,label:e(o)(`type`),width:e(u)?void 0:200},null,8,[`label`,`width`]),n(e(M),{prop:`item_name`,label:e(o)(`name`)},null,8,[`label`])]),_:1},8,[`element-loading-text`,`data`])),[[a,y.value]]),j.value>1?(r(),p(e(se),{key:0,layout:`prev, pager, next`,"current-page":m.Page,"onUpdate:currentPage":i[2]||=e=>m.Page=e,"page-count":j.value},null,8,[`current-page`,`page-count`])):C(``,!0)])])}}});function ze(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`zh-CN`]=new B(`datasource-unsupport-recipe-info = 当前数据源不支持从外部选择配方
failed-to-load-temporary-action-info = 获取任务指令失败：{ $err }
please-wait = 请稍等...
type = 类型
name = 名称

favorite = 收藏
unfavorite = 取消收藏
clear-all-favorites = 清空收藏
clear-all-favorites-confirm = 确认要重置所有收藏的配方吗？`)}function Be(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`zh-TW`]=new B(`datasource-unsupport-recipe-info = 當前資料來源不支援從外部選擇配方
failed-to-load-temporary-action-info = 獲取任務指令失敗：{ $err }
please-wait = 請稍等...
type = 職業
name = 名稱

favorite = 收藏
unfavorite = 取消收藏
clear-all-favorites = 清空收藏
clear-all-favorites-confirm = 確認要重置所有收藏的配方嗎？`)}function Ve(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`en-US`]=new B(`datasource-unsupport-recipe-info = Current data-source doesn't support choice recipe from external pages
failed-to-load-temporary-action-info = Failed to load temporary action info: { $err }
please-wait = Please wait...
type = Type
name = Item

favorite = Favorite
unfavorite = Unfavorite
clear-all-favorites = Clear Favorites
clear-all-favorites-confirm = Reset all favorite recipes?`)}function He(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`ja-JP`]=new B(`datasource-unsupport-recipe-info = 現在のデータソースは外部からのレシピ選択をサポートしていません
failed-to-load-temporary-action-info = コンテンツアクションの取得に失敗しました：{ $err }
please-wait = お待ちください...
type = タイプ
name = アイテム

favorite = お気に入り
unfavorite = お気に入り解除
clear-all-favorites = お気に入り消去
clear-all-favorites-confirm = 登録したレシピをすべて消去しますか？`)}typeof ze==`function`&&ze(Q),typeof Be==`function`&&Be(Q),typeof Ve==`function`&&Ve(Q),typeof He==`function`&&He(Q);var Ue=z(Q,[[`__scopeId`,`data-v-a935b1ba`]]),We={class:`container`},$=u({__name:`RecipePanel`,emits:[`setTitle`],setup(i,{emit:o}){let s=o;a(()=>s(`setTitle`,`select-recipe`));let{$t:c}=he(),l=t(`recipes`);return(t,i)=>(r(),T(`div`,We,[n(e(F),{modelValue:l.value,"onUpdate:modelValue":i[0]||=e=>l.value=e,class:`tabs-container`},{default:g(()=>[n(e(I),{label:e(c)(`recipe`),name:`recipes`},{default:g(()=>[n(Ie)]),_:1},8,[`label`]),n(e(I),{label:e(c)(`favorite`),name:`favorites`},{default:g(()=>[n(Ue,{active:l.value===`favorites`},null,8,[`active`])]),_:1},8,[`label`])]),_:1},8,[`modelValue`])]))}});function Ge(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`zh-CN`]=new B(`recipe = 配方
favorite = 收藏`)}function Ke(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`zh-TW`]=new B(`recipe = 配方
favorite = 收藏`)}function qe(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`en-US`]=new B(`recipe = Recipes
favorite = Favorite`)}function Je(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`ja-JP`]=new B(`recipe = レシピ
favorite = お気に入り`)}typeof Ge==`function`&&Ge($),typeof Ke==`function`&&Ke($),typeof qe==`function`&&qe($),typeof Je==`function`&&Je($);var Ye=z($,[[`__scopeId`,`data-v-f08ce230`]]);export{Ye as default};
//# sourceMappingURL=RecipePanel-bDqkgIei.js.map