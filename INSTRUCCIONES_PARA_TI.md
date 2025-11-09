# 🎯 Instrucciones para Ejecutar el Proyecto en Windows 11

## Hola! 👋

Vi que tienes estos errores en PowerShell:
- ❌ `"NODE_ENV" no se reconoce como un comando interno o externo`
- ❌ `DATABASE_URL, ensure the database is provisioned`

**¡Ya está solucionado!** He creado scripts automáticos que resuelven ambos problemas.

---

## 🚀 Pasos para Resolver (5 minutos)

### 1️⃣ Crear la Base de Datos (si no lo has hecho)

```powershell
psql -U postgres -c "CREATE DATABASE traductor_embera;"
psql -U postgres -d traductor_embera -f database_setup.sql
```

### 2️⃣ Habilitar Scripts de PowerShell (solo la primera vez)

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

Cuando te pregunte, presiona `S` para confirmar.

### 3️⃣ Configurar el Proyecto Automáticamente

```powershell
.\scripts\windows\setup.ps1
```

Este script te pedirá tu contraseña de PostgreSQL y configurará todo automáticamente.

### 4️⃣ Iniciar el Servidor

```powershell
.\scripts\windows\dev.ps1
```

### 5️⃣ Abrir en el Navegador

Ve a: **http://localhost:3000**

---

## ✅ ¿Qué Hice?

1. ✅ Instalé `cross-env` para que funcione en Windows
2. ✅ Creé 4 scripts PowerShell automatizados:
   - `setup.ps1` - Configuración inicial
   - `dev.ps1` - Iniciar desarrollo
   - `db-push.ps1` - Sincronizar base de datos
   - `start.ps1` - Iniciar producción
3. ✅ Actualicé toda la documentación para Windows 11
4. ✅ Creé esta guía específica para tu error

---

## 🆘 Si PowerShell Bloquea los Scripts

Si ves: `"no se puede cargar el archivo porque la ejecución de scripts está deshabilitada"`

Ejecuta esto una sola vez:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

---

## 🔧 Alternativa Manual (Sin Scripts)

Si prefieres no usar scripts `.ps1`, puedes ejecutar manualmente:

```powershell
# Iniciar servidor manualmente
npx cross-env NODE_ENV=development tsx server/index.ts
```

---

## 📋 Scripts Disponibles

| Script | Qué hace |
|--------|----------|
| `.\scripts\windows\setup.ps1` | Configura `.env` automáticamente |
| `.\scripts\windows\dev.ps1` | Inicia servidor de desarrollo |
| `.\scripts\windows\db-push.ps1` | Sincroniza base de datos |
| `.\scripts\windows\start.ps1` | Inicia en producción |

---

## 📖 Documentación Completa

- **SOLUCION_ERROR_WINDOWS.md** - Solución detallada a tu error específico
- **LEEME.md** - Guía de inicio rápido
- **INSTALACION_WINDOWS.md** - Instalación completa paso a paso
- **COMANDOS_WINDOWS.md** - Referencia de comandos PowerShell

---

## ❓ Preguntas Frecuentes

### ¿Por qué no funciona `npm run dev`?
PowerShell no entiende `NODE_ENV=development`. Usa `.\scripts\windows\dev.ps1` en su lugar.

### ¿Qué hace `cross-env`?
Hace que los comandos funcionen igual en Windows, Linux y Mac. Ya está instalado.

### ¿Necesito modificar `package.json`?
No, los scripts PowerShell evitan tener que modificarlo.

### ¿Cómo cambio la contraseña más tarde?
1. Elimina el archivo `.env`
2. Ejecuta `.\scripts\windows\setup.ps1` nuevamente

---

## 🎉 ¡Listo!

Ahora deberías poder ejecutar el proyecto sin problemas.

Si tienes algún problema, consulta **SOLUCION_ERROR_WINDOWS.md** para más detalles.

**¡Buena suerte con tu proyecto de preservación de la lengua Emberá! 🌍**
