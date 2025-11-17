# Make.com Routing System Documentation | توثيق نظام التوجيه في Make.com

## 🔀 Overview | نظرة عامة

**English:** Your Make.com automation uses an intelligent routing system to send leads through service-specific email generation paths. This ensures each lead receives a highly relevant, personalized email based on their selected service.

**العربية:** يستخدم أتمتة Make.com الخاص بك نظام توجيه ذكي لإرسال العملاء المحتملين عبر مسارات إنشاء بريد إلكتروني محددة حسب الخدمة. يضمن هذا أن كل عميل محتمل يتلقى بريدًا إلكترونيًا عالي الصلة ومخصصًا بناءً على الخدمة المختارة.

## 📊 Flow Architecture | هندسة التدفق

```
Webhook (Module 1) | Webhook (الوحدة 1)
    ↓
Google Sheets - Add Row (Module 2) | Google Sheets - إضافة صف (الوحدة 2)
    ↓
Router (Module 8) - Routes based on service_interested | الموجه (الوحدة 8) - التوجيه بناءً على service_interested
    ├─→ Accounting Route (Module 3 → 5 → 7) | مسار المحاسبة (الوحدة 3 → 5 → 7)
    ├─→ PRO Services Route (Module 10 → 11 → 12) | مسار خدمات PRO (الوحدة 10 → 11 → 12)
    ├─→ Company Formation Route (Module 13 → 14 → 15) | مسار تكوين الشركة (الوحدة 13 → 14 → 15)
    └─→ Other Services Route (Module 16 → 17 → 18) | مسار الخدمات الأخرى (الوحدة 16 → 17 → 18)
```

## 🎯 Service Routes | مسارات الخدمات

### Route 1: Accounting Services | المسار 1: خدمات المحاسبة

**English - Trigger:** `service_interested` contains "Accounting"  
**العربية - المشغل:** يحتوي `service_interested` على "Accounting" أو "المحاسبة"

**English - Modules:**  
**العربية - الوحدات:**
- **Module 3 | الوحدة 3:** OpenAI GPT (Accounting-focused prompt | موجه يركز على المحاسبة)
- **Module 5 | الوحدة 5:** Resend Email | إعادة إرسال البريد الإلكتروني
- **Module 7 | الوحدة 7:** Google Sheets Update (Status + Preview | تحديث Google Sheets (الحالة + المعاينة))

**English - System Prompt Focus:**  
**العربية - تركيز موجه النظام:**
- Accounting services (bookkeeping, reporting, VAT, financial statements) | خدمات المحاسبة (مسك الدفاتر، التقارير، ضريبة القيمة المضافة، البيانات المالية)
- Questions about accounting systems, software, ongoing support needs | أسئلة حول أنظمة المحاسبة، البرمجيات، احتياجات الدعم المستمر

**Email Template Variable | متغير قالب البريد الإلكتروني:**
```
{{3.choices[1].message.content}}
```

### Route 2: PRO Services | المسار 2: خدمات PRO

**English - Trigger:** `service_interested` contains "PRO Services"  
**العربية - المشغل:** يحتوي `service_interested` على "PRO Services" أو "خدمات PRO"

**English - Modules:**  
**العربية - الوحدات:**
- **Module 10 | الوحدة 10:** OpenAI GPT (PRO Services-focused prompt | موجه يركز على خدمات PRO)
- **Module 11 | الوحدة 11:** Resend Email | إعادة إرسال البريد الإلكتروني
- **Module 12 | الوحدة 12:** Google Sheets Update (Status + Preview | تحديث Google Sheets (الحالة + المعاينة))

**English - System Prompt Focus:**  
**العربية - تركيز موجه النظام:**
- PRO/government-related tasks (visas, licenses, labor/immigration processes) | مهام PRO/المتعلقة بالحكومة (التأشيرات، التراخيص، عمليات العمل/الهجرة)
- Questions about government paperwork needs, visa types, license requirements | أسئلة حول احتياجات الأوراق الحكومية، أنواع التأشيرات، متطلبات الترخيص

**Email Template Variable | متغير قالب البريد الإلكتروني:**
```
{{10.choices[1].message.content}}
```

### Route 3: Company Formation | المسار 3: تكوين الشركة

**English - Trigger:** `service_interested` contains "Company Formation"  
**العربية - المشغل:** يحتوي `service_interested` على "Company Formation" أو "تكوين الشركة"

**English - Modules:**  
**العربية - الوحدات:**
- **Module 13 | الوحدة 13:** OpenAI GPT (Company Formation-focused prompt | موجه يركز على تكوين الشركة)
- **Module 14 | الوحدة 14:** Resend Email | إعادة إرسال البريد الإلكتروني
- **Module 15 | الوحدة 15:** Google Sheets Update (Status + Preview | تحديث Google Sheets (الحالة + المعاينة))

