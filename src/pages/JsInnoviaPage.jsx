import { useRef, useState } from "react";
import { motion } from "framer-motion";

const VIDEO_URL  = "https://base44.app/api/apps/6a0371a87c9257126b051d5a/files/mp/public/6a0371a87c9257126b051d5a/6ce59e8d5_edde88ced_video_2210493929742265.mp4";
const HERO_BG    = "https://base44.app/api/apps/6a0371a87c9257126b051d5a/files/mp/public/6a0371a87c9257126b051d5a/0a96d15c5_espace_c_panneau.png";
const FLYER_URL  = "https://base44.app/api/apps/6a0371a87c9257126b051d5a/files/mp/public/6a0371a87c9257126b051d5a/c1cf179ef_fabiano_flyer.png";

const gold     = "#f0c040";
const goldDark = "#c8922a";
const navy     = "#0a1628";
const navy2    = "#0d1f3c";

export default function JsInnoviaPage() {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [form, setForm] = useState({ prenom: "", nom: "", email: "", telephone: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) { videoRef.current.play(); setPlaying(true); }
    else { videoRef.current.pause(); setPlaying(false); }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await fetch("/api/functions/saveMascotteReponse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, profil: "lead_jsinnovia_ecran", consentement_rgpd: true }),
      });
      setSent(true);
    } catch {}
    setSending(false);
  };

  return (
    <div style={{ fontFamily: "'Montserrat', sans-serif", background: navy, color: "#fff", minHeight: "100vh", overflowX: "hidden" }}>

      {/* ══ HERO ══ */}
      <section style={{ position: "relative", minHeight: "92vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${HERO_BG})`, backgroundSize: "cover", backgroundPosition: "center 40%", filter: "brightness(0.65)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,22,40,0.05) 0%, rgba(10,22,40,0.4) 55%, rgba(10,22,40,0.98) 100%)" }} />
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.16,1,0.3,1] }}
          style={{ position: "relative", zIndex: 10, padding: "40px 6% 60px", maxWidth: 760 }}>
          <p style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: 14 }}>
            JS-Innov.IA · Apporteur d'affaires · Espace C Dour
          </p>
          <h1 style={{ fontSize: "clamp(2.2rem, 7vw, 5rem)", fontWeight: 900, textTransform: "uppercase", lineHeight: 1.05 }}>Votre entreprise</h1>
          <h1 style={{ fontSize: "clamp(2rem, 6vw, 4.2rem)", fontWeight: 900, textTransform: "uppercase", color: gold, lineHeight: 1.05 }}>mérite d'être</h1>
          <h1 style={{ fontSize: "clamp(4rem, 13vw, 9rem)", fontWeight: 900, textTransform: "uppercase", color: gold, lineHeight: 0.88, marginBottom: 28, textShadow: `0 0 70px rgba(240,192,64,0.45)` }}>VUE !</h1>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(200,146,42,0.18)", border: `1px solid rgba(200,146,42,0.45)`, borderRadius: 30, padding: "9px 20px" }}>
              <span>📍</span><span style={{ fontSize: "0.9rem", fontWeight: 700, color: gold }}>Au cœur de Dour — Espace C</span>
            </div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(200,146,42,0.1)", border: `1px solid rgba(200,146,42,0.3)`, borderRadius: 30, padding: "9px 20px" }}>
              <span>🦅</span><span style={{ fontSize: "0.85rem", fontWeight: 700, color: "rgba(255,255,255,0.8)" }}>Via JS-Innov.IA</span>
            </div>
          </div>
          <div style={{ marginTop: 28 }}>
            <a href="#contact" style={{ display: "inline-block", padding: "14px 36px", background: `linear-gradient(135deg, ${goldDark}, ${gold})`, color: "#000", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", fontSize: "0.85rem", borderRadius: 50, textDecoration: "none", boxShadow: `0 6px 30px rgba(240,192,64,0.4)` }}>Réserver mon espace pub →</a>
          </div>
        </motion.div>
        <motion.div style={{ position: "absolute", bottom: 22, left: "50%", transform: "translateX(-50%)", zIndex: 10 }} animate={{ y: [0,8,0] }} transition={{ duration: 1.8, repeat: Infinity }}>
          <div style={{ width: 22, height: 22, borderRight: `2px solid ${gold}`, borderBottom: `2px solid ${gold}`, transform: "rotate(45deg)", opacity: 0.55 }} />
        </motion.div>
      </section>

      {/* ══ LOGO + INTRO JS-Innov.IA ══ */}
      <section style={{ background: navy2, padding: "50px 6%", borderTop: `1px solid rgba(200,146,42,0.15)` }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
          style={{ maxWidth: 800, margin: "0 auto", display: "flex", alignItems: "center", gap: 32, flexWrap: "wrap" }}>
          <div style={{ width: 90, height: 90, borderRadius: "50%", background: `linear-gradient(135deg, ${goldDark}, ${gold})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.8rem", flexShrink: 0, boxShadow: `0 0 40px rgba(240,192,64,0.35)` }}>🦅</div>
          <div>
            <div style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: gold, marginBottom: 6 }}>Présenté par</div>
            <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#fff", textTransform: "uppercase", letterSpacing: "0.05em" }}>JS-Innov<span style={{ color: gold }}>.IA</span></div>
            <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", marginTop: 4 }}>Intelligence Artificielle · Amplifiée par l'Humain · Dour, Belgique</div>
            <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.7)", marginTop: 8 }}>📞 +32 494 11 90 90 · 📧 contact@jsinnovia.com</div>
          </div>
        </motion.div>
      </section>

      {/* ══ FLYER ══ */}
      <section style={{ background: navy, padding: "60px 6%" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: gold, marginBottom: 10 }}>Découvrez l'offre</p>
          <h2 style={{ fontSize: "clamp(1.3rem, 3.5vw, 2rem)", fontWeight: 800, textTransform: "uppercase", marginBottom: 28 }}>Diffusez votre publicité<br /><span style={{ color: gold }}>sur notre écran géant</span></h2>
          <img src={FLYER_URL} alt="Flyer écran géant Espace C" style={{ width: "100%", borderRadius: 16, border: `1px solid rgba(200,146,42,0.3)`, boxShadow: `0 0 50px rgba(200,146,42,0.12), 0 20px 50px rgba(0,0,0,0.5)` }} />
        </motion.div>
      </section>

      {/* ══ VIDÉO ══ */}
      <section style={{ background: `linear-gradient(135deg, ${navy} 0%, ${navy2} 100%)`, padding: "70px 6%" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: gold, marginBottom: 10 }}>▶ Vidéo promotionnelle</p>
            <h2 style={{ fontSize: "clamp(1.3rem, 3.5vw, 2rem)", fontWeight: 800, textTransform: "uppercase", lineHeight: 1.2 }}>Voyez votre pub<br /><span style={{ color: gold }}>en action sur l'écran</span></h2>
            <div style={{ width: 55, height: 3, background: `linear-gradient(90deg, ${goldDark}, ${gold})`, margin: "14px auto 0", borderRadius: 2 }} />
          </div>
          <div onClick={togglePlay} style={{ position: "relative", borderRadius: 16, overflow: "hidden", border: `1px solid rgba(200,146,42,0.3)`, boxShadow: `0 0 60px rgba(200,146,42,0.15), 0 20px 60px rgba(0,0,0,0.5)`, cursor: "pointer", background: "#000" }}>
            <video ref={videoRef} src={VIDEO_URL} style={{ width: "100%", display: "block", maxHeight: "70vh", objectFit: "contain" }} onEnded={() => setPlaying(false)} playsInline />
            {!playing && (
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.35)" }}>
                <motion.div whileHover={{ scale: 1.1 }} style={{ width: 72, height: 72, borderRadius: "50%", background: `linear-gradient(135deg, ${goldDark}, ${gold})`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 30px rgba(240,192,64,0.5)` }}>
                  <div style={{ width: 0, height: 0, borderStyle: "solid", borderWidth: "14px 0 14px 26px", borderColor: `transparent transparent transparent #000`, marginLeft: 4 }} />
                </motion.div>
              </div>
            )}
          </div>
        </motion.div>
      </section>

      {/* ══ STATS ══ */}
      <section style={{ background: navy2, padding: "60px 6%", borderTop: `1px solid rgba(200,146,42,0.12)` }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 22 }}>
          {[
            { icon: "📺", stat: "+300", label: "Diffusions par jour", sub: "Votre pub diffusée en boucle non-stop !" },
            { icon: "📍", title: "Au cœur de Dour", label: "ESPACE C", sub: "Emplacement stratégique n°1 dans la ville" },
            { icon: "💰", title: "Tarifs accessibles", label: "PME & Indépendants", sub: "Contactez-nous pour un devis personnalisé" },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i*0.1 }} viewport={{ once: true }}
              style={{ background: "rgba(200,146,42,0.08)", border: `1px solid ${goldDark}`, borderRadius: 16, padding: "34px 26px", textAlign: "center" }}>
              <div style={{ fontSize: "2rem", marginBottom: 10 }}>{s.icon}</div>
              {s.stat ? <div style={{ fontSize: "clamp(2.5rem,8vw,4.5rem)", fontWeight: 900, color: gold, lineHeight: 1 }}>{s.stat}</div>
                : <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "#fff", lineHeight: 1.2 }}>{s.title}</div>}
              <div style={{ fontSize: "0.73rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: gold, marginTop: 8 }}>{s.label}</div>
              <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.45)", marginTop: 6 }}>{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ CONTACT ══ */}
      <section id="contact" style={{ background: navy, padding: "70px 6%", borderTop: `1px solid rgba(200,146,42,0.12)` }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: gold, marginBottom: 10 }}>Passez à l'action</p>
            <h2 style={{ fontSize: "clamp(1.4rem, 3.5vw, 2.2rem)", fontWeight: 800, textTransform: "uppercase" }}>Réservez votre <span style={{ color: gold }}>espace publicitaire</span></h2>
            <div style={{ width: 55, height: 3, background: `linear-gradient(90deg, ${goldDark}, ${gold})`, margin: "14px auto 0", borderRadius: 2 }} />
            <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", marginTop: 14 }}>Julien Pagin · JS-Innov.IA · contact@jsinnovia.com · +32 494 11 90 90</p>
          </div>
          {sent ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: "center", padding: "50px 30px", background: "rgba(200,146,42,0.08)", border: `1px solid ${gold}`, borderRadius: 20 }}>
              <div style={{ fontSize: "3rem", marginBottom: 16 }}>✅</div>
              <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: gold, marginBottom: 10 }}>Demande envoyée !</h3>
              <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>Julien vous recontacte dans les 24h pour finaliser votre espace pub sur l'écran géant Espace C.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
                {[["prenom","Prénom *"],["nom","Nom *"]].map(([n,l]) => (
                  <div key={n}><label style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.45)", display: "block", marginBottom: 7 }}>{l}</label>
                  <input name={n} value={form[n]} onChange={handleChange} required style={{ width: "100%", padding: "13px 16px", background: "rgba(255,255,255,0.06)", border: `1px solid rgba(200,146,42,0.25)`, borderRadius: 10, color: "#fff", fontSize: "0.95rem", boxSizing: "border-box" }} /></div>
                ))}
              </div>
              {[["email","Email *","email"],["telephone","Téléphone","tel"]].map(([n,l,t]) => (
                <div key={n}><label style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.45)", display: "block", marginBottom: 7 }}>{l}</label>
                <input name={n} type={t} value={form[n]} onChange={handleChange} required={n==="email"} style={{ width: "100%", padding: "13px 16px", background: "rgba(255,255,255,0.06)", border: `1px solid rgba(200,146,42,0.25)`, borderRadius: 10, color: "#fff", fontSize: "0.95rem", boxSizing: "border-box" }} /></div>
              ))}
              <div><label style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.45)", display: "block", marginBottom: 7 }}>Nom de votre entreprise / message</label>
              <textarea name="message" value={form.message} onChange={handleChange} rows={3} placeholder="Ex: Boucherie Dupont — je veux connaître les tarifs..." style={{ width: "100%", padding: "13px 16px", background: "rgba(255,255,255,0.06)", border: `1px solid rgba(200,146,42,0.25)`, borderRadius: 10, color: "#fff", fontSize: "0.95rem", resize: "vertical", boxSizing: "border-box" }} /></div>
              <motion.button type="submit" disabled={sending} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                style={{ padding: "16px 36px", background: sending ? "rgba(200,146,42,0.4)" : `linear-gradient(135deg, ${goldDark}, ${gold})`, color: "#000", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", fontSize: "0.9rem", border: "none", borderRadius: 50, cursor: sending ? "not-allowed" : "pointer", boxShadow: `0 6px 30px rgba(200,146,42,0.35)` }}>
                {sending ? "Envoi en cours..." : "Je veux être visible ! →"}
              </motion.button>
            </form>
          )}
        </motion.div>
      </section>

      <footer style={{ background: "#050d1a", borderTop: `1px solid rgba(200,146,42,0.1)`, padding: "26px 6%", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg, ${goldDark}, ${gold})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>🦅</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: "0.9rem", color: gold }}>JS-Innov.IA</div>
            <div style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Apporteur d'affaires officiel — Espace C Dour</div>
          </div>
        </div>
        <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)" }}>contact@jsinnovia.com · +32 494 11 90 90 · www.jsinnovia.com</div>
      </footer>
    </div>
  );
}
