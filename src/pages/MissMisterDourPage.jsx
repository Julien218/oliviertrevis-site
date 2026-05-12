import { useState, useEffect } from "react";
import { Candidature, Laureat, Partenaire, Evenement } from "@/api/entities";
import { motion } from "framer-motion";
import { Trophy, Star, Heart, Palette, Users, Calendar, ArrowRight, Crown } from "lucide-react";
import { Link } from "react-router-dom";

const VALEURS = [
  { icon: <Crown className="w-6 h-6" />, label: "Élégance" },
  { icon: <Palette className="w-6 h-6" />, label: "Créativité" },
  { icon: <Heart className="w-6 h-6" />, label: "Inclusion" },
  { icon: <Star className="w-6 h-6" />, label: "Art & Mode" },
  { icon: <Users className="w-6 h-6" />, label: "Représentation locale" },
  { icon: <Trophy className="w-6 h-6" />, label: "Excellence" },
];

export default function MissMisterDourPage() {
  const [tab, setTab] = useState("presentation");
  const [candidature, setCandidature] = useState({ prenom: "", nom: "", email: "", telephone: "", date_naissance: "", ville: "", concours: "Miss Dour", motivation: "", consentement_rgpd: false });
  const [laureats, setLaureats] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Laureat.filter({ actif: true }).then(d => setLaureats(d.sort((a, b) => (b.annee || 0) - (a.annee || 0)))).catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await Candidature.create({ ...candidature, statut: "Reçue", annee: new Date().getFullYear() });
      setSubmitted(true);
    } catch (err) {
      alert("Erreur lors de l'envoi. Veuillez réessayer.");
    }
    setLoading(false);
  };

  const tabs = [
    { id: "presentation", label: "Présentation" },
    { id: "concours", label: "Le Concours" },
    { id: "candidature", label: "Candidater" },
    { id: "laureats", label: "Lauréats" },
    { id: "partenaires", label: "Partenaires" },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* HERO */}
      <section className="relative py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-black" />
        <div className="absolute inset-0 opacity-15"
          style={{background: "radial-gradient(ellipse at 50% 50%, #d4af37 0%, transparent 60%)"}} />
        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex justify-center mb-4">
              <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-yellow-500/30 bg-yellow-500/5">
                <Trophy className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-400 text-sm font-medium tracking-wider uppercase">Concours & Événement</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-3">
              <span className="text-white">Miss & Mister</span>
            </h1>
            <h1 className="text-5xl md:text-7xl font-black mb-2"
              style={{background: "linear-gradient(135deg, #d4af37, #fff8e1, #d4af37)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"}}>
              Dour
            </h1>
            <h2 className="text-2xl md:text-3xl font-light text-gray-300 mb-8 tracking-widest uppercase">Fashionist'ART</h2>
            <div className="w-24 h-px mx-auto mb-8" style={{background: "linear-gradient(90deg, transparent, #d4af37, transparent)"}} />
            <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed mb-10">
              L'événement qui célèbre l'élégance, la créativité, l'inclusion et l'art au cœur de Dour. 
              Un concours unique qui révèle les talents locaux et met en lumière la beauté de notre région.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button onClick={() => setTab("candidature")}
                className="px-8 py-3 bg-gradient-to-r from-yellow-600 to-yellow-500 text-black font-bold rounded-full hover:from-yellow-500 hover:to-yellow-400 transition-all">
                Je candidate
              </button>
              <button onClick={() => setTab("concours")}
                className="px-8 py-3 border border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10 rounded-full transition-all">
                Découvrir le concours
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* VALEURS */}
      <section className="py-16 px-4 bg-gray-950">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {VALEURS.map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }} viewport={{ once: true }}
                className="text-center p-4 rounded-xl bg-gray-900 border border-white/5">
                <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center mx-auto mb-2 text-yellow-400">{v.icon}</div>
                <p className="text-white text-xs font-medium">{v.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TABS */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${tab === t.id ? "bg-yellow-500 text-black" : "border border-white/20 text-gray-400 hover:text-white hover:border-white/40"}`}>
                {t.label}
              </button>
            ))}
          </div>

          {/* PRESENTATION */}
          {tab === "presentation" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-8 rounded-2xl bg-gray-900 border border-white/5">
                  <h3 className="text-xl font-black text-white mb-4">L'événement</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Miss & Mister Dour Fashionist'ART est bien plus qu'un simple concours de beauté. 
                    C'est une célébration de la diversité, de l'art et de la mode, portée par les talents de Dour et de sa région.
                  </p>
                </div>
                <div className="p-8 rounded-2xl bg-gray-900 border border-white/5">
                  <h3 className="text-xl font-black text-white mb-4">La mission</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Valoriser les jeunes talents locaux, encourager la créativité artistique et promouvoir 
                    l'image positive de Dour à travers un événement fédérateur et inclusif.
                  </p>
                </div>
                <div className="p-8 rounded-2xl bg-gray-900 border border-white/5">
                  <h3 className="text-xl font-black text-white mb-4">L'art & la mode</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Fashionist'ART fusion l'élégance de la mode avec l'expressivité de l'art, 
                    créant un spectacle unique où chaque participant révèle sa personnalité et son talent.
                  </p>
                </div>
                <div className="p-8 rounded-2xl bg-gray-900 border border-white/5">
                  <h3 className="text-xl font-black text-white mb-4">La communauté</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Un événement ancré dans la communauté de Dour, soutenu par des partenaires locaux 
                    et vécu comme une fête partagée par tous les habitants.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* CONCOURS */}
          {tab === "concours" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-gray-900 border border-yellow-500/20">
                    <Calendar className="w-6 h-6 text-yellow-400 mb-3" />
                    <h3 className="text-white font-bold mb-2">Dates importantes</h3>
                    <p className="text-gray-400 text-sm">Les dates de l'édition 2026 seront annoncées prochainement. Suivez nos actualités pour rester informé.</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-gray-900 border border-white/5">
                    <h3 className="text-white font-bold mb-3">Catégories</h3>
                    <div className="space-y-2">
                      {["Miss Dour", "Mister Dour", "Fashionist'ART"].map(c => (
                        <div key={c} className="flex items-center gap-2 text-gray-300">
                          <div className="w-2 h-2 rounded-full bg-yellow-400" />
                          {c}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-6 rounded-2xl bg-gray-900 border border-white/5">
                    <h3 className="text-white font-bold mb-3">Jury</h3>
                    <p className="text-gray-400 text-sm">La composition du jury de l'édition 2026 sera révélée prochainement.</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-gray-900 border border-white/5">
                    <h3 className="text-white font-bold mb-3">Règlement</h3>
                    <ul className="space-y-2 text-gray-400 text-sm">
                      <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-1.5 flex-shrink-0" /> Être domicilié dans la région de Dour</li>
                      <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-1.5 flex-shrink-0" /> Âge minimum requis selon la catégorie</li>
                      <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-1.5 flex-shrink-0" /> Remplir le formulaire de candidature complet</li>
                      <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-1.5 flex-shrink-0" /> Participer aux séances de présélection</li>
                      <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-1.5 flex-shrink-0" /> Respecter les valeurs du concours</li>
                    </ul>
                  </div>
                  <div className="p-6 rounded-2xl bg-gray-900 border border-white/5">
                    <h3 className="text-white font-bold mb-3">Déroulement</h3>
                    <div className="space-y-3">
                      {[
                        { n: "1", label: "Candidature en ligne" },
                        { n: "2", label: "Présélection" },
                        { n: "3", label: "Séances de coaching" },
                        { n: "4", label: "Shooting photos" },
                        { n: "5", label: "Grande finale" },
                      ].map(s => (
                        <div key={s.n} className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center text-yellow-400 text-xs font-bold">{s.n}</div>
                          <span className="text-gray-300 text-sm">{s.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* CANDIDATURE */}
          {tab === "candidature" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto">
              {submitted ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 rounded-full bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center mx-auto mb-6">
                    <Trophy className="w-10 h-10 text-yellow-400" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-3">Candidature envoyée !</h3>
                  <p className="text-gray-400">Merci pour votre candidature. Nous vous contacterons prochainement avec les prochaines étapes.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="p-6 rounded-2xl bg-gray-900 border border-yellow-500/20">
                    <h3 className="text-lg font-bold text-white mb-6">Formulaire de candidature</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        { key: "prenom", label: "Prénom", type: "text" },
                        { key: "nom", label: "Nom", type: "text" },
                        { key: "email", label: "Email", type: "email" },
                        { key: "telephone", label: "Téléphone", type: "tel" },
                        { key: "date_naissance", label: "Date de naissance", type: "date" },
                        { key: "ville", label: "Ville", type: "text" },
                      ].map(f => (
                        <div key={f.key}>
                          <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1">{f.label}</label>
                          <input type={f.type} value={candidature[f.key]} onChange={e => setCandidature(p => ({...p, [f.key]: e.target.value}))}
                            required className="w-full bg-gray-800 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-yellow-500/50 transition-colors" />
                        </div>
                      ))}
                    </div>
                    <div className="mt-4">
                      <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Catégorie</label>
                      <select value={candidature.concours} onChange={e => setCandidature(p => ({...p, concours: e.target.value}))}
                        className="w-full bg-gray-800 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-yellow-500/50">
                        <option>Miss Dour</option>
                        <option>Mister Dour</option>
                        <option>Fashionist'ART</option>
                      </select>
                    </div>
                    <div className="mt-4">
                      <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Lettre de motivation</label>
                      <textarea value={candidature.motivation} onChange={e => setCandidature(p => ({...p, motivation: e.target.value}))}
                        rows={4} required placeholder="Pourquoi souhaitez-vous participer ? Parlez-nous de vous..."
                        className="w-full bg-gray-800 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-yellow-500/50 resize-none" />
                    </div>
                    <div className="mt-4 flex items-start gap-3">
                      <input type="checkbox" id="rgpd" checked={candidature.consentement_rgpd}
                        onChange={e => setCandidature(p => ({...p, consentement_rgpd: e.target.checked}))}
                        required className="mt-1" />
                      <label htmlFor="rgpd" className="text-gray-400 text-sm">
                        J'accepte que mes données personnelles soient traitées dans le cadre de ce concours, conformément à la{" "}
                        <Link to="/mentions-legales" className="text-yellow-400 underline">politique de confidentialité</Link>.
                      </label>
                    </div>
                    <button type="submit" disabled={loading}
                      className="mt-6 w-full py-4 bg-gradient-to-r from-yellow-600 to-yellow-500 text-black font-black rounded-xl hover:from-yellow-500 hover:to-yellow-400 transition-all disabled:opacity-50">
                      {loading ? "Envoi en cours..." : "Envoyer ma candidature"}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          )}

          {/* LAUREATS */}
          {tab === "laureats" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {laureats.length === 0 ? (
                <div className="text-center py-16">
                  <Crown className="w-16 h-16 text-yellow-400/30 mx-auto mb-4" />
                  <p className="text-gray-500">Les lauréats des éditions précédentes seront présentés ici.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-3 gap-6">
                  {laureats.map((l, i) => (
                    <div key={i} className="text-center p-6 rounded-2xl bg-gray-900 border border-yellow-500/20">
                      {l.photo_url ? (
                        <img src={l.photo_url} alt={l.prenom_nom} className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-2 border-yellow-500/40" />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-yellow-500/10 border-2 border-yellow-500/30 flex items-center justify-center mx-auto mb-4">
                          <Crown className="w-10 h-10 text-yellow-400" />
                        </div>
                      )}
                      <p className="text-yellow-400 text-sm font-medium">{l.titre}</p>
                      <h3 className="text-white font-black text-lg mt-1">{l.prenom_nom}</h3>
                      <p className="text-gray-500 text-sm">{l.concours} · {l.annee}</p>
                      {l.description && <p className="text-gray-400 text-sm mt-3">{l.description}</p>}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* PARTENAIRES */}
          {tab === "partenaires" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="text-center py-12">
                <p className="text-gray-400 mb-8">Nos partenaires soutiennent cet événement et les valeurs qu'il porte.</p>
                <Link to="/partenaires" className="px-8 py-3 border border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10 rounded-full transition-all">
                  Voir tous les partenaires
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
