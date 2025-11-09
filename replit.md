# Emberá-Español Translator Platform

## Overview

A web-based cultural preservation platform combining a bidirectional Emberá-Spanish translator with educational content about the Emberá indigenous community of Colombia. The application features a dictionary of 264 unique words from the Emberá Dobida dialect and rich multimedia content showcasing Emberá culture, history, and traditions.

**Primary Purpose**: Preserve and promote the Emberá language and cultural heritage through accessible translation tools and educational resources.

**Target Platform**: Web application optimized for Windows 11 deployment with Node.js and PostgreSQL.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework Stack**:
- **React 18** with **TypeScript** for type-safe component development
- **Vite** as the build tool and development server
- **Wouter** for lightweight client-side routing (3 main routes: Home, Community, Dictionary)
- **TanStack Query** for server state management and API data fetching

**UI Component Strategy**:
- **Shadcn UI** component library built on Radix UI primitives
- **Tailwind CSS** for utility-first styling with custom design tokens
- **Design System**: Hybrid approach combining Material Design principles (translator interface) with culturally-rich visual storytelling (community sections)

**Typography System**:
- Primary: Inter (interface/body text)
- Headings: Outfit (section titles)
- Accent: Crimson Pro (cultural content)

**Key Frontend Components**:
- `Translator`: Bidirectional translation interface with language swap, copy functionality, and loading states
- `PageHeader`: Unified header component with Emberá children imagery and dark overlay
- `Dictionary`: Searchable word list with alphabetical grouping
- `Gallery`: Masonry grid layout with lightbox modal for 11 cultural photographs
- `AboutCommunity`, `HistoryCulture`, `LanguageSection`: Educational content sections
- `ResguardoMap`, `CulturalVideos`, `FestivosCalendar`: Embedded multimedia content (Google Maps, YouTube, Google Calendar)

### Backend Architecture

**Server Framework**:
- **Express.js** REST API with TypeScript
- Custom middleware for request logging and JSON body parsing
- Error handling with structured JSON responses

**API Endpoints**:
- `GET /api/translate` - Word translation with query parameters (word, from, to)
- `GET /api/dictionary` - Full dictionary retrieval
- `GET /api/dictionary/search` - Word search by query string

**Validation Strategy**:
- **Zod** schemas for runtime type validation on API requests
- Ensures language codes are valid ("es-ES" or "em-EM")
- Validates required fields and prevents same-language translation

**Development Server**:
- Vite middleware integration for HMR in development
- Separate static file serving in production
- Replit-specific plugins for error overlay and development tools

### Data Storage

**Database**:
- **PostgreSQL** as the primary relational database
- **Drizzle ORM** for type-safe database queries and schema management
- **@neondatabase/serverless** connection pooling for Neon PostgreSQL instances

**Database Schema** (`shared/schema.ts`):

1. **diccionario** table:
   - `id`: Serial primary key
   - `espanol`: Text field (Spanish words)
   - `embera`: Text field (Emberá words)
   - Contains 264 unique word pairs from Emberá Dobida dialect

2. **users** table (for future authentication):
   - `id`: UUID primary key
   - `username`: Unique text field
   - `password`: Text field for hashed passwords

**Query Patterns**:
- Case-insensitive search using `ilike` for flexible word matching
- Alphabetical sorting for dictionary display
- Bidirectional translation logic (Spanish→Emberá and Emberá→Spanish)

**Data Migration**:
- Custom import scripts in `scripts/` directory for Excel-based dictionary imports
- Deduplication utilities to maintain data integrity
- SQL export capabilities for database portability

### State Management

**Client-Side State**:
- TanStack Query handles all server state with automatic caching
- React local state for UI interactions (language selection, search terms, modal visibility)
- No global state management needed due to simple data flow

**Query Configuration**:
- Infinite stale time (data rarely changes)
- No automatic refetching (controlled fetches only)
- Error handling with toast notifications

### Authentication & Authorization

**Current State**: No authentication implemented

**Future Consideration**: User schema exists for potential login/registration features, but currently unused. Platform is fully public-facing.

## External Dependencies

### Third-Party Services

1. **Google Maps Embed API**:
   - Displays Resguardo Alto Río Bojayá location
   - Static iframe embed (no API key required for basic embedding)

2. **YouTube Embed**:
   - Two cultural videos embedded via iframe
   - Videos showcase Emberá dances and cultural practices

3. **Google Calendar Embed**:
   - Colombian holiday calendar integration
   - Public calendar URL for festivos in Colombia

### Cloud Services

**Neon PostgreSQL**:
- Serverless PostgreSQL hosting via `@neondatabase/serverless`
- WebSocket-based connection pooling
- Environment variable: `DATABASE_URL` for connection string

### Package Dependencies

**Core Runtime**:
- Node.js 18+ required
- PostgreSQL 14+ for local development

**Major Dependencies**:
- `express` ^5.1.0 - Web server framework
- `react` ^18.x - UI library
- `drizzle-orm` ^0.39.1 - Database ORM
- `@tanstack/react-query` ^5.60.5 - Data fetching
- `wouter` - Routing library
- `zod` - Schema validation
- `tailwindcss` - CSS framework
- `vite` - Build tool

**Radix UI Components** (20+ components):
- Headless UI primitives for accessibility
- Dialog, Dropdown, Select, Accordion, Toast, etc.

### Asset Management

**Static Assets** (`attached_assets/` directory):
- 11 cultural photographs (PNG, JPG, JPEG formats)
- Generated AI images for hero sections and cultural content
- All images optimized for web delivery

**Image Strategy**:
- Images imported via Vite's asset handling
- Automatic optimization and bundling
- TypeScript path alias `@assets` for clean imports

### Development Tools

**Replit Integration**:
- Custom Vite plugins for error overlays and dev banners
- Cartographer plugin for code navigation
- Runtime error modal for debugging

**Build Process**:
- Frontend: Vite builds to `dist/public`
- Backend: esbuild bundles server to `dist/index.js`
- TypeScript compilation via `tsx` in development
- Production uses compiled JavaScript bundle

### Environment Configuration

**Required Environment Variables**:
- `DATABASE_URL` - PostgreSQL connection string
- `NODE_ENV` - "development" or "production"
- `PORT` - Server port (defaults to 3000)

**Windows-Specific Setup**:
- `.env.windows` template provided for local development
- PowerShell scripts documented in `COMANDOS_WINDOWS.md`
- PostgreSQL installation via Windows installer