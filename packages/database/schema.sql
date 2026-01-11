-- NeurallEmpire Multi-Product SaaS Platform
-- Complete Database Schema
-- PostgreSQL 15+

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- CORE IDENTITY & AUTH
-- ============================================================================

-- Users: Central identity, one per person
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    email_verified BOOLEAN DEFAULT FALSE,
    name VARCHAR(255),
    avatar_url TEXT,
    stripe_customer_id VARCHAR(255) UNIQUE,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_stripe ON users(stripe_customer_id);

-- Auth Providers: OAuth connections (Google, Microsoft, GitHub)
CREATE TABLE auth_providers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    provider VARCHAR(50) NOT NULL, -- 'google', 'microsoft', 'github'
    provider_user_id VARCHAR(255) NOT NULL,
    provider_email VARCHAR(255),
    access_token_encrypted TEXT,
    refresh_token_encrypted TEXT,
    token_expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(provider, provider_user_id)
);

CREATE INDEX idx_auth_providers_user ON auth_providers(user_id);
CREATE INDEX idx_auth_providers_lookup ON auth_providers(provider, provider_user_id);

-- Sessions: Active login sessions
CREATE TABLE sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash VARCHAR(255) UNIQUE NOT NULL,
    ip_address INET,
    user_agent TEXT,
    last_active_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_sessions_user ON sessions(user_id);
CREATE INDEX idx_sessions_token ON sessions(token_hash);
CREATE INDEX idx_sessions_expires ON sessions(expires_at);

-- ============================================================================
-- ORGANIZATIONS & MEMBERSHIP
-- ============================================================================

-- Organizations: Tenant entity, owns subscriptions
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(63) UNIQUE NOT NULL, -- URL-safe, lowercase
    name VARCHAR(255) NOT NULL,
    logo_url TEXT,
    billing_email VARCHAR(255),
    is_personal BOOLEAN DEFAULT FALSE, -- true = single-user personal org
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT slug_format CHECK (slug ~ '^[a-z0-9]([a-z0-9-]*[a-z0-9])?$')
);

CREATE INDEX idx_organizations_slug ON organizations(slug);

-- Organization Roles
CREATE TYPE org_role AS ENUM ('owner', 'admin', 'member');

-- Memberships: User <-> Organization relationship
CREATE TABLE memberships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    role org_role NOT NULL DEFAULT 'member',
    invited_by UUID REFERENCES users(id),
    invited_at TIMESTAMPTZ,
    accepted_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, organization_id)
);

CREATE INDEX idx_memberships_user ON memberships(user_id);
CREATE INDEX idx_memberships_org ON memberships(organization_id);
CREATE INDEX idx_memberships_role ON memberships(organization_id, role);

-- Pending Invitations (for users not yet registered)
CREATE TABLE invitations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL,
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    role org_role NOT NULL DEFAULT 'member',
    invited_by UUID NOT NULL REFERENCES users(id),
    token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    accepted_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_invitations_email ON invitations(email);
CREATE INDEX idx_invitations_token ON invitations(token);
CREATE INDEX idx_invitations_org ON invitations(organization_id);

-- ============================================================================
-- PRODUCTS & PLANS
-- ============================================================================

-- Products: Your SaaS products
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(63) UNIQUE NOT NULL, -- 'platform', 'vendornet', 'milkdelivery', etc.
    name VARCHAR(255) NOT NULL,
    description TEXT,
    subdomain VARCHAR(63) NOT NULL, -- maps to product subdomain
    icon_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    stripe_product_id VARCHAR(255) UNIQUE,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_subdomain ON products(subdomain);

