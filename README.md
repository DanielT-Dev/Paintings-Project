# Paintings Project

This app is a digital gallery for browsing a collection of paintings online. It works on phones, tablets, and computers, with a clean layout that makes viewing artwork simple and pleasant.

The collection is stored securely in the cloud, so you can access it anytime. The app is built with modern web technologies to ensure a fast, reliable, and smooth experience.

## Technology Stack

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=ts,js,react,html,css,vite,npm,nodejs,express,mongodb,nodemon" />
  </a>
</p>

## Detailed Stack

| Category | Technologies |
|----------|--------------|
| **Languages** | ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) |
| **Frontend** | ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white) ![ForceGraph2D](https://img.shields.io/badge/ForceGraph2D-6C2BD9?style=for-the-badge&logo=datadog&logoColor=white) |
| **Styling** | ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![ChakraUI](https://img.shields.io/badge/Chakra--UI-319795?style=for-the-badge&logo=chakra-ui&logoColor=white) |
| **Build Tools** | ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) ![NPM](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white) |
| **Backend** | ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white) ![Nodemon](https://img.shields.io/badge/Nodemon-76D04B?style=for-the-badge&logo=nodemon&logoColor=white) |
| **Database** | ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white) |
| **Logging** | ![Winston](https://img.shields.io/badge/Winston-6C2BD9?style=for-the-badge&logo=winston&logoColor=white) |

## Database Connection (MongoDB + Mongoose)

We connect to MongoDB using Mongoose and environment variables for configuration:

```js
const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
```

This ensures:
- Secure connection using .env
- Proper error handling on startup
- Clean server shutdown if DB connection fails

---

## Data Modeling (Mongoose Schema)

Paintings are stored using a structured schema that includes metadata and relationships to other paintings.

```js
const mongoose = require("mongoose");

const relatedPaintingSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Painting",
      required: true,
    },
    score: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const paintingSchema = new mongoose.Schema(
  {
    title: String,
    artist: String,
    year: Number,
    medium: String,
    description: String,
    imageUrls: [String],
    tags: [String],

    relatedPaintings: [relatedPaintingSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Painting", paintingSchema);
```

This structure allows:
- Storing multiple images per painting
- Tag-based categorization
- Linking related paintings with a similarity score
- Efficient referencing using ObjectId + population

---

![image1](https://github.com/DanielT-Dev/Paintings-Project/blob/main/paintings-project/public/image1.png)

## API Layer (Controllers)

The API follows a controller-based architecture to separate logic from routes.

### Get All Paintings

```js
const Painting = require("../models/Painting");
const logger = require("../utils/logger");

const getPaintings = async (req, res) => {
  try {
    logger.info("Fetching all paintings");

    const paintings = await Painting.find();

    logger.info("Paintings fetched successfully", {
      count: paintings.length,
    });

    res.json(paintings);
  } catch (err) {
    logger.error("Failed to fetch paintings", {
      error: err,
    });

    res.status(500).json({
      message: "Server error",
    });
  }
};
```

---

### Get Single Painting (with Related Works)

This endpoint fetches a painting and expands its related artworks using populate(), then flattens the result for easier frontend usage.

```js
const getPaintingById = async (req, res) => {
  try {
    logger.info("Fetching painting", {
      paintingId: req.params.id,
    });

    const painting = await Painting.findById(req.params.id)
      .populate("relatedPaintings.id");

    if (!painting) {
      logger.warn("Painting not found", {
        paintingId: req.params.id,
      });

      return res.status(404).json({
        message: "Painting not found",
      });
    }

    const formattedPainting = {
      ...painting.toObject(),
      relatedPaintings: painting.relatedPaintings
        .map((r) => {
          if (!r.id) return null;

          return {
            score: r.score,
            ...r.id.toObject(),
          };
        })
        .filter(Boolean),
    };

    logger.info("Painting fetched successfully", {
      paintingId: painting._id,
      title: painting.title,
      relatedCount: formattedPainting.relatedPaintings.length,
    });

    res.json(formattedPainting);
  } catch (err) {
    logger.error("Failed to fetch painting", {
      paintingId: req.params.id,
      error: err,
    });

    res.status(500).json({
      message: "Server error",
    });
  }
};
```

---

<img 
  src="https://raw.githubusercontent.com/DanielT-Dev/Paintings-Project/main/paintings-project/public/image2.png" 
  width="800" 
  height="500"
/>

## Architecture Summary

- MongoDB stores painting data
- Mongoose defines structured schemas and relationships
- Controllers handle API logic
- populate() is used to resolve relationships
- Data is flattened before sending to the frontend for simplicity
