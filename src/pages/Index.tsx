import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";
import { albums } from "@/data/albums";

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      const amount = 320;
      scrollRef.current.scrollBy({
        left: dir === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="relative flex items-center justify-between px-6 py-4">
        <div className="relative z-50">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-md hover:bg-secondary transition-colors"
          >
            <Menu className="w-6 h-6 text-foreground" />
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
          <img src={logo} alt="The Review" className="h-24 md:h-32 object-contain" />
        </Link>
      </div>

      {/* Carousel */}
      <div className="relative px-4 md:px-12 pb-20">
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
                <p className="font-display text-4xl text-rating mt-1 leading-none">
                  {album.rating}
                </p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
