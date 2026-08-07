import { createClient } from "@supabase/supabase-js";

// ============================================================
// Olivier Trevis — Site multi-pages
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

// ── Logos & Brand constants ─────────────────────────────────
export const LOGO_OT       = `${CDN}/892f73e5f_LogoOlivierTrevisOfficielJs-INNOVIA.jpg`;
export const LOGO_MISS     = `${CDN}/2f427d86e_miss-mister-dour-logoa7f3e9d2.png`;
export const LOGO_FASHION  = `${CDN}/55be1534b_LogoFashionistArt-Js-innovia.png`;
export const LOGO_TDD      = `${CDN}/42704af36_NewlogoletourdeDourJs-innovia-julienpagin.png`;
export const LOGO_PV       = `${CDN}/85e334d8c_LogoPVassurancesagencedeDour.png`;
export const LOGO_SYNERGIE = `${CDN}/4f971d778_LogoSynergieJs-innoviaBleu.png`;
export const BRAND = {
  name: "Olivier Trevis",
  tagline: "Agir et Construire Ensemble",
  color: "#D47A2C",
  gold: "#F0C982",
  blue: "#1E6FA5",
};
export const TDD = { name: 'Tour de Dour', color: '#D47A2C' };
