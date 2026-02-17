#!/usr/bin/env sh
if [ -z "$husky_skip_init" ]; then
  husky_skip_init=1
  debug() {
    [ "$HUSKY_DEBUG" = "1" ] && printf "[husky] %s\n" "$1"
  }
  readonly husky_skip_init
  export husky_skip_init
  debug "initializing husky"
  if [ "$HUSKY" = "0" ]; then
    debug "HUSKY env variable is set to 0, skipping hook"
    exit 0
  fi
  if [ -f ~/.huskyrc ]; then
    debug "sourcing ~/.huskyrc"
    . ~/.huskyrc
  fi
fi
