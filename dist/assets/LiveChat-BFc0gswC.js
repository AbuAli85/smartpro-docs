import{i as x,r,j as e,X as M}from"./index-8kaxlewm.js";import{M as h}from"./message-circle-TZydI3nM.js";const P=x("Maximize2",[["polyline",{points:"15 3 21 3 21 9",key:"mznyad"}],["polyline",{points:"9 21 3 21 3 15",key:"1avn1i"}],["line",{x1:"21",x2:"14",y1:"3",y2:"10",key:"ota7mn"}],["line",{x1:"3",x2:"10",y1:"21",y2:"14",key:"1atl0r"}]]);const z=x("Minimize2",[["polyline",{points:"4 14 10 14 10 20",key:"11kfnr"}],["polyline",{points:"20 10 14 10 14 4",key:"rlmsce"}],["line",{x1:"14",x2:"21",y1:"10",y2:"3",key:"o5lafz"}],["line",{x1:"3",x2:"10",y1:"21",y2:"14",key:"1atl0r"}]]);const D=x("Send",[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]]),R=["How do I get started as a provider?","What's the payment process?","How does contract management work?","What are the verification requirements?","Can I hire a team on TheSmartPro?","Is my data secure?"],E={"How do I get started as a provider?":`Great question! To get started as a provider:

1. Create your account
2. Complete your profile with skills and experience
3. Pass our verification process
4. Set your rates and availability
5. Start receiving bookings!

Check out our Provider Onboarding guide for detailed steps.`,"What's the payment process?":`Our payment process is simple and secure:

1. Client books your service
2. Payment is held in escrow
3. You deliver the work
4. Client approves completion
5. Funds are released to your account

We use Stripe for secure payments and you keep 80% of earnings!`,"How does contract management work?":`TheSmartPro provides professional booking agreements:

• Automated contract generation
• Milestone-based tracking
• Revision management
• Approval workflows
• Complete audit logging

This ensures both parties are protected and everything is documented.`,"What are the verification requirements?":`Our verification process ensures quality:

• Government-issued ID verification
• Background check (varies by service type)
• Portfolio/experience review
• Skills assessment
• Reference checks

Typically takes 2-3 business days.`,"Can I hire a team on TheSmartPro?":`Absolutely! Organizations can:

• Hire multiple professionals
• Manage team projects
• Set custom permissions
• Track budgets and timelines
• Collaborate with team members

Perfect for scaling your workforce flexibly.`,"Is my data secure?":`Security is our top priority:

✓ Enterprise-grade encryption
✓ SOC 2 Type II certified
✓ GDPR compliant
✓ Complete audit logging
✓ Role-based access control
✓ Regular security audits

Your data is protected with industry-leading security standards.`};function q(){const[o,f]=r.useState(!1),[y,n]=r.useState(!1),[a,i]=r.useState([{id:"1",text:"Hi! 👋 Welcome to TheSmartPro.io. How can I help you today?",sender:"agent",timestamp:new Date,avatar:"👨‍💼"}]),[l,g]=r.useState(""),[d,v]=r.useState(""),[b,j]=r.useState(""),[c,N]=r.useState(!0),w=r.useRef(null),k=()=>{w.current?.scrollIntoView({behavior:"smooth"})};r.useEffect(()=>{k()},[a]);const m=t=>{const s=t||l;if(!s.trim())return;const u={id:Date.now().toString(),text:s,sender:"user",timestamp:new Date};i(p=>[...p,u]),g(""),setTimeout(()=>{const p=E[s.trim()]||"Thanks for your question! For more specific help, please contact our support team at support@thesmartpro.io or schedule a demo with our team.",T={id:(Date.now()+1).toString(),text:p,sender:"agent",timestamp:new Date,avatar:"🤖"};i(I=>[...I,T])},800)},S=t=>{m(t)},C=t=>{if(t.preventDefault(),d.trim()&&b.trim()){N(!1);const s={id:Date.now().toString(),text:`Great! Thanks for providing your details, ${d}. How can I assist you with TheSmartPro.io today?`,sender:"agent",timestamp:new Date,avatar:"👨‍💼"};i(u=>[...u,s])}};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:`fixed bottom-6 right-6 z-50 transition-all duration-300 ${o?"w-96":"w-auto"}`,children:[o&&!y&&e.jsxs("div",{className:"bg-white border border-border rounded-xl shadow-2xl flex flex-col h-96 overflow-hidden animate-in slide-in-from-bottom-5",children:[e.jsxs("div",{className:"bg-gradient-to-r from-primary to-secondary text-white p-4 flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:"w-10 h-10 rounded-full bg-white/20 flex items-center justify-center",children:e.jsx(h,{className:"w-5 h-5"})}),e.jsxs("div",{children:[e.jsx("h3",{className:"font-semibold text-sm",children:"TheSmartPro Support"}),e.jsx("p",{className:"text-xs text-white/80",children:"We're online!"})]})]}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx("button",{onClick:()=>n(!0),className:"hover:bg-white/20 p-1 rounded transition-colors",children:e.jsx(z,{className:"w-4 h-4"})}),e.jsx("button",{onClick:()=>f(!1),className:"hover:bg-white/20 p-1 rounded transition-colors",children:e.jsx(M,{className:"w-4 h-4"})})]})]}),a.length===1&&c===!1&&e.jsxs("div",{className:"px-4 py-3 border-b border-border bg-muted/20",children:[e.jsx("p",{className:"text-xs font-semibold text-muted-foreground mb-2",children:"Common Questions:"}),e.jsx("div",{className:"space-y-2",children:R.slice(0,3).map((t,s)=>e.jsx("button",{onClick:()=>S(t),className:"w-full text-left text-xs p-2 rounded bg-white hover:bg-primary/10 text-foreground hover:text-primary transition-colors border border-border hover:border-primary",children:t},s))})]}),e.jsxs("div",{className:"flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30",children:[a.map(t=>e.jsxs("div",{className:`flex gap-3 ${t.sender==="user"?"justify-end":"justify-start"}`,children:[t.sender==="agent"&&e.jsx("div",{className:"w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 text-lg",children:t.avatar}),e.jsxs("div",{className:`max-w-xs px-4 py-2 rounded-lg text-sm ${t.sender==="user"?"bg-primary text-white rounded-br-none":"bg-white border border-border text-foreground rounded-bl-none"}`,children:[e.jsx("p",{children:t.text}),e.jsx("p",{className:`text-xs mt-1 ${t.sender==="user"?"text-white/70":"text-muted-foreground"}`,children:t.timestamp.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})})]})]},t.id)),e.jsx("div",{ref:w})]}),c?e.jsx("div",{className:"p-4 border-t border-border bg-white",children:e.jsxs("form",{onSubmit:C,className:"space-y-3",children:[e.jsx("div",{children:e.jsx("input",{type:"text",placeholder:"Your name",value:d,onChange:t=>v(t.target.value),className:"w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary",required:!0})}),e.jsx("div",{children:e.jsx("input",{type:"email",placeholder:"Your email",value:b,onChange:t=>j(t.target.value),className:"w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary",required:!0})}),e.jsx("button",{type:"submit",className:"w-full bg-primary text-white py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors",children:"Start Chat"})]})}):e.jsxs("div",{className:"p-4 border-t border-border bg-white flex gap-2",children:[e.jsx("input",{type:"text",placeholder:"Type your message...",value:l,onChange:t=>g(t.target.value),onKeyPress:t=>{t.key==="Enter"&&!t.shiftKey&&(t.preventDefault(),m())},disabled:!c,className:"flex-1 px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"}),e.jsx("button",{onClick:()=>m(),disabled:!l.trim(),className:"bg-primary text-white p-2 rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",children:e.jsx(D,{className:"w-4 h-4"})})]})]}),y&&e.jsxs("div",{className:"bg-white border border-border rounded-xl shadow-2xl p-4 flex items-center justify-between cursor-pointer hover:shadow-lg transition-shadow",onClick:()=>n(!1),children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:"w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center",children:e.jsx(h,{className:"w-5 h-5 text-white"})}),e.jsxs("div",{children:[e.jsx("p",{className:"font-semibold text-sm",children:"Support Chat"}),e.jsx("p",{className:"text-xs text-muted-foreground",children:"Click to open"})]})]}),e.jsx(P,{className:"w-4 h-4 text-muted-foreground"})]}),!o&&e.jsx("button",{onClick:()=>{f(!0),n(!1)},className:"w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all flex items-center justify-center animate-pulse",children:e.jsx(h,{className:"w-6 h-6"})})]}),!o&&e.jsx("div",{className:"fixed bottom-24 right-6 z-40 animate-bounce",children:e.jsx("div",{className:"bg-secondary text-white px-4 py-2 rounded-lg shadow-lg text-sm font-semibold whitespace-nowrap",children:"💬 Need help? Chat with us!"})})]})}export{q as default};
