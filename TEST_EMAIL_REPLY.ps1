# PowerShell Test Script for Email Reply Processing Webhook
# Tests the Make.com scenario that processes email replies and updates Google Sheets

# ============================================================================
# CONFIGURATION
# ============================================================================

# Webhook URL - Verified working: 2025-11-23
# Get from: Make.com → "Email Reply Processing" → Module 1 (Custom Webhook)
$webhookUrl = "https://hook.eu2.make.com/7e5ad8omhcmu8gcn1794m60d476fqqy8"

# Test email - Must exist in Google Sheets column C for the test to work
$testEmail = "luxsess2001@gmail.com"  # Replace with an email that exists in your Google Sheets

# ============================================================================
# TEST 1: Basic Email Reply
# ============================================================================

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "TEST 1: Basic Email Reply" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

$test1Payload = @{
    email = $testEmail
    message = "Thank you for your email! I would like to schedule a call to discuss further."
    subject = "Re: Consultation Request"
    from = $testEmail
    body = "Thank you for your email! I would like to schedule a call to discuss further."
    timestamp = (Get-Date -Format "yyyy-MM-ddTHH:mm:ss.fffZ")
} | ConvertTo-Json -Depth 10

Write-Host "Payload:" -ForegroundColor Yellow
Write-Host $test1Payload -ForegroundColor Gray
Write-Host ""

try {
    $response = Invoke-WebRequest -Uri $webhookUrl `
        -Method POST `
        -ContentType "application/json" `
        -Body $test1Payload `
        -ErrorAction Stop
    
    Write-Host "✅ Success! Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Response: $($response.Content)" -ForegroundColor Gray
    Write-Host "`nExpected Result:" -ForegroundColor Yellow
    Write-Host "  - Google Sheets row with email '$testEmail' should be updated:" -ForegroundColor White
    Write-Host "    • Column AD (29): client_replied = TRUE" -ForegroundColor White
    Write-Host "    • Column AE (30): client_replied_at = current timestamp" -ForegroundColor White
    Write-Host "    • Column AF (31): notes should contain 'Reply: [message]'" -ForegroundColor White
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "Response Body: $responseBody" -ForegroundColor Red
    }
}

# ============================================================================
# TEST 2: Email Reply with Existing Notes
# ============================================================================

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "TEST 2: Email Reply with Existing Notes" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

$test2Payload = @{
    email = $testEmail
    message = "This is a follow-up reply. I have additional questions about the service."
    subject = "Re: Consultation Request"
    from = $testEmail
    body = "This is a follow-up reply. I have additional questions about the service."
    timestamp = (Get-Date -Format "yyyy-MM-ddTHH:mm:ss.fffZ")
} | ConvertTo-Json -Depth 10

Write-Host "Payload:" -ForegroundColor Yellow
Write-Host $test2Payload -ForegroundColor Gray
Write-Host ""

try {
    $response = Invoke-WebRequest -Uri $webhookUrl `
        -Method POST `
        -ContentType "application/json" `
        -Body $test2Payload `
        -ErrorAction Stop
    
    Write-Host "✅ Success! Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Response: $($response.Content)" -ForegroundColor Gray
    Write-Host "`nExpected Result:" -ForegroundColor Yellow
    Write-Host "  - Notes field should append new reply (preserving existing notes)" -ForegroundColor White
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
}

# ============================================================================
# TEST 3: Case-Insensitive Email Matching
# ============================================================================

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "TEST 3: Case-Insensitive Email Matching" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Test with different case
$testEmailUpper = $testEmail.ToUpper()

$test3Payload = @{
    email = $testEmailUpper
    message = "Testing case-insensitive email matching."
    subject = "Re: Consultation Request"
    from = $testEmailUpper
    body = "Testing case-insensitive email matching."
    timestamp = (Get-Date -Format "yyyy-MM-ddTHH:mm:ss.fffZ")
} | ConvertTo-Json -Depth 10

Write-Host "Payload (Email in UPPERCASE):" -ForegroundColor Yellow
Write-Host $test3Payload -ForegroundColor Gray
Write-Host ""

