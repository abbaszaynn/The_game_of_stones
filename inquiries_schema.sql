
-- Inquiries Table (for Contact Form)
CREATE TABLE public.inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'New' CHECK (status IN ('New', 'Read', 'Replied', 'Archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Policies
-- 1. Allow Public Insert (Anyone can send a message)
CREATE POLICY "Allow Public Inserts" ON public.inquiries FOR INSERT WITH CHECK (true);

-- 2. Allow Public Read (Wait, only Admin should read. For now, allowing Anon Read for the Dashboard demo since we don't have Auth yet)
-- Ideally: CREATE POLICY "Allow Admin Read" ON public.inquiries FOR SELECT USING (auth.role() = 'authenticated');
-- For this prototype without auth:
CREATE POLICY "Allow Anon Read" ON public.inquiries FOR SELECT USING (true);

-- 3. Allow Anon Update (To mark as read/replied from dashboard)
CREATE POLICY "Allow Anon Updates" ON public.inquiries FOR UPDATE USING (true);
