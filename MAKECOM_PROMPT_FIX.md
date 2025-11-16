# Make.com AI Prompt Fix - Remove Unwanted Elements

## 🚨 Current Problem

The AI is still generating:
- ❌ Subject lines ("Subject: Accounting Services...")
- ❌ Duplicate greetings ("Dear Mr. Fahad Alamri,")
- ❌ Placeholder text ("[Your Name]", "[Your Phone Number]", etc.)
- ❌ Duplicate signatures ("Warm regards,")

## ✅ Solution 1: Enhanced System Prompt

Update your **OpenAI Module (Module 3)** System message to:

```
You are an email assistant for Smartpro Business Hub & Services.

CRITICAL RULES - FOLLOW EXACTLY:
1. DO NOT include "Subject:" or any subject line - the email template handles this
2. DO NOT include "Dear [Name]" or any greeting - the template already has "Dear {{client_name}},"
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
Return ONLY the main body text. Start directly with thanking them. No greeting, no subject, no signature.
```

## ✅ Solution 2: Enhanced User Prompt

Update your **OpenAI Module (Module 3)** User message to:

```
Write the main body content for a welcome email. DO NOT include greeting, subject, or signature.

Client details:
- Name: {{1.client_name}}
- Email: {{1.email}}
- Business: {{1.business_name}}
- Service: {{1.service_interested}}
- Notes: {{1.notes}}

Requirements:
1. Thank them for contacting Smartpro Business Hub & Services
2. Explain how we can help with {{1.service_interested}}
3. Ask 1-3 specific questions about their needs
4. Invite them to reply or schedule a call

CRITICAL: 
- Start directly with "Thank you for..." (no "Dear" or greeting)
- End with invitation to reply or call (no "Best regards" or signature)
- Do NOT mention "Subject:" anywhere
- Do NOT include placeholders like [Your Name]
- Write as if you're continuing from "Dear {{1.client_name}}," which is already in the template
```

## ✅ Solution 3: Add Text Parser Module (Recommended)

Add a **Text Parser** or **Set Variable** module between OpenAI and Resend to clean the output:

### Module 4: Clean AI Output (NEW - Insert between Module 3 and Module 5)

**Module Type:** Text parser / Set variable / Simple text operations

**Operation:** Remove unwanted patterns

**Patterns to Remove:**
1. Remove lines starting with "Subject:"
2. Remove lines starting with "Dear" (case insensitive)
3. Remove signature blocks (lines containing "regards", "sincerely", "best", etc.)
4. Remove placeholder text (anything in brackets like [Your Name])

**Make.com Formula:**
```
{{replace(
  replace(
    replace(
      replace(
        replace(3.choices[1].message.content; "Subject: *\n"; ""); 
        "Dear *,\n"; ""
      ); 
      "Warm regards, *"; ""
    ); 
    "Best regards, *"; ""
  ); 
  "\\[Your [^\\]]+\\]"; ""
)}}
```

Or use a simpler approach with multiple replace functions:

```
{{replace(
  replace(
    replace(
      replace(
        replace(3.choices[1].message.content; 
          "Subject: *"; ""); 
          "Dear *,\n"; ""
        ); 
        "Warm regards, *"; ""
      ); 
      "Best regards, *"; ""
    ); 
    "\\[.*?\\]"; ""
  ); 
  "Sincerely, *"; ""
)}}
```

## ✅ Solution 4: Update Resend Module

Update your **Resend Module (Module 5)** to use the cleaned content:

**Current:**
```
{{replace(3.choices[1].message.content; "\n"; "<br>")}}
```

**Updated (if using cleanup module):**
```
{{replace(4.cleaned_content; "\n"; "<br>")}}
```

Or keep using Module 3 output but with enhanced cleaning in the replace function.

## 🎯 Recommended Approach

**Best Solution:** Combine Solution 1 + Solution 3

1. **Update System Prompt** (Solution 1) - Prevents most issues at source
2. **Add Cleanup Module** (Solution 3) - Catches any remaining issues
3. **Update Resend Module** - Use cleaned content

## 📋 Implementation Steps

### Step 1: Update OpenAI System Prompt
1. Go to Make.com scenario
2. Open Module 3 (OpenAI)
3. Find "System" message field
4. Replace with Solution 1 prompt above
5. Save

### Step 2: Update OpenAI User Prompt
1. In same Module 3
2. Find "User" message field  
3. Replace with Solution 2 prompt above
4. Save

### Step 3: Add Cleanup Module (Optional but Recommended)
1. Add new module between Module 3 and Module 5
2. Use "Set Variable" or "Text Parser" module
3. Apply cleanup formula from Solution 3
4. Connect: Module 3 → Cleanup → Module 5

### Step 4: Test
1. Run test scenario
2. Check email output
3. Verify no unwanted elements
4. Adjust prompts if needed

## ✅ Expected Clean Output

**Good Output:**
```
Thank you for contacting Smartpro Business Hub & Services and for your 
interest in our accounting support for Falcon Eye Group. We are glad to 
explore how we can help you streamline your finance function.

We can assist with setting up or improving your accounting system, managing 
monthly bookkeeping, preparing management reports, and supporting VAT 
compliance and audits. Our goal is to give you clear, timely financial 
information so you can focus on growing Falcon Eye Group while we handle 
the numbers in the background.

To better understand your needs, could you please share:
1) Are you looking for full ongoing accounting support, or help with 
   specific tasks (e.g., monthly closing, reporting, VAT)?
2) Do you currently use any accounting software? If yes, which one?
3) Are there particular challenges or pain points you want to solve first?

You can reply to this email with your answers, or let me know a suitable 
time and we can arrange a short call to discuss the best solution for 
Falcon Eye Group.
```

**Bad Output (what we're fixing):**
```
Subject: Accounting Services for Falcon Eye Group

Dear Mr. Fahad Alamri,

[content]

Warm regards,
[Your Name]
Smartpro Business Hub & Services
[Your Phone Number]
[Your Email Address]
```

## 🔍 Testing Checklist

After implementing fixes:

- [ ] No "Subject:" lines in email body
- [ ] No duplicate "Dear" greetings
- [ ] No placeholder text like [Your Name]
- [ ] No signature blocks (regards, sincerely, etc.)
- [ ] Content starts with "Thank you" or similar
- [ ] Content ends with call-to-action (no signature)
- [ ] Email renders correctly
- [ ] All links work
- [ ] Mobile view looks good

## 🐛 Troubleshooting

### Still Getting Subject Lines

**Fix:** Add to System prompt: "NEVER write 'Subject:' in your response"

### Still Getting Greetings

**Fix:** Add to System prompt: "The template already has 'Dear {{client_name}},' - start your response immediately after that"

### Still Getting Signatures

**Fix:** Add to System prompt: "The template already has 'Best regards, Smartpro Business Hub & Services' - do NOT add any closing"

### Placeholders Still Appearing

**Fix:** Add cleanup module or enhance System prompt: "Never use placeholder text like [Your Name] or [Contact Info]"

---

**Priority:** 🔴 High - Fix immediately to improve email quality  
**Difficulty:** 🟢 Easy - Just update prompts  
**Impact:** ⭐⭐⭐ High - Significantly improves email professionalism

