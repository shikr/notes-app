import { parseCookie } from 'cookie'
import { data } from 'react-router'
import { database } from '~/database/context'
import type { Route } from './+types/auth.refresh'
import { regenerateTokens, verifyRefreshToken } from './services/auth.server'

export async function action({ request }: Route.ActionArgs) {
  const cookie = request.headers.get('Cookie')
  const { refreshToken } = cookie !== null ? parseCookie(cookie) : {}

  if (refreshToken === undefined)
    return {
      error: 'No refresh token'
    }

  const payload = verifyRefreshToken(refreshToken)
  if (payload === null)
    return {
      error: 'Invalid refresh token'
    }

  const db = database()
  const cookies = await regenerateTokens(db, refreshToken, payload)
  if (cookies === null)
    return {
      error: 'Could not regenerate tokens'
    }

  const headers = new Headers()
  headers.append('Set-Cookie', cookies.accessToken)
  headers.append('Set-Cookie', cookies.refreshToken)

  return data({ ok: true }, { headers })
}
