import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { authRoutes } from './routes/auth'
import { contactRoutes } from './routes/contact'
import { quotesRoutes } from './routes/quotes'
import { analyticsRoutes } from './routes/analytics'

export type Env = {
  DB: D1Database
  JWT_SECRET: string
  RESEND_API_KEY: string
  ADMIN_EMAIL: string
  CORS_ORIGIN: string
}

const app = new Hono<{ Bindings: Env }>()

app.use('/api/*', async (c, next) => {
  const corsMiddleware = cors({
    origin: c.env.CORS_ORIGIN || 'http://localhost:5173',
    allowMethods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  })
  return corsMiddleware(c, next)
})

app.route('/api/auth', authRoutes)
app.route('/api/contact', contactRoutes)
app.route('/api/quotes', quotesRoutes)
app.route('/api', analyticsRoutes)

app.get('/api/health', (c) => c.json({ status: 'ok' }))

export default app
