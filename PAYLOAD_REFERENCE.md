# Webhook Payload Reference

## ❌ Current Payload (INCORRECT - Missing Critical Fields)

```json
{
  "client_name": "Fahad alamri",
  "email": "chairman@falconeyegroup.net",
  "phone": "+96895153930",
  "business_name": "falcon eye group",
  "business_type": "partnership",
  "services": "employeeManagement",  // ❌ Raw key, not formatted
  "budget": "under5k",
  "timeline": "immediate",
  "preferred_contact": "both",
  "preferred_time": "flexible",
  "location": "Muscat Grand Mall, Oman",
  "notes": "",  // ❌ Empty
  "source": "smartpro-consultation-form",
  "language": "en"
  // ❌ MISSING: service_interested (CRITICAL for Make.com routing!)
  // ❌ MISSING: message
}
```

## ✅ Correct Payload (After Fix)

```json
{
  "client_name": "Fahad alamri",
  "email": "chairman@falconeyegroup.net",
  "phone": "+96895153930",
  "business_name": "falcon eye group",
  "business_type": "partnership",
  "service_interested": "Employee Management",  // ✅ Formatted name for routing
  "services": "Employee Management",  // ✅ Formatted list
  "budget": "Under $5,000",  // ✅ Formatted
  "timeline": "Immediate (Within 1 month)",  // ✅ Formatted
  "preferred_contact": "Both",  // ✅ Formatted
  "preferred_time": "Flexible",  // ✅ Formatted
  "location": "Muscat Grand Mall, Oman",
  "message": "",  // ✅ Included (even if empty)
  "notes": "Phone: +96895153930\nLocation: Muscat Grand Mall, Oman\nBusiness Type: Partnership\nBudget: Under $5,000\nTimeline: Immediate (Within 1 month)\nPreferred Contact: Both\nPreferred Time: Flexible\nLanguage: English",  // ✅ Comprehensive notes
  "source": "smartpro-consultation-form",
  "language": "en",
  "timestamp": "2025-11-17T08:55:15.681Z",  // ✅ Auto-added
  "user_agent": "Mozilla/5.0...",  // ✅ Auto-added
  "referrer": "https://..."  // ✅ Auto-added
}
```

## 🔑 Key Differences

| Field | Before | After | Why It Matters |
|-------|--------|-------|---------------|
| `service_interested` | ❌ Missing | ✅ "Employee Management" | **CRITICAL**: Make.com uses this for email routing |
| `services` | "employeeManagement" | "Employee Management" | Better readability |
| `budget` | "under5k" | "Under $5,000" | Human-readable format |
| `timeline` | "immediate" | "Immediate (Within 1 month)" | Clear description |
| `notes` | "" | Comprehensive info | All data captured |
| `message` | ❌ Missing | ✅ Included | Primary message field |

## 📋 Field Mapping for Make.com

### Required Fields (for Routing)
- ✅ `client_name` → Google Sheets Column B
- ✅ `email` → Google Sheets Column C
- ✅ `business_name` → Google Sheets Column E
- ✅ `service_interested` → Google Sheets Column G (**CRITICAL**)
- ✅ `notes` → Google Sheets Column O

### Additional Fields (for Enhanced Processing)
- `phone` → Google Sheets Column D
- `business_type` → Google Sheets Column F
- `services` → Google Sheets Column H
- `budget` → Google Sheets Column I
- `timeline` → Google Sheets Column J
- `preferred_contact` → Google Sheets Column K
- `preferred_time` → Google Sheets Column L
- `location` → Google Sheets Column M
- `message` → Google Sheets Column N
- `language` → Google Sheets Column P
- `source` → Google Sheets Column Q

## 🎯 Service Name Mapping

The form converts service keys to Make.com format:

| Form Key | Make.com Format | Email Route |
|----------|----------------|-------------|
| `employeeManagement` | "Employee Management" | Default |
| `accounting` | "Accounting" | Accounting |
| `proServices` | "PRO Services" | PRO Services |
| `companyFormation` | "Company Formation" | Company Formation |
| `vat` | "VAT" | Default |
| `businessConsulting` | "Business Consulting" | Default |

## ✅ Verification Checklist

After the fix, verify the payload includes:

- [ ] `service_interested` field is present
- [ ] `service_interested` is formatted (not raw key)
- [ ] `notes` contains comprehensive information
- [ ] `message` field is included
- [ ] All fields are properly formatted
- [ ] Metadata fields (timestamp, user_agent, referrer) are added

## 🧪 Testing

Test with this payload structure:

```json
{
  "client_name": "Test User",
  "email": "test@example.com",
  "phone": "+968 1234 5678",
  "business_name": "Test Company",
  "business_type": "Limited Liability Company (LLC)",
  "service_interested": "Accounting, VAT",
  "services": "Accounting, VAT, Business Consulting",
  "budget": "$10,000 - $25,000",
  "timeline": "3-6 Months",
  "preferred_contact": "Both",
  "preferred_time": "Afternoon (12 PM - 5 PM)",
  "location": "Muscat, Oman",
  "message": "Looking for accounting services",
  "notes": "Phone: +968 1234 5678\nLocation: Muscat, Oman\n...",
  "source": "smartpro-consultation-form",
  "language": "en"
}
```

## 🔧 What Was Fixed

1. **Added `service_interested` field** - Now always included and properly formatted
2. **Improved `services` formatting** - Converts keys to readable names
3. **Enhanced `notes` field** - Includes all additional information
4. **Added `message` field** - Primary message is now included
5. **Added validation** - Ensures `service_interested` is never empty
6. **Better error handling** - Warns if critical fields are missing

## 📝 Make.com Configuration

Make.com should now receive:
- ✅ `service_interested` for routing decisions
- ✅ All fields properly formatted
- ✅ Comprehensive notes field
- ✅ All metadata for tracking

This ensures:
- ✅ Correct email template is selected
- ✅ All data is saved to Google Sheets
- ✅ No information is lost
- ✅ Professional data structure

