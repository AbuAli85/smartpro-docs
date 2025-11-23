# Email Reply Webhook Test Script
# Webhook: Receive Email Reply Data
# URL: https://hook.eu2.make.com/7e5ad8omhcmu8gcn1794m60d476fqqy8

$webhookUrl = "https://hook.eu2.make.com/7e5ad8omhcmu8gcn1794m60d476fqqy8"
$testEmail = "luxsess2001@gmail.com"  # Change this to an email that exists in your Google Sheets

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Email Reply Webhook Test" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Webhook URL: $webhookUrl" -ForegroundColor Gray
Write-Host "Test Email: $testEmail" -ForegroundColor Gray
Write-Host ""
Write-Host "⚠️  IMPORTANT: Make sure '$testEmail' exists in Google Sheets!" -ForegroundColor Yellow
Write-Host "   (Submit a form with this email, or add it manually)" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press any key to continue or Ctrl+C to cancel..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Test data
$body = @{
    email = $testEmail
    from = $testEmail
    message = "Test reply message - $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
    body = "Test reply message - $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
    subject = "Re: Consultation Request"
    timestamp = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ssZ")
} | ConvertTo-Json

try {
    Write-Host ""
    Write-Host "Sending test data to webhook..." -ForegroundColor Cyan
    Write-Host ""
    
    $response = Invoke-WebRequest -Uri $webhookUrl `
        -Method POST `
        -ContentType "application/json" `
        -Body $body `
        -ErrorAction Stop

    Write-Host "✅ SUCCESS!" -ForegroundColor Green
    Write-Host "Status Code: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Response: $($response.Content)" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "Next Steps:" -ForegroundColor Yellow
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "1. Open Make.com → Scenarios → 'Email Reply Processing'" -ForegroundColor White
    Write-Host "2. Check 'Execution history' - should show new execution" -ForegroundColor White
    Write-Host "3. Open Google Sheets → 'Smartpro Leads' → 'leads' sheet" -ForegroundColor White
    Write-Host "4. Find row with email: $testEmail" -ForegroundColor White
    Write-Host "5. Verify updates:" -ForegroundColor White
    Write-Host "   - Column AD (29): Should be 'TRUE'" -ForegroundColor Gray
    Write-Host "   - Column AE (30): Should have timestamp" -ForegroundColor Gray
    Write-Host "   - Column AF (31): Should contain reply message" -ForegroundColor Gray
    Write-Host ""
}
catch {
    Write-Host ""
    Write-Host "❌ ERROR!" -ForegroundColor Red
    Write-Host "Error Message: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "Response Body: $responseBody" -ForegroundColor Red
    }
    Write-Host ""
    Write-Host "Troubleshooting:" -ForegroundColor Yellow
    Write-Host "1. Check webhook URL is correct" -ForegroundColor White
    Write-Host "2. Verify scenario is ON/active in Make.com" -ForegroundColor White
    Write-Host "3. Check internet connection" -ForegroundColor White
}

Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

