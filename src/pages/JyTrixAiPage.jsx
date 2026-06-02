import { useState } from "react";
import { motion } from "framer-motion";

const purple      = "#7C3AED";
const purpleLight = "#A78BFA";
const purpleDark  = "#5B21B6";
const cyan        = "#06B6D4";
const dark        = "#050813";
const dark2       = "#0A0F1E";

const SERVICES = [
  { icon: "⚡", titre: "Automatisation Pro", desc: "Workflows intelligents qui travaillent à votre place 24h/24, 7j/7." },
  { icon: "🎯", titre: "Marketing IA", desc: "Campagnes ciblées et personnalisées grâce à l'intelligence artificielle." },
  { icon: "🔗", titre: "Intégrations sur mesure", desc: "Connectez tous vos outils métier en un écosystème cohérent et puissant." },
  { icon: "🚀", titre: "Croissance accélérée", desc: "Stratégies data-driven pour propulser votre business au niveau supérieur." },
];

export default function JyTrixAiPage() {
  const [form, setForm] = useState({ prenom: "", nom: "", email: "", telephone: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/functions/saveMascotteReponse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _type: "jytrixai_lead",
          prenom: form.prenom, nom: form.nom,
          email: form.email, telephone: form.telephone,
          reponse_libre: form.message,
          consentement_rgpd: true, profil: "lead_jytrixai",
        }),
      });
      if (res.ok) setSent(true);
      else setError("Une erreur est survenue. Veuillez réessayer.");
    } catch { setError("Connexion impossible. Veuillez réessayer."); }
    setSending(false);
  };

  return (
    <div style={{ fontFamily: "'Montserrat', sans-serif", background: dark, color: "#fff", minHeight: "100vh", overflowX: "hidden" }}>
      <section style={{ minHeight: "85vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "80px 6% 60px", background: `radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.2) 0%, transparent 70%), ${dark}` }}>
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} style={{ marginBottom: 32 }}>
          <div style={{ width: 100, height: 100, borderRadius: "50%", background: `linear-gradient(135deg, ${purpleDark}, ${purple}, ${cyan})`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 60px rgba(124,58,237,0.5)`, margin: "0 auto", fontSize: "3rem" }}>⚡</div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
          <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: purpleLight, marginBottom: 14 }}>Innovation · Technologie · Performance</p>
          <h1 style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)", fontWeight: 900, textTransform: "uppercase", lineHeight: 1.05, marginBottom: 10 }}>JY-Trix<span style={{ color: purpleLight }}>.Ai</span></h1>
          <p style={{ fontSize: "clamp(1rem, 2.5vw, 1.35rem)", color: "rgba(255,255,255,0.6)", maxWidth: 560, margin: "0 auto 36px", lineHeight: 1.7 }}>Solutions IA innovantes pour propulser votre entreprise. Automatisation, marketing et croissance digitale à Saint-Ghislain et en Belgique.</p>
          <a href="#contact" style={{ display: "inline-block", padding: "15px 38px", background: `linear-gradient(135deg, ${purpleDark}, ${purple})`, color: "#fff", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", fontSize: "0.85rem", borderRadius: 50, textDecoration: "none", boxShadow: `0 6px 30px rgba(124,58,237,0.45)` }}>Démarrer mon projet →</a>
        </motion.div>
      </section>

      <section style={{ padding: "70px 6%", background: dark2, borderTop: `1px solid rgba(124,58,237,0.2)` }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: purpleLight, marginBottom: 10 }}>Nos services</p>
          <h2 style={{ fontSize: "clamp(1.4rem, 3.5vw, 2.2rem)", fontWeight: 800, textTransform: "uppercase" }}>Ce que <span style={{ color: purpleLight }}>JY-Trix.Ai</span> fait pour vous</h2>
          <div style={{ width: 55, height: 3, background: `linear-gradient(90deg, ${purpleDark}, ${cyan})`, margin: "14px auto 0", borderRadius: 2 }} />
        </motion.div>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 22 }}>
          {SERVICES.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }}
              style={{ background: "rgba(124,58,237,0.08)", border: `1px solid rgba(124,58,237,0.25)`, borderRadius: 16, padding: "30px 24px", textAlign: "center" }}>
              <div style={{ fontSize: "2.2rem", marginBottom: 14 }}>{s.icon}</div>
              <h3 style={{ fontSize: "1rem", fontWeight: 800, textTransform: "uppercase", color: purpleLight, marginBottom: 10 }}>{s.titre}</h3>
              <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="contact" style={{ padding: "70px 6%", background: dark }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} style={{ maxWidth: 620, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: purpleLight, marginBottom: 10 }}>Contact</p>
            <h2 style={{ fontSize: "clamp(1.4rem, 3.5vw, 2.2rem)", fontWeight: 800, textTransform: "uppercase" }}>Parlons de votre <span style={{ color: purpleLight }}>projet</span></h2>
            <div style={{ width: 55, height: 3, background: `linear-gradient(90deg, ${purpleDark}, ${cyan})`, margin: "14px auto 0", borderRadius: 2 }} />
          </div>
          {sent ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: "center", padding: "50px 30px", background: "rgba(124,58,237,0.08)", border: `1px solid ${purple}`, borderRadius: 20 }}>
              <div style={{ fontSize: "3rem", marginBottom: 16 }}>✅</div>
              <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: purpleLight, marginBottom: 10 }}>Demande envoyée !</h3>
              <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>Merci ! Yanis vous contactera très prochainement.<br /><strong style={{ color: purpleLight }}>+32 489 75 69 27</strong></p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
                {[["prenom", "Prénom *"], ["nom", "Nom *"]].map(([name, label]) => (
                  <div key={name}>
                    <label style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.45)", display: "block", marginBottom: 7 }}>{label}</label>
                    <input name={name} value={form[name]} onChange={handleChange} required style={{ width: "100%", padding: "13px 16px", background: "rgba(255,255,255,0.05)", border: `1px solid rgba(124,58,237,0.3)`, borderRadius: 10, color: "#fff", fontSize: "0.95rem", boxSizing: "border-box" }} />
                  </div>
                ))}
              </div>
              {[["email", "Email *", "email"], ["telephone", "Téléphone", "tel"]].map(([name, label, type]) => (
                <div key={name}>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.45)", display: "block", marginBottom: 7 }}>{label}</label>
                  <input name={name} type={type} value={form[name]} onChange={handleChange} required={name === "email"} style={{ width: "100%", padding: "13px 16px", background: "rgba(255,255,255,0.05)", border: `1px solid rgba(124,58,237,0.3)`, borderRadius: 10, color: "#fff", fontSize: "0.95rem", boxSizing: "border-box" }} />
                </div>
              ))}
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.45)", display: "block", marginBottom: 7 }}>Votre projet *</label>
                <textarea name="message" value={form.message} onChange={handleChange} required rows={4} placeholder="Décrivez votre besoin..." style={{ width: "100%", padding: "13px 16px", background: "rgba(255,255,255,0.05)", border: `1px solid rgba(124,58,237,0.3)`, borderRadius: 10, color: "#fff", fontSize: "0.95rem", resize: "vertical", boxSizing: "border-box" }} />
              </div>
              {error && <p style={{ color: "#ff6b6b", fontSize: "0.85rem" }}>{error}</p>}
              <motion.button type="submit" disabled={sending} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                style={{ padding: "16px 36px", background: sending ? "rgba(124,58,237,0.4)" : `linear-gradient(135deg, ${purpleDark}, ${purple})`, color: "#fff", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", fontSize: "0.9rem", border: "none", borderRadius: 50, cursor: sending ? "not-allowed" : "pointer", boxShadow: `0 6px 30px rgba(124,58,237,0.4)` }}>
                {sending ? "Envoi en cours..." : "Envoyer ma demande →"}
              </motion.button>
              <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.3)", textAlign: "center" }}>Vos données sont utilisées uniquement pour vous recontacter. Aucun spam.</p>
            </form>
          )}
        </motion.div>
      </section>

      <footer style={{ background: "#020509", borderTop: `1px solid rgba(124,58,237,0.15)`, padding: "28px 6%", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg, ${purpleDark}, ${cyan})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>⚡</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: "0.95rem", color: purpleLight }}>JY-Trix.Ai</div>
            <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Innovation · Technologie · Performance</div>
          </div>
        </div>
        <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.3)" }}>+32 489 75 69 27 · Saint-Ghislain · <a href="https://www.jytrixai.com" style={{ color: purpleLight, textDecoration: "none" }}>www.jytrixai.com</a></div>
      </footer>
    </div>
  );
}
