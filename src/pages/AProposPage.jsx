import { motion } from "framer-motion";
import { Heart, Users, Star, MapPin, Mic, Trophy, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { LOGOS } from "@/api/supabase";
import { SOCIAL_LINKS } from "@/api/links";

function FbIcon() { return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>; }
function IgIcon() { return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>; }

const VALEURS = [
  { icon: <Heart className="w-5 h-5" />,    titre: "Engagement local",         desc: "Dour et sa région sont au cœur de chaque initiative. L'ancrage local est une force, pas une limite.", color: "text-red-400",    bg: "bg-red-500/10",    border: "border-red-500/20" },
  { icon: <Users className="w-5 h-5" />,    titre: "Inclusion",                desc: "Chaque projet est pensé pour rassembler, quelle que soit l'origine, l'âge ou le profil.", color: "text-blue-400",   bg: "bg-blue-500/10",   border: "border-blue-500/20" },
  { icon: <Star className="w-5 h-5" />,     titre: "Valorisation des talents", desc: "Révéler et mettre en lumière les talents locaux est une mission quotidienne.", color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20" },
  { icon: <Mic className="w-5 h-5" />,      titre: "Culture & Art",            desc: "L'art, la mode et la culture sont des vecteurs de fierté et de développement pour Dour.", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
  { icon: <Trophy className="w-5 h-5" />,   titre: "Excellence",               desc: "Des événements de qualité qui reflètent positivement l'image de Dour.", color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20" },
  { icon: <MapPin className="w-5 h-5" />,   titre: "Visibilité",               desc: "Faire rayonner Dour au-delà de ses frontières, en Belgique et à l'international.", color: "text-green-400",  bg: "bg-green-500/10",  border: "border-green-500/20" },
];

const ROLES = [
  {
    titre: "Organisateur d'événements",
    desc: "Miss & Mister Dour Fashionist'ART, Le Tour de Dour et de nombreuses initiatives culturelles locales — des événements qui rassemblent et valorisent Dour.",
    icon: <Sparkles className="w-5 h-5" />, color: "border-yellow-500/30", accent: "text-yellow-400",
  },
  {
    titre: "Président & membre d'ASBL",
    desc: "Impliqué dans plusieurs associations à but non lucratif œuvrant pour le développement local, culturel et associatif de Dour.",
    icon: <Users className="w-5 h-5" />, color: "border-blue-500/30", accent: "text-blue-400",
  },
  {
    titre: "Agent P&V Assurances",
    desc: "Votre conseiller de proximité à Dour pour tous vos projets d'assurances : auto, habitation, famille et entreprise.",
    icon: <Trophy className="w-5 h-5" />, color: "border-sky-500/30", accent: "text-sky-400",
  },
  {
    titre: "Créateur de contenu",
    desc: "Production de vidéos, de reportages locaux et de contenus digitaux pour valoriser les initiatives et les visages de Dour.",
    icon: <Mic className="w-5 h-5" />, color: "border-red-500/30", accent: "text-red-400",
  },
  {
    titre: "Ambassadeur de Dour",
    desc: "Porteur de la voix de Dour, de ses habitants, de ses talents et de sa culture dans les milieux associatifs et médiatiques.",
    icon: <MapPin className="w-5 h-5" />, color: "border-green-500/30", accent: "text-green-400",
  },
  {
    titre: "Coordinateur réseau local",
    desc: "Via Synergie Dour, il connecte les commerçants, indépendants et acteurs économiques locaux pour dynamiser la vie à Dour.",
    icon: <Star className="w-5 h-5" />, color: "border-purple-500/30", accent: "text-purple-400",
  },
];

const PROJETS_LIENS = [
  { label: "Miss & Mister Dour", href: "/miss-mister-dour", color: "border-yellow-500/40 text-yellow-400 hover:bg-yellow-500/10" },
  { label: "Tour de Dour",        href: "/tour-de-dour",     color: "border-red-500/40 text-red-400 hover:bg-red-500/10" },
  { label: "ASBL & Projets",      href: "/asbl",             color: "border-blue-500/40 text-blue-400 hover:bg-blue-500/10" },
  { label: "Partenaires",         href: "/partenaires",      color: "border-white/20 text-gray-300 hover:bg-white/5" },
  { label: "Contact",             href: "/contact",          color: "bg-yellow-500 text-black hover:bg-yellow-400 border-transparent font-black" },
];

export default function AProposPage() {
  return (
    <div className="min-h-screen bg-black text-white">

      {/* SEO meta simulé via title */}
      <title>À propos — Olivier Trevis · Dour · Acteur associatif et événementiel</title>

      {/* ── HERO ── */}
      <section className="relative py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-black" />
        <div className="absolute inset-0 opacity-8" style={{ background: "radial-gradient(ellipse at 30% 50%, #d4af37 0%, transparent 65%)" }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-yellow-400 tracking-[0.3em] text-xs uppercase font-semibold mb-4">À propos</p>
            <h1 className="text-5xl md:text-7xl font-black mb-4 leading-tight">
              Qui est{" "}
              <span style={{ background: "linear-gradient(135deg, #d4af37, #fff8e1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Olivier Trevis&nbsp;?
              </span>
            </h1>
            <div className="w-20 h-1 rounded-full mx-auto mb-6" style={{ background: "linear-gradient(90deg, transparent, #d4af37, transparent)" }} />
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
              Acteur local, associatif et événementiel basé à <strong className="text-white">Dour</strong> — il consacre son énergie à créer, rassembler et valoriser tout ce qui fait la richesse de cette ville et de ses habitants.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── PORTRAIT ── */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">

            {/* Visuel */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="relative max-w-sm mx-auto md:mx-0">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-gray-900 to-gray-950 border border-white/10 overflow-hidden flex items-center justify-center">
                <img src={LOGOS.olivierTrevis} alt="Olivier Trevis" className="w-3/4 h-3/4 object-contain"
                  onError={e => e.target.style.display = "none"} />
              </div>
              <div className="absolute bottom-6 left-6 right-6 bg-black/85 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                <p className="text-white font-black text-base">Olivier Trevis</p>
                <p className="text-yellow-400 text-xs tracking-widest uppercase mt-0.5">Dour · Belgique</p>
                <div className="flex gap-2 mt-3">
                  <a href={SOCIAL_LINKS.olivierTrevis.facebook} target="_blank" rel="noopener noreferrer"
                    className="text-gray-500 hover:text-[#1877f2] transition-colors"><FbIcon /></a>
                  <a href={SOCIAL_LINKS.olivierTrevis.instagram} target="_blank" rel="noopener noreferrer"
                    className="text-gray-500 hover:text-[#e1306c] transition-colors"><IgIcon /></a>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-28 h-28 rounded-2xl border border-yellow-500/15"
                style={{ background: "linear-gradient(135deg, #d4af3710, transparent)" }} />
            </motion.div>

            {/* Texte */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="text-yellow-400 tracking-widest text-xs uppercase font-semibold mb-4">Son histoire</p>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
                Un homme de terrain, ancré dans <span style={{ color: "#d4af37" }}>Dour</span>
              </h2>
              <div className="space-y-4 text-gray-400 leading-relaxed mb-8">
                <p>
                  Né et ancré à <strong className="text-white">Dour</strong>, Olivier Trevis est bien plus qu'un organisateur d'événements. Il est le reflet d'une génération qui croit que chaque ville, même modeste, peut rayonner grâce à ses talents et sa culture.
                </p>
                <p>
                  À travers ses projets, il porte une vision simple mais puissante : <em className="text-yellow-400">mettre en avant Dour, ses habitants, ses associations et ses initiatives</em>, pour créer un sentiment de fierté collective.
                </p>
                <p>
                  Que ce soit à travers les concours <strong className="text-white">Miss & Mister Dour Fashionist'ART</strong>, les reportages du <strong className="text-white">Tour de Dour</strong>, son travail d'agent <strong className="text-white">P&V Assurances</strong> ou ses engagements via <strong className="text-white">Synergie Dour</strong> — chaque action est guidée par l'amour de sa communauté.
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {["Dour", "Belgique", "ASBL", "Événementiel", "Mode & Art", "Culture locale", "Associations"].map((t, i) => (
                  <span key={i} className="px-3 py-1 rounded-full text-xs border border-white/10 text-gray-400 bg-white/3">{t}</span>
                ))}
              </div>

              {/* Vision */}
              <blockquote className="border-l-2 border-yellow-500 pl-5 italic text-gray-300 text-base leading-relaxed">
                "Dour mérite d'être fière d'elle-même. Chaque talent, chaque initiative, chaque association qui y fleurit est une preuve que la culture et l'engagement peuvent transformer une communauté."
                <footer className="mt-3 text-yellow-400 font-semibold text-sm not-italic">— Olivier Trevis</footer>
              </blockquote>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── RÔLES ── */}
      <section className="py-20 px-4 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-blue-400 tracking-widest text-xs uppercase font-semibold mb-3">Implication associative</p>
            <h2 className="text-3xl md:text-4xl font-black text-white">Ses rôles dans la communauté</h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto text-sm">Un engagement multifacette au service de Dour et de ses habitants.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ROLES.map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }} viewport={{ once: true }}
                className={`p-6 rounded-2xl bg-gray-900 border ${r.color} hover:scale-[1.02] transition-all duration-300`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${r.accent} bg-white/5`}>
                  {r.icon}
                </div>
                <h3 className="text-white font-black text-lg mb-3">{r.titre}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALEURS ── */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-red-400 tracking-widest text-xs uppercase font-semibold mb-3">Ce qui le guide</p>
            <h2 className="text-3xl md:text-4xl font-black text-white">Ses valeurs</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {VALEURS.map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }} viewport={{ once: true }}
                className="p-6 rounded-2xl bg-gray-900 border border-white/5 hover:border-yellow-500/15 transition-all text-center">
                <div className={`w-12 h-12 rounded-full ${v.bg} border ${v.border} flex items-center justify-center mx-auto mb-4 ${v.color}`}>
                  {v.icon}
                </div>
                <h3 className="text-white font-bold text-base mb-2">{v.titre}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISION ── */}
      <section className="py-24 px-4 relative overflow-hidden bg-gray-950">
        <div className="absolute inset-0 opacity-5" style={{ background: "radial-gradient(ellipse at center, #3b82f6 0%, transparent 70%)" }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="text-blue-400 tracking-widest text-xs uppercase font-semibold mb-4">Sa vision</p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-8">Une plateforme pour Dour</h2>
          <div className="grid md:grid-cols-3 gap-6 text-left mb-12">
            {[
              { titre: "Valoriser",  desc: "Mettre en lumière les talents, les associations et les initiatives locales qui font la fierté de Dour.", color: "text-yellow-400" },
              { titre: "Rassembler", desc: "Créer des ponts entre les habitants, les entreprises, les artistes et les associations de la région.", color: "text-blue-400" },
              { titre: "Rayonner",   desc: "Faire connaître Dour au-delà de ses frontières, en Belgique et à l'international, grâce à ses projets.", color: "text-red-400" },
            ].map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                className="p-6 rounded-2xl bg-gray-900 border border-white/5">
                <p className={`font-black text-xl mb-3 ${v.color}`}>{v.titre}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 px-4 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-gray-500 text-sm mb-6">Découvrir les projets d'Olivier Trevis</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {PROJETS_LIENS.map((l, i) => (
              <Link key={i} to={l.href}
                className={`px-6 py-3 rounded-full text-sm border transition-all font-semibold flex items-center gap-2 ${l.color}`}>
                {l.label} {i === PROJETS_LIENS.length - 1 && <ArrowRight className="w-4 h-4" />}
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
