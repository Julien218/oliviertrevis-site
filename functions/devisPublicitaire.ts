import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://rzvvwcwyaddzsaattwqt.supabase.co";
const SUPABASE_KEY = Deno.env.get("SUPABASE_SERVICE_KEY") || "";
const GMAIL_TOKEN  = Deno.env.get("GMAIL_ACCESS_TOKEN") || "";

function buildDevisEmail(data: any): string {
  const isJY = data.context === "jytrixai";
  const acheteurNom  = isJY ? "JY-Trix.Ai" : "JS-Innov.IA";
  const emailFrom    = isJY ? "coronadoyanis16.01@gmail.com" : "info@jsinnovia.com";
  const dateStr = new Date().toLocaleDateString("fr-BE", { day: "2-digit", month: "long", year: "numeric" });
  const devisNum = `DEV-${Date.now().toString().slice(-6)}`;

  const prixHtva = data.prix_htva || 0;
  const tva21 = Math.round(prixHtva * 0.21 * 100) / 100;
  const prixTtc = Math.round((prixHtva + tva21) * 100) / 100;

  return `
Bonjour ${data.nom},

Nous vous remercions pour votre intérêt pour notre espace publicitaire LED à Dour.

Veuillez trouver ci-dessous votre devis personnalisé :

══════════════════════════════════════════
DEVIS N° ${devisNum} — ${dateStr}
══════════════════════════════════════════

CLIENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Nom          : ${data.nom}
Société      : ${data.societe || "—"}
Email        : ${data.email}
Téléphone    : ${data.telephone}
BCE/TVA      : ${data.bce || "—"}

PRESTATION CHOISIE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Formule      : ${data.offre_label}
Description  : Location espace publicitaire — Écran LED 4m × 2m
Localisation : Rue de la Corderie, 19 — 7370 Dour
Diffusion    : 1 passage / 2 min — 5 sec — Lundi→Samedi — 9h00/19h30
Date début   : ${data.date_debut || "À confirmer"}

TARIFICATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Montant HTVA : ${prixHtva.toLocaleString("fr-BE")} €
TVA 21%      : ${tva21.toLocaleString("fr-BE")} €
TOTAL TTC    : ${prixTtc.toLocaleString("fr-BE")} €

Le montant est payable intégralement par anticipation avant le début des diffusions.

MODALITÉS DE PAIEMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
▸ Virement bancaire :
  Bénéficiaire : TREVIS Olivier
  IBAN         : BE XX XXXX XXXX XXXX (à confirmer par Olivier Trevis)
  Communication : ${devisNum} — ${data.nom}

▸ Lien de paiement sécurisé : sur demande

PROCHAINES ÉTAPES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Validez ce devis en répondant à cet email
2. Procédez au paiement selon la modalité choisie
3. Transmettez votre contenu publicitaire (MP4, Full HD, max 50Mo) 72h avant
4. Signature du contrat de location avec Olivier Trevis

Pour fixer un rendez-vous ou toute question :
📞 Olivier Trevis : +32 475 42 69 42
📧 oliviertrevis@outlook.be
🌐 www.oliviertrevis.be

══════════════════════════════════════════

Ce devis est valable 30 jours à compter de sa date d'émission.
Prestataire : Olivier Trevis — BCE 0792.067.059 — Rue du Commerce, 351 — 7370 Dour
Conception digitale : JS-Innov.IA — www.jsinnovia.com

Cordialement,

${acheteurNom} × Olivier Trevis
Espaces Publicitaires LED — Dour
`;
}

function buildNotifEmail(data: any, devisRef: string): string {
  const isJY = data.context === "jytrixai";
  return `
🔔 NOUVEAU DEVIS ENVOYÉ — ${isJY ? "JY-Trix.Ai" : "JS-Innov.IA"}

Un devis vient d'être transmis automatiquement au client.

CLIENT
- Nom       : ${data.nom}
- Société   : ${data.societe || "—"}
- Email     : ${data.email}
- Téléphone : ${data.telephone}
- BCE/TVA   : ${data.bce || "—"}

OFFRE CHOISIE
- Formule   : ${data.offre_label}
- Montant   : ${data.prix_htva} € HTVA
- Date début: ${data.date_debut || "À confirmer"}

Message client : ${data.message || "Aucun"}

Devis envoyé à : ${data.email}
À : ${new Date().toLocaleString("fr-BE")}

⚡ Action requise : contactez le client pour finaliser le rendez-vous et la signature du contrat.

--
JS-Innov.IA — Système automatique
`;
}

async function sendEmail(to: string, subject: string, body: string, accessToken: string) {
  const message = [
    `To: ${to}`,
    `Subject: =?utf-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`,
    `MIME-Version: 1.0`,
    `Content-Type: text/plain; charset=utf-8`,
    `Content-Transfer-Encoding: 8bit`,
    ``,
    body
  ].join("\r\n");

  const encoded = btoa(unescape(encodeURIComponent(message)))
    .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

  const res = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ raw: encoded })
  });
  return res.ok;
}

Deno.serve(async (req) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };

  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const data = await req.json();
    const { createClientFromRequest } = await import("npm:@base44/deno-sdk");
    const base44 = createClientFromRequest(req);

    // Récupérer le token Gmail via Base44
    const { accessToken } = await base44.asServiceRole.connectors.getConnection("gmail");

    const devisNum = `DEV-${Date.now().toString().slice(-6)}`;

    // 1. Email devis au client
    const devisBody  = buildDevisEmail(data);
    const isJY = data.context === "jytrixai";
    const subjectClient = `Votre devis espace publicitaire — ${data.offre_label} | Réf. ${devisNum}`;
    await sendEmail(data.email, subjectClient, devisBody, accessToken);

    // 2. Notifications aux responsables
    const notifBody = buildNotifEmail(data, devisNum);
    const subjectNotif = `🔔 Nouveau devis envoyé — ${data.nom} | ${data.offre_label}`;
    const notifEmails = data.notif_emails || ["oliviertrevis@outlook.be", "coronadoyanis16.01@gmail.com"];
    for (const email of notifEmails) {
      await sendEmail(email, subjectNotif, notifBody, accessToken);
    }

    // 3. Sauvegarder en base (schema oliviertrevis)
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
      db: { schema: "oliviertrevis" }
    });
    await supabase.from("devis_publicitaires").insert({
      nom: data.nom, societe: data.societe, email: data.email,
      telephone: data.telephone, bce: data.bce,
      offre: data.offre, offre_label: data.offre_label,
      prix_htva: data.prix_htva, date_debut: data.date_debut,
      message: data.message, context: data.context,
      devis_ref: devisNum, created_at: new Date().toISOString()
    });

    return new Response(JSON.stringify({ ok: true, devis: devisNum }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });

  } catch (err) {
    console.error("Erreur devis:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
