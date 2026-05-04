const User = require('../models/User');

async function getLeaderboard(req, res) {
  try {
    const limit = parseInt(req.query.limit, 10) || 10;
    // sort by rating desc then wins
    const users = await User.find()
      .sort({ rating: -1, wins: -1 })
      .limit(limit)
      .select('username rating wins losses avatarUrl gamesPlayed');

    res.json({ success: true, users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = { getLeaderboard };
