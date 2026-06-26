# Shinagave's Bestiary

A dark, interactive character database built with Next.js. Features a retro-terminal aesthetic with CRT effects, sound interactions, hidden easter eggs, and a full admin panel for content management.

## Features

- **Character Database** — Dossiers with portraits, stats, and lore
- **Universe System** — Multiple worlds with their own characters
- **Artifacts & Factions** — Items and organizations tied to characters
- **Timeline** — Key events in the universe history
- **Search** — Full-text search across all content types
- **Admin Panel** — CRUD for all content (characters, artifacts, factions, timeline, universes)
- **Multi-language** — Russian + English with locale switching
- **Dark/Light Theme** — System preference detection
- **Interactive Effects** — CRT overlay, starfield, floating runes, sound effects
- **Easter Eggs** — Secret terminal (Ctrl+Shift+T), Konami code, logo clicks
- **Scan Mode** — Hidden content revealed on pages
- **Random Discovery** — "Detect Random Object" button
- **Mobile Responsive** — Optimized for all screen sizes

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **next-intl** — i18n
- **next-auth** — Authentication
- **framer-motion** — Animations
- **next-themes** — Dark/light mode
- **gray-matter** — MDX frontmatter parsing

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000)

## Admin Panel

1. Navigate to `/ru/login` (or `/en/login`)
2. Default credentials: `admin` / `admin123`
3. Change password in Settings after first login

## Project Structure

```
├── content/              # MDX content files
│   ├── characters/       # Character dossiers
│   ├── flora-fauna/      # Flora and fauna entries
│   ├── artifacts/        # Artifacts
│   ├── factions/         # Factions/organizations
│   ├── timeline.json     # Timeline events
│   └── universes.json    # Universe definitions
├── public/images/        # Static images
├── src/
│   ├── app/
│   │   ├── [locale]/     # Localized pages
│   │   │   ├── admin/    # Admin panel
│   │   │   ├── artifact/ # Artifact pages
│   │   │   ├── character/# Character pages
│   │   │   ├── faction/  # Faction pages
│   │   │   ├── search/   # Search page
│   │   │   └── timeline/ # Timeline page
│   │   └── api/          # API routes
│   ├── components/       # React components
│   ├── lib/              # Utilities
│   ├── messages/         # i18n translations
│   └── types.ts          # TypeScript types
```

## Environment Variables

Create `.env.local`:

```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=<bcrypt hash>
NEXTAUTH_SECRET=<random string>
```

## License

Personal project by Sango.
