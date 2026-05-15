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
    const { prenom, email, scores, reponse_libre, session_id } = body;

    const sc = scores || { m: 0, n: 0, f: 0, mo: 0 };
    const profilMap = {
      m: "Esprit Minier — Force et Héritage",
      n: "Âme Nature — Douceur et Harmonie",
      f: "Coeur Festif — Joie et Célébration",
      mo: "Vision Moderne — Innovation et Avenir",
    };

    const entries = Object.entries(sc);
    entries.sort((a, b) => (b[1] as number) - (a[1] as number));
    const dominant = entries[0][0];
    const profil = profilMap[dominant] || "Profil Dour";

    const record = await base44.asServiceRole.entities.MascotteReponse.create({
      prenom: prenom || "",
      email: email || "",
      score_minier: sc.m || 0,
      score_nature: sc.n || 0,
      score_festif: sc.f || 0,
      score_moderne: sc.mo || 0,
      profil,
      reponse_libre: reponse_libre || "",
      session_id: session_id || crypto.randomUUID(),
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
