# 🤖 AI Letter Generation Guide

## 🎯 Overview

The **AI Letter Generator** uses OpenAI's GPT models to automatically generate professional letter content. Users provide basic details, and AI creates complete, professionally-written letters in English or Arabic.

---

## ✨ Features

### 🚀 **Automatic Content Generation**
- ✅ Generate full letter body from basic inputs
- ✅ Professional tone and formatting
- ✅ Context-aware content
- ✅ Bilingual support (English & Arabic)

### 🎨 **Smart Customization**
- ✅ Tone adjustment (Formal, Professional, Friendly)
- ✅ Key points integration
- ✅ Context-aware generation
- ✅ Letter type-specific prompts

### 💡 **Additional AI Features**
- ✅ Subject line suggestions
- ✅ Content improvement
- ✅ Translation between languages
- ✅ Field value suggestions

---

## 🔧 Setup Instructions

### Step 1: Get OpenAI API Key

1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign up or log in
3. Click "Create new secret key"
4. Copy the API key (starts with `sk-...`)

### Step 2: Add API Key to Project

Create or edit `.env` file in project root:

```bash
# .env file
VITE_OPENAI_API_KEY=sk-your-api-key-here
```

**Important**: Add `.env` to `.gitignore` to keep your API key secret!

### Step 3: Restart Development Server

```bash
npm run dev
```

### Step 4: Verify Setup

The AI Generator will show a green "GPT-4" badge when configured correctly.

---

## 💰 Pricing & Cost

### OpenAI API Pricing (GPT-4o-mini)
- **Input**: $0.15 per 1M tokens
- **Output**: $0.60 per 1M tokens

### Typical Costs per Letter
- **Average letter**: ~500 tokens total
- **Estimated cost**: $0.0003 - $0.001 per letter
- **1000 letters**: ~$0.30 - $1.00

### Cost Optimization Tips
1. ✅ Use GPT-4o-mini (default, fast & cheap)
2. ✅ Provide clear, concise inputs
3. ✅ Cache repetitive content
4. ✅ Set usage limits in OpenAI dashboard

---

## 📖 How to Use

### Basic Usage

1. **Open Letter Builder**
   - Navigate to Professional Letter Builder
   - Select your template

2. **Find AI Generator**
   - Look for the purple "AI Letter Generator" card
   - It appears below the form fields

3. **Provide Details**
   - **Recipient Name**: (Optional) Who is receiving the letter
   - **Purpose**: Main topic or reason for the letter
   - **Key Points**: Specific points to include (add multiple)

4. **Generate**
   - Click "Generate Professional Letter"
   - Wait 2-5 seconds for AI to generate
   - Content automatically inserted into your letter

5. **Review & Edit**
   - Review the generated content
   - Make any necessary adjustments
   - Use "Regenerate" if needed

---

## 🎯 Example Usage

### Example 1: Employment Verification

**Inputs:**
```
Recipient Name: ROP Verification Department
Purpose: Verify employment status for Mohammed Al-Harthi
Key Points:
  - Employed since January 2020
  - Currently working as Senior Manager
  - Full-time position with good standing
```

**AI Generates:**
```
We confirm that Mr. Mohammed Al-Harthi has been employed 
with our organization since January 2020 in the capacity 
of Senior Manager. He holds a full-time position and 
continues to perform his duties with dedication and 
professionalism. His employment status is in good standing, 
and we are pleased to provide this verification for your 
official purposes.
```

### Example 2: Bank Loan Request (Arabic)

**Inputs:**
```
Recipient Name: Bank Manager
Purpose: طلب قرض تجاري لتوسعة المشروع
Key Points:
  - المشروع قائم منذ 5 سنوات
  - إيرادات سنوية مستقرة
  - نمو متوقع 30%
```

**AI Generates:**
```
نتقدم بطلب الحصول على قرض تجاري لتوسعة مشروعنا القائم منذ 
خمس سنوات. يتمتع مشروعنا بإيرادات سنوية مستقرة وسجل مالي 
قوي، ونتوقع نمواً بنسبة 30% خلال السنوات القادمة. نحن واثقون 
من قدرتنا على سداد القرض في المواعيد المحددة، ونرفق كافة 
المستندات المالية المطلوبة للنظر في طلبنا.
```

