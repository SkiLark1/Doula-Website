import { Hono } from 'hono'
import type { Env } from '../index'
import { sendConfirmationEmail, sendAdminNotification } from '../lib/email'

export const contactRoutes = new Hono<{ Bindings: Env }>()

contactRoutes.post('/', async (c) => {
  const body = await c.req.json<{
    name: string
    email: string
    phone?: string
    due_date: string
    service: string
    message?: string
  }>()

  if (!body.name || !body.email || !body.due_date || !body.service) {
    return c.json({ error: 'Name, email, due date, and service are required' }, 400)
  }

  // Save to database
  const result = await c.env.DB.prepare(
    'INSERT INTO quotes (name, email, phone, due_date, service, message) VALUES (?, ?, ?, ?, ?, ?)'
  )
    .bind(body.name, body.email, body.phone || null, body.due_date, body.service, body.message || null)
    .run()

  // Send emails (don't fail the request if emails fail)
  try {
    if (c.env.RESEND_API_KEY) {
      await Promise.all([
        sendConfirmationEmail(c.env.RESEND_API_KEY, body),
        sendAdminNotification(c.env.RESEND_API_KEY, c.env.ADMIN_EMAIL, body),
      ])
    }
  } catch (err) {
    console.error('Email send failed:', err)
  }

  return c.json({ success: true, id: result.meta.last_row_id })
})
