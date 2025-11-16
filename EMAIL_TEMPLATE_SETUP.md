# Email Template Setup Guide

This guide shows you how to set up the HTML email template in your Make.com Resend module.

## 📋 Files Created

1. **`email-template.json`** - JSON format with escaped HTML (ready for Make.com)
2. **`email-template-readable.html`** - Readable HTML version for reference

## 🔧 How to Use in Make.com

### Option 1: Copy from JSON file

1. Open `email-template.json`
2. Copy the value of the `"html"` field (the entire string)
3. Paste it into Make.com Resend module's **"HTML Content"** field

### Option 2: Copy from readable HTML

1. Open `email-template-readable.html`
2. Copy all the HTML code (excluding comments)
3. Paste it directly into Make.com Resend module's **"HTML Content"** field

## 📧 Template Features

### Structure
- ✅ Responsive design (works on mobile and desktop)
- ✅ Professional styling with brand colors
- ✅ Table-based layout (email client compatible)

### Sections

1. **Header**
   - Dark blue background (#0d3c61)
   - White text
   - "Smartpro Business Hub & Services" branding

2. **Body**
   - Personalized greeting: `Dear {{1.client_name}},`
   - AI-generated content: `{{replace(3.choices[1].message.content; "\n"; "<br>")}}`
   - Call-to-action paragraph
   - "Schedule a Call" button

3. **Footer**
   - Light gray background (#f0f2f5)
   - Website and support email links

### Make.com Variables Used

- `{{1.client_name}}` - Client's name from webhook
- `{{3.choices[1].message.content}}` - AI-generated email content
- `{{replace(...)}}` - Converts newlines to HTML breaks

## 🎨 Brand Colors

- **Primary Blue:** `#0d3c61` (header, button, links)
- **Footer Gray:** `#f0f2f5` (footer background)
- **Text Gray:** `#333333` (body text)
- **Light Gray:** `#666666` (footer text)

## 🔗 Links

- **Schedule Call:** `https://thesmartpro.io/book`
- **Website:** `https://thesmartpro.io`
- **Support Email:** `support@portal.thesmartpro.io`

## ✅ Verification Checklist

After pasting the template into Make.com:

- [ ] HTML is properly formatted
- [ ] Make.com variables are preserved (not escaped)
- [ ] Template preview looks correct
- [ ] Test email sends successfully
- [ ] All links work correctly
- [ ] Mobile view is responsive
- [ ] Brand colors display correctly

## 🐛 Troubleshooting

### Template Not Rendering

**Problem:** Email shows raw HTML or broken layout

**Solutions:**
1. Ensure HTML is in the "HTML Content" field (not "Text Content")
2. Check that `sendEmailAs` is set to `"html"`
3. Verify all quotes are properly escaped in JSON format
4. Test with a simple HTML first, then add complexity

### Variables Not Replacing

**Problem:** `{{1.client_name}}` shows as literal text

**Solutions:**
1. Verify webhook data is reaching the Resend module
2. Check variable names match exactly (case-sensitive)
3. Ensure module execution order is correct
4. Test with a static value first

### Button Not Clickable

**Problem:** "Schedule a Call" button doesn't work

**Solutions:**
1. Verify link URL is correct: `https://thesmartpro.io/book`
2. Check button styling includes `display:inline-block`
3. Test link in different email clients
4. Ensure no extra spaces in href attribute

## 📝 Notes

- The template uses table-based layout for maximum email client compatibility
- All styles are inline (required for email HTML)
- Make.com variables are inserted dynamically at runtime
- The `{{replace()}}` function converts AI-generated newlines to HTML breaks

---

**Template Version:** 1.0.0  
**Last Updated:** Current Date  
**Compatible With:** Make.com Resend Module

