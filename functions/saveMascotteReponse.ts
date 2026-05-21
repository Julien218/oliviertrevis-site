import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  // CORS
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));

    // Champs envoyés par le frontend (dour_v2)
    const {
      prenom,
      nom,
      email,
      profil_dominant,
      score_minier,
      score_nature,
      score_festif,
      score_moderne,
      message_libre,
      reponses_detail, // JSON stringifié : {q1_mots, q2_lieux, q3_creature, q4_mascotte}
      source,
      session_id,
      consentement_rgpd,
    } = body;

    // Parser les réponses détaillées
    let detail: Record<string, string> = {};
    try {
      detail = typeof reponses_detail === 'string'
        ? JSON.parse(reponses_detail)
        : (reponses_detail || {});
    } catch (_) {
      detail = {};
    }

    const record = await base44.asServiceRole.entities.MascotteReponse.create({
      prenom:           prenom || "",
      email:            email || "",
      score_minier:     score_minier || 0,
      score_nature:     score_nature || 0,
      score_festif:     score_festif || 0,
      score_moderne:    score_moderne || 0,
      profil:           profil_dominant || "Tour de Dour",
      reponse_mots:     detail.q1_mots     || "",
      reponse_lieux:    detail.q2_lieux    || "",
      reponse_creature: detail.q3_creature || "",
      reponse_mascotte: detail.q4_mascotte || "",
      reponse_libre:    message_libre      || "",
      session_id:       session_id         || crypto.randomUUID(),
      consentement_rgpd: consentement_rgpd === true || consentement_rgpd === "true",
    });

    return Response.json(
      { success: true, id: record.id, profil: profil_dominant || "Tour de Dour" },
      { headers: { "Access-Control-Allow-Origin": "*" } }
    );
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
});
