-- Create the expert_sessions table
CREATE TABLE IF NOT EXISTS public.expert_sessions (
  id UUID DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  expert_name TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  duration INTEGER NOT NULL, -- in minutes
  topics TEXT[] DEFAULT '{}'::TEXT[], -- Array of topics
  image_url TEXT,
  linkedin_post_url TEXT,
  linkedin_post_id TEXT,
  registration_link TEXT,
  is_recorded BOOLEAN DEFAULT FALSE,
  recording_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add RLS policies for the expert_sessions table
ALTER TABLE public.expert_sessions ENABLE ROW LEVEL SECURITY;

-- Create policies
-- 1. Everyone can view public expert sessions
CREATE POLICY "Anyone can view expert sessions" 
ON public.expert_sessions 
FOR SELECT 
USING (true);

-- 2. Only authenticated admins can insert new expert sessions
CREATE POLICY "Only admins can add expert sessions" 
ON public.expert_sessions 
FOR INSERT 
TO authenticated 
WITH CHECK (
  auth.uid() IN (SELECT user_id FROM public.admins)
);

-- 3. Only authenticated admins can update expert sessions
CREATE POLICY "Only admins can update expert sessions" 
ON public.expert_sessions 
FOR UPDATE 
TO authenticated 
USING (
  auth.uid() IN (SELECT user_id FROM public.admins)
);

-- 4. Only authenticated admins can delete expert sessions
CREATE POLICY "Only admins can delete expert sessions" 
ON public.expert_sessions 
FOR DELETE 
TO authenticated 
USING (
  auth.uid() IN (SELECT user_id FROM public.admins)
);

-- Add triggers to update the updated_at field
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_expert_sessions_timestamp
BEFORE UPDATE ON public.expert_sessions
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Add some sample data (optional)
INSERT INTO public.expert_sessions (expert_name, title, description, date, time, duration, topics, image_url, is_recorded)
VALUES 
('Dr. Jane Smith', 'Advanced Data Structures', 'Learn about advanced data structures and their practical applications in software development.', '2025-04-15', '18:00', 90, ARRAY['Data Structures', 'Algorithms', 'Computer Science'], 'https://picsum.photos/800/400?random=1', false),
('Prof. Alex Johnson', 'Web Development Best Practices', 'A comprehensive guide to modern web development techniques and best practices.', '2025-04-20', '19:00', 120, ARRAY['Web Development', 'JavaScript', 'HTML/CSS'], 'https://picsum.photos/800/400?random=2', true);
