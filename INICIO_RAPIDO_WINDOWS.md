# 🚀 Inicio Rapido - Windows 11

Guia simplificada para ejecutar el Traductor Embera-Espanol en Windows.

---

## ✅ Pre-requisitos

1. **Node.js v24+** instalado ([descargar](https://nodejs.org/))
2. **PostgreSQL 16+** instalado ([descargar](https://www.postgresql.org/download/windows/))
3. **PowerShell** (incluido en Windows)

---

## 📋 Instalacion en 4 Pasos

### Paso 1: Instalar Dependencias

```powershell
npm install
```

### Paso 2: Configurar Base de Datos

```powershell
# Crear la base de datos
psql -U postgres -c "CREATE DATABASE traductor_embera;"

# Cargar las 264 palabras
psql -U postgres -d traductor_embera -f database_setup.sql
```

Si te pide contrasena, ingresa tu contrasena de PostgreSQL.

Deberias ver:
```
CREATE DATABASE
CREATE TABLE
INSERT 0 264
```

### Paso 3: Configurar Variables de Entorno

Ejecuta el script de configuracion:

```powershell
.\scripts\windows\setup.ps1
```

Esto creara el archivo `.env` con:
- `HOST=127.0.0.1` (IPv4 para Windows)
- `PORT=5000` (puerto del servidor)
- Tus credenciales de PostgreSQL

### Paso 4: Iniciar el Servidor

```powershell
.\scripts\windows\dev.ps1
```

O alternativamente:

```powershell
npm run dev
```

---

## 🌐 Abrir en Navegador

Una vez iniciado el servidor, abre tu navegador en:

```
http://127.0.0.1:5000
```

o tambien:

```
http://localhost:5000
```

---

## 🛠️ Comandos Utiles

### Detener el Servidor

Presiona `Ctrl+C` en la terminal donde esta corriendo.

### Reiniciar el Servidor

```powershell
# Detener con Ctrl+C primero, luego:
.\scripts\windows\dev.ps1
```

### Verificar Estado de la Base de Datos

```powershell
psql -U postgres -d traductor_embera -c "SELECT COUNT(*) FROM diccionario;"
```

Deberia mostrar: `264`

---

## ❌ Solucion de Problemas Comunes

### Error: "listen ENOTSUP"

**Causa**: El archivo `.env` no existe o no tiene `HOST=127.0.0.1`

**Solucion**:
```powershell
# Eliminar .env antiguo si existe
del .env

# Recrear con configuracion correcta
.\scripts\windows\setup.ps1
```

### Error: "Cannot connect to PostgreSQL"

**Causa**: PostgreSQL no esta corriendo o credenciales incorrectas

**Solucion**:
1. Verifica que PostgreSQL esta corriendo en Servicios de Windows
2. Verifica tu contrasena en el archivo `.env`
3. Prueba la conexion:
   ```powershell
   psql -U postgres -d traductor_embera
   ```

### Error: "node_modules not found"

**Solucion**:
```powershell
npm install
```

---

## 📂 Estructura del Proyecto

```
E:\RevisaErrores\
├── client/                  # Frontend React
├── server/                  # Backend Express
├── scripts/
│   └── windows/             # Scripts PowerShell
│       ├── setup.ps1        # Configuracion inicial
│       ├── dev.ps1          # Modo desarrollo
│       └── start.ps1        # Modo produccion
├── database_setup.sql       # 264 palabras iniciales
├── .env.windows             # Plantilla de configuracion
├── .env                     # Tu configuracion (creado por setup.ps1)
└── package.json
```

---

## 🎯 Funcionalidades

- ✅ Traductor bidireccional Embera ↔ Espanol
- ✅ Diccionario con 264 palabras
- ✅ Busqueda en tiempo real
- ✅ Navegacion alfabetica (A-Z)
- ✅ Layout responsive (4 columnas)
- ✅ Contenido cultural y educativo
- ✅ Galeria de imagenes
- ✅ Videos culturales
- ✅ Mapa del resguardo

---

## 💡 Notas Importantes

1. **Puerto 5000**: El servidor SIEMPRE usa el puerto 5000 (requerido por Replit)
2. **IPv4 obligatorio**: Windows requiere `127.0.0.1` en lugar de `localhost` o `0.0.0.0`
3. **Ubicacion flexible**: Funciona en cualquier unidad (C:, D:, E:, etc.)
4. **PowerShell**: Todos los scripts estan en PowerShell (sin comandos Linux/Mac)

---

## 📞 Soporte

Si encuentras problemas:

1. Verifica que Node.js y PostgreSQL esten instalados
2. Revisa que el archivo `.env` existe y tiene `HOST=127.0.0.1`
3. Verifica que la base de datos tiene 264 palabras
4. Consulta la documentacion completa en `INSTALACION_WINDOWS.md`

---

**Ultima actualizacion**: Noviembre 2024
