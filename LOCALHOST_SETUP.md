# 🖥️ Configuración para Localhost - Traductor Emberá-Español

Guía rápida para instalar y ejecutar el proyecto en tu computadora local usando **puerto 3000**.

---

## ⚡ Inicio Rápido (5 minutos)

### 1️⃣ Requisitos Previos

Asegúrate de tener instalado:
- **Node.js** 18+ → [Descargar](https://nodejs.org/)
- **PostgreSQL** 14+ → [Descargar](https://www.postgresql.org/download/)

### 2️⃣ Instalación de PostgreSQL

#### En Mac (con Homebrew)
```bash
brew install postgresql@14
brew services start postgresql@14
```

#### En Ubuntu/Debian
```bash
sudo apt update
sudo apt install postgresql-14
sudo systemctl start postgresql
```

#### En Windows
1. Descarga el instalador desde [postgresql.org](https://www.postgresql.org/download/windows/)
2. Instala con configuración por defecto
3. Anota la contraseña del usuario `postgres`

---

## 🗄️ Configurar la Base de Datos

### Paso 1: Crear Base de Datos y Usuario

Abre una terminal de PostgreSQL:

```bash
# Mac/Linux
sudo -u postgres psql

# Windows (desde cmd)
psql -U postgres
```

Ejecuta estos comandos dentro de PostgreSQL:

```sql
-- Crear la base de datos
CREATE DATABASE embera_traductor;

-- Crear el usuario
CREATE USER embera_user WITH PASSWORD 'embera_password';

-- Otorgar permisos
GRANT ALL PRIVILEGES ON DATABASE embera_traductor TO embera_user;

-- Salir
\q
```

### Paso 2: Cargar los Datos (81 palabras)

Desde la terminal del proyecto:

```bash
psql -U embera_user -d embera_traductor -f database_setup.sql
```

**Si pide contraseña, usa:** `embera_password`

---

## ⚙️ Configurar la Aplicación

### Paso 1: Clonar/Descargar el Proyecto

```bash
cd /ruta/donde/quieres/el/proyecto
# Si usas Git:
git clone <url-del-repositorio>
cd traductor-embera
```

### Paso 2: Instalar Dependencias

```bash
npm install
```

### Paso 3: Configurar Variables de Entorno

**Opción A: Usar configuración lista para localhost** (Recomendado)
```bash
cp .env.localhost .env
```

**Opción B: Configurar manualmente**
```bash
cp .env.example .env
# Luego edita .env con tu editor favorito
```

El archivo `.env` debe contener:

```env
# Base de Datos
DATABASE_URL=postgresql://embera_user:embera_password@localhost:5432/embera_traductor
PGHOST=localhost
PGPORT=5432
PGUSER=embera_user
PGPASSWORD=embera_password
PGDATABASE=embera_traductor

# Servidor en Puerto 3000
PORT=3000

# Modo Desarrollo
NODE_ENV=development

# Session Secret
SESSION_SECRET=Y8zK9mN2pQ5wR7tX3vB6nM8jH4gF1dS0aZ9cX7vB5nM2kJ4hG6fD8sA0
```

---

## 🚀 Iniciar la Aplicación

### Modo Desarrollo (con hot-reload)

```bash
npm run dev
```

### Modo Producción (optimizado)

```bash
npm run build
npm start
```

---

## 🌐 Acceder a la Aplicación

Abre tu navegador en:

```
http://localhost:3000
```

Deberías ver la página principal del **Traductor Emberá-Español** ✨

---

## 🧪 Verificar que Todo Funciona

### 1. Probar el Traductor
- Ve a la página principal
- Escribe "agua" en el campo de español
- Presiona el botón de traducir
- Deberías ver: **"juí"**

### 2. Verificar el Diccionario
- Ve a la página "Diccionario"
- Deberías ver las 81 palabras listadas
- Prueba buscar "familia" → debe aparecer "purúm"

### 3. Verificar Contenido Cultural
- Ve a "Comunidad"
- Deberías ver:
  - Mapa del Resguardo Alto Río Bojayá
  - Videos culturales de YouTube
  - Calendario de festivos
  - Galería con 11 fotografías auténticas

---

## 🔧 Solución de Problemas

### ❌ "Cannot connect to database"

**Verifica que PostgreSQL está corriendo:**
```bash
# Mac
brew services list | grep postgresql

# Ubuntu/Linux
sudo systemctl status postgresql

# Si no está corriendo, inicia el servicio:
brew services start postgresql@14  # Mac
sudo systemctl start postgresql     # Linux
```

**Verifica la conexión:**
```bash
psql -U embera_user -d embera_traductor -c "SELECT COUNT(*) FROM diccionario;"
```

Deberías ver: `81`

---

### ❌ "Port 3000 already in use"

**Encuentra qué está usando el puerto:**
```bash
# Mac/Linux
lsof -i :3000

# Windows
netstat -ano | findstr :3000
```

**Soluciones:**
1. Cambia el puerto en `.env`: `PORT=3001`
2. O detén el proceso que está usando el puerto 3000

---

### ❌ "npm install" falla

**Limpia el cache de npm:**
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

---

### ❌ "Session secret required"

**Asegúrate de que `.env` existe y contiene:**
```env
SESSION_SECRET=Y8zK9mN2pQ5wR7tX3vB6nM8jH4gF1dS0aZ9cX7vB5nM2kJ4hG6fD8sA0
```

---

## 📁 Estructura del Proyecto

```
traductor-embera/
├── client/              # Frontend (React + TypeScript)
│   ├── src/
│   │   ├── components/  # Componentes reutilizables
│   │   ├── pages/       # Páginas (Home, Community, Dictionary)
│   │   └── App.tsx      # Router principal
├── server/              # Backend (Express + PostgreSQL)
│   ├── db.ts           # Conexión a la base de datos
│   ├── routes.ts       # API endpoints
│   └── storage.ts      # Lógica de datos
├── shared/
│   └── schema.ts       # Esquemas de base de datos
├── attached_assets/    # Fotografías auténticas Emberá
├── database_setup.sql  # Script de base de datos
├── .env               # Variables de entorno (crear desde .env.localhost)
└── package.json       # Dependencias del proyecto
```

---

## 🎯 Comandos Útiles

```bash
# Instalar dependencias
npm install

# Iniciar en modo desarrollo (hot-reload)
npm run dev

# Construir para producción
npm run build

# Iniciar en modo producción
npm start

# Ver base de datos
psql -U embera_user -d embera_traductor

# Backup de la base de datos
pg_dump -U embera_user embera_traductor > backup.sql

# Restaurar backup
psql -U embera_user -d embera_traductor < backup.sql
```

---

## 🔐 Seguridad para Desarrollo Local

Para desarrollo local, la configuración es segura. Si quieres más seguridad:

### Generar un nuevo SESSION_SECRET

```bash
# Opción 1: Con OpenSSL (Mac/Linux)
openssl rand -base64 32

# Opción 2: Con Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Copia el resultado y reemplaza `SESSION_SECRET` en `.env`

---

## 📊 Verificar Datos en PostgreSQL

```bash
# Conectar a la base de datos
psql -U embera_user -d embera_traductor

# Ver todas las palabras
SELECT * FROM diccionario;

# Contar palabras (debe ser 81)
SELECT COUNT(*) FROM diccionario;

# Buscar una palabra
SELECT * FROM diccionario WHERE espanol = 'agua';

# Salir
\q
```

---

## 🆘 Ayuda Adicional

### Logs de la Aplicación
Los errores aparecerán en la terminal donde ejecutaste `npm run dev`

### Logs de PostgreSQL

**Mac:**
```bash
tail -f /usr/local/var/log/postgresql@14.log
```

**Ubuntu/Linux:**
```bash
sudo tail -f /var/log/postgresql/postgresql-14-main.log
```

---

## ✅ Checklist de Instalación

- [ ] Node.js instalado (`node --version`)
- [ ] PostgreSQL instalado (`psql --version`)
- [ ] Base de datos creada (`embera_traductor`)
- [ ] Usuario creado (`embera_user`)
- [ ] Datos cargados (`database_setup.sql`)
- [ ] Dependencias instaladas (`npm install`)
- [ ] Archivo `.env` configurado
- [ ] Servidor iniciado (`npm run dev`)
- [ ] Navegador abierto en `http://localhost:3000`
- [ ] Traductor funciona (prueba traducir "agua" → "juí")
- [ ] Diccionario muestra 81 palabras

---

## 🎉 ¡Listo!

Si completaste todos los pasos, tu aplicación debería estar corriendo en:

**http://localhost:3000**

¡Disfruta preservando el idioma y la cultura Emberá! 🌿

---

**¿Necesitas más ayuda?**  
Consulta `INSTRUCCIONES_INSTALACION.md` para configuración avanzada de servidores en producción.
