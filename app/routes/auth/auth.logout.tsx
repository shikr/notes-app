import { parseCookie } from 'cookie'
import { data } from 'react-router'
import { database } from '~/database/context'
import type { Route } from './+types/auth.logout'
import { removeRefreshToken } from './services/auth.server'

export async function action({ request }: Route.ActionArgs) {
  const cookie = request.headers.get('Cookie')
  const { refreshToken } = cookie !== null ? parseCookie(cookie) : {}

  if (refreshToken !== undefined) {
    await removeRefreshToken(database(), refreshToken)
  }

  const headers = new Headers()
  headers.append('Set-Cookie', 'accessToken=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0')
  // biome-ignore lint/security/noSecrets: This is not a secret
  headers.append('Set-Cookie', 'refreshToken=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0')

  return data(null, { headers })
}
