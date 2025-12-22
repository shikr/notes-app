import { IconHome, IconLogin } from '@tabler/icons-react'
import { Link } from 'react-router'
import { Button } from './button'

export function Navbar() {
  return (
    <nav className="bg-indigo-300/10 backdrop-blur-md p-2 h-auto">
      <ul className="flex items-center justify-between w-full">
        <li className="flex items-center justify-center">
          <Button as={Link} to="/" aria-label="home" variant="light">
            <IconHome size={28} />
          </Button>
        </li>
        <li className="flex items-center justify-center">
          <Button as={Link} to="/login" aria-label="login" variant="light">
            <IconLogin size={28} />
          </Button>
        </li>
      </ul>
    </nav>
  )
}
