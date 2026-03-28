interface Env {
  DB: D1Database
  RESEND_API_KEY: string
  ADMIN_EMAIL: string
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const body = await context.request.json() as {
    name: string
    email: string
    phone?: string
    due_date: string
    service: string
    message?: string
  }

  if (!body.name || !body.email || !body.due_date || !body.service) {
    return Response.json({ error: 'Name, email, due date, and service are required' }, { status: 400 })
  }

  const result = await context.env.DB.prepare(
    'INSERT INTO quotes (name, email, phone, due_date, service, message) VALUES (?, ?, ?, ?, ?, ?)'
  )
    .bind(body.name, body.email, body.phone || null, body.due_date, body.service, body.message || null)
    .run()

  return Response.json({ success: true, id: result.meta.last_row_id })
}
