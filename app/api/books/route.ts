import { NextResponse } from 'next/server'
import { BACKEND_API_URL } from '../../../lib/backend'

export async function GET() {
  const res = await fetch(`${BACKEND_API_URL}/books`)
  const data = await res.json().catch(() => [])
  return NextResponse.json(data, { status: res.status })
}
