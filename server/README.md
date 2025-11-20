# SmartPro Backend Server

Express.js backend API server for SmartPro platform.

## Setup

1. **Install Dependencies** (from root directory):
```bash
pnpm install
```

2. **Environment Variables**:
Create a `.env` file in the root directory with:
```env
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRY=24h
REFRESH_TOKEN_EXPIRY=7d
DATABASE_URL=postgresql://user:password@localhost:5432/smartpro
MAKE_WEBHOOK_URL=https://hook.eu1.make.com/your-webhook-url
```

3. **Run Server**:
```bash
# Development
pnpm run dev:server

# Production
node server/index.js
```

## API Endpoints

### Authentication (`/api/auth`)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/profile` - Update profile
- `POST /api/auth/change-password` - Change password
- `POST /api/auth/logout` - Logout user

### Notifications (`/api/notifications`)
- `POST /api/notifications` - Create notification
- `GET /api/notifications` - List notifications
- `GET /api/notifications/:id` - Get notification
- `PUT /api/notifications/:id` - Update notification
- `DELETE /api/notifications/:id` - Delete notification
- `POST /api/notifications/:id/read` - Mark as read
- `POST /api/notifications/:id/archive` - Archive notification
- `GET /api/notifications/stats` - Get statistics

### Preferences (`/api/preferences`)
- `GET /api/preferences` - Get preferences
- `PUT /api/preferences` - Update preferences
- `POST /api/preferences/reset` - Reset to defaults

## Health Check

- `GET /health` - Server health status

## Architecture

```
server/
├── index.ts              # Main server entry point
├── routes/               # API route handlers
│   ├── authRoutes.ts
│   ├── notificationRoutes.ts
│   └── preferencesRoutes.ts
└── services/             # Business logic
    ├── authService.ts
    └── notificationService.ts
```

## Notes

- Server uses Prisma for database (optional - will work without it)
- JWT authentication for protected routes
- CORS enabled for frontend communication
- Error handling middleware included
