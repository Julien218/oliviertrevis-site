import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SPIRIT_COLORS, submitOfficialVote } from "@/api/mascottes";
import EnergyMascotteButton from "@/components/mascottes/EnergyMascotteButton";

export default function OfficialVoteSection({ mascottes }) {
  const [selected, setSelected] = useState(null);
  const [facebook, setFacebook] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | done | already | error
  const [message, setMessage] = useState("");

  const spirit = SPIRIT_COLORS[selected?.slug] || SPIRIT_COLORS.lion;

  const handleSubmit = async () => {
    if (!selected || status === "loading") return;
    setStatus("loading");
    try {
      const result = await submitOfficialVote(selected, { facebook });
      if (result?.success) {
        setStatus("done");
      } else if (result?.already_voted) {
        setStatus("already");
        setMessage(result.message || "Vous avez déjà participé à ce vote. Merci !");
      } else {
        setStatus("error");
        setMessage(result?.message || "Une erreur est survenue, réessayez.");
      }
    } catch (e) {
      setStatus("error");
      setMessage("Une erreur est survenue, réessayez.");
    }
  };

  return (
    <section
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: "#0A0A0B", borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* Grille HUD en fond, très subtile */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,184,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,184,0,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative max-w-2xl mx-auto text-center">
        <p
          className="text-[10px] font-bold uppercase tracking-[0.5em] mb-4"
          style={{ color: "rgba(255,184,0,0.5)" }}
        >
          Édition 2026
        </p>
        <h2
          className="font-black uppercase mb-3"
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "clamp(1.6rem, 5vw, 2.8rem)",
            letterSpacing: "0.06em",
            color: "#F5F5F7",
          }}
        >
          Le Vote Officiel
        </h2>
        <p className="text-sm mb-14" style={{ color: "rgba(255,255,255,0.4)" }}>
          Choisissez la mascotte qui représentera le Tour de Dour. Un vote par personne.
        </p>

        <AnimatePresence mode="wait">
          {(status === "idle" || status === "loading") && (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-10"
            >
              {/* Sélection mascotte — boutons énergie */}
              <div className="flex flex-wrap justify-center gap-6">
                {mascottes.map((m) => {
                  const sp = SPIRIT_COLORS[m.slug] || SPIRIT_COLORS.lion;
                  return (
                    <EnergyMascotteButton
                      key={m.slug}
                      imageUrl={m.image_principale}
                      name={m.nom?.split(" ")[0]}
                      color={sp.primary}
                      glow={sp.glow}
                      active={selected?.slug === m.slug}
                      size={84}
                      onClick={() => setSelected(m)}
                    />
                  );
                })}
              </div>

              {/* Champ facebook (optionnel, aide à valider le vote) */}
              {selected && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full max-w-sm flex flex-col gap-4"
                >
                  <input
                    type="text"
                    placeholder="Votre nom Facebook (optionnel)"
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                    className="w-full px-5 py-3 rounded-full text-sm text-center outline-none"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "#F5F5F7",
                    }}
                  />
                  <motion.button
                    onClick={handleSubmit}
                    disabled={status === "loading"}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="relative px-10 py-4 rounded-full font-black text-sm uppercase tracking-[0.2em] overflow-hidden"
                    style={{
                      fontFamily: "'Cinzel', serif",
                      background: `linear-gradient(135deg, ${spirit.primary}, ${spirit.primary}cc)`,
                      color: "#0A0A0B",
                      boxShadow: `0 0 40px ${spirit.glow}`,
                    }}
                  >
                    <motion.span
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(120deg, transparent, rgba(255,255,255,0.5), transparent)" }}
                      initial={{ x: "-120%" }}
                      animate={{ x: ["-120%", "120%"] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    />
                    <span className="relative">
                      {status === "loading" ? "..." : `Voter pour ${selected.nom?.split(" ")[0]}`}
                    </span>
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          )}

          {status === "done" && (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-4"
            >
              <motion.div
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
                style={{ background: `${spirit.primary}20`, border: `2px solid ${spirit.primary}50` }}
                animate={{ boxShadow: [`0 0 0px ${spirit.glow}`, `0 0 40px ${spirit.glow}`, `0 0 0px ${spirit.glow}`] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✓
              </motion.div>
              <h3
                className="text-xl font-black uppercase"
                style={{ fontFamily: "'Cinzel', serif", color: spirit.primary }}
              >
                Vote enregistré
              </h3>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
                Merci pour votre participation !
              </p>
            </motion.div>
          )}

          {(status === "already" || status === "error") && (
            <motion.div
              key="msg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-3"
            >
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                {message}
              </p>
              {status === "error" && (
                <button
                  onClick={() => setStatus("idle")}
                  className="text-xs uppercase tracking-widest"
                  style={{ color: "#FFB800" }}
                >
                  Réessayer
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
