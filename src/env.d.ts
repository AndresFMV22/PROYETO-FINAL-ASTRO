/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    session: import('@supabase/supabase-js').Session | null;
  }
}

interface ImportMetaEnv {
  readonly PUBLIC_SUPABASE_URL: string;
  readonly PUBLIC_SUPABASE_ANON_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
