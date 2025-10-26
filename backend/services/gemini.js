import { GoogleGenerativeAI } from '@google/generative-ai';

const MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

function getClient() {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('Missing GOOGLE_GEMINI_API_KEY in env');
  return new GoogleGenerativeAI({ apiKey });
}

export async function buildProposalFromIdea({ idea }) {
  const genAI = getClient();
  const model = genAI.getGenerativeModel({ model: MODEL });

  const prompt = `You are an expert VC analyst and proposal writer. Based on the user's idea below, construct a concise, structured grant proposal.

User Idea:\n${idea}\n\n
Return ONLY a compact JSON object with the following fields:
{
  "title": string,
  "description": string,
  "amountSuggestion": number, // estimated recommended funding amount in USD or generic units
  "milestones": [ { "title": string, "description": string } ],
  "budget": [ { "item": string, "cost": number } ],
  "aiSummary": string,
  "aiScores": [ { "category": "Market Fit"|"Team Quality"|"Innovation"|"Scalability"|"Risk Level", "score": number } ],
  "recommendations": string
}`;

  const res = await model.generateContent(prompt);
  const text = res.response.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch (e) {
    const match = text.match(/\{[\s\S]*\}/);
    json = match ? JSON.parse(match[0]) : { title: '', description: idea, amountSuggestion: 0, aiSummary: text, aiScores: [] };
  }

  // Normalize scores
  const aiScores = (json.aiScores || []).map((s) => ({
    category: String(s.category || ''),
    score: Number(s.score || 0),
  }));

  return {
    title: json.title || '',
    description: json.description || idea,
    amountSuggestion: Number(json.amountSuggestion || 0),
    milestones: Array.isArray(json.milestones) ? json.milestones : [],
    budget: Array.isArray(json.budget) ? json.budget : [],
    aiSummary: json.aiSummary || '',
    aiScores,
    recommendations: json.recommendations || '',
  };
}

export async function analyzeProposal({ title, description, amount }) {
  const genAI = getClient();
  const model = genAI.getGenerativeModel({ model: MODEL });

  const prompt = `You are an expert VC analyst. Analyze the following grant proposal and return a concise JSON with fields: summary (string), recommendations (string), and scores (array of objects with category and score 0-100) for categories [Market Fit, Team Quality, Innovation, Scalability, Risk Level].

Title: ${title}
Amount requested: ${amount}
Description: ${description}

Return ONLY a compact JSON object, no extra text.`;

  const res = await model.generateContent(prompt);
  const text = res.response.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch (e) {
    // Fallback: try to extract JSON block
    const match = text.match(/\{[\s\S]*\}/);
    json = match ? JSON.parse(match[0]) : { summary: text, recommendations: '', scores: [] };
  }

  // Normalize scores
  const scores = (json.scores || []).map((s) => ({
    category: String(s.category || ''),
    score: Number(s.score || 0),
  }));

  return {
    summary: json.summary || '',
    recommendations: json.recommendations || '',
    scores,
  };
}
