# 🔧 Environment Setup Guide

## Quick Start: Enable AI Letter Generation

### Step 1: Create `.env` File

In the **root directory** of the project, create a file named `.env`:

```bash
# File: .env (in project root)

# ============================================================
# OPENAI API KEY (Required for AI Letter Generation)
# ============================================================
VITE_OPENAI_API_KEY=sk-proj-your-actual-api-key-here
```

### Step 2: Get Your API Key

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign up or log in
3. Click "Create new secret key"
4. Give it a name (e.g., "Smartpro Letter Builder")
5. Copy the key (starts with `sk-proj-` or `sk-`)

### Step 3: Add API Key to `.env`

Replace `sk-proj-your-actual-api-key-here` with your actual key:

```bash
VITE_OPENAI_API_KEY=sk-proj-abc123def456ghi789...
```

### Step 4: Restart Dev Server

```bash
# Stop the server (Ctrl+C)
# Then restart:
npm run dev
```

### Step 5: Verify It Works

1. Open the Professional Letter Builder
2. Look for the AI Generator card (purple gradient)
3. You should see a green "GPT-4" badge
4. Try generating a letter!

---

## 🔒 Important Security Notes

### DO NOT Commit Your API Key!

```bash
# .gitignore should already include:
.env
.env.local
.env.production
```

### Best Practices

✅ **DO:**
- Keep `.env` file in project root
- Use environment variables for secrets
- Set usage limits in OpenAI dashboard
- Add `.env` to `.gitignore`
- Use different keys for dev/production

❌ **DON'T:**
- Commit `.env` to Git
- Share your API key publicly
- Hardcode API keys in source code
- Use production key in development

---

## 📋 Complete `.env` File Template

```bash
# ============================================================
# SMARTPRO LETTER BUILDER - ENVIRONMENT VARIABLES
# ============================================================

# ------------------------------------------------------------
# OPENAI API CONFIGURATION (For AI Letter Generation)
# ------------------------------------------------------------
# Get your API key from: https://platform.openai.com/api-keys
# Cost: ~$0.001 per letter (very affordable!)
#
VITE_OPENAI_API_KEY=sk-proj-your-actual-api-key-here

# Optional: Override default AI model
# Default: gpt-4o-mini (fast & cheap)
# Options: gpt-4, gpt-4o-mini, gpt-3.5-turbo
# VITE_OPENAI_MODEL=gpt-4o-mini

# Optional: Set maximum tokens for generation
# Default: 1000 (sufficient for most letters)
# VITE_OPENAI_MAX_TOKENS=1000

# Optional: Adjust AI creativity (0.0 - 1.0)
# Default: 0.7 (balanced)
# 0.0 = Very deterministic, 1.0 = Very creative
# VITE_OPENAI_TEMPERATURE=0.7

# ------------------------------------------------------------
# OTHER CONFIGURATIONS (Optional)
# ------------------------------------------------------------
# Add other environment variables as needed
# VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
# VITE_API_BASE_URL=https://api.example.com
```

---

## 🎛️ Optional Configuration

### Use Different AI Model

To use GPT-4 (slower, higher quality, more expensive):

```bash
VITE_OPENAI_MODEL=gpt-4
```

To use GPT-3.5 Turbo (faster, cheaper, lower quality):

```bash
VITE_OPENAI_MODEL=gpt-3.5-turbo
```

### Adjust Creativity Level

```bash
# More consistent/predictable (good for formal letters)
VITE_OPENAI_TEMPERATURE=0.3

# Balanced (default)
VITE_OPENAI_TEMPERATURE=0.7

# More creative/varied
VITE_OPENAI_TEMPERATURE=0.9
```

### Limit Token Usage

```bash
# Shorter letters
VITE_OPENAI_MAX_TOKENS=500

# Default
VITE_OPENAI_MAX_TOKENS=1000

# Longer letters
VITE_OPENAI_MAX_TOKENS=1500
```

---

## 🧪 Testing Without API Key

The system includes a **demo mode** that works without an API key:

1. Don't add API key to `.env`
2. AI Generator will show "Demo Mode" badge
3. Generates sample content for testing
4. No API calls or costs

**Note**: Demo content is generic and not production-quality.

---

## 💰 Managing Costs

### Set Usage Limits in OpenAI Dashboard

1. Go to [OpenAI Settings](https://platform.openai.com/account/limits)
2. Set monthly budget limit (e.g., $10)
3. Enable email alerts at 50%, 75%, 90%
4. Monitor usage daily

### Typical Costs

| Usage | Letters/Month | Estimated Cost |
|-------|---------------|----------------|
| Light | 100 | $0.10 |
| Medium | 1,000 | $1.00 |
| Heavy | 10,000 | $10.00 |
| Enterprise | 100,000 | $100.00 |

**Average**: ~$0.001 per letter

---

## 🐛 Troubleshooting

### Problem: "API key not configured"

**Solutions:**
1. Check `.env` file exists in project root (not in `client/` folder)
2. Verify key format: `VITE_OPENAI_API_KEY=sk-...`
3. No quotes needed around the key
4. Restart dev server after creating `.env`

### Problem: "Invalid API key"

**Solutions:**
1. Check for typos in API key
2. Verify key is active in OpenAI dashboard
3. Check for extra spaces or newlines
4. Try generating a new key

### Problem: Environment variables not loading

**Solutions:**
1. File must be named exactly `.env` (not `.env.txt`)
2. Must be in project root directory
3. Restart development server
4. Clear browser cache (Ctrl+Shift+Delete)

### Problem: "Rate limit exceeded"

**Solutions:**
1. Wait a few minutes and try again
2. Check OpenAI usage dashboard
3. Consider upgrading plan
4. Implement request queuing

---

## 📁 Project Structure

```
smartpro-docs/
├── .env                          ← Create this file!
├── .env.example                  ← (optional) Template
├── .gitignore                    ← Should include .env
├── client/
│   ├── src/
│   │   ├── services/
│   │   │   └── aiLetterGenerator.ts
│   │   └── components/
│   │       └── AILetterGenerator.tsx
│   └── ...
└── ...
```

---

## ✅ Verification Checklist

Before using AI generation, verify:

- [ ] `.env` file created in project root
- [ ] OpenAI API key added to `.env`
- [ ] Key starts with `sk-` or `sk-proj-`
- [ ] No quotes around the key in `.env`
- [ ] `.env` added to `.gitignore`
- [ ] Development server restarted
- [ ] AI Generator shows "GPT-4" badge
- [ ] Usage limits set in OpenAI dashboard
- [ ] Test generation works

---

## 🚀 Ready to Use!

Once set up:
1. Open Professional Letter Builder
2. Scroll to AI Generator (purple card)
3. Fill in basic details
4. Click "Generate Professional Letter"
5. AI creates content in 2-5 seconds!

---

## 📚 Additional Resources

- **Full Guide**: `AI_LETTER_GENERATION_GUIDE.md`
- **OpenAI Docs**: https://platform.openai.com/docs
- **Pricing**: https://openai.com/pricing
- **API Keys**: https://platform.openai.com/api-keys
- **Usage Dashboard**: https://platform.openai.com/usage

---

## 🆘 Need Help?

If you're stuck:
1. Check this guide first
2. Review `AI_LETTER_GENERATION_GUIDE.md`
3. Check console for errors (F12 → Console)
4. Verify OpenAI service status
5. Try demo mode to test UI

---

**🎉 Happy Letter Generating!**

