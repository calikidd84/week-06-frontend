"use client"
import React from 'react'
import type { Recommendation } from '../../types/chat'

export default function RecommendationResults({ results }: { results: Recommendation[] }) {
  return (
    <div className="mt-3 grid grid-cols-1 gap-3">
      {results.slice(0, 5).map((r, i) => (
        <div key={i} className="p-3 border rounded bg-white">
          <div className="font-semibold">{r.title}</div>
          <div className="text-sm text-gray-600">{r.author} — <span className="italic">{r.source}</span></div>
          <div className="text-sm mt-1 text-gray-700">{r.description}</div>
        </div>
      ))}
    </div>
  )
}
