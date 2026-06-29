const express = require("express");
const cors = require("cors");

const dotenv = require("dotenv");
const connectDB = require("./db/connect");

dotenv.config();

const paintingRoutes = require("./routes/paintingRoutes");

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

app.post("/api/signup", async (req, res) => {
  const { email, password } = req.body;

  const exists = users.find(u => u.email === email);
  if (exists) {
    return res.status(400).json({ message: "User already exists" });
  }

  users.push({ email, password });

  res.json({ message: "User created" });
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({ message: "Login successful" });
});

/* --------------------
   PAINTINGS API
---------------------*/

app.use("/api/paintings", paintingRoutes);

/* -------------------- */

connectDB();

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});