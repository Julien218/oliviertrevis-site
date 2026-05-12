import { motion } from "framer-motion";
import { Heart, Users, Star, MapPin, Mic, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

export default function AProposPage() {
  const valeurs = [
    { icon: <Heart className="w-6 h-6" />, titre: "Engagement Local", desc: "Dour et sa région sont au cœur de chaque initiative. L'ancrage local est une force, pas une limite." },
    { icon: <Users className="w-6 h-6" />, titre: "Inclusion", desc: "Chaque projet est pensé pour rassembler, quelle que soit l'origine, l'âge ou le profil." },
    { icon: <Star className="w-6 h-6" />, titre: "Valorisation des talents", desc: "Révéler et mettre en lumière les talents locaux est une mission quotidienne." },
    { icon: <Mic className="w-6 h-6" />, titre: "Culture & Art", desc: "L'art, la mode et la culture sont des vecteurs de fierté et de développement pour Dour." },
    { icon: <Trophy className="w-6 h-6" />, titre: "Excellence", desc: "Des événements de qualité qui reflètent positivement l'image de Dour et de sa communauté." },
    { icon: <MapPin className="w-6 h-6" />, titre: "Visibilité", desc: "Faire rayonner Dour au-delà de ses frontières, en Belgique et à l'international." },
  ];

  const roles = [
    { titre: "Organisateur d'événements", desc: "Miss & Mister Dour Fashionist'ART, Le Tour de Dour et de nombreuses initiatives culturelles locales." },
    { titre: "Président & membre d'ASBL", desc: "Impliqué dans plusieurs associations à but non lucratif œuvrant pour le développement local de Dour." },
    { titre: "Créateur de contenu", desc: "Production de vidéos, documentaires locaux et contenus digitaux pour valoriser les initiatives de la région." },
    { titre: "Ambassadeur de Dour", desc: "Porteur de la voix de Dour, de ses habitants, de ses talents et de sa culture dans les milieux associatifs et médiatiques." },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* HERO */}
      <section className="relative py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-black" />
        <div className="absolute inset-0 opacity-10"
          style={{background: "radial-gradient(ellipse at 30% 50%, #d4af37 0%, transparent 60%)"}} />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-yellow-400 tracking-[0.3em] text-sm uppercase mb-4">À propos</p>
            <h1 className="text-5xl md:text-7xl font-black mb-6">
              Qui est <span style={{background: "linear-gradient(135deg, #d4af37, #fff8e1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"}}>Olivier Trevis</span> ?
            </h1>
            <div className="w-24 h-px mx-auto mb-8" style={{background: "linear-gradient(90deg, transparent, #d4af37, transparent)"}} />
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
              Acteur local, associatif et événementiel basé à <strong className="text-white">Dour</strong>, 
              Olivier Trevis consacre son énergie à créer, rassembler et valoriser tout ce qui fait 
              la richesse de cette ville et de ses habitants.
            </p>
          </motion.div>
        </div>
      </section>

      {/* PORTRAIT */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Photo placeholder */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-gray-900 to-gray-950 border border-white/10 overflow-hidden flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 rounded-full bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl font-black text-yellow-400">OT</span>
                  </div>
                  <p className="text-gray-500 text-sm">Photo d'Olivier Trevis</p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl border border-yellow-500/20"
                style={{background: "linear-gradient(135deg, #d4af3710, transparent)"}} />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="text-yellow-400 tracking-widest text-sm uppercase mb-4">Son histoire</p>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6">Un homme de terrain, ancré dans Dour</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Né et ancré à <strong className="text-white">Dour</strong>, Olivier Trevis est bien plus qu'un organisateur d'événements. 
                  Il est le reflet d'une génération qui croit que chaque ville, même modeste, peut rayonner grâce à ses talents et sa culture.
                </p>
                <p>
                  À travers ses projets, il porte une vision simple mais puissante : <em className="text-yellow-400">mettre en avant Dour, ses habitants, ses associations et ses initiatives</em>, 
                  pour créer un sentiment de fierté collective.
                </p>
                <p>
                  Que ce soit à travers les concours <strong className="text-white">Miss & Mister Dour Fashionist'ART</strong>, 
                  les reportages du <strong className="text-white">Tour de Dour</strong>, ou ses engagements associatifs, 
                  chaque action est guidée par l'amour de sa communauté.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* RÔLES */}
      <section className="py-20 px-4 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-blue-400 tracking-widest text-sm uppercase mb-3">Implication associative</p>
            <h2 className="text-3xl md:text-4xl font-black text-white">Ses rôles dans la communauté</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {roles.map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                className="p-8 rounded-2xl bg-gray-900 border border-white/5 hover:border-yellow-500/20 transition-all">
                <div className="w-2 h-8 rounded-full bg-yellow-500 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">{r.titre}</h3>
                <p className="text-gray-400 leading-relaxed">{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VALEURS */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-red-400 tracking-widest text-sm uppercase mb-3">Ce qui le guide</p>
            <h2 className="text-3xl md:text-4xl font-black text-white">Ses valeurs</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {valeurs.map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                className="p-6 rounded-2xl bg-gray-900 border border-white/5 hover:border-yellow-500/20 transition-all text-center">
                <div className="w-12 h-12 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mx-auto mb-4 text-yellow-400">
                  {v.icon}
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{v.titre}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VISION */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0" style={{background: "radial-gradient(ellipse at center, #1d4ed810 0%, transparent 70%)"}} />
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="text-blue-400 tracking-widest text-sm uppercase mb-4">Sa vision</p>
          <blockquote className="text-2xl md:text-3xl font-light text-white leading-relaxed mb-8 italic">
            "Dour mérite d'être fière d'elle-même. Chaque talent, chaque initiative, chaque association 
            qui y fleurit est une preuve que la culture et l'engagement peuvent transformer une communauté."
          </blockquote>
          <p className="text-yellow-400 font-semibold">— Olivier Trevis</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 border-t border-white/5">
        <div className="max-w-4xl mx-auto flex flex-wrap gap-4 justify-center">
          <Link to="/asbl" className="px-8 py-3 border border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10 rounded-full transition-all font-medium">
            Voir les projets ASBL
          </Link>
          <Link to="/miss-mister-dour" className="px-8 py-3 border border-red-500/50 text-red-400 hover:bg-red-500/10 rounded-full transition-all font-medium">
            Miss & Mister Dour
          </Link>
          <Link to="/contact" className="px-8 py-3 bg-yellow-500 text-black font-bold rounded-full hover:bg-yellow-400 transition-all">
            Prendre contact
          </Link>
        </div>
      </section>
    </div>
  );
}
