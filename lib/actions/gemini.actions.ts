"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// Lightweight, free-tier optimized model configuration (consumes minimal tokens)
const getGenerativeModel = () => {
  return genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      temperature: 0.7,
      topP: 0.9,
      maxOutputTokens: 800, // Keeps token usage low so free tier quota is preserved
      responseMimeType: "application/json",
    },
  });
};

async function askGemini(prompt: string): Promise<string> {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured in environment variables.");
  }

  const model = getGenerativeModel();
  const result = await model.generateContent(prompt);
  let text = result.response.text().trim();

  // Strip code block fences if returned
  if (text.startsWith("```json")) {
    text = text.replace(/^```json\s*/, "").replace(/\s*```$/, "");
  } else if (text.startsWith("```")) {
    text = text.replace(/^```\s*/, "").replace(/\s*```$/, "");
  }

  return text;
}

export async function generateSummary(jobTitle: string) {
  try {
    const prompt = jobTitle && jobTitle.trim() !== ""
      ? `Given the job title '${jobTitle.trim()}', provide professional resume summaries for three experience levels: Fresher / Entry Level, Mid Level, and Senior Level. Each summary should be 3-4 impactful sentences. Return ONLY a JSON array of objects with keys: "experience_level" (string) and "summary" (string).`
      : `Provide three general professional resume summaries for: Entry Level, Mid Level, and Experienced Professional. Each summary should be 3-4 impactful sentences highlighting adaptability and communication. Return ONLY a JSON array of objects with keys: "experience_level" (string) and "summary" (string).`;

    const result = await askGemini(prompt);
    const parsed = JSON.parse(result);
    return { success: true, data: Array.isArray(parsed) ? parsed : [parsed] };
  } catch (error: any) {
    console.error("Gemini generateSummary error:", error?.message);
    return { success: false, error: error?.message || "Failed to generate AI summary." };
  }
}

export async function generateExperienceDescription(experienceInfo: string) {
  try {
    const prompt = `Given that I have experience working as '${experienceInfo.trim()}', generate 3 different sets of high-impact, ATS-optimized bullet points for a resume work summary:
1. High Impact / Achievements (metrics and results driven)
2. Technical / Execution Focused (technologies, core duties)
3. Balanced / General Professional (responsibilities and teamwork)

Each description MUST be formatted as a valid HTML unordered list: "<ul><li>...</li><li>...</li><li>...</li></ul>" with 3-4 concise bullet points using action verbs.
Return ONLY a JSON array of objects with keys: "activity_level" (string: "High Impact" | "Technical Focus" | "Balanced") and "description" (HTML string with <ul> and <li> tags).`;

    const result = await askGemini(prompt);
    const parsed = JSON.parse(result);
    return { success: true, data: Array.isArray(parsed) ? parsed : [parsed] };
  } catch (error: any) {
    console.error("Gemini generateExperienceDescription error:", error?.message);
    return { success: false, error: error?.message || "Failed to generate AI experience description." };
  }
}

export async function generateEducationDescription(educationInfo: string) {
  try {
    const prompt = `Based on education info: '${educationInfo.trim()}', generate 3 brief educational highlights/coursework descriptions suitable for a resume (e.g. Academic Honors & Projects, Core Coursework, or Practical Labs). Each should be 2-3 concise sentences or bullet items.
Return ONLY a JSON array of objects with keys: "level" (string) and "description" (string).`;

    const result = await askGemini(prompt);
    const parsed = JSON.parse(result);
    return { success: true, data: Array.isArray(parsed) ? parsed : [parsed] };
  } catch (error: any) {
    console.error("Gemini generateEducationDescription error:", error?.message);
    return { success: false, error: error?.message || "Failed to generate AI education highlights." };
  }
}

export async function generateSkills(jobTitle: string) {
  try {
    const prompt = `Given the job role '${jobTitle.trim() || "Software Professional"}', list the top 8-10 most relevant, in-demand technical and professional skills for a modern resume.
Return ONLY a JSON array of skill name strings. Example: ["Skill 1", "Skill 2", "Skill 3"]`;

    const result = await askGemini(prompt);
    const parsed = JSON.parse(result);
    return { success: true, data: Array.isArray(parsed) ? parsed : [] };
  } catch (error: any) {
    console.error("Gemini generateSkills error:", error?.message);
    return { success: false, error: error?.message || "Failed to generate AI skills." };
  }
}
