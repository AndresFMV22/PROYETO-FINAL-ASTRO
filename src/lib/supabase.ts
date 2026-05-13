import { createServerClient } from '@supabase/ssr'
import type { CookieOptions } from '@supabase/ssr'
import type { AstroCookies } from 'astro'
import ws from 'ws'

export const getSupabase = (cookies: AstroCookies) => {
  return createServerClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(key: string) {
          return cookies.get(key)?.value;
        },
        set(key: string, value: string, options: CookieOptions) {
          cookies.set(key, value, { path: '/', ...options as any });
        },
        remove(key: string, options: CookieOptions) {
          cookies.delete(key, { path: '/', ...options as any });
        },
      },
      realtime: { transport: ws as any },
    }
  )
}
