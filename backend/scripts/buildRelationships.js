const mongoose = require("mongoose");
const Painting = require("../models/Painting");
const connectDB = require("../db/connect");
const logger = require("../utils/logger");

// 🧠 scoring logic
function calculateScore(a, b) {
  let score = 0;

  // same artist (strong signal)
  if (a.artist === b.artist) {
    score += 5;
  }

  // movement tags
  const movementTags = [
    "renaissance",
    "baroque",
    "romanticism",
    "neoclassicism",
    "symbolism",
    "realism",
    "gothic",
  ];

  const aMovements = (a.tags || []).filter((t) =>
    movementTags.includes(t.toLowerCase())
  );

  const bMovements = (b.tags || []).filter((t) =>
    movementTags.includes(t.toLowerCase())
  );

  const sharedMovements = aMovements.filter((m) =>
    bMovements.includes(m)
  );

  score += sharedMovements.length * 4;

  // shared tags
  const sharedTags = (a.tags || []).filter((tag) =>
    (b.tags || []).includes(tag)
  );

  score += sharedTags.length * 2;

  // lightweight text overlap
  const aWords = new Set((a.description || "").toLowerCase().split(/\W+/));
  const bWords = new Set((b.description || "").toLowerCase().split(/\W+/));

  let commonWords = 0;
  for (const w of aWords) {
    if (w.length > 4 && bWords.has(w)) commonWords++;
  }

  score += commonWords;

  return score;
}

async function buildRelationships() {
  await connectDB();

  logger.info("🔗 Building painting relationships...");

  const paintings = await Painting.find();

  for (const painting of paintings) {
    const scores = [];

    for (const other of paintings) {
      if (painting._id.equals(other._id)) continue;

      const score = calculateScore(painting, other);

      scores.push({
        id: other._id,
        score,
      });
    }

    const topRelated = scores
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
      .map((s) => s.id);

    await Painting.findByIdAndUpdate(painting._id, {
      relatedPaintings: topRelated,
    });

    logger.info(`Updated: ${painting.title}`);
  }

  logger.info("✅ Relationship graph built successfully");

  mongoose.connection.close();
}

buildRelationships().catch((err) => {
  logger.error("❌ Relationship build failed");
  logger.error(err);
  mongoose.connection.close();
});