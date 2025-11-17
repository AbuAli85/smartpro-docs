# Email Routing - Service-Specific Content

## 🎯 Current Problem

The Make.com router only has **3 specific routes**:
1. **Accounting** → Accounting-specific email
2. **PRO Services** → PRO Services-specific email  
3. **Company Formation** → Company Formation-specific email
4. **Default** → Generic email for everything else ❌

**Issue:** If user selects "Project Management", "Employee Management", "VAT", etc., they get the **generic default email** instead of a service-specific one.

## ✅ Solution Options

### Option 1: Make Default Route Service-Aware (RECOMMENDED)

Update the **Default route (Module 16)** AI prompt to use the actual service name from `{{1.service_interested}}`.

**Current Default Prompt:**
```
"This lead is interested in one of Smartpro's business services (such as VAT, consulting, advisory, or other support)."
```

**Improved Default Prompt:**
```
"This lead is interested in {{1.service_interested}} services.

CRITICAL: The service they selected is: {{1.service_interested}}

Write the email content specifically about {{1.service_interested}}. Do NOT write generic content. Make it clear you understand they need help with {{1.service_interested}} specifically."
```

### Option 2: Add More Routes (More Work)

Add specific routes for:
- VAT
- Business Consulting
- Employee Management
- Project Management
- CRM & Client Management
- etc.

**Pros:** Most specific
**Cons:** More maintenance, more modules

### Option 3: Dynamic Service Detection (Best Long-term)

Use Make.com's router with multiple conditions to check for service keywords and route accordingly.

## 🔧 Quick Fix: Update Default Route Prompt

### Step 1: Open Make.com Module 16

1. Go to Make.com scenario
2. Click **Module 16** (OpenAI - Default route)
3. Click **Messages** section
4. Find the **System message** (first message)

### Step 2: Update System Message

**Current:**
```
You are an email assistant for Smartpro Business Hub & Services.

This lead is interested in one of Smartpro's business services (such as VAT, consulting, advisory, or other support).
```

**Change to:**
```
You are an email assistant for Smartpro Business Hub & Services.

This lead is interested in {{1.service_interested}} services.

IMPORTANT: The client specifically selected {{1.service_interested}}. Write the email content to be SPECIFIC to {{1.service_interested}}, not generic. Show that you understand their specific service need.
```

### Step 3: Update User Message

**Current:**
```
Client details:
- Service: {{1.service_interested}}
```

**Change to:**
```
Client details:
- Service: {{1.service_interested}} (THIS IS THE SPECIFIC SERVICE THEY SELECTED)

CRITICAL REQUIREMENTS:
1. Write about {{1.service_interested}} specifically - mention the service name
2. Explain how Smartpro can help with {{1.service_interested}}
3. Ask questions relevant to {{1.service_interested}}
4. Do NOT write generic content - be specific to {{1.service_interested}}
```

## 📋 Service-Specific Email Examples

### For "Project Management":
```
Thank you for contacting Smartpro Business Hub & Services and for your interest in Project Management solutions.

We understand you're looking for project management support. Smartpro can help you with project planning, team coordination, timeline management, and ensuring your projects stay on track and within budget.

To better assist you, could you share:
1) What type of projects are you managing (client projects, internal initiatives, or both)?
2) How many team members typically work on your projects?
3) What are your biggest project management challenges right now?
```

### For "Employee Management":
```
Thank you for contacting Smartpro Business Hub & Services regarding Employee Management services.

We can support you with HR processes, payroll management, employee onboarding, compliance, and workforce administration to help streamline your operations.

To tailor our approach, could you let us know:
1) How many employees are you currently managing?
2) Are you looking for ongoing support or help with a specific process?
3) What employee management tasks are taking up most of your time?
```

### For "VAT":
```
Thank you for contacting Smartpro Business Hub & Services about VAT services.

We specialize in VAT registration, compliance, filing, and ongoing support to ensure your business meets all tax obligations smoothly.

To understand how we can best assist you:
1) Are you already VAT registered, or do you need to register?
2) What is your current VAT situation (filing frequency, any concerns)?
3) Are you looking for ongoing support or help with a specific VAT matter?
```

## 🎯 Recommended Approach

**Use Option 1** - Update the Default route to be service-aware. This way:
- ✅ One route handles all services
- ✅ AI generates service-specific content
- ✅ No need to add more routes
- ✅ Easy to maintain

## 📝 Complete Updated Prompt for Module 16

### System Message:
```
You are an email assistant for Smartpro Business Hub & Services.

This lead is interested in {{1.service_interested}} services.

CRITICAL RULES - FOLLOW EXACTLY:
1. DO NOT include "Subject:" or any subject line - the email template handles this
2. DO NOT include "Dear [Name]" or any greeting - the template already has "Dear {{1.client_name}},"
3. DO NOT include signature blocks like "Best regards," "Warm regards," "Sincerely," etc. - template handles this
4. DO NOT include contact information like "[Your Name]", "[Your Phone Number]", "[Your Email]" - template handles this
5. DO NOT include "Smartpro Business Hub & Services" in the body - it's already in the template header and footer

WHAT TO INCLUDE:
- Thank the client for contacting Smartpro
- Mention {{1.service_interested}} specifically by name
- Explain how Smartpro can help with {{1.service_interested}} (be specific, not generic)
- Ask 1-3 questions relevant to {{1.service_interested}}
- Invite them to reply or schedule a call
- Keep it 120-200 words
- Use friendly, professional tone
- No prices, timelines, or legal guarantees

OUTPUT FORMAT:
Return ONLY the main body text. Start directly with thanking them. No greeting, no subject, no signature.
```

### User Message:
```
Write the main body content for a welcome email. DO NOT include greeting, subject, or signature.

Client details:
- Name: {{1.client_name}}
- Email: {{1.email}}
- Business: {{1.business_name}}
- Service: {{1.service_interested}} (THIS IS THE SPECIFIC SERVICE THEY SELECTED)
- Notes: {{1.notes}}

Requirements:
1. Thank them for contacting Smartpro Business Hub & Services
2. Mention {{1.service_interested}} by name in the first sentence
3. Explain how we can help with {{1.service_interested}} specifically (not generic business services)
4. Ask 1-3 questions that are relevant to {{1.service_interested}}
5. Invite them to reply or schedule a call

CRITICAL: 
- Start directly with "Thank you for..." (no "Dear" or greeting)
- Mention {{1.service_interested}} specifically - do NOT write generic content
- Be specific about how Smartpro helps with {{1.service_interested}}
- End with invitation to reply or call (no "Best regards" or signature)
- Do NOT mention "Subject:" anywhere
- Do NOT include placeholders like [Your Name]
- Write as if you're continuing from "Dear {{1.client_name}}," which is already in the template
```

## ✅ After This Fix

When a user selects:
- **"Project Management"** → Email mentions "Project Management" specifically
- **"Employee Management"** → Email mentions "Employee Management" specifically
- **"VAT"** → Email mentions "VAT" specifically
- **Any service** → Email is tailored to that service

No more generic emails!

