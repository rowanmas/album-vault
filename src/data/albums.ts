import album1 from "@/assets/Christopher_cross.jpg";
import album2 from "@/assets/Swv_newbeginning.jpg";
import album3 from "@/assets/Mama's_Gun.png";
import album4 from "@/assets/gapband_live.jpg";

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
    cover: album1,
    genre: "Soft Rock",
    releaseYear: 1979,
    review:
      "Sounds attractive, far more attractive than Chris physically. A beautiful project with little to no fluff. Cross's voice carries naturally and gently even on more intense tracks like 'Ride Like the Wind'. A very dynamic album. Instrumentation is consistent. Michael McDonald's backing voices dancing across the project enhanced the quality. His influence is equally tangible in the album's production choices. Two of the best voices in soft rock, a serene and massively successful album.",
  },
  {
    id: "golden-hour-fading",
    title: "New Beginning",
    artist: "SWV",
    rating: 9.2,
    cover: album2,
    genre: "R&B",
    releaseYear: 1996,
    review:
      "Wren & Thistle deliver their most emotionally devastating work to date. 'Golden Hour Fading' is a meditation on loss, memory, and the light that remains. The vocal harmonies are achingly beautiful, draped over fingerpicked guitar patterns that feel like sunlight through curtains. This is the kind of album that stops you in your tracks and demands you sit with it. A near-perfect record.",
  },
  {
    id: "neon-rain",
    title: "Mama's Gun",
    artist: "Erykah Badu",
    rating: 7.4,
    cover: album3,
    genre: "Neo Soul",
    releaseYear: 2000,
    review:
      "KIRA's sophomore effort is a neon-soaked sprint through retrofuturistic cityscapes. The production is sleek and punchy, with driving rhythms that never let up. While it occasionally leans too heavily on genre tropes, tracks like 'Chrome Tears' and 'Boulevard of Static' transcend the formula with genuine emotional weight. A solid entry in the synthwave canon.",
  },
  {
    id: "dust-and-devotion",
    title: "GAP Band Live",
    artist: "The Gap Band",
    rating: 8.1,
    cover: album4,
    genre: "Funk",
    releaseYear: 1996,
    review:
      "Clyde Harmon's voice carries decades of highway dust and heartbreak. 'Dust & Devotion' is a sprawling Americana epic that moves from whispered confessionals to roaring anthems. The storytelling is vivid and lived-in — you can smell the desert sage and feel the cracked leather of a truck seat. An album that rewards patience and repeated listens.",
  },
];
