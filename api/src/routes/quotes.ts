import { Hono } from 'hono'
import type { Env } from '../index'
import { authMiddleware } from '../middleware/auth'

export const quotesRoutes = new Hono<{ Bindings: Env }>()

// All routes require auth
quotesRoutes.use('*', authMiddleware)

// List quotes with optional status filter
quotesRoutes.get('/', async (c) => {
  const status = c.req.query('status')
  const page = parseInt(c.req.query('page') || '1')
  const limit = parseInt(c.req.query('limit') || '20')
  const offset = (page - 1) * limit

  let query = 'SELECT * FROM quotes'
  let countQuery = 'SELECT COUNT(*) as total FROM quotes'
  const params: string[] = []

  if (status && status !== 'all') {
    query += ' WHERE status = ?'
    countQuery += ' WHERE status = ?'
    params.push(status)
  }

  query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?'

  const countStmt = params.length
    ? c.env.DB.prepare(countQuery).bind(...params)
    : c.env.DB.prepare(countQuery)

  const dataStmt = params.length
    ? c.env.DB.prepare(query).bind(...params, limit, offset)
    : c.env.DB.prepare(query).bind(limit, offset)

  const [countResult, dataResult] = await Promise.all([countStmt.first(), dataStmt.all()])

  return c.json({
    quotes: dataResult.results,
    total: countResult?.total || 0,
    page,
    limit,
  })
})

// Get single quote
quotesRoutes.get('/:id', async (c) => {
  const id = c.req.param('id')
  const quote = await c.env.DB.prepare('SELECT * FROM quotes WHERE id = ?').bind(id).first()

  if (!quote) {
    return c.json({ error: 'Quote not found' }, 404)
  }

  return c.json(quote)
})

// Update quote status/notes
quotesRoutes.patch('/:id', async (c) => {
  const id = c.req.param('id')
  const body = await c.req.json<{ status?: string; notes?: string }>()

  const updates: string[] = []
  const values: (string | null)[] = []

  if (body.status) {
    if (!['new', 'contacted', 'booked', 'archived'].includes(body.status)) {
      return c.json({ error: 'Invalid status' }, 400)
    }
    updates.push('status = ?')
    values.push(body.status)
  }

  if (body.notes !== undefined) {
    updates.push('notes = ?')
    values.push(body.notes)
  }

  if (updates.length === 0) {
    return c.json({ error: 'No updates provided' }, 400)
  }

  values.push(id)
  await c.env.DB.prepare(`UPDATE quotes SET ${updates.join(', ')} WHERE id = ?`).bind(...values).run()

  const updated = await c.env.DB.prepare('SELECT * FROM quotes WHERE id = ?').bind(id).first()
  return c.json(updated)
})

// Archive (soft delete)
quotesRoutes.delete('/:id', async (c) => {
  const id = c.req.param('id')
  await c.env.DB.prepare("UPDATE quotes SET status = 'archived' WHERE id = ?").bind(id).run()
  return c.json({ success: true })
})
