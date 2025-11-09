# 🔧 Solución al Error de PowerShell

## Tu Problema Actual

Estás viendo estos errores en Windows PowerShell:

```
"NODE_ENV" no se reconoce como un comando interno o externo,
programa o archivo por lotes ejecutable.
```

```
DATABASE_URL, ensure the database is provisioned
```

## ✅ Solución Completa

### Paso 1: Ya tienes las dependencias instaladas ✅

Ya ejecutaste `npm install` correctamente, así que este paso está completo.

### Paso 2: Crear la Base de Datos

Si aún no lo has hecho:

```powershell
# Crear la base de datos
psql -U postgres -c "CREATE DATABASE traductor_embera;"

# Cargar las 264 palabras
psql -U postgres -d traductor_embera -f database_setup.sql
```

### Paso 3: Configurar el Proyecto Automáticamente

Ejecuta el script de configuración que crea el archivo `.env`:

```powershell
.\scripts\windows\setup.ps1
```

Este script te pedirá:
- Tu contraseña de PostgreSQL
- Generará automáticamente un `SESSION_SECRET` seguro
- Creará el archivo `.env` con toda la configuración

**Nota**: Si necesitas cambiar tu contraseña más tarde:
1. Elimina el archivo `.env`
2. Ejecuta `.\scripts\windows\setup.ps1` nuevamente

### Paso 4: Iniciar el Servidor

En lugar de `npm run dev`, usa:

```powershell
.\scripts\windows\dev.ps1
```

### Paso 5: Abrir el Navegador

Visita: **http://localhost:3000**

---

## 🆘 Si el Script PowerShell No Funciona

### Error: "No se puede cargar el archivo porque la ejecución de scripts está deshabilitada"

Si PowerShell bloquea la ejecución de scripts, ejecuta esto **una sola vez**:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

Luego presiona `S` para confirmar.

### Alternativa Manual

Si prefieres no usar scripts `.ps1`, usa este comando manual:

```powershell
# Iniciar servidor manualmente
npx cross-env NODE_ENV=development tsx server/index.ts
```

**Nota**: Ya instalamos `cross-env` para ti, por eso este comando funcionará.

---

## 📋 Scripts PowerShell Disponibles

Después de configurar, estos son los scripts que puedes usar:

| Script | Descripción |
|--------|-------------|
| `.\scripts\windows\setup.ps1` | Configuración inicial (solo una vez) |
| `.\scripts\windows\dev.ps1` | Iniciar servidor de desarrollo |
| `.\scripts\windows\db-push.ps1` | Sincronizar base de datos |
| `.\scripts\windows\start.ps1` | Iniciar en producción |

---

## 🔍 Verificar que Todo Funciona

Una vez que inicies el servidor con `.\scripts\windows\dev.ps1`, deberías ver:

```
============================================
  Iniciando Servidor de Desarrollo
============================================

🚀 Iniciando servidor en modo desarrollo...

   Puerto: 3000
   URL: http://localhost:3000

Presiona Ctrl+C para detener el servidor

============================================

Server running on http://localhost:3000
```

---

## ❓ Preguntas Frecuentes

### ¿Por qué no puedo usar `npm run dev`?

PowerShell no entiende la sintaxis `NODE_ENV=development` que se usa en Linux/Mac. Por eso creamos scripts específicos para Windows que usan `cross-env`.

### ¿Qué hace `cross-env`?

Es un paquete que hace que los comandos funcionen igual en Windows, Linux y Mac. Ya lo instalamos automáticamente cuando ejecutaste `npm install`.

### ¿Necesito modificar `package.json`?

No, los scripts PowerShell que creamos evitan tener que modificar ese archivo.

---

## 📖 Documentación Completa

- **LEEME.md** - Guía de inicio rápido
- **INSTALACION_WINDOWS.md** - Instalación completa paso a paso
- **COMANDOS_WINDOWS.md** - Referencia de todos los comandos

---

**¡Listo para empezar! 🚀**
