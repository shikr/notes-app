import { useFetcher } from 'react-router'
import { Button } from '~/common/components/button'
import type { User } from '~/routes/app-layout'

export interface Note {
  id: string
  title: string
  content: string
  user: User
}

export interface NoteProps {
  note: Note
}

export default function Note({ note }: NoteProps) {
  const fetcher = useFetcher()

  return (
    <div className="border border-gray-700 p-4 rounded-xl space-y-2">
      <h2 className="text-xl font-semibold">{note.title}</h2>
      <p className="text-gray-700">{note.content}</p>
      <p className="text-sm text-gray-500">By: {note.user.name}</p>
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
    </div>
  )
}
