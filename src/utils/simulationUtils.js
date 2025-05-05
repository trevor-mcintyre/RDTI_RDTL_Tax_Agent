import { OpenAIApi, Configuration } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function simulateClaimModule(moduleDescription, estimatedCost) {
  const prompt = \`
You are an expert in R&D tax claims in New Zealand. A startup is considering whether a new development module is eligible for RDTI.

Evaluate the following proposed activity:
- Description: \${moduleDescription}
- Estimated Cost: \$\${estimatedCost}

Provide:
1. A classification: Core R&D / Supporting / Excluded
2. A brief justification (based on NZ IR1240 RDTI criteria)
3. A risk level (Low / Medium / High) for IRD audit concern

Respond as a structured summary.\`;

  const response = await openai.createCompletion({
    model: 'gpt-4',
    prompt,
    max_tokens: 350,
    temperature: 0.4,
  });

  return response.data.choices[0].text.trim();
}