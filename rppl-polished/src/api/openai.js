export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    const { prompt, model = 'gpt-4', temperature = 0.7, max_tokens = 350 } = req.body;
  
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }
  
    const apiKey = process.env.OPENAI_API_KEY; // ✅ moved to backend-only env var
  
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: [{ role: 'user', content: prompt }],
          temperature,
          max_tokens,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        return res.status(500).json({ error: data.error?.message || 'OpenAI API error' });
      }
  
      const message = data.choices?.[0]?.message?.content?.trim();
      return res.status(200).json({ message });
    } catch (error) {
      console.error('OpenAI fetch error:', error);
      return res.status(500).json({ error: 'Failed to fetch from OpenAI' });
    }
  }  