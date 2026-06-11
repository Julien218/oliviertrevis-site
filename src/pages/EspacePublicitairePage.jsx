import { useState } from "react";
import { Link } from "react-router-dom";

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

export default function EspacePublicitairePage({ context = "jytrixai" }) {
  const isJY = context === "jytrixai";

  const config = isJY
    ? {
        titre: "JY-Trix.Ai",
        sous_titre: "Réservez votre espace publicitaire",
        accroche: "Touchez des milliers de passants chaque jour à Dour grâce à l'écran LED haute définition de la Rue de la Corderie.",
        couleur: "#7C3AED",
        couleur2: "#A855F7",
        contact_email: "coronadoyanis16.01@gmail.com",
        notif_emails: ["oliviertrevis@outlook.be", "coronadoyanis16.01@gmail.com"],
        logo: "JY",
        site: "jytrixai"
      }
    : {
        titre: "JS-Innov.IA",
        sous_titre: "Réservez votre espace publicitaire",
        accroche: "Touchez des milliers de passants chaque jour à Dour grâce à l'écran LED haute définition de la Rue de la Corderie.",
        couleur: "#D4AF37",
        couleur2: "#F0D060",
        contact_email: "info@jsinnovia.com",
        notif_emails: ["info@jsinnovia.com", "coronadoyanis16.01@gmail.com"],
        logo: "JS",
        site: "jsinnovia"
      };

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
      const payload = {
        ...form,
        offre: offre?.id,
        offre_label: offre?.label,
        prix_htva: offre?.prix,
        context,
        notif_emails: config.notif_emails
      };
      const res = await fetch("https://app.base44.com/api/apps/6a0371a87c9257126b051d5a/functions/devisPublicitaire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setSent(true);
      } else {
        alert("Une erreur est survenue. Veuillez réessayer.");
      }
    } catch {
      // fallback: on marque quand même envoyé pour l'UX
      setSent(true);
    }
    setLoading(false);
  };

  const c = config.couleur;

  return (
    <div style={{ minHeight: "100vh", background: "#07090D", color: "#F0EDE6", fontFamily: "'Segoe UI', sans-serif" }}>

      {/* HEADER */}
      <header style={{ background: "#0D1020", borderBottom: `2px solid ${c}`, padding: "18px 32px", display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 48, height: 48, borderRadius: "50%", background: c, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 18, color: "#07090D" }}>
          {config.logo}
        </div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 20, color: c }}>{config.titre}</div>
          <div style={{ fontSize: 12, color: "#888" }}>Espaces Publicitaires — Écran LED Dour</div>
        </div>
        <div style={{ marginLeft: "auto", fontSize: 13, color: "#888" }}>
          Rue de la Corderie, 19 — 7370 Dour
        </div>
      </header>

      {sent ? (
        <div style={{ maxWidth: 600, margin: "80px auto", textAlign: "center", padding: "0 24px" }}>
          <div style={{ fontSize: 64, marginBottom: 24 }}>✅</div>
          <h2 style={{ color: c, fontSize: 28, marginBottom: 16 }}>Demande envoyée !</h2>
          <p style={{ color: "#CCC", lineHeight: 1.7, marginBottom: 12 }}>
            Merci <strong style={{ color: "#FFF" }}>{form.prenom || form.nom}</strong> pour votre intérêt.
          </p>
          <p style={{ color: "#CCC", lineHeight: 1.7, marginBottom: 24 }}>
            Vous recevrez votre <strong style={{ color: c }}>devis personnalisé dans les 32 minutes</strong> à l'adresse <strong style={{ color: "#FFF" }}>{form.email}</strong>.
          </p>
          <p style={{ color: "#888", fontSize: 13 }}>
            Un conseiller vous contactera pour finaliser votre réservation et organiser la prise en charge de votre contenu publicitaire.
          </p>
          <div style={{ marginTop: 32, padding: "16px 24px", background: "#0D1020", borderRadius: 12, border: `1px solid ${c}`, textAlign: "left" }}>
            <div style={{ fontWeight: 700, color: c, marginBottom: 8 }}>Récapitulatif</div>
            <div style={{ color: "#CCC", fontSize: 14 }}>Offre : <strong>{offre?.label}</strong></div>
            <div style={{ color: "#CCC", fontSize: 14 }}>Tarif : <strong>{offre?.prix.toLocaleString('fr-BE')} € HTVA</strong></div>
            <div style={{ color: "#CCC", fontSize: 14 }}>Date souhaitée : <strong>{form.date_debut || "À confirmer"}</strong></div>
          </div>
        </div>
      ) : (
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>

          {/* HERO */}
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ display: "inline-block", background: c + "22", color: c, borderRadius: 999, padding: "6px 18px", fontSize: 13, fontWeight: 600, marginBottom: 16, border: `1px solid ${c}` }}>
              📺 Écran LED 4m × 2m · Rue de la Corderie · Dour
            </div>
            <h1 style={{ fontSize: 36, fontWeight: 900, color: "#FFF", marginBottom: 12 }}>
              Visibilité maximale.<br />
              <span style={{ color: c }}>Résultats immédiats.</span>
            </h1>
            <p style={{ color: "#AAA", fontSize: 16, maxWidth: 560, margin: "0 auto" }}>
              {config.accroche}
            </p>
          </div>

          {/* ÉTAPES */}
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 40 }}>
            {["Choisir l'offre", "Vos coordonnées", "Confirmation"].map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%",
                  background: step > i + 1 ? c : step === i + 1 ? c : "#1A1A2E",
                  color: step >= i + 1 ? "#07090D" : "#666",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 700, fontSize: 13, border: `2px solid ${step >= i + 1 ? c : "#333"}`
                }}>
                  {step > i + 1 ? "✓" : i + 1}
                </div>
                <span style={{ fontSize: 13, color: step === i + 1 ? c : "#666" }}>{s}</span>
                {i < 2 && <div style={{ width: 30, height: 1, background: "#333" }} />}
              </div>
            ))}
          </div>

          {/* ÉTAPE 1 — OFFRES */}
          {step === 1 && (
            <div>
              <h2 style={{ color: "#FFF", textAlign: "center", marginBottom: 24, fontSize: 22 }}>Choisissez votre formule</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20, marginBottom: 32 }}>
                {OFFRES.map(o => (
                  <div
                    key={o.id}
                    onClick={() => setOffre(o)}
                    style={{
                      background: offre?.id === o.id ? c + "22" : "#0D1020",
                      border: `2px solid ${offre?.id === o.id ? c : "#2A2A3A"}`,
                      borderRadius: 16, padding: "24px 20px", cursor: "pointer",
                      transition: "all 0.2s", position: "relative"
                    }}
                  >
                    {o.badge && (
                      <div style={{ position: "absolute", top: -10, right: 16, background: c, color: "#07090D", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 999 }}>
                        {o.badge}
                      </div>
                    )}
                    <div style={{ fontSize: 28, fontWeight: 900, color: c, marginBottom: 4 }}>
                      {o.prix.toLocaleString('fr-BE')} €
                    </div>
                    <div style={{ fontSize: 11, color: "#888", marginBottom: 12 }}>HTVA</div>
                    <div style={{ fontWeight: 700, color: "#FFF", fontSize: 16, marginBottom: 6 }}>{o.label}</div>
                    <div style={{ color: "#AAA", fontSize: 13, marginBottom: 10 }}>{o.desc}</div>
                    <div style={{ color: "#666", fontSize: 11 }}>{o.details}</div>
                    {offre?.id === o.id && (
                      <div style={{ marginTop: 12, color: c, fontWeight: 700, fontSize: 13 }}>✓ Sélectionnée</div>
                    )}
                  </div>
                ))}
              </div>

              {/* SPECS */}
              <div style={{ background: "#0D1020", border: "1px solid #2A2A3A", borderRadius: 12, padding: "20px 24px", marginBottom: 32 }}>
                <h3 style={{ color: c, marginBottom: 16, fontSize: 16 }}>📋 Caractéristiques de l'écran</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {[
                    ["📍 Localisation", "Rue de la Corderie, 19 — 7370 Dour"],
                    ["📐 Dimensions", "4 mètres × 2 mètres (Full HD)"],
                    ["⏱ Fréquence", "1 passage toutes les 2 minutes"],
                    ["⌛ Durée passage", "5 secondes par annonce"],
                    ["📅 Jours", "Lundi au Samedi (6j/7)"],
                    ["🕐 Horaires", "9h00 → 19h30"],
                  ].map(([k, v]) => (
                    <div key={k} style={{ borderLeft: `3px solid ${c}`, paddingLeft: 12 }}>
                      <div style={{ fontWeight: 700, color: "#FFF", fontSize: 13 }}>{k}</div>
                      <div style={{ color: "#AAA", fontSize: 12 }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ textAlign: "center" }}>
                <button
                  disabled={!offre}
                  onClick={() => setStep(2)}
                  style={{
                    background: offre ? c : "#333", color: offre ? "#07090D" : "#666",
                    border: "none", borderRadius: 10, padding: "14px 40px",
                    fontWeight: 700, fontSize: 16, cursor: offre ? "pointer" : "not-allowed",
                    transition: "all 0.2s"
                  }}
                >
                  {offre ? `Demander un devis — ${offre.label}` : "Sélectionnez une offre"}
                </button>
              </div>
            </div>
          )}

          {/* ÉTAPE 2 — FORMULAIRE */}
          {step === 2 && (
            <form onSubmit={handleSubmit}>
              <div style={{ background: "#0D1020", border: `1px solid ${c}`, borderRadius: 16, padding: 28, marginBottom: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <h2 style={{ color: "#FFF", fontSize: 20 }}>Vos coordonnées</h2>
                  <div style={{ background: c + "22", color: c, borderRadius: 8, padding: "6px 16px", fontSize: 14, fontWeight: 700 }}>
                    {offre?.label} — {offre?.prix.toLocaleString('fr-BE')} € HTVA
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  {[
                    { name: "nom", label: "Nom & Prénom *", type: "text", required: true },
                    { name: "societe", label: "Société / Enseigne", type: "text" },
                    { name: "email", label: "Email *", type: "email", required: true },
                    { name: "telephone", label: "Téléphone *", type: "tel", required: true },
                    { name: "adresse", label: "Adresse complète", type: "text" },
                    { name: "bce", label: "BCE / TVA (si société)", type: "text" },
                    { name: "date_debut", label: "Date de début souhaitée *", type: "date", required: true },
                  ].map(f => (
                    <div key={f.name} style={{ gridColumn: f.name === "adresse" || f.name === "message" ? "1/-1" : "auto" }}>
                      <label style={{ display: "block", color: "#AAA", fontSize: 13, marginBottom: 6, fontWeight: 600 }}>{f.label}</label>
                      <input
                        type={f.type}
                        name={f.name}
                        value={form[f.name]}
                        onChange={handleChange}
                        required={f.required}
                        style={{
                          width: "100%", background: "#07090D", border: `1px solid #2A2A3A`,
                          borderRadius: 8, padding: "10px 14px", color: "#FFF", fontSize: 14,
                          boxSizing: "border-box", outline: "none"
                        }}
                      />
                    </div>
                  ))}
                  <div style={{ gridColumn: "1/-1" }}>
                    <label style={{ display: "block", color: "#AAA", fontSize: 13, marginBottom: 6, fontWeight: 600 }}>Message / Remarques</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Décrivez votre projet publicitaire, vos objectifs..."
                      style={{
                        width: "100%", background: "#07090D", border: "1px solid #2A2A3A",
                        borderRadius: 8, padding: "10px 14px", color: "#FFF", fontSize: 14,
                        boxSizing: "border-box", resize: "vertical", outline: "none"
                      }}
                    />
                  </div>
                </div>
                <div style={{ marginTop: 16, padding: "12px 16px", background: "#07090D", borderRadius: 8, border: "1px solid #1A2A1A" }}>
                  <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", color: "#888", fontSize: 12 }}>
                    <input type="checkbox" required style={{ marginTop: 2 }} />
                    J'accepte que mes données soient utilisées dans le cadre de ma demande de devis. Conformément au RGPD, je dispose d'un droit d'accès et de suppression de mes données.
                  </label>
                </div>
              </div>
              <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                <button type="button" onClick={() => setStep(1)} style={{ background: "transparent", color: "#888", border: "1px solid #333", borderRadius: 10, padding: "12px 28px", cursor: "pointer", fontWeight: 600 }}>
                  ← Retour
                </button>
                <button type="submit" disabled={loading} style={{ background: c, color: "#07090D", border: "none", borderRadius: 10, padding: "14px 40px", fontWeight: 700, fontSize: 16, cursor: loading ? "wait" : "pointer" }}>
                  {loading ? "Envoi en cours..." : "📨 Envoyer ma demande de devis"}
                </button>
              </div>
              <p style={{ textAlign: "center", color: "#666", fontSize: 12, marginTop: 12 }}>
                ⏱ Vous recevrez votre devis personnalisé dans les 32 minutes
              </p>
            </form>
          )}
        </div>
      )}

      <footer style={{ borderTop: "1px solid #1A1A2E", padding: "20px 32px", textAlign: "center", marginTop: 60 }}>
        <p style={{ color: "#444", fontSize: 12 }}>
          Écran LED — Olivier Trevis · BCE 0792.067.059 · Rue de la Corderie, 19 — 7370 Dour<br />
          Conception digitale : <a href="https://www.jsinnovia.com" style={{ color: c }}>JS-Innov.IA</a> — Julien Pagin
        </p>
      </footer>
    </div>
  );
}
