-- Email Reply Tracking System Database Schema

-- Submissions (from consultation form)
CREATE TABLE IF NOT EXISTS submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    timestamp TIMESTAMP NOT NULL,
    client_name VARCHAR(255),
    client_email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    business_name VARCHAR(255),
    business_type VARCHAR(100),
    service_type VARCHAR(100),
    budget_range VARCHAR(100),
    timeline VARCHAR(100),
    preferred_contact VARCHAR(50),
    preferred_time VARCHAR(50),
    location VARCHAR(255),
    message TEXT,
    submission_source VARCHAR(100),
    language VARCHAR(10),
    form_id VARCHAR(100),
    status VARCHAR(50) DEFAULT 'pending',
    initial_message TEXT,
    client_replied BOOLEAN DEFAULT FALSE,
    client_replied_at TIMESTAMP,
    provider_replied BOOLEAN DEFAULT FALSE,
    provider_replied_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Client Replies
CREATE TABLE IF NOT EXISTS client_replies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    submission_id UUID REFERENCES submissions(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(500),
    message TEXT NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Provider Replies
CREATE TABLE IF NOT EXISTS provider_replies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    submission_id UUID REFERENCES submissions(id) ON DELETE CASCADE,
    client_email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_submissions_email ON submissions(client_email);
CREATE INDEX IF NOT EXISTS idx_submissions_timestamp ON submissions(timestamp);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON submissions(status);
CREATE INDEX IF NOT EXISTS idx_client_replies_email ON client_replies(email);
CREATE INDEX IF NOT EXISTS idx_client_replies_submission ON client_replies(submission_id);
CREATE INDEX IF NOT EXISTS idx_provider_replies_submission ON provider_replies(submission_id);

