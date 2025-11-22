# Welcome Email Body Content - Make.com Instructions

## Overview

Since Make.com email templates don't support conditional logic based on `{{1.language}}`, you have two options:

### Option 1: Use Separate Email Scenarios (Recommended)

Create **two separate email scenarios** in Make.com:
- One for Arabic (`language === 'ar'`)
- One for English (`language === 'en'`)

Use a **Router** or **Filter** module to route based on `{{1.language}}`.

### Option 2: Use Make.com's Text Parser with Conditions

Use Make.com's **Text Parser** module with conditional logic before the email module.

---

## Option 1: Separate Scenarios (Recommended)

### Setup Steps:

1. **Add a Router module** after the webhook
2. **Route 1**: If `{{1.language}}` equals `"ar"` → Use Arabic email template
3. **Route 2**: If `{{1.language}}` equals `"en"` → Use English email template
4. **Route 3**: Default/Other → Use English email template

### Arabic Email Body (Route 1):

Copy from `templates/email-welcome-body-arabic.txt`:

```
نشكرك لتواصلك مع مركز سمارت برو للأعمال والخدمات. لقد استلمنا طلبك بنجاح ونحن متحمسون لمساعدتك في تحقيق أهدافك التجارية.

نحن متخصصون في {{1.service_interested_translated}} ويمكننا مساعدتك في:

• تحليل احتياجاتك الحالية وتحديد أفضل الحلول المناسبة لعملك
• تقديم استشارة مخصصة بناءً على وضعك الفريد
• مساعدتك في تنفيذ الحلول التي تناسب ميزانيتك وجدولك الزمني

للمساعدة في تخصيص استشارتنا لك، يرجى الإجابة على الأسئلة التالية:

1. ما هي التحديات الرئيسية التي تواجهها حالياً في {{1.service_interested_translated}}؟
2. ما هي أهدافك قصيرة المدى وطويلة المدى في هذا المجال؟
3. هل لديك أي متطلبات أو قيود محددة نحتاج إلى أخذها في الاعتبار؟

نحن هنا لمساعدتك. يمكنك الرد على هذا البريد الإلكتروني مباشرة أو حجز مكالمة معنا لمناقشة احتياجاتك بالتفصيل. نتطلع إلى التعاون معك.
```

### English Email Body (Route 2):

Copy from `templates/email-welcome-body-english.txt`:

```
Thank you for contacting Smartpro Business Hub & Services. We have successfully received your request and are excited to help you achieve your business goals.

We specialize in {{1.service_interested}} and can assist you with:

• Analyzing your current needs and identifying the best solutions for your business
• Providing customized consultation based on your unique situation
• Helping you implement solutions that fit your budget and timeline

To help us tailor our consultation for you, please answer the following questions:

1. What are the main challenges you're currently facing with {{1.service_interested}}?
2. What are your short-term and long-term goals in this area?
3. Do you have any specific requirements or constraints we need to consider?

We're here to help. You can reply directly to this email or schedule a call with us to discuss your needs in detail. We look forward to working with you.
```

---

## Option 2: Text Parser with Conditions

### Setup Steps:

1. **Add a Text Parser module** after the webhook
2. **Use conditional logic** to build the email body:

```
{{if(1.language = "ar"; "نشكرك لتواصلك مع مركز سمارت برو للأعمال والخدمات..."; "Thank you for contacting Smartpro Business Hub & Services...")}}
```

**Note**: Make.com's conditional syntax may vary. Check Make.com documentation for the exact syntax.

---

## Field References

### For Arabic Emails:
- Use `{{1.service_interested_translated}}` (Arabic service name)
- Use `{{1.client_name}}` (may be in Arabic)
- Use `{{1.business_name}}` (may be in Arabic)

### For English Emails:
- Use `{{1.service_interested}}` (English service name)
- Use `{{1.client_name}}` (may be in Arabic, but email is in English)
- Use `{{1.business_name}}` (may be in Arabic, but email is in English)

---

## Important Notes

1. **Language Check**: Always check `{{1.language}}` before writing content
2. **No Mixing**: Never mix Arabic and English in the same email
3. **Service Field**: Use `service_interested_translated` for Arabic, `service_interested` for English
4. **Client Name**: The name may be in Arabic, but write the email body in the language specified by `{{1.language}}`

---

## Testing

After setup:
1. Test with `language: "ar"` → Should receive Arabic email
2. Test with `language: "en"` → Should receive English email
3. Test with empty `language` → Should default to English

---

## Recommended Approach

**Use Option 1 (Separate Scenarios)** because:
- ✅ Clearer and easier to maintain
- ✅ Better error handling
- ✅ Easier to customize each language version
- ✅ More reliable than conditional text parsing

