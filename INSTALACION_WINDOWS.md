# 🪟 Instalación en Windows 11

Guía completa para ejecutar el **Traductor Emberá-Español** en Windows 11 con Node.js y PostgreSQL.

---

## 📋 Requisitos Previos

Antes de comenzar, necesitas instalar:

1. **Node.js** (versión 18 o superior)
2. **PostgreSQL** (versión 14 o superior)
3. **Git** (opcional, para clonar el proyecto)

---

## 🔧 Paso 1: Instalar Node.js

### Descargar e Instalar

1. Visita: https://nodejs.org/
2. Descarga la versión **LTS** (recomendada)
3. Ejecuta el instalador `.msi`
4. Sigue el asistente de instalación (deja las opciones por defecto)
5. Marca la casilla **"Automatically install necessary tools"** si aparece

### Verificar Instalación

Abre **PowerShell** o **CMD** y ejecuta:

```powershell
node --version
npm --version
```

Deberías ver algo como:
```
v20.11.0
10.2.4
```

---

## 🐘 Paso 2: Instalar PostgreSQL

### Descargar e Instalar

1. Visita: https://www.postgresql.org/download/windows/
2. Descarga el instalador de **PostgreSQL**
3. Ejecuta el instalador
4. Durante la instalación:
   - **Puerto**: Deja el puerto por defecto `5432`
   - **Superusuario**: Elige una contraseña y **guárdala** (la necesitarás)
   - **Locale**: Selecciona "Spanish, Colombia" o "Default locale"

### Verificar Instalación

Abre **PowerShell** y ejecuta:

```powershell
psql --version
```

Si no funciona, agrega PostgreSQL al PATH:
1. Busca "Variables de entorno" en el menú de Windows
2. Edita la variable `Path`
3. Agrega: `C:\Program Files\PostgreSQL\16\bin` (ajusta la versión)

---

## 🗄️ Paso 3: Configurar la Base de Datos

### Crear la Base de Datos

Abre **pgAdmin 4** (instalado con PostgreSQL) o usa **PowerShell**:

#### Opción A: Usando pgAdmin 4

1. Abre **pgAdmin 4**
2. Conéctate al servidor local (localhost)
3. Click derecho en **Databases** → **Create** → **Database**
4. Nombre: `traductor_embera`
5. Owner: `postgres`
6. Click en **Save**

#### Opción B: Usando PowerShell

```powershell
# Conectarse a PostgreSQL
psql -U postgres

# Dentro de psql, crear la base de datos
CREATE DATABASE traductor_embera;

# Salir
\q
```

### Ejecutar el Script de Instalación

```powershell
# Ejecutar el script SQL que crea las tablas e inserta las 264 palabras
psql -U postgres -d traductor_embera -f database_setup.sql
```

Deberías ver:
```
CREATE TABLE
CREATE TABLE
INSERT 0 264
```

---

## 📦 Paso 4: Configurar el Proyecto

### Descargar el Proyecto

Si tienes Git instalado:
```powershell
git clone [URL_DEL_REPOSITORIO]
cd traductor-embera
```

O descarga el proyecto como ZIP y descomprímelo.

### Instalar Dependencias

Abre **PowerShell** en la carpeta del proyecto:

```powershell
npm install
```

Esto puede tomar unos minutos.

---

## 🔐 Paso 5: Configurar Variables de Entorno

### Crear el archivo `.env`

Crea un archivo llamado `.env` en la raíz del proyecto con este contenido:

```env
# Puerto del servidor
PORT=3000

# Base de datos PostgreSQL
DATABASE_URL=postgresql://postgres:TU_CONTRASEÑA@localhost:5432/traductor_embera
PGHOST=localhost
PGPORT=5432
PGUSER=postgres
PGPASSWORD=TU_CONTRASEÑA
PGDATABASE=traductor_embera

# Secreto para sesiones (genera uno aleatorio)
SESSION_SECRET=tu_secreto_super_seguro_aqui_cambialo

# Modo de desarrollo
NODE_ENV=development
```

⚠️ **IMPORTANTE**: Reemplaza `TU_CONTRASEÑA` con la contraseña que elegiste al instalar PostgreSQL.

### Generar un SESSION_SECRET Seguro

En PowerShell, ejecuta:

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copia el resultado y pégalo en `SESSION_SECRET`.

---

## 🚀 Paso 6: Ejecutar el Proyecto

### Iniciar el Servidor

En PowerShell, en la carpeta del proyecto:

```powershell
npm run dev
```

Deberías ver:
```
Server running on http://localhost:3000
```

### Abrir en el Navegador

Abre tu navegador y visita:
```
http://localhost:3000
```

¡Listo! 🎉 El traductor Emberá-Español debería estar funcionando.

---

## 🛠️ Comandos Útiles

### Scripts del Proyecto

```powershell
# Iniciar el servidor de desarrollo
npm run dev

# Importar palabras desde Excel
npx tsx scripts/import_words.ts

# Deduplicar palabras en la base de datos
npx tsx scripts/deduplicate_dictionary.ts

# Exportar palabras a SQL
npx tsx scripts/export_to_sql.ts

# Sincronizar esquema de base de datos
npm run db:push
```

