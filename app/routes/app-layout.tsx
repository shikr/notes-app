import { Outlet } from 'react-router'
import { Navbar } from '~/common/components/navbar'

export default function Layout() {
  return (
    <main className="flex h-screen flex-col">
      <Navbar />
      <Outlet />
    </main>
  )
}
