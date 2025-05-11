export async function simulateClaimModule(moduleDescription, estimatedCost) {
  const prompt = `
You are an expert in R&D tax claims in New Zealand. A startup is considering whether a new development module is eligible for RDTI.

Evaluate the following proposed activity:
- Description: ${moduleDescription}
- Estimated Cost: \$${estimatedCost}

Provide:
1. A Classification: Core R&D / Supporting / Excluded
2. A brief justification (based on NZ IR1240 RDTI criteria)
3. A risk level (Low / Medium / High) for IRD audit concern

Respond as a structured summary.
`;

  try {
    const response = await fetch("/api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        model: "gpt-4",
        temperature: 0.4,
        max_tokens: 350,
      }),
    });

    if (!response.ok) {
      throw new Error("API response not ok");
    }

    const data = await response.json();
    return data.message || "⚠️ No summary returned.";
  } catch (err) {
    console.error("Simulation error:", err);
    return "⚠️ Unable to simulate RDTI classification.";
  }
}