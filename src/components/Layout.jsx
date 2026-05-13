import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Trophy, Play, ChevronDown } from "lucide-react";
import { LOGOS } from "@/api/supabase";
import { SOCIAL_LINKS } from "@/api/links";

function FbIcon({ className = "w-4 h-4" }) {
  return <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
}
function IgIcon({ className = "w-4 h-4" }) {
  return <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>;
}
function TkIcon({ className = "w-4 h-4" }) {
  return <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>;
}

const NAV_ITEMS = [
  { label: "Accueil",           href: "/" },
  { label: "À propos",          href: "/a-propos" },
  { label: "ASBL & Projets",    href: "/asbl" },
  { label: "Miss & Mister Dour",href: "/miss-mister-dour" },
  { label: "Tour de Dour",      href: "/tour-de-dour" },
  { label: "Vidéos",            href: "/videos" },
  { label: "Actualités",        href: "/actualites" },
  { label: "Galerie",           href: "/galerie" },
  { label: "Partenaires",       href: "/partenaires" },
  { label: "Contact",           href: "/contact" },
];

const FOOTER_SOCIALS = [
  { href: SOCIAL_LINKS.olivierTrevis.facebook,   Icon: FbIcon, label: "Facebook Olivier Trevis",    color: "#1877f2" },
  { href: SOCIAL_LINKS.olivierTrevis.instagram,  Icon: IgIcon, label: "Instagram Olivier Trevis",   color: "#e1306c" },
  { href: SOCIAL_LINKS.missMisterDour.facebook,  Icon: FbIcon, label: "Miss & Mister Dour FB",      color: "#1877f2" },
  { href: SOCIAL_LINKS.missMisterDour.instagram, Icon: IgIcon, label: "Miss & Mister Dour IG",      color: "#e1306c" },
  { href: SOCIAL_LINKS.missMisterDour.tiktok,    Icon: TkIcon, label: "Miss & Mister Dour TikTok",  color: "#fff" },
  { href: SOCIAL_LINKS.fashionistArt.facebook,   Icon: FbIcon, label: "Fashionist'ART FB",          color: "#1877f2" },
  { href: SOCIAL_LINKS.tourDeDour.facebook,      Icon: FbIcon, label: "Tour de Dour FB",            color: "#1877f2" },
  { href: SOCIAL_LINKS.pvAssurances.facebook,    Icon: FbIcon, label: "P&V Assurances Dour",        color: "#1877f2" },
];

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isActive = (href) => href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">

      {/* ── NAVBAR ── */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-black/96 backdrop-blur-lg border-b border-white/8 py-2" : "bg-transparent py-4"}`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-yellow-500/60 flex items-center justify-center bg-black">
              <img src={LOGOS.olivierTrevis} alt="OT" className="w-full h-full object-contain p-1"
                onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} />
              <span className="hidden items-center justify-center font-black text-sm text-yellow-400 w-full h-full">OT</span>
            </div>
            <div className="hidden sm:block">
              <p className="font-black text-white text-sm leading-none tracking-tight">Olivier Trevis</p>
              <p className="text-xs leading-none mt-0.5 text-yellow-500">Dour · Associatif · Événementiel</p>
            </div>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden xl:flex items-center gap-0.5 flex-1 justify-center">
            {NAV_ITEMS.slice(0, 8).map(n => (
              <Link key={n.href} to={n.href}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${isActive(n.href) ? "text-yellow-400 bg-yellow-500/10" : "text-gray-400 hover:text-white hover:bg-white/5"}`}>
                {n.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Burger */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link to="/contact"
              className="hidden md:flex items-center gap-1.5 px-4 py-2 bg-yellow-500 text-black font-bold rounded-full text-xs hover:bg-yellow-400 transition-all">
              Contact
            </Link>
            <Link to="/miss-mister-dour"
              className="hidden lg:flex items-center gap-1.5 px-4 py-2 border border-yellow-500/40 text-yellow-400 font-semibold rounded-full text-xs hover:bg-yellow-500/10 transition-all">
              <Trophy className="w-3 h-3" /> Candidater
            </Link>
            <button onClick={() => setMenuOpen(!menuOpen)}
              className="xl:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 text-white hover:bg-white/5 transition-all">
              {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* ── MENU MOBILE ── */}
      <div className={`fixed inset-0 z-40 bg-black/98 backdrop-blur-lg transition-all duration-300 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="h-16" />
        <div className="flex flex-col h-[calc(100vh-4rem)] overflow-y-auto">
          <nav className="flex-1 px-5 py-6">
            <div className="grid grid-cols-2 gap-2">
              {NAV_ITEMS.map(n => (
                <Link key={n.href} to={n.href}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${isActive(n.href) ? "text-yellow-400 bg-yellow-500/10 border border-yellow-500/20" : "text-gray-300 hover:text-white bg-white/3 hover:bg-white/8 border border-white/5"}`}>
                  {n.label}
                </Link>
              ))}
            </div>
          </nav>
          <div className="px-5 pb-8 space-y-3">
            <div className="w-full h-px bg-white/10" />
            <div className="flex gap-3">
              <Link to="/contact" className="flex-1 py-3 bg-yellow-500 text-black font-black rounded-xl text-center text-sm hover:bg-yellow-400 transition-all">
                Nous contacter
              </Link>
              <Link to="/miss-mister-dour" className="flex-1 py-3 border border-yellow-500/40 text-yellow-400 rounded-xl text-center text-sm font-bold hover:bg-yellow-500/10 transition-all flex items-center justify-center gap-1.5">
                <Trophy className="w-4 h-4" /> Candidater
              </Link>
            </div>
            {/* Socials mobile */}
            <div className="flex flex-wrap gap-2 pt-2">
              {FOOTER_SOCIALS.slice(0, 5).map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label}
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:text-white transition-all">
                  <s.Icon />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── CONTENU ── */}
      <main className="flex-1 pt-16">
        {children}
      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-950 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-4 gap-10 mb-12">

            {/* Branding */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-yellow-500/50 bg-black flex items-center justify-center">
                  <img src={LOGOS.olivierTrevis} alt="OT" className="w-full h-full object-contain p-1.5"
                    onError={e => { e.target.style.display="none"; }} />
                </div>
                <div>
                  <p className="font-black text-white">Olivier Trevis</p>
                  <p className="text-xs text-yellow-500">Dour · Belgique</p>
                </div>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                Acteur local, associatif et événementiel. Porteur de projets culturels au cœur de Dour.
              </p>
              <div className="flex flex-wrap gap-2">
                {FOOTER_SOCIALS.map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label}
                    className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gray-500 transition-all hover:scale-110"
                    onMouseEnter={e => { e.currentTarget.style.color = s.color; e.currentTarget.style.borderColor = s.color + "50"; e.currentTarget.style.background = s.color + "12"; }}
                    onMouseLeave={e => { e.currentTarget.style.color=""; e.currentTarget.style.borderColor=""; e.currentTarget.style.background=""; }}>
                    <s.Icon />
                  </a>
                ))}
              </div>
            </div>

            {/* Projets */}
            <div>
              <p className="text-yellow-400 font-bold text-sm uppercase tracking-wider mb-4">Projets</p>
              <ul className="space-y-2">
                {[
                  { label: "Miss & Mister Dour",  href: "/miss-mister-dour",    ext: false },
                  { label: "Le Tour de Dour",      href: "/tour-de-dour",        ext: false },
                  { label: "ASBL & Associations",  href: "/asbl",                ext: false },
                  { label: "Fashionist'ART",        href: "https://fashionistartdour.be", ext: true },
                  { label: "Synergie Dour",        href: "https://synergiedour.be",       ext: true },
                  { label: "P&V Assurances Dour",  href: "https://assurancesdour.be",     ext: true },
                ].map((l, i) => (
                  l.ext
                    ? <li key={i}><a href={l.href} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-yellow-400 text-sm transition-colors">{l.label} ↗</a></li>
                    : <li key={i}><Link to={l.href} className="text-gray-500 hover:text-white text-sm transition-colors">{l.label}</Link></li>
                ))}
              </ul>
            </div>

            {/* Navigation */}
            <div>
              <p className="text-yellow-400 font-bold text-sm uppercase tracking-wider mb-4">Navigation</p>
              <ul className="space-y-2">
                {[
                  { label: "Vidéos & Médias",   href: "/videos" },
                  { label: "Actualités",          href: "/actualites" },
                  { label: "Galerie photos",      href: "/galerie" },
                  { label: "Partenaires",         href: "/partenaires" },
                  { label: "Contact",             href: "/contact" },
                  { label: "Mentions légales",    href: "/mentions-legales" },
                  { label: "Administration",      href: "/admin" },
                ].map((l, i) => (
                  <li key={i}><Link to={l.href} className="text-gray-500 hover:text-white text-sm transition-colors">{l.label}</Link></li>
                ))}
              </ul>
            </div>

            {/* Contact rapide */}
            <div>
              <p className="text-yellow-400 font-bold text-sm uppercase tracking-wider mb-4">Contact rapide</p>
              <div className="space-y-3">
                <a href="mailto:contact@oliviertrevis.be"
                  className="flex items-start gap-3 p-3 rounded-xl bg-gray-900 border border-white/5 hover:border-yellow-500/20 transition-all group">
                  <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-400 flex-shrink-0 group-hover:bg-yellow-500/20 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 uppercase tracking-wider">Email</p>
                    <p className="text-white text-xs">contact@oliviertrevis.be</p>
                  </div>
                </a>
                <a href="https://wa.me/32475426942" target="_blank" rel="noopener noreferrer"
                  className="flex items-start gap-3 p-3 rounded-xl bg-gray-900 border border-white/5 hover:border-green-500/20 transition-all group">
                  <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400 flex-shrink-0 group-hover:bg-green-500/20 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 uppercase tracking-wider">WhatsApp</p>
                    <p className="text-white text-xs">Message direct</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-600 text-xs text-center">
              © {new Date().getFullYear()} Olivier Trevis — Dour, Belgique. Tous droits réservés.
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-600">
              <Link to="/mentions-legales" className="hover:text-gray-400 transition-colors">Mentions légales</Link>
              <Link to="/mentions-legales" className="hover:text-gray-400 transition-colors">RGPD</Link>
              <Link to="/admin" className="hover:text-gray-400 transition-colors">Admin</Link>
            </div>
            <p className="text-gray-700 text-xs">
              Développé par <span className="text-yellow-700 font-semibold">JS-Innov.IA</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
