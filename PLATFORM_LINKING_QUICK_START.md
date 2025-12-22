# Platform Linking - Quick Start Guide

## 🚀 Quick Integration Steps

### Step 1: Read Submission ID on Sign-Up Page

```javascript
// On platform sign-up page (/auth/sign-up)
const urlParams = new URLSearchParams(window.location.search);
const submissionId = urlParams.get('submissionId');
const email = urlParams.get('email');

// Store for later
if (submissionId) {
  localStorage.setItem('consultation_submissionId', submissionId);
  if (email) {
    // Pre-fill email field
    document.getElementById('email').value = decodeURIComponent(email);
  }
}
```

### Step 2: After Registration Success

```javascript
async function onRegistrationSuccess(userId, userEmail) {
  const submissionId = localStorage.getItem('consultation_submissionId');
  
  if (submissionId) {
    // 1. Track registration completion
    await fetch('https://smartpro-docs.vercel.app/api/leads/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        submissionId,
        email: userEmail,
        stage: 'registration_completed',
        metadata: {
          platform_user_id: userId,
          registered_at: new Date().toISOString(),
        },
      }),
    });

    // 2. Link consultation to user
    await fetch('https://smartpro-docs.vercel.app/api/users/link-consultation', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({
        userId,
        submissionId,
      }),
    });

    // 3. Redirect to welcome page
    window.location.href = `/welcome?submissionId=${submissionId}&email=${encodeURIComponent(userEmail)}&userId=${userId}`;
  }
}
```

### Step 3: Update Database Schema

**Run Migration**:
```bash
npx prisma migrate dev --name add_consultation_linking
```

**Or Add Column Manually**:
```sql
ALTER TABLE users ADD COLUMN consultation_submission_id VARCHAR(255);
CREATE UNIQUE INDEX idx_users_consultation_submission ON users(consultation_submission_id);
```

### Step 4: Show Consultation in Dashboard

```javascript
// Platform dashboard
const [consultation, setConsultation] = useState(null);

useEffect(() => {
  if (user?.consultationSubmissionId) {
    fetch(`https://smartpro-docs.vercel.app/api/consultation/${user.consultationSubmissionId}`)
      .then(res => res.json())
      .then(data => setConsultation(data));
  }
}, [user]);

// Display in dashboard
{consultation && (
  <Card>
    <h3>Your Consultation Request</h3>
    <p>Status: {consultation.status}</p>
    <Link href={`/consultation/status/${consultation.submissionId}`}>
      View Details
    </Link>
  </Card>
)}
```

## 📋 Complete Checklist

- [ ] Read `submissionId` from URL on sign-up page
- [ ] Store `submissionId` in localStorage
- [ ] Pre-fill email if provided
- [ ] After registration, call `/api/leads/track` (registration_completed)
- [ ] After registration, call `/api/users/link-consultation`
- [ ] Update database schema (add `consultationSubmissionId` to User)
- [ ] Show consultation widget in dashboard
- [ ] Track profile completion → `/api/leads/track` (profile_completed)
- [ ] Track first service booking → `/api/leads/track` (first_service_booked)

## 🔗 API Endpoints

### Marketing Site APIs (Call from Platform)

1. **POST /api/leads/track**
   ```json
   {
     "submissionId": "sub_123",
     "email": "user@example.com",
     "stage": "registration_completed",
     "metadata": { "platform_user_id": "user_123" }
   }
   ```

2. **POST /api/users/link-consultation**
   ```json
   {
     "userId": "user_123",
     "submissionId": "sub_123"
   }
   ```

3. **GET /api/consultation/:submissionId**
   - Returns consultation details

4. **GET /api/leads/:submissionId**
   - Returns lead status and progress

## 🎯 That's It!

Follow these 4 steps and your platform will be fully integrated with the consultation tracking system!

For detailed documentation, see `PLATFORM_INTEGRATION_GUIDE.md`.

