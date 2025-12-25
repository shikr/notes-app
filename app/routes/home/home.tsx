import { eq } from 'drizzle-orm'
import { data, type UIMatch, useMatches, useNavigate, useOutlet } from 'react-router'
import { Modal } from '~/common/components/modal'
import { userContext } from '~/context'
import { database } from '~/database/context'
import { notes } from '~/database/schema'
import type { Route } from './+types/home'
import { NoteCollection } from './components/note-collection'

// biome-ignore lint/correctness/noEmptyPattern: Meta function example
export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' }
  ]
}

export async function action({ request, context }: Route.ActionArgs) {
  const formData = await request.formData()
  const id = formData.get('id')
  const user = context.get(userContext)

  if (user === null) return data({ error: 'User not authenticated.' }, { status: 401 })

  if (typeof id === 'string') {
    const db = database()
    const { userId } = (await db.query.notes.findFirst({
      columns: {
        userId: true
      },
      where: eq(notes.id, id)
    })) ?? { userId: null }

    if (userId === user.id) {
      await db.delete(notes).where(eq(notes.id, id))
      return { ok: true }
    }

    return data({ error: 'You are not authorized to delete this note.' }, { status: 403 })
  }

  return data({ error: 'Invalid form data.' }, { status: 400 })
}

export async function loader(_: Route.LoaderArgs) {
  const notesList = await database().query.notes.findMany({
    columns: {
      userId: false
    },
    with: {
      author: true
    }
  })

  return {
    notes: notesList
  }
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const outlet = useOutlet()
  const navigate = useNavigate()
  const matches = useMatches() as UIMatch<
    unknown,
    { modal?: boolean; header?: React.ReactNode }
  >[]

  const match = matches.find((match) => match.handle?.modal ?? false)

  return (
    <>
      <NoteCollection notes={loaderData.notes} />
      <Modal
        isOpen={match !== undefined}
        onClose={() => navigate('/', { replace: true, viewTransition: false })}
        header={match?.handle?.header}
      >
        {outlet}
      </Modal>
    </>
  )
}
