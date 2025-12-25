import { parseCookie } from 'cookie'
import { Outlet } from 'react-router'
import { Navbar } from '~/common/components/navbar'
import { useAutoRefresh } from '~/common/hooks/useAutoRefresh'
import { userContext } from '~/context'
import { database } from '~/database/context'
import type { Route } from './+types/app-layout'
import { getUserFromAccessToken } from './auth/services/auth.server'

async function authMiddleware({
  request,
  context
}: Parameters<Route.MiddlewareFunction>[0]) {
  const cookie = request.headers.get('Cookie')
  const { accessToken } = cookie !== null ? parseCookie(cookie) : {}
  if (accessToken !== undefined) {
    const db = database()
    const user = await getUserFromAccessToken(db, accessToken)
    context.set(userContext, user)
  }
}

export const middleware: Route.MiddlewareFunction[] = [authMiddleware]

export function loader({ context }: Route.LoaderArgs) {
  const user = context.get(userContext)

  return { user }
}

export default function Layout() {
  useAutoRefresh()

  return (
    <main className="flex h-screen flex-col">
      <Navbar />
      <Outlet />
    </main>
  )
}
