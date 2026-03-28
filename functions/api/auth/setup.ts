import { hashPassword } from '../../lib/auth'

interface Env {
  DB: D1Database
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const existing = await context.env.DB.prepare('SELECT COUNT(*) as count FROM admin_users').first()
  if (existing && (existing.count as number) > 0) {
    return Response.json({ error: 'Admin already exists' }, { status: 403 })
  }

  const { email, password } = await context.request.json() as { email: string; password: string }
  if (!email || !password || password.length < 8) {
    return Response.json({ error: 'Email and password (min 8 chars) required' }, { status: 400 })
  }

  const hash = await hashPassword(password)
  await context.env.DB.prepare('INSERT INTO admin_users (email, password_hash) VALUES (?, ?)').bind(email, hash).run()

  return Response.json({ success: true, message: 'Admin user created' })
}
