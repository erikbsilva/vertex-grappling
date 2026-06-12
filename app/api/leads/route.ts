import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

const COACH_WHATSAPP = process.env.COACH_WHATSAPP_NUMBER! // e.g. "15615527276"
const CALLMEBOT_APIKEY = process.env.CALLMEBOT_APIKEY!

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

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('Unexpected error:', err)
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 })
  }
}
