import { useState, useEffect } from "react";
import { Partenaire, MessageContact } from "@/api/entities";
import { motion } from "framer-motion";
import { Handshake, ExternalLink, ArrowRight, CheckCircle, Send } from "lucide-react";
import { Link } from "react-router-dom";

const AVANTAGES = [
  { titre: "Visibilité locale",   desc: "Logo et lien sur le site oliviertrevis.be, consulté par la communauté de Dour et ses environs." },
  { titre: "Présence événements", desc: "Mise en avant lors des événements Miss & Mister Dour, Tour de Dour et toutes les initiatives d'Olivier Trevis." },
  { titre: "Réseau associatif",   desc: "Intégration dans un réseau d'acteurs locaux engagés : ASBL, commerçants, artistes, institutions." },
  { titre: "Communication",       desc: "Mention dans les communications digitales : réseaux sociaux, newsletters et vidéos." },
];

const CATEGORIES_PARTENAIRES = ["Tous", "Institutionnel", "Commercial", "Associatif", "Médias", "Sponsor"];

export default function PartenairesPage() {
  const [partenaires, setPartenaires] = useState([]);
  const [cat, setCat]                 = useState("Tous");
  const [loading, setLoading]         = useState(true);
  const [form, setForm]               = useState({ prenom: "", nom: "", email: "", telephone: "", objet: "Partenariat", message: "", consentement_rgpd: false });
  const [sent, setSent]               = useState(false);
  const [sending, setSending]         = useState(false);

  useEffect(() => {
    Partenaire.filter({ actif: true })
      .then(d => { setPartenaires(d.sort((a, b) => (a.ordre || 99) - (b.ordre || 99))); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = cat === "Tous" ? partenaires : partenaires.filter(p => p.categorie === cat);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await MessageContact.create({ ...form, lu: false, repondu: false });
      setSent(true);
    } catch { /* silently fail */ }
    setSending(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">

      {/* ── HERO ── */}
      <section className="relative py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-black" />
        <div className="absolute inset-0 opacity-8" style={{ background: "radial-gradient(ellipse at 70% 50%, #3b82f6 0%, transparent 65%)" }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-blue-400 tracking-[0.3em] text-xs uppercase font-semibold mb-4">Ils nous soutiennent</p>
            <h1 className="text-5xl md:text-6xl font-black mb-4 text-white">Nos Partenaires</h1>
            <div className="w-20 h-1 rounded-full mx-auto mb-6" style={{ background: "linear-gradient(90deg, transparent, #3b82f6, transparent)" }} />
            <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
              Ils font confiance aux projets d'Olivier Trevis et contribuent à faire rayonner Dour. Merci à chacun d'entre eux.
            </p>
            <a href="#devenir-partenaire"
              className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-500 transition-all">
              <Handshake className="w-4 h-4" /> Devenir partenaire
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── FILTRES ── */}
      <section className="py-6 px-4 bg-gray-950/80 sticky top-16 z-10 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {CATEGORIES_PARTENAIRES.map(c => (
              <button key={c} onClick={() => setCat(c)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all flex-shrink-0 ${cat === c ? "bg-yellow-500 text-black" : "border border-white/15 text-gray-400 hover:text-white hover:border-white/30"}`}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── GRILLE PARTENAIRES ── */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-40 rounded-2xl bg-gray-900 animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24 rounded-2xl bg-gray-900 border border-white/5">
              <Handshake className="w-16 h-16 text-blue-400/30 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">
                {partenaires.length === 0 ? "Partenaires bientôt disponibles" : "Aucun partenaire dans cette catégorie"}
              </h3>
              <p className="text-gray-400 text-sm mb-6">
                {partenaires.length === 0
                  ? "Les partenaires des projets d'Olivier Trevis seront présentés ici prochainement."
                  : "Essayez une autre catégorie."}
              </p>
              <a href="#devenir-partenaire"
                className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-blue-500/40 text-blue-400 hover:bg-blue-500/10 transition-all text-sm">
                Devenir partenaire <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filtered.map((p, i) => (
                <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }} viewport={{ once: true }}>
                  <div className="group p-6 rounded-2xl bg-gray-900 border border-white/5 hover:border-yellow-500/20 transition-all h-full flex flex-col items-center text-center">
                    {p.logo_url ? (
                      <img src={p.logo_url} alt={p.nom}
                        className="h-16 w-full object-contain mb-4 filter grayscale group-hover:grayscale-0 transition-all duration-300" />
                    ) : (
                      <div className="h-16 w-full flex items-center justify-center mb-4">
                        <span className="text-2xl font-black text-yellow-400">{p.nom.slice(0, 2).toUpperCase()}</span>
                      </div>
                    )}
                    <h3 className="text-white font-bold text-sm mb-2">{p.nom}</h3>
                    {p.categorie && (
                      <span className="text-xs text-gray-500 px-2 py-0.5 rounded-full border border-white/10 mb-3">{p.categorie}</span>
                    )}
                    {p.description && <p className="text-gray-500 text-xs line-clamp-2 mb-3">{p.description}</p>}
                    {p.site_web && (
                      <a href={p.site_web} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-yellow-400 hover:text-yellow-300 transition-colors mt-auto">
                        <ExternalLink className="w-3 h-3" /> Visiter
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── AVANTAGES PARTENARIAT ── */}
      <section className="py-20 px-4 bg-gray-950 border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-yellow-400 tracking-widest text-xs uppercase font-semibold mb-3">Pourquoi nous rejoindre</p>
            <h2 className="text-3xl md:text-4xl font-black text-white">Les avantages du partenariat</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {AVANTAGES.map((a, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                className="p-6 rounded-2xl bg-gray-900 border border-white/5 hover:border-blue-500/20 transition-all">
                <CheckCircle className="w-8 h-8 text-blue-400 mb-4" />
                <h3 className="text-white font-bold mb-2">{a.titre}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{a.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORMULAIRE DEVENIR PARTENAIRE ── */}
      <section id="devenir-partenaire" className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-blue-400 tracking-widest text-xs uppercase font-semibold mb-3">Rejoindre l'aventure</p>
            <h2 className="text-3xl font-black text-white">Devenir partenaire</h2>
            <p className="text-gray-400 mt-4 text-sm leading-relaxed">
              Vous souhaitez soutenir les projets d'Olivier Trevis et bénéficier d'une visibilité locale ? Contactez-nous.
            </p>
          </div>

          {sent ? (
            <div className="text-center py-16 rounded-2xl bg-gray-900 border border-green-500/20">
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Demande envoyée !</h3>
              <p className="text-gray-400 text-sm">Nous vous recontacterons dans les plus brefs délais. Merci de votre intérêt !</p>
              <button onClick={() => setSent(false)} className="mt-6 px-6 py-2 border border-white/20 text-gray-400 rounded-full text-sm hover:text-white transition-colors">
                Envoyer une autre demande
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 p-8 rounded-2xl bg-gray-900 border border-white/5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-400 mb-1.5 block font-medium">Prénom *</label>
                  <input required value={form.prenom} onChange={e => setForm(f => ({ ...f, prenom: e.target.value }))}
                    className="w-full bg-gray-800 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-colors" />
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1.5 block font-medium">Nom *</label>
                  <input required value={form.nom} onChange={e => setForm(f => ({ ...f, nom: e.target.value }))}
                    className="w-full bg-gray-800 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-colors" />
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1.5 block font-medium">Email *</label>
                <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full bg-gray-800 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-colors" />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1.5 block font-medium">Organisation / Entreprise</label>
                <input value={form.telephone} onChange={e => setForm(f => ({ ...f, telephone: e.target.value }))}
                  placeholder="Nom de votre organisation"
                  className="w-full bg-gray-800 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-colors" />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1.5 block font-medium">Votre message *</label>
                <textarea required rows={4} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="Parlez-nous de votre projet de partenariat..."
                  className="w-full bg-gray-800 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-colors resize-none" />
              </div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" required checked={form.consentement_rgpd} onChange={e => setForm(f => ({ ...f, consentement_rgpd: e.target.checked }))}
                  className="mt-0.5 w-4 h-4 rounded accent-blue-500 flex-shrink-0" />
                <span className="text-xs text-gray-400 leading-relaxed">
                  J'accepte que mes données soient utilisées pour traiter ma demande de partenariat, conformément à la{" "}
                  <Link to="/mentions-legales" className="text-blue-400 hover:underline">politique de confidentialité</Link>.
                </span>
              </label>
              <button type="submit" disabled={sending}
                className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition-all flex items-center justify-center gap-2 disabled:opacity-60">
                {sending ? "Envoi en cours..." : <><Send className="w-4 h-4" /> Envoyer ma demande</>}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
