const mongoose = require("mongoose");
require("dotenv").config();

const Painting = require("../models/Painting");
const Category = require("../models/Category");

// -----------------------------------------------------------------------------
// PAINTINGS DATA (with categories added)
// -----------------------------------------------------------------------------

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
    categories: ["Neoclassicism", "Philosophy"],
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
    categories: ["Realism", "History"],
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
    categories: ["Religion"],
    relatedPaintings: [],
  },
  {
    title: "The Bard",
    artist: "Benjamin West",
    year: 1785,
    medium: "Oil on canvas",
    description: "A melancholic bard reflects on the loss of his culture.",
    imageUrls: ["http://localhost:5000/paintings/painting4.jpg"],
    tags: ["Romanticism", "Music", "Myth"],
    categories: ["Romanticism"],
    relatedPaintings: [],
  },
  {
    title: "The Chess Players",
    artist: "Unknown",
    year: 1890,
    medium: "Oil on canvas",
    description: "A symbolic chess game between a young man and the Devil.",
    imageUrls: ["http://localhost:5000/paintings/painting5.jpg"],
    tags: ["Symbolism", "Allegory", "Morality"],
    categories: ["Symbolism"],
    relatedPaintings: [],
  },
  {
    title: "Daniel in the Lion's Den",
    artist: "Briton Rivière",
    year: 1872,
    medium: "Oil on canvas",
    description: "Daniel stands unshaken before lions in a dark dungeon.",
    imageUrls: ["http://localhost:5000/paintings/painting6.jpg"],
    tags: ["Biblical", "Faith", "Realism"],
    categories: ["Religion", "Realism"],
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
    categories: ["Symbolism"],
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
    categories: ["History", "Religion"],
    relatedPaintings: [],
  },

  {
    title: "The Oath of the Horatii",
    artist: "Jacques-Louis David",
    year: 1784,
    medium: "Oil on canvas",
    description:
      "Three brothers swear loyalty to Rome as they prepare for deadly combat.",
    imageUrls: ["http://localhost:5000/paintings/painting9.jpg"],
    tags: ["Neoclassicism", "Patriotism", "Roman Legend"],
    categories: ["Neoclassicism", "History"],
    relatedPaintings: [],
  },
  {
    title: "The Coronation of Napoleon",
    artist: "Jacques-Louis David",
    year: 1807,
    medium: "Oil on canvas",
    description:
      "Napoleon crowns himself Emperor in a grand political spectacle.",
    imageUrls: ["http://localhost:5000/paintings/painting10.jpg"],
    tags: ["Neoclassicism", "Napoleon", "Coronation"],
    categories: ["Neoclassicism", "History"],
    relatedPaintings: [],
  },
  {
    title: "The Death of Marat",
    artist: "Jacques-Louis David",
    year: 1793,
    medium: "Oil on canvas",
    description:
      "Jean-Paul Marat is depicted as a martyr after his assassination.",
    imageUrls: ["http://localhost:5000/paintings/painting11.jpg"],
    tags: ["Neoclassicism", "Revolution", "Martyrdom"],
    categories: ["Neoclassicism", "History"],
    relatedPaintings: [],
  },
  {
    title: "The Apotheosis of Homer",
    artist: "Jean-Auguste-Dominique Ingres",
    year: 1827,
    medium: "Oil on canvas",
    description:
      "Homer is glorified among the greatest thinkers and artists.",
    imageUrls: ["http://localhost:5000/paintings/painting12.jpg"],
    tags: ["Neoclassicism", "Homer", "Allegory"],
    categories: ["Neoclassicism"],
    relatedPaintings: [],
  },
  {
    title: "Liberty Leading the People",
    artist: "Eugène Delacroix",
    year: 1830,
    medium: "Oil on canvas",
    description:
      "Liberty leads revolutionaries during the July Revolution in France.",
    imageUrls: ["http://localhost:5000/paintings/painting13.jpg"],
    tags: ["Romanticism", "Revolution", "Liberty"],
    categories: ["Romanticism", "History"],
    relatedPaintings: [],
  },
  {
    title: "The Raft of the Medusa",
    artist: "Théodore Géricault",
    year: 1819,
    medium: "Oil on canvas",
    description:
      "Shipwreck survivors struggle for life on a makeshift raft.",
    imageUrls: ["http://localhost:5000/paintings/painting14.jpg"],
    tags: ["Romanticism", "Shipwreck", "Tragedy"],
    categories: ["Romanticism"],
    relatedPaintings: [],
  },
  {
    title: "Wanderer above the Sea of Fog",
    artist: "Caspar David Friedrich",
    year: 1818,
    medium: "Oil on canvas",
    description:
      "A solitary figure contemplates a fog-covered landscape.",
    imageUrls: ["http://localhost:5000/paintings/painting15.jpg"],
    tags: ["Romanticism", "Sublime", "Solitude"],
    categories: ["Romanticism"],
    relatedPaintings: [],
  },
  {
    title: "The Nightmare",
    artist: "Henry Fuseli",
    year: 1781,
    medium: "Oil on canvas",
    description:
      "A sleeping woman is haunted by a demon and a ghostly horse.",
    imageUrls: ["http://localhost:5000/paintings/painting16.jpg"],
    tags: ["Romanticism", "Gothic", "Nightmare"],
    categories: ["Romanticism"],
    relatedPaintings: [],
  },
  {
    title: "Ophelia",
    artist: "John Everett Millais",
    year: 1852,
    medium: "Oil on canvas",
    description:
      "Ophelia floats in a river surrounded by symbolic flowers.",
    imageUrls: ["http://localhost:5000/paintings/painting17.jpg"],
    tags: ["Pre-Raphaelite", "Tragedy", "Shakespeare"],
    categories: ["Romanticism"],
    relatedPaintings: [],
  },
  {
    title: "The Isle of the Dead",
    artist: "Arnold Böcklin",
    year: 1880,
    medium: "Oil on canvas",
    description:
      "A mysterious island of the dead is approached by a boat.",
    imageUrls: ["http://localhost:5000/paintings/painting18.jpg"],
    tags: ["Symbolism", "Death", "Mystery"],
    categories: ["Symbolism"],
    relatedPaintings: [],
  },
  {
    title: "The Sleep of Reason Produces Monsters",
    artist: "Francisco Goya",
    year: 1799,
    medium: "Etching and aquatint",
    description:
      "A sleeping figure is surrounded by owls, bats, and beasts.",
    imageUrls: ["http://localhost:5000/paintings/painting19.jpg"],
    tags: ["Romanticism", "Los Caprichos", "Enlightenment", "Satire"],
    categories: ["Romanticism"],
    relatedPaintings: [],
  },
  {
    title: "The Kiss",
    artist: "Gustav Klimt",
    year: 1908,
    medium: "Oil and gold leaf",
    description:
      "A couple embraces in a golden symbolic composition.",
    imageUrls: ["http://localhost:5000/paintings/painting20.jpg"],
    tags: ["Symbolism", "Love", "Art Nouveau"],
    categories: ["Symbolism"],
    relatedPaintings: [],
  },
  {
    title: "The Return of the Prodigal Son",
    artist: "Rembrandt",
    year: 1669,
    medium: "Oil on canvas",
    description:
      "A father forgives his returning son in a moment of redemption.",
    imageUrls: ["http://localhost:5000/paintings/painting21.jpg"],
    tags: ["Baroque", "Forgiveness", "Biblical"],
    categories: ["Religion"],
    relatedPaintings: [],
  },
  {
    title: "The Last Supper",
    artist: "Leonardo da Vinci",
    year: 1498,
    medium: "Fresco",
    description:
      "Jesus announces betrayal among his disciples.",
    imageUrls: ["http://localhost:5000/paintings/painting22.jpg"],
    tags: ["Renaissance", "Biblical", "Betrayal"],
    categories: ["Religion"],
    relatedPaintings: [],
  },
  {
    title: "The Creation of Adam",
    artist: "Michelangelo",
    year: 1511,
    medium: "Fresco",
    description:
      "God reaches out to give life to Adam.",
    imageUrls: ["http://localhost:5000/paintings/painting23.jpg"],
    tags: ["Renaissance", "Creation", "Sistine Chapel"],
    categories: ["Religion"],
    relatedPaintings: [],
  },
  {
    title: "Ivan the Terrible and His Son Ivan",
    artist: "Ilya Repin",
    year: 1885,
    medium: "Oil on canvas",
    description:
      "A tragic moment of regret after a fatal strike.",
    imageUrls: ["http://localhost:5000/paintings/painting24.jpg"],
    tags: ["Realism", "Russian History", "Tragedy"],
    categories: ["Realism", "History"],
    relatedPaintings: [],
  },
];

