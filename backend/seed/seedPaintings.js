const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Painting = require("../models/Painting");

dotenv.config();

/* -------------------------
   CURATED MUSEUM DATASET
--------------------------*/

const paintings = [
  {
    title: "The Death of Socrates (La Mort de Socrate)",
    artist: "Jacques-Louis David",
    year: 1787,
    medium: "Neoclassicism / Oil on canvas",
    description:
      "This monumental Neoclassical masterpiece captures the final moments of the philosopher Socrates, condemned to death for 'corrupting the youth.' Unflinchingly serene, Socrates sits upright, pointing heavenward while accepting the hemlock cup. Through rigid composition and dramatic chiaroscuro, David transforms the death of a thinker into stoic martyrdom, highlighting reason over injustice.",

    imageUrls: ["http://localhost:5000/paintings/painting1.jpg"],

    tags: [
      "Neoclassicism",
      "Philosopher",
      "Imprisonment",
      "Stoicism",
      "Martyrdom",
      "Ancient Greece",
      "Socratic Method"
    ],

    relatedPaintings: []
  },

  {
    title:
      "Reply of the Zaporozhian Cossacks Writing a Letter to the Turkish Sultan",
    artist: "Ilya Repin",
    year: 1891,
    medium: "Realism / Oil on canvas",
    description:
      "A chaotic and vibrant depiction of Cossacks drafting an insulting reply to the Ottoman Sultan. Repin captures raw humor, rebellion, and camaraderie through expressive faces and dynamic composition.",

    imageUrls: ["http://localhost:5000/paintings/painting2.jpg"],

    tags: [
      "Realism",
      "Russian Art",
      "Cossacks",
      "Defiance",
      "Comedy",
      "Historical Event"
    ],

    relatedPaintings: []
  },

  {
    title: "Water from the Rock (Moses Striking the Rock)",
    artist: "Tom Lovell",
    year: 1960,
    medium: "Historical Illustration / Oil or Gouache",
    description:
      "A dramatic biblical scene of divine intervention in the desert. Moses brings forth water to the thirsty Israelites, contrasting desolation with miraculous abundance.",

    imageUrls: ["http://localhost:5000/paintings/painting3.jpg"],

    tags: [
      "Biblical Narrative",
      "Exodus",
      "Miracle",
      "Desert",
      "Moses",
      "Survival"
    ],

    relatedPaintings: []
  },

  {
    title: "The Bard (The Last Minstrel)",
    artist: "Benjamin West (attributed style)",
    year: 1785,
    medium: "Romanticism / Oil on canvas",
    description:
      "A melancholic depiction of a bard witnessing the decline of his cultural world, blending myth, history, and emotional loss in a Romantic atmosphere.",

    imageUrls: ["http://localhost:5000/paintings/painting4.jpg"],

    tags: [
      "Romanticism",
      "Celtic Myth",
      "Bard",
      "Grief",
      "Medieval",
      "Music"
    ],

    relatedPaintings: []
  },

  {
    title: "The Chess Players (The Devil and the Youth)",
    artist: "Unknown",
    year: 1890,
    medium: "Romantic Symbolism / Oil on canvas",
    description:
      "An allegorical chess game between a young man and the Devil, observed by an angel. A psychological battle between salvation and damnation.",

    imageUrls: ["http://localhost:5000/paintings/painting5.jpg"],

    tags: [
      "Allegory",
      "Symbolism",
      "Chess",
      "Devil",
      "Angel",
      "Morality"
    ],

    relatedPaintings: []
  },

  {
    title: "Daniel in the Lion's Den",
    artist: "Briton Rivière",
    year: 1872,
    medium: "Victorian Academic Realism / Oil on canvas",
    description:
      "A tense biblical scene emphasizing human vulnerability and faith, with Daniel standing unflinching before a pack of lions in a dark stone dungeon.",

    imageUrls: ["http://localhost:5000/paintings/painting6.jpg"],

    tags: [
      "Victorian Art",
      "Biblical Story",
      "Faith",
      "Lions",
      "Courage",
      "Realism"
    ],

    relatedPaintings: []
  },

  {
    title: "The Knight in the Enchanted Garden",
    artist: "Armand Point",
    year: 1895,
    medium: "Symbolism / Oil on canvas",
    description:
      "A dreamlike fusion of knightly armor and mystical nature, blending chivalry with surreal floral enchantment.",

    imageUrls: ["http://localhost:5000/paintings/painting7.jpg"],

    tags: [
      "Symbolism",
      "Knight",
      "Flowers",
      "Dreamscape",
      "Mythology",
      "Pre-Raphaelite"
    ],

    relatedPaintings: []
  },

  {
    title: "The Knight of the White Cross (Saint Louis IX)",
    artist: "Georges-Antoine Rochegrosse",
    year: 1885,
    medium: "Academic / Romantic Historical Oil on canvas",
    description:
      "A grand depiction of a crusading king riding into glory, surrounded by devotion, roses, and divine symbolism.",

    imageUrls: ["http://localhost:5000/paintings/painting8.jpg"],

    tags: [
      "Academic Art",
      "King",
      "Crusades",
      "Medieval",
      "Religious Triumph",
      "Chivalry"
    ],

    relatedPaintings: []
  }
];

/* -------------------------
   SEED FUNCTION
--------------------------*/

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to MongoDB");

    await Painting.deleteMany(); // clean slate
    await Painting.insertMany(paintings);

    console.log("Database seeded successfully 🚀");

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();