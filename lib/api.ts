import type { ChatRoute } from './intent-router'
import type { Recommendation } from '../types/chat'

type ChatRequest = {
  message: string
  history: { role: 'user' | 'assistant'; content: string }[]
  preferDatabase?: boolean
  maxResults?: number
}

export async function apiSend(route: ChatRoute, payload: ChatRequest): Promise<{ content?: string; text?: string; reply?: string; response?: string; recommendations?: Recommendation[] }> {
  const res = await fetch(`/api/${route}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error('Network error')
  return res.json()
}
