const mongoose = require("mongoose");
const fs = require("fs");
const Painting = require("../models/Painting");
const connectDB = require("../db/connect");
const logger = require("../utils/logger");

async function exportGraph() {
  await connectDB();

  logger.info("📊 Exporting graph...");

  const paintings = await Painting.find();

  const nodes = paintings.map(p => ({
    id: p._id.toString(),
    title: p.title,
    artist: p.artist,
    tags: p.tags || [],
  }));

  const links = [];

  for (const p of paintings) {
    for (const rel of p.relatedPaintings || []) {
      links.push({
        source: p._id.toString(),
        target: rel.id.toString(),
        weight: rel.score || 1,
        type: rel.score > 8 ? "strong" : "semantic",
      });
    }
  }

  const graph = { nodes, links };

  fs.writeFileSync("graph.json", JSON.stringify(graph, null, 2));

  logger.info("✅ graph.json exported");

  mongoose.connection.close();
}

exportGraph().catch(err => {
  logger.error(err);
  mongoose.connection.close();
});