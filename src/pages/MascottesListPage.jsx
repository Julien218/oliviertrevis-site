import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { fetchMascottes, SPIRIT_COLORS } from "@/api/mascottes";
import OfficialVoteSection from "@/components/mascottes/OfficialVoteSection";

function ShimmerCTA({ children, color, glow }) {
  return (
    <div
      className="relative flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-[0.2em] overflow-hidden"
      style={{
        background: `${color}15`,
        border: `1px solid ${color}35`,
        color: color,
      }}
    >
      <motion.span
        className="absolute inset-0"
        style={{ background: `linear-gradient(120deg, transparent, ${color}30, transparent)` }}
        initial={{ x: "-120%" }}
        animate={{ x: ["-120%", "120%"] }}
        transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 0.8, ease: "easeInOut" }}
      />
      <span className="relative flex items-center gap-2">{children}</span>
    </div>
  );
}

function MascotteColumn({ mascotte, index, active, onHover }) {
  const slug = mascotte?.slug || "lion";
  const spirit = SPIRIT_COLORS[slug] || SPIRIT_COLORS.lion;
  const navigate = useNavigate();

  return (
    <motion.div
      layout
      onMouseEnter={() => onHover(index)}
      onClick={() => navigate(`/${slug}`)}
      className="relative overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
      style={{
        flex: active ? "3 1 0" : "1 1 0",
        minHeight: "70vh",
        background: active
          ? `linear-gradient(180deg, ${spirit.primary}12 0%, #0A0A0B 100%)`
          : "#0E0E12",
        borderLeft: `1px solid ${active ? spirit.primary + "25" : "rgba(255,255,255,0.04)"}`,
      }}
    >
      {/* Background image */}
      {mascotte?.image_principale && (
        <div
          className="absolute inset-0 transition-all duration-700"
          style={{
            backgroundImage: `url(${mascotte.image_principale})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: active ? 0.2 : 0.05,
            filter: `brightness(${active ? 0.4 : 0.2})`,
          }}
        />
      )}

      {/* Glow */}
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(circle at 50% 80%, ${spirit.glow} 0%, transparent 60%)` }}
        />
      )}

      {/* Grille HUD subtile en fond quand actif */}
      {active && (
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(${spirit.primary} 1px, transparent 1px), linear-gradient(90deg, ${spirit.primary} 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-end pb-12 px-4">
        {/* Portrait avec anneau énergie rotatif */}
        {active && mascotte?.image_principale && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative mb-8 w-32 h-32 md:w-48 md:h-48"
          >
            {/* Anneau conique rotatif */}
            <motion.div
              className="absolute -inset-3 rounded-full pointer-events-none"
              style={{
                background: `conic-gradient(from 0deg, transparent 0%, ${spirit.primary} 12%, transparent 28%, transparent 72%, ${spirit.primary} 88%, transparent 100%)`,
                WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))",
                mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            />
            <div
              className="relative w-full h-full rounded-full overflow-hidden"
              style={{
                border: `2px solid ${spirit.primary}40`,
                boxShadow: `0 0 60px ${spirit.glow}`,
              }}
            >
              <img src={mascotte.image_principale} alt={mascotte.nom} className="w-full h-full object-cover" />
              {/* Scanline */}
              <motion.div
                className="absolute left-0 right-0 h-1/3 pointer-events-none"
                style={{ background: `linear-gradient(180deg, transparent, ${spirit.primary}40, transparent)` }}
                initial={{ top: "-40%" }}
                animate={{ top: ["-40%", "120%"] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "linear", repeatDelay: 0.6 }}
              />
            </div>
          </motion.div>
        )}

        {/* Name - vertical when collapsed, horizontal when active */}
        <h3
          className="font-black uppercase text-center transition-all duration-500"
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: active ? "clamp(1.5rem, 4vw, 3rem)" : "clamp(0.8rem, 1.5vw, 1rem)",
            letterSpacing: active ? "0.1em" : "0.3em",
            color: active ? spirit.primary : "rgba(255,255,255,0.25)",
            writingMode: active ? "horizontal-tb" : "vertical-rl",
            textOrientation: active ? "initial" : "mixed",
            textShadow: active ? `0 0 40px ${spirit.glow}` : "none",
          }}
        >
          {mascotte?.nom}
        </h3>

        {/* CTA */}
        {active && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6"
          >
            <ShimmerCTA color={spirit.primary} glow={spirit.glow}>
              Découvrir
              <ArrowRight className="w-3.5 h-3.5" />
            </ShimmerCTA>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default function MascottesListPage() {
  const [mascottes, setMascottes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Les Mascottes — Tour de Dour";
    fetchMascottes()
      .then(data => {
        // Filter only the 5 mascottes
        const slugs = ["lion", "canari", "biche", "renard", "ours"];
        const filtered = slugs
          .map(s => data.find(m => m.slug === s))
          .filter(Boolean);
        setMascottes(filtered.length > 0 ? filtered : data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center" style={{ background: "#0A0A0B" }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="w-10 h-10 rounded-full border-2"
          style={{ borderColor: "rgba(255,184,0,0.3)", borderTopColor: "#FFB800" }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#0A0A0B", fontFamily: "'Montserrat', sans-serif" }}>
      {/* Back button */}
      <motion.button
        onClick={() => navigate("/")}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-5 left-5 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest"
        style={{
          background: "rgba(10,10,11,0.85)",
          border: "1px solid rgba(255,184,0,0.3)",
          color: "#FFB800",
          backdropFilter: "blur(16px)",
        }}
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Accueil
      </motion.button>

      {/* Header */}
      <div className="text-center pt-20 pb-8 px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[10px] font-bold uppercase tracking-[0.5em] mb-4"
          style={{ color: "rgba(255,184,0,0.5)" }}
        >
          Le Bestiaire
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-black uppercase"
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "clamp(2rem, 8vw, 5rem)",
            letterSpacing: "0.08em",
            color: "#F5F5F7",
          }}
        >
          Les Mascottes
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mx-auto mt-4 h-px w-24"
          style={{ background: "linear-gradient(90deg, transparent, #FFB800, transparent)" }}
        />
      </div>

      {/* Desktop: Accordion columns */}
      <div className="hidden md:flex" style={{ minHeight: "70vh" }}>
        {mascottes.map((m, i) => (
          <MascotteColumn
            key={m.id || m.slug}
            mascotte={m}
            index={i}
            active={activeIndex === i}
            onHover={setActiveIndex}
          />
        ))}
      </div>

      {/* Mobile: Stacked cards */}
      <div className="md:hidden px-5 pb-20 space-y-4">
        {mascottes.map((m, i) => {
          const spirit = SPIRIT_COLORS[m?.slug] || SPIRIT_COLORS.lion;
          return (
            <motion.div
              key={m.id || m.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => navigate(`/${m.slug}`)}
              className="relative rounded-2xl overflow-hidden cursor-pointer"
              style={{
                height: 220,
                border: `1px solid ${spirit.primary}20`,
              }}
            >
              {m.image_principale && (
                <img
                  src={m.image_principale}
                  alt={m.nom}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ filter: "brightness(0.25)" }}
                />
              )}
              <div className="absolute inset-0"
                style={{ background: `linear-gradient(180deg, transparent 30%, ${spirit.primary}20 100%)` }} />
              <div className="relative z-10 h-full flex flex-col items-center justify-end pb-6 px-4">
                <h3 className="text-2xl font-black uppercase mb-3"
                  style={{
                    fontFamily: "'Cinzel', serif",
                    color: spirit.primary,
                    textShadow: `0 0 30px ${spirit.glow}`,
                  }}>
                  {m.nom}
                </h3>
                <ShimmerCTA color={spirit.primary} glow={spirit.glow}>
                  Découvrir
                  <ArrowRight className="w-3 h-3" />
                </ShimmerCTA>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Vote officiel final */}
      {mascottes.length > 0 && <OfficialVoteSection mascottes={mascottes} />}

      {/* Footer */}
      <div className="py-16 text-center" style={{ background: "#0A0A0B" }}>
        <p className="text-[10px] uppercase tracking-[0.4em]" style={{ color: "rgba(255,255,255,0.1)" }}>
          Tour de Dour · JS-Innov.IA
        </p>
      </div>
    </div>
  );
}
