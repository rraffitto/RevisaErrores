# ============================================
# Script de Configuracion para Windows 11
# Traductor Embera-Espanol
# ============================================

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Configuracion del Traductor Embera-Espanol" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Verificar que Node.js esta instalado
Write-Host "Verificando Node.js..." -ForegroundColor Yellow
$nodeVersion = node --version 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Node.js no esta instalado o no esta en el PATH" -ForegroundColor Red
    Write-Host "Descarga Node.js desde: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}
Write-Host "   OK Node.js $nodeVersion detectado" -ForegroundColor Green
Write-Host ""

# Verificar que PostgreSQL esta instalado
Write-Host "Verificando PostgreSQL..." -ForegroundColor Yellow
$psqlVersion = psql --version 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "   PostgreSQL no detectado en PATH" -ForegroundColor Yellow
    Write-Host "   Si ya instalaste PostgreSQL, agregalo al PATH:" -ForegroundColor Yellow
    Write-Host "   C:\Program Files\PostgreSQL\16\bin" -ForegroundColor Cyan
    Write-Host ""
    $continue = Read-Host "Continuar de todos modos? (s/n)"
    if ($continue -ne "s" -and $continue -ne "S") {
        exit 1
    }
} else {
    Write-Host "   OK PostgreSQL detectado: $psqlVersion" -ForegroundColor Green
}
Write-Host ""

# Verificar si .env ya existe
if (Test-Path ".env") {
    Write-Host "El archivo .env ya existe" -ForegroundColor Yellow
    $overwrite = Read-Host "Deseas sobrescribirlo? (s/n)"
    if ($overwrite -ne "s" -and $overwrite -ne "S") {
        Write-Host "Configuracion cancelada" -ForegroundColor Red
        exit 0
    }
}

# Copiar .env.windows a .env
Write-Host "Creando archivo .env..." -ForegroundColor Yellow
Copy-Item -Path ".env.windows" -Destination ".env" -Force

# FORZAR HOST=127.0.0.1 para Windows (sobrescribir cualquier valor existente)
$envContent = Get-Content ".env" -Raw
if ($envContent -match "(?m)^HOST=.*") {
    # Reemplazar HOST existente (solo lineas que EMPIEZAN con HOST=)
    $envContent = $envContent -replace "(?m)^HOST=.*", "HOST=127.0.0.1"
} else {
    # Agregar HOST si no existe
    $envContent = $envContent + "`nHOST=127.0.0.1`n"
}
Set-Content ".env" -Value $envContent -NoNewline

Write-Host "   OK Archivo .env creado con HOST=127.0.0.1" -ForegroundColor Green
Write-Host ""

# Solicitar contrasena de PostgreSQL
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Configuracion de PostgreSQL" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Ingresa la contrasena de PostgreSQL (usuario: postgres)" -ForegroundColor Yellow
$password = Read-Host "Contrasena" -AsSecureString
$passwordPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
    [Runtime.InteropServices.Marshal]::SecureStringToBSTR($password)
)

# Reemplazar TU_CONTRASENA en el archivo .env
$envContent = Get-Content ".env" -Raw
$envContent = $envContent -replace "TU_CONTRASENA", $passwordPlain
Set-Content ".env" -Value $envContent -NoNewline

Write-Host "   OK Contrasena configurada" -ForegroundColor Green
Write-Host ""

# Generar SESSION_SECRET
Write-Host "Generando SESSION_SECRET..." -ForegroundColor Yellow
$sessionSecret = node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
$envContent = Get-Content ".env" -Raw
$envContent = $envContent -replace "cambiar_esto_por_un_secreto_aleatorio_seguro", $sessionSecret
Set-Content ".env" -Value $envContent -NoNewline

Write-Host "   OK SESSION_SECRET generado" -ForegroundColor Green
Write-Host ""

# Validar configuracion
Write-Host "Validando configuracion..." -ForegroundColor Yellow
$envContent = Get-Content ".env" -Raw

if ($envContent -match "TU_CONTRASENA") {
    Write-Host "   Aun hay placeholders sin configurar" -ForegroundColor Yellow
}

if ($envContent -match "cambiar_esto_por_un_secreto_aleatorio_seguro") {
    Write-Host "   SESSION_SECRET no esta configurado" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  OK Configuracion Completada" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Proximos pasos:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Crear la base de datos:" -ForegroundColor White
Write-Host "   psql -U postgres -c ""CREATE DATABASE traductor_embera;""" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. Cargar los datos (264 palabras):" -ForegroundColor White
Write-Host "   psql -U postgres -d traductor_embera -f database_setup.sql" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. Iniciar el servidor:" -ForegroundColor White
Write-Host "   .\scripts\windows\dev.ps1" -ForegroundColor Cyan
Write-Host ""
Write-Host "4. Abrir en el navegador:" -ForegroundColor White
Write-Host "   http://127.0.0.1:5000" -ForegroundColor Cyan
Write-Host ""
