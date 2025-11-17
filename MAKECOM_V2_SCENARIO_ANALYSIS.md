# Make.com v2 Scenario Analysis

**Scenario:** `smartpro-website-consultation-v2`  
**Webhook URL:** `https://hook.eu2.make.com/z9t0f5eqipopdg368eypl5i9eo7kpbu8`

Complete analysis of the actual Make.com scenario structure based on exported JSON.

---

## 📊 Module Flow

```
[1] Webhook → [25] Set Variables → [2] Sheets AddRow → [8] Router
    ├─ Accounting: [3] GPT → [5] Resend → [7] Sheets UpdateRow
    ├─ PRO Services: [10] GPT → [11] Resend → [12] Sheets UpdateRow
    ├─ Company Formation: [13] GPT → [14] Resend → [15] Sheets UpdateRow
    └─ Default: [16] GPT → [17] Resend → [18] Sheets UpdateRow
```

---

## 🔍 Module Details

### Module 1: Webhook (CustomWebHook)

**Type:** `gateway:CustomWebHook`  
**ID:** 1  
**Label:** "Smartpro Consultation Form"

**Receives:** JSON payload from frontend  
**Output Bundle:** `1.*`

**Expected Fields:**
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
- `1.primary_message` ⚠️ **Note: expects `primary_message`, not `message`**
- `1.notes`
- `1.language`
- `1.source`

---

### Module 25: Set Variables (Normalize Fields)

**Type:** `util:SetVariables`  
**ID:** 25  
**Scope:** `roundtrip` (variables persist across the scenario)

**Purpose:** Normalizes and prepares fields for Google Sheets

**Variables Set:**

| Variable | Value | Notes |
|----------|-------|-------|
| `client_name` | `{{1.client_name}}` | Direct pass-through |
| `email` | `{{1.email}}` | Direct pass-through |
| `phone` | `{{1.phone}}` | Direct pass-through |
| `business_name` | `{{1.business_name}}` | Direct pass-through |
| `business_type` | `{{1.business_type}}` | Direct pass-through |
| `service_interested` | `{{1.service_interested}}` | Direct pass-through |
| `services_full` | `{{join(1.services; ", ")}}` | ⚠️ **Joins array to comma-separated string** |
| `budget` | `{{1.budget}}` | Direct pass-through |
| `timeline` | `{{1.timeline}}` | Direct pass-through |
| `preferred_contact` | `{{1.preferred_contact}}` | Direct pass-through |
| `preferred_time` | `{{1.preferred_time}}` | Direct pass-through |
| `location` | `{{1.location}}` | Direct pass-through |
| `primary_message` | `{{1.primary_message}}` | ⚠️ **Expects `primary_message`, not `message`** |
| `notes` | `{{1.notes}}` | Direct pass-through |
| `language` | `{{1.language}}` | Direct pass-through |
| `source` | `{{1.source}}` | Direct pass-through |

**Output Bundle:** `25.*`

**Key Points:**
- `services` array is joined to `services_full` string
- `primary_message` is expected (not `message`)
- All variables available as `25.*` for subsequent modules

---

### Module 2: Google Sheets Add Row

**Type:** `google-sheets:addRow`  
**ID:** 2  
**Sheet:** "Smartpro Leads" / "leads"

**Values Mapping:**

| Column | Index | Field | Make.com Variable |
|--------|-------|-------|-------------------|
| A | 0 | Timestamp | `{{now}}` |
| B | 1 | Client Name | `{{25.client_name}}` |
| C | 2 | Email | `{{25.email}}` |
| D | 3 | Phone | `{{25.phone}}` |
| E | 4 | Business Name | `{{25.business_name}}` |
| F | 5 | Business Type | `{{25.business_type}}` |
| G | 6 | Service Interested | `{{25.service_interested}}` |
| H | 7 | Services (Full List) | `{{25.services_full}}` |
| I | 8 | Budget | `{{25.budget}}` |
| J | 9 | Timeline | `{{25.timeline}}` |
| K | 10 | Preferred Contact | `{{25.preferred_contact}}` |
| L | 11 | Preferred Time | `{{25.preferred_time}}` |
| M | 12 | Location | `{{25.location}}` |
| N | 13 | Primary Message | `{{25.primary_message}}` |
| O | 14 | Notes / Extra Info | `{{25.notes}}` |
| P | 15 | Language | `{{25.language}}` |
| Q | 16 | Source | `{{25.source}}` |
| R | 17 | Email Status | `"Pending"` (default) |

