const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const connectDB = require("./db/connect");
const paintingRoutes = require("./routes/paintingRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// static images (FIXED PATH)
app.use(
  "/paintings",
  express.static(
    path.join(__dirname, "../paintings-project/public/paintings")
  )
);

// routes
app.use("/api/paintings", paintingRoutes);

// fake auth (unchanged)
const users = [];

app.post("/api/signup", (req, res) => {
  const { email, password } = req.body;

  const exists = users.find((u) => u.email === email);
  if (exists) return res.status(400).json({ message: "User already exists" });

  users.push({ email, password });
  res.json({ message: "User created" });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  res.json({ message: "Login successful" });
});

// start AFTER DB connect
connectDB().then(() => {
  app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
  });
});