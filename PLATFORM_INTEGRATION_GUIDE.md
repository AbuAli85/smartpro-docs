# Platform Integration Guide - Linking Consultations to User Accounts

## Overview

This guide explains how to integrate the consultation tracking system with your platform (`https://marketing.thedigitalmorph.com/auth/sign-up`) to create a seamless experience from consultation → registration → active user.

## Integration Points

### 1. Registration Page - Read Tracking Parameters

**Location**: Platform sign-up page (`/auth/sign-up`)

**What to do**:
1. Read `submissionId` from URL parameters
2. Pre-fill email if provided
3. Store submissionId for later linking

**Code Example**:
```javascript
// On platform sign-up page load
const urlParams = new URLSearchParams(window.location.search);
const submissionId = urlParams.get('submissionId');
const email = urlParams.get('email');
const type = urlParams.get('type'); // 'provider' or 'client'
const ref = urlParams.get('ref'); // 'consultation'

// Store in form state or localStorage
if (submissionId) {
  // Store for later use
  localStorage.setItem('consultation_submissionId', submissionId);
  
  // Pre-fill email if provided
  if (email) {
    document.getElementById('email').value = decodeURIComponent(email);
  }
  
  // Pre-select user type if provided
  if (type) {
    document.getElementById('userType').value = type;
  }
}
```

### 2. After Registration - Link Consultation to Account

**Location**: Platform registration success handler

**What to do**:
1. Get `submissionId` from localStorage or form
2. Call lead tracking API to mark registration as completed
3. Link consultation to user account in database
4. Redirect to welcome page with tracking info

**Code Example**:
```javascript
// After successful registration
async function handleRegistrationSuccess(userId, userEmail) {
  const submissionId = localStorage.getItem('consultation_submissionId');
  
  if (submissionId) {
    try {
      // 1. Track registration completion
      await fetch('https://smartpro-docs.vercel.app/api/leads/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionId: submissionId,
          email: userEmail,
          stage: 'registration_completed',
          metadata: {
            platform_user_id: userId,
            account_type: type || 'client',
            registered_at: new Date().toISOString(),
          },
        }),
      });

      // 2. Link consultation to user account (call your platform API)
      await fetch('/api/users/link-consultation', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
          userId: userId,
          submissionId: submissionId,
        }),
      });

      // 3. Clear localStorage
      localStorage.removeItem('consultation_submissionId');

      // 4. Redirect to welcome page
      window.location.href = `/welcome?submissionId=${submissionId}&email=${encodeURIComponent(userEmail)}&userId=${userId}`;
    } catch (error) {
      console.error('Error linking consultation:', error);
      // Still redirect, but without tracking
      window.location.href = '/dashboard';
    }
  } else {
    // No consultation to link, redirect to normal dashboard
    window.location.href = '/dashboard';
  }
}
```

### 3. Database Schema - Link Consultation to User

**Add to Platform Database**:

```sql
-- Add column to link consultations to users
ALTER TABLE users ADD COLUMN consultation_submission_id VARCHAR(255);
CREATE INDEX idx_users_consultation_submission ON users(consultation_submission_id);

-- Or create a separate linking table (recommended)
CREATE TABLE user_consultations (
  id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  submission_id VARCHAR(255) NOT NULL UNIQUE,
  linked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (submission_id) REFERENCES consultation_submissions(submission_id) ON DELETE CASCADE,
  INDEX idx_user_consultations_user (user_id),
  INDEX idx_user_consultations_submission (submission_id)
);
```

**Prisma Schema** (if using Prisma):
```prisma
model User {
  id                      String   @id @default(cuid())
  email                   String   @unique
  name                    String?
  consultationSubmissionId String?  @unique
  consultationSubmission  ConsultationSubmission? @relation(fields: [consultationSubmissionId], references: [submissionId])
  // ... other fields
}

// Or separate linking table
model UserConsultation {
  id          String   @id @default(cuid())
  userId      String
  submissionId String   @unique
  linkedAt    DateTime  @default(now())
  user        User      @relation(fields: [userId], references: [id])
  consultation ConsultationSubmission @relation(fields: [submissionId], references: [submissionId])
  
  @@index([userId])
  @@index([submissionId])
}
```

### 4. Platform API Endpoint - Link Consultation

**Create Platform API Endpoint**:

