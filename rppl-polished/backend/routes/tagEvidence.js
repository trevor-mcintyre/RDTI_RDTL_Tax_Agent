// backend/routes/tagEvidence.js
const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post('/tag-evidence', async (req, res) => {
  const { fileName, fileContent } = req.body;

  if (!fileContent) {
    return res.status(400).json({ error: 'fileContent is required' });
  }

  try {
    const prompt = \`You are an expert in New Zealand R&D Tax compliance. A user has uploaded a file named "\${fileName}". Please suggest 1 to 3 tags for this file that represent its role in an R&D claim. Return only a list of tags like ["design document", "prototype", "technical challenge"].\n\nContent:\n\${fileContent}\`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
    });

    const tags = response.choices?.[0]?.message?.content?.match(/\[(.*?)\]/);
    const parsedTags = tags ? JSON.parse(\`[\${tags[1]}]\`) : [];

    res.json({ tags: parsedTags });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate tags' });
  }
});

module.exports = router;