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

  const url = new URL(context.request.url)
  const status = url.searchParams.get('status')
  const page = parseInt(url.searchParams.get('page') || '1')
  const limit = parseInt(url.searchParams.get('limit') || '20')
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
    ? context.env.DB.prepare(countQuery).bind(...params)
    : context.env.DB.prepare(countQuery)

  const dataStmt = params.length
    ? context.env.DB.prepare(query).bind(...params, limit, offset)
    : context.env.DB.prepare(query).bind(limit, offset)

  const [countResult, dataResult] = await Promise.all([countStmt.first(), dataStmt.all()])

  return Response.json({
    quotes: dataResult.results,
    total: countResult?.total || 0,
    page,
    limit,
  })
}
