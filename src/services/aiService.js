// src/services/aiService.js
// Handles all communication with Google Gemini API

import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.error("⚠️  VITE_GEMINI_API_KEY is not set in your .env file");
}

const genAI = new GoogleGenerativeAI(API_KEY);

/**
 * Get AI-powered product recommendations from Gemini
 * @param {string} userPreference - Natural language preference from the user
 * @param {Array} productList - Full product catalog
 * @returns {{ recommendedIds: number[], explanation: string }}
 */
export async function getRecommendations(userPreference, productList) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Build a compact product summary to pass in the prompt
  const productSummary = productList
    .map(
      (p) =>
        `ID:${p.id} | ${p.name} | ${p.category} | $${p.price} | Rating:${p.rating} | Tags:[${p.tags.join(", ")}] | "${p.description}"`
    )
    .join("\n");

  const systemPrompt = `You are a helpful product recommendation assistant for an online electronics store.

Here is the complete product catalog:
${productSummary}

The user's preference is: "${userPreference}"

Your job:
1. Analyze the user's preference carefully (consider price, category, features, use-case, brand).
2. Select the most relevant products from the catalog (1-5 products max).
3. Return ONLY a valid JSON object in this exact format — no markdown, no extra text:

{
  "recommendedIds": [list of product IDs as numbers],
  "explanation": "A short 2-3 sentence explanation of why these products match the user's needs"
}

Rules:
- Only include IDs that exist in the catalog.
- If no products match, return { "recommendedIds": [], "explanation": "No matching products found. Try different criteria." }
- Do NOT wrap response in markdown code blocks.`;

  try {
    const result = await model.generateContent(systemPrompt);
    const text = result.response.text().trim();

    // Strip markdown code fences if Gemini adds them anyway
    const cleaned = text.replace(/```json|```/g, "").trim();

    const parsed = JSON.parse(cleaned);

    return {
      recommendedIds: parsed.recommendedIds || [],
      explanation: parsed.explanation || "Here are some products you might like.",
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error(
      error.message?.includes("API_KEY_INVALID")
        ? "Invalid API key. Please check your .env file."
        : "Failed to get recommendations. Please try again."
    );
  }
}
