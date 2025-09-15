import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize client with your API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

export const generateSummaryFromGemini = async (pdfText: string) => {
  try {
    // Load model
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1500,
      },
    });

    const prompt = {
      contents: [
        {
          role: "user",
          parts: [
            { text: SUMMARY_SYSTEM_PROMPT },
            {
              text: `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`,
            },
          ],
        },
      ],
    };
    // Generate content
    const result = await model.generateContent(prompt);

    // Extract text
    const response = await result.response;

    if (!response.text) {
      throw new Error("Empty response from gemini api");
    }

    return response.text();
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
