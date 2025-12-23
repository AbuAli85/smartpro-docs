-- ============================================================
-- VERIFY CONSULTATION SYSTEM IS SAVING DATA
-- ============================================================
-- Run this after submitting a consultation form to check if it saved
-- ============================================================

-- Check recent consultation submissions
SELECT 
    '=== RECENT CONSULTATIONS ===' AS check_type,
    submission_id,
    name,
    email,
    primary_service,
    status,
    webhook_sent,
    created_at
FROM consultation_submissions
ORDER BY created_at DESC
LIMIT 10;

-- Check recent leads
SELECT 
    '=== RECENT LEADS ===' AS check_type,
    submission_id,
    email,
    current_stage,
    stages,
    created_at
FROM leads
ORDER BY created_at DESC
LIMIT 10;

-- Summary counts
SELECT 
    '=== SUMMARY ===' AS check_type,
    COUNT(*) AS total_consultations,
    COUNT(CASE WHEN webhook_sent = true THEN 1 END) AS webhooks_sent,
    COUNT(CASE WHEN status = 'pending' THEN 1 END) AS pending,
    COUNT(CASE WHEN status = 'contacted' THEN 1 END) AS contacted
FROM consultation_submissions;

-- Check if consultation and lead are linked
SELECT 
    '=== LINKED CONSULTATIONS & LEADS ===' AS check_type,
    cs.submission_id,
    cs.name,
    cs.email,
    cs.status AS consultation_status,
    l.current_stage AS lead_stage,
    l.stages AS lead_stages
FROM consultation_submissions cs
LEFT JOIN leads l ON cs.submission_id = l.submission_id
ORDER BY cs.created_at DESC
LIMIT 10;

