# ============================================
# Script de Base de Datos para Windows 11
# Traductor Emberá-Español
# ============================================

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Sincronizando Esquema de Base de Datos" -ForegroundColor Cyan
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

# Ejecutar drizzle-kit push
Write-Host "🔄 Sincronizando esquema..." -ForegroundColor Yellow
Write-Host ""

npx drizzle-kit push

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  ✅ Sincronización Completada" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
