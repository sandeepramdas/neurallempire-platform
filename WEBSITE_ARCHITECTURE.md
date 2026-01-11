# NeurallEmpire Website Architecture

## Overview
Professional, dynamic corporate website showcasing NeurallEmpire's multi-product SaaS platform with CMS capabilities.

## Site Structure

### Public Pages
1. **Home** (`/`)
   - Hero section with value proposition
   - Featured products (7 products)
   - Client logos
   - Stats/metrics
   - Featured case studies
   - Latest blog posts
   - CTA sections

2. **Products** (`/products`)
   - Overview of all 7 products
   - Product categories (AI Platform, Industry Solutions)
   - Individual product pages (`/products/[slug]`)

3. **Solutions** (`/solutions`)
   - By Industry (Dairy, Food Service, Real Estate, Construction, Publishing)
   - By Use Case (Automation, Analytics, Operations)
   - Solution detail pages

4. **Case Studies** (`/case-studies`)
   - Grid of case studies
   - Filter by industry/product
   - Individual case study pages
   - Client testimonials integration

5. **Blog** (`/blog`)
   - Blog listing with categories
   - Individual blog posts (`/blog/[slug]`)
   - Author pages
   - Categories and tags

6. **About** (`/about`)
   - Company mission
   - Team
   - Technology stack
   - Partnerships

7. **Contact** (`/contact`)
   - Contact form
   - Office locations
   - Support options

### Admin Pages (Protected)
1. **Admin Dashboard** (`/admin`)
   - Overview metrics
   - Recent content
   - Quick actions

2. **Blog Management** (`/admin/blog`)
   - Create/edit blog posts
   - Rich text editor
   - SEO settings
   - Publish/draft status

3. **Case Studies Management** (`/admin/case-studies`)
   - Create/edit case studies
   - Upload images
   - Client information

4. **Testimonials Management** (`/admin/testimonials`)
   - Add client testimonials
   - Featured testimonials

5. **Products Management** (`/admin/products`)
   - Update product information
   - Feature toggles

## Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS + shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod

### Backend/CMS
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Storage**: Supabase Storage (images, files)
- **API**: Next.js API Routes

### Deployment
- **Hosting**: Cloudflare Pages
- **Domain**: www.neurallempire.com
- **CDN**: Cloudflare
- **SSL**: Automatic (Cloudflare)

## Database Schema

### Tables

#### `blog_posts`
- id (uuid)
- title (text)
- slug (text, unique)
- content (text)
- excerpt (text)
- featured_image (text)
- author_id (uuid, references auth.users)
- category (text)
- tags (text[])
- published (boolean)
- published_at (timestamp)
- created_at (timestamp)
- updated_at (timestamp)

#### `case_studies`
- id (uuid)
- title (text)
- slug (text, unique)
- client_name (text)
- client_logo (text)
- industry (text)
- product_used (text)
- challenge (text)
- solution (text)
- results (jsonb)
- testimonial (text)
- featured_image (text)
- published (boolean)
- created_at (timestamp)

#### `testimonials`
- id (uuid)
- client_name (text)
- client_role (text)
- client_company (text)
- client_avatar (text)
- content (text)
- rating (int)
- featured (boolean)
- created_at (timestamp)

#### `products`
- id (uuid)
- name (text)
- slug (text, unique)
- description (text)
- long_description (text)
- features (jsonb)
- pricing (jsonb)
- icon (text)
- color (text)
- category (text)
- status (text) - 'live', 'coming_soon', 'beta'
- url (text)
- created_at (timestamp)

## Design Principles

### Visual Identity
- **Primary Color**: Purple/Indigo (AI/Tech)
- **Secondary**: Gradient overlays
- **Typography**: Inter font family
- **Style**: Modern, clean, corporate
- **Layout**: Wide, spacious, professional

### Inspiration References
- **Vercel**: Clean design, great product showcase
- **Atlassian**: Product ecosystem display
- **Salesforce**: Enterprise credibility
- **HubSpot**: Content marketing integration
- **Stripe**: Developer-focused clarity

### Key Features
1. **Performance**: Fast loading, optimized images
2. **SEO**: Meta tags, structured data, sitemaps
3. **Accessibility**: WCAG 2.1 AA compliance
4. **Mobile**: Responsive design
5. **Analytics**: Track engagement, conversions

## Content Strategy

### Homepage Content
- Hero: "Build Smarter with AI-Powered Solutions"
- Subheading: "Enterprise-grade SaaS products for modern industries"
- Social Proof: "Trusted by 100+ companies"
- Products: Feature all 7 products
- Case Studies: 2-3 featured
- Blog: Latest 3 posts

### Products to Showcase
1. **AI Platform** - Core intelligence engine
2. **VendorNet** - Vendor management
3. **MilkDelivery** - Dairy logistics
4. **Nandos Integration** - Food service operations
5. **Books Platform** - Publishing management
6. **Construction Manager** - Project tracking
7. **Realty PMS** - Property management

### Solutions Categories
1. **By Industry**
   - Food & Beverage
   - Dairy & Agriculture
   - Real Estate
   - Construction
   - Publishing

2. **By Function**
   - Operations Automation
   - Business Intelligence
   - Supply Chain Management
   - Customer Management

## Implementation Phases

### Phase 1: Foundation (Current)
- [x] Basic landing page
- [ ] Professional redesign
- [ ] Supabase CMS setup
- [ ] Component library

### Phase 2: Content Management
- [ ] Admin dashboard
- [ ] Blog system
- [ ] Case studies management
- [ ] Testimonials management

### Phase 3: Advanced Features
- [ ] Search functionality
- [ ] Newsletter integration
- [ ] Analytics dashboard
- [ ] A/B testing

### Phase 4: Launch
- [ ] Content population
- [ ] SEO optimization
- [ ] Domain configuration
- [ ] Production deployment

## Next Steps
1. Set up Supabase database with schema
2. Create professional UI components
3. Build new homepage
4. Create admin dashboard
5. Implement blog system
6. Deploy to production
