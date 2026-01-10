# 🚀 Quick Start Guide

Get the NeurallEmpire platform running locally in 5 minutes.

## Prerequisites

- Node.js 20+
- pnpm 8+ (install: `npm install -g pnpm`)

## Installation

```bash
# Clone the repository
git clone https://github.com/sandeepramdas/neurallempire-platform.git
cd neurallempire-platform

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The main website will be available at **http://localhost:3000**

## What You Get

### ✅ Main Marketing Site
A beautiful landing page showcasing all 7 NeurallEmpire products:
- Gradient hero section
- Interactive product cards
- Responsive design
- Dark theme optimized

### ✅ Monorepo Structure
```
neurallempire-platform/
├── apps/
│   ├── main-site/          # Marketing hub (localhost:3000)
│   ├── platform/           # AI Platform (pending)
│   ├── vendornet/          # Supply Chain (pending)
│   ├── milkdelivery/       # Route Optimization (pending)
│   ├── nandos/             # Restaurant Ops (pending)
│   ├── books/              # Library Management (pending)
│   ├── construction/       # Construction PM (pending)
│   └── realty/             # Property Management (pending)
└── packages/
    ├── ui/                 # Shared components
    ├── auth/               # Authentication (pending)
    ├── database/           # Prisma client (pending)
    └── ...                 # Other shared packages
```

### ✅ Shared UI Components
- `<Button />` - Customizable button with variants
- `<Card />` - Content card component
- More components coming soon!

## Development Workflow

### Run All Apps
```bash
pnpm dev
```

### Run Specific App
```bash
pnpm --filter @neurallempire/main-site dev
```

### Build All Apps
```bash
pnpm build
```

### Lint & Type Check
```bash
pnpm lint
pnpm typecheck
```

## Next Steps

1. **Explore the Main Site**: Open http://localhost:3000
2. **Read Architecture**: See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
3. **Check Implementation Plan**: See [docs/IMPLEMENTATION.md](docs/IMPLEMENTATION.md)
4. **Add Products**: Start migrating existing products to the monorepo

## Product Migration Guide

To add a new product to the monorepo:

1. **Create app directory**:
   ```bash
   cd apps/your-product
   ```

2. **Initialize Next.js app**:
   ```bash
   pnpm create next-app . --typescript --tailwind
   ```

3. **Update package.json**:
   ```json
   {
     "name": "@neurallempire/your-product",
     "scripts": {
       "dev": "next dev -p 3001"
     }
   }
   ```

4. **Use shared packages**:
   ```typescript
   import { Button } from '@neurallempire/ui'
   ```

5. **Test locally**:
   ```bash
   pnpm --filter @neurallempire/your-product dev
   ```

## Environment Setup

Each app can have its own `.env.local`:

```bash
# apps/your-product/.env.local
NEXT_PUBLIC_API_URL=http://localhost:3000/api
DATABASE_URL=your-database-url
```

## Deployment

- **Main Site**: Cloudflare Pages
- **Products**: Railway (containerized)
- **Database**: Supabase (per product)

See [docs/IMPLEMENTATION.md](docs/IMPLEMENTATION.md) for detailed deployment guide.

## Troubleshooting

### pnpm not found
```bash
npm install -g pnpm@8.15.0
```

### Port already in use
Change port in `apps/*/package.json`:
```json
"dev": "next dev -p 3005"
```

### Build errors
```bash
pnpm clean
pnpm install
pnpm build
```

## Support

- **Architecture**: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- **Implementation**: [docs/IMPLEMENTATION.md](docs/IMPLEMENTATION.md)
- **Issues**: Create an issue on GitHub

---

**Happy coding! 🧠👑**