### PostgreSQL en Windows

```powershell
# Conectarse a la base de datos
psql -U postgres -d traductor_embera

# Ver todas las palabras
psql -U postgres -d traductor_embera -c "SELECT COUNT(*) FROM diccionario;"

# Backup de la base de datos
pg_dump -U postgres -d traductor_embera -f backup.sql

# Restaurar backup
psql -U postgres -d traductor_embera -f backup.sql
```

---

## ❌ Solución de Problemas Comunes

### Error: "psql no se reconoce como comando"

**Solución**: Agrega PostgreSQL al PATH de Windows:

1. Busca "Editar las variables de entorno del sistema"
2. Click en "Variables de entorno"
3. En "Variables del sistema", selecciona `Path` → Editar
4. Click en "Nuevo"
5. Agrega: `C:\Program Files\PostgreSQL\16\bin` (ajusta la versión)
6. Click OK y reinicia PowerShell

### Error: "connection refused" o "could not connect to server"

**Solución**: PostgreSQL no está corriendo:

1. Busca "Servicios" en el menú de Windows
2. Busca "postgresql-x64-16" (o tu versión)
3. Click derecho → Iniciar
4. Cambia a "Inicio automático" si quieres que inicie con Windows

### Error: "password authentication failed"

**Solución**: La contraseña en el archivo `.env` no coincide:

1. Abre el archivo `.env`
2. Verifica que `PGPASSWORD` sea la contraseña correcta de PostgreSQL
3. Si olvidaste la contraseña, reinstala PostgreSQL

### Error: "database traductor_embera does not exist"

**Solución**: No creaste la base de datos:

```powershell
psql -U postgres -c "CREATE DATABASE traductor_embera;"
```

### Error: "relation diccionario does not exist"

**Solución**: No ejecutaste el script SQL:

```powershell
psql -U postgres -d traductor_embera -f database_setup.sql
```

### El puerto 3000 ya está en uso

**Solución**: Cambia el puerto en el archivo `.env`:

```env
PORT=8080
```

O cierra la aplicación que está usando el puerto 3000.

---

## 🔄 Actualizar el Proyecto

### Si hay nuevas palabras en el diccionario

1. Descarga el archivo Excel actualizado
2. Colócalo en la carpeta del proyecto
3. Ejecuta:

```powershell
npx tsx scripts/import_words.ts
```

### Si hay cambios en el código

```powershell
# Detener el servidor (Ctrl+C)
# Actualizar dependencias
npm install

# Reiniciar el servidor
npm run dev
```

---

## 📱 Acceder desde otros dispositivos

Si quieres que otros dispositivos en tu red local accedan al traductor:

1. Obtén tu dirección IP local:

```powershell
ipconfig
```

Busca "Dirección IPv4" (ej: `192.168.1.100`)

2. En otros dispositivos, abre el navegador y visita:
```
http://192.168.1.100:3000
```

3. Asegúrate de que el Firewall de Windows permita conexiones en el puerto 3000.

---

## 🔥 Firewall de Windows

Si otros dispositivos no pueden conectarse:

1. Busca "Firewall de Windows Defender" → "Configuración avanzada"
2. Click en "Reglas de entrada" → "Nueva regla"
3. Tipo: "Puerto"
4. Protocolo: TCP
5. Puerto específico: `3000`
6. Acción: "Permitir la conexión"
7. Nombre: "Traductor Emberá"

---

## 📚 Recursos Adicionales

- **Node.js**: https://nodejs.org/docs/
- **PostgreSQL**: https://www.postgresql.org/docs/
- **Documentación del Proyecto**: Ver `replit.md`
- **Configuración Localhost**: Ver `LOCALHOST_SETUP.md`

---

## ✅ Checklist de Verificación

Antes de reportar problemas, verifica:

- [ ] Node.js instalado (`node --version`)
- [ ] PostgreSQL instalado (`psql --version`)
- [ ] Base de datos creada (`traductor_embera`)
- [ ] Script SQL ejecutado (264 palabras insertadas)
- [ ] Archivo `.env` configurado correctamente
- [ ] Dependencias instaladas (`npm install`)
- [ ] Servidor PostgreSQL corriendo
- [ ] Puerto 3000 disponible

---

## 💡 Consejos de Rendimiento

- **Reiniciar PostgreSQL** periódicamente si notas lentitud
- **Cerrar aplicaciones** que no uses para liberar RAM
- **Actualizar drivers** de tu PC para mejor rendimiento
- **Usar SSD** en lugar de HDD si es posible

---

## 🆘 Soporte

Si tienes problemas:

1. Revisa la sección "Solución de Problemas"
2. Verifica el checklist de verificación
3. Revisa los logs del servidor en PowerShell
4. Consulta la documentación en `replit.md`

---

**Última actualización**: Noviembre 2024  
**Compatible con**: Windows 11, Node.js 18+, PostgreSQL 14+
