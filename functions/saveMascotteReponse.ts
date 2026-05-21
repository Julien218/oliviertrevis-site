import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
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

    const {
      prenom,
      nom,
      email,
      reponse_mots,
      reponse_lieux,
      reponse_creature,
      reponse_mascotte,
      profil_dominant,
      consentement_rgpd,
    } = body;

    const record = await base44.asServiceRole.entities.MascotteReponse.create({
      prenom:           prenom           || "",
      nom:              nom              || "",
      email:            email            || "",
      reponse_mots:     reponse_mots     || "",
      reponse_lieux:    reponse_lieux    || "",
      reponse_creature: reponse_creature || "",
      reponse_mascotte: reponse_mascotte || "",
      profil:           profil_dominant  || "Tour de Dour",
      score_minier:     0,
      score_nature:     0,
      score_festif:     0,
      score_moderne:    0,
      session_id:       crypto.randomUUID(),
      consentement_rgpd: consentement_rgpd === true || consentement_rgpd === "true",
    });

    return Response.json(
      { success: true, id: record.id },
      { headers: { "Access-Control-Allow-Origin": "*" } }
    );
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
});
