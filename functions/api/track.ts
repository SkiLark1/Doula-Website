interface Env {
  DB: D1Database
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { path, referrer, visitorId } = await context.request.json() as {
    path: string
    referrer?: string
    visitorId?: string
  }

  if (!path) return Response.json({ error: 'Path required' }, { status: 400 })

  const ua = context.request.headers.get('User-Agent') || ''

  await context.env.DB.prepare(
    'INSERT INTO page_views (path, referrer, visitor_id, user_agent) VALUES (?, ?, ?, ?)'
  )
    .bind(path, referrer || null, visitorId || null, ua)
    .run()

  return Response.json({ ok: true })
}
