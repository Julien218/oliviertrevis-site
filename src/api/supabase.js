import { createClient } from "@supabase/supabase-js";

// ============================================================
// JS-Innov.IA Cockpit Central — Projet unique multi-sites
// Ref: rzvvwcwyaddzsaattwqt | Schema: oliviertrevis
// ============================================================
const SUPABASE_URL = "https://rzvvwcwyaddzsaattwqt.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6dnZ3Y3d5YWRkenNhYXR0d3F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExMTU4NjAsImV4cCI6MjA5NjY5MTg2MH0.VOEFK5BG_dxCnijcz2RexqMg1yDGoXdw58-2Ud_a7hM";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  db: { schema: "oliviertrevis" }
});

export const STORAGE_URL = `${SUPABASE_URL}/storage/v1/object/public`;
export const CDN = "https://media.base44.com/images/public/6a0371a87c9257126b051d5a";

export default supabase;
