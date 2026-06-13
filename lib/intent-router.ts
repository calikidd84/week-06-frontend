export type ChatRoute = "ai/chat" | "ai/recommend" | "ai/agent"

const recommendPatterns = [
  "recommend",
  "suggest",
  "what should i read",
  "books like",
  "genre",
  "similar to",
]

const agentPatterns = [
  "compare",
  "analyze",
  "research",
  "find and explain",
  "best options",
  "look up",
  "add",
  "library",
  "want to read",
  "want_to_read",
  "manga",
  "book",
  "reading list",
  "add to",
  "add the",
  "insert",
]

export function chooseRoute(input: string): ChatRoute {
  const text = input.toLowerCase()
  if (recommendPatterns.some((p) => text.includes(p))) return 'ai/recommend'
  if (agentPatterns.some((p) => text.includes(p))) return 'ai/agent'
  return 'ai/chat'
}
