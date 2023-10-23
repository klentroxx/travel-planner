#!/usr/bin/env bash
umask 002

echo "Running database image in '${DOCKERAPP_ENV}' environment.."

( [ "${1#-}" != "$1" -o "$1" = "mysqld" ] ) && echo "Starting MySQL server..accepting connections"
exec docker-entrypoint.sh "$@"
