#!/usr/bin/env bash
umask 002

echo "Running Node.js in '${DOCKERAPP_ENV}' environment with '${@}' command(s).."

#
export NODE_ENV="${DOCKERAPP_ENV:-development}"

npm install && npm run "$@" || exit 1
