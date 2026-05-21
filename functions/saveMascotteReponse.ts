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
      code_postal,
      reponse_mots,
      reponse_lieux,
      reponse_creature,
      reponse_mascotte,
      profil_dominant,
      consentement_rgpd,
      scores,
      session_id,
      reponse_libre,
    } = body;

    // Calcul profil dominant depuis les scores si disponibles
    let profil = profil_dominant || "Tour de Dour";
    if (scores) {
      const map = { "Esprit Minier": scores.m||0, "Cœur Nature": scores.n||0, "Cœur Festif": scores.f||0, "Vision Moderne": scores.mo||0 };
      const top = Object.entries(map).sort((a,b) => b[1]-a[1])[0];
      if (top && top[1] > 0) profil = top[0];
    }

    const record = await base44.asServiceRole.entities.MascotteReponse.create({
      prenom:           prenom           || "",
      nom:              nom              || "",
      email:            email            || "",
      code_postal:      code_postal      || "",
      reponse_mots:     reponse_mots     || "",
      reponse_lieux:    reponse_lieux    || "",
      reponse_creature: reponse_creature || "",
      reponse_mascotte: reponse_mascotte || "",
      reponse_libre:    reponse_libre    || "",
      profil:           profil,
      score_minier:     scores?.m  || 0,
      score_nature:     scores?.n  || 0,
      score_festif:     scores?.f  || 0,
      score_moderne:    scores?.mo || 0,
      session_id:       session_id || crypto.randomUUID(),
      consentement_rgpd: consentement_rgpd === true || consentement_rgpd === "true",
    });

    return Response.json(
      { success: true, id: record.id, profil },
      { headers: { "Access-Control-Allow-Origin": "*" } }
    );
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
});
