const User = require('../models/User');

async function getProfile(req, res) {
  try {
    const userId = req.params.id || req.userId;
    if (!userId) return res.status(400).json({ message: 'User id required' });

    const user = await User.findById(userId).select('-password -__v');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

async function updateProfile(req, res) {
  try {
    const userId = req.userId;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const updates = {};
    const allowed = ['username', 'bio', 'avatarUrl', 'country'];
    allowed.forEach((k) => {
      if (req.body[k] !== undefined) updates[k] = req.body[k];
    });

    const user = await User.findByIdAndUpdate(userId, updates, { new: true }).select('-password -__v');
    res.json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = { getProfile, updateProfile };
