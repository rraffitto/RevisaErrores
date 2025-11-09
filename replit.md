# Traductor Emberá-Español

## Descripción del Proyecto

Plataforma web dedicada a preservar y promover el idioma y la cultura del pueblo Emberá de Colombia. Combina un traductor bidireccional Emberá-Español con contenido educativo y cultural sobre la comunidad Emberá.

## Características Principales

### 🔄 Traductor Bidireccional
- Traducción palabra por palabra entre español y emberá
- Interfaz intuitiva con selectores de idioma
- Estados de carga y manejo de errores con mensajes bilingües
- Botón de intercambio rápido de idiomas
- Función de copiado de traducciones

### 📚 Diccionario Completo
- **264 palabras únicas** en el diccionario (ampliado desde 81 palabras originales)
- Incluye dialectos Emberá Dobida compilados por Anatolio Chanapicama 2025
- Búsqueda en tiempo real por español o emberá
- Navegación alfabética
- Interfaz responsive con tarjetas visuales

### 🌍 Contenido Cultural
- **PageHeader Unificado**: Imagen de niños Emberá en todas las páginas con overlay oscuro
- **Sobre la Comunidad**: Estadísticas de población, regiones y hablantes
- **Mapa del Resguardo**: Google Maps embed del Resguardo Alto Río Bojayá
- **Historia y Cultura**: Timeline histórico y aspectos culturales (artesanías, música, ceremonias)
- **El Idioma Emberá**: Características lingüísticas y frases comunes
- **Videos Culturales**: 2 videos de YouTube sobre danzas y cultura Emberá
- **Calendario de Festivos**: Google Calendar de festivos en Colombia
- **Galería Cultural**: 11 fotografías auténticas de artesanías, danzas, arquitectura y comunidad con lightbox modal

## Tecnologías Utilizadas

### Frontend
- React + TypeScript
- Wouter para enrutamiento
- TanStack Query para gestión de estado
- Tailwind CSS para estilos
- Shadcn UI para componentes
- Vite como build tool

### Backend
- Express.js
- PostgreSQL con Drizzle ORM
- Zod para validación
- API REST

### Diseño
- **Fuentes**: Inter (interfaz), Outfit (títulos), Crimson Pro (contenido cultural)
- **Colores**: Paleta cultural Emberá con tonos terracotta/naranja (HSL 28 80% 52%)
- **Responsive**: Mobile-first design
- **Imágenes**: 11 fotografías auténticas de la cultura Emberá + 1 imagen de header (niños Emberá)

## Estructura del Proyecto

```
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.tsx              # Navegación principal
│   │   │   ├── Footer.tsx              # Pie de página
│   │   │   ├── PageHeader.tsx          # Header de página con imagen (niños Emberá)
│   │   │   ├── Translator.tsx          # Componente traductor
│   │   │   ├── AboutCommunity.tsx      # Info comunidad
│   │   │   ├── ResguardoMap.tsx        # Mapa Google Maps del resguardo
│   │   │   ├── HistoryCulture.tsx      # Historia y cultura
│   │   │   ├── LanguageSection.tsx     # Info del idioma
│   │   │   ├── CulturalVideos.tsx      # Videos de YouTube
│   │   │   ├── FestivosCalendar.tsx    # Calendario de festivos
│   │   │   └── Gallery.tsx             # Galería de imágenes
│   │   ├── pages/
│   │   │   ├── Home.tsx                # Página principal
│   │   │   ├── Community.tsx           # Página comunidad
│   │   │   └── Dictionary.tsx          # Página diccionario
│   │   └── App.tsx                     # Router principal
│   └── index.html
├── server/
│   ├── db.ts                           # Conexión PostgreSQL
│   ├── storage.ts                      # Capa de datos
│   └── routes.ts                       # Endpoints API
├── shared/
│   └── schema.ts                       # Esquemas compartidos
└── attached_assets/                    # Fotografías reales de la cultura Emberá
    ├── 018_1762692764924.png           # Header: Niños Emberá
    ├── 041_1762692764925.png           # Artesana tejiendo
    ├── 098_1762692764925.png           # Tambó tradicional
    ├── Embera dobida_1762692764926.jpg # Mujeres con vestimenta
    ├── embera_1762692764927.jpg        # Danza tradicional
    ├── foto de chano_1762692764927.jpeg # Grupo con instrumentos
    ├── Fotografia-2-1-scaled_1762692764928.jpg # Familia Emberá
    ├── getlstd-property-photo_1762692764928.jpg # Grupo colorido
    ├── hq720_1762692764929.jpg         # Danza en interior
    ├── kipara-te_1762692764929.jpg     # Danza en Kipara-té
    ├── Nepono Werara_1762692764930.jpg # Grupo de mujeres
    └── Tambo_1762692764930.jpg         # Estructura tradicional
```

## Base de Datos

### Tabla: diccionario

```sql
CREATE TABLE diccionario (
  id SERIAL PRIMARY KEY,
  espanol TEXT NOT NULL,
  embera TEXT NOT NULL
);
```

**Datos**: 264 pares de palabras incluyendo:
- Saludos (hola, buenos días, gracias, adiós)
- Familia (padre, madre, hijo, hermano, hermana)
- Naturaleza (agua, río, montaña, árbol, selva)
- Animales (tigre, águila, guacamaya, tucán, rana)
- Plantas (palma, chontaduro, platano, piña)
- Colores, números, verbos, objetos
- Dialectos Emberá Dobida (2025)

## API Endpoints

### GET /api/translate
Traduce una palabra entre español y emberá.

