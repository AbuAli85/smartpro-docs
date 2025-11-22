# Make.com ChatGPT Module - Complete Setup Guide

## Overview

This guide shows how to set up Make.com's ChatGPT/OpenAI module to generate welcome email body content dynamically based on the client's language preference.

## Files Created

1. **`chatgpt-system-message-welcome-email.txt`** - System message (role: system)
2. **`chatgpt-user-message-welcome-email.txt`** - User message (role: user)
3. **`MAKECOM_CHATGPT_COMPLETE_SETUP.md`** - This setup guide

## Make.com Setup Steps

### Step 1: Add OpenAI Module

1. In your Make.com scenario, add an **OpenAI** module
2. Choose **"Create a Chat Completion"**
3. Place it **after** the webhook module and **before** the email module

### Step 2: Configure OpenAI Module

**Model**: `gpt-3.5-turbo` (recommended) or `gpt-4`

**Messages Array**: Add two messages

#### Message 1: System Message
- **Role**: `system`
- **Content**: Copy from `templates/chatgpt-system-message-welcome-email.txt`
  - Replace `{{1.language}}` with actual mapping: `{{1.language}}`
  - Replace `{{1.client_name}}` with actual mapping: `{{1.client_name}}`

#### Message 2: User Message
- **Role**: `user`
- **Content**: Copy from `templates/chatgpt-user-message-welcome-email.txt`
  - Replace all `{{1.*}}` variables with actual webhook data mappings:
    - `{{1.client_name}}` → Map to webhook data
    - `{{1.email}}` → Map to webhook data
    - `{{1.business_name}}` → Map to webhook data
    - `{{1.service_interested}}` → Map to webhook data
    - `{{1.service_interested_translated}}` → Map to webhook data
    - `{{1.language}}` → Map to webhook data
    - `{{1.notes}}` → Map to webhook data (optional)

### Step 3: Configure Response

**Output Variable**: The generated email body will be in:
- `{{2.choices[0].message.content}}` (if OpenAI module is Module 2)

### Step 4: Map to Email Module

In your Email module:
- **Email Body**: Use `{{2.choices[0].message.content}}`
- **Format**: HTML or Plain Text (your choice)

## Example Make.com Flow

```
Module 1: Webhook
    ├─ Receives form data
    └─ Outputs: {{1.language}}, {{1.client_name}}, etc.

Module 2: OpenAI - Create Chat Completion
    ├─ System Message: Language rules and instructions
    ├─ User Message: Client details
    └─ Output: {{2.choices[0].message.content}} (generated email body)

Module 3: Email - Send Email
    ├─ To: {{1.email}}
    ├─ Subject: "Welcome to Smartpro" (or use template)
    ├─ Body: {{2.choices[0].message.content}}
    └─ Format: HTML (if using HTML template)
```

## Variable Mapping Reference

| Variable | Source | Description |
|----------|--------|-------------|
| `{{1.language}}` | Webhook | Client's language preference ("ar" or "en") |
| `{{1.client_name}}` | Webhook | Client's name |
| `{{1.email}}` | Webhook | Client's email address |
| `{{1.business_name}}` | Webhook | Business name |
| `{{1.service_interested}}` | Webhook | Primary service (English) |
| `{{1.service_interested_translated}}` | Webhook | Primary service (Arabic) |
| `{{1.notes}}` | Webhook | Additional notes (optional) |

## Language-Specific Service Field

**Important**: The system message will use the correct service field:
- If `{{1.language}} === "ar"`: Use `{{1.service_interested_translated}}`
- If `{{1.language}} === "en"`: Use `{{1.service_interested}}`

The ChatGPT module will automatically select the correct field based on the language.

## Testing

### Test Case 1: Arabic Language
**Input**: `language: "ar"`
**Expected**: Email body in Arabic, starts with "نشكرك" or "شكراً"

### Test Case 2: English Language
**Input**: `language: "en"`
**Expected**: Email body in English, starts with "Thank you"

### Test Case 3: Empty Language
**Input**: `language: ""` or `null`
**Expected**: Email body in English (default)

## Cost Estimation

- **GPT-3.5-turbo**: ~$0.001-0.002 per email
- **GPT-4**: ~$0.01-0.03 per email

**Recommendation**: Use GPT-3.5-turbo for welcome emails (good quality, lower cost)

## Troubleshooting

### Issue: Wrong Language Generated

**Solution**:
1. Verify `{{1.language}}` is correctly mapped in the user message
2. Check the system message includes the language check
3. Ensure the value is exactly "ar" or "en" (case-sensitive)

### Issue: Includes Greeting/Signature

**Solution**:
1. Verify system message includes "DO NOT include greeting"
2. Check that ChatGPT is following the instructions
3. You may need to add more explicit instructions

### Issue: Mixed Languages

**Solution**:
1. Make the language rules more explicit in system message
2. Add "NEVER mix languages" multiple times
3. Consider using GPT-4 for better instruction following

### Issue: Too Long/Too Short

**Solution**:
1. Adjust the word count requirement in system message
2. Add "Keep it between 120-200 words" instruction
3. Test and refine based on results

## Alternative: Pre-written Templates

If ChatGPT is unreliable or too expensive, use pre-written templates:
- `templates/email-welcome-body-arabic.txt`
- `templates/email-welcome-body-english.txt`

Use a Router module to select the template based on `{{1.language}}`.

## Best Practices

1. **Test thoroughly** with both Arabic and English submissions
2. **Monitor costs** if using GPT-4
3. **Have fallback** - Use pre-written templates as backup
4. **Review outputs** periodically to ensure quality
5. **Update prompts** based on actual results

## Summary

✅ **System Message**: Defines language rules and content requirements  
✅ **User Message**: Provides client details and context  
✅ **Output**: Generated email body in correct language  
✅ **Integration**: Maps to email module for sending

The ChatGPT module will generate personalized welcome emails in the correct language automatically!

