import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { SPIRIT_COLORS, BUTTON_IMAGES } from "@/api/mascottes";
import { MASCOTTE_CONTENT, ALL_SLUGS_ORDER } from "@/data/mascotteContent";

export default function MascotteNav({ currentSlug }) {
  const navigate = useNavigate();
  const others = ALL_SLUGS_ORDER.filter(s => s !== currentSlug);

  return (
    <section className="relative py-24 px-6" style={{ background: "#0E0E12" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.5em] mb-3"
            style={{ color: "rgba(255,255,255,0.35)" }}>
            Continuer la découverte
          </p>
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-wide"
            style={{ fontFamily: "'Cinzel', serif", color: "#F5F5F7" }}>
            Découvrir les autres mascottes
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {others.map((slug, i) => {
            const spirit = SPIRIT_COLORS[slug] || SPIRIT_COLORS.lion;
            const content = MASCOTTE_CONTENT[slug];
            return (
              <motion.button
                key={slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                onClick={() => navigate(`/${slug}`)}
                className="flex flex-col items-center gap-3 p-5 rounded-2xl cursor-pointer"
                style={{
                  background: "rgba(26,26,30,0.7)",
                  border: `1px solid ${spirit.primary}20`,
                }}
              >
                {BUTTON_IMAGES[slug] && (
                  <img src={BUTTON_IMAGES[slug]} alt={content?.nom_affiche || slug}
                    className="w-16 h-16 object-contain" />
                )}
                <span className="text-xs font-bold uppercase tracking-wider text-center leading-tight"
                  style={{ color: spirit.primary, fontFamily: "'Montserrat', sans-serif" }}>
                  {content?.nom_affiche?.replace("Le ", "").replace("La ", "").replace("L'", "") || slug}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
