import { motion } from "framer-motion";
import { Shield, FileText, Eye, Users, Camera } from "lucide-react";

export default function MentionsLegalesPage() {
  const sections = [
    {
      icon: <FileText className="w-5 h-5" />,
      titre: "Mentions légales",
      contenu: `
**Éditeur du site**
Olivier Trevis
Dour, Belgique
Email : contact@oliviertrevis.be

**Hébergeur**
Base44 — https://base44.com

**Responsable de la publication**
Olivier Trevis

**Propriété intellectuelle**
L'ensemble du contenu de ce site (textes, images, vidéos, logos) est protégé par le droit d'auteur. Toute reproduction, même partielle, est interdite sans autorisation préalable.
      `
    },
    {
      icon: <Shield className="w-5 h-5" />,
      titre: "Politique de confidentialité",
      contenu: `
**Collecte des données**
Ce site collecte uniquement les données personnelles nécessaires à son fonctionnement : nom, prénom, adresse email, téléphone (via les formulaires de contact, de candidature et de proposition).

**Finalités du traitement**
Les données collectées sont utilisées pour :
- Traiter vos demandes de contact
- Gérer les candidatures aux concours
- Vous informer des événements (si consentement)
- Assurer la gestion administrative des projets

**Base légale**
Le traitement est fondé sur votre consentement exprès, recueilli lors de la soumission des formulaires.

**Conservation des données**
Vos données sont conservées pendant la durée nécessaire à leur traitement, et au maximum 3 ans après votre dernier contact, sauf obligation légale contraire.

**Vos droits**
Conformément au RGPD, vous disposez des droits suivants :
- Droit d'accès à vos données
- Droit de rectification
- Droit à l'effacement (droit à l'oubli)
- Droit à la portabilité
- Droit d'opposition

Pour exercer ces droits, contactez : contact@oliviertrevis.be
      `
    },
    {
      icon: <Eye className="w-5 h-5" />,
      titre: "Cookies",
      contenu: `
Ce site utilise des cookies techniques nécessaires à son bon fonctionnement. Aucun cookie publicitaire ou de traçage n'est utilisé sans votre consentement.

**Cookies utilisés**
- Cookies de session : nécessaires au fonctionnement du site
- Cookies de préférences : mémorisent vos choix de navigation

Vous pouvez désactiver les cookies dans les paramètres de votre navigateur, mais cela peut affecter votre expérience sur le site.
      `
    },
    {
      icon: <Camera className="w-5 h-5" />,
      titre: "Droits à l'image",
      contenu: `
**Photos et vidéos des événements**
Les photos et vidéos prises lors des événements organisés par Olivier Trevis (Miss & Mister Dour, Tour de Dour, etc.) peuvent être utilisées à des fins de communication sur ce site et nos réseaux sociaux.

**Candidats aux concours**
En soumettant une candidature, les participants acceptent que leurs photos et vidéos soient utilisées à des fins de promotion de l'événement.

**Droit à l'effacement**
Toute personne peut demander le retrait de son image en envoyant une demande à contact@oliviertrevis.be avec les informations nécessaires à l'identification de la photo ou vidéo concernée.
      `
    },
    {
      icon: <Users className="w-5 h-5" />,
      titre: "Conditions d'utilisation",
      contenu: `
**Accès au site**
L'accès à ce site est libre et gratuit. Nous nous réservons le droit de modifier, suspendre ou interrompre l'accès au site à tout moment et sans préavis.

**Responsabilité**
Olivier Trevis ne saurait être tenu responsable des dommages directs ou indirects résultant de l'utilisation de ce site ou de l'impossibilité d'y accéder.

**Liens externes**
Ce site peut contenir des liens vers des sites tiers. Nous n'assumons aucune responsabilité quant au contenu de ces sites externes.

**Droit applicable**
Le présent site est soumis au droit belge. En cas de litige, les tribunaux belges seront seuls compétents.
      `
    },
  ];

  const renderContent = (text) => {
    return text.trim().split('\n').map((line, i) => {
      const trimmed = line.trim();
      if (!trimmed) return <br key={i} />;
      if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
        return <p key={i} className="font-bold text-white mt-4 mb-1">{trimmed.slice(2, -2)}</p>;
      }
      if (trimmed.startsWith('- ')) {
        return <li key={i} className="text-gray-400 ml-4">{trimmed.slice(2)}</li>;
      }
      return <p key={i} className="text-gray-400">{trimmed}</p>;
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* HERO */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-black" />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-yellow-400 tracking-[0.3em] text-sm uppercase mb-4">Légal</p>
            <h1 className="text-4xl md:text-5xl font-black mb-4 text-white">Mentions légales & RGPD</h1>
            <p className="text-gray-400 max-w-xl mx-auto">Politique de confidentialité, droits à l'image et conditions d'utilisation du site oliviertrevis.be</p>
          </motion.div>
        </div>
      </section>

      {/* NAVIGATION SECTIONS */}
      <section className="py-8 px-4 bg-gray-950 sticky top-0 z-10 border-b border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            {sections.map((s, i) => (
              <a key={i} href={`#section-${i}`}
                className="flex items-center gap-1 px-4 py-2 rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-white/30 text-sm transition-all">
                {s.icon} {s.titre}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* SECTIONS */}
      <section className="py-16 px-4 pb-24">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="text-right text-xs text-gray-500 italic mb-8">
            Dernière mise à jour : Mai 2026
          </div>
          {sections.map((s, i) => (
            <motion.div key={i} id={`section-${i}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400">
                  {s.icon}
                </div>
                <h2 className="text-xl font-black text-white">{s.titre}</h2>
              </div>
              <div className="p-8 rounded-2xl bg-gray-900 border border-white/5 space-y-2 leading-relaxed">
                {renderContent(s.contenu)}
              </div>
            </motion.div>
          ))}

          <div className="p-6 rounded-2xl bg-yellow-500/5 border border-yellow-500/20 text-center">
            <p className="text-gray-400 text-sm">
              Pour toute question concernant vos données personnelles ou l'exercice de vos droits, contactez-nous à{" "}
              <a href="mailto:contact@oliviertrevis.be" className="text-yellow-400 underline">contact@oliviertrevis.be</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
