# Email Reply Webhook - Column Mapping Fix

## 🔍 **Issue Identified**

Your Google Sheets search found a row, but the **email column mapping is incorrect**.

**What you found:**
- Row 45 found ✅
- Column D (index 3): `96895153930` (phone number, not email) ❌
- Column R (index 17): `Pending` (status) ✅

**Problem:** The email column is not at index 3 (Column D).

---

## 📊 **Correct Column Mapping**

Based on your V2 scenario blueprint, the correct column structure is:

| Column | Index | Field Name | Purpose |
|--------|-------|------------|---------|
| A | 0 | Timestamp | Submission date |
| B | 1 | Client Name | Client's name |
| C | 2 | Email | **EMAIL IS HERE** ✅ |
| D | 3 | Phone | Phone number |
| E | 4 | Business Name | Business name |
| F | 5 | Business Type | Business type |
| G | 6 | Service Interested | Service |
| ... | ... | ... | ... |
| R | 17 | Status | Status (Pending) |

---

## 🔧 **Fix: Update Module 2 (Google Sheets Search)**

### **Current (WRONG):**
- **Column:** D (index 3)
- **Value:** Phone number

### **Correct:**
- **Column:** C (index 2)
- **Value:** Email address

### **Step-by-Step Fix:**

1. **Open your scenario in Make.com**
2. **Click on Module 2** (Google Sheets Search)
3. **Edit the filter:**
   - **Current:** Column D
   - **Change to:** Column C
4. **Update filter value:**
   - **Current:** `{{lower(trim(1.email))}}`
   - **Keep:** `{{lower(trim(1.email))}}` (this is correct)
5. **Save the module**

---

## 📋 **Updated Module 2 Configuration**

### **Google Sheets - Search Rows**

```
Spreadsheet: Smartpro Consultation Submissions
Sheet: leads
Filter:
  - Column: C (index 2) ← FIXED
  - Condition: Equal to
  - Value: {{lower(trim(1.email))}}
Limit: 1
```

---

## 🔍 **How to Verify Column Mapping**

### **Method 1: Check Google Sheets Directly**

1. **Open Google Sheets:** Smartpro Consultation Submissions
2. **Go to Sheet:** "leads"
3. **Check Row 1 (headers):**
   - Column A: Timestamp
   - Column B: Client Name
   - Column C: Email ← **This is the email column**
   - Column D: Phone
   - Column E: Business Name
   - ...

### **Method 2: Check V2 Scenario Blueprint**

Looking at your V2 scenario, the mapping shows:
- Column 0 (A): `{{now}}` - Timestamp
- Column 1 (B): `{{25.client_name}}` - Client Name
- Column 2 (C): `{{25.email}}` - **Email** ✅
- Column 3 (D): `{{25.phone}}` - Phone

**So email is at Column C (index 2), not Column D (index 3)!**

---

## ✅ **Complete Fixed Configuration**

### **Module 2: Google Sheets Search**

**Filter Configuration:**
```
Column: C (index 2) ← Email column
Condition: Equal to
Value: {{lower(trim(1.email))}}
```

**Alternative (if using column name):**
```
Column: Email (if headers are used)
Condition: Equal to
Value: {{lower(trim(1.email))}}
```

### **Module 3: Google Sheets Update**

**Row Updates:**
- **Column AC (28):** `client_replied` = `TRUE`
- **Column AD (29):** `client_replied_at` = `{{now}}`
- **Column AH (33):** `notes` = `{{ifempty(2.values[33]; ""; 2.values[33] + "\n\n")}}Reply: {{1.message}}`

**Note:** The update columns (AC, AD, AH) should be correct based on your spreadsheet structure.

---

## 🧪 **Test After Fix**

### **Test 1: Search with Correct Column**

1. **Run Module 2 with test data:**
   ```json
   {
     "email": "test@example.com"
   }
   ```
2. **Check output:**
   - Should find row with email in Column C
   - `{{2.values[2]}}` should contain email address
   - `{{2.values[3]}}` should contain phone number

### **Test 2: Verify Row Data**

After search, check:
- `{{2.values[0]}}` = Timestamp
- `{{2.values[1]}}` = Client Name
- `{{2.values[2]}}` = **Email** ✅
- `{{2.values[3]}}` = Phone
- `{{2.values[6]}}` = Service Interested
- `{{2.values[17]}}` = Status

---

## 📝 **Quick Reference: Column Indices**

Based on your spreadsheet structure:

| Field | Column | Index | Usage |
|-------|--------|-------|-------|
| Timestamp | A | 0 | `{{2.values[0]}}` |
| Client Name | B | 1 | `{{2.values[1]}}` |
| **Email** | **C** | **2** | **`{{2.values[2]}}`** ← Search by this |
| Phone | D | 3 | `{{2.values[3]}}` |
| Business Name | E | 4 | `{{2.values[4]}}` |
| Business Type | F | 5 | `{{2.values[5]}}` |
| Service Interested | G | 6 | `{{2.values[6]}}` |
| Status | R | 17 | `{{2.values[17]}}` |
| client_replied | AC | 28 | Update to TRUE |
| client_replied_at | AD | 29 | Update with timestamp |
| notes | AH | 33 | Append reply message |

---

## 🎯 **Action Required**

1. **Open Module 2** in your scenario
2. **Change filter column from D to C**
3. **Save the module**
4. **Test again** with the same email
5. **Verify:** `{{2.values[2]}}` now contains email address

---

## ✅ **After Fix**

Once you fix the column mapping:

- ✅ **Search will find rows by email** (Column C)
- ✅ **Email address will be in `{{2.values[2]}}`**
- ✅ **Phone number will be in `{{2.values[3]}}`**
- ✅ **Update module will work correctly**

**The search is working - just need to fix the column!**

