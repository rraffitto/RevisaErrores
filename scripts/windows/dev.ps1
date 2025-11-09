# ============================================
# Script de Desarrollo para Windows 11
# Traductor Embera-Espanol
# ============================================

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Iniciando Servidor de Desarrollo" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Verificar que .env existe
if (-not (Test-Path ".env")) {
    Write-Host "ERROR: El archivo .env no existe" -ForegroundColor Red
    Write-Host ""
    Write-Host "Ejecuta primero el script de configuracion:" -ForegroundColor Yellow
    Write-Host "   .\scripts\windows\setup.ps1" -ForegroundColor Cyan
    Write-Host ""
    exit 1
}

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
Write-Host "   Puerto: 3000" -ForegroundColor Cyan
Write-Host "   URL: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Presiona Ctrl+C para detener el servidor" -ForegroundColor Yellow
Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Ejecutar el servidor
npx cross-env NODE_ENV=development tsx server/index.ts
