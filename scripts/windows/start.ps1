# ============================================
# Script de Produccion para Windows 11
# Traductor Embera-Espanol
# ============================================

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Iniciando Servidor de Produccion" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Verificar que .env existe, si no, crearlo automaticamente
if (-not (Test-Path ".env")) {
    Write-Host "El archivo .env no existe. Creandolo automaticamente..." -ForegroundColor Yellow
    Write-Host ""
    
    # Copiar .env.windows a .env
    Copy-Item -Path ".env.windows" -Destination ".env" -Force
    
    Write-Host "   OK Archivo .env creado" -ForegroundColor Green
    Write-Host ""
    Write-Host "   IMPORTANTE: Configura PostgreSQL en .env antes de continuar" -ForegroundColor Yellow
    Write-Host ""
    exit 0
}

# SIEMPRE normalizar HOST=127.0.0.1 en .env (incluso si ya existe)
Write-Host "Verificando configuracion de HOST..." -ForegroundColor Yellow
$envContent = Get-Content ".env" -Raw
$hostChanged = $false

# Usar regex anclado para solo coincidir con lineas que EMPIEZAN con HOST=
# Esto evita tocar PGHOST, REDIS_HOST, etc.
if ($envContent -match "(?m)^HOST=(?!127\.0\.0\.1).*") {
    # HOST existe pero NO es 127.0.0.1, corregirlo
    $envContent = $envContent -replace "(?m)^HOST=.*", "HOST=127.0.0.1"
    $hostChanged = $true
} elseif (-not ($envContent -match "(?m)^HOST=")) {
    # HOST no existe, agregarlo
    $envContent = $envContent + "`nHOST=127.0.0.1`n"
    $hostChanged = $true
}

if ($hostChanged) {
    Set-Content ".env" -Value $envContent -NoNewline
    Write-Host "   OK HOST corregido a 127.0.0.1 (IPv4 para Windows)" -ForegroundColor Green
} else {
    Write-Host "   OK HOST ya esta en 127.0.0.1" -ForegroundColor Green
}
Write-Host ""

# Verificar que dist existe
if (-not (Test-Path "dist")) {
    Write-Host "ERROR: El proyecto no ha sido compilado" -ForegroundColor Red
    Write-Host ""
    Write-Host "Ejecuta primero:" -ForegroundColor Yellow
    Write-Host "   npm run build" -ForegroundColor Cyan
    Write-Host ""
    exit 1
}

# Iniciar servidor con cross-env
Write-Host "Iniciando servidor en modo produccion..." -ForegroundColor Yellow
Write-Host ""
Write-Host "   Puerto: 5000" -ForegroundColor Cyan
Write-Host "   URL: http://127.0.0.1:5000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Presiona Ctrl+C para detener el servidor" -ForegroundColor Yellow
Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Ejecutar el servidor
npx cross-env NODE_ENV=production node dist/index.js
