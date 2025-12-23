import { Link, redirect } from 'react-router'
import type { Route } from './+types/auth.login'
import { AuthForm } from './components/auth-form'

export function meta(_: Route.MetaArgs) {
  return [
    { title: 'Login - New React Router App' },
    { name: 'description', content: 'Login to access your account.' }
  ]
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData()
  const user = formData.get('user')
  const password = formData.get('password')

  // TODO: Implement real authentication logic
  if (typeof user !== 'string' || typeof password !== 'string') {
    return { loginError: 'Username and password are required' }
  }

  if (!user.trim() || !password.trim()) {
    return { loginError: 'Username and password are required' }
  }

  return redirect('/')
}

export function loader(_: Route.LoaderArgs) {
  // TODO: Validate if user is logged in
  return null
}

export default function Login(_: Route.ComponentProps) {
  return (
    <div className="p-6 space-y-4">
      <h2 className="font-bold text-xl">Login</h2>
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