-- Plans: Pricing tiers per product
CREATE TABLE plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    slug VARCHAR(63) NOT NULL, -- 'free', 'pro', 'enterprise'
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price_monthly_cents INTEGER NOT NULL DEFAULT 0,
    price_yearly_cents INTEGER NOT NULL DEFAULT 0,
    stripe_price_id_monthly VARCHAR(255),
    stripe_price_id_yearly VARCHAR(255),
    features JSONB DEFAULT '[]', -- ["Unlimited projects", "API access"]
    limits JSONB DEFAULT '{}', -- {"seats": 5, "projects": 10, "storage_gb": 5}
    is_public BOOLEAN DEFAULT TRUE,
    trial_days INTEGER DEFAULT 0,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(product_id, slug)
);

CREATE INDEX idx_plans_product ON plans(product_id);
CREATE INDEX idx_plans_public ON plans(is_public, sort_order);

-- ============================================================================
-- SUBSCRIPTIONS & BILLING
-- ============================================================================

-- Subscription Status
CREATE TYPE subscription_status AS ENUM (
    'trialing', 'active', 'past_due', 'canceled', 'unpaid', 'paused'
);

-- Billing Cycle
CREATE TYPE billing_cycle AS ENUM ('monthly', 'yearly');

-- Subscriptions: Org <-> Product subscription
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id),
    plan_id UUID NOT NULL REFERENCES plans(id),
    status subscription_status NOT NULL DEFAULT 'trialing',
    billing_cycle billing_cycle NOT NULL DEFAULT 'monthly',
    seats_purchased INTEGER NOT NULL DEFAULT 1,
    stripe_subscription_id VARCHAR(255) UNIQUE,
    stripe_subscription_item_id VARCHAR(255),
    trial_ends_at TIMESTAMPTZ,
    current_period_start TIMESTAMPTZ,
    current_period_end TIMESTAMPTZ,
    canceled_at TIMESTAMPTZ,
    cancel_at_period_end BOOLEAN DEFAULT FALSE,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(organization_id, product_id)
);

CREATE INDEX idx_subscriptions_org ON subscriptions(organization_id);
CREATE INDEX idx_subscriptions_product ON subscriptions(product_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
CREATE INDEX idx_subscriptions_stripe ON subscriptions(stripe_subscription_id);

-- Payment Methods: Stored at org level
CREATE TABLE payment_methods (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    stripe_payment_method_id VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'card', 'bank_account'
    last_four VARCHAR(4),
    brand VARCHAR(50), -- 'visa', 'mastercard'
    exp_month INTEGER,
    exp_year INTEGER,
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_payment_methods_org ON payment_methods(organization_id);
CREATE INDEX idx_payment_methods_default ON payment_methods(organization_id, is_default);

-- Invoices: Billing history
CREATE TABLE invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id),
    stripe_invoice_id VARCHAR(255) UNIQUE NOT NULL,
    amount_cents INTEGER NOT NULL,
    currency VARCHAR(3) DEFAULT 'usd',
    status VARCHAR(50) NOT NULL, -- 'draft', 'open', 'paid', 'void', 'uncollectible'
    invoice_pdf_url TEXT,
    period_start TIMESTAMPTZ,
    period_end TIMESTAMPTZ,
    line_items JSONB DEFAULT '[]', -- [{product, plan, amount}]
    paid_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_invoices_org ON invoices(organization_id);
CREATE INDEX idx_invoices_stripe ON invoices(stripe_invoice_id);
CREATE INDEX idx_invoices_status ON invoices(organization_id, status);

-- ============================================================================
-- PRODUCT-SPECIFIC PERMISSIONS (Extensible)
-- ============================================================================

-- Product Roles: Custom roles per product
CREATE TABLE product_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    slug VARCHAR(63) NOT NULL, -- 'admin', 'editor', 'viewer'
    name VARCHAR(255) NOT NULL,
    permissions JSONB NOT NULL DEFAULT '[]', -- ["read", "write", "delete"]
    is_default BOOLEAN DEFAULT FALSE, -- assigned to new members
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(product_id, slug)
);

CREATE INDEX idx_product_roles_product ON product_roles(product_id);

