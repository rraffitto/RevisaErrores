# 🚀 Guia Completa - Traductor Embera para Windows 11

Guia oficial para instalar y ejecutar el Traductor Embera-Espanol en Windows.

---

## ✅ Pre-requisitos

1. **Node.js v24+** - [Descargar](https://nodejs.org/)
2. **PostgreSQL 16+** - [Descargar](https://www.postgresql.org/download/windows/)
3. **PowerShell** (incluido en Windows)

---

## 🎯 Instalacion Rapida (2 Pasos)

### Paso 1: Configuracion Completa

```powershell
# Ejecutar desde la raiz del proyecto
.\scripts\windows\setup.ps1
```

Este script hace **TODO automaticamente**:
- ✅ Verifica Node.js y PostgreSQL
- ✅ Crea archivo `.env` con `HOST=127.0.0.1`
- ✅ Solicita tu contrasena de PostgreSQL
- ✅ Genera `SESSION_SECRET` aleatorio
- ✅ Crea la base de datos `traductor_embera`
- ✅ Carga las 264 palabras del diccionario
- ✅ Verifica que todo este correcto

**Ejemplo de salida:**
```
============================================
  Configuracion Completada
============================================

   OK Node.js v24.11.0 detectado
   OK PostgreSQL detectado
   OK Archivo .env creado con HOST=127.0.0.1
   OK Contrasena configurada
   OK SESSION_SECRET generado
   OK Base de datos creada
   OK Datos cargados (264 palabras)
   OK Verificado: 264 palabras en el diccionario
```

### Paso 2: Iniciar Servidor

```powershell
.\scripts\windows\dev.ps1
```

El servidor se iniciara en: `http://127.0.0.1:5000`

---

## 🌐 Acceder a la Aplicacion

Abre tu navegador en:

```
http://127.0.0.1:5000
```

o tambien:

```
http://localhost:5000
```

---

## 📋 Estructura del Proyecto

```
E:\RevisaErrores\
├── client/                    # Frontend React
│   └── src/
│       ├── components/        # Componentes reutilizables
│       └── pages/             # Paginas principales
├── server/                    # Backend Express
│   ├── index.ts              # Servidor (usa HOST=127.0.0.1)
│   ├── routes.ts             # API endpoints
│   └── storage.ts            # Capa de datos
├── scripts/
│   └── windows/              # Scripts PowerShell
│       ├── setup.ps1         # Configuracion completa
│       ├── dev.ps1           # Servidor desarrollo
│       └── start.ps1         # Servidor produccion
├── database_setup.sql        # 264 palabras iniciales
├── .env.windows              # Plantilla configuracion
├── .env                      # Tu configuracion (creado por setup)
└── package.json
```

---

## ⚙️ Configuracion (Archivo .env)

El archivo `.env` es creado automaticamente por `setup.ps1` con:

```env
# Puerto del servidor (5000 por defecto)
PORT=5000

# Host para Windows (IPv4 obligatorio)
HOST=127.0.0.1

# PostgreSQL
PGHOST=localhost
PGPORT=5432
PGUSER=postgres
PGPASSWORD=tu_contrasena
PGDATABASE=traductor_embera

# Seguridad
SESSION_SECRET=generado_automaticamente
```

**IMPORTANTE:** 
- `HOST=127.0.0.1` es obligatorio para Windows (no usar `localhost` o `0.0.0.0`)
- `PGHOST` puede ser `localhost` o un servidor remoto

---

## 🔧 Comandos Utiles

### Iniciar Servidor

```powershell
.\scripts\windows\dev.ps1
```

### Detener Servidor

Presiona `Ctrl+C` en la terminal

### Reinstalar Dependencias

```powershell
npm install
```

### Verificar Base de Datos

```powershell
# Ver cantidad de palabras
psql -U postgres -d traductor_embera -c "SELECT COUNT(*) FROM diccionario;"

# Debe mostrar: 264
```

### Recrear Base de Datos

```powershell
# Ejecutar setup de nuevo
.\scripts\windows\setup.ps1

# Te preguntara si deseas recrear la BD
```

---

## ✨ Funcionalidades

### Traductor Bidireccional
- Traduce palabra por palabra entre Embera ↔ Espanol
- Intercambio rapido de idiomas
- Funcion de copiado de traducciones
- Manejo de errores bilingue

### Diccionario (264 palabras)
- Busqueda en tiempo real
- Navegacion alfabetica con separadores A-Z
- Layout responsive de 4 columnas
- Tarjetas visuales organizadas

### Contenido Cultural
- Informacion sobre la comunidad Embera
- Mapa interactivo del Resguardo Alto Rio Bojaya (Google Maps)
- Historia y cultura con timeline
- Videos culturales de YouTube
- Calendario de festivos en Colombia
- Galeria de imagenes con lightbox

---

## ❌ Solucion de Problemas

### Error: "listen ENOTSUP: operation not supported on socket ::1"

**Causa:** El archivo `.env` tiene `HOST=localhost` o no existe

**Solucion:**
```powershell
# Opcion 1: Ejecutar dev.ps1 (corrige automaticamente)
.\scripts\windows\dev.ps1

# Opcion 2: Editar .env manualmente
notepad .env
# Cambiar a: HOST=127.0.0.1
```

### Error: "Cannot connect to PostgreSQL"

**Verificar que PostgreSQL esta corriendo:**
1. Abrir "Servicios" de Windows (services.msc)
2. Buscar "PostgreSQL"
3. Verificar que el estado sea "En ejecucion"

**Verificar contrasena:**
```powershell
# Probar conexion
psql -U postgres

# Si falla, edita .env con la contrasena correcta
notepad .env
```

### Error: "database_setup.sql not found"

**Causa:** El archivo no esta en la raiz del proyecto

**Solucion:**
```powershell
# Verificar que estas en la raiz del proyecto
cd E:\RevisaErrores

# Verificar que el archivo existe
dir database_setup.sql
```

### Error: "node_modules not found"

**Solucion:**
```powershell
npm install
```

---

## 🎯 Notas Tecnicas

### Por que HOST=127.0.0.1?

- `localhost` se resuelve a IPv6 (`::1`) en Windows
- Node.js no siempre soporta escuchar en IPv6
- `127.0.0.1` es IPv4 directo, **siempre funciona**

### Por que Puerto 5000?

- Puerto por defecto de Replit
- Configurado para compatibilidad cloud/local

### Scripts PowerShell Inteligentes

Los scripts **siempre corrigen** `HOST=127.0.0.1` automaticamente:
- Usan regex anclado: `(?m)^HOST=.*`
- Solo modifican lineas que EMPIEZAN con `HOST=`
- **NO tocan** `PGHOST`, `REDIS_HOST`, etc.

### Compatibilidad

- ✅ Funciona en **cualquier unidad** (C:, D:, E:, etc.)
- ✅ Sin dependencias de Linux/Mac
- ✅ Solo comandos PowerShell nativos
- ✅ Autoconfigurable y robusto

---

## 📊 Tecnologias

### Frontend
- React 18 + TypeScript
- Wouter (enrutamiento)
- TanStack Query (estado)
- Tailwind CSS + Shadcn UI
- Vite (build tool)

### Backend
- Express.js
- PostgreSQL + Drizzle ORM
- Zod (validacion)
- dotenv (configuracion)

### Diseno
- Fuentes: Inter, Outfit, Crimson Pro
- Colores: Paleta cultural Embera (terracotta/naranja)
- Responsive: Mobile-first design

---

## 📚 Mas Informacion

Para mas comandos y opciones avanzadas, consulta:
- `COMANDOS_WINDOWS.md` - Referencia completa de comandos

---

## 🎉 Estado del Proyecto

| Componente | Estado |
|------------|--------|
| Traductor | ✅ Funcional (264 palabras) |
| Diccionario | ✅ Busqueda y navegacion |
| Contenido Cultural | ✅ Completo |
| Base de Datos | ✅ PostgreSQL |
| Scripts Windows | ✅ Automatizados |
| Error ENOTSUP | ✅ Resuelto |
| Documentacion | ✅ Completa |

---

## 🌍 Contexto Cultural

### El Pueblo Embera

Los Embera son una comunidad indigena que habita principalmente en las selvas tropicales del Pacifico colombiano, con aproximadamente 200,000 personas en Colombia y Panama, de las cuales alrededor de 80,000 son hablantes nativos activos del idioma.

### Preservacion Linguistica

Este proyecto contribuye a la revitalizacion y preservacion del idioma embera, proporcionando una herramienta digital moderna para el aprendizaje y documentacion de la lengua ancestral.

---

## 📞 Soporte

Si encuentras problemas:

1. Verifica que Node.js y PostgreSQL esten instalados
2. Ejecuta `.\scripts\windows\setup.ps1` de nuevo
3. Revisa que `.env` tenga `HOST=127.0.0.1`
4. Consulta la seccion "Solucion de Problemas" arriba

---

## 🎯 Resumen Ejecutivo

```powershell
# 1. Configuracion completa (primera vez)
.\scripts\windows\setup.ps1

# 2. Iniciar servidor
.\scripts\windows\dev.ps1

# 3. Abrir navegador
# http://127.0.0.1:5000
```

**El proyecto esta listo para usar en Windows 11!** 🎉

---

**Proyecto desarrollado con respeto y honor hacia la cultura y lengua del pueblo Embera de Colombia.**

**Ultima actualizacion:** Noviembre 2024
