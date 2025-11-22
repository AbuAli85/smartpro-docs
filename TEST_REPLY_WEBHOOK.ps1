# PowerShell Test Script for Reply Webhook

# Test: Email Reply Simulation
$replyPayload = @{
    form_type = "reply"
    reply_from = "test@example.com"
    original_email = "test@example.com"
    message = "Thank you! I would like to schedule a consultation call. Please let me know your availability."
    reply_timestamp = (Get-Date -Format "yyyy-MM-ddTHH:mm:ss.fffZ")
    subject = "Re: Thank You for Your Consultation Request"
    language = "en"
    submission_id = "test_en_$(Get-Date -Format 'yyyyMMddHHmmss')"
} | ConvertTo-Json

Write-Host "Testing Reply Webhook..." -ForegroundColor Cyan
Write-Host "Webhook URL: https://hook.eu2.make.com/rfga1pfnupvuxid3jifrzrpb2n25zch9" -ForegroundColor Gray
Write-Host "Payload: $replyPayload" -ForegroundColor Gray
Write-Host ""

try {
    $response = Invoke-WebRequest -Uri "https://hook.eu2.make.com/rfga1pfnupvuxid3jifrzrpb2n25zch9" `
        -Method POST `
        -ContentType "application/json" `
        -Body $replyPayload
    
    Write-Host "✅ Success! Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Response: $($response.Content)" -ForegroundColor Gray
    
    if ($response.Content -eq "Accepted") {
        Write-Host "`n✅ Webhook is active and receiving requests!" -ForegroundColor Green
        Write-Host "Check Make.com for execution (if scenario is configured)." -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
    
    if ($_.Exception.Response) {
        $statusCode = $_.Exception.Response.StatusCode.value__
        Write-Host "Status Code: $statusCode" -ForegroundColor Red
    }
}

Write-Host "`nNote: This webhook is for email replies." -ForegroundColor Cyan
Write-Host "Make sure your Make.com scenario is configured to handle reply data." -ForegroundColor Yellow

