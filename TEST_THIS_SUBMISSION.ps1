# Quick Test: Reply to Specific Submission
# Submission: 2025-11-23T17:19:48.253Z
# Email: luxsess2001@gmail.com

$webhookUrl = "https://hook.eu2.make.com/7e5ad8omhcmu8gcn1794m60d476fqqy8"
$testEmail = "luxsess2001@gmail.com"

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Testing Reply for Submission" -ForegroundColor Cyan
Write-Host "Timestamp: 2025-11-23T17:19:48.253Z" -ForegroundColor Gray
Write-Host "Email: $testEmail" -ForegroundColor Gray
Write-Host "========================================`n" -ForegroundColor Cyan

# Test reply that answers the questions from the email
# Note: Make.com can handle both single objects and arrays
# The email service may send arrays, which Make.com processes automatically
$bodyObject = @{
    email = $testEmail
    message = "Thank you! I would like to register in Oman. My main business activity will be IT consulting services. I'm planning to set this up as a sole proprietorship initially."
    subject = "Re: Consultation Request"
    from = $testEmail
    body = "Thank you! I would like to register in Oman. My main business activity will be IT consulting services. I'm planning to set this up as a sole proprietorship initially."
    timestamp = (Get-Date -Format "yyyy-MM-ddTHH:mm:ss.fffZ")
}

# Convert to JSON - ensure it's a single object, not an array
$body = $bodyObject | ConvertTo-Json -Depth 10 -Compress

Write-Host "Payload being sent:" -ForegroundColor Cyan
Write-Host $body -ForegroundColor Gray
Write-Host ""

Write-Host "Sending reply..." -ForegroundColor Yellow
Write-Host "Reply Message: Thank you! I would like to register in Oman..." -ForegroundColor Gray
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
    Write-Host "2. Open Google Sheets → Find row with timestamp: 2025-11-23T17:19:48.253Z" -ForegroundColor White
    Write-Host "3. Verify updates:" -ForegroundColor White
    Write-Host "   - Column AD (29): client_replied = TRUE" -ForegroundColor Gray
    Write-Host "   - Column AE (30): client_replied_at = [timestamp]" -ForegroundColor Gray
    Write-Host "   - Column AF (31): notes = Reply: [message]" -ForegroundColor Gray
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
    
    # Handle HTTP error responses
    if ($_.Exception.Response) {
        $statusCode = $_.Exception.Response.StatusCode.value__
        Write-Host "HTTP Status Code: $statusCode" -ForegroundColor Yellow
        
        if ($statusCode -eq 410) {
            Write-Host "`n⚠️  WEBHOOK URL EXPIRED OR INVALID (410 Gone)" -ForegroundColor Yellow
            Write-Host "The webhook URL is no longer active. You need to:" -ForegroundColor White
            Write-Host "1. Go to Make.com → 'Email Reply Processing' scenario" -ForegroundColor Cyan
            Write-Host "2. Click on Module 1 (Custom Webhook)" -ForegroundColor Cyan
            Write-Host "3. Copy the NEW webhook URL" -ForegroundColor Cyan
            Write-Host "4. Update line 5 in this script with the new URL" -ForegroundColor Cyan
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

Write-Host "`n✅ Test completed!`n" -ForegroundColor Green

