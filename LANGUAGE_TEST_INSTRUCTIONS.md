# Language System Test Instructions

## Quick Browser Console Test

Open your browser console (F12) and run these commands to test the language system:

### 1. Check Current Language State
```javascript
// Check localStorage
localStorage.getItem('smartpro_language')

// Check HTML attributes
document.documentElement.dir
document.documentElement.lang
```

### 2. Test Language Switch
```javascript
// Manually set language
localStorage.setItem('smartpro_language', 'ar')
window.location.reload()

// Or set to English
localStorage.setItem('smartpro_language', 'en')
window.location.reload()
```

### 3. Check if Context is Working
Look in the console for:
- `🌐 Language Debug:` logs (should appear on page load)
- Any errors mentioning "LanguageContext" or "useLanguage"

## Visual Tests

1. **Language Switcher**: 
   - Look for a globe icon (🌐) in the header
   - Click it and select Arabic
   - Navigation items should change to Arabic

2. **RTL Layout**:
   - When Arabic is selected, inspect the `<html>` tag
   - It should have `dir="rtl"` attribute
   - Text should align to the right

3. **Translation Test**:
   - Switch to Arabic
   - Check if "Home" becomes "الرئيسية"
   - Check if "For Providers" becomes "للمزودين"

## Common Issues

### Issue: Language switcher not visible
**Solution**: Check if the Header component is rendering the LanguageSwitcher component

### Issue: Translations not changing
**Solution**: 
- Check browser console for errors
- Verify LanguageProvider is wrapping the app
- Check if components are using `useLanguage()` hook

### Issue: RTL not applying
**Solution**:
- Check `document.documentElement.dir` in console
- Should be 'rtl' when Arabic is selected
- Check CSS rules in `index.css` for `[dir="rtl"]`

## Debug Mode

To enable debug components in production, temporarily change in `App.tsx`:
```typescript
{true && (  // Change from import.meta.env.DEV
  <>
    <LanguageDebug />
    <LanguageTest />
  </>
)}
```

