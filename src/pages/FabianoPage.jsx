import { useRef, useState } from "react";
import { motion } from "framer-motion";

const VIDEO_URL    = "https://base44.app/api/apps/6a0371a87c9257126b051d5a/files/mp/public/6a0371a87c9257126b051d5a/6ce59e8d5_edde88ced_video_2210493929742265.mp4";
const HERO_BG      = "https://base44.app/api/apps/6a0371a87c9257126b051d5a/files/mp/public/6a0371a87c9257126b051d5a/0a96d15c5_espace_c_panneau.png";   // photo panneau au rond-point
const AERIAL_URL   = "https://base44.app/api/apps/6a0371a87c9257126b051d5a/files/mp/public/6a0371a87c9257126b051d5a/c1cf179ef_fabiano_flyer.png";        // flyer complet

const LOGO_JSINNOVIA = "https://base44.app/api/apps/6a0371a87c9257126b051d5a/files/mp/public/6a0371a87c9257126b051d5a/9f10f06fc_logo_jsinnovia_officiel.jpg";
const gold     = "#f0c040";
const goldDark = "#c8922a";
const navy     = "#0a1628";
const navy2    = "#0d1f3c";

export default function FabianoPage() {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) { videoRef.current.play(); setPlaying(true); }
    else                          { videoRef.current.pause(); setPlaying(false); }
  };

  return (
    <div style={{ fontFamily: "'Montserrat', sans-serif", background: navy, color: "#fff", minHeight: "100vh", overflowX: "hidden" }}>

      {/* ══ HERO — photo panneau JS-Innov.IA au rond-point Espace C ══ */}
      <section style={{ position: "relative", minHeight: "92vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
          filter: "brightness(0.65)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(to bottom, rgba(10,22,40,0.05) 0%, rgba(10,22,40,0.4) 55%, rgba(10,22,40,0.98) 100%)`,
        }} />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: "relative", zIndex: 10, padding: "40px 6% 60px", maxWidth: 720 }}
        >
          <p style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: 14 }}>
            JS-Innov.IA · Espace C · Dour
          </p>
          <h1 style={{ fontSize: "clamp(2.2rem, 7vw, 5rem)", fontWeight: 900, textTransform: "uppercase", lineHeight: 1.05 }}>
            Votre entreprise
          </h1>
          <h1 style={{ fontSize: "clamp(2rem, 6vw, 4.2rem)", fontWeight: 900, textTransform: "uppercase", color: gold, lineHeight: 1.05 }}>
            mérite d'être
          </h1>
          <h1 style={{ fontSize: "clamp(4rem, 13vw, 9rem)", fontWeight: 900, textTransform: "uppercase", color: gold, lineHeight: 0.88, marginBottom: 28, textShadow: `0 0 70px rgba(240,192,64,0.45)` }}>
            VUE !
          </h1>
          {/* Badge localisation */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(200,146,42,0.18)", border: `1px solid rgba(200,146,42,0.45)`, borderRadius: 30, padding: "9px 20px" }}>
            <span>📍</span>
            <span style={{ fontSize: "0.9rem", fontWeight: 700, color: gold }}>Au cœur de Dour — Espace C</span>
          </div>
        </motion.div>

        {/* flèche scroll */}
        <motion.div style={{ position: "absolute", bottom: 22, left: "50%", transform: "translateX(-50%)", zIndex: 10 }} animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
          <div style={{ width: 22, height: 22, borderRight: `2px solid ${gold}`, borderBottom: `2px solid ${gold}`, transform: "rotate(45deg)", opacity: 0.55 }} />
        </motion.div>
      </section>

      {/* ══ FLYER intégré en section visuelle ══ */}
      <section style={{ background: navy2, padding: "60px 6%", borderTop: `1px solid rgba(200,146,42,0.15)` }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}
        >
          <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: gold, marginBottom: 10 }}>Découvrez notre offre</p>
          <h2 style={{ fontSize: "clamp(1.3rem, 3.5vw, 2rem)", fontWeight: 800, textTransform: "uppercase", marginBottom: 28 }}>
            Diffusez votre publicité<br />
            <span style={{ color: gold }}>sur notre écran géant</span>
          </h2>
          {/* Image du flyer complet */}
          <img
            src={AERIAL_URL}
            alt="Flyer écran géant Espace C Dour — JS-Innov.IA"
            style={{
              width: "100%",
              borderRadius: 16,
              border: `1px solid rgba(200,146,42,0.3)`,
              boxShadow: `0 0 50px rgba(200,146,42,0.12), 0 20px 50px rgba(0,0,0,0.5)`,
              display: "block",
            }}
          />
        </motion.div>
      </section>

      {/* ══ VIDÉO ══ */}
      <section style={{ background: `linear-gradient(135deg, ${navy} 0%, ${navy2} 100%)`, padding: "70px 6%" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          style={{ maxWidth: 900, margin: "0 auto" }}
        >
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: gold, marginBottom: 10 }}>▶ Vidéo promotionnelle</p>
            <h2 style={{ fontSize: "clamp(1.3rem, 3.5vw, 2rem)", fontWeight: 800, textTransform: "uppercase", lineHeight: 1.2 }}>
              Voyez votre pub<br /><span style={{ color: gold }}>en action sur l'écran</span>
            </h2>
            <div style={{ width: 55, height: 3, background: `linear-gradient(90deg, ${goldDark}, ${gold})`, margin: "14px auto 0", borderRadius: 2 }} />
          </div>

          <div onClick={togglePlay} style={{
            position: "relative", borderRadius: 16, overflow: "hidden",
            border: `1px solid rgba(200,146,42,0.3)`,
            boxShadow: `0 0 60px rgba(200,146,42,0.15), 0 20px 60px rgba(0,0,0,0.5)`,
            cursor: "pointer", background: "#000",
          }}>
            <video
              ref={videoRef}
              src={VIDEO_URL}
              style={{ width: "100%", display: "block", maxHeight: "70vh", objectFit: "contain" }}
              onEnded={() => setPlaying(false)}
              playsInline
            />
            {!playing && (
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.35)" }}>
                <motion.div whileHover={{ scale: 1.1 }} style={{
                  width: 72, height: 72, borderRadius: "50%",
                  background: `linear-gradient(135deg, ${goldDark}, ${gold})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: `0 0 30px rgba(240,192,64,0.5)`,
                }}>
                  <div style={{ width: 0, height: 0, borderStyle: "solid", borderWidth: "14px 0 14px 26px", borderColor: `transparent transparent transparent #000`, marginLeft: 4 }} />
                </motion.div>
              </div>
            )}
          </div>
        </motion.div>
      </section>

      {/* ══ STATS ══ */}
      <section style={{ background: navy2, padding: "60px 6%", borderTop: `1px solid rgba(200,146,42,0.12)` }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 22 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
            style={{ background: "rgba(200,146,42,0.08)", border: `1px solid ${goldDark}`, borderRadius: 16, padding: "34px 26px", textAlign: "center" }}>
            <div style={{ fontSize: "2rem", marginBottom: 10 }}>📺</div>
            <div style={{ fontSize: "clamp(3rem, 8vw, 4.5rem)", fontWeight: 900, color: gold, lineHeight: 1 }}>+300</div>
            <div style={{ fontSize: "0.73rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(255,255,255,0.6)", marginTop: 8 }}>Diffusions par jour</div>
            <div style={{ fontSize: "0.83rem", color: "rgba(255,255,255,0.4)", marginTop: 6 }}>
              Votre pub diffusée en boucle pour <span style={{ color: gold, fontWeight: 700 }}>développer votre activité !</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} viewport={{ once: true }}
            style={{ background: "rgba(200,146,42,0.08)", border: `1px solid ${goldDark}`, borderRadius: 16, padding: "34px 26px", textAlign: "center" }}>
            <div style={{ fontSize: "2rem", marginBottom: 10 }}>📍</div>
            <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#fff", lineHeight: 1.1 }}>Au cœur<br />de Dour</div>
            <div style={{ fontSize: "1.1rem", fontWeight: 700, color: gold, marginTop: 8, letterSpacing: "0.05em" }}>ESPACE C</div>
            <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.4)", marginTop: 6 }}>Emplacement stratégique n°1</div>
          </motion.div>
        </div>
      </section>

      {/* ══ AUDIENCE ══ */}
      <section style={{ background: navy, padding: "60px 6%", borderTop: `1px solid rgba(200,146,42,0.12)` }}>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }} style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 34 }}>
            <h3 style={{ fontSize: "clamp(1rem, 3vw, 1.4rem)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em" }}>Pour qui ?</h3>
            <div style={{ width: 50, height: 3, background: `linear-gradient(90deg, ${goldDark}, ${gold})`, margin: "10px auto 0", borderRadius: 2 }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(148px, 1fr))", gap: 16 }}>
            {[{ icon: "🏪", label: "Commerçants" }, { icon: "👤", label: "Indépendants" }, { icon: "🏢", label: "Entreprises" }, { icon: "🤝", label: "Associations" }].map((item, i) => (
              <motion.div key={item.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }}
                whileHover={{ y: -4 }}
                style={{ textAlign: "center", padding: "26px 14px", border: `1px solid rgba(200,146,42,0.25)`, borderRadius: 12, background: "rgba(255,255,255,0.02)", cursor: "default" }}>
                <div style={{ width: 58, height: 58, borderRadius: "50%", border: `2px solid ${goldDark}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 13px", fontSize: "1.4rem" }}>
                  {item.icon}
                </div>
                <div style={{ fontSize: "0.76rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>{item.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ══ AVANTAGES ══ */}
      <section style={{ background: navy2, padding: "50px 6%", borderTop: `1px solid rgba(200,146,42,0.12)` }}>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }} style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
            {[{ icon: "🎯", label: "Emplacement stratégique" }, { icon: "👁️", label: "Visibilité locale maximale" }, { icon: "📈", label: "Attirez de nouveaux clients" }].map((item, i) => (
              <motion.div key={item.label} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: i * 0.12 }} viewport={{ once: true }}
                style={{ display: "flex", alignItems: "center", gap: 13, background: "rgba(255,255,255,0.03)", border: `1px solid rgba(200,146,42,0.2)`, borderRadius: 10, padding: "18px 20px" }}>
                <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>{item.icon}</span>
                <span style={{ fontSize: "0.81rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em" }}>{item.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ══ CONTACT ══ */}
      <section style={{ background: `linear-gradient(135deg, ${navy2}, ${navy})`, padding: "80px 6%", textAlign: "center", borderTop: `1px solid rgba(200,146,42,0.15)` }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
          <p style={{ fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 12 }}>
            📞 Contactez notre responsable commercial
          </p>
          <h2 style={{ fontSize: "clamp(1.1rem, 3vw, 1.7rem)", fontWeight: 800, textTransform: "uppercase", marginBottom: 8 }}>
            Contactez notre responsable commercial
          </h2>
          <div style={{ fontSize: "clamp(2rem, 6vw, 3.8rem)", fontWeight: 900, letterSpacing: "0.05em", marginBottom: 6 }}>FABIANO</div>
          <a href="tel:+32471644053" style={{ textDecoration: "none" }}>
            <div style={{ fontSize: "clamp(2rem, 7vw, 4.5rem)", fontWeight: 900, color: gold, letterSpacing: "0.08em", marginBottom: 36, textShadow: `0 0 40px rgba(240,192,64,0.3)`, display: "inline-block" }}>
              +32 471 64 40 53
            </div>
          </a>
          <br />
          <motion.a href="tel:+32471644053" whileHover={{ scale: 1.04 }}
            style={{ display: "inline-block", border: `2px solid ${gold}`, color: gold, fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "0.88rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "15px 42px", borderRadius: 4, textDecoration: "none", transition: "all 0.3s" }}>
            Réservez votre emplacement dès maintenant !
          </motion.a>
        </motion.div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ background: "#050d1a", borderTop: `1px solid rgba(200,146,42,0.15)`, padding: "60px 6% 40px", textAlign: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
          <div style={{ position: "relative", marginBottom: 20 }}>
            <div style={{ position: "absolute", inset: -8, borderRadius: "50%", background: `radial-gradient(circle, rgba(240,192,64,0.25) 0%, transparent 70%)` }} />
            <img src={LOGO_JSINNOVIA} alt="JS-Innov.IA"
              style={{ width: 110, height: 110, borderRadius: "50%", objectFit: "cover", border: `2px solid rgba(240,192,64,0.4)`, boxShadow: `0 0 40px rgba(240,192,64,0.3), 0 0 80px rgba(200,146,42,0.15)`, display: "block", position: "relative", zIndex: 1 }} />
          </div>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: "1.6rem", fontWeight: 900, letterSpacing: "0.08em", background: `linear-gradient(135deg, ${goldDark}, ${gold}, ${goldDark})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 4 }}>JS-Innov.IA®</div>
          <div style={{ fontStyle: "italic", fontSize: "0.95rem", color: "rgba(240,192,64,0.6)", letterSpacing: "0.05em", marginBottom: 16 }}>Julien Pagin</div>
          <div style={{ width: 120, height: 1, background: `linear-gradient(90deg, transparent, ${gold}, transparent)`, marginBottom: 16 }} />
          <div style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.22em", color: "rgba(255,255,255,0.35)", marginBottom: 12 }}>
            Automatisation intelligente · Amplifiée par l'Humain
          </div>
          <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.3)", lineHeight: 1.8 }}>
            contact@jsinnovia.com · +32 494 11 90 90 · www.jsinnovia.com
          </div>
          <div style={{ width: 60, height: 1, background: `linear-gradient(90deg, transparent, rgba(200,146,42,0.3), transparent)`, margin: "20px auto 14px" }} />
          <div style={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.18)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            © 2026 JS-Innov.IA — Tous droits réservés
          </div>
        </div>
      </footer>
    </div>
  );
}
