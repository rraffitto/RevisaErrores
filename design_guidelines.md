# Design Guidelines: Emberá-Spanish Translator & Cultural Platform

## Design Approach
**Hybrid Approach**: Material Design principles for the translator interface (utility-focused) combined with culturally-rich visual storytelling for informational sections (experience-focused). Drawing inspiration from Google Translate's functional clarity while incorporating Duolingo's engaging educational approach.

## Core Design Principles
1. **Cultural Authenticity**: Respectful integration of Emberá visual heritage
2. **Accessibility First**: Clear typography and intuitive navigation for all users
3. **Dual Purpose**: Seamless transition between translation tool and cultural education

---

## Typography System

**Font Families** (Google Fonts):
- **Primary**: Inter (400, 500, 600, 700) - Interface, body text, translator
- **Headings**: Outfit (600, 700, 800) - Section titles, hero headlines
- **Accent**: Crimson Pro (400, 600) - Cultural content, storytelling sections

**Hierarchy**:
- **Hero/Display**: text-5xl to text-6xl (Outfit Bold)
- **Section Headers**: text-3xl to text-4xl (Outfit SemiBold)
- **Card Titles**: text-xl to text-2xl (Inter SemiBold)
- **Body Text**: text-base to text-lg (Inter Regular)
- **UI Elements**: text-sm to text-base (Inter Medium)

---

## Layout System

**Tailwind Spacing Primitives**: 2, 4, 6, 8, 12, 16, 20, 24
- Component padding: p-4 to p-6 (mobile), p-8 to p-12 (desktop)
- Section spacing: py-12 to py-16 (mobile), py-20 to py-24 (desktop)
- Card gaps: gap-4 to gap-6
- Container max-width: max-w-7xl with px-4 to px-8

**Grid Strategy**:
- Translator: Single column focus (max-w-4xl centered)
- Cultural features: 2-column (md:grid-cols-2)
- Community highlights: 3-column (lg:grid-cols-3)
- Mobile: Always single column with comfortable spacing

---

## Component Library

### Navigation
**Sticky Header** with subtle backdrop blur:
- Logo/wordmark (left): "Emberá-Español" with cultural icon element
- Main nav (center/right): "Traductor" | "Comunidad" | "Diccionario" | "Sobre Nosotros"
- Language toggle indicator
- Mobile: Hamburger menu with slide-out drawer

### Hero Section (Landing Page)
**Split Hero** (60/40 layout):
- **Left**: Large headline "Preservando el Idioma Emberá" + subheading about language preservation + primary CTA "Comenzar a Traducir"
- **Right**: Large hero image showing Emberá community/cultural imagery
- Height: min-h-[600px] on desktop, stack vertically on mobile

### Translator Interface (Primary Tool)
**Centered Card Design** (max-w-4xl):
- **Top Bar**: Language selector with swap button (Español ⇄ Emberá)
- **Input Area**: Large textarea (min-h-[180px]) with placeholder "Escribe una palabra..."
- **Translate Button**: Prominent, full-width on mobile
- **Output Area**: Matching textarea with results, copy button
- **Recent Translations**: Compact list below (optional history feature)
- Background: Subtle pattern or gradient inspired by Emberá textiles

### Cultural Information Sections

**"Sobre la Comunidad Emberá"** (About Section):
- Full-width image banner with overlay text
- 2-column layout: Text content + supporting image/map
- Stats cards: Population, regions, language speakers (3-column grid)

**"Historia y Cultura"** (History & Culture):
- Timeline component with key historical moments
- Card grid showcasing: Traditional crafts, Music/dance, Ceremonies, Daily life
- Each card: Image + title + brief description
- Use 2-3 column responsive grid

**"El Idioma Emberá"** (Language Section):
- Introduction to the language structure
- Fun facts/interesting linguistic features
- Visual phonetic guide (if applicable)
- Common phrases with pronunciation

**"Galería Cultural"** (Gallery):
- Masonry grid of Emberá cultural images
- Categories: Artesanía, Vestimenta tradicional, Comunidad, Naturaleza
- Lightbox modal for full-size viewing

### Dictionary Browser (Additional Feature)
- Search bar with filter options (Emberá → Español, Español → Emberá)
- Table/card view toggle
- Alphabetical navigation
- Paginated results

### Footer
**Multi-column Footer**:
- Column 1: About the project, brief mission statement
- Column 2: Quick links (Translator, Community, Dictionary)
- Column 3: Resources (External links, documentation)
- Column 4: Contact/social (if applicable)
- Bottom bar: Copyright, language acknowledgment, credits

---

## Cultural Design Elements

**Visual Patterns**:
- Subtle background patterns inspired by Emberá textiles (geometric, woven patterns)
- Use as decorative accents, not overwhelming
- Apply with low opacity (10-20%) behind content sections

**Decorative Elements**:
- Traditional Emberá geometric motifs as section dividers
- Stylized border patterns on cards/containers
- Cultural iconography for navigation/features

---

## Images

**Required Images**:
1. **Hero Image**: Emberá community members in traditional setting (natural, respectful portrayal) - right side of split hero
2. **Community Banner**: Wide landscape of Emberá region/village
3. **Cultural Cards** (4-6 images): Traditional crafts, textiles, ceremonies, daily life
4. **Gallery Collection** (12-20 images): Mix of people, crafts, landscapes, cultural activities
5. **Language Section**: Visual showing written Emberá text or teaching materials

**Image Treatment**:
- Rounded corners (rounded-lg to rounded-xl)
- Subtle shadow (shadow-md to shadow-lg)
- Aspect ratios: 16:9 for banners, 4:3 for cards, 1:1 for gallery grid

---

## Interactions & Animations

**Minimal, Purposeful Animations**:
- Smooth language swap transition (translate button icon rotation)
- Card hover: subtle lift (translate-y-1) + shadow increase
- Translation result: gentle fade-in
- Page transitions: Smooth scroll behavior

**No Animations**:
- Avoid distracting scroll effects
- No parallax on cultural sections (respect + performance)
- Keep translator interface instant and responsive

---

## Accessibility & Performance

- High contrast text (WCAG AA minimum)
- Focus states on all interactive elements (ring-2 ring-offset-2)
- Semantic HTML structure throughout
- Alt text for all cultural images (descriptive, respectful)
- Keyboard navigation fully supported
- Loading states for translation queries
- Error messages in clear, helpful language (bilingual when appropriate)

---

## Responsive Breakpoints

- **Mobile-first approach**
- sm: 640px (compact cards, single column)
- md: 768px (2-column grids, expanded navigation)
- lg: 1024px (3-column grids, full desktop layout)
- xl: 1280px (max content width, enhanced spacing)