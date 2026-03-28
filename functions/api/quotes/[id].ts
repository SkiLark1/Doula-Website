import { requireAuth } from '../../lib/auth'

interface Env {
  DB: D1Database
  JWT_SECRET: string
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    await requireAuth(context.request, context.env.JWT_SECRET)
  } catch {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const id = context.params.id as string
  const quote = await context.env.DB.prepare('SELECT * FROM quotes WHERE id = ?').bind(id).first()
  if (!quote) return Response.json({ error: 'Quote not found' }, { status: 404 })
  return Response.json(quote)
}

export const onRequestPatch: PagesFunction<Env> = async (context) => {
  try {
    await requireAuth(context.request, context.env.JWT_SECRET)
  } catch {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const id = context.params.id as string
  const body = await context.request.json() as { status?: string; notes?: string }

  const updates: string[] = []
  const values: (string | null)[] = []

  if (body.status) {
    if (!['new', 'contacted', 'booked', 'archived'].includes(body.status)) {
      return Response.json({ error: 'Invalid status' }, { status: 400 })
    }
    updates.push('status = ?')
    values.push(body.status)
  }

  if (body.notes !== undefined) {
    updates.push('notes = ?')
    values.push(body.notes)
  }

  if (updates.length === 0) return Response.json({ error: 'No updates provided' }, { status: 400 })

  values.push(id)
  await context.env.DB.prepare(`UPDATE quotes SET ${updates.join(', ')} WHERE id = ?`).bind(...values).run()

  const updated = await context.env.DB.prepare('SELECT * FROM quotes WHERE id = ?').bind(id).first()
  return Response.json(updated)
}

export const onRequestDelete: PagesFunction<Env> = async (context) => {
  try {
    await requireAuth(context.request, context.env.JWT_SECRET)
  } catch {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const id = context.params.id as string
  await context.env.DB.prepare('DELETE FROM quotes WHERE id = ?').bind(id).run()
  return Response.json({ success: true })
}
