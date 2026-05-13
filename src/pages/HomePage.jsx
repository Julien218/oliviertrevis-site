import { useState, useEffect } from "react";
import { LOGOS as SB_LOGOS } from "@/api/supabase";
import { SOCIAL_LINKS } from "@/api/links";
import { Link } from "react-router-dom";
import { Video, Actualite } from "@/api/entities";
import { motion } from "framer-motion";
import {
  ArrowRight, Play, Trophy, ChevronDown, Shield, Sparkles, Users,
  MapPin, Mic, Camera, Heart, Star, ExternalLink, Mail, MessageCircle,
  Facebook, Instagram
} from "lucide-react";

// ── Photos hero ─────────────────────────────────────────────────────────────
const PHOTOS = [
  "https://media.base44.com/images/public/6a0371a87c9257126b051d5a/155bbfad3_WhatsAppImage2026-04-30at060533.jpg",
  "https://media.base44.com/images/public/6a0371a87c9257126b051d5a/d7db2f75a_WhatsAppImage2026-04-30at0605331.jpg",
  "https://media.base44.com/images/public/6a0371a87c9257126b051d5a/1de0407b8_WhatsAppImage2026-04-30at0605332.jpg",
  "https://media.base44.com/images/public/6a0371a87c9257126b051d5a/05ca7758e_WhatsAppImage2026-04-30at0605333.jpg",
  "https://media.base44.com/images/public/6a0371a87c9257126b051d5a/dd27d338c_WhatsAppImage2026-04-30at0605334.jpg",
  "https://media.base44.com/images/public/6a0371a87c9257126b051d5a/4d236abc0_WhatsAppImage2026-04-30at0605335.jpg",
];

// ── Icônes réseaux sociaux ───────────────────────────────────────────────────
function FbIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}
function IgIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}
function TkIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  );
}

