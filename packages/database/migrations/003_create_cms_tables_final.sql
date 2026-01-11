-- NeurallEmpire CMS Tables Migration (Final Fixed Version)
-- This creates tables for Blog Posts, Case Studies, Testimonials, and Products

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    featured_image TEXT,
    author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    category TEXT,
    tags TEXT[],
    published BOOLEAN DEFAULT false,
    published_at TIMESTAMPTZ,
    meta_title TEXT,
    meta_description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_author ON blog_posts(author_id);

-- Case Studies Table
CREATE TABLE IF NOT EXISTS case_studies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    client_name TEXT NOT NULL,
    client_logo TEXT,
    industry TEXT NOT NULL,
    product_used TEXT NOT NULL,
    challenge TEXT NOT NULL,
    solution TEXT NOT NULL,
    results JSONB,
    testimonial TEXT,
    featured_image TEXT,
    published BOOLEAN DEFAULT false,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_case_studies_slug ON case_studies(slug);
CREATE INDEX IF NOT EXISTS idx_case_studies_industry ON case_studies(industry);
CREATE INDEX IF NOT EXISTS idx_case_studies_published ON case_studies(published);
CREATE INDEX IF NOT EXISTS idx_case_studies_featured ON case_studies(featured);

-- Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_name TEXT NOT NULL,
    client_role TEXT NOT NULL,
    client_company TEXT NOT NULL,
    client_avatar TEXT,
    content TEXT NOT NULL,
    rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    featured BOOLEAN DEFAULT false,
    product_used TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON testimonials(featured);

-- Products Table
DO $$ BEGIN
    CREATE TYPE product_status AS ENUM ('live', 'beta', 'coming_soon');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    long_description TEXT,
    features JSONB,
    pricing JSONB,
    icon TEXT,
    color TEXT,
    category TEXT,
    status product_status DEFAULT 'live',
    url TEXT,
    demo_url TEXT,
    "order" INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at (drop first if exists)
DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_case_studies_updated_at ON case_studies;
CREATE TRIGGER update_case_studies_updated_at BEFORE UPDATE ON case_studies
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_testimonials_updated_at ON testimonials;
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can view published blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Public can view published case studies" ON case_studies;
DROP POLICY IF EXISTS "Public can view featured testimonials" ON testimonials;
DROP POLICY IF EXISTS "Public can view all products" ON products;
DROP POLICY IF EXISTS "Authenticated users can manage blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Authenticated users can manage case studies" ON case_studies;
DROP POLICY IF EXISTS "Authenticated users can manage testimonials" ON testimonials;
DROP POLICY IF EXISTS "Authenticated users can manage products" ON products;

-- Public read access for published content
CREATE POLICY "Public can view published blog posts"
    ON blog_posts FOR SELECT
    USING (published = true);

CREATE POLICY "Public can view published case studies"
    ON case_studies FOR SELECT
    USING (published = true);

CREATE POLICY "Public can view featured testimonials"
    ON testimonials FOR SELECT
    USING (true);

CREATE POLICY "Public can view all products"
    ON products FOR SELECT
    USING (true);

-- Admin full access (authenticated users can manage all content)
CREATE POLICY "Authenticated users can manage blog posts"
    ON blog_posts FOR ALL
    USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage case studies"
    ON case_studies FOR ALL
    USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage testimonials"
    ON testimonials FOR ALL
    USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage products"
    ON products FOR ALL
    USING (auth.role() = 'authenticated');

-- Seed initial products data (only if table is empty)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM products LIMIT 1) THEN
        INSERT INTO products (name, slug, description, long_description, category, status, url, color, "order") VALUES
        ('AI Platform', 'platform', 'Intelligent AI agents for automation and business intelligence', 'Deploy AI-powered automation across your entire organization', 'AI & Automation', 'live'::product_status, 'https://www.neurallempire.com', 'from-purple-500 to-indigo-600', 1),
        ('VendorNet', 'vendornet', 'End-to-end vendor and supply chain management', 'Streamline procurement, vendor relationships, and supply chain operations', 'Business Operations', 'live'::product_status, 'https://vendornet.pages.dev', 'from-blue-500 to-cyan-600', 2),
        ('MilkDelivery', 'milkdelivery', 'Route optimization and subscription management for dairy delivery', 'Complete dairy delivery management with route optimization and subscriptions', 'Industry Solutions', 'coming_soon'::product_status, '#', 'from-green-500 to-emerald-600', 3),
        ('Nandos Integration', 'nandos', 'Point-of-sale and operations management for food service', 'Integrated POS, inventory, and operations for restaurants', 'Industry Solutions', 'live'::product_status, 'https://sandeepramdas.github.io/nandos-india-revamp', 'from-red-500 to-orange-600', 4),
        ('Books Platform', 'books', 'Publishing and content management for digital libraries', 'End-to-end publishing workflow and digital library management', 'Content Management', 'coming_soon'::product_status, '#', 'from-yellow-500 to-amber-600', 5),
        ('Construction Manager', 'construction', 'Project tracking and resource management for construction', 'Complete construction project management with real-time tracking', 'Industry Solutions', 'coming_soon'::product_status, '#', 'from-gray-500 to-slate-600', 6),
        ('Realty PMS', 'realty', 'Property management system for real estate professionals', 'Comprehensive property management, tenant tracking, and lease management', 'Industry Solutions', 'live'::product_status, 'https://realtypms.vercel.app', 'from-teal-500 to-cyan-600', 7);
    END IF;
END $$;

-- Seed sample testimonials (only if table is empty)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM testimonials LIMIT 1) THEN
        INSERT INTO testimonials (client_name, client_role, client_company, content, rating, featured) VALUES
        ('Sarah Johnson', 'Operations Director', 'Premium Dairy Co.', 'NeurallEmpire''s MilkDelivery platform transformed our operations. We reduced waste by 40% and improved customer satisfaction significantly.', 5, true),
        ('Michael Chen', 'CTO', 'FreshServe Solutions', 'The AI-powered insights have been game-changing. We''ve automated 60% of our procurement process and saved countless hours.', 5, true),
        ('Emily Rodriguez', 'CEO', 'Artisan Foods Group', 'From implementation to results, the NeurallEmpire team delivered beyond expectations. Our efficiency has increased by 3.5x.', 5, true);
    END IF;
END $$;

-- Add comments
COMMENT ON TABLE blog_posts IS 'CMS table for blog articles and content marketing';
COMMENT ON TABLE case_studies IS 'Client success stories and case studies';
COMMENT ON TABLE testimonials IS 'Client testimonials and reviews';
COMMENT ON TABLE products IS 'Product catalog for the NeurallEmpire ecosystem';