// -----------------------------------------------------------------------------
// CATEGORY EXTRACTION
// -----------------------------------------------------------------------------

const extractUniqueCategories = (paintings) => {
  const set = new Set();

  paintings.forEach((p) => {
    (p.categories || []).forEach((c) => set.add(c));
  });

  return [...set];
};

// -----------------------------------------------------------------------------
// SEED FUNCTION
// -----------------------------------------------------------------------------

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to MongoDB");

    await Painting.deleteMany();
    await Category.deleteMany();

    console.log("Old data removed");

    // Create categories
    const categoryNames = extractUniqueCategories(paintings);

    const categoryDocs = await Category.insertMany(
      categoryNames.map((name) => ({ name }))
    );

    const categoryMap = {};
    categoryDocs.forEach((c) => {
      categoryMap[c.name] = c._id;
    });

    // Map paintings categories → ObjectIds
    const paintingsWithCategories = paintings.map((p) => ({
      ...p,
      categories: (p.categories || []).map((c) => categoryMap[c]),
    }));

    const inserted = await Painting.insertMany(paintingsWithCategories);

    console.log(`Inserted ${inserted.length} paintings`);
    console.log(`Inserted ${categoryDocs.length} categories`);

    console.log("Database seeded successfully");

    process.exit();
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
}

seed();