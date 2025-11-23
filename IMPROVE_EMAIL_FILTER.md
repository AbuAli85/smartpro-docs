# Improve Email Filter - Exclude Notifications

## 🎯 **Current Situation**

The Email Watch flow is working, but it's catching:
- ✅ Real client replies (good!)
- ⚠️ Google+ notifications (not needed)
- ⚠️ Other automated emails (not needed)

---

## ✅ **Solution: Improve Filter**

### **Option 1: Filter by Email Domain (Recommended)**

Update the Gmail module query to exclude notification emails:

**Current Query:**
```
subject:"Re:"
```

**Improved Query:**
```
subject:"Re:" -from:plus.google.com -from:noreply -from:no-reply -from:notifications
```

**This excludes:**
- Google+ notifications (`plus.google.com`)
- Generic noreply emails
- Notification emails

---

### **Option 2: Filter in HTTP Module**

Add additional filter conditions in Module 2 (HTTP Request):

**Current Filter:**
```
{{5.subject}} contains "Re:"
```

**Improved Filter:**
```
{{5.subject}} contains "Re:" AND
{{5.fromEmail}} does not contain "plus.google.com" AND
{{5.fromEmail}} does not contain "noreply" AND
{{5.fromEmail}} does not contain "no-reply" AND
{{5.fromEmail}} does not contain "notifications"
```

---

### **Option 3: Filter by Known Client Domains**

If you know your client email domains, filter for those:

**Gmail Query:**
```
subject:"Re:" (from:gmail.com OR from:yahoo.com OR from:outlook.com OR from:hotmail.com)
```

**Or exclude known notification domains:**
```
subject:"Re:" -from:plus.google.com -from:facebook.com -from:twitter.com -from:linkedin.com
```

---

## 🔧 **Recommended: Update Gmail Query**

### **Step-by-Step:**

1. **Open "Email Watch - Client Replies" scenario**
2. **Click Module 5** (Gmail - Watch emails)
3. **Find "Query" field**
4. **Update query to:**
   ```
   subject:"Re:" -from:plus.google.com -from:noreply -from:no-reply -from:notifications
   ```
5. **Save module**

---

## 📋 **Alternative: Filter in HTTP Module**

If you prefer filtering in the HTTP module:

1. **Open Module 2** (HTTP Request)
2. **Find "Filter" section**
3. **Add conditions:**
   ```
   Condition 1: {{5.subject}} contains "Re:"
   Condition 2: {{5.fromEmail}} does not contain "plus.google.com"
   Condition 3: {{5.fromEmail}} does not contain "noreply"
   Condition 4: {{5.fromEmail}} does not contain "no-reply"
   ```
4. **Set filter to: "All conditions must be met"**
5. **Save module**

---

## 🎯 **Best Practice: Use Both**

1. **Gmail Query** - First line of defense (exclude at source)
2. **HTTP Filter** - Second line of defense (additional validation)

---

## ✅ **Recommended Configuration**

### **Gmail Module Query:**
```
subject:"Re:" -from:plus.google.com -from:noreply -from:no-reply -from:notifications -from:facebook.com -from:twitter.com
```

### **HTTP Module Filter:**
```
{{5.subject}} contains "Re:"
```

This way:
- Gmail filters out most notifications
- HTTP module double-checks it's a reply

---

## 🧪 **Testing**

After updating:

1. **Send a real client reply:**
   - Should be processed ✅
2. **Check for notifications:**
   - Should be ignored ❌

---

## 📋 **Summary**

**Current:** Flow works but catches notifications

**Solution:** 
1. Update Gmail query to exclude notification domains
2. Optionally add HTTP module filter conditions

**Recommended:** Update Gmail query to exclude `plus.google.com`, `noreply`, etc.

---

**Update the Gmail query to filter out notifications!** 🔧

