import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://mnfashlakkoonjlkhani.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1uZmFzaGxha2tvb25qbGtoYW5pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5OTM4ODMsImV4cCI6MjA4NjU2OTg4M30.yQcd9au2txkhCMRFm97EbBoc8Qhjjk_H9EdvaQ7UuiY";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const STORAGE_URL = `${SUPABASE_URL}/storage/v1/object/public`;

export const getLogoUrl  = (f) => `${STORAGE_URL}/logos/${f}`;
export const getPhotoUrl = (f) => `${STORAGE_URL}/photos/${f}`;
export const getVideoUrl = (f) => `${STORAGE_URL}/videos/${f}`;

// Logo officiel Olivier Trevis — hébergé sur Base44 CDN
export const LOGO_OT = "https://media.base44.com/images/public/6a0371a87c9257126b051d5a/892f73e5f_LogoOlivierTrevisOfficielJs-INNOVIA.jpg";

export const LOGOS = {
  olivierTrevis:  LOGO_OT,
  pvAssurances:   getLogoUrl("pv-assurances-dour.png"),
  missMisterDour: getLogoUrl("miss-mister-dour.png"),
  synergieDour:   getLogoUrl("synergie-dour.png"),
  fashionistArt:  getLogoUrl("fashionist-art.png"),
  tourDeDour:     getLogoUrl("tour-de-dour.png"),
};

// Palette identitaire tirée du logo Olivier Trevis
export const BRAND = {
  navy:      "#0d1b2a",   // bleu marine foncé (fond logo)
  navyLight: "#1a2d42",   // marine légèrement plus clair
  gold:      "#c9a84c",   // or/doré
  goldLight: "#e0c068",   // or clair
  silver:    "#b0b8c8",   // argent/gris clair
  white:     "#f0f4f8",   // blanc cassé
  black:     "#070d14",   // noir profond
};

export default supabase;
