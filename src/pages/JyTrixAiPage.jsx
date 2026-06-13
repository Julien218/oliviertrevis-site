import { useState } from "react";

const OFFRES = [
  {
    id: "annuel",
    label: "Forfait Annuel",
    prix: 4500,
    desc: "12 mois de diffusion continue",
    badge: "Meilleure valeur",
    details: "Diffusion 6j/7 · 9h00–19h30 · toutes les 2 min"
  },
  {
    id: "mensuel",
    label: "Forfait Mensuel",
    prix: 450,
    desc: "1 mois de diffusion",
    badge: null,
    details: "Diffusion 6j/7 · 9h00–19h30 · toutes les 2 min"
  },
  {
    id: "festival",
    label: "Semaine Dour Festival",
    prix: 500,
    desc: "Visibilité maximale pendant le festival",
    badge: "Haute visibilité",
    details: "Semaine festival · diffusion intensive · 6j/7"
  }
];

// Palette extraite du flyer JY-Trix.AI — build v2 2026-06-11
const NAVY    = "#0A1628";
const NAVY2   = "#0D1E38";
const NAVY3   = "#1A2F4A";
const CYAN    = "#00B4D8";
const CYAN2   = "#48CAE4";
const GOLD    = "#D4AF37";
const WHITE   = "#FFFFFF";
const GRAY    = "#A0B0C0";

