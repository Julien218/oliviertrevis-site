import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BRAND } from "@/api/supabase";

export default function MascottePage() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [showBack, setShowBack] = useState(true);
  const hideTimer = useRef(null);

  // Masquer le bouton retour après quelques secondes pour ne pas gêner l'expérience
  useEffect(() => {
    hideTimer.current = setTimeout(() => setShowBack(false), 5000);
    return () => clearTimeout(hideTimer.current);
  }, []);

  const handleMouseMove = () => {
    setShowBack(true);
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setShowBack(false), 3000);
  };

  return (
    <div
      className="fixed inset-0 z-0 bg-black"
      onMouseMove={handleMouseMove}
      onTouchStart={() => { setShowBack(true); clearTimeout(hideTimer.current); hideTimer.current = setTimeout(() => setShowBack(false), 4000); }}
    >
      {/* Loader pendant le chargement de l'iframe */}
      {!loaded && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black gap-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 rounded-full border-2 border-t-transparent"
            style={{ borderColor: `${BRAND.gold} transparent transparent transparent` }}
          />
          <p className="text-xs tracking-[0.4em] font-light" style={{ color: BRAND.gold, opacity: 0.6 }}>
            CHARGEMENT…
          </p>
        </div>
      )}

      {/* L'expérience immersive en iframe fullscreen */}
      <iframe
        src="/mascotte.html"
        title="Mascotte du Tour de Dour — Expérience Immersive"
        className="absolute inset-0 w-full h-full border-0"
        allow="autoplay"
        onLoad={() => setLoaded(true)}
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.6s ease" }}
      />

      {/* Bouton retour flottant — s'efface automatiquement */}
      <motion.button
        onClick={() => navigate("/")}
        animate={{ opacity: showBack ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute top-4 left-4 z-50 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase pointer-events-auto"
        style={{
          background: "rgba(0,0,0,0.65)",
          border: `1px solid ${BRAND.gold}40`,
          color: BRAND.gold,
          backdropFilter: "blur(10px)",
          pointerEvents: showBack ? "auto" : "none",
        }}
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Retour
      </motion.button>
    </div>
  );
}
