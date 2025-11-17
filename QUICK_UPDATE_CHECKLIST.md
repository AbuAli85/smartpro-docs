# Quick Update Checklist - Make.com & Google Sheets

## 🎯 Problem
Form has **15+ fields**, but Make.com/Google Sheets only handle **5 fields**.

## ✅ Solution: Two Options

### Option A: Full Update (Recommended - Captures Everything)

**Update Google Sheets:**
1. Add these new column headers in row 1:
   ```
   D: Phone
   E: Business Name (move existing)
   F: Business Type
   G: Service Interested (move existing)
   H: Services
   I: Budget
   J: Timeline
   K: Preferred Contact
   L: Preferred Time
   M: Location
   N: Primary Message
   O: Notes (move existing)
   P: Language
   Q: Source
   R: Email Status (move existing)
   S: Last Email Preview (move existing)
   ```

**Update Make.com Module 2 (addRow):**
```json
{
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
}
```

**Update Make.com Modules 7, 12, 15, 18 (updateRow):**
```json
{
  "17": "Sent",
  "18": "{{[module].choices[1].message.content}}"
}
```

---

### Option B: Minimal Update (Quick Fix - 5 New Fields)

**Update Google Sheets:**
Add these columns after existing ones:
```
G: Phone
H: Budget
I: Timeline
J: Language
K: Email Status (move)
L: Last Email Preview (move)
```

**Update Make.com Module 2 (addRow):**
```json
{
  "0": "{{now}}",
  "1": "{{1.client_name}}",
  "2": "{{1.email}}",
  "3": "{{1.business_name}}",
  "4": "{{1.service_interested}}",
  "5": "{{1.notes}}",
  "6": "{{1.phone}}",
  "7": "{{1.budget}}",
  "8": "{{1.timeline}}",
  "9": "{{1.language}}",
  "10": "Pending",
  "11": ""
}
```

**Update Make.com updateRow modules:**
```json
{
  "10": "Sent",
  "11": "{{[module].choices[1].message.content}}"
}
```

---

## 📋 Step-by-Step

### 1. Google Sheets (5 minutes)
- [ ] Open "Smartpro Leads" → "leads" sheet
- [ ] Add new column headers (see Option A or B above)
- [ ] Freeze row 1
- [ ] Format headers as Bold

### 2. Make.com Module 2 (10 minutes)
- [ ] Open scenario "smartpro-website-leads"
- [ ] Click Module 2 (Google Sheets: addRow)
- [ ] Click "Values" section
- [ ] Update mapping (copy from Option A or B above)
- [ ] Save

### 3. Make.com updateRow Modules (5 minutes each)
- [ ] Module 7 (Accounting route)
- [ ] Module 12 (PRO Services route)
- [ ] Module 15 (Company Formation route)
- [ ] Module 18 (Default route)
- [ ] Update "Values" mapping for each

### 4. Test (5 minutes)
- [ ] Submit test form
- [ ] Check Google Sheets - data in correct columns?
- [ ] Check Make.com execution - any errors?
- [ ] Verify email sent
- [ ] Check Email Status updated to "Sent"

---

## 🔍 Field Mapping Reference

| Form Field | Webhook Field | Google Sheets Column |
|------------|---------------|---------------------|
| Name | `client_name` | B |
| Email | `email` | C |
| Phone | `phone` | D |
| Company | `business_name` | E |
| Business Type | `business_type` | F |
| Services (selected) | `service_interested` | G |
| All Services | `services` | H |
| Budget | `budget` | I |
| Timeline | `timeline` | J |
| Preferred Contact | `preferred_contact` | K |
| Preferred Time | `preferred_time` | L |
| Location | `location` | M |
| Message | `message` | N |
| All Notes | `notes` | O |
| Language | `language` | P |
| Source | `source` | Q |

---

## ⚠️ Important Notes

1. **Backup First**: Export Make.com scenario before changes
2. **Column Order**: Must match Make.com mapping exactly
3. **Empty Values**: Use `""` for optional fields
4. **Test First**: Test with one submission before going live

---

## 🆘 Need Help?

See detailed guides:
- `MAKECOM_UPDATE_GUIDE.md` - Full instructions
- `GOOGLE_SHEETS_TEMPLATE.md` - Complete template

---

## ✅ Verification

After updating, verify:
- [ ] All form fields appear in Google Sheets
- [ ] No data in wrong columns
- [ ] Make.com executes without errors
- [ ] Emails are sent correctly
- [ ] Email Status updates properly