// ── Données projets avec tous les liens ──────────────────────────────────────
const PROJETS = [
  {
    id: "miss-mister",
    logo: SB_LOGOS.missMisterDour,
    logoBg: "#0a0a0a",
    accent: "#d4af37",
    accentDark: "#92600a",
    gradient: "from-yellow-950/70 to-black",
    border: "border-yellow-500/30",
    badgeColor: "text-yellow-400",
    tag: "Concours & Événement",
    titre: "Miss & Mister Dour",
    sousTitre: "Fashionist'ART",
    desc: "Le concours d'élégance, de créativité et d'art local qui révèle les talents de Dour depuis plus de 27 éditions. Une célébration de la mode, de l'art et de la représentation locale.",
    interne: "/miss-mister-dour",
    site: SOCIAL_LINKS.missMisterDour.site,
    socials: [
      { href: SOCIAL_LINKS.missMisterDour.facebook,  Icon: FbIcon, label: "Facebook",  color: "#1877f2" },
      { href: SOCIAL_LINKS.missMisterDour.instagram, Icon: IgIcon, label: "Instagram", color: "#e1306c" },
      { href: SOCIAL_LINKS.missMisterDour.tiktok,    Icon: TkIcon, label: "TikTok",    color: "#ffffff" },
    ],
    stats: [{ val: "27+", label: "Éditions" }, { val: "100+", label: "Candidats" }, { val: "1", label: "Miss Province 2026" }],
  },
  {
    id: "fashionist-art",
    logo: SB_LOGOS.fashionistArt,
    logoBg: "#0a0a0a",
    accent: "#ec4899",
    accentDark: "#831843",
    gradient: "from-pink-950/70 to-black",
    border: "border-pink-500/30",
    badgeColor: "text-pink-400",
    tag: "Mode & Art",
    titre: "Fashionist'ART",
    sousTitre: "Dour",
    desc: "L'événement où la mode rencontre l'art, la créativité et la passion. Défilés, créations originales, artistes locaux et rencontres hautes en couleur au cœur de Dour.",
    interne: "/miss-mister-dour",
    site: "https://www.fashionistartdour.be",
    socials: [
      { href: SOCIAL_LINKS.fashionistArt.facebook,  Icon: FbIcon, label: "Facebook",  color: "#1877f2" },
      { href: SOCIAL_LINKS.fashionistArt.instagram, Icon: IgIcon, label: "Instagram", color: "#e1306c" },
    ],
    stats: [{ val: "2+", label: "Éditions" }, { val: "50+", label: "Créateurs" }, { val: "∞", label: "Inspiration" }],
  },
  {
    id: "tour-de-dour",
    logo: SB_LOGOS.tourDeDour,
    logoBg: "#0a0a0a",
    accent: "#ef4444",
    accentDark: "#7f1d1d",
    gradient: "from-red-950/70 to-black",
    border: "border-red-500/30",
    badgeColor: "text-red-400",
    tag: "Vidéos & Découvertes",
    titre: "Le Tour de Dour",
    sousTitre: "d'Olivier Trevis",
    desc: "Une série de vidéos, visites filmées, interviews et reportages pour découvrir Dour autrement — ses lieux, ses gens, ses histoires et ses initiatives. 47+ épisodes publiés.",
    interne: "/tour-de-dour",
    site: null,
    socials: [
      { href: SOCIAL_LINKS.tourDeDour.facebook,  Icon: FbIcon, label: "Facebook Tour de Dour", color: "#1877f2" },
      { href: SOCIAL_LINKS.olivierTrevis.instagram, Icon: IgIcon, label: "Instagram",          color: "#e1306c" },
    ],
    stats: [{ val: "47+", label: "Épisodes" }, { val: "2245+", label: "Abonnés FB" }, { val: "∞", label: "Lieux visités" }],
  },
  {
    id: "synergie-dour",
    logo: SB_LOGOS.synergieDour,
    logoBg: "#0a1628",
    accent: "#3b82f6",
    accentDark: "#1e3a5f",
    gradient: "from-blue-950/70 to-black",
    border: "border-blue-500/30",
    badgeColor: "text-blue-400",
    tag: "Réseau local",
    titre: "Synergie Dour",
    sousTitre: "Association des commerçants",
    desc: "La plateforme qui connecte les commerçants, indépendants et professions libérales de Dour. Un réseau local fort pour dynamiser la vie économique et sociale de la ville.",
    interne: null,
    site: SOCIAL_LINKS.synergieDour.site,
    socials: [
      { href: SOCIAL_LINKS.synergieDour.facebook, Icon: FbIcon, label: "Facebook Synergie Dour", color: "#1877f2" },
    ],
    stats: [{ val: "1", label: "Communauté" }, { val: "Dour", label: "Ancrage local" }, { val: "∞", label: "Connexions" }],
  },
  {
    id: "pv-assurances",
    logo: SB_LOGOS.pvAssurances,
    logoBg: "#fff",
    accent: "#0ea5e9",
    accentDark: "#0c4a6e",
    gradient: "from-sky-950/70 to-black",
    border: "border-sky-500/30",
    badgeColor: "text-sky-400",
    tag: "Assurances",
    titre: "P&V Assurances",
    sousTitre: "Agence de Dour",
    desc: "Votre agent P&V de confiance à Dour. Protection auto, habitation, famille et entreprise. Un accompagnement personnalisé pour tous vos projets d'assurances.",
    interne: null,
    site: SOCIAL_LINKS.pvAssurances.site,
    socials: [
      { href: SOCIAL_LINKS.pvAssurances.facebook, Icon: FbIcon, label: "Facebook P&V Dour", color: "#1877f2" },
    ],
    stats: [{ val: "1402", label: "J'aime FB" }, { val: "Dour", label: "Agence locale" }, { val: "P&V", label: "Réseau national" }],
  },
];

