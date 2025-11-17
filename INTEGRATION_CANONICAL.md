# Canonical Integration Guide: Frontend → Make.com → Google Sheets → Email

**Version:** 1.0  
**Last Updated:** 2024  
**Status:** ✅ Production Ready

This document defines the **single source of truth** for the Smartpro consultation form integration. All components (frontend, Make.com, Google Sheets, emails) must align with this specification.

---

## 📋 Table of Contents

1. [Webhook Payload Contract](#1-webhook-payload-contract)
2. [Make.com Scenario Structure](#2-makecom-scenario-structure)
3. [Google Sheets Mapping](#3-google-sheets-mapping)
4. [Error & Status Handling](#4-error--status-handling)
5. [Naming Conventions](#5-naming-conventions)
6. [Testing & Verification](#6-testing--verification)

---

## 1️⃣ Webhook Payload Contract

### Canonical JSON Structure

**Endpoint:** `POST https://hook.eu2.make.com/z9t0f5eqipopdg368eypl5i9eo7kpbu8`  
**Content-Type:** `application/json`

**Note:** This is the production webhook URL for `smartpro-website-consultation-v2` scenario.

```json
{
  "client_name": "John Doe",
  "email": "john@example.com",
  "phone": "+968 1234 5678",
  "business_name": "Acme LLC",
  "business_type": "Limited Liability Company (LLC)",
  "service_interested": "Accounting, VAT",
  "services": "Accounting & Bookkeeping, VAT Registration & Filing, Business Consulting",
  "budget": "$5,000 - $10,000",
  "timeline": "3–6 Months",
  "preferred_contact": "WhatsApp",
  "preferred_time": "Afternoon (12 PM - 5 PM)",
  "location": "Muscat, Oman",
  "primary_message": "We need help with ongoing accounting and VAT compliance.",
  "notes": "Primary message plus auto-structured info:\nPhone: +968 1234 5678\nLocation: Muscat, Oman\nBusiness Type: Limited Liability Company (LLC)\nBudget: $5,000 - $10,000\nTimeline: 3–6 Months\nPreferred Contact: WhatsApp\nPreferred Time: Afternoon (12 PM - 5 PM)\nLanguage: English",
  "language": "en",
  "source": "smartpro-consultation-form"
}
```

### Field Definitions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `client_name` | string | ✅ Yes | Client's full name |
| `email` | string | ✅ Yes | Valid email address |
| `phone` | string | ❌ No | Phone number with country code |
| `business_name` | string | ❌ No | Company/business name |
| `business_type` | string | ❌ No | Human-readable business type |
| `service_interested` | string | ✅ Yes | **Primary service** (first selected) - used for email routing |
| `services` | string[] | ❌ No | **All selected services** (array - Make.com Module 25 joins them to string) |
| `budget` | string | ❌ No | Estimated budget range |
| `timeline` | string | ❌ No | Project timeline |
| `preferred_contact` | string | ❌ No | Preferred contact method |
| `preferred_time` | string | ❌ No | Preferred contact time |
| `location` | string | ❌ No | Client location (city, country) |
| `primary_message` | string | ❌ No | Client's typed message/notes (Make.com expects `primary_message`, not `message`) |
| `notes` | string | ✅ Yes | Comprehensive structured notes (auto-generated) |
| `language` | "en" \| "ar" | ❌ No | Form language (default: "en") |
| `source` | string | ❌ No | Source identifier (default: "smartpro-consultation-form") |

### Key Design Decisions

1. **`service_interested`** = Single primary service (first selected)
   - Used for Make.com email routing
   - Human-readable format (e.g., "Accounting, VAT")

2. **`services`** = Array of all selected services
   - Frontend sends as array: `["Accounting & Bookkeeping", "VAT Registration & Filing"]`
   - Make.com Module 25 joins them: `join(1.services; ", ")` → `services_full`
   - Google Sheets column H receives the joined string

3. **`notes`** = Comprehensive structured field
   - Includes primary message + all additional structured info
   - Used by backend flow for complete context

4. **`primary_message`** = Client's direct input
   - What they typed in the message field
   - **Important:** Make.com expects `primary_message` (not `message`)
   - Maps to Google Sheets column N: "Primary Message" via Module 25
   - Separate from structured notes

---

## 2️⃣ Make.com Scenario Structure

### Scenario Configuration

**Scenario Name:** `smartpro-website-consultation-v2` (or your existing scenario name)

**Status:** Active  
**Execution Mode:** Immediate  
**Error Handling:** Enabled

### Module Flow

```
[1] Webhook → [25] Set Variables → [2] Google Sheets (Add Row) 
    → [8] Router → [3/10/13/16] GPT → [5/11/14/17] Email (Client) 
    → [7/12/15/18] Google Sheets (Update Status)
```

### Module Details

#### [1] Webhook – "Smartpro Consultation Form"

**Type:** Custom Webhook  
**Module Name:** `01 – Webhook: Consultation Form`  
**Output Bundle:** `1`

**Configuration:**
- **Webhook URL:** `https://hook.eu2.make.com/[your-webhook-id]`
- **Method:** POST
- **Data Structure:** JSON (matches payload contract above)

**Output Variables:**
- `1.client_name`
- `1.email`
- `1.phone`
- `1.business_name`
- `1.business_type`
- `1.service_interested`
- `1.services` (array)
- `1.budget`
- `1.timeline`
- `1.preferred_contact`
- `1.preferred_time`
- `1.location`
- `1.primary_message`
- `1.notes`
- `1.language`
- `1.source`

---

#### [25] Tools – "Normalize & Derive Fields"

**Type:** Set Variables  
**Module ID:** 25  
**Module Name:** Set Variables (Normalize Fields)  
**Output Bundle:** `25`  
**Scope:** `roundtrip` (variables persist across scenario)

**Purpose:** Normalize fields and join services array to string

**Variables Set:**

```javascript
{
  "client_name": "{{1.client_name}}",
  "email": "{{1.email}}",
  "phone": "{{1.phone}}",
  "business_name": "{{1.business_name}}",
  "business_type": "{{1.business_type}}",
  "service_interested": "{{1.service_interested}}",
  "services_full": "{{join(1.services; \", \")}}",  // Join array to comma-separated string
  "budget": "{{1.budget}}",
  "timeline": "{{1.timeline}}",
  "preferred_contact": "{{1.preferred_contact}}",
  "preferred_time": "{{1.preferred_time}}",
  "location": "{{1.location}}",
  "primary_message": "{{1.primary_message}}",  // Note: expects primary_message, not message
  "notes": "{{1.notes}}",
  "language": "{{1.language}}",
  "source": "{{1.source}}"
}
```

**Key Points:**
- `services` must be sent as **array** from frontend
- Module 25 joins array: `join(1.services; ", ")` → `services_full`
- All subsequent modules use `25.*` variables

---

#### [2] Google Sheets – "Add Row: Smartpro Leads"

**Type:** Google Sheets - Add a Row  
**Module ID:** 2  
**Module Name:** Google Sheets Add Row  
**Output Bundle:** `2`

**Configuration:**
- **Spreadsheet:** "Smartpro Leads"
- **Sheet:** "leads"
- **Insert Option:** INSERT_ROWS
- **Value Input Option:** USER_ENTERED

**Values Mapping:** (See Section 3 for complete mapping)

**Uses Variables from Module 25:**
- All values use `{{25.*}}` variables (e.g., `{{25.client_name}}`, `{{25.services_full}}`)

**Output:**
- `2.rowNumber` - Row number of newly created row (used by updateRow modules)

---

#### [8] Router – "Route by Service Type"

**Type:** BasicRouter  
**Module ID:** 8  
**Module Name:** Router

**Routes:**

1. **Accounting Route**
   - Filter: `{{1.service_interested}}` contains "Accounting"
   - → Module 3: GPT (Accounting-specific prompt)
   - → Module 5: Resend Email (Client)
   - → Module 7: Google Sheets UpdateRow

2. **PRO Services Route**
   - Filter: `{{1.service_interested}}` contains "PRO Services"
   - → Module 10: GPT (PRO-specific prompt)
   - → Module 11: Resend Email (Client)
   - → Module 12: Google Sheets UpdateRow

3. **Company Formation Route**
   - Filter: `{{1.service_interested}}` contains "Company Formation"
   - → Module 13: GPT (Company Formation-specific prompt)
   - → Module 14: Resend Email (Client)
   - → Module 15: Google Sheets UpdateRow

4. **Default Route**
   - No filter (catches all other services)
   - → Module 16: GPT (Generic prompt with `{{1.service_interested}}`)
   - → Module 17: Resend Email (Client)
   - → Module 18: Google Sheets UpdateRow

---

#### [5/11/14/17] Email – "Send Client Confirmation"

**Type:** Resend  
**Module IDs:** 5 (Accounting), 11 (PRO), 14 (Company Formation), 17 (Default)  
**Module Name:** Resend Send Email

**Configuration:**
- **To:** `{{1.email}}` ⚠️ **Must be a string** (use `{{1.email}}` from webhook, NOT `{{2.email}}`)
- **From:** `Smartpro Business Hub <noreply@portal.thesmartpro.io>`
- **Reply-To:** `info@thesmartpro.io`
- **Subject:** Based on language:
  - English: `Consultation request received – Smartpro Business Hub & Services`
  - Arabic: `تم استلام طلب الاستشارة الخاص بك – مركز سمارت برو للأعمال والخدمات`

**Template Selection:**
- Use **Filter** on Resend module to check `{{1.language}}` or `{{25.language}}`
- If `{{1.language}} === "ar"` → Use Arabic template
- Else → Use English template

**Template Variables:**
- Uses `{{1.*}}` variables directly (e.g., `{{1.client_name}}`, `{{1.service_interested}}`)
- AI content: `{{3.choices[1].message.content}}` (Accounting), `{{10.*}}` (PRO), `{{13.*}}` (Company Formation), `{{16.*}}` (Default)

**Templates:** See `templates/email-client-confirmation.md`

---

#### [6] Email – "Send Internal Notification"

**Type:** Resend / Gmail / SMTP  
**Module Name:** `06 – Email: Internal Notification`

**Configuration:**
- **To:** `consultations@smartpro.com` (or your internal email)
- **From:** `Smartpro Automation <noreply@portal.thesmartpro.io>`
- **Subject:** `New consultation request – {{2.client_name}} ({{2.service_interested}})`

**Template:** See `templates/email-internal-notification.md`

**Template Variables:**
- All fields from bundle `2.*`

---

#### [7/12/15/18] Google Sheets – "Update Email Status"

**Type:** Google Sheets - Update a Row  
**Module IDs:** 7 (Accounting), 12 (PRO), 15 (Company Formation), 18 (Default)  
**Module Name:** Google Sheets Update Row

**Configuration:**
- **Spreadsheet:** "Smartpro Leads"
- **Sheet:** "leads"
- **Row:** `{{2.rowNumber}}` (from Module 2: Add Row)

**Values to Update:**

```json
{
  "17": "Sent",                              // Email Status (Column R)
  "18": "{{3.choices[1].message.content}}",  // Last Email Preview (Column S) - AI-generated content
  "20": "No Response",                       // Response Status (Column U)
  "22": "0"                                  // Follow-up Count (Column W)
}
```

**Note:** Module references vary by route:
- Accounting: `{{3.choices[1].message.content}}`
- PRO Services: `{{10.choices[1].message.content}}`
- Company Formation: `{{13.choices[1].message.content}}`
- Default: `{{16.choices[1].message.content}}`

**Error Handling:**
- If email fails, update `Email Status` to `"Error: client email failed"`
- Use Make.com error handler to catch email failures

---

#### [8] WhatsApp – "Send Client Message" (Optional)

**Type:** WhatsApp API  
**Module Name:** `08 – WhatsApp: Client Message`

**Configuration:**
- **To:** `{{2.phone}}`
- **Message:** Based on language (use If module)
- **Template:** See `templates/whatsapp-message.md`

**Conditional Execution:**
- Only execute if `{{2.phone}}` is not empty
- Only execute if `{{2.preferred_contact}}` contains "WhatsApp" or "Both"

---

## 3️⃣ Google Sheets Mapping

### Sheet Structure

**Spreadsheet Name:** "Smartpro Leads"  
**Sheet Name:** "leads"  
**Headers Row:** 1

### Column Definitions

| Column | Letter | Field Name | Data Type | Required | Description |
|--------|--------|------------|-----------|----------|-------------|
| A | 0 | Timestamp | DateTime | ✅ | Auto-generated timestamp |
| B | 1 | Client Name | String | ✅ | Client's full name |
| C | 2 | Email | String | ✅ | Email address |
| D | 3 | Phone | String | ❌ | Phone number |
| E | 4 | Business Name | String | ❌ | Company name |
| F | 5 | Business Type | String | ❌ | Business type |
| G | 6 | Service Interested | String | ✅ | Primary service |
| H | 7 | Services (Full List) | String | ❌ | All services (comma-separated) |
| I | 8 | Budget | String | ❌ | Estimated budget |
| J | 9 | Timeline | String | ❌ | Project timeline |
| K | 10 | Preferred Contact | String | ❌ | Contact method |
| L | 11 | Preferred Time | String | ❌ | Contact time preference |
| M | 12 | Location | String | ❌ | Client location |
| N | 13 | Primary Message | String | ❌ | Client's message |
| O | 14 | Notes | String | ✅ | Comprehensive notes |
| P | 15 | Language | String | ❌ | Form language (en/ar) |
| Q | 16 | Source | String | ❌ | Source identifier |
| R | 17 | Email Status | String | ✅ | Email delivery status |
| S | 18 | Last Email Preview | String | ❌ | Email preview/summary |

### Make.com Mapping (Module 3: Add Row)

**Values Object:**

```json
{
  "0": "{{now}}",
  "1": "{{25.client_name}}",
  "2": "{{25.email}}",
  "3": "{{25.phone}}",
  "4": "{{25.business_name}}",
  "5": "{{25.business_type}}",
  "6": "{{25.service_interested}}",
  "7": "{{25.services_full}}",
  "8": "{{25.budget}}",
  "9": "{{25.timeline}}",
  "10": "{{25.preferred_contact}}",
  "11": "{{25.preferred_time}}",
  "12": "{{25.location}}",
  "13": "{{25.primary_message}}",
  "14": "{{25.notes}}",
  "15": "{{25.language}}",
  "16": "{{25.source}}",
  "17": "Pending"
}
```

**Note:** All values use `{{25.*}}` variables from Module 25 (Set Variables).

**Notes:**
- Column indices are 0-based (A=0, B=1, etc.)
- Empty optional fields should be sent as empty strings `""`
- `Email Status` defaults to `"Pending"`
- `Last Email Preview` starts empty

---

## 4️⃣ Error & Status Handling

### Email Status Values

| Status | When Set | Description |
|--------|----------|-------------|
| `"Pending"` | Initial row creation | Email not yet sent |
| `"Sent to client"` | After client email sent | Client confirmation sent successfully |
| `"Sent (client + internal)"` | After both emails sent | Both client and internal emails sent |
| `"Error: client email failed"` | Email send failure | Client email failed to send |
| `"Error: internal email failed"` | Internal email failure | Internal notification failed |
| `"Error: both emails failed"` | Both emails failed | Complete email failure |

### Error Handling Flow

#### Success Path

```
[3] Add Row → Status: "Pending"
    ↓
[5] Send Client Email → Success
    ↓
[6] Send Internal Email → Success
    ↓
[7] Update Row → Status: "Sent (client + internal)"
```

#### Error Path (Client Email Fails)

```
[3] Add Row → Status: "Pending"
    ↓
[5] Send Client Email → ❌ Error
    ↓
[Error Handler] → Update Row → Status: "Error: client email failed"
    ↓
[Error Handler] → Send Alert Email to Team
```

#### Error Path (Internal Email Fails)

```
[3] Add Row → Status: "Pending"
    ↓
[5] Send Client Email → ✅ Success
    ↓
[6] Send Internal Email → ❌ Error
    ↓
[7] Update Row → Status: "Sent to client" (partial success)
    ↓
[Error Handler] → Send Alert Email to Team
```

### Make.com Error Handler Configuration

**Error Handler Module:**
- **Type:** Error Handler
- **Action:** Update Google Sheets row with error status
- **Send Alert:** Email to team with error details

**Error Handler Values:**

```json
{
  "17": "Error: {{error.message}}",
  "18": "Failed at {{now}} - {{error.module}}"
}
```

### Monitoring & Alerts

**Google Sheets Filters:**
- Filter by `Email Status` = "Error:*" to see all failures
- Filter by `Email Status` = "Pending" to see unsent emails
- Filter by `Timestamp` > "Last 24 hours" for recent leads

**Make.com Monitoring:**
- Check execution history daily
- Set up alerts for failed executions
- Monitor execution time (should be < 30 seconds)

---

## 5️⃣ Naming Conventions

### Scenario Names

**Format:** `smartpro-[feature]-[version]`

**Examples:**
- `smartpro-website-consultation-v1`
- `smartpro-website-consultation-v2` (if breaking changes)

**Versioning Rules:**
- **v1 → v2:** Breaking changes to payload structure
- **v1.1:** Non-breaking additions (new optional fields)
- **v1.2:** Bug fixes, improvements

### Module Names

**Format:** `[Number] – [Type]: [Description]`

**Examples:**
- `01 – Webhook: Consultation Form`
- `02 – Tools: Normalize Fields`
- `03 – Sheets: AddRow – Smartpro Leads`
- `04 – Router: Service Type`
- `05a – Email: Client Confirmation (Accounting)`
- `05b – Email: Client Confirmation (PRO Services)`
- `05c – Email: Client Confirmation (Company Formation)`
- `05d – Email: Client Confirmation (General)`
- `06 – Email: Internal Notification`
- `07 – Sheets: UpdateRow – Email Status`
- `08 – WhatsApp: Client Message`

**Benefits:**
- Easy to identify modules in Make.com UI
- Clear execution order
- Self-documenting flow

### Variable Names

**Format:** `[bundle_number].[field_name]`

**Examples:**
- `1.client_name` (from webhook)
- `2.services_full` (from tools normalization)
- `3.row_number` (from Google Sheets Add Row)

**Naming Rules:**
- Use snake_case for field names
- Bundle numbers match module execution order
- Descriptive names (not abbreviations)

---

## 6️⃣ Testing & Verification

### Pre-Deployment Checklist

- [ ] Webhook payload matches canonical structure
- [ ] Google Sheets columns match mapping exactly
- [ ] Make.com scenario modules named correctly
- [ ] Email templates (English & Arabic) tested
- [ ] Error handling configured
- [ ] Status updates working correctly

### Test Cases

#### Test Case 1: Complete Submission (All Fields)

**Input:**
- All form fields filled
- Multiple services selected
- Language: English

**Expected:**
- ✅ Row added to Google Sheets with all data
- ✅ Client email sent (English)
- ✅ Internal email sent
- ✅ Status updated to "Sent (client + internal)"
- ✅ Email preview saved

#### Test Case 2: Minimal Submission (Required Fields Only)

**Input:**
- Only required fields: name, email, service
- Language: English

**Expected:**
- ✅ Row added with required fields
- ✅ Optional fields empty in Sheets
- ✅ Client email sent
- ✅ Status updated correctly

#### Test Case 3: Arabic Submission

**Input:**
- Complete form
- Language: Arabic

**Expected:**
- ✅ Row added with language = "ar"
- ✅ Client email sent (Arabic template)
- ✅ Internal email sent (English)
- ✅ Status updated correctly

#### Test Case 4: Email Failure

**Input:**
- Valid submission
- Simulate email failure (invalid email or service down)

**Expected:**
- ✅ Row added to Sheets
- ❌ Email fails
- ✅ Status updated to "Error: client email failed"
- ✅ Alert email sent to team

### Verification Steps

1. **Submit Test Form:**
   - Visit `/consultation`
   - Fill form with test data
   - Submit

2. **Check Make.com:**
   - Open scenario execution history
   - Verify webhook received data
   - Check all modules executed successfully
   - Review execution time

3. **Check Google Sheets:**
   - Open "Smartpro Leads" spreadsheet
   - Verify new row added
   - Check all columns populated correctly
   - Verify Email Status updated

4. **Check Email:**
   - Verify client received confirmation email
   - Check internal notification email received
   - Verify email content is correct
   - Test reply-to address

5. **Check WhatsApp (if enabled):**
   - Verify WhatsApp message sent
   - Check message content

### Debugging Tips

**If data not in Sheets:**
1. Check Make.com execution history
2. Verify webhook received data
3. Check Google Sheets connection
4. Verify column mapping

**If email not sent:**
1. Check Make.com execution history for errors
2. Verify email service connection (Resend/Gmail)
3. Check spam folder
4. Verify email address format

**If status not updated:**
1. Check Update Row module executed
2. Verify row number from Add Row step
3. Check column indices match

---

## 📚 Related Documentation

- **Email Templates:** `templates/email-client-confirmation.md`
- **Internal Notification:** `templates/email-internal-notification.md`
- **WhatsApp Template:** `templates/whatsapp-message.md`
- **Frontend Types:** `client/src/types/webhook.ts`
- **Make.com Setup:** `MAKECOM_INTEGRATION.md`

---

## 🔄 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2024 | Initial canonical specification |

---

**Maintained by:** Smartpro Development Team  
**Questions?** Contact: dev@smartpro.com

