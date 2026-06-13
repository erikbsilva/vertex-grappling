import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getSupabase } from '@/lib/supabase'

const COACH_WHATSAPP = process.env.COACH_WHATSAPP_NUMBER! // e.g. "15615527276"
const CALLMEBOT_APIKEY = process.env.CALLMEBOT_APIKEY!

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Vertex Grappling <onboarding@resend.dev>'

async function sendConfirmationEmail(lead: { nome: string; email: string }) {
  const firstName = lead.nome.trim().split(' ')[0]

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: FROM_EMAIL,
      to: lead.email,
      subject: "Thanks for reaching out — let's talk soon",
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 480px; margin: 0 auto; color: #1a1a1a;">
          <p>Hi ${firstName},</p>
          <p>Thanks for reaching out to Vertex! I got your info and will message you on WhatsApp within 24 hours to chat about training.</p>
          <p>No pressure, no sales pitch — just a quick conversation to see if it's a good fit for you.</p>
          <p>Talk soon,<br/>Erik</p>
        </div>
      `,
    })
  } catch (err) {
    console.error('Confirmation email failed — lead was still saved:', err)
  }
}

async function sendWhatsAppNotification(lead: {
  nome: string
  whatsapp: string
  email: string
  ja_treinou: boolean
}) {
  const trainingStatus = lead.ja_treinou ? 'Yes' : 'No'
  const text = encodeURIComponent(
    `🥋 New lead — Vertex Grappling\n\nName: ${lead.nome}\nWhatsApp: ${lead.whatsapp}\nEmail: ${lead.email}\nTrained before: ${trainingStatus}`
  )

  const url = `https://api.callmebot.com/whatsapp.php?phone=${COACH_WHATSAPP}&text=${text}&apikey=${CALLMEBOT_APIKEY}`

  // Fire-and-forget — don't fail the lead save if notification fails
  try {
    await fetch(url)
  } catch {
    console.error('WhatsApp notification failed — lead was still saved')
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { nome, whatsapp, email, ja_treinou } = body

    if (!nome || !whatsapp || !email || ja_treinou === '') {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
    }

    const trainedBool = ja_treinou === 'yes'

    // Save to Supabase
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (getSupabase() as any).from('leads').insert([
      {
        nome: nome.trim(),
        whatsapp: whatsapp.trim(),
        email: email.trim().toLowerCase(),
        ja_treinou: trainedBool,
        origem: 'landing_page',
      },
    ])

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to save. Please try again.' }, { status: 500 })
    }

    // Send WhatsApp notification
    await sendWhatsAppNotification({
      nome: nome.trim(),
      whatsapp: whatsapp.trim(),
      email: email.trim(),
      ja_treinou: trainedBool,
    })

    // Send confirmation email to the lead
    await sendConfirmationEmail({ nome: nome.trim(), email: email.trim() })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('Unexpected error:', err)
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 })
  }
}
