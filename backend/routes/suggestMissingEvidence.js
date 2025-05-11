// backend/routes/suggestMissingEvidence.js
const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post('/suggest-missing-evidence', async (req, res) => {
  const { evidenceSummaries } = req.body;

  if (!Array.isArray(evidenceSummaries) || evidenceSummaries.length === 0) {
    return res.status(400).json({ error: 'evidenceSummaries must be a non-empty array of summaries' });
  }

  try {
    const formatted = evidenceSummaries.map((e, i) => \`[\${i + 1}] \${e}\`).join('\n');

    const prompt = \`You are helping a team prepare for an R&D tax claim in New Zealand. Given the following summaries of uploaded evidence, identify any key types of evidence that are missing (e.g. timesheets, design specs, technical challenge descriptions, test results).\n\nEvidence:\n\${formatted}\n\nReturn your output as a list of missing evidence types.\`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
    });

    const text = response.choices?.[0]?.message?.content || '';
    const lines = text.split(/\n|\r/).filter(line => line.trim()).map(line => line.replace(/^[-*\d.\s]+/, '').trim());

    res.json({ missingEvidence: lines });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to suggest missing evidence' });
  }
});

module.exports = router;