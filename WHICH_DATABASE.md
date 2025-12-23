# Which Database is Being Used?

## 🗄️ **Database Information**

### **Database Type**
- **PostgreSQL** (relational database)

### **Database Provider**
- **Supabase** (cloud-hosted PostgreSQL)
- Managed database service
- Shared between marketing website and platform

### **ORM (Object-Relational Mapping)**
- **Prisma** - Used to interact with the database

---

## 📊 **Database Table for Consultations**

### **Table Name**
- **`consultation_submissions`** (in database)
- **Model Name**: `ConsultationSubmission` (in Prisma schema)

### **Table Structure**
The consultation data is stored in the `consultation_submissions` table with these fields:

```typescript
{
  id: string                    // Auto-generated ID
  submissionId: string          // Unique submission ID (e.g., "sub_1766473331605")
  name: string                  // Client name
  email: string                 // Client email
  phone: string?                // Optional phone
  location: string?             // Optional location
  company: string?              // Optional company name
  businessType: string?         // Optional business type
  services: string[]            // Array of selected services
  primaryService: string        // Primary service
  budget: string?               // Optional budget
  timeline: string?            // Optional timeline
  preferredContact: string?    // Optional contact preference
  preferredTime: string?        // Optional time preference
  message: string?             // Optional message
  language: string              // "en" or "ar"
  status: string               // "pending", "contacted", "completed", "cancelled"
  createdAt: DateTime          // When created
  updatedAt: DateTime          // Last updated
}
```

---

## 🔌 **How It Connects**

### **1. Connection String**
The database connection is configured via environment variable:

```env
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"
```

### **2. Where It's Set**
- **Local Development**: `.env` file in project root
- **Production (Vercel)**: Vercel Environment Variables dashboard

### **3. How It's Used**
```typescript
// server/routes/consultationRoutes.ts
const consultation = await prisma.consultationSubmission.findFirst({
  where: {
    submissionId: submissionId,  // e.g., "sub_1766473331605"
  }
});
```

---

## 🔍 **How to Access the Database**

### **Option 1: Supabase Dashboard** (Recommended)
1. Go to: https://supabase.com/dashboard
2. Select your project
3. Go to **Table Editor**
4. Find `consultation_submissions` table
5. View/edit data directly

### **Option 2: Prisma Studio** (Local Development)
```bash
npx prisma studio
```
- Opens a web interface at `http://localhost:5555`
- Browse and edit data visually

### **Option 3: SQL Query** (Advanced)
```sql
-- Get all consultations
SELECT * FROM consultation_submissions;

-- Get specific consultation by submissionId
SELECT * FROM consultation_submissions 
WHERE submission_id = 'sub_1766473331605';

-- Get recent consultations
SELECT * FROM consultation_submissions 
ORDER BY created_at DESC 
LIMIT 10;
```

---

## 📍 **API Endpoint**

### **Get Consultation by Submission ID**
```
GET /api/consultation/:submissionId
```

**Example:**
```
GET /api/consultation/sub_1766473331605
```

**Response:**
```json
{
  "id": "clx123...",
  "submissionId": "sub_1766473331605",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+971501234567",
  "services": ["Company Setup", "VAT Registration"],
  "message": "I need help with...",
  "createdAt": "2024-01-15T10:30:00Z",
  ...
}
```

---

## ✅ **How to Test**

### **1. Check if Database is Connected**
Visit the thank you page with a valid submission ID:
```
/consultation/thanks?id=sub_1766473331605&email=test@example.com
```

The page will:
- ✅ Show "✅ Data saved to database" if found
- ⚠️ Show "Consultation not found in database" if not found
- ❌ Show "Error connecting to database" if connection fails

### **2. Check Database Directly**
1. Go to Supabase Dashboard
2. Open `consultation_submissions` table
3. Look for the `submissionId` you're testing with

### **3. Test API Endpoint**
```bash
curl https://smartpro-docs.vercel.app/api/consultation/sub_1766473331605
```

---

## 🔗 **Related Tables**

The database also contains these related tables:

1. **`leads`** - Tracks lead progression
2. **`users`** - User accounts (can link to consultations)
3. **`notifications`** - Notification system
4. **`analytics_events`** - Analytics tracking

---

## 🎯 **Summary**

- **Database**: PostgreSQL on Supabase
- **Table**: `consultation_submissions`
- **ORM**: Prisma
- **Connection**: Via `DATABASE_URL` environment variable
- **API**: `/api/consultation/:submissionId`
- **Access**: Supabase Dashboard or Prisma Studio

---

## 🆘 **Troubleshooting**

### **If consultation data is not showing:**

1. **Check DATABASE_URL is set**
   - Local: Check `.env` file
   - Production: Check Vercel Environment Variables

2. **Check Supabase Dashboard**
   - Verify table exists
   - Check if data is actually saved

3. **Check API endpoint**
   - Test: `GET /api/consultation/:submissionId`
   - Check server logs for errors

4. **Check Prisma connection**
   - Run: `npx prisma generate`
   - Check: `npx prisma db pull` (sync schema)

---

**The database is Supabase PostgreSQL, and consultation data is stored in the `consultation_submissions` table!** 🎉

