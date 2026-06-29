const mongoose = require("mongoose");
require("dotenv").config();

const Painting = require("../models/Painting");

const paintings = [
  {
    title: "The Death of Socrates",
    artist: "Jacques-Louis David",
    year: 1787,
    medium: "Oil on canvas",
    description:
      "Socrates calmly accepts death, pointing upward while surrounded by grief-stricken followers.",
    imageUrls: ["http://localhost:5000/paintings/painting1.jpg"],
    tags: ["Neoclassicism", "Philosophy", "Stoicism"],
    relatedPaintings: [],
  },
  {
    title: "Reply of the Zaporozhian Cossacks",
    artist: "Ilya Repin",
    year: 1891,
    medium: "Oil on canvas",
    description:
      "Cossacks laugh while composing an insulting reply to the Ottoman Sultan.",
    imageUrls: ["http://localhost:5000/paintings/painting2.jpg"],
    tags: ["Realism", "Cossacks", "Humor"],
    relatedPaintings: [],
  },
  {
    title: "Water from the Rock",
    artist: "Tom Lovell",
    year: 1960,
    medium: "Oil / Gouache",
    description:
      "Moses brings water to the Israelites in the desert through divine intervention.",
    imageUrls: ["http://localhost:5000/paintings/painting3.jpg"],
    tags: ["Biblical", "Moses", "Miracle"],
    relatedPaintings: [],
  },
  {
    title: "The Bard",
    artist: "Benjamin West",
    year: 1785,
    medium: "Oil on canvas",
    description:
      "A melancholic bard reflects on the loss of his culture.",
    imageUrls: ["http://localhost:5000/paintings/painting4.jpg"],
    tags: ["Romanticism", "Music", "Myth"],
    relatedPaintings: [],
  },
  {
    title: "The Chess Players",
    artist: "Unknown",
    year: 1890,
    medium: "Oil on canvas",
    description:
      "A symbolic chess game between a young man and the Devil.",
    imageUrls: ["http://localhost:5000/paintings/painting5.jpg"],
    tags: ["Symbolism", "Allegory", "Morality"],
    relatedPaintings: [],
  },
  {
    title: "Daniel in the Lion's Den",
    artist: "Briton Rivière",
    year: 1872,
    medium: "Oil on canvas",
    description:
      "Daniel stands unshaken before lions in a dark dungeon.",
    imageUrls: ["http://localhost:5000/paintings/painting6.jpg"],
    tags: ["Biblical", "Faith", "Realism"],
    relatedPaintings: [],
  },
  {
    title: "The Knight in the Enchanted Garden",
    artist: "Armand Point",
    year: 1895,
    medium: "Oil on canvas",
    description:
      "A mystical knight blends with a dreamlike floral world.",
    imageUrls: ["http://localhost:5000/paintings/painting7.jpg"],
    tags: ["Symbolism", "Fantasy", "Nature"],
    relatedPaintings: [],
  },
  {
    title: "The Knight of the White Cross",
    artist: "Georges-Antoine Rochegrosse",
    year: 1885,
    medium: "Oil on canvas",
    description:
      "A crusading king rides into glory surrounded by roses and devotion.",
    imageUrls: ["http://localhost:5000/paintings/painting8.jpg"],
    tags: ["Medieval", "Chivalry", "Religious"],
    relatedPaintings: [],
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Painting.deleteMany();
    await Painting.insertMany(paintings);

    console.log("Database seeded");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();