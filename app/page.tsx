"use client"

import { useState } from 'react'
import BookGrid from '../components/books/BookGrid'
import ChatPanel from '../components/chat/ChatPanel'

export default function Page() {
  const [libraryVersion, setLibraryVersion] = useState(0)

  return (
    <main className="min-h-screen p-6 bg-blue-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 bg-white rounded shadow p-4">
          <h2 className="text-2xl font-semibold mb-4">Library</h2>
          <BookGrid refreshSignal={libraryVersion} />
        </section>

        <aside className="bg-white rounded shadow p-4">
          <h2 className="text-2xl font-semibold mb-4">AI Assistant</h2>
          <ChatPanel onLibraryUpdate={() => setLibraryVersion((current) => current + 1)} />
        </aside>
      </div>
    </main>
  )
}