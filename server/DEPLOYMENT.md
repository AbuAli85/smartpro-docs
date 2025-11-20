# Backend Server Deployment Guide

Complete guide for deploying the SmartPro backend server.

## Prerequisites

1. **Node.js** 20.x or higher
2. **PostgreSQL** database (for production)
3. **Environment variables** configured

## Local Development

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Setup Database

#### Option A: Using Prisma (Recommended)
```bash
# Generate Prisma client
pnpm run db:generate

# Push schema to database (development)
pnpm run db:push

# Or create migration (production)
pnpm run db:migrate

# Open Prisma Studio to view data
pnpm run db:studio
```

#### Option B: Without Database
The server will work without a database, but features like:
- Consultation form storage
- User management
- Notification history
will be disabled.

### 3. Configure Environment

Create `.env` file:
```env
# Server
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/smartpro

# JWT
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRY=24h
REFRESH_TOKEN_EXPIRY=7d

# Make.com Webhook
MAKE_WEBHOOK_URL=https://hook.eu2.make.com/your-webhook-url

# Logging
LOG_LEVEL=INFO
LOG_REQUESTS_TO_DB=false
```

### 4. Run Server

```bash
# Development (with auto-reload)
pnpm run dev:server

# Production
pnpm run server
```

## Deployment Options

### Option 1: Vercel (Recommended for Full-Stack)

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Deploy**
```bash
vercel --prod
```

3. **Configure Environment Variables**
In Vercel dashboard:
- `DATABASE_URL`
- `JWT_SECRET`
- `MAKE_WEBHOOK_URL`
- `FRONTEND_URL`
- `LOG_LEVEL`

4. **Setup API Routes**
Vercel automatically handles `server/` directory as serverless functions.

### Option 2: Railway

1. **Connect Repository**
   - Go to [Railway](https://railway.app)
   - Connect your GitHub repository

2. **Add PostgreSQL**
   - Add PostgreSQL service
   - Copy `DATABASE_URL`

3. **Configure Environment**
   - Add all environment variables
   - Set `PORT=3001`

4. **Deploy**
   - Railway auto-detects and deploys

### Option 3: Render

1. **Create Web Service**
   - Connect GitHub repository
   - Set build command: `pnpm install && pnpm run db:generate`
   - Set start command: `pnpm run server`

2. **Add PostgreSQL**
   - Create PostgreSQL database
   - Copy connection string to `DATABASE_URL`

3. **Environment Variables**
   - Add all required variables

### Option 4: Docker

1. **Create Dockerfile**
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install
COPY . .
RUN pnpm run db:generate
EXPOSE 3001
CMD ["pnpm", "run", "server"]
```

2. **Build & Run**
```bash
docker build -t smartpro-backend .
docker run -p 3001:3001 --env-file .env smartpro-backend
```

### Option 5: Traditional VPS (DigitalOcean, AWS EC2, etc.)

1. **SSH into server**
2. **Install Node.js & PostgreSQL**
3. **Clone repository**
4. **Setup environment variables**
5. **Run migrations**
6. **Use PM2 for process management**
```bash
npm install -g pm2
pm2 start server/index.ts --name smartpro-api
pm2 save
pm2 startup
```

## Database Migrations

### Create Migration
```bash
pnpm run db:migrate
```

### Apply Migrations
```bash
pnpm run db:push
```

### Reset Database (Development Only)
```bash
npx prisma migrate reset
```

## Health Checks

The server exposes a health check endpoint:
```
GET /health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2025-01-08T10:00:00.000Z",
  "uptime": 3600
}
```

## Monitoring

### Logs
- **Development**: Console logs
- **Production**: Use your platform's logging service
- **Database Logs**: Set `LOG_REQUESTS_TO_DB=true` to log requests

### Metrics
- Response times logged automatically
- Error rates tracked
- Rate limit headers in responses

## Security Checklist

- [ ] `JWT_SECRET` is strong and unique
- [ ] `DATABASE_URL` uses SSL
- [ ] CORS is configured correctly
- [ ] Rate limiting is enabled
- [ ] Environment variables are secure
- [ ] HTTPS is enabled in production
- [ ] Database backups are configured
- [ ] Logs don't contain sensitive data

## Troubleshooting

### Server won't start
- Check `PORT` is not in use
- Verify all environment variables
- Check database connection
- Review error logs

### Database connection fails
- Verify `DATABASE_URL` format
- Check database is accessible
- Ensure SSL is configured if required
- Test connection manually

### Rate limiting too strict
- Adjust limits in `server/middleware/rateLimit.ts`
- Or use Redis for distributed rate limiting

### Prisma client errors
- Run `pnpm run db:generate`
- Clear `node_modules/.prisma`
- Reinstall dependencies

## Support

For issues:
1. Check logs
2. Verify environment variables
3. Test database connection
4. Review middleware configuration
