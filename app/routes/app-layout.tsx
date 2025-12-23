import { Outlet } from 'react-router'
import { Navbar } from '~/common/components/navbar'
import type { Route } from './+types/app-layout'

export interface User {
  id: string
  name: string
}

export function loader(_: Route.LoaderArgs) {
  // Placeholder for future user loading logic
  const user: User | null = null

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
