import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const SuggestAlbum = () => (
  <div className="min-h-screen bg-background text-foreground">
    <div className="max-w-2xl mx-auto px-6 py-8">
      <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 font-body text-sm">
        <ArrowLeft className="w-4 h-4" /> Back
      </Link>
      <h1 className="font-display text-5xl text-foreground mb-6">SUGGEST AN ALBUM</h1>
      <p className="font-body text-secondary-foreground mb-8">Got an album you think deserves a review? Drop it below.</p>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <input type="text" placeholder="Album name" className="w-full px-4 py-3 bg-card border border-border rounded-lg font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
        <input type="text" placeholder="Artist" className="w-full px-4 py-3 bg-card border border-border rounded-lg font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
        <textarea placeholder="Why should I review this?" rows={4} className="w-full px-4 py-3 bg-card border border-border rounded-lg font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
        <button type="submit" className="px-6 py-3 bg-primary text-primary-foreground font-body font-semibold rounded-lg hover:opacity-90 transition-opacity">
          Submit Suggestion
        </button>
      </form>
    </div>
  </div>
);

export default SuggestAlbum;
