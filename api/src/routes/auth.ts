import { Hono } from 'hono'
import type { Env } from '../index'
import { createJWT, verifyPassword, hashPassword, authMiddleware } from '../middleware/auth'

export const authRoutes = new Hono<{ Bindings: Env }>()

authRoutes.post('/login', async (c) => {
  const { email, password } = await c.req.json<{ email: string; password: string }>()

  if (!email || !password) {
    return c.json({ error: 'Email and password are required' }, 400)
  }

  const user = await c.env.DB.prepare('SELECT * FROM admin_users WHERE email = ?').bind(email).first()

  if (!user) {
    return c.json({ error: 'Invalid credentials' }, 401)
  }

  const valid = await verifyPassword(password, user.password_hash as string)
  if (!valid) {
    return c.json({ error: 'Invalid credentials' }, 401)
  }

  const token = await createJWT({ sub: String(user.id), email: user.email as string }, c.env.JWT_SECRET)

  return c.json({ token, email: user.email })
})

// Setup endpoint — only works if no admin users exist yet
authRoutes.post('/setup', async (c) => {
  const existing = await c.env.DB.prepare('SELECT COUNT(*) as count FROM admin_users').first()
  if (existing && (existing.count as number) > 0) {
    return c.json({ error: 'Admin already exists' }, 403)
  }

  const { email, password } = await c.req.json<{ email: string; password: string }>()
  if (!email || !password || password.length < 8) {
    return c.json({ error: 'Email and password (min 8 chars) required' }, 400)
  }

  const hash = await hashPassword(password)
  await c.env.DB.prepare('INSERT INTO admin_users (email, password_hash) VALUES (?, ?)').bind(email, hash).run()

  return c.json({ success: true, message: 'Admin user created' })
})

// Change password — requires current password + auth token
authRoutes.post('/change-password', authMiddleware, async (c) => {
  const { currentPassword, newPassword } = await c.req.json<{ currentPassword: string; newPassword: string }>()

  if (!currentPassword || !newPassword || newPassword.length < 8) {
    return c.json({ error: 'Current password and new password (min 8 chars) required' }, 400)
  }

  const userId = c.get('userId' as never)
  const user = await c.env.DB.prepare('SELECT * FROM admin_users WHERE id = ?').bind(userId).first()
  if (!user) return c.json({ error: 'User not found' }, 404)

  const valid = await verifyPassword(currentPassword, user.password_hash as string)
  if (!valid) return c.json({ error: 'Current password is incorrect' }, 401)

  const hash = await hashPassword(newPassword)
  await c.env.DB.prepare('UPDATE admin_users SET password_hash = ? WHERE id = ?').bind(hash, userId).run()

  return c.json({ success: true, message: 'Password updated' })
})
