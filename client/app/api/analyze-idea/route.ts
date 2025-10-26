import { NextResponse } from 'next/server'

// Route: POST /api/analyze-idea
// Body: { idea: string }
// Uses server-side env GOOGLE_GEMINI_API_KEY to call Gemini's REST API.
export async function POST(req: Request) {
  try {
    const { idea } = await req.json()
    if (!idea || typeof idea !== 'string' || idea.trim().length < 10) {
      return NextResponse.json({ ok: false, error: 'Idea must be a non-empty string of at least 10 characters.' }, { status: 400 })
    }

    const apiKey = process.env.GOOGLE_GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ ok: false, error: 'Server misconfigured: GOOGLE_GEMINI_API_KEY is not set.' }, { status: 500 })
    }

    // Minimal prompt to validate/summarize idea and propose scores
    const prompt = `You are an assistant that validates and summarizes startup ideas.
Return a compact JSON with keys: title, description, aiSummary, aiScores (array of {category, score 0-100}), and amountSuggestion (number).
Be concise and do not include markdown or code fences. Idea: ${idea}`

    const resp = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + encodeURIComponent(apiKey),
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    )

    if (!resp.ok) {
      const text = await resp.text()
      return NextResponse.json({ ok: false, error: `Gemini API error: ${text}` }, { status: 502 })
    }

    const data = await resp.json()
    const candidateText: string | undefined = data?.candidates?.[0]?.content?.parts?.[0]?.text

    if (!candidateText) {
      return NextResponse.json({ ok: false, error: 'No content returned from Gemini.' }, { status: 502 })
    }

    // Try to parse JSON directly; if it fails, best-effort fallback
    let parsed: any
    try {
      parsed = JSON.parse(candidateText)
    } catch {
      // Fallback: create a minimal structure
      parsed = {
        title: candidateText.slice(0, 80),
        description: idea,
        aiSummary: candidateText,
        aiScores: [
          { category: 'Innovation', score: 75 },
          { category: 'Feasibility', score: 70 },
          { category: 'Impact', score: 72 },
        ],
        amountSuggestion: 0,
      }
    }

    const proposal = {
      title: String(parsed.title || 'Untitled Idea'),
      description: String(parsed.description || idea),
      aiSummary: String(parsed.aiSummary || ''),
      aiScores: Array.isArray(parsed.aiScores) ? parsed.aiScores : [],
      amountSuggestion: Number(parsed.amountSuggestion ?? 0),
    }

    return NextResponse.json({ ok: true, proposal })
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || 'Unexpected error' }, { status: 500 })
  }
}
