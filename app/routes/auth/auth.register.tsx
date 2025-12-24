import { Link, redirect } from 'react-router'
import { database } from '~/database/context'
import { users } from '~/database/schema'
import type { Route } from './+types/auth.register'
import { AuthForm } from './components/auth-form'
import { createUserSession, hashPassword } from './services/auth.server'

export function meta(_: Route.MetaArgs) {
  return [
    { title: 'Register - New React Router App' },
    { name: 'description', content: 'Register to create a new account.' }
  ]
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData()
  const name = formData.get('user')
  const password = formData.get('password')

  if (
    typeof name !== 'string' ||
    typeof password !== 'string' ||
    !name.trim() ||
    !password.trim()
  ) {
    return { registerError: 'Username and password are required' }
  }

  const db = database()

  try {
    const [{ userId }] = await db
      .insert(users)
      .values({ name, password: await hashPassword(password) })
      .returning({ userId: users.id })

    const { accessToken, refreshToken } = await createUserSession(db, userId)
    const headers = new Headers()
    headers.append('Set-Cookie', accessToken)
    headers.append('Set-Cookie', refreshToken)

    return redirect('/', { headers })
  } catch {
    return { registerError: 'User registration failed' }
  }
}

export function loader(_: Route.LoaderArgs) {
  // TODO: Validate if user is logged in
  return null
}

export default function Register(_: Route.ComponentProps) {
  return (
    <div className="p-6 space-y-4">
      <h2 className="font-bold text-xl">Register</h2>
      <AuthForm label="Register" />
      <div className="space-x-1">
        <span>Already have an account?</span>
        <Link to="/login" className="text-sm text-indigo-400 hover:underline">
          Log in
        </Link>
      </div>
    </div>
  )
}
