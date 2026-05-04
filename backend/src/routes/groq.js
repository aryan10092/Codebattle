const express = require("express");

const { proxyGroqChatCompletion } = require("../controllers/groqController");

const router = express.Router();

router.post("/groq", proxyGroqChatCompletion);
router.post("/grok", proxyGroqChatCompletion);

module.exports = router;