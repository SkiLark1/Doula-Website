import { Context, Next } from 'hono'
import type { Env } from '../index'

interface JWTPayload {
  sub: string
  email: string
  exp: number
}

export async function authMiddleware(c: Context<{ Bindings: Env }>, next: Next) {
  const header = c.req.header('Authorization')
  if (!header?.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  const token = header.slice(7)
  try {
    const payload = await verifyJWT(token, c.env.JWT_SECRET)
    if (payload.exp < Date.now() / 1000) {
      return c.json({ error: 'Token expired' }, 401)
    }
    c.set('userId' as never, payload.sub)
    c.set('userEmail' as never, payload.email)
    await next()
  } catch {
    return c.json({ error: 'Invalid token' }, 401)
  }
}

export async function createJWT(payload: { sub: string; email: string }, secret: string): Promise<string> {
  const header = { alg: 'HS256', typ: 'JWT' }
  const now = Math.floor(Date.now() / 1000)
  const fullPayload = { ...payload, iat: now, exp: now + 86400 } // 24h

  const enc = new TextEncoder()
  const headerB64 = btoa(JSON.stringify(header)).replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_')
  const payloadB64 = btoa(JSON.stringify(fullPayload)).replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_')

  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(`${headerB64}.${payloadB64}`))
  const sigB64 = btoa(String.fromCharCode(...new Uint8Array(sig))).replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_')

  return `${headerB64}.${payloadB64}.${sigB64}`
}

async function verifyJWT(token: string, secret: string): Promise<JWTPayload> {
  const [headerB64, payloadB64, sigB64] = token.split('.')
  if (!headerB64 || !payloadB64 || !sigB64) throw new Error('Invalid token')

  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify'])

  const sigStr = atob(sigB64.replace(/-/g, '+').replace(/_/g, '/'))
  const sigArr = new Uint8Array(sigStr.length)
  for (let i = 0; i < sigStr.length; i++) sigArr[i] = sigStr.charCodeAt(i)

  const valid = await crypto.subtle.verify('HMAC', key, sigArr, enc.encode(`${headerB64}.${payloadB64}`))
  if (!valid) throw new Error('Invalid signature')

  const payloadStr = atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/'))
  return JSON.parse(payloadStr) as JWTPayload
}

// Simple password hashing using PBKDF2 (Workers-compatible, no bcrypt needed)
export async function hashPassword(password: string): Promise<string> {
  const enc = new TextEncoder()
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const key = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits'])
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' }, key, 256)
  const hashArr = new Uint8Array(bits)
  const saltHex = Array.from(salt).map(b => b.toString(16).padStart(2, '0')).join('')
  const hashHex = Array.from(hashArr).map(b => b.toString(16).padStart(2, '0')).join('')
  return `${saltHex}:${hashHex}`
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [saltHex, hashHex] = stored.split(':')
  if (!saltHex || !hashHex) return false

  const salt = new Uint8Array(saltHex.match(/.{2}/g)!.map(b => parseInt(b, 16)))
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits'])
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' }, key, 256)
  const computed = Array.from(new Uint8Array(bits)).map(b => b.toString(16).padStart(2, '0')).join('')
  return computed === hashHex
}
