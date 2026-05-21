import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  const url = new URL(req.url);
  const entity = url.searchParams.get("entity");
  const id = url.searchParams.get("id");

  const base44 = createClientFromRequest(req);

  const entityMap: Record<string, any> = {
    MascotteReponse: base44.asServiceRole.entities.MascotteReponse,
    MessageContact:  base44.asServiceRole.entities.MessageContact,
    Candidature:     base44.asServiceRole.entities.Candidature,
    Actualite:       base44.asServiceRole.entities.Actualite,
    Video:           base44.asServiceRole.entities.Video,
    Asbl:            base44.asServiceRole.entities.Asbl,
    Partenaire:      base44.asServiceRole.entities.Partenaire,
    Laureat:         base44.asServiceRole.entities.Laureat,
    Evenement:       base44.asServiceRole.entities.Evenement,
  };

  if (!entity || !entityMap[entity]) {
    return new Response(JSON.stringify({ error: "Entity not found" }), { status: 400, headers });
  }

  const db = entityMap[entity];

  try {
    if (req.method === "DELETE" && id) {
      await db.delete(id);
      return new Response(JSON.stringify({ success: true }), { headers });
    }

    if (req.method === "POST" && id) {
      const body = await req.json();
      const updated = await db.update(id, body);
      return new Response(JSON.stringify(updated), { headers });
    }

    const records = await db.list();
    return new Response(JSON.stringify(records), { headers });

  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers });
  }
});
