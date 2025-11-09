# 🪟 Referencia Rápida de Comandos para Windows 11

Comandos más utilizados para ejecutar y mantener el proyecto en Windows.

---

## ⚡ Scripts PowerShell (Recomendado)

### Configuración Inicial

```powershell
# Configuración automática del proyecto
.\scripts\windows\setup.ps1
```

Este script:
- ✅ Verifica Node.js y PostgreSQL
- ✅ Crea el archivo `.env`
- ✅ Configura la contraseña de PostgreSQL
- ✅ Genera un `SESSION_SECRET` seguro

### Ejecutar el Proyecto

```powershell
# Iniciar servidor de desarrollo
.\scripts\windows\dev.ps1

# Sincronizar base de datos
.\scripts\windows\db-push.ps1

# Iniciar en producción
.\scripts\windows\start.ps1
```

---

## 🚀 Comandos NPX (Alternativa Manual)

### Iniciar el Servidor

```powershell
# Desarrollo
npx cross-env NODE_ENV=development tsx server/index.ts

# Producción
npx cross-env NODE_ENV=production node dist/index.js
```

### Instalar Dependencias

```powershell
npm install
```

### Verificar Versiones

```powershell
node --version
npm --version
psql --version
```

---

## 🗄️ Comandos de PostgreSQL

### Conectarse a PostgreSQL

```powershell
# Conectar a PostgreSQL como usuario postgres
psql -U postgres

# Conectar a una base de datos específica
psql -U postgres -d traductor_embera
```

### Crear Base de Datos

```powershell
# Desde PowerShell
psql -U postgres -c "CREATE DATABASE traductor_embera;"

# O desde psql
CREATE DATABASE traductor_embera;
```

### Ejecutar Script SQL

```powershell
# Ejecutar el archivo de configuración inicial
psql -U postgres -d traductor_embera -f database_setup.sql
```

### Consultas Útiles

```powershell
# Ver todas las palabras del diccionario
psql -U postgres -d traductor_embera -c "SELECT COUNT(*) FROM diccionario;"

# Ver las primeras 10 palabras
psql -U postgres -d traductor_embera -c "SELECT * FROM diccionario LIMIT 10;"

# Buscar una palabra específica
psql -U postgres -d traductor_embera -c "SELECT * FROM diccionario WHERE espanol = 'agua';"
```

### Backup y Restauración

```powershell
# Crear backup de la base de datos
pg_dump -U postgres -d traductor_embera -f backup_$(Get-Date -Format 'yyyyMMdd').sql

# Restaurar desde backup
psql -U postgres -d traductor_embera -f backup_20241109.sql
```

### Listar Bases de Datos

```powershell
psql -U postgres -c "\l"
```

### Listar Tablas

```powershell
psql -U postgres -d traductor_embera -c "\dt"
```

---

## 📝 Scripts del Proyecto

### Importar Palabras desde Excel

```powershell
npx tsx scripts/import_words.ts
```

### Deduplicar Diccionario

```powershell
npx tsx scripts/deduplicate_dictionary.ts
```

### Exportar Palabras a SQL

```powershell
npx tsx scripts/export_to_sql.ts
```

### Sincronizar Esquema de Base de Datos

```powershell
npm run db:push
```

---

## 🔍 Diagnóstico y Solución de Problemas

### Ver Procesos de Node.js

```powershell
# Ver todos los procesos de Node
Get-Process node

# Matar todos los procesos de Node (si algo está trabado)
Stop-Process -Name node -Force
```

### Ver qué está usando el puerto 3000

```powershell
netstat -ano | findstr :3000
```

### Matar proceso en un puerto específico

```powershell
# Primero encuentra el PID del proceso
netstat -ano | findstr :3000

# Luego mata el proceso (reemplaza 1234 con el PID real)
taskkill /PID 1234 /F
```

### Ver si PostgreSQL está corriendo

```powershell
# Ver el servicio de PostgreSQL
Get-Service -Name postgresql*

# Iniciar el servicio
Start-Service postgresql-x64-16

# Detener el servicio
Stop-Service postgresql-x64-16

# Reiniciar el servicio
Restart-Service postgresql-x64-16
```

---

## 📂 Navegación de Archivos en PowerShell

### Comandos Básicos

```powershell
# Ver archivos en la carpeta actual
dir
# O usar el comando de Linux
ls

# Cambiar de carpeta
cd nombre_carpeta

# Volver a la carpeta anterior
cd ..

# Ir a la carpeta del usuario
cd ~

# Ver la ruta actual
pwd

# Crear carpeta
mkdir nueva_carpeta

# Crear archivo
New-Item archivo.txt

# Ver contenido de archivo
cat archivo.txt
# O
Get-Content archivo.txt

# Editar archivo (abre en Notepad)
notepad archivo.txt
```

