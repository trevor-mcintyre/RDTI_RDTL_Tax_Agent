export async function getAISuggestions(prompt) {
  try {
    const response = await fetch("/api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error("API response not ok");
    }

    const data = await response.json();
    return data.message || "⚠️ No suggestion returned.";
  } catch (err) {
    console.error("AI suggestion error:", err);
    return "⚠️ Unable to generate suggestion.";
  }
}