"use server";

// AI features have been removed per project configuration
export async function generateSummary(_jobTitle: string) {
  return { success: false, error: "AI features have been disabled." };
}

export async function generateExperienceDescription(_experienceInfo: string) {
  return { success: false, error: "AI features have been disabled." };
}

export async function generateEducationDescription(_educationInfo: string) {
  return { success: false, error: "AI features have been disabled." };
}

export async function generateSkills(_jobTitle: string) {
  return { success: false, data: [] };
}
