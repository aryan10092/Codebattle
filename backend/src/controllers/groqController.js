const axios = require("axios");

const GROQ_CHAT_COMPLETIONS_URL = "https://api.groq.com/openai/v1/chat/completions";

async function proxyGroqChatCompletion(req, res) {
  try {
    const groqApiKey = process.env.GROQ_API_KEY || process.env.GROK_API_KEY;

    if (!groqApiKey) {
      return res.status(500).json({
        error: "Groq API key is not configured",
      });
    }

    const response = await axios.post(GROQ_CHAT_COMPLETIONS_URL, req.body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${groqApiKey}`,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: "Groq request failed",
    });
  }
}

module.exports = {
  proxyGroqChatCompletion,
};