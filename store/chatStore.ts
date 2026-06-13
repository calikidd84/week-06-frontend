import create from 'zustand'
import type { ChatMessage, ChatRoute } from '../types/chat'

type ChatState = {
  messages: ChatMessage[]
  addMessage: (m: ChatMessage) => void
  setMessageRoute: (id: string, route: ChatRoute) => void
  clear: () => void
}

const useChatStore = create<ChatState>((set) => ({
  messages: [],
  addMessage: (m) => set((s) => ({ messages: [...s.messages, m] })),
  setMessageRoute: (id, route) =>
    set((s) => ({
      messages: s.messages.map((m) =>
        m.id === id ? { ...m, routeUsed: route } : m
      ),
    })),
  clear: () => set({ messages: [] }),
}))

export default useChatStore
