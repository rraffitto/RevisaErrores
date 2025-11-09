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
- 264 palabras únicas (deduplicado en despliegue Windows)
- Búsqueda en tiempo real por español o emberá
- Navegación alfabética con separadores A-Z
- Layout responsive de 4 columnas
- Interfaz responsive con tarjetas visuales

### 🌍 Contenido Cultural
- **PageHeader Unificado**: Imagen de niños Emberá en todas las páginas con overlay oscuro
- **Sobre la Comunidad**: Estadísticas de población, regiones y hablantes
- **Mapa del Resguardo**: Google Maps embed del Resguardo Alto Río Bojayá
- **Historia y Cultura**: Timeline histórico y aspectos culturales (artesanías, música, ceremonias)
- **El Idioma Emberá**: Características lingüísticas y frases comunes
- **Videos Culturales**: 2 videos de YouTube sobre danzas y cultura Emberá
- **Calendario de Festivos**: Google Calendar de festivos en Colombia
- **Galería Cultural**: Colección de imágenes con lightbox modal

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
- **Imágenes**: 10 imágenes culturales generadas con IA

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
└── attached_assets/
    └── generated_images/               # Imágenes culturales
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

**Datos iniciales**: 81 pares de palabras incluyendo:
- Saludos (hola, buenos días, gracias)
- Familia (padre, madre, hijo, hermano)
- Naturaleza (agua, río, montaña, árbol)
- Colores, números, animales, etc.

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

### En Replit (Desarrollo en la Nube)

El workflow "Start application" ya está configurado y ejecuta:

```bash
npm run dev
```

Esto inicia:
- Servidor Express en puerto 5000
- Servidor Vite para el frontend
- Hot reload automático

### En Windows 11 (Despliegue Local)

Para ejecutar en Windows 11 (probado en unidad E:\):

```powershell
# Opción rápida - el script autoconfigura todo
.\scripts\windows\dev.ps1
```

El servidor se iniciará en `http://127.0.0.1:5000`

**Características del despliegue Windows:**
- ✅ Scripts PowerShell automatizados (sin comandos Linux/Mac)
- ✅ Autocreación de archivo `.env` con `HOST=127.0.0.1`
- ✅ Corrección automática de configuraciones IPv6 problemáticas
- ✅ Compatible con cualquier unidad (C:, D:, E:, etc.)
- ✅ Base de datos PostgreSQL con 264 palabras

**Documentación Windows:**
- `INICIO_RAPIDO_WINDOWS.md` - Guía de inicio rápido
- `SOLUCION_FINAL_WINDOWS.md` - Solución completa al error ENOTSUP
- `INSTALACION_WINDOWS.md` - Instalación detallada
- `COMANDOS_WINDOWS.md` - Referencia de comandos
- `scripts/windows/` - Scripts PowerShell automatizados

## Variables de Entorno

Las siguientes variables están configuradas automáticamente:
- `DATABASE_URL`: URL de conexión a PostgreSQL
- `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE`: Credenciales de la base de datos
- `SESSION_SECRET`: Secreto para sesiones

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
- [x] Base de datos PostgreSQL con 81 palabras
- [x] PageHeader unificado con imagen cultural en todas las páginas
- [x] Páginas de información cultural completas
- [x] Mapa interactivo del Resguardo Alto Río Bojayá (Google Maps)
- [x] Videos culturales de YouTube embebidos (Danza del Pato, Cultura Emberá)
- [x] Calendario de festivos en Colombia (Google Calendar)
- [x] Galería de imágenes con lightbox
- [x] Búsqueda en diccionario
- [x] Diseño responsive
- [x] Estados de carga y manejo de errores
- [x] Navegación completa

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
