"use client"
import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'
import type { ChatMessage } from '../../types/chat'
import MessageList from './MessageList'
import useChatStore from '../../store/chatStore'
import { chooseRoute } from '../../lib/intent-router'
import { apiSend } from '../../lib/api'

type ChatPanelProps = {
  onLibraryUpdate?: () => void
}

export default function ChatPanel({ onLibraryUpdate }: ChatPanelProps) {
  const { messages, addMessage, setMessageRoute } = useChatStore()
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSend() {
    if (!input.trim()) return
    const id = uuid()
    const userMsg: ChatMessage = {
      id,
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
    }
    addMessage(userMsg)

    const history = [...messages, userMsg].map((m) => ({ role: m.role, content: m.content }))
    const route = chooseRoute(input)
    setLoading(true)
    try {
      const res = await apiSend(route, {
        message: input,
        history,
        preferDatabase: route === 'ai/recommend',
        maxResults: 5,
      })
      const assistant: ChatMessage = {
        id: uuid(),
        role: 'assistant',
        content: res.content || res.text || res.reply || res.response || 'No response',
        timestamp: new Date().toISOString(),
        routeUsed: route,
        recommendations: res.recommendations,
      }
      addMessage(assistant)

      if (route === 'ai/agent' && onLibraryUpdate) {
        onLibraryUpdate()
      }
    } catch (err) {
      addMessage({
        id: uuid(),
        role: 'assistant',
        content: 'Error: could not reach backend',
        timestamp: new Date().toISOString(),
      })
    } finally {
      setLoading(false)
      setInput('')
    }
  }

  return (
    <div className="flex flex-col">
      <MessageList messages={messages} />

      <div className="mt-3 flex gap-2">
        <textarea
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            e.target.style.height = "auto";
            e.target.style.height = `${Math.min(e.target.scrollHeight, 160)}px`;
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Ask for recommendations or chat..."
          rows={1}
          className="flex-1 border rounded px-3 py-2 resize-none overflow-y-auto min-h-[42px] max-h-40"
        />
        <button onClick={handleSend} disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">{loading ? '...' : 'Send'}</button>
      </div>
    </div>
  )
}
