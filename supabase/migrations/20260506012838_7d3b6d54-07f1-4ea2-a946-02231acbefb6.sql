CREATE TABLE public.album_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  album_id TEXT NOT NULL,
  author_name TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.album_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view comments"
ON public.album_comments FOR SELECT
USING (true);

CREATE POLICY "Anyone can insert comments"
ON public.album_comments FOR INSERT
WITH CHECK (true);

CREATE INDEX idx_album_comments_album_id ON public.album_comments(album_id);