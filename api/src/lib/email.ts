import { Resend } from 'resend'

interface QuoteData {
  name: string
  email: string
  phone?: string
  due_date: string
  service: string
  message?: string
}

export async function sendConfirmationEmail(resendKey: string, data: QuoteData) {
  const resend = new Resend(resendKey)

  const serviceLabels: Record<string, string> = {
    birth: 'Birth Doula Support',
    postpartum: 'Postpartum Doula Care',
    both: 'Both Services',
    unsure: 'Not sure yet',
  }

  await resend.emails.send({
    from: 'Held & Heard Doula Care <noreply@heldandheard.com>',
    to: data.email,
    subject: 'Thank you for reaching out! - Held & Heard Doula Care',
    html: `
      <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; color: #3D3D3D;">
        <div style="background: #FAF7F2; padding: 40px 30px; text-align: center; border-bottom: 2px solid #D4BE9C;">
          <h1 style="font-size: 28px; font-weight: 300; margin: 0; color: #3D3D3D;">Held & Heard</h1>
          <p style="font-size: 14px; color: #8B9E8B; margin: 5px 0 0; letter-spacing: 2px;">DOULA CARE</p>
        </div>
        <div style="padding: 30px;">
          <p style="font-size: 16px; line-height: 1.6;">Dear ${data.name},</p>
          <p style="font-size: 16px; line-height: 1.6;">
            Thank you so much for reaching out! I'm honored that you're considering me as part of your birth journey.
          </p>
          <p style="font-size: 16px; line-height: 1.6;">
            I've received your inquiry about <strong>${serviceLabels[data.service] || data.service}</strong>
            and I'll be in touch within 24 hours to schedule your free consultation.
          </p>
          <p style="font-size: 16px; line-height: 1.6;">
            In the meantime, please don't hesitate to reach out if you have any questions.
          </p>
          <p style="font-size: 16px; line-height: 1.6; margin-top: 30px;">
            With warmth,<br/>
            <em>Maryna — Held & Heard Doula Care</em>
          </p>
        </div>
        <div style="background: #FAF7F2; padding: 20px 30px; text-align: center; font-size: 12px; color: #5A5A5A;">
          <p>Follow along on Instagram: @heldandheard.doulacare</p>
        </div>
      </div>
    `,
  })
}

export async function sendAdminNotification(resendKey: string, adminEmail: string, data: QuoteData) {
  const resend = new Resend(resendKey)

  await resend.emails.send({
    from: 'Held & Heard Website <noreply@heldandheard.com>',
    to: adminEmail,
    subject: `New Inquiry from ${data.name}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #8B9E8B;">New Contact Form Submission</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Name</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.name}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Email</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.email}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Phone</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.phone || 'Not provided'}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Due Date</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.due_date}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Service</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.service}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Message</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.message || 'No message'}</td></tr>
        </table>
        <p style="margin-top: 20px; color: #666;">View and manage this inquiry in your <a href="https://heldandheard.com/held-portal-m7k2x9/quotes">admin panel</a>.</p>
      </div>
    `,
  })
}
