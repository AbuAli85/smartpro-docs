# Reply Webhook Configuration Guide

## ✅ **Current Setup (Correct)**

### **V2 Scenario - Form Submissions**
- **Scenario:** "smartpro-website-consultation-v2"
- **Webhook:** `https://hook.eu2.make.com/z9t0f5eqipopdg368eypl5i9eo7kpbu8`
- **Purpose:** Receives form submissions
- **Status:** ✅ **CORRECT** - No changes needed

### **Reply Webhook - Email Replies**
- **Webhook URL:** `https://hook.eu2.make.com/rfga1pfnupvuxid3jifrzrpb2n25zch9`
- **Status:** ✅ Active (returns "Accepted")
- **Configuration:** ⚠️ **NEEDS FIX** - Settings are wrong

---

## 🎯 **What Needs to Be Fixed**

The reply webhook (`rfga1pfnupvuxid3jifrzrpb2n25zch9`) exists and is active, but the **scenario connected to it has wrong settings**.

You need to:
1. Find the scenario using the reply webhook
2. Fix the configuration/settings
3. Ensure it processes email replies correctly

---

## 🔍 **Step 1: Find the Reply Webhook Scenario**

### **Method 1: Check Make.com Scenarios**

1. **Open Make.com**
2. **Go to Scenarios**
3. **Look for scenarios with:**
   - Name containing "reply" or "email reply"
   - Or check each scenario's Module 1 (webhook module)
   - Find the one using webhook ending in `rfga1pfnupvuxid3jifrzrpb2n25zch9`

### **Method 2: Check Webhook Details**

1. **Open Make.com**
2. **Go to Webhooks section**
3. **Find webhook:** `rfga1pfnupvuxid3jifrzrpb2n25zch9`
4. **Check which scenario(s) use it**
5. **Open that scenario**

---

## 🔧 **Step 2: Fix Reply Webhook Scenario Settings**

The reply webhook scenario should:

### **1. Receive Email Reply Data**

**Module 1: Custom Webhook**
- **Webhook:** `rfga1pfnupvuxid3jifrzrpb2n25zch9`
- **Should receive:**
  - Email address (from client)
  - Reply message/content
  - Original email subject/reference
  - Timestamp

### **2. Find Original Submission in Google Sheets**

**Module 2: Google Sheets - Search/Filter**
- **Purpose:** Find the row with matching email
- **Filter by:** Email address (Column D or C)
- **Should find:** The original consultation submission

### **3. Update Google Sheets**

**Module 3: Google Sheets - Update Row**
- **Update fields:**
  - `client_replied` → `TRUE`
  - `client_replied_at` → Current timestamp
  - `notes` → Append reply message (optional)

### **4. Notify Provider (Optional)**

**Module 4: Email/Slack/Notification**
- **Purpose:** Notify provider that client replied
- **Include:** Client name, reply message, original submission details

---

## 📋 **Common Issues with Reply Webhook Configuration**

### **Issue 1: Wrong Data Mapping**

**Problem:** Scenario doesn't know how to extract email from reply data

**Fix:**
- Check webhook data structure
- Map email field correctly: `{{1.email}}` or `{{1.from}}` or `{{1.sender}}`
- Test with sample data

### **Issue 2: Can't Find Row in Google Sheets**

**Problem:** Search/filter doesn't match email correctly

**Fix:**
- Ensure email format matches (case-insensitive)
- Use `lower()` or `trim()` functions
- Check column index (D = 3, C = 2)

### **Issue 3: Update Not Working**

**Problem:** Row update fails or updates wrong row

**Fix:**
- Use correct row number from search result
- Verify column indices
- Check Google Sheets permissions

### **Issue 4: Email Service Not Forwarding Replies**

**Problem:** Replies aren't reaching the webhook

**Fix:**
- Configure email service (Gmail/Outlook) to forward replies
- Set up email forwarding rules
- Use Make.com email module with reply detection

---

## 🔄 **How Email Reply Flow Should Work**

```
Client receives confirmation email
    ↓
Client clicks "Reply" and sends message
    ↓
Email Service (Gmail/Outlook/Make.com) detects reply
    ↓
Email Service forwards to: https://hook.eu2.make.com/rfga1pfnupvuxid3jifrzrpb2n25zch9
    ↓
Reply Webhook Scenario triggers
    ├─→ Module 1: Receive reply data
    ├─→ Module 2: Find submission in Google Sheets (by email)
    ├─→ Module 3: Update Google Sheets
    │   - client_replied = TRUE
    │   - client_replied_at = timestamp
    │   - notes = append reply message
    └─→ Module 4: Notify provider (optional)
```

---

## 🛠️ **Configuration Checklist**

### **Reply Webhook Scenario Settings:**