try {
    $response = Invoke-WebRequest -Uri $webhookUrl `
        -Method POST `
        -ContentType "application/json" `
        -Body $test3Payload `
        -ErrorAction Stop
    
    Write-Host "✅ Success! Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Response: $($response.Content)" -ForegroundColor Gray
    Write-Host "`nExpected Result:" -ForegroundColor Yellow
    Write-Host "  - Should still match the row (case-insensitive matching)" -ForegroundColor White
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
}

# ============================================================================
# TEST 4: Email with Whitespace
# ============================================================================

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "TEST 4: Email with Whitespace" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Test with whitespace
$testEmailWithSpace = "  $testEmail  "

$test4Payload = @{
    email = $testEmailWithSpace
    message = "Testing email with leading/trailing whitespace."
    subject = "Re: Consultation Request"
    from = $testEmailWithSpace
    body = "Testing email with leading/trailing whitespace."
    timestamp = (Get-Date -Format "yyyy-MM-ddTHH:mm:ss.fffZ")
} | ConvertTo-Json -Depth 10

Write-Host "Payload (Email with whitespace):" -ForegroundColor Yellow
Write-Host $test4Payload -ForegroundColor Gray
Write-Host ""

try {
    $response = Invoke-WebRequest -Uri $webhookUrl `
        -Method POST `
        -ContentType "application/json" `
        -Body $test4Payload `
        -ErrorAction Stop
    
    Write-Host "✅ Success! Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Response: $($response.Content)" -ForegroundColor Gray
    Write-Host "`nExpected Result:" -ForegroundColor Yellow
    Write-Host "  - Should still match the row (trim() function handles whitespace)" -ForegroundColor White
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
}

# ============================================================================
# TEST 5: Non-Existent Email (Should Not Find Row)
# ============================================================================

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "TEST 5: Non-Existent Email" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

$nonExistentEmail = "nonexistent@example.com"

$test5Payload = @{
    email = $nonExistentEmail
    message = "This email does not exist in Google Sheets."
    subject = "Re: Consultation Request"
    from = $nonExistentEmail
    body = "This email does not exist in Google Sheets."
    timestamp = (Get-Date -Format "yyyy-MM-ddTHH:mm:ss.fffZ")
} | ConvertTo-Json -Depth 10

Write-Host "Payload (Non-existent email):" -ForegroundColor Yellow
Write-Host $test5Payload -ForegroundColor Gray
Write-Host ""

try {
    $response = Invoke-WebRequest -Uri $webhookUrl `
        -Method POST `
        -ContentType "application/json" `
        -Body $test5Payload `
        -ErrorAction Stop
    
    Write-Host "⚠️  Request succeeded, but check Make.com execution:" -ForegroundColor Yellow
    Write-Host "  - Module 2 should return no results" -ForegroundColor White
    Write-Host "  - Module 3 may fail or skip (no row to update)" -ForegroundColor White
    Write-Host "  - Check Make.com execution logs for details" -ForegroundColor White
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "`nThis is expected if the scenario handles missing rows gracefully." -ForegroundColor Yellow
}

# ============================================================================
# SUMMARY
# ============================================================================

Write-Host "`n========================================" -ForegroundColor Green
Write-Host "TEST SUMMARY" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Green

Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "1. Check Make.com scenario execution history" -ForegroundColor White
Write-Host "2. Verify Google Sheets updates:" -ForegroundColor White
Write-Host "   - Open: Smartpro Leads spreadsheet" -ForegroundColor Gray
Write-Host "   - Sheet: 'leads'" -ForegroundColor Gray
Write-Host "   - Find row with email: $testEmail" -ForegroundColor Gray
Write-Host "   - Check columns AD, AE, AF for updates" -ForegroundColor Gray
Write-Host "3. Review any errors in Make.com execution logs" -ForegroundColor White
Write-Host "4. Verify webhook URL is correct in this script" -ForegroundColor White

Write-Host "`nColumn Reference:" -ForegroundColor Yellow
Write-Host "  - Column AD (29): client_replied" -ForegroundColor White
Write-Host "  - Column AE (30): client_replied_at" -ForegroundColor White
Write-Host "  - Column AF (31): notes" -ForegroundColor White

Write-Host "`n✅ All tests completed!`n" -ForegroundColor Green