```javascript
// POST /api/users/link-consultation
router.post('/link-consultation', authenticateToken, async (req, res) => {
  try {
    const { userId, submissionId } = req.body;
    const authenticatedUserId = req.user.id; // From JWT token

    // Verify user owns this account
    if (userId !== authenticatedUserId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Verify consultation exists
    const consultation = await fetch(
      `https://smartpro-docs.vercel.app/api/consultation/${submissionId}`
    );
    
    if (!consultation.ok) {
      return res.status(404).json({ error: 'Consultation not found' });
    }

    // Link consultation to user
    await prisma.user.update({
      where: { id: userId },
      data: { consultationSubmissionId: submissionId },
    });

    // Or use linking table
    await prisma.userConsultation.create({
      data: {
        userId: userId,
        submissionId: submissionId,
      },
    });

    res.json({ 
      success: true,
      message: 'Consultation linked successfully'
    });
  } catch (error) {
    console.error('Error linking consultation:', error);
    res.status(500).json({ error: 'Failed to link consultation' });
  }
});
```

### 5. Welcome Page - Show PostRegistrationWelcome Component

**Option A: Use Component Directly**

```javascript
// Platform welcome page
import { PostRegistrationWelcome } from '@smartpro-docs/components/PostRegistrationWelcome';

function WelcomePage() {
  const urlParams = new URLSearchParams(window.location.search);
  const submissionId = urlParams.get('submissionId');
  const email = urlParams.get('email');
  const userId = urlParams.get('userId');
  const accountType = urlParams.get('type') || 'client';

  return (
    <div className="welcome-page">
      <PostRegistrationWelcome
        submissionId={submissionId}
        email={email}
        userId={userId}
        accountType={accountType}
      />
    </div>
  );
}
```

**Option B: Create Platform-Specific Welcome Page**

```javascript
// Platform welcome page
function WelcomePage() {
  const urlParams = new URLSearchParams(window.location.search);
  const submissionId = urlParams.get('submissionId');
  const email = urlParams.get('email');
  const userId = getCurrentUserId(); // From auth context

  // Fetch consultation details
  const [consultation, setConsultation] = useState(null);
  
  useEffect(() => {
    if (submissionId) {
      fetch(`https://smartpro-docs.vercel.app/api/consultation/${submissionId}`)
        .then(res => res.json())
        .then(data => setConsultation(data));
    }
  }, [submissionId]);

  return (
    <div className="welcome-page">
      <h1>Welcome to the Platform!</h1>
      
      {submissionId && (
        <ConsultationStatusCard 
          submissionId={submissionId}
          consultation={consultation}
        />
      )}
      
      <NextSteps userId={userId} />
      <DashboardLink />
    </div>
  );
}
```

### 6. User Dashboard - Show Consultation Widget

**Add to Platform Dashboard**:

```javascript
// Platform dashboard component
function Dashboard() {
  const user = useCurrentUser();
  const [consultation, setConsultation] = useState(null);

  useEffect(() => {
    if (user?.consultationSubmissionId) {
      fetch(`https://smartpro-docs.vercel.app/api/consultation/${user.consultationSubmissionId}`)
        .then(res => res.json())
        .then(data => setConsultation(data));
    }
  }, [user]);

  return (
    <div className="dashboard">
      {/* Consultation Widget */}
      {consultation && (
        <Card>
          <h3>Your Consultation Request</h3>
          <p>Status: {consultation.status}</p>
          <p>Submitted: {new Date(consultation.createdAt).toLocaleDateString()}</p>
          <Link href={`/consultation/status/${consultation.submissionId}`}>
            View Details
          </Link>
        </Card>
      )}

      {/* Lead Progress Widget */}
      {user?.consultationSubmissionId && (
        <LeadProgressWidget 
          submissionId={user.consultationSubmissionId}
          email={user.email}
        />
      )}

      {/* Other dashboard content */}
    </div>
  );
}
```

### 7. Track Profile Completion

**When User Completes Profile**:

```javascript
// Platform profile completion handler
async function handleProfileComplete(userId, userEmail) {
  const user = await getUserById(userId);
  
  if (user?.consultationSubmissionId) {
    // Track profile completion
    await fetch('https://smartpro-docs.vercel.app/api/leads/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        submissionId: user.consultationSubmissionId,
        email: userEmail,
        stage: 'profile_completed',
        metadata: {
          platform_user_id: userId,
          profile_completed_at: new Date().toISOString(),
        },
      }),
    });
  }
}
```

### 8. Track First Service Booking

**When User Books First Service**:

```javascript
// Platform service booking handler
async function handleServiceBooking(userId, userEmail, serviceId) {
  const user = await getUserById(userId);
  
  if (user?.consultationSubmissionId) {
    // Check if this is first booking
    const previousBookings = await getServiceBookings(userId);
    
    if (previousBookings.length === 0) {
      // Track first service booked
      await fetch('https://smartpro-docs.vercel.app/api/leads/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionId: user.consultationSubmissionId,
          email: userEmail,
          stage: 'first_service_booked',
          metadata: {
            platform_user_id: userId,
            service_id: serviceId,
            booked_at: new Date().toISOString(),
          },
        }),
      });
    }
  }
}
```

## Complete Integration Flow

```
1. User clicks "Register" on thank you page
   ↓
