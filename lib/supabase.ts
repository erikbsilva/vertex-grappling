import { createClient } from '@supabase/supabase-js'

// Lazy singleton — only instantiated at request time, not at build time
let _client: ReturnType<typeof createClient> | null = null

export function getSupabase() {
  if (!_client) {
    const url = process.env.SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!url || !key) throw new Error('Supabase env vars not set')
    _client = createClient(url, key)
  }
  return _client
}
