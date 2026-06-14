import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));
    const { slug } = body;

    // Read mascottes from this app's own Mascotte entity
    let mascottes;
    if (slug) {
      mascottes = await base44.asServiceRole.entities.Mascotte.filter({ slug });
      if (!mascottes || mascottes.length === 0) {
        return new Response(JSON.stringify({ error: "Mascotte not found" }), { status: 404, headers });
      }
      return new Response(JSON.stringify(mascottes[0]), { headers });
    }

    mascottes = await base44.asServiceRole.entities.Mascotte.list();
    return new Response(JSON.stringify(mascottes), { headers });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers });
  }
});