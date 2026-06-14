// Spirit colors per mascot
export const SPIRIT_COLORS = {
  lion:   { primary: "#FFB800", glow: "rgba(255,184,0,0.4)", bg: "rgba(255,184,0,0.08)" },
  canari: { primary: "#D4FF00", glow: "rgba(212,255,0,0.4)", bg: "rgba(212,255,0,0.08)" },
  biche:  { primary: "#00FFA3", glow: "rgba(0,255,163,0.4)", bg: "rgba(0,255,163,0.08)" },
  renard: { primary: "#FF4D00", glow: "rgba(255,77,0,0.4)",  bg: "rgba(255,77,0,0.08)"  },
  ours:   { primary: "#00CCFF", glow: "rgba(0,204,255,0.4)", bg: "rgba(0,204,255,0.08)" },
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