const paintings = [
  {
    id: "1",
    title: "Starry Night",
    artist: "Vincent van Gogh",
    year: 1889,
    medium: "Oil on canvas",
    description: "A swirling night sky over a quiet town.",
    imageUrls: [
      "https://example.com/starry1.jpg"
    ],
    tags: ["post-impressionism", "night", "sky"],
    relatedPaintings: ["2"]
  },
  {
    id: "2",
    title: "The Scream",
    artist: "Edvard Munch",
    year: 1893,
    medium: "Oil, tempera, pastel",
    description: "Expression of existential anxiety.",
    imageUrls: [
      "https://example.com/scream.jpg"
    ],
    tags: ["expressionism", "anxiety"],
    relatedPaintings: ["1"]
  }
];

module.exports = paintings;