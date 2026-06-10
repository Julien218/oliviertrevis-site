# Règle Supabase — Maintien des projets actifs

## Problème
Les projets Supabase gratuits (Free plan) se mettent automatiquement en PAUSE après 7 jours d'inactivité.
Cela provoque des erreurs 502 sur les sites (oliviertrevis.be, fashionistartdour.be, etc.)

## Règle obligatoire
Je dois exécuter un ping automatique sur tous les projets Supabase actifs toutes les 3 jours pour les empêcher de passer en INACTIVE.

## Projets à maintenir actifs
- Agent Agent IA : gfjpryakxzdzwnazlsfz.supabase.co
- oliviertrevis : mnfashlakkoonjlkhani.supabase.co (à recréer)
- fashionistartdour : à créer
- synergiedour : à créer

## Commande de ping (à exécuter pour chaque projet)
GET https://{ref}.supabase.co/rest/v1/ avec header apikey

## Automation associée
ID à créer : "supabase-keepalive" — toutes les 3 jours à 08h00
Si un projet répond avec autre chose que HTTP 200 → alerter Julien immédiatement via WhatsApp.

## Clé anon oliviertrevis (supabase.js)
URL: https://mnfashlakkoonjlkhani.supabase.co
ANON KEY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1uZmFzaGxha2tvb25qbGtoYW5pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5OTM4ODMsImV4cCI6MjA4NjU2OTg4M30.yQcd9au2txkhCMRFm97EbBoc8Qhjjk_H9EdvaQ7UuiY
