# PowerShell Test Script for Make.com Webhook

# Test 1: English Submission
$englishPayload = @{
    form_type = "consultation"
    request_id = "test_en_$(Get-Date -Format 'yyyyMMddHHmmss')"
    timestamp = (Get-Date -Format "yyyy-MM-ddTHH:mm:ss.fffZ")
    client_name = "Test User"
    email = "luxsess2001@gmail.com"  # Replace with your email
    phone = "+96812345678"
    business_name = "Test Business"
    business_type = "Corporation"
    service_interested = "Company Formation"
    service_interested_translated = "Company Formation"
    services_summary = "Company Formation"
    budget = "`$5,000 - `$10,000"
    timeline = "3-6 months"
    preferred_contact = "Email"
    preferred_time = "Morning"
    location = "Muscat"
    primary_message = "Test message"
    language = "en"
    source = "smartpro-consultation-form"
    notes = "Test submission"
} | ConvertTo-Json

Write-Host "Testing English submission..." -ForegroundColor Cyan
Write-Host "Payload: $englishPayload" -ForegroundColor Gray

try {
    $response = Invoke-WebRequest -Uri "https://hook.eu2.make.com/z9t0f5eqipopdg368eypl5i9eo7kpbu8" `
        -Method POST `
        -ContentType "application/json" `
        -Body $englishPayload
    
    Write-Host "✅ Success! Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Response: $($response.Content)" -ForegroundColor Gray
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`nCheck Make.com, Google Sheets, and your email!" -ForegroundColor Yellow

