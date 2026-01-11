# AI Systems Architect - Premium Website

A production-ready, premium website for an AI-first digital systems architect built with Next.js 14+, TypeScript, Tailwind CSS, and Prisma ORM.

## 🎯 Project Status

### ✅ Completed Features
- ✅ **Premium Design System**: Custom CSS variables, animations, and Tailwind configuration
- ✅ **Database Schema**: Comprehensive Prisma schema with 10+ models for full CMS
- ✅ **Homepage**: Stunning hero with animated blob backgrounds, Framer Motion animations
- ✅ **Navigation**: Responsive navbar with mobile menu
- ✅ **Footer**: Complete footer with social links and sitemap
- ✅ **UI Components**: Button, Card, Input, Textarea, Label components
- ✅ **Build System**: Successfully builds and compiles

### 🚧 In Progress
- Contact page with form handling
- Services page (dynamic from database)
- Process/How It Works page
- About page
- Blog system with CMS
- Admin dashboard with authentication

## 🛠 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: NextAuth.js (pending)
- **Animations**: Framer Motion
- **UI Components**: Radix UI + Custom components
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database (local or cloud)

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Database
Create a PostgreSQL database and update `.env.local`:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/ai_systems_db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
```

### 3. Generate Prisma Client
```bash
npx prisma generate
```

### 4. Run Database Migrations
```bash
npx prisma migrate dev --name init
```

### 5. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to see your site!

## 🎨 Design System

### Colors
- **Primary**: Blue (#2563eb)
- **Accent**: Cyan (#0ea5e9)
- **Neutrals**: Gray scale (#111827 to #f9fafb)

### Typography
- **Font**: Inter (Google Fonts)
- **H1**: 40-64px (responsive)
- **H2**: 32-48px (responsive)
- **Body**: 16-20px

### Animations
- Fade in/out
- Slide in (left/right)
- Scale in
- Blob animations
- Gradient animations
- Hover lift effects

## 📁 Project Structure

```
ai-systems-website/
├── app/
│   ├── layout.tsx          # Root layout with navigation & footer
│   ├── page.tsx            # Homepage with animations
│   └── globals.css         # Premium design system
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   └── label.tsx
│   ├── navigation.tsx      # Responsive navigation
│   └── footer.tsx          # Site footer
├── lib/
│   ├── db.ts              # Prisma client instance
│   └── utils.ts           # Utility functions
├── prisma/
│   └── schema.prisma      # Database schema
└── public/                # Static assets
```

## 🗄 Database Schema

The database includes models for:
- **Authentication**: User, Account, Session (NextAuth compatible)
- **Content**: Service, BlogPost, BlogCategory, BlogTag, CaseStudy
- **Testimonials**: Customer testimonials with ratings
- **Contact**: Contact form submissions
- **Settings**: Site-wide settings
- **Newsletter**: Email subscribers
- **Analytics**: Page view tracking

## 🚀 Deployment

### Recommended Hosting (Free Tiers Available)
- **Frontend**: Vercel (perfect for Next.js)
- **Database**: Railway, Supabase, or Neon (PostgreSQL)

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## 📝 Next Steps

1. **Database Setup**: Create PostgreSQL database (local or Railway/Supabase)
2. **Environment Variables**: Configure all required `.env.local` variables
3. **Run Migrations**: `npx prisma migrate dev`
4. **Seed Data**: Create sample services, blog posts via admin panel
5. **Customize Content**: Update site name, colors, social links
6. **Deploy**: Push to Vercel with database connected

## 🔑 Key Features to Build Next

1. **Contact Form** - With email notifications
2. **Services Page** - Dynamic from database
3. **Admin Dashboard** - CRUD for all content
4. **Blog System** - Rich text editor, categories, tags
5. **Authentication** - Secure admin access
6. **Image Upload** - For blog posts, services
7. **SEO Optimization** - Meta tags, sitemaps
8. **Analytics Integration** - Google Analytics

## 💡 Pro Tips

- **Development**: Use `npm run dev` with Turbopack for fast refresh
- **Database UI**: Use `npx prisma studio` to view/edit database
- **Type Safety**: Prisma generates TypeScript types automatically
- **Performance**: Next.js optimizes images and fonts automatically
- **Accessibility**: All components follow WCAG AA standards

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Radix UI](https://www.radix-ui.com/)

## 🤝 Support

For issues or questions:
- Check the documentation above
- Review the code comments
- Test locally before deploying

## 📄 License

This is a custom project. All rights reserved.

---

**Built with ❤️ using modern web technologies**