---

## ⚙️ Advanced Features

### 1. Tone Adjustment

Choose the appropriate formality level:

| Tone | Use When | Example |
|------|----------|---------|
| **Formal** | Government letters, legal documents | "We hereby request your esteemed consideration..." |
| **Professional** | Business correspondence (default) | "We would like to request..." |
| **Friendly** | Internal memos, known contacts | "We're writing to ask..." |

### 2. Subject Line Generation

1. Enter your purpose
2. Click "Generate Subject Line"
3. AI suggests 3 professional subjects
4. First suggestion auto-fills the subject field

### 3. Content Improvement

Already have content but want to improve it?

```typescript
// Use the improvement function
improveLetterContent(
  yourContent,
  ['Make more concise', 'Add professional tone'],
  language
)
```

### 4. Translation

Translate between English and Arabic:

```typescript
// Translate your letter
translateLetterContent(
  content,
  'en',  // from English
  'ar'   // to Arabic
)
```

---

## 🎨 Customization

### Modify AI Prompts

Edit `client/src/services/aiLetterGenerator.ts`:

```typescript
// Add your own instructions
const specialInstructions: Record<string, string> = {
  'your_letter_id': 'Your specific instructions here',
};
```

### Change AI Model

```typescript
// In aiLetterGenerator.ts
const MODEL = 'gpt-4o-mini';  // Fast & cheap
// or
const MODEL = 'gpt-4';         // Highest quality
// or
const MODEL = 'gpt-3.5-turbo'; // Budget option
```

### Adjust Creativity

```typescript
// In the API call
temperature: 0.7,  // Balance (0.0 = deterministic, 1.0 = creative)
```

---

## 🔒 Security Best Practices

### API Key Security

1. ✅ **Never commit API keys** to Git
2. ✅ Use environment variables (`.env`)
3. ✅ Add `.env` to `.gitignore`
4. ✅ Rotate keys regularly
5. ✅ Set usage limits in OpenAI dashboard

### Usage Limits

Set limits in OpenAI dashboard:
- Monthly budget cap
- Rate limits per minute
- Email alerts for high usage

### Error Handling

The system includes:
- ✅ Automatic error recovery
- ✅ User-friendly error messages
- ✅ Fallback to demo mode
- ✅ Retry logic

---

## 🐛 Troubleshooting

### Problem: "API key not configured"

**Solution:**
1. Check `.env` file exists
2. Verify key format: `VITE_OPENAI_API_KEY=sk-...`
3. Restart dev server: `npm run dev`
4. Clear browser cache

### Problem: "API Error: 401"

**Solution:**
- Invalid API key
- Get new key from OpenAI platform
- Check for extra spaces in `.env` file

### Problem: "Rate limit exceeded"

**Solution:**
- Too many requests
- Wait a few minutes
- Upgrade OpenAI plan
- Implement request queuing

### Problem: "Content not in correct language"

**Solution:**
- Check language selection in UI
- Verify prompt includes language specification
- Try regenerating

### Problem: "Generated content too short"

**Solution:**
- Provide more key points
- Add additional context
- Increase `max_tokens` in service

---

## 📊 Monitoring Usage

### View Usage Stats

```typescript
// After generation
console.log('Tokens used:', result.usage);
console.log('Estimated cost:', getEstimatedCost(result.usage));
```

### OpenAI Dashboard

Monitor usage at: https://platform.openai.com/usage

Track:
- Daily/monthly token usage
- Cost breakdown
- Request counts
- Error rates

---

## 🎓 Tips & Best Practices

### 1. Writing Effective Prompts

**Good:**
```
Purpose: Request 3-day annual leave for family emergency
Key Points:
  - Dates: Nov 15-17, 2025
  - Work coverage arranged
  - Urgent family matter
```

**Bad:**
```
Purpose: leave
```

### 2. Key Points Strategy

- ✅ Be specific and concise
- ✅ List 2-4 main points
- ✅ Include dates, numbers, names
- ❌ Don't write full sentences
- ❌ Don't repeat information

### 3. Context Usage

