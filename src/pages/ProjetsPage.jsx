import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import { BRAND } from "@/api/supabase";
import { SOCIAL_LINKS } from "@/api/links";
import { Link } from "react-router-dom";

function FbIcon() { return <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>; }
function IgIcon() { return <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>; }
function TkIcon() { return <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>; }

const PROJETS = [
  {
    id: "miss-mister",
    titre: "Miss & Mister Dour",
    soustitre: "Concours de beauté & représentation",
    description: "Le grand concours de beauté, d'élégance et de représentation locale de la région de Dour. Un événement qui célèbre la diversité, le charisme et les talents de la communauté.",
    tags: ["Concours", "Beauté", "Représentation", "Dour", "Inclusion"],
    site: "https://www.missetmisterdour.be",
    socials: [
      { href: SOCIAL_LINKS.missMisterDour.facebook,  Icon: FbIcon, color: "#1877f2", label: "Facebook" },
      { href: SOCIAL_LINKS.missMisterDour.instagram, Icon: IgIcon, color: "#e1306c", label: "Instagram" },
      { href: SOCIAL_LINKS.missMisterDour.tiktok,    Icon: TkIcon, color: "#ffffff", label: "TikTok" },
    ],
    accent: BRAND.gold,
    accentBg: `${BRAND.gold}12`,
    accentBorder: `${BRAND.gold}30`,
    emoji: "👑",
  },
  {
    id: "fashionist-art",
    titre: "Fashionist'ART",
    soustitre: "Mode, art & créativité",
    description: "Une plateforme dédiée à la mode artistique, au style créatif et à l'expression vestimentaire. Fashionist'ART valorise les créateurs, les stylistes et les passionnés de mode autour de Dour.",
    tags: ["Mode", "Art", "Créativité", "Stylisme", "Expression"],
    site: "https://www.fashionistartdour.be",
    socials: [
      { href: SOCIAL_LINKS.fashionistArt.facebook,  Icon: FbIcon, color: "#1877f2", label: "Facebook" },
      { href: SOCIAL_LINKS.fashionistArt.instagram, Icon: IgIcon, color: "#e1306c", label: "Instagram" },
    ],
    accent: "#c084fc",
    accentBg: "rgba(192,132,252,0.10)",
    accentBorder: "rgba(192,132,252,0.28)",
    emoji: "🎨",
  },
  {
    id: "pv-assurances",
    titre: "P&V Assurances",
    soustitre: "Agence de Dour",
    description: "Votre conseiller assurances de confiance à Dour. Auto, habitation, famille, santé, entreprise — des solutions personnalisées et un accompagnement de proximité.",
    tags: ["Assurances", "Proximité", "Dour", "Conseils"],
    site: "https://www.assurancesdour.be",
    socials: [
      { href: SOCIAL_LINKS.pvAssurances.facebook, Icon: FbIcon, color: "#1877f2", label: "Facebook" },
    ],
    accent: "#4a9eff",
    accentBg: "rgba(74,158,255,0.08)",
    accentBorder: "rgba(74,158,255,0.25)",
    emoji: "🛡️",
  },
  {
    id: "synergie-dour",
    titre: "Synergie Dour",
    soustitre: "Réseau local",
    description: "La plateforme qui connecte les commerçants, indépendants et acteurs économiques de Dour. Ensemble, dynamisons notre territoire et valorisons nos forces locales.",
    tags: ["Réseau", "Commerce", "Local", "Dour"],
    site: "https://www.synergiedour.be",
    socials: [
      { href: SOCIAL_LINKS.synergieDour.facebook, Icon: FbIcon, color: "#1877f2", label: "Facebook" },
    ],
    accent: "#6ee7b7",
    accentBg: "rgba(110,231,183,0.08)",
    accentBorder: "rgba(110,231,183,0.25)",
    emoji: "🤝",
  },
  {
    id: "tour-de-dour",
    titre: "Le Tour de Dour",
    soustitre: "Reportages & vidéos locales",
    description: "Des vidéos, des reportages, des rencontres et des découvertes autour de Dour. Un projet qui met en lumière les lieux, les initiatives et les personnes qui font vivre Dour.",
    tags: ["Vidéos", "Reportages", "Culture", "Dour"],
    site: "/tour-de-dour",
    socials: [
      { href: SOCIAL_LINKS.tourDeDour.facebook, Icon: FbIcon, color: "#1877f2", label: "Facebook" },
    ],
    accent: "#f87171",
    accentBg: "rgba(248,113,113,0.08)",
    accentBorder: "rgba(248,113,113,0.25)",
    emoji: "🎬",
    internal: true,
  },
];