// ── Carrousel logos ──────────────────────────────────────────────────────────
const LOGOS_CAROUSEL = [
  { src: SB_LOGOS.olivierTrevis,  label: "Olivier Trevis",      href: "/a-propos",                              external: false, bg: "#0d1117" },
  { src: SB_LOGOS.pvAssurances,   label: "P&V Assurances Dour", href: SOCIAL_LINKS.pvAssurances.site,           external: true,  bg: "#fff"    },
  { src: SB_LOGOS.missMisterDour, label: "Miss & Mister Dour",  href: SOCIAL_LINKS.missMisterDour.site,         external: true,  bg: "#000"    },
  { src: SB_LOGOS.synergieDour,   label: "Synergie Dour",       href: SOCIAL_LINKS.synergieDour.site,           external: true,  bg: "#0d1b4b" },
  { src: SB_LOGOS.fashionistArt,  label: "Fashionist'ART",      href: "https://www.fashionistartdour.be",       external: true,  bg: "#000"    },
  { src: SB_LOGOS.tourDeDour,     label: "Le Tour de Dour",     href: SOCIAL_LINKS.tourDeDour.facebook,         external: true,  bg: "#0a1628" },
];
const LOGOS_LOOP = [...LOGOS_CAROUSEL, ...LOGOS_CAROUSEL, ...LOGOS_CAROUSEL];

// ── Valeurs ──────────────────────────────────────────────────────────────────
const VALEURS = [
  { icon: <Heart className="w-5 h-5" />,   titre: "Engagement local",        desc: "Chaque projet est ancré dans la réalité de Dour et de sa communauté." },
  { icon: <Users className="w-5 h-5" />,   titre: "Inclusion",               desc: "Rassembler, peu importe l'âge, l'origine ou le profil." },
  { icon: <Star className="w-5 h-5" />,    titre: "Valorisation des talents", desc: "Révéler et mettre en lumière les talents locaux." },
  { icon: <Sparkles className="w-5 h-5" />,titre: "Culture & Art",           desc: "L'art et la culture comme vecteurs de fierté et de développement." },
  { icon: <Trophy className="w-5 h-5" />,  titre: "Excellence",              desc: "Des événements qui reflètent positivement l'image de Dour." },
  { icon: <MapPin className="w-5 h-5" />,  titre: "Visibilité",              desc: "Faire rayonner Dour en Belgique et à l'international." },
];

