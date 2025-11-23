# Switch to Gmail Module - Recommended Solution

## 🚨 **Problem: Microsoft SMTP/IMAP Module Unreliable**

The Microsoft SMTP/IMAP module keeps failing with "Command Error. 10" even after re-authentication. This module is **not reliable** for production use.

---

## ✅ **Solution: Switch to Gmail Module**

**Gmail modules are much more reliable in Make.com** and have better OAuth support.

---

## 🔧 **Step-by-Step: Replace with Gmail Module**

### **Step 1: Add Gmail Connection**

1. **Go to Make.com:**
   - Click your profile → **Connections**
   - Or: Settings → Connections

2. **Add Gmail Connection:**
   - Click **"Add connection"**
   - Search for: **"Gmail"**
   - Select: **"Gmail"** (not Gmail Restricted)
   - Click **"Add"**

3. **Authenticate:**
   - Click **"Sign in with Google"**
   - Select Gmail account (or create one)
   - Grant permissions to Make.com
   - Connection created

### **Step 2: Replace Module 1**

1. **Open Scenario:**
   - Go to "Email Watch - Client Replies"
   - Click on Module 1 (Email - Watch Emails)

2. **Delete Current Module:**
   - Click on Module 1
   - Click **"Delete"** or remove it

3. **Add Gmail Module:**
   - Click **"+"** to add module
   - Search for: **"Gmail"**
   - Select: **"Gmail → Watch emails"**
   - Add as first module

4. **Configure Gmail Module:**
   - **Connection:** Select your Gmail connection
   - **Folder:** INBOX
   - **Criteria:** UNSEEN (unread emails)
   - **Filter:** Subject contains "Re:"
   - **Max Results:** 1

### **Step 3: Update Module 2 Data Mapping**

Since Gmail module uses different field names, update Module 2:

**Change from:**
- `{{3.from}}` → `{{1.from}}`
- `{{3.textPlain}}` → `{{1.textPlain}}`
- `{{3.subject}}` → `{{1.subject}}`
- `{{3.date}}` → `{{1.date}}`

**Updated Body:**
```json
{
  "email": "{{1.from}}",
  "from": "{{1.from}}",
  "message": "{{1.textPlain}}",
  "subject": "{{1.subject}}",
  "body": "{{1.textPlain}}",
  "timestamp": "{{formatDate(1.date; \"YYYY-MM-DDTHH:mm:ss.SSSZ\")}}"
}
```

### **Step 4: Test**

1. **Activate Scenario:**
   - Toggle scenario to **ON**

2. **Send Test Email:**
   - Send reply email to Gmail account
   - Subject: "Re: Consultation Request"
   - Check if it processes

---

## 📧 **Option: Forward Emails to Gmail**

If you want to keep using `chairman@falconeyegroup.net`:

### **Set Up Email Forwarding:**

1. **In Microsoft 365/Outlook:**
   - Go to account settings
   - Mail → Forwarding
   - Forward emails to Gmail account
   - Save

2. **Use Gmail Module:**
   - Watch Gmail inbox
   - Process forwarded replies
   - Same functionality, more reliable

---

## 🎯 **Why Gmail Module is Better**

### **Advantages:**
- ✅ **More reliable** in Make.com
- ✅ **Better OAuth support** (less token issues)
- ✅ **Easier to configure**
- ✅ **Fewer connection errors**
- ✅ **Better error messages**
- ✅ **More stable**

### **Disadvantages:**
- ⚠️ Need Gmail account (or forward emails)
- ⚠️ Need to set up forwarding if keeping current email

---

## 📋 **Quick Migration Checklist**

- [ ] Add Gmail connection in Make.com
- [ ] Delete Module 1 (Email - Watch Emails)
- [ ] Add Gmail → Watch emails module
- [ ] Configure Gmail module (INBOX, UNSEEN, filter "Re:")
- [ ] Update Module 2 data mapping ({{3.*}} → {{1.*}})
- [ ] Update HTTP body with new field references
- [ ] Activate scenario
- [ ] Test with real email

---

## 🔄 **Complete Configuration**

### **Module 1: Gmail - Watch Emails**

**Settings:**
- **Connection:** Gmail (your Gmail account)
- **Folder:** INBOX
- **Criteria:** UNSEEN
- **Filter:** Subject contains "Re:"
- **Max Results:** 1

**Output Fields:**
- `{{1.from}}` - Sender email
- `{{1.to}}` - Recipient email
- `{{1.subject}}` - Subject
- `{{1.textPlain}}` - Plain text body
- `{{1.textHtml}}` - HTML body
- `{{1.date}}` - Email date

### **Module 2: HTTP Request (Updated)**

**Settings:**
- **URL:** `https://hook.eu2.make.com/7e5ad8omhcmu8gcn1794m60d476fqqy8`
- **Method:** POST
- **Headers:** Content-Type: application/json
- **Filter:** Subject contains "Re:" (keep this)

**Body (Updated):**
```json
{
  "email": "{{1.from}}",
  "from": "{{1.from}}",
  "message": "{{1.textPlain}}",
  "subject": "{{1.subject}}",
  "body": "{{1.textPlain}}",
  "timestamp": "{{formatDate(1.date; \"YYYY-MM-DDTHH:mm:ss.SSSZ\")}}"
}
```

**Note:** Changed from `{{3.*}}` to `{{1.*}}` because Gmail module is now Module 1.

---

## 🚀 **Migration Steps Summary**

1. **Add Gmail connection** (5 min)
2. **Delete Microsoft Email module** (1 min)
3. **Add Gmail module** (2 min)
4. **Configure Gmail module** (2 min)
5. **Update Module 2 mapping** (2 min)
6. **Test** (5 min)

**Total: ~15 minutes**

---

## ✅ **Expected Result**

After switching:

- ✅ No more "Command Error. 10"
- ✅ More reliable email watching
- ✅ Better OAuth support
- ✅ Stable connection
- ✅ Same functionality

---

## 🎯 **Recommendation**

**Switch to Gmail module now** - it's the most reliable solution and will save you time troubleshooting IMAP issues.

**Steps:**
1. Add Gmail connection
2. Replace Module 1 with Gmail module
3. Update Module 2 data mapping
4. Test

---

**The Microsoft IMAP module is unreliable. Switch to Gmail module for a stable solution!** 🚀

