import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://mnfashlakkoonjlkhani.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1uZmFzaGxha2tvb25qbGtoYW5pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5OTM4ODMsImV4cCI6MjA4NjU2OTg4M30.yQcd9au2txkhCMRFm97EbBoc8Qhjjk_H9EdvaQ7UuiY";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
export const STORAGE_URL = `${SUPABASE_URL}/storage/v1/object/public`;
export const getLogoUrl  = (f) => `${STORAGE_URL}/logos/${f}`;
export const getPhotoUrl = (f) => `${STORAGE_URL}/photos/${f}`;
export const getVideoUrl = (f) => `${STORAGE_URL}/videos/${f}`;

// ── Logos officiels ────────────────────────────────────────────────────────
const CDN = "https://media.base44.com/images/public/6a0371a87c9257126b051d5a";
export const LOGO_OT          = `${CDN}/892f73e5f_LogoOlivierTrevisOfficielJs-INNOVIA.jpg`;
export const LOGO_TDD         = `${CDN}/42704af36_NewlogoletourdeDourJs-innovia-julienpagin.png`;
export const LOGO_MISS        = `${CDN}/2f427d86e_miss-mister-dour-logoa7f3e9d2.png`;
export const LOGO_FASHION     = `${CDN}/55be1534b_LogoFashionistArt-Js-innovia.png`;
export const LOGO_SYNERGIE    = `${CDN}/4f971d778_LogoSynergieJs-innoviaBleu.png`;
export const LOGO_PV          = `${CDN}/85e334d8c_LogoPVassurancesagencedeDour.png`;

// ── Palettes ────────────────────────────────────────────────────────────────
export const BRAND = {
  navy:      "#0d1b2a",
  navyLight: "#1a2d42",
  gold:      "#c9a84c",
  goldLight: "#e0c068",
  silver:    "#b0b8c8",
  white:     "#f0f4f8",
  black:     "#070d14",
};

export const TDD = {
  orange:   "#D47A2C",
  amber:    "#F0C982",
  blue:     "#1E6FA5",
  cream:    "#F6F2E7",
  night:    "#090d18",
  nightMid: "#0e1628",
  goldRim:  "#D4A847",
};

export const LOGOS = {
  olivierTrevis: LOGO_OT,
  tourDeDour:    LOGO_TDD,
  missMisterDour:LOGO_MISS,
  fashionistArt: LOGO_FASHION,
  synergieDour:  LOGO_SYNERGIE,
  pvAssurances:  LOGO_PV,
};

export default supabase;
