import album1 from "@/assets/albums/Christopher_cross.jpg";
import album2 from "@/assets/albums/Swv_newbeginning.jpg";
import album3 from "@/assets/albums/Mama's_Gun.jpg";
import album4 from "@/assets/albums/gapband_live.jpg";
import album5 from "@/assets/albums/album5.jpg";
import album6 from "@/assets/albums/album6.jpg";

export interface Album {
  id: string;
  title: string;
  artist: string;
  rating: number;
  cover: string;
  review: string;
  genre: string;
  releaseYear: number;
}

export const albums: Album[] = [
  {
    id: "Christopher_cross",
    title: "Christopher Cross",
    artist: "Christopher Cross",
    rating: 8.4,
    cover: Christopher_cross,
    genre: "Soft Rock",
    releaseYear: 1979,
    review:
      "Sounds attractive, far more attractive than Chris physically. A beautiful project with little to no fluff. Cross's voice carries naturally and gently even on more intense tracks like 'Ride Like the Wind'. A very dynamic album. Instrumentation is consistent. Michael McDonald's backing voices dancing across the project enhanced the quality. His influence is equally tangible in the album's production choices. Two of the best voices in soft rock, a serene and massively successful album.",
  },
  {
    id: "golden-hour-fading",
    title: "Golden Hour Fading",
    artist: "Wren & Thistle",
    rating: 9.2,
    cover: album2,
    genre: "Indie Folk",
    releaseYear: 2023,
    review:
      "Wren & Thistle deliver their most emotionally devastating work to date. 'Golden Hour Fading' is a meditation on loss, memory, and the light that remains. The vocal harmonies are achingly beautiful, draped over fingerpicked guitar patterns that feel like sunlight through curtains. This is the kind of album that stops you in your tracks and demands you sit with it. A near-perfect record.",
  },
  {
    id: "neon-rain",
    title: "Neon Rain",
    artist: "KIRA",
    rating: 7.4,
    cover: album3,
    genre: "Synthwave",
    releaseYear: 2024,
    review:
      "KIRA's sophomore effort is a neon-soaked sprint through retrofuturistic cityscapes. The production is sleek and punchy, with driving rhythms that never let up. While it occasionally leans too heavily on genre tropes, tracks like 'Chrome Tears' and 'Boulevard of Static' transcend the formula with genuine emotional weight. A solid entry in the synthwave canon.",
  },
  {
    id: "dust-and-devotion",
    title: "Dust & Devotion",
    artist: "Clyde Harmon",
    rating: 8.1,
    cover: album4,
    genre: "Americana",
    releaseYear: 2023,
    review:
      "Clyde Harmon's voice carries decades of highway dust and heartbreak. 'Dust & Devotion' is a sprawling Americana epic that moves from whispered confessionals to roaring anthems. The storytelling is vivid and lived-in — you can smell the desert sage and feel the cracked leather of a truck seat. An album that rewards patience and repeated listens.",
  },
  {
    id: "submerge",
    title: "Submerge",
    artist: "Pale Circuit",
    rating: 9.5,
    cover: album5,
    genre: "Ambient",
    releaseYear: 2024,
    review:
      "A masterpiece of ambient composition. Pale Circuit crafts entire worlds from shimmering drones and subaquatic textures. 'Submerge' doesn't just ask you to listen — it asks you to dissolve. Each of its seven tracks unfolds with the patience of tides, building towards moments of transcendent beauty. This is the best ambient record in years, full stop.",
  },
  {
    id: "concrete-gospel",
    title: "Concrete Gospel",
    artist: "MVRK",
    rating: 6.8,
    cover: album6,
    genre: "Hip Hop",
    releaseYear: 2024,
    review:
      "MVRK's debut is raw, confrontational, and occasionally brilliant. The production is intentionally abrasive — crunchy drums and distorted samples that mirror the lyrical intensity. Where it falters is in its lack of editing — at 18 tracks, the impact dilutes. But when it connects, like on 'Sermon' and 'Block Prayer,' it hits with the force of a freight train. A flawed but promising debut.",
  },
];
