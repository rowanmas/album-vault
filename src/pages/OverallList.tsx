import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { albums } from "@/data/albums";
import { getRatingColor } from "@/lib/ratingColor";

const OverallList = () => {
  const sorted = [...albums].sort((a, b) => b.rating - a.rating);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-6 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 font-body text-sm">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        <h1 className="font-display text-5xl text-foreground mb-8">OVERALL RANKINGS</h1>
        <div className="space-y-3">
          {sorted.map((album, i) => (
            <Link
              key={album.id}
              to={`/album/${album.id}`}
              className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border hover:border-primary/30 transition-colors group"
            >
              <span className="font-display text-2xl text-muted-foreground w-8">
                {i + 1}
              </span>
              <img src={album.cover} alt={album.title} className="w-14 h-14 rounded object-cover" loading="lazy" width={56} height={56} />
              <div className="flex-1 min-w-0">
                <p className="font-body text-sm font-semibold text-foreground truncate">{album.title}</p>
                <p className="font-body text-xs text-muted-foreground truncate">{album.artist}</p>
              </div>
              <span className="font-display text-3xl font-extrabold" style={{ color: getRatingColor(album.rating) }}>{album.rating}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverallList;
