import { Link, redirect } from 'react-router'
import type { Route } from './+types/auth.register'
import { AuthForm } from './components/auth-form'

export function meta(_: Route.MetaArgs) {
  return [
    { title: 'Register - New React Router App' },
    { name: 'description', content: 'Register to create a new account.' }
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
