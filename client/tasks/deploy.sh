#!/usr/bin/env bash
set -e

# Colors
ESC_SEQ="\x1b["
COL_RESET=$ESC_SEQ"39;49;00m"
COL_RED=$ESC_SEQ"31;01m"
COL_GREEN=$ESC_SEQ"32;01m"
COL_YELLOW=$ESC_SEQ"33;01m"
COL_BLUE=$ESC_SEQ"34;01m"
COL_MAGENTA=$ESC_SEQ"35;01m"
COL_CYAN=$ESC_SEQ"36;01m"

build() {
  echo -e "$COL_GREEN> Building...$COL_RESET"
  REACT_APP_GRAPHQL_API_URL=https://now-todos-server.now.sh/graphql \
  yarn workspace client build
}

deploy() {
  echo -e "$COL_GREEN> Initializing server deploy$COL_RESET"
  now -e NODE_ENV=production \
  -n now-todos-client \
  client/build
}

cleanup() {
  echo -e "$COL_GREEN> Cleaning up build dir$COL_RESET"
  rm -rfv client/build
}

set_deploy_alias() {
  echo -e "$COL_GREEN> Aliasing latest deploy$COL_RESET"
  latest_deploy="$(now ls now-todos-client | tail -n +2 | awk '{print $2}' | head -1)"
  echo -e "$COL_BLUE> Latest deploy: $latest_deploy$COL_RESET"
  now alias set $latest_deploy now-todos-client
}

cleanup
build
deploy
cleanup
set_deploy_alias