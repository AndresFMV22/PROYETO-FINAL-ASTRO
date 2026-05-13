import { defineMiddleware } from "astro:middleware";
import { getSupabase } from "./lib/supabase";

export const onRequest = defineMiddleware(async ({ locals, cookies, url, redirect }, next) => {
  const supabase = getSupabase(cookies);
  const { data: { session } } = await supabase.auth.getSession();

  if (url.pathname.startsWith('/admin')) {
    if (!session) {
      return redirect('/login');
    }
  }

  locals.session = session;
  return next();
});
