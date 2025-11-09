# 🪟 Traductor Emberá-Español para Windows 11

## 📖 Inicio Rápido

### Requisitos Previos
- Windows 11
- Node.js 18+ ([Descargar](https://nodejs.org/))
- PostgreSQL 14+ ([Descargar](https://www.postgresql.org/download/windows/))

### Instalación Rápida

```powershell
# 1. Crear base de datos
psql -U postgres -c "CREATE DATABASE traductor_embera;"

# 2. Cargar datos (264 palabras)
psql -U postgres -d traductor_embera -f database_setup.sql

# 3. Configurar variables de entorno
copy .env.windows .env
notepad .env
# (Editar con tu contraseña de PostgreSQL)

# 4. Instalar dependencias
npm install

# 5. Iniciar servidor
npm run dev

# 6. Abrir navegador
# http://localhost:3000
```

---

## 📚 Documentación Completa

- **[INSTALACION_WINDOWS.md](INSTALACION_WINDOWS.md)** - Guía completa de instalación paso a paso
- **[COMANDOS_WINDOWS.md](COMANDOS_WINDOWS.md)** - Referencia de comandos PowerShell
- **[README.md](README.md)** - Documentación técnica completa del proyecto

---

## 🎯 Características

### ✨ Traductor
- Traducción bidireccional Emberá ↔ Español
- 264 palabras únicas del dialecto Emberá Dobida
- Interfaz intuitiva y responsive

### 📖 Diccionario
- Búsqueda en tiempo real
- Organización alfabética A-Z
- 4 columnas en desktop, responsive en móvil

### 🌍 Contenido Cultural
- Historia y cultura del pueblo Emberá
- Galería con 11 fotografías auténticas
- Mapa del Resguardo Alto Río Bojayá
- Videos culturales de YouTube

---

## 🆘 Problemas Comunes

### PostgreSQL no se reconoce
Agregar PostgreSQL al PATH de Windows:
1. Busca "Variables de entorno"
2. Editar `Path` → Nuevo
3. Agregar: `C:\Program Files\PostgreSQL\16\bin`

### Error de conexión a la base de datos
Verificar que PostgreSQL esté corriendo:
```powershell
Get-Service postgresql*
Start-Service postgresql-x64-16
```

### Puerto 3000 ocupado
Cambiar puerto en `.env`:
```env
PORT=8080
```

---

## 🔧 Comandos Útiles

```powershell
# Iniciar servidor
npm run dev

# Importar palabras desde Excel
npx tsx scripts/import_words.ts

# Deduplicar palabras
npx tsx scripts/deduplicate_dictionary.ts

# Backup de base de datos
pg_dump -U postgres -d traductor_embera -f backup.sql
```

---

## 📞 Soporte

Consulta la documentación completa en:
- **[INSTALACION_WINDOWS.md](INSTALACION_WINDOWS.md)** para instalación
- **[COMANDOS_WINDOWS.md](COMANDOS_WINDOWS.md)** para comandos
- **[README.md](README.md)** para arquitectura técnica

---

**Versión**: 1.0  
**Plataforma**: Windows 11  
**Última actualización**: Noviembre 2024