- [ ] **Module 1 (Webhook):** Uses webhook `rfga1pfnupvuxid3jifrzrpb2n25zch9`
- [ ] **Module 1:** Receives email reply data correctly
- [ ] **Module 2:** Searches Google Sheets by email address
- [ ] **Module 2:** Finds the correct row
- [ ] **Module 3:** Updates `client_replied` to `TRUE`
- [ ] **Module 3:** Updates `client_replied_at` with timestamp
- [ ] **Module 3:** Updates `notes` with reply message (optional)
- [ ] **Module 4:** Notifies provider (optional)
- [ ] **Scenario is ON/Active**

### **Email Service Configuration:**

- [ ] **Email service** (Gmail/Outlook) is configured
- [ ] **Reply forwarding** is enabled
- [ ] **Webhook URL** is set: `https://hook.eu2.make.com/rfga1pfnupvuxid3jifrzrpb2n25zch9`
- [ ] **Test reply** works and reaches webhook

---

## 📝 **Example Reply Webhook Scenario Structure**

```
Module 1: Custom Webhook
    Webhook: rfga1pfnupvuxid3jifrzrpb2n25zch9
    Receives: {{1.email}}, {{1.message}}, {{1.subject}}
    ↓
Module 2: Google Sheets - Search Rows
    Spreadsheet: Smartpro Consultation Submissions
    Filter: Column D (email) = {{1.email}}
    ↓
Module 3: Google Sheets - Update Row
    Row: {{2.rowNumber}}
    Updates:
    - Column AC (client_replied) = TRUE
    - Column AD (client_replied_at) = {{now}}
    - Column AH (notes) = {{append(2.notes; "\nReply: " + 1.message)}}
    ↓
Module 4: Email - Send Email (Optional)
    To: Provider email
    Subject: Client replied: {{1.email}}
    Body: Reply message from client
```

---

## 🧪 **Testing the Reply Webhook**

### **Test 1: Check Webhook is Active**

1. **Access webhook URL:** `https://hook.eu2.make.com/rfga1pfnupvuxid3jifrzrpb2n25zch9`
2. **Should return:** "Accepted"
3. **Status:** ✅ Active

### **Test 2: Send Test Reply Data**

**Using PowerShell:**
```powershell
$body = @{
    email = "test@example.com"
    message = "This is a test reply"
    subject = "Re: Consultation Request"
} | ConvertTo-Json

Invoke-WebRequest -Uri "https://hook.eu2.make.com/rfga1pfnupvuxid3jifrzrpb2n25zch9" `
    -Method POST `
    -ContentType "application/json" `
    -Body $body
```

**Check:**
- Scenario executes
- Google Sheets updates correctly
- Provider notification sent (if configured)

### **Test 3: Real Email Reply**

1. **Submit a form** (creates a submission)
2. **Receive confirmation email**
3. **Reply to the email**
4. **Check:**
   - Reply reaches webhook
   - Scenario executes
   - Google Sheets updates
   - `client_replied` = TRUE

---

## 🎯 **Action Plan**

### **Step 1: Find Reply Webhook Scenario**
1. Open Make.com
2. Find scenario using webhook `rfga1pfnupvuxid3jifrzrpb2n25zch9`
3. Open that scenario

### **Step 2: Review Current Settings**
1. Check Module 1 (webhook) - is it correct?
2. Check Module 2 (Google Sheets search) - does it find rows?
3. Check Module 3 (Google Sheets update) - does it update correctly?
4. Identify what's wrong

### **Step 3: Fix Settings**
1. Fix data mapping
2. Fix Google Sheets search/filter
3. Fix update operations
4. Test each module

### **Step 4: Configure Email Service**
1. Set up email service to forward replies
2. Configure forwarding to webhook URL
3. Test with real email reply

### **Step 5: Test End-to-End**
1. Submit form
2. Receive confirmation email
3. Reply to email
4. Verify Google Sheets updates
5. Verify provider notification (if configured)

---

## 📊 **Summary**

**Current Status:**
- ✅ V2 Scenario: Correctly configured for form submissions
- ✅ Reply Webhook: Active and accessible
- ⚠️ Reply Webhook Scenario: Needs configuration fixes

**What to Fix:**
- Reply webhook scenario settings
- Data mapping from email replies
- Google Sheets search/update operations
- Email service forwarding configuration

**Result:**
- ✅ Form submissions → V2 Scenario
- ✅ Email replies → Reply Webhook Scenario
- ✅ Both work correctly
- ✅ Google Sheets updated properly

---

## 🎉 **Final Setup**

After fixing:

```
Form Submission
    ↓
Webhook: z9t0f5eqipopdg368eypl5i9eo7kpbu8
    ↓
V2 Scenario processes
    └─→ Saves to Google Sheets, sends email

Email Reply
    ↓
Webhook: rfga1pfnupvuxid3jifrzrpb2n25zch9
    ↓
Reply Scenario processes
    └─→ Updates Google Sheets, notifies provider
```

**Both webhooks work correctly for their purposes!**

