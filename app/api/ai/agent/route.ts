import { NextResponse } from 'next/server'
import { BACKEND_API_URL } from '../../../../lib/backend'

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  const res = await fetch(`${BACKEND_API_URL}/ai/agent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json().catch(() => ({}))
  return NextResponse.json(data, { status: res.status })
}
