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

# 3. Instalar dependencias
npm install

# 4. Habilitar scripts PowerShell (solo la primera vez)
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned

# 5. Configurar proyecto (automático)
.\scripts\windows\setup.ps1

# 6. Iniciar servidor
.\scripts\windows\dev.ps1

# 7. Abrir navegador
# http://localhost:3000
```

### 🆕 Scripts PowerShell Automatizados

El proyecto ahora incluye scripts que simplifican la configuración:

- `.\scripts\windows\setup.ps1` - Configuración automática
- `.\scripts\windows\dev.ps1` - Iniciar desarrollo
- `.\scripts\windows\db-push.ps1` - Sincronizar base de datos
- `.\scripts\windows\start.ps1` - Iniciar producción

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

### "NODE_ENV no se reconoce" en PowerShell
✅ **Solución**: Usa los scripts PowerShell:
```powershell
.\scripts\windows\dev.ps1
```

O manualmente con `npx cross-env`:
```powershell
npx cross-env NODE_ENV=development tsx server/index.ts
```

### PostgreSQL no se reconoce
Agregar PostgreSQL al PATH de Windows:
1. Busca "Variables de entorno"
2. Editar `Path` → Nuevo
3. Agregar: `C:\Program Files\PostgreSQL\16\bin`

### Error "DATABASE_URL, ensure the database is provisioned"
El archivo `.env` no está configurado. Ejecuta:
```powershell
.\scripts\windows\setup.ps1
```

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