-- Member Product Roles: Override org role for specific product
CREATE TABLE member_product_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    membership_id UUID NOT NULL REFERENCES memberships(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id),
    product_role_id UUID NOT NULL REFERENCES product_roles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(membership_id, product_id)
);

CREATE INDEX idx_member_product_roles_membership ON member_product_roles(membership_id);
CREATE INDEX idx_member_product_roles_product ON member_product_roles(product_id);

-- ============================================================================
-- BUNDLES (Future Enhancement)
-- ============================================================================

-- Product Bundles: Discounted multi-product packages
CREATE TABLE bundles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(63) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    discount_percent INTEGER DEFAULT 0,
    price_monthly_cents INTEGER NOT NULL,
    price_yearly_cents INTEGER NOT NULL,
    stripe_price_id_monthly VARCHAR(255),
    stripe_price_id_yearly VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_bundles_slug ON bundles(slug);
CREATE INDEX idx_bundles_active ON bundles(is_active);

-- Bundle Products: Which products in bundle
CREATE TABLE bundle_products (
    bundle_id UUID NOT NULL REFERENCES bundles(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id),
    plan_id UUID NOT NULL REFERENCES plans(id), -- Which plan tier included
    PRIMARY KEY (bundle_id, product_id)
);

CREATE INDEX idx_bundle_products_bundle ON bundle_products(bundle_id);

-- ============================================================================
-- AUDIT & SECURITY
-- ============================================================================

-- Audit Log: Track important actions
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    organization_id UUID REFERENCES organizations(id),
    action VARCHAR(100) NOT NULL, -- 'subscription.created', 'member.invited'
    resource_type VARCHAR(100),
    resource_id UUID,
    metadata JSONB DEFAULT '{}',
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_audit_org ON audit_logs(organization_id, created_at DESC);
CREATE INDEX idx_audit_user ON audit_logs(user_id, created_at DESC);
CREATE INDEX idx_audit_action ON audit_logs(action, created_at DESC);

-- ============================================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================================

-- Function: Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to all relevant tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_memberships_updated_at BEFORE UPDATE ON memberships
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_plans_updated_at BEFORE UPDATE ON plans
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_auth_providers_updated_at BEFORE UPDATE ON auth_providers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function: Auto-create personal organization on user signup
CREATE OR REPLACE FUNCTION create_personal_organization()
RETURNS TRIGGER AS $$
DECLARE
    org_id UUID;
    base_slug VARCHAR(63);
    final_slug VARCHAR(63);
    counter INTEGER := 0;
