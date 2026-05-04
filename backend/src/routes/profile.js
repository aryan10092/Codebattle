const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/profileController');
const auth = require('../middleware/auth');

router.get('/me', auth, getProfile);
router.get('/:id', getProfile);
router.put('/', auth, updateProfile);

module.exports = router;
