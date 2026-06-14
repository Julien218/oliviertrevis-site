import { useState } from "react";
import { motion } from "framer-motion";

const C = {
  bg:       "#06090F",
  bgDeep:   "#020509",
  navyCard: "rgba(10,22,40,0.85)",
  cyan:     "#00B4D8",
  gold:     "#D4AF37",
  white:    "#FFFFFF",
  silver:   "#A8B8CC",
  muted:    "rgba(168,184,204,0.55)",
};

const FLYER_URL = "/jytrix-flyer.jpg";

const fadeUp = {
  initial:    { opacity: 0, y: 28 },
  whileInView:{ opacity: 1, y: 0 },
  viewport:   { once: true },
  transition: { duration: 0.55 },
};

const STATS = [
  { value: "300+", label: "Passages / Jour",    unit: "Lectures" },
  { value: "100%", label: "Diffusion Continue", unit: "Min" },
  { value: "7j/7", label: "Disponibilité",       unit: "Véhicules" },
];

const AVANTAGES = [
  { icon: "🎯", tag: "Espace C · Dour", title: "Emplacement stratégique",
    desc: "Carrefour n°1 de Dour, passage obligé pour des milliers de personnes chaque jour.", bullet: "+300 passages/jour" },
  { icon: "📡", tag: "Disponibilité",   title: "Diffusion immédiate",
    desc: "Votre publicité tourne en continu, toute l'année, sans interruption.", bullet: "Activation rapide" },
  { icon: "🎨", tag: "Par JY-Trix.AI", title: "Création visuelle incluse",
    desc: "Notre équipe crée votre spot publicitaire sur mesure — design, animation, message. Vous n'avez rien à préparer.", bullet: "Clé en main" },
  { icon: "📈", tag: "Suivi",          title: "Résultats mesurables",
    desc: "Rapport mensuel avec vos données de diffusion réelles.", bullet: "Données réelles" },
];

