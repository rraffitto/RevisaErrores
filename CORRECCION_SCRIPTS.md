# 🔧 Correccion de Scripts PowerShell

## Que paso?

Los scripts PowerShell tenian caracteres especiales (tildes y ñ) que causaban errores de sintaxis en Windows.

**Error que viste:**
```
Token 'palabras' inesperado en la expresion o la instruccion.
```

## ✅ Ya esta corregido

He reescrito todos los scripts **SIN** caracteres especiales:

- ✓ `setup.ps1` - Sin tildes ni ñ
- ✓ `dev.ps1` - Sin caracteres especiales  
- ✓ `db-push.ps1` - Sin caracteres especiales
- ✓ `start.ps1` - Sin caracteres especiales
- ✓ `.env.windows` - Cambiado `TU_CONTRASEÑA` a `TU_CONTRASENA`

---

## 🚀 Intenta Nuevamente

Ejecuta estos comandos en PowerShell (en el directorio E:\RevisaErrores):

### Paso 1: Configurar el proyecto

```powershell
.\scripts\windows\setup.ps1
```

El script te pedira:
- Tu contrasena de PostgreSQL
- Generara automaticamente un SESSION_SECRET

### Paso 2: Iniciar el servidor

```powershell
.\scripts\windows\dev.ps1
```

### Paso 3: Abrir navegador

Abre: **http://localhost:3000**

---

## ❓ Si aun hay problemas

### Si el script setup.ps1 falla de nuevo

Configura manualmente:

```powershell
# Copiar plantilla
copy .env.windows .env

# Editar con Notepad
notepad .env
```

Dentro del archivo `.env`, reemplaza:
- `TU_CONTRASENA` con tu contrasena real de PostgreSQL
- `cambiar_esto_por_un_secreto_aleatorio_seguro` con un secreto generado asi:

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Guarda el archivo y luego inicia el servidor manualmente:

```powershell
npx cross-env NODE_ENV=development tsx server/index.ts
```

---

## 📋 Resumen de cambios

| Antes | Despues |
|-------|---------|
| `TU_CONTRASEÑA` | `TU_CONTRASENA` |
| Caracteres con tildes | Sin tildes |
| Scripts con ñ | Scripts sin ñ |

---

## ✅ Ahora deberia funcionar

Los scripts ahora usan solo caracteres ASCII simples, sin tildes ni caracteres especiales que puedan causar problemas en PowerShell.

**Intenta de nuevo:** `.\scripts\windows\setup.ps1`
