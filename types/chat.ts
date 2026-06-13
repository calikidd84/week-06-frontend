export type ChatRoute = "ai/chat" | "ai/recommend" | "ai/agent"

export type Recommendation = {
  title: string
  author: string
  description: string
  source: 'database' | 'web'
}

export type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  routeUsed?: ChatRoute
  recommendations?: Recommendation[]
}
