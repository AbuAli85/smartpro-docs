# PowerShell Test Script for Provider Reply Processing Webhook
# Tests the Make.com scenario that processes provider replies and updates Google Sheets

# ============================================================================
# CONFIGURATION
# ============================================================================

# Webhook URL for Provider Reply Processing
$webhookUrl = "https://hook.eu2.make.com/42ip7sz3mon9lhdoetjhegohkbggsm72"

# Client email - Must exist in Google Sheets column C for the test to work
$clientEmail = "luxsess2001@gmail.com"  # Replace with a client email that exists in your Google Sheets

# Provider email - The email address of the provider sending the reply
$providerEmail = "provider@smartpro.io"  # Replace with your provider email

# ============================================================================
# TEST 1: Basic Provider Reply
# ============================================================================

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "TEST 1: Basic Provider Reply" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

$test1Payload = @{
    email = $clientEmail  # Client's email (to find the row)
    from = $providerEmail  # Provider's email (who sent the reply)
    message = "Thank you for your inquiry. We'd be happy to help you with company formation in Oman. Let's schedule a call to discuss your requirements in detail."
    subject = "Re: Consultation Request"
    body = "Thank you for your inquiry. We'd be happy to help you with company formation in Oman. Let's schedule a call to discuss your requirements in detail."
    timestamp = (Get-Date -Format "yyyy-MM-ddTHH:mm:ss.fffZ")
}

# Convert to JSON - ensure it's a single object, not an array
$body = $test1Payload | ConvertTo-Json -Depth 10 -Compress

Write-Host "Payload being sent:" -ForegroundColor Cyan
Write-Host $body -ForegroundColor Gray
Write-Host ""

Write-Host "Sending provider reply..." -ForegroundColor Yellow
Write-Host "Client Email: $clientEmail" -ForegroundColor Gray
Write-Host "Provider Email: $providerEmail" -ForegroundColor Gray
Write-Host "Message: Thank you for your inquiry..." -ForegroundColor Gray
Write-Host ""

try {
    $response = Invoke-WebRequest -Uri $webhookUrl `
        -Method POST `
        -ContentType "application/json" `
        -Body $body `
        -ErrorAction Stop
    
    Write-Host "✅ Success! Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Response: $($response.Content)" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Next Steps:" -ForegroundColor Yellow
    Write-Host "1. Check Make.com execution history" -ForegroundColor White
    Write-Host "2. Open Google Sheets → Find row with client email: $clientEmail" -ForegroundColor White
    Write-Host "3. Verify updates:" -ForegroundColor White
    Write-Host "   - Column AG (32): provider_replied = TRUE" -ForegroundColor Gray
    Write-Host "   - Column AH (33): provider_replied_at = [timestamp]" -ForegroundColor Gray
    Write-Host "   - Column AI (34): provider_reply_message = [message]" -ForegroundColor Gray
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
    
    # Handle HTTP error responses
    if ($_.Exception.Response) {
        $statusCode = $_.Exception.Response.StatusCode.value__
        Write-Host "HTTP Status Code: $statusCode" -ForegroundColor Yellow
        
        if ($statusCode -eq 410) {
            Write-Host "`n⚠️  WEBHOOK URL EXPIRED OR INVALID (410 Gone)" -ForegroundColor Yellow
            Write-Host "The webhook URL is no longer active. You need to:" -ForegroundColor White
            Write-Host "1. Go to Make.com → 'Provider Reply Processing' scenario" -ForegroundColor Cyan
            Write-Host "2. Click on Module 1 (Custom Webhook)" -ForegroundColor Cyan
            Write-Host "3. Copy the NEW webhook URL" -ForegroundColor Cyan
            Write-Host "4. Update line 7 in this script with the new URL" -ForegroundColor Cyan
            Write-Host "`nCurrent URL (expired): $webhookUrl" -ForegroundColor Gray
        } elseif ($statusCode -eq 404) {
            Write-Host "`n⚠️  WEBHOOK NOT FOUND (404)" -ForegroundColor Yellow
            Write-Host "The webhook URL doesn't exist. Check the URL in Make.com." -ForegroundColor White
        } else {
            Write-Host "`nResponse Status: $statusCode" -ForegroundColor Yellow
        }
        
        # Try to read response body if available
        try {
            $stream = $_.Exception.Response.GetResponseStream()
            $reader = New-Object System.IO.StreamReader($stream)
            $responseBody = $reader.ReadToEnd()
            if ($responseBody) {
                Write-Host "Response: $responseBody" -ForegroundColor Gray
            }
        } catch {
            # Ignore if we can't read the response
        }
    }
}

# ============================================================================
# TEST 2: Provider Reply with Detailed Information
# ============================================================================

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "TEST 2: Provider Reply with Details" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

$test2Payload = @{
    email = $clientEmail
    from = $providerEmail
    message = "Thank you for your interest in our Company Formation services. Based on your requirements, we recommend setting up as a Limited Liability Company (LLC) in Oman. The process typically takes 2-3 weeks. Would you like to schedule a consultation call?"
    subject = "Re: Consultation Request - Company Formation"
    body = "Thank you for your interest in our Company Formation services. Based on your requirements, we recommend setting up as a Limited Liability Company (LLC) in Oman. The process typically takes 2-3 weeks. Would you like to schedule a consultation call?"
    timestamp = (Get-Date -Format "yyyy-MM-ddTHH:mm:ss.fffZ")
}

$body2 = $test2Payload | ConvertTo-Json -Depth 10 -Compress

Write-Host "Sending detailed provider reply..." -ForegroundColor Yellow
Write-Host ""

try {
    $response = Invoke-WebRequest -Uri $webhookUrl `
        -Method POST `
        -ContentType "application/json" `
        -Body $body2 `
        -ErrorAction Stop
    
    Write-Host "✅ Success! Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Response: $($response.Content)" -ForegroundColor Gray
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
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
Write-Host "   - Find row with client email: $clientEmail" -ForegroundColor Gray
Write-Host "   - Check columns AG, AH, AI for updates" -ForegroundColor Gray
Write-Host "3. Review any errors in Make.com execution logs" -ForegroundColor White
Write-Host "4. Verify webhook URL is correct in this script" -ForegroundColor White

Write-Host "`nColumn Reference:" -ForegroundColor Yellow
Write-Host "  - Column AG (32): provider_replied" -ForegroundColor White
Write-Host "  - Column AH (33): provider_replied_at" -ForegroundColor White
Write-Host "  - Column AI (34): provider_reply_message" -ForegroundColor White

Write-Host "`n✅ All tests completed!`n" -ForegroundColor Green

