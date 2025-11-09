# 🔧 Solucion Error: Cannot find package 'dotenv'

## Que paso?

El paquete `dotenv` se agrego al proyecto, pero no esta instalado en tu maquina Windows.

**Error que viste:**
```
Error [ERR_MODULE_NOT_FOUND]: Cannot find package 'dotenv'
```

---

## ✅ Solucion Rapida

Ejecuta esto en PowerShell (en `E:\RevisaErrores`):

```powershell
# Instalar las dependencias actualizadas
npm install
```

Esto instalara `dotenv` y todas las dependencias necesarias.

---

## 🚀 Luego, Ejecuta Estos Pasos

### Paso 1: Crear la base de datos

```powershell
psql -U postgres -c "CREATE DATABASE traductor_embera;"
```

### Paso 2: Cargar las 264 palabras

```powershell
psql -U postgres -d traductor_embera -f database_setup.sql
```

Deberias ver:
```
CREATE TABLE
INSERT 0 264
```

### Paso 3: Iniciar el servidor

```powershell
.\scripts\windows\dev.ps1
```

### Paso 4: Abrir navegador

```
http://localhost:3000
```

---

## 📋 Resumen Completo

| # | Comando | Que hace |
|---|---------|----------|
| 1 | `npm install` | Instala dotenv y dependencias |
| 2 | `psql -U postgres -c "CREATE DATABASE traductor_embera;"` | Crea la base de datos |
| 3 | `psql -U postgres -d traductor_embera -f database_setup.sql` | Carga 264 palabras |
| 4 | `.\scripts\windows\dev.ps1` | Inicia el servidor |

---

## ✅ Ahora deberia funcionar

Despues de ejecutar `npm install`, todos los paquetes estaran actualizados y el servidor podra cargar el archivo `.env` correctamente.
