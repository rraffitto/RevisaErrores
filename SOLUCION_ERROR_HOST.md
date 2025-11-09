# 🔧 Solucion Error: listen ENOTSUP operation not supported

## Que paso?

El servidor estaba configurado para escuchar en `0.0.0.0:3000`, que es la configuracion de Replit (para permitir conexiones externas). En Windows, especialmente en unidades como `E:\`, esto causa el error:

```
Error: listen ENOTSUP: operation not supported on socket 0.0.0.0:3000
```

---

## ✅ Solucion Aplicada

He cambiado el servidor para que use `localhost` en lugar de `0.0.0.0`, que es compatible con Windows.

**Cambios realizados:**
- ✅ Servidor configurado para usar `HOST` variable de entorno
- ✅ `.env.windows` actualizado con `HOST=localhost`

---

## 🚀 Ahora Ejecuta Estos Pasos

### Paso 1: Actualizar tu archivo .env

Necesitas regenerar el archivo `.env` con la nueva configuracion:

```powershell
# Eliminar .env antiguo
del .env

# Regenerar con el nuevo script
.\scripts\windows\setup.ps1
```

### Paso 2: Crear la base de datos (si no lo has hecho)

```powershell
psql -U postgres -c "CREATE DATABASE traductor_embera;"
```

### Paso 3: Cargar las 264 palabras

```powershell
psql -U postgres -d traductor_embera -f database_setup.sql
```

Deberias ver:
```
CREATE TABLE
INSERT 0 264
```

### Paso 4: Iniciar el servidor

```powershell
.\scripts\windows\dev.ps1
```

### Paso 5: Abrir navegador

```
http://localhost:3000
```

---

## 📋 Orden Completo de Comandos

```powershell
# 1. Regenerar .env con nueva configuracion
del .env
.\scripts\windows\setup.ps1

# 2. Crear base de datos
psql -U postgres -c "CREATE DATABASE traductor_embera;"

# 3. Cargar datos
psql -U postgres -d traductor_embera -f database_setup.sql

# 4. Iniciar servidor
.\scripts\windows\dev.ps1
```

---

## ✅ Ahora deberia funcionar

El servidor ahora escuchara en `localhost:3000` que es totalmente compatible con Windows.
