// Spirit colors per mascot
export const SPIRIT_COLORS = {
  lion:   { primary: "#FFB800", glow: "rgba(255,184,0,0.4)", bg: "rgba(255,184,0,0.08)" },
  canari: { primary: "#D4FF00", glow: "rgba(212,255,0,0.4)", bg: "rgba(212,255,0,0.08)" },
  biche:  { primary: "#00FFA3", glow: "rgba(0,255,163,0.4)", bg: "rgba(0,255,163,0.08)" },
  renard: { primary: "#FF4D00", glow: "rgba(255,77,0,0.4)",  bg: "rgba(255,77,0,0.08)"  },
  ours:   { primary: "#00CCFF", glow: "rgba(0,204,255,0.4)", bg: "rgba(0,204,255,0.08)" },
  licorne: { primary: "#C77DFF", glow: "rgba(199,125,255,0.4)", bg: "rgba(199,125,255,0.08)" },
};

// Illustrations "bouton transparent" officielles par espèce (pack Js-Innov.IA)
export const BUTTON_IMAGES = {
  lion:   "https://base44.app/api/apps/6a24286d838202b06e2597aa/files/mp/public/6a24286d838202b06e2597aa/c4b3df071_lion_bouton.png",
  renard: "https://base44.app/api/apps/6a24286d838202b06e2597aa/files/mp/public/6a24286d838202b06e2597aa/d943a8f0d_renard_bouton.png",
  ours:   "https://base44.app/api/apps/6a24286d838202b06e2597aa/files/mp/public/6a24286d838202b06e2597aa/7ed10a34a_ours_bouton.png",
  canari: "https://base44.app/api/apps/6a24286d838202b06e2597aa/files/mp/public/6a24286d838202b06e2597aa/efe40cd2c_canari_bouton.png",
  biche:  "https://base44.app/api/apps/6a24286d838202b06e2597aa/files/mp/public/6a24286d838202b06e2597aa/bd1a95306_biche_bouton.png",
  licorne: "https://media.base44.com/images/public/6a24286d838202b06e2597aa/d627d4ba4_generated_image.png",
};

const API_BASE = window.location.origin.includes("localhost")
  ? "https://site-olivier-6b051d5a.base44.app"
  : window.location.origin;

async function callFunction(name, payload = {}) {
  const res = await fetch(`${API_BASE}/functions/${name}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Request failed" }));
    throw new Error(err.error || "Request failed");
  }
  return res.json();
}

export async function fetchMascottes() {
  return callFunction("getMascottes", {});
}

export async function fetchMascotte(slug) {
  return callFunction("getMascottes", { slug });
}

export async function submitVote(mascotte_slug, mascotte_nom) {
  let session_id = localStorage.getItem("masco_session");
  if (!session_id) {
    session_id = crypto.randomUUID();
    localStorage.setItem("masco_session", session_id);
  }
  return callFunction("voteMascotte", {
    mascotte_slug,
    mascotte_nom,
    session_id,
  });
}

// ============================================================
// VOTE OFFICIEL FINAL — page /mascottes, table Supabase dédiée
// ============================================================
async function getFingerprint() {
  const stored = localStorage.getItem("masco_fp_officiel");
  if (stored) return stored;
  const raw = [
    navigator.userAgent,
    navigator.language,
    screen.width + "x" + screen.height,
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  ].join("|");
  const enc = new TextEncoder().encode(raw);
  const buf = await crypto.subtle.digest("SHA-256", enc);
  const hash = Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
  localStorage.setItem("masco_fp_officiel", hash);
  return hash;
}

export async function submitOfficialVote(mascotte, { nom_propose = "", facebook = "", facebook_url = "" } = {}) {
  const fingerprint = await getFingerprint();
  const already = localStorage.getItem("masco_vote_officiel_done");
  if (already) {
    return { success: false, already_voted: true, message: "Vous avez déjà voté depuis cet appareil." };
  }
  const result = await callFunction("submitOfficialVote", {
    mascotte_id: mascotte?.id,
    mascotte_nom: mascotte?.nom,
    nom_propose,
    facebook,
    facebook_url,
    fingerprint,
    user_agent: navigator.userAgent,
  });
  if (result?.success) {
    localStorage.setItem("masco_vote_officiel_done", mascotte?.slug || "1");
  }
  return result;
}
