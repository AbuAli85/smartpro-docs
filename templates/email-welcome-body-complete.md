# Welcome Email Body Content - Complete Templates

## Arabic Version (When {{1.language}} === "ar")

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

## English Version (When {{1.language}} === "en" or empty)

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

## Key Points

### Language-Specific Fields:
- **Arabic**: Use `{{1.service_interested_translated}}` (Arabic service name)
- **English**: Use `{{1.service_interested}}` (English service name)

### Language Check:
- Always check `{{1.language}}` before selecting which version to use
- Default to English if `{{1.language}}` is empty or undefined

### Content Structure:
1. ✅ Thank you message (language-appropriate)
2. ✅ Explain how we can help with their service
3. ✅ List 3 specific questions about their needs
4. ✅ Invite them to reply or schedule a call

### No Mixing:
- ❌ Never mix Arabic and English in the same email
- ✅ Entire email body must be in one language only

## Make.com Implementation

Since Make.com doesn't support conditional logic in email templates, use a **Router** module:

1. **Router Module** → Route based on `{{1.language}}`
2. **Route 1** (Arabic): `{{1.language}}` equals `"ar"` → Use Arabic template
3. **Route 2** (English): `{{1.language}}` equals `"en"` or empty → Use English template

See `templates/email-welcome-body-makecom-instructions.md` for detailed setup instructions.