**Output:**
- `2.rowNumber` - Used by updateRow modules

---

### Module 8: Router (BasicRouter)

**Type:** `builtin:BasicRouter`  
**ID:** 8

**Routes:**

#### Route 1: Accounting Leads

**Filter:** `{{1.service_interested}}` contains "Accounting"

**Flow:**
- **Module 3:** OpenAI GPT (Accounting-specific prompt)
- **Module 5:** Resend Email (to client)
- **Module 7:** Google Sheets UpdateRow

**UpdateRow Values:**
```json
{
  "17": "Sent",                              // Email Status (R)
  "18": "{{3.choices[1].message.content}}",  // Last Email Preview (S)
  "20": "No Response",                       // Response Status (U)
  "22": "0"                                  // Follow-up Count (W)
}
```

---

#### Route 2: PRO Services Leads

**Filter:** `{{1.service_interested}}` contains "PRO Services"

**Flow:**
- **Module 10:** OpenAI GPT (PRO Services-specific prompt)
- **Module 11:** Resend Email (to client)
- **Module 12:** Google Sheets UpdateRow

**UpdateRow Values:**
```json
{
  "17": "Sent",
  "18": "{{10.choices[1].message.content}}",
  "20": "No Response",
  "22": "0"
}
```

---

#### Route 3: Company Formation Leads

**Filter:** `{{1.service_interested}}` contains "Company Formation"

**Flow:**
- **Module 13:** OpenAI GPT (Company Formation-specific prompt)
- **Module 14:** Resend Email (to client)
- **Module 15:** Google Sheets UpdateRow

**UpdateRow Values:**
```json
{
  "17": "Sent",
  "18": "{{13.choices[1].message.content}}",
  "20": "No Response",
  "22": "0"
}
```

---

#### Route 4: Default (All Other Services)

**Filter:** No filter (default route)

**Flow:**
- **Module 16:** OpenAI GPT (Generic prompt with `{{1.service_interested}}`)
- **Module 17:** Resend Email (to client)
- **Module 18:** Google Sheets UpdateRow

**UpdateRow Values:**
```json
{
  "17": "Sent",
  "18": "{{16.choices[1].message.content}}",
  "20": "No Response",
  "22": "0"
}
```

---

## 📧 Resend Email Modules (5, 11, 14, 17)

**Type:** `resend:sendEmail`  
**Module IDs:** 5 (Accounting), 11 (PRO Services), 14 (Company Formation), 17 (Default)

**Configuration:**
- **To:** `{{1.email}}` ⚠️ **Must be a string** (from webhook Module 1)
- **From:** `Smartpro Business Hub <noreply@portal.thesmartpro.io>`
- **Reply-To:** `info@thesmartpro.io`
- **Subject:** Language-based (see templates guide)

**⚠️ Common Error:**
- ❌ **Wrong:** `{{2.email}}` - Module 2 (Google Sheets) doesn't output email
- ✅ **Correct:** `{{1.email}}` - From webhook payload

**Template Variables:**
- Client name: `{{1.client_name}}`
- Service: `{{1.service_interested}}`
- AI content: `{{3.choices[1].message.content}}` (Accounting), `{{10.*}}` (PRO), `{{13.*}}` (Company Formation), `{{16.*}}` (Default)
- Language: `{{1.language}}` or `{{25.language}}`

---

## ⚠️ Critical Field Mappings

### 1. `primary_message` (not `message`)

**Make.com expects:** `primary_message`  
**Frontend was sending:** `message`

**Fix:** ✅ Frontend now sends `primary_message`

