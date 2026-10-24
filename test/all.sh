#!/bin/bash
# -*- coding: utf-8, tab-width: 2 -*-


function testall_cli_init () {
  export LANG{,UAGE}=en_US.UTF-8  # make error messages search engine-friendly
  set -o errexit -o pipefail
  trap 'echo T: "Failed at $BASH_SOURCE line $LINENO: $BASH_COMMAND" >&2' ERR
  local SELFPATH="$(readlink -m -- "$BASH_SOURCE"/..)"
  cd -- "$SELFPATH" || return $?

  ( cd .. && elp )
  nodejs all.mjs
}










testall_cli_init "$@"; exit $?
