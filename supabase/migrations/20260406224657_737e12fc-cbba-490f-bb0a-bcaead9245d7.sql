
CREATE TABLE public.album_ratings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  album_id TEXT NOT NULL,
  rating NUMERIC(3,1) NOT NULL CHECK (rating >= 1 AND rating <= 10),
  session_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (album_id, session_id)
);

ALTER TABLE public.album_ratings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view ratings" ON public.album_ratings FOR SELECT USING (true);
CREATE POLICY "Anyone can insert ratings" ON public.album_ratings FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update their own rating" ON public.album_ratings FOR UPDATE USING (true);
