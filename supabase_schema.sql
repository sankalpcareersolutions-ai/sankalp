CREATE TABLE IF NOT EXISTS public.appointments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  aspirant_name text NOT NULL,
  email text NOT NULL,
  mobile text NOT NULL,
  date date NOT NULL,
  time text NOT NULL,
  service_type text NOT NULL,
  message text,
  status text DEFAULT 'confirmed',
  created_at timestamp with time zone DEFAULT now()
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert appointments (for the booking form)
CREATE POLICY "Allow anonymous inserts" ON public.appointments
  FOR INSERT
  WITH CHECK (true);

-- Allow all users (or authenticated admin) to select appointments
CREATE POLICY "Allow public select" ON public.appointments
  FOR SELECT
  USING (true);

-- Allow public delete (for cancellation)
CREATE POLICY "Allow public delete" ON public.appointments
  FOR DELETE
  USING (true);
