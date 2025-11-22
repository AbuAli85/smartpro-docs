# Payload Transformation Example

**Input Form Data:**
```json
{
  "name": "Fahad alamri",
  "email": "chairman@falconeyegroup.net",
  "phone": "+96895153930",
  "company": "falcon eye group",
  "businessType": "partnership",
  "services": ["businessConsulting", "proServices", "companyFormation"],
  "budget": "under5k",
  "timeline": "6-12months",
  "preferredContact": "both",
  "preferredTime": "evening",
  "location": "Muscat Grand Mall, Oman",
  "language": "en"
}
```

---

## 🔄 Transformation Process

### Step 1: Service Mapping

**Input Services:**
- `["businessConsulting", "proServices", "companyFormation"]`

**Service Mapping (SERVICE_TO_MAKE_MAP):**
- `businessConsulting` → `"Business Consulting"`
- `proServices` → `"PRO Services"`
- `companyFormation` → `"Company Formation"`

**Result:**
```typescript
allServicesFormatted = ["Business Consulting", "PRO Services", "Company Formation"]
```

### Step 2: Primary Service for Routing

**First Service:** `businessConsulting`

**Mapped Value:** `"Business Consulting"`

**Result:**
```typescript
service_interested = "Business Consulting"
```

**Routing:** This will route to the **Default** email template (since "Business Consulting" is not Accounting, PRO Services, or Company Formation)

---

### Step 3: Notes Field Construction

**Notes Parts:**
```
Phone: +96895153930
Location: Muscat Grand Mall, Oman
Business Type: partnership
Budget: under5k
Timeline: 6-12months
Preferred Contact: both
Preferred Time: evening
Language: en
```

**Final Notes:**
```
Phone: +96895153930
Location: Muscat Grand Mall, Oman
Business Type: partnership
Budget: under5k
Timeline: 6-12months
Preferred Contact: both
Preferred Time: evening
Language: en
```

---

## 📤 Final Webhook Payload

```json
{
  "form_type": "consultation",
  "client_name": "Fahad alamri",
  "email": "chairman@falconeyegroup.net",
  "phone": "+96895153930",
  "business_name": "falcon eye group",
  "business_type": "partnership",
  "services": ["Business Consulting", "PRO Services", "Company Formation"],
  "service_interested": "Business Consulting",
  "budget": "under5k",
  "timeline": "6-12months",
  "preferred_contact": "both",
  "preferred_time": "evening",
  "location": "Muscat Grand Mall, Oman",
  "primary_message": undefined,
  "notes": "Phone: +96895153930\nLocation: Muscat Grand Mall, Oman\nBusiness Type: partnership\nBudget: under5k\nTimeline: 6-12months\nPreferred Contact: both\nPreferred Time: evening\nLanguage: en",
  "language": "en",
  "source": "smartpro-consultation-form",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

---

## 📊 Google Sheets Mapping

| Column | Field | Value |
|--------|-------|-------|
| A | Timestamp | Auto-generated |
| B | Client Name | "Fahad alamri" |
| C | Email | "chairman@falconeyegroup.net" |
| D | Phone | "+96895153930" |
| E | Business Name | "falcon eye group" ✅ |
| F | Business Type | "partnership" |
| G | Service Interested | "Business Consulting" |
| H | Services Full List | "Business Consulting, PRO Services, Company Formation" |
| I | Budget | "under5k" |
| J | Timeline | "6-12months" |
| K | Preferred Contact | "both" |
| L | Preferred Time | "evening" |
| M | Location | "Muscat Grand Mall, Oman" |
| N | Primary Message | (empty - not provided) |
| O | Notes | Structured notes ✅ |
| P | Language | "en" |
| Q | Source | "smartpro-consultation-form" ✅ |

---

## ✅ Verification Checklist

- [x] `form_type` included
- [x] `client_name` mapped from `name`
- [x] `email` mapped correctly
- [x] `phone` mapped correctly
- [x] `business_name` mapped from `company` ✅ Fixed
- [x] `business_type` mapped correctly
- [x] `services` array formatted correctly
- [x] `service_interested` uses first service
- [x] `budget` mapped correctly
- [x] `timeline` mapped correctly
- [x] `preferred_contact` mapped correctly
- [x] `preferred_time` mapped correctly
- [x] `location` mapped correctly
- [x] `notes` field constructed ✅ Fixed
- [x] `language` mapped correctly
- [x] `source` included ✅ Fixed
- [x] `timestamp` auto-generated

---

## 🎯 Make.com Routing

**Service Interested:** "Business Consulting"

**Route Taken:** Default route (Module 16)

**Modules Executed:**
1. Module 1: Webhook receives data
2. Module 25: Set variables (joins services array)
3. Module 2: Add row to Google Sheets
4. Module 8: Router (routes to Default)
5. Module 16: GPT generates content
6. Module 17: Resend sends email
7. Module 18: Update row with email status

---

## 📧 Email Routing

Since `service_interested` is "Business Consulting" (not Accounting, PRO Services, or Company Formation), the email will:
- Route to **Default** email template
- Use generic business consultation content
- Include all selected services in the email

---

**Status:** ✅ Payload transformation verified  
**All critical fields present:** ✅

