const express = require('express');
const router = express.Router();
const axios = require('axios');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

router.post('/', async (req, res) => {
  const { prompt } = req.body;
  console.log('👉 Received prompt:', prompt);

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const geminiResponse = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': GEMINI_API_KEY,
        },
      }
    );

    const text =
      geminiResponse.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      'No response';

    res.json({ response: text });
  } catch (err) {
    console.error('❌ Gemini SDK Error:', err.message);
    console.error('🔎 Full error:', err.response?.data || err);
    res.status(500).json({ error: 'Gemini API failed', details: err.message });
  }
});

module.exports = router;
