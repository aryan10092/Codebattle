const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const groqRoutes = require("./routes/groq");
const profileRoutes = require("./routes/profile");
const leaderboardRoutes = require("./routes/leaderboard");

  function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/", (req, res) => {
    res.send("Backend running....");
  });

  app.use("/api/auth", authRoutes);
  app.use("/api", groqRoutes);
  app.use("/api/profile", profileRoutes);
  app.use("/api/leaderboard", leaderboardRoutes);

  return app;
}

module.exports = {
  createApp,
};