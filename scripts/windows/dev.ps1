# ============================================
# Script de Desarrollo para Windows 11
# Traductor Embera-Español
# ============================================

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Iniciando Servidor de Desarrollo" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

function Ask-YesNo {
    param(
        [string]$Message,
        [string]$Default = "Y"
    )
    $suffix = if ($Default -match '^[Yy]') { "[Y/n]" } else { "[y/N]" }
    while ($true) {
        $answer = Read-Host "$Message $suffix"
        if ([string]::IsNullOrWhiteSpace($answer)) { $answer = $Default }
        if ($answer -match '^[Yy](es)?$') { return $true }
        if ($answer -match '^[Nn]') { return $false }
        Write-Host "Responde 'y' o 'n'." -ForegroundColor Yellow
    }
}

Write-Host "Verificando versión de PowerShell..." -ForegroundColor Yellow
try {
    $psVer = $PSVersionTable.PSVersion
    if ($psVer.Major -lt 5) {
        Write-Host "AVISO: Se recomienda PowerShell 5.1 o superior. Versión detectada: $psVer" -ForegroundColor Yellow
        if (-not (Ask-YesNo "¿Continuar de todos modos?" "N")) { Write-Host "Abortando: actualiza PowerShell." -ForegroundColor Red; exit 1 }
    } else {
        Write-Host "   OK PowerShell $psVer detectado" -ForegroundColor Green
    }
} catch { Write-Host "No se pudo determinar la versión de PowerShell." -ForegroundColor Yellow }

Write-Host "Verificando Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = (& node --version) 2>$null
    if ($LASTEXITCODE -ne 0) { throw "no-node" }
    Write-Host "   OK Node.js $nodeVersion detectado" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Node.js no está instalado o no está en el PATH." -ForegroundColor Red
    # Intentar instalar automáticamente con winget si está disponible
    $winget = Get-Command winget -ErrorAction SilentlyContinue
    if ($winget) {
        if (Ask-YesNo "¿Quieres intentar instalar Node.js automáticamente usando winget?" "Y") {
            Write-Host "Instalando Node.js (requiere permisos)..." -ForegroundColor Cyan
            try {
                winget install --accept-package-agreements --accept-source-agreements --id OpenJS.NodeJS.LTS -e
            } catch {
                try { winget install --accept-package-agreements --accept-source-agreements --id OpenJS.NodeJS -e } catch {
                    Write-Host "Instalación automática falló. Intentando Chocolatey (si está instalado)..." -ForegroundColor Yellow
                    $winget = $null
                }
            }
        }
    }
    # Si winget no está disponible o fallo, probar Chocolatey
    if (-not $winget) {
        $choco = Get-Command choco -ErrorAction SilentlyContinue
        if ($choco) {
            if (Ask-YesNo "¿Quieres intentar instalar Node.js automáticamente usando Chocolatey (choco)?" "Y") {
                Write-Host "Instalando Node.js con choco (requiere permisos)..." -ForegroundColor Cyan
                try {
                    choco install nodejs-lts -y
                } catch {
                    Write-Host "Instalación con choco falló. Por favor instala Node.js manualmente desde https://nodejs.org/" -ForegroundColor Red
                    exit 1
                }
            }
        } else {
            Write-Host "No se detectó 'winget' ni 'choco'. Instala Node.js manualmente desde: https://nodejs.org/" -ForegroundColor Yellow
            exit 1
        }
    }
    # Re-intentar detección
    try { $nodeVersion = (& node --version) 2>$null; Write-Host "   OK Node.js $nodeVersion detectado" -ForegroundColor Green } catch { Write-Host "No se detectó Node después de la instalación." -ForegroundColor Red; exit 1 }
}
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
    Write-Host "   2. Ejecuta: psql -U postgres -c \"CREATE DATABASE traductor_embera;\"" -ForegroundColor Cyan
    Write-Host "   3. Ejecuta: psql -U postgres -d traductor_embera -f database_setup.sql" -ForegroundColor Cyan
    Write-Host ""
    if (-not (Ask-YesNo "Continuar de todos modos?" "N")) { exit 0 }
    Write-Host ""
}

# SIEMPRE normalizar HOST=127.0.0.1 en .env (incluso si ya exista)
Write-Host "Verificando configuracion de HOST..." -ForegroundColor Yellow
$envContent = Get-Content ".env" -Raw
$hostChanged = $false
if ($envContent -match "(?m)^HOST=(?!127\.0\.0\.1).*") {
    $envContent = $envContent -replace "(?m)^HOST=.*", "HOST=127.0.0.1"
    $hostChanged = $true
} elseif (-not ($envContent -match "(?m)^HOST=")) {
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

# Verificar que node_modules existe; si no, ofrecer instalar las dependencias
if (-not (Test-Path "node_modules")) {
    Write-Host "Las dependencias (node_modules) no están instaladas." -ForegroundColor Yellow
    if (Ask-YesNo "¿Quieres ejecutar 'npm install' ahora?" "Y") {
        Write-Host "Ejecutando: npm install --no-audit --no-fund" -ForegroundColor Cyan
        $installExit = 0
        try {
            npm install --no-audit --no-fund
            $installExit = $LASTEXITCODE
        } catch {
            $installExit = $LASTEXITCODE
        }
        if ($installExit -ne 0) {
            Write-Host "Fallo la instalación de dependencias (npm install). Revisa la salida anterior." -ForegroundColor Red
            exit 1
        }
        Write-Host "   OK dependencias instaladas" -ForegroundColor Green
    } else {
        Write-Host "Instala las dependencias con 'npm install' y vuelve a ejecutar este script." -ForegroundColor Yellow
        exit 1
    }
} else {
    Write-Host "Dependencias detectadas (node_modules)" -ForegroundColor Green
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
