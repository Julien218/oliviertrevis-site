import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { fetchMascotte, SPIRIT_COLORS } from "@/api/mascottes";
import { MASCOTTE_CONTENT, LOCAL_FALLBACK } from "@/data/mascotteContent";
import MascotteSeo from "@/components/mascottes/MascotteSeo";
import MascotteHero from "@/components/mascottes/MascotteHero";
import IdentityPassport from "@/components/mascottes/IdentityPassport";
import LegendScroll from "@/components/mascottes/LegendScroll";
import DnaValues from "@/components/mascottes/DnaValues";
import ScoreBars from "@/components/mascottes/ScoreBars";
import WhyVote from "@/components/mascottes/WhyVote";
import InteractiveExperience from "@/components/mascottes/InteractiveExperience";
import MediaVault from "@/components/mascottes/MediaVault";
import FinalVoteCTA from "@/components/mascottes/FinalVoteCTA";
import ShareBar from "@/components/mascottes/ShareBar";
import MascotteNav from "@/components/mascottes/MascotteNav";

export default function MascotteDetailPage() {
  // Extract slug from URL path (e.g. /lion → lion)
  const slug = window.location.pathname.replace("/", "");
  const navigate = useNavigate();
  const [mascotte, setMascotte] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const spirit = SPIRIT_COLORS[slug] || SPIRIT_COLORS.lion;
  const content = MASCOTTE_CONTENT[slug];

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    setError(null);
    fetchMascotte(slug)
      .then(data => {
        if (data) {
          setMascotte(data);
        } else if (LOCAL_FALLBACK[slug]) {
          setMascotte(LOCAL_FALLBACK[slug]);
        } else {
          setError("not_found");
        }
        setLoading(false);
      })
      .catch(() => {
        if (LOCAL_FALLBACK[slug]) {
          setMascotte(LOCAL_FALLBACK[slug]);
        } else {
          setError("not_found");
        }
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

  if (error || !mascotte || !content) {
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

  const nomAffiche = content.nom_affiche;

  return (
    <div style={{ background: "#0A0A0B", fontFamily: "'Montserrat', sans-serif" }}>
      <MascotteSeo mascotte={mascotte} nomAffiche={nomAffiche} />

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

      <MascotteHero mascotte={mascotte} nomAffiche={nomAffiche} slogan={content.slogan} />
      <IdentityPassport slug={slug} nom={nomAffiche} espece={mascotte?.espece} content={content} />
      <LegendScroll mascotte={mascotte} nomAffiche={nomAffiche} histoire={content.histoire} legendeTitre={content.legende_titre} />
      <DnaValues slug={slug} adn={content.adn} />
      <ScoreBars slug={slug} scores={content.scores} />
      <WhyVote slug={slug} nom={nomAffiche} pourquoi={content.pourquoi} />
      <InteractiveExperience slug={slug} interactif={content.interactif} devise={content.devise} />
      <MediaVault mascotte={mascotte} />
      <FinalVoteCTA slug={slug} nom={nomAffiche} />
      <ShareBar mascotte={mascotte} nomAffiche={nomAffiche} />
      <MascotteNav currentSlug={slug} />

      {/* Signature */}
      <div className="py-16 text-center px-6" style={{ background: "#0A0A0B" }}>
        <p className="text-xs uppercase tracking-[0.3em] mb-2" style={{ color: "rgba(255,255,255,0.25)" }}>
          Le Tour de Dour
        </p>
        <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.15)" }}>
          Création : Js-Innov.IA — L'intelligence artificielle amplifiée par l'humain
        </p>
      </div>
    </div>
  );
}
