import { GoogleGenerativeAI } from '@google/generative-ai';

const MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

function getClient() {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) return null; // be resilient: no throw, caller will fallback
  try {
    return new GoogleGenerativeAI({ apiKey });
  } catch {
    return null;
  }
}

function fallbackScores() {
  return [
    { category: 'Market Fit', score: 75 },
    { category: 'Team Quality', score: 70 },
    { category: 'Innovation', score: 80 },
    { category: 'Scalability', score: 72 },
    { category: 'Risk Level', score: 40 },
  ];
}

export async function buildProposalFromIdea({ idea }) {
  const client = getClient();
  if (!client) {
    // No API key: return basic structured output
    return {
      title: idea?.slice(0, 60) || 'Untitled Proposal',
      description: idea || '',
      amountSuggestion: 0,
      milestones: [],
      budget: [],
      aiSummary: 'AI service unavailable; using default summary.',
      aiScores: fallbackScores(),
      recommendations: 'Provide more details to enable thorough AI analysis.',
    };
  }

  try {
    const model = client.getGenerativeModel({ model: MODEL });
    const prompt = `You are an expert VC analyst and proposal writer. Based on the user's idea below, construct a concise, structured grant proposal.

User Idea:\n${idea}\n\n
Return ONLY a compact JSON object with the following fields:
{
  "title": string,
  "description": string,
  "amountSuggestion": number,
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
    const aiScores = (json.aiScores || []).map((s) => ({ category: String(s.category || ''), score: Number(s.score || 0) }));
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
  } catch {
    return {
      title: idea?.slice(0, 60) || 'Untitled Proposal',
      description: idea || '',
      amountSuggestion: 0,
      milestones: [],
      budget: [],
      aiSummary: 'AI analysis failed; using default summary.',
      aiScores: fallbackScores(),
      recommendations: 'Try again later or verify API configuration.',
    };
  }
}

export async function analyzeProposal({ title, description, amount }) {
  const client = getClient();
  if (!client) {
    return {
      summary: 'AI service unavailable; using default analysis.',
      recommendations: 'Provide more details to enable thorough AI analysis.',
      scores: fallbackScores(),
    };
  }

  try {
    const model = client.getGenerativeModel({ model: MODEL });
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
      const match = text.match(/\{[\s\S]*\}/);
      json = match ? JSON.parse(match[0]) : { summary: text, recommendations: '', scores: [] };
    }
    const scores = (json.scores || []).map((s) => ({ category: String(s.category || ''), score: Number(s.score || 0) }));
    return {
      summary: json.summary || '',
      recommendations: json.recommendations || '',
      scores,
    };
  } catch {
    return {
      summary: 'AI analysis failed; using default analysis.',
      recommendations: 'Try again later or verify API configuration.',
      scores: fallbackScores(),
    };
  }
}