**English - System Prompt Focus:**  
**العربية - تركيز موجه النظام:**
- Business setup (licensing, structure, documentation, coordination with authorities) | إعداد الأعمال (الترخيص، الهيكل، التوثيق، التنسيق مع السلطات)
- Questions about business activity, location, timeline preferences | أسئلة حول نشاط الأعمال، الموقع، تفضيلات الجدول الزمني

**Email Template Variable | متغير قالب البريد الإلكتروني:**
```
{{13.choices[1].message.content}}
```

### Route 4: Other Services (Default) | المسار 4: الخدمات الأخرى (افتراضي)

**English - Trigger:** All other services (VAT, consulting, advisory, etc.)  
**العربية - المشغل:** جميع الخدمات الأخرى (ضريبة القيمة المضافة، الاستشارات، الاستشارية، إلخ)

**English - Modules:**  
**العربية - الوحدات:**
- **Module 16 | الوحدة 16:** OpenAI GPT (General business services prompt | موجه خدمات الأعمال العامة)
- **Module 17 | الوحدة 17:** Resend Email | إعادة إرسال البريد الإلكتروني
- **Module 18 | الوحدة 18:** Google Sheets Update (Status + Preview | تحديث Google Sheets (الحالة + المعاينة))

**English - System Prompt Focus:**  
**العربية - تركيز موجه النظام:**
- General business services (VAT, consulting, advisory, other support) | خدمات الأعمال العامة (ضريبة القيمة المضافة، الاستشارات، الاستشارية، الدعم الآخر)
- Flexible questions based on specific service mentioned | أسئلة مرنة بناءً على الخدمة المحددة المذكورة

**Email Template Variable | متغير قالب البريد الإلكتروني:**
```
{{16.choices[1].message.content}}
```

## 📧 Email Configuration | إعداد البريد الإلكتروني

**English:** All routes use the same email template but with different AI content.  
**العربية:** تستخدم جميع المسارات نفس قالب البريد الإلكتروني ولكن بمحتوى ذكي مختلف.

**English - Common Settings:**  
**العربية - الإعدادات المشتركة:**
- From | من: `Smartpro Business Hub <noreply@portal.thesmartpro.io>`
- Reply-To | الرد إلى: `info@thesmartpro.io`
- Subject | الموضوع: `Welcome to Smartpro – {{1.service_interested}}` | `مرحبًا بك في Smartpro – {{1.service_interested}}`
- Format | التنسيق: HTML

**English - Template Structure:**  
**العربية - هيكل القالب:**
- Header with branding | رأس مع العلامة التجارية
- Personalized greeting: "Dear {{1.client_name}}," | تحية مخصصة: "عزيزي {{1.client_name}}،"
- Service-specific AI content (varies by route) | محتوى ذكي محدد للخدمة (يختلف حسب المسار)
- CTA button: "Schedule a Call" | زر الحث على الإجراء: "جدولة مكالمة"
- Footer with contact info | تذييل مع معلومات الاتصال

## 📊 Google Sheets Updates | تحديثات Google Sheets

**English:** After email is sent, each route updates the Google Sheets row.  
**العربية:** بعد إرسال البريد الإلكتروني، يقوم كل مسار بتحديث صف Google Sheets.

**English - Updated Columns:**  
**العربية - الأعمدة المحدثة:**
- **Column G (Email Status | حالة البريد الإلكتروني):** Changed from "Pending" to "Sent" | تغيير من "قيد الانتظار" إلى "تم الإرسال"
- **Column H (Last Email Preview | معاينة آخر بريد إلكتروني):** Populated with full AI-generated email content | مملوء بمحتوى البريد الإلكتروني الكامل الذي تم إنشاؤه بواسطة الذكاء الاصطناعي

**English - Module References:**  
**العربية - مراجع الوحدات:**
- Accounting | المحاسبة: Module 7 | الوحدة 7
- PRO Services | خدمات PRO: Module 12 | الوحدة 12
- Company Formation | تكوين الشركة: Module 15 | الوحدة 15
- Other | أخرى: Module 18 | الوحدة 18

## 🔍 Routing Logic | منطق التوجيه

**English:** The Router (Module 8) uses filter conditions.  
**العربية:** يستخدم الموجه (الوحدة 8) شروط التصفية.

1. **English - Accounting Filter | العربية - مرشح المحاسبة:**
   ```
   {{1.service_interested}} contains "Accounting"
   {{1.service_interested}} contains "المحاسبة"
   ```

2. **English - PRO Services Filter | العربية - مرشح خدمات PRO:**
   ```
   {{1.service_interested}} contains "PRO Services"
   {{1.service_interested}} contains "خدمات PRO"
   ```

3. **English - Company Formation Filter | العربية - مرشح تكوين الشركة:**
   ```
   {{1.service_interested}} contains "Company Formation"
   {{1.service_interested}} contains "تكوين الشركة"
   ```

4. **English - Default Route | العربية - المسار الافتراضي:**
   - Catches all other services (VAT, Other, etc.) | يلتقط جميع الخدمات الأخرى (ضريبة القيمة المضافة، أخرى، إلخ)
   - No filter needed (default route) | لا حاجة لمرشح (مسار افتراضي)

