import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://mnfashlakkoonjlkhani.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1uZmFzaGxha2tvb25qbGtoYW5pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5OTM4ODMsImV4cCI6MjA4NjU2OTg4M30.yQcd9au2txkhCMRFm97EbBoc8Qhjjk_H9EdvaQ7UuiY";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const STORAGE_URL = `${SUPABASE_URL}/storage/v1/object/public`;

export const getLogoUrl  = (f) => `${STORAGE_URL}/logos/${f}`;
export const getPhotoUrl = (f) => `${STORAGE_URL}/photos/${f}`;
export const getVideoUrl = (f) => `${STORAGE_URL}/videos/${f}`;

export const LOGOS = {
  olivierTrevis:  getLogoUrl("olivier-trevis.jpg"),
  pvAssurances:   getLogoUrl("pv-assurances-dour.png"),
  missMisterDour: getLogoUrl("miss-mister-dour.png"),
  synergieDour:   getLogoUrl("synergie-dour.png"),
  fashionistArt:  getLogoUrl("fashionist-art.png"),
  tourDeDour:     getLogoUrl("tour-de-dour.png"),
};

export default supabase;
