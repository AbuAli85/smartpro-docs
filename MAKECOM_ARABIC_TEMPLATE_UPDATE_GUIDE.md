# Arabic Email Template Update Guide

**Your routing structure is perfect!** ✅ You've correctly implemented:
- Router modules (26, 29, 32, 35) after each GPT module
- Filters on Resend modules to detect `{{1.language}} = "ar"`
- Separate routes for Arabic and English

**What needs updating:** The Arabic email templates (Modules 5, 11, 14, 17) still have English text.

---

## 📋 Modules to Update

| Module ID | Route | GPT Module Reference | Update HTML & Subject |
|-----------|-------|---------------------|----------------------|
| **5** | Accounting (Arabic) | `{{3.choices[1].message.content}}` | ✅ Update |
| **11** | PRO Services (Arabic) | `{{10.choices[1].message.content}}` | ✅ Update |
| **14** | Company Formation (Arabic) | `{{13.choices[1].message.content}}` | ✅ Update |
| **17** | Default (Arabic) | `{{16.choices[1].message.content}}` | ✅ Update |

---

## 🔧 Step-by-Step Update Instructions

### For Module 5 (Accounting - Arabic Route):

1. **Open Module 5** in Make.com
2. **Update the `html` field** - Replace entire HTML with:

```html
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f7fa;padding:40px 0;font-family:Arial, sans-serif;direction:rtl;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08);">
        
        <!-- Header -->
        <tr>
          <td style="background:#0d3c61;padding:25px 40px;color:#ffffff;font-size:22px;font-weight:bold;text-align:center;">
            مركز سمارت برو للأعمال والخدمات
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px;color:#333333;font-size:15px;line-height:1.7;direction:rtl;text-align:right;">
            
            <p>عزيزي {{1.client_name}}،</p>

            <!-- AI body goes here - content is inserted dynamically -->
            <div style="white-space:pre-wrap;">
              {{3.choices[1].message.content}}
            </div>

            <p style="margin-top:30px;">
              يمكنك أيضاً النقر على الزر أدناه لجدولة مكالمة في الوقت المناسب لك.
            </p>

            <!-- Button -->
            <p style="text-align:center;margin:35px 0;">
              <a href="https://thesmartpro.io/book"
                 style="background:#0d3c61;color:#ffffff;text-decoration:none;padding:14px 28px;
                        border-radius:6px;font-size:16px;display:inline-block;">
                جدولة مكالمة
              </a>
            </p>

            <p>مع أطيب التحيات،<br>
            مركز سمارت برو للأعمال والخدمات</p>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f0f2f5;padding:20px 40px;font-size:13px;color:#666666;text-align:center;direction:rtl;">
            <p>
              <a href="https://thesmartpro.io" style="color:#0d3c61;text-decoration:none;">www.thesmartpro.io</a> |
              <a href="mailto:support@portal.thesmartpro.io" style="color:#0d3c61;text-decoration:none;">
                support@portal.thesmartpro.io
              </a>
            </p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
```

3. **Update the `subject` field:**
   - Change from: `Welcome to Smartpro – {{1.service_interested}}`
   - Change to: `تم استلام طلب الاستشارة – {{1.service_interested}}`

4. **Save Module 5**

---

### For Module 11 (PRO Services - Arabic Route):

1. **Open Module 11** in Make.com
2. **Update the `html` field** - Use the same HTML as Module 5, but change:
   - `{{3.choices[1].message.content}}` → `{{10.choices[1].message.content}}`
3. **Update the `subject` field** to Arabic (same as Module 5)
4. **Save Module 11**

---

### For Module 14 (Company Formation - Arabic Route):

1. **Open Module 14** in Make.com
2. **Update the `html` field** - Use the same HTML as Module 5, but change:
   - `{{3.choices[1].message.content}}` → `{{13.choices[1].message.content}}`
3. **Update the `subject` field** to Arabic (same as Module 5)
4. **Save Module 14**

---

### For Module 17 (Default - Arabic Route):

1. **Open Module 17** in Make.com
2. **Update the `html` field** - Use the same HTML as Module 5, but change:
   - `{{3.choices[1].message.content}}` → `{{16.choices[1].message.content}}`
3. **Update the `subject` field** to Arabic (same as Module 5)
4. **Save Module 17**

---

## 🔑 Key Changes Made

| Element | English (Current) | Arabic (New) |
|---------|-------------------|--------------|
| **Direction** | `direction:ltr` | `direction:rtl` |
| **Greeting** | `Dear {{1.client_name}},` | `عزيزي {{1.client_name}}،` |
| **Button text** | `Schedule a Call` | `جدولة مكالمة` |
| **Button instruction** | `You may also click...` | `يمكنك أيضاً النقر...` |
| **Closing** | `Best regards,` | `مع أطيب التحيات،` |
| **Header** | `Smartpro Business Hub & Services` | `مركز سمارت برو للأعمال والخدمات` |
| **Text alignment** | `text-align:left` | `text-align:right` |
| **Subject** | `Welcome to Smartpro – {{1.service_interested}}` | `تم استلام طلب الاستشارة – {{1.service_interested}}` |

---

## ✅ Verification Checklist

After updating all 4 modules:

- [ ] Module 5 HTML updated with Arabic text
- [ ] Module 5 subject updated to Arabic
- [ ] Module 11 HTML updated (with `{{10.choices[1].message.content}}`)
- [ ] Module 11 subject updated to Arabic
- [ ] Module 14 HTML updated (with `{{13.choices[1].message.content}}`)
- [ ] Module 14 subject updated to Arabic
- [ ] Module 17 HTML updated (with `{{16.choices[1].message.content}}`)
- [ ] Module 17 subject updated to Arabic

---

## 🧪 Testing

1. Submit a test form with `language: "ar"`
2. Verify email is fully Arabic (greeting, button, footer, subject)
3. Check RTL layout displays correctly
4. Confirm AI content is inserted properly

---

**Status:** Ready to implement  
**Estimated Time:** 10-15 minutes to update all 4 modules

