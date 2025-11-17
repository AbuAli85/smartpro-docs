# GPT Prompt Language Fix - Critical Update

## 🚨 Current Issues

### Issue 1: Language Mixing in Arabic Template
The AI-generated content is **mixing English and Arabic** even when using the Arabic template:

**Example:**
```
Thank you for تواصلك معنا بخصوص خدمة CRM & Client Management...
```

### Issue 2: Wrong Language in English Template
The English template is being used, but the AI content is **100% Arabic**:

**Example:**
- **Template:** English (greeting, CTA, closing all in English)
- **Content:** Arabic (AI-generated body text is 100% Arabic)
- **Greeting:** "Dear فهد العامري," (mixing English "Dear" with Arabic name)

This shows the GPT is not respecting the `{{1.language}}` field and is generating content in the wrong language.

---

## ✅ Solution: Update GPT Prompts

### For ALL GPT Modules (3, 10, 13, 16)

Update both the **System** and **User** messages to explicitly enforce language consistency.

---

## 📝 Updated System Message

**Replace the current system message with:**

```
You are an email assistant for Smartpro Business Hub & Services.

CRITICAL LANGUAGE REQUIREMENT - READ THIS FIRST:
- Client's language preference: {{1.language}}
- CHECK {{1.language}} BEFORE WRITING ANYTHING
- If {{1.language}} === "ar": Write ENTIRE response in ARABIC ONLY - no English words at all
- If {{1.language}} === "en": Write ENTIRE response in ENGLISH ONLY - no Arabic words at all
- NEVER mix languages in the same response
- NEVER start with English and switch to Arabic (or vice versa)
- NEVER write Arabic content when {{1.language}} === "en"
- NEVER write English content when {{1.language}} === "ar"
- The entire email body must be in ONE language only
- The client's name may be in Arabic, but you must still write in {{1.language}} language

CRITICAL RULES - FOLLOW EXACTLY:
1. DO NOT include "Subject:" or any subject line - the email template handles this
2. DO NOT include "Dear [Name]" or any greeting - the template already has "Dear {{1.client_name}},"
3. DO NOT include signature blocks like "Best regards," "Warm regards," "Sincerely," etc. - template handles this
4. DO NOT include contact information like "[Your Name]", "[Your Phone Number]", "[Your Email]" - template handles this
5. DO NOT include "Smartpro Business Hub & Services" in the body - it's already in the template header and footer

WHAT TO INCLUDE:
- Thank the client for contacting Smartpro
- Explain how Smartpro can help with their specific service request
- Ask 1-3 relevant clarifying questions
- Invite them to reply or schedule a call
- Keep it 120-200 words
- Use friendly, professional tone
- No prices, timelines, or legal guarantees

OUTPUT FORMAT:
Return ONLY the main body text in {{1.language}} language. Start directly with thanking them. No greeting, no subject, no signature.
```

---

## 📝 Updated User Message

**Replace the current user message with:**

```
Write the main body content for a welcome email. 

CRITICAL LANGUAGE CHECK - READ THIS FIRST:
- Current language setting: {{1.language}}
- CHECK {{1.language}} VALUE BEFORE WRITING

LANGUAGE RULES:
- If {{1.language}} === "ar": Write 100% in Arabic - start with Arabic, continue in Arabic, end in Arabic
- If {{1.language}} === "en": Write 100% in English - start with English, continue in English, end in English
- DO NOT mix languages - if you see an Arabic name, still write in {{1.language}} language
- DO NOT start with "Thank you" in English if {{1.language}} === "ar" - start with Arabic equivalent
- DO NOT write Arabic content if {{1.language}} === "en" - write in English
- DO NOT write English content if {{1.language}} === "ar" - write in Arabic

VERIFY BEFORE RESPONDING:
- Check: {{1.language}} = ?
- If "ar" → Write in Arabic
- If "en" → Write in English
- If empty/null → Default to English

Client details:
- Name: {{1.client_name}}
- Email: {{1.email}}
- Business: {{1.business_name}}
- Service: {{1.service_interested}}
- Language: {{1.language}} ← USE THIS LANGUAGE FOR ENTIRE RESPONSE
- Notes: {{1.notes}}

Requirements:
1. Thank them for contacting Smartpro Business Hub & Services (in {{1.language}})
2. Explain how we can help with {{1.service_interested}} (in {{1.language}})
3. Ask 1-3 specific questions about their needs (in {{1.language}})
4. Invite them to reply or schedule a call (in {{1.language}})

CRITICAL: 
- Start directly with thanking them in {{1.language}} (no "Dear" or greeting)
- If {{1.language}} === "ar": Start with "شكراً" or "نشكرك" - NOT "Thank you"
- If {{1.language}} === "en": Start with "Thank you" - NOT Arabic
- End with invitation to reply or call (no "Best regards" or signature)
- Do NOT mention "Subject:" anywhere
- Do NOT include placeholders like [Your Name]
- Write as if you're continuing from "Dear {{1.client_name}}," which is already in the template
- ENTIRE response must be in {{1.language}} - check every sentence
```

