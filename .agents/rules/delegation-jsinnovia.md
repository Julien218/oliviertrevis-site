# Règle de délégation — Agent JS-Innov.IA

## Principe
Tout travail technique lié à JS-Innov.IA est délégué à l'agent JS-Innov.IA via son API.
Je ne fais PAS le travail moi-même — je le transmets à cet agent et rapporte le résultat à Julien.

## Périmètre délégué à l'agent JS-Innov.IA
- Site jsinnovia.com (code, déploiement, SEO, pages)
- Application QR code (repo GitHub qr-by-js-innov.ia, Railway)
- Toute tâche technique ou de contenu liée à JS-Innov.IA

## API de l'agent JS-Innov.IA
- Base URL : https://app.base44.com/api/agents/6a1845e17cc526d1e44965bc
- Conversation ID : 6a1845e44ed513da2ab6d8e4
- Clé API : $JS_INNOV_IA_API_KEY (stockée dans les secrets)

## Comment déléguer
Envoyer le message via curl ou fetch à :
POST https://app.base44.com/api/agents/6a1845e17cc526d1e44965bc/conversations/6a1845e44ed513da2ab6d8e4/messages
Header: api_key: $JS_INNOV_IA_API_KEY
Body: {"role": "user", "content": "... description de la tâche ..."}

## Workflow
1. Julien donne une tâche JS-Innov.IA
2. Je formule un message clair et complet pour l'agent
3. J'envoie via l'API
4. Je rapporte le résultat à Julien
