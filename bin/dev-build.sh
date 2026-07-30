#!/bin/sh
# Local preview build. Stamps a unique assets_version so the browser can never
# serve a stale css/main.css or assets/js/site.js while iterating on design.
set -e
cd "$(dirname "$0")/.."
export PATH="$HOME/.gem/ruby/2.6.0/bin:$PATH"
printf 'assets_version: "dev-%s"\n' "$(date +%s)" > _config.dev.yml
jekyll build --config _config.yml,_config.dev.yml
