-- Fix RLS Policies to allow UPSERT operations (INSERT + UPDATE)

-- Allow Anon Update (needed when upserting existing rows)
CREATE POLICY "Allow Anon Updates" ON public.companies FOR UPDATE USING (true);
CREATE POLICY "Allow Anon Updates" ON public.leadership FOR UPDATE USING (true);
CREATE POLICY "Allow Anon Updates" ON public.contacts FOR UPDATE USING (true);
CREATE POLICY "Allow Anon Updates" ON public.locations FOR UPDATE USING (true);
CREATE POLICY "Allow Anon Updates" ON public.deposits FOR UPDATE USING (true);
CREATE POLICY "Allow Anon Updates" ON public.media_assets FOR UPDATE USING (true);
