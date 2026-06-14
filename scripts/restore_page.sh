#!/bin/bash
# ============================================
# SCRIPT DE RESTAURATION D'URGENCE — JS-Innov.IA
# Usage: ./scripts/restore_page.sh <tag>
# Ex:    ./scripts/restore_page.sh v-fashionistart-stable
# ============================================

TAG=${1:-"v-site-global-stable"}

echo "🔄 Restauration depuis le tag : $TAG"
echo ""

# Lister les pages disponibles dans ce tag
echo "Pages disponibles dans $TAG :"
git show $TAG --name-only | grep -E "\.(jsx|html|conf)$" | grep -E "public/|src/pages/|nginx" | head -20

echo ""
read -p "Restaurer TOUTES les pages de ce tag ? (oui/non) : " CONFIRM

if [ "$CONFIRM" = "oui" ]; then
  git checkout $TAG -- public/unesco.html public/jytrixai.html public/mascotte.html
  git checkout $TAG -- src/pages/ nginx-docker.conf
  echo "✅ Pages restaurées depuis $TAG"
  echo "🚀 Lance 'git add . && git commit -m \"restore: $TAG\" && git push github main' pour redéployer"
else
  echo "Annulé."
fi
