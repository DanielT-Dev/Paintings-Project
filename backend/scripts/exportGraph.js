const mongoose = require("mongoose");
const fs = require("fs");
const Painting = require("../models/Painting");
const connectDB = require("../db/connect");
const logger = require("../utils/logger");

async function exportGraph() {
  await connectDB();

  logger.info("📊 Exporting graph data...");

  const paintings = await Painting.find();

  const nodes = paintings.map((p) => ({
    id: p._id.toString(),
    title: p.title,
    artist: p.artist,
  }));

  const edges = [];

  for (const p of paintings) {
    for (const relId of p.relatedPaintings || []) {
      edges.push({
        source: p._id.toString(),
        target: relId.toString(),
      });
    }
  }

const graph = { nodes, links: edges };

  fs.writeFileSync(
    "graph.json",
    JSON.stringify(graph, null, 2)
  );

  logger.info("📁 graph.json generated successfully");

  mongoose.connection.close();
}

exportGraph().catch((err) => {
  logger.error("❌ Graph export failed");
  logger.error(err);
  mongoose.connection.close();
});

module.exports = exportGraph;