export default function JyTrixAiPage() {
  const [form,    setForm]    = useState({ prenom: "", nom: "", email: "", telephone: "", entreprise: "", message: "" });
  const [sent,    setSent]    = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    const subject = encodeURIComponent("Demande de devis — Espace C Dour");
    const body    = encodeURIComponent(
      "Prénom : "    + form.prenom    + "\n" +
      "Nom : "       + form.nom       + "\n" +
      "Entreprise : "+ (form.entreprise || "—") + "\n" +
      "Email : "     + form.email     + "\n" +
      "Téléphone : " + form.telephone + "\n" +
      "Message : "   + (form.message  || "—") + "\n\n" +
      "Source : JY-Trix.AI — Espace C Dour"
    );
    window.location.href = "mailto:info@jsinnovia.com?subject=" + subject + "&body=" + body;
    setTimeout(() => { setSent(true); setSending(false); }, 800);
  };

  return (
    <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", background: C.bg, color: C.white, minHeight: "100vh", overflowX: "hidden" }}>

      {/* ══ HERO ══ */}
      <section style={{ position: "relative", minHeight: "100svh", display: "flex", flexDirection: "column", justifyContent: "flex-end", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${FLYER_URL})`, backgroundSize: "cover", backgroundPosition: "center top", filter: "brightness(0.28) saturate(1.1)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(6,9,15,0) 0%, rgba(6,9,15,0.5) 55%, rgba(6,9,15,1) 100%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, width: "70%", height: "50%", background: "radial-gradient(ellipse at bottom left, rgba(0,180,216,0.22) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 0, right: 0, width: "50%", height: "50%", background: "radial-gradient(ellipse at top right, rgba(212,175,55,0.14) 0%, transparent 65%)", pointerEvents: "none" }} />

        {/* Texte hero */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
          style={{ position: "relative", zIndex: 10, padding: "0 6% 60px" }}>
          <p style={{ fontSize: "clamp(0.62rem,2.5vw,0.72rem)", fontWeight: 700, letterSpacing: "0.30em", textTransform: "uppercase", color: C.gold, marginBottom: 14, opacity: 0.9 }}>
            ▶ Écran géant — Espace C — Dour
          </p>
          <h1 style={{ fontSize: "clamp(2rem,6.5vw,5rem)", fontWeight: 900, textTransform: "uppercase", lineHeight: 1.0, margin: "0 0 2px" }}>Votre entreprise</h1>
          <h1 style={{ fontSize: "clamp(1.8rem,6vw,4.2rem)", fontWeight: 900, textTransform: "uppercase", color: C.silver, lineHeight: 1.0, margin: "0 0 2px" }}>mérite d'être</h1>
          <h1 style={{ fontSize: "clamp(4rem,14vw,9.5rem)", fontWeight: 900, textTransform: "uppercase", color: C.cyan, lineHeight: 0.85, margin: "0 0 30px",
            textShadow: "0 0 60px rgba(0,180,216,0.35)" }}>VUE !</h1>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="#devis" style={{ display: "inline-block", padding: "14px 32px", background: "linear-gradient(135deg,#007FA0,#00B4D8)", color: "#fff",
              fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", fontSize: "clamp(0.75rem,2vw,0.85rem)",
              borderRadius: 50, textDecoration: "none", boxShadow: "0 8px 32px rgba(0,180,216,0.45)" }}>
              Demander mon devis gratuit →
            </a>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div style={{ position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)", zIndex: 10 }}
          animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
          <div style={{ width: 20, height: 20, borderRight: "2px solid #00B4D8", borderBottom: "2px solid #00B4D8", transform: "rotate(45deg)", opacity: 0.5 }} />
        </motion.div>
      </section>

      {/* ══ STATS ══ */}
      <section style={{ background: "linear-gradient(180deg,rgba(0,180,216,0.07) 0%,transparent 100%)", padding: "44px 5%", borderBottom: "1px solid rgba(0,180,216,0.12)" }}>
        <motion.div {...fadeUp} style={{ maxWidth: 860, margin: "0 auto" }}>
          <p style={{ fontSize: "clamp(0.60rem,2vw,0.65rem)", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: C.gold, marginBottom: 4 }}>La solution pub locale</p>
          <h2 style={{ fontSize: "clamp(1rem,3vw,1.7rem)", fontWeight: 900, textTransform: "uppercase", lineHeight: 1.1, margin: "0 0 22px" }}>
            Touchez vos clients <span style={{ color: C.cyan }}>au bon endroit</span>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "clamp(8px,2vw,20px)" }}>
            {STATS.map(({ value, label, unit }) => (
              <div key={label} style={{ background: C.navyCard, border: "1px solid rgba(0,180,216,0.18)", borderRadius: "clamp(10px,2vw,16px)", padding: "clamp(14px,3vw,24px) clamp(10px,2vw,20px)", textAlign: "center" }}>
                <div style={{ fontSize: "clamp(1.6rem,5vw,3rem)", fontWeight: 900, color: C.cyan, lineHeight: 1 }}>{value}</div>
                <div style={{ fontSize: "clamp(0.58rem,1.5vw,0.72rem)", fontWeight: 600, color: C.silver, marginTop: 4, lineHeight: 1.3 }}>{label}</div>
                <div style={{ fontSize: "clamp(0.50rem,1.2vw,0.60rem)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: C.gold, marginTop: 4 }}>{unit}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 18, display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(212,175,55,0.10)", border: "1px solid rgba(212,175,55,0.30)", borderRadius: 8, padding: "8px 16px" }}>
            <span style={{ fontSize: "clamp(0.60rem,1.8vw,0.68rem)", fontWeight: 700, color: C.gold, letterSpacing: "0.06em" }}>📍 Espace C, 7370 Dour — Belgique</span>
          </div>
        </motion.div>
      </section>

      {/* ══ AVANTAGES ══ */}
      <section style={{ background: C.bg, padding: "60px 5%", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <motion.div {...fadeUp} style={{ maxWidth: 860, margin: "0 auto" }}>
          <p style={{ fontSize: "clamp(0.60rem,2vw,0.65rem)", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: C.gold, marginBottom: 10 }}>Pourquoi nous choisir ?</p>
          <h2 style={{ fontSize: "clamp(1.2rem,3.5vw,2.2rem)", fontWeight: 900, textTransform: "uppercase", lineHeight: 1.15, marginBottom: "clamp(22px,4vw,36px)" }}>
            La pub locale <span style={{ color: C.cyan }}>réinventée par l'IA</span>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,280px),1fr))", gap: "clamp(12px,2.5vw,20px)" }}>
            {AVANTAGES.map(({ icon, tag, title, desc, bullet }) => (
              <motion.div key={title} {...fadeUp}
                style={{ background: C.navyCard, border: "1px solid rgba(0,180,216,0.16)", borderRadius: "clamp(12px,2vw,18px)", padding: "clamp(20px,3vw,28px)", display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ fontSize: "clamp(1.4rem,4vw,2rem)" }}>{icon}</div>
                <div style={{ display: "inline-flex", alignItems: "center", padding: "4px 10px", background: "rgba(0,180,216,0.10)", border: "1px solid rgba(0,180,216,0.22)", borderRadius: 20, width: "fit-content" }}>
                  <span style={{ fontSize: "clamp(0.55rem,1.5vw,0.62rem)", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: C.cyan }}>{tag}</span>
                </div>
                <h3 style={{ fontSize: "clamp(0.85rem,2.5vw,0.95rem)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.04em", color: C.white, margin: 0 }}>{title}</h3>
                <p style={{ fontSize: "clamp(0.78rem,2vw,0.85rem)", color: C.silver, lineHeight: 1.65, margin: 0 }}>{desc}</p>
                <div style={{ height: 1, background: "rgba(255,255,255,0.07)", margin: "4px 0" }} />
                <span style={{ fontSize: "clamp(0.70rem,2vw,0.78rem)", fontWeight: 700, color: C.gold }}>● {bullet}</span>
              </motion.div>
            ))}
          </div>
          <div style={{ marginTop: "clamp(24px,4vw,36px)", textAlign: "center" }}>
            <a href="#devis" style={{ display: "inline-block", padding: "clamp(12px,2vw,14px) clamp(28px,5vw,40px)",
              background: "linear-gradient(135deg,#007FA0,#00B4D8)", color: "#fff",
              fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", fontSize: "clamp(0.75rem,2vw,0.85rem)",
              borderRadius: 50, textDecoration: "none", boxShadow: "0 8px 28px rgba(0,180,216,0.40)" }}>
              Demander mon devis gratuit →
            </a>
          </div>
        </motion.div>
      </section>

      {/* ══ VIDÉO ══ */}
      <section style={{ background: "rgba(0,0,0,0.55)", padding: "52px 5%", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <motion.div {...fadeUp} style={{ maxWidth: 780, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: "clamp(0.60rem,2vw,0.65rem)", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: C.gold, marginBottom: 8 }}>▶ Vidéo promotionnelle</p>
          <h2 style={{ fontSize: "clamp(1.1rem,3vw,1.7rem)", fontWeight: 900, textTransform: "uppercase", lineHeight: 1.15, marginBottom: "clamp(18px,3vw,28px)" }}>
            Voyez l'écran <span style={{ color: C.cyan }}>en action</span>
          </h2>
          <div style={{ borderRadius: "clamp(12px,2vw,18px)", overflow: "hidden", border: "1px solid rgba(0,180,216,0.22)", boxShadow: "0 0 40px rgba(0,180,216,0.14)" }}>
            <video controls style={{ width: "100%", display: "block", maxHeight: "50vh" }} poster="/jytrix-flyer.jpg">
              <source src="/espace_c_video.mp4" type="video/mp4" />
              Votre navigateur ne supporte pas la vidéo.
            </video>
          </div>
        </motion.div>
      </section>

      {/* ══ DEVIS ══ */}
      <section id="devis" style={{ background: C.bg, padding: "clamp(44px,7vw,70px) 5%", borderTop: "1px solid rgba(212,175,55,0.28)" }}>
        <motion.div {...fadeUp} style={{ maxWidth: 880, margin: "0 auto" }}>
          {/* Sur mobile : colonne | Sur desktop : 2 colonnes */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,360px),1fr))", gap: "clamp(28px,5vw,52px)", alignItems: "start" }}>

            {/* Bloc contact */}
            <div>
              <p style={{ fontSize: "clamp(0.60rem,2vw,0.65rem)", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: C.gold, marginBottom: 10 }}>Contactez-nous</p>
              <h2 style={{ fontSize: "clamp(1.2rem,3vw,2rem)", fontWeight: 900, textTransform: "uppercase", marginBottom: "clamp(18px,3vw,28px)", lineHeight: 1.2 }}>
                Réservez votre<br /><span style={{ color: C.cyan }}>emplacement dès maintenant !</span>
              </h2>

              <div style={{ background: C.navyCard, border: "1px solid rgba(0,180,216,0.22)", borderRadius: 14, padding: "20px 22px", marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(0,180,216,0.12)", border: "1px solid rgba(0,180,216,0.22)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", flexShrink: 0 }}>📞</div>
                  <div>
                    <div style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: C.gold, marginBottom: 2 }}>Appelez-nous</div>
                    <a href="tel:+32494119090" style={{ fontSize: "clamp(1.2rem,4vw,1.45rem)", fontWeight: 900, color: C.white, textDecoration: "none", letterSpacing: "0.04em" }}>0494 11 90 90</a>
                  </div>
                </div>
              </div>

              <div style={{ background: C.navyCard, border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "14px 18px", marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: "1.1rem" }}>✉️</span>
                  <a href="mailto:info@jsinnovia.com" style={{ fontSize: "clamp(0.80rem,2.5vw,0.88rem)", color: C.cyan, textDecoration: "none", fontWeight: 700 }}>info@jsinnovia.com</a>
                </div>
              </div>

              <div style={{ background: C.navyCard, border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "12px 18px", marginBottom: 18 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: "1rem" }}>🖥️</span>
                  <span style={{ fontSize: "clamp(0.72rem,2vw,0.78rem)", color: C.silver }}>Corps de métier : <strong style={{ color: C.white }}>Panneaux publicitaires</strong></span>
                </div>
              </div>

              <div style={{ padding: "18px 20px", background: "linear-gradient(135deg,rgba(0,180,216,0.10),rgba(212,175,55,0.07))", border: "1px solid rgba(0,180,216,0.28)", borderRadius: 14, textAlign: "center" }}>
                <div style={{ fontSize: "1.8rem", marginBottom: 6 }}>⏱️</div>
                <p style={{ fontSize: "clamp(0.78rem,2.5vw,0.85rem)", fontWeight: 800, color: C.white, margin: "0 0 4px" }}>Votre devis personnalisé</p>
                <p style={{ fontSize: "clamp(1.1rem,3.5vw,1.3rem)", fontWeight: 900, color: C.gold, margin: "0 0 4px" }}>
                  reçu rapidement
                </p>
                <p style={{ fontSize: "clamp(0.65rem,2vw,0.72rem)", color: C.silver, margin: 0 }}>Par email — gratuit — sans engagement</p>
              </div>
            </div>

            {/* Formulaire */}
            <div>
              {sent ? (
                <div style={{ padding: "clamp(32px,6vw,48px) clamp(20px,4vw,32px)", textAlign: "center", background: C.navyCard, border: "1px solid rgba(0,180,216,0.3)", borderRadius: 18 }}>
                  <div style={{ fontSize: "3rem", marginBottom: 14 }}>✅</div>
                  <h3 style={{ fontSize: "clamp(0.95rem,3vw,1.1rem)", fontWeight: 900, textTransform: "uppercase", color: C.cyan, marginBottom: 8 }}>Demande reçue !</h3>
                  <p style={{ fontSize: "clamp(0.80rem,2.5vw,0.85rem)", color: C.white, fontWeight: 700, marginBottom: 6 }}>Votre devis vous sera envoyé par email</p>
                  <p style={{ fontSize: "clamp(1.1rem,3.5vw,1.3rem)", fontWeight: 900, color: C.gold, marginBottom: 12 }}>rapidement par email</p>
                  <p style={{ fontSize: "clamp(0.65rem,2vw,0.75rem)", color: C.silver, margin: 0 }}>Vérifiez aussi vos spams — info@jsinnovia.com</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12,
                  background: C.navyCard, border: "1px solid rgba(0,180,216,0.22)", borderRadius: 18, padding: "clamp(22px,4vw,32px) clamp(18px,4vw,28px)" }}>
                  <h3 style={{ fontSize: "clamp(0.78rem,2.5vw,0.85rem)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: C.cyan, margin: "0 0 4px" }}>
                    📧 Demande de devis gratuit
                  </h3>
                  {[
                    { name: "prenom",     label: "Prénom *",          type: "text" },
                    { name: "nom",        label: "Nom *",              type: "text" },
                    { name: "entreprise", label: "Entreprise / Asso.", type: "text" },
                    { name: "email",      label: "Email *",            type: "email" },
                    { name: "telephone",  label: "Téléphone *",        type: "tel" },
                  ].map(({ name, label, type }) => (
                    <div key={name}>
                      <label style={{ display: "block", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.silver, marginBottom: 4 }}>{label}</label>
                      <input name={name} type={type} required={label.includes("*")} value={form[name]}
                        onChange={e => setForm({ ...form, [name]: e.target.value })}
                        style={{ width: "100%", padding: "10px 13px", background: "rgba(6,9,15,0.7)", border: "1px solid rgba(0,180,216,0.20)",
                          borderRadius: 9, color: C.white, fontSize: "clamp(0.82rem,2.5vw,0.85rem)", outline: "none", boxSizing: "border-box" }}
                        onFocus={e => e.target.style.borderColor = "#00B4D8"}
                        onBlur={e => e.target.style.borderColor = "rgba(0,180,216,0.20)"} />
                    </div>
                  ))}
                  <div>
                    <label style={{ display: "block", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.silver, marginBottom: 4 }}>Message (optionnel)</label>
                    <textarea name="message" rows={3} value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      placeholder="Précisez vos besoins, votre secteur d'activité..."
                      style={{ width: "100%", padding: "10px 13px", background: "rgba(6,9,15,0.7)", border: "1px solid rgba(0,180,216,0.20)",
                        borderRadius: 9, color: C.white, fontSize: "clamp(0.80rem,2.5vw,0.83rem)", resize: "vertical", outline: "none", boxSizing: "border-box" }}
                      onFocus={e => e.target.style.borderColor = "#00B4D8"}
                      onBlur={e => e.target.style.borderColor = "rgba(0,180,216,0.20)"} />
                  </div>

                  {/* Checkbox RGPD */}
                  <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
                    <input type="checkbox" required style={{ marginTop: 3, accentColor: "#00B4D8", flexShrink: 0, width: 16, height: 16 }} />
                    <span style={{ fontSize: "clamp(0.60rem,1.8vw,0.65rem)", color: C.muted, lineHeight: 1.5 }}>
                      J'accepte que mes données soient utilisées pour répondre à ma demande de devis. Voir notre{" "}
                      <a href="#mentions" style={{ color: C.cyan, textDecoration: "underline" }}>politique de confidentialité</a>. *
                    </span>
                  </label>

                  <button type="submit" disabled={sending}
                    style={{ padding: "13px", background: sending ? "rgba(0,180,216,0.3)" : "linear-gradient(135deg,#007FA0,#00B4D8)",
                      color: "#fff", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", fontSize: "clamp(0.75rem,2vw,0.82rem)",
                      borderRadius: 50, border: "none", cursor: sending ? "wait" : "pointer",
                      boxShadow: sending ? "none" : "0 6px 24px rgba(0,180,216,0.55)" }}>
                    {sending ? "Ouverture email…" : "📧 Recevoir mon devis par email"}
                  </button>
                  <p style={{ fontSize: "0.62rem", color: C.muted, textAlign: "center", margin: 0 }}>
                    Gratuit · Sans engagement · Notre équipe vous contacte rapidement
                  </p>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ══ MENTIONS LÉGALES ══ */}
      <section id="mentions" style={{ background: "#020509", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "40px 5%" }}>
        <motion.div {...fadeUp} style={{ maxWidth: 860, margin: "0 auto" }}>
          <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: C.gold, marginBottom: 14 }}>Mentions légales & RGPD</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,260px),1fr))", gap: 20 }}>

            <div style={{ background: "rgba(10,22,40,0.6)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "18px 20px" }}>
              <p style={{ fontSize: "0.72rem", fontWeight: 800, color: C.cyan, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Éditeur du site</p>
              <p style={{ fontSize: "0.72rem", color: C.silver, lineHeight: 1.7, margin: 0 }}>
                <strong style={{ color: C.white }}>JY-Trix.AI — Espace C</strong><br />
                Raison sociale : <strong style={{ color: C.white }}>JS-Innov.IA® — Julien Pagin</strong><br />
                Adresse : Espace C, 7370 Dour, Belgique<br />
                Tél : 0494 11 90 90<br />
                Email : <a href="mailto:info@jsinnovia.com" style={{ color: C.cyan }}>info@jsinnovia.com</a>
              </p>
            </div>

            <div style={{ background: "rgba(10,22,40,0.6)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "18px 20px" }}>
              <p style={{ fontSize: "0.72rem", fontWeight: 800, color: C.cyan, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Hébergement</p>
              <p style={{ fontSize: "0.72rem", color: C.silver, lineHeight: 1.7, margin: 0 }}>
                <strong style={{ color: C.white }}>Railway (Chicago, USA)</strong><br />
                Railway Corp., 548 Market St #63337<br />
                San Francisco, CA 94104<br />
                <a href="https://railway.app" target="_blank" rel="noopener noreferrer" style={{ color: C.cyan }}>railway.app</a>
              </p>
            </div>

            <div style={{ background: "rgba(10,22,40,0.6)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "18px 20px" }}>
              <p style={{ fontSize: "0.72rem", fontWeight: 800, color: C.cyan, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Données personnelles (RGPD)</p>
              <p style={{ fontSize: "0.72rem", color: C.silver, lineHeight: 1.7, margin: 0 }}>
                Les données collectées (nom, email, téléphone) via le formulaire sont utilisées <strong style={{ color: C.white }}>uniquement</strong> pour répondre à votre demande de devis. Elles ne sont ni revendues ni transmises à des tiers.<br /><br />
                Conformément au RGPD (UE 2016/679) et à la loi belge du 30/07/2018, vous disposez d'un droit d'accès, de rectification et de suppression : <a href="mailto:info@jsinnovia.com" style={{ color: C.cyan }}>info@jsinnovia.com</a>
              </p>
            </div>

            <div style={{ background: "rgba(10,22,40,0.6)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "18px 20px" }}>
              <p style={{ fontSize: "0.72rem", fontWeight: 800, color: C.cyan, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Cookies</p>
              <p style={{ fontSize: "0.72rem", color: C.silver, lineHeight: 1.7, margin: 0 }}>
                Ce site n'utilise <strong style={{ color: C.white }}>aucun cookie tiers</strong> ni tracker publicitaire. Aucun cookie de session n'est déposé sans votre consentement explicite.<br /><br />
                Propriété intellectuelle : Tout contenu (textes, visuels, vidéo) est la propriété de JY-Trix.AI / JS-Innov.IA®. Reproduction interdite sans accord écrit.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ══ FOOTER SIGNATURE ══ */}
      <footer style={{ background: "#020509", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "clamp(36px,6vw,52px) 5% clamp(24px,4vw,32px)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>

          {/* Logos côte à côte */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "clamp(24px,5vw,40px)", marginBottom: "clamp(22px,4vw,32px)", flexWrap: "wrap" }}>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
              <div style={{ width: "clamp(56px,10vw,72px)", height: "clamp(56px,10vw,72px)", borderRadius: 18, overflow: "hidden",
                border: "1px solid rgba(0,180,216,0.30)", boxShadow: "0 0 0 4px rgba(0,180,216,0.07), 0 8px 28px rgba(0,180,216,0.18)" }}>
                <img src="/logo_jytrixai.jpg" alt="JY-Trix.AI" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "clamp(0.85rem,2.5vw,1rem)", fontWeight: 900, letterSpacing: "0.04em", lineHeight: 1 }}>
                  <span style={{ color: "#00B4D8" }}>JY-Trix</span><span style={{ color: "#D4AF37" }}>.AI</span>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.15), transparent)" }} />
              <span style={{ fontSize: "0.58rem", fontWeight: 700, color: "rgba(255,255,255,0.18)", letterSpacing: "0.20em" }}>PAR</span>
              <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.15), transparent)" }} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
              <div style={{ width: "clamp(56px,10vw,72px)", height: "clamp(56px,10vw,72px)", borderRadius: 18, overflow: "hidden",
                border: "1px solid rgba(212,175,55,0.28)", boxShadow: "0 0 0 4px rgba(212,175,55,0.06), 0 8px 28px rgba(212,175,55,0.14)" }}>
                <img src="/logo_jsinnovia.jpg" alt="JS-Innov.IA" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "clamp(0.85rem,2.5vw,1rem)", fontWeight: 900, letterSpacing: "0.04em", color: "#D4AF37", lineHeight: 1 }}>
                  JS-Innov.IA<span style={{ fontSize: "0.65em" }}>®</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ height: 1, background: "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)", marginBottom: 18 }} />

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
            <div style={{ display: "flex", gap: "clamp(12px,3vw,20px)", flexWrap: "wrap" }}>
              <a href="tel:+32494119090" style={{ fontSize: "clamp(0.65rem,2vw,0.72rem)", color: "rgba(255,255,255,0.35)", textDecoration: "none", fontWeight: 600 }}>0494 11 90 90</a>
              <a href="mailto:info@jsinnovia.com" style={{ fontSize: "clamp(0.65rem,2vw,0.72rem)", color: "rgba(255,255,255,0.35)", textDecoration: "none", fontWeight: 600 }}>info@jsinnovia.com</a>
              <a href="#mentions" style={{ fontSize: "clamp(0.65rem,2vw,0.72rem)", color: "rgba(255,255,255,0.25)", textDecoration: "none" }}>Mentions légales</a>
            </div>
            <p style={{ fontSize: "clamp(0.58rem,1.8vw,0.62rem)", color: "rgba(255,255,255,0.18)", margin: 0, letterSpacing: "0.08em" }}>
              {`© ${new Date().getFullYear()} JS-Innov.IA® — Tous droits réservés`}
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
}
