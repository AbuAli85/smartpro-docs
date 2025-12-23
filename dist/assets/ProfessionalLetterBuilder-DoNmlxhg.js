import{m as de,r as c,am as De,a3 as qe,j as e,a4 as Le,a5 as Oe,a7 as Y,aD as _e,aE as Me,aF as $e,a8 as te,a9 as Ge,w as J,b as V,c as W,d as H,k as le,Z as Be,aG as ae,e as K,B as v,z as je,u as Fe,s as ze,L as Ve,h as se,n as We,p as re,C as ue,x as He,q as Ke,f as Ue}from"./index-DIo96AMZ.js";import{I as b}from"./input-XW9KhG0P.js";import{T as U}from"./textarea-DfCsO8IO.js";import{L as m}from"./label-TTCYupU1.js";import{S as $,a as G,b as B,c as F,d as A}from"./select-DyQSLHyb.js";import{B as xe}from"./badge-H49p9_qL.js";import{P as Ye,T as Je}from"./trash-2-veRxRh1J.js";import{L as Qe}from"./loader-circle-DJBo0qB1.js";import{C as ce}from"./copy-DfLVpXaV.js";import{R as ve}from"./refresh-cw-BYeEWKck.js";import{S as ye}from"./save-BoPC5hJ-.js";import{A as Xe}from"./arrow-left-DQhq1YZw.js";import{E as he}from"./eye-Cdb6Rdaw.js";import{H as Ze}from"./history-BFyzY8Ok.js";import{P as ge}from"./printer-J_3j1Fsp.js";import{D as fe}from"./download-ChB3B2nV.js";const et=de("Image",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]]);const tt=de("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);const be=de("WandSparkles",[["path",{d:"m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72",key:"ul74o6"}],["path",{d:"m14 7 3 3",key:"1r5n42"}],["path",{d:"M5 6v4",key:"ilb8ba"}],["path",{d:"M19 14v4",key:"blhpug"}],["path",{d:"M10 2v2",key:"7u0qdc"}],["path",{d:"M7 8H3",key:"zfb6yr"}],["path",{d:"M21 16h-4",key:"1cnmox"}],["path",{d:"M11 3H9",key:"1obp7u"}]]);var Q="Tabs",[at]=Le(Q,[_e]),Ne=_e(),[st,me]=at(Q),we=c.forwardRef((r,a)=>{const{__scopeTabs:i,value:o,onValueChange:n,defaultValue:u,orientation:l="horizontal",dir:g,activationMode:x="automatic",..._}=r,h=De(g),[f,N]=qe({prop:o,onChange:n,defaultProp:u??"",caller:Q});return e.jsx(st,{scope:i,baseId:Oe(),value:f,onValueChange:N,orientation:l,dir:h,activationMode:x,children:e.jsx(Y.div,{dir:h,"data-orientation":l,..._,ref:a})})});we.displayName=Q;var Ce="TabsList",Ae=c.forwardRef((r,a)=>{const{__scopeTabs:i,loop:o=!0,...n}=r,u=me(Ce,i),l=Ne(i);return e.jsx(Me,{asChild:!0,...l,orientation:u.orientation,dir:u.dir,loop:o,children:e.jsx(Y.div,{role:"tablist","aria-orientation":u.orientation,...n,ref:a})})});Ae.displayName=Ce;var Se="TabsTrigger",Ee=c.forwardRef((r,a)=>{const{__scopeTabs:i,value:o,disabled:n=!1,...u}=r,l=me(Se,i),g=Ne(i),x=Ie(l.baseId,o),_=Pe(l.baseId,o),h=o===l.value;return e.jsx($e,{asChild:!0,...g,focusable:!n,active:h,children:e.jsx(Y.button,{type:"button",role:"tab","aria-selected":h,"aria-controls":_,"data-state":h?"active":"inactive","data-disabled":n?"":void 0,disabled:n,id:x,...u,ref:a,onMouseDown:te(r.onMouseDown,f=>{!n&&f.button===0&&f.ctrlKey===!1?l.onValueChange(o):f.preventDefault()}),onKeyDown:te(r.onKeyDown,f=>{[" ","Enter"].includes(f.key)&&l.onValueChange(o)}),onFocus:te(r.onFocus,()=>{const f=l.activationMode!=="manual";!h&&!n&&f&&l.onValueChange(o)})})})});Ee.displayName=Se;var Te="TabsContent",ke=c.forwardRef((r,a)=>{const{__scopeTabs:i,value:o,forceMount:n,children:u,...l}=r,g=me(Te,i),x=Ie(g.baseId,o),_=Pe(g.baseId,o),h=o===g.value,f=c.useRef(h);return c.useEffect(()=>{const N=requestAnimationFrame(()=>f.current=!1);return()=>cancelAnimationFrame(N)},[]),e.jsx(Ge,{present:n||h,children:({present:N})=>e.jsx(Y.div,{"data-state":h?"active":"inactive","data-orientation":g.orientation,role:"tabpanel","aria-labelledby":x,hidden:!N,id:_,tabIndex:0,...l,ref:a,style:{...r.style,animationDuration:f.current?"0s":void 0},children:N&&u})})});ke.displayName=Te;function Ie(r,a){return`${r}-trigger-${a}`}function Pe(r,a){return`${r}-content-${a}`}var rt=we,nt=Ae,it=Ee,ot=ke;function lt({className:r,...a}){return e.jsx(rt,{"data-slot":"tabs",className:J("flex flex-col gap-2",r),...a})}function ct({className:r,...a}){return e.jsx(nt,{"data-slot":"tabs-list",className:J("bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",r),...a})}function ne({className:r,...a}){return e.jsx(it,{"data-slot":"tabs-trigger",className:J("data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",r),...a})}function ie({className:r,...a}){return e.jsx(ot,{"data-slot":"tabs-content",className:J("flex-1 outline-none",r),...a})}const pe=[{id:"moci_noc",name:"No-Objection Certificate (NOC)",nameAr:"خطاب عدم ممانعة",category:"MOCI",icon:"📄",description:"Certificate stating no objection for employee to perform specific activity",descriptionAr:"شهادة تفيد بعدم الممانعة على قيام الموظف بنشاط معين",tags:["employment","clearance","permit"],fields:[{id:"employee_name",label:"Employee Name",type:"text",required:!0,placeholder:"Full name"},{id:"civil_id",label:"Civil ID",type:"text",required:!0,placeholder:"12345678"},{id:"noc_purpose",label:"Purpose of NOC",type:"textarea",required:!0,placeholder:"Describe the purpose..."},{id:"department",label:"Department",type:"text",placeholder:"Department name"},{id:"employment_start_date",label:"Employment Start Date",type:"date"}],templateEn:`{company_name}
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
{signer_title}`}];function dt(){const r=new Set(pe.map(i=>i.category));return Array.from(r).sort()}function oe(r){return pe.filter(a=>a.category===r)}function Re(r){return pe.find(a=>a.id===r)}function mt(r,a,i){let n=i==="ar"?r.templateAr:r.templateEn;return Object.entries(a).forEach(([u,l])=>{const g=`{${u}}`;n=n.replace(new RegExp(g,"g"),l||`[${u}]`)}),n}function z(r){return r==="ar"?"وتفضلوا بقبول فائق الاحترام والتقدير":"Yours sincerely"}const pt={MOCI:{en:"Ministry of Commerce",ar:"وزارة التجارة",icon:"🏢"},ROP:{en:"Royal Oman Police",ar:"شرطة عمان السلطانية",icon:"🚔"},MOL:{en:"Ministry of Labour",ar:"وزارة العمل",icon:"👔"},GENERAL:{en:"General Business",ar:"أعمال عامة",icon:"📄"},BANK:{en:"Banking & Finance",ar:"البنوك والمالية",icon:"🏦"}},ut="";function xt(r){const{template:a,language:i,userInputs:o,existingValues:n}=r,u=i==="ar"?"Arabic":"English";return`You are a professional business letter writer for Oman. Generate a ${u} letter with these requirements:

LETTER TYPE: ${a.name} (${a.nameAr})
CATEGORY: ${a.category}
LANGUAGE: ${u}
TONE: ${o.tone||"professional"}

CONTEXT:
- Company: ${n.company_name||"[Company Name]"}
- Recipient: ${o.recipientName||n.recipient_org||"[Recipient]"}
- Purpose: ${o.purpose||a.description}

${o.keyPoints&&o.keyPoints.length>0?`
KEY POINTS TO INCLUDE:
${o.keyPoints.map((g,x)=>`${x+1}. ${g}`).join(`
`)}
`:""}

${o.context?`
ADDITIONAL CONTEXT:
${o.context}
`:""}

REQUIREMENTS:
1. Write ONLY the letter body (main content paragraphs)
2. Use formal, professional ${u} language
3. Be concise but complete (2-4 paragraphs)
4. Include all relevant details
5. Maintain appropriate formality for ${a.category} letters
6. For Arabic: Use proper formal Arabic (الفصحى)
7. Do NOT include header, date, recipient address, or signature
8. Do NOT include placeholders like [Name] - use the actual provided information

${i==="ar"?`
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

Generate the letter body NOW:`}function yt(r){const{template:a,language:i}=r,n={moci_noc:i==="ar"?'تأكد من ذكر "لا مانع لدينا" بوضوح والإشارة إلى أن الشركة غير مسؤولة.':'Clearly state "no objection" and mention that the company bears no liability.',rop_verification:i==="ar"?"ركز على التحقق من العمل والمعلومات الدقيقة عن الموظف.":"Focus on employment verification with accurate employee details.",mol_labour_clearance:i==="ar"?"اذكر تفاصيل تصريح العمل ومؤهلات الموظف بوضوح.":"Mention work permit details and employee qualifications clearly.",general_salary_certificate:i==="ar"?"اذكر الراتب والبدلات بوضوح مع تأكيد استمرار العمل.":"State salary and allowances clearly with employment confirmation.",bank_loan_application:i==="ar"?"ركز على القدرة المالية والضمانات المقدمة.":"Focus on financial capability and collateral offered."}[a.id]||"";return n?`

SPECIAL INSTRUCTIONS FOR THIS LETTER TYPE:
${n}`:""}async function ht(r,a){return{success:!1,error:"OpenAI API key not configured. Please add VITE_OPENAI_API_KEY to your .env file."}}async function gt(r){return xt(r),yt(r),await ht()}async function ft(r,a){return[]}function bt(r){const{template:a,language:i,userInputs:o}=r;return{success:!0,content:i==="ar"?`نود إفادتكم بأن ${o.recipientName||"الجهة المعنية"} ${o.purpose||a.description}.

نحيطكم علماً بأن هذا الخطاب صادر بناءً على الطلب المقدم، ونؤكد التزامنا الكامل بجميع الأنظمة واللوائح المعمول بها.

نأمل أن تجدوا في هذا ما يفي بالغرض، ونحن على استعداد تام لتقديم أي معلومات إضافية قد تحتاجونها.`:`We would like to inform you that ${o.recipientName||"the concerned party"} ${o.purpose||a.description}.

This letter is issued upon request, and we confirm our full commitment to all applicable regulations and guidelines.

We hope this serves the intended purpose, and we remain at your disposal should you require any additional information.`,usage:{promptTokens:0,completionTokens:0,totalTokens:0}}}function _t(){return!!ut}function jt({template:r,language:a,existingValues:i,onContentGenerated:o,onSubjectGenerated:n}){const[u,l]=c.useState(!1),[g,x]=c.useState(""),[_,h]=c.useState(""),[f,N]=c.useState(""),[E,S]=c.useState([""]),[k,T]=c.useState("professional"),[C,w]=c.useState(""),[d,p]=c.useState(""),[P,R]=c.useState(!1),[L,O]=c.useState(!1),D=_t(),q=async()=>{l(!0),p(""),R(!1);try{const y={template:r,language:a,userInputs:{recipientName:g,purpose:_,keyPoints:E.filter(I=>I.trim().length>0),context:f,tone:k},existingValues:i},j=D?await gt(y):bt(y);j.success&&j.content?(w(j.content),o(j.content),R(!0),j.usage&&console.log("AI Usage:",j.usage)):p(j.error||"Failed to generate content")}catch(y){p(y instanceof Error?y.message:"An error occurred")}finally{l(!1)}},X=async()=>{if(_){l(!0);try{const y=await ft(_,a);y.length>0&&n&&n(y[0])}catch(y){console.error("Failed to generate subject:",y)}finally{l(!1)}}},Z=()=>{S([...E,""])},ee=(y,j)=>{const I=[...E];I[y]=j,S(I)},M=y=>{S(E.filter((j,I)=>I!==y))},t=()=>{C&&navigator.clipboard.writeText(C)},s=_.trim().length>0||f.trim().length>0;return e.jsxs(V,{className:"border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50",children:[e.jsx(W,{className:"border-b bg-gradient-to-r from-purple-100 to-pink-100",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs(H,{className:"text-lg flex items-center gap-2",children:[e.jsx(le,{className:"w-5 h-5 text-purple-600"}),"AI Letter Generator",e.jsxs(xe,{variant:"secondary",className:"ml-2 gap-1",children:[e.jsx(Be,{className:"w-3 h-3"}),D?"GPT-4":"Demo Mode"]})]}),!D&&e.jsxs(xe,{variant:"outline",className:"text-xs",children:[e.jsx(ae,{className:"w-3 h-3 mr-1"}),"Add API key to enable"]})]})}),e.jsxs(K,{className:"p-6 space-y-4",children:[e.jsx("div",{className:"bg-purple-100 border border-purple-300 rounded-lg p-4",children:e.jsxs("div",{className:"flex items-start gap-3",children:[e.jsx(ae,{className:"w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5"}),e.jsxs("div",{className:"flex-1",children:[e.jsx("p",{className:"text-sm text-purple-900 font-medium mb-1",children:"How it works"}),e.jsxs("p",{className:"text-xs text-purple-700",children:["Provide basic details below, and AI will generate a professional letter body tailored to your needs. The content will be professionally formatted in ",a==="ar"?"Arabic":"English","."]})]})]})}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs(m,{className:"text-sm font-semibold flex items-center gap-2",children:[e.jsx("span",{children:"Recipient Name"}),e.jsx("span",{className:"text-xs text-gray-500 font-normal",children:"(Optional)"})]}),e.jsx(b,{value:g,onChange:y=>x(y.target.value),placeholder:a==="ar"?"السيد محمد":"Mr. Mohammed Al-Harthi",className:"border-2 focus:border-purple-500"})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs(m,{className:"text-sm font-semibold flex items-center gap-2",children:[e.jsx("span",{children:"Purpose / Main Topic"}),e.jsx("span",{className:"text-xs text-red-500",children:"*"})]}),e.jsx(U,{value:_,onChange:y=>h(y.target.value),placeholder:a==="ar"?"مثال: طلب قرض بنكي لتوسعة الأعمال":"e.g., Request for bank loan to expand business operations",rows:2,className:"border-2 focus:border-purple-500"}),n&&_.trim()&&e.jsxs(v,{size:"sm",variant:"outline",onClick:X,disabled:u,className:"gap-2",children:[e.jsx(be,{className:"w-3 h-3"}),"Generate Subject Line"]})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx(m,{className:"text-sm font-semibold",children:"Key Points to Include"}),e.jsxs(v,{size:"sm",variant:"ghost",onClick:Z,className:"h-7 px-2 text-xs gap-1",children:[e.jsx(Ye,{className:"w-3 h-3"}),"Add Point"]})]}),e.jsx("div",{className:"space-y-2",children:E.map((y,j)=>e.jsxs("div",{className:"flex gap-2",children:[e.jsx(b,{value:y,onChange:I=>ee(j,I.target.value),placeholder:`Point ${j+1}...`,className:"flex-1 border-2 focus:border-purple-500"}),E.length>1&&e.jsx(v,{size:"sm",variant:"ghost",onClick:()=>M(j),className:"px-2",children:e.jsx(Je,{className:"w-4 h-4 text-red-500"})})]},j))})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs(v,{variant:"ghost",size:"sm",onClick:()=>O(!L),className:"text-xs gap-2 h-7",children:[e.jsx(be,{className:"w-3 h-3"}),L?"Hide":"Show"," Advanced Options"]}),L&&e.jsxs("div",{className:"space-y-3 p-4 bg-white/50 rounded-lg border border-purple-200",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx(m,{className:"text-sm font-semibold",children:"Tone"}),e.jsxs($,{value:k,onValueChange:y=>T(y),children:[e.jsx(G,{className:"border-2",children:e.jsx(B,{})}),e.jsxs(F,{children:[e.jsx(A,{value:"formal",children:"Formal (Very official)"}),e.jsx(A,{value:"professional",children:"Professional (Standard)"}),e.jsx(A,{value:"friendly",children:"Friendly (Approachable)"})]})]})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(m,{className:"text-sm font-semibold",children:"Additional Context"}),e.jsx(U,{value:f,onChange:y=>N(y.target.value),placeholder:"Any additional details or background information...",rows:3,className:"border-2 focus:border-purple-500"})]})]})]}),e.jsx(v,{onClick:q,disabled:!s||u,className:"w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 gap-2 py-6",size:"lg",children:u?e.jsxs(e.Fragment,{children:[e.jsx(Qe,{className:"w-5 h-5 animate-spin"}),"Generating with AI..."]}):e.jsxs(e.Fragment,{children:[e.jsx(le,{className:"w-5 h-5"}),"Generate Professional Letter"]})}),d&&e.jsxs("div",{className:"flex items-start gap-2 p-4 bg-red-50 border border-red-200 rounded-lg",children:[e.jsx(je,{className:"w-5 h-5 text-red-600 flex-shrink-0 mt-0.5"}),e.jsxs("div",{className:"flex-1",children:[e.jsx("p",{className:"text-sm font-medium text-red-900",children:"Generation Failed"}),e.jsx("p",{className:"text-xs text-red-700 mt-1",children:d})]})]}),P&&C&&e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"flex items-start gap-2 p-4 bg-green-50 border border-green-200 rounded-lg",children:[e.jsx(Fe,{className:"w-5 h-5 text-green-600 flex-shrink-0 mt-0.5"}),e.jsxs("div",{className:"flex-1",children:[e.jsx("p",{className:"text-sm font-medium text-green-900",children:"Content Generated Successfully!"}),e.jsx("p",{className:"text-xs text-green-700 mt-1",children:"The AI-generated content has been inserted into your letter."})]})]}),e.jsxs("div",{className:"bg-white border-2 border-purple-200 rounded-lg p-4",children:[e.jsxs("div",{className:"flex items-center justify-between mb-3",children:[e.jsx(m,{className:"text-sm font-semibold",children:"Generated Content"}),e.jsxs("div",{className:"flex gap-2",children:[e.jsxs(v,{size:"sm",variant:"outline",onClick:t,className:"h-7 px-2 gap-1",children:[e.jsx(ce,{className:"w-3 h-3"}),"Copy"]}),e.jsxs(v,{size:"sm",variant:"outline",onClick:q,disabled:u,className:"h-7 px-2 gap-1",children:[e.jsx(ve,{className:"w-3 h-3"}),"Regenerate"]})]})]}),e.jsx("div",{className:`text-sm leading-relaxed whitespace-pre-wrap ${a==="ar"?"text-right [direction:rtl]":"text-left"}`,children:C})]})]}),!D&&e.jsx("div",{className:"mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg",children:e.jsxs("div",{className:"flex items-start gap-3",children:[e.jsx(ae,{className:"w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5"}),e.jsxs("div",{className:"flex-1",children:[e.jsx("p",{className:"text-sm font-medium text-amber-900 mb-2",children:"Enable AI Generation"}),e.jsx("p",{className:"text-xs text-amber-700 mb-3",children:"To use AI-powered letter generation, add your OpenAI API key:"}),e.jsxs("ol",{className:"text-xs text-amber-700 space-y-1 ml-4 list-decimal",children:[e.jsxs("li",{children:["Get an API key from ",e.jsx("a",{href:"https://platform.openai.com/api-keys",target:"_blank",rel:"noopener noreferrer",className:"underline",children:"OpenAI"})]}),e.jsxs("li",{children:["Add ",e.jsx("code",{className:"bg-amber-100 px-1 rounded",children:"VITE_OPENAI_API_KEY=your_key"})," to ",e.jsx("code",{className:"bg-amber-100 px-1 rounded",children:".env"})," file"]}),e.jsx("li",{children:"Restart the development server"})]}),e.jsx("p",{className:"text-xs text-amber-600 mt-3 italic",children:"Note: Currently using demo mode with sample content."})]})]})})]})]})}function vt(r){if(!r)return"";const[a,i,o]=r.split("-");return!a||!i||!o?r:`${o}/${i}/${a}`}function Nt(r,a){return(r==="ar"?{general_manager:"المدير العام",director:"المدير",minister:"معالي الوزير",department_head:"رئيس القسم",custom:""}:{general_manager:"General Manager",director:"Director",minister:"Minister",department_head:"Department Head",custom:""})[a]||""}async function wt(r){try{if(typeof window<"u"&&window.isSecureContext&&navigator?.clipboard?.writeText)return await navigator.clipboard.writeText(r),{ok:!0,method:"clipboard"};throw new Error("Clipboard API unavailable")}catch(a){try{if(typeof document>"u")throw a;const i=document.createElement("textarea");i.value=r,i.setAttribute("readonly",""),i.style.position="fixed",i.style.top="-9999px",document.body.appendChild(i),i.select();const o=document.execCommand("copy");if(document.body.removeChild(i),!o)throw a;return{ok:!0,method:"fallback"}}catch(i){return{ok:!1,method:"fallback",error:i??a}}}}function Ct({entity:r,letterType:a,lang:i,authorityLevel:o,values:n}){const u=Re(a),l=i==="ar"?`التاريخ: ${vt(n.date||"")}`:`Date: ${n.date||""}`,g=n.reference_number||`REF/${r}/${new Date().getFullYear()}/${Math.floor(Math.random()*1e4)}`,x={ar:{company:"سمارت برو للأعمال والخدمات",sincerely:"وتفضلوا بقبول فائق الاحترام والتقدير",ref:"الرقم المرجعي"},en:{company:"Smartpro Business Hub & Services",sincerely:"Yours sincerely",ref:"Reference No."}},_=i==="ar"?`${x.ar.company}
ص.ب: 123، مسقط 100، سلطنة عمان
هاتف: +968 2460 0000 | فاكس: +968 2460 0001
البريد الإلكتروني: info@smartprohub.com | الموقع: www.smartprohub.com`:`${x.en.company}
P.O. Box 123, Muscat 100, Sultanate of Oman
Tel: +968 2460 0000 | Fax: +968 2460 0001
Email: info@smartprohub.com | Web: www.smartprohub.com`,h=n.recipient_org||(r==="MOCI"?i==="ar"?"وزارة التجارة والصناعة وترويج الاستثمار":"MOCI":r),f=n.recipient_role,N=f==="custom"?n.custom_recipient_role||"":Nt(i,f),E=i==="ar"?`إلى: ${N?N+" – ":""}${h}`:`To: ${N?N+", ":""}${h}`,S=n.subject||n.letter_title||"",k=i==="ar"?`${x.ar.ref}: ${g}`:`${x.en.ref}: ${g}`,T=(n.ai_body||"").trim();if(T){const C=i==="ar"?"تحية طيبة وبعد،":"Dear Sir/Madam,",w=i==="ar"?x.ar.sincerely:x.en.sincerely;return[i==="ar"?x.ar.company:x.en.company,l,k,"",E,S?i==="ar"?`الموضوع: ${S}`:`Subject: ${S}`:"","",C,"",T,"",`${w},`,"",`${n.signer_name}`,`${n.signer_title}`,"",_].join(`
`)}if(u){const C={company_name:n.company_name||x.en.company,company_address:n.company_address||"P.O. Box 123, Muscat 100, Sultanate of Oman",company_address_ar:n.company_address_ar||"ص.ب 123، مسقط 100، سلطنة عمان",company_phone:n.company_phone||"+968 2460 0000",company_email:n.company_email||"info@smartprohub.com",company_website:n.company_website||"www.smartprohub.com",company_footer:i==="ar"?"":_,company_footer_ar:i==="ar"?_:"",closing:n.closing||z("en"),closing_ar:n.closing_ar||z("ar"),reference_number:g,date:n.date||new Date().toISOString().slice(0,10),recipient_role:N||(i==="ar"?"الجهة المعنية":"Concerned Authority"),recipient_org:n.recipient_org||h,subject:S,authority_level:o,signer_name:n.signer_name||"",signer_title:n.signer_title||"",employee_name:n.employee_name||"",civil_id:n.civil_id||""},w={...C,...n,recipient_role:C.recipient_role,reference_number:C.reference_number,date:C.date,subject:C.subject};return mt(u,w,i)}return i==="ar"?`${x.ar.company}
${l}
${k}

(يرجى إكمال الحقول لاختيار النموذج المناسب)`:`${x.en.company}
${l}
${k}

(Please complete the form fields to generate your letter)`}function Ft(){c.useEffect(()=>{ze({title:"Professional Letter Builder | TheSmartPro.io - Business Class Automation",description:"Create professional business letters with our advanced AI-powered builder. PDF export, templates, auto-save, and more.",keywords:"professional letter builder, business letters, PDF export, letter templates, document automation",type:"website",url:"https://thesmartpro.io/demo/professional-letter-builder"})},[]);const r=c.useMemo(()=>dt(),[]),[a,i]=c.useState(r[0]||"MOCI"),o=c.useMemo(()=>oe(r[0]||"MOCI"),[r]),[n,u]=c.useState(o[0]?.id||""),[l,g]=c.useState("ar"),[x,_]=c.useState("authorized_signatory"),[h,f]=c.useState("general_manager"),[N,E]=c.useState("editor"),[S,k]=c.useState([]),[T,C]=c.useState(!0),w=c.useMemo(()=>oe(a),[a]);c.useEffect(()=>{if(w.length===0)return;w.some(s=>s.id===n)||u(w[0].id)},[a,w]);const[d,p]=c.useState({date:new Date().toISOString().slice(0,10),letter_title:"",subject:"",request_details:"",employee_name:"",civil_id:"",employment_start_date:"",department:"",noc_purpose:"",company_name:"Smartpro Business Hub & Services",company_cr:"CR-1234567",signer_name:"Mohammed Al-Harthi",signer_title:"Managing Director",recipient_name:"",recipient_org:"",recipient_role:h,custom_recipient_role:"",reference_number:"",company_address:"P.O. Box 123, Muscat 100, Sultanate of Oman",company_address_ar:"ص.ب 123، مسقط 100، سلطنة عمان",company_phone:"+968 2460 0000",company_email:"info@smartprohub.com",company_website:"www.smartprohub.com",closing:z("en"),closing_ar:z("ar"),ai_body:""});c.useEffect(()=>{p(t=>({...t,recipient_role:h}))},[h]),c.useEffect(()=>{if(T){const t=setTimeout(()=>{localStorage.setItem("letter_builder_autosave",JSON.stringify({entity:a,letterType:n,lang:l,authorityLevel:x,recipientRole:h,values:d,timestamp:Date.now()}))},2e3);return()=>clearTimeout(t)}},[a,n,l,x,h,d,T]),c.useEffect(()=>{const t=localStorage.getItem("letter_builder_drafts");if(t)try{k(JSON.parse(t))}catch(s){console.error("Failed to load drafts",s)}},[]);const P=c.useMemo(()=>Ct({entity:a,letterType:n,lang:l,authorityLevel:x,values:d}),[a,n,l,x,d]),[R,L]=c.useState(null),O=(t,s)=>{L({ok:t,text:s}),setTimeout(()=>L(null),3e3)},D=async t=>{const s=await wt(t);s.ok?O(!0,s.method==="clipboard"?"✓ Copied to clipboard":"✓ Copied (fallback)"):(console.error("Copy failed",s.error),O(!1,"✗ Copy failed"))},q=()=>{const t=window.open("","","width=800,height=600");t&&(t.document.write(`
        <html>
          <head>
            <title>Print Letter</title>
            <style>
              body { font-family: 'Times New Roman', serif; padding: 40px; line-height: 1.8; }
              pre { white-space: pre-wrap; font-family: inherit; }
            </style>
          </head>
          <body>
            <pre>${P}</pre>
          </body>
        </html>
      `),t.document.close(),t.print())},X=()=>{const s=[{id:Date.now().toString(),title:d.letter_title||`${a} - ${n}`,entity:a,letterType:n,lang:l,timestamp:Date.now(),values:{...d}},...S].slice(0,10);k(s),localStorage.setItem("letter_builder_drafts",JSON.stringify(s)),O(!0,"✓ Draft saved")},Z=t=>{i(t.entity),u(t.letterType),g(t.lang),p(t.values),O(!0,"✓ Draft loaded"),E("editor")},ee=()=>{i("MOCI");const t=oe("MOCI");u(t[0]?.id||""),g("ar"),_("authorized_signatory"),f("general_manager"),p({date:new Date().toISOString().slice(0,10),letter_title:"",subject:"",request_details:"",employee_name:"",civil_id:"",employment_start_date:"",department:"",noc_purpose:"",recipient_name:"",recipient_org:"",recipient_role:"general_manager",custom_recipient_role:"",reference_number:"",company_name:"Smartpro Business Hub & Services",company_cr:"CR-1234567",signer_name:"Mohammed Al-Harthi",signer_title:"Managing Director",company_address:"P.O. Box 123, Muscat 100, Sultanate of Oman",company_address_ar:"ص.ب 123، مسقط 100، سلطنة عمان",company_phone:"+968 2460 0000",company_email:"info@smartprohub.com",company_website:"www.smartprohub.com",closing:z("en"),closing_ar:z("ar"),ai_body:""})},M=c.useMemo(()=>Re(n),[n]);return e.jsxs("div",{className:"min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100",children:[e.jsx("div",{className:"bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 border-b border-white/20 sticky top-0 z-50 backdrop-blur-lg shadow-2xl",children:e.jsx("div",{className:"max-w-[1800px] mx-auto px-6 py-5",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("div",{className:"w-12 h-12 bg-white/20 backdrop-blur-xl rounded-xl flex items-center justify-center shadow-lg",children:e.jsx(le,{className:"w-6 h-6 text-white"})}),e.jsxs("div",{children:[e.jsxs("h1",{className:"text-2xl font-bold text-white flex items-center gap-2",children:["Professional Letter Builder",e.jsx("span",{className:"text-xs bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full font-semibold",children:"PRO"})]}),e.jsx("p",{className:"text-sm text-blue-100",children:"Business-Class Document Automation"})]})]}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsxs(v,{variant:"ghost",className:"text-white hover:bg-white/20",onClick:()=>C(!T),children:[e.jsx(ye,{className:`w-4 h-4 mr-2 ${T?"text-green-300":"text-gray-300"}`}),"Auto-save ",T?"ON":"OFF"]}),e.jsx(Ve,{href:"/docs/workflow-automation",children:e.jsxs(v,{variant:"secondary",className:"gap-2 shadow-lg",children:[e.jsx(Xe,{className:"w-4 h-4"}),"Back to Docs"]})})]})]})})}),e.jsxs("div",{className:"max-w-[1800px] mx-auto p-6",children:[e.jsxs(lt,{value:N,onValueChange:E,className:"space-y-6",children:[e.jsxs(ct,{className:"grid w-full grid-cols-3 lg:w-[600px] bg-white/60 backdrop-blur-xl p-1 shadow-lg",children:[e.jsxs(ne,{value:"editor",className:"gap-2",children:[e.jsx(se,{className:"w-4 h-4"}),"Editor"]}),e.jsxs(ne,{value:"preview",className:"gap-2",children:[e.jsx(he,{className:"w-4 h-4"}),"Preview"]}),e.jsxs(ne,{value:"history",className:"gap-2",children:[e.jsx(Ze,{className:"w-4 h-4"}),"Drafts (",S.length,")"]})]}),e.jsx(ie,{value:"editor",className:"space-y-6",children:e.jsxs("div",{className:"grid grid-cols-1 xl:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-6",children:[e.jsxs(V,{className:"shadow-2xl rounded-3xl border-2 border-white/50 bg-white/80 backdrop-blur-xl",children:[e.jsx(W,{className:"border-b bg-gradient-to-r from-blue-50 to-indigo-50",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs(H,{className:"text-xl flex items-center gap-2",children:[e.jsx(tt,{className:"w-5 h-5 text-blue-600"}),"Letter Configuration"]}),e.jsxs("div",{className:"flex gap-2",children:[e.jsxs(v,{variant:"outline",size:"sm",onClick:ee,children:[e.jsx(ve,{className:"w-4 h-4 mr-2"})," Reset"]}),e.jsxs(v,{size:"sm",onClick:X,className:"bg-gradient-to-r from-blue-600 to-indigo-600",children:[e.jsx(ye,{className:"w-4 h-4 mr-2"})," Save Draft"]})]})]})}),e.jsxs(K,{className:"p-6 space-y-6 max-h-[calc(100vh-300px)] overflow-y-auto",children:[e.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx(m,{className:"text-sm font-semibold text-gray-700",children:"Government Entity"}),e.jsxs($,{value:a,onValueChange:i,children:[e.jsx(G,{className:"border-2 border-gray-200 focus:border-blue-500",children:e.jsx(B,{})}),e.jsx(F,{children:r.map(t=>{const s=pt[t]||{en:t,icon:"📄"};return e.jsxs(A,{value:t,children:[s.icon," ",s.en]},t)})})]})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(m,{className:"text-sm font-semibold text-gray-700",children:"Letter Type"}),e.jsxs($,{value:n,onValueChange:u,children:[e.jsx(G,{className:"border-2 border-gray-200 focus:border-blue-500",children:e.jsx(B,{placeholder:"Select template"})}),e.jsx(F,{children:w.map(t=>e.jsxs(A,{value:t.id,children:[t.icon," ",l==="ar"?t.nameAr:t.name]},t.id))})]})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(m,{className:"text-sm font-semibold text-gray-700",children:"Language"}),e.jsxs($,{value:l,onValueChange:t=>g(t),children:[e.jsx(G,{className:"border-2 border-gray-200 focus:border-blue-500",children:e.jsx(B,{})}),e.jsxs(F,{children:[e.jsx(A,{value:"ar",children:"🇴🇲 Arabic - العربية"}),e.jsx(A,{value:"en",children:"🇬🇧 English"})]})]})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(m,{className:"text-sm font-semibold text-gray-700",children:"Authority Level"}),e.jsxs($,{value:x,onValueChange:_,children:[e.jsx(G,{className:"border-2 border-gray-200 focus:border-blue-500",children:e.jsx(B,{})}),e.jsxs(F,{children:[e.jsx(A,{value:"authorized_signatory",children:"⭐ Authorized Signatory"}),e.jsx(A,{value:"hr_manager",children:"👤 HR Manager"})]})]})]})]}),e.jsxs("div",{className:"space-y-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-100",children:[e.jsxs("h3",{className:"font-semibold text-gray-800 flex items-center gap-2",children:[e.jsx(We,{className:"w-4 h-4"}),"Recipient Information"]}),e.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx(m,{className:"text-sm font-medium",children:"Recipient Role"}),e.jsxs($,{value:h,onValueChange:t=>f(t),children:[e.jsx(G,{children:e.jsx(B,{})}),e.jsxs(F,{children:[e.jsx(A,{value:"general_manager",children:"General Manager / المدير العام"}),e.jsx(A,{value:"director",children:"Director / المدير"}),e.jsx(A,{value:"minister",children:"Minister / معالي الوزير"}),e.jsx(A,{value:"department_head",children:"Department Head / رئيس القسم"}),e.jsx(A,{value:"custom",children:"Custom Role"})]})]})]}),h==="custom"&&e.jsxs("div",{className:"space-y-2",children:[e.jsx(m,{className:"text-sm font-medium",children:"Custom Role"}),e.jsx(b,{value:d.custom_recipient_role,onChange:t=>p(s=>({...s,custom_recipient_role:t.target.value})),placeholder:"Enter custom role..."})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(m,{className:"text-sm font-medium",children:"Recipient Name"}),e.jsx(b,{value:d.recipient_name,onChange:t=>p(s=>({...s,recipient_name:t.target.value})),placeholder:"Optional"})]}),e.jsxs("div",{className:"space-y-2 col-span-2",children:[e.jsx(m,{className:"text-sm font-medium",children:"Organization"}),e.jsx(b,{value:d.recipient_org,onChange:t=>p(s=>({...s,recipient_org:t.target.value})),placeholder:"Recipient organization..."})]})]})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx(m,{className:"text-sm font-semibold",children:"Letter Title"}),e.jsx(b,{value:d.letter_title,onChange:t=>p(s=>({...s,letter_title:t.target.value})),placeholder:"Brief title..."})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(m,{className:"text-sm font-semibold",children:"Subject"}),e.jsx(b,{value:d.subject,onChange:t=>p(s=>({...s,subject:t.target.value})),placeholder:"Letter subject..."})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(m,{className:"text-sm font-semibold",children:"Date"}),e.jsx(b,{type:"date",value:d.date,onChange:t=>p(s=>({...s,date:t.target.value}))})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(m,{className:"text-sm font-semibold",children:"Reference Number"}),e.jsx(b,{value:d.reference_number,onChange:t=>p(s=>({...s,reference_number:t.target.value})),placeholder:"Auto-generated if empty"})]})]}),e.jsxs("div",{className:"space-y-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-purple-100",children:[e.jsx("h3",{className:"font-semibold text-gray-800",children:"Employee Details"}),e.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx(m,{className:"text-sm font-medium",children:"Employee Name"}),e.jsx(b,{value:d.employee_name,onChange:t=>p(s=>({...s,employee_name:t.target.value})),placeholder:"Full name..."})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(m,{className:"text-sm font-medium",children:"Civil ID"}),e.jsx(b,{value:d.civil_id,onChange:t=>p(s=>({...s,civil_id:t.target.value})),placeholder:"12345678"})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(m,{className:"text-sm font-medium",children:"Start Date"}),e.jsx(b,{type:"date",value:d.employment_start_date,onChange:t=>p(s=>({...s,employment_start_date:t.target.value}))})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(m,{className:"text-sm font-medium",children:"Department"}),e.jsx(b,{value:d.department,onChange:t=>p(s=>({...s,department:t.target.value})),placeholder:"Department name..."})]}),e.jsxs("div",{className:"space-y-2 col-span-2",children:[e.jsx(m,{className:"text-sm font-medium",children:"Request Details / NOC Purpose"}),e.jsx(U,{value:d.request_details||d.noc_purpose,onChange:t=>p(s=>({...s,request_details:t.target.value,noc_purpose:t.target.value})),placeholder:"Describe the purpose...",rows:3})]})]})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx(m,{className:"text-sm font-semibold",children:"Company Name"}),e.jsx(b,{value:d.company_name,onChange:t=>p(s=>({...s,company_name:t.target.value}))})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(m,{className:"text-sm font-semibold",children:"CR Number"}),e.jsx(b,{value:d.company_cr,onChange:t=>p(s=>({...s,company_cr:t.target.value}))})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(m,{className:"text-sm font-semibold",children:"Signer Name"}),e.jsx(b,{value:d.signer_name,onChange:t=>p(s=>({...s,signer_name:t.target.value}))})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(m,{className:"text-sm font-semibold",children:"Signer Title"}),e.jsx(b,{value:d.signer_title,onChange:t=>p(s=>({...s,signer_title:t.target.value}))})]})]}),e.jsxs("div",{className:"space-y-4 p-4 bg-white/70 border border-slate-200 rounded-xl",children:[e.jsxs("h3",{className:"font-semibold text-gray-800 flex items-center gap-2",children:[e.jsx(et,{className:"w-4 h-4 text-slate-600"}),"Company Contact Details"]}),e.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[e.jsxs("div",{className:"space-y-2 col-span-2",children:[e.jsx(m,{className:"text-sm font-medium",children:"Company Address (EN)"}),e.jsx(U,{value:d.company_address,onChange:t=>p(s=>({...s,company_address:t.target.value})),rows:2})]}),e.jsxs("div",{className:"space-y-2 col-span-2",children:[e.jsx(m,{className:"text-sm font-medium",children:"Company Address (AR)"}),e.jsx(U,{value:d.company_address_ar,onChange:t=>p(s=>({...s,company_address_ar:t.target.value})),rows:2,className:"text-right [direction:rtl]"})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(m,{className:"text-sm font-medium",children:"Company Phone"}),e.jsx(b,{value:d.company_phone,onChange:t=>p(s=>({...s,company_phone:t.target.value}))})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(m,{className:"text-sm font-medium",children:"Company Email"}),e.jsx(b,{type:"email",value:d.company_email,onChange:t=>p(s=>({...s,company_email:t.target.value}))})]}),e.jsxs("div",{className:"space-y-2 col-span-2",children:[e.jsx(m,{className:"text-sm font-medium",children:"Website"}),e.jsx(b,{value:d.company_website,onChange:t=>p(s=>({...s,company_website:t.target.value}))})]})]})]})]})]}),(M||w.length>0)&&e.jsx(jt,{template:M||w[0],language:l,existingValues:d,onContentGenerated:t=>{p(s=>{const y={...s,ai_body:t,request_details:s.request_details||s.noc_purpose};if(!s.subject&&(M||w[0])){const j=M||w[0];y.subject=s.subject||(l==="ar"?j.nameAr:j.name)}return y})},onSubjectGenerated:t=>{p(s=>({...s,subject:t}))}})]}),e.jsxs(V,{className:"shadow-2xl rounded-3xl border-2 border-white/50 bg-white backdrop-blur-xl",children:[e.jsx(W,{className:"border-b bg-gradient-to-r from-indigo-50 to-purple-50",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs(H,{className:"text-xl flex items-center gap-2",children:[e.jsx(he,{className:"w-5 h-5 text-indigo-600"}),"Live Preview"]}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx(v,{variant:"outline",size:"sm",onClick:q,children:e.jsx(ge,{className:"w-4 h-4"})}),e.jsx(v,{variant:"outline",size:"sm",onClick:()=>D(P),children:e.jsx(ce,{className:"w-4 h-4"})}),e.jsxs(v,{size:"sm",className:"bg-gradient-to-r from-green-600 to-emerald-600",onClick:q,children:[e.jsx(fe,{className:"w-4 h-4 mr-2"})," Export / Save as PDF"]})]})]})}),e.jsx(K,{className:"p-0",children:e.jsx(re.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.3},className:"h-full",children:e.jsx("div",{className:"p-8 max-h-[calc(100vh-300px)] overflow-y-auto",children:e.jsx("div",{className:`whitespace-pre-wrap bg-white rounded-2xl p-12 shadow-inner border-2 border-gray-100 min-h-[600px] leading-relaxed text-base ${l==="ar"?"text-right font-arabic":"text-left"} ${l==="ar"?"[direction:rtl]":"[direction:ltr]"}`,style:{fontFamily:l==="ar"?"'Noto Kufi Arabic', 'Arabic Typesetting', serif":"'Times New Roman', serif"},children:P})})})})]})]})}),e.jsx(ie,{value:"preview",className:"space-y-6",children:e.jsxs(V,{className:"shadow-2xl rounded-3xl border-2 border-white/50 bg-white backdrop-blur-xl",children:[e.jsx(W,{className:"border-b bg-gradient-to-r from-green-50 to-emerald-50",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx(H,{className:"text-2xl",children:"Print Preview"}),e.jsxs("div",{className:"flex gap-3",children:[e.jsxs(v,{onClick:q,className:"bg-gradient-to-r from-blue-600 to-indigo-600",children:[e.jsx(ge,{className:"w-4 h-4 mr-2"})," Print"]}),e.jsxs(v,{onClick:()=>D(P),className:"bg-gradient-to-r from-purple-600 to-pink-600",children:[e.jsx(ce,{className:"w-4 h-4 mr-2"})," Copy"]}),e.jsxs(v,{className:"bg-gradient-to-r from-green-600 to-emerald-600",onClick:q,children:[e.jsx(fe,{className:"w-4 h-4 mr-2"})," Download PDF"]})]})]})}),e.jsx(K,{className:"p-12",children:e.jsx("div",{className:"max-w-[800px] mx-auto bg-white shadow-2xl rounded-lg p-16 border",children:e.jsx("div",{className:`whitespace-pre-wrap leading-loose text-lg ${l==="ar"?"text-right":"text-left"}`,style:{fontFamily:l==="ar"?"'Noto Kufi Arabic', 'Arabic Typesetting', serif":"'Times New Roman', serif"},children:P})})})]})}),e.jsx(ie,{value:"history",className:"space-y-6",children:e.jsxs(V,{className:"shadow-2xl rounded-3xl border-2 border-white/50 bg-white/80 backdrop-blur-xl",children:[e.jsx(W,{className:"border-b bg-gradient-to-r from-amber-50 to-orange-50",children:e.jsxs(H,{className:"text-2xl flex items-center gap-2",children:[e.jsx(ue,{className:"w-6 h-6 text-amber-600"}),"Saved Drafts"]})}),e.jsx(K,{className:"p-6",children:S.length===0?e.jsxs("div",{className:"text-center py-12 text-gray-500",children:[e.jsx(se,{className:"w-16 h-16 mx-auto mb-4 text-gray-300"}),e.jsx("p",{className:"text-lg font-medium",children:"No saved drafts yet"}),e.jsx("p",{className:"text-sm",children:"Start creating letters to see them here"})]}):e.jsx("div",{className:"grid gap-4",children:S.map(t=>e.jsx(re.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},className:"p-6 bg-gradient-to-r from-white to-gray-50 rounded-xl border-2 border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all cursor-pointer",onClick:()=>Z(t),children:e.jsxs("div",{className:"flex items-start justify-between",children:[e.jsxs("div",{className:"flex-1",children:[e.jsx("h3",{className:"font-bold text-lg text-gray-900 mb-2",children:t.title}),e.jsxs("div",{className:"flex items-center gap-4 text-sm text-gray-600",children:[e.jsxs("span",{className:"flex items-center gap-1",children:[e.jsx(se,{className:"w-4 h-4"}),t.entity," - ",t.letterType]}),e.jsx("span",{className:"flex items-center gap-1",children:t.lang==="ar"?"🇴🇲 AR":"🇬🇧 EN"}),e.jsxs("span",{className:"flex items-center gap-1",children:[e.jsx(ue,{className:"w-4 h-4"}),new Date(t.timestamp).toLocaleString()]})]})]}),e.jsxs(v,{size:"sm",variant:"outline",className:"gap-2",children:["Load ",e.jsx(He,{className:"w-4 h-4"})]})]})},t.id))})})]})})]}),e.jsx(Ke,{children:R&&e.jsx(re.div,{initial:{opacity:0,y:50,scale:.9},animate:{opacity:1,y:0,scale:1},exit:{opacity:0,y:20,scale:.9},className:"fixed bottom-8 right-8 z-50",children:e.jsxs("div",{className:`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-xl border-2 ${R.ok?"bg-green-500/90 border-green-300 text-white":"bg-red-500/90 border-red-300 text-white"}`,children:[R.ok?e.jsx(Ue,{className:"w-6 h-6"}):e.jsx(je,{className:"w-6 h-6"}),e.jsx("span",{className:"font-semibold text-lg",children:R.text})]})})})]})]})}export{Ft as default,vt as formatDate,Ct as renderProfessionalLetter};
