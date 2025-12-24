import bcript from 'bcryptjs'
import { stringifySetCookie } from 'cookie'
import { eq } from 'drizzle-orm'
import jwt from 'jsonwebtoken'
import ms from 'ms'
import type { Database } from '~/database/context'
import { refreshTokens, users } from '~/database/schema'

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string
const ACCESS_TOKEN_EXPIRY = '15m'
const REFRESH_TOKEN_EXPIRY = '7d'

export interface TokenPayload {
  userId: string
}

export interface AuthCookies {
  accessToken: string
  refreshToken: string
}

export function hashPassword(password: string): Promise<string> {
  return bcript.hash(password, 10)
}

export function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcript.compare(password, hash)
}

export function generateAccessToken(payload: TokenPayload): string {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY })
}

export function generateRefreshToken(payload: TokenPayload): string {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY })
}

export function verifyAccessToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, ACCESS_TOKEN_SECRET) as TokenPayload
  } catch {
    return null
  }
}

export function verifyRefreshToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, REFRESH_TOKEN_SECRET) as TokenPayload
  } catch {
    return null
  }
}

export async function saveRefreshToken(
  db: Database,
  userId: string,
  token: string
): Promise<void> {
  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 7) // 7 days expiry

  await db.insert(refreshTokens).values({
    token,
    userId,
    expiresAt
  })
}

export async function removeRefreshToken(db: Database, token: string): Promise<void> {
  await db.delete(refreshTokens).where(eq(refreshTokens.token, token))
}

function generateCookie(name: string, value: string, maxAge: number): string {
  return stringifySetCookie({
    name,
    value,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge
  })
}

function generateCookiesFromTokens(
  accessToken: string,
  refreshToken: string
): AuthCookies {
  return {
    accessToken: generateCookie(
      'accessToken',
      accessToken,
      ms(ACCESS_TOKEN_EXPIRY) / 1000
    ),
    refreshToken: generateCookie(
      // biome-ignore lint/security/noSecrets: It's just a cookie key
      'refreshToken',
      refreshToken,
      ms(REFRESH_TOKEN_EXPIRY) / 1000
    )
  }
}

export async function regenerateTokens(
  db: Database,
  refreshToken: string,
  payload: TokenPayload
): Promise<AuthCookies | null> {
  const storedToken = await findRefreshToken(db, refreshToken)
  if (storedToken === undefined || storedToken.expiresAt < new Date()) return null

  const newAccessToken = generateAccessToken({ userId: payload.userId })
  const newRefreshToken = generateRefreshToken({ userId: payload.userId })

  await db.transaction(async (tx) => {
    await removeRefreshToken(tx, refreshToken)
    await saveRefreshToken(tx, payload.userId, newRefreshToken)
  })

  return generateCookiesFromTokens(newAccessToken, newRefreshToken)
}

export async function createUserSession(
  db: Database,
  userId: string
): Promise<AuthCookies> {
  const accessToken = generateAccessToken({ userId })
  const refreshToken = generateRefreshToken({ userId })

  await saveRefreshToken(db, userId, refreshToken)

  return generateCookiesFromTokens(accessToken, refreshToken)
}

export async function findRefreshToken(db: Database, token: string) {
  const [refreshToken] = await db
    .select()
    .from(refreshTokens)
    .where(eq(refreshTokens.token, token))
    .limit(1)
  return refreshToken
}

export async function getUserFromAccessToken(db: Database, token: string) {
  const payload = verifyAccessToken(token)
  if (payload === null) return null

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, payload.userId))
    .limit(1)

  return user ?? null
}
