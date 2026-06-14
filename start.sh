#!/bin/sh
# Substituer ${PORT} dans nginx.conf avec la vraie valeur de $PORT
export PORT=${PORT:-8080}
envsubst '${PORT}' < /app/nginx.conf > /tmp/nginx.conf
nginx -c /tmp/nginx.conf -g 'daemon off;'
