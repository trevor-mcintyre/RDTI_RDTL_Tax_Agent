// backend/routes/rewritePlainEnglish.js
const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post('/rewrite-plain-english', async (req, res) => {
  const { inputText } = req.body;

  if (!inputText) {
    return res.status(400).json({ error: 'inputText is required' });
  }

  try {
    const prompt = `Rewrite the following technical explanation into clear, plain English suitable for an executive summary.\n\n"${inputText}"`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
    });

    res.json({ plainText: response.choices?.[0]?.message?.content?.trim() || '' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to rewrite in plain English' });
  }
});

module.exports = router;