Use "Additional Context" for:
- Background information
- Relationships between parties
- Previous correspondence
- Specific requirements

### 4. Tone Selection

| Letter Type | Recommended Tone |
|-------------|------------------|
| Government | Formal |
| Bank/Finance | Professional |
| Internal HR | Professional |
| Client Thank You | Friendly |
| Legal | Formal |

---

## 🔄 Integration with Letter Builder

### How It Works

```
1. User fills AI Generator form
   ↓
2. Service creates smart prompt
   ↓
3. OpenAI API generates content
   ↓
4. Content inserted into letter template
   ↓
5. User reviews and can regenerate
```

### Auto-Fill Features

Generated content automatically:
- ✅ Fills letter body placeholder
- ✅ Can generate subject line
- ✅ Maintains proper formatting
- ✅ Respects language direction (RTL/LTR)

---

## 🌟 Advanced Use Cases

### 1. Batch Generation

Generate multiple letters with same template:

```typescript
// Loop through recipients
for (const recipient of recipients) {
  const result = await generateLetterContent({
    template,
    language: 'en',
    userInputs: {
      recipientName: recipient.name,
      purpose: `Thank you for ${recipient.action}`,
    },
    existingValues: company Info,
  });
  // Save result
}
```

### 2. Custom Letter Types

Add specialized prompts for your use cases:

```typescript
// In aiLetterGenerator.ts
const specialInstructions = {
  'custom_partnership': 'Emphasize mutual benefits and long-term collaboration',
  'custom_complaint': 'Maintain professional tone while expressing concerns',
};
```

### 3. Multi-Language Support

Generate in one language, translate to another:

```typescript
// Generate in English
const enResult = await generateLetterContent({ language: 'en', ... });

// Translate to Arabic
const arResult = await translateLetterContent(
  enResult.content,
  'en',
  'ar'
);
```

---

## 📈 Future Enhancements

### Planned Features

- [ ] Multiple model selection in UI
- [ ] Saved prompt templates
- [ ] Batch generation interface
- [ ] Usage analytics dashboard
- [ ] Custom fine-tuned models
- [ ] Offline fallback templates
- [ ] Generation history
- [ ] A/B testing different prompts

---

## 🆘 Support

### Documentation
- This guide: `AI_LETTER_GENERATION_GUIDE.md`
- Service code: `client/src/services/aiLetterGenerator.ts`
- UI component: `client/src/components/AILetterGenerator.tsx`

### OpenAI Resources
- API Docs: https://platform.openai.com/docs
- Pricing: https://openai.com/pricing
- Community: https://community.openai.com

### Common Questions

**Q: Is my data sent to OpenAI?**  
A: Yes, inputs are sent to generate content. Don't include sensitive data.

**Q: Can I use other AI providers?**  
A: Yes! Modify the service to call Anthropic, Cohere, or local models.

**Q: Does it work offline?**  
A: No, requires internet connection. Demo mode works offline.

**Q: How fast is generation?**  
A: Typically 2-5 seconds with GPT-4o-mini.

**Q: Can I cancel during generation?**  
A: Yes, close the browser tab to cancel.

---

## 📝 Example .env File

```bash
# OpenAI Configuration
VITE_OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxx

# Optional: Override default model
# VITE_OPENAI_MODEL=gpt-4

# Optional: Set max tokens
# VITE_OPENAI_MAX_TOKENS=1000

# Optional: Adjust creativity
# VITE_OPENAI_TEMPERATURE=0.7
```

---

## 🎉 Summary

### What You Can Do
✅ Generate professional letters automatically  
✅ Support for English & Arabic  
✅ Multiple tone options  
✅ Key points integration  
✅ Subject line suggestions  
✅ Content improvement  
✅ Translation support  

### Setup Time
⏱️ **5 minutes** to get API key and configure

### Cost
💰 **~$0.001** per letter (very affordable!)

### User Experience
🎨 **Beautiful UI** integrated into Letter Builder

---

## 🚀 Get Started Now!

1. Get your OpenAI API key
2. Add to `.env` file
3. Restart dev server
4. Start generating professional letters with AI!

---

**Built with ❤️ using OpenAI GPT-4 - Making letter writing effortless**

