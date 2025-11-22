# Make.com ChatGPT Module Setup for Welcome Email

## Overview

Use Make.com's **OpenAI** or **ChatGPT** module to dynamically generate welcome email body content based on the client's language.

## Setup Steps

### Step 1: Add ChatGPT Module

1. In your Make.com scenario, add an **OpenAI** or **ChatGPT** module
2. Place it **after** the webhook module (to receive the form data)
3. Place it **before** the email module (to generate content before sending)

### Step 2: Configure the Module

**Module Type**: OpenAI - Create a Chat Completion

**Model**: `gpt-4` or `gpt-3.5-turbo` (recommended: `gpt-3.5-turbo` for cost efficiency)

**Messages**:
- **Role**: `system`
- **Content**: Copy from `templates/chatgpt-welcome-email-prompt-simple.txt`

**OR** use the detailed version from `templates/chatgpt-welcome-email-prompt.txt`

### Step 3: Map Variables

In the prompt, replace Make.com variables:
- `{{1.language}}` → Maps to webhook data
- `{{1.client_name}}` → Maps to webhook data
- `{{1.service_interested}}` → Maps to webhook data
- `{{1.service_interested_translated}}` → Maps to webhook data
- `{{1.business_name}}` → Maps to webhook data
- `{{1.notes}}` → Maps to webhook data (optional)

### Step 4: Configure Response

**Output**: The ChatGPT module will return the generated email body content

**Map to Email Module**: Use the ChatGPT response as the email body content

## Prompt Templates

### Simple Version (Recommended)

Use `templates/chatgpt-welcome-email-prompt-simple.txt` - shorter, more cost-effective

### Detailed Version

Use `templates/chatgpt-welcome-email-prompt.txt` - more explicit instructions, better for complex cases

## Example Make.com Flow

```
Webhook (Module 1)
    ↓
ChatGPT Module (Module 2)
    ├─ Input: {{1.language}}, {{1.client_name}}, etc.
    └─ Output: Generated email body
    ↓
Email Module (Module 3)
    ├─ Subject: Welcome email subject
    ├─ Body: {{2.choices[0].message.content}} (ChatGPT response)
    └─ To: {{1.email}}
```

## Cost Considerations

- **GPT-3.5-turbo**: ~$0.001-0.002 per email (recommended)
- **GPT-4**: ~$0.01-0.03 per email (more accurate but expensive)

**Recommendation**: Use GPT-3.5-turbo for welcome emails

## Testing

1. **Test with Arabic**: Submit form with `language: "ar"` → Should generate Arabic email
2. **Test with English**: Submit form with `language: "en"` → Should generate English email
3. **Test with empty**: Submit form with empty language → Should default to English

## Troubleshooting

### Issue: Wrong Language Generated

**Solution**: 
- Verify `{{1.language}}` is correctly mapped
- Check the prompt includes language check instructions
- Ensure ChatGPT module receives the language value

### Issue: Mixed Languages

**Solution**:
- Make the prompt more explicit about language checking
- Add "DO NOT mix languages" multiple times in prompt
- Use the detailed prompt version

### Issue: Includes Greeting/Signature

**Solution**:
- Add explicit instruction: "NO greeting, NO signature"
- Specify "only main body content"
- The email template should handle greeting/signature

## Alternative: Pre-written Templates

If ChatGPT is too expensive or unreliable, use pre-written templates:
- `templates/email-welcome-body-arabic.txt`
- `templates/email-welcome-body-english.txt`

Use a Router module to select the template based on `{{1.language}}`.

## Best Practice

**Recommended Approach**: 
1. Use **Router** module to check `{{1.language}}`
2. For Arabic: Use pre-written template (more reliable, no cost)
3. For English: Use pre-written template (more reliable, no cost)
4. **OR** use ChatGPT for both (more flexible, but costs money)

Choose based on your needs:
- **Pre-written templates**: Reliable, free, consistent
- **ChatGPT**: Flexible, dynamic, costs money per email

