import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { OpenAIApi, Configuration } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function askClaimQuestion(companyId, question) {
  const db = getFirestore();
  const snapshot = await getDocs(collection(db, `companies/${companyId}/activities`));
  const dataPoints = [];

  snapshot.forEach(doc => {
    const data = doc.data();
    dataPoints.push(\`Activity: \${data.description}\nCost: \${data.cost}\nType: \${data.type}\nSTUs: \${(data.stuTags || []).join(', ')}\n\n\`);
  });

  const prompt = \`You are an expert R&D tax assistant. Based on the following claim data, answer the user's question.\n\n\${dataPoints.join('')}\n\nUser Question: \${question}\nAnswer:\`;

  const response = await openai.createCompletion({
    model: 'gpt-4',
    prompt: prompt,
    max_tokens: 300,
    temperature: 0.3,
  });

  return response.data.choices[0].text.trim();
}