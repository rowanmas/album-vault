import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Instagram, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.svg";
import menuIcon from "@/assets/menu-icon.svg";
import { albums } from "@/data/albums";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { getRatingColor } from "@/lib/ratingColor";

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [albumName, setAlbumName] = useState("");
  const [artistName, setArtistName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [hoveredCover, setHoveredCover] = useState<string | null>(null);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      const amount = 320;
      scrollRef.current.scrollBy({
        left: dir === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  const handleSuggest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!albumName.trim() || !artistName.trim()) return;
    setSubmitting(true);
    try {
      await supabase.from("album_suggestions").insert({
        album_name: albumName.trim(),
        artist_name: artistName.trim(),
      });
      toast.success("Thanks! Your suggestion has been submitted.");
      setAlbumName("");
      setArtistName("");
    } catch {
      toast.error("Something went wrong. Try again.");
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      {/* Hover background */}
      <AnimatePresence>
        {hoveredCover && (
          <motion.div
            key={hoveredCover}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-0 pointer-events-none"
            style={{
              backgroundImage: `url(${hoveredCover})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(80px) saturate(1.4)",
              transform: "scale(1.2)",
            }}
          />
        )}
      </AnimatePresence>
      <div className="relative z-10 flex flex-col flex-1">
      {/* Nav */}
      <nav className="relative flex items-center justify-between px-6 py-4">
        <div className="relative z-50">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-md hover:bg-secondary transition-colors"
          >
            <img src={menuIcon} alt="Menu" className="w-10 h-10" />
          </button>
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="absolute top-full left-0 mt-2 w-52 bg-card border border-border rounded-lg shadow-xl overflow-hidden"
              >
                {[
                  { label: "Suggest Album", to: "/suggest" },
                  { label: "Overall List", to: "/list" },
                  { label: "Contact", to: "/contact" },
                ].map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMenuOpen(false)}
                    className="block px-5 py-3 text-sm font-body text-secondary-foreground hover:bg-secondary transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="w-6" />
      </nav>

      {/* Logo */}
      <div className="flex justify-center py-8">
        <Link to="/">
          <img src={logo} alt="The Review" className="h-48 md:h-64 object-contain" />
        </Link>
      </div>

      {/* Carousel */}
      <div className="relative px-4 md:px-12 pb-20 flex-1">
        <div className="flex items-center justify-between mb-6 px-2">
          <h2 className="font-display text-2xl md:text-3xl text-foreground tracking-wider">
            RECENT REVIEWS
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-2 rounded-full bg-secondary hover:bg-muted transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 rounded-full bg-secondary hover:bg-muted transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: "none" }}
        >
          {albums.map((album) => (
            <Link
              key={album.id}
              to={`/album/${album.id}`}
              className="flex-shrink-0 w-56 md:w-64 group snap-start"
              onMouseEnter={() => setHoveredCover(album.cover)}
              onMouseLeave={() => setHoveredCover(null)}
            >
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="aspect-square rounded-lg overflow-hidden mb-3 shadow-lg">
                  <img
                    src={album.cover}
                    alt={album.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    width={512}
                    height={512}
                  />
                </div>
                <p className="font-body text-sm font-semibold text-foreground truncate">
                  {album.title}
                </p>
                <p className="font-body text-xs text-muted-foreground truncate">
                  {album.artist}
                </p>
                <p
                  className="font-display text-4xl mt-1 leading-none font-extrabold"
                  style={{ color: getRatingColor(album.rating) }}
                >
                  {album.rating}
                </p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer: Suggest + Socials */}
      <footer className="border-t border-border bg-card/50 px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Suggestion Form */}
            <div>
              <h3 className="font-display text-2xl text-foreground tracking-wider mb-2">
                SUGGEST AN ALBUM
              </h3>
              <p className="font-body text-sm text-muted-foreground mb-6">
                Want me to review something? Drop it here.
              </p>
              <form onSubmit={handleSuggest} className="space-y-4">
                <input
                  type="text"
                  placeholder="Album name"
                  value={albumName}
                  onChange={(e) => setAlbumName(e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-border rounded-md font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                />
                <input
                  type="text"
                  placeholder="Artist name"
                  value={artistName}
                  onChange={(e) => setArtistName(e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-border rounded-md font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-body text-sm rounded-md hover:bg-white hover:text-background transition-colors disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  {submitting ? "Sending..." : "Submit"}
                </button>
              </form>
            </div>

            {/* Socials */}
            <div className="flex flex-col justify-center md:items-end">
              <h3 className="font-display text-2xl text-foreground tracking-wider mb-6">
                FOLLOW
              </h3>
              <div className="flex flex-col gap-4">
                <a
                  href="https://instagram.com/rowanmastrangelo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 font-body text-secondary-foreground hover:text-foreground transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                  @rowanmastrangelo
                </a>
                <a
                  href="https://x.com/mastrangeloPXP"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 font-body text-secondary-foreground hover:text-foreground transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  @mastrangeloPXP
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
};

export default Index;
