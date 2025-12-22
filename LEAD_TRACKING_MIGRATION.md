# Lead Tracking Database Migration Guide

## Prisma Schema Update

The `Lead` model has been added to `prisma/schema.prisma`. You need to run a migration to create the table in your database.

## Migration Steps

### 1. Generate Migration

```bash
npx prisma migrate dev --name add_lead_tracking
```

This will:
- Create a new migration file
- Apply the migration to your database
- Generate the Prisma client with the new Lead model

### 2. Apply Migration (Production)

If you're deploying to production:

```bash
npx prisma migrate deploy
```

### 3. Generate Prisma Client

After migration, regenerate the Prisma client:

```bash
npx prisma generate
```

## Database Schema

The new `leads` table will have:

- `id` (String, Primary Key)
- `submissionId` (String, Unique) - Links to consultation submission
- `email` (String) - User email
- `currentStage` (String) - Current stage in funnel
- `stages` (String[]) - Array of completed stages
- `metadata` (Json) - Additional tracking data
- `source` (String) - Source of lead (default: "consultation_form")
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

### Indexes

- `email` - For email lookups
- `currentStage` - For stage filtering
- `submissionId` - For submission lookups
- `createdAt` - For time-based queries

## Verification

After migration, verify the table was created:

```sql
SELECT * FROM leads LIMIT 1;
```

Or using Prisma Studio:

```bash
npx prisma studio
```

## Rollback (If Needed)

If you need to rollback:

```bash
npx prisma migrate reset
```

**Warning**: This will drop all data. Use with caution in production.

## Testing

After migration, test the API endpoints:

```bash
# Track a lead
curl -X POST http://localhost:3001/api/leads/track \
  -H "Content-Type: application/json" \
  -d '{
    "submissionId": "test_123",
    "email": "test@example.com",
    "stage": "consultation_submitted"
  }'

# Get lead status
curl http://localhost:3001/api/leads/test_123
```

## Notes

- The migration is backward compatible
- Existing consultation submissions will continue to work
- New submissions will automatically create lead entries
- The system works even if Prisma is not available (mock mode)

