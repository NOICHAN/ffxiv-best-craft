const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/dist-10F6AO0X.js","assets/dist-B0Pc-_8x.js"])))=>i.map(i=>d[i]);
import"./rolldown-runtime-BYbx6iT9.js";import{An as e,Cn as t,Ct as n,D as r,Dn as i,Et as a,Ft as o,Gt as s,Hn as c,Ht as l,Jn as u,Jt as d,Kt as f,M as p,On as m,Ot as h,P as g,Pt as _,Qn as v,Qt as y,Rt as b,Sn as x,St as S,Tn as C,Tt as w,Xt as T,Yt as E,_n as D,_t as O,b as k,cn as A,dn as j,dt as M,er as N,f as ee,fn as te,gt as P,ht as F,in as ne,jn as I,jt as L,kt as R,ln as z,nr as B,st as V,tr as H,un as re,vn as ie,vt as U,x as ae,xn as oe,xt as se,y as ce,yt as W,zn as le}from"./dist-B0Pc-_8x.js";import{n as ue,r as de,t as fe}from"./event-CowFajHz.js";import{n as pe,t as me}from"./css-BTx7bOcw.js";import{t as he}from"./clamp-D3h2nXR7.js";import{a as ge,i as _e,n as ve,r as ye,t as be,u as xe}from"./css-CH9SXEs6.js";import{t as Se}from"./css-BBodHXwG.js";import{i as Ce,n as we,r as Te,t as Ee}from"./css-09Ru8Qey.js";import{t as De}from"./castArray-YEujLDqd.js";import{n as G,t as Oe}from"./css-C5L4HwiV.js";import{t as ke}from"./input-CO8XBFKI.js";import{a as Ae,i as je,n as Me,r as Ne,t as Pe}from"./use-form-item-2zI9q9HJ.js";import{t as Fe}from"./overlay-CCSNj_n9.js";import{n as Ie,t as Le}from"./css-BFjZ7Fav.js";import{t as Re}from"./css-CQXHairq.js";import{n as ze,t as K}from"./button-n89xPMHt.js";import{n as Be,r as Ve,t as q}from"./css-CzVJOcDP.js";import{a as He,c as Ue,d as We,f as Ge,h as Ke,i as qe,l as Je,m as Ye,n as Xe,o as Ze,p as Qe,r as $e,s as et,t as tt,u as nt}from"./LevelRequirementPanel-CZHn0g9v.js";import{t as rt}from"./css-DxGxXuI1.js";import{n as it,t as at}from"./css-DbNXgHsh.js";import{t as ot}from"./css-DSFJZ_wV.js";import{n as st,t as ct}from"./css-OvqqJ1v5.js";import{t as lt}from"./css-C7ZyLv8u.js";import{t as ut}from"./css-B6TcRP8B.js";import{t as dt}from"./preload-helper-rX7koMlN.js";import{$t as ft,B as pt,Dr as mt,Gt as ht,I as gt,It as _t,K as vt,Kt as yt,Mt as bt,O as J,Ot as xt,Q as St,S as Ct,T as wt,Ut as Tt,W as Et,Xt as Dt,Yt as Ot,Zt as kt,_r as At,b as jt,cn as Mt,ct as Nt,dn as Pt,fn as Ft,g as It,gr as Y,h as Lt,hn as Rt,jt as zt,kr as Bt,l as X,ln as Vt,lt as Ht,nt as Ut,o as Wt,qt as Gt,t as Kt,tt as qt,vn as Jt,vr as Z,x as Yt,xr as Xt,z as Zt}from"./main-PcyNe_tj.js";import{n as Qt,r as $t,t as en}from"./Utils-BrVsjK-A.js";var tn=Pt({...ge,direction:{type:String,default:`rtl`,values:[`ltr`,`rtl`,`ttb`,`btt`]},resizable:Boolean,size:{type:[String,Number],default:`30%`},withHeader:{type:Boolean,default:!0},modalFade:{type:Boolean,default:!0},headerAriaLevel:{type:String,default:`2`}}),nn={..._e,"resize-start":(e,t)=>e instanceof MouseEvent&&typeof t==`number`,resize:(e,t)=>e instanceof MouseEvent&&typeof t==`number`,"resize-end":(e,t)=>e instanceof MouseEvent&&typeof t==`number`};function rn(e,n,r){let{width:i,height:a}=p(),o=F(()=>[`ltr`,`rtl`].includes(e.direction)),s=F(()=>[`ltr`,`ttb`].includes(e.direction)?1:-1),c=F(()=>o.value?i.value:a.value),l=F(()=>g(u.value+s.value*d.value,4,c.value)),u=t(0),d=t(0),f=t(!1),m=t(!1),h=[],_=[],v=()=>{let e=n.value?.closest(`[aria-modal="true"]`);return e?o.value?e.offsetWidth:e.offsetHeight:100};A(()=>[e.size,e.resizable],()=>{m.value=!1,u.value=0,d.value=0,S()});let y=t=>{e.resizable&&(m.value||=(u.value=v(),!0),h=[t.pageX,t.pageY],f.value=!0,r(`resize-start`,t,u.value),_.push(k(window,`mouseup`,S),k(window,`mousemove`,x)))},x=e=>{let{pageX:t,pageY:n}=e,i=t-h[0],a=n-h[1];d.value=o.value?i:a,r(`resize`,e,l.value)},S=e=>{f.value&&(h=[],u.value=l.value,d.value=0,f.value=!1,_.forEach(e=>e?.()),_=[],e&&r(`resize-end`,e,u.value))},C=k(n,`mousedown`,y);return b(()=>{C(),S()}),{size:F(()=>m.value?`${l.value}px`:ft(e.size)),isResizing:f,isHorizontal:o}}var an=[`aria-label`,`aria-labelledby`,`aria-describedby`],on=[`id`,`aria-level`],sn=[`aria-label`],cn=[`id`],ln=xt(w({name:`ElDrawer`,inheritAttrs:!1,__name:`drawer`,props:tn,emits:nn,setup(r,{expose:i,emit:a}){let o=r,c=a,l=ne();Ae({scope:`el-drawer`,from:`the title slot`,replacement:`the header slot`,version:`3.0.0`,ref:`https://element-plus.org/en-US/component/drawer.html#slots`},F(()=>!!l.title));let u=t(),d=t(),f=t(),p=Dt(`drawer`),{t:m}=kt(),{afterEnter:h,afterLeave:g,beforeLeave:y,visible:b,rendered:x,titleId:S,bodyId:C,zIndex:w,onModalClick:T,onOpenAutoFocus:D,onCloseAutoFocus:k,onFocusoutPrevented:A,onCloseRequested:N,handleClose:ee}=ye(o,u),{isHorizontal:I,size:L,isResizing:R}=rn(o,f,c),z=F(()=>o.modalPenetrable&&!o.modal);return i({handleClose:ee}),(t,i)=>(s(),O(M,{to:r.appendTo,disabled:r.appendTo===`body`?!r.appendToBody:!1},[n(Xt,{name:e(p).b(`fade`),onAfterEnter:e(h),onAfterLeave:e(g),onBeforeLeave:e(y),persisted:``},{default:j(()=>[te(n(e(Fe),{mask:r.modal,"overlay-class":[e(p).is(`drawer`),r.modalClass??``,`${e(p).namespace.value}-modal-drawer`,e(p).is(`penetrable`,z.value)],"z-index":e(w),onClick:e(T)},{default:j(()=>[n(e(Zt),{loop:``,trapped:e(b),"focus-trap-el":u.value,"focus-start-el":d.value,onFocusAfterTrapped:e(D),onFocusAfterReleased:e(k),onFocusoutPrevented:e(A),onReleaseRequested:e(N)},{default:j(()=>[P(`div`,_({ref_key:`drawerRef`,ref:u,"aria-modal":`true`,"aria-label":r.title||void 0,"aria-labelledby":r.title?void 0:e(S),"aria-describedby":e(C)},t.$attrs,{class:[e(p).b(),r.direction,e(b)&&`open`,e(p).is(`dragging`,e(R))],style:{[e(I)?`width`:`height`]:e(L)},role:`dialog`,onClick:i[1]||=Bt(()=>{},[`stop`])}),[P(`span`,{ref_key:`focusStartRef`,ref:d,class:v(e(p).e(`sr-focus`)),tabindex:`-1`},null,2),r.withHeader?(s(),W(`header`,{key:0,class:v([e(p).e(`header`),r.headerClass])},[t.$slots.title?E(t.$slots,`title`,{key:1},()=>[U(` DEPRECATED SLOT `)]):E(t.$slots,`header`,{key:0,close:e(ee),titleId:e(S),titleClass:e(p).e(`title`)},()=>[P(`span`,{id:e(S),role:`heading`,"aria-level":r.headerAriaLevel,class:v(e(p).e(`title`))},B(r.title),11,on)]),r.showClose?(s(),W(`button`,{key:2,"aria-label":e(m)(`el.drawer.close`),class:v(e(p).e(`close-btn`)),type:`button`,onClick:i[0]||=(...t)=>e(ee)&&e(ee)(...t)},[n(e(vt),{class:v(e(p).e(`close`))},{default:j(()=>[n(e(Nt))]),_:1},8,[`class`])],10,sn)):U(`v-if`,!0)],2)):U(`v-if`,!0),e(x)?(s(),W(`div`,{key:1,id:e(C),class:v([e(p).e(`body`),r.bodyClass])},[E(t.$slots,`default`)],10,cn)):U(`v-if`,!0),t.$slots.footer?(s(),W(`div`,{key:2,class:v([e(p).e(`footer`),r.footerClass])},[E(t.$slots,`footer`)],2)):U(`v-if`,!0),r.resizable?(s(),W(`div`,{key:3,ref_key:`draggerRef`,ref:f,style:H({zIndex:e(w)}),class:v(e(p).e(`dragger`))},null,6)):U(`v-if`,!0)],16,an)]),_:3},8,[`trapped`,`focus-trap-el`,`focus-start-el`,`onFocusAfterTrapped`,`onFocusAfterReleased`,`onFocusoutPrevented`,`onReleaseRequested`])]),_:3},8,[`mask`,`overlay-class`,`z-index`,`onClick`]),[[mt,e(b)]])]),_:3},8,[`name`,`onAfterEnter`,`onAfterLeave`,`onBeforeLeave`])],8,[`to`,`disabled`]))}})),un=Symbol(`elDropdown`),dn=`elDropdown`,fn=w({inheritAttrs:!1});function pn(e,t,n,r,i,a){return E(e.$slots,`default`)}var mn=pt(fn,[[`render`,pn]]),hn=w({name:`ElCollectionItem`,inheritAttrs:!1});function gn(e,t,n,r,i,a){return E(e.$slots,`default`)}var _n=pt(hn,[[`render`,gn]]),vn=`data-el-collection-item`,yn=n=>{let r=`El${n}Collection`,i=`${r}Item`,a=Symbol(r),o=Symbol(i);return{COLLECTION_INJECTION_KEY:a,COLLECTION_ITEM_INJECTION_KEY:o,ElCollection:Object.assign({},mn,{name:r,setup(){let n=t(),r=new Map;f(a,{itemMap:r,getItems:(()=>{let t=e(n);if(!t)return[];let i=Array.from(t.querySelectorAll(`[${vn}]`));return[...r.values()].sort((e,t)=>i.indexOf(e.ref)-i.indexOf(t.ref))}),collectionRef:n})}}),ElCollectionItem:Object.assign({},_n,{name:i,setup(n,{attrs:r}){let i=t(),s=L(a,void 0);f(o,{collectionItemRef:i}),l(()=>{let t=e(i);t&&s.itemMap.set(t,{ref:t,...r})}),b(()=>{let t=e(i);s.itemMap.delete(t)})}})}},bn=Pt({style:{type:Ft([String,Array,Object,Boolean]),default:void 0},currentTabId:{type:Ft(String)},defaultCurrentTabId:String,loop:Boolean,dir:{type:String,values:[`ltr`,`rtl`],default:`ltr`},orientation:{type:Ft(String)},onBlur:Function,onFocus:Function,onMousedown:Function}),{ElCollection:xn,ElCollectionItem:Sn,COLLECTION_INJECTION_KEY:Cn,COLLECTION_ITEM_INJECTION_KEY:wn}=yn(`RovingFocusGroup`),Tn=Symbol(`elRovingFocusGroup`),En=Symbol(`elRovingFocusGroupItem`),Dn={ArrowLeft:`prev`,ArrowUp:`prev`,ArrowRight:`next`,ArrowDown:`next`,PageUp:`first`,Home:`first`,PageDown:`last`,End:`last`},On=(e,t)=>{if(t!==`rtl`)return e;switch(e){case Y.right:return Y.left;case Y.left:return Y.right;default:return e}},kn=(e,t,n)=>{let r=On(Gt(e),n);if(!(t===`vertical`&&[Y.left,Y.right].includes(r))&&!(t===`horizontal`&&[Y.up,Y.down].includes(r)))return Dn[r]},An=(e,t)=>e.map((n,r)=>e[(r+t)%e.length]),jn=e=>{let{activeElement:t}=document;for(let n of e)if(n===t||(n.focus(),t!==document.activeElement))return},Mn=`currentTabIdChange`,Nn=`rovingFocusGroup.entryFocus`,Pn={bubbles:!1,cancelable:!0},Fn=w({name:`ElRovingFocusGroupImpl`,inheritAttrs:!1,props:bn,emits:[Mn,`entryFocus`],setup(n,{emit:r}){let a=t((n.currentTabId||n.defaultCurrentTabId)??null),s=t(!1),c=t(!1),l=t(),{getItems:u}=L(Cn,void 0),d=F(()=>[{outline:`none`},n.style]),p=e=>{r(Mn,e)},m=()=>{s.value=!0},h=yt(e=>{n.onMousedown?.(e)},()=>{c.value=!0}),g=yt(e=>{n.onFocus?.(e)},t=>{let n=!e(c),{target:r,currentTarget:i}=t;if(r===i&&n&&!e(s)){let t=new Event(Nn,Pn);if(i?.dispatchEvent(t),!t.defaultPrevented){let t=u().filter(e=>e.focusable);jn([t.find(e=>e.active),t.find(t=>t.id===e(a)),...t].filter(Boolean).map(e=>e.ref))}}c.value=!1}),_=yt(e=>{n.onBlur?.(e)},()=>{s.value=!1});f(Tn,{currentTabbedId:x(a),loop:i(n,`loop`),tabIndex:F(()=>e(s)?-1:0),rovingFocusGroupRef:l,rovingFocusGroupRootStyle:d,orientation:i(n,`orientation`),dir:i(n,`dir`),onItemFocus:p,onItemShiftTab:m,onBlur:_,onFocus:g,onMousedown:h,onKeydown:e=>{let t=kn(e);if(t){e.preventDefault();let r=u().filter(e=>e.focusable).map(e=>e.ref);switch(t){case`last`:r.reverse();break;case`prev`:case`next`:{t===`prev`&&r.reverse();let i=r.indexOf(e.currentTarget);r=n.loop?An(r,i+1):r.slice(i+1);break}default:break}o(()=>{jn(r)})}}}),A(()=>n.currentTabId,e=>{a.value=e??null}),k(l,Nn,(...e)=>{r(`entryFocus`,...e)})}});function In(e,t,n,r,i,a){return E(e.$slots,`default`)}var Ln=w({name:`ElRovingFocusGroup`,components:{ElFocusGroupCollection:xn,ElRovingFocusGroupImpl:pt(Fn,[[`render`,In]])}});function Rn(e,t,r,i,a,o){let c=T(`el-roving-focus-group-impl`),l=T(`el-focus-group-collection`);return s(),O(l,null,{default:j(()=>[n(c,N(h(e.$attrs)),{default:j(()=>[E(e.$slots,`default`)]),_:3},16)]),_:3})}var zn=pt(Ln,[[`render`,Rn]]),Bn=w({components:{ElRovingFocusCollectionItem:Sn},props:{focusable:{type:Boolean,default:!0},active:Boolean},emits:[`mousedown`,`focus`,`keydown`],setup(n,{emit:r}){let{currentTabbedId:i,onItemFocus:a,onItemShiftTab:o,onKeydown:s}=L(Tn,void 0),c=Tt(),l=t(),u=yt(e=>{r(`mousedown`,e)},t=>{n.focusable?a(e(c)):t.preventDefault()}),d=yt(e=>{r(`focus`,e)},()=>{a(e(c))}),p=yt(e=>{r(`keydown`,e)},e=>{let{shiftKey:t,target:n,currentTarget:r}=e;if(Gt(e)===Y.tab&&t){o();return}n===r&&s(e)}),m=F(()=>i.value===e(c));return f(En,{rovingFocusGroupItemRef:l,tabIndex:F(()=>e(m)?0:-1),handleMousedown:u,handleFocus:d,handleKeydown:p}),{id:c,handleKeydown:p,handleFocus:d,handleMousedown:u}}});function Vn(e,t,n,r,i,a){let o=T(`el-roving-focus-collection-item`);return s(),O(o,{id:e.id,focusable:e.focusable,active:e.active},{default:j(()=>[E(e.$slots,`default`)]),_:3},8,[`id`,`focusable`,`active`])}var Hn=pt(Bn,[[`render`,Vn]]),Un=zn,{ButtonGroup:Wn}=K,Gn=w({name:`ElDropdown`,components:{ElButton:K,ElButtonGroup:Wn,ElScrollbar:Re,ElTooltip:gt,ElRovingFocusGroup:Un,ElOnlyChild:Et,ElIcon:vt,ArrowDown:St},props:Ke,emits:[`visible-change`,`click`,`command`],setup(n,{emit:r}){let o=a(),s=Dt(`dropdown`),{t:c}=kt(),l=t(),u=t(),d=t(),p=t(),m=t(null),h=t(null),g=t(!1),_=F(()=>({maxHeight:ft(n.maxHeight)})),v=F(()=>[s.m(T.value)]),y=F(()=>De(n.trigger)),b=Tt().value,x=F(()=>n.id||b);function S(){d.value?.onClose(void 0,0)}function C(){d.value?.onClose()}function w(){d.value?.onOpen()}let T=je();function E(...e){r(`command`,...e)}function D(){}function O(){let t=e(p);y.value.includes(`hover`)&&t?.focus({preventScroll:!0}),h.value=null}function k(e){h.value=e}function A(){r(`visible-change`,!0)}function j(e){g.value=e?.type===`keydown`,p.value?.focus()}function M(){r(`visible-change`,!1)}return f(un,{contentRef:p,role:F(()=>n.role),triggerId:x,isUsingKeyboard:g,onItemEnter:D,onItemLeave:O,handleClose:C}),f(dn,{instance:o,dropdownSize:T,handleClick:S,commandHandler:E,trigger:i(n,`trigger`),hideOnClick:i(n,`hideOnClick`)}),{t:c,ns:s,scrollbar:m,wrapStyle:_,dropdownTriggerKls:v,dropdownSize:T,triggerId:x,currentTabId:h,handleCurrentTabIdChange:k,handlerMainButtonClick:e=>{r(`click`,e)},handleClose:C,handleOpen:w,handleBeforeShowTooltip:A,handleShowTooltip:j,handleBeforeHideTooltip:M,popperRef:d,contentRef:p,triggeringElementRef:l,referenceElementRef:u}}});function Kn(e,t,r,i,a,o){let c=T(`el-roving-focus-group`),l=T(`el-scrollbar`),u=T(`el-only-child`),d=T(`el-tooltip`),f=T(`el-button`),p=T(`arrow-down`),m=T(`el-icon`),h=T(`el-button-group`);return s(),W(`div`,{class:v([e.ns.b(),e.ns.is(`disabled`,e.disabled)])},[n(d,{ref:`popperRef`,role:e.role,effect:e.effect,"fallback-placements":[`bottom`,`top`],"popper-options":e.popperOptions,"gpu-acceleration":!1,placement:e.placement,"popper-class":[e.ns.e(`popper`),e.popperClass],"popper-style":e.popperStyle,trigger:e.trigger,"trigger-keys":e.triggerKeys,"trigger-target-el":e.contentRef,"show-arrow":e.showArrow,"show-after":e.trigger===`hover`?e.showTimeout:0,"hide-after":e.trigger===`hover`?e.hideTimeout:0,"virtual-ref":e.virtualRef??e.triggeringElementRef,"virtual-triggering":e.virtualTriggering||e.splitButton,disabled:e.disabled,transition:`${e.ns.namespace.value}-zoom-in-top`,teleported:e.teleported,"append-to":e.appendTo,pure:``,"focus-on-target":``,persistent:e.persistent,onBeforeShow:e.handleBeforeShowTooltip,onShow:e.handleShowTooltip,onBeforeHide:e.handleBeforeHideTooltip},se({content:j(()=>[n(l,{ref:`scrollbar`,"wrap-style":e.wrapStyle,tag:`div`,"view-class":e.ns.e(`list`)},{default:j(()=>[n(c,{loop:e.loop,"current-tab-id":e.currentTabId,orientation:`horizontal`,onCurrentTabIdChange:e.handleCurrentTabIdChange},{default:j(()=>[E(e.$slots,`dropdown`)]),_:3},8,[`loop`,`current-tab-id`,`onCurrentTabIdChange`])]),_:3},8,[`wrap-style`,`view-class`])]),_:2},[e.splitButton?void 0:{name:`default`,fn:j(()=>[n(u,{id:e.triggerId,ref:`triggeringElementRef`,role:`button`,tabindex:e.tabindex},{default:j(()=>[E(e.$slots,`default`)]),_:3},8,[`id`,`tabindex`])]),key:`0`}]),1032,[`role`,`effect`,`popper-options`,`placement`,`popper-class`,`popper-style`,`trigger`,`trigger-keys`,`trigger-target-el`,`show-arrow`,`show-after`,`hide-after`,`virtual-ref`,`virtual-triggering`,`disabled`,`transition`,`teleported`,`append-to`,`persistent`,`onBeforeShow`,`onShow`,`onBeforeHide`]),e.splitButton?(s(),O(h,{key:0},{default:j(()=>[n(f,_({ref:`referenceElementRef`},e.buttonProps,{size:e.dropdownSize,type:e.type,disabled:e.disabled,tabindex:e.tabindex,onClick:e.handlerMainButtonClick}),{default:j(()=>[E(e.$slots,`default`)]),_:3},16,[`size`,`type`,`disabled`,`tabindex`,`onClick`]),n(f,_({id:e.triggerId,ref:`triggeringElementRef`},e.buttonProps,{role:`button`,size:e.dropdownSize,type:e.type,class:e.ns.e(`caret-button`),disabled:e.disabled,tabindex:e.tabindex,"aria-label":e.t(`el.dropdown.toggleDropdown`)}),{default:j(()=>[n(m,{class:v(e.ns.e(`icon`))},{default:j(()=>[n(p)]),_:1},8,[`class`])]),_:1},16,[`id`,`size`,`type`,`class`,`disabled`,`tabindex`,`aria-label`])]),_:3})):U(`v-if`,!0)],2)}var qn=pt(Gn,[[`render`,Kn]]),Jn=w({name:`DropdownItemImpl`,components:{ElIcon:vt},props:Qe,emits:[`pointermove`,`pointerleave`,`click`,`clickimpl`],setup(e,{emit:t}){let n=Dt(`dropdown`),{role:r}=L(un,void 0),{collectionItemRef:i}=L(wn,void 0),{rovingFocusGroupItemRef:a,tabIndex:o,handleFocus:s,handleKeydown:c,handleMousedown:l}=L(En,void 0),u=ve(i,a),d=F(()=>r.value===`menu`?`menuitem`:r.value===`navigation`?`link`:`button`),f=yt(e=>{let n=Gt(e);if([Y.enter,Y.numpadEnter,Y.space].includes(n))return e.preventDefault(),e.stopImmediatePropagation(),t(`clickimpl`,e),!0},c);return{ns:n,itemRef:u,dataset:{[vn]:``},role:d,tabIndex:o,handleFocus:s,handleKeydown:f,handleMousedown:l}}}),Yn=[`aria-disabled`,`tabindex`,`role`];function Xn(e,t,n,r,i,a){let o=T(`el-icon`);return s(),W(V,null,[e.divided?(s(),W(`li`,{key:0,role:`separator`,class:v(e.ns.bem(`menu`,`item`,`divided`))},null,2)):U(`v-if`,!0),P(`li`,_({ref:e.itemRef},{...e.dataset,...e.$attrs},{"aria-disabled":e.disabled,class:[e.ns.be(`menu`,`item`),e.ns.is(`disabled`,e.disabled)],tabindex:e.tabIndex,role:e.role,onClick:t[0]||=t=>e.$emit(`clickimpl`,t),onFocus:t[1]||=(...t)=>e.handleFocus&&e.handleFocus(...t),onKeydown:t[2]||=Bt((...t)=>e.handleKeydown&&e.handleKeydown(...t),[`self`]),onMousedown:t[3]||=(...t)=>e.handleMousedown&&e.handleMousedown(...t),onPointermove:t[4]||=t=>e.$emit(`pointermove`,t),onPointerleave:t[5]||=t=>e.$emit(`pointerleave`,t)}),[e.icon||e.$slots.icon?(s(),O(o,{key:0},{default:j(()=>[E(e.$slots,`icon`,{},()=>[(s(),O(y(e.icon)))])]),_:3})):U(`v-if`,!0),E(e.$slots,`default`)],16,Yn)],64)}var Zn=pt(Jn,[[`render`,Xn]]),Qn=()=>{let e=L(dn,{});return{elDropdown:e,_elDropdownSize:F(()=>e?.dropdownSize)}},$n=w({name:`ElDropdownItem`,components:{ElRovingFocusItem:Hn,ElDropdownItemImpl:Zn},inheritAttrs:!1,props:Qe,emits:[`pointermove`,`pointerleave`,`click`],setup(e,{emit:t,attrs:n}){let{elDropdown:r}=Qn(),i=a(),{onItemEnter:o,onItemLeave:s}=L(un,void 0),c=yt(e=>(t(`pointermove`,e),e.defaultPrevented),Ot(t=>{if(e.disabled){s(t);return}let n=t.currentTarget;n===document.activeElement||n.contains(document.activeElement)||(o(t),t.defaultPrevented||n?.focus({preventScroll:!0}))})),l=yt(e=>(t(`pointerleave`,e),e.defaultPrevented),Ot(s));return{handleClick:yt(n=>{if(!e.disabled)return t(`click`,n),n.type!==`keydown`&&n.defaultPrevented},t=>{if(e.disabled){t.stopImmediatePropagation();return}r?.hideOnClick?.value&&r.handleClick?.(),r.commandHandler?.(e.command,i,t)}),handlePointerMove:c,handlePointerLeave:l,propsAndAttrs:F(()=>({...e,...n}))}}});function er(e,t,r,i,a,o){let c=T(`el-dropdown-item-impl`),l=T(`el-roving-focus-item`);return s(),O(l,{focusable:!e.disabled},{default:j(()=>[n(c,_(e.propsAndAttrs,{onPointerleave:e.handlePointerLeave,onPointermove:e.handlePointerMove,onClickimpl:e.handleClick}),se({default:j(()=>[E(e.$slots,`default`)]),_:2},[e.$slots.icon?{name:`icon`,fn:j(()=>[E(e.$slots,`icon`)]),key:`0`}:void 0]),1040,[`onPointerleave`,`onPointermove`,`onClickimpl`])]),_:3},8,[`focusable`])}var tr=pt($n,[[`render`,er]]),nr=w({name:`ElDropdownMenu`,props:Ye,setup(e){let t=Dt(`dropdown`),{_elDropdownSize:n}=Qn(),r=n.value,{contentRef:i,role:a,triggerId:o,isUsingKeyboard:s,handleClose:c}=L(un,void 0),{rovingFocusGroupRef:l,rovingFocusGroupRootStyle:u,onBlur:d,onFocus:f,onKeydown:p,onMousedown:m}=L(Tn,void 0),{collectionRef:h}=L(Cn,void 0),g=F(()=>[t.b(`menu`),t.bm(`menu`,r?.value)]),_=ve(i,l,h),v=yt(t=>{e.onKeydown?.(t)},e=>{let{currentTarget:t,target:n}=e,r=Gt(e);if(t.contains(n),Y.tab===r)return c();p(e)});function y(e){s.value&&f(e)}return{size:r,rovingFocusGroupRootStyle:u,dropdownKls:g,role:a,triggerId:o,dropdownListWrapperRef:_,handleKeydown:v,onBlur:d,handleFocus:y,onMousedown:m}}}),rr=[`role`,`aria-labelledby`];function ir(e,t,n,r,i,a){return s(),W(`ul`,{ref:e.dropdownListWrapperRef,class:v(e.dropdownKls),style:H(e.rovingFocusGroupRootStyle),tabindex:-1,role:e.role,"aria-labelledby":e.triggerId,onFocusin:t[0]||=(...t)=>e.handleFocus&&e.handleFocus(...t),onFocusout:t[1]||=(...t)=>e.onBlur&&e.onBlur(...t),onKeydown:t[2]||=Bt((...t)=>e.handleKeydown&&e.handleKeydown(...t),[`self`]),onMousedown:t[3]||=Bt((...t)=>e.onMousedown&&e.onMousedown(...t),[`self`])},[E(e.$slots,`default`)],46,rr)}var ar=pt(nr,[[`render`,ir]]),or=xt(qn,{DropdownItem:tr,DropdownMenu:ar}),sr=zt(tr),cr=zt(ar),lr=Symbol(`sliderContextKey`),ur=Pt({modelValue:{type:Ft([Number,Array]),default:0},id:{type:String,default:void 0},min:{type:Number,default:0},max:{type:Number,default:100},step:{type:Ft([Number,String]),default:1},showInput:Boolean,showInputControls:{type:Boolean,default:!0},size:_t,inputSize:_t,showStops:Boolean,showTooltip:{type:Boolean,default:!0},formatTooltip:{type:Ft(Function),default:void 0},disabled:{type:Boolean,default:void 0},range:Boolean,vertical:Boolean,height:String,rangeStartLabel:{type:String,default:void 0},rangeEndLabel:{type:String,default:void 0},formatValueText:{type:Ft(Function),default:void 0},tooltipClass:{type:String,default:void 0},placement:{type:String,values:ht,default:`top`},marks:{type:Ft(Object)},validateEvent:{type:Boolean,default:!0},persistent:{type:Boolean,default:!0},...bt([`ariaLabel`])}),dr=e=>Jt(e)||le(e)&&e.every(Jt),fr={[de]:dr,[ue]:dr,[fe]:dr},pr=(e,n,r)=>{let i=t();return l(async()=>{e.range?(le(e.modelValue)?(n.firstValue=Math.max(e.min,e.modelValue[0]),n.secondValue=Math.min(e.max,e.modelValue[1])):(n.firstValue=e.min,n.secondValue=e.max),n.oldValue=[n.firstValue,n.secondValue]):(!Jt(e.modelValue)||Number.isNaN(e.modelValue)?n.firstValue=e.min:n.firstValue=Math.min(e.max,Math.max(e.min,e.modelValue)),n.oldValue=n.firstValue),k(window,`resize`,r),await o(),r()}),{sliderWrapper:i}},mr=e=>{let t=F(()=>e.marks?Object.keys(e.marks).map(Number.parseFloat).sort((e,t)=>e-t).filter(t=>t<=e.max&&t>=e.min).map(t=>({point:t,position:(t-e.min)*100/(e.max-e.min),mark:e.marks[t]})):[]);return z(()=>{if(e.step===`mark`&&!e.marks&&Mt(`ElSlider`,`marks prop must be provided when step is mark`),e.marks){let n=Object.keys(e.marks),r=t.value.map(e=>e.point),i=n.filter(e=>{let t=Number.parseFloat(e);return Number.isNaN(t)||!r.includes(t)});i.length>0&&Mt(`ElSlider`,`Some marks keys are invalid (not a number or out of [min, max]): [${i.map(e=>`'${e}'`).join(`, `)}] and will be ignored.`)}}),t},hr=(e,n,r)=>{let{formItem:i}=Pe(),a=C(),s=t(),c=t(),l={firstButton:s,secondButton:c},u=Ne(),d=F(()=>Math.min(n.firstValue,n.secondValue)),f=F(()=>Math.max(n.firstValue,n.secondValue)),p=F(()=>e.range?`${100*(f.value-d.value)/(e.max-e.min)}%`:`${100*(n.firstValue-e.min)/(e.max-e.min)}%`),m=F(()=>e.range?`${100*(d.value-e.min)/(e.max-e.min)}%`:`0%`),h=F(()=>e.vertical?{height:e.height}:{}),g=F(()=>e.vertical?{height:p.value,bottom:m.value}:{width:p.value,left:m.value}),_=()=>{a.value&&(n.sliderSize=a.value.getBoundingClientRect()[e.vertical?`height`:`width`])},v=t=>{let r=e.min+t*(e.max-e.min)/100;if(!e.range)return s;let i;return i=Math.abs(d.value-r)<Math.abs(f.value-r)?n.firstValue<n.secondValue?`firstButton`:`secondButton`:n.firstValue>n.secondValue?`firstButton`:`secondButton`,l[i]},y=e=>{let t=v(e);return t.value.setPosition(e),t},b=t=>{n.firstValue=t??e.min,S(e.range?[d.value,f.value]:t??e.min)},x=t=>{n.secondValue=t,e.range&&S([d.value,f.value])},S=e=>{r(de,e),r(ue,e)},w=async()=>{await o(),r(fe,e.range?[d.value,f.value]:e.modelValue)},T=t=>{if(u.value||n.dragging)return;_();let r=0;if(e.vertical){let e=t.touches?.item(0)?.clientY??t.clientY;r=(a.value.getBoundingClientRect().bottom-e)/n.sliderSize*100}else r=((t.touches?.item(0)?.clientX??t.clientX)-a.value.getBoundingClientRect().left)/n.sliderSize*100;if(!(r<0||r>100))return y(r)};return{elFormItem:i,slider:a,firstButton:s,secondButton:c,sliderDisabled:u,minValue:d,maxValue:f,runwayStyle:h,barStyle:g,resetSize:_,setPosition:y,emitChange:w,onSliderWrapperPrevent:e=>{(l.firstButton.value?.dragging||l.secondButton.value?.dragging)&&e.preventDefault()},onSliderClick:e=>{T(e)&&w()},onSliderDown:async e=>{let t=T(e);t&&(await o(),t.value.onButtonDown(e))},onSliderMarkerDown:e=>{u.value||n.dragging||y(e)&&w()},setFirstValue:b,setSecondValue:x}},gr=(e,t,n,r)=>({stops:F(()=>{if(!e.showStops||e.min>e.max)return[];if(e.step===`mark`||e.step===0)return e.step===0&&Mt(`ElSlider`,`step should not be 0.`),[];let i=Math.ceil((e.max-e.min)/e.step),a=100*e.step/(e.max-e.min),o=Array.from({length:i-1}).map((e,t)=>(t+1)*a);return e.range?o.filter(t=>t<100*(n.value-e.min)/(e.max-e.min)||t>100*(r.value-e.min)/(e.max-e.min)):o.filter(n=>n>100*(t.firstValue-e.min)/(e.max-e.min))}),getStopStyle:t=>e.vertical?{bottom:`${t}%`}:{left:`${t}%`}}),_r=(e,t,n,r,i,a)=>{let o=e=>{i(de,e),i(ue,e)},s=()=>e.range?![n.value,r.value].every((e,n)=>e===t.oldValue[n]):e.modelValue!==t.oldValue,c=()=>{e.min>e.max&&Vt(`Slider`,`min should not be greater than max.`);let n=e.modelValue;e.range&&le(n)?n[1]<e.min?o([e.min,e.min]):n[0]>e.max?o([e.max,e.max]):n[0]<e.min?o([e.min,n[1]]):n[1]>e.max?o([n[0],e.max]):(t.firstValue=n[0],t.secondValue=n[1],s()&&(e.validateEvent&&a?.validate?.(`change`).catch(I),t.oldValue=n.slice())):!e.range&&Jt(n)&&!Number.isNaN(n)&&(n<e.min?o(e.min):n>e.max?o(e.max):(t.firstValue=n,s()&&(e.validateEvent&&a?.validate?.(`change`).catch(I),t.oldValue=n)))};c(),A(()=>t.dragging,e=>{e||c()}),A(()=>e.modelValue,(e,n)=>{t.dragging||le(e)&&le(n)&&e.every((e,t)=>e===n[t])&&t.firstValue===e[0]&&t.secondValue===e[1]||c()},{deep:!0}),A(()=>[e.min,e.max],()=>{c()})},vr=(e,n,r)=>{let i=t(),a=t(!1),o=F(()=>n.value instanceof Function);return{tooltip:i,tooltipVisible:a,formatValue:F(()=>o.value&&n.value(e.modelValue)||e.modelValue),displayTooltip:Ce(()=>{r.value&&(a.value=!0)},50),hideTooltip:Ce(()=>{r.value&&(a.value=!1)},50)}},yr=(e,n,r)=>{let{disabled:i,min:a,max:s,step:c,showTooltip:l,persistent:u,precision:d,sliderSize:f,formatTooltip:p,emitChange:m,resetSize:h,updateDragging:g,markList:_}=L(lr),{tooltip:v,tooltipVisible:y,formatValue:b,displayTooltip:x,hideTooltip:S}=vr(e,p,l),C=t(),w=F(()=>`${(e.modelValue-a.value)/(s.value-a.value)*100}%`),T=F(()=>e.vertical?{bottom:w.value}:{left:w.value}),E=F(()=>c.value===`mark`&&_.value.length>0),D=()=>{n.hovering=!0,x()},O=()=>{n.hovering=!1,n.dragging||S()},j=e=>{i.value||(e.preventDefault(),V(e),window.addEventListener(`mousemove`,H),window.addEventListener(`touchmove`,H),window.addEventListener(`mouseup`,re),window.addEventListener(`touchend`,re),window.addEventListener(`contextmenu`,re),C.value.focus())},M=e=>{i.value||(n.newPosition=Number.parseFloat(w.value)+e/(s.value-a.value)*100,ie(n.newPosition),m())},N=t=>{if(i.value||!_.value.length)return;let n=e.modelValue,r=2**-52,o=Math.abs(t),c;if(t>0){let e=_.value.findIndex(e=>e.point>n+r);if(e!==-1){let t=Math.min(e+o-1,_.value.length-1);c=_.value[t].point}}else{let e=-1;for(let t=_.value.length-1;t>=0;t--)if(_.value[t].point<n-r){e=t;break}if(e!==-1){let t=Math.max(e-(o-1),0);c=_.value[t].point}}c!==void 0&&c!==n&&(ie((c-a.value)/(s.value-a.value)*100),m())},ee=()=>{E.value?N(-1):Jt(c.value)&&M(-c.value)},te=()=>{E.value?N(1):Jt(c.value)&&M(c.value)},P=()=>{E.value?N(-4):Jt(c.value)&&M(-c.value*4)},ne=()=>{E.value?N(4):Jt(c.value)&&M(c.value*4)},I=()=>{i.value||(ie(0),m())},R=()=>{i.value||(ie(100),m())},z=e=>{let t=Gt(e),n=!0;switch(t){case Y.left:case Y.down:ee();break;case Y.right:case Y.up:te();break;case Y.home:I();break;case Y.end:R();break;case Y.pageDown:P();break;case Y.pageUp:ne();break;default:n=!1;break}n&&e.preventDefault()},B=e=>{let t,n;return e.type.startsWith(`touch`)?(n=e.touches[0].clientY,t=e.touches[0].clientX):(n=e.clientY,t=e.clientX),{clientX:t,clientY:n}},V=t=>{n.dragging=!0,n.isClick=!0;let{clientX:r,clientY:i}=B(t);e.vertical?n.startY=i:n.startX=r,n.startPosition=Number.parseFloat(w.value),n.newPosition=n.startPosition},H=t=>{if(n.dragging){n.isClick=!1,x(),h();let r,{clientX:i,clientY:a}=B(t);e.vertical?(n.currentY=a,r=(n.startY-n.currentY)/f.value*100):(n.currentX=i,r=(n.currentX-n.startX)/f.value*100),n.newPosition=n.startPosition+r,ie(n.newPosition)}},re=()=>{n.dragging&&(setTimeout(()=>{n.dragging=!1,n.hovering||S(),n.isClick||ie(n.newPosition),m()},0),window.removeEventListener(`mousemove`,H),window.removeEventListener(`touchmove`,H),window.removeEventListener(`mouseup`,re),window.removeEventListener(`touchend`,re),window.removeEventListener(`contextmenu`,re))},ie=async t=>{if(t===null||Number.isNaN(+t))return;t=he(t,0,100);let i;if(c.value===`mark`)i=_.value.length===0?t<=50?a.value:s.value:_.value.reduce((e,n)=>Math.abs(n.position-t)<Math.abs(e.position-t)?n:e).point;else{let e=Math.floor((s.value-a.value)/c.value),n=e*c.value/(s.value-a.value)*100,r=n+(100-n)/2;if(t<n){let r=n/e,o=Math.round(t/r);i=a.value+o*c.value}else i=t<r?a.value+e*c.value:s.value;i=Number.parseFloat(i.toFixed(d.value))}i!==e.modelValue&&r(de,i),!n.dragging&&e.modelValue!==n.oldValue&&(n.oldValue=e.modelValue),await o(),n.dragging&&x(),v.value.updatePopper()};return A(()=>n.dragging,e=>{g(e)}),k(C,`touchstart`,j,{passive:!1}),{disabled:i,button:C,tooltip:v,tooltipVisible:y,showTooltip:l,persistent:u,wrapperStyle:T,formatValue:b,handleMouseEnter:D,handleMouseLeave:O,onButtonDown:j,onKeyDown:z,setPosition:ie}},br=Pt({modelValue:{type:Number,default:0},vertical:Boolean,tooltipClass:String,placement:{type:String,values:ht,default:`top`}}),xr={[de]:e=>Jt(e)},Sr=[`tabindex`],Cr=w({name:`ElSliderButton`,__name:`button`,props:br,emits:xr,setup(t,{expose:r,emit:i}){let a=t,o=i,c=Dt(`slider`),l=oe({hovering:!1,dragging:!1,isClick:!1,startX:0,currentX:0,startY:0,currentY:0,startPosition:0,newPosition:0,oldValue:a.modelValue}),u=F(()=>h.value?g.value:!1),{disabled:d,button:f,tooltip:p,showTooltip:h,persistent:g,tooltipVisible:_,wrapperStyle:y,formatValue:b,handleMouseEnter:x,handleMouseLeave:S,onButtonDown:C,onKeyDown:w,setPosition:T}=yr(a,l,o),{hovering:E,dragging:D}=m(l);return r({onButtonDown:C,onKeyDown:w,setPosition:T,hovering:E,dragging:D}),(t,r)=>(s(),W(`div`,{ref_key:`button`,ref:f,class:v([e(c).e(`button-wrapper`),{hover:e(E),dragging:e(D)}]),style:H(e(y)),tabindex:e(d)?void 0:0,onMouseenter:r[0]||=(...t)=>e(x)&&e(x)(...t),onMouseleave:r[1]||=(...t)=>e(S)&&e(S)(...t),onMousedown:r[2]||=(...t)=>e(C)&&e(C)(...t),onFocus:r[3]||=(...t)=>e(x)&&e(x)(...t),onBlur:r[4]||=(...t)=>e(S)&&e(S)(...t),onKeydown:r[5]||=(...t)=>e(w)&&e(w)(...t)},[n(e(gt),{ref_key:`tooltip`,ref:p,visible:e(_),placement:t.placement,"fallback-placements":[`top`,`bottom`,`right`,`left`],"stop-popper-mouse-event":!1,"popper-class":t.tooltipClass,disabled:!e(h),persistent:u.value},{content:j(()=>[P(`span`,null,B(e(b)),1)]),default:j(()=>[P(`div`,{class:v([e(c).e(`button`),{hover:e(E),dragging:e(D)}])},null,2)]),_:1},8,[`visible`,`placement`,`popper-class`,`disabled`,`persistent`])],46,Sr))}}),wr=w({name:`ElSliderMarker`,props:Pt({mark:{type:Ft([String,Object]),default:void 0}}),setup(e){let t=Dt(`slider`),n=F(()=>u(e.mark)?e.mark:e.mark.label),r=F(()=>u(e.mark)?void 0:e.mark.style);return()=>R(`div`,{class:t.e(`marks-text`),style:r.value},n.value)}}),Tr=[`id`,`role`,`aria-label`,`aria-labelledby`],Er={key:1},Dr=xt(w({name:`ElSlider`,__name:`slider`,props:ur,emits:fr,setup(t,{expose:r,emit:i}){let a=t,o=i,c=Dt(`slider`),{t:l}=kt(),u=oe({firstValue:0,secondValue:0,oldValue:0,dragging:!1,sliderSize:1}),{elFormItem:p,slider:h,firstButton:g,secondButton:_,sliderDisabled:y,minValue:b,maxValue:x,runwayStyle:S,barStyle:C,resetSize:w,emitChange:T,onSliderWrapperPrevent:E,onSliderClick:D,onSliderDown:A,onSliderMarkerDown:j,setFirstValue:M,setSecondValue:N}=hr(a,u,o),{stops:ee,getStopStyle:te}=gr(a,u,b,x),{inputId:ne,isLabeledByFormItem:I}=Me(a,{formItemContext:p}),L=je(),R=F(()=>a.inputSize||L.value),z=F(()=>a.showInput&&!a.range&&a.step!==`mark`),B=F(()=>a.ariaLabel||l(`el.slider.defaultLabel`,{min:a.min,max:a.max})),re=F(()=>a.range?a.rangeStartLabel||l(`el.slider.defaultRangeStartLabel`):B.value),ie=F(()=>a.formatValueText?a.formatValueText(pe.value):`${pe.value}`),ae=F(()=>a.rangeEndLabel||l(`el.slider.defaultRangeEndLabel`)),se=F(()=>a.formatValueText?a.formatValueText(me.value):`${me.value}`),ce=F(()=>[c.b(),c.m(L.value),c.is(`vertical`,a.vertical),{[c.m(`with-input`)]:z.value}]),le=mr(a);_r(a,u,b,x,o,p);let ue=F(()=>Jt(a.step)?a.step:1),de=F(()=>{let e=Jt(a.step)?a.step:1,t=[a.min,a.max,e].map(e=>{let t=`${e}`.split(`.`)[1];return t?t.length:0});return Math.max.apply(null,t)}),{sliderWrapper:fe}=pr(a,u,w),{firstValue:pe,secondValue:me,sliderSize:he}=m(u),ge=e=>{u.dragging=e};return k(fe,`touchstart`,E,{passive:!1}),k(fe,`touchmove`,E,{passive:!1}),f(lr,{...m(a),sliderSize:he,disabled:y,precision:de,markList:le,emitChange:T,resetSize:w,updateDragging:ge}),r({onSliderClick:D}),(t,r)=>(s(),W(`div`,{id:t.range?e(ne):void 0,ref_key:`sliderWrapper`,ref:fe,class:v(ce.value),role:t.range?`group`:void 0,"aria-label":t.range&&!e(I)?B.value:void 0,"aria-labelledby":t.range&&e(I)?e(p)?.labelId:void 0},[P(`div`,{ref_key:`slider`,ref:h,class:v([e(c).e(`runway`),{"show-input":z.value},e(c).is(`disabled`,e(y))]),style:H(e(S)),onMousedown:r[0]||=(...t)=>e(A)&&e(A)(...t),onTouchstartPassive:r[1]||=(...t)=>e(A)&&e(A)(...t)},[P(`div`,{class:v(e(c).e(`bar`)),style:H(e(C))},null,6),n(Cr,{id:t.range?void 0:e(ne),ref_key:`firstButton`,ref:g,"model-value":e(pe),vertical:t.vertical,"tooltip-class":t.tooltipClass,placement:t.placement,role:`slider`,"aria-label":t.range||!e(I)?re.value:void 0,"aria-labelledby":!t.range&&e(I)?e(p)?.labelId:void 0,"aria-valuemin":t.min,"aria-valuemax":t.range?e(me):t.max,"aria-valuenow":e(pe),"aria-valuetext":ie.value,"aria-orientation":t.vertical?`vertical`:`horizontal`,"aria-disabled":e(y),"onUpdate:modelValue":e(M)},null,8,[`id`,`model-value`,`vertical`,`tooltip-class`,`placement`,`aria-label`,`aria-labelledby`,`aria-valuemin`,`aria-valuemax`,`aria-valuenow`,`aria-valuetext`,`aria-orientation`,`aria-disabled`,`onUpdate:modelValue`]),t.range?(s(),O(Cr,{key:0,ref_key:`secondButton`,ref:_,"model-value":e(me),vertical:t.vertical,"tooltip-class":t.tooltipClass,placement:t.placement,role:`slider`,"aria-label":ae.value,"aria-valuemin":e(pe),"aria-valuemax":t.max,"aria-valuenow":e(me),"aria-valuetext":se.value,"aria-orientation":t.vertical?`vertical`:`horizontal`,"aria-disabled":e(y),"onUpdate:modelValue":e(N)},null,8,[`model-value`,`vertical`,`tooltip-class`,`placement`,`aria-label`,`aria-valuemin`,`aria-valuemax`,`aria-valuenow`,`aria-valuetext`,`aria-orientation`,`aria-disabled`,`onUpdate:modelValue`])):U(`v-if`,!0),t.showStops?(s(),W(`div`,Er,[(s(!0),W(V,null,d(e(ee),(t,n)=>(s(),W(`div`,{key:n,class:v(e(c).e(`stop`)),style:H(e(te)(t))},null,6))),128))])):U(`v-if`,!0),e(le).length>0?(s(),W(V,{key:2},[P(`div`,null,[(s(!0),W(V,null,d(e(le),(t,n)=>(s(),W(`div`,{key:n,style:H(e(te)(t.position)),class:v([e(c).e(`stop`),e(c).e(`marks-stop`)])},null,6))),128))]),P(`div`,{class:v(e(c).e(`marks`))},[(s(!0),W(V,null,d(e(le),(t,n)=>(s(),O(e(wr),{key:n,mark:t.mark,style:H(e(te)(t.position)),onMousedown:Bt(n=>e(j)(t.position),[`stop`])},null,8,[`mark`,`style`,`onMousedown`]))),128))],2)],64)):U(`v-if`,!0)],38),z.value?(s(),O(e(Se),{key:0,ref:`input`,"model-value":e(pe),class:v(e(c).e(`input`)),step:ue.value,disabled:e(y),controls:t.showInputControls,min:t.min,max:t.max,precision:de.value,size:R.value,"onUpdate:modelValue":e(M),onChange:e(T)},null,8,[`model-value`,`class`,`step`,`disabled`,`controls`,`min`,`max`,`precision`,`size`,`onUpdate:modelValue`,`onChange`])):U(`v-if`,!0)],10,Tr))}})),Or={label:`label`,value:`value`,disabled:`disabled`},kr=Pt({direction:{type:Ft(String),default:`horizontal`},options:{type:Ft(Array),default:()=>[]},modelValue:{type:[String,Number,Boolean],default:void 0},props:{type:Ft(Object),default:()=>Or},block:Boolean,size:_t,disabled:{type:Boolean,default:void 0},validateEvent:{type:Boolean,default:!0},id:String,name:String,...bt([`ariaLabel`])}),Ar={[de]:e=>u(e)||Jt(e)||Rt(e),[fe]:e=>u(e)||Jt(e)||Rt(e)},jr=[`id`,`aria-label`,`aria-labelledby`],Mr=[`name`,`disabled`,`checked`,`onChange`],Nr=xt(w({name:`ElSegmented`,__name:`segmented`,props:kr,emits:Ar,setup(n,{emit:i}){let a=n,o=i,l=Dt(`segmented`),u=Tt(),f=je(),p=Ne(),{formItem:m}=Pe(),{inputId:h,isLabeledByFormItem:g}=Me(a,{formItemContext:m}),_=t(null),y=ee(),b=oe({isInit:!1,width:0,height:0,translateX:0,translateY:0,focusVisible:!1}),x=(e,t)=>{let n=w(t);o(de,n),o(fe,n),e.target.checked=n===a.modelValue},C=F(()=>({...Or,...a.props})),w=e=>c(e)?e[C.value.value]:e,T=e=>c(e)?e[C.value.label]:e,D=e=>!!(p.value||c(e)&&e[C.value.disabled]),O=e=>a.modelValue===w(e),k=e=>a.options.find(t=>w(t)===e),j=e=>[l.e(`item`),l.is(`selected`,O(e)),l.is(`disabled`,D(e))],M=()=>{if(!_.value)return;let e=_.value.querySelector(`.is-selected`),t=_.value.querySelector(`.is-selected input`);if(!e||!t){b.width=0,b.height=0,b.translateX=0,b.translateY=0,b.focusVisible=!1;return}b.isInit=!0,a.direction===`vertical`?(b.height=e.offsetHeight,b.translateY=e.offsetTop):(b.width=e.offsetWidth,b.translateX=e.offsetLeft);try{b.focusVisible=t.matches(`:focus-visible`)}catch{}},N=F(()=>[l.b(),l.m(f.value),l.is(`block`,a.block)]),te=F(()=>({width:a.direction===`vertical`?`100%`:`${b.width}px`,height:a.direction===`vertical`?`${b.height}px`:`100%`,transform:a.direction===`vertical`?`translateY(${b.translateY}px)`:`translateX(${b.translateX}px)`,display:b.isInit?`block`:`none`})),ne=F(()=>[l.e(`item-selected`),l.is(`disabled`,D(k(a.modelValue))),l.is(`focus-visible`,b.focusVisible)]),L=F(()=>a.name||u.value);return r(_,M),A(y,M),A(()=>a.options,M,{deep:!0,flush:`post`}),A(()=>a.modelValue,()=>{M(),a.validateEvent&&m?.validate?.(`change`).catch(I)},{flush:`post`}),(t,r)=>n.options.length?(s(),W(`div`,{key:0,id:e(h),ref_key:`segmentedRef`,ref:_,class:v(N.value),role:`radiogroup`,"aria-label":e(g)?void 0:n.ariaLabel||`segmented`,"aria-labelledby":e(g)?e(m).labelId:void 0},[P(`div`,{class:v([e(l).e(`group`),e(l).m(n.direction)])},[P(`div`,{style:H(te.value),class:v(ne.value)},null,6),(s(!0),W(V,null,d(n.options,(n,r)=>(s(),W(`label`,{key:r,class:v(j(n))},[P(`input`,{class:v(e(l).e(`item-input`)),type:`radio`,name:L.value,disabled:D(n),checked:O(n),onChange:e=>x(e,n)},null,42,Mr),P(`div`,{class:v(e(l).e(`item-label`))},[E(t.$slots,`default`,{item:n},()=>[S(B(T(n)),1)])],2)],2))),128))],2)],10,jr)):U(`v-if`,!0)}})),Pr=!0;if(0)var Fr;else{window.Worker||(Pr=!1);var Ir=(e,t)=>new Promise((n,r)=>{let i=new Worker(new URL(`/ffxiv-best-craft/assets/SolverWorker-BlLthmEA.js`,``+import.meta.url),{type:`module`});i.onmessage=e=>{i.terminate(),e.data.error==null?n(e.data):r(e.data.error)},i.onerror=e=>{i.terminate(),r(e)},i.postMessage({name:e,args:JSON.stringify(t)})})}async function Lr(e,t,n){let{invoke:r}=await Fr;return r(`create_solver`,{status:e,useManipulation:t,useObserve:n})}async function Rr(e){throw`solver-doesn-t-exist`}async function zr(e){throw`solver-doesn-t-exist`}async function Br(e,t,n){return en(`runDfsSolver`),Ir(`dfs_solve`,{status:e,depth:t,specialist:n})}async function Vr(e,t,n){return en(`runNqSolver`),Ir(`nq_solve`,{status:e,depth:t,specialist:n})}async function Hr(e,t,n,r){return en(`runReflectSolver`),Ir(`reflect_solve`,{status:e,useObserve:r})}async function Ur(e,t,n,r,i,a,o,s,c){return en(`runRaphaelSolver`),Ir(`raphael_solve`,{status:e,targetQuality:t,useManipulation:n,useHeartAndSoul:r,useQuickInnovation:i,useTrainedEye:a,backloadProgress:o,adversarial:s,stellarSteadyHandCharges:c})}var Wr={style:{display:`flex`,"flex-direction":`column`}},Gr=w({__name:`InitialQualitySetting`,props:{item:{},recipe:{},recipeId:{},materialQualityFactor:{},modelValue:{}},emits:[`update:modelValue`],setup(r,{emit:i}){let a=wt(),{$t:o}=At(),c=r,l=i,u=F({get(){return c.modelValue},set(e){l(`update:modelValue`,e??0)}});async function f(e,t){return Promise.all(t.map(async t=>({item:await e.itemInfo(t.ingredient_id),amount:t.amount,hqAmount:0})))}let p=t(`ingredient`),m=F(()=>c.recipeId!==void 0&&p.value!=`manully`),h=t([]),g=t(),_=t(0);return z(()=>{c.recipeId===void 0&&(p.value=`manully`)}),A([a.getDataSource,()=>c.recipeId,_],async([e,t])=>{g.value=void 0;try{let n=await e;t===void 0?h.value=[]:h.value=oe(await f(n,await n.recipesIngredients(t)))}catch(e){h.value=[],p.value=`manully`,g.value=Ue(e,o)}},{immediate:!0}),z(()=>{if(h.value==null||!m.value)return;let[e,t]=h.value.filter(e=>e.item.can_be_hq).map(e=>[e.amount*e.item.level,e.hqAmount*e.item.level]).concat([[0,0]]).reduce(([e,t],[n,r])=>[e+n,t+r]),n=e==0?0:t/e,r=c.materialQualityFactor/100;u.value=Math.floor(c.recipe.quality*r*n)}),(t,i)=>(s(),W(`div`,Wr,[g.value?(s(),O(Je,{key:0,message:g.value,onRetry:i[0]||=e=>_.value++},null,8,[`message`])):U(``,!0),n(e(Oe),{"label-width":`auto`,onSubmit:i[3]||=Bt(()=>{},[`prevent`])},{default:j(()=>[n(e(G),{label:` `},{default:j(()=>[n(e(it),{modelValue:p.value,"onUpdate:modelValue":i[1]||=e=>p.value=e},{default:j(()=>[n(e(at),{value:`manully`},{default:j(()=>[S(B(e(o)(`manully-input`)),1)]),_:1}),n(e(at),{disabled:h.value.length==0,value:`ingredient`},{default:j(()=>[S(B(e(o)(`select-hq-ingredients`)),1)]),_:1},8,[`disabled`])]),_:1},8,[`modelValue`])]),_:1}),n(e(G),{label:e(o)(`initial-quality`)},{default:j(()=>[n(e(Se),{modelValue:u.value,"onUpdate:modelValue":i[2]||=e=>u.value=e,readonly:m.value,controls:!m.value,min:0,max:r.recipe.quality,"value-on-clear":`min`,"step-strictly":!0},null,8,[`modelValue`,`readonly`,`controls`,`max`])]),_:1},8,[`label`]),p.value==`ingredient`?(s(!0),W(V,{key:0},d(h.value,t=>(s(),O(e(G),{label:t.item.name},{default:j(()=>[t.item.can_be_hq?(s(),O(e(ze),{key:0,class:`ml-4`},{default:j(()=>[n(e(K),{icon:e(qt),size:`small`,disabled:t.hqAmount<=0,onClick:e=>--t.hqAmount},{default:j(()=>[S(B(e(o)(`nq`))+` `+B(t.amount-t.hqAmount),1)]),_:2},1032,[`icon`,`disabled`,`onClick`]),n(e(K),{size:`small`,disabled:t.hqAmount>=t.amount,onClick:e=>t.hqAmount+=1},{default:j(()=>[S(B(e(o)(`hq`))+` `+B(t.hqAmount)+` `,1),n(e(vt),{class:`el-icon--right`},{default:j(()=>[n(e(qt))]),_:1})]),_:2},1032,[`disabled`,`onClick`])]),_:2},1024)):(s(),O(e(K),{key:1,icon:e(qt),size:`small`,disabled:``},{default:j(()=>[S(B(e(o)(`nq`))+` `+B(t.amount),1)]),_:2},1032,[`icon`]))]),_:2},1032,[`label`]))),256)):U(``,!0)]),_:1})]))}});function Kr(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`zh-CN`]=new Z(`nq = 普通
hq = 优质

please-input-init-quality = 请输入初期品质
config-init-quality = 设置初期品质
please-input-integers = 请输入整数

select-hq-ingredients = 选择HQ半成品计算
manully-input = 手动输入`)}function qr(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`zh-TW`]=new Z(`nq = 普通
hq = 優質

please-input-init-quality = 請輸入初期品質
config-init-quality = 設定初期品質
please-input-integers = 請輸入整數

select-hq-ingredients = 選擇HQ半成品計算
manully-input = 手動輸入`)}function Jr(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`en-US`]=new Z(`nq = NQ
hq = HQ

select-hq-ingredients = Calculate from HQ ingredients
manully-input = Manully input`)}function Yr(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`ja-JP`]=new Z(`nq = NQ
hq = HQ

please-input-init-quality = Please input initial quality
config-init-quality = Set initial quality
please-input-integers = Please input a integer

select-hq-ingredients = HQ成分による計算
manully-input = 手動入力`)}typeof Kr==`function`&&Kr(Gr),typeof qr==`function`&&qr(Gr),typeof Jr==`function`&&Jr(Gr),typeof Yr==`function`&&Yr(Gr);var Xr=Gr,Zr=[`zh`,`tc`,`ko`,`ja`,`en`,`de`,`fr`],Q=(e=>(e[e.GreatStrides=1]=`GreatStrides`,e[e.Manipulation=2]=`Manipulation`,e[e.WasteNot=3]=`WasteNot`,e[e.WasteNot2=4]=`WasteNot2`,e[e.Innovation=5]=`Innovation`,e[e.FinalAppraisal=6]=`FinalAppraisal`,e[e.Veneration=7]=`Veneration`,e[e.BasicSynthesis=8]=`BasicSynthesis`,e[e.BasicTouch=9]=`BasicTouch`,e[e.MastersMend=10]=`MastersMend`,e[e.StandardTouch=11]=`StandardTouch`,e[e.Observe=12]=`Observe`,e[e.PreciseTouch=13]=`PreciseTouch`,e[e.CarefulSynthesis=14]=`CarefulSynthesis`,e[e.PrudentTouch=15]=`PrudentTouch`,e[e.TrainedEye=16]=`TrainedEye`,e[e.PreparatoryTouch=17]=`PreparatoryTouch`,e[e.IntensiveSynthesis=18]=`IntensiveSynthesis`,e[e.DelicateSynthesis=19]=`DelicateSynthesis`,e[e.ByregotsBlessing=20]=`ByregotsBlessing`,e[e.HastyTouch=21]=`HastyTouch`,e[e.RapidSynthesis=22]=`RapidSynthesis`,e[e.TricksOfTheTrade=23]=`TricksOfTheTrade`,e[e.MuscleMemory=24]=`MuscleMemory`,e[e.Reflect=25]=`Reflect`,e[e.CarefulObservation=26]=`CarefulObservation`,e[e.Groundwork=27]=`Groundwork`,e[e.AdvancedTouch=28]=`AdvancedTouch`,e[e.HeartAndSoul=29]=`HeartAndSoul`,e[e.PrudentSynthesis=30]=`PrudentSynthesis`,e[e.TrainedFinesse=31]=`TrainedFinesse`,e[e.RefinedTouch=32]=`RefinedTouch`,e[e.DaringTouch=33]=`DaringTouch`,e[e.QuickInnovation=34]=`QuickInnovation`,e[e.ImmaculateMend=35]=`ImmaculateMend`,e[e.TrainedPerfection=36]=`TrainedPerfection`,e[e.DutyAction2=37]=`DutyAction2`,e))(Q||{}),Qr={1:{name_zh:`阔步`,name_tc:`闊步`,name_ko:`장족의 발전`,name_ja:`グレートストライド`,name_en:`Great Strides`,name_de:`Große Schritte`,name_fr:`Grands progrès`,sheet:`Action`,ids:[260,261,262,263,264,265,266,267],signatures:[`greatStrides`,`great_strides`],wait_time:2,icon:1955},2:{name_zh:`掌握`,name_tc:`掌握`,name_ko:`교묘한 손놀림`,name_ja:`マニピュレーション`,name_en:`Manipulation`,name_de:`Manipulation`,name_fr:`Manipulation`,sheet:`Action`,ids:[4574,4575,4576,4577,4578,4579,4580,4581],signatures:[`manipulation`],wait_time:2,icon:1985},3:{name_zh:`俭约`,name_tc:`儉約`,name_ko:`근검절약`,name_ja:`倹約`,name_en:`Waste Not`,name_de:`Nachhaltigkeit`,name_fr:`Parcimonie`,sheet:`Action`,ids:[4631,4632,4633,4634,4635,4636,4637,4638],signatures:[`wasteNot`,`waste_not`],wait_time:2,icon:1992},4:{name_zh:`长期俭约`,name_tc:`長期儉約`,name_ko:`장기 절약`,name_ja:`長期倹約`,name_en:`Waste Not II`,name_de:`Nachhaltigkeit II`,name_fr:`Parcimonie pérenne`,sheet:`Action`,ids:[4639,4640,4641,4642,4643,4644,19002,19003],signatures:[`wasteNot2`,`waste_not_ii`],wait_time:2,icon:1993},5:{name_zh:`改革`,name_tc:`改革`,name_ko:`혁신`,name_ja:`イノベーション`,name_en:`Innovation`,name_de:`Innovation`,name_fr:`Innovation`,sheet:`Action`,ids:[19004,19005,19006,19007,19008,19009,19010,19011],signatures:[`innovation`],wait_time:2,icon:1987},6:{name_zh:`最终确认`,name_tc:`最終確認`,name_ko:`최종 확인`,name_ja:`最終確認`,name_en:`Final Appraisal`,name_de:`Letzte Kontrolle`,name_fr:`Dernières vérifications`,sheet:`Action`,ids:[19012,19013,19014,19015,19016,19017,19018,19019],signatures:[`finalAppraisal`,`final_appraisal`],wait_time:2,icon:1983},7:{name_zh:`崇敬`,name_tc:`崇敬`,name_ko:`공경`,name_ja:`ヴェネレーション`,name_en:`Veneration`,name_de:`Ehrfurcht`,name_fr:`Vénération`,sheet:`Action`,ids:[19297,19298,19299,19300,19301,19302,19303,19304],signatures:[`veneration`],wait_time:2,icon:1995},8:{name_zh:`制作`,name_tc:`製作`,name_ko:`작업`,name_ja:`作業`,name_en:`Basic Synthesis`,name_de:`Bearbeiten`,name_fr:`Travail de base`,sheet:`CraftAction`,ids:[100001,100015,100030,100075,100045,100060,100090,100105],signatures:[`basicSynth`,`basicSynth2`,`basic_synthesis`],wait_time:3,icon:1501},9:{name_zh:`加工`,name_tc:`加工`,name_ko:`가공`,name_ja:`加工`,name_en:`Basic Touch`,name_de:`Veredelung`,name_fr:`Ouvrage de base`,sheet:`CraftAction`,ids:[100002,100016,100031,100076,100046,100061,100091,100106],signatures:[`basicTouch`,`basic_touch`],wait_time:3,icon:1502},10:{name_zh:`精修`,name_tc:`精修`,name_ko:`능숙한 땜질`,name_ja:`マスターズメンド`,name_en:`Master's Mend`,name_de:`Wiederherstellung`,name_fr:`Réparation de maître`,sheet:`CraftAction`,ids:[100003,100017,100032,100077,100047,100062,100092,100107],signatures:[`mastersMend`,`masters_mend`],wait_time:3,icon:1952},11:{name_zh:`中级加工`,name_tc:`中級加工`,name_ko:`중급 가공`,name_ja:`中級加工`,name_en:`Standard Touch`,name_de:`Solide Veredelung`,name_fr:`Ouvrage standard`,sheet:`CraftAction`,ids:[100004,100018,100034,100078,100048,100064,100093,100109],signatures:[`standardTouch`,`standard_touch`],wait_time:3,icon:1516},12:{name_zh:`观察`,name_tc:`觀察`,name_ko:`경과 관찰`,name_ja:`経過観察`,name_en:`Observe`,name_de:`Beobachten`,name_fr:`Observation`,sheet:`CraftAction`,ids:[100010,100023,100040,100082,100053,100070,100099,100113],signatures:[`observe`],wait_time:3,icon:1954},13:{name_zh:`集中加工`,name_tc:`集中加工`,name_ko:`집중 가공`,name_ja:`集中加工`,name_en:`Precise Touch`,name_de:`Präzise Veredelung`,name_fr:`Ouvrage précis`,sheet:`CraftAction`,ids:[100128,100129,100130,100131,100132,100133,100134,100135],signatures:[`preciseTouch`,`precise_touch`],wait_time:3,icon:1524},14:{name_zh:`模范制作`,name_tc:`模範製作`,name_ko:`모범 작업`,name_ja:`模範作業`,name_en:`Careful Synthesis`,name_de:`Sorgfältige Bearbeitung`,name_fr:`Travail prudent`,sheet:`CraftAction`,ids:[100203,100204,100205,100206,100207,100208,100209,100210],signatures:[`carefulSynthesis`,`carefulSynthesis2`,`careful_synthesis`],wait_time:3,icon:1986},15:{name_zh:`俭约加工`,name_tc:`儉約加工`,name_ko:`절약 가공`,name_ja:`倹約加工`,name_en:`Prudent Touch`,name_de:`Nachhaltige Veredelung`,name_fr:`Ouvrage parcimonieux`,sheet:`CraftAction`,ids:[100227,100228,100229,100230,100231,100232,100233,100234],signatures:[`prudentTouch`,`prudent_touch`],wait_time:3,icon:1535},16:{name_zh:`工匠的神速技巧`,name_tc:`工匠的神速技巧`,name_ko:`장인의 날랜손`,name_ja:`匠の早業`,name_en:`Trained Eye`,name_de:`Flinke Hand`,name_fr:`Main preste`,sheet:`CraftAction`,ids:[100283,100284,100285,100286,100287,100288,100289,100290],signatures:[`trainedEye`,`trained_eye`],wait_time:3,icon:1981},17:{name_zh:`坯料加工`,name_tc:`坯料加工`,name_ko:`밑가공`,name_ja:`下地加工`,name_en:`Preparatory Touch`,name_de:`Basisveredelung`,name_fr:`Ouvrage préparatoire`,sheet:`CraftAction`,ids:[100299,100300,100301,100302,100303,100304,100305,100306],signatures:[`preparatoryTouch`,`preparatory_touch`],wait_time:3,icon:1507},18:{name_zh:`集中制作`,name_tc:`集中製作`,name_ko:`집중 작업`,name_ja:`集中作業`,name_en:`Intensive Synthesis`,name_de:`Fokussierte Bearbeitung`,name_fr:`Travail vigilant`,sheet:`CraftAction`,ids:[100315,100316,100317,100318,100319,100320,100321,100322],signatures:[`intensiveSynthesis`,`intensive_synthesis`],wait_time:3,icon:1514},19:{name_zh:`精密制作`,name_tc:`精密製作`,name_ko:`정밀 작업`,name_ja:`精密作業`,name_en:`Delicate Synthesis`,name_de:`Akribische Bearbeitung`,name_fr:`Travail minutieux`,sheet:`CraftAction`,ids:[100323,100324,100325,100326,100327,100328,100329,100330],signatures:[`delicateSynthesis`,`delicateSynthesis2`,`delicate_synthesis`],wait_time:3,icon:1503},20:{name_zh:`比尔格的祝福`,name_tc:`比爾格的祝福`,name_ko:`비레고의 축복`,name_ja:`ビエルゴの祝福`,name_en:`Byregot's Blessing`,name_de:`Byregots Benediktion`,name_fr:`Bénédiction de Byregot`,sheet:`CraftAction`,ids:[100339,100340,100341,100342,100343,100344,100345,100346],signatures:[`byregotsBlessing`,`byregot_s_blessing`],wait_time:3,icon:1975},21:{name_zh:`仓促`,name_tc:`倉促`,name_ko:`성급한 손길`,name_ja:`ヘイスティタッチ`,name_en:`Hasty Touch`,name_de:`Hastige Veredelung`,name_fr:`Ouvrage hâtif`,sheet:`CraftAction`,ids:[100355,100356,100357,100358,100359,100360,100361,100362],signatures:[`hastyTouch`,`hasty_touch`],wait_time:3,icon:1989},22:{name_zh:`高速制作`,name_tc:`高速製作`,name_ko:`강행 작업`,name_ja:`突貫作業`,name_en:`Rapid Synthesis`,name_de:`Schnelle Bearbeitung`,name_fr:`Travail rapide`,sheet:`CraftAction`,ids:[100363,100364,100365,100366,100367,100368,100369,100370],signatures:[`rapidSynthesis`,`rapidSynthesis2`,`rapid_synthesis`],wait_time:3,icon:1988},23:{name_zh:`秘诀`,name_tc:`秘訣`,name_ko:`비결`,name_ja:`秘訣`,name_en:`Tricks of the Trade`,name_de:`Kunstgriff`,name_fr:`Ficelles du métier`,sheet:`CraftAction`,ids:[100371,100372,100373,100374,100375,100376,100377,100378],signatures:[`tricksOfTheTrade`,`tricks_of_the_trade`],wait_time:3,icon:1990},24:{name_zh:`坚信`,name_tc:`堅信`,name_ko:`확신`,name_ja:`確信`,name_en:`Muscle Memory`,name_de:`Motorisches Gedächtnis`,name_fr:`Mémoire musculaire`,sheet:`CraftAction`,ids:[100379,100380,100381,100382,100383,100384,100385,100386],signatures:[`muscleMemory`,`muscle_memory`],wait_time:3,icon:1994},25:{name_zh:`闲静`,name_tc:`閒靜`,name_ko:`진가`,name_ja:`真価`,name_en:`Reflect`,name_de:`Einkehr`,name_fr:`Véritable valeur`,sheet:`CraftAction`,ids:[100387,100388,100389,100390,100391,100392,100393,100394],signatures:[`reflect`],wait_time:3,icon:1982},26:{name_zh:`设计变动`,name_tc:`設計變動`,name_ko:`설계 변경`,name_ja:`設計変更`,name_en:`Careful Observation`,name_de:`Planänderung`,name_fr:`Changement de patron`,sheet:`CraftAction`,ids:[100395,100396,100397,100398,100399,100400,100401,100402],signatures:[],wait_time:3,icon:1984},27:{name_zh:`坯料制作`,name_tc:`坯料製作`,name_ko:`밑작업`,name_ja:`下地作業`,name_en:`Groundwork`,name_de:`Vorarbeit`,name_fr:`Travail préparatoire`,sheet:`CraftAction`,ids:[100403,100404,100405,100406,100407,100408,100409,100410],signatures:[`groundwork`,`groundwork2`],wait_time:3,icon:1518},28:{name_zh:`上级加工`,name_tc:`上級加工`,name_ko:`상급 가공`,name_ja:`上級加工`,name_en:`Advanced Touch`,name_de:`Höhere Veredelung`,name_fr:`Ouvrage avancé`,sheet:`CraftAction`,ids:[100411,100412,100413,100414,100415,100416,100417,100418],signatures:[`advancedTouch`,`advanced_touch`],wait_time:3,icon:1519},29:{name_zh:`专心致志`,name_tc:`專心致志`,name_ko:`일심불란`,name_ja:`一心不乱`,name_en:`Heart and Soul`,name_de:`Mit Leib und Seele`,name_fr:`Attention totale`,sheet:`CraftAction`,ids:[100419,100420,100421,100422,100423,100424,100425,100426],signatures:[`heartAndSoul`,`heart_and_soul`],wait_time:3,icon:1996},30:{name_zh:`俭约制作`,name_tc:`儉約製作`,name_ko:`절약 작업`,name_ja:`倹約作業`,name_en:`Prudent Synthesis`,name_de:`Rationelle Bearbeitung`,name_fr:`Travail économe`,sheet:`CraftAction`,ids:[100427,100428,100429,100430,100431,100432,100433,100434],signatures:[`prudentSynthesis`,`prudent_synthesis`],wait_time:3,icon:1520},31:{name_zh:`工匠的神技`,name_tc:`工匠的神技`,name_ko:`장인의 황금손`,name_ja:`匠の神業`,name_en:`Trained Finesse`,name_de:`Götter Werk`,name_fr:`Main divine`,sheet:`CraftAction`,ids:[100435,100436,100437,100438,100439,100440,100441,100442],signatures:[`trainedFinesse`,`trained_finesse`],wait_time:3,icon:1997},32:{name_zh:`精炼加工`,name_tc:`精煉加工`,name_ko:`세련 가공`,name_ja:`洗練加工`,name_en:`Refined Touch`,name_de:`Raffinierte Veredelung`,name_fr:`Ouvrage raffiné`,sheet:`CraftAction`,ids:[100443,100444,100445,100446,100447,100448,100449,100450],signatures:[`refinedTouch`,`refined_touch`],wait_time:3,icon:1522},33:{name_zh:`冒进`,name_tc:`冒進`,name_ko:`대담한 손길`,name_ja:`デアリングタッチ`,name_en:`Daring Touch`,name_de:`Kühne Veredelung`,name_fr:`Ouvrage audacieux`,sheet:`CraftAction`,ids:[100451,100452,100453,100454,100455,100456,100457,100458],signatures:[`daringTouch`,`daring_touch`],wait_time:3,icon:1998},34:{name_zh:`快速改革`,name_tc:`快速改革`,name_ko:`신속한 혁신`,name_ja:`クイックイノベーション`,name_en:`Quick Innovation`,name_de:`Spontane Innovation`,name_fr:`Innovation instantanée`,sheet:`CraftAction`,ids:[100459,100460,100461,100462,100463,100464,100465,100466],signatures:[`quickInnovation`,`quick_innovation`],wait_time:3,icon:1999},35:{name_zh:`巧夺天工`,name_tc:`巧奪天工`,name_ko:`완벽한 땜질`,name_ja:`パーフェクトメンド`,name_en:`Immaculate Mend`,name_de:`Winkelzug`,name_fr:`Réparation totale`,sheet:`CraftAction`,ids:[100467,100468,100469,100470,100471,100472,100473,100474],signatures:[`immaculateMend`,`immaculate_mend`],wait_time:3,icon:1950},36:{name_zh:`工匠的绝技`,name_tc:`工匠的絕技`,name_ko:`장인의 초절 기술`,name_ja:`匠の絶技`,name_en:`Trained Perfection`,name_de:`Meisters Beitrag`,name_fr:`Main suprême`,sheet:`CraftAction`,ids:[100475,100476,100477,100478,100479,100480,100481,100482],signatures:[`trainedPerfection`,`trained_perfection`],wait_time:3,icon:1926},37:{name_zh:`任务指令2`,name_tc:`任務指令2`,name_ko:`임무용 기술 2`,name_ja:`コンテンツアクション2`,name_en:`Duty Action II`,name_de:`Spezialkommando 2`,name_fr:`Action de mission 2`,sheet:`Action`,ids:[41269,46843],signatures:[`material_miracle`,`stellar_steady_hand`],wait_time:2,icon:124}},$r=Object.entries(Qr).flatMap(([e,t])=>t.ids.map(t=>[t,Number(e)])).reduce((e,[t,n])=>(e[t]=n,e),{}),ei=Object.entries(Qr).reduce((e,[t,n])=>{let r=Number(t);return Zr.forEach(t=>{e[n[`name_${t}`]]=r}),e},{}),ti=Object.entries(Qr).flatMap(([e,t])=>t.signatures.map(t=>[t,Number(e)])).reduce((e,[t,n])=>(e[t]=n,e),{}),ni={version:1},ri=e=>{let t=ni.version;if(e.length===0)return`${t}v1b`;let n=0;for(let t of e){if(!Number.isInteger(t)||t<0)throw Error(`Invalid skill ID: ${t}`);t>n&&(n=t)}let r=Math.max(1,Math.ceil(Math.log2(n+1))),i=0,a=0,o=[];for(let t of e)for(i=i<<r|t,a+=r;a>=8;)a-=8,o.push(i>>a&255);return a>0&&o.push(i<<8-a&255),`${t}v${r}b${ai(new Uint8Array(o))}`},ii=e=>{let t=/^(\d+)v(\d+)b(.*)$/.exec(e);if(!t)throw Error(`Invalid code format`);let n=Number(t[1]),r=Number(t[2]),i=t[3];if(!Number.isInteger(n)||n<0)throw Error(`Invalid version`);if(n>ni.version)throw Error(`Unsupported version`);if(!Number.isInteger(r)||r<=0)throw Error(`Invalid bitWidth`);if(!i)return{version:n,bitWidth:r,skillIds:[]};let a=oi(i),o=0,s=0,c=[],l=(1<<r)-1;for(let e of a)for(o=o<<8|e,s+=8;s>=r;){s-=r;let e=o>>s&l;e>0&&c.push(e)}return{version:n,bitWidth:r,skillIds:c}};function ai(e){let t=``;for(let n of e)t+=String.fromCharCode(n);return btoa(t).replace(/\+/g,`-`).replace(/\//g,`_`).replace(/=+$/,``)}function oi(e){let t=e.replace(/-/g,`+`).replace(/_/g,`/`).padEnd(Math.ceil(e.length/4)*4,`=`),n=atob(t),r=new Uint8Array(n.length);for(let e=0;e<n.length;e++)r[e]=n.charCodeAt(e);return r}var si=e=>{let t=[];if(Array.isArray(e))e.forEach(e=>{let n;if(typeof e==`number`){if(n=$r[e],n===void 0)throw Error(`Invalid action id: ${e}`)}else if(n=ei[e],n===void 0&&(n=ti[e]),n===void 0)throw Error(`Invalid action name or signature: ${e}`);t.push(n)});else switch(e.type){case`id`:e.actions.forEach(e=>{let n=$r[e];if(!n)throw Error(`Invalid action id: ${e}`);t.push(n)});break;case`name`:e.actions.forEach(e=>{let n=ei[e];if(!n)throw Error(`Invalid action name: ${e}`);t.push(n)});break;case`signature`:e.actions.forEach(e=>{let n=ti[e];if(!n)throw Error(`Invalid action signature: ${e}`);t.push(n)});break}return ri(t)},ci=e=>{let t=ii(e),n=[];return t.skillIds.forEach(e=>{let t=Qr[e];if(!t)throw Error(`Unknown action : ${e}`);n.push({cacId:e,...t})}),n},li={style:{"margin-left":`10px`}},ui={key:0},di={class:`box-body`},fi={class:`box-body`},pi={class:`box-body`},mi=w({__name:`MacroExporter`,props:{actions:{},item:{},hideOptions:{type:Boolean,default:!1}},setup(t){let r=t,{$t:i}=At(),a=oe(Wt().options.exportOptions),o=F(()=>[{label:i(`has-notify-auto`),value:`auto`},{label:i(`has-notify-true`),value:!0},{label:i(`has-notify-false`),value:!1}]),c=F(()=>[{label:i(`avg-section`),value:`avg`},{label:i(`greedy-section`),value:`greedy`},{label:i(`disable-section`),value:`disable`}]),l=F(()=>{let e=[{label:i(`no-sound`),value:``},{label:i(`random-sound`),value:` <se>`}];for(let t=1;t<=16;t++)e.push({label:` <se.${t}>`,value:` <se.${t}>`});return e}),u=F(()=>{if(a.addNotification!=`auto`)return a.addNotification;{let e=15;a.hasLock&&e--;let t=Math.ceil(r.actions.length/e);return e--,t==Math.ceil(r.actions.length/e)}}),f=F(()=>{let e=[],t=15;u.value&&t--,a.hasLock&&t--,a.sectionMethod==`disable`&&(t=1e9);let n=Math.ceil(r.actions.length/t),o=Math.ceil(r.actions.length/n);for(let s=0;s<n;s++){let n;switch(a.sectionMethod){case`avg`:n=r.actions.slice(s*o,Math.min(r.actions.length,(s+1)*o));break;case`greedy`:let e=s*t;n=r.actions.slice(e,Math.min(r.actions.length,e+t));break;case`disable`:n=r.actions.slice()}let c=[];a.hasLock&&c.push(`/mlock`);for(let e of n)if(e==X.DaringTouch&&(e=X.HastyTouch),e==X.StellarSteadyHand)c.push(`/ac ${i(`duty-action2`)} <wait.${It(e)+a.waitTimeInc}>`);else{let t=i(e.replaceAll(`_`,`-`));t.includes(` `)&&(t=`"${t}"`),c.push(`/ac ${t} <wait.${It(e)+a.waitTimeInc}>`)}u.value&&c.push(`/e ${i(`marco-finished`,{id:s+1})}${a.notifySound}`),e.push(c)}return e}),p=F(()=>si({type:`signature`,actions:r.actions})),m=F(()=>`https://cac.nbb.fan/?s=`+encodeURIComponent(p.value)),h=F(()=>`https://hqhelper.nbb.fan/#/macromanage?import=${encodeURIComponent(p.value)}&item=${r.item.id}&name=${encodeURIComponent(r.item.name)}`);async function g(e,t){_(t.join(`\r
`).replaceAll(/\u2068|\u2069/g,``),i(`copied-marco`,{id:e+1}))}async function _(e,t){try{{let{useClipboard:t}=await dt(async()=>{let{useClipboard:e}=await import(`./dist-10F6AO0X.js`);return{useClipboard:e}},__vite__mapDeps([0,1]));await t().copy(e)}J({type:`success`,duration:2e3,showClose:!0,message:t})}catch(e){J({type:`error`,duration:2e3,showClose:!0,message:i(`copy-failed`,{err:String(e)})})}}return(r,y)=>(s(),W(`div`,li,[t.hideOptions?U(``,!0):(s(),W(`div`,ui,[n(e(rt),{modelValue:a.hasLock,"onUpdate:modelValue":y[0]||=e=>a.hasLock=e,label:e(i)(`has-lock`)},null,8,[`modelValue`,`label`]),e(!0)?(s(),O(e(rt),{key:0,modelValue:a.oneclickCopy,"onUpdate:modelValue":y[1]||=e=>a.oneclickCopy=e,label:e(i)(`oneclick-copy`)},null,8,[`modelValue`,`label`])):U(``,!0)])),t.hideOptions?U(``,!0):(s(),O(e(Oe),{key:1,"label-width":`auto`},{default:j(()=>[n(e(G),{label:e(i)(`has-notify`)},{default:j(()=>[n(e(Nr),{modelValue:a.addNotification,"onUpdate:modelValue":y[2]||=e=>a.addNotification=e,options:o.value},null,8,[`modelValue`,`options`])]),_:1},8,[`label`]),n(e(G),{label:e(i)(`section-method`)},{default:j(()=>[n(e(Nr),{modelValue:a.sectionMethod,"onUpdate:modelValue":y[3]||=e=>a.sectionMethod=e,options:c.value},null,8,[`modelValue`,`options`])]),_:1},8,[`label`]),u.value?(s(),O(e(G),{key:0,label:e(i)(`notify-sound`)},{default:j(()=>[n(e(Ge),{modelValue:a.notifySound,"onUpdate:modelValue":y[4]||=e=>a.notifySound=e,options:l.value,style:{width:`200px`}},null,8,[`modelValue`,`options`])]),_:1},8,[`label`])):U(``,!0),n(e(G),{label:e(i)(`wait-time-inc`)},{default:j(()=>[n(e(Se),{modelValue:a.waitTimeInc,"onUpdate:modelValue":y[5]||=e=>a.waitTimeInc=e,"controls-position":`right`,min:0,"step-strictly":!0},null,8,[`modelValue`])]),_:1},8,[`label`])]),_:1})),n(e(q),{wrap:``,alignment:`flex-start`},{default:j(()=>[(s(!0),W(V,null,d(f.value,(t,n)=>(s(),O(e(Ve),{class:v(a.oneclickCopy?`box-card-oneclick`:`box-card`),shadow:`hover`,onClick:e=>a.oneclickCopy?g(n,t):void 0},{default:j(()=>[P(`code`,di,B(t.join(`
`)),1)]),_:2},1032,[`class`,`onClick`]))),256))]),_:1}),t.hideOptions?U(``,!0):(s(),W(V,{key:2},[n(e(Be),{id:`divider`,"content-position":`left`},{default:j(()=>[S(B(e(i)(`export-cac`)),1)]),_:1}),t.actions.length>0?(s(),O(e(Ve),{key:0,class:v(a.oneclickCopy?`box-card-oneclick`:`box-card`),shadow:`hover`,style:{width:`300px`},onClick:y[6]||=t=>a.oneclickCopy?_(p.value,e(i)(`copied-cac`)):void 0},{default:j(()=>[P(`code`,fi,B(p.value),1)]),_:1},8,[`class`])):U(``,!0),t.actions.length>0?(s(),O(e(q),{key:1,style:{"margin-top":`12px`}},{default:j(()=>[n(e(ze),null,{default:j(()=>[n(e(K),{onClick:y[7]||=t=>e($t)(m.value)},{default:j(()=>[S(B(e(i)(`open-in-cac-tool`)),1)]),_:1}),n(e(K),{icon:e(Ht),onClick:y[8]||=t=>_(m.value,e(i)(`copied-link`))},null,8,[`icon`])]),_:1}),n(e(ze),null,{default:j(()=>[n(e(K),{onClick:y[9]||=t=>e($t)(h.value)},{default:j(()=>[S(B(e(i)(`open-in-hqhelper`)),1)]),_:1}),n(e(K),{icon:e(Ht),onClick:y[10]||=t=>_(h.value,e(i)(`copied-link`))},null,8,[`icon`])]),_:1})]),_:1})):U(``,!0),n(e(Be),{id:`divider`,"content-position":`left`},{default:j(()=>[S(B(e(i)(`export-json`)),1)]),_:1}),t.actions.length>0?(s(),O(e(Ve),{key:2,class:v(a.oneclickCopy?`box-card-oneclick`:`box-card`),shadow:`hover`,style:{width:`300px`},onClick:y[11]||=n=>a.oneclickCopy?_(JSON.stringify(t.actions),e(i)(`copied-json`)):void 0},{default:j(()=>[P(`code`,pi,B(JSON.stringify(t.actions,void 0,4)),1)]),_:1},8,[`class`])):U(``,!0)],64))]))}});function hi(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`zh-CN`]=new Z(`has-notify = 添加完成提示
has-notify-auto = 自动确定
has-notify-true = 总是提示
has-notify-false = 不提示

has-lock = 锁定宏指令
oneclick-copy = 一键复制

notify-sound = 提示音
random-sound = 随机提示音
no-sound = 无提示音

section-method = 拆分过长的宏
avg-section = 平均
greedy-section = 贪婪
disable-section = 禁用

wait-time-inc = 增加等待时间

export-json = 导出 JSON
copied-json = 已复制 JSON 表达式 到系统剪切板
export-cac = 导出 CAC 工序码
copied-cac = 已复制 CAC 工序码到系统剪切板
copied-marco = 已复制 宏#{ $id } 到系统剪切板
copied-link = 已复制超链接到系统剪切板
marco-finished = 宏#{ $id } 已完成！
copy-failed = 复制失败：{ $err }

open-in-cac-tool = 在 CAC Tool 网站打开
open-in-hqhelper = 在 HQ Helper 网站打开

duty-action2 = 任务指令2`)}function gi(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`zh-TW`]=new Z(`has-notify = 新增完成提示
has-notify-auto = 自動確定
has-notify-true = 總是提示
has-notify-false = 不提示

has-lock = 鎖定巨集指令
oneclick-copy = 一鍵複製

notify-sound = 提示音
random-sound = 隨機提示音
no-sound = 無提示音

section-method = 拆分過長的巨集
avg-section = 平均
greedy-section = 貪婪
disable-section = 停用

wait-time-inc = 增加等待時間

export-json = 匯出 JSON
copied-json = 已複製 JSON 表示式 到系統剪下板
export-cac = 匯出 CAC 工序碼
copied-cac = 已複製 CAC 工序碼到系統剪下板
copied-marco = 已複製 巨集#{ $id } 到系統剪下板
copied-link = 已複製超連結至系統剪貼簿
marco-finished = 巨集#{ $id } 已完成！
copy-failed = 複製失敗：{ $err }

open-in-cac-tool = 在 CAC Tool 網站打開
open-in-hqhelper = 在 HQ Helper 網站打開

duty-action2 = 任務指令2`)}function _i(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`en-US`]=new Z(`has-notify = Notification
has-notify-auto = Auto
has-notify-true = Always
has-notify-false = Never

has-lock = Macro Lock
oneclick-copy = Oneclick Copy

notify-sound = Beep type
random-sound = Random Sound
no-sound = No Sound

section-method = Section method
avg-section = Average
greedy-section = Greedy
disable-section = Disable

wait-time-inc = Increase waiting time

export-json = Export as JSON
copied-json = The JSON expression has been copied to system clipboard!
export-cac = Export as CAC
copied-cac = The CAC has been copied to system clipboard!
copied-marco = The M#{ $id } has been copied to system clipboard!
copied-link = The hyperlink has been copied to the system clipboard!
marco-finished = M#{ $id } is finished!
copy-failed = Copy failed: { $err }

open-in-cac-tool = Open in CAC Tool Website
open-in-hqhelper = Open in HQ Helper Website

duty-action2 = Duty Action II`)}function vi(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`ja-JP`]=new Z(`has-notify = 完了通知
has-notify-auto = 自動
has-notify-true = 常に通知
has-notify-false = 通知しない

has-lock = マクロロック
oneclick-copy = ワンクリックコピー

notify-sound = 通知音
random-sound = ランダム通知音
no-sound = 通知音なし

section-method = 長いマクロの分割方法
avg-section = 均等
greedy-section = 貪欲
disable-section = 無効

wait-time-inc = 待機時間を増やす

export-json = JSONとしてエクスポート
copied-json = JSON式をクリップボードにコピーしました
export-cac = CACとしてエクスポート
copied-cac = CACをクリップボードにコピーしました
copied-marco = マクロ#{ $id } をクリップボードにコピーしました
copied-link = ハイパーリンクをクリップボードにコピーしました
marco-finished = マクロ#{ $id } が完了しました！
copy-failed = コピー失敗：{ $err }

open-in-cac-tool = CAC Toolで開く
open-in-hqhelper = HQ Helperで開く

duty-action2 = コンテンツアクション2`)}typeof hi==`function`&&hi(mi),typeof gi==`function`&&gi(mi),typeof _i==`function`&&_i(mi),typeof vi==`function`&&vi(mi);var yi=Kt(mi,[[`__scopeId`,`data-v-b5fa5c77`]]),bi=w({__name:`MacroImporter`,emits:[`onRecognized`],setup(r,{emit:i}){let a=i,o=At(),c=Wt(),l=new Map([[Q.GreatStrides,X.GreatStrides],[Q.Manipulation,X.Manipulation],[Q.WasteNot,X.WasteNot],[Q.WasteNot2,X.WasteNotII],[Q.Innovation,X.Innovation],[Q.FinalAppraisal,X.FinalAppraisal],[Q.Veneration,X.Veneration],[Q.BasicSynthesis,X.BasicSynthesis],[Q.BasicTouch,X.BasicTouch],[Q.MastersMend,X.MastersMend],[Q.StandardTouch,X.StandardTouch],[Q.Observe,X.Observe],[Q.PreciseTouch,X.PreciseTouch],[Q.CarefulSynthesis,X.CarefulSynthesis],[Q.PrudentTouch,X.PrudentTouch],[Q.TrainedEye,X.TrainedEye],[Q.PreparatoryTouch,X.PreparatoryTouch],[Q.IntensiveSynthesis,X.IntensiveSynthesis],[Q.DelicateSynthesis,X.DelicateSynthesis],[Q.ByregotsBlessing,X.ByregotsBlessing],[Q.HastyTouch,X.HastyTouch],[Q.RapidSynthesis,X.RapidSynthesis],[Q.TricksOfTheTrade,X.TricksOfTheTrade],[Q.MuscleMemory,X.MuscleMemory],[Q.Reflect,X.Reflect],[Q.CarefulObservation,X.CarefulObservation],[Q.Groundwork,X.Groundwork],[Q.AdvancedTouch,X.AdvancedTouch],[Q.HeartAndSoul,X.HeartAndSoul],[Q.PrudentSynthesis,X.PrudentSynthesis],[Q.TrainedFinesse,X.TrainedFinesse],[Q.RefinedTouch,X.RefinedTouch],[Q.DaringTouch,X.DaringTouch],[Q.QuickInnovation,X.QuickInnovation],[Q.ImmaculateMend,X.ImmaculateMend],[Q.TrainedPerfection,X.TrainedPerfection],[Q.DutyAction2,X.StellarSteadyHand]]),u=new Map,d=Object.values(X).filter(e=>!e.endsWith(`_fail`));for(let e of o.bundles.value)for(let t of d){let n=o.getMessage(e,t.replaceAll(`_`,`-`));u.set(n.value,t)}let f=t(``),p=oe(c.options.importOptions);function m(){let e=f.value.trim(),t;if(e.charAt(0)==`[`)try{t=h(JSON.parse(e)),en(`importJsonSuccess`)}catch(e){en(`importJsonError`),J({type:`error`,showClose:!0,message:o.$t(`err-parse-json`,{err:String(e)})});return}else if(/\d+v\d+b/.test(e))try{t=ci(e).map(({cacId:e})=>{let t=l.get(e);if(t==null)throw Error(`Unknown action `+e);return t})}catch(e){en(`importCacCodeError`),J({type:`error`,showClose:!0,message:o.$t(`err-decode-cac`,{err:String(e)})});return}else if(p.strictMode)try{t=g(e),en(`importMacroStrictSuccess`)}catch(e){J({type:`error`,showClose:!0,message:o.$t(`err-parse-strict`,{err:String(e)})});return}else{if(t=e.split(/\/[^\s]+|<wait\.\d+>|\n/).map(e=>e.trim()).filter(e=>e.length>0).map(e=>u.get(_(e))).filter(e=>e!=null),t.length==0){en(`importMacroError`),J({type:`warning`,showClose:!0,message:o.$t(`warn-action-not-found`)});return}en(`importMacroSuccess`)}J({type:`success`,showClose:!0,message:o.$t(`recognize-success`,{n:t.length})}),a(`onRecognized`,t),f.value=``}function h(e){if(!Array.isArray(e))throw o.$t(`err-not-an-array`);let t=new Set(Object.values(X).map(e=>e));return e.map(e=>{if(typeof e!=`string`)throw o.$t(`err-not-a-string`,{elem:String(e)});if(t.has(e))return e;throw o.$t(`err-invalid-action`,{action:String(e)})})}function g(e){return e.split(`
`).flatMap(e=>{let t=/^\/(?:ac(?:tion)?|技能)\s+(?<body>.*)$/g.exec(e);return t?t.groups.body:[]}).map((e,t)=>{let n=e.trim(),r=/^(?<action>"[^"]+"|\S+)(?:\s+<wait\.\d+>)?$/g.exec(n);if(r==null||r.groups==null)throw o.$t(`err-parse-line-error`,{n:t+1});let i=_(r.groups.action),a=u.get(i);if(a==null)throw o.$t(`err-invalid-action`,{action:i});return a})}function _(e){return e.charAt(0)==`"`&&e.charAt(e.length-1)==`"`?e.substring(1,e.length-1):e}return(t,r)=>(s(),W(V,null,[n(e(ke),{modelValue:f.value,"onUpdate:modelValue":r[0]||=e=>f.value=e,type:`textarea`,class:`user-input`,autosize:{minRows:4},placeholder:t.$t(`auto-recognize`)},null,8,[`modelValue`,`placeholder`]),n(e(q),null,{default:j(()=>[n(e(K),{type:`primary`,onClick:m,disabled:f.value.length==0},{default:j(()=>[S(B(t.$t(`confirm`)),1)]),_:1},8,[`disabled`]),n(e(rt),{modelValue:p.strictMode,"onUpdate:modelValue":r[1]||=e=>p.strictMode=e,label:t.$t(`strict-mode`)},null,8,[`modelValue`,`label`]),n(e(lt),{modelValue:p.strictMode,"onUpdate:modelValue":r[2]||=e=>p.strictMode=e},null,8,[`modelValue`])]),_:1})],64))}});function xi(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`zh-CN`]=new Z(`auto-recognize = 粘贴自动识别
confirm = 确认
strict-mode = 严格模式

err-parse-json = 尝试解析 JSON 失败：{ $err }
err-not-an-array = 输入的 JSON 不是一个数组
err-not-a-string = 元素 { $elem } 不是一个字符串
err-invalid-action = 未知的技能：{ $action }
err-decode-cac = 解码 CAC 工序码失败：{ $err }

err-parse-strict = 严格模式导入宏失败：{ $err }
err-parse-line-error = 导入第 { $n } 行失败

warn-action-not-found = 没有识别到技能
recognize-success = 识别成功，一共导入了 { $n } 个技能`)}function Si(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`zh-TW`]=new Z(`auto-recognize = 貼上自動識別
confirm = 確認
strict-mode = 嚴格模式

err-parse-json = 嘗試解析 JSON 失敗：{ $err }
err-not-an-array = 輸入的 JSON 不是一個數組
err-not-a-string = 元素 { $elem } 不是一個字串
err-invalid-action = 未知的技能：{ $action }
err-decode-cac = 解析 CAC 工序碼失敗：{ $err }

err-parse-strict = 嚴格模式匯入巨集失敗：{ $err }
err-parse-line-error = 匯入第 { $n } 行失敗

warn-action-not-found = 沒有識別到技能
recognize-success = 識別成功，一共匯入了 { $n } 個技能`)}function Ci(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`en-US`]=new Z(`auto-recognize = Paste macros or JSON here
confirm = Confirm
strict-mode = Strict mode

err-parse-json = Try parsing JSON failed: { $err }
err-not-an-array = Input JSON is not an array
err-not-a-string = Element { $elem } is not a string
err-invalid-action = Invalid action: { $action }
err-decode-cac = Failed to decode CAC code: { $err }

err-parse-strict = Try parsing in strict mode failed: { $err }
err-parse-line-error = Parsing line { $n } failed

warn-action-not-found = No action is found
recognize-success = Recognize successed, { $n ->
    [one] one action is
    *[other] {$n} actions are
} imported`)}function wi(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`ja-JP`]=new Z(`auto-recognize = マクロまたはJSONを貼り付け
confirm = 確認
strict-mode = 厳密モード

err-parse-json = JSONの解析に失敗しました：{ $err }
err-not-an-array = 入力されたJSONは配列ではありません
err-not-a-string = 要素 { $elem } は文字列ではありません
err-invalid-action = 不明なアクション：{ $action }
err-decode-cac = CACコードのデコードに失敗しました：{ $err }

err-parse-strict = 厳密モードでのインポートに失敗しました：{ $err }
err-parse-line-error = { $n } 行目の解析に失敗しました

warn-action-not-found = アクションが認識されませんでした
recognize-success = 認識成功、{ $n } 個のアクションをインポートしました`)}typeof xi==`function`&&xi(bi),typeof Si==`function`&&Si(bi),typeof Ci==`function`&&Ci(bi),typeof wi==`function`&&wi(bi);var Ti=Kt(bi,[[`__scopeId`,`data-v-f35ae710`]]),Ei=function(e){return e.AutoSave=`auto-save`,e.Manual=`manual`,e.Solver=`solver`,e.DPSolver=`dp-solver`,e.RaphaelSolver=`raphael-solver`,e.DFSSolver=`dfs-solver`,e}({}),Di={style:{"margin-top":`10px`}},Oi=w({__name:`DpSolver`,props:{initStatus:{},recipeName:{}},emits:[`solverLoad`,`runSimpleSolver`],setup(r,{emit:i}){let{$t:a}=At(),o=r,c=i,l=t(!1),u=t(!1),d=t(!1),f=t(!1),p=t(!0),m=t([]),h=t(`initial`),g=[`initial`,`current`],_=t(!1);function v(){c(`runSimpleSolver`,Ei.DPSolver,_,e=>Hr(e,u.value,d.value?8:0,p.value),h.value)}let y=async()=>{let e=J({showClose:!0,duration:0,type:`info`,message:a(`solving-info`,{solverName:a(`dp-solver`)})}),t=oe({initStatus:{...o.initStatus,quality:0},name:o.recipeName,status:`solving`});try{m.value.push(t);let e=new Date().getTime();await Lr(t.initStatus,u.value,p.value),J({showClose:!0,type:`success`,message:a(`solver-created`,{solveTime:Qt(new Date().getTime()-e)})}),t.status=`prepared`,c(`solverLoad`,t)}catch(e){m.value.splice(m.value.indexOf(t),1),J({type:`error`,message:a(`error-with`,{err:a(e)})}),console.error(e)}finally{e.close()}},b=async e=>{try{e.status=`destroying`,await Rr(e.initStatus),m.value.splice(m.value.indexOf(e),1)}catch(e){J({type:`error`,message:`${e}`}),console.error(e)}};return(t,i)=>{let o=T(`i18n`);return s(),W(V,null,[n(e(be),{modelValue:l.value,"onUpdate:modelValue":i[0]||=e=>l.value=e,title:e(a)(`dp-solver-info-title`)},{default:j(()=>[n(o,{path:`dp-solver-info`,tag:`span`,class:`solver-info`},{usageBlock:j(({muscleMemoryMsg:e})=>[...i[7]||=[]]),infoBlock:j(({infoMsg:t})=>[n(e(Te),{type:`info`,title:t,"show-icon":``,closable:!1,style:{"white-space":`normal`}},null,8,[`title`])]),calcCard:j(({calcMsg:t})=>[n(e(Ve),{shadow:`never`},{default:j(()=>[S(B(t),1)]),_:2},1024)]),_:1})]),_:1},8,[`modelValue`,`title`]),n(e(q),{direction:`vertical`,alignment:`normal`},{default:j(()=>[n(e(Nr),{modelValue:h.value,"onUpdate:modelValue":i[1]||=e=>h.value=e,options:g},{default:j(t=>[S(B(e(a)(`from-`+t.item)),1)]),_:1},8,[`modelValue`]),n(e(rt),{modelValue:f.value,"onUpdate:modelValue":i[2]||=e=>f.value=e,label:e(a)(`enable-action`,{action:e(a)(`muscle-memory`)}),disabled:!e(!1)},null,8,[`modelValue`,`label`,`disabled`]),n(e(rt),{modelValue:u.value,"onUpdate:modelValue":i[3]||=e=>u.value=e,label:e(a)(`enable-action`,{action:e(a)(`manipulation`)}),disabled:!e(!1)},null,8,[`modelValue`,`label`,`disabled`]),n(e(rt),{modelValue:d.value,"onUpdate:modelValue":i[4]||=e=>d.value=e,label:e(a)(`enable-action`,{action:e(a)(`waste-not`)}),disabled:!e(!1)},null,8,[`modelValue`,`label`,`disabled`]),n(e(rt),{modelValue:p.value,"onUpdate:modelValue":i[5]||=e=>p.value=e,label:e(a)(`enable-action`,{action:e(a)(`observe`)})},null,8,[`modelValue`,`label`])]),_:1}),f.value?(s(),O(e(Te),{key:0,type:`warning`,title:e(a)(`muscle-memory-msg`),"show-icon":``,closable:!1},null,8,[`title`])):U(``,!0),P(`div`,Di,[f.value?(s(),O(e(K),{key:0,type:`primary`,disabled:r.initStatus==null,onClick:y},{default:j(()=>[S(B(e(a)(`create-solver`)),1)]),_:1},8,[`disabled`])):(s(),O(e(K),{key:1,onClick:v,type:`primary`,loading:_.value},{default:j(()=>[S(B(_.value?e(a)(`simple-solver-solving`):e(a)(`solver-start`)),1)]),_:1},8,[`loading`])),n(e(K),{icon:e(Ut),circle:``,onClick:i[6]||=e=>l.value=!0},null,8,[`icon`])]),f.value?(s(),O(e(Ee),{key:1,data:m.value,"empty-text":e(a)(`dp-solver-empty-text`),style:{width:`100%`}},{default:j(()=>[n(e(we),null,{default:j(e=>[S(B(e.row.name),1)]),_:1}),n(e(we),{align:`right`},{default:j(t=>[n(e(K),{size:`small`,type:`danger`,onClick:e=>b(t.row),disabled:t.row.status!=`prepared`,loading:t.row.status!=`prepared`},{default:j(()=>[S(B(e(a)(`release-solver`)),1)]),_:1},8,[`onClick`,`disabled`,`loading`])]),_:1})]),_:1},8,[`data`,`empty-text`])):U(``,!0)],64)}}});function ki(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`zh-CN`]=new Z(`from-initial = 整体求解
from-current = 追加求解

solver-start = 开始求解
simple-solver-solving = 正在求解中
create-solver = 创建求解器
solver-created = 求解器创建成功({ $solveTime })
release-solver = 释放
error-with = 错误：{ $err }
enable-action = 使用技能：{ $action }

dp-solver-info-title = 基于记忆化搜索的动态规划算法。
dp-solver-info =
    可以将该算法理解为一种精心优化的穷举方法。

    它穷举所有状态，而不是所有手法。因此将DFS的指数时间复杂度，降低到了多项式时间复杂度。使得原本不可行的穷举变为可行。

    但是即使降低到了多项式时间复杂度，生产中的状态维度依然很多。如果考虑所有的状态，算法会占用大量内存，且仍然需要较长的时间才能求解完成。

    生产中的状态包括以下几个维度：
    · 当前耐久值
    · 剩余制作力
    · 坚信剩余步数（0~5）
    · 内静层数（0~10）
    · 俭约剩余次数（0~8）
    · 掌握剩余次数（0~8）
    · 崇敬剩余次数（0~4）
    · 改革剩余次数（0~4）
    · 阔步剩余步数（0~3）
    · 加工连击状态（0~3）
    · 是否已观察（0~1）
    以及最重要的：
    · 当前进展
    · 当前品质。
    共13个维度。

    而计算完整状态空间大小，需要将每个维度的大小相乘。
    以70耐久、500制作力估算：（我们先不考虑当前进展和品质）
    {$calcCard}
    而我们需要为每个状态记录：
    1. 当前状态得分
    2. 下一步最优动作

    不难发现，如果不做进一步优化，运行该算法将需要PB级的空间，成本过高。（别忘了我们还没考虑进展和品质）
    因此有必要做出以下两个必要妥协：
    1. 状态空间下不考虑当前品质和当前进展
    2. 将推品质和推进展拆分为两个过程，进行两次动态规划

    （具体的方案难以用语言描述，如果没能理解可以翻阅本软件的源代码。）

    这样便得到两个好处：
    1. 不把进展当作State，而是当作Value，多项式中可以不乘进去一个夸张的大约几千的数。
    2. 将一个大的多项式拆分为两个小的多项式，推品质相关的状态和推进展相关的状态可以分离，降低了空间复杂度。

    但是也有一些小缺点：
    1. 没有同时考虑加工和制作穿插使用的情况（{delicate-synthesis}做了特殊处理），但数学上无法再保证穷举得到的结果为最优解。
    2. 两次动态规划衔接处只考虑了各种耐久和制作力的组合，品质阶段不会特意为进展阶段留Buff类资源。
    3. 难以处理坚信手法的情况：需要先推进展，再推品质，最后再次推进展完成制作。

    另外，为了降低空间复杂度，只记录了下一步最优动作，而没有记录状态得分。
    经过实际测试，并没有明显的求解耗时增加。

    由于算法难以处理坚信，而当前版本坚信又是绝对的优势手法。因此本软件提供了一个不得已而为之的方案：

    由用户手动指定坚信起手。该方案具体工作方式如下：

    1. 由用户设置好配方的所有参数，然后点击{start-solver}按钮。创建一个针对当前配方和装备属性的求解器对象。
       该求解器对象会分配内存，用以储存所有状态的下一步最优动作。

    2. 用户在工作区输入坚信起手，并且需要将进展推动至“差最后一步制作即可完成”的状态。
       具体定义为可以通过“{basic-synthesis}（效率100）”、“{careful-synthesis}（效率180）”或之一完成的状态。

    3. 当算法识别到可以处理的情况后，计算需要留给最后一步的资源，并基于当前的Buff状态运行推动品质的动态规划。
       这时可以看到工作区出现一个正在转圈的Loading标志。几分钟后，求解结果会显示在用户输入的技能后面。

    4. 此时用户可以调整输入，尝试不同的起手，并实时预览求解结果。调整结果一般可以在不到1秒内运算完成。

    .calc-msg =
        70 × 500 × 6 × 11 × 9 × 9 × 5 × 5 × 4 × 4 × 2
        = 149,688,000,000
        = 146,179,687.5 Ki
        ≈ 142,753.6 Mi
        ≈ 139.4 Gi
muscle-memory-msg = 坚信模式的使用方法与其余求解器略有不同，请摸索或阅读下方的说明后使用。
dp-solver-empty-text = 没有已加载的求解器`)}function Ai(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`zh-TW`]=new Z(`from-initial = 整體求解
from-current = 追加求解

solver-start = 開始求解
simple-solver-solving = 正在求解中
create-solver = 建立求解器
solver-created = 求解器建立成功({ $solveTime })
release-solver = 釋放
error-with = 錯誤：{ $err }
enable-action = 使用技能：{ $action }

dp-solver-info-title = 基於記憶化搜尋的動態規劃演演算法。
dp-solver-info =
    可以將該算法理解為一種精心最佳化的窮舉方法。

    它窮舉所有狀態，而不是所有手法。因此將DFS的指數時間複雜度，降低到了多項式時間複雜度。使得原本不可行的窮舉變為可行。

    但是即使降低到了多項式時間複雜度，生產中的狀態維度依然很多。如果考慮所有的狀態，演演算法會佔用大量記憶體，且仍然需要較長的時間才能求解完成。

    生產中的狀態包括以下幾個維度：
    · 當前耐久值
    · 剩餘CP
    · 堅信剩餘步數（0~5）
    · 內靜層數（0~10）
    · 儉約剩餘次數（0~8）
    · 掌握剩餘次數（0~8）
    · 崇敬剩餘次數（0~4）
    · 改革剩餘次數（0~4）
    · 闊步剩餘步數（0~3）
    · 加工連擊狀態（0~3）
    · 是否已觀察（0~1）
    以及最重要的：
    · 當前進展
    · 當前品質。
    共13個維度。

    而計算完整狀態空間大小，需要將每個維度的大小相乘。
    以70耐久、500CP估算：（我們先不考慮當前進展和品質）
    {$calcCard}
    而我們需要為每個狀態記錄：
    1. 當前狀態得分
    2. 下一步最優動作

    不難發現，如果不做進一步最佳化，執行該演演算法將需要PB級的空間，成本過高。（別忘了我們還沒考慮進展和品質）
    因此有必要做出以下兩個必要妥協：
    1. 狀態空間下不考慮當前品質和當前進展
    2. 將推品質和推進展拆分為兩個過程，進行兩次動態規劃

    （具體的方案難以用語言描述，如果沒能理解可以翻閱本軟體的原始碼。）

    這樣便得到兩個好處：
    1. 不把進展當作State，而是當作Value，多項式中可以不乘進去一個誇張的大約幾千的數。
    2. 將一個大的多項式拆分為兩個小的多項式，推品質相關的狀態和推進展相關的狀態可以分離，降低了空間複雜度。

    但是也有一些小缺點：
    1. 沒有同時考慮加工和製作穿插使用的情況（{delicate-synthesis}做了特殊處理），但數學上無法再保證窮舉得到的結果為最優解。
    2. 兩次動態規劃銜接處只考慮了各種耐久和CP的組合，品質階段不會特意為進展階段留Buff類資源。
    3. 難以處理堅信手法的情況：需要先推進展，再推品質，最後再次推進展完成製作。

    另外，為了降低空間複雜度，只記錄了下一步最優動作，而沒有記錄狀態得分。
    經過實際測試，並沒有明顯的求解耗時增加。

    由於演演算法難以處理堅信，而當前版本堅信又是絕對的優勢手法。因此本軟體提供了一個不得已而為之的方案：

    由使用者手動指定堅信起手。該方案具體工作方式如下：

    1. 由使用者設定好配方的所有引數，然後點選{start-solver}按鈕。建立一個針對當前配方和裝備屬性的求解器物件。
       該求解器物件會分配記憶體，用以儲存所有狀態的下一步最優動作。

    2. 使用者在工作區輸入堅信起手，並且需要將進展推動至“差最後一步製作即可完成”的狀態。
       具體定義為可以透過“{basic-synthesis}（效率100）”、“{careful-synthesis}（效率180）”或之一完成的狀態。

    3. 當演演算法識別到可以處理的情況後，計算需要留給最後一步的資源，並基於當前的Buff狀態執行推動品質的動態規劃。
       這時可以看到工作區出現一個正在轉圈的Loading標誌。幾分鐘後，求解結果會顯示在使用者輸入的技能後面。

    4. 此時使用者可以調整輸入，嘗試不同的起手，並即時預覽求解結果。調整結果一般可以在不到1秒內運算完成。

    .calc-msg =
        70 × 500 × 6 × 11 × 9 × 9 × 5 × 5 × 4 × 4 × 2
        = 149,688,000,000
        = 146,179,687.5 Ki
        ≈ 142,753.6 Mi
        ≈ 139.4 Gi
muscle-memory-msg = 堅信模式的使用方法與其餘求解器略有不同，請摸索或閱讀下方的說明後使用。
dp-solver-empty-text = 沒有已載入的求解器`)}function ji(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`en-US`]=new Z(`from-initial = From initial
from-current = From current

solver-start = Start
simple-solver-solving = Solving
create-solver = Create solver
solver-created = Solver successfully created({ $solveTime })
release-solver = Release
error-with = Error: { $err }
enable-action = Enable { $action }

dp-solver-info-title = Dynamic programming algorithm based on Memoization Search.
dp-solver-info =
    This algorithm can be understood as a carefully optimized exhaustive method.

    It exhausts all states, not all actions. Therefore, the exponential time complexity of DFS has been reduced to polynomial time complexity. Make the previously infeasible things feasible.

    However, even if the polynomial time complexity is much better, there are still many state dimensions in the crafting. If all states are considered, the algorithm will occupy a large amount of memory and still take a long time to solve.

    The state dimensions include：
    · Current {durability}
    · Residue {craft-point}
    · Residue {muscle-memory} (0~5)
    · Current Inner Quiet (0~10)
    · Residue {waste-not} (0~8)
    · Residue {manipulation} (0~8)
    · Residue {veneration} (0~4)
    · Residue {innovation} (0~4)
    · Residue {great-strides} (0~3)
    · Touch Combos State (0~3)
    · Is Observed (0~1)
    And most importantly:
    · Current {progress}
    · Current {quality}
    13 dimensions in total。

    To calculate the size of the complete state space, we multiply the sizes of each dimension.
    Estimated at 70 {durability} and 500 {craft-point}: (We will not consider current {progress} and {quality} for now)
    {$calcCard}
    And record these for each state：
    1. Score of current state 
    2. The best action to next state

    It is not difficult to find that without further optimization, running this algorithm will require space in PB and the cost will be too high. (Don't forget that we haven't considered {progress} and {quality} yet)
    Therefore, it is necessary to make the following two necessary compromises:
    1. Regardless of current {quality} and {progress} in state space
    2. Split quality phase and progress phase into two processes and conduct two dynamic programming.

    (The specific solution is difficult to describe in language, and if you cannot understand it, you can refer to the source code of this software.)

    This results in two benefits:
    1. Do not treat progress as a State, but as a Value. And avoid the polynomial to be multiplied by an exaggerated number of thousands.
    2. By splitting a large DP into two small DPs, the quality related states and the progress related states can be separated, reducing spatial complexity.

    But there are also some minor drawbacks:
    1. There is no need to consider both processing and production interweaving ({delicate-synthesis} has been specially treated), but mathematically, it is no longer guaranteed that the exhaustive result is the optimal solution.
    2. The connection between the two dynamic programming only considers the combination of various {durability} and {craft-point}, and the quality stage does not intentionally leave Buff resources for the progress stage.
    3. Difficulty in handling {muscle-memory}: progress needs to be promoted first, quality needs to be promoted, and finally the progress needs to be promoted again for completing the crafting.

    In addition, in order to reduce spatial complexity, only the next optimal action was recorded, without recording the state score.
    Actual testing shows that there was no significant increase of solving time.

    Due to the algorithm's difficulty in handling {muscle-memory}, which is an absolute advantage in the current version. Therefore, this software provides a last-minute solution:

    The user manually specifies the {muscle-memory} starting action. The specific working method of this plan is as follows:

    1. The user sets all the parameters of the recipe and then clicks the {start-solver} button. Create a solver object for the current recipe and equipment attributes.
       The solver object will allocate memory to store the next optimal action for all states.
    2. The user enters a {muscle-memory} and some other actions in the workspace pushs the progress to a state which left only one step away from completing the crafting,
       which is specifically defined as a state that can be completed through one of "{basic-synthesis} (efficiency 1.0)" or "{delicate-synthesis} (efficiency 1.8)".
    3. After the algorithm recognizes the situation that can be processed, it needs to allocate resources for the final step and run the DP to drive quality based on the current Buffs state.
       At this point, you can see a rotating Loading icon in the workspace. After a few minutes, the solving results will be displayed after the actions inputed by the user.
    4. The user can adjust the inputs, try different starting actions, and preview the solving results in real-time. The adjustment results can generally be completed in less than 1 second.

    .calc-msg =
        70 × 500 × 6 × 11 × 9 × 9 × 5 × 5 × 4 × 4 × 2
        = 149,688,000,000
        = 146,179,687.5 Ki
        ≈ 142,753.6 Mi
        ≈ 139.4 Gi
muscle-memory-msg = 
    The usage for {muscle-memory} mode is a little bit different from other solvers. 
    Please discretionary explore, or read the instructions below before using it.
dp-solver-empty-text = None of solver is loaded`)}function Mi(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`ja-JP`]=new Z(`from-initial = 全体求解
from-current = 追加求解

solver-start = 求解開始
simple-solver-solving = 求解中
create-solver = ソルバーを作成
solver-created = ソルバー作成完了({ $solveTime })
release-solver = 解放
error-with = エラー：{ $err }
enable-action = アクション有効：{ $action }

dp-solver-info-title = メモ化探索に基づく動的計画法アルゴリズム
dp-solver-info =
    このアルゴリズムは、慎重に最適化された全探索手法と理解できます。

    すべての状態を列挙し、すべての手順を列挙するわけではありません。そのため、DFSの指数時間計算量を多項式時間計算量に低減し、従来不可能だった全探索を可能にしました。

    しかし、多項式時間計算量に低減しても、製作における状態次元は依然として多く存在します。すべての状態を考慮すると、アルゴリズムは大量のメモリを消費し、求解にも長い時間がかかります。

    製作中の状態には以下の次元が含まれます：
    · 現在の{durability}
    · 残り{craft-point}
    · {muscle-memory}の残りターン数（0~5）
    · インナークワイエットのスタック数（0~10）
    · {waste-not}の残り回数（0~8）
    · {manipulation}の残り回数（0~8）
    · {veneration}の残り回数（0~4）
    · {innovation}の残り回数（0~4）
    · {great-strides}の残りターン数（0~3）
    · 加工コンボ状態（0~3）
    · 経過観察済みか（0~1）
    そして最も重要な：
    · 現在の{progress}
    · 現在の{quality}
    計13次元。

    完全な状態空間のサイズを計算するには、各次元のサイズを掛け合わせます。
    耐久70、CP500で推定：（現在の進捗と品質は一旦考慮しない）
    {$calcCard}
    そして各状態について以下を記録する必要があります：
    1. 現在の状態スコア
    2. 次の最適アクション

    さらなる最適化を行わなければ、このアルゴリズムの実行にはPB級の空間が必要となり、コストが高すぎることがわかります。（進捗と品質をまだ考慮していないことをお忘れなく）
    そのため、以下の2つの妥協が必要です：
    1. 状態空間では現在の{quality}と{progress}を考慮しない
    2. 品質フェーズと進捗フェーズを2つのプロセスに分割し、2回の動的計画法を実行する

    （具体的な解決策は言葉で説明するのが難しいため、理解できない場合は本ソフトウェアのソースコードを参照してください。）

    これにより2つの利点が得られます：
    1. 進捗をStateではなくValueとして扱い、多項式に数千もの大きな数を掛けることを避けられます。
    2. 大きなDPを2つの小さなDPに分割することで、品質関連の状態と進捗関連の状態を分離でき、空間計算量を削減できます。

    しかし、いくつかの小さな欠点もあります：
    1. 加工と製作を交互に使用するケースを同時に考慮していません（{delicate-synthesis}は特別処理済み）。数学的には全探索で得られた結果が最適解であることを保証できなくなります。
    2. 2回の動的計画法の接続部分では、様々な{durability}と{craft-point}の組み合わせのみを考慮し、品質段階では進捗段階のためにBuffリソースを意図的に残しません。
    3. {muscle-memory}の処理が困難：進捗→品質→進捗の順で3段階のDPが必要になります。

    また、空間計算量を削減するため、状態スコアを記録せず、次の最適アクションのみを記録しています。
    実際のテストでは、求解時間の顕著な増加は見られませんでした。

    アルゴリズムが{muscle-memory}の処理を苦手としており、現バージョンでは{muscle-memory}が絶対的な優位手法であるため、本ソフトウェアではやむを得ず以下の方案を提供しています：

    ユーザーが手動で{muscle-memory}の初手を指定します。この方案の具体的な動作方法は以下の通りです：

    1. ユーザーがレシピのすべてのパラメータを設定し、{start-solver}ボタンをクリックします。現在のレシピと装備属性に対するソルバーオブジェクトが作成されます。
       このソルバーオブジェクトはメモリを割り当て、すべての状態の次の最適アクションを保存します。

    2. ユーザーはワークスペースで{muscle-memory}の初手を入力し、進捗を「最後の1アクションで完成できる」状態まで進める必要があります。
       具体的には「{basic-synthesis}（効率100）」または「{careful-synthesis}（効率180）」のいずれかで完成できる状態と定義されます。

    3. アルゴリズムが処理可能な状況を認識すると、最終ステップに必要なリソースを計算し、現在のBuff状態に基づいて品質を向上させる動的計画法を実行します。
       このとき、ワークスペースに回転するLoadingアイコンが表示されます。数分後、求解結果がユーザーの入力したアクションの後に表示されます。

    4. ユーザーは入力を調整し、異なる初手を試して、求解結果をリアルタイムでプレビューできます。調整結果は通常1秒以内に計算完了します。

    .calc-msg =
        70 × 500 × 6 × 11 × 9 × 9 × 5 × 5 × 4 × 4 × 2
        = 149,688,000,000
        = 146,179,687.5 Ki
        ≈ 142,753.6 Mi
        ≈ 139.4 Gi
muscle-memory-msg = {muscle-memory}モードの使用方法は他のソルバーと若干異なります。ご自身でお試しいただくか、以下の説明をお読みになってからご使用ください。
dp-solver-empty-text = 読み込まれたソルバーはありません`)}typeof ki==`function`&&ki(Oi),typeof Ai==`function`&&Ai(Oi),typeof ji==`function`&&ji(Oi),typeof Mi==`function`&&Mi(Oi);var Ni=Kt(Oi,[[`__scopeId`,`data-v-d4d001ff`]]),Pi={style:{"min-width":`300px`,display:`flex`,"align-items":`center`}},Fi=w({__name:`DfsSolver`,props:{canHq:{type:Boolean}},emits:[`runSimpleSolver`],setup(r,{emit:i}){let{$t:a}=At(),o=r,c=i,l=t(!1),u=t(4),d=t(!1),f=t(!1),p=t(!1),m=t(`initial`),h=[`initial`,`current`];A(()=>o.canHq,e=>{f.value=!e});function g(e){let t=String(e);return e>4&&(t=`⚠️`+t),t}function _(){c(`runSimpleSolver`,Ei.DFSSolver,p,e=>(f.value?Vr:Br)(e,u.value,d.value),m.value)}return(t,r)=>{let i=T(`i18n`);return s(),W(V,null,[n(e(be),{modelValue:l.value,"onUpdate:modelValue":r[0]||=e=>l.value=e,title:e(a)(`dfs-solver-info-title`)},{default:j(()=>[n(i,{path:`dfs-solver-info`,tag:`span`,class:`solver-info`},{ffxivCraftingAlgo:j(({commandLineTool:t})=>[n(e(ot),{type:`primary`,href:`https://github.com/Tnze/ffxiv-crafting-algo`,target:`_blank`},{default:j(()=>[S(B(t),1)]),_:2},1024)]),_:1})]),_:1},8,[`modelValue`,`title`]),n(e(q),{direction:`vertical`,alignment:`normal`},{default:j(()=>[P(`div`,Pi,[n(e(ut),{style:{flex:`none`}},{default:j(()=>[S(B(e(a)(`dfs-max-depth`)),1)]),_:1}),n(e(Dr),{modelValue:u.value,"onUpdate:modelValue":r[1]||=e=>u.value=e,style:{"margin-left":`30px`},min:1,max:10,"format-tooltip":g,"aria-label":e(a)(`dfs-max-depth`),disabled:p.value},null,8,[`modelValue`,`aria-label`,`disabled`])]),u.value>e(4)?(s(),O(e(Te),{key:0,type:`warning`,title:e(a)(`dfs-too-depth`),"show-icon":``,closable:!1},null,8,[`title`])):U(``,!0),n(e(rt),{modelValue:f.value,"onUpdate:modelValue":r[2]||=e=>f.value=e,label:e(a)(`do-not-touch`),disabled:p.value},null,8,[`modelValue`,`label`,`disabled`]),n(e(rt),{modelValue:d.value,"onUpdate:modelValue":r[3]||=e=>d.value=e,label:e(a)(`specialist`),disabled:p.value},null,8,[`modelValue`,`label`,`disabled`]),n(e(q),null,{default:j(()=>[n(e(K),{type:`primary`,onClick:_,loading:p.value},{default:j(()=>[S(B(p.value?e(a)(`simple-solver-solving`):e(a)(`solver-start`)),1)]),_:1},8,[`loading`]),n(e(K),{icon:e(Ut),circle:``,onClick:r[4]||=e=>l.value=!0},null,8,[`icon`]),n(e(Nr),{modelValue:m.value,"onUpdate:modelValue":r[5]||=e=>m.value=e,options:h},{default:j(t=>[S(B(e(a)(`from-`+t.item)),1)]),_:1},8,[`modelValue`])]),_:1})]),_:1})],64)}}});function Ii(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`zh-CN`]=new Z(`from-initial = 整体求解
from-current = 追加求解
do-not-touch = 不推品质
dfs-max-depth = 最大深度
solver-start = 开始求解
simple-solver-solving = 正在求解中
dfs-solver-info-title = 深度优先搜索
dfs-solver-info =
    此款求解器源于 Tnze 早期开发的一款{ $ffxivCraftingAlgo }，最初用于搜索最短的巨匠手法。

    该算法采用朴素的暴力搜索，所需时间随搜索深度限制指数级增大。推荐将搜索深度限制为6。
    更新至v2后拥有多线程加速。

    此求解器通常适合低于玩家10级以上的配方。
    .command-line-tool = 命令行工具
dfs-too-depth = 选择的最大深度过大，求解所需时间可能极长`)}function Li(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`zh-TW`]=new Z(`from-initial = 整體求解
from-current = 追加求解
do-not-touch = 不推品質
dfs-max-depth = 最大深度
solver-start = 開始求解
simple-solver-solving = 正在求解中
dfs-solver-info-title = 深度優先搜尋
dfs-solver-info =
    此款求解器源於 Tnze 早期開發的一款{ $ffxivCraftingAlgo }，最初用於搜尋最短的巨匠手法。

    該演算法採用樸素的暴力搜尋，所需時間隨搜尋深度限制指數級增大。推薦將搜尋深度限制為6。
    更新至v2後擁有多執行緒加速。

    此求解器通常適合低於玩家10級以上的配方。
    .command-line-tool = 命令列工具
dfs-too-depth = 選擇的最大深度過大，求解所需時間可能極長`)}function Ri(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`en-US`]=new Z(`from-initial = From initial
from-current = From current
do-not-touch = Do not "touching"
dfs-max-depth = Depth
solver-start = Start
simple-solver-solving = Solving
dfs-solver-info-title = Depth First Search
dfs-solver-info =
    This solver is based on an early development of the { $ffxivCraftingAlgo } by Tnze, originally usedto search for the shortest steps to create the 巨匠药水.

    The algorithm adopts naive search, which increases exponentially in time with the depth of the searching. 
    It is recommended to limit the search depth to 6. 
    After updating to v2, adopt multi threaded acceleration.

    This solver is usually suitable for recipes that are 10-level lower than the player or above.
    .command-line-tool = Command line tool
dfs-too-depth = The depth is too big. Solving time could be very long.`)}function zi(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`ja-JP`]=new Z(`from-initial = 全体求解
from-current = 追加求解
do-not-touch = 品質を上げない
dfs-max-depth = 最大深度
solver-start = 求解開始
simple-solver-solving = 求解中
dfs-solver-info-title = 深さ優先探索
dfs-solver-info =
    このソルバーは Tnze が初期に開発した{ $ffxivCraftingAlgo }に基づいており、元々は最短の巨匠の薬酒の製作手順を探索するために使用されていました。

    このアルゴリズムは単純な全探索を採用しており、探索深度の制限に応じて所要時間が指数関数的に増加します。
    探索深度は6に制限することを推奨します。
    v2への更新後、マルチスレッドに対応しました。

    このソルバーは通常、プレイヤーレベルより10以上低いレベルのレシピに適しています。
    .command-line-tool = コマンドラインツール
dfs-too-depth = 選択した最大深度が大きすぎます。求解に非常に長い時間がかかる可能性があります。`)}typeof Ii==`function`&&Ii(Fi),typeof Li==`function`&&Li(Fi),typeof Ri==`function`&&Ri(Fi),typeof zi==`function`&&zi(Fi);var Bi=Kt(Fi,[[`__scopeId`,`data-v-6b8e9a8e`]]),Vi=w({__name:`RaphaelSolver`,props:{initStatus:{},recipeName:{},collectableShopRefine:{},maxStellarSteadyHand:{}},emits:[`runSimpleSolver`],setup(r,{emit:i}){let{$t:a}=At(),o=r,c=i,l=t(!1),u=t(!1),d=t(`full`),f=F({get:()=>{let e=d.value;return typeof e==`number`?`custom`:e},set:e=>{e==`custom`?console.warn(`cannot set solverTarget to 'custom' by clicking segmented controller`):d.value=e}}),p=t(`initial`),m=[`initial`,`current`],h=F(()=>{let e=[];e.push({label:`custom-target`,value:`custom`,disabled:!0});let t=o.collectableShopRefine;return t!=null&&(t.low_collectability>0&&e.push({label:`first-stage`,value:`1st`}),t.mid_collectability>0&&e.push({label:`second-stage`,value:`2nd`}),t.high_collectability>0&&e.push({label:`third-stage`,value:`3rd`})),e.push({label:`maximum-target`,value:`full`}),e}),g=F({get:()=>{let e=d.value;if(o.collectableShopRefine!=null){let t=o.collectableShopRefine;if(e===`1st`)return t.low_collectability*10;if(e===`2nd`)return t.mid_collectability*10;if(e===`3rd`)return t.high_collectability*10}return typeof e==`number`?e:o.initStatus.recipe.quality},set:e=>{let t=e??0;if(o.collectableShopRefine!=null){let n=o.collectableShopRefine;e==n.low_collectability*10&&(t=`1st`),e==n.mid_collectability*10&&(t=`2nd`),e==n.high_collectability*10&&(t=`3rd`)}e==o.initStatus.recipe.quality&&(t=`full`),d.value=t}}),_=t(!1),v=t(!1),y=t(!1),b=t(!0),x=t(!1),C=t(!1),w=t(o.maxStellarSteadyHand);A(()=>o.maxStellarSteadyHand,e=>{w.value=e});function E(){c(`runSimpleSolver`,Ei.RaphaelSolver,u,e=>Ur(e,g.value,_.value,v.value,y.value,b.value,x.value,C.value,w.value??0).catch(e=>{let t=String(e);throw t==`RuntimeError: unreachable`?a(`error-probably-out-of-memory`,{err:t}):e}),p.value)}return(t,i)=>{let c=T(`i18n`);return s(),W(V,null,[n(e(be),{modelValue:l.value,"onUpdate:modelValue":i[0]||=e=>l.value=e,title:e(a)(`solver-info-title`)},{default:j(()=>[n(c,{path:`solver-info`,tag:`span`,class:`solver-info`},{origin:j(()=>[n(e(ot),{href:`https://www.raphael-xiv.com/`,target:`_blank`},{default:j(()=>[...i[12]||=[S(`https://www.raphael-xiv.com/`,-1)]]),_:1})]),source:j(()=>[n(e(ot),{href:`https://github.com/KonaeAkira/raphael-rs/`,target:`_blank`},{default:j(()=>[...i[13]||=[S(` https://github.com/KonaeAkira/raphael-rs/ `,-1)]]),_:1})]),_:1})]),_:1},8,[`modelValue`,`title`]),n(e(q),{direction:`vertical`,alignment:`normal`},{default:j(()=>[n(e(q),{style:{"margin-bottom":`10px`}},{default:j(()=>[n(e(K),{onClick:E,type:`primary`,loading:u.value},{default:j(()=>[S(B(u.value?e(a)(`simple-solver-solving`):e(a)(`solver-start`)),1)]),_:1},8,[`loading`]),n(e(K),{icon:e(Ut),circle:``,onClick:i[1]||=e=>l.value=!0},null,8,[`icon`]),n(e(Nr),{modelValue:p.value,"onUpdate:modelValue":i[2]||=e=>p.value=e,options:m,disabled:!0},{default:j(t=>[S(B(e(a)(`from-`+t.item)),1)]),_:1},8,[`modelValue`])]),_:1}),n(e(q),null,{default:j(()=>[n(e(ut),{style:{flex:`none`}},{default:j(()=>[S(B(e(a)(`target-quality`)),1)]),_:1}),n(e(Se),{modelValue:g.value,"onUpdate:modelValue":i[3]||=e=>g.value=e,min:0,max:r.initStatus.recipe.quality,step:1,"step-strictly":``},null,8,[`modelValue`,`max`]),n(e(Nr),{modelValue:f.value,"onUpdate:modelValue":i[4]||=e=>f.value=e,options:h.value},{default:j(t=>[S(B(e(a)(t.item.label)),1)]),_:1},8,[`modelValue`,`options`])]),_:1}),n(e(q),null,{default:j(()=>[n(e(ut),{style:{flex:`none`}},{default:j(()=>[S(B(e(a)(`stellar-steady-hand`)),1)]),_:1}),n(e(Se),{modelValue:w.value,"onUpdate:modelValue":i[5]||=e=>w.value=e,min:0,max:o.maxStellarSteadyHand,step:1,disabled:!o.maxStellarSteadyHand,"step-strictly":``},null,8,[`modelValue`,`max`,`disabled`])]),_:1}),n(e(rt),{modelValue:b.value,"onUpdate:modelValue":i[6]||=e=>b.value=e,label:e(a)(`enable-action`,{action:e(a)(`trained-eye`)})},null,8,[`modelValue`,`label`]),n(e(q),null,{default:j(()=>[n(e(rt),{modelValue:_.value,"onUpdate:modelValue":i[7]||=e=>_.value=e,label:e(a)(`enable-action`,{action:e(a)(`manipulation`)})},null,8,[`modelValue`,`label`]),_.value?(s(),O(e(xe),{key:0,type:`warning`},{default:j(()=>[S(B(e(a)(`need-learn-manipulation`)),1)]),_:1})):U(``,!0)]),_:1}),n(e(q),null,{default:j(()=>[n(e(rt),{modelValue:v.value,"onUpdate:modelValue":i[8]||=e=>v.value=e,label:e(a)(`enable-action`,{action:e(a)(`heart-and-soul`)})},null,8,[`modelValue`,`label`]),v.value?(s(),O(e(xe),{key:0,type:`warning`},{default:j(()=>[S(B(e(a)(`consume-crafters-delineation`)),1)]),_:1})):U(``,!0)]),_:1}),n(e(q),null,{default:j(()=>[n(e(rt),{modelValue:y.value,"onUpdate:modelValue":i[9]||=e=>y.value=e,label:e(a)(`enable-action`,{action:e(a)(`quick-innovation`)})},null,8,[`modelValue`,`label`]),y.value?(s(),O(e(xe),{key:0,type:`warning`},{default:j(()=>[S(B(e(a)(`consume-crafters-delineation`)),1)]),_:1})):U(``,!0)]),_:1}),n(e(q),null,{default:j(()=>[n(e(rt),{modelValue:x.value,"onUpdate:modelValue":i[10]||=e=>x.value=e,label:e(a)(`backload-progress`)},null,8,[`modelValue`,`label`]),x.value?(s(),O(e(xe),{key:0,type:`success`},{default:j(()=>[S(B(e(a)(`speed-up`)),1)]),_:1})):U(``,!0),x.value?(s(),O(e(xe),{key:1,type:`danger`},{default:j(()=>[S(B(e(a)(`quality-down`)),1)]),_:1})):U(``,!0),x.value?(s(),O(e(xe),{key:2,type:`danger`},{default:j(()=>[S(B(e(a)(`increase-duration`)),1)]),_:1})):U(``,!0)]),_:1}),n(e(q),null,{default:j(()=>[n(e(rt),{modelValue:C.value,"onUpdate:modelValue":i[11]||=e=>C.value=e,label:e(a)(`adversarial`)},null,8,[`modelValue`,`label`]),C.value?(s(),O(e(xe),{key:0,type:`danger`},{default:j(()=>[S(B(e(a)(`quality-down`)),1)]),_:1})):U(``,!0),C.value?(s(),O(e(xe),{key:1,type:`danger`},{default:j(()=>[S(B(e(a)(`increase-duration`)),1)]),_:1})):U(``,!0)]),_:1})]),_:1})],64)}}});function Hi(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`zh-CN`]=new Z(`solver-start = 开始求解
simple-solver-solving = 正在求解中
error-probably-out-of-memory = { $err }（可能是内存不足，请尝试使用桌面端）

from-initial = 整体求解
from-current = 追加求解

first-stage = 一档
second-stage = 二档
third-stage = 三档
maximum-target = 最大
custom-target = 自定义

target-quality = 目标品质
enable-action = 使用技能：{ $action }
backload-progress = 后置作业技能（快速求解）
minimize-steps = 使步骤最短
adversarial = 确保 100% 可靠（防黑球）

speed-up = 求解速度提高
speed-down = 求解速度降低
quality-down = 求解品质下降
increase-duration = 最终步数增加
need-learn-manipulation = 需要学习掌握技能
consume-crafters-delineation = 消耗能工巧匠图纸

solver-info-title = Raphael 求解器
solver-info =
    来源：{ $origin }

    源代码：{ $source }

    许可证：Apache-2.0

    计算最优生产宏：
    · 产生的宏必须能够推满配方的作业（即100%进展）
    · 按以下优先级选择最优的宏：
        - 品质越高越好，直到满足目标品质
        - 宏长度越短越好
        - 总时间越短越好

    工作原理：分支定界、最佳优先搜索、动态规划，以及帕累托优化`)}function Ui(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`zh-TW`]=new Z(`solver-start = 開始求解
simple-solver-solving = 正在求解中
error-probably-out-of-memory = { $err }（可能是記憶體不足，請嘗試使用桌面端）

from-initial = 整體求解
from-current = 追加求解

first-stage = 一檔
second-stage = 二檔
third-stage = 三檔
maximum-target = 最大
custom-target = 自定義

target-quality = 目標品質
enable-action = 使用技能：{ $action }
backload-progress = 後置作業技能（快速求解）
minimize-steps = 使步驟最短
adversarial = 確保 100% 可靠（防黑球）

speed-up = 求解速度提高
speed-down = 求解速度降低
quality-down = 求解品質下降
increase-duration = 最終步數增加
need-learn-manipulation = 需要學習掌握技能
consume-crafters-delineation = 消耗能工巧匠圖紙

solver-info-title = Raphael 求解器
solver-info =
    來源：{ $origin }

    原始碼：{ $source }

    許可證：Apache-2.0

    計算最優生產巨集：
    · 產生的巨集必須能夠推滿配方的作業（即100%進展）
    · 按以下優先順序選擇最優的巨集：
        - 品質越高越好，直到滿足目標品質
        - 巨集長度越短越好
        - 總時間越短越好

    工作原理：分支定界、最佳優先搜尋、動態規劃，以及帕累託最佳化`)}function Wi(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`en-US`]=new Z(`solver-start = Start
simple-solver-solving = Solving
error-probably-out-of-memory = { $err } (Probably out of memory, please use the desktop edition)

from-initial = From initial
from-current = From current

first-stage = 1st
second-stage = 2nd
third-stage = 3rd
maximum-target = Maximum
custom-target = Custom

target-quality = Target quality
enable-action = Enable { $action }
backload-progress = Backload progress (Quick solve)
minimize-steps = Minimize Steps
adversarial = Ensure 100% reliability

speed-up = speed up
speed-down = speed down
quality-down = quality decline
increase-duration = increase macro duration
need-learn-manipulation = need manipulation
consume-crafters-delineation = consume crafter's delineation

solver-info-title = Raphael FFXIV Crafting Solver
solver-info =
    Origin: { $origin }

    Source: { $source }

    License: Apache-2.0

    Optimal macro selection:
    - The generated macro must be able to finish the synthesis, i.e. reach 100% progress.
    - Valid macros are then ranked based on these criteria, in order:
        - Quality reached, capped at the target quality defined in the solver configuration. (Higher is better)
        - Number of macro steps. (Lower is better)
        - Total macro duration, in seconds. (Lower is better)

    How does it work: Branch-and-bound, best-first-search, dynamic programming, Pareto optimization.`)}function Gi(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`ja-JP`]=new Z(`solver-start = 求解開始
simple-solver-solving = 求解中
error-probably-out-of-memory = { $err }（メモリ不足の可能性があります。デスクトップ版をお試しください）

from-initial = 全体求解
from-current = 追加求解

first-stage = 1段階
second-stage = 2段階
third-stage = 3段階
maximum-target = 最大
custom-target = カスタム

target-quality = 目標品質
enable-action = アクション有効：{ $action }
backload-progress = 作業アクション後置（高速求解）
minimize-steps = ステップ数を最小化
adversarial = 100%信頼性を確保（低品質対策）

speed-up = 求解速度向上
speed-down = 求解速度低下
quality-down = 求解品質低下
increase-duration = 最終ステップ数増加
need-learn-manipulation = {manipulation}の習得が必要です
consume-crafters-delineation = 能工巧匠の設計図を消費

solver-info-title = Raphael ソルバー
solver-info =
    提供元：{ $origin }

    ソースコード：{ $source }

    ライセンス：Apache-2.0

    最適な製作マクロを計算：
    · 生成されるマクロはレシピの作業を完了できる必要があります（100%進捗）
    · 以下の優先順位で最適なマクロを選択：
        - 目標品質に達するまで、品質が高いほど良い
        - マクロの長さが短いほど良い
        - 合計時間が短いほど良い

    動作原理：分枝限定法、最良優先探索、動的計画法、パレート最適化`)}typeof Hi==`function`&&Hi(Vi),typeof Ui==`function`&&Ui(Vi),typeof Wi==`function`&&Wi(Vi),typeof Gi==`function`&&Gi(Vi);var Ki=Kt(Vi,[[`__scopeId`,`data-v-66f5ae87`]]),qi=w({__name:`List`,props:{initStatus:{},currentStatus:{},recipeName:{},canHq:{type:Boolean},collectableShopRefine:{},maxStellarSteadyHand:{}},emits:[`solverLoad`,`solverResult`],setup(r,{emit:i}){let{$t:a}=At(),o=r,c=i,l=t(`raphael`);async function u(e,t,n,r=`initial`){let i=J({showClose:!0,duration:0,type:`info`,message:a(`solving-info`,{solverName:a(e)})});try{t.value=!0;let i=new Date().getTime(),s=await n(r==`current`?o.currentStatus:o.initStatus),l={solveTime:Qt(new Date().getTime()-i),solverName:a(e)};s.length>0?(J({type:`success`,message:a(`simple-solver-finished`,l)}),c(`solverResult`,s,e,r==`current`)):J({showClose:!0,duration:0,type:`error`,message:a(`simple-solver-finished-no-result`,l)})}catch(e){J({showClose:!0,duration:0,type:`error`,message:a(`error-with`,{err:a(String(e))})}),console.error(e)}finally{t.value=!1,i.close()}}return(t,i)=>(s(),O(e(Re),{class:`container`},{default:j(()=>[e(Pr)?U(``,!0):(s(),W(V,{key:0},[n(e(Te),{type:`error`,title:e(a)(`web-worker-not-avaliable`),"show-icon":``,closable:!1},null,8,[`title`]),i[1]||=P(`br`,null,null,-1)],64)),n(e(Ie),{modelValue:l.value,"onUpdate:modelValue":i[0]||=e=>l.value=e},{default:j(()=>[n(e(Le),{label:e(a)(`raphael-solver`),name:`raphael`},{default:j(()=>[n(Ki,{"init-status":r.initStatus,"recipe-name":r.recipeName,onRunSimpleSolver:u,"collectable-shop-refine":r.collectableShopRefine,maxStellarSteadyHand:r.maxStellarSteadyHand},null,8,[`init-status`,`recipe-name`,`collectable-shop-refine`,`maxStellarSteadyHand`])]),_:1},8,[`label`]),n(e(Le),{label:e(a)(`dp-solver`),name:`dp`},{default:j(()=>[n(Ni,{"init-status":r.initStatus,"recipe-name":r.recipeName,onRunSimpleSolver:u},null,8,[`init-status`,`recipe-name`])]),_:1},8,[`label`]),n(e(Le),{label:e(a)(`dfs-solver`),name:`dfs`,style:{flex:`auto`}},{default:j(()=>[n(Bi,{"can-hq":r.canHq,onRunSimpleSolver:u},null,8,[`can-hq`])]),_:1},8,[`label`])]),_:1},8,[`modelValue`])]),_:1}))}});function Ji(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`zh-CN`]=new Z(`web-worker-not-avaliable = 您正在使用的浏览器不支持 Web Worker 功能，无法运行求解器。

do-not-touch = 不推品质
reduce-steps-info = 最少资源方案

solving-info = 「{ $solverName }」求解中，请耐心等待
error-with = 错误：{ $err }

warning = 警告
solver-start = 开始求解
simple-solver-solving = 正在求解中
simple-solver-finished =「{ $solverName }」求解完成({ $solveTime })
simple-solver-finished-no-result = 发动了「{ $solverName }」求解器，没有获得任何结果({ $solveTime })

sum-info = 提示：下面会显示对您没有帮助的碎碎念，使用求解器请直接点击“{solver-start}”按钮。`)}function Yi(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`zh-TW`]=new Z(`web-worker-not-avaliable = 您正在使用的瀏覽器不支援 Web Worker 功能，無法執行求解器。

do-not-touch = 不推品質
reduce-steps-info = 最少資源方案

solving-info = 「{ $solverName }」求解中，請耐心等待
error-with = 錯誤：{ $err }

warning = 警告
solver-start = 開始求解
simple-solver-solving = 正在求解中
simple-solver-finished =「{ $solverName }」求解完成({ $solveTime })
simple-solver-finished-no-result = 發動了「{ $solverName }」求解器，沒有獲得任何結果({ $solveTime })

sum-info = 提示：下面會顯示對您沒有幫助的碎碎念，使用求解器請直接點選“{solver-start}”按鈕。`)}function Xi(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`en-US`]=new Z(`web-worker-not-avaliable = Your browser doesn't support Web Worker, which is required to running solvers.

do-not-touch = Do not "touching"
reduce-steps-info = Minimum resource

solving-info = Solving, please wait patiently
error-with = Error: { $err }

warning = Warning
solver-start = Start
simple-solver-solving = Solving
simple-solver-finished = Solver "{ $solverName }" finished. ({ $solveTime })
simple-solver-finished-no-result = "{ $solverName }" is finished. None of result is returned. ({ $solveTime })

sum-info = Warning: The following content contains many fragmented ideas that are not helpful to you. To use the solvers, please click on the '{solver-start}' button directly.`)}function Zi(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`ja-JP`]=new Z(`web-worker-not-avaliable = お使いのブラウザは Web Worker に対応していないため、ソルバーを実行できません。

do-not-touch = 品質を上げない
reduce-steps-info = 最小リソース

solving-info = 「{ $solverName }」求解中です。しばらくお待ちください
error-with = エラー：{ $err }

warning = 警告
solver-start = 求解開始
simple-solver-solving = 求解中
simple-solver-finished =「{ $solverName }」求解完了({ $solveTime })
simple-solver-finished-no-result =「{ $solverName }」を実行しましたが、結果が得られませんでした({ $solveTime })

sum-info = ヒント：以下には役に立たない雑談が表示されます。ソルバーを使用するには「{solver-start}」ボタンを直接クリックしてください。`)}typeof Ji==`function`&&Ji(qi),typeof Yi==`function`&&Yi(qi),typeof Xi==`function`&&Xi(qi),typeof Zi==`function`&&Zi(qi);var Qi=Kt(qi,[[`__scopeId`,`data-v-cf67db92`]]);function $i(e,t){return new Promise((n,r)=>{let i=new Worker(new URL(`/ffxiv-best-craft/assets/AnalyzerWorker-BLvJLZDn.js`,``+import.meta.url),{type:`module`});i.onmessage=e=>{i.terminate(),e.data.error===void 0?n(e.data):r(e.data.error)},i.onerror=e=>{i.terminate(),r(e)},i.postMessage({name:e,args:JSON.stringify(t)})})}async function ea(e,t,n,r){return $i(`rand_simulation`,{status:e,actions:t,n,ignoreErrors:r})}async function ta(e,t,n,r,i){return $i(`rand_collectables_simulation`,{status:e,actions:t,n,ignoreErrors:r,collectablesShopRefine:i})}async function na(e,t){return $i(`calc_attributes_scope`,{status:e,actions:t})}var ra=class extends Map{constructor(e,t=sa){if(super(),Object.defineProperties(this,{_intern:{value:new Map},_key:{value:t}}),e!=null)for(let[t,n]of e)this.set(t,n)}get(e){return super.get(ia(this,e))}has(e){return super.has(ia(this,e))}set(e,t){return super.set(aa(this,e),t)}delete(e){return super.delete(oa(this,e))}};function ia({_intern:e,_key:t},n){let r=t(n);return e.has(r)?e.get(r):n}function aa({_intern:e,_key:t},n){let r=t(n);return e.has(r)?e.get(r):(e.set(r,n),n)}function oa({_intern:e,_key:t},n){let r=t(n);return e.has(r)&&(n=e.get(r),e.delete(r)),n}function sa(e){return typeof e==`object`&&e?e.valueOf():e}var ca={value:()=>{}};function la(){for(var e=0,t=arguments.length,n={},r;e<t;++e){if(!(r=arguments[e]+``)||r in n||/[\s.]/.test(r))throw Error(`illegal type: `+r);n[r]=[]}return new ua(n)}function ua(e){this._=e}function da(e,t){return e.trim().split(/^|\s+/).map(function(e){var n=``,r=e.indexOf(`.`);if(r>=0&&(n=e.slice(r+1),e=e.slice(0,r)),e&&!t.hasOwnProperty(e))throw Error(`unknown type: `+e);return{type:e,name:n}})}ua.prototype=la.prototype={constructor:ua,on:function(e,t){var n=this._,r=da(e+``,n),i,a=-1,o=r.length;if(arguments.length<2){for(;++a<o;)if((i=(e=r[a]).type)&&(i=fa(n[i],e.name)))return i;return}if(t!=null&&typeof t!=`function`)throw Error(`invalid callback: `+t);for(;++a<o;)if(i=(e=r[a]).type)n[i]=pa(n[i],e.name,t);else if(t==null)for(i in n)n[i]=pa(n[i],e.name,null);return this},copy:function(){var e={},t=this._;for(var n in t)e[n]=t[n].slice();return new ua(e)},call:function(e,t){if((i=arguments.length-2)>0)for(var n=Array(i),r=0,i,a;r<i;++r)n[r]=arguments[r+2];if(!this._.hasOwnProperty(e))throw Error(`unknown type: `+e);for(a=this._[e],r=0,i=a.length;r<i;++r)a[r].value.apply(t,n)},apply:function(e,t,n){if(!this._.hasOwnProperty(e))throw Error(`unknown type: `+e);for(var r=this._[e],i=0,a=r.length;i<a;++i)r[i].value.apply(t,n)}};function fa(e,t){for(var n=0,r=e.length,i;n<r;++n)if((i=e[n]).name===t)return i.value}function pa(e,t,n){for(var r=0,i=e.length;r<i;++r)if(e[r].name===t){e[r]=ca,e=e.slice(0,r).concat(e.slice(r+1));break}return n!=null&&e.push({name:t,value:n}),e}var ma={svg:`http://www.w3.org/2000/svg`,xhtml:`http://www.w3.org/1999/xhtml`,xlink:`http://www.w3.org/1999/xlink`,xml:`http://www.w3.org/XML/1998/namespace`,xmlns:`http://www.w3.org/2000/xmlns/`};function ha(e){var t=e+=``,n=t.indexOf(`:`);return n>=0&&(t=e.slice(0,n))!==`xmlns`&&(e=e.slice(n+1)),ma.hasOwnProperty(t)?{space:ma[t],local:e}:e}function ga(e){return function(){var t=this.ownerDocument,n=this.namespaceURI;return n===`http://www.w3.org/1999/xhtml`&&t.documentElement.namespaceURI===`http://www.w3.org/1999/xhtml`?t.createElement(e):t.createElementNS(n,e)}}function _a(e){return function(){return this.ownerDocument.createElementNS(e.space,e.local)}}function va(e){var t=ha(e);return(t.local?_a:ga)(t)}function ya(){}function ba(e){return e==null?ya:function(){return this.querySelector(e)}}function xa(e){typeof e!=`function`&&(e=ba(e));for(var t=this._groups,n=t.length,r=Array(n),i=0;i<n;++i)for(var a=t[i],o=a.length,s=r[i]=Array(o),c,l,u=0;u<o;++u)(c=a[u])&&(l=e.call(c,c.__data__,u,a))&&(`__data__`in c&&(l.__data__=c.__data__),s[u]=l);return new us(r,this._parents)}function Sa(e){return e==null?[]:Array.isArray(e)?e:Array.from(e)}function Ca(){return[]}function wa(e){return e==null?Ca:function(){return this.querySelectorAll(e)}}function Ta(e){return function(){return Sa(e.apply(this,arguments))}}function Ea(e){e=typeof e==`function`?Ta(e):wa(e);for(var t=this._groups,n=t.length,r=[],i=[],a=0;a<n;++a)for(var o=t[a],s=o.length,c,l=0;l<s;++l)(c=o[l])&&(r.push(e.call(c,c.__data__,l,o)),i.push(c));return new us(r,i)}function Da(e){return function(){return this.matches(e)}}function Oa(e){return function(t){return t.matches(e)}}var ka=Array.prototype.find;function Aa(e){return function(){return ka.call(this.children,e)}}function ja(){return this.firstElementChild}function Ma(e){return this.select(e==null?ja:Aa(typeof e==`function`?e:Oa(e)))}var Na=Array.prototype.filter;function Pa(){return Array.from(this.children)}function Fa(e){return function(){return Na.call(this.children,e)}}function Ia(e){return this.selectAll(e==null?Pa:Fa(typeof e==`function`?e:Oa(e)))}function La(e){typeof e!=`function`&&(e=Da(e));for(var t=this._groups,n=t.length,r=Array(n),i=0;i<n;++i)for(var a=t[i],o=a.length,s=r[i]=[],c,l=0;l<o;++l)(c=a[l])&&e.call(c,c.__data__,l,a)&&s.push(c);return new us(r,this._parents)}function Ra(e){return Array(e.length)}function za(){return new us(this._enter||this._groups.map(Ra),this._parents)}function Ba(e,t){this.ownerDocument=e.ownerDocument,this.namespaceURI=e.namespaceURI,this._next=null,this._parent=e,this.__data__=t}Ba.prototype={constructor:Ba,appendChild:function(e){return this._parent.insertBefore(e,this._next)},insertBefore:function(e,t){return this._parent.insertBefore(e,t)},querySelector:function(e){return this._parent.querySelector(e)},querySelectorAll:function(e){return this._parent.querySelectorAll(e)}};function Va(e){return function(){return e}}function Ha(e,t,n,r,i,a){for(var o=0,s,c=t.length,l=a.length;o<l;++o)(s=t[o])?(s.__data__=a[o],r[o]=s):n[o]=new Ba(e,a[o]);for(;o<c;++o)(s=t[o])&&(i[o]=s)}function Ua(e,t,n,r,i,a,o){var s,c,l=new Map,u=t.length,d=a.length,f=Array(u),p;for(s=0;s<u;++s)(c=t[s])&&(f[s]=p=o.call(c,c.__data__,s,t)+``,l.has(p)?i[s]=c:l.set(p,c));for(s=0;s<d;++s)p=o.call(e,a[s],s,a)+``,(c=l.get(p))?(r[s]=c,c.__data__=a[s],l.delete(p)):n[s]=new Ba(e,a[s]);for(s=0;s<u;++s)(c=t[s])&&l.get(f[s])===c&&(i[s]=c)}function Wa(e){return e.__data__}function Ga(e,t){if(!arguments.length)return Array.from(this,Wa);var n=t?Ua:Ha,r=this._parents,i=this._groups;typeof e!=`function`&&(e=Va(e));for(var a=i.length,o=Array(a),s=Array(a),c=Array(a),l=0;l<a;++l){var u=r[l],d=i[l],f=d.length,p=Ka(e.call(u,u&&u.__data__,l,r)),m=p.length,h=s[l]=Array(m),g=o[l]=Array(m);n(u,d,h,g,c[l]=Array(f),p,t);for(var _=0,v=0,y,b;_<m;++_)if(y=h[_]){for(_>=v&&(v=_+1);!(b=g[v])&&++v<m;);y._next=b||null}}return o=new us(o,r),o._enter=s,o._exit=c,o}function Ka(e){return typeof e==`object`&&`length`in e?e:Array.from(e)}function qa(){return new us(this._exit||this._groups.map(Ra),this._parents)}function Ja(e,t,n){var r=this.enter(),i=this,a=this.exit();return typeof e==`function`?(r=e(r),r&&=r.selection()):r=r.append(e+``),t!=null&&(i=t(i),i&&=i.selection()),n==null?a.remove():n(a),r&&i?r.merge(i).order():i}function Ya(e){for(var t=e.selection?e.selection():e,n=this._groups,r=t._groups,i=n.length,a=r.length,o=Math.min(i,a),s=Array(i),c=0;c<o;++c)for(var l=n[c],u=r[c],d=l.length,f=s[c]=Array(d),p,m=0;m<d;++m)(p=l[m]||u[m])&&(f[m]=p);for(;c<i;++c)s[c]=n[c];return new us(s,this._parents)}function Xa(){for(var e=this._groups,t=-1,n=e.length;++t<n;)for(var r=e[t],i=r.length-1,a=r[i],o;--i>=0;)(o=r[i])&&(a&&o.compareDocumentPosition(a)^4&&a.parentNode.insertBefore(o,a),a=o);return this}function Za(e){e||=Qa;function t(t,n){return t&&n?e(t.__data__,n.__data__):!t-!n}for(var n=this._groups,r=n.length,i=Array(r),a=0;a<r;++a){for(var o=n[a],s=o.length,c=i[a]=Array(s),l,u=0;u<s;++u)(l=o[u])&&(c[u]=l);c.sort(t)}return new us(i,this._parents).order()}function Qa(e,t){return e<t?-1:e>t?1:e>=t?0:NaN}function $a(){var e=arguments[0];return arguments[0]=this,e.apply(null,arguments),this}function eo(){return Array.from(this)}function to(){for(var e=this._groups,t=0,n=e.length;t<n;++t)for(var r=e[t],i=0,a=r.length;i<a;++i){var o=r[i];if(o)return o}return null}function no(){let e=0;for(let t of this)++e;return e}function ro(){return!this.node()}function io(e){for(var t=this._groups,n=0,r=t.length;n<r;++n)for(var i=t[n],a=0,o=i.length,s;a<o;++a)(s=i[a])&&e.call(s,s.__data__,a,i);return this}function ao(e){return function(){this.removeAttribute(e)}}function oo(e){return function(){this.removeAttributeNS(e.space,e.local)}}function so(e,t){return function(){this.setAttribute(e,t)}}function co(e,t){return function(){this.setAttributeNS(e.space,e.local,t)}}function lo(e,t){return function(){var n=t.apply(this,arguments);n==null?this.removeAttribute(e):this.setAttribute(e,n)}}function uo(e,t){return function(){var n=t.apply(this,arguments);n==null?this.removeAttributeNS(e.space,e.local):this.setAttributeNS(e.space,e.local,n)}}function fo(e,t){var n=ha(e);if(arguments.length<2){var r=this.node();return n.local?r.getAttributeNS(n.space,n.local):r.getAttribute(n)}return this.each((t==null?n.local?oo:ao:typeof t==`function`?n.local?uo:lo:n.local?co:so)(n,t))}function po(e){return e.ownerDocument&&e.ownerDocument.defaultView||e.document&&e||e.defaultView}function mo(e){return function(){this.style.removeProperty(e)}}function ho(e,t,n){return function(){this.style.setProperty(e,t,n)}}function go(e,t,n){return function(){var r=t.apply(this,arguments);r==null?this.style.removeProperty(e):this.style.setProperty(e,r,n)}}function _o(e,t,n){return arguments.length>1?this.each((t==null?mo:typeof t==`function`?go:ho)(e,t,n??``)):vo(this.node(),e)}function vo(e,t){return e.style.getPropertyValue(t)||po(e).getComputedStyle(e,null).getPropertyValue(t)}function yo(e){return function(){delete this[e]}}function bo(e,t){return function(){this[e]=t}}function xo(e,t){return function(){var n=t.apply(this,arguments);n==null?delete this[e]:this[e]=n}}function So(e,t){return arguments.length>1?this.each((t==null?yo:typeof t==`function`?xo:bo)(e,t)):this.node()[e]}function Co(e){return e.trim().split(/^|\s+/)}function wo(e){return e.classList||new To(e)}function To(e){this._node=e,this._names=Co(e.getAttribute(`class`)||``)}To.prototype={add:function(e){this._names.indexOf(e)<0&&(this._names.push(e),this._node.setAttribute(`class`,this._names.join(` `)))},remove:function(e){var t=this._names.indexOf(e);t>=0&&(this._names.splice(t,1),this._node.setAttribute(`class`,this._names.join(` `)))},contains:function(e){return this._names.indexOf(e)>=0}};function Eo(e,t){for(var n=wo(e),r=-1,i=t.length;++r<i;)n.add(t[r])}function Do(e,t){for(var n=wo(e),r=-1,i=t.length;++r<i;)n.remove(t[r])}function Oo(e){return function(){Eo(this,e)}}function ko(e){return function(){Do(this,e)}}function Ao(e,t){return function(){(t.apply(this,arguments)?Eo:Do)(this,e)}}function jo(e,t){var n=Co(e+``);if(arguments.length<2){for(var r=wo(this.node()),i=-1,a=n.length;++i<a;)if(!r.contains(n[i]))return!1;return!0}return this.each((typeof t==`function`?Ao:t?Oo:ko)(n,t))}function Mo(){this.textContent=``}function No(e){return function(){this.textContent=e}}function Po(e){return function(){var t=e.apply(this,arguments);this.textContent=t??``}}function Fo(e){return arguments.length?this.each(e==null?Mo:(typeof e==`function`?Po:No)(e)):this.node().textContent}function Io(){this.innerHTML=``}function Lo(e){return function(){this.innerHTML=e}}function Ro(e){return function(){var t=e.apply(this,arguments);this.innerHTML=t??``}}function zo(e){return arguments.length?this.each(e==null?Io:(typeof e==`function`?Ro:Lo)(e)):this.node().innerHTML}function Bo(){this.nextSibling&&this.parentNode.appendChild(this)}function Vo(){return this.each(Bo)}function Ho(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function Uo(){return this.each(Ho)}function Wo(e){var t=typeof e==`function`?e:va(e);return this.select(function(){return this.appendChild(t.apply(this,arguments))})}function Go(){return null}function Ko(e,t){var n=typeof e==`function`?e:va(e),r=t==null?Go:typeof t==`function`?t:ba(t);return this.select(function(){return this.insertBefore(n.apply(this,arguments),r.apply(this,arguments)||null)})}function qo(){var e=this.parentNode;e&&e.removeChild(this)}function Jo(){return this.each(qo)}function Yo(){var e=this.cloneNode(!1),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function Xo(){var e=this.cloneNode(!0),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function Zo(e){return this.select(e?Xo:Yo)}function Qo(e){return arguments.length?this.property(`__data__`,e):this.node().__data__}function $o(e){return function(t){e.call(this,t,this.__data__)}}function es(e){return e.trim().split(/^|\s+/).map(function(e){var t=``,n=e.indexOf(`.`);return n>=0&&(t=e.slice(n+1),e=e.slice(0,n)),{type:e,name:t}})}function ts(e){return function(){var t=this.__on;if(t){for(var n=0,r=-1,i=t.length,a;n<i;++n)a=t[n],(!e.type||a.type===e.type)&&a.name===e.name?this.removeEventListener(a.type,a.listener,a.options):t[++r]=a;++r?t.length=r:delete this.__on}}}function ns(e,t,n){return function(){var r=this.__on,i,a=$o(t);if(r){for(var o=0,s=r.length;o<s;++o)if((i=r[o]).type===e.type&&i.name===e.name){this.removeEventListener(i.type,i.listener,i.options),this.addEventListener(i.type,i.listener=a,i.options=n),i.value=t;return}}this.addEventListener(e.type,a,n),i={type:e.type,name:e.name,value:t,listener:a,options:n},r?r.push(i):this.__on=[i]}}function rs(e,t,n){var r=es(e+``),i,a=r.length,o;if(arguments.length<2){var s=this.node().__on;if(s){for(var c=0,l=s.length,u;c<l;++c)for(i=0,u=s[c];i<a;++i)if((o=r[i]).type===u.type&&o.name===u.name)return u.value}return}for(s=t?ns:ts,i=0;i<a;++i)this.each(s(r[i],t,n));return this}function is(e,t,n){var r=po(e),i=r.CustomEvent;typeof i==`function`?i=new i(t,n):(i=r.document.createEvent(`Event`),n?(i.initEvent(t,n.bubbles,n.cancelable),i.detail=n.detail):i.initEvent(t,!1,!1)),e.dispatchEvent(i)}function as(e,t){return function(){return is(this,e,t)}}function os(e,t){return function(){return is(this,e,t.apply(this,arguments))}}function ss(e,t){return this.each((typeof t==`function`?os:as)(e,t))}function*cs(){for(var e=this._groups,t=0,n=e.length;t<n;++t)for(var r=e[t],i=0,a=r.length,o;i<a;++i)(o=r[i])&&(yield o)}var ls=[null];function us(e,t){this._groups=e,this._parents=t}function ds(){return new us([[document.documentElement]],ls)}function fs(){return this}us.prototype=ds.prototype={constructor:us,select:xa,selectAll:Ea,selectChild:Ma,selectChildren:Ia,filter:La,data:Ga,enter:za,exit:qa,join:Ja,merge:Ya,selection:fs,order:Xa,sort:Za,call:$a,nodes:eo,node:to,size:no,empty:ro,each:io,attr:fo,style:_o,property:So,classed:jo,text:Fo,html:zo,raise:Vo,lower:Uo,append:Wo,insert:Ko,remove:Jo,clone:Zo,datum:Qo,on:rs,dispatch:ss,[Symbol.iterator]:cs};function ps(e,t,n){e.prototype=t.prototype=n,n.constructor=e}function ms(e,t){var n=Object.create(e.prototype);for(var r in t)n[r]=t[r];return n}function hs(){}var gs=.7,_s=1/gs,vs=`\\s*([+-]?\\d+)\\s*`,ys=`\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*`,bs=`\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*`,xs=/^#([0-9a-f]{3,8})$/,Ss=RegExp(`^rgb\\(${vs},${vs},${vs}\\)$`),Cs=RegExp(`^rgb\\(${bs},${bs},${bs}\\)$`),ws=RegExp(`^rgba\\(${vs},${vs},${vs},${ys}\\)$`),Ts=RegExp(`^rgba\\(${bs},${bs},${bs},${ys}\\)$`),Es=RegExp(`^hsl\\(${ys},${bs},${bs}\\)$`),Ds=RegExp(`^hsla\\(${ys},${bs},${bs},${ys}\\)$`),Os={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};ps(hs,Ns,{copy(e){return Object.assign(new this.constructor,this,e)},displayable(){return this.rgb().displayable()},hex:ks,formatHex:ks,formatHex8:As,formatHsl:js,formatRgb:Ms,toString:Ms});function ks(){return this.rgb().formatHex()}function As(){return this.rgb().formatHex8()}function js(){return Ks(this).formatHsl()}function Ms(){return this.rgb().formatRgb()}function Ns(e){var t,n;return e=(e+``).trim().toLowerCase(),(t=xs.exec(e))?(n=t[1].length,t=parseInt(t[1],16),n===6?Ps(t):n===3?new Rs(t>>8&15|t>>4&240,t>>4&15|t&240,(t&15)<<4|t&15,1):n===8?Fs(t>>24&255,t>>16&255,t>>8&255,(t&255)/255):n===4?Fs(t>>12&15|t>>8&240,t>>8&15|t>>4&240,t>>4&15|t&240,((t&15)<<4|t&15)/255):null):(t=Ss.exec(e))?new Rs(t[1],t[2],t[3],1):(t=Cs.exec(e))?new Rs(t[1]*255/100,t[2]*255/100,t[3]*255/100,1):(t=ws.exec(e))?Fs(t[1],t[2],t[3],t[4]):(t=Ts.exec(e))?Fs(t[1]*255/100,t[2]*255/100,t[3]*255/100,t[4]):(t=Es.exec(e))?Gs(t[1],t[2]/100,t[3]/100,1):(t=Ds.exec(e))?Gs(t[1],t[2]/100,t[3]/100,t[4]):Os.hasOwnProperty(e)?Ps(Os[e]):e===`transparent`?new Rs(NaN,NaN,NaN,0):null}function Ps(e){return new Rs(e>>16&255,e>>8&255,e&255,1)}function Fs(e,t,n,r){return r<=0&&(e=t=n=NaN),new Rs(e,t,n,r)}function Is(e){return e instanceof hs||(e=Ns(e)),e?(e=e.rgb(),new Rs(e.r,e.g,e.b,e.opacity)):new Rs}function Ls(e,t,n,r){return arguments.length===1?Is(e):new Rs(e,t,n,r??1)}function Rs(e,t,n,r){this.r=+e,this.g=+t,this.b=+n,this.opacity=+r}ps(Rs,Ls,ms(hs,{brighter(e){return e=e==null?_s:_s**+e,new Rs(this.r*e,this.g*e,this.b*e,this.opacity)},darker(e){return e=e==null?gs:gs**+e,new Rs(this.r*e,this.g*e,this.b*e,this.opacity)},rgb(){return this},clamp(){return new Rs(Us(this.r),Us(this.g),Us(this.b),Hs(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:zs,formatHex:zs,formatHex8:Bs,formatRgb:Vs,toString:Vs}));function zs(){return`#${Ws(this.r)}${Ws(this.g)}${Ws(this.b)}`}function Bs(){return`#${Ws(this.r)}${Ws(this.g)}${Ws(this.b)}${Ws((isNaN(this.opacity)?1:this.opacity)*255)}`}function Vs(){let e=Hs(this.opacity);return`${e===1?`rgb(`:`rgba(`}${Us(this.r)}, ${Us(this.g)}, ${Us(this.b)}${e===1?`)`:`, ${e})`}`}function Hs(e){return isNaN(e)?1:Math.max(0,Math.min(1,e))}function Us(e){return Math.max(0,Math.min(255,Math.round(e)||0))}function Ws(e){return e=Us(e),(e<16?`0`:``)+e.toString(16)}function Gs(e,t,n,r){return r<=0?e=t=n=NaN:n<=0||n>=1?e=t=NaN:t<=0&&(e=NaN),new Js(e,t,n,r)}function Ks(e){if(e instanceof Js)return new Js(e.h,e.s,e.l,e.opacity);if(e instanceof hs||(e=Ns(e)),!e)return new Js;if(e instanceof Js)return e;e=e.rgb();var t=e.r/255,n=e.g/255,r=e.b/255,i=Math.min(t,n,r),a=Math.max(t,n,r),o=NaN,s=a-i,c=(a+i)/2;return s?(o=t===a?(n-r)/s+(n<r)*6:n===a?(r-t)/s+2:(t-n)/s+4,s/=c<.5?a+i:2-a-i,o*=60):s=c>0&&c<1?0:o,new Js(o,s,c,e.opacity)}function qs(e,t,n,r){return arguments.length===1?Ks(e):new Js(e,t,n,r??1)}function Js(e,t,n,r){this.h=+e,this.s=+t,this.l=+n,this.opacity=+r}ps(Js,qs,ms(hs,{brighter(e){return e=e==null?_s:_s**+e,new Js(this.h,this.s,this.l*e,this.opacity)},darker(e){return e=e==null?gs:gs**+e,new Js(this.h,this.s,this.l*e,this.opacity)},rgb(){var e=this.h%360+(this.h<0)*360,t=isNaN(e)||isNaN(this.s)?0:this.s,n=this.l,r=n+(n<.5?n:1-n)*t,i=2*n-r;return new Rs(Zs(e>=240?e-240:e+120,i,r),Zs(e,i,r),Zs(e<120?e+240:e-120,i,r),this.opacity)},clamp(){return new Js(Ys(this.h),Xs(this.s),Xs(this.l),Hs(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){let e=Hs(this.opacity);return`${e===1?`hsl(`:`hsla(`}${Ys(this.h)}, ${Xs(this.s)*100}%, ${Xs(this.l)*100}%${e===1?`)`:`, ${e})`}`}}));function Ys(e){return e=(e||0)%360,e<0?e+360:e}function Xs(e){return Math.max(0,Math.min(1,e||0))}function Zs(e,t,n){return(e<60?t+(n-t)*e/60:e<180?n:e<240?t+(n-t)*(240-e)/60:t)*255}function Qs(e,t,n,r,i){var a=e*e,o=a*e;return((1-3*e+3*a-o)*t+(4-6*a+3*o)*n+(1+3*e+3*a-3*o)*r+o*i)/6}function $s(e){var t=e.length-1;return function(n){var r=n<=0?n=0:n>=1?(n=1,t-1):Math.floor(n*t),i=e[r],a=e[r+1],o=r>0?e[r-1]:2*i-a,s=r<t-1?e[r+2]:2*a-i;return Qs((n-r/t)*t,o,i,a,s)}}var ec=e=>()=>e;function tc(e,t){return function(n){return e+n*t}}function nc(e,t,n){return e**=+n,t=t**+n-e,n=1/n,function(r){return(e+r*t)**+n}}function rc(e){return(e=+e)==1?ic:function(t,n){return n-t?nc(t,n,e):ec(isNaN(t)?n:t)}}function ic(e,t){var n=t-e;return n?tc(e,n):ec(isNaN(e)?t:e)}var ac=(function e(t){var n=rc(t);function r(e,t){var r=n((e=Ls(e)).r,(t=Ls(t)).r),i=n(e.g,t.g),a=n(e.b,t.b),o=ic(e.opacity,t.opacity);return function(t){return e.r=r(t),e.g=i(t),e.b=a(t),e.opacity=o(t),e+``}}return r.gamma=e,r})(1);function oc(e){return function(t){var n=t.length,r=Array(n),i=Array(n),a=Array(n),o,s;for(o=0;o<n;++o)s=Ls(t[o]),r[o]=s.r||0,i[o]=s.g||0,a[o]=s.b||0;return r=e(r),i=e(i),a=e(a),s.opacity=1,function(e){return s.r=r(e),s.g=i(e),s.b=a(e),s+``}}}var sc=oc($s);function cc(e,t){return e=+e,t=+t,function(n){return e*(1-n)+t*n}}var lc=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,uc=new RegExp(lc.source,`g`);function dc(e){return function(){return e}}function fc(e){return function(t){return e(t)+``}}function pc(e,t){var n=lc.lastIndex=uc.lastIndex=0,r,i,a,o=-1,s=[],c=[];for(e+=``,t+=``;(r=lc.exec(e))&&(i=uc.exec(t));)(a=i.index)>n&&(a=t.slice(n,a),s[o]?s[o]+=a:s[++o]=a),(r=r[0])===(i=i[0])?s[o]?s[o]+=i:s[++o]=i:(s[++o]=null,c.push({i:o,x:cc(r,i)})),n=uc.lastIndex;return n<t.length&&(a=t.slice(n),s[o]?s[o]+=a:s[++o]=a),s.length<2?c[0]?fc(c[0].x):dc(t):(t=c.length,function(e){for(var n=0,r;n<t;++n)s[(r=c[n]).i]=r.x(e);return s.join(``)})}var mc=180/Math.PI,hc={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};function gc(e,t,n,r,i,a){var o,s,c;return(o=Math.sqrt(e*e+t*t))&&(e/=o,t/=o),(c=e*n+t*r)&&(n-=e*c,r-=t*c),(s=Math.sqrt(n*n+r*r))&&(n/=s,r/=s,c/=s),e*r<t*n&&(e=-e,t=-t,c=-c,o=-o),{translateX:i,translateY:a,rotate:Math.atan2(t,e)*mc,skewX:Math.atan(c)*mc,scaleX:o,scaleY:s}}var _c;function vc(e){let t=new(typeof DOMMatrix==`function`?DOMMatrix:WebKitCSSMatrix)(e+``);return t.isIdentity?hc:gc(t.a,t.b,t.c,t.d,t.e,t.f)}function yc(e){return e==null||(_c||=document.createElementNS(`http://www.w3.org/2000/svg`,`g`),_c.setAttribute(`transform`,e),!(e=_c.transform.baseVal.consolidate()))?hc:(e=e.matrix,gc(e.a,e.b,e.c,e.d,e.e,e.f))}function bc(e,t,n,r){function i(e){return e.length?e.pop()+` `:``}function a(e,r,i,a,o,s){if(e!==i||r!==a){var c=o.push(`translate(`,null,t,null,n);s.push({i:c-4,x:cc(e,i)},{i:c-2,x:cc(r,a)})}else (i||a)&&o.push(`translate(`+i+t+a+n)}function o(e,t,n,a){e===t?t&&n.push(i(n)+`rotate(`+t+r):(e-t>180?t+=360:t-e>180&&(e+=360),a.push({i:n.push(i(n)+`rotate(`,null,r)-2,x:cc(e,t)}))}function s(e,t,n,a){e===t?t&&n.push(i(n)+`skewX(`+t+r):a.push({i:n.push(i(n)+`skewX(`,null,r)-2,x:cc(e,t)})}function c(e,t,n,r,a,o){if(e!==n||t!==r){var s=a.push(i(a)+`scale(`,null,`,`,null,`)`);o.push({i:s-4,x:cc(e,n)},{i:s-2,x:cc(t,r)})}else (n!==1||r!==1)&&a.push(i(a)+`scale(`+n+`,`+r+`)`)}return function(t,n){var r=[],i=[];return t=e(t),n=e(n),a(t.translateX,t.translateY,n.translateX,n.translateY,r,i),o(t.rotate,n.rotate,r,i),s(t.skewX,n.skewX,r,i),c(t.scaleX,t.scaleY,n.scaleX,n.scaleY,r,i),t=n=null,function(e){for(var t=-1,n=i.length,a;++t<n;)r[(a=i[t]).i]=a.x(e);return r.join(``)}}}var xc=bc(vc,`px, `,`px)`,`deg)`),Sc=bc(yc,`, `,`)`,`)`),Cc=0,wc=0,Tc=0,Ec=1e3,Dc,Oc,kc=0,Ac=0,jc=0,Mc=typeof performance==`object`&&performance.now?performance:Date,Nc=typeof window==`object`&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(e){setTimeout(e,17)};function Pc(){return Ac||=(Nc(Fc),Mc.now()+jc)}function Fc(){Ac=0}function Ic(){this._call=this._time=this._next=null}Ic.prototype=Lc.prototype={constructor:Ic,restart:function(e,t,n){if(typeof e!=`function`)throw TypeError(`callback is not a function`);n=(n==null?Pc():+n)+(t==null?0:+t),!this._next&&Oc!==this&&(Oc?Oc._next=this:Dc=this,Oc=this),this._call=e,this._time=n,Hc()},stop:function(){this._call&&(this._call=null,this._time=1/0,Hc())}};function Lc(e,t,n){var r=new Ic;return r.restart(e,t,n),r}function Rc(){Pc(),++Cc;for(var e=Dc,t;e;)(t=Ac-e._time)>=0&&e._call.call(void 0,t),e=e._next;--Cc}function zc(){Ac=(kc=Mc.now())+jc,Cc=wc=0;try{Rc()}finally{Cc=0,Vc(),Ac=0}}function Bc(){var e=Mc.now(),t=e-kc;t>Ec&&(jc-=t,kc=e)}function Vc(){for(var e,t=Dc,n,r=1/0;t;)t._call?(r>t._time&&(r=t._time),e=t,t=t._next):(n=t._next,t._next=null,t=e?e._next=n:Dc=n);Oc=e,Hc(r)}function Hc(e){Cc||(wc&&=clearTimeout(wc),e-Ac>24?(e<1/0&&(wc=setTimeout(zc,e-Mc.now()-jc)),Tc&&=clearInterval(Tc)):(Tc||=(kc=Mc.now(),setInterval(Bc,Ec)),Cc=1,Nc(zc)))}function Uc(e,t,n){var r=new Ic;return t=t==null?0:+t,r.restart(n=>{r.stop(),e(n+t)},t,n),r}var Wc=la(`start`,`end`,`cancel`,`interrupt`),Gc=[];function Kc(e,t,n,r,i,a){var o=e.__transition;if(!o)e.__transition={};else if(n in o)return;Xc(e,n,{name:t,index:r,group:i,on:Wc,tween:Gc,time:a.time,delay:a.delay,duration:a.duration,ease:a.ease,timer:null,state:0})}function qc(e,t){var n=Yc(e,t);if(n.state>0)throw Error(`too late; already scheduled`);return n}function Jc(e,t){var n=Yc(e,t);if(n.state>3)throw Error(`too late; already running`);return n}function Yc(e,t){var n=e.__transition;if(!n||!(n=n[t]))throw Error(`transition not found`);return n}function Xc(e,t,n){var r=e.__transition,i;r[t]=n,n.timer=Lc(a,0,n.time);function a(e){n.state=1,n.timer.restart(o,n.delay,n.time),n.delay<=e&&o(e-n.delay)}function o(a){var l,u,d,f;if(n.state!==1)return c();for(l in r)if(f=r[l],f.name===n.name){if(f.state===3)return Uc(o);f.state===4?(f.state=6,f.timer.stop(),f.on.call(`interrupt`,e,e.__data__,f.index,f.group),delete r[l]):+l<t&&(f.state=6,f.timer.stop(),f.on.call(`cancel`,e,e.__data__,f.index,f.group),delete r[l])}if(Uc(function(){n.state===3&&(n.state=4,n.timer.restart(s,n.delay,n.time),s(a))}),n.state=2,n.on.call(`start`,e,e.__data__,n.index,n.group),n.state===2){for(n.state=3,i=Array(d=n.tween.length),l=0,u=-1;l<d;++l)(f=n.tween[l].value.call(e,e.__data__,n.index,n.group))&&(i[++u]=f);i.length=u+1}}function s(t){for(var r=t<n.duration?n.ease.call(null,t/n.duration):(n.timer.restart(c),n.state=5,1),a=-1,o=i.length;++a<o;)i[a].call(e,r);n.state===5&&(n.on.call(`end`,e,e.__data__,n.index,n.group),c())}function c(){for(var i in n.state=6,n.timer.stop(),delete r[t],r)return;delete e.__transition}}function Zc(e,t){var n=e.__transition,r,i,a=!0,o;if(n){for(o in t=t==null?null:t+``,n){if((r=n[o]).name!==t){a=!1;continue}i=r.state>2&&r.state<5,r.state=6,r.timer.stop(),r.on.call(i?`interrupt`:`cancel`,e,e.__data__,r.index,r.group),delete n[o]}a&&delete e.__transition}}function Qc(e){return this.each(function(){Zc(this,e)})}function $c(e,t){var n,r;return function(){var i=Jc(this,e),a=i.tween;if(a!==n){r=n=a;for(var o=0,s=r.length;o<s;++o)if(r[o].name===t){r=r.slice(),r.splice(o,1);break}}i.tween=r}}function el(e,t,n){var r,i;if(typeof n!=`function`)throw Error();return function(){var a=Jc(this,e),o=a.tween;if(o!==r){i=(r=o).slice();for(var s={name:t,value:n},c=0,l=i.length;c<l;++c)if(i[c].name===t){i[c]=s;break}c===l&&i.push(s)}a.tween=i}}function tl(e,t){var n=this._id;if(e+=``,arguments.length<2){for(var r=Yc(this.node(),n).tween,i=0,a=r.length,o;i<a;++i)if((o=r[i]).name===e)return o.value;return null}return this.each((t==null?$c:el)(n,e,t))}function nl(e,t,n){var r=e._id;return e.each(function(){var e=Jc(this,r);(e.value||={})[t]=n.apply(this,arguments)}),function(e){return Yc(e,r).value[t]}}function rl(e,t){var n;return(typeof t==`number`?cc:t instanceof Ns?ac:(n=Ns(t))?(t=n,ac):pc)(e,t)}function il(e){return function(){this.removeAttribute(e)}}function al(e){return function(){this.removeAttributeNS(e.space,e.local)}}function ol(e,t,n){var r,i=n+``,a;return function(){var o=this.getAttribute(e);return o===i?null:o===r?a:a=t(r=o,n)}}function sl(e,t,n){var r,i=n+``,a;return function(){var o=this.getAttributeNS(e.space,e.local);return o===i?null:o===r?a:a=t(r=o,n)}}function cl(e,t,n){var r,i,a;return function(){var o,s=n(this),c;return s==null?void this.removeAttribute(e):(o=this.getAttribute(e),c=s+``,o===c?null:o===r&&c===i?a:(i=c,a=t(r=o,s)))}}function ll(e,t,n){var r,i,a;return function(){var o,s=n(this),c;return s==null?void this.removeAttributeNS(e.space,e.local):(o=this.getAttributeNS(e.space,e.local),c=s+``,o===c?null:o===r&&c===i?a:(i=c,a=t(r=o,s)))}}function ul(e,t){var n=ha(e),r=n===`transform`?Sc:rl;return this.attrTween(e,typeof t==`function`?(n.local?ll:cl)(n,r,nl(this,`attr.`+e,t)):t==null?(n.local?al:il)(n):(n.local?sl:ol)(n,r,t))}function dl(e,t){return function(n){this.setAttribute(e,t.call(this,n))}}function fl(e,t){return function(n){this.setAttributeNS(e.space,e.local,t.call(this,n))}}function pl(e,t){var n,r;function i(){var i=t.apply(this,arguments);return i!==r&&(n=(r=i)&&fl(e,i)),n}return i._value=t,i}function ml(e,t){var n,r;function i(){var i=t.apply(this,arguments);return i!==r&&(n=(r=i)&&dl(e,i)),n}return i._value=t,i}function hl(e,t){var n=`attr.`+e;if(arguments.length<2)return(n=this.tween(n))&&n._value;if(t==null)return this.tween(n,null);if(typeof t!=`function`)throw Error();var r=ha(e);return this.tween(n,(r.local?pl:ml)(r,t))}function gl(e,t){return function(){qc(this,e).delay=+t.apply(this,arguments)}}function _l(e,t){return t=+t,function(){qc(this,e).delay=t}}function vl(e){var t=this._id;return arguments.length?this.each((typeof e==`function`?gl:_l)(t,e)):Yc(this.node(),t).delay}function yl(e,t){return function(){Jc(this,e).duration=+t.apply(this,arguments)}}function bl(e,t){return t=+t,function(){Jc(this,e).duration=t}}function xl(e){var t=this._id;return arguments.length?this.each((typeof e==`function`?yl:bl)(t,e)):Yc(this.node(),t).duration}function Sl(e,t){if(typeof t!=`function`)throw Error();return function(){Jc(this,e).ease=t}}function Cl(e){var t=this._id;return arguments.length?this.each(Sl(t,e)):Yc(this.node(),t).ease}function wl(e,t){return function(){var n=t.apply(this,arguments);if(typeof n!=`function`)throw Error();Jc(this,e).ease=n}}function Tl(e){if(typeof e!=`function`)throw Error();return this.each(wl(this._id,e))}function El(e){typeof e!=`function`&&(e=Da(e));for(var t=this._groups,n=t.length,r=Array(n),i=0;i<n;++i)for(var a=t[i],o=a.length,s=r[i]=[],c,l=0;l<o;++l)(c=a[l])&&e.call(c,c.__data__,l,a)&&s.push(c);return new tu(r,this._parents,this._name,this._id)}function Dl(e){if(e._id!==this._id)throw Error();for(var t=this._groups,n=e._groups,r=t.length,i=n.length,a=Math.min(r,i),o=Array(r),s=0;s<a;++s)for(var c=t[s],l=n[s],u=c.length,d=o[s]=Array(u),f,p=0;p<u;++p)(f=c[p]||l[p])&&(d[p]=f);for(;s<r;++s)o[s]=t[s];return new tu(o,this._parents,this._name,this._id)}function Ol(e){return(e+``).trim().split(/^|\s+/).every(function(e){var t=e.indexOf(`.`);return t>=0&&(e=e.slice(0,t)),!e||e===`start`})}function kl(e,t,n){var r,i,a=Ol(t)?qc:Jc;return function(){var o=a(this,e),s=o.on;s!==r&&(i=(r=s).copy()).on(t,n),o.on=i}}function Al(e,t){var n=this._id;return arguments.length<2?Yc(this.node(),n).on.on(e):this.each(kl(n,e,t))}function jl(e){return function(){var t=this.parentNode;for(var n in this.__transition)if(+n!==e)return;t&&t.removeChild(this)}}function Ml(){return this.on(`end.remove`,jl(this._id))}function Nl(e){var t=this._name,n=this._id;typeof e!=`function`&&(e=ba(e));for(var r=this._groups,i=r.length,a=Array(i),o=0;o<i;++o)for(var s=r[o],c=s.length,l=a[o]=Array(c),u,d,f=0;f<c;++f)(u=s[f])&&(d=e.call(u,u.__data__,f,s))&&(`__data__`in u&&(d.__data__=u.__data__),l[f]=d,Kc(l[f],t,n,f,l,Yc(u,n)));return new tu(a,this._parents,t,n)}function Pl(e){var t=this._name,n=this._id;typeof e!=`function`&&(e=wa(e));for(var r=this._groups,i=r.length,a=[],o=[],s=0;s<i;++s)for(var c=r[s],l=c.length,u,d=0;d<l;++d)if(u=c[d]){for(var f=e.call(u,u.__data__,d,c),p,m=Yc(u,n),h=0,g=f.length;h<g;++h)(p=f[h])&&Kc(p,t,n,h,f,m);a.push(f),o.push(u)}return new tu(a,o,t,n)}var Fl=ds.prototype.constructor;function Il(){return new Fl(this._groups,this._parents)}function Ll(e,t){var n,r,i;return function(){var a=vo(this,e),o=(this.style.removeProperty(e),vo(this,e));return a===o?null:a===n&&o===r?i:i=t(n=a,r=o)}}function Rl(e){return function(){this.style.removeProperty(e)}}function zl(e,t,n){var r,i=n+``,a;return function(){var o=vo(this,e);return o===i?null:o===r?a:a=t(r=o,n)}}function Bl(e,t,n){var r,i,a;return function(){var o=vo(this,e),s=n(this),c=s+``;return s??(c=s=(this.style.removeProperty(e),vo(this,e))),o===c?null:o===r&&c===i?a:(i=c,a=t(r=o,s))}}function Vl(e,t){var n,r,i,a=`style.`+t,o=`end.`+a,s;return function(){var c=Jc(this,e),l=c.on,u=c.value[a]==null?s||=Rl(t):void 0;(l!==n||i!==u)&&(r=(n=l).copy()).on(o,i=u),c.on=r}}function Hl(e,t,n){var r=(e+=``)==`transform`?xc:rl;return t==null?this.styleTween(e,Ll(e,r)).on(`end.style.`+e,Rl(e)):typeof t==`function`?this.styleTween(e,Bl(e,r,nl(this,`style.`+e,t))).each(Vl(this._id,e)):this.styleTween(e,zl(e,r,t),n).on(`end.style.`+e,null)}function Ul(e,t,n){return function(r){this.style.setProperty(e,t.call(this,r),n)}}function Wl(e,t,n){var r,i;function a(){var a=t.apply(this,arguments);return a!==i&&(r=(i=a)&&Ul(e,a,n)),r}return a._value=t,a}function Gl(e,t,n){var r=`style.`+(e+=``);if(arguments.length<2)return(r=this.tween(r))&&r._value;if(t==null)return this.tween(r,null);if(typeof t!=`function`)throw Error();return this.tween(r,Wl(e,t,n??``))}function Kl(e){return function(){this.textContent=e}}function ql(e){return function(){var t=e(this);this.textContent=t??``}}function Jl(e){return this.tween(`text`,typeof e==`function`?ql(nl(this,`text`,e)):Kl(e==null?``:e+``))}function Yl(e){return function(t){this.textContent=e.call(this,t)}}function Xl(e){var t,n;function r(){var r=e.apply(this,arguments);return r!==n&&(t=(n=r)&&Yl(r)),t}return r._value=e,r}function Zl(e){var t=`text`;if(arguments.length<1)return(t=this.tween(t))&&t._value;if(e==null)return this.tween(t,null);if(typeof e!=`function`)throw Error();return this.tween(t,Xl(e))}function Ql(){for(var e=this._name,t=this._id,n=ru(),r=this._groups,i=r.length,a=0;a<i;++a)for(var o=r[a],s=o.length,c,l=0;l<s;++l)if(c=o[l]){var u=Yc(c,t);Kc(c,e,n,l,o,{time:u.time+u.delay+u.duration,delay:0,duration:u.duration,ease:u.ease})}return new tu(r,this._parents,e,n)}function $l(){var e,t,n=this,r=n._id,i=n.size();return new Promise(function(a,o){var s={value:o},c={value:function(){--i===0&&a()}};n.each(function(){var n=Jc(this,r),i=n.on;i!==e&&(t=(e=i).copy(),t._.cancel.push(s),t._.interrupt.push(s),t._.end.push(c)),n.on=t}),i===0&&a()})}var eu=0;function tu(e,t,n,r){this._groups=e,this._parents=t,this._name=n,this._id=r}function nu(e){return ds().transition(e)}function ru(){return++eu}var iu=ds.prototype;tu.prototype=nu.prototype={constructor:tu,select:Nl,selectAll:Pl,selectChild:iu.selectChild,selectChildren:iu.selectChildren,filter:El,merge:Dl,selection:Il,transition:Ql,call:iu.call,nodes:iu.nodes,node:iu.node,size:iu.size,empty:iu.empty,each:iu.each,on:Al,attr:ul,attrTween:hl,style:Hl,styleTween:Gl,text:Jl,textTween:Zl,remove:Ml,tween:tl,delay:vl,duration:xl,ease:Cl,easeVarying:Tl,end:$l,[Symbol.iterator]:iu[Symbol.iterator]};function au(e){return((e*=2)<=1?e*e*e:(e-=2)*e*e+2)/2}var ou={time:null,delay:0,duration:250,ease:au};function su(e,t){for(var n;!(n=e.__transition)||!(n=n[t]);)if(!(e=e.parentNode))throw Error(`transition ${t} not found`);return n}function cu(e){var t,n;e instanceof tu?(t=e._id,e=e._name):(t=ru(),(n=ou).time=Pc(),e=e==null?null:e+``);for(var r=this._groups,i=r.length,a=0;a<i;++a)for(var o=r[a],s=o.length,c,l=0;l<s;++l)(c=o[l])&&Kc(c,e,t,l,o,n||su(c,t));return new tu(r,this._parents,e,t)}ds.prototype.interrupt=Qc,ds.prototype.transition=cu;var{abs:lu,max:uu,min:du}=Math;[`w`,`e`].map(fu),[`n`,`s`].map(fu),[`n`,`w`,`e`,`s`,`nw`,`ne`,`sw`,`se`].map(fu);function fu(e){return{type:e}}var pu=Math.PI,mu=2*pu,hu=1e-6,gu=mu-hu;function _u(e){this._+=e[0];for(let t=1,n=e.length;t<n;++t)this._+=arguments[t]+e[t]}function vu(e){let t=Math.floor(e);if(!(t>=0))throw Error(`invalid digits: ${e}`);if(t>15)return _u;let n=10**t;return function(e){this._+=e[0];for(let t=1,r=e.length;t<r;++t)this._+=Math.round(arguments[t]*n)/n+e[t]}}var yu=class{constructor(e){this._x0=this._y0=this._x1=this._y1=null,this._=``,this._append=e==null?_u:vu(e)}moveTo(e,t){this._append`M${this._x0=this._x1=+e},${this._y0=this._y1=+t}`}closePath(){this._x1!==null&&(this._x1=this._x0,this._y1=this._y0,this._append`Z`)}lineTo(e,t){this._append`L${this._x1=+e},${this._y1=+t}`}quadraticCurveTo(e,t,n,r){this._append`Q${+e},${+t},${this._x1=+n},${this._y1=+r}`}bezierCurveTo(e,t,n,r,i,a){this._append`C${+e},${+t},${+n},${+r},${this._x1=+i},${this._y1=+a}`}arcTo(e,t,n,r,i){if(e=+e,t=+t,n=+n,r=+r,i=+i,i<0)throw Error(`negative radius: ${i}`);let a=this._x1,o=this._y1,s=n-e,c=r-t,l=a-e,u=o-t,d=l*l+u*u;if(this._x1===null)this._append`M${this._x1=e},${this._y1=t}`;else if(d>hu)if(!(Math.abs(u*s-c*l)>hu)||!i)this._append`L${this._x1=e},${this._y1=t}`;else{let f=n-a,p=r-o,m=s*s+c*c,h=f*f+p*p,g=Math.sqrt(m),_=Math.sqrt(d),v=i*Math.tan((pu-Math.acos((m+d-h)/(2*g*_)))/2),y=v/_,b=v/g;Math.abs(y-1)>hu&&this._append`L${e+y*l},${t+y*u}`,this._append`A${i},${i},0,0,${+(u*f>l*p)},${this._x1=e+b*s},${this._y1=t+b*c}`}}arc(e,t,n,r,i,a){if(e=+e,t=+t,n=+n,a=!!a,n<0)throw Error(`negative radius: ${n}`);let o=n*Math.cos(r),s=n*Math.sin(r),c=e+o,l=t+s,u=1^a,d=a?r-i:i-r;this._x1===null?this._append`M${c},${l}`:(Math.abs(this._x1-c)>hu||Math.abs(this._y1-l)>hu)&&this._append`L${c},${l}`,n&&(d<0&&(d=d%mu+mu),d>gu?this._append`A${n},${n},0,1,${u},${e-o},${t-s}A${n},${n},0,1,${u},${this._x1=c},${this._y1=l}`:d>hu&&this._append`A${n},${n},0,${+(d>=pu)},${u},${this._x1=e+n*Math.cos(i)},${this._y1=t+n*Math.sin(i)}`)}rect(e,t,n,r){this._append`M${this._x0=this._x1=+e},${this._y0=this._y1=+t}h${n=+n}v${+r}h${-n}Z`}toString(){return this._}};function bu(){return new yu}bu.prototype=yu.prototype;function xu(e,t){switch(arguments.length){case 0:break;case 1:this.range(e);break;default:this.range(t).domain(e);break}return this}var Su=Symbol(`implicit`);function Cu(){var e=new ra,t=[],n=[],r=Su;function i(i){let a=e.get(i);if(a===void 0){if(r!==Su)return r;e.set(i,a=t.push(i)-1)}return n[a%n.length]}return i.domain=function(n){if(!arguments.length)return t.slice();t=[],e=new ra;for(let r of n)e.has(r)||e.set(r,t.push(r)-1);return i},i.range=function(e){return arguments.length?(n=Array.from(e),i):n.slice()},i.unknown=function(e){return arguments.length?(r=e,i):r},i.copy=function(){return Cu(t,n).unknown(r)},xu.apply(i,arguments),i}function wu(e){for(var t=e.length/6|0,n=Array(t),r=0;r<t;)n[r]=`#`+e.slice(r*6,++r*6);return n}var Tu=e=>sc(e[e.length-1]),Eu=[,,,`fc8d59ffffbf99d594`,`d7191cfdae61abdda42b83ba`,`d7191cfdae61ffffbfabdda42b83ba`,`d53e4ffc8d59fee08be6f59899d5943288bd`,`d53e4ffc8d59fee08bffffbfe6f59899d5943288bd`,`d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd`,`d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd`,`9e0142d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd5e4fa2`,`9e0142d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd5e4fa2`].map(wu);Tu(Eu);function Du(e){return function(){return e}}var Ou=Math.abs,$=Math.atan2,ku=Math.cos,Au=Math.max,ju=Math.min,Mu=Math.sin,Nu=Math.sqrt,Pu=Math.PI,Fu=Pu/2,Iu=2*Pu;function Lu(e){return e>1?0:e<-1?Pu:Math.acos(e)}function Ru(e){return e>=1?Fu:e<=-1?-Fu:Math.asin(e)}function zu(e){let t=3;return e.digits=function(n){if(!arguments.length)return t;if(n==null)t=null;else{let e=Math.floor(n);if(!(e>=0))throw RangeError(`invalid digits: ${n}`);t=e}return e},()=>new yu(t)}function Bu(e){return e.innerRadius}function Vu(e){return e.outerRadius}function Hu(e){return e.startAngle}function Uu(e){return e.endAngle}function Wu(e){return e&&e.padAngle}function Gu(e,t,n,r,i,a,o,s){var c=n-e,l=r-t,u=o-i,d=s-a,f=d*c-u*l;if(!(f*f<1e-12))return f=(u*(t-a)-d*(e-i))/f,[e+f*c,t+f*l]}function Ku(e,t,n,r,i,a,o){var s=e-n,c=t-r,l=(o?a:-a)/Nu(s*s+c*c),u=l*c,d=-l*s,f=e+u,p=t+d,m=n+u,h=r+d,g=(f+m)/2,_=(p+h)/2,v=m-f,y=h-p,b=v*v+y*y,x=i-a,S=f*h-m*p,C=(y<0?-1:1)*Nu(Au(0,x*x*b-S*S)),w=(S*y-v*C)/b,T=(-S*v-y*C)/b,E=(S*y+v*C)/b,D=(-S*v+y*C)/b,O=w-g,k=T-_,A=E-g,j=D-_;return O*O+k*k>A*A+j*j&&(w=E,T=D),{cx:w,cy:T,x01:-u,y01:-d,x11:w*(i/x-1),y11:T*(i/x-1)}}function qu(){var e=Bu,t=Vu,n=Du(0),r=null,i=Hu,a=Uu,o=Wu,s=null,c=zu(l);function l(){var l,u,d=+e.apply(this,arguments),f=+t.apply(this,arguments),p=i.apply(this,arguments)-Fu,m=a.apply(this,arguments)-Fu,h=Ou(m-p),g=m>p;if(s||=l=c(),f<d&&(u=f,f=d,d=u),!(f>1e-12))s.moveTo(0,0);else if(h>Iu-1e-12)s.moveTo(f*ku(p),f*Mu(p)),s.arc(0,0,f,p,m,!g),d>1e-12&&(s.moveTo(d*ku(m),d*Mu(m)),s.arc(0,0,d,m,p,g));else{var _=p,v=m,y=p,b=m,x=h,S=h,C=o.apply(this,arguments)/2,w=C>1e-12&&(r?+r.apply(this,arguments):Nu(d*d+f*f)),T=ju(Ou(f-d)/2,+n.apply(this,arguments)),E=T,D=T,O,k;if(w>1e-12){var A=Ru(w/d*Mu(C)),j=Ru(w/f*Mu(C));(x-=A*2)>1e-12?(A*=g?1:-1,y+=A,b-=A):(x=0,y=b=(p+m)/2),(S-=j*2)>1e-12?(j*=g?1:-1,_+=j,v-=j):(S=0,_=v=(p+m)/2)}var M=f*ku(_),N=f*Mu(_),ee=d*ku(b),te=d*Mu(b);if(T>1e-12){var P=f*ku(v),F=f*Mu(v),ne=d*ku(y),I=d*Mu(y),L;if(h<Pu)if(L=Gu(M,N,ne,I,P,F,ee,te)){var R=M-L[0],z=N-L[1],B=P-L[0],V=F-L[1],H=1/Mu(Lu((R*B+z*V)/(Nu(R*R+z*z)*Nu(B*B+V*V)))/2),re=Nu(L[0]*L[0]+L[1]*L[1]);E=ju(T,(d-re)/(H-1)),D=ju(T,(f-re)/(H+1))}else E=D=0}S>1e-12?D>1e-12?(O=Ku(ne,I,M,N,f,D,g),k=Ku(P,F,ee,te,f,D,g),s.moveTo(O.cx+O.x01,O.cy+O.y01),D<T?s.arc(O.cx,O.cy,D,$(O.y01,O.x01),$(k.y01,k.x01),!g):(s.arc(O.cx,O.cy,D,$(O.y01,O.x01),$(O.y11,O.x11),!g),s.arc(0,0,f,$(O.cy+O.y11,O.cx+O.x11),$(k.cy+k.y11,k.cx+k.x11),!g),s.arc(k.cx,k.cy,D,$(k.y11,k.x11),$(k.y01,k.x01),!g))):(s.moveTo(M,N),s.arc(0,0,f,_,v,!g)):s.moveTo(M,N),!(d>1e-12)||!(x>1e-12)?s.lineTo(ee,te):E>1e-12?(O=Ku(ee,te,P,F,d,-E,g),k=Ku(M,N,ne,I,d,-E,g),s.lineTo(O.cx+O.x01,O.cy+O.y01),E<T?s.arc(O.cx,O.cy,E,$(O.y01,O.x01),$(k.y01,k.x01),!g):(s.arc(O.cx,O.cy,E,$(O.y01,O.x01),$(O.y11,O.x11),!g),s.arc(0,0,d,$(O.cy+O.y11,O.cx+O.x11),$(k.cy+k.y11,k.cx+k.x11),g),s.arc(k.cx,k.cy,E,$(k.y11,k.x11),$(k.y01,k.x01),!g))):s.arc(0,0,d,b,y,g)}if(s.closePath(),l)return s=null,l+``||null}return l.centroid=function(){var n=(+e.apply(this,arguments)+ +t.apply(this,arguments))/2,r=(+i.apply(this,arguments)+ +a.apply(this,arguments))/2-Pu/2;return[ku(r)*n,Mu(r)*n]},l.innerRadius=function(t){return arguments.length?(e=typeof t==`function`?t:Du(+t),l):e},l.outerRadius=function(e){return arguments.length?(t=typeof e==`function`?e:Du(+e),l):t},l.cornerRadius=function(e){return arguments.length?(n=typeof e==`function`?e:Du(+e),l):n},l.padRadius=function(e){return arguments.length?(r=e==null?null:typeof e==`function`?e:Du(+e),l):r},l.startAngle=function(e){return arguments.length?(i=typeof e==`function`?e:Du(+e),l):i},l.endAngle=function(e){return arguments.length?(a=typeof e==`function`?e:Du(+e),l):a},l.padAngle=function(e){return arguments.length?(o=typeof e==`function`?e:Du(+e),l):o},l.context=function(e){return arguments.length?(s=e??null,l):s},l}Array.prototype.slice;function Ju(e){return typeof e==`object`&&`length`in e?e:Array.from(e)}function Yu(e,t){return t<e?-1:t>e?1:t>=e?0:NaN}function Xu(e){return e}function Zu(){var e=Xu,t=Yu,n=null,r=Du(0),i=Du(Iu),a=Du(0);function o(o){var s,c=(o=Ju(o)).length,l,u,d=0,f=Array(c),p=Array(c),m=+r.apply(this,arguments),h=Math.min(Iu,Math.max(-Iu,i.apply(this,arguments)-m)),g,_=Math.min(Math.abs(h)/c,a.apply(this,arguments)),v=_*(h<0?-1:1),y;for(s=0;s<c;++s)(y=p[f[s]=s]=+e(o[s],s,o))>0&&(d+=y);for(t==null?n!=null&&f.sort(function(e,t){return n(o[e],o[t])}):f.sort(function(e,n){return t(p[e],p[n])}),s=0,u=d?(h-c*v)/d:0;s<c;++s,m=g)l=f[s],y=p[l],g=m+(y>0?y*u:0)+v,p[l]={data:o[l],index:s,value:y,startAngle:m,endAngle:g,padAngle:_};return p}return o.value=function(t){return arguments.length?(e=typeof t==`function`?t:Du(+t),o):e},o.sortValues=function(e){return arguments.length?(t=e,n=null,o):t},o.sort=function(e){return arguments.length?(n=e,t=null,o):n},o.startAngle=function(e){return arguments.length?(r=typeof e==`function`?e:Du(+e),o):r},o.endAngle=function(e){return arguments.length?(i=typeof e==`function`?e:Du(+e),o):i},o.padAngle=function(e){return arguments.length?(a=typeof e==`function`?e:Du(+e),o):a},o}function Qu(e,t,n){this.k=e,this.x=t,this.y=n}Qu.prototype={constructor:Qu,scale:function(e){return e===1?this:new Qu(this.k*e,this.x,this.y)},translate:function(e,t){return e===0&t===0?this:new Qu(this.k,this.x+this.k*e,this.y+this.k*t)},apply:function(e){return[e[0]*this.k+this.x,e[1]*this.k+this.y]},applyX:function(e){return e*this.k+this.x},applyY:function(e){return e*this.k+this.y},invert:function(e){return[(e[0]-this.x)/this.k,(e[1]-this.y)/this.k]},invertX:function(e){return(e-this.x)/this.k},invertY:function(e){return(e-this.y)/this.k},rescaleX:function(e){return e.copy().domain(e.range().map(this.invertX,this).map(e.invert,e))},rescaleY:function(e){return e.copy().domain(e.range().map(this.invertY,this).map(e.invert,e))},toString:function(){return`translate(`+this.x+`,`+this.y+`) scale(`+this.k+`)`}};var $u=new Qu(1,0,0);ed.prototype=Qu.prototype;function ed(e){for(;!e.__zoom;)if(!(e=e.parentNode))return $u;return e.__zoom}var td={width:`200`,height:`200`,viewBox:`-100 -100 200 200`,style:{"max-width":`100%`,height:`auto`,font:`10px sans-serif`,margin:`15px`}},nd=[`d`,`fill`],rd={"text-anchor":`middle`},id=[`transform`],ad={"font-weight":`bold`,y:`-0.4em`},od={key:0,x:`0`,y:`0.7em`,"fill-opacity":`0.7`},sd=1e3,cd=5,ld=(200/2-1)*.75,ud=w({__name:`Analyzers`,props:{initStatus:{},actions:{},collectableShopRefine:{}},setup(r){let i=r,a=Wt(),{$t:o}=At(),c=t(),l=t(!1),u=oe(a.options.analyzerOptions),f=t(),p=t(),m=t(),h=t(),g=t(!1),_=t([]);async function v(e){c.value=void 0,l.value=!0,p.value=void 0;try{i.collectableShopRefine==null?c.value=await ea(i.initStatus,i.actions,e,u.ignoreErrors):c.value=await ta(i.initStatus,i.actions,e,u.ignoreErrors,i.collectableShopRefine)}catch(e){p.value=Ue(e,o)}finally{l.value=!1}}async function y(){m.value=void 0;try{f.value=await na(i.initStatus,i.actions)}catch(e){m.value=Ue(e,o)}}async function b(){h.value=void 0;try{let e=await Ct(i.initStatus,i.actions),t=[{step:i.initStatus.step,progress:i.initStatus.progress,quality:i.initStatus.quality,craft_points:i.initStatus.craft_points,durability:i.initStatus.durability,buffs:i.initStatus.buffs}];for(let n in i.actions)if(`Err`in e[n]){let r=e[n].Err;t.push({step:NaN,action:i.actions[n],progress:NaN,quality:NaN,craft_points:NaN,durability:NaN,error:r})}else if(`Ok`in e[n]){let r=e[n].Ok;t.push({step:r.step,action:i.actions[n],progress:r.progress,quality:r.quality,craft_points:r.craft_points,durability:r.durability,buffs:r.buffs})}_.value=t,g.value=!0}catch(e){h.value=Ue(e,o)}}function x(e){if(e.row.error!==void 0){if(e.columnIndex==2)return[1,5];if(e.columnIndex>2)return[0,0]}}let C=null;A(()=>[i.actions,i.initStatus],()=>{C!==null&&clearTimeout(C);let e=setTimeout(async()=>{await v(sd),await y(),C===e&&(C=null)},200);C=e});let w=qu().innerRadius(50).outerRadius(200/2-1),T=Zu().sort(null).value(e=>e[1]),E=Cu().domain([`errors`,`unfinished`,`fails`,`normal`,`highqual`,`no_collectability`,`low_collectability`,`middle_collectability`,`high_collectability`]).range(Eu[9]).unknown(`var(--el-border-color)`),D=F(()=>{let e=c.value;if(e!=null)return T(Object.entries(e).filter(e=>e[1]>0))}),k=qu().innerRadius(ld).outerRadius(ld);return(t,r)=>(s(),O(e(Oe),null,{default:j(()=>[n(e(G),{label:e(o)(`ignore-errors`)},{default:j(()=>[n(e(lt),{modelValue:u.ignoreErrors,"onUpdate:modelValue":r[0]||=e=>u.ignoreErrors=e},null,8,[`modelValue`])]),_:1},8,[`label`]),n(e(G),null,{default:j(()=>[n(e(or),{"split-button":``,type:`default`,onClick:r[1]||=e=>v(sd),onCommand:r[2]||=e=>v(e),disabled:l.value},{dropdown:j(()=>[n(e(cr),null,{default:j(()=>[(s(),W(V,null,d(cd,t=>n(e(sr),{command:10**t},{default:j(()=>[S(B(e(o)(`run-n-times`,{n:10**t})),1)]),_:2},1032,[`command`])),64))]),_:1})]),default:j(()=>[S(B(e(o)(`run-simulations`))+` `,1)]),_:1},8,[`disabled`])]),_:1}),p.value?(s(),O(e(G),{key:0},{default:j(()=>[n(Je,{message:p.value,onRetry:r[3]||=e=>v(sd)},null,8,[`message`])]),_:1})):U(``,!0),n(Xt,null,{default:j(()=>[c.value?(s(),O(e(G),{key:0},{default:j(()=>[(s(),W(`svg`,td,[P(`g`,null,[(s(!0),W(V,null,d(D.value,t=>(s(),W(`path`,{d:e(w)(t)??void 0,fill:e(E)(t.data[0]),stroke:`var(--el-bg-color)`},[P(`title`,null,B(e(o)(t.data[0])+`×`+t.data[1]),1)],8,nd))),256))]),P(`g`,rd,[(s(!0),W(V,null,d(D.value,t=>(s(),W(`text`,{transform:`translate(${e(k).centroid(t)})`},[P(`tspan`,ad,B(e(o)(t.data[0])),1),t.endAngle-t.startAngle>.1?(s(),W(`tspan`,od,B(t.data[1]),1)):U(``,!0)],8,id))),256))])])),c.value?(s(),O(e(me),{key:0,column:1,border:``},{default:j(()=>[(s(!0),W(V,null,d(Object.entries(c.value).sort((e,t)=>t[1]-e[1]),([t,n])=>(s(),O(e(pe),{label:e(o)(t)},{default:j(()=>[S(B(n),1)]),_:2},1032,[`label`]))),256))]),_:1})):U(``,!0)]),_:1})):U(``,!0)]),_:1}),n(e(Be)),n(e(G),null,{default:j(()=>[n(e(K),{onClick:y},{default:j(()=>[S(B(e(o)(`calc-scope`)),1)]),_:1})]),_:1}),m.value?(s(),O(e(G),{key:1},{default:j(()=>[n(Je,{message:m.value,onRetry:r[4]||=e=>y()},null,8,[`message`])]),_:1})):U(``,!0),n(Xt,null,{default:j(()=>[f.value?.craftsmanship_range?(s(),O(e(G),{key:0,label:e(o)(`craftsmanship-range`)},{default:j(()=>[S(B(f.value.craftsmanship_range[0]??``)+` ~ `+B(f.value.craftsmanship_range[1]??``),1)]),_:1},8,[`label`])):U(``,!0)]),_:1}),n(Xt,null,{default:j(()=>[f.value?.control_range?(s(),O(e(G),{key:0,label:e(o)(`control-range`)},{default:j(()=>[S(` ≥ `+B(f.value.control_range),1)]),_:1},8,[`label`])):U(``,!0)]),_:1}),n(Xt,null,{default:j(()=>[f.value?.craft_points?(s(),O(e(G),{key:0,label:e(o)(`craft-point`)},{default:j(()=>[S(` ≥ `+B(f.value.craft_points),1)]),_:1},8,[`label`])):U(``,!0)]),_:1}),n(e(Be)),n(e(G),null,{default:j(()=>[n(e(K),{onClick:b},{default:j(()=>[S(B(e(o)(`check-simulate-detail`)),1)]),_:1}),n(e(ln),{modelValue:g.value,"onUpdate:modelValue":r[5]||=e=>g.value=e,direction:`btt`,size:`80%`,title:e(o)(`check-simulate-detail`)},{default:j(()=>[n(e(Re),null,{default:j(()=>[n(e(Ee),{data:_.value,"span-method":x},{default:j(()=>[n(e(we),{label:e(o)(`steps`),prop:`step`,width:`80px`,align:`center`},null,8,[`label`]),n(e(we),{label:e(o)(`action`),prop:`action`,width:`100px`,align:`center`},{default:j(({row:e})=>[e.action===void 0?U(``,!0):(s(),O(Ze,{key:0,style:{transform:`scale(0.7)`},action:e.action,effect:e.error?`black`:`normal`,noHover:``,disabled:``},null,8,[`action`,`effect`]))]),_:1},8,[`label`]),n(e(we),{label:e(o)(`durability`),prop:`durability`},{default:j(({row:t})=>[t.error===void 0?(s(),W(V,{key:0},[S(B(t.durability),1)],64)):(s(),W(V,{key:1},[S(B(e(o)(t.error)),1)],64))]),_:1},8,[`label`]),n(e(we),{label:e(o)(`craft-point`),prop:`craft_points`},null,8,[`label`]),n(e(we),{label:e(o)(`progress`),prop:`progress`},null,8,[`label`]),n(e(we),{label:e(o)(`quality`),prop:`quality`},null,8,[`label`]),n(e(we),{label:e(o)(`buffs`),prop:`buffs`},{default:j(({row:e})=>[e.buffs===void 0?U(``,!0):(s(),O($e,{key:0,buffs:e.buffs},null,8,[`buffs`]))]),_:1},8,[`label`])]),_:1},8,[`data`])]),_:1})]),_:1},8,[`modelValue`,`title`])]),_:1}),h.value?(s(),O(e(G),{key:2},{default:j(()=>[n(Je,{message:h.value,onRetry:r[6]||=e=>b()},null,8,[`message`])]),_:1})):U(``,!0)]),_:1}))}});function dd(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`zh-CN`]=new Z(`run-simulations = 运行仿真
run-n-times = 运行 { $n } 次仿真
action-queue = 技能队列
ignore-errors = 忽略错误

empty = 空

errors = 错误
unfinished = 未完成
fails = 失败
normal = 普通品质
highqual = 高品质

no_collectability = 无收藏价值
low_collectability = 收藏价值一档
middle_collectability = 收藏价值二档
high_collectability = 收藏价值三档

calc-scope = 计算装备属性适配范围
craftsmanship-range = { craftsmanship }范围
control-range = { control }范围

check-simulate-detail = 检查模拟细节
action = 技能
buffs = 增益效果`)}function fd(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`zh-TW`]=new Z(`run-simulations = 執行模擬
run-n-times = 執行 { $n } 次模擬
action-queue = 技能佇列
ignore-errors = 忽略錯誤

empty = 空

errors = 錯誤
unfinished = 未完成
fails = 失敗
normal = 普通品質
highqual = 高品質

no_collectability = 無收藏價值
low_collectability = 收藏價值一檔
middle_collectability = 收藏價值二檔
high_collectability = 收藏價值三檔

calc-scope = 計算裝備屬性適配範圍
craftsmanship-range = { craftsmanship }範圍
control-range = { control }範圍

check-simulate-detail = 檢查模擬細節
action = 技能
buffs = 增益效果`)}function pd(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`en-US`]=new Z(`run-simulations = Run simulations
run-n-times = Run simulation { $n } times
action-queue = Action Queue
ignore-errors = Ignore errors

empty = Empty

errors = Errors
unfinished = Unfinished
fails = Fails
normal = Normal
highqual = High-quality

no_collectability = No Collectability
low_collectability = Low Collectability
middle_collectability = Middle Collectability
high_collectability = High Collectability

calc-scope = Calculate the range of adaptive gearsets
craftsmanship-range = { craftsmanship } range
control-range = { control } range

check-simulate-detail = Check simulate detail
action = Action
buffs = Buffs`)}function md(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`ja-JP`]=new Z(`run-simulations = シミュレーション実行
run-n-times = { $n } 回シミュレーション実行
action-queue = アクションキュー
ignore-errors = エラーを無視

empty = 空

errors = エラー
unfinished = 未完成
fails = 失敗
normal = 通常品質
highqual = 高品質

no_collectability = 収集価値なし
low_collectability = 収集価値1段階
middle_collectability = 収集価値2段階
high_collectability = 収集価値3段階

calc-scope = 装備属性の適応範囲を計算
craftsmanship-range = { craftsmanship }範囲
control-range = { control }範囲

check-simulate-detail = シミュレーション詳細を確認
action = アクション
buffs = バフ`)}typeof dd==`function`&&dd(ud),typeof fd==`function`&&fd(ud),typeof pd==`function`&&pd(ud),typeof md==`function`&&md(ud);var hd=Kt(ud,[[`__scopeId`,`data-v-0d02c46a`]]),gd=w({__name:`MarcoInfo`,props:{seq:{},status:{}},setup(t){let r=t,i=F(()=>{let e=r.seq.slots.length;return e<=15?`success`:e<=30?`warning`:`danger`}),a=F(()=>{let e=r.seq.slots.map(e=>e.action);return{macro:It(...e),manual:Lt(...e)}});return(t,o)=>(s(),O(e(q),null,{default:j(()=>[n(e(xe),{round:``,type:i.value},{default:j(()=>[S(B(t.$t(`macro-length-tag`,{length:r.seq.slots.length})),1)]),_:1},8,[`type`]),n(e(xe),{round:``,type:`info`},{default:j(()=>[S(B(t.$t(`steps-tag`,{steps:r.status.step})),1)]),_:1}),n(e(xe),{round:``,type:`info`},{default:j(()=>[S(B(t.$t(`macro-duration-tag`,{duration:e(Qt)(a.value.macro*1e3,0)})),1)]),_:1}),n(e(xe),{round:``,type:`info`},{default:j(()=>[S(B(t.$t(`manual-duration-tag`,{duration:e(Qt)(a.value.manual*1e3,1)})),1)]),_:1})]),_:1}))}});function _d(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`zh-CN`]=new Z(`macro-length-tag = 宏长度：{ $length }
steps-tag = { steps }：{ $steps }
macro-duration-tag = 宏耗时：{ $duration }
manual-duration-tag = 手搓耗时：{ $duration }`)}function vd(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`zh-TW`]=new Z(`macro-length-tag = 巨集長度：{ $length }
steps-tag = { steps }：{ $steps }
macro-duration-tag = 巨集耗時：{ $duration }
manual-duration-tag = 手搓耗時：{ $duration }`)}function yd(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`en-US`]=new Z(`macro-length-tag = Macro Length: { $length }
steps-tag = { steps }: { $steps }
macro-duration-tag = Macro Duration: { $duration }
manual-duration-tag = Manual Duration: { $duration }`)}function bd(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`ja-JP`]=new Z(`macro-length-tag = マクロ長：{ $length }
steps-tag = { steps }：{ $steps }
macro-duration-tag = マクロ所要時間：{ $duration }
manual-duration-tag = 手動所要時間：{ $duration }`)}typeof _d==`function`&&_d(gd),typeof vd==`function`&&vd(gd),typeof yd==`function`&&yd(gd),typeof bd==`function`&&bd(gd);var xd=gd,Sd={key:1,class:`main-page`},Cd={class:`crafting-alerts`},wd={class:`above-panel`},Td={class:`above-right-panel`,style:{overflow:`hidden`}},Ed={class:`solver-tab-content`},Dd=5,Od=`solver-list`,kd=w({__name:`Designer`,props:{recipe:{},recipeId:{},requirements:{},collectableShopRefine:{},item:{},materialQualityFactor:{},isCustomRecipe:{type:Boolean}},async setup(r){let i,a,o=r,c=Wt(),{$t:l}=At(),u=L(st),d=ae(`screen and (max-width: 480px)`);A(d,e=>{!e&&te.value==`action-panel`&&(te.value=Od)});let p=t(),{height:m}=ce(p),{gearsetId:h,gearsetRow:g,gearsetName:_,attributes:v,gearsetIdModel:y,selectGearset:b,compatibleGearsets:x}=nt(F(()=>o.isCustomRecipe?void 0:u.value)),S=t([]),C=F(()=>We(v.value,...S.value));var w=F(()=>{let{required_craftsmanship:e,required_control:t}=o.requirements,{craftsmanship:n,control:r}=C.value,i=[];e>n&&i.push(l(`craftsmanship`)),t>r&&i.push(l(`control`));let a=i.length;if(a>0){let n=i[0];return a>1&&(n=l(`and`,{a:i[0],b:i[1]})),{title:l(`attributes-do-not-meet-the-requirements`,{num:a,attribute:n}),descryption:l(`attributes-requirements`,{craftsmanship:e,control:t})}}});let T=F(()=>{let e=o.recipe.job_level,t=C.value.level;return e>t+Dd?{need:e,have:t}:void 0});function E(e,t){let n=t.job_level-Dd;return e.level>=n?e:{...e,level:n}}function k(e){g.value.value.level=e}let M=t(0),N=t(!1),ee=t(!1),te=t(Od),ne=null;A(M,(e,t)=>{e>0?t==0&&(ne=setTimeout(()=>{N.value=!0},500)):t>0&&(ne&&clearTimeout(ne),N.value=!1)});let I=t(0),R=t({...([i,a]=re(()=>jt(E(C.value,o.recipe),o.recipe,c.content?.stellarSteadyHandCount??0)),i=await i,a(),i),quality:I.value});A([o,C,I],async([e,t,n])=>{R.value={...await jt(E(t,e.recipe),e.recipe,c.content?.stellarSteadyHandCount??0),quality:n}});let z=oe({slots:[],maxid:0}),B=t();Yt(R.value,[]).then(e=>B.value=e).catch(e=>J.error(Ue(e,l))),f(ct,t(z));let V=F(()=>z.slots.map(e=>e.action)),se=F(()=>ee.value&&fe.slots.length>0?fe.slots.map(e=>e.action):z.slots.map(e=>e.action));function le(e){z.slots.push(ie({id:z.maxid++,action:e}))}function ue(e){let t=z.slots.length;z.slots.splice(0,t,...e.slots),z.maxid=e.maxid}function de(e){let t=e.map((e,t)=>({id:t,action:e}));ue({slots:t,maxid:t.length})}let fe=oe({slots:[],maxid:0}),pe=t();A(R,he),A(R,async e=>{try{B.value=await Yt(e,V.value)}catch(e){J.error(Ue(e,l))}}),A(V,async e=>{try{B.value=await Yt(R.value,e)}catch(e){J.error(Ue(e,l))}});let me=F(()=>ee.value&&!N.value&&fe.slots.length>0?pe.value?.status??B.value?.status??R.value:B.value?.status??R.value);async function he(){try{let e=B.value?.status;if(!e)return;M.value++;let t=V.value.concat(await zr(e)),n=[],r=new Map;for(let e of fe.slots)r.get(e.action)?.push(e.id)??r.set(e.action,[e.id]);for(let e of t){let t=r.get(e)?.shift()||fe.maxid++;n.push({id:t,action:e})}fe.slots=n,pe.value=await Yt(R.value,t)}catch{fe.slots=[]}finally{M.value--}}async function ge(e,t,n){if(n)for(let t in e)le(e[t]);else ue({slots:e.map((e,t)=>({action:e,id:t})),maxid:e.length,source:t,itemName:c.content?.item.name})}return(t,i)=>T.value?(s(),O(tt,{key:0,need:T.value.need,have:T.value.have,"gearset-name":e(_),gearsets:e(x),"gearset-id":e(h),"sync-level":e(c).content?.syncLevel,onSelectGearset:e(b),onApplyLevel:k},null,8,[`need`,`have`,`gearset-name`,`gearsets`,`gearset-id`,`sync-level`,`onSelectGearset`])):(s(),W(`div`,Sd,[P(`div`,Cd,[e(w)==null?U(``,!0):(s(),O(e(Te),{key:0,title:e(w).title,description:e(w).descryption,type:`warning`,"show-icon":``,center:``,closable:!1},null,8,[`title`,`description`]))]),n(Xe,{class:`status-bar`,attributes:C.value,status:me.value,"show-condition":!1,"collectable-shop-refine":r.collectableShopRefine},null,8,[`attributes`,`status`,`collectable-shop-refine`]),P(`div`,wd,[e(d)?U(``,!0):(s(),O(e(Re),{key:0,class:`above-left-panel`},{default:j(()=>[n(He,{onClickedAction:le,job:e(u),status:B.value?.status},null,8,[`job`,`status`])]),_:1})),P(`div`,Td,[P(`div`,{ref_key:`actionQueueElem`,ref:p,class:`action-queue`},[n(qe,{job:e(u),list:z.slots,"onUpdate:list":i[0]||=e=>z.slots=e,"solver-result":fe.slots,"preview-solver":ee.value,"err-list":B.value?.errors,"loading-solver-result":N.value,clearable:``},null,8,[`job`,`list`,`solver-result`,`preview-solver`,`err-list`,`loading-solver-result`]),n(xd,{style:{"margin-left":`9px`},seq:z,status:me.value},null,8,[`seq`,`status`])],512),n(e(Ie),{class:`above-tabs`,modelValue:te.value,"onUpdate:modelValue":i[5]||=e=>te.value=e,"tab-position":`top`,style:H(`height: calc(100% - ${e(m)+10}px)`)},{default:j(()=>[e(d)?(s(),O(e(Le),{key:0,label:e(l)(`action-panel`),name:`action-panel`,class:`multi-function-area`},{default:j(()=>[n(He,{onClickedAction:le,status:B.value?.status},null,8,[`status`])]),_:1},8,[`label`])):U(``,!0),n(e(Le),{label:e(l)(`init-quality`),name:`init-quality`,class:`multi-function-area`},{default:j(()=>[n(e(Re),{style:{flex:`auto`,"padding-left":`30px`}},{default:j(()=>[n(Xr,{modelValue:I.value,"onUpdate:modelValue":i[1]||=e=>I.value=e,item:r.item,recipe:r.recipe,"recipe-id":r.recipeId,"material-quality-factor":r.materialQualityFactor},null,8,[`modelValue`,`item`,`recipe`,`recipe-id`,`material-quality-factor`])]),_:1})]),_:1},8,[`label`]),n(e(Le),{label:e(l)(`attributes-enhance`),name:`attributes-enhance`,class:`multi-function-area`},{default:j(()=>[n(e(Re),{style:{flex:`auto`,"padding-left":`30px`}},{default:j(()=>[n(et,{modelValue:S.value,"onUpdate:modelValue":i[2]||=e=>S.value=e,"gearset-id":e(y),"onUpdate:gearsetId":i[3]||=e=>D(y)?y.value=e:null,job:r.isCustomRecipe?void 0:e(u),attributes:e(v)},null,8,[`modelValue`,`gearset-id`,`job`,`attributes`])]),_:1})]),_:1},8,[`label`]),n(e(Le),{label:e(l)(`export-macro`),name:`export-macro`,class:`multi-function-area`},{default:j(()=>[n(e(Re),{style:{flex:`auto`}},{default:j(()=>[n(yi,{actions:se.value,item:r.item},null,8,[`actions`,`item`])]),_:1})]),_:1},8,[`label`]),n(e(Le),{label:e(l)(`import-macro`),name:`import-macro`,class:`multi-function-area`},{default:j(()=>[n(e(Re),{style:{flex:`auto`}},{default:j(()=>[n(Ti,{onOnRecognized:de})]),_:1})]),_:1},8,[`label`]),n(e(Le),{label:e(l)(`solvers`),name:`solver-list`,class:`multi-function-area`},{default:j(()=>[P(`div`,Ed,[n(e(Re),{class:`solver-list-panel`},{default:j(()=>[n(Qi,{"init-status":R.value,"current-status":me.value,"recipe-name":r.item.name,"can-hq":r.item.can_be_hq,onSolverLoad:i[4]||=e=>he(),onSolverResult:ge,"collectable-shop-refine":r.collectableShopRefine,maxStellarSteadyHand:e(c).content?.stellarSteadyHandCount},null,8,[`init-status`,`current-status`,`recipe-name`,`can-hq`,`collectable-shop-refine`,`maxStellarSteadyHand`])]),_:1}),se.value.length>0?(s(),O(e(Re),{key:0,class:`solver-macro-panel`},{default:j(()=>[n(yi,{actions:se.value,item:r.item,"hide-options":``},null,8,[`actions`,`item`])]),_:1})):U(``,!0)])]),_:1},8,[`label`]),n(e(Le),{label:e(l)(`analyzer`),name:`analyzer`,class:`multi-function-area`},{default:j(()=>[n(e(Re),{style:{flex:`auto`}},{default:j(()=>[n(hd,{"init-status":R.value,actions:se.value,"collectable-shop-refine":r.collectableShopRefine},null,8,[`init-status`,`actions`,`collectable-shop-refine`])]),_:1})]),_:1},8,[`label`])]),_:1},8,[`modelValue`,`style`])])])]))}});function Ad(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`zh-CN`]=new Z(`solvers = 求解
macro = 宏
export-macro = 导出
import-macro = 导入
attributes-enhance = 食药&装备
init-quality = 初期品质
store = 储存
analyzer = 分析
action-panel = 技能面板

waring = 警告

macro-file-type-name = BestCraft宏文件
save-file = 保存文件
save-success = 保存成功
save-fail = 保存失败：{ $reason }
open-file = 打开文件
read-n-macros = 读取了 { $n } 个宏
read-fail = 读取失败：{ $reason }

edit = 编辑
delete = 删除

and = { $a }和{ $b }
attributes-do-not-meet-the-requirements = 装备{ $attribute }不满足配方要求
attributes-requirements = 制作该配方要求：作业精度 ≥ { $craftsmanship } 且 加工精度 ≥ { $control }`)}function jd(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`zh-TW`]=new Z(`solvers = 求解
macro = 巨集
export-macro = 匯出
import-macro = 匯入
attributes-enhance = 食藥&裝備
init-quality = 初期品質
store = 儲存
analyzer = 分析
action-panel = 技能面板

waring = 警告

macro-file-type-name = BestCraft巨集檔案
save-file = 儲存檔案
save-success = 儲存成功
save-fail = 儲存失敗：{ $reason }
open-file = 開啟檔案
read-n-macros = 讀取了 { $n } 個巨集
read-fail = 讀取失敗：{ $reason }

edit = 編輯
delete = 刪除

and = { $a }和{ $b }
attributes-do-not-meet-the-requirements = 裝備{ $attribute }不滿足配方要求
attributes-requirements = 製作該配方要求：作業精度 ≥ { $craftsmanship } 且 加工精度 ≥ { $control }`)}function Md(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`en-US`]=new Z(`solvers = Solvers
macro = Macro
export-macro = Export
import-macro = Import
attributes-enhance = Medicines & Meals
init-quality = Quality
store = Store
analyzer = Analyzer
action-panel = Action Panel

waring = Warning

macro-file-type-name = BestCraft saved macros file
save-file = Save file
save-success = Saving successed
save-fail = Saving failed: { $reason }
open-file = Open file
read-n-macros = Read { $n -> 
    [one] one macro
    *[other] { $n } macros
}
read-fail = Reading failed: { $reason }

edit = Edit
delete = Delete

and = { $a } and { $b }
attributes-do-not-meet-the-requirements = 
    { $attribute }
    { $num ->
        [one] does
        *[other] do
    }
    not meet the requirements.
attributes-requirements = Require: craftsmanship ≥ { $craftsmanship } and control ≥ { $control }`)}function Nd(e){let t=e.options||e;t.fluent=t.fluent||{},t.fluent[`ja-JP`]=new Z(`macro = マクロ
attributes-enhance = 薬品・調理品
init-quality = 初期品質
and = { $a }と{ $b }
attributes-do-not-meet-the-requirements = { $attribute }が足りないため
attributes-requirements = 製作可能条件：{ craftsmanship }{ $craftsmanship}以上 と { control }{ $control }以上`)}typeof Ad==`function`&&Ad(kd),typeof jd==`function`&&jd(kd),typeof Md==`function`&&Md(kd),typeof Nd==`function`&&Nd(kd);var Pd=Kt(kd,[[`__scopeId`,`data-v-b37bc497`]]);export{Pd as default};
//# sourceMappingURL=Designer-DVc3viYu.js.map