// backend/routes/searchEvidenceGraph.js
const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post('/search-evidence-graph', async (req, res) => {
  const { query, entries } = req.body;

  if (!query || !Array.isArray(entries)) {
    return res.status(400).json({ error: 'query and entries[] are required' });
  }

  try {
    const inputText = entries.map((item, i) =>
      `[${i + 1}] ID: ${item.id || 'unknown'}
Summary: ${item.summary || item.transcript || ''}`
    ).join("\n\n");

    const prompt = \`A user is searching through R&D-related meetings and evidence.

Query: "\${query}"

Below is a list of documents with summaries or transcripts. Return a JSON array of IDs where the content is most relevant to the query.

\${inputText}

Return ONLY a JSON array of IDs like ["abc123", "xyz789"].\`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2,
    });

    const match = response.choices?.[0]?.message?.content?.match(/\[(.*?)\]/);
    const jsonArray = match ? JSON.parse(\`[\${match[1]}]\`) : [];

    res.json({ matchedIds: jsonArray });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Semantic search failed' });
  }
});

module.exports = router;