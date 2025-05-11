// backend/routes/linkEvidenceGraph.js
const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post('/link-evidence-graph', async (req, res) => {
  const { meetings, evidences } = req.body;

  if (!Array.isArray(meetings) || !Array.isArray(evidences)) {
    return res.status(400).json({ error: 'meetings and evidences must be arrays' });
  }

  try {
    const context = [
      'Meetings:',
      ...meetings.map((m, i) => `[M${i + 1}] ID: ${m.id}, Summary: ${m.summary || m.transcript}`),
      'Evidences:',
      ...evidences.map((e, i) => `[E${i + 1}] ID: ${e.id}, Tags: ${e.tags?.join(', ')}, Content: ${e.content?.slice(0, 300)}`)
    ].join('\n');

    const prompt = \`Based on the meeting summaries and evidence content below, create a JSON array of suggested links between meetings and evidence items. Each link should be an object with meetingId and evidenceId.\n\n\${context}\n\nReturn only a JSON array like [{"meetingId":"m123","evidenceId":"e456"},...]\`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2,
    });

    const jsonMatch = response.choices?.[0]?.message?.content?.match(/\[.*?\]/s);
    const parsedLinks = jsonMatch ? JSON.parse(jsonMatch[0]) : [];

    res.json({ links: parsedLinks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Linking failed' });
  }
});

module.exports = router;