export default function ProjetsPage() {
  return (
    <div className="min-h-screen text-white" style={{ background: BRAND.black }}>

      {/* ── HERO ── */}
      <section className="relative py-28 px-4 overflow-hidden">
        <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${BRAND.navy} 0%, ${BRAND.black} 100%)` }} />
        <div className="absolute inset-0 opacity-10"
          style={{ background: `radial-gradient(ellipse at 60% 40%, ${BRAND.gold} 0%, transparent 60%)` }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-xs uppercase font-semibold tracking-[0.3em] mb-4" style={{ color: BRAND.gold }}>
              Ses engagements
            </p>
            <h1 className="text-5xl md:text-6xl font-black mb-4 leading-tight text-white">
              Projets &{" "}
              <span style={{ background: `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.goldLight})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Initiatives
              </span>
            </h1>
            <div className="w-16 h-0.5 rounded-full mx-auto mb-6"
              style={{ background: `linear-gradient(90deg, transparent, ${BRAND.gold}, transparent)` }} />
            <p className="text-base leading-relaxed max-w-2xl mx-auto" style={{ color: BRAND.silver }}>
              5 projets distincts, chacun avec son identité propre. Chaque site est indépendant — retrouvez-les tous ici.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── PROJETS ── */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto space-y-6">
          {PROJETS.map((p, i) => (
            <motion.div key={p.id}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }} viewport={{ once: true }}
              className="rounded-3xl overflow-hidden transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${BRAND.navyLight} 0%, ${BRAND.navy} 100%)`,
                border: `1px solid ${p.accentBorder}`,
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.currentTarget.style.transform = ""}>

              <div className="p-8 md:p-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

                  {/* Gauche */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                        style={{ background: p.accentBg, border: `1px solid ${p.accentBorder}` }}>
                        {p.emoji}
                      </div>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-black text-white">{p.titre}</h2>
                        <p className="text-sm font-medium tracking-wide mt-0.5" style={{ color: p.accent }}>{p.soustitre}</p>
                      </div>
                    </div>

                    <p className="text-sm leading-relaxed mb-5" style={{ color: BRAND.silver, opacity: 0.85, maxWidth: "520px" }}>
                      {p.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {p.tags.map((t, ti) => (
                        <span key={ti} className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{ background: p.accentBg, color: p.accent, border: `1px solid ${p.accentBorder}` }}>
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Socials */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs mr-1" style={{ color: BRAND.silver, opacity: 0.45 }}>Suivre :</span>
                      {p.socials.map((s, si) => (
                        <a key={si} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label}
                          className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
                          style={{ border: `1px solid ${BRAND.gold}25`, color: BRAND.silver }}
                          onMouseEnter={e => { e.currentTarget.style.color = s.color; e.currentTarget.style.borderColor = s.color + "60"; e.currentTarget.style.background = s.color + "15"; }}
                          onMouseLeave={e => { e.currentTarget.style.color = BRAND.silver; e.currentTarget.style.borderColor = BRAND.gold + "25"; e.currentTarget.style.background = "transparent"; }}>
                          <s.Icon />
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Droite — CTA */}
                  <div className="flex flex-col gap-3 min-w-[190px]">
                    {p.internal ? (
                      <Link to={p.site}
                        className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition-all"
                        style={{ background: `${p.accent}18`, color: p.accent, border: `1.5px solid ${p.accent}40` }}
                        onMouseEnter={e => e.currentTarget.style.background = `${p.accent}30`}
                        onMouseLeave={e => e.currentTarget.style.background = `${p.accent}18`}>
                        Voir la page <ArrowRight className="w-4 h-4" />
                      </Link>
                    ) : (
                      <a href={p.site} target="_blank" rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition-all"
                        style={{ background: `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.goldLight})`, color: BRAND.navy }}
                        onMouseEnter={e => e.currentTarget.style.opacity = "0.9"}
                        onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                        Site officiel <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="p-10 rounded-3xl"
            style={{ background: `linear-gradient(135deg, ${BRAND.navyLight} 0%, ${BRAND.navy} 100%)`, border: `1px solid ${BRAND.gold}25` }}>
            <p className="text-2xl font-black text-white mb-3">Une question sur un projet ?</p>
            <p className="text-sm mb-6" style={{ color: BRAND.silver, opacity: 0.75 }}>
              Olivier Trevis est disponible pour toute demande d'information, de partenariat ou de collaboration.
            </p>
            <Link to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-black text-sm transition-all hover:opacity-90"
              style={{ background: `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.goldLight})`, color: BRAND.navy }}>
              Nous contacter <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