export default function JyTrixAiPage() {
  const [step, setStep] = useState(1);
  const [offre, setOffre] = useState(null);
  const [form, setForm] = useState({
    nom: "", societe: "", email: "", telephone: "",
    adresse: "", bce: "", message: "", date_debut: ""
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(
        "https://app.base44.com/api/apps/6a0371a87c9257126b051d5a/functions/devisPublicitaire",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            offre: offre?.id,
            offre_label: offre?.label,
            prix_htva: offre?.prix,
            context: "jytrixai",
            notif_emails: ["oliviertrevis@outlook.be", "coronadoyanis16.01@gmail.com"]
          })
        }
      );
      setSent(true);
    } catch {
      setSent(true);
    }
    setLoading(false);
  };

  const inputStyle = {
    width: "100%", background: "#060E1A", border: `1px solid ${NAVY3}`,
    borderRadius: 8, padding: "11px 14px", color: WHITE, fontSize: 14,
    boxSizing: "border-box", outline: "none", color: "#E0EAF4"
  };
  const labelStyle = { display: "block", color: GRAY, fontSize: 13, marginBottom: 6, fontWeight: 600 };

  return (
    <div style={{ minHeight: "100vh", background: NAVY, color: WHITE, fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

      {/* ── HEADER ─────────────────────────────────────────── */}
      <header style={{
        background: `linear-gradient(135deg, #060E1A 0%, ${NAVY2} 100%)`,
        borderBottom: `2px solid ${CYAN}`,
        padding: "14px 32px",
        display: "flex", alignItems: "center", gap: 16
      }}>
        {/* Logo JY */}
        <div style={{
          width: 46, height: 46, borderRadius: 8,
          background: `linear-gradient(135deg, ${CYAN} 0%, #0077A8 100%)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 900, fontSize: 16, color: WHITE, flexShrink: 0,
          boxShadow: `0 0 12px ${CYAN}66`
        }}>JY</div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 18, color: CYAN, letterSpacing: 0.5 }}>JY-Trix.<span style={{ color: WHITE }}>AI</span></div>
          <div style={{ fontSize: 11, color: GRAY }}>Espaces Publicitaires · Écran LED · Dour</div>
        </div>
        <div style={{ marginLeft: "auto", textAlign: "right" }}>
          <a href="tel:0494119090" style={{ display: "block", color: CYAN, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>
            📞 0494 11 90 90
          </a>
          <a href="mailto:info@jsinnovia.com" style={{ color: GRAY, fontSize: 12, textDecoration: "none" }}>
            info@jsinnovia.com
          </a>
        </div>
      </header>

      {sent ? (
        /* ── CONFIRMATION ──────────────────────────────────── */
        <div style={{ maxWidth: 580, margin: "70px auto", textAlign: "center", padding: "0 24px" }}>
          <div style={{ fontSize: 60, marginBottom: 20 }}>✅</div>
          <h2 style={{ color: CYAN, fontSize: 26, marginBottom: 14 }}>Demande envoyée !</h2>
          <p style={{ color: "#C0D4E8", lineHeight: 1.7, marginBottom: 10 }}>
            Merci <strong style={{ color: WHITE }}>{form.nom}</strong> pour votre intérêt.
          </p>
          <p style={{ color: "#C0D4E8", lineHeight: 1.7, marginBottom: 22 }}>
            Vous recevrez votre <strong style={{ color: CYAN }}>devis personnalisé dans les plus brefs délais</strong>{" "}
            à <strong style={{ color: WHITE }}>{form.email}</strong>.
          </p>
          <div style={{ padding: "18px 22px", background: NAVY2, borderRadius: 12, border: `1px solid ${CYAN}`, textAlign: "left", marginBottom: 20 }}>
            <div style={{ fontWeight: 700, color: CYAN, marginBottom: 10 }}>📋 Récapitulatif</div>
            <div style={{ color: "#C0D4E8", fontSize: 14, marginBottom: 4 }}>Offre : <strong style={{ color: WHITE }}>{offre?.label}</strong></div>
            <div style={{ color: "#C0D4E8", fontSize: 14, marginBottom: 4 }}>Tarif : <strong style={{ color: WHITE }}>{offre?.prix.toLocaleString("fr-BE")} € HTVA</strong></div>
            <div style={{ color: "#C0D4E8", fontSize: 14 }}>Date souhaitée : <strong style={{ color: WHITE }}>{form.date_debut || "À confirmer"}</strong></div>
          </div>
          <div style={{ padding: "14px 18px", background: "#060E1A", borderRadius: 10, border: `1px solid ${NAVY3}` }}>
            <div style={{ color: GRAY, fontSize: 13, marginBottom: 6 }}>Une question ? Contactez-nous :</div>
            <a href="tel:0494119090" style={{ display: "block", color: CYAN, fontWeight: 700, fontSize: 16, textDecoration: "none" }}>📞 0494 11 90 90</a>
            <div style={{ color: GRAY, fontSize: 13, marginTop: 4 }}>info@jsinnovia.com</div>
          </div>
        </div>
      ) : (
        <div style={{ maxWidth: 940, margin: "0 auto", padding: "0 20px 60px" }}>

          {/* ── FLYER HERO ──────────────────────────────────── */}
          <div style={{ margin: "32px 0", borderRadius: 16, overflow: "hidden", border: `2px solid ${CYAN}33`, boxShadow: `0 8px 40px ${CYAN}22` }}>
            <img
              src="/flyer_jytrixai.jpg"
              alt="JY-Trix.AI — Votre entreprise mérite d'être vue"
              style={{ width: "100%", display: "block", maxHeight: 520, objectFit: "cover", objectPosition: "top" }}
            />
          </div>

          {/* ── ACCROCHE ────────────────────────────────────── */}
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div style={{
              display: "inline-block", background: `${CYAN}22`, color: CYAN,
              borderRadius: 999, padding: "6px 20px", fontSize: 13, fontWeight: 600,
              marginBottom: 16, border: `1px solid ${CYAN}66`
            }}>
              📺 Écran géant · Espace C · Au cœur de Dour
            </div>
            <h1 style={{ fontSize: 32, fontWeight: 900, color: WHITE, marginBottom: 10, lineHeight: 1.2 }}>
              +300 passages par jour.<br />
              <span style={{ color: CYAN }}>Votre pub vue par toute la ville.</span>
            </h1>
            <p style={{ color: GRAY, fontSize: 15, maxWidth: 540, margin: "0 auto 18px" }}>
              Commerçants, indépendants, entreprises, associations — réservez votre espace et recevez votre devis rapidement.
            </p>
            <div style={{ display: "inline-flex", gap: 24, alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
              <a href="tel:0494119090" style={{ color: CYAN, fontWeight: 700, textDecoration: "none", fontSize: 15 }}>📞 0494 11 90 90</a>
              <span style={{ color: NAVY3 }}>|</span>
              <a href="mailto:info@jsinnovia.com" style={{ color: GRAY, textDecoration: "none", fontSize: 14 }}>info@jsinnovia.com</a>
            </div>
          </div>

          {/* ── ÉTAPES ──────────────────────────────────────── */}
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 36, flexWrap: "wrap" }}>
            {["Choisir l'offre", "Vos coordonnées", "Confirmation"].map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%",
                  background: step > i + 1 ? CYAN : step === i + 1 ? CYAN : NAVY2,
                  color: step >= i + 1 ? NAVY : GRAY,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 700, fontSize: 13,
                  border: `2px solid ${step >= i + 1 ? CYAN : NAVY3}`,
                  boxShadow: step === i + 1 ? `0 0 10px ${CYAN}88` : "none"
                }}>
                  {step > i + 1 ? "✓" : i + 1}
                </div>
                <span style={{ fontSize: 13, color: step === i + 1 ? CYAN : GRAY }}>{s}</span>
                {i < 2 && <div style={{ width: 28, height: 1, background: NAVY3 }} />}
              </div>
            ))}
          </div>

          {/* ── ÉTAPE 1 — OFFRES ────────────────────────────── */}
          {step === 1 && (
            <>
              <h2 style={{ color: WHITE, textAlign: "center", marginBottom: 22, fontSize: 20 }}>Choisissez votre formule</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 18, marginBottom: 30 }}>
                {OFFRES.map(o => (
                  <div
                    key={o.id}
                    onClick={() => setOffre(o)}
                    style={{
                      background: offre?.id === o.id
                        ? `linear-gradient(135deg, ${CYAN}22 0%, ${NAVY2} 100%)`
                        : NAVY2,
                      border: `2px solid ${offre?.id === o.id ? CYAN : NAVY3}`,
                      borderRadius: 14, padding: "22px 18px", cursor: "pointer",
                      transition: "all 0.2s", position: "relative",
                      boxShadow: offre?.id === o.id ? `0 4px 20px ${CYAN}33` : "none"
                    }}
                  >
                    {o.badge && (
                      <div style={{
                        position: "absolute", top: -10, right: 14,
                        background: CYAN, color: NAVY, fontSize: 10,
                        fontWeight: 800, padding: "3px 10px", borderRadius: 999
                      }}>{o.badge}</div>
                    )}
                    <div style={{ fontSize: 30, fontWeight: 900, color: CYAN, marginBottom: 2 }}>
                      {o.prix.toLocaleString("fr-BE")} €
                    </div>
                    <div style={{ fontSize: 10, color: GRAY, marginBottom: 10 }}>HTVA</div>
                    <div style={{ fontWeight: 700, color: WHITE, fontSize: 15, marginBottom: 5 }}>{o.label}</div>
                    <div style={{ color: GRAY, fontSize: 13, marginBottom: 8 }}>{o.desc}</div>
                    <div style={{ color: "#6A8AA0", fontSize: 11 }}>{o.details}</div>
                    {offre?.id === o.id && (
                      <div style={{ marginTop: 10, color: CYAN, fontWeight: 700, fontSize: 12 }}>✓ Sélectionnée</div>
                    )}
                  </div>
                ))}
              </div>

              {/* SPECS */}
              <div style={{ background: NAVY2, border: `1px solid ${NAVY3}`, borderRadius: 12, padding: "18px 22px", marginBottom: 28 }}>
                <h3 style={{ color: CYAN, marginBottom: 14, fontSize: 14, fontWeight: 700 }}>📋 Caractéristiques de l'écran</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {[
                    ["📍 Localisation", "Espace C — Rue de la Corderie, 19 — 7370 Dour"],
                    ["📐 Dimensions", "4 mètres × 2 mètres (Full HD)"],
                    ["⏱ Fréquence", "+300 passages / jour · toutes les 2 min"],
                    ["⌛ Durée passage", "5 secondes par annonce"],
                    ["📅 Jours", "Lundi au Samedi (6j/7)"],
                    ["🕐 Horaires", "9h00 → 19h30"],
                  ].map(([k, v]) => (
                    <div key={k} style={{ borderLeft: `3px solid ${CYAN}`, paddingLeft: 10 }}>
                      <div style={{ fontWeight: 700, color: WHITE, fontSize: 12 }}>{k}</div>
                      <div style={{ color: GRAY, fontSize: 11 }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CIBLES */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 28 }}>
                {[
                  { icon: "🏪", label: "Commerçants" },
                  { icon: "👤", label: "Indépendants" },
                  { icon: "🏢", label: "Entreprises" },
                  { icon: "🤝", label: "Associations" },
                ].map(t => (
                  <div key={t.label} style={{
                    background: NAVY2, border: `1px solid ${NAVY3}`, borderRadius: 10,
                    padding: "14px 8px", textAlign: "center"
                  }}>
                    <div style={{ fontSize: 26, marginBottom: 6 }}>{t.icon}</div>
                    <div style={{ color: WHITE, fontSize: 12, fontWeight: 600 }}>{t.label}</div>
                  </div>
                ))}
              </div>

              {/* PAIEMENT */}
              <div style={{ background: NAVY2, border: `1px solid ${NAVY3}`, borderRadius: 12, padding: "18px 22px", marginBottom: 28 }}>
                <h3 style={{ color: CYAN, marginBottom: 12, fontSize: 14, fontWeight: 700 }}>💳 Modalités de paiement</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div style={{ borderLeft: `3px solid ${CYAN}`, paddingLeft: 10 }}>
                    <div style={{ fontWeight: 700, color: WHITE, fontSize: 12 }}>🔗 Lien de paiement sécurisé</div>
                    <div style={{ color: GRAY, fontSize: 11 }}>Transmis avec le devis — paiement rapide en ligne</div>
                  </div>
                  <div style={{ borderLeft: `3px solid ${CYAN}`, paddingLeft: 10 }}>
                    <div style={{ fontWeight: 700, color: WHITE, fontSize: 12 }}>🏦 Virement bancaire</div>
                    <div style={{ color: GRAY, fontSize: 11 }}>IBAN communiqué par Olivier Trevis à la signature</div>
                  </div>
                </div>
                <div style={{ marginTop: 10, color: "#5A7A8A", fontSize: 11 }}>
                  ⚠️ Paiement intégral par anticipation avant le début des diffusions.
                </div>
              </div>

              <div style={{ textAlign: "center" }}>
                <button
                  disabled={!offre}
                  onClick={() => setStep(2)}
                  style={{
                    background: offre ? `linear-gradient(135deg, ${CYAN} 0%, #0077A8 100%)` : NAVY3,
                    color: offre ? NAVY : GRAY,
                    border: "none", borderRadius: 10, padding: "14px 42px",
                    fontWeight: 800, fontSize: 16, cursor: offre ? "pointer" : "not-allowed",
                    transition: "all 0.2s",
                    boxShadow: offre ? `0 4px 20px ${CYAN}66` : "none"
                  }}
                >
                  {offre ? `Demander mon devis — ${offre.label}` : "Sélectionnez une offre"}
                </button>
                <p style={{ color: "#4A6A7A", fontSize: 12, marginTop: 10 }}>
                  ✉️ Devis reçu par email sous peu
                </p>
              </div>
            </>
          )}

          {/* ── ÉTAPE 2 — FORMULAIRE ────────────────────────── */}
          {step === 2 && (
            <form onSubmit={handleSubmit}>
              <div style={{ background: NAVY2, border: `1px solid ${CYAN}66`, borderRadius: 16, padding: 26, marginBottom: 22 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
                  <h2 style={{ color: WHITE, fontSize: 19, margin: 0 }}>Vos coordonnées</h2>
                  <div style={{
                    background: `${CYAN}22`, color: CYAN, borderRadius: 8,
                    padding: "6px 14px", fontSize: 13, fontWeight: 700,
                    border: `1px solid ${CYAN}66`
                  }}>
                    {offre?.label} — {offre?.prix.toLocaleString("fr-BE")} € HTVA
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  {[
                    { name: "nom",        label: "Nom & Prénom *",             type: "text",  required: true,  full: false },
                    { name: "societe",    label: "Société / Enseigne",         type: "text",  required: false, full: false },
                    { name: "email",      label: "Email *",                    type: "email", required: true,  full: false },
                    { name: "telephone",  label: "Téléphone *",               type: "tel",   required: true,  full: false },
                    { name: "adresse",    label: "Adresse complète",           type: "text",  required: false, full: true  },
                    { name: "bce",        label: "BCE / TVA (si société)",     type: "text",  required: false, full: false },
                    { name: "date_debut", label: "Date de début souhaitée *",  type: "date",  required: true,  full: false },
                  ].map(f => (
                    <div key={f.name} style={{ gridColumn: f.full ? "1/-1" : "auto" }}>
                      <label style={labelStyle}>{f.label}</label>
                      <input type={f.type} name={f.name} value={form[f.name]}
                        onChange={handleChange} required={f.required} style={inputStyle} />
                    </div>
                  ))}
                  <div style={{ gridColumn: "1/-1" }}>
                    <label style={labelStyle}>Message / Remarques</label>
                    <textarea name="message" value={form.message} onChange={handleChange} rows={3}
                      placeholder="Décrivez votre projet publicitaire, vos objectifs..."
                      style={{ ...inputStyle, resize: "vertical" }} />
                  </div>
                </div>
                <div style={{ marginTop: 14, padding: "10px 14px", background: "#060E1A", borderRadius: 8, border: `1px solid ${NAVY3}` }}>
                  <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", color: "#5A7A8A", fontSize: 12 }}>
                    <input type="checkbox" required style={{ marginTop: 2 }} />
                    J'accepte que mes données soient utilisées dans le cadre de ma demande de devis. Conformément au RGPD, je dispose d'un droit d'accès et de suppression de mes données.
                  </label>
                </div>
              </div>
              <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                <button type="button" onClick={() => setStep(1)}
                  style={{ background: "transparent", color: GRAY, border: `1px solid ${NAVY3}`, borderRadius: 10, padding: "12px 26px", cursor: "pointer", fontWeight: 600 }}>
                  ← Retour
                </button>
                <button type="submit" disabled={loading}
                  style={{
                    background: loading ? NAVY3 : `linear-gradient(135deg, ${CYAN} 0%, #0077A8 100%)`,
                    color: loading ? GRAY : NAVY, border: "none", borderRadius: 10,
                    padding: "13px 38px", fontWeight: 800, fontSize: 15,
                    cursor: loading ? "wait" : "pointer",
                    boxShadow: loading ? "none" : `0 4px 18px ${CYAN}55`
                  }}>
                  {loading ? "Envoi en cours..." : "📨 Envoyer ma demande de devis"}
                </button>
              </div>
              <p style={{ textAlign: "center", color: "#4A6A7A", fontSize: 12, marginTop: 10 }}>
                ✉️ Devis personnalisé reçu par email
              </p>
            </form>
          )}
        </div>
      )}

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer style={{ borderTop: `1px solid ${NAVY3}`, padding: "18px 32px", textAlign: "center" }}>
        <p style={{ color: "#3A5A6A", fontSize: 12, lineHeight: 1.8 }}>
          Écran LED — Olivier Trevis · BCE 0792.067.059 · Espace C, Rue de la Corderie, 19 — 7370 Dour<br />
          <a href="tel:0494119090" style={{ color: "#4A7A8A", textDecoration: "none" }}>📞 0494 11 90 90</a>{" · "}
          <a href="mailto:info@jsinnovia.com" style={{ color: "#4A7A8A", textDecoration: "none" }}>info@jsinnovia.com</a><br />
          Conception digitale :{" "}
          <a href="https://www.jsinnovia.com" style={{ color: CYAN, textDecoration: "none" }}>JS-Innov.IA</a>{" "}—{" "}
          <a href="https://www.jytrix.ai" style={{ color: CYAN, textDecoration: "none" }}>JY-Trix.AI</a>
        </p>
      </footer>
    </div>
  );
}
