// server/gemini.ts — Gemini AI integration for lesson plans and curriculum generation
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || "";

export function isGeminiConfigured(): boolean {
  return !!apiKey;
}

async function getGeminiModel() {
  if (!isGeminiConfigured()) {
    throw new Error("GEMINI_API_KEY is not set");
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
}

/**
 * Generate a lesson plan for a specific grade + subject.
 */
export async function generateLessonPlan(
  gradeLevel: number,
  subject: string,
  topic?: string,
): Promise<string> {
  const model = await getGeminiModel();
  const prompt = `You are an expert K-8 curriculum designer. Create a detailed lesson plan for grade ${gradeLevel} ${subject}${
    topic ? ` focusing on: ${topic}` : ""
  }. Include: learning objectives, materials needed, step-by-step procedure, assessment ideas, and differentiation notes. Keep it practical and age-appropriate. Use clear markdown formatting.`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}

/**
 * Generate a quarter-long curriculum plan for a student.
 */
export async function generateCurriculum(
  gradeLevel: number,
  subject: string,
  quarter: number,
  status: string,
): Promise<{ topics: string[]; content: string }> {
  const model = await getGeminiModel();
  const prompt = `You are an expert K-8 curriculum designer. Create a ${subject} curriculum for a grade ${gradeLevel} student for quarter ${quarter}. The student is currently ${status} in this subject. Include 6-8 specific weekly topics with a brief description of each. Format as a JSON object with keys "topics" (array of strings) and "content" (markdown string with the full plan).`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  try {
    return JSON.parse(text);
  } catch {
    return { topics: [], content: text };
  }
}
