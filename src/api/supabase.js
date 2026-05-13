import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://mnfashlakkoonjlkhani.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1uZmFzaGxha2tvb25qbGtoYW5pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5OTM4ODMsImV4cCI6MjA4NjU2OTg4M30.yQcd9au2txkhCMRFm97EbBoc8Qhjjk_H9EdvaQ7UuiY";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const STORAGE_URL = `${SUPABASE_URL}/storage/v1/object/public`;

export const getLogoUrl  = (f) => `${STORAGE_URL}/logos/${f}`;
export const getPhotoUrl = (f) => `${STORAGE_URL}/photos/${f}`;
export const getVideoUrl = (f) => `${STORAGE_URL}/videos/${f}`;

// Logo officiel Olivier Trevis
export const LOGO_OT = "https://media.base44.com/images/public/6a0371a87c9257126b051d5a/892f73e5f_LogoOlivierTrevisOfficielJs-INNOVIA.jpg";

// Logo officiel Le Tour de Dour (planche transmise)
export const LOGO_TDD = "https://media.base44.com/images/public/6a0371a87c9257126b051d5a/6a0bb2dc6_ChatGPTImage11mai202612_12_58.png";

// Palette globale du site — tirée du logo Olivier Trevis
export const BRAND = {
  navy:      "#0d1b2a",
  navyLight: "#1a2d42",
  gold:      "#c9a84c",
  goldLight: "#e0c068",
  silver:    "#b0b8c8",
  white:     "#f0f4f8",
  black:     "#070d14",
};

// Palette spécifique Le Tour de Dour — issue de la planche officielle
export const TDD = {
  // Couleurs logo
  orange:    "#D47A2C",   // orangé du château/tour
  amber:     "#F0C982",   // or clair (bords cercle, étoiles)
  blue:      "#1E6FA5",   // bleu cyan (éolienne)
  cream:     "#F6F2E7",   // blanc cassé (texte blanc)
  // Fond nuit profonde du logo
  night:     "#090d18",
  nightMid:  "#0e1628",
  // Accents
  goldRim:   "#D4A847",   // bordure dorée du cercle logo
};

export const LOGOS = {
  olivierTrevis:  LOGO_OT,
  tourDeDour:     LOGO_TDD,
  pvAssurances:   getLogoUrl("pv-assurances-dour.png"),
  missMisterDour: getLogoUrl("miss-mister-dour.png"),
  synergieDour:   getLogoUrl("synergie-dour.png"),
  fashionistArt:  getLogoUrl("fashionist-art.png"),
};

export default supabase;
