# ============================================
# Script de Configuración para Windows 11
# Traductor Emberá-Español
# ============================================

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Configuración del Traductor Emberá-Español" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Verificar que Node.js está instalado
Write-Host "🔍 Verificando Node.js..." -ForegroundColor Yellow
$nodeVersion = node --version 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ ERROR: Node.js no está instalado o no está en el PATH" -ForegroundColor Red
    Write-Host "   Descarga Node.js desde: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}
Write-Host "   ✅ Node.js $nodeVersion detectado" -ForegroundColor Green
Write-Host ""

# Verificar que PostgreSQL está instalado
Write-Host "🔍 Verificando PostgreSQL..." -ForegroundColor Yellow
$psqlVersion = psql --version 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "   ⚠️  PostgreSQL no detectado en PATH" -ForegroundColor Yellow
    Write-Host "   Si ya instalaste PostgreSQL, agrégalo al PATH:" -ForegroundColor Yellow
    Write-Host "   C:\Program Files\PostgreSQL\16\bin" -ForegroundColor Cyan
    Write-Host ""
    $continue = Read-Host "¿Continuar de todos modos? (s/n)"
    if ($continue -ne "s" -and $continue -ne "S") {
        exit 1
    }
} else {
    Write-Host "   ✅ PostgreSQL detectado: $psqlVersion" -ForegroundColor Green
}
Write-Host ""

# Verificar si .env ya existe
if (Test-Path ".env") {
    Write-Host "⚠️  El archivo .env ya existe" -ForegroundColor Yellow
    $overwrite = Read-Host "¿Deseas sobrescribirlo? (s/n)"
    if ($overwrite -ne "s" -and $overwrite -ne "S") {
        Write-Host "❌ Configuración cancelada" -ForegroundColor Red
        exit 0
    }
}

# Copiar .env.windows a .env
Write-Host "📄 Creando archivo .env..." -ForegroundColor Yellow
Copy-Item -Path ".env.windows" -Destination ".env" -Force
Write-Host "   ✅ Archivo .env creado" -ForegroundColor Green
Write-Host ""

# Solicitar contraseña de PostgreSQL
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Configuración de PostgreSQL" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Ingresa la contraseña de PostgreSQL (usuario: postgres)" -ForegroundColor Yellow
$password = Read-Host "Contraseña" -AsSecureString
$passwordPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
    [Runtime.InteropServices.Marshal]::SecureStringToBSTR($password)
)

# Reemplazar TU_CONTRASEÑA en el archivo .env
$envContent = Get-Content ".env" -Raw
$envContent = $envContent -replace "TU_CONTRASEÑA", $passwordPlain
Set-Content ".env" -Value $envContent -NoNewline

Write-Host "   ✅ Contraseña configurada" -ForegroundColor Green
Write-Host ""

# Generar SESSION_SECRET
Write-Host "🔐 Generando SESSION_SECRET..." -ForegroundColor Yellow
$sessionSecret = node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
$envContent = Get-Content ".env" -Raw
$envContent = $envContent -replace "cambiar_esto_por_un_secreto_aleatorio_seguro", $sessionSecret
Set-Content ".env" -Value $envContent -NoNewline

Write-Host "   ✅ SESSION_SECRET generado" -ForegroundColor Green
Write-Host ""

# Validar configuración
Write-Host "🔍 Validando configuración..." -ForegroundColor Yellow
$envContent = Get-Content ".env" -Raw

if ($envContent -match "TU_CONTRASEÑA") {
    Write-Host "   ⚠️  Aún hay placeholders sin configurar" -ForegroundColor Yellow
}

if ($envContent -match "cambiar_esto_por_un_secreto_aleatorio_seguro") {
    Write-Host "   ⚠️  SESSION_SECRET no está configurado" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  ✅ Configuración Completada" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 Próximos pasos:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Crear la base de datos:" -ForegroundColor White
Write-Host "   psql -U postgres -c `"CREATE DATABASE traductor_embera;`"" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. Cargar los datos (264 palabras):" -ForegroundColor White
Write-Host "   psql -U postgres -d traductor_embera -f database_setup.sql" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. Iniciar el servidor:" -ForegroundColor White
Write-Host "   .\scripts\windows\dev.ps1" -ForegroundColor Cyan
Write-Host ""
Write-Host "4. Abrir en el navegador:" -ForegroundColor White
Write-Host "   http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
