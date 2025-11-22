# Critical Implementations - Code Examples

## 1. Error Tracking with Sentry

### Installation
```bash
pnpm add @sentry/react @sentry/node
```

### Frontend Setup
```typescript
// client/src/lib/sentry.ts
import * as Sentry from "@sentry/react";

export function initSentry() {
  if (import.meta.env.VITE_SENTRY_DSN) {
    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      environment: import.meta.env.VITE_ENV || "development",
      integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration(),
      ],
      tracesSampleRate: 1.0,
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
    });
  }
}

// client/src/App.tsx
import { initSentry } from "./lib/sentry";

useEffect(() => {
  initSentry();
}, []);
```

### Backend Setup
```typescript
// server/lib/sentry.ts
import * as Sentry from "@sentry/node";

export function initSentry() {
  if (process.env.SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      environment: process.env.NODE_ENV || "development",
      tracesSampleRate: 1.0,
    });
  }
}

// server/index.ts
import { initSentry } from "./lib/sentry";
initSentry();
```

---

## 2. Structured Logging with Winston

### Installation
```bash
pnpm add winston
```

### Logger Setup
```typescript
// server/lib/logger.ts
import winston from 'winston';

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: logFormat,
  defaultMeta: { service: 'smartpro-api' },
  transports: [
    new winston.transports.File({ 
      filename: 'logs/error.log', 
      level: 'error' 
    }),
    new winston.transports.File({ 
      filename: 'logs/combined.log' 
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }));
}

// Usage
import { logger } from './lib/logger';

logger.info('Consultation submitted', { email, service });
logger.error('Webhook failed', { error, payload });
```

---

## 3. Health Check Endpoint

```typescript
// api/health.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const checks = {
    database: await checkDatabase(),
    webhook: await checkWebhook(),
    memory: process.memoryUsage(),
  };

  const isHealthy = checks.database && checks.webhook;

  const health = {
    status: isHealthy ? 'healthy' : 'degraded',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    checks,
    version: process.env.npm_package_version || '1.0.0',
  };

  res.status(isHealthy ? 200 : 503).json(health);
}

async function checkDatabase(): Promise<boolean> {
  try {
    // Check Prisma connection
    if (typeof prisma !== 'undefined') {
      await prisma.$queryRaw`SELECT 1`;
      return true;
    }
    return true; // No DB, assume OK
  } catch {
    return false;
  }
}

async function checkWebhook(): Promise<boolean> {
  try {
    const url = process.env.MAKE_WEBHOOK_URL;
    if (!url) return true; // No webhook configured
    
    // Simple connectivity check
    const response = await fetch(url, {
      method: 'HEAD',
      signal: AbortSignal.timeout(5000),
    });
    return response.ok;
  } catch {
    return false;
  }
}
```

---

## 4. CI/CD Pipeline

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
        with:
          version: 10
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'pnpm'
      
      - run: pnpm install
      - run: pnpm run check
      - run: pnpm run test
      
  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'pnpm'
      
      - run: pnpm install
      - run: pnpm run build
      
  deploy-staging:
    if: github.ref == 'refs/heads/develop'
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod=false'
          
  deploy-production:
    if: github.ref == 'refs/heads/main'
    needs: build
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v3
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 5. Security Headers

```typescript
// server/middleware/security.ts
import helmet from 'helmet';
import express from 'express';

export function setupSecurity(app: express.Application) {
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://www.googletagmanager.com",
          "https://www.google-analytics.com",
        ],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'", "https://www.google-analytics.com"],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'none'"],
      },
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
    frameguard: { action: 'deny' },
    noSniff: true,
    xssFilter: true,
  }));
}
```

---

## 6. Environment Validation

```typescript
// server/lib/env.ts
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'staging', 'production']),
  MAKE_WEBHOOK_URL: z.string().url().optional(),
  DATABASE_URL: z.string().url().optional(),
  JWT_SECRET: z.string().min(32),
  SENTRY_DSN: z.string().url().optional(),
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
});

export function validateEnv() {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    console.error('❌ Invalid environment variables:', error);
    process.exit(1);
  }
}

// server/index.ts
import { validateEnv } from './lib/env';
validateEnv();
```

---

## 7. Request ID Tracking

```typescript
// server/middleware/requestId.ts
import { v4 as uuidv4 } from 'uuid';
import { Request, Response, NextFunction } from 'express';

export function requestIdMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const requestId = req.headers['x-request-id'] || uuidv4();
  req.id = requestId;
  res.setHeader('X-Request-ID', requestId);
  next();
}

// Usage in logger
logger.info('Request received', { 
  requestId: req.id,
  method: req.method,
  path: req.path 
});
```

---

## 8. Rate Limiting Enhancement

```typescript
// server/middleware/rateLimiter.ts
import rateLimit from 'express-rate-limit';

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

export const formLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit form submissions
  message: 'Too many form submissions, please try again later.',
  skipSuccessfulRequests: true,
});
```

---

## 9. Database Connection Pooling

```typescript
// server/lib/database.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' 
    ? ['query', 'error', 'warn'] 
    : ['error'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});
```

---

## 10. Monitoring Dashboard (Simple)

```typescript
// api/metrics.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const metrics = {
    timestamp: new Date().toISOString(),
    system: {
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      cpu: process.cpuUsage(),
    },
    // Add custom metrics
    submissions: {
      today: await getTodaySubmissions(),
      thisWeek: await getWeekSubmissions(),
    },
  };

  res.json(metrics);
}
```

---

## Implementation Priority

1. **Week 1**: Error Tracking + Logging + Health Checks
2. **Week 2**: CI/CD + Security Headers
3. **Week 3**: Testing Setup
4. **Week 4**: Performance Optimization

**Start with these 10 implementations - they provide the foundation for everything else!**

