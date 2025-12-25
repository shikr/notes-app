import { Form, redirect } from 'react-router'
import { Button } from '~/common/components/button'
import { Input } from '~/common/components/input'
import { userContext } from '~/context'
import type { Route } from './+types/note.create'

export const handle = {
  modal: true,
  header: <h2 className="text-xl font-bold">Create New Note</h2>
}

export function action(_: Route.ActionArgs) {
  // Placeholder for future note creation logic
  return redirect('/')
}

export default function CreateNote(_: Route.ComponentProps) {
  return (
    <Form method="post" className="flex flex-col gap-4 mt-2">
      <div className="flex flex-col gap-2">
        <Input placeholder="Title" name="title" aria-label="title" required />
        <textarea
          placeholder="Content"
          name="content"
          aria-label="content"
          required
          className="px-3 py-2 resize-none field-sizing-content rounded-md bg-indigo-900/60 ring-indigo-500 outline-none focus:ring-2 transition-all"
        />
      </div>
      <Button type="submit" radius="md" className="self-end px-2">
        Create Note
      </Button>
    </Form>
  )
}

export function loader({ context }: Route.LoaderArgs) {
  const user = context.get(userContext)
  if (user === null) return redirect('/login')
  return null
}
