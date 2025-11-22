# Make.com Template Update Instructions

## ⚠️ Important: Template File vs Rendered Email

The template file (`templates/email-client-confirmation-html-arabic-makecom.html`) is **correctly configured** with Make.com field references:
- ✅ `{{1.service_interested_translated}}` - Line 96
- ✅ `{{1.services_summary}}` - Line 100
- ✅ `{{1.preferred_contact}} {{1.preferred_time}}` - Line 165

However, if you're seeing **hardcoded values** in the actual emails, it means:
1. Make.com is using an **old version** of the template, OR
2. The fields are not being populated from the webhook payload

## Step-by-Step Fix

### Step 1: Copy the Latest Template

1. Open `templates/email-client-confirmation-html-arabic-makecom.html` in your editor
2. Select **ALL** content (Ctrl+A / Cmd+A)
3. Copy it (Ctrl+C / Cmd+C)

### Step 2: Update Make.com Email Module

1. Go to your Make.com scenario
2. Find the **Email module** (Send an Email, Gmail, etc.)
3. Click on the email module to edit it
4. Find the **Email Body** or **HTML Content** field
5. **Delete all existing content**
6. **Paste the new template** (Ctrl+V / Cmd+V)
7. Make sure the format is set to **HTML** (not plain text)
8. **Save** the module

### Step 3: Verify Field References

After pasting, verify these specific lines contain Make.com field references (NOT hardcoded values):

**Line ~96 (Primary Service):**
```html
<td>{{1.service_interested_translated}}</td>
```
❌ **WRONG**: `إدارة المشاريع, الاستشارات التجارية, ...`  
✅ **CORRECT**: `{{1.service_interested_translated}}`

**Line ~100 (All Services):**
```html
<td>{{1.services_summary}}</td>
```
❌ **WRONG**: `Project Management, Business Consulting, ...`  
✅ **CORRECT**: `{{1.services_summary}}`

**Line ~165 (Contact Preferences):**
```html
<p>... عبر {{1.preferred_contact}} {{1.preferred_time}} من أجل:</p>
```
❌ **WRONG**: `كلاهما مرن`  
✅ **CORRECT**: `{{1.preferred_contact}} {{1.preferred_time}}`

### Step 4: Test the Template

1. **Run a test execution** in Make.com
2. Use the **Test** button or trigger with a real form submission
3. Check the **execution log** to see what data is being passed
4. Verify the email sent has **Arabic services** (not English)

## Troubleshooting

### Issue: Fields Still Show Hardcoded Values

**Solution:**
1. Make sure you **completely replaced** the old template (not just edited parts)
2. Check that Make.com saved the changes
3. Verify the webhook payload includes the correct fields:
   - `service_interested_translated` (Arabic primary service)
   - `services_summary` (Arabic services string)
   - `preferred_contact` (Arabic contact method)
   - `preferred_time` (Arabic contact time)

### Issue: Fields Show as Empty

**Solution:**
1. Check the webhook payload structure in Make.com
2. Verify the webhook module is passing data correctly
3. Ensure field names match exactly (case-sensitive):
   - `{{1.service_interested_translated}}` (not `service_interested`)
   - `{{1.services_summary}}` (not `services`)

### Issue: Services Still in English

**Solution:**
1. Verify the backend is sending `services_summary` in Arabic when `language='ar'`
2. Check the webhook payload in Make.com execution log
3. Ensure `language` field is set to `'ar'` in the form submission

## Quick Verification Checklist

Before testing, verify:

- [ ] Template file has `{{1.service_interested_translated}}` (not hardcoded Arabic)
- [ ] Template file has `{{1.services_summary}}` (not hardcoded English)
- [ ] Template file has `{{1.preferred_contact}} {{1.preferred_time}}` (not hardcoded text)
- [ ] Make.com email module is set to **HTML format**
- [ ] Latest template is pasted into Make.com
- [ ] Webhook payload includes all required fields
- [ ] `language` field is set to `'ar'` for Arabic submissions

## Expected Result

After updating, when a form is submitted in Arabic (`language='ar'`):

✅ **Primary Service**: Shows Arabic (e.g., "إدارة المشاريع")  
✅ **All Services**: Shows Arabic (e.g., "إدارة المشاريع، الاستشارات التجارية، أتمتة سير العمل، إدارة العقود")  
✅ **Contact Method**: Shows Arabic (e.g., "كلاهما")  
✅ **Contact Time**: Shows Arabic (e.g., "مرن")

## Need Help?

If issues persist:
1. Check the Make.com execution log for the actual webhook payload
2. Verify the backend code is deployed and running
3. Test with a simple field first (e.g., `{{1.client_name}}`) to ensure Make.com is working
4. Compare the webhook payload structure with the expected structure in `PAYLOAD_VERIFICATION.md`

