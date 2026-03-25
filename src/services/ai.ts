import OpenAI from "openai";
import type { GeneratedIdea, GeneratedPlan, GeneratedSubmission } from "@/types";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateIdeas(params: {
  theme: string;
  sponsorApis: string[];
  teamSkills: string[];
  teamSize: number;
  durationHours: number;
}): Promise<GeneratedIdea[]> {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `You are a hackathon idea generator. Generate 3 project ideas as JSON.
Return: { "ideas": [{ "title", "description", "techStack": string[], "feasibilityScore": 0-100, "estimatedHours": number, "features": string[] }] }
Consider team skills, available APIs, time constraints, and hackathon theme.
Prioritize ideas that are impressive but achievable within the time limit.`,
      },
      {
        role: "user",
        content: `Theme: ${params.theme}
Sponsor APIs: ${params.sponsorApis.join(", ") || "None specified"}
Team skills: ${params.teamSkills.join(", ")}
Team size: ${params.teamSize}
Duration: ${params.durationHours} hours`,
      },
    ],
  });

  const content = response.choices[0].message.content;
  if (!content) throw new Error("No response from AI");
  const parsed = JSON.parse(content);
  return parsed.ideas;
}

export async function generatePlan(params: {
  ideaTitle: string;
  ideaDescription: string;
  techStack: string[];
  teamMembers: { name: string; skills: string[] }[];
  durationHours: number;
}): Promise<GeneratedPlan> {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `You are a hackathon project planner. Create a detailed plan as JSON.
Return: { "milestones": [{ "title", "deadline": "ISO string offset from start", "tasks": [{ "title", "description", "estimatedHours", "priority": 1-5, "tags": string[], "suggestedAssignee": "member name" }] }], "scopeCuts": string[] }
Plan should include setup, core features, polish, demo prep, and submission phases.
Assign tasks based on team member skills. Include scope cut suggestions for if time runs short.`,
      },
      {
        role: "user",
        content: `Idea: ${params.ideaTitle}
Description: ${params.ideaDescription}
Tech stack: ${params.techStack.join(", ")}
Team: ${params.teamMembers.map((m) => `${m.name} (${m.skills.join(", ")})`).join("; ")}
Duration: ${params.durationHours} hours`,
      },
    ],
  });

  const content = response.choices[0].message.content;
  if (!content) throw new Error("No response from AI");
  return JSON.parse(content);
}

export async function generateSubmissionContent(params: {
  ideaTitle: string;
  ideaDescription: string;
  techStack: string[];
  features: string[];
  completedTasks: string[];
}): Promise<GeneratedSubmission> {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `You are a hackathon submission writer. Generate submission materials as JSON.
Return: { "readme": "full markdown README", "devpost": "Devpost description with sections", "pitchScript": "60 second pitch script", "slideOutline": ["slide 1 content", "slide 2 content", ...] }
Make the content compelling for judges. Highlight technical complexity and impact.`,
      },
      {
        role: "user",
        content: `Project: ${params.ideaTitle}
Description: ${params.ideaDescription}
Tech stack: ${params.techStack.join(", ")}
Features built: ${params.features.join(", ")}
Completed work: ${params.completedTasks.join(", ")}`,
      },
    ],
  });

  const content = response.choices[0].message.content;
  if (!content) throw new Error("No response from AI");
  return JSON.parse(content);
}