**Query Parameters:**
- `word` (string): Palabra a traducir
- `from` (string): Idioma origen ("es-ES" | "em-EM")
- `to` (string): Idioma destino ("es-ES" | "em-EM")

**Response:**
```json
{
  "translation": "palabra_traducida"
}
```

**Errores:**
- 400: Parámetros inválidos
- 404: Palabra no encontrada
- 500: Error del servidor

### GET /api/dictionary
Obtiene todas las palabras del diccionario.

**Response:**
```json
[
  {
    "id": 1,
    "espanol": "agua",
    "embera": "juí"
  },
  ...
]
```

## Cómo Ejecutar el Proyecto

### En Replit (Desarrollo)

El workflow "Start application" ya está configurado y ejecuta:

```bash
npm run dev
```

Esto inicia:
- Servidor Express en puerto 5000
- Servidor Vite para el frontend
- Hot reload automático

### En Localhost (Puerto 3000)

Para ejecutar en tu computadora local:

1. **Configurar PostgreSQL** (ver `database_setup.sql`)
2. **Copiar configuración**: `cp .env.localhost .env`
3. **Instalar dependencias**: `npm install`
4. **Iniciar servidor**: `npm run dev`
5. **Abrir navegador**: `http://localhost:3000`

📖 **Guía completa**: Ver `LOCALHOST_SETUP.md`

## Variables de Entorno

### En Replit (Automáticas)

Las siguientes variables están configuradas automáticamente:
- `DATABASE_URL`: URL de conexión a PostgreSQL
- `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE`: Credenciales de la base de datos
- `SESSION_SECRET`: Secreto para sesiones

### Para Localhost

Archivo `.env.localhost` incluye:
- `PORT=3000`: Puerto del servidor
- `DATABASE_URL`: Conexión a PostgreSQL local
- `SESSION_SECRET`: Ya generado y seguro
- `NODE_ENV=development`: Modo desarrollo

**Archivos de configuración:**
- `.env.localhost` → Listo para copiar a `.env`
- `.env.example` → Plantilla con documentación
- `LOCALHOST_SETUP.md` → Guía paso a paso
- `CONFIGURACION_LOCALHOST.txt` → Referencia rápida

## Características de Diseño

### Paleta de Colores Culturales
- **Primary**: Terracotta/Naranja (HSL 28 80% 52%) - Inspirado en artesanías Emberá
- **Background**: Tonos neutros claros
- **Accent**: Tonos tierra complementarios

### Tipografía Jerárquica
- **Display/Hero**: Outfit Bold (text-5xl a text-6xl)
- **Encabezados**: Outfit SemiBold (text-3xl a text-4xl)
- **Cuerpo**: Inter Regular (text-base a text-lg)
- **Cultural**: Crimson Pro para contenido narrativo

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Navegación adaptable con menú hamburguesa en móvil
- Grid responsive (1, 2 o 3 columnas según pantalla)

## Testing

El proyecto ha pasado todas las pruebas end-to-end que verifican:
- ✅ Traducción Español → Emberá
- ✅ Traducción Emberá → Español
- ✅ Intercambio de idiomas
- ✅ Manejo de errores para palabras no encontradas
- ✅ Búsqueda en el diccionario
- ✅ Navegación entre páginas
- ✅ Carga de contenido cultural

## Estado del Proyecto

**Versión**: MVP 1.0  
**Estado**: ✅ Completo y Funcional

### Características Implementadas
- [x] Traductor bidireccional funcional
- [x] Base de datos PostgreSQL con **264 palabras únicas** (ampliado y deduplicado desde 81 palabras iniciales)
- [x] Scripts de importación y deduplicación automatizados
  - `scripts/import_words.ts` - Importa palabras desde Excel
  - `scripts/export_to_sql.ts` - Genera SQL desde base de datos
  - `scripts/deduplicate_dictionary.ts` - Elimina duplicados
- [x] PageHeader unificado con imagen cultural en todas las páginas
- [x] Páginas de información cultural completas
- [x] Mapa interactivo del Resguardo Alto Río Bojayá (Google Maps)
- [x] Videos culturales de YouTube embebidos (Danza del Pato, Cultura Emberá)
- [x] Calendario de festivos en Colombia (Google Calendar)
- [x] Galería con 11 fotografías auténticas de la cultura Emberá (lightbox modal)
- [x] Búsqueda en diccionario
- [x] Diseño responsive
- [x] Estados de carga y manejo de errores
- [x] Navegación completa
- [x] Configuración lista para localhost (puerto 3000)
- [x] Scripts de instalación y deployment
- [x] Documentación completa de instalación

### Próximas Mejoras Posibles
- [ ] Pronunciación de palabras con audio
- [ ] Sistema de contribución comunitaria
- [ ] Frases completas y expresiones idiomáticas
- [ ] Modo offline con Service Workers
- [ ] Estadísticas de uso
- [ ] Más contenido cultural multimedia

## Contexto Cultural

### El Pueblo Emberá
Los Emberá son una comunidad indígena que habita principalmente en las selvas tropicales del Pacífico colombiano, con aproximadamente 200,000 personas en Colombia y Panamá, de las cuales alrededor de 80,000 son hablantes nativos activos del idioma.

### Preservación Lingüística
Este proyecto contribuye a la revitalización y preservación del idioma emberá, proporcionando una herramienta digital moderna para el aprendizaje y documentación de la lengua ancestral.

## Créditos

Proyecto desarrollado con respeto y honor hacia la cultura y lengua del pueblo Emberá de Colombia.

---

**Última actualización**: Noviembre 2024
