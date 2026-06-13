import { useState } from "react";
import { MessageContact } from "@/api/entities";
import { motion } from "framer-motion";
import { Mail, MessageCircle, Send, CheckCircle, MapPin, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { SOCIAL_LINKS } from "@/api/links";

function FbIcon() { return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>; }
function IgIcon() { return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>; }
function TkIcon() { return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>; }

const OBJETS = ["Information", "Inscription concours", "Partenariat", "Presse", "Bénévole", "Tour de Dour", "ASBL", "Autre"];

const SOCIALS_CONTACT = [
  { href: SOCIAL_LINKS.olivierTrevis.facebook,   Icon: FbIcon, label: "Olivier Trevis",          sub: "Facebook personnel",     color: "#1877f2" },
  { href: SOCIAL_LINKS.olivierTrevis.instagram,  Icon: IgIcon, label: "@oliviertrevis",           sub: "Instagram personnel",    color: "#e1306c" },
  { href: SOCIAL_LINKS.missMisterDour.facebook,  Icon: FbIcon, label: "Miss & Mister Dour",       sub: "Page Facebook officielle", color: "#1877f2" },
  { href: SOCIAL_LINKS.missMisterDour.instagram, Icon: IgIcon, label: "@miss_et_mister_dour",     sub: "Instagram du concours",  color: "#e1306c" },
  { href: SOCIAL_LINKS.missMisterDour.tiktok,    Icon: TkIcon, label: "@miss_mister_dour",        sub: "TikTok du concours",     color: "#ffffff" },
  { href: SOCIAL_LINKS.fashionistArt.facebook,   Icon: FbIcon, label: "Fashionist'ART",           sub: "Page Facebook",          color: "#1877f2" },
  { href: SOCIAL_LINKS.tourDeDour.facebook,      Icon: FbIcon, label: "Le Tour de Dour",          sub: "Page Facebook",          color: "#1877f2" },
  { href: SOCIAL_LINKS.pvAssurances.facebook,    Icon: FbIcon, label: "P&V Assurances Dour",      sub: "Page Facebook",          color: "#1877f2" },
  { href: SOCIAL_LINKS.synergieDour.facebook,    Icon: FbIcon, label: "Synergie Dour",            sub: "Groupe Facebook",        color: "#1877f2" },
];

export default function ContactPage() {
  const [form, setForm]   = useState({ prenom: "", nom: "", email: "", telephone: "", objet: "Information", message: "", consentement_rgpd: false });
  const [sent, setSent]   = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await MessageContact.create({ ...form, lu: false, repondu: false });
      setSent(true);
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer ou nous écrire directement par email.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">

      {/* ── HERO ── */}
      <section className="relative py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-black" />
        <div className="absolute inset-0 opacity-8" style={{ background: "radial-gradient(ellipse at 50% 50%, #d4af37 0%, transparent 65%)" }} />
        <div className="relative max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-yellow-400 tracking-[0.3em] text-xs uppercase font-semibold mb-4">Restons en contact</p>
            <h1 className="text-5xl md:text-6xl font-black mb-4 text-white">Parlons-nous</h1>
            <div className="w-20 h-1 rounded-full mx-auto mb-6" style={{ background: "linear-gradient(90deg, transparent, #d4af37, transparent)" }} />
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Une question, un projet, un partenariat ou une candidature ? Toutes les portes sont ouvertes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── CANAUX RAPIDES ── */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              Icon: () => <Mail className="w-5 h-5" />,
              label: "Email", sub: "contact@oliviertrevis.be",
              href: "#contact-form", scroll: true, color: "hover:border-yellow-500/30", iconBg: "bg-yellow-500/10 text-yellow-400",
            },
            {
              Icon: () => (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              ),
              label: "WhatsApp", sub: "Message direct",
              href: "https://wa.me/32475426942", color: "hover:border-green-500/30", iconBg: "bg-green-500/10 text-green-400",
            },
            {
              Icon: () => <MapPin className="w-5 h-5" />,
              label: "Localisation", sub: "Dour, Belgique",
              href: "https://maps.google.com/?q=Dour,Belgique", color: "hover:border-blue-500/30", iconBg: "bg-blue-500/10 text-blue-400",
            },
          ].map((c, i) => (
            <motion.a key={i}
              href={c.href}
              target={c.scroll ? "_self" : "_blank"}
              rel={c.scroll ? undefined : "noopener noreferrer"}
              onClick={c.scroll ? (e) => { e.preventDefault(); document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" }); } : undefined}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className={`flex items-center gap-4 p-5 rounded-2xl bg-gray-900 border border-white/5 ${c.color} transition-all group cursor-pointer`}>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${c.iconBg}`}>
                <c.Icon />
              </div>
              <div>
                <p className="text-white font-bold">{c.label}</p>
                <p className="text-gray-400 text-sm">{c.sub}</p>
              </div>
              {!c.scroll && <ExternalLink className="w-4 h-4 text-gray-600 ml-auto group-hover:text-gray-400 transition-colors" />}
              {c.scroll && <svg className="w-4 h-4 text-gray-600 ml-auto group-hover:text-yellow-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>}
            </motion.a>
          ))}
        </div>
      </section>

      {/* ── FORMULAIRE + RÉSEAUX ── */}
      <section className="py-12 px-4 pb-20">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12">

          {/* Formulaire */}
          <div id="contact-form" className="md:col-span-2">
            <h2 className="text-2xl font-black text-white mb-6">Envoyer un message</h2>
            {sent ? (
              <div className="text-center py-16 rounded-2xl bg-gray-900 border border-green-500/20">
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Message envoyé !</h3>
                <p className="text-gray-400 text-sm mb-6">Merci ! Olivier Trevis vous répondra dans les plus brefs délais.</p>
                <button onClick={() => { setSent(false); setForm({ prenom: "", nom: "", email: "", telephone: "", objet: "Information", message: "", consentement_rgpd: false }); }}
                  className="px-6 py-2 border border-white/20 text-gray-400 rounded-full text-sm hover:text-white transition-colors">
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 p-7 rounded-2xl bg-gray-900 border border-white/5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-400 mb-1.5 block font-medium">Prénom *</label>
                    <input required value={form.prenom} onChange={e => setForm(f => ({ ...f, prenom: e.target.value }))}
                      className="w-full bg-gray-800 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-yellow-500/50 transition-colors" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-1.5 block font-medium">Nom *</label>
                    <input required value={form.nom} onChange={e => setForm(f => ({ ...f, nom: e.target.value }))}
                      className="w-full bg-gray-800 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-yellow-500/50 transition-colors" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-400 mb-1.5 block font-medium">Email *</label>
                    <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full bg-gray-800 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-yellow-500/50 transition-colors" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-1.5 block font-medium">Téléphone</label>
                    <input type="tel" value={form.telephone} onChange={e => setForm(f => ({ ...f, telephone: e.target.value }))}
                      className="w-full bg-gray-800 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-yellow-500/50 transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1.5 block font-medium">Objet de la demande</label>
                  <select value={form.objet} onChange={e => setForm(f => ({ ...f, objet: e.target.value }))}
                    className="w-full bg-gray-800 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-yellow-500/50 transition-colors">
                    {OBJETS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1.5 block font-medium">Message *</label>
                  <textarea required rows={5} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder="Décrivez votre demande..."
                    className="w-full bg-gray-800 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-yellow-500/50 transition-colors resize-none" />
                </div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" required checked={form.consentement_rgpd} onChange={e => setForm(f => ({ ...f, consentement_rgpd: e.target.checked }))}
                    className="mt-0.5 w-4 h-4 rounded accent-yellow-500 flex-shrink-0" />
                  <span className="text-xs text-gray-400 leading-relaxed">
                    J'accepte que mes données soient utilisées pour traiter ma demande, conformément à la{" "}
                    <Link to="/mentions-legales" className="text-yellow-400 hover:underline">politique de confidentialité</Link>.
                  </span>
                </label>
                {error && <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-xl p-3">{error}</p>}
                <button type="submit" disabled={loading}
                  className="w-full py-3 bg-yellow-500 text-black font-black rounded-xl hover:bg-yellow-400 transition-all flex items-center justify-center gap-2 disabled:opacity-60">
                  {loading ? "Envoi en cours..." : <><Send className="w-4 h-4" /> Envoyer le message</>}
                </button>
              </form>
            )}
          </div>

          {/* Réseaux sociaux */}
          <div>
            <h2 className="text-xl font-black text-white mb-6">Nos réseaux sociaux</h2>
            <div className="space-y-3">
              {SOCIALS_CONTACT.map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-gray-900 border border-white/5 hover:border-white/15 transition-all group"
                  onMouseEnter={e => { e.currentTarget.style.borderColor = s.color + "30"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = ""; }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-white/5 transition-colors"
                    style={{ color: s.color }}>
                    <s.Icon />
                  </div>
                  <div className="min-w-0">
                    <p className="text-white text-xs font-semibold truncate">{s.label}</p>
                    <p className="text-gray-500 text-xs truncate">{s.sub}</p>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-600 flex-shrink-0 ml-auto" />
                </a>
              ))}
            </div>

            {/* Bouton Partenaire */}
            <div className="mt-8 p-5 rounded-2xl bg-gradient-to-br from-blue-950/60 to-black border border-blue-500/20">
              <p className="text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">Partenariat</p>
              <p className="text-white font-bold mb-2">Vous souhaitez devenir partenaire ?</p>
              <p className="text-gray-400 text-xs mb-4 leading-relaxed">Rejoignez les soutiens des projets d'Olivier Trevis et bénéficiez d'une visibilité locale.</p>
              <Link to="/partenaires#devenir-partenaire"
                className="flex items-center justify-center gap-2 py-2.5 w-full rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-500 transition-all">
                <MessageCircle className="w-4 h-4" /> Devenir partenaire
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
