# Repository Analysis Script
# Run this from the smartpro-docs directory

Write-Host "=== Analyzing Repositories ===" -ForegroundColor Green
Write-Host ""

$contractPath = "C:\Users\HP\Documents\GitHub\Contract-Management-System"
$businessPath = "C:\Users\HP\Documents\GitHub\business-services-hub"

# Check Contract-Management-System
Write-Host "=== Contract-Management-System ===" -ForegroundColor Yellow
if (Test-Path $contractPath) {
    Write-Host "✓ Repository exists" -ForegroundColor Green
    
    # Check for app directory
    if (Test-Path "$contractPath\app") {
        Write-Host "  Found: app/ directory" -ForegroundColor Cyan
        Get-ChildItem "$contractPath\app" -Directory | ForEach-Object { Write-Host "    - $($_.Name)" }
    }
    
    # Check for src/app directory
    if (Test-Path "$contractPath\src\app") {
        Write-Host "  Found: src/app/ directory" -ForegroundColor Cyan
        Get-ChildItem "$contractPath\src\app" -Directory | ForEach-Object { Write-Host "    - $($_.Name)" }
    }
    
    # Check for pages directory
    if (Test-Path "$contractPath\pages") {
        Write-Host "  Found: pages/ directory" -ForegroundColor Cyan
        Get-ChildItem "$contractPath\pages" -Directory | ForEach-Object { Write-Host "    - $($_.Name)" }
    }
    
    # Check for components
    if (Test-Path "$contractPath\components") {
        Write-Host "  Found: components/ directory" -ForegroundColor Cyan
        Get-ChildItem "$contractPath\components" -Directory | ForEach-Object { Write-Host "    - $($_.Name)" }
    }
    
    # Check for lib
    if (Test-Path "$contractPath\lib") {
        Write-Host "  Found: lib/ directory" -ForegroundColor Cyan
        Get-ChildItem "$contractPath\lib" -Directory | ForEach-Object { Write-Host "    - $($_.Name)" }
    }
    
    # Check for supabase
    if (Test-Path "$contractPath\supabase") {
        Write-Host "  Found: supabase/ directory" -ForegroundColor Cyan
    }
} else {
    Write-Host "✗ Repository not found at: $contractPath" -ForegroundColor Red
}

Write-Host ""

# Check business-services-hub
Write-Host "=== business-services-hub ===" -ForegroundColor Yellow
if (Test-Path $businessPath) {
    Write-Host "✓ Repository exists" -ForegroundColor Green
    
    # Check for app directory
    if (Test-Path "$businessPath\app") {
        Write-Host "  Found: app/ directory" -ForegroundColor Cyan
        Get-ChildItem "$businessPath\app" -Directory | ForEach-Object { Write-Host "    - $($_.Name)" }
    }
    
    # Check for src/app directory
    if (Test-Path "$businessPath\src\app") {
        Write-Host "  Found: src/app/ directory" -ForegroundColor Cyan
        Get-ChildItem "$businessPath\src\app" -Directory | ForEach-Object { Write-Host "    - $($_.Name)" }
    }
    
    # Check for pages directory
    if (Test-Path "$businessPath\pages") {
        Write-Host "  Found: pages/ directory" -ForegroundColor Cyan
        Get-ChildItem "$businessPath\pages" -Directory | ForEach-Object { Write-Host "    - $($_.Name)" }
    }
    
    # Check for components
    if (Test-Path "$businessPath\components") {
        Write-Host "  Found: components/ directory" -ForegroundColor Cyan
        Get-ChildItem "$businessPath\components" -Directory | ForEach-Object { Write-Host "    - $($_.Name)" }
    }
    
    # Check for lib
    if (Test-Path "$businessPath\lib") {
        Write-Host "  Found: lib/ directory" -ForegroundColor Cyan
        Get-ChildItem "$businessPath\lib" -Directory | ForEach-Object { Write-Host "    - $($_.Name)" }
    }
    
    # Check for supabase
    if (Test-Path "$businessPath\supabase") {
        Write-Host "  Found: supabase/ directory" -ForegroundColor Cyan
    }
} else {
    Write-Host "✗ Repository not found at: $businessPath" -ForegroundColor Red
}

Write-Host ""
Write-Host "=== Analysis Complete ===" -ForegroundColor Green
Write-Host "Next: Review the output above and document findings in FEATURE_COMPARISON.md"

