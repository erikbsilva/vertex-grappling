import { NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

// Pinged on a schedule (see vercel.json crons) to keep the Supabase free-tier
// project from auto-pausing due to inactivity. Does a trivial read query.
export async function GET() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (getSupabase() as any)
      .from('leads')
      .select('id', { count: 'exact', head: true })

    if (error) {
      console.error('Keep-alive query failed:', error)
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true, timestamp: new Date().toISOString() })
  } catch (err) {
    console.error('Keep-alive unexpected error:', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
