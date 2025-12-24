import { Link, useRouteLoaderData } from 'react-router'
import { Button } from '~/common/components/button'
import type { User } from '~/routes/app-layout'
import NoteItem, { type Note } from './note'

export interface NoteInventoryProps {
  notes: Note[]
}

export function NoteCollection({ notes }: NoteInventoryProps) {
  const data = useRouteLoaderData<{ user: User | null }>('routes/app-layout')

  return (
    <section className="flex flex-col items-center justify-center pt-8 pb-4 px-16 gap-4">
      <header className="flex items-center justify-between w-full">
        <h1 className="text-2xl font-bold">Notes</h1>
        {(data?.user ?? null) !== null && (
          <Button as={Link} to="/note" radius="md" className="px-2">
            New note
          </Button>
        )}
      </header>
      {notes.length === 0 ? (
        <p className="text-gray-500 text-xl">No notes available.</p>
      ) : (
        <div className="grid grid-cols-4 gap-4 w-full">
          {notes.map((note) => (
            <NoteItem key={note.id} note={note} />
          ))}
        </div>
      )}
    </section>
  )
}
