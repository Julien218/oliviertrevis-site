// ============================================================
// Contenu riche éditorial pour les pages détail mascottes
// Le Tour de Dour — Js-Innov.IA
// IMPORTANT: nom_affiche ne contient JAMAIS de prénom inventé
// (le public choisit le prénom via le questionnaire /mascotte)
// ============================================================

export const MASCOTTE_CONTENT = {
  canari: {
    nom_affiche: "Le Canari Mineur de Dour",
    slogan: "La voix joyeuse de notre patrimoine",
    origine: "les mines de Dour",
    lieu_prefere: "les terrils et le Parc du Centre",
    objet_fetiche: "casque de mineur",
    talent: "faire chanter la ville",
    mission: "transmettre la mémoire avec le sourire",
    devise: "De la mine à demain",
    histoire: `Le Canari Mineur vient de l'univers des mines de Dour.
On raconte qu'autrefois, un petit canari accompagnait les mineurs dans les galeries.
Son chant rassurait les hommes et portait l'espoir des familles.
Lorsque les mines se sont tues, son chant n'aurait jamais vraiment disparu.
Certains disent qu'on peut encore l'entendre au Parc du Centre, près du kiosque, lorsque le vent passe doucement entre les arbres.
Aujourd'hui, il revient avec son casque, sa guitare et son grand sourire pour rappeler que Dour a une histoire, mais surtout un avenir.`,
    adn: [
      { mot: "Joie", phrase: "Il chante la vie avec le sourire." },
      { mot: "Mémoire", phrase: "Il porte l'histoire des mines de Dour." },
      { mot: "Énergie", phrase: "Il donne le rythme et l'envie d'avancer." },
      { mot: "Transmission", phrase: "Il relie les générations d'hier à demain." },
      { mot: "Fierté locale", phrase: "Il rend hommage aux racines de Dour." },
    ],
    scores: { Joie: 95, Mémoire: 100, Énergie: 90, Proximité: 85, Originalité: 80 },
    pourquoi: [
      "Il représente les racines minières de Dour.",
      "Il relie les anciens et les nouvelles générations.",
      "Il apporte une identité joyeuse, populaire et lumineuse.",
    ],
    interactif: {
      label: "Écouter son chant",
      revealText: "Fermez les yeux… vous êtes au Parc du Centre de Dour.",
    },
  },

  renard: {
    nom_affiche: "Le Renard de Dour",
    slogan: "Le malin qui connaît tous les coins de Dour",
    origine: "les rues et les hauteurs de Dour",
    lieu_prefere: "le Belvédère",
    objet_fetiche: "son foulard coloré",
    talent: "flairer les bonnes idées",
    mission: "connecter les habitants",
    devise: "Toujours un pas d'avance",
    histoire: `Le Renard de Dour est celui qui observe, écoute et comprend la ville.
Il connaît les ruelles, les commerces, les événements, les petites histoires et les grands moments.
On le retrouve là où Dour bouge : près du Belvédère, dans les fêtes, dans les rencontres et dans les lieux où les habitants se rassemblent.
Il représente l'intelligence locale, l'humour, la débrouillardise et l'énergie populaire.`,
    adn: [
      { mot: "Malice", phrase: "Il a toujours une longueur d'avance." },
      { mot: "Curiosité", phrase: "Il connaît tous les secrets de Dour." },
      { mot: "Audace", phrase: "Il n'a pas peur de sortir des sentiers battus." },
      { mot: "Proximité", phrase: "Il est là où les habitants se retrouvent." },
      { mot: "Festif", phrase: "Il met de l'ambiance partout où il passe." },
    ],
    scores: { Malice: 100, Curiosité: 95, Énergie: 90, Proximité: 90, Audace: 85 },
    pourquoi: [
      "Il représente l'esprit malin et débrouillard de Dour.",
      "Il donne une image jeune, festive et connectée.",
      "Il est parfait pour animer les vidéos et les réseaux sociaux.",
    ],
    interactif: {
      label: "Découvrir son parcours",
      revealText: "Le Belvédère → les ruelles du centre → les fêtes de Dour. Il connaît chaque recoin.",
    },
  },

  lion: {
    nom_affiche: "Le Lion de Dour",
    slogan: "La force tranquille de notre commune",
    origine: "le cœur de la commune",
    lieu_prefere: "la maison communale et les grands événements",
    objet_fetiche: "son maillot bleu et jaune",
    talent: "rassembler les habitants",
    mission: "représenter la fierté de Dour",
    devise: "Fort ensemble",
    histoire: `Le Lion de Dour représente la force, la fierté et le rassemblement.
Il porte l'image d'une commune qui avance, qui protège ses habitants et qui croit en son avenir.
Avec son regard franc et son énergie positive, il incarne le courage, l'unité et la détermination.
Il est la mascotte idéale pour les événements officiels, les moments forts et les grandes annonces du Tour de Dour.`,
    adn: [
      { mot: "Fierté", phrase: "Il porte haut les couleurs de Dour." },
      { mot: "Courage", phrase: "Il avance sans jamais reculer." },
      { mot: "Rassemblement", phrase: "Il unit tous les habitants autour d'une même force." },
      { mot: "Protection", phrase: "Il veille sur sa commune." },
      { mot: "Leadership", phrase: "Il montre la voie à suivre." },
    ],
    scores: { Fierté: 100, Force: 95, Rassemblement: 95, Courage: 90, Leadership: 90 },
    pourquoi: [
      "Il représente la force et la fierté de Dour.",
      "Il donne une image officielle, forte et rassurante.",
      "Il peut devenir un symbole puissant pour la commune.",
    ],
    interactif: {
      label: "Voir son cri de ralliement",
      revealText: "Dour avance ensemble.",
    },
  },

  biche: {
    nom_affiche: "La Biche de Dour",
    slogan: "L'élégance au cœur de Dour",
    origine: "la nature et les espaces verts de Dour",
    lieu_prefere: "le Parc du Centre",
    objet_fetiche: "son maillot bleu et jaune",
    talent: "accueillir avec douceur",
    mission: "rappeler que Dour est aussi une ville de cœur",
    devise: "Douce, mais fière",
    histoire: `La Biche de Dour apporte une image douce, lumineuse et accueillante.
Elle représente la nature, la bienveillance, les familles et le lien entre les générations.
Avec son sourire, son énergie calme et son attachement au territoire, elle montre une autre facette de Dour : une commune chaleureuse, sensible et fière de ses racines.
Elle est idéale pour parler aux enfants, aux familles et à tous ceux qui voient Dour comme un lieu de vie.`,
    adn: [
      { mot: "Douceur", phrase: "Elle apaise et rassure." },
      { mot: "Élégance", phrase: "Elle incarne la grâce naturelle de Dour." },
      { mot: "Nature", phrase: "Elle célèbre les espaces verts de la commune." },
      { mot: "Bienveillance", phrase: "Elle prend soin de chacun." },
      { mot: "Proximité", phrase: "Elle parle à toutes les familles." },
    ],
    scores: { Douceur: 100, Élégance: 95, Proximité: 90, Nature: 90, Bienveillance: 95 },
    pourquoi: [
      "Elle représente la douceur et le lien familial.",
      "Elle donne une image positive, naturelle et accueillante.",
      "Elle apporte une mascotte très attachante pour les enfants.",
    ],
    interactif: {
      label: "Découvrir son message",
      revealText: "Dour, c'est aussi la tendresse d'une commune qui rassemble.",
    },
  },

  ours: {
    nom_affiche: "L'Ours de Dour",
    slogan: "Le protecteur chaleureux de la commune",
    origine: "les lieux de rencontre et les moments conviviaux",
    lieu_prefere: "les fêtes locales",
    objet_fetiche: "son maillot rayé bleu et jaune",
    talent: "mettre tout le monde à l'aise",
    mission: "créer du lien entre les habitants",
    devise: "On y va !",
    histoire: `L'Ours de Dour est une mascotte proche des gens.
Il représente la convivialité, la confiance et la force tranquille.
Toujours prêt à partager un bon moment, il incarne l'accueil, la proximité et la joie de vivre.
Avec son pouce levé et son grand sourire, il dit simplement : « On y va ! »
C'est une mascotte familiale, rassurante et populaire.`,
    adn: [
      { mot: "Chaleur", phrase: "Il accueille chacun à bras ouverts." },
      { mot: "Protection", phrase: "Il rassure et met en confiance." },
      { mot: "Convivialité", phrase: "Il aime partager les bons moments." },
      { mot: "Proximité", phrase: "Il est toujours proche des habitants." },
      { mot: "Énergie", phrase: "Il donne envie de participer." },
    ],
    scores: { Chaleur: 100, Protection: 95, Convivialité: 95, Proximité: 90, Énergie: 85 },
    pourquoi: [
      "Il représente la chaleur humaine.",
      "Il donne une image familiale et rassurante.",
      "Il symbolise la force tranquille et la proximité.",
    ],
    interactif: {
      label: "Recevoir son encouragement",
      revealText: "On y va, Dour !",
    },
  },

  licorne: {
    nom_affiche: "La Licorne de Dour",
    slogan: "L'imagination qui fait rayonner Dour",
    origine: "les rêves et les idées nouvelles",
    lieu_prefere: "les événements festifs",
    objet_fetiche: "sa corne lumineuse",
    talent: "transformer une idée en émotion",
    mission: "rappeler que Dour peut aussi rêver grand",
    devise: "Différente, et fière de l'être",
    histoire: `La Licorne de Dour représente l'imagination, l'originalité et la différence.
Elle montre que Dour peut aussi oser rêver, inventer et surprendre.
Elle n'est pas là pour effacer l'histoire, mais pour ouvrir une porte vers l'avenir.
Avec elle, la mascotte devient un symbole de créativité, de liberté et d'audace.`,
    adn: [
      { mot: "Originalité", phrase: "Elle ose être différente." },
      { mot: "Créativité", phrase: "Elle imagine ce que Dour peut devenir." },
      { mot: "Magie", phrase: "Elle apporte une touche d'émerveillement." },
      { mot: "Audace", phrase: "Elle n'a pas peur de surprendre." },
      { mot: "Énergie", phrase: "Elle donne envie de rêver plus grand." },
    ],
    scores: { Originalité: 100, Créativité: 95, Énergie: 85, Magie: 90, Audace: 90 },
    pourquoi: [
      "Elle représente l'imagination et la différence.",
      "Elle peut créer beaucoup de réactions sur les réseaux.",
      "Elle apporte une touche inattendue et moderne.",
    ],
    interactif: {
      label: "Voir son éclat",
      revealText: "✨ Une lumière différente pour un Dour qui ose rêver.",
    },
    isBonus: true,
  },
};

// Fallback local (utilisé si l'API Base44 ne renvoie rien pour ce slug — ex: licorne)
export const LOCAL_FALLBACK = {
  licorne: {
    slug: "licorne",
    nom: "La Licorne de Dour",
    espece: "Licorne lumineuse",
    surnom: "L'Éclat Inattendu",
    image_principale: "https://media.base44.com/images/public/6a24286d838202b06e2597aa/b338cdd5e_generated_image.png",
  },
};

export const QUESTIONNAIRE_URL = "https://www.oliviertrevis.be/mascotte";

export const ALL_SLUGS_ORDER = ["canari", "renard", "lion", "biche", "ours", "licorne"];
