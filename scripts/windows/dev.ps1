# ============================================
# Script de Desarrollo para Windows 11
# Traductor Embera-Espanol
# ============================================

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Iniciando Servidor de Desarrollo" -ForegroundColor Cyan
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
    Write-Host "   IMPORTANTE: Debes configurar la base de datos:" -ForegroundColor Yellow
    Write-Host "   1. Edita .env y configura PGPASSWORD=tu_contrasena" -ForegroundColor Cyan
    Write-Host "   2. Ejecuta: psql -U postgres -c ""CREATE DATABASE traductor_embera;""" -ForegroundColor Cyan
    Write-Host "   3. Ejecuta: psql -U postgres -d traductor_embera -f database_setup.sql" -ForegroundColor Cyan
    Write-Host ""
    $continue = Read-Host "Continuar de todos modos? (s/n)"
    if ($continue -ne "s" -and $continue -ne "S") {
        exit 0
    }
    Write-Host ""
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
    Write-Host "   OK HOST configurado a 127.0.0.1 (IPv4 para Windows)" -ForegroundColor Green
} else {
    Write-Host "   OK HOST ya esta en 127.0.0.1" -ForegroundColor Green
}
Write-Host ""

# Verificar que node_modules existe
if (-not (Test-Path "node_modules")) {
    Write-Host "ERROR: Las dependencias no estan instaladas" -ForegroundColor Red
    Write-Host ""
    Write-Host "Ejecuta primero:" -ForegroundColor Yellow
    Write-Host "   npm install" -ForegroundColor Cyan
    Write-Host ""
    exit 1
}

# Iniciar servidor con cross-env
Write-Host "Iniciando servidor en modo desarrollo..." -ForegroundColor Yellow
Write-Host ""
Write-Host "   Puerto: 5000" -ForegroundColor Cyan
Write-Host "   URL: http://127.0.0.1:5000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Presiona Ctrl+C para detener el servidor" -ForegroundColor Yellow
Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Ejecutar el servidor
npx cross-env NODE_ENV=development tsx server/index.ts
