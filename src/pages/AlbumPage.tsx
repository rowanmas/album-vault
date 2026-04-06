import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { albums } from "@/data/albums";
import { supabase } from "@/integrations/supabase/client";
import { Slider } from "@/components/ui/slider";

const getSessionId = () => {
  let id = localStorage.getItem("rating_session_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("rating_session_id", id);
  }
  return id;
};

const AlbumPage = () => {
  const { id } = useParams();
  const album = albums.find((a) => a.id === id);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [avgRating, setAvgRating] = useState<number | null>(null);
  const [totalRatings, setTotalRatings] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [sliderValue, setSliderValue] = useState(5);

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
                <span className="font-display text-7xl text-rating leading-none">
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
                <span className="font-display text-5xl text-rating leading-none">
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
                  Average user rating: <span className="text-rating font-display text-lg">{avgRating.toFixed(1)}</span> ({totalRatings} {totalRatings === 1 ? "rating" : "ratings"})
                </p>
              )}
            </div>
          </div>

          <div className="border-t border-border pt-8 mt-10">
            <h2 className="font-display text-2xl text-foreground mb-6 tracking-wider">
              COMMENTS
            </h2>
            <p className="font-body text-sm text-muted-foreground italic">
              No comments yet. Check back soon.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AlbumPage;
