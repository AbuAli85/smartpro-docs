# Make.com Column Mapping - CORRECTED

## 🔴 Current Issues in Your Mapping

Looking at your current Make.com configuration, I found these problems:

### Missing Columns:
- ❌ Column 5 (Phone) - **MISSING**
- ❌ Column 12 (Primary Message) - **MISSING**
- ❌ Column 17 (Email Status) - **WRONG POSITION** (currently in 16)
- ❌ Column 18 (Last Email Preview) - **MISSING**

### Wrong Data:
- ❌ Column 6: Has `"projectManagement"` (raw key) instead of `"{{1.service_interested}}"` (formatted)
- ❌ Column 13: Empty instead of `"{{1.notes}}"`

### Column Misalignment:
- Column 6 should be `service_interested` (formatted: "Project Management")
- Column 7 should be `services` (all services list)
- Column 13 should be `notes` (comprehensive notes)

## ✅ CORRECTED Mapping

### Google Sheets Column Structure (19 columns A-S):

| Column | Index | Field | Make.com Variable | Example Value |
|--------|-------|-------|-------------------|---------------|
| A | 0 | Timestamp | `{{now}}` | 2025-11-17T09:06:25.851Z |
| B | 1 | Client Name | `{{1.client_name}}` | Fahad alamri |
| C | 2 | Email | `{{1.email}}` | chairman@falconeyegroup.net |
| D | 3 | Phone | `{{1.phone}}` | +96895153930 |
| E | 4 | Business Name | `{{1.business_name}}` | falcon eye group |
| F | 5 | Business Type | `{{1.business_type}}` | partnership |
| G | 6 | **Service Interested** | `{{1.service_interested}}` | **Project Management** |
| H | 7 | Services | `{{1.services}}` | Project Management |
| I | 8 | Budget | `{{1.budget}}` | $5,000 - $10,000 |
| J | 9 | Timeline | `{{1.timeline}}` | Immediate (Within 1 month) |
| K | 10 | Preferred Contact | `{{1.preferred_contact}}` | Both |
| L | 11 | Preferred Time | `{{1.preferred_time}}` | Evening (5 PM - 8 PM) |
| M | 12 | Location | `{{1.location}}` | Muscat Grand Mall, Oman |
| N | 13 | Primary Message | `{{1.message}}` | (user's message) |
| O | 14 | Notes | `{{1.notes}}` | (comprehensive notes) |
| P | 15 | Language | `{{1.language}}` | en |
| Q | 16 | Source | `{{1.source}}` | smartpro-consultation-form |
| R | 17 | Email Status | `"Pending"` | Pending → Sent |
| S | 18 | Last Email Preview | `""` | (filled by updateRow) |

## 📋 Step-by-Step Fix

### Step 1: Update Google Sheets Headers

1. Open "Smartpro Leads" → "leads" sheet
2. **Row 1** should have these EXACT headers:
   ```
   A: Timestamp
   B: Client Name
   C: Email
   D: Phone
   E: Business Name
   F: Business Type
   G: Service Interested
   H: Services
   I: Budget
   J: Timeline
   K: Preferred Contact
   L: Preferred Time
   M: Location
   N: Primary Message
   O: Notes
   P: Language
   Q: Source
   R: Email Status
   S: Last Email Preview
   ```

### Step 2: Update Make.com Module 2 (addRow)

**Copy this EXACT configuration:**

```json
{
  "from": "drive",
  "mode": "select",
  "values": {
    "0": "{{now}}",
    "1": "{{1.client_name}}",
    "2": "{{1.email}}",
    "3": "{{1.phone}}",
    "4": "{{1.business_name}}",
    "5": "{{1.business_type}}",
    "6": "{{1.service_interested}}",
    "7": "{{1.services}}",
    "8": "{{1.budget}}",
    "9": "{{1.timeline}}",
    "10": "{{1.preferred_contact}}",
    "11": "{{1.preferred_time}}",
    "12": "{{1.location}}",
    "13": "{{1.message}}",
    "14": "{{1.notes}}",
    "15": "{{1.language}}",
    "16": "{{1.source}}",
    "17": "Pending",
    "18": ""
  },
  "sheetId": "leads",
  "spreadsheetId": "/1OAws5Z_vqlJIi0_4BtkzqLjzFre3e23h/1NVjl-yG95DLLjyF3HQ6qMBBCBQUQQe3HO_E6-MnVGeU",
  "includesHeaders": true,
  "insertDataOption": "INSERT_ROWS",
  "valueInputOption": "USER_ENTERED",
  "insertUnformatted": false
}
```

### Step 3: Update All updateRow Modules

For **Modules 7, 12, 15, and 18** (all updateRow modules), use:

```json
{
  "values": {
    "17": "Sent",
    "18": "{{[module_number].choices[1].message.content}}"
  }
}
```

**Specific mappings:**

- **Module 7** (Accounting): `"18": "{{3.choices[1].message.content}}"`
- **Module 12** (PRO Services): `"18": "{{10.choices[1].message.content}}"`
- **Module 15** (Company Formation): `"18": "{{13.choices[1].message.content}}"`
- **Module 18** (Default): `"18": "{{16.choices[1].message.content}}"`

## 🔑 Key Changes from Your Current Config

| Your Current | Should Be | Why |
|--------------|-----------|-----|
| Column 5: Missing | `{{1.phone}}` | Phone field |
| Column 6: `"projectManagement"` | `{{1.service_interested}}` | **CRITICAL** - Used for routing |
| Column 7: `"5k-10k"` | `{{1.services}}` | All services list |
| Column 8: `"immediate"` | `{{1.budget}}` | Budget field |
| Column 12: Missing | `{{1.message}}` | Primary message |
| Column 13: `""` | `{{1.notes}}` | Comprehensive notes |
| Column 16: `"Pending"` | `{{1.source}}` | Source field |
| Column 17: Missing | `"Pending"` | Email Status |
| Column 18: Missing | `""` | Last Email Preview |

## ⚠️ Critical Fix: service_interested

**Column 6 MUST use `{{1.service_interested}}`** - this is what Make.com uses to route emails!

Your current config has:
```json
"6": "projectManagement"  // ❌ WRONG - Raw key, not from webhook
```

Should be:
```json
"6": "{{1.service_interested}}"  // ✅ CORRECT - From webhook payload
```

## 📊 Expected Result After Fix

After updating, a new submission should populate:

```
A: 2025-11-17T09:06:25.851Z
B: Fahad alamri
C: chairman@falconeyegroup.net
D: +96895153930
E: falcon eye group
F: partnership
G: Project Management  ← ✅ Formatted service name
H: Project Management  ← ✅ All services
I: $5,000 - $10,000  ← ✅ Formatted budget
J: Immediate (Within 1 month)  ← ✅ Formatted timeline
K: Both  ← ✅ Formatted
L: Evening (5 PM - 8 PM)  ← ✅ Formatted
M: Muscat Grand Mall, Oman
N: (user's primary message)
O: Phone: +96895153930\nLocation: Muscat Grand Mall, Oman\n...  ← ✅ Comprehensive
P: en
Q: smartpro-consultation-form
R: Pending (then Sent)
S: (email preview)
```

## ✅ Verification Checklist

After updating Make.com:
- [ ] Column 6 uses `{{1.service_interested}}` (not hardcoded value)
- [ ] Column 3 maps to `{{1.phone}}`
- [ ] Column 13 maps to `{{1.message}}`
- [ ] Column 14 maps to `{{1.notes}}`
- [ ] Column 17 is "Pending"
- [ ] Column 18 is empty string `""`
- [ ] All 19 columns (0-18) are mapped
- [ ] Test submission shows correct data in all columns

## 🚨 Important Notes

1. **service_interested is CRITICAL** - Make.com router uses this field to select email template
2. **Use variables, not hardcoded values** - Always use `{{1.field_name}}` format
3. **Column order matters** - Must match Google Sheets header order exactly
4. **Test after changes** - Submit a test form and verify all columns populate correctly