2. Opens platform sign-up: /auth/sign-up?submissionId=xxx&email=xxx&type=client
   ↓
3. Platform reads submissionId from URL
   ↓
4. User completes registration
   ↓
5. Platform calls: POST /api/leads/track (registration_completed)
   ↓
6. Platform links consultation to user account
   ↓
7. Platform redirects to: /welcome?submissionId=xxx&email=xxx&userId=xxx
   ↓
8. Welcome page shows PostRegistrationWelcome component
   ↓
9. User completes profile → Track profile_completed
   ↓
10. User books first service → Track first_service_booked
```

## API Endpoints Summary

### Marketing Site APIs (Call from Platform)

1. **POST /api/leads/track**
   - Track lead progression
   - Used for: registration_completed, profile_completed, first_service_booked

2. **GET /api/consultation/:submissionId**
   - Fetch consultation details
   - Used for: displaying consultation info

3. **GET /api/leads/:submissionId**
   - Get lead status and progress
   - Used for: showing progress indicators

### Platform APIs (Create on Platform)

1. **POST /api/users/link-consultation**
   - Link consultation to user account
   - Requires: authentication token

2. **GET /api/users/:userId/consultation**
   - Get user's linked consultation
   - Requires: authentication token

## Environment Variables

**On Platform**:
```env
# Marketing site API URL
MARKETING_API_URL=https://smartpro-docs.vercel.app/api

# Optional: API key for authentication
MARKETING_API_KEY=your_api_key_here
```

## Security Considerations

1. **Verify User Identity**
   - Always verify JWT token before linking
   - Ensure user owns the account being linked

2. **Validate Submission ID**
   - Verify consultation exists before linking
   - Check consultation email matches user email

3. **Rate Limiting**
   - Limit API calls to prevent abuse
   - Use proper authentication

4. **Error Handling**
   - Handle network failures gracefully
   - Don't block registration if tracking fails

## Testing Checklist

- [ ] Submission ID read from URL correctly
- [ ] Email pre-filled if provided
- [ ] Registration completion tracked
- [ ] Consultation linked to user account
- [ ] Welcome page shows correctly
- [ ] Dashboard shows consultation widget
- [ ] Profile completion tracked
- [ ] First service booking tracked
- [ ] Error handling works
- [ ] Works without submissionId (normal registration)

## Example Implementation

**Complete Registration Handler**:

```javascript
// Platform registration handler
async function handleRegistration(formData) {
  try {
    // 1. Register user
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const { user, token } = await response.json();

    // 2. Get submissionId from URL or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const submissionId = urlParams.get('submissionId') || 
                         localStorage.getItem('consultation_submissionId');

    // 3. If submissionId exists, link consultation
    if (submissionId) {
      await Promise.all([
        // Track registration completion
        fetch('https://smartpro-docs.vercel.app/api/leads/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            submissionId,
            email: user.email,
            stage: 'registration_completed',
            metadata: {
              platform_user_id: user.id,
              account_type: formData.type || 'client',
              registered_at: new Date().toISOString(),
            },
          }),
        }),
        
        // Link consultation to user
        fetch('/api/users/link-consultation', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            userId: user.id,
            submissionId,
          }),
        }),
      ]);
    }

    // 4. Store auth token
    localStorage.setItem('authToken', token);

    // 5. Redirect to welcome page or dashboard
    if (submissionId) {
      window.location.href = `/welcome?submissionId=${submissionId}&email=${encodeURIComponent(user.email)}&userId=${user.id}`;
    } else {
      window.location.href = '/dashboard';
    }
  } catch (error) {
    console.error('Registration error:', error);
    // Show error to user
  }
}
```

## Summary

To link consultations with the platform:

1. ✅ **Read submissionId** from URL on sign-up page
2. ✅ **Track registration** completion via API
3. ✅ **Link consultation** to user account in database
4. ✅ **Show welcome page** with consultation status
5. ✅ **Display consultation** in user dashboard
6. ✅ **Track profile completion** and first service booking

The system is ready - just integrate these steps into your platform! 🚀

