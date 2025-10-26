import { NextResponse } from 'next/server'
import { addProposal, listProposals } from '@/lib/mock-db'

function fallbackScores() {
  return [
    { category: 'Market Fit', score: 75 },
    { category: 'Team Quality', score: 70 },
    { category: 'Innovation', score: 80 },
    { category: 'Scalability', score: 72 },
    { category: 'Risk Level', score: 40 },
  ]
}

async function analyzeWithGemini(title: string, description: string, amount: number) {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY
  if (!apiKey) {
    return {
      summary: 'AI service unavailable; using default analysis.',
      scores: fallbackScores(),
    }
  }
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`
    const prompt = `You are an expert VC analyst. Analyze the following grant proposal and return a concise JSON with fields: summary (string) and scores (array of objects with category and score 0-100) for categories [Market Fit, Team Quality, Innovation, Scalability, Risk Level].\n\nTitle: ${title}\nAmount requested: ${amount}\nDescription: ${description}\n\nReturn ONLY a compact JSON object, no extra text.`
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: prompt },
            ]
          }
        ]
      })
    })
    const data = await resp.json()
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || ''
    let json
    try {
      json = JSON.parse(text)
    } catch {
      const match = text.match(/\{[\s\S]*\}/)
      json = match ? JSON.parse(match[0]) : { summary: text, scores: [] }
    }
    const scores = (json.scores || []).map((s: any) => ({ category: String(s.category || ''), score: Number(s.score || 0) }))
    return { summary: json.summary || '', scores }
  } catch {
    return { summary: 'AI analysis failed; using default analysis.', scores: fallbackScores() }
  }
}

export async function POST(req: Request) {
  try {
    const form = await req.formData()
    const title = String(form.get('title') || '')
    const description = String(form.get('description') || '')
    const amount = Number(form.get('amount') || 0)
    const walletAddress = String(form.get('walletAddress') || '')
    // Optional file
    const file = form.get('file') as File | null

    if (!title || !description || isNaN(amount)) {
      return NextResponse.json({ error: 'title, description, and valid amount are required' }, { status: 400 })
    }

    const ai = await analyzeWithGemini(title, description, amount)

    const id = (globalThis.crypto && 'randomUUID' in globalThis.crypto) ? (globalThis.crypto as any).randomUUID() : Math.random().toString(36).slice(2)

    const doc: any = {
      _id: id,
      title,
      description,
      amount,
      walletAddress,
      aiSummary: ai.summary,
      aiScores: ai.scores,
      status: 'submitted',
      createdAt: new Date().toISOString(),
      // We won't persist the file here; keeping it local-only for prototype.
      hasFile: !!file,
    }

    addProposal(doc)

    return NextResponse.json({ ok: true, proposal: doc }, { status: 201 })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Failed to create proposal' }, { status: 500 })
  }
}

export async function GET(req: Request) {
  // simple pagination
  const { searchParams } = new URL(req.url)
  const page = Number(searchParams.get('page') || 1)
  const limit = Number(searchParams.get('limit') || 10)
  const { items, total } = listProposals(page, limit)
  return NextResponse.json({ ok: true, items, page, total })
}