## ✅ Benefits of Routing System | فوائد نظام التوجيه

1. **English - Service-Specific Content | العربية - محتوى محدد للخدمة:** Each service gets tailored email content | تحصل كل خدمة على محتوى بريد إلكتروني مخصص
2. **English - Better Relevance | العربية - صلة أفضل:** Questions and explanations match the service type | الأسئلة والتفسيرات تطابق نوع الخدمة
3. **English - Improved Engagement | العربية - مشاركة محسنة:** More relevant emails = higher response rates | رسائل أكثر صلة = معدلات استجابة أعلى
4. **English - Scalability | العربية - قابلية التوسع:** Easy to add new service routes | سهل إضافة مسارات خدمة جديدة
5. **English - Maintainability | العربية - قابلية الصيانة:** Each service has its own prompt that can be optimized independently | لكل خدمة موجهها الخاص الذي يمكن تحسينه بشكل مستقل

## 🔧 Adding New Service Routes | إضافة مسارات خدمة جديدة

**English:** To add a new service route:  
**العربية:** لإضافة مسار خدمة جديد:

1. **English - Add Filter in Router | العربية - إضافة مرشح في الموجه:**
   - Create new route in Module 8 (BasicRouter) | إنشاء مسار جديد في الوحدة 8 (BasicRouter)
   - Set filter condition: `{{1.service_interested}} contains "New Service"` | تعيين شرط المرشح: `{{1.service_interested}} contains "خدمة جديدة"`

2. **English - Add OpenAI Module | العربية - إضافة وحدة OpenAI:**
   - Create new OpenAI module with service-specific system prompt | إنشاء وحدة OpenAI جديدة مع موجه نظام محدد للخدمة
   - Use same user prompt structure | استخدام نفس هيكل موجه المستخدم
   - Note the module ID | ملاحظة معرف الوحدة

3. **English - Add Resend Module | العربية - إضافة وحدة Resend:**
   - Create new Resend module | إنشاء وحدة Resend جديدة
   - Use email template with correct module reference: `{{NEW_MODULE_ID.choices[1].message.content}}` | استخدام قالب البريد الإلكتروني مع مرجع الوحدة الصحيح

4. **English - Add Google Sheets Update | العربية - إضافة تحديث Google Sheets:**
   - Create new Google Sheets update module | إنشاء وحدة تحديث Google Sheets جديدة
   - Update columns G and H | تحديث الأعمدة G و H
   - Reference correct OpenAI module for preview | الرجوع إلى وحدة OpenAI الصحيحة للمعاينة

## 📋 Module ID Reference | مرجع معرف الوحدة

| Service | الخدمة | OpenAI Module | وحدة OpenAI | Resend Module | وحدة Resend | Sheets Update Module | وحدة تحديث Sheets |
|---------|--------|--------------|-------------|---------------|-------------|---------------------|-------------------|
| Accounting | المحاسبة | 3 | 3 | 5 | 5 | 7 | 7 |
| PRO Services | خدمات PRO | 10 | 10 | 11 | 11 | 12 | 12 |
| Company Formation | تكوين الشركة | 13 | 13 | 14 | 14 | 15 | 15 |
| Other | أخرى | 16 | 16 | 17 | 17 | 18 | 18 |

## 🎯 Testing Each Route | اختبار كل مسار

**English:** To test each route:  
**العربية:** لاختبار كل مسار:

1. **English - Accounting | العربية - المحاسبة:** Submit form with "Accounting" selected | إرسال النموذج مع اختيار "Accounting" أو "المحاسبة"
2. **English - PRO Services | العربية - خدمات PRO:** Submit form with "PRO Services" selected | إرسال النموذج مع اختيار "PRO Services" أو "خدمات PRO"
3. **English - Company Formation | العربية - تكوين الشركة:** Submit form with "Company Formation" selected | إرسال النموذج مع اختيار "Company Formation" أو "تكوين الشركة"
4. **English - Other | العربية - أخرى:** Submit form with "VAT" or "Other" selected | إرسال النموذج مع اختيار "VAT" أو "Other" أو "أخرى"

**English - Verify:**  
**العربية - التحقق:**
- Correct route is triggered | يتم تشغيل المسار الصحيح
- Service-specific content is generated | يتم إنشاء محتوى محدد للخدمة
- Email is sent successfully | يتم إرسال البريد الإلكتروني بنجاح
- Google Sheets is updated correctly | يتم تحديث Google Sheets بشكل صحيح

---

**English - Last Updated | العربية - آخر تحديث:** Current Date | التاريخ الحالي  
**English - Routing System Status | العربية - حالة نظام التوجيه:** ✅ Active and Configured | ✅ نشط ومُكوّن  
**English - Total Routes | العربية - إجمالي المسارات:** 4 (Accounting, PRO Services, Company Formation, Other) | 4 (المحاسبة، خدمات PRO، تكوين الشركة، أخرى)