BEGIN
    -- Generate base slug from email
    base_slug := regexp_replace(
        lower(split_part(NEW.email, '@', 1)),
        '[^a-z0-9]+', '-', 'g'
    );
    base_slug := trim(both '-' from base_slug);

    -- Ensure uniqueness
    final_slug := base_slug;
    WHILE EXISTS (SELECT 1 FROM organizations WHERE slug = final_slug) LOOP
        counter := counter + 1;
        final_slug := base_slug || '-' || counter;
    END LOOP;

    -- Create personal organization
    INSERT INTO organizations (slug, name, is_personal)
    VALUES (final_slug, NEW.name || '''s Organization', true)
    RETURNING id INTO org_id;

    -- Add user as owner
    INSERT INTO memberships (user_id, organization_id, role, accepted_at)
    VALUES (NEW.id, org_id, 'owner', NOW());

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER auto_create_personal_org AFTER INSERT ON users
    FOR EACH ROW EXECUTE FUNCTION create_personal_organization();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) SETUP
-- ============================================================================

-- Enable RLS on critical tables
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can see organizations they're members of
CREATE POLICY organizations_member_access ON organizations
    FOR SELECT USING (
        id IN (
            SELECT organization_id FROM memberships
            WHERE user_id = current_setting('app.user_id', true)::uuid
        )
    );

-- RLS Policy: Users can see memberships in their organizations
CREATE POLICY memberships_org_access ON memberships
    FOR SELECT USING (
        organization_id IN (
            SELECT organization_id FROM memberships
            WHERE user_id = current_setting('app.user_id', true)::uuid
        )
    );

-- ============================================================================
-- SEED DATA (Development/Initial Setup)
-- ============================================================================

-- Insert Products
INSERT INTO products (slug, name, description, subdomain, is_active) VALUES
('platform', 'AI Platform', 'Enterprise AI automation and workflow orchestration', 'platform', true),
('vendornet', 'VendorNet', 'Vendor and supplier relationship management', 'vendornet', true),
('milkdelivery', 'Milk Delivery', 'Fresh dairy delivery management system', 'milk', true),
('nandos', 'Nandos POS', 'Restaurant point-of-sale and management', 'nandos', true),
('books', 'Books Manager', 'Library and book inventory management', 'books', true),
('construction', 'Construction ERP', 'Construction project and resource management', 'construction', true),
('realty', 'Realty PMS', 'Real estate property management system', 'realty', true),
('admin-center', 'Admin Center', 'Centralized administration and analytics', 'admin', true);

-- Insert Plans for each product (example for Platform)
DO $$
DECLARE
    platform_id UUID;
BEGIN
    SELECT id INTO platform_id FROM products WHERE slug = 'platform';

    INSERT INTO plans (product_id, slug, name, description, price_monthly_cents, price_yearly_cents, features, limits, sort_order) VALUES
    (platform_id, 'free', 'Free', 'Perfect for trying out', 0, 0,
        '["5 AI agents", "100 executions/month", "Community support"]'::jsonb,
        '{"seats": 1, "agents": 5, "executions": 100}'::jsonb, 1),
    (platform_id, 'pro', 'Pro', 'For growing teams', 2900, 29000,
        '["Unlimited AI agents", "Unlimited executions", "Priority support", "Advanced analytics"]'::jsonb,
        '{"seats": 5, "agents": -1, "executions": -1}'::jsonb, 2),
    (platform_id, 'enterprise', 'Enterprise', 'For large organizations', 9900, 99000,
        '["Everything in Pro", "SSO/SAML", "Dedicated support", "Custom integrations", "SLA guarantee"]'::jsonb,
        '{"seats": -1, "agents": -1, "executions": -1}'::jsonb, 3);
END $$;

-- Reserved slugs for organization validation
CREATE TABLE reserved_slugs (
    slug VARCHAR(63) PRIMARY KEY,
    reason VARCHAR(255)
);

INSERT INTO reserved_slugs (slug, reason) VALUES
('admin', 'System reserved'),
('api', 'System reserved'),
('app', 'System reserved'),
('billing', 'System reserved'),
('blog', 'System reserved'),
('cdn', 'System reserved'),
('dashboard', 'System reserved'),
('docs', 'System reserved'),
('help', 'System reserved'),
('login', 'System reserved'),
('logout', 'System reserved'),
('mail', 'System reserved'),
('pricing', 'System reserved'),
('settings', 'System reserved'),
('signup', 'System reserved'),
('status', 'System reserved'),
('support', 'System reserved'),
('www', 'System reserved'),
('account', 'System reserved'),
('accounts', 'System reserved'),
('assets', 'System reserved'),
('static', 'System reserved'),
('graphql', 'System reserved'),
('platform', 'Product subdomain'),
('vendornet', 'Product subdomain'),
('milk', 'Product subdomain'),
('nandos', 'Product subdomain'),
('books', 'Product subdomain'),
('construction', 'Product subdomain'),
('realty', 'Product subdomain');

-- Function to check if slug is reserved
CREATE OR REPLACE FUNCTION is_slug_reserved(check_slug VARCHAR(63))
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (SELECT 1 FROM reserved_slugs WHERE slug = check_slug);
END;
$$ LANGUAGE plpgsql;

COMMENT ON DATABASE CURRENT_DATABASE() IS 'NeurallEmpire Multi-Product SaaS Platform';
