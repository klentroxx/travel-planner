#!/usr/bin/env bash
umask 002

echo "Running Node.js in '${DOCKERAPP_ENV}' environment with '${@}' command(s).."

#
export NODE_ENV="${DOCKERAPP_ENV}"

### Create portable environment for crontabs and other separate bash instances
printenv | grep -E '^(DOCKERAPP_|NODE_=)\/n' | sed -e 's/^/export /' > /.env-dockerapp

#read environment variables
source /.env-dockerapp
npm install && npm run "$@"
