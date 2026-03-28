import { createJWT, verifyPassword } from '../../lib/auth'

interface Env {
  DB: D1Database
  JWT_SECRET: string
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { email, password } = await context.request.json() as { email: string; password: string }

  if (!email || !password) {
    return Response.json({ error: 'Email and password are required' }, { status: 400 })
  }

  const user = await context.env.DB.prepare('SELECT * FROM admin_users WHERE email = ?').bind(email).first()
  if (!user) {
    return Response.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const valid = await verifyPassword(password, user.password_hash as string)
  if (!valid) {
    return Response.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const token = await createJWT({ sub: String(user.id), email: user.email as string }, context.env.JWT_SECRET)

  return Response.json({ token, email: user.email })
}