---

## 🔧 Step-by-Step Implementation

### For Module 3 (Accounting Route)

1. Open **Module 3** (OpenAI GPT)
2. Find the **System** message field
3. **Replace** with the updated system message above
4. Find the **User** message field
5. **Replace** with the updated user message above
6. **Save** the module

### For Module 10 (PRO Services Route)

1. Open **Module 10** (OpenAI GPT)
2. Repeat steps 2-6 above

### For Module 13 (Company Formation Route)

1. Open **Module 13** (OpenAI GPT)
2. Repeat steps 2-6 above

### For Module 16 (Default Route)

1. Open **Module 16** (OpenAI GPT)
2. Repeat steps 2-6 above

---

## 🎯 Language-Specific Examples

### Arabic Response (when {{1.language}} === "ar")

**✅ Correct:**
```
شكراً لتواصلك معنا بخصوص خدمة CRM & Client Management لمجموعة عين الصقر...
```

**❌ Wrong:**
```
Thank you for تواصلك معنا... (mixing languages)
```

### English Response (when {{1.language}} === "en")

**✅ Correct:**
```
Thank you for contacting Smartpro about CRM & Client Management services...
```

**❌ Wrong:**
```
شكراً for contacting us... (mixing languages)
```

---

## 🧪 Testing

### Test 1: Arabic Submission

1. Send test submission with `language: "ar"`
2. Check GPT output - should be 100% Arabic
3. Verify no English words appear
4. Check email template - should use Arabic template

### Test 2: English Submission

1. Send test submission with `language: "en"`
2. Check GPT output - should be 100% English
3. Verify no Arabic words appear
4. Check email template - should use English template

### Test 3: Mixed Content Check

1. Review the AI-generated content
2. Ensure no language mixing
3. Verify consistent language throughout

---

## 📋 Quick Checklist

Before deploying:

- [ ] Updated System message in Module 3
- [ ] Updated User message in Module 3
- [ ] Updated System message in Module 10
- [ ] Updated User message in Module 10
- [ ] Updated System message in Module 13
- [ ] Updated User message in Module 13
- [ ] Updated System message in Module 16
- [ ] Updated User message in Module 16
- [ ] Tested with Arabic submission
- [ ] Tested with English submission
- [ ] Verified no language mixing

---

## 🔍 Why This Happens

1. **GPT sees Arabic name:** When client name is Arabic (e.g., "فهد العامري"), GPT may assume Arabic context
2. **No explicit language instruction:** Without clear instruction, GPT may default to mixed language
3. **Template vs Content mismatch:** Template language doesn't automatically set GPT language

**Solution:** Explicitly tell GPT to use `{{1.language}}` for the ENTIRE response, regardless of client name.

---

## ⚠️ Important Notes

1. **Client name doesn't determine language:** Even if the name is Arabic, if `{{1.language}} === "en"`, write in English
2. **Service names:** Keep service names in their original form (e.g., "CRM & Client Management") but write surrounding text in the specified language
3. **Consistency:** Every sentence, every word (except proper nouns) must be in the specified language

---

**Status:** 🔴 Critical Fix Required  
**Priority:** High (affects professionalism)  
**Impact:** Fixes language mixing in AI-generated content

