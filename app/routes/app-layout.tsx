import { parseCookie } from 'cookie'
import { Outlet } from 'react-router'
import { Navbar } from '~/common/components/navbar'
import { database } from '~/database/context'
import type { Route } from './+types/app-layout'
import { getUserFromAccessToken } from './auth/services/auth.server'

export async function loader({ request }: Route.LoaderArgs) {
  const cookie = request.headers.get('Cookie')
  const { accessToken } = cookie !== null ? parseCookie(cookie) : {}
  if (cookie === null || accessToken === undefined) return { user: null }

  const db = database()
  const user = await getUserFromAccessToken(db, accessToken)

  return { user }
}

export default function Layout() {
  return (
    <main className="flex h-screen flex-col">
      <Navbar />
      <Outlet />
    </main>
  )
}
