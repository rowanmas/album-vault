import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { albums } from "@/data/albums";

const AlbumPage = () => {
  const { id } = useParams();
  const album = albums.find((a) => a.id === id);

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
