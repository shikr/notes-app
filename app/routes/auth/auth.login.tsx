import { eq } from 'drizzle-orm'
import { Link, redirect } from 'react-router'
import { database } from '~/database/context'
import { users } from '~/database/schema'
import type { Route } from './+types/auth.login'
import { AuthForm } from './components/auth-form'
import { createUserSession, verifyPassword } from './services/auth.server'

export function meta(_: Route.MetaArgs) {
  return [
    { title: 'Login - New React Router App' },
    { name: 'description', content: 'Login to access your account.' }
  ]
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData()
  const username = formData.get('user')
  const password = formData.get('password')

  if (
    typeof username !== 'string' ||
    typeof password !== 'string' ||
    !username.trim() ||
    !password.trim()
  ) {
    return { loginError: 'Username and password are required' }
  }

  const db = database()

  const [user] = await db.select().from(users).where(eq(users.name, username)).limit(1)

  if (user === undefined || !(await verifyPassword(password, user.password)))
    return {
      loginError: 'Invalid username or password'
    }

  const { accessToken, refreshToken } = await createUserSession(db, user.id)
  const headers = new Headers()
  headers.append('Set-Cookie', accessToken)
  headers.append('Set-Cookie', refreshToken)

  return redirect('/', { headers })
}

export default function Login({ actionData }: Route.ComponentProps) {
  return (
    <div className="p-6 space-y-4">
      <h2 className="font-bold text-xl">Login</h2>
      {actionData?.loginError !== undefined && (
        <div className="mx-4 p-2 bg-red-600/40 ring-1 ring-red-600/80 rounded-md">
          {actionData.loginError}
        </div>
      )}
      <AuthForm label="Login" />
      <div className="space-x-1">
        <span>Don't have an account?</span>
        <Link to="/register" className="text-sm text-indigo-400 hover:underline">
          Register
        </Link>
      </div>
    </div>
  )
}
