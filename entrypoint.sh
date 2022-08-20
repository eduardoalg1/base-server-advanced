#!/bin/sh

case $1 in
  dev)
    echo "Dev Mode"
    yarn dev
    ;;
  prod)
    echo "Prod Mode"
    yarn start
    ;;
  *)
    exec "$@"
    ;;
esac