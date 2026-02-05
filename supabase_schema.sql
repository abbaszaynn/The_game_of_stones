-- Create tables for standardizing Global Mining Data
-- Based on the 'companies-data.ts' structure

-- 1. Companies Table
CREATE TABLE public.companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    tagline TEXT,
    description TEXT,
    history TEXT,
    logo_url TEXT,
    status TEXT, -- 'Operational', 'Exploratory Phase'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Leadership Table
CREATE TABLE public.leadership (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Contact Info (Investors/Corporate)
CREATE TABLE public.contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
    name TEXT, -- 'Corporate Office', 'Tabish Hassan'
    email TEXT,
    phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Locations (Mine Sites & Polygons)
CREATE TABLE public.locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
    name TEXT NOT NULL, -- 'Jutial Nala Mine'
    polygon JSONB NOT NULL, -- Array of {lat, lng} objects
    area_size TEXT, -- '10 Sq/Km'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Deposits (Mineral Data)
CREATE TABLE public.deposits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
    location_id UUID REFERENCES public.locations(id) ON DELETE SET NULL, -- Optional link to specific site
    name TEXT NOT NULL, -- 'Copper'
    type TEXT, -- 'Copper Ore'
    details JSONB, -- Array of strings e.g. ["High grade", "200m depth"]
    location_text TEXT, -- Text description if not linked to a location ID
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Media Assets (Gallery)
CREATE TABLE public.media_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
    type TEXT CHECK (type IN ('image', 'video')),
    url TEXT NOT NULL,
    title TEXT,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leadership ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deposits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;

-- Create Policies (Public Read, Admin Write)
-- Note: 'anon' key users can read. Service role users map to 'postgres' or 'service_role' for writes.

-- READ Policies
CREATE POLICY "Allow Public Read Access" ON public.companies FOR SELECT USING (true);
CREATE POLICY "Allow Public Read Access" ON public.leadership FOR SELECT USING (true);
CREATE POLICY "Allow Public Read Access" ON public.contacts FOR SELECT USING (true);
CREATE POLICY "Allow Public Read Access" ON public.locations FOR SELECT USING (true);
CREATE POLICY "Allow Public Read Access" ON public.deposits FOR SELECT USING (true);
CREATE POLICY "Allow Public Read Access" ON public.media_assets FOR SELECT USING (true);

-- WRITE Policies (Open for now to allow seeding via helper scripts during dev, typically restricted to auth users)
-- In a production app with auth, you would check `auth.uid()`.
-- For this initial setup, we will allow INSERT/UPDATE/DELETE to authenticated users or service role.
-- Since the user provided an ANON key, we might need to rely on the Dashboard SQL Editor for initial setup.
-- However, if we want to seed from the app, we might temporarily allow Anon inserts or use the Service role if available (user only provided anon).
-- Recommendation: Run this SQL in Supabase Dashboard. Then the Seeding script (if it uses Anon key) might fail if we don't allow anon writes.
-- Let's ALLOW anon writes TEMPORARILY for the setup process, user can disable later.

CREATE POLICY "Allow Anon Writes" ON public.companies FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow Anon Writes" ON public.leadership FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow Anon Writes" ON public.contacts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow Anon Writes" ON public.locations FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow Anon Writes" ON public.deposits FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow Anon Writes" ON public.media_assets FOR INSERT WITH CHECK (true);
