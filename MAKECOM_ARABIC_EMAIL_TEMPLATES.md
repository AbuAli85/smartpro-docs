# Arabic Email Templates for Make.com

**Purpose:** Fully Arabic HTML email templates for Resend modules with language filter `{{1.language}} = "ar"`

**Modules to Update:**
- Module 5 (Accounting - Arabic route)
- Module 11 (PRO Services - Arabic route)
- Module 14 (Company Formation - Arabic route)
- Module 17 (Default - Arabic route)

---

## Arabic HTML Email Template

Replace the `html` field in each Arabic-filtered Resend module with this:

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

---

## Module-Specific AI Content References

**Important:** Update the AI content reference based on which GPT module generated it:

| Route | GPT Module | AI Content Variable |
|-------|------------|---------------------|
| Accounting (Arabic) | Module 3 | `{{3.choices[1].message.content}}` |
| PRO Services (Arabic) | Module 10 | `{{10.choices[1].message.content}}` |
| Company Formation (Arabic) | Module 13 | `{{13.choices[1].message.content}}` |
| Default (Arabic) | Module 16 | `{{16.choices[1].message.content}}` |

---

## Arabic Subject Line

**Current:** `Welcome to Smartpro – {{1.service_interested}}`

**Should be:** `تم استلام طلب الاستشارة الخاص بك – مركز سمارت برو للأعمال والخدمات`

Or use a dynamic subject:
```
{{if(1.language = "ar"; "تم استلام طلب الاستشارة الخاص بك – مركز سمارت برو"; "Welcome to Smartpro – " & 1.service_interested)}}
```

**Note:** Make.com may not support `if()` in subject fields. Better approach: Set subject in Module 25 as a variable, or use separate subject fields for each route.

---

## Implementation Steps

### For Each Arabic Route (Modules 5, 11, 14, 17):

1. **Open the Resend module** (e.g., Module 5)
2. **Update HTML field:**
   - Copy the Arabic HTML template above
   - Replace `{{3.choices[1].message.content}}` with the correct GPT module reference:
     - Module 5 → `{{3.choices[1].message.content}}` (Accounting)
     - Module 11 → `{{10.choices[1].message.content}}` (PRO Services)
     - Module 14 → `{{13.choices[1].message.content}}` (Company Formation)
     - Module 17 → `{{16.choices[1].message.content}}` (Default)
3. **Update Subject field:**
   - Change to: `تم استلام طلب الاستشارة الخاص بك – مركز سمارت برو للأعمال والخدمات`
   - Or use: `تم استلام طلب الاستشارة – {{1.service_interested}}`
4. **Save the module**

---

## Key Changes from English Template

| Element | English | Arabic |
|---------|---------|--------|
| **Direction** | `direction:ltr` (default) | `direction:rtl` |
| **Greeting** | `Dear {{1.client_name}},` | `عزيزي {{1.client_name}}،` |
| **Button text** | `Schedule a Call` | `جدولة مكالمة` |
| **Button instruction** | `You may also click...` | `يمكنك أيضاً النقر...` |
| **Closing** | `Best regards,` | `مع أطيب التحيات،` |
| **Company name** | `Smartpro Business Hub & Services` | `مركز سمارت برو للأعمال والخدمات` |
| **Text alignment** | `text-align:left` | `text-align:right` |

---

## Testing

After updating:
1. Submit a test form with `language: "ar"`
2. Verify the email is fully Arabic (greeting, button, footer)
3. Check that RTL layout displays correctly
4. Confirm AI content is inserted correctly

---

**Status:** Ready to implement  
**Last Updated:** 2024

