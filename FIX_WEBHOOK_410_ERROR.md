# Fix 410 Error: Webhook URL Expired

## 🚨 **Error: 410 (Gone)**

The error `410 (Gone)` means the webhook URL is **expired or no longer valid**. This is common with Make.com webhooks.

---

## 🔧 **Solution: Get New Webhook URL**

### **Step 1: Open Make.com Scenario**

1. Go to [Make.com](https://www.make.com)
2. Navigate to your scenario: **"Email Reply Processing"**
3. Make sure the scenario is **ON/Active**

### **Step 2: Get Webhook URL from Module 1**

1. Click on **Module 1** (Custom Webhook)
2. Look for the **Webhook URL** field
3. **Copy the full URL** (should look like: `https://hook.eu2.make.com/...`)

**Alternative Method:**
- Click on the webhook module
- Look for "Webhook URL" or "Hook URL" in the module settings
- Copy the URL

### **Step 3: Update Test Script**

1. Open `TEST_THIS_SUBMISSION.ps1`
2. Find line 5: `$webhookUrl = "https://hook.eu2.make.com/..."`
3. Replace with your **NEW webhook URL**
4. Save the file

### **Step 4: Test Again**

Run the test script:
```powershell
.\TEST_THIS_SUBMISSION.ps1
```

---

## 🔍 **Why Webhooks Expire**

Make.com webhooks can expire if:
- The scenario was turned OFF and back ON
- The webhook module was deleted and recreated
- The scenario was duplicated
- The webhook was manually regenerated

**Solution:** Always get the webhook URL directly from Make.com when testing.

---

## 📋 **Quick Checklist**

- [ ] Open Make.com → "Email Reply Processing" scenario
- [ ] Verify scenario is **ON/Active**
- [ ] Click Module 1 (Custom Webhook)
- [ ] Copy the webhook URL
- [ ] Update `TEST_THIS_SUBMISSION.ps1` line 5
- [ ] Run test again

---

## 🧪 **Verify Webhook is Active**

Before testing, you can verify the webhook is active:

### **Method 1: Check in Make.com**
- Scenario should show as **ON/Active**
- Module 1 should show the webhook URL
- No error indicators

### **Method 2: Test with Browser**
1. Copy the webhook URL
2. Open in browser (GET request)
3. Should return "Accepted" or similar (not 410)

### **Method 3: Quick PowerShell Test**
```powershell
# Replace with your webhook URL
$url = "https://hook.eu2.make.com/YOUR_WEBHOOK_ID"
try {
    $response = Invoke-WebRequest -Uri $url -Method GET
    Write-Host "✅ Webhook is active: $($response.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "❌ Webhook error: $($_.Exception.Message)" -ForegroundColor Red
}
```

---

## 🔄 **Alternative: Use Different Webhook**

If you have multiple webhook URLs documented, try the others:

### **From Your Documentation:**
1. **Reply Webhook:** `https://hook.eu2.make.com/rfga1pfnupvuxid3jifrzrpb2n25zch9`
   - Status: ✅ Active (returns "Accepted")
   - Try this one if the main webhook doesn't work

2. **Email Reply Processing:** `https://hook.eu2.make.com/clvmjhusq0bo9kzikttimdzsannx65q1`
   - This is the one that returned 410
   - Get the new URL from Make.com

---

## ⚠️ **Important Notes**

1. **Always get URL from Make.com** - Don't rely on old URLs
2. **Scenario must be ON** - Webhooks only work when scenario is active
3. **Check Hook ID** - The JSON showed Hook ID `3622716`, but the URL might be different
4. **Zone matters** - Make sure you're using `eu2.make.com` (not `us1.make.com`)

---

## 🎯 **Next Steps**

1. ✅ Get new webhook URL from Make.com
2. ✅ Update test script
3. ✅ Run test again
4. ✅ Verify Google Sheets updates

---

## 📝 **Update All Scripts**

After getting the new webhook URL, update it in:
- `TEST_THIS_SUBMISSION.ps1` (line 5)
- `TEST_EMAIL_REPLY.ps1` (line 12)
- Any other test scripts
- Email service configuration (if set up)

---

**Once you have the new webhook URL, update the script and test again!** 🚀

