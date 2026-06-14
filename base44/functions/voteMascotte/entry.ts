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
    const { mascotte_slug, mascotte_nom, session_id } = body;

    if (!mascotte_slug) {
      return new Response(JSON.stringify({ error: "mascotte_slug is required" }), { status: 400, headers });
    }

    // Check for duplicate vote with same session_id
    if (session_id) {
      const existing = await base44.asServiceRole.entities.MascoVote.filter({ 
        session_id, 
        mascotte_slug 
      });
      if (existing && existing.length > 0) {
        return new Response(JSON.stringify({ success: true, already_voted: true }), { headers });
      }
    }

    // Save the vote
    const vote = await base44.asServiceRole.entities.MascoVote.create({
      mascotte_slug,
      mascotte_nom: mascotte_nom || mascotte_slug,
      session_id: session_id || crypto.randomUUID(),
      source: "web",
    });

    return new Response(JSON.stringify({ success: true, vote_id: vote.id }), { headers });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers });
  }
});