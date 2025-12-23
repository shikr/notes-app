import { IconHome, IconLogin } from '@tabler/icons-react'
import { Link, useFetcher, useRouteLoaderData } from 'react-router'
import type { User } from '~/routes/app-layout'
import { Button } from './button'

export function Navbar() {
  const data = useRouteLoaderData<{ user: User | null }>('routes/app-layout') ?? {
    user: null
  }
  const fetcher = useFetcher()

  return (
    <nav className="bg-indigo-300/10 backdrop-blur-md p-2 h-auto">
      <ul className="flex items-center justify-between w-full">
        <li className="flex items-center justify-center">
          <Button as={Link} to="/" aria-label="home" variant="light" viewTransition>
            <IconHome size={28} />
          </Button>
        </li>
        <li className="flex items-center justify-center">
          {data.user !== null ? (
            <fetcher.Form method="post" action="/logout">
              <Button
                type="submit"
                variant="light"
                isLoading={fetcher.state === 'submitting'}
              >
                Logout
              </Button>
            </fetcher.Form>
          ) : (
            <Button
              as={Link}
              to="/login"
              aria-label="login"
              variant="light"
              viewTransition
            >
              <IconLogin size={28} />
            </Button>
          )}
        </li>
      </ul>
    </nav>
  )
}
