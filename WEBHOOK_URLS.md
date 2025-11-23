# Webhook URLs - Current Configuration

## ✅ **Active Webhook URLs**

### **Email Reply Processing Webhook**
- **URL:** `https://hook.eu2.make.com/7e5ad8omhcmu8gcn1794m60d476fqqy8`
- **Scenario:** Email Reply Processing
- **Module:** Module 1 (Custom Webhook)
- **Status:** ✅ Active (Verified: 2025-11-23)
- **Test Result:** 200 OK - "Accepted"

**Usage:**
- Receives email reply data
- Triggers Google Sheets update
- Updates: client_replied, client_replied_at, notes

---

### **Form Submission Webhook**
- **URL:** `https://hook.eu2.make.com/z9t0f5eqipopdg368eypl5i9eo7kpbu8`
- **Scenario:** smartpro-website-consultation-v2
- **Status:** ✅ Active
- **Purpose:** Receives form submissions from consultation form

---

### **Reply Webhook (Alternative/Backup)**
- **URL:** `https://hook.eu2.make.com/rfga1pfnupvuxid3jifrzrpb2n25zch9`
- **Status:** ✅ Active (returns "Accepted")
- **Purpose:** Alternative reply webhook

### **Provider Reply Processing Webhook**
- **URL:** `https://hook.eu2.make.com/42ip7sz3mon9lhdoetjhegohkbggsm72`
- **Scenario:** Provider Reply Processing
- **Module:** Module 1 (Custom Webhook)
- **Status:** ⚠️ Needs setup
- **Purpose:** Receives provider replies to client requests

---

## 📝 **Notes**

- **Zone:** All webhooks are on `eu2.make.com`
- **Last Updated:** 2025-11-23
- **Verified:** Email Reply Processing webhook tested and working

---

## 🔄 **If Webhook Expires (410 Error)**

1. Go to Make.com → Scenario
2. Click Module 1 (Custom Webhook)
3. Copy the new webhook URL
4. Update all scripts and documentation

---

## 📋 **Files Using Webhook URLs**

Update these files if webhook URL changes:
- `TEST_THIS_SUBMISSION.ps1` (line 5) ✅ Updated
- `TEST_EMAIL_REPLY.ps1` (line 12) ✅ Updated
- Email service configuration (if set up)
- This file (`WEBHOOK_URLS.md`)

---

**Last Verified:** 2025-11-23  
**Status:** All webhooks active and working ✅