**Flow:**
- Frontend → `primary_message`
- Module 1 → `1.primary_message`
- Module 25 → `25.primary_message`
- Module 2 → Column N: `{{25.primary_message}}`

---

### 2. `services` as Array (not String)

**Make.com expects:** `services` as array  
**Module 25 joins it:** `join(1.services; ", ")` → `services_full`

**Fix:** ✅ Frontend now sends `services` as array

**Flow:**
- Frontend → `services: ["Accounting", "VAT", ...]`
- Module 1 → `1.services` (array)
- Module 25 → `services_full = join(1.services; ", ")` → `"Accounting, VAT, ..."`
- Module 2 → Column H: `{{25.services_full}}`

---

## 📋 Complete Field Mapping Reference

### Frontend → Make.com Module 1

| Frontend Field | Make.com Variable | Type | Notes |
|----------------|------------------|------|-------|
| `client_name` | `1.client_name` | string | Required |
| `email` | `1.email` | string | Required |
| `phone` | `1.phone` | string | Optional |
| `business_name` | `1.business_name` | string | Optional |
| `business_type` | `1.business_type` | string | Optional |
| `service_interested` | `1.service_interested` | string | Required (for routing) |
| `services` | `1.services` | **array** | Optional (Module 25 joins it) |
| `budget` | `1.budget` | string | Optional |
| `timeline` | `1.timeline` | string | Optional |
| `preferred_contact` | `1.preferred_contact` | string | Optional |
| `preferred_time` | `1.preferred_time` | string | Optional |
| `location` | `1.location` | string | Optional |
| `primary_message` | `1.primary_message` | string | Optional |
| `notes` | `1.notes` | string | Required |
| `language` | `1.language` | "en" \| "ar" | Optional |
| `source` | `1.source` | string | Optional |

### Module 25 → Module 2 (Google Sheets)

| Module 25 Variable | Google Sheets Column | Index |
|-------------------|---------------------|-------|
| `25.client_name` | Client Name (B) | 1 |
| `25.email` | Email (C) | 2 |
| `25.phone` | Phone (D) | 3 |
| `25.business_name` | Business Name (E) | 4 |
| `25.business_type` | Business Type (F) | 5 |
| `25.service_interested` | Service Interested (G) | 6 |
| `25.services_full` | Services (Full List) (H) | 7 |
| `25.budget` | Budget (I) | 8 |
| `25.timeline` | Timeline (J) | 9 |
| `25.preferred_contact` | Preferred Contact (K) | 10 |
| `25.preferred_time` | Preferred Time (L) | 11 |
| `25.location` | Location (M) | 12 |
| `25.primary_message` | Primary Message (N) | 13 |
| `25.notes` | Notes / Extra Info (O) | 14 |
| `25.language` | Language (P) | 15 |
| `25.source` | Source (Q) | 16 |

---

## 🎯 Frontend Payload Requirements

Based on the actual Make.com scenario, the frontend must send:

```json
{
  "client_name": "John Doe",
  "email": "john@example.com",
  "phone": "+968 1234 5678",
  "business_name": "Acme LLC",
  "business_type": "Limited Liability Company (LLC)",
  "service_interested": "Accounting",
  "services": ["Accounting & Bookkeeping", "VAT Registration & Filing"],
  "budget": "$5,000 - $10,000",
  "timeline": "3–6 Months",
  "preferred_contact": "WhatsApp",
  "preferred_time": "Afternoon (12 PM - 5 PM)",
  "location": "Muscat, Oman",
  "primary_message": "We need help with accounting.",
  "notes": "Comprehensive structured notes...",
  "language": "en",
  "source": "smartpro-consultation-form"
}
```

**Key Points:**
- ✅ `services` must be an **array** (not string)
- ✅ `primary_message` (not `message`)
- ✅ All other fields as documented

---

## ✅ Status

**Frontend Alignment:**
- ✅ `primary_message` field name fixed
- ✅ `services` sent as array (Make.com joins it)
- ✅ All other fields aligned

**Ready for Production:** Yes

---

**Last Updated:** 2024  
**Scenario Version:** v2  
**Status:** ✅ Production Ready