export default function HomePage() {
  const [actualites, setActualites]   = useState([]);
  const [videos, setVideos]           = useState([]);
  const [activePhoto, setActivePhoto] = useState(0);

  useEffect(() => {
    Actualite.filter({ a_la_une: true, publie: true }).then(d => setActualites(d.slice(0, 3))).catch(() => {});
    Video.filter({ a_la_une: true, actif: true }).then(d => setVideos(d.slice(0, 4))).catch(() => {});
    const t = setInterval(() => setActivePhoto(p => (p + 1) % PHOTOS.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">

      <style>{`
        @keyframes scrollLeft {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
        .carousel-track {
          display: flex;
          width: max-content;
          animation: scrollLeft 30s linear infinite;
        }
        .carousel-track:hover { animation-play-state: paused; }
      `}</style>

      {/* ════════════════════════════════════════════════════════
          HERO — Photo carousel + titre
      ════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          {PHOTOS.map((src, i) => (
            <div key={i} className="absolute inset-0 transition-opacity duration-1200"
              style={{ opacity: i === activePhoto ? 1 : 0 }}>
              <img src={src} alt="" className="w-full h-full object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/10" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
            </div>
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 w-full">
          <div className="max-w-2xl">
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 mb-8">
                <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                <span className="text-yellow-400 text-xs font-semibold tracking-widest uppercase">Dour · Belgique</span>
              </div>
              <h1 className="text-7xl md:text-9xl font-black leading-none mb-2 tracking-tight text-white">OLIVIER</h1>
              <h1 className="text-7xl md:text-9xl font-black leading-none mb-6 tracking-tight"
                style={{ background: "linear-gradient(135deg, #d4af37 0%, #fff8e1 50%, #d4af37 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                TREVIS
              </h1>
              <div className="w-20 h-1 rounded-full bg-gradient-to-r from-yellow-500 to-transparent mb-6" />
              <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-2">
                Agent P&V · Organisateur d'événements · Acteur associatif
              </p>
              <p className="text-gray-500 text-base italic mb-10">« Agir et construire ensemble »</p>

              {/* Réseaux sociaux personnels */}
              <div className="flex items-center gap-3 mb-10">
                <a href={SOCIAL_LINKS.olivierTrevis.facebook} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-gray-400 hover:text-[#1877f2] hover:border-[#1877f2]/40 hover:bg-[#1877f2]/10 transition-all">
                  <FbIcon />
                </a>
                <a href={SOCIAL_LINKS.olivierTrevis.instagram} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-gray-400 hover:text-[#e1306c] hover:border-[#e1306c]/40 hover:bg-[#e1306c]/10 transition-all">
                  <IgIcon />
                </a>
                <a href={SOCIAL_LINKS.missMisterDour.tiktok} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/40 hover:bg-white/10 transition-all">
                  <TkIcon />
                </a>
                <span className="w-px h-5 bg-white/10" />
                <a href="mailto:contact@oliviertrevis.be"
                  className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-gray-400 hover:text-yellow-400 hover:border-yellow-500/40 hover:bg-yellow-500/10 transition-all">
                  <Mail className="w-4 h-4" />
                </a>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link to="/miss-mister-dour"
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-600 to-yellow-500 text-black font-black rounded-full hover:from-yellow-500 hover:to-yellow-400 transition-all text-sm">
                  <Trophy className="w-4 h-4" /> Miss & Mister Dour
                </Link>
                <Link to="/tour-de-dour"
                  className="flex items-center gap-2 px-6 py-3 border border-red-500/50 text-red-400 hover:bg-red-500/10 rounded-full transition-all text-sm font-semibold">
                  <Play className="w-4 h-4" /> Tour de Dour
                </Link>
                <Link to="/contact"
                  className="flex items-center gap-2 px-6 py-3 border border-white/20 text-gray-300 hover:bg-white/5 rounded-full transition-all text-sm font-semibold">
                  Contact <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Indicateurs photos */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {PHOTOS.map((_, i) => (
            <button key={i} onClick={() => setActivePhoto(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === activePhoto ? "bg-yellow-400 w-6" : "bg-white/25 w-2"}`} />
          ))}
        </div>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 right-8 text-gray-600 hidden md:block">
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════════
          CARROUSEL LOGOS
      ════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-black border-y border-white/5 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 mb-10 text-center">
          <p className="text-yellow-400 tracking-[0.3em] text-xs uppercase font-semibold mb-2">Ses univers</p>
          <h2 className="text-2xl md:text-3xl font-black text-white">Tous les projets d'Olivier Trevis</h2>
        </div>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, #000, transparent)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, #000, transparent)" }} />
          <div className="overflow-hidden">
            <div className="carousel-track" style={{ gap: "20px", padding: "0 10px" }}>
              {LOGOS_LOOP.map((logo, i) => {
                const Wrapper = logo.external ? "a" : Link;
                const props = logo.external
                  ? { href: logo.href, target: "_blank", rel: "noopener noreferrer" }
                  : { to: logo.href };
                return (
                  <Wrapper key={i} {...props} className="group flex-shrink-0 cursor-pointer" style={{ width: 180, height: 180 }}>
                    <div className="w-full h-full rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:border-yellow-500/50 group-hover:scale-105"
                      style={{ background: logo.bg, boxShadow: "0 4px 24px rgba(0,0,0,0.5)" }}>
                      <img src={logo.src} alt={logo.label}
                        className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <div className="mt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-xs font-semibold text-yellow-400 tracking-wide">{logo.label}</p>
                    </div>
                  </Wrapper>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          QUI EST OLIVIER TREVIS
      ════════════════════════════════════════════════════════ */}
      <section id="a-propos" className="py-24 px-4 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Photo */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-gray-900 to-gray-950 flex items-center justify-center max-w-sm mx-auto md:mx-0">
                <img src={SB_LOGOS.olivierTrevis} alt="Olivier Trevis"
                  className="w-3/4 h-3/4 object-contain" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-black/80 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <p className="text-white font-black text-lg leading-tight">Olivier Trevis</p>
                    <p className="text-yellow-400 text-xs tracking-widest uppercase mt-1">Dour · Belgique</p>
                    <div className="flex gap-2 mt-3">
                      <a href={SOCIAL_LINKS.olivierTrevis.facebook} target="_blank" rel="noopener noreferrer"
                        className="text-gray-500 hover:text-[#1877f2] transition-colors"><FbIcon /></a>
                      <a href={SOCIAL_LINKS.olivierTrevis.instagram} target="_blank" rel="noopener noreferrer"
                        className="text-gray-500 hover:text-[#e1306c] transition-colors"><IgIcon /></a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Texte */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="text-yellow-400 tracking-widest text-xs uppercase mb-3 font-semibold">À propos</p>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
                Un homme engagé au cœur de <span style={{ color: "#d4af37" }}>Dour</span>
              </h2>
              <div className="space-y-4 text-gray-400 leading-relaxed mb-8">
                <p>Né et ancré à <strong className="text-white">Dour</strong>, Olivier Trevis est bien plus qu'un organisateur d'événements. Il est le reflet d'une génération qui croit que chaque ville peut rayonner grâce à ses talents et sa culture.</p>
                <p>À travers ses projets, il porte une vision simple mais puissante : <em className="text-yellow-400">mettre en avant Dour, ses habitants, ses associations et ses initiatives</em>, pour créer un sentiment de fierté collective.</p>
                <p>Agent P&V Assurances, organisateur du concours <strong className="text-white">Miss & Mister Dour Fashionist'ART</strong>, fondateur du <strong className="text-white">Tour de Dour</strong>, animateur de <strong className="text-white">Synergie Dour</strong>...</p>
              </div>

              {/* Rôles */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  "Organisateur d'événements",
                  "Président d'ASBL",
                  "Créateur de contenu",
                  "Ambassadeur de Dour",
                ].map((r, i) => (
                  <div key={i} className="flex items-center gap-2 p-3 rounded-xl bg-gray-900 border border-white/5">
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 flex-shrink-0" />
                    <span className="text-white text-sm font-medium">{r}</span>
                  </div>
                ))}
              </div>

              <blockquote className="border-l-2 border-yellow-500 pl-4 italic text-gray-300 text-sm mb-6">
                "Dour mérite d'être fière d'elle-même. Chaque talent, chaque initiative est une preuve que la culture peut transformer une communauté."
              </blockquote>

              <Link to="/a-propos"
                className="inline-flex items-center gap-2 px-6 py-3 border border-yellow-500/40 text-yellow-400 hover:bg-yellow-500/10 rounded-full transition-all text-sm font-semibold">
                En savoir plus <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          PROJETS — CARTES CLIQUABLES
      ════════════════════════════════════════════════════════ */}
      <section id="projets" className="py-24 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-yellow-400 tracking-[0.3em] text-xs uppercase font-semibold mb-3">Ses engagements</p>
            <h2 className="text-3xl md:text-5xl font-black text-white">Tous les projets</h2>
            <p className="text-gray-500 mt-4 text-base max-w-xl mx-auto">Cliquez sur une carte pour accéder au site officiel ou à la page dédiée.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJETS.map((p, i) => {
              const CardContent = (
                <motion.div
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }} viewport={{ once: true }}
                  className={`group relative rounded-3xl border ${p.border} bg-gradient-to-br ${p.gradient} p-6 flex flex-col h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-pointer`}
                  style={{ boxShadow: `0 0 0 0 ${p.accent}00` }}
                  whileHover={{ boxShadow: `0 8px 40px ${p.accent}25` }}
                >
                  {/* Header : logo + badge */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden border border-white/10 flex-shrink-0"
                      style={{ background: p.logoBg }}>
                      <img src={p.logo} alt={p.titre} className="w-full h-full object-contain p-2" />
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${p.badgeColor} bg-black/40`}
                      style={{ borderColor: p.accent + "40" }}>
                      {p.tag}
                    </span>
                  </div>

                  {/* Titre */}
                  <h3 className="text-xl font-black text-white mb-1">{p.titre}</h3>
                  <p className={`text-sm font-medium mb-3 ${p.badgeColor}`}>{p.sousTitre}</p>
                  <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-5">{p.desc}</p>

                  {/* Stats */}
                  <div className="flex gap-4 mb-5 py-4 border-t border-b border-white/5">
                    {p.stats.map((s, j) => (
                      <div key={j} className="text-center">
                        <p className="text-white font-black text-lg leading-none">{s.val}</p>
                        <p className="text-gray-500 text-xs mt-1">{s.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Réseaux sociaux */}
                  <div className="flex items-center gap-2 mb-5">
                    {p.socials.map((s, j) => (
                      <a key={j} href={s.href} target="_blank" rel="noopener noreferrer"
                        title={s.label}
                        onClick={e => e.stopPropagation()}
                        className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-gray-500 transition-all hover:scale-110"
                        style={{ '--hover-color': s.color }}
                        onMouseEnter={e => { e.currentTarget.style.color = s.color; e.currentTarget.style.borderColor = s.color + "50"; e.currentTarget.style.background = s.color + "15"; }}
                        onMouseLeave={e => { e.currentTarget.style.color = ""; e.currentTarget.style.borderColor = ""; e.currentTarget.style.background = ""; }}>
                        <s.Icon />
                      </a>
                    ))}
                    {p.site && (
                      <a href={p.site} target="_blank" rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        className="ml-auto flex items-center gap-1 text-xs font-medium transition-all"
                        style={{ color: p.accent }}
                        title={`Visiter ${p.titre}`}>
                        <ExternalLink className="w-3 h-3" /> Site officiel
                      </a>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold transition-colors" style={{ color: p.accent }}>
                      {p.interne ? "Voir la page →" : p.site ? "Visiter →" : "Découvrir →"}
                    </span>
                    <div className="w-8 h-8 rounded-full border flex items-center justify-center transition-all group-hover:scale-110"
                      style={{ borderColor: p.accent + "40", color: p.accent }}>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              );

              // Carte interne → Link, externe → <a>
              if (p.interne) {
                return <Link key={p.id} to={p.interne} className="block h-full">{CardContent}</Link>;
              }
              return (
                <a key={p.id} href={p.site || "#"} target="_blank" rel="noopener noreferrer" className="block h-full">
                  {CardContent}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          VALEURS
      ════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 bg-gray-950 border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-red-400 tracking-widest text-xs uppercase mb-3 font-semibold">Ce qui le guide</p>
            <h2 className="text-3xl md:text-4xl font-black text-white">Ses valeurs</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {VALEURS.map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }} viewport={{ once: true }}
                className="p-6 rounded-2xl bg-gray-900 border border-white/5 hover:border-yellow-500/20 transition-all text-center">
                <div className="w-11 h-11 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mx-auto mb-4 text-yellow-400">
                  {v.icon}
                </div>
                <h3 className="text-white font-bold mb-2">{v.titre}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          VIDÉOS À LA UNE
      ════════════════════════════════════════════════════════ */}
      <section className="py-24 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-red-400 tracking-widest text-xs uppercase mb-2 font-semibold">Vidéos</p>
              <h2 className="text-3xl font-black text-white">Dernières vidéos</h2>
            </div>
            <Link to="/videos" className="text-yellow-400 hover:text-yellow-300 flex items-center gap-2 text-sm font-medium">
              Toutes les vidéos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {videos.length === 0 ? (
            <div className="text-center py-16 rounded-2xl bg-gray-900 border border-white/5">
              <Play className="w-16 h-16 text-red-400/30 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Vidéos à venir</h3>
              <p className="text-gray-400 text-sm mb-6">Les prochaines vidéos seront ajoutées ici.</p>
              <a href={SOCIAL_LINKS.tourDeDour.facebook} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-[#1877f2]/30 text-[#1877f2] hover:bg-[#1877f2]/10 transition-all text-sm">
                <FbIcon /> Suivre sur Facebook
              </a>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {videos.map((v, i) => (
                <motion.a key={i} href={v.youtube_url || `https://youtube.com/watch?v=${v.youtube_id}`}
                  target="_blank" rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }} viewport={{ once: true }}
                  className="group rounded-2xl bg-gray-900 border border-white/5 hover:border-red-500/30 overflow-hidden transition-all">
                  <div className="aspect-video bg-gray-800 relative overflow-hidden">
                    <img src={v.miniature_url || `https://img.youtube.com/vi/${v.youtube_id}/mqdefault.jpg`}
                      alt={v.titre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
                        <Play className="w-5 h-5 text-white ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <span className="text-xs text-red-400 font-medium uppercase tracking-wider">{v.categorie}</span>
                    <h3 className="text-white font-bold mt-1 line-clamp-2 text-sm">{v.titre}</h3>
                  </div>
                </motion.a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          ACTUALITÉS
      ════════════════════════════════════════════════════════ */}
      {actualites.length > 0 && (
        <section className="py-20 px-4 bg-gray-950 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-yellow-400 tracking-widest text-xs uppercase mb-2 font-semibold">Actualités</p>
                <h2 className="text-3xl font-black text-white">À la une</h2>
              </div>
              <Link to="/actualites" className="text-yellow-400 hover:text-yellow-300 flex items-center gap-2 text-sm font-medium">
                Toutes les actualités <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {actualites.map((a, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                  className="rounded-2xl bg-gray-900 border border-white/5 overflow-hidden hover:border-yellow-500/20 transition-all">
                  {a.image_url && <img src={a.image_url} alt={a.titre} className="w-full h-44 object-cover" />}
                  <div className="p-6">
                    <span className="text-xs text-yellow-400 font-semibold uppercase tracking-wider">{a.categorie}</span>
                    <h3 className="text-white font-bold mt-2 mb-2">{a.titre}</h3>
                    <p className="text-gray-400 text-sm line-clamp-2">{a.extrait}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════
          CTA CONTACT
      ════════════════════════════════════════════════════════ */}
      <section className="py-24 px-4 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ background: "radial-gradient(ellipse at center, #d4af37 0%, transparent 70%)" }} />
        <div className="relative max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-yellow-400 tracking-widest text-xs uppercase mb-4 font-semibold">Un projet ? Une question ?</p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Prenons <span style={{ color: "#d4af37" }}>contact</span>
            </h2>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
              Partenariat, presse, candidature, bénévolat ou simplement dire bonjour — toutes les portes sont ouvertes.
            </p>

            {/* Canaux de contact */}
            <div className="flex flex-wrap gap-4 justify-center mb-10">
              <a href="mailto:contact@oliviertrevis.be"
                className="flex items-center gap-2 px-6 py-3 bg-yellow-500 text-black font-bold rounded-full hover:bg-yellow-400 transition-all">
                <Mail className="w-4 h-4" /> Envoyer un email
              </a>
              <a href="https://wa.me/32475426942" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-bold rounded-full hover:bg-green-500 transition-all">
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
              <Link to="/contact"
                className="flex items-center gap-2 px-6 py-3 border border-white/20 text-gray-300 hover:bg-white/5 rounded-full transition-all font-semibold">
                Formulaire <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Tous les réseaux sociaux */}
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { href: SOCIAL_LINKS.olivierTrevis.facebook,  Icon: FbIcon, label: "Olivier Trevis",       color: "#1877f2" },
                { href: SOCIAL_LINKS.olivierTrevis.instagram, Icon: IgIcon, label: "@oliviertrevis",       color: "#e1306c" },
                { href: SOCIAL_LINKS.missMisterDour.facebook, Icon: FbIcon, label: "Miss & Mister Dour",   color: "#1877f2" },
                { href: SOCIAL_LINKS.missMisterDour.instagram,Icon: IgIcon, label: "@miss_et_mister_dour", color: "#e1306c" },
                { href: SOCIAL_LINKS.missMisterDour.tiktok,   Icon: TkIcon, label: "@miss_mister_dour",    color: "#ffffff" },
                { href: SOCIAL_LINKS.fashionistArt.facebook,  Icon: FbIcon, label: "Fashionist'ART",       color: "#1877f2" },
                { href: SOCIAL_LINKS.tourDeDour.facebook,     Icon: FbIcon, label: "Tour de Dour",         color: "#1877f2" },
                { href: SOCIAL_LINKS.pvAssurances.facebook,   Icon: FbIcon, label: "P&V Assurances Dour",  color: "#1877f2" },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  title={s.label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-gray-500 text-xs hover:border-white/20 transition-all"
                  onMouseEnter={e => { e.currentTarget.style.color = s.color; e.currentTarget.style.background = s.color + "12"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = ""; e.currentTarget.style.background = ""; }}>
                  <s.Icon className="w-3.5 h-3.5" /> {s.label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
