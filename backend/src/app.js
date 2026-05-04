const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const groqRoutes = require("./routes/groq");
const profileRoutes = require("./routes/profile");
const leaderboardRoutes = require("./routes/leaderboard");
const path = require("path");


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
    // serve frontend build
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

// fallback for React routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

  return app;
}

module.exports = {
  createApp,
};