---

## 🔐 Variables de Entorno

### Ver Variables de Entorno

```powershell
# Ver todas las variables
Get-ChildItem Env:

# Ver una variable específica
echo $env:DATABASE_URL
```

### Configurar Variable Temporal (solo para la sesión actual)

```powershell
$env:PORT = "3000"
$env:DATABASE_URL = "postgresql://postgres:password@localhost:5432/traductor_embera"
```

---

## 🌐 Red e IP

### Ver tu Dirección IP Local

```powershell
ipconfig
```

### Probar Conexión a la Base de Datos

```powershell
# Test de ping a localhost
ping localhost

# Probar si el puerto 5432 está abierto
Test-NetConnection -ComputerName localhost -Port 5432
```

---

## 🧹 Limpieza y Mantenimiento

### Limpiar node_modules y reinstalar

```powershell
# Eliminar node_modules
Remove-Item -Recurse -Force node_modules

# Eliminar package-lock.json
Remove-Item package-lock.json

# Reinstalar dependencias
npm install
```

### Limpiar caché de npm

```powershell
npm cache clean --force
```

---

## 🆘 Comandos de Emergencia

### Reiniciar Todo

```powershell
# 1. Detener el servidor Node (Ctrl+C en la ventana del servidor)

# 2. Matar todos los procesos de Node
Stop-Process -Name node -Force

# 3. Reiniciar PostgreSQL
Restart-Service postgresql-x64-16

# 4. Volver a iniciar el servidor
npm run dev
```

### Reset Completo de la Base de Datos

```powershell
# ⚠️ ADVERTENCIA: Esto borrará TODOS los datos

# 1. Conectar a PostgreSQL
psql -U postgres

# 2. Eliminar la base de datos
DROP DATABASE traductor_embera;

# 3. Crear la base de datos nuevamente
CREATE DATABASE traductor_embera;

# 4. Salir
\q

# 5. Ejecutar el script de configuración
psql -U postgres -d traductor_embera -f database_setup.sql
```

---

## 📊 Monitoreo

### Ver Logs del Servidor

El servidor muestra logs directamente en la consola de PowerShell. Para guardarlos:

```powershell
# Redirigir logs a un archivo
npm run dev > logs.txt 2>&1
```

### Ver Logs de PostgreSQL

Los logs de PostgreSQL están en:
```
C:\Program Files\PostgreSQL\16\data\log\
```

Puedes abrirlos con:
```powershell
notepad "C:\Program Files\PostgreSQL\16\data\log\postgresql-2024-11-09.log"
```

---

## 🔄 Actualización del Proyecto

### Actualizar Dependencias

```powershell
# Ver paquetes desactualizados
npm outdated

# Actualizar todos los paquetes
npm update

# Actualizar un paquete específico
npm install paquete@latest
```

---

## 💻 PowerShell vs CMD

Este proyecto funciona tanto en **PowerShell** (recomendado) como en **CMD**.

### Abrir PowerShell como Administrador

1. Busca "PowerShell" en el menú de Windows
2. Click derecho → "Ejecutar como administrador"

### Abrir PowerShell en una Carpeta

1. Abre la carpeta del proyecto en el Explorador de Windows
2. Mantén presionado `Shift` + Click derecho en un espacio vacío
3. Selecciona "Abrir ventana de PowerShell aquí"

---

## 🎯 Atajos de Teclado Útiles

En PowerShell:

- `Ctrl + C` - Detener el servidor o proceso actual
- `Ctrl + L` - Limpiar la pantalla
- `Tab` - Autocompletar comandos/rutas
- `↑` / `↓` - Navegar por el historial de comandos
- `Ctrl + R` - Buscar en el historial de comandos

---

## 📋 Checklist Diario

Cada vez que trabajes en el proyecto:

```powershell
# 1. Verificar que PostgreSQL está corriendo
Get-Service postgresql*

# 2. Ir a la carpeta del proyecto
cd C:\ruta\a\tu\proyecto

# 3. Iniciar el servidor
npm run dev

# 4. Abrir navegador en http://localhost:3000
```

---

**Tip**: Guarda estos comandos en un archivo `.ps1` para ejecutarlos rápidamente.

Ejemplo `start.ps1`:
```powershell
# Verificar PostgreSQL
Get-Service postgresql*

# Iniciar servidor
npm run dev
```

Ejecutar: `.\start.ps1`

---

**Última actualización**: Noviembre 2024
