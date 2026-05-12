import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Trophy, MapPin, Play, Users, Mail, Camera, Newspaper, Handshake } from "lucide-react";

const NAV = [
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "/a-propos" },
  { label: "ASBL & Projets", href: "/asbl" },
  { label: "Miss & Mister Dour", href: "/miss-mister-dour" },
  { label: "Tour de Dour", href: "/tour-de-dour" },
  { label: "Vidéos", href: "/videos" },
  { label: "Actualités", href: "/actualites" },
  { label: "Galerie", href: "/galerie" },
  { label: "Partenaires", href: "/partenaires" },
  { label: "Contact", href: "/contact" },
];

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* NAVBAR */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-black/95 backdrop-blur-md border-b border-white/5 py-3" : "bg-transparent py-5"}`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center font-black text-sm"
              style={{borderColor: "#d4af37", color: "#d4af37"}}>OT</div>
            <div className="hidden sm:block">
              <p className="font-black text-white text-sm leading-none">Olivier Trevis</p>
              <p className="text-xs leading-none mt-0.5" style={{color: "#d4af37"}}>Dour · Associatif · Événementiel</p>
            </div>
          </Link>

          {/* NAV DESKTOP */}
          <nav className="hidden xl:flex items-center gap-1">
            {NAV.slice(0, 7).map(n => (
              <Link key={n.href} to={n.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${location.pathname === n.href ? "text-yellow-400 bg-yellow-500/10" : "text-gray-400 hover:text-white hover:bg-white/5"}`}>
                {n.label}
              </Link>
            ))}
          </nav>

          {/* CTA + BURGER */}
          <div className="flex items-center gap-3">
            <Link to="/contact" className="hidden md:flex items-center gap-2 px-5 py-2 bg-yellow-500 text-black font-bold rounded-full text-sm hover:bg-yellow-400 transition-all">
              Contact
            </Link>
            <button onClick={() => setMenuOpen(!menuOpen)}
              className="xl:hidden w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 text-white hover:bg-white/5 transition-all">
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* MENU MOBILE */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-black/98 backdrop-blur-md flex flex-col">
          <div className="h-20" />
          <nav className="flex-1 overflow-y-auto px-6 py-8">
            <div className="space-y-1">
              {NAV.map(n => (
                <Link key={n.href} to={n.href}
                  className={`flex items-center gap-3 px-4 py-4 rounded-xl text-lg font-medium transition-all ${location.pathname === n.href ? "text-yellow-400 bg-yellow-500/10" : "text-gray-300 hover:text-white hover:bg-white/5"}`}>
                  {n.label}
                </Link>
              ))}
            </div>
          </nav>
          <div className="px-6 pb-8">
            <div className="w-full h-px bg-white/10 mb-6" />
            <div className="flex gap-3">
              <Link to="/contact" className="flex-1 py-3 bg-yellow-500 text-black font-bold rounded-xl text-center hover:bg-yellow-400 transition-all">
                Nous contacter
              </Link>
              <Link to="/miss-mister-dour" className="flex-1 py-3 border border-yellow-500/50 text-yellow-400 rounded-xl text-center hover:bg-yellow-500/10 transition-all font-medium text-sm flex items-center justify-center gap-1">
                <Trophy className="w-4 h-4" /> Candidater
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* CONTENT */}
      <main className="flex-1 pt-16 md:pt-20">
        {children}
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-950 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center font-black text-sm"
                  style={{borderColor: "#d4af37", color: "#d4af37"}}>OT</div>
                <div>
                  <p className="font-black text-white text-sm">Olivier Trevis</p>
                  <p className="text-xs" style={{color: "#d4af37"}}>Dour · Belgique</p>
                </div>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                Acteur local, associatif et événementiel. Porteur de projets culturels au cœur de Dour.
              </p>
            </div>

            {/* Projets */}
            <div>
              <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Projets</h4>
              <ul className="space-y-2">
                {[
                  { label: "Miss & Mister Dour", href: "/miss-mister-dour" },
                  { label: "Le Tour de Dour", href: "/tour-de-dour" },
                  { label: "ASBL & Projets", href: "/asbl" },
                  { label: "Fashionist'ART", href: "/miss-mister-dour" },
                ].map(l => (
                  <li key={l.href}>
                    <Link to={l.href} className="text-gray-500 hover:text-yellow-400 text-sm transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Médias */}
            <div>
              <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Médias</h4>
              <ul className="space-y-2">
                {[
                  { label: "Vidéos YouTube", href: "/videos" },
                  { label: "Galerie photos", href: "/galerie" },
                  { label: "Actualités", href: "/actualites" },
                  { label: "Partenaires", href: "/partenaires" },
                ].map(l => (
                  <li key={l.href}>
                    <Link to={l.href} className="text-gray-500 hover:text-yellow-400 text-sm transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Contact</h4>
              <ul className="space-y-3">
                <li>
                  <a href="mailto:contact@oliviertrevis.be" className="text-gray-500 hover:text-yellow-400 text-sm transition-colors flex items-center gap-2">
                    <Mail className="w-3 h-3" /> contact@oliviertrevis.be
                  </a>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-500 hover:text-yellow-400 text-sm transition-colors">Formulaire de contact</Link>
                </li>
                <li>
                  <Link to="/mentions-legales" className="text-gray-500 hover:text-yellow-400 text-sm transition-colors">Mentions légales & RGPD</Link>
                </li>
              </ul>
              <div className="mt-6">
                <p className="text-xs text-gray-600 uppercase tracking-wider mb-3">SEO</p>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Olivier Trevis Dour · ASBL Dour · Miss Mister Dour · Tour de Dour · Fashionist'ART · Événements Dour · Culture Belgique
                </p>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Olivier Trevis · Dour, Belgique
            </p>
            <div className="flex items-center gap-6">
              <Link to="/mentions-legales" className="text-gray-600 hover:text-gray-400 text-xs transition-colors">Mentions légales</Link>
              <Link to="/mentions-legales" className="text-gray-600 hover:text-gray-400 text-xs transition-colors">Confidentialité</Link>
              <Link to="/mentions-legales" className="text-gray-600 hover:text-gray-400 text-xs transition-colors">RGPD</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
