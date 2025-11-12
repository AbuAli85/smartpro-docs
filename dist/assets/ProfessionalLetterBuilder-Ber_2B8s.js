import{i as W,r as l,a9 as Je,j as e,aa as Qe,ab as Ae,ac as Xe,ad as Ze,ae as et,af as tt,Y as Ee,Q as U,a3 as q,V as at,T as st,ag as rt,l as se,b as J,c as Q,d as X,Z as nt,ah as ne,e as Z,B as k,q as Se,o as it,s as ot,L as lt,h as ie,n as ct,K as oe,C as fe,f as dt}from"./index-nEH-zVqm.js";import{I}from"./input-DIrb2hO2.js";import{T as ee}from"./textarea-CL918SZa.js";import{e as mt,u as Te,f as Ie,g as Re,L as _,S as G,a as B,b as z,c as V,d as P,R as ke}from"./select-Dty6Poyq.js";import{B as ge}from"./badge-FHE38Zgh.js";import{S as pe}from"./sparkles-pbUQ6j12.js";import{L as pt}from"./loader-circle-DU0xZDlf.js";import{a as ue}from"./copy-BRlPQmQH.js";import{S as be,P as _e}from"./save-Bl-s0J8z.js";import{A as ut}from"./arrow-left-BLia7YOH.js";import{E as ve}from"./eye-CJiFzbuH.js";import{D as je}from"./download-yel8u4Pv.js";import{C as ht}from"./chevron-right-Djy1cMow.js";const yt=W("History",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}],["path",{d:"M12 7v5l4 2",key:"1fdv2h"}]]);const xt=W("Image",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]]);const ft=W("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);const gt=W("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);const bt=W("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);const Ne=W("WandSparkles",[["path",{d:"m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72",key:"ul74o6"}],["path",{d:"m14 7 3 3",key:"1r5n42"}],["path",{d:"M5 6v4",key:"ilb8ba"}],["path",{d:"M19 14v4",key:"blhpug"}],["path",{d:"M10 2v2",key:"7u0qdc"}],["path",{d:"M7 8H3",key:"zfb6yr"}],["path",{d:"M21 16h-4",key:"1cnmox"}],["path",{d:"M11 3H9",key:"1obp7u"}]]);function we(t,a){if(typeof t=="function")return t(a);t!=null&&(t.current=a)}function _t(...t){return a=>{let s=!1;const i=t.map(n=>{const c=we(n,a);return!s&&typeof c=="function"&&(s=!0),c});if(s)return()=>{for(let n=0;n<i.length;n++){const c=i[n];typeof c=="function"?c():we(t[n],null)}}}}function vt(...t){return l.useCallback(_t(...t),t)}class jt extends l.Component{getSnapshotBeforeUpdate(a){const s=this.props.childRef.current;if(s&&a.isPresent&&!this.props.isPresent){const i=s.offsetParent,n=Qe(i)&&i.offsetWidth||0,c=this.props.sizeRef.current;c.height=s.offsetHeight||0,c.width=s.offsetWidth||0,c.top=s.offsetTop,c.left=s.offsetLeft,c.right=n-c.width-c.left}return null}componentDidUpdate(){}render(){return this.props.children}}function Nt({children:t,isPresent:a,anchorX:s,root:i}){const n=l.useId(),c=l.useRef(null),d=l.useRef({width:0,height:0,top:0,left:0,right:0}),{nonce:f}=l.useContext(Je),x=vt(c,t?.ref);return l.useInsertionEffect(()=>{const{width:y,height:p,top:h,left:g,right:j}=d.current;if(a||!c.current||!y||!p)return;const N=s==="left"?`left: ${g}`:`right: ${j}`;c.current.dataset.motionPopId=n;const v=document.createElement("style");f&&(v.nonce=f);const b=i??document.head;return b.appendChild(v),v.sheet&&v.sheet.insertRule(`
          [data-motion-pop-id="${n}"] {
            position: absolute !important;
            width: ${y}px !important;
            height: ${p}px !important;
            ${N}px !important;
            top: ${h}px !important;
          }
        `),()=>{b.contains(v)&&b.removeChild(v)}},[a]),e.jsx(jt,{isPresent:a,childRef:c,sizeRef:d,children:l.cloneElement(t,{ref:x})})}const wt=({children:t,initial:a,isPresent:s,onExitComplete:i,custom:n,presenceAffectsLayout:c,mode:d,anchorX:f,root:x})=>{const y=Ae(Ct),p=l.useId();let h=!0,g=l.useMemo(()=>(h=!1,{id:p,initial:a,isPresent:s,custom:n,onExitComplete:j=>{y.set(j,!0);for(const N of y.values())if(!N)return;i&&i()},register:j=>(y.set(j,!1),()=>y.delete(j))}),[s,y,i]);return c&&h&&(g={...g}),l.useMemo(()=>{y.forEach((j,N)=>y.set(N,!1))},[s]),l.useEffect(()=>{!s&&!y.size&&i&&i()},[s]),d==="popLayout"&&(t=e.jsx(Nt,{isPresent:s,anchorX:f,root:x,children:t})),e.jsx(Xe.Provider,{value:g,children:t})};function Ct(){return new Map}const ae=t=>t.key||"";function Ce(t){const a=[];return l.Children.forEach(t,s=>{l.isValidElement(s)&&a.push(s)}),a}const At=({children:t,custom:a,initial:s=!0,onExitComplete:i,presenceAffectsLayout:n=!0,mode:c="sync",propagate:d=!1,anchorX:f="left",root:x})=>{const[y,p]=Ze(d),h=l.useMemo(()=>Ce(t),[t]),g=d&&!y?[]:h.map(ae),j=l.useRef(!0),N=l.useRef(h),v=Ae(()=>new Map),[b,E]=l.useState(h),[w,m]=l.useState(h);et(()=>{j.current=!1,N.current=h;for(let T=0;T<w.length;T++){const S=ae(w[T]);g.includes(S)?v.delete(S):v.get(S)!==!0&&v.set(S,!1)}},[w,g.length,g.join("-")]);const u=[];if(h!==b){let T=[...h];for(let S=0;S<w.length;S++){const C=w[S],M=ae(C);g.includes(M)||(T.splice(S,0,C),u.push(C))}return c==="wait"&&u.length&&(T=u),m(Ce(T)),E(h),null}const{forceRender:D}=l.useContext(tt);return e.jsx(e.Fragment,{children:w.map(T=>{const S=ae(T),C=d&&!y?!1:h===w||g.includes(S),M=()=>{if(v.has(S))v.set(S,!0);else return;let L=!0;v.forEach(O=>{O||(L=!1)}),L&&(D?.(),m(N.current),d&&p?.(),i&&i())};return e.jsx(wt,{isPresent:C,initial:!j.current||s?void 0:!1,custom:a,presenceAffectsLayout:n,mode:c,root:x,onExitComplete:C?void 0:M,anchorX:f,children:T},S)})})};var le="rovingFocusGroup.onEntryFocus",Et={bubbles:!1,cancelable:!0},te="RovingFocusGroup",[he,Pe,St]=mt(te),[Tt,De]=Ee(te,[St]),[It,Rt]=Tt(te),Me=l.forwardRef((t,a)=>e.jsx(he.Provider,{scope:t.__scopeRovingFocusGroup,children:e.jsx(he.Slot,{scope:t.__scopeRovingFocusGroup,children:e.jsx(kt,{...t,ref:a})})}));Me.displayName=te;var kt=l.forwardRef((t,a)=>{const{__scopeRovingFocusGroup:s,orientation:i,loop:n=!1,dir:c,currentTabStopId:d,defaultCurrentTabStopId:f,onCurrentTabStopIdChange:x,onEntryFocus:y,preventScrollOnEntryFocus:p=!1,...h}=t,g=l.useRef(null),j=at(a,g),N=Ie(c),[v,b]=Re({prop:d,defaultProp:f??null,onChange:x,caller:te}),[E,w]=l.useState(!1),m=st(y),u=Pe(s),D=l.useRef(!1),[T,S]=l.useState(0);return l.useEffect(()=>{const C=g.current;if(C)return C.addEventListener(le,m),()=>C.removeEventListener(le,m)},[m]),e.jsx(It,{scope:s,orientation:i,dir:N,loop:n,currentTabStopId:v,onItemFocus:l.useCallback(C=>b(C),[b]),onItemShiftTab:l.useCallback(()=>w(!0),[]),onFocusableItemAdd:l.useCallback(()=>S(C=>C+1),[]),onFocusableItemRemove:l.useCallback(()=>S(C=>C-1),[]),children:e.jsx(U.div,{tabIndex:E||T===0?-1:0,"data-orientation":i,...h,ref:j,style:{outline:"none",...t.style},onMouseDown:q(t.onMouseDown,()=>{D.current=!0}),onFocus:q(t.onFocus,C=>{const M=!D.current;if(C.target===C.currentTarget&&M&&!E){const L=new CustomEvent(le,Et);if(C.currentTarget.dispatchEvent(L),!L.defaultPrevented){const O=u().filter(o=>o.focusable),H=O.find(o=>o.active),Y=O.find(o=>o.id===v),r=[H,Y,...O].filter(Boolean).map(o=>o.ref.current);qe(r,p)}}D.current=!1}),onBlur:q(t.onBlur,()=>w(!1))})})}),Le="RovingFocusGroupItem",Oe=l.forwardRef((t,a)=>{const{__scopeRovingFocusGroup:s,focusable:i=!0,active:n=!1,tabStopId:c,children:d,...f}=t,x=Te(),y=c||x,p=Rt(Le,s),h=p.currentTabStopId===y,g=Pe(s),{onFocusableItemAdd:j,onFocusableItemRemove:N,currentTabStopId:v}=p;return l.useEffect(()=>{if(i)return j(),()=>N()},[i,j,N]),e.jsx(he.ItemSlot,{scope:s,id:y,focusable:i,active:n,children:e.jsx(U.span,{tabIndex:h?0:-1,"data-orientation":p.orientation,...f,ref:a,onMouseDown:q(t.onMouseDown,b=>{i?p.onItemFocus(y):b.preventDefault()}),onFocus:q(t.onFocus,()=>p.onItemFocus(y)),onKeyDown:q(t.onKeyDown,b=>{if(b.key==="Tab"&&b.shiftKey){p.onItemShiftTab();return}if(b.target!==b.currentTarget)return;const E=Mt(b,p.orientation,p.dir);if(E!==void 0){if(b.metaKey||b.ctrlKey||b.altKey||b.shiftKey)return;b.preventDefault();let m=g().filter(u=>u.focusable).map(u=>u.ref.current);if(E==="last")m.reverse();else if(E==="prev"||E==="next"){E==="prev"&&m.reverse();const u=m.indexOf(b.currentTarget);m=p.loop?Lt(m,u+1):m.slice(u+1)}setTimeout(()=>qe(m))}}),children:typeof d=="function"?d({isCurrentTabStop:h,hasTabStop:v!=null}):d})})});Oe.displayName=Le;var Pt={ArrowLeft:"prev",ArrowUp:"prev",ArrowRight:"next",ArrowDown:"next",PageUp:"first",Home:"first",PageDown:"last",End:"last"};function Dt(t,a){return a!=="rtl"?t:t==="ArrowLeft"?"ArrowRight":t==="ArrowRight"?"ArrowLeft":t}function Mt(t,a,s){const i=Dt(t.key,s);if(!(a==="vertical"&&["ArrowLeft","ArrowRight"].includes(i))&&!(a==="horizontal"&&["ArrowUp","ArrowDown"].includes(i)))return Pt[i]}function qe(t,a=!1){const s=document.activeElement;for(const i of t)if(i===s||(i.focus({preventScroll:a}),document.activeElement!==s))return}function Lt(t,a){return t.map((s,i)=>t[(a+i)%t.length])}var Ot=Me,qt=Oe,re="Tabs",[$t]=Ee(re,[De]),$e=De(),[Ft,ye]=$t(re),Fe=l.forwardRef((t,a)=>{const{__scopeTabs:s,value:i,onValueChange:n,defaultValue:c,orientation:d="horizontal",dir:f,activationMode:x="automatic",...y}=t,p=Ie(f),[h,g]=Re({prop:i,onChange:n,defaultProp:c??"",caller:re});return e.jsx(Ft,{scope:s,baseId:Te(),value:h,onValueChange:g,orientation:d,dir:p,activationMode:x,children:e.jsx(U.div,{dir:p,"data-orientation":d,...y,ref:a})})});Fe.displayName=re;var Ge="TabsList",Be=l.forwardRef((t,a)=>{const{__scopeTabs:s,loop:i=!0,...n}=t,c=ye(Ge,s),d=$e(s);return e.jsx(Ot,{asChild:!0,...d,orientation:c.orientation,dir:c.dir,loop:i,children:e.jsx(U.div,{role:"tablist","aria-orientation":c.orientation,...n,ref:a})})});Be.displayName=Ge;var ze="TabsTrigger",Ve=l.forwardRef((t,a)=>{const{__scopeTabs:s,value:i,disabled:n=!1,...c}=t,d=ye(ze,s),f=$e(s),x=Ue(d.baseId,i),y=He(d.baseId,i),p=i===d.value;return e.jsx(qt,{asChild:!0,...f,focusable:!n,active:p,children:e.jsx(U.button,{type:"button",role:"tab","aria-selected":p,"aria-controls":y,"data-state":p?"active":"inactive","data-disabled":n?"":void 0,disabled:n,id:x,...c,ref:a,onMouseDown:q(t.onMouseDown,h=>{!n&&h.button===0&&h.ctrlKey===!1?d.onValueChange(i):h.preventDefault()}),onKeyDown:q(t.onKeyDown,h=>{[" ","Enter"].includes(h.key)&&d.onValueChange(i)}),onFocus:q(t.onFocus,()=>{const h=d.activationMode!=="manual";!p&&!n&&h&&d.onValueChange(i)})})})});Ve.displayName=ze;var Ke="TabsContent",We=l.forwardRef((t,a)=>{const{__scopeTabs:s,value:i,forceMount:n,children:c,...d}=t,f=ye(Ke,s),x=Ue(f.baseId,i),y=He(f.baseId,i),p=i===f.value,h=l.useRef(p);return l.useEffect(()=>{const g=requestAnimationFrame(()=>h.current=!1);return()=>cancelAnimationFrame(g)},[]),e.jsx(rt,{present:n||p,children:({present:g})=>e.jsx(U.div,{"data-state":p?"active":"inactive","data-orientation":f.orientation,role:"tabpanel","aria-labelledby":x,hidden:!g,id:y,tabIndex:0,...d,ref:a,style:{...t.style,animationDuration:h.current?"0s":void 0},children:g&&c})})});We.displayName=Ke;function Ue(t,a){return`${t}-trigger-${a}`}function He(t,a){return`${t}-content-${a}`}var Gt=Fe,Bt=Be,zt=Ve,Vt=We;function Kt({className:t,...a}){return e.jsx(Gt,{"data-slot":"tabs",className:se("flex flex-col gap-2",t),...a})}function Wt({className:t,...a}){return e.jsx(Bt,{"data-slot":"tabs-list",className:se("bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",t),...a})}function ce({className:t,...a}){return e.jsx(zt,{"data-slot":"tabs-trigger",className:se("data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",t),...a})}function de({className:t,...a}){return e.jsx(Vt,{"data-slot":"tabs-content",className:se("flex-1 outline-none",t),...a})}const xe=[{id:"moci_noc",name:"No-Objection Certificate (NOC)",nameAr:"خطاب عدم ممانعة",category:"MOCI",icon:"📄",description:"Certificate stating no objection for employee to perform specific activity",descriptionAr:"شهادة تفيد بعدم الممانعة على قيام الموظف بنشاط معين",tags:["employment","clearance","permit"],fields:[{id:"employee_name",label:"Employee Name",type:"text",required:!0,placeholder:"Full name"},{id:"civil_id",label:"Civil ID",type:"text",required:!0,placeholder:"12345678"},{id:"noc_purpose",label:"Purpose of NOC",type:"textarea",required:!0,placeholder:"Describe the purpose..."},{id:"department",label:"Department",type:"text",placeholder:"Department name"},{id:"employment_start_date",label:"Employment Start Date",type:"date"}],templateEn:`{company_name}
{company_address}
Tel: {company_phone} | Email: {company_email}

Date: {date}
Ref: {reference_number}

To: {recipient_role}, {recipient_org}

Subject: No-Objection Certificate

Dear Sir/Madam,

We, {company_name} (CR: {company_cr}), hereby certify that we have no objection for {employee_name} (Civil ID: {civil_id}) to {noc_purpose}.

This certificate is issued upon the employee's request and without any liability on the company.

{closing}

{signer_name}
{signer_title}

{company_footer}`,templateAr:`{company_name}
{company_address_ar}
هاتف: {company_phone} | البريد الإلكتروني: {company_email}

التاريخ: {date}
الرقم المرجعي: {reference_number}

إلى: {recipient_role}، {recipient_org}

الموضوع: خطاب عدم ممانعة

تحية طيبة وبعد،

نحن، شركة {company_name} (رقم السجل التجاري: {company_cr})، نود إفادتكم بأنه لا مانع لدينا من {noc_purpose} للموظف {employee_name} (رقم البطاقة المدنية: {civil_id}).

يصدر هذا الخطاب بناءً على طلب الموظف ودون أدنى مسؤولية على الشركة.

{closing_ar}

{signer_name}
{signer_title}

{company_footer_ar}`},{id:"moci_inquiry",name:"Regulatory Inquiry",nameAr:"استفسار تنظيمي",category:"MOCI",icon:"❓",description:"Formal inquiry to MOCI regarding regulations or procedures",descriptionAr:"استفسار رسمي إلى الوزارة بخصوص اللوائح أو الإجراءات",tags:["inquiry","question","clarification"],fields:[{id:"inquiry_subject",label:"Subject of Inquiry",type:"text",required:!0},{id:"request_details",label:"Inquiry Details",type:"textarea",required:!0,placeholder:"Describe your inquiry..."},{id:"urgency",label:"Urgency",type:"select",options:[{value:"normal",label:"Normal"},{value:"urgent",label:"Urgent"},{value:"very_urgent",label:"Very Urgent"}]}],templateEn:`{company_name}
Date: {date}
Ref: {reference_number}

To: {recipient_role}, {recipient_org}

Subject: {inquiry_subject}

Dear Sir/Madam,

We request guidance regarding {request_details}.

Company: {company_name} (CR: {company_cr})

We would appreciate your prompt response on this matter.

{closing}

{signer_name}
{signer_title}`,templateAr:`{company_name}
التاريخ: {date}
الرقم المرجعي: {reference_number}

إلى: {recipient_role}، {recipient_org}

الموضوع: {inquiry_subject}

السيد/السيدة المحترم/ة،

نرجو إفادتنا بشأن {request_details}.

الشركة: {company_name} (السجل التجاري: {company_cr})

نأمل الرد السريع على هذا الموضوع.

{closing_ar}

{signer_name}
{signer_title}`},{id:"moci_license_application",name:"License Application",nameAr:"طلب ترخيص",category:"MOCI",icon:"📋",description:"Application for business license or permit",descriptionAr:"طلب للحصول على ترخيص أو تصريح تجاري",tags:["license","permit","registration"],fields:[{id:"license_type",label:"License Type",type:"text",required:!0},{id:"business_activity",label:"Business Activity",type:"textarea",required:!0},{id:"location",label:"Business Location",type:"text"},{id:"contact_person",label:"Contact Person",type:"text"},{id:"contact_phone",label:"Contact Phone",type:"phone"}],templateEn:`Application for {license_type}

Company: {company_name}
CR: {company_cr}
Date: {date}

Business Activity: {business_activity}
Location: {location}
Contact: {contact_person} - {contact_phone}

We hereby apply for the above-mentioned license.

{signer_name}
{signer_title}`,templateAr:`طلب الحصول على {license_type}

الشركة: {company_name}
السجل التجاري: {company_cr}
التاريخ: {date}

النشاط التجاري: {business_activity}
الموقع: {location}
جهة الاتصال: {contact_person} - {contact_phone}

نتقدم بطلب الحصول على الترخيص المذكور أعلاه.

{signer_name}
{signer_title}`},{id:"rop_verification",name:"Employment Verification",nameAr:"خطاب تحقق من العمل",category:"ROP",icon:"✓",description:"Verification of employee employment status",descriptionAr:"التحقق من حالة توظيف الموظف",tags:["verification","employment","confirmation"],fields:[{id:"employee_name",label:"Employee Name",type:"text",required:!0},{id:"civil_id",label:"Civil ID",type:"text",required:!0},{id:"position",label:"Position",type:"text",required:!0},{id:"employment_start_date",label:"Employment Start Date",type:"date",required:!0},{id:"salary",label:"Monthly Salary (Optional)",type:"text"}],templateEn:`Employment Verification

This is to certify that {employee_name} (Civil ID: {civil_id}) is employed with {company_name} as {position} since {employment_start_date}.

Details enclosed for verification purposes.

{signer_name}
{signer_title}
{company_name}`,templateAr:`خطاب تحقق من العمل

نفيد بأن السيد/السيدة {employee_name} (رقم البطاقة المدنية: {civil_id}) يعمل لدى {company_name} بوظيفة {position} منذ {employment_start_date}.

التفاصيل المرفقة لغرض التحقق.

{signer_name}
{signer_title}
{company_name}`},{id:"rop_clearance",name:"Security Clearance Request",nameAr:"طلب إفادة أمنية",category:"ROP",icon:"🛡️",description:"Request for security clearance or police clearance",descriptionAr:"طلب للحصول على إفادة أمنية أو شهادة حسن سيرة",tags:["clearance","security","police"],fields:[{id:"employee_name",label:"Employee Name",type:"text",required:!0},{id:"civil_id",label:"Civil ID",type:"text",required:!0},{id:"clearance_purpose",label:"Purpose",type:"textarea",required:!0},{id:"nationality",label:"Nationality",type:"text"}],templateEn:`Request for Security Clearance

Employee: {employee_name}
Civil ID: {civil_id}
Nationality: {nationality}

We kindly request the issuance of a security clearance for the above-mentioned employee for the purpose of {clearance_purpose}.

{signer_name}
{signer_title}`,templateAr:`طلب إفادة أمنية

الموظف: {employee_name}
رقم البطاقة المدنية: {civil_id}
الجنسية: {nationality}

نلتمس تفضلكم بإصدار إفادة أمنية للموظف المذكور أعلاه لغرض {clearance_purpose}.

{signer_name}
{signer_title}`},{id:"mol_labour_clearance",name:"Labour Clearance Request",nameAr:"طلب موافقة عمل",category:"MOL",icon:"👔",description:"Request for labour permit approval",descriptionAr:"طلب للحصول على موافقة تصريح عمل",tags:["labour","permit","work"],fields:[{id:"employee_name",label:"Employee Name",type:"text",required:!0},{id:"civil_id",label:"Civil ID",type:"text",required:!0},{id:"position",label:"Position",type:"text",required:!0},{id:"nationality",label:"Nationality",type:"text"},{id:"qualifications",label:"Qualifications",type:"textarea"}],templateEn:`Labour Clearance Request

We kindly request approval to proceed with a labour permit for:

Name: {employee_name}
Civil ID: {civil_id}
Position: {position}
Nationality: {nationality}

Company: {company_name} (CR: {company_cr})

{signer_name}
{signer_title}`,templateAr:`طلب موافقة عمل

نلتمس تفضلكم بالموافقة على إجراءات تصريح العمل للموظف:

الاسم: {employee_name}
رقم البطاقة المدنية: {civil_id}
الوظيفة: {position}
الجنسية: {nationality}

الشركة: {company_name} (السجل التجاري: {company_cr})

{signer_name}
{signer_title}`},{id:"mol_employment_confirmation",name:"Employment Confirmation",nameAr:"تأكيد توظيف",category:"MOL",icon:"✓",description:"Confirmation of current employment status",descriptionAr:"تأكيد حالة التوظيف الحالية",tags:["confirmation","employment","certificate"],fields:[{id:"employee_name",label:"Employee Name",type:"text",required:!0},{id:"position",label:"Position",type:"text",required:!0},{id:"employment_start_date",label:"Start Date",type:"date",required:!0},{id:"department",label:"Department",type:"text"},{id:"salary",label:"Monthly Salary",type:"text"}],templateEn:`Employment Confirmation

This is to confirm that {employee_name} has been employed with {company_name} since {employment_start_date} in the {department} department as {position}.

{signer_name}
{signer_title}`,templateAr:`تأكيد توظيف

نفيد بأن السيد/السيدة {employee_name} يعمل لدينا منذ {employment_start_date} في قسم {department} بوظيفة {position}.

{signer_name}
{signer_title}`},{id:"mol_resignation_acceptance",name:"Resignation Acceptance",nameAr:"قبول استقالة",category:"MOL",icon:"👋",description:"Formal acceptance of employee resignation",descriptionAr:"قبول رسمي لاستقالة الموظف",tags:["resignation","termination","separation"],fields:[{id:"employee_name",label:"Employee Name",type:"text",required:!0},{id:"position",label:"Position",type:"text",required:!0},{id:"resignation_date",label:"Resignation Date",type:"date",required:!0},{id:"last_working_day",label:"Last Working Day",type:"date",required:!0},{id:"notice_period",label:"Notice Period (days)",type:"text"}],templateEn:`Resignation Acceptance

Employee: {employee_name}
Position: {position}
Resignation Date: {resignation_date}
Last Working Day: {last_working_day}

We hereby acknowledge and accept the resignation submitted by {employee_name}. The employee will complete the notice period of {notice_period} days.

All dues will be settled as per company policy.

{signer_name}
{signer_title}`,templateAr:`قبول استقالة

الموظف: {employee_name}
الوظيفة: {position}
تاريخ الاستقالة: {resignation_date}
آخر يوم عمل: {last_working_day}

نقر ونقبل بموجب هذا الاستقالة المقدمة من {employee_name}. سيكمل الموظف فترة إشعار {notice_period} يوماً.

سيتم تسوية جميع المستحقات وفقاً لسياسة الشركة.

{signer_name}
{signer_title}`},{id:"general_salary_certificate",name:"Salary Certificate",nameAr:"شهادة راتب",category:"GENERAL",icon:"💰",description:"Certificate stating employee salary details",descriptionAr:"شهادة تبين تفاصيل راتب الموظف",tags:["salary","income","certificate"],fields:[{id:"employee_name",label:"Employee Name",type:"text",required:!0},{id:"position",label:"Position",type:"text",required:!0},{id:"monthly_salary",label:"Monthly Salary",type:"text",required:!0},{id:"employment_start_date",label:"Employment Start Date",type:"date"},{id:"allowances",label:"Allowances (Optional)",type:"text"}],templateEn:`Salary Certificate

This is to certify that {employee_name} is employed with {company_name} as {position} since {employment_start_date}.

Current monthly salary: OMR {monthly_salary}
Allowances: {allowances}

This certificate is issued for official purposes.

{signer_name}
{signer_title}`,templateAr:`شهادة راتب

نفيد بأن السيد/السيدة {employee_name} يعمل لدى {company_name} بوظيفة {position} منذ {employment_start_date}.

الراتب الشهري الحالي: {monthly_salary} ريال عماني
البدلات: {allowances}

تصدر هذه الشهادة للأغراض الرسمية.

{signer_name}
{signer_title}`},{id:"general_experience_certificate",name:"Experience Certificate",nameAr:"شهادة خبرة",category:"GENERAL",icon:"🎓",description:"Certificate of work experience and achievements",descriptionAr:"شهادة الخبرة العملية والإنجازات",tags:["experience","certificate","reference"],fields:[{id:"employee_name",label:"Employee Name",type:"text",required:!0},{id:"position",label:"Position",type:"text",required:!0},{id:"employment_start_date",label:"Start Date",type:"date",required:!0},{id:"employment_end_date",label:"End Date",type:"date",required:!0},{id:"responsibilities",label:"Key Responsibilities",type:"textarea"},{id:"achievements",label:"Achievements",type:"textarea"}],templateEn:`Experience Certificate

This is to certify that {employee_name} worked with {company_name} as {position} from {employment_start_date} to {employment_end_date}.

Key Responsibilities:
{responsibilities}

Achievements:
{achievements}

We wish {employee_name} success in future endeavors.

{signer_name}
{signer_title}`,templateAr:`شهادة خبرة

نفيد بأن السيد/السيدة {employee_name} عمل لدى {company_name} بوظيفة {position} من {employment_start_date} إلى {employment_end_date}.

المسؤوليات الرئيسية:
{responsibilities}

الإنجازات:
{achievements}

نتمنى للسيد/السيدة {employee_name} التوفيق في المساعي المستقبلية.

{signer_name}
{signer_title}`},{id:"general_promotion_letter",name:"Promotion Letter",nameAr:"خطاب ترقية",category:"GENERAL",icon:"📈",description:"Official letter announcing employee promotion",descriptionAr:"خطاب رسمي يعلن عن ترقية الموظف",tags:["promotion","career","advancement"],fields:[{id:"employee_name",label:"Employee Name",type:"text",required:!0},{id:"current_position",label:"Current Position",type:"text",required:!0},{id:"new_position",label:"New Position",type:"text",required:!0},{id:"effective_date",label:"Effective Date",type:"date",required:!0},{id:"new_salary",label:"New Salary",type:"text"},{id:"reason",label:"Reason for Promotion",type:"textarea"}],templateEn:`Promotion Letter

Dear {employee_name},

We are pleased to inform you of your promotion from {current_position} to {new_position}, effective {effective_date}.

This promotion is in recognition of {reason}.

Your new salary will be OMR {new_salary} per month.

Congratulations on this well-deserved promotion!

{signer_name}
{signer_title}`,templateAr:`خطاب ترقية

السيد/السيدة {employee_name} المحترم/ة،

يسرنا إبلاغكم بترقيتكم من {current_position} إلى {new_position}، اعتباراً من {effective_date}.

تأتي هذه الترقية تقديراً لـ {reason}.

راتبكم الجديد سيكون {new_salary} ريال عماني شهرياً.

تهانينا على هذه الترقية المستحقة!

{signer_name}
{signer_title}`},{id:"bank_account_opening",name:"Bank Account Opening Request",nameAr:"طلب فتح حساب بنكي",category:"BANK",icon:"🏦",description:"Letter for company bank account opening",descriptionAr:"خطاب لفتح حساب بنكي للشركة",tags:["bank","account","financial"],fields:[{id:"account_type",label:"Account Type",type:"select",required:!0,options:[{value:"current",label:"Current Account"},{value:"savings",label:"Savings Account"},{value:"corporate",label:"Corporate Account"}]},{id:"authorized_signatories",label:"Authorized Signatories",type:"textarea",required:!0},{id:"initial_deposit",label:"Initial Deposit Amount",type:"text"}],templateEn:`Bank Account Opening Request

Company: {company_name}
CR: {company_cr}
Account Type: {account_type}

Authorized Signatories:
{authorized_signatories}

Initial Deposit: OMR {initial_deposit}

We request to open a {account_type} with your esteemed bank.

{signer_name}
{signer_title}`,templateAr:`طلب فتح حساب بنكي

الشركة: {company_name}
السجل التجاري: {company_cr}
نوع الحساب: {account_type}

المفوضون بالتوقيع:
{authorized_signatories}

الإيداع الأولي: {initial_deposit} ريال عماني

نطلب فتح {account_type} لدى مصرفكم الموقر.

{signer_name}
{signer_title}`},{id:"bank_loan_application",name:"Loan Application Letter",nameAr:"طلب قرض",category:"BANK",icon:"💵",description:"Application for business or personal loan",descriptionAr:"طلب للحصول على قرض تجاري أو شخصي",tags:["loan","financing","credit"],fields:[{id:"loan_amount",label:"Loan Amount",type:"text",required:!0},{id:"loan_purpose",label:"Purpose of Loan",type:"textarea",required:!0},{id:"repayment_period",label:"Repayment Period (months)",type:"text"},{id:"collateral",label:"Collateral Offered",type:"textarea"}],templateEn:`Loan Application

Company: {company_name}
Loan Amount: OMR {loan_amount}
Purpose: {loan_purpose}
Repayment Period: {repayment_period} months

Collateral: {collateral}

We request consideration of this loan application.

{signer_name}
{signer_title}`,templateAr:`طلب قرض

الشركة: {company_name}
مبلغ القرض: {loan_amount} ريال عماني
الغرض: {loan_purpose}
فترة السداد: {repayment_period} شهراً

الضمانات: {collateral}

نرجو النظر في هذا الطلب.

{signer_name}
{signer_title}`}];function Ut(){const t=new Set(xe.map(s=>s.category));return Array.from(t).sort()}function me(t){return xe.filter(a=>a.category===t)}function Ye(t){return xe.find(a=>a.id===t)}function Ht(t,a,s){let n=s==="ar"?t.templateAr:t.templateEn;return Object.entries(a).forEach(([c,d])=>{const f=`{${c}}`;n=n.replace(new RegExp(f,"g"),d||`[${c}]`)}),n}function K(t){return t==="ar"?"وتفضلوا بقبول فائق الاحترام والتقدير":"Yours sincerely"}const Yt={MOCI:{en:"Ministry of Commerce",ar:"وزارة التجارة",icon:"🏢"},ROP:{en:"Royal Oman Police",ar:"شرطة عمان السلطانية",icon:"🚔"},MOL:{en:"Ministry of Labour",ar:"وزارة العمل",icon:"👔"},GENERAL:{en:"General Business",ar:"أعمال عامة",icon:"📄"},BANK:{en:"Banking & Finance",ar:"البنوك والمالية",icon:"🏦"}},Jt="";function Qt(t){const{template:a,language:s,userInputs:i,existingValues:n}=t,c=s==="ar"?"Arabic":"English";return`You are a professional business letter writer for Oman. Generate a ${c} letter with these requirements:

LETTER TYPE: ${a.name} (${a.nameAr})
CATEGORY: ${a.category}
LANGUAGE: ${c}
TONE: ${i.tone||"professional"}

CONTEXT:
- Company: ${n.company_name||"[Company Name]"}
- Recipient: ${i.recipientName||n.recipient_org||"[Recipient]"}
- Purpose: ${i.purpose||a.description}

${i.keyPoints&&i.keyPoints.length>0?`
KEY POINTS TO INCLUDE:
${i.keyPoints.map((f,x)=>`${x+1}. ${f}`).join(`
`)}
`:""}

${i.context?`
ADDITIONAL CONTEXT:
${i.context}
`:""}

REQUIREMENTS:
1. Write ONLY the letter body (main content paragraphs)
2. Use formal, professional ${c} language
3. Be concise but complete (2-4 paragraphs)
4. Include all relevant details
5. Maintain appropriate formality for ${a.category} letters
6. For Arabic: Use proper formal Arabic (الفصحى)
7. Do NOT include header, date, recipient address, or signature
8. Do NOT include placeholders like [Name] - use the actual provided information

${s==="ar"?`
ARABIC WRITING GUIDELINES:
- Use formal Modern Standard Arabic (الفصحى)
- Proper business letter etiquette
- Correct honorifics (سعادة، معالي، السيد/السيدة)
- Professional closing phrases
`:`
ENGLISH WRITING GUIDELINES:
- Use British English spelling
- Proper business letter format
- Appropriate salutations for Omani business context
- Professional tone throughout
`}

Generate the letter body NOW:`}function Xt(t){const{template:a,language:s}=t,n={moci_noc:s==="ar"?'تأكد من ذكر "لا مانع لدينا" بوضوح والإشارة إلى أن الشركة غير مسؤولة.':'Clearly state "no objection" and mention that the company bears no liability.',rop_verification:s==="ar"?"ركز على التحقق من العمل والمعلومات الدقيقة عن الموظف.":"Focus on employment verification with accurate employee details.",mol_labour_clearance:s==="ar"?"اذكر تفاصيل تصريح العمل ومؤهلات الموظف بوضوح.":"Mention work permit details and employee qualifications clearly.",general_salary_certificate:s==="ar"?"اذكر الراتب والبدلات بوضوح مع تأكيد استمرار العمل.":"State salary and allowances clearly with employment confirmation.",bank_loan_application:s==="ar"?"ركز على القدرة المالية والضمانات المقدمة.":"Focus on financial capability and collateral offered."}[a.id]||"";return n?`

SPECIAL INSTRUCTIONS FOR THIS LETTER TYPE:
${n}`:""}async function Zt(t,a){return{success:!1,error:"OpenAI API key not configured. Please add VITE_OPENAI_API_KEY to your .env file."}}async function ea(t){return Qt(t),Xt(t),await Zt()}async function ta(t,a){return[]}function aa(t){const{template:a,language:s,userInputs:i}=t;return{success:!0,content:s==="ar"?`نود إفادتكم بأن ${i.recipientName||"الجهة المعنية"} ${i.purpose||a.description}.

نحيطكم علماً بأن هذا الخطاب صادر بناءً على الطلب المقدم، ونؤكد التزامنا الكامل بجميع الأنظمة واللوائح المعمول بها.

نأمل أن تجدوا في هذا ما يفي بالغرض، ونحن على استعداد تام لتقديم أي معلومات إضافية قد تحتاجونها.`:`We would like to inform you that ${i.recipientName||"the concerned party"} ${i.purpose||a.description}.

This letter is issued upon request, and we confirm our full commitment to all applicable regulations and guidelines.

We hope this serves the intended purpose, and we remain at your disposal should you require any additional information.`,usage:{promptTokens:0,completionTokens:0,totalTokens:0}}}function sa(){return!!Jt}function ra({template:t,language:a,existingValues:s,onContentGenerated:i,onSubjectGenerated:n}){const[c,d]=l.useState(!1),[f,x]=l.useState(""),[y,p]=l.useState(""),[h,g]=l.useState(""),[j,N]=l.useState([""]),[v,b]=l.useState("professional"),[E,w]=l.useState(""),[m,u]=l.useState(""),[D,T]=l.useState(!1),[S,C]=l.useState(!1),M=sa(),L=async()=>{d(!0),u(""),T(!1);try{const A={template:t,language:a,userInputs:{recipientName:f,purpose:y,keyPoints:j.filter($=>$.trim().length>0),context:h,tone:v},existingValues:s},R=M?await ea(A):aa(A);R.success&&R.content?(w(R.content),i(R.content),T(!0),R.usage&&console.log("AI Usage:",R.usage)):u(R.error||"Failed to generate content")}catch(A){u(A instanceof Error?A.message:"An error occurred")}finally{d(!1)}},O=async()=>{if(y){d(!0);try{const A=await ta(y,a);A.length>0&&n&&n(A[0])}catch(A){console.error("Failed to generate subject:",A)}finally{d(!1)}}},H=()=>{N([...j,""])},Y=(A,R)=>{const $=[...j];$[A]=R,N($)},F=A=>{N(j.filter((R,$)=>$!==A))},r=()=>{E&&navigator.clipboard.writeText(E)},o=y.trim().length>0||h.trim().length>0;return e.jsxs(J,{className:"border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50",children:[e.jsx(Q,{className:"border-b bg-gradient-to-r from-purple-100 to-pink-100",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs(X,{className:"text-lg flex items-center gap-2",children:[e.jsx(pe,{className:"w-5 h-5 text-purple-600"}),"AI Letter Generator",e.jsxs(ge,{variant:"secondary",className:"ml-2 gap-1",children:[e.jsx(nt,{className:"w-3 h-3"}),M?"GPT-4":"Demo Mode"]})]}),!M&&e.jsxs(ge,{variant:"outline",className:"text-xs",children:[e.jsx(ne,{className:"w-3 h-3 mr-1"}),"Add API key to enable"]})]})}),e.jsxs(Z,{className:"p-6 space-y-4",children:[e.jsx("div",{className:"bg-purple-100 border border-purple-300 rounded-lg p-4",children:e.jsxs("div",{className:"flex items-start gap-3",children:[e.jsx(ne,{className:"w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5"}),e.jsxs("div",{className:"flex-1",children:[e.jsx("p",{className:"text-sm text-purple-900 font-medium mb-1",children:"How it works"}),e.jsxs("p",{className:"text-xs text-purple-700",children:["Provide basic details below, and AI will generate a professional letter body tailored to your needs. The content will be professionally formatted in ",a==="ar"?"Arabic":"English","."]})]})]})}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs(_,{className:"text-sm font-semibold flex items-center gap-2",children:[e.jsx("span",{children:"Recipient Name"}),e.jsx("span",{className:"text-xs text-gray-500 font-normal",children:"(Optional)"})]}),e.jsx(I,{value:f,onChange:A=>x(A.target.value),placeholder:a==="ar"?"السيد محمد":"Mr. Mohammed Al-Harthi",className:"border-2 focus:border-purple-500"})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs(_,{className:"text-sm font-semibold flex items-center gap-2",children:[e.jsx("span",{children:"Purpose / Main Topic"}),e.jsx("span",{className:"text-xs text-red-500",children:"*"})]}),e.jsx(ee,{value:y,onChange:A=>p(A.target.value),placeholder:a==="ar"?"مثال: طلب قرض بنكي لتوسعة الأعمال":"e.g., Request for bank loan to expand business operations",rows:2,className:"border-2 focus:border-purple-500"}),n&&y.trim()&&e.jsxs(k,{size:"sm",variant:"outline",onClick:O,disabled:c,className:"gap-2",children:[e.jsx(Ne,{className:"w-3 h-3"}),"Generate Subject Line"]})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx(_,{className:"text-sm font-semibold",children:"Key Points to Include"}),e.jsxs(k,{size:"sm",variant:"ghost",onClick:H,className:"h-7 px-2 text-xs gap-1",children:[e.jsx(ft,{className:"w-3 h-3"}),"Add Point"]})]}),e.jsx("div",{className:"space-y-2",children:j.map((A,R)=>e.jsxs("div",{className:"flex gap-2",children:[e.jsx(I,{value:A,onChange:$=>Y(R,$.target.value),placeholder:`Point ${R+1}...`,className:"flex-1 border-2 focus:border-purple-500"}),j.length>1&&e.jsx(k,{size:"sm",variant:"ghost",onClick:()=>F(R),className:"px-2",children:e.jsx(bt,{className:"w-4 h-4 text-red-500"})})]},R))})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs(k,{variant:"ghost",size:"sm",onClick:()=>C(!S),className:"text-xs gap-2 h-7",children:[e.jsx(Ne,{className:"w-3 h-3"}),S?"Hide":"Show"," Advanced Options"]}),S&&e.jsxs("div",{className:"space-y-3 p-4 bg-white/50 rounded-lg border border-purple-200",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx(_,{className:"text-sm font-semibold",children:"Tone"}),e.jsxs(G,{value:v,onValueChange:A=>b(A),children:[e.jsx(B,{className:"border-2",children:e.jsx(z,{})}),e.jsxs(V,{children:[e.jsx(P,{value:"formal",children:"Formal (Very official)"}),e.jsx(P,{value:"professional",children:"Professional (Standard)"}),e.jsx(P,{value:"friendly",children:"Friendly (Approachable)"})]})]})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(_,{className:"text-sm font-semibold",children:"Additional Context"}),e.jsx(ee,{value:h,onChange:A=>g(A.target.value),placeholder:"Any additional details or background information...",rows:3,className:"border-2 focus:border-purple-500"})]})]})]}),e.jsx(k,{onClick:L,disabled:!o||c,className:"w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 gap-2 py-6",size:"lg",children:c?e.jsxs(e.Fragment,{children:[e.jsx(pt,{className:"w-5 h-5 animate-spin"}),"Generating with AI..."]}):e.jsxs(e.Fragment,{children:[e.jsx(pe,{className:"w-5 h-5"}),"Generate Professional Letter"]})}),m&&e.jsxs("div",{className:"flex items-start gap-2 p-4 bg-red-50 border border-red-200 rounded-lg",children:[e.jsx(Se,{className:"w-5 h-5 text-red-600 flex-shrink-0 mt-0.5"}),e.jsxs("div",{className:"flex-1",children:[e.jsx("p",{className:"text-sm font-medium text-red-900",children:"Generation Failed"}),e.jsx("p",{className:"text-xs text-red-700 mt-1",children:m})]})]}),D&&E&&e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"flex items-start gap-2 p-4 bg-green-50 border border-green-200 rounded-lg",children:[e.jsx(it,{className:"w-5 h-5 text-green-600 flex-shrink-0 mt-0.5"}),e.jsxs("div",{className:"flex-1",children:[e.jsx("p",{className:"text-sm font-medium text-green-900",children:"Content Generated Successfully!"}),e.jsx("p",{className:"text-xs text-green-700 mt-1",children:"The AI-generated content has been inserted into your letter."})]})]}),e.jsxs("div",{className:"bg-white border-2 border-purple-200 rounded-lg p-4",children:[e.jsxs("div",{className:"flex items-center justify-between mb-3",children:[e.jsx(_,{className:"text-sm font-semibold",children:"Generated Content"}),e.jsxs("div",{className:"flex gap-2",children:[e.jsxs(k,{size:"sm",variant:"outline",onClick:r,className:"h-7 px-2 gap-1",children:[e.jsx(ue,{className:"w-3 h-3"}),"Copy"]}),e.jsxs(k,{size:"sm",variant:"outline",onClick:L,disabled:c,className:"h-7 px-2 gap-1",children:[e.jsx(ke,{className:"w-3 h-3"}),"Regenerate"]})]})]}),e.jsx("div",{className:`text-sm leading-relaxed whitespace-pre-wrap ${a==="ar"?"text-right [direction:rtl]":"text-left"}`,children:E})]})]}),!M&&e.jsx("div",{className:"mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg",children:e.jsxs("div",{className:"flex items-start gap-3",children:[e.jsx(ne,{className:"w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5"}),e.jsxs("div",{className:"flex-1",children:[e.jsx("p",{className:"text-sm font-medium text-amber-900 mb-2",children:"Enable AI Generation"}),e.jsx("p",{className:"text-xs text-amber-700 mb-3",children:"To use AI-powered letter generation, add your OpenAI API key:"}),e.jsxs("ol",{className:"text-xs text-amber-700 space-y-1 ml-4 list-decimal",children:[e.jsxs("li",{children:["Get an API key from ",e.jsx("a",{href:"https://platform.openai.com/api-keys",target:"_blank",rel:"noopener noreferrer",className:"underline",children:"OpenAI"})]}),e.jsxs("li",{children:["Add ",e.jsx("code",{className:"bg-amber-100 px-1 rounded",children:"VITE_OPENAI_API_KEY=your_key"})," to ",e.jsx("code",{className:"bg-amber-100 px-1 rounded",children:".env"})," file"]}),e.jsx("li",{children:"Restart the development server"})]}),e.jsx("p",{className:"text-xs text-amber-600 mt-3 italic",children:"Note: Currently using demo mode with sample content."})]})]})})]})]})}function na(t){if(!t)return"";const[a,s,i]=t.split("-");return!a||!s||!i?t:`${i}/${s}/${a}`}function ia(t,a){return(t==="ar"?{general_manager:"المدير العام",director:"المدير",minister:"معالي الوزير",department_head:"رئيس القسم",custom:""}:{general_manager:"General Manager",director:"Director",minister:"Minister",department_head:"Department Head",custom:""})[a]||""}async function oa(t){try{if(typeof window<"u"&&window.isSecureContext&&navigator?.clipboard?.writeText)return await navigator.clipboard.writeText(t),{ok:!0,method:"clipboard"};throw new Error("Clipboard API unavailable")}catch(a){try{if(typeof document>"u")throw a;const s=document.createElement("textarea");s.value=t,s.setAttribute("readonly",""),s.style.position="fixed",s.style.top="-9999px",document.body.appendChild(s),s.select();const i=document.execCommand("copy");if(document.body.removeChild(s),!i)throw a;return{ok:!0,method:"fallback"}}catch(s){return{ok:!1,method:"fallback",error:s??a}}}}function la({entity:t,letterType:a,lang:s,authorityLevel:i,values:n}){const c=Ye(a),d=s==="ar"?`التاريخ: ${na(n.date||"")}`:`Date: ${n.date||""}`,f=n.reference_number||`REF/${t}/${new Date().getFullYear()}/${Math.floor(Math.random()*1e4)}`,x={ar:{company:"سمارت برو للأعمال والخدمات",sincerely:"وتفضلوا بقبول فائق الاحترام والتقدير",ref:"الرقم المرجعي"},en:{company:"Smartpro Business Hub & Services",sincerely:"Yours sincerely",ref:"Reference No."}},y=s==="ar"?`${x.ar.company}
ص.ب: 123، مسقط 100، سلطنة عمان
هاتف: +968 2460 0000 | فاكس: +968 2460 0001
البريد الإلكتروني: info@smartprohub.com | الموقع: www.smartprohub.com`:`${x.en.company}
P.O. Box 123, Muscat 100, Sultanate of Oman
Tel: +968 2460 0000 | Fax: +968 2460 0001
Email: info@smartprohub.com | Web: www.smartprohub.com`,p=n.recipient_org||(t==="MOCI"?s==="ar"?"وزارة التجارة والصناعة وترويج الاستثمار":"MOCI":t),h=n.recipient_role,g=h==="custom"?n.custom_recipient_role||"":ia(s,h),j=s==="ar"?`إلى: ${g?g+" – ":""}${p}`:`To: ${g?g+", ":""}${p}`,N=n.subject||n.letter_title||"",v=s==="ar"?`${x.ar.ref}: ${f}`:`${x.en.ref}: ${f}`,b=(n.ai_body||"").trim();if(b){const E=s==="ar"?"تحية طيبة وبعد،":"Dear Sir/Madam,",w=s==="ar"?x.ar.sincerely:x.en.sincerely;return[s==="ar"?x.ar.company:x.en.company,d,v,"",j,N?s==="ar"?`الموضوع: ${N}`:`Subject: ${N}`:"","",E,"",b,"",`${w},`,"",`${n.signer_name}`,`${n.signer_title}`,"",y].join(`
`)}if(c){const E={company_name:n.company_name||x.en.company,company_address:n.company_address||"P.O. Box 123, Muscat 100, Sultanate of Oman",company_address_ar:n.company_address_ar||"ص.ب 123، مسقط 100، سلطنة عمان",company_phone:n.company_phone||"+968 2460 0000",company_email:n.company_email||"info@smartprohub.com",company_website:n.company_website||"www.smartprohub.com",company_footer:s==="ar"?"":y,company_footer_ar:s==="ar"?y:"",closing:n.closing||K("en"),closing_ar:n.closing_ar||K("ar"),reference_number:f,date:n.date||new Date().toISOString().slice(0,10),recipient_role:g||(s==="ar"?"الجهة المعنية":"Concerned Authority"),recipient_org:n.recipient_org||p,subject:N,authority_level:i,signer_name:n.signer_name||"",signer_title:n.signer_title||"",employee_name:n.employee_name||"",civil_id:n.civil_id||""},w={...E,...n,recipient_role:E.recipient_role,reference_number:E.reference_number,date:E.date,subject:E.subject};return Ht(c,w,s)}return s==="ar"?`${x.ar.company}
${d}
${v}

(يرجى إكمال الحقول لاختيار النموذج المناسب)`:`${x.en.company}
${d}
${v}

(Please complete the form fields to generate your letter)`}function ja(){l.useEffect(()=>{ot({title:"Professional Letter Builder | TheSmartPro.io - Business Class Automation",description:"Create professional business letters with our advanced AI-powered builder. PDF export, templates, auto-save, and more.",keywords:"professional letter builder, business letters, PDF export, letter templates, document automation",type:"website",url:"https://thesmartpro.io/demo/professional-letter-builder"})},[]);const t=l.useMemo(()=>Ut(),[]),[a,s]=l.useState(t[0]||"MOCI"),i=l.useMemo(()=>me(t[0]||"MOCI"),[t]),[n,c]=l.useState(i[0]?.id||""),[d,f]=l.useState("ar"),[x,y]=l.useState("authorized_signatory"),[p,h]=l.useState("general_manager"),[g,j]=l.useState("editor"),[N,v]=l.useState([]),[b,E]=l.useState(!0),w=l.useMemo(()=>me(a),[a]);l.useEffect(()=>{if(w.length===0)return;w.some(o=>o.id===n)||c(w[0].id)},[a,w]);const[m,u]=l.useState({date:new Date().toISOString().slice(0,10),letter_title:"",subject:"",request_details:"",employee_name:"",civil_id:"",employment_start_date:"",department:"",noc_purpose:"",company_name:"Smartpro Business Hub & Services",company_cr:"CR-1234567",signer_name:"Mohammed Al-Harthi",signer_title:"Managing Director",recipient_name:"",recipient_org:"",recipient_role:p,custom_recipient_role:"",reference_number:"",company_address:"P.O. Box 123, Muscat 100, Sultanate of Oman",company_address_ar:"ص.ب 123، مسقط 100، سلطنة عمان",company_phone:"+968 2460 0000",company_email:"info@smartprohub.com",company_website:"www.smartprohub.com",closing:K("en"),closing_ar:K("ar"),ai_body:""});l.useEffect(()=>{u(r=>({...r,recipient_role:p}))},[p]),l.useEffect(()=>{if(b){const r=setTimeout(()=>{localStorage.setItem("letter_builder_autosave",JSON.stringify({entity:a,letterType:n,lang:d,authorityLevel:x,recipientRole:p,values:m,timestamp:Date.now()}))},2e3);return()=>clearTimeout(r)}},[a,n,d,x,p,m,b]),l.useEffect(()=>{const r=localStorage.getItem("letter_builder_drafts");if(r)try{v(JSON.parse(r))}catch(o){console.error("Failed to load drafts",o)}},[]);const D=l.useMemo(()=>la({entity:a,letterType:n,lang:d,authorityLevel:x,values:m}),[a,n,d,x,m]),[T,S]=l.useState(null),C=(r,o)=>{S({ok:r,text:o}),setTimeout(()=>S(null),3e3)},M=async r=>{const o=await oa(r);o.ok?C(!0,o.method==="clipboard"?"✓ Copied to clipboard":"✓ Copied (fallback)"):(console.error("Copy failed",o.error),C(!1,"✗ Copy failed"))},L=()=>{const r=window.open("","","width=800,height=600");r&&(r.document.write(`
        <html>
          <head>
            <title>Print Letter</title>
            <style>
              body { font-family: 'Times New Roman', serif; padding: 40px; line-height: 1.8; }
              pre { white-space: pre-wrap; font-family: inherit; }
            </style>
          </head>
          <body>
            <pre>${D}</pre>
          </body>
        </html>
      `),r.document.close(),r.print())},O=()=>{const o=[{id:Date.now().toString(),title:m.letter_title||`${a} - ${n}`,entity:a,letterType:n,lang:d,timestamp:Date.now(),values:{...m}},...N].slice(0,10);v(o),localStorage.setItem("letter_builder_drafts",JSON.stringify(o)),C(!0,"✓ Draft saved")},H=r=>{s(r.entity),c(r.letterType),f(r.lang),u(r.values),C(!0,"✓ Draft loaded"),j("editor")},Y=()=>{s("MOCI");const r=me("MOCI");c(r[0]?.id||""),f("ar"),y("authorized_signatory"),h("general_manager"),u({date:new Date().toISOString().slice(0,10),letter_title:"",subject:"",request_details:"",employee_name:"",civil_id:"",employment_start_date:"",department:"",noc_purpose:"",recipient_name:"",recipient_org:"",recipient_role:"general_manager",custom_recipient_role:"",reference_number:"",company_name:"Smartpro Business Hub & Services",company_cr:"CR-1234567",signer_name:"Mohammed Al-Harthi",signer_title:"Managing Director",company_address:"P.O. Box 123, Muscat 100, Sultanate of Oman",company_address_ar:"ص.ب 123، مسقط 100، سلطنة عمان",company_phone:"+968 2460 0000",company_email:"info@smartprohub.com",company_website:"www.smartprohub.com",closing:K("en"),closing_ar:K("ar"),ai_body:""})},F=l.useMemo(()=>Ye(n),[n]);return e.jsxs("div",{className:"min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100",children:[e.jsx("div",{className:"bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 border-b border-white/20 sticky top-0 z-50 backdrop-blur-lg shadow-2xl",children:e.jsx("div",{className:"max-w-[1800px] mx-auto px-6 py-5",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("div",{className:"w-12 h-12 bg-white/20 backdrop-blur-xl rounded-xl flex items-center justify-center shadow-lg",children:e.jsx(pe,{className:"w-6 h-6 text-white"})}),e.jsxs("div",{children:[e.jsxs("h1",{className:"text-2xl font-bold text-white flex items-center gap-2",children:["Professional Letter Builder",e.jsx("span",{className:"text-xs bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full font-semibold",children:"PRO"})]}),e.jsx("p",{className:"text-sm text-blue-100",children:"Business-Class Document Automation"})]})]}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsxs(k,{variant:"ghost",className:"text-white hover:bg-white/20",onClick:()=>E(!b),children:[e.jsx(be,{className:`w-4 h-4 mr-2 ${b?"text-green-300":"text-gray-300"}`}),"Auto-save ",b?"ON":"OFF"]}),e.jsx(lt,{href:"/docs/workflow-automation",children:e.jsxs(k,{variant:"secondary",className:"gap-2 shadow-lg",children:[e.jsx(ut,{className:"w-4 h-4"}),"Back to Docs"]})})]})]})})}),e.jsxs("div",{className:"max-w-[1800px] mx-auto p-6",children:[e.jsxs(Kt,{value:g,onValueChange:j,className:"space-y-6",children:[e.jsxs(Wt,{className:"grid w-full grid-cols-3 lg:w-[600px] bg-white/60 backdrop-blur-xl p-1 shadow-lg",children:[e.jsxs(ce,{value:"editor",className:"gap-2",children:[e.jsx(ie,{className:"w-4 h-4"}),"Editor"]}),e.jsxs(ce,{value:"preview",className:"gap-2",children:[e.jsx(ve,{className:"w-4 h-4"}),"Preview"]}),e.jsxs(ce,{value:"history",className:"gap-2",children:[e.jsx(yt,{className:"w-4 h-4"}),"Drafts (",N.length,")"]})]}),e.jsx(de,{value:"editor",className:"space-y-6",children:e.jsxs("div",{className:"grid grid-cols-1 xl:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-6",children:[e.jsxs(J,{className:"shadow-2xl rounded-3xl border-2 border-white/50 bg-white/80 backdrop-blur-xl",children:[e.jsx(Q,{className:"border-b bg-gradient-to-r from-blue-50 to-indigo-50",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs(X,{className:"text-xl flex items-center gap-2",children:[e.jsx(gt,{className:"w-5 h-5 text-blue-600"}),"Letter Configuration"]}),e.jsxs("div",{className:"flex gap-2",children:[e.jsxs(k,{variant:"outline",size:"sm",onClick:Y,children:[e.jsx(ke,{className:"w-4 h-4 mr-2"})," Reset"]}),e.jsxs(k,{size:"sm",onClick:O,className:"bg-gradient-to-r from-blue-600 to-indigo-600",children:[e.jsx(be,{className:"w-4 h-4 mr-2"})," Save Draft"]})]})]})}),e.jsxs(Z,{className:"p-6 space-y-6 max-h-[calc(100vh-300px)] overflow-y-auto",children:[e.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx(_,{className:"text-sm font-semibold text-gray-700",children:"Government Entity"}),e.jsxs(G,{value:a,onValueChange:s,children:[e.jsx(B,{className:"border-2 border-gray-200 focus:border-blue-500",children:e.jsx(z,{})}),e.jsx(V,{children:t.map(r=>{const o=Yt[r]||{en:r,icon:"📄"};return e.jsxs(P,{value:r,children:[o.icon," ",o.en]},r)})})]})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(_,{className:"text-sm font-semibold text-gray-700",children:"Letter Type"}),e.jsxs(G,{value:n,onValueChange:c,children:[e.jsx(B,{className:"border-2 border-gray-200 focus:border-blue-500",children:e.jsx(z,{placeholder:"Select template"})}),e.jsx(V,{children:w.map(r=>e.jsxs(P,{value:r.id,children:[r.icon," ",d==="ar"?r.nameAr:r.name]},r.id))})]})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(_,{className:"text-sm font-semibold text-gray-700",children:"Language"}),e.jsxs(G,{value:d,onValueChange:r=>f(r),children:[e.jsx(B,{className:"border-2 border-gray-200 focus:border-blue-500",children:e.jsx(z,{})}),e.jsxs(V,{children:[e.jsx(P,{value:"ar",children:"🇴🇲 Arabic - العربية"}),e.jsx(P,{value:"en",children:"🇬🇧 English"})]})]})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(_,{className:"text-sm font-semibold text-gray-700",children:"Authority Level"}),e.jsxs(G,{value:x,onValueChange:y,children:[e.jsx(B,{className:"border-2 border-gray-200 focus:border-blue-500",children:e.jsx(z,{})}),e.jsxs(V,{children:[e.jsx(P,{value:"authorized_signatory",children:"⭐ Authorized Signatory"}),e.jsx(P,{value:"hr_manager",children:"👤 HR Manager"})]})]})]})]}),e.jsxs("div",{className:"space-y-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-100",children:[e.jsxs("h3",{className:"font-semibold text-gray-800 flex items-center gap-2",children:[e.jsx(ct,{className:"w-4 h-4"}),"Recipient Information"]}),e.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx(_,{className:"text-sm font-medium",children:"Recipient Role"}),e.jsxs(G,{value:p,onValueChange:r=>h(r),children:[e.jsx(B,{children:e.jsx(z,{})}),e.jsxs(V,{children:[e.jsx(P,{value:"general_manager",children:"General Manager / المدير العام"}),e.jsx(P,{value:"director",children:"Director / المدير"}),e.jsx(P,{value:"minister",children:"Minister / معالي الوزير"}),e.jsx(P,{value:"department_head",children:"Department Head / رئيس القسم"}),e.jsx(P,{value:"custom",children:"Custom Role"})]})]})]}),p==="custom"&&e.jsxs("div",{className:"space-y-2",children:[e.jsx(_,{className:"text-sm font-medium",children:"Custom Role"}),e.jsx(I,{value:m.custom_recipient_role,onChange:r=>u(o=>({...o,custom_recipient_role:r.target.value})),placeholder:"Enter custom role..."})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(_,{className:"text-sm font-medium",children:"Recipient Name"}),e.jsx(I,{value:m.recipient_name,onChange:r=>u(o=>({...o,recipient_name:r.target.value})),placeholder:"Optional"})]}),e.jsxs("div",{className:"space-y-2 col-span-2",children:[e.jsx(_,{className:"text-sm font-medium",children:"Organization"}),e.jsx(I,{value:m.recipient_org,onChange:r=>u(o=>({...o,recipient_org:r.target.value})),placeholder:"Recipient organization..."})]})]})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx(_,{className:"text-sm font-semibold",children:"Letter Title"}),e.jsx(I,{value:m.letter_title,onChange:r=>u(o=>({...o,letter_title:r.target.value})),placeholder:"Brief title..."})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(_,{className:"text-sm font-semibold",children:"Subject"}),e.jsx(I,{value:m.subject,onChange:r=>u(o=>({...o,subject:r.target.value})),placeholder:"Letter subject..."})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(_,{className:"text-sm font-semibold",children:"Date"}),e.jsx(I,{type:"date",value:m.date,onChange:r=>u(o=>({...o,date:r.target.value}))})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(_,{className:"text-sm font-semibold",children:"Reference Number"}),e.jsx(I,{value:m.reference_number,onChange:r=>u(o=>({...o,reference_number:r.target.value})),placeholder:"Auto-generated if empty"})]})]}),e.jsxs("div",{className:"space-y-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-purple-100",children:[e.jsx("h3",{className:"font-semibold text-gray-800",children:"Employee Details"}),e.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx(_,{className:"text-sm font-medium",children:"Employee Name"}),e.jsx(I,{value:m.employee_name,onChange:r=>u(o=>({...o,employee_name:r.target.value})),placeholder:"Full name..."})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(_,{className:"text-sm font-medium",children:"Civil ID"}),e.jsx(I,{value:m.civil_id,onChange:r=>u(o=>({...o,civil_id:r.target.value})),placeholder:"12345678"})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(_,{className:"text-sm font-medium",children:"Start Date"}),e.jsx(I,{type:"date",value:m.employment_start_date,onChange:r=>u(o=>({...o,employment_start_date:r.target.value}))})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(_,{className:"text-sm font-medium",children:"Department"}),e.jsx(I,{value:m.department,onChange:r=>u(o=>({...o,department:r.target.value})),placeholder:"Department name..."})]}),e.jsxs("div",{className:"space-y-2 col-span-2",children:[e.jsx(_,{className:"text-sm font-medium",children:"Request Details / NOC Purpose"}),e.jsx(ee,{value:m.request_details||m.noc_purpose,onChange:r=>u(o=>({...o,request_details:r.target.value,noc_purpose:r.target.value})),placeholder:"Describe the purpose...",rows:3})]})]})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx(_,{className:"text-sm font-semibold",children:"Company Name"}),e.jsx(I,{value:m.company_name,onChange:r=>u(o=>({...o,company_name:r.target.value}))})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(_,{className:"text-sm font-semibold",children:"CR Number"}),e.jsx(I,{value:m.company_cr,onChange:r=>u(o=>({...o,company_cr:r.target.value}))})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(_,{className:"text-sm font-semibold",children:"Signer Name"}),e.jsx(I,{value:m.signer_name,onChange:r=>u(o=>({...o,signer_name:r.target.value}))})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(_,{className:"text-sm font-semibold",children:"Signer Title"}),e.jsx(I,{value:m.signer_title,onChange:r=>u(o=>({...o,signer_title:r.target.value}))})]})]}),e.jsxs("div",{className:"space-y-4 p-4 bg-white/70 border border-slate-200 rounded-xl",children:[e.jsxs("h3",{className:"font-semibold text-gray-800 flex items-center gap-2",children:[e.jsx(xt,{className:"w-4 h-4 text-slate-600"}),"Company Contact Details"]}),e.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[e.jsxs("div",{className:"space-y-2 col-span-2",children:[e.jsx(_,{className:"text-sm font-medium",children:"Company Address (EN)"}),e.jsx(ee,{value:m.company_address,onChange:r=>u(o=>({...o,company_address:r.target.value})),rows:2})]}),e.jsxs("div",{className:"space-y-2 col-span-2",children:[e.jsx(_,{className:"text-sm font-medium",children:"Company Address (AR)"}),e.jsx(ee,{value:m.company_address_ar,onChange:r=>u(o=>({...o,company_address_ar:r.target.value})),rows:2,className:"text-right [direction:rtl]"})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(_,{className:"text-sm font-medium",children:"Company Phone"}),e.jsx(I,{value:m.company_phone,onChange:r=>u(o=>({...o,company_phone:r.target.value}))})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(_,{className:"text-sm font-medium",children:"Company Email"}),e.jsx(I,{type:"email",value:m.company_email,onChange:r=>u(o=>({...o,company_email:r.target.value}))})]}),e.jsxs("div",{className:"space-y-2 col-span-2",children:[e.jsx(_,{className:"text-sm font-medium",children:"Website"}),e.jsx(I,{value:m.company_website,onChange:r=>u(o=>({...o,company_website:r.target.value}))})]})]})]})]})]}),(F||w.length>0)&&e.jsx(ra,{template:F||w[0],language:d,existingValues:m,onContentGenerated:r=>{u(o=>{const A={...o,ai_body:r,request_details:o.request_details||o.noc_purpose};if(!o.subject&&(F||w[0])){const R=F||w[0];A.subject=o.subject||(d==="ar"?R.nameAr:R.name)}return A})},onSubjectGenerated:r=>{u(o=>({...o,subject:r}))}})]}),e.jsxs(J,{className:"shadow-2xl rounded-3xl border-2 border-white/50 bg-white backdrop-blur-xl",children:[e.jsx(Q,{className:"border-b bg-gradient-to-r from-indigo-50 to-purple-50",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs(X,{className:"text-xl flex items-center gap-2",children:[e.jsx(ve,{className:"w-5 h-5 text-indigo-600"}),"Live Preview"]}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx(k,{variant:"outline",size:"sm",onClick:L,children:e.jsx(_e,{className:"w-4 h-4"})}),e.jsx(k,{variant:"outline",size:"sm",onClick:()=>M(D),children:e.jsx(ue,{className:"w-4 h-4"})}),e.jsxs(k,{size:"sm",className:"bg-gradient-to-r from-green-600 to-emerald-600",onClick:L,children:[e.jsx(je,{className:"w-4 h-4 mr-2"})," Export / Save as PDF"]})]})]})}),e.jsx(Z,{className:"p-0",children:e.jsx(oe.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.3},className:"h-full",children:e.jsx("div",{className:"p-8 max-h-[calc(100vh-300px)] overflow-y-auto",children:e.jsx("div",{className:`whitespace-pre-wrap bg-white rounded-2xl p-12 shadow-inner border-2 border-gray-100 min-h-[600px] leading-relaxed text-base ${d==="ar"?"text-right font-arabic":"text-left"} ${d==="ar"?"[direction:rtl]":"[direction:ltr]"}`,style:{fontFamily:d==="ar"?"'Noto Kufi Arabic', 'Arabic Typesetting', serif":"'Times New Roman', serif"},children:D})})})})]})]})}),e.jsx(de,{value:"preview",className:"space-y-6",children:e.jsxs(J,{className:"shadow-2xl rounded-3xl border-2 border-white/50 bg-white backdrop-blur-xl",children:[e.jsx(Q,{className:"border-b bg-gradient-to-r from-green-50 to-emerald-50",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx(X,{className:"text-2xl",children:"Print Preview"}),e.jsxs("div",{className:"flex gap-3",children:[e.jsxs(k,{onClick:L,className:"bg-gradient-to-r from-blue-600 to-indigo-600",children:[e.jsx(_e,{className:"w-4 h-4 mr-2"})," Print"]}),e.jsxs(k,{onClick:()=>M(D),className:"bg-gradient-to-r from-purple-600 to-pink-600",children:[e.jsx(ue,{className:"w-4 h-4 mr-2"})," Copy"]}),e.jsxs(k,{className:"bg-gradient-to-r from-green-600 to-emerald-600",onClick:L,children:[e.jsx(je,{className:"w-4 h-4 mr-2"})," Download PDF"]})]})]})}),e.jsx(Z,{className:"p-12",children:e.jsx("div",{className:"max-w-[800px] mx-auto bg-white shadow-2xl rounded-lg p-16 border",children:e.jsx("div",{className:`whitespace-pre-wrap leading-loose text-lg ${d==="ar"?"text-right":"text-left"}`,style:{fontFamily:d==="ar"?"'Noto Kufi Arabic', 'Arabic Typesetting', serif":"'Times New Roman', serif"},children:D})})})]})}),e.jsx(de,{value:"history",className:"space-y-6",children:e.jsxs(J,{className:"shadow-2xl rounded-3xl border-2 border-white/50 bg-white/80 backdrop-blur-xl",children:[e.jsx(Q,{className:"border-b bg-gradient-to-r from-amber-50 to-orange-50",children:e.jsxs(X,{className:"text-2xl flex items-center gap-2",children:[e.jsx(fe,{className:"w-6 h-6 text-amber-600"}),"Saved Drafts"]})}),e.jsx(Z,{className:"p-6",children:N.length===0?e.jsxs("div",{className:"text-center py-12 text-gray-500",children:[e.jsx(ie,{className:"w-16 h-16 mx-auto mb-4 text-gray-300"}),e.jsx("p",{className:"text-lg font-medium",children:"No saved drafts yet"}),e.jsx("p",{className:"text-sm",children:"Start creating letters to see them here"})]}):e.jsx("div",{className:"grid gap-4",children:N.map(r=>e.jsx(oe.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},className:"p-6 bg-gradient-to-r from-white to-gray-50 rounded-xl border-2 border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all cursor-pointer",onClick:()=>H(r),children:e.jsxs("div",{className:"flex items-start justify-between",children:[e.jsxs("div",{className:"flex-1",children:[e.jsx("h3",{className:"font-bold text-lg text-gray-900 mb-2",children:r.title}),e.jsxs("div",{className:"flex items-center gap-4 text-sm text-gray-600",children:[e.jsxs("span",{className:"flex items-center gap-1",children:[e.jsx(ie,{className:"w-4 h-4"}),r.entity," - ",r.letterType]}),e.jsx("span",{className:"flex items-center gap-1",children:r.lang==="ar"?"🇴🇲 AR":"🇬🇧 EN"}),e.jsxs("span",{className:"flex items-center gap-1",children:[e.jsx(fe,{className:"w-4 h-4"}),new Date(r.timestamp).toLocaleString()]})]})]}),e.jsxs(k,{size:"sm",variant:"outline",className:"gap-2",children:["Load ",e.jsx(ht,{className:"w-4 h-4"})]})]})},r.id))})})]})})]}),e.jsx(At,{children:T&&e.jsx(oe.div,{initial:{opacity:0,y:50,scale:.9},animate:{opacity:1,y:0,scale:1},exit:{opacity:0,y:20,scale:.9},className:"fixed bottom-8 right-8 z-50",children:e.jsxs("div",{className:`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-xl border-2 ${T.ok?"bg-green-500/90 border-green-300 text-white":"bg-red-500/90 border-red-300 text-white"}`,children:[T.ok?e.jsx(dt,{className:"w-6 h-6"}):e.jsx(Se,{className:"w-6 h-6"}),e.jsx("span",{className:"font-semibold text-lg",children:T.text})]})})})]})]})}export{ja as default,na as formatDate,la as renderProfessionalLetter};
