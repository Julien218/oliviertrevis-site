import { useState, useEffect } from "react";
import { Partenaire, MessageContact } from "@/api/entities";
import { motion } from "framer-motion";
import { Globe, ExternalLink, Handshake, ArrowRight } from "lucide-react";

export default function PartenairesPage() {
  const [partenaires, setPartenaires] = useState([]);
  const [form, setForm] = useState({ prenom: "", nom: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    Partenaire.filter({ actif: true }).then(d => setPartenaires(d.sort((a, b) => (a.ordre || 99) - (b.ordre || 99)))).catch(() => {});
  }, []);

  const grouped = partenaires.reduce((acc, p) => {
    const cat = p.categorie || "Autre";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(p);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-black text-white">
      {/* HERO */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-black" />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-yellow-400 tracking-[0.3em] text-sm uppercase mb-4">Partenaires</p>
            <h1 className="text-5xl md:text-6xl font-black mb-4 text-white">Ils nous soutiennent</h1>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Nos partenaires partagent nos valeurs et contribuent à faire vivre les projets d'Olivier Trevis à Dour.
            </p>
          </motion.div>
        </div>
      </section>

      {/* PARTENAIRES */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {partenaires.length === 0 ? (
            <div className="text-center py-16">
              <Handshake className="w-16 h-16 text-yellow-400/30 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Nos partenaires arrivent bientôt</h3>
              <p className="text-gray-400 mb-8">Vous souhaitez soutenir nos projets ? Devenez partenaire !</p>
            </div>
          ) : (
            <div className="space-y-16">
              {Object.entries(grouped).map(([categorie, items]) => (
                <div key={categorie}>
                  <h2 className="text-xl font-bold text-gray-400 uppercase tracking-wider mb-8 border-b border-white/5 pb-4">{categorie}</h2>
                  <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {items.map((p, i) => (
                      <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                        className="group rounded-2xl bg-gray-900 border border-white/5 hover:border-yellow-500/20 p-6 transition-all text-center">
                        {p.logo_url ? (
                          <img src={p.logo_url} alt={p.nom} className="h-16 w-auto object-contain mx-auto mb-4 grayscale group-hover:grayscale-0 transition-all" />
                        ) : (
                          <div className="w-16 h-16 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mx-auto mb-4">
                            <span className="text-yellow-400 font-black text-xl">{p.nom?.charAt(0)}</span>
                          </div>
                        )}
                        <h3 className="text-white font-bold mb-2">{p.nom}</h3>
                        {p.description && <p className="text-gray-400 text-sm mb-4">{p.description}</p>}
                        {p.site_web && (
                          <a href={p.site_web} target="_blank" rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1 text-yellow-400 text-sm hover:text-yellow-300 transition-colors">
                            <Globe className="w-3 h-3" /> Visiter <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* DEVENIR PARTENAIRE */}
      <section className="py-20 px-4 bg-gray-950">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-yellow-400 tracking-widest text-sm uppercase mb-3">Collaboration</p>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Devenir partenaire</h2>
            <p className="text-gray-400">
              Vous souhaitez soutenir les projets culturels et associatifs de Dour ? Rejoignez nos partenaires et contribuez à faire rayonner notre communauté.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { titre: "Visibilité", desc: "Votre logo et votre nom sur nos supports, site web et réseaux sociaux." },
              { titre: "Réseau", desc: "Intégrez un réseau de partenaires engagés pour le développement local de Dour." },
              { titre: "Impact", desc: "Contribuez directement à des projets culturels qui valorisent notre communauté." },
            ].map((a, i) => (
              <div key={i} className="p-6 rounded-2xl bg-gray-900 border border-yellow-500/10 text-center">
                <div className="w-2 h-8 rounded-full bg-yellow-500 mx-auto mb-4" />
                <h3 className="text-white font-bold mb-2">{a.titre}</h3>
                <p className="text-gray-400 text-sm">{a.desc}</p>
              </div>
            ))}
          </div>

          {submitted ? (
            <div className="text-center py-12 rounded-2xl bg-gray-900 border border-yellow-500/20">
              <Handshake className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Merci pour votre intérêt !</h3>
              <p className="text-gray-400">Nous vous recontacterons rapidement pour discuter des modalités de partenariat.</p>
            </div>
          ) : (
            <form onSubmit={async (e) => {
              e.preventDefault();
              try {
                await MessageContact.create({ ...form, objet: "Partenariat", lu: false, repondu: false, consentement_rgpd: true });
                setSubmitted(true);
              } catch {}
            }} className="space-y-4 p-8 rounded-2xl bg-gray-900 border border-yellow-500/20">
              <div className="grid md:grid-cols-2 gap-4">
                {[{ key: "prenom", label: "Prénom / Société" }, { key: "nom", label: "Nom" }].map(f => (
                  <div key={f.key}>
                    <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1">{f.label}</label>
                    <input type="text" value={form[f.key]} onChange={e => setForm(p => ({...p, [f.key]: e.target.value}))} required
                      className="w-full bg-gray-800 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-yellow-500/50" />
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Email</label>
                <input type="email" value={form.email} onChange={e => setForm(p => ({...p, email: e.target.value}))} required
                  className="w-full bg-gray-800 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-yellow-500/50" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Votre message</label>
                <textarea value={form.message} onChange={e => setForm(p => ({...p, message: e.target.value}))} rows={4} required
                  placeholder="Décrivez votre activité et comment vous souhaitez nous soutenir..."
                  className="w-full bg-gray-800 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-yellow-500/50 resize-none" />
              </div>
              <button type="submit" className="w-full py-4 bg-gradient-to-r from-yellow-600 to-yellow-500 text-black font-black rounded-xl hover:from-yellow-500 hover:to-yellow-400 transition-all flex items-center justify-center gap-2">
                <Handshake className="w-5 h-5" /> Envoyer ma demande de partenariat
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
