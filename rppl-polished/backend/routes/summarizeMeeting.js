// backend/routes/summarizeMeeting.js
const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post('/summarize-meeting', async (req, res) => {
  const { transcript } = req.body;

  if (!transcript) {
    return res.status(400).json({ error: 'Meeting transcript is required' });
  }

  try {
    const prompt = \`You are an AI assistant for a company preparing R&D tax claims. Summarize the following meeting transcript in 3-4 bullet points. Then, suggest the most relevant next best action for the team (e.g., upload missing evidence, clarify technical scope, assign reviewer).\n\nTranscript:\n\${transcript}\`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.4,
    });

    const result = response.choices?.[0]?.message?.content || '';
    const [summary, ...rest] = result.split("Next best action:");

    res.json({
      summary: summary.trim(),
      nextBestAction: rest.join("Next best action:").trim(),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to summarize meeting' });
  }
});

module.exports = router;