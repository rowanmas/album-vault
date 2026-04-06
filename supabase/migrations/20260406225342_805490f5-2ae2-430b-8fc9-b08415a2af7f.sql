
CREATE TABLE public.album_suggestions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  album_name TEXT NOT NULL,
  artist_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.album_suggestions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view suggestions" ON public.album_suggestions FOR SELECT USING (true);
CREATE POLICY "Anyone can insert suggestions" ON public.album_suggestions FOR INSERT WITH CHECK (true);
