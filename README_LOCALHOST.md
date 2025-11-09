# 🚀 Instalación en Localhost - Traductor Emberá-Español

Configuración rápida para ejecutar el proyecto en tu computadora usando **puerto 3000**.

---

## ⚡ Instalación Rápida (3 Pasos)

### 1. Configurar Base de Datos PostgreSQL

```sql
-- Conectar a PostgreSQL
sudo -u postgres psql  # Mac/Linux
psql -U postgres       # Windows

-- Crear base de datos y usuario
CREATE DATABASE embera_traductor;
CREATE USER embera_user WITH PASSWORD 'embera_password';
GRANT ALL PRIVILEGES ON DATABASE embera_traductor TO embera_user;
\q
```

Cargar los datos (81 palabras):
```bash
psql -U embera_user -d embera_traductor -f database_setup.sql
```

### 2. Configurar Variables de Entorno

```bash
cp .env.localhost .env
```

El archivo `.env` ya incluye:
- ✅ Puerto 3000
- ✅ Conexión a PostgreSQL
- ✅ SESSION_SECRET generado

### 3. Instalar e Iniciar

```bash
npm install
npm run dev
```

**Abre en tu navegador:** http://localhost:3000

---

## 📁 Archivos de Configuración Disponibles

| Archivo | Descripción |
|---------|-------------|
| `.env.localhost` | ✅ Configuración lista para usar (puerto 3000) |
| `.env.example` | 📝 Plantilla con documentación completa |
| `database_setup.sql` | 🗄️ Script SQL con las 81 palabras del diccionario |
| `LOCALHOST_SETUP.md` | 📖 Guía detallada paso a paso |
| `CONFIGURACION_LOCALHOST.txt` | 📋 Referencia rápida en texto plano |
| `INSTRUCCIONES_INSTALACION.md` | 🖥️ Guía para servidores en producción |

---

## 🔧 Configuración Incluida en .env.localhost

```env
# Base de Datos
DATABASE_URL=postgresql://embera_user:embera_password@localhost:5432/embera_traductor
PGHOST=localhost
PGPORT=5432
PGUSER=embera_user
PGPASSWORD=embera_password
PGDATABASE=embera_traductor

# Servidor
PORT=3000
NODE_ENV=development

# Seguridad
SESSION_SECRET=Y8zK9mN2pQ5wR7tX3vB6nM8jH4gF1dS0aZ9cX7vB5nM2kJ4hG6fD8sA0
```

---

## ✅ Verificación

### Probar el Traductor
1. Ve a http://localhost:3000
2. Escribe "agua" en español
3. Traduce → debe mostrar **"juí"** ✨

### Verificar Base de Datos
```bash
psql -U embera_user -d embera_traductor -c "SELECT COUNT(*) FROM diccionario;"
# Debe mostrar: 81
```

---

## 🆘 Solución de Problemas

### PostgreSQL no está corriendo

```bash
# Mac
brew services start postgresql@14

# Linux
sudo systemctl start postgresql
```

### Puerto 3000 ocupado

Edita `.env` y cambia:
```env
PORT=3001
```

### Error de conexión a la base de datos

Verifica la conexión:
```bash
psql -U embera_user -d embera_traductor -c "SELECT 1;"
```

---

## 📚 Documentación Completa

- **Inicio Rápido**: Este archivo
- **Guía Detallada**: `LOCALHOST_SETUP.md`
- **Producción**: `INSTRUCCIONES_INSTALACION.md`
- **Referencia**: `CONFIGURACION_LOCALHOST.txt`

---

## 🎯 Comandos Útiles

```bash
# Desarrollo (hot-reload)
npm run dev

# Producción
npm run build && npm start

# Ver base de datos
psql -U embera_user -d embera_traductor

# Backup
pg_dump -U embera_user embera_traductor > backup.sql
```

---

**¡Listo para preservar el idioma Emberá!** 🌿
