import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { fetchMascotte, SPIRIT_COLORS } from "@/api/mascottes";
import MascotteSeo from "@/components/mascottes/MascotteSeo";
import MascotteHero from "@/components/mascottes/MascotteHero";
import IdentityHud from "@/components/mascottes/IdentityHud";
import LegendScroll from "@/components/mascottes/LegendScroll";
import MediaVault from "@/components/mascottes/MediaVault";
import VoteSection from "@/components/mascottes/VoteSection";
import ShareBar from "@/components/mascottes/ShareBar";

export default function MascotteDetailPage() {
  // Extract slug from URL path (e.g. /lion → lion)
  const slug = window.location.pathname.replace("/", "");
  const navigate = useNavigate();
  const [mascotte, setMascotte] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const spirit = SPIRIT_COLORS[slug] || SPIRIT_COLORS.lion;

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    setError(null);
    fetchMascotte(slug)
      .then(data => {
        setMascotte(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center" style={{ background: "#0A0A0B" }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="w-10 h-10 rounded-full border-2"
          style={{ borderColor: `${spirit.primary}30`, borderTopColor: spirit.primary }}
        />
      </div>
    );
  }

  if (error || !mascotte) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6" style={{ background: "#0A0A0B" }}>
        <p className="text-xl font-bold" style={{ color: "#F5F5F7", fontFamily: "'Cinzel', serif" }}>
          Mascotte introuvable
        </p>
        <button
          onClick={() => navigate("/mascottes")}
          className="px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider"
          style={{ background: "rgba(255,255,255,0.08)", color: "#F5F5F7", border: "1px solid rgba(255,255,255,0.15)" }}
        >
          Voir toutes les mascottes
        </button>
      </div>
    );
  }

  return (
    <div style={{ background: "#0A0A0B", fontFamily: "'Montserrat', sans-serif" }}>
      <MascotteSeo mascotte={mascotte} />

      {/* Back button */}
      <motion.button
        onClick={() => navigate("/mascottes")}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-5 left-5 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest"
        style={{
          background: "rgba(10,10,11,0.85)",
          border: `1px solid ${spirit.primary}35`,
          color: spirit.primary,
          backdropFilter: "blur(16px)",
        }}
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Mascottes
      </motion.button>

      <MascotteHero mascotte={mascotte} />
      <IdentityHud mascotte={mascotte} />
      <LegendScroll mascotte={mascotte} />
      <MediaVault mascotte={mascotte} />
      <VoteSection mascotte={mascotte} />
      <ShareBar mascotte={mascotte} />

      {/* Footer breathing space */}
      <div className="py-24 text-center" style={{ background: "#0A0A0B" }}>
        <p className="text-[10px] uppercase tracking-[0.4em]" style={{ color: "rgba(255,255,255,0.1)" }}>
          Tour de Dour · JS-Innov.IA
        </p>
      </div>
    </div>
  );
}