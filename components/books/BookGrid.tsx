"use client"
import React, { useEffect, useState } from 'react'

type Book = {
  id: number
  title: string
  author: string
  genre: string
  description: string
  rating: number | null
  status: string
}

type BookGridProps = {
  refreshSignal?: number
}

const PAGE_SIZE = 9

export default function BookGrid({ refreshSignal = 0 }: BookGridProps) {
  const [books, setBooks] = useState<Book[]>([])
  const [search, setSearch] = useState('')
  const [genreFilter, setGenreFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [page, setPage] = useState(1)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    fetch('/api/books')
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => setBooks(data || []))
      .catch(() => setBooks([]))
  }, [refreshSignal])

  const genres = Array.from(new Set(books.map((b) => b.genre).filter(Boolean))).sort()
  const statuses = Array.from(new Set(books.map((b) => b.status).filter(Boolean))).sort()

  const normalizedSearch = search.trim().toLowerCase()
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      !normalizedSearch ||
      book.title.toLowerCase().includes(normalizedSearch) ||
      book.author.toLowerCase().includes(normalizedSearch) ||
      book.genre.toLowerCase().includes(normalizedSearch) ||
      book.description.toLowerCase().includes(normalizedSearch)

    const matchesGenre = !genreFilter || book.genre === genreFilter
    const matchesStatus = !statusFilter || book.status === statusFilter

    return matchesSearch && matchesGenre && matchesStatus
  })

  const pagedBooks = showAll
    ? filteredBooks
    : filteredBooks.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const totalPages = Math.max(1, Math.ceil(filteredBooks.length / PAGE_SIZE))

  return (
    <div>
      <div className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setPage(1)
          }}
          placeholder="Search title, author, genre..."
          className="w-full border rounded p-2"
        />
        <select
          value={genreFilter}
          onChange={(e) => {
            setGenreFilter(e.target.value)
            setPage(1)
          }}
          className="w-full border rounded p-2"
        >
          <option value="">All genres</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value)
            setPage(1)
          }}
          className="w-full border rounded p-2"
        >
          <option value="">All statuses</option>
          {statuses.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => setShowAll((current) => !current)}
          className="w-full rounded bg-blue-600 text-white px-3 py-2"
        >
          {showAll ? 'Show paged view' : 'Show all books'}
        </button>
      </div>

      <div className="mb-3 text-sm text-gray-600">
        Showing {pagedBooks.length} of {filteredBooks.length} book{filteredBooks.length === 1 ? '' : 's'}.
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {pagedBooks.map((b) => (
          <div key={b.id} className="p-4 border rounded bg-gray-50">
            <h3 className="font-semibold">{b.title}</h3>
            <p className="text-sm text-gray-600">{b.author} — {b.genre}</p>
            <p className="mt-2 text-sm text-gray-700">{b.description || 'No description available.'}</p>
            <p className="mt-2 text-sm text-gray-700 font-semibold">Rating: {b.rating ?? 'N/A'}</p>
            <p className="mt-2 text-sm text-gray-700 font-semibold">Status: {b.status}</p>
          </div>
        ))}
        {filteredBooks.length === 0 && (
          <div className="col-span-full text-center text-gray-500">No books match your filters.</div>
        )}
      </div>

      {!showAll && filteredBooks.length > PAGE_SIZE && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={page === 1}
              className="rounded border px-3 py-2 text-sm disabled:opacity-50"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
              disabled={page === totalPages}
              className="rounded border px-3 py-2 text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      <div className="mt-4 text-sm text-blue-700">
        <a href="#" onClick={(event) => { event.preventDefault(); setShowAll(true); }}>
          View all library entries
        </a>
      </div>
    </div>
  )
}
