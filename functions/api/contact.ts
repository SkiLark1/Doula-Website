interface Env {
  DB: D1Database
  RESEND_API_KEY: string
  ADMIN_EMAIL: string
}

const serviceLabels: Record<string, string> = {
  birth: 'Birth Doula Support',
  postpartum: 'Postpartum Doula Care',
  both: 'Both Services',
  unsure: 'Not sure yet',
}

async function sendEmail(apiKey: string, from: string, to: string, subject: string, html: string) {
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from, to, subject, html }),
  })
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

  // Send emails via Resend
  try {
    if (context.env.RESEND_API_KEY) {
      const serviceName = serviceLabels[body.service] || body.service

      // Notification to admin
      await sendEmail(
        context.env.RESEND_API_KEY,
        'Held & Heard Website <noreply@heldandheardcare.com>',
        context.env.ADMIN_EMAIL,
        `New Inquiry from ${body.name}`,
        `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #8B9E8B;">New Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Name</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${body.name}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Email</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${body.email}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Phone</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${body.phone || 'Not provided'}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Due Date</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${body.due_date}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Service</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${serviceName}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Message</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${body.message || 'No message'}</td></tr>
          </table>
          <p style="margin-top: 20px; color: #666;">View and manage this inquiry in your <a href="https://heldandheardcare.com/held-portal-m7k2x9/quotes">admin panel</a>.</p>
        </div>`
      )

      // Confirmation to client
      await sendEmail(
        context.env.RESEND_API_KEY,
        'Held & Heard Doula Care <noreply@heldandheardcare.com>',
        body.email,
        'Thank you for reaching out! - Held & Heard Doula Care',
        `<div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; color: #3D3D3D;">
          <div style="background: #FAF7F2; padding: 40px 30px; text-align: center; border-bottom: 2px solid #D4BE9C;">
            <h1 style="font-size: 28px; font-weight: 300; margin: 0; color: #3D3D3D;">Held & Heard</h1>
            <p style="font-size: 14px; color: #8B9E8B; margin: 5px 0 0; letter-spacing: 2px;">DOULA CARE</p>
          </div>
          <div style="padding: 30px;">
            <p style="font-size: 16px; line-height: 1.6;">Dear ${body.name},</p>
            <p style="font-size: 16px; line-height: 1.6;">Thank you so much for reaching out! I'm honored that you're considering me as part of your birth journey.</p>
            <p style="font-size: 16px; line-height: 1.6;">I've received your inquiry about <strong>${serviceName}</strong> and I'll be in touch within 24 hours to schedule your free consultation.</p>
            <p style="font-size: 16px; line-height: 1.6;">In the meantime, please don't hesitate to reach out if you have any questions.</p>
            <p style="font-size: 16px; line-height: 1.6; margin-top: 30px;">With warmth,<br/><em>Maryna - Held & Heard Doula Care</em></p>
          </div>
          <div style="background: #FAF7F2; padding: 20px 30px; text-align: center; font-size: 12px; color: #5A5A5A;">
            <p>Follow along on Instagram: @heldandheard.doulacare</p>
          </div>
        </div>`
      )
    }
  } catch (err) {
    console.error('Email send failed:', err)
  }

  return Response.json({ success: true, id: result.meta.last_row_id })
}
