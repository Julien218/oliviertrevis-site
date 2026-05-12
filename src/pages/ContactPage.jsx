import { useState } from "react";
import { MessageContact } from "@/api/entities";
import { motion } from "framer-motion";
import { Mail, Phone, MessageCircle, Send, Facebook, Instagram, Youtube, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function ContactPage() {
  const [form, setForm] = useState({ prenom: "", nom: "", email: "", telephone: "", objet: "Information", message: "", consentement_rgpd: false });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await MessageContact.create({ ...form, lu: false, repondu: false });
      setSubmitted(true);
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer ou nous contacter directement par email.");
    }
    setLoading(false);
  };

  const objets = ["Information", "Inscription concours", "Partenariat", "Presse", "Bénévole", "Autre"];

  const socials = [
    { icon: <Facebook className="w-5 h-5" />, label: "Facebook", href: "https://facebook.com", color: "hover:text-blue-400" },
    { icon: <Instagram className="w-5 h-5" />, label: "Instagram", href: "https://instagram.com", color: "hover:text-pink-400" },
    { icon: <Youtube className="w-5 h-5" />, label: "YouTube", href: "https://youtube.com", color: "hover:text-red-400" },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* HERO */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-black" />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-yellow-400 tracking-[0.3em] text-sm uppercase mb-4">Contact</p>
            <h1 className="text-5xl md:text-6xl font-black mb-4 text-white">Parlons-nous</h1>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">Une question, un projet, un partenariat ? Nous sommes à votre écoute.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 px-4 pb-20">
        <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-12">
          {/* INFOS CONTACT */}
          <div className="md:col-span-2 space-y-8">
            <div>
              <h2 className="text-xl font-black text-white mb-6">Coordonnées</h2>
              <div className="space-y-4">
                <a href="mailto:contact@oliviertrevis.be"
                  className="flex items-center gap-3 p-4 rounded-xl bg-gray-900 border border-white/5 hover:border-yellow-500/20 transition-all group">
                  <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-400 group-hover:bg-yellow-500/20 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Email</p>
                    <p className="text-white text-sm">contact@oliviertrevis.be</p>
                  </div>
                </a>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-900 border border-white/5">
                  <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-400">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">WhatsApp</p>
                    <a href="https://wa.me/32XXXXXXXXX" target="_blank" rel="noopener noreferrer"
                      className="text-green-400 text-sm hover:text-green-300 transition-colors">
                      Envoyer un message
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* RÉSEAUX SOCIAUX */}
            <div>
              <h2 className="text-xl font-black text-white mb-4">Réseaux sociaux</h2>
              <div className="space-y-3">
                {socials.map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                    className={`flex items-center gap-3 p-4 rounded-xl bg-gray-900 border border-white/5 hover:border-white/15 transition-all text-gray-400 ${s.color}`}>
                    {s.icon}
                    <span className="font-medium">{s.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* LIENS RAPIDES */}
            <div>
              <h2 className="text-xl font-black text-white mb-4">Liens rapides</h2>
              <div className="space-y-2">
                {[
                  { label: "Candidater Miss & Mister Dour", href: "/miss-mister-dour" },
                  { label: "Proposer un lieu (Tour de Dour)", href: "/tour-de-dour#proposer" },
                  { label: "Devenir partenaire", href: "/partenaires" },
                ].map((l, i) => (
                  <Link key={i} to={l.href}
                    className="block text-sm text-gray-400 hover:text-yellow-400 transition-colors py-1">
                    → {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* FORMULAIRE */}
          <div className="md:col-span-3">
            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-16 rounded-2xl bg-gray-900 border border-green-500/20">
                <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-6">
                  <CheckCircle className="w-10 h-10 text-green-400" />
                </div>
                <h3 className="text-2xl font-black text-white mb-3">Message envoyé !</h3>
                <p className="text-gray-400 max-w-sm">
                  Merci pour votre message. Nous vous répondrons dans les meilleurs délais.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 p-8 rounded-2xl bg-gray-900 border border-yellow-500/10">
                <h2 className="text-xl font-black text-white mb-6">Formulaire de contact</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {[{ key: "prenom", label: "Prénom", type: "text" }, { key: "nom", label: "Nom", type: "text" }].map(f => (
                    <div key={f.key}>
                      <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1">{f.label}</label>
                      <input type={f.type} value={form[f.key]} onChange={e => setForm(p => ({...p, [f.key]: e.target.value}))} required
                        className="w-full bg-gray-800 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-yellow-500/50 transition-colors" />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Email</label>
                    <input type="email" value={form.email} onChange={e => setForm(p => ({...p, email: e.target.value}))} required
                      className="w-full bg-gray-800 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-yellow-500/50 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Téléphone (optionnel)</label>
                    <input type="tel" value={form.telephone} onChange={e => setForm(p => ({...p, telephone: e.target.value}))}
                      className="w-full bg-gray-800 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-yellow-500/50 transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Objet de la demande</label>
                  <select value={form.objet} onChange={e => setForm(p => ({...p, objet: e.target.value}))}
                    className="w-full bg-gray-800 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-yellow-500/50">
                    {objets.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Message</label>
                  <textarea value={form.message} onChange={e => setForm(p => ({...p, message: e.target.value}))}
                    rows={5} required placeholder="Décrivez votre demande en détail..."
                    className="w-full bg-gray-800 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-yellow-500/50 resize-none transition-colors" />
                </div>
                <div className="flex items-start gap-3">
                  <input type="checkbox" id="rgpd" checked={form.consentement_rgpd}
                    onChange={e => setForm(p => ({...p, consentement_rgpd: e.target.checked}))} required className="mt-1" />
                  <label htmlFor="rgpd" className="text-gray-400 text-sm">
                    J'accepte que mes données soient utilisées pour traiter ma demande, conformément à la{" "}
                    <Link to="/mentions-legales" className="text-yellow-400 underline">politique de confidentialité</Link>.
                  </label>
                </div>
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <button type="submit" disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-yellow-600 to-yellow-500 text-black font-black rounded-xl hover:from-yellow-500 hover:to-yellow-400 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                  <Send className="w-5 h-5" />
                  {loading ? "Envoi en cours..." : "Envoyer le message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
