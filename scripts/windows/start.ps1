# ============================================
# Script de Producción para Windows 11
# Traductor Emberá-Español
# ============================================

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Iniciando Servidor de Producción" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Verificar que .env existe
if (-not (Test-Path ".env")) {
    Write-Host "❌ ERROR: El archivo .env no existe" -ForegroundColor Red
    Write-Host ""
    Write-Host "Ejecuta primero el script de configuración:" -ForegroundColor Yellow
    Write-Host "   .\scripts\windows\setup.ps1" -ForegroundColor Cyan
    Write-Host ""
    exit 1
}

# Verificar que dist existe
if (-not (Test-Path "dist")) {
    Write-Host "❌ ERROR: El proyecto no ha sido compilado" -ForegroundColor Red
    Write-Host ""
    Write-Host "Ejecuta primero:" -ForegroundColor Yellow
    Write-Host "   npm run build" -ForegroundColor Cyan
    Write-Host ""
    exit 1
}

# Iniciar servidor con cross-env
Write-Host "🚀 Iniciando servidor en modo producción..." -ForegroundColor Yellow
Write-Host ""
Write-Host "   Puerto: 3000" -ForegroundColor Cyan
Write-Host "   URL: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Presiona Ctrl+C para detener el servidor" -ForegroundColor Yellow
Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Ejecutar el servidor
npx cross-env NODE_ENV=production node dist/index.js
