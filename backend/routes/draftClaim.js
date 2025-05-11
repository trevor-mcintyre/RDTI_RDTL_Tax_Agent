// backend/routes/draftClaim.js
const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post('/draft-claim', async (req, res) => {
  const { evidenceItems } = req.body;

  if (!evidenceItems || !Array.isArray(evidenceItems)) {
    return res.status(400).json({ error: 'evidenceItems must be an array of { name, tags, content }' });
  }

  try {
    const formattedEvidence = evidenceItems.map((item, i) => 
      \`[Evidence \${i + 1}]\nName: \${item.name}\nTags: \${item.tags?.join(', ')}\nContent: \${item.content?.slice(0, 500)}...
\`
    ).join("\n");

    const prompt = \`You're an AI assistant generating a draft R&D tax claim summary based on tagged evidence. Use the content and tags below to draft a short paragraph (5-7 sentences) that explains what work was done, why it qualifies, and what outcomes were achieved.\n\n\${formattedEvidence}\`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.4,
    });

    res.json({ draft: response.choices?.[0]?.message?.content?.trim() || '' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate claim draft' });
  }
});

module.exports = router;