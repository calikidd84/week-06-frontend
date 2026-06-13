"use client"
import React, { useEffect, useRef } from 'react'
import type { ChatMessage } from '../../types/chat'
import RecommendationResults from '../books/RecommendationResults'

export default function MessageList({ messages }: { messages: ChatMessage[] }) {
  const endRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex flex-col gap-3 h-96 overflow-y-auto p-2">
      {messages.map((m) => (
        <div key={m.id} className={m.role === 'user' ? 'self-end text-right' : 'self-start text-left'}>
          <div className={m.role === 'user' ? 'inline-block bg-blue-500 text-white p-2 rounded' : 'inline-block bg-gray-100 p-2 rounded'}>
            {m.content}
          </div>
          {m.recommendations && m.recommendations.length > 0 && (
            <RecommendationResults results={m.recommendations} />
          )}
        </div>
      ))}
      <div ref={endRef} />
    </div>
  )
}
