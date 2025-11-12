# ============================================
# Script de Produccion para Windows 11
# Traductor Embera-Espanol
# ============================================

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Iniciando Servidor de Produccion" -ForegroundColor Cyan
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

Write-Host "Verificando Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = (& node --version) 2>$null
    if ($LASTEXITCODE -ne 0) { throw "no-node" }
    Write-Host "   OK Node.js $nodeVersion detectado" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Node.js no está instalado o no está en el PATH." -ForegroundColor Red
    $winget = Get-Command winget -ErrorAction SilentlyContinue
    if ($winget -and (Ask-YesNo "¿Intento instalar Node.js automáticamente con winget?" "Y")) {
        try {
            winget install --accept-package-agreements --accept-source-agreements --id OpenJS.NodeJS.LTS -e
        } catch {
            try { winget install --accept-package-agreements --accept-source-agreements --id OpenJS.NodeJS -e } catch { Write-Host "Instalación automática falló. Instala Node.js manualmente." -ForegroundColor Red; exit 1 }
        }
        try { $nodeVersion = (& node --version) 2>$null; Write-Host "   OK Node.js $nodeVersion detectado" -ForegroundColor Green } catch { Write-Host "No se detectó Node después de la instalación." -ForegroundColor Red; exit 1 }
    } else {
        Write-Host "Instala Node.js desde https://nodejs.org/ y vuelve a ejecutar este script." -ForegroundColor Yellow
        exit 1
    }
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
    Write-Host "El proyecto no ha sido compilado (no existe 'dist')." -ForegroundColor Yellow
    if (Ask-YesNo "¿Quieres ejecutar 'npm install' y 'npm run build' ahora?" "Y") {
        # Instalar dependencias si no existen
        if (-not (Test-Path "node_modules")) {
            Write-Host "Instalando dependencias (npm install)..." -ForegroundColor Cyan
            npm install --no-audit --no-fund
            if ($LASTEXITCODE -ne 0) { Write-Host "Fallo npm install" -ForegroundColor Red; exit 1 }
        }
        Write-Host "Construyendo proyecto (npm run build)..." -ForegroundColor Cyan
        npm run build
        if ($LASTEXITCODE -ne 0) { Write-Host "Fallo la compilación (npm run build)" -ForegroundColor Red; exit 1 }
        Write-Host "   OK compilación finalizada" -ForegroundColor Green
    } else {
        Write-Host "Ejecuta primero: npm run build" -ForegroundColor Yellow
        exit 1
    }
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
 
