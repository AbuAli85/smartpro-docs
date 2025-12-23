# How to Install Python for Data Migration

If you want to use the Python migration script (`migrate_data.py`), you need to install Python first.

## 🪟 **Windows Installation**

### **Option 1: Microsoft Store (Easiest)**

1. Open **Microsoft Store**
2. Search for **"Python 3.12"** or **"Python 3.11"**
3. Click **Install**
4. Wait for installation to complete
5. Open a **new PowerShell window**
6. Verify installation:
   ```powershell
   python --version
   pip --version
   ```

### **Option 2: Official Python Website**

1. Go to https://www.python.org/downloads/
2. Download **Python 3.11** or **3.12** (latest stable)
3. Run the installer
4. **⚠️ IMPORTANT:** Check "Add Python to PATH" during installation
5. Click **Install Now**
6. Open a **new PowerShell window**
7. Verify installation:
   ```powershell
   python --version
   pip --version
   ```

### **Option 3: Using Chocolatey (if you have it)**

```powershell
choco install python
```

## ✅ **Verify Installation**

After installing, open a **new PowerShell window** and run:

```powershell
python --version
# Should show: Python 3.x.x

pip --version
# Should show: pip x.x.x
```

## 📦 **Install Migration Dependencies**

Once Python is installed:

```powershell
pip install -r requirements.txt
```

Or install manually:

```powershell
pip install psycopg2-binary python-dotenv
```

## 🚀 **Then Run Migration**

```powershell
python migrate_data.py
```

---

## 🔄 **Alternative: Use Simple SQL Migration**

If you don't want to install Python, you can use the **simpler SQL-based migration** instead:

1. Use `SIMPLE_MIGRATION.sql` - No Python required!
2. Just copy/paste data between Supabase SQL Editors
3. See `SIMPLE_MIGRATION_GUIDE.md` for instructions

---

## 🆘 **Troubleshooting**

### **"python is not recognized" after installation**

**Solution:**
1. Close and reopen PowerShell
2. If still not working, add Python to PATH manually:
   - Search "Environment Variables" in Windows
   - Edit "Path" variable
   - Add: `C:\Users\YourName\AppData\Local\Programs\Python\Python3x\`
   - Add: `C:\Users\YourName\AppData\Local\Programs\Python\Python3x\Scripts\`
3. Restart PowerShell

### **"pip is not recognized"**

**Solution:**
- Make sure you checked "Add Python to PATH" during installation
- Or reinstall Python with PATH option checked

### **Permission errors when installing packages**

**Solution:**
```powershell
pip install --user psycopg2-binary python-dotenv
```

---

## 📚 **Which Method to Use?**

| Method | Pros | Cons |
|--------|------|------|
| **Python Script** | ✅ Fully automated<br>✅ Handles ID mapping<br>✅ No manual work | ❌ Requires Python installation |
| **Simple SQL** | ✅ No installation needed<br>✅ Works immediately<br>✅ Uses Supabase directly | ⚠️ Manual copy/paste<br>⚠️ More steps |

**Recommendation:** If you're comfortable with Python, use the Python script. Otherwise, use the Simple SQL method.

