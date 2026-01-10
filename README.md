# NeurallEmpire Platform

Multi-product SaaS platform - Unified monorepo for intelligent business solutions.

## 🏗️ Architecture

This monorepo contains all NeurallEmpire products and shared packages using Turborepo + pnpm.

### Products (apps/)

- **main-site** - Marketing hub at www.neurallempire.com
- **admin-center** - Super admin dashboard
- **platform** - AI Agent platform
- **vendornet** - B2B Supply Chain Management
- **milkdelivery** - Route Optimization & Delivery
- **nandos** - Restaurant Operations
- **books** - Library Management
- **construction** - Construction Project Management
- **realty** - Property Management System

### Shared Packages (packages/)

- **ui** - Shared React components
- **auth** - Authentication utilities
- **database** - Prisma client & utilities
- **billing** - Stripe integration
- **email** - Email templates (React Email + Resend)
- **search** - Meilisearch integration
- **validation** - Zod schemas
- **config** - Shared configuration
- **logger** - Logging utilities

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- pnpm 8+

### Installation

```bash
# Install dependencies
pnpm install

# Run all apps in development
pnpm dev

# Build all apps
pnpm build
```

### Development

```bash
# Run specific app
cd apps/main-site
pnpm dev

# Run main website
pnpm --filter @neurallempire/main-site dev

# Build specific app
pnpm --filter @neurallempire/vendornet build
```

## 📦 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, TailwindCSS
- **Backend**: Fastify, Prisma, PostgreSQL (Supabase)
- **Auth**: Supabase Auth with JWT
- **Payments**: Stripe
- **Email**: Resend + React Email
- **Search**: Meilisearch
- **Cache**: Redis
- **Deployment**: Railway, Cloudflare Pages
- **Monorepo**: Turborepo + pnpm

## 🌐 URLs

- **Main Site**: https://www.neurallempire.com
- **AI Platform**: https://platform.neurallempire.com
- **VendorNet**: https://vendornet.neurallempire.com
- **MilkDelivery**: https://milkdelivery.neurallempire.com
- **Nandos**: https://nandos.neurallempire.com
- **Books**: https://books.neurallempire.com
- **Construction**: https://construction.neurallempire.com
- **Realty**: https://realty.neurallempire.com

## 📄 Documentation

- [Platform Architecture](../../NEURALLEMPIRE_PLATFORM_ARCHITECTURE_V4.md)
- [Implementation Strategy](../../IMPLEMENTATION_STRATEGY.md)

## 🔐 Authentication Flow

Single sign-on across all products using Supabase Auth:

1. User signs in at any product subdomain
2. JWT with product access stored in cookie (`.neurallempire.com`)
3. Seamless navigation between products
4. Org-based routing: `{product}.neurallempire.com/{orgslug}`

## 🏢 Database Architecture

- **Central DB**: User accounts, product access, billing
- **Product DBs**: Separate Supabase project per product
- **Shared Schema**: Multi-tenant with Row-Level Security (RLS)

## 📋 Scripts

```bash
# Development
pnpm dev              # Run all apps
pnpm build            # Build all apps
pnpm lint             # Lint all apps
pnpm test             # Run tests
pnpm typecheck        # TypeScript check

# Clean
pnpm clean            # Remove all node_modules and build artifacts

# Format
pnpm format           # Format with Prettier
```

## 🚢 Deployment

Each app is deployed independently:

- **Main Site**: Cloudflare Pages
- **Products**: Railway (containerized)
- **Database**: Supabase (per product)
- **CDN**: Cloudflare
- **Cache**: Railway Redis

## 📞 Support

For issues and feature requests, please create an issue in this repository.

---

**Built with ❤️ by the NeurallEmpire team**
