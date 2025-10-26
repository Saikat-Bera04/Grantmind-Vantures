import { NextResponse } from 'next/server'
import { getProposal } from '@/lib/mock-db'

export async function GET(_req: Request, ctx: { params: { id: string } }) {
  const id = ctx?.params?.id
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
  const item = getProposal(id)
  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ ok: true, proposal: item })
}
