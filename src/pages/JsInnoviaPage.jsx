import { useState } from "react";
import { motion } from "framer-motion";

const gold     = "#D4A843";
const goldDark = "#A67C20";
const navy     = "#0A1628";
const navy2    = "#0D1F3C";

const SERVICES = [
  { icon: "🤖", titre: "Automatisation IA", desc: "Automatisez vos tâches répétitives et gagnez du temps grâce à l'intelligence artificielle." },
  { icon: "📊", titre: "Analyse & Données", desc: "Transformez vos données en décisions stratégiques avec nos dashboards intelligents." },
  { icon: "🌐", titre: "Présence digitale", desc: "Sites web, landing pages et outils digitaux sur mesure pour votre entreprise." },
  { icon: "💬", titre: "Agents IA personnalisés", desc: "Des assistants IA dédiés à votre activité, disponibles 24h/24." },
];

export default function JsInnoviaPage() {
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
          _type: "jsinnovia_lead",
          prenom: form.prenom,
          nom: form.nom,
          email: form.email,
          telephone: form.telephone,
          reponse_libre: form.message,
          consentement_rgpd: true,
          profil: "lead_jsinnovia",
        }),
      });
      if (res.ok) setSent(true);
      else setError("Une erreur est survenue. Veuillez réessayer.");
    } catch {
      setError("Connexion impossible. Veuillez réessayer.");
    }
    setSending(false);
  };

  return (
    <div style={{ fontFamily: "'Montserrat', sans-serif", background: navy, color: "#fff", minHeight: "100vh", overflowX: "hidden" }}>
      {/* HERO */}
      <section style={{
        minHeight: "85vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
        textAlign: "center", padding: "80px 6% 60px",
        background: `radial-gradient(ellipse at 50% 0%, rgba(212,168,67,0.15) 0%, transparent 70%), ${navy}`,
      }}>
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} style={{ marginBottom: 32 }}>
          <div style={{ width: 100, height: 100, borderRadius: "50%", background: `linear-gradient(135deg, ${goldDark}, ${gold})`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 60px rgba(212,168,67,0.4)`, margin: "0 auto", fontSize: "3rem" }}>🦅</div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
          <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: gold, marginBottom: 14 }}>Intelligence Artificielle · Amplifiée par l'Humain</p>
          <h1 style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)", fontWeight: 900, textTransform: "uppercase", lineHeight: 1.05, marginBottom: 10 }}>JS-Innov<span style={{ color: gold }}>.IA</span></h1>
          <p style={{ fontSize: "clamp(1rem, 2.5vw, 1.35rem)", color: "rgba(255,255,255,0.65)", maxWidth: 560, margin: "0 auto 36px", lineHeight: 1.7 }}>Votre partenaire IA pour automatiser, innover et développer votre activité à Dour et en Belgique.</p>
          <a href="#contact" style={{ display: "inline-block", padding: "15px 38px", background: `linear-gradient(135deg, ${goldDark}, ${gold})`, color: "#000", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", fontSize: "0.85rem", borderRadius: 50, textDecoration: "none", boxShadow: `0 6px 30px rgba(212,168,67,0.4)` }}>Prendre contact →</a>
        </motion.div>
      </section>

      {/* SERVICES */}
      <section style={{ padding: "70px 6%", background: navy2, borderTop: `1px solid rgba(212,168,67,0.15)` }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: gold, marginBottom: 10 }}>Nos services</p>
          <h2 style={{ fontSize: "clamp(1.4rem, 3.5vw, 2.2rem)", fontWeight: 800, textTransform: "uppercase" }}>Ce que nous faisons <span style={{ color: gold }}>pour vous</span></h2>
          <div style={{ width: 55, height: 3, background: `linear-gradient(90deg, ${goldDark}, ${gold})`, margin: "14px auto 0", borderRadius: 2 }} />
        </motion.div>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 22 }}>
          {SERVICES.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }}
              style={{ background: "rgba(212,168,67,0.06)", border: `1px solid rgba(212,168,67,0.2)`, borderRadius: 16, padding: "30px 24px", textAlign: "center" }}>
              <div style={{ fontSize: "2.2rem", marginBottom: 14 }}>{s.icon}</div>
              <h3 style={{ fontSize: "1rem", fontWeight: 800, textTransform: "uppercase", color: gold, marginBottom: 10 }}>{s.titre}</h3>
              <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FORMULAIRE */}
      <section id="contact" style={{ padding: "70px 6%", background: navy }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} style={{ maxWidth: 620, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: gold, marginBottom: 10 }}>Contactez-nous</p>
            <h2 style={{ fontSize: "clamp(1.4rem, 3.5vw, 2.2rem)", fontWeight: 800, textTransform: "uppercase" }}>Démarrons votre <span style={{ color: gold }}>projet IA</span></h2>
            <div style={{ width: 55, height: 3, background: `linear-gradient(90deg, ${goldDark}, ${gold})`, margin: "14px auto 0", borderRadius: 2 }} />
          </div>
          {sent ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: "center", padding: "50px 30px", background: "rgba(212,168,67,0.08)", border: `1px solid ${gold}`, borderRadius: 20 }}>
              <div style={{ fontSize: "3rem", marginBottom: 16 }}>✅</div>
              <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: gold, marginBottom: 10 }}>Message envoyé !</h3>
              <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>Merci ! Julien vous contactera dans les 24h.<br /><strong style={{ color: gold }}>contact@jsinnovia.com · +32 494 11 90 90</strong></p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
                {[["prenom", "Prénom *"], ["nom", "Nom *"]].map(([name, label]) => (
                  <div key={name}>
                    <label style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.5)", display: "block", marginBottom: 7 }}>{label}</label>
                    <input name={name} value={form[name]} onChange={handleChange} required style={{ width: "100%", padding: "13px 16px", background: "rgba(255,255,255,0.06)", border: `1px solid rgba(212,168,67,0.25)`, borderRadius: 10, color: "#fff", fontSize: "0.95rem", boxSizing: "border-box" }} />
                  </div>
                ))}
              </div>
              {[["email", "Email *", "email"], ["telephone", "Téléphone", "tel"]].map(([name, label, type]) => (
                <div key={name}>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.5)", display: "block", marginBottom: 7 }}>{label}</label>
                  <input name={name} type={type} value={form[name]} onChange={handleChange} required={name === "email"} style={{ width: "100%", padding: "13px 16px", background: "rgba(255,255,255,0.06)", border: `1px solid rgba(212,168,67,0.25)`, borderRadius: 10, color: "#fff", fontSize: "0.95rem", boxSizing: "border-box" }} />
                </div>
              ))}
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.5)", display: "block", marginBottom: 7 }}>Votre projet / message *</label>
                <textarea name="message" value={form.message} onChange={handleChange} required rows={4} placeholder="Décrivez votre besoin..." style={{ width: "100%", padding: "13px 16px", background: "rgba(255,255,255,0.06)", border: `1px solid rgba(212,168,67,0.25)`, borderRadius: 10, color: "#fff", fontSize: "0.95rem", resize: "vertical", boxSizing: "border-box" }} />
              </div>
              {error && <p style={{ color: "#ff6b6b", fontSize: "0.85rem" }}>{error}</p>}
              <motion.button type="submit" disabled={sending} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                style={{ padding: "16px 36px", background: sending ? "rgba(212,168,67,0.4)" : `linear-gradient(135deg, ${goldDark}, ${gold})`, color: "#000", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", fontSize: "0.9rem", border: "none", borderRadius: 50, cursor: sending ? "not-allowed" : "pointer", boxShadow: `0 6px 30px rgba(212,168,67,0.35)` }}>
                {sending ? "Envoi en cours..." : "Envoyer ma demande →"}
              </motion.button>
              <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", textAlign: "center" }}>Vos données sont utilisées uniquement pour vous recontacter. Aucun spam.</p>
            </form>
          )}
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#050d1a", borderTop: `1px solid rgba(212,168,67,0.12)`, padding: "28px 6%", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg, ${goldDark}, ${gold})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>🦅</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: "0.95rem", color: gold }}>JS-Innov.IA</div>
            <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Intelligence Artificielle · Amplifiée par l'Humain</div>
          </div>
        </div>
        <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.35)" }}>contact@jsinnovia.com · +32 494 11 90 90 · <a href="https://www.jsinnovia.com" style={{ color: gold, textDecoration: "none" }}>www.jsinnovia.com</a></div>
      </footer>
    </div>
  );
}
