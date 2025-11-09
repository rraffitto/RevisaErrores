# 📦 Instrucciones de Instalación - Traductor Emberá-Español

Este documento te guiará para instalar y configurar el proyecto en tu servidor personal.

## 📋 Requisitos Previos

- **Node.js** 18+ (recomendado: 20.x)
- **PostgreSQL** 14+ 
- **npm** o **yarn**

## 🗄️ Configuración de la Base de Datos

### Paso 1: Crear la Base de Datos

```bash
# Conectar a PostgreSQL como superusuario
sudo -u postgres psql

# Crear la base de datos
CREATE DATABASE embera_traductor;

# Crear un usuario (opcional)
CREATE USER embera_user WITH PASSWORD 'tu_password_seguro';

# Otorgar permisos
GRANT ALL PRIVILEGES ON DATABASE embera_traductor TO embera_user;

# Salir
\q
```

### Paso 2: Ejecutar el Script SQL

Hay varias formas de ejecutar el script `database_setup.sql`:

**Opción A: Desde la línea de comandos**
```bash
psql -U embera_user -d embera_traductor -f database_setup.sql
```

**Opción B: Desde psql interactivo**
```bash
psql -U embera_user -d embera_traductor

# Dentro de psql:
\i database_setup.sql
```

**Opción C: Con la URL de conexión completa**
```bash
psql postgresql://embera_user:tu_password@localhost:5432/embera_traductor -f database_setup.sql
```

### Paso 3: Verificar la Instalación

```bash
psql -U embera_user -d embera_traductor

# Verificar que la tabla existe y tiene 81 palabras
SELECT COUNT(*) FROM diccionario;

# Deberías ver: 81

# Ver algunas palabras de ejemplo
SELECT * FROM diccionario LIMIT 5;
```

## ⚙️ Configuración de la Aplicación

### Paso 1: Instalar Dependencias

```bash
# En el directorio del proyecto
npm install
```

### Paso 2: Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Base de Datos PostgreSQL
DATABASE_URL=postgresql://embera_user:tu_password@localhost:5432/embera_traductor
PGHOST=localhost
PGPORT=5432
PGUSER=embera_user
PGPASSWORD=tu_password_seguro
PGDATABASE=embera_traductor

# Secreto de Sesión (genera uno aleatorio)
SESSION_SECRET=genera_un_string_aleatorio_muy_largo_y_seguro_aqui

# Puerto de la aplicación (opcional, por defecto 5000)
PORT=5000

# Entorno
NODE_ENV=production
```

**Generar un SESSION_SECRET seguro:**
```bash
# En Linux/Mac
openssl rand -base64 32

# O en Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Paso 3: Construir la Aplicación

```bash
# Compilar el frontend
npm run build
```

### Paso 4: Iniciar la Aplicación

**Modo Desarrollo:**
```bash
npm run dev
```

**Modo Producción:**
```bash
npm start
```

La aplicación estará disponible en: `http://localhost:5000`

## 🔧 Configuración Adicional para Servidor

### Usar PM2 para Mantener la Aplicación Corriendo

```bash
# Instalar PM2 globalmente
npm install -g pm2

# Iniciar la aplicación con PM2
pm2 start npm --name "embera-traductor" -- start

# Ver logs
pm2 logs embera-traductor

# Reiniciar
pm2 restart embera-traductor

# Configurar para iniciar automáticamente al reiniciar el servidor
pm2 startup
pm2 save
```

### Configurar Nginx como Proxy Inverso

Crea un archivo de configuración: `/etc/nginx/sites-available/embera-traductor`

```nginx
server {
    listen 80;
    server_name tu-dominio.com www.tu-dominio.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Habilitar el sitio:
```bash
sudo ln -s /etc/nginx/sites-available/embera-traductor /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Configurar SSL con Let's Encrypt (Certbot)

```bash
# Instalar Certbot
sudo apt install certbot python3-certbot-nginx

# Obtener certificado SSL
sudo certbot --nginx -d tu-dominio.com -d www.tu-dominio.com

# El certificado se renovará automáticamente
```

## 🔒 Seguridad

### Configurar el Firewall

```bash
# Permitir SSH, HTTP y HTTPS
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

### Asegurar PostgreSQL

Edita `/etc/postgresql/14/main/postgresql.conf`:
```
listen_addresses = 'localhost'
```

Edita `/etc/postgresql/14/main/pg_hba.conf`:
```
# Solo permitir conexiones locales
local   all             all                                     md5
host    all             all             127.0.0.1/32            md5
host    all             all             ::1/128                 md5
```

Reinicia PostgreSQL:
```bash
sudo systemctl restart postgresql
```

## 📊 Monitoreo y Logs

### Ver logs de la aplicación
```bash
# Con PM2
pm2 logs embera-traductor

# Logs de Nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Logs de PostgreSQL
sudo tail -f /var/log/postgresql/postgresql-14-main.log
```

## 🔄 Actualización y Mantenimiento

### Actualizar la Aplicación

```bash
# Hacer backup de la base de datos
pg_dump -U embera_user embera_traductor > backup_$(date +%Y%m%d).sql

# Actualizar el código
git pull origin main  # Si usas Git

# Instalar nuevas dependencias
npm install

# Reconstruir
npm run build

# Reiniciar
pm2 restart embera-traductor
```

### Backup de la Base de Datos

```bash
# Backup manual
pg_dump -U embera_user embera_traductor > embera_backup_$(date +%Y%m%d_%H%M%S).sql

# Restaurar desde backup
psql -U embera_user -d embera_traductor < embera_backup_YYYYMMDD_HHMMSS.sql
```

### Configurar Backups Automáticos (Cron)

```bash
# Editar crontab
crontab -e

# Agregar backup diario a las 3:00 AM
0 3 * * * pg_dump -U embera_user embera_traductor > /ruta/backups/embera_$(date +\%Y\%m\%d).sql
```

## 🆘 Solución de Problemas

### La aplicación no inicia
```bash
# Verificar que PostgreSQL está corriendo
sudo systemctl status postgresql

# Verificar conexión a la base de datos
psql -U embera_user -d embera_traductor -c "SELECT 1;"

# Ver logs de la aplicación
pm2 logs embera-traductor
```

### Error de conexión a la base de datos
- Verifica que `DATABASE_URL` en `.env` es correcta
- Verifica que el usuario tiene permisos
- Verifica que PostgreSQL acepta conexiones locales

### Puerto 5000 en uso
```bash
# Encontrar qué proceso usa el puerto
sudo lsof -i :5000

# O cambiar el puerto en .env
PORT=3000
```

## 📞 Contacto y Soporte

Para problemas o preguntas sobre la instalación, consulta:
- La documentación del proyecto en `replit.md`
- Los logs de la aplicación para detalles de errores

---

**¡Buen trabajo preservando el idioma y la cultura Emberá!** 🎉
