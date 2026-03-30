const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const songRoutes = require("./routes/songs.routes")

const app = express();

app.use(cors({
  origin: "https://moodify-ai-music-player.vercel.app",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);

module.exports = app;