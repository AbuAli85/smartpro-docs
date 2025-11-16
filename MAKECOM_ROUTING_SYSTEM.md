# Make.com Routing System Documentation

## 🔀 Overview

Your Make.com automation uses an intelligent routing system to send leads through service-specific email generation paths. This ensures each lead receives a highly relevant, personalized email based on their selected service.

## 📊 Flow Architecture

```
Webhook (Module 1)
    ↓
Google Sheets - Add Row (Module 2)
    ↓
Router (Module 8) - Routes based on service_interested
    ├─→ Accounting Route (Module 3 → 5 → 7)
    ├─→ PRO Services Route (Module 10 → 11 → 12)
    ├─→ Company Formation Route (Module 13 → 14 → 15)
    └─→ Other Services Route (Module 16 → 17 → 18)
```

## 🎯 Service Routes

### Route 1: Accounting Services

**Trigger:** `service_interested` contains "Accounting"

**Modules:**
- **Module 3:** OpenAI GPT (Accounting-focused prompt)
- **Module 5:** Resend Email
- **Module 7:** Google Sheets Update (Status + Preview)

**System Prompt Focus:**
- Accounting services (bookkeeping, reporting, VAT, financial statements)
- Questions about accounting systems, software, ongoing support needs

**Email Template Variable:**
```
{{3.choices[1].message.content}}
```

### Route 2: PRO Services

**Trigger:** `service_interested` contains "PRO Services"

**Modules:**
- **Module 10:** OpenAI GPT (PRO Services-focused prompt)
- **Module 11:** Resend Email
- **Module 12:** Google Sheets Update (Status + Preview)

**System Prompt Focus:**
- PRO/government-related tasks (visas, licenses, labor/immigration processes)
- Questions about government paperwork needs, visa types, license requirements

**Email Template Variable:**
```
{{10.choices[1].message.content}}
```

### Route 3: Company Formation

**Trigger:** `service_interested` contains "Company Formation"

**Modules:**
- **Module 13:** OpenAI GPT (Company Formation-focused prompt)
- **Module 14:** Resend Email
- **Module 15:** Google Sheets Update (Status + Preview)

**System Prompt Focus:**
- Business setup (licensing, structure, documentation, coordination with authorities)
- Questions about business activity, location, timeline preferences

**Email Template Variable:**
```
{{13.choices[1].message.content}}
```

### Route 4: Other Services (Default)

**Trigger:** All other services (VAT, consulting, advisory, etc.)

**Modules:**
- **Module 16:** OpenAI GPT (General business services prompt)
- **Module 17:** Resend Email
- **Module 18:** Google Sheets Update (Status + Preview)

**System Prompt Focus:**
- General business services (VAT, consulting, advisory, other support)
- Flexible questions based on specific service mentioned

**Email Template Variable:**
```
{{16.choices[1].message.content}}
```

## 📧 Email Configuration

All routes use the same email template but with different AI content:

**Common Settings:**
- From: `Smartpro Business Hub <noreply@portal.thesmartpro.io>`
- Reply-To: `info@thesmartpro.io`
- Subject: `Welcome to Smartpro – {{1.service_interested}}`
- Format: HTML

**Template Structure:**
- Header with branding
- Personalized greeting: "Dear {{1.client_name}},"
- Service-specific AI content (varies by route)
- CTA button: "Schedule a Call"
- Footer with contact info

## 📊 Google Sheets Updates

After email is sent, each route updates the Google Sheets row:

**Updated Columns:**
- **Column G (Email Status):** Changed from "Pending" to "Sent"
- **Column H (Last Email Preview):** Populated with full AI-generated email content

**Module References:**
- Accounting: Module 7
- PRO Services: Module 12
- Company Formation: Module 15
- Other: Module 18

## 🔍 Routing Logic

The Router (Module 8) uses filter conditions:

1. **Accounting Filter:**
   ```
   {{1.service_interested}} contains "Accounting"
   ```

2. **PRO Services Filter:**
   ```
   {{1.service_interested}} contains "PRO Services"
   ```

3. **Company Formation Filter:**
   ```
   {{1.service_interested}} contains "Company Formation"
   ```

4. **Default Route:**
   - Catches all other services (VAT, Other, etc.)
   - No filter needed (default route)

## ✅ Benefits of Routing System

1. **Service-Specific Content:** Each service gets tailored email content
2. **Better Relevance:** Questions and explanations match the service type
3. **Improved Engagement:** More relevant emails = higher response rates
4. **Scalability:** Easy to add new service routes
5. **Maintainability:** Each service has its own prompt that can be optimized independently

## 🔧 Adding New Service Routes

To add a new service route:

1. **Add Filter in Router:**
   - Create new route in Module 8 (BasicRouter)
   - Set filter condition: `{{1.service_interested}} contains "New Service"`

2. **Add OpenAI Module:**
   - Create new OpenAI module with service-specific system prompt
   - Use same user prompt structure
   - Note the module ID

3. **Add Resend Module:**
   - Create new Resend module
   - Use email template with correct module reference: `{{NEW_MODULE_ID.choices[1].message.content}}`

4. **Add Google Sheets Update:**
   - Create new Google Sheets update module
   - Update columns G and H
   - Reference correct OpenAI module for preview

## 📋 Module ID Reference

| Service | OpenAI Module | Resend Module | Sheets Update Module |
|---------|--------------|---------------|---------------------|
| Accounting | 3 | 5 | 7 |
| PRO Services | 10 | 11 | 12 |
| Company Formation | 13 | 14 | 15 |
| Other | 16 | 17 | 18 |

## 🎯 Testing Each Route

To test each route:

1. **Accounting:** Submit form with "Accounting" selected
2. **PRO Services:** Submit form with "PRO Services" selected
3. **Company Formation:** Submit form with "Company Formation" selected
4. **Other:** Submit form with "VAT" or "Other" selected

Verify:
- Correct route is triggered
- Service-specific content is generated
- Email is sent successfully
- Google Sheets is updated correctly

---

**Last Updated:** Current Date  
**Routing System Status:** ✅ Active and Configured  
**Total Routes:** 4 (Accounting, PRO Services, Company Formation, Other)

