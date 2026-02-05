
-- Documents Table (Reports, Licenses, etc.)
CREATE TABLE public.documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    type TEXT, -- 'Geological Report', 'License', etc.
    url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow Public Read Access" ON public.documents FOR SELECT USING (true);
CREATE POLICY "Allow Anon Writes" ON public.documents FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow Anon Updates" ON public.documents FOR UPDATE USING (true);
CREATE POLICY "Allow Anon Deletes" ON public.documents FOR DELETE USING (true);
