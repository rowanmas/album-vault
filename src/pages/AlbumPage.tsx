import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { albums } from "@/data/albums";
import { supabase } from "@/integrations/supabase/client";
import { Slider } from "@/components/ui/slider";
import { getRatingColor } from "@/lib/ratingColor";

const getSessionId = () => {
  let id = localStorage.getItem("rating_session_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("rating_session_id", id);
  }
  return id;
};

type Comment = {
  id: string;
  author_name: string;
  content: string;
  created_at: string;
};

const AlbumPage = () => {
  const { id } = useParams();
  const album = albums.find((a) => a.id === id);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [avgRating, setAvgRating] = useState<number | null>(null);
  const [totalRatings, setTotalRatings] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [sliderValue, setSliderValue] = useState(5);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [postingComment, setPostingComment] = useState(false);

  const fetchRatings = useCallback(async () => {
    if (!id) return;
    const sessionId = getSessionId();

    const { data: allRatings } = await supabase
      .from("album_ratings")
      .select("rating, session_id")
      .eq("album_id", id);

    if (allRatings && allRatings.length > 0) {
      const sum = allRatings.reduce((a, r) => a + Number(r.rating), 0);
      setAvgRating(Math.round((sum / allRatings.length) * 10) / 10);
      setTotalRatings(allRatings.length);
      const mine = allRatings.find((r) => r.session_id === sessionId);
      if (mine) {
        setUserRating(Number(mine.rating));
        setSliderValue(Number(mine.rating));
        setSubmitted(true);
      }
    }
  }, [id]);

  useEffect(() => {
    fetchRatings();
  }, [fetchRatings]);

  const fetchComments = useCallback(async () => {
    if (!id) return;
    const { data } = await supabase
      .from("album_comments")
      .select("id, author_name, content, created_at")
      .eq("album_id", id)
      .order("created_at", { ascending: false });
    if (data) setComments(data as Comment[]);
  }, [id]);

  useEffect(() => {
    fetchComments();
    const savedName = localStorage.getItem("comment_author_name");
    if (savedName) setCommentName(savedName);
  }, [fetchComments]);

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !commentName.trim() || !commentText.trim()) return;
    setPostingComment(true);
    const { error } = await supabase.from("album_comments").insert({
      album_id: id,
      author_name: commentName.trim(),
      content: commentText.trim(),
    });
    if (!error) {
      setCommentText("");
      localStorage.setItem("comment_author_name", commentName.trim());
      fetchComments();
    }
    setPostingComment(false);
  };

  const handleSubmit = async () => {
    if (!id) return;
    const sessionId = getSessionId();
    await supabase.from("album_ratings").upsert(
      { album_id: id, rating: sliderValue, session_id: sessionId },
      { onConflict: "album_id,session_id" }
    );
    setUserRating(sliderValue);
    setSubmitted(true);
    fetchRatings();
  };

  if (!album) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl text-foreground mb-4">ALBUM NOT FOUND</h1>
          <Link to="/" className="text-primary hover:underline font-body">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 font-body text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to reviews
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row gap-8 mb-10">
            <div className="w-full md:w-72 flex-shrink-0">
              <div className="aspect-square rounded-lg overflow-hidden shadow-2xl">
                <img
                  src={album.cover}
                  alt={album.title}
                  className="w-full h-full object-cover"
                  width={512}
                  height={512}
                />
              </div>
            </div>

            <div className="flex flex-col justify-end">
              <p className="font-body text-sm text-muted-foreground uppercase tracking-widest mb-1">
                {album.genre} · {album.releaseYear}
              </p>
              <h1 className="font-display text-5xl md:text-6xl text-foreground leading-none mb-2">
                {album.title.toUpperCase()}
              </h1>
              <p className="font-body text-lg text-secondary-foreground mb-4">
                {album.artist}
              </p>
              <div className="flex items-baseline gap-2">
                <span
                  className="font-display text-7xl leading-none font-extrabold"
                  style={{ color: getRatingColor(album.rating) }}
                >
                  {album.rating}
                </span>
                <span className="font-body text-sm text-muted-foreground">/10</span>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-8">
            <h2 className="font-display text-2xl text-foreground mb-4 tracking-wider">
              REVIEW
            </h2>
            <p className="font-body text-base leading-relaxed text-secondary-foreground whitespace-pre-line">
              {album.review}
            </p>
          </div>

          {/* User Rating Slider */}
          <div className="border-t border-border pt-8 mt-10">
            <h2 className="font-display text-2xl text-foreground mb-6 tracking-wider">
              RATE THIS ALBUM
            </h2>
            <div className="max-w-md">
              <div className="flex items-baseline gap-3 mb-4">
                <span
                  className="font-display text-5xl leading-none font-extrabold"
                  style={{ color: getRatingColor(sliderValue) }}
                >
                  {sliderValue.toFixed(1)}
                </span>
                <span className="font-body text-sm text-muted-foreground">/10</span>
              </div>
              <Slider
                value={[sliderValue]}
                onValueChange={(v) => setSliderValue(Math.round(v[0] * 10) / 10)}
                min={1}
                max={10}
                step={0.1}
                className="mb-4"
              />
              <div className="flex items-center gap-4">
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-primary text-primary-foreground font-body text-sm rounded-md hover:opacity-90 transition-opacity"
                >
                  {submitted ? "Update Rating" : "Submit Rating"}
                </button>
                {submitted && userRating !== null && (
                  <span className="font-body text-sm text-muted-foreground">
                    Your rating: {userRating.toFixed(1)}
                  </span>
                )}
              </div>
              {avgRating !== null && (
                <p className="font-body text-sm text-muted-foreground mt-4">
                  Average user rating: <span className="font-display text-lg font-extrabold" style={{ color: getRatingColor(avgRating) }}>{avgRating.toFixed(1)}</span> ({totalRatings} {totalRatings === 1 ? "rating" : "ratings"})
                </p>
              )}
            </div>
          </div>

          <div className="border-t border-border pt-8 mt-10">
            <h2 className="font-display text-2xl text-foreground mb-6 tracking-wider">
              COMMENTS
            </h2>

            <form onSubmit={handlePostComment} className="space-y-3 mb-8 max-w-xl">
              <input
                type="text"
                placeholder="Your name"
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
                className="w-full px-4 py-2 bg-background border border-border rounded-md font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                required
              />
              <textarea
                placeholder="Leave a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 bg-background border border-border rounded-md font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                required
              />
              <button
                type="submit"
                disabled={postingComment}
                className="px-6 py-2 bg-primary text-primary-foreground font-body text-sm rounded-md hover:bg-white hover:text-background transition-colors disabled:opacity-50"
              >
                {postingComment ? "Posting..." : "Post Comment"}
              </button>
            </form>

            {comments.length === 0 ? (
              <p className="font-body text-sm text-muted-foreground italic">
                No comments yet. Be the first.
              </p>
            ) : (
              <div className="space-y-4 max-w-xl">
                {comments.map((c) => (
                  <div key={c.id} className="border border-border rounded-md p-4 bg-card/50">
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="font-display text-sm text-foreground tracking-wider">
                        {c.author_name}
                      </span>
                      <span className="font-body text-xs text-muted-foreground">
                        {new Date(c.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="font-body text-sm text-secondary-foreground whitespace-pre-line">
                      {c.content}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AlbumPage;
