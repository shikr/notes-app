import { createContext } from 'react-router'
import type { User } from '~/database/schema'

export const userContext = createContext<User | null>(null)
