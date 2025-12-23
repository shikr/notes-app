import type { Route } from './+types/home'
import type { Note } from './components/note'
import { NoteCollection } from './components/note-collection'

let notes: Note[] = [
  {
    id: '1',
    title: 'First Note',
    content: 'This is the content of the first note.',
    user: { id: 'u1', name: 'Alice' }
  },
  {
    id: '2',
    title: 'Second Note',
    content: 'This is the content of the second note.',
    user: { id: 'u2', name: 'Bob' }
  },
  {
    id: '3',
    title: 'Third Note',
    content: 'This is the content of the third note.',
    user: { id: 'u3', name: 'Charlie' }
  },
  {
    id: '4',
    title: 'Fourth Note',
    content: 'This is the content of the fourth note.',
    user: { id: 'u4', name: 'Diana' }
  },
  {
    id: '5',
    title: 'Fifth Note',
    content: 'This is the content of the fifth note.',
    user: { id: 'u5', name: 'Ethan' }
  },
  {
    id: '6',
    title: 'Sixth Note',
    content: 'This is the content of the sixth note.',
    user: { id: 'u6', name: 'Fiona' }
  },
  {
    id: '7',
    title: 'Seventh Note',
    content: 'This is the content of the seventh note.',
    user: { id: 'u7', name: 'George' }
  },
  {
    id: '8',
    title: 'Eighth Note',
    content: 'This is the content of the eighth note.',
    user: { id: 'u8', name: 'Hannah' }
  }
]

// biome-ignore lint/correctness/noEmptyPattern: Meta function example
export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' }
  ]
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData()
  const id = formData.get('id')

  // Simple deletion logic for demonstration
  notes = notes.filter((note) => note.id !== id)
}

export function loader(_: Route.LoaderArgs) {
  return {
    notes
  }
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return <NoteCollection notes={loaderData.notes} />
}
