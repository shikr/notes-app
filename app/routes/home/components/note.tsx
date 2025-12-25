import { useFetcher, useRouteLoaderData } from 'react-router'
import { Button } from '~/common/components/button'
import type { Note, User } from '~/database/schema'

export interface NoteProps {
  note: Note
}

export default function NoteItem({ note }: NoteProps) {
  const fetcher = useFetcher()
  const { user } = useRouteLoaderData<{ user: User | null }>('routes/app-layout') ?? {
    user: null
  }

  const deletable = user !== null && user.id === note.author.id

  return (
    <div className="border border-gray-700 p-4 rounded-xl space-y-2">
      <h2 className="text-xl font-semibold">{note.title}</h2>
      <p className="text-gray-700">{note.content}</p>
      <p className="text-sm text-gray-500">By: {note.author.name}</p>
      {deletable && (
        <div className="flex justify-end">
          <Button
            role="button"
            isLoading={fetcher.state === 'submitting'}
            aria-label="delete"
            spinnerSize="sm"
            color="danger"
            radius="md"
            onClick={() => fetcher.submit({ id: note.id }, { method: 'post' })}
          >
            Delete Note
          </Button>
        </div>
      )}
    </div>
  )
}
