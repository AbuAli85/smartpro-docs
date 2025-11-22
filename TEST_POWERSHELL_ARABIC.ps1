# PowerShell Test Script for Make.com Webhook - Arabic

# Test 2: Arabic Submission
$arabicPayload = @{
    form_type = "consultation"
    request_id = "test_ar_$(Get-Date -Format 'yyyyMMddHHmmss')"
    timestamp = (Get-Date -Format "yyyy-MM-ddTHH:mm:ss.fffZ")
    client_name = "أحمد محمد"
    email = "YOUR_EMAIL@example.com"  # Replace with your email
    phone = "+96898765432"
    business_name = "شركة تجريبية"
    business_type = "شركة"
    service_interested = "Company Formation"
    service_interested_translated = "تأسيس الشركات"
    services_summary = "تأسيس الشركات"
    budget = "5,000 - 10,000 دولار"
    timeline = "3-6 أشهر"
    preferred_contact = "البريد الإلكتروني"
    preferred_time = "الصباح"
    location = "مسقط"
    primary_message = "رسالة تجريبية"
    language = "ar"
    source = "smartpro-consultation-form"
    notes = "Test Arabic submission"
} | ConvertTo-Json -Depth 10

Write-Host "Testing Arabic submission..." -ForegroundColor Cyan
Write-Host "Payload: $arabicPayload" -ForegroundColor Gray

try {
    $response = Invoke-WebRequest -Uri "https://hook.eu2.make.com/z9t0f5eqipopdg368eypl5i9eo7kpbu8" `
        -Method POST `
        -ContentType "application/json; charset=utf-8" `
        -Body $arabicPayload
    
    Write-Host "✅ Success! Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Response: $($response.Content)" -ForegroundColor Gray
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`nCheck Make.com, Google Sheets, and your email!" -ForegroundColor Yellow

