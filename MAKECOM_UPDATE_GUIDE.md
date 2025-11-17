# Make.com & Google Sheets Update Guide

## Current Situation

The consultation form has **15+ fields**, but Make.com and Google Sheets are only configured for **5 basic fields**. This guide will help you update both to capture all form data professionally.

## Required Updates

### 1. Google Sheets - Add New Columns

Your current Google Sheets structure:
```
A: Timestamp
B: Client Name
C: Email
D: Business Name
E: Service Interested
F: Notes / Extra Info
G: Email Status
H: Last Email Preview
I-Z: Empty
```

**Updated Structure (Recommended):**
```
A: Timestamp
B: Client Name
C: Email
D: Phone
E: Business Name
F: Business Type
G: Service Interested
H: Services (Full List)
I: Budget
J: Timeline
K: Preferred Contact
L: Preferred Time
M: Location
N: Primary Message
O: Notes (All Additional Info)
P: Language
Q: Source
R: Email Status
S: Last Email Preview
T-Z: Reserved for future use
```

### 2. Make.com Flow Updates

You need to update **Module 2** (Google Sheets: addRow) to map all the new fields.

## Step-by-Step Instructions

### Step 1: Update Google Sheets

1. Open your Google Sheet: "Smartpro Leads"
2. Go to the "leads" sheet
3. Add new column headers in row 1:
   - **Column D**: `Phone`
   - **Column E**: `Business Name` (move existing)
   - **Column F**: `Business Type`
   - **Column G**: `Service Interested` (move existing)
   - **Column H**: `Services`
   - **Column I**: `Budget`
   - **Column J**: `Timeline`
   - **Column K**: `Preferred Contact`
   - **Column L**: `Preferred Time`
   - **Column M**: `Location`
   - **Column N**: `Primary Message`
   - **Column O**: `Notes` (move existing)
   - **Column P**: `Language`
   - **Column Q**: `Source`
   - **Column R**: `Email Status` (move existing)
   - **Column S**: `Last Email Preview` (move existing)

4. **Important**: Update any existing formulas or references that use the old column positions

### Step 2: Update Make.com Flow - Module 2 (addRow)

1. Open your Make.com scenario: "smartpro-website-leads"
2. Click on **Module 2** (Google Sheets: addRow)
3. In the **Values** section, update the mapping:

```json
{
  "0": "{{now}}",                           // Timestamp (A)
  "1": "{{1.client_name}}",                 // Client Name (B)
  "2": "{{1.email}}",                       // Email (C)
  "3": "{{1.phone}}",                       // Phone (D) - NEW
  "4": "{{1.business_name}}",               // Business Name (E)
  "5": "{{1.business_type}}",               // Business Type (F) - NEW
  "6": "{{1.service_interested}}",          // Service Interested (G)
  "7": "{{1.services}}",                    // Services (H) - NEW
  "8": "{{1.budget}}",                      // Budget (I) - NEW
  "9": "{{1.timeline}}",                    // Timeline (J) - NEW
  "10": "{{1.preferred_contact}}",          // Preferred Contact (K) - NEW
  "11": "{{1.preferred_time}}",             // Preferred Time (L) - NEW
  "12": "{{1.location}}",                   // Location (M) - NEW
  "13": "{{1.message}}",                    // Primary Message (N) - NEW
  "14": "{{1.notes}}",                      // Notes (O)
  "15": "{{1.language}}",                   // Language (P) - NEW
  "16": "{{1.source}}",                     // Source (Q) - NEW
  "17": "Pending",                          // Email Status (R)
  "18": ""                                  // Last Email Preview (S)
}
```

### Step 3: Update Make.com Flow - Module 7 (updateRow)

1. Click on **Module 7** (Google Sheets: updateRow) in the Accounting route
2. Update the **Values** mapping to match new column positions:

```json
{
  "17": "Sent",                             // Email Status (R)
  "18": "{{3.choices[1].message.content}}"  // Last Email Preview (S)
}
```

3. Repeat for **Module 12** (PRO Services route) and **Module 15** (Company Formation route)

### Step 4: Update Make.com Flow - Module 8 (updateRow) - Default Route

1. Click on **Module 18** (Google Sheets: updateRow) in the default route
2. Update the **Values** mapping:

```json
{
  "17": "Sent",                             // Email Status (R)
  "18": "{{16.choices[1].message.content}}" // Last Email Preview (S)
}
```

## Alternative: Simplified Approach

If you prefer to keep the current Google Sheets structure and just add a few key fields:

### Minimal Update Structure:
```
A: Timestamp
B: Client Name
C: Email
D: Business Name
E: Service Interested
F: Notes (Enhanced with all info)
G: Phone (NEW)
H: Budget (NEW)
I: Timeline (NEW)
J: Language (NEW)
K: Email Status
L: Last Email Preview
```

Then update Make.com Module 2:
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

## Testing Checklist

After updating:

- [ ] Test form submission with all fields filled
- [ ] Verify data appears in correct Google Sheets columns
- [ ] Check Make.com execution history for errors
- [ ] Verify email is sent correctly
- [ ] Confirm Email Status updates to "Sent"
- [ ] Verify Last Email Preview is saved

## Make.com Flow JSON Configuration

Here's the complete updated configuration for Module 2 (addRow):

```json
{
  "id": 2,
  "module": "google-sheets:addRow",
  "version": 2,
  "parameters": {
    "__IMTCONN__": 8689880
  },
  "mapper": {
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
}
```

## Important Notes

1. **Backup First**: Export your current Make.com scenario before making changes
2. **Test Incrementally**: Update one module at a time and test
3. **Column Order**: Make sure Google Sheets columns match the mapping order
4. **Empty Values**: Use empty string `""` for optional fields that might be missing
5. **Data Types**: All values are sent as strings, Google Sheets will handle formatting

## Need Help?

If you encounter issues:
1. Check Make.com execution logs
2. Verify column names match exactly (case-sensitive)
3. Ensure all required fields are mapped
4. Test with a single submission first

