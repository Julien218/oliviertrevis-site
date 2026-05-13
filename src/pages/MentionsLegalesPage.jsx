import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Shield, FileText, Eye, Lock, Image, CheckSquare } from "lucide-react";
import { Link } from "react-router-dom";

const SECTIONS = [
  {
    id: "mentions",
    icon: <FileText className="w-5 h-5" />,
    titre: "Mentions légales",
    color: "text-yellow-400",
    border: "border-yellow-500/30",
    contenu: (
      <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
        <div><p className="text-white font-semibold mb-1">Responsable de publication</p><p>Olivier Trevis<br />Dour, Belgique<br />Email : contact@oliviertrevis.be</p></div>
        <div><p className="text-white font-semibold mb-1">Développement & hébergement</p><p>Site développé par <strong className="text-yellow-400">JS-Innov.IA</strong><br />Hébergement : Railway (railway.app)</p></div>
        <div><p className="text-white font-semibold mb-1">Propriété intellectuelle</p><p>L'ensemble du contenu de ce site (textes, images, vidéos, logos) est protégé par le droit d'auteur. Toute reproduction, même partielle, est interdite sans autorisation écrite préalable d'Olivier Trevis.</p></div>
        <div><p className="text-white font-semibold mb-1">Liens externes</p><p>Le site peut contenir des liens vers des sites tiers. Olivier Trevis n'est pas responsable du contenu de ces sites externes.</p></div>
      </div>
    ),
  },
  {
    id: "confidentialite",
    icon: <Lock className="w-5 h-5" />,
    titre: "Politique de confidentialité",
    color: "text-blue-400",
    border: "border-blue-500/30",
    contenu: (
      <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
        <div><p className="text-white font-semibold mb-1">Données collectées</p><p>Nous collectons uniquement les données nécessaires au traitement de vos demandes : nom, prénom, email, téléphone et message. Ces données sont collectées via les formulaires de contact, de candidature et de partenariat.</p></div>
        <div><p className="text-white font-semibold mb-1">Finalité du traitement</p><ul className="list-disc pl-5 space-y-1 mt-2"><li>Répondre à vos demandes de contact</li><li>Traiter les candidatures au concours Miss & Mister Dour</li><li>Gérer les demandes de partenariat</li><li>Envoyer des informations sur les événements (avec consentement)</li></ul></div>
        <div><p className="text-white font-semibold mb-1">Conservation des données</p><p>Vos données sont conservées pendant une durée maximale de 3 ans après votre dernière interaction. Les candidatures sont conservées le temps nécessaire à l'organisation du concours.</p></div>
        <div><p className="text-white font-semibold mb-1">Partage des données</p><p>Vos données ne sont jamais vendues ni transmises à des tiers à des fins commerciales. Elles peuvent être partagées avec des prestataires techniques dans le cadre strict de la gestion du site.</p></div>
        <div><p className="text-white font-semibold mb-1">Hébergement des données</p><p>Les données sont hébergées sur des serveurs sécurisés via Railway et Supabase, conformes aux standards européens de protection des données.</p></div>
      </div>
    ),
  },
  {
    id: "rgpd",
    icon: <Shield className="w-5 h-5" />,
    titre: "Vos droits RGPD",
    color: "text-green-400",
    border: "border-green-500/30",
    contenu: (
      <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
        <p>Conformément au Règlement Général sur la Protection des Données (RGPD - UE 2016/679), vous disposez des droits suivants :</p>
        <div className="grid md:grid-cols-2 gap-4 mt-2">
          {[
            { titre: "Droit d'accès", desc: "Vous pouvez demander à consulter les données personnelles que nous détenons vous concernant." },
            { titre: "Droit de rectification", desc: "Vous pouvez demander la correction de données inexactes ou incomplètes." },
            { titre: "Droit à l'effacement", desc: "Vous pouvez demander la suppression de vos données (« droit à l'oubli »)." },
            { titre: "Droit d'opposition", desc: "Vous pouvez vous opposer au traitement de vos données à tout moment." },
            { titre: "Droit à la portabilité", desc: "Vous pouvez demander à recevoir vos données dans un format structuré et lisible." },
            { titre: "Droit de retrait", desc: "Vous pouvez retirer votre consentement à tout moment sans affecter les traitements passés." },
          ].map((d, i) => (
            <div key={i} className="p-4 rounded-xl bg-gray-800/50 border border-white/5">
              <p className="text-white font-semibold text-xs mb-1">{d.titre}</p>
              <p className="text-gray-500 text-xs">{d.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-4">Pour exercer ces droits, contactez-nous à : <a href="mailto:contact@oliviertrevis.be" className="text-blue-400 hover:underline">contact@oliviertrevis.be</a>. Vous disposez également du droit d'introduire une réclamation auprès de l'<a href="https://www.autoriteprotectiondonnees.be" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Autorité de Protection des Données belge</a>.</p>
      </div>
    ),
  },
  {
    id: "droits-image",
    icon: <Image className="w-5 h-5" />,
    titre: "Droits à l'image & vidéos",
    color: "text-purple-400",
    border: "border-purple-500/30",
    contenu: (
      <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
        <div><p className="text-white font-semibold mb-1">Prises de vue lors des événements</p><p>Des photos et vidéos sont réalisées lors des événements organisés par Olivier Trevis (Miss & Mister Dour, Tour de Dour, etc.). En participant à ces événements, les participants et le public acceptent que leur image puisse être utilisée à des fins de communication non commerciale.</p></div>
        <div><p className="text-white font-semibold mb-1">Utilisation des images</p><p>Les photos et vidéos peuvent être publiées sur le site oliviertrevis.be, les réseaux sociaux associés et dans les communications officielles des projets d'Olivier Trevis.</p></div>
        <div><p className="text-white font-semibold mb-1">Droit d'opposition</p><p>Toute personne photographiée ou filmée peut demander le retrait de son image en contactant : <a href="mailto:contact@oliviertrevis.be" className="text-purple-400 hover:underline">contact@oliviertrevis.be</a>. La demande sera traitée dans les meilleurs délais.</p></div>
        <div><p className="text-white font-semibold mb-1">Mineurs</p><p>Pour les mineurs, le consentement écrit d'un représentant légal est requis avant toute publication. Le formulaire de candidature pour les concours inclut ce consentement.</p></div>
      </div>
    ),
  },
  {
    id: "cookies",
    icon: <Eye className="w-5 h-5" />,
    titre: "Cookies & Technologies",
    color: "text-orange-400",
    border: "border-orange-500/30",
    contenu: (
      <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
        <div><p className="text-white font-semibold mb-1">Cookies utilisés</p><p>Ce site utilise uniquement des cookies techniques nécessaires à son bon fonctionnement. Aucun cookie de traçage publicitaire n'est utilisé.</p></div>
        <div><p className="text-white font-semibold mb-1">YouTube</p><p>Les vidéos YouTube intégrées peuvent déposer des cookies de YouTube/Google. En visionnant une vidéo, vous acceptez la politique de confidentialité de Google.</p></div>
        <div><p className="text-white font-semibold mb-1">Désactivation</p><p>Vous pouvez configurer votre navigateur pour refuser les cookies. Cela peut affecter certaines fonctionnalités du site.</p></div>
      </div>
    ),
  },
  {
    id: "conditions",
    icon: <CheckSquare className="w-5 h-5" />,
    titre: "Conditions d'utilisation",
    color: "text-red-400",
    border: "border-red-500/30",
    contenu: (
      <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
        <div><p className="text-white font-semibold mb-1">Usage du site</p><p>Ce site est destiné à présenter les activités associatives, culturelles et événementielles d'Olivier Trevis. Toute utilisation frauduleuse, abusive ou contraire aux bonnes mœurs est interdite.</p></div>
        <div><p className="text-white font-semibold mb-1">Formulaires</p><p>Les formulaires de contact et de candidature sont destinés à un usage sincère et personnel. Tout envoi de contenu offensant, diffamatoire ou illégal est strictement interdit.</p></div>
        <div><p className="text-white font-semibold mb-1">Candidatures au concours</p><p>Les candidatures au concours Miss & Mister Dour Fashionist'ART sont soumises au règlement officiel du concours. En soumettant une candidature, le candidat accepte ce règlement dans son intégralité.</p></div>
        <div><p className="text-white font-semibold mb-1">Responsabilité</p><p>Olivier Trevis s'efforce de maintenir les informations du site à jour mais ne peut garantir leur exactitude absolue. Il ne saurait être tenu responsable des erreurs ou omissions.</p></div>
        <div><p className="text-white font-semibold mb-1">Droit applicable</p><p>Le présent site est soumis au droit belge. Tout litige sera soumis à la juridiction compétente de Belgique.</p></div>
      </div>
    ),
  },
];

function Accordion({ section }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`rounded-2xl bg-gray-900 border ${open ? section.border : "border-white/5"} overflow-hidden transition-all duration-300`}>
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-white/2 transition-colors">
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${section.color} bg-white/5`}>
            {section.icon}
          </div>
          <h3 className="text-white font-bold text-lg">{section.titre}</h3>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
            <div className="px-6 pb-6 border-t border-white/5 pt-5">
              {section.contenu}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-black text-white">

      {/* ── HERO ── */}
      <section className="relative py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-black" />
        <div className="relative max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-yellow-400 tracking-[0.3em] text-xs uppercase font-semibold mb-4">Informations légales</p>
            <h1 className="text-4xl md:text-5xl font-black mb-4 text-white">Mentions légales & RGPD</h1>
            <p className="text-gray-400 text-base max-w-xl mx-auto">
              Transparence totale sur l'utilisation de vos données et les conditions d'utilisation du site oliviertrevis.be.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── RÉSUMÉ RAPIDE ── */}
      <section className="py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="p-5 rounded-2xl bg-green-500/5 border border-green-500/20 flex items-start gap-4">
            <Shield className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-bold mb-1">Engagement de protection</p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Ce site respecte le RGPD (Règlement Général sur la Protection des Données). Vos données ne sont jamais vendues. Aucune publicité ciblée. Contact : <a href="mailto:contact@oliviertrevis.be" className="text-green-400 hover:underline">contact@oliviertrevis.be</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ACCORDÉONS ── */}
      <section className="py-8 px-4 pb-20">
        <div className="max-w-3xl mx-auto space-y-4">
          {SECTIONS.map(s => <Accordion key={s.id} section={s} />)}
        </div>
      </section>

      {/* ── DERNIÈRE MÀJ ── */}
      <section className="py-10 px-4 border-t border-white/5 bg-gray-950">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">Dernière mise à jour : Mai 2026</p>
          <div className="flex gap-4">
            <Link to="/contact" className="text-xs text-gray-500 hover:text-yellow-400 transition-colors">Une question ? Contactez-nous</Link>
            <Link to="/" className="text-xs text-gray-500 hover:text-white transition-colors">Retour à l'accueil</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
