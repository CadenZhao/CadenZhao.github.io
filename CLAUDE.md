# Xiangjie Zhao — academic website

Personal academic site for Xiangjie Zhao (postdoc, Pathology & Laboratory Medicine,
UNC Chapel Hill). Jekyll, deployed by GitHub Pages from the `gh-pages` branch of
`CadenZhao/CadenZhao.github.io`, served at <https://cadenzhao.github.io>.

## The one rule that matters

**Content lives in `_data/*.yml`. Templates live in `*.md` and `_includes/`.**
Adding a paper, a news item, a resource, or a CV line is a YAML edit — never an
HTML edit. If you find yourself pasting a `<article>` block into a page to add
content, you are doing it wrong; add a row to the data file instead.

| To add / change | Edit |
| --- | --- |
| A publication | `_data/publications.yml` (`selected: true` also puts it on the home page) |
| A news item | `_data/news.yml` (newest first) |
| An atlas, database, pipeline | `_data/resources.yml` (`featured: true` also puts it on the home page) |
| A research theme | `_data/research.yml` |
| CV sections and entries | `_data/cv.yml` |
| Earlier projects / talks | `_data/archive.yml` |
| The technique ticker under the hero | `_data/methods.yml` |
| Name, role, nav, social links | `_config.yml` |

## What may go on the site

Unpublished work stays off the site until the corresponding paper is out. That
covers experimental schematics, method figures, named in-progress projects, and
any unreleased data — not just text. Field-level positioning is fine, and so is
anything already public through a released resource or a published paper.

When in doubt, ask before adding; a figure is far easier to keep back than to
un-publish. Note that this repository is public, so deleting a file only removes
it from the current tree — the blob stays in git history unless the history is
rewritten and GitHub is asked to garbage-collect it.

## Local preview

Jekyll 3.9 is installed under `~/.gem/ruby/2.6.0` (system Ruby 2.6 — Jekyll 4
will not install there). Build with:

```bash
./bin/dev-build.sh
```

That stamps a unique `assets_version` into `_config.dev.yml` so the browser can
never serve a stale `main.css` / `site.js`, then writes `_site/`. Serve it with
any static server; `.claude/launch.json` points the preview pane at
`python3 -m http.server 4321 --directory _site`.

For a production-fidelity build (no dev stamp): `jekyll build`.

Two gotchas worth remembering:

- **Bump `assets_version` in `_config.yml` whenever `css/main.scss` or
  `assets/js/site.js` changes.** It is the cache-buster for the deployed site.
- Chrome caches the *HTML* too. When previewing a template change, navigate to
  `…/page/index.html?cb=N` with a fresh `N`, not the pretty URL.

## Design system

Dark-first. Both themes are first-class; the toggle writes `localStorage.theme`
and `<html data-theme>`, with the system preference as the default.

All design decisions are expressed as custom properties at the top of
`css/main.scss` — colours, type scale, spacing, easing. Change tokens, not
individual rules. The accent pair (`--spring` green, `--violet`) is taken from
the postnatal-stage legend of the cardiac snATAC UMAP, with `--ember` reserved
for "something is happening" states.

`css/main.scss` is compiled by **Ruby Sass 3.7**, which is old:

- Do not use `min()` / `max()` in CSS — Sass intercepts them. `clamp()` is fine.
- Do not use `@use`, `@layer`, or modern Sass module syntax.
- Keep custom-property values simple; complex nested functions can be mangled.

Figures with white backgrounds sit in `.plate` (a light "paper" card). Figures
that are natively dark, like the cell-segmentation image, use `.plate-dark`.
Conceptual diagrams are **inline SVG** in `_includes/visuals/` so they inherit
theme variables — never a dark-baked `<img>`.

## Performance constraints

GitHub Pages serves everything with `Cache-Control: max-age=600` and that cannot
be changed, so a visitor coming back after ten minutes re-downloads the CSS,
the fonts, and every image on the page. Payload discipline therefore matters
more here than on a host where you control caching:

- **Compress images before committing them.** Photographs → JPEG quality 80,
  progressive, sized to roughly 2× their largest CSS display size. Flat
  scientific figures (BioRender panels, scatter plots) → PNG quantised to 256
  colours, which has been visually lossless for the current set and cuts them
  by ~70%.
- Keep the font count down. The four faces in `assets/fonts/` are all in use;
  `jetbrains-mono.woff2` serves both weight 400 and 500 from one file.
- **Keep the compositing budget low, especially for iOS Safari.** Navigation on
  a phone was taking two to three seconds, and the cause was the ambience
  stack: two full-viewport `filter: blur(90px)` layers on an infinite
  animation, a `mix-blend-mode: overlay` grain layer over the whole viewport,
  and a sticky header with `backdrop-filter`. WebKit has to rasterise all of
  that before it can present the first frame — on every page load. The rules
  that came out of it:
  - Never put `filter: blur()` on a radial gradient. The gradient is already
    soft; the filter only adds a per-frame re-rasterisation.
  - `mix-blend-mode` and `backdrop-filter` are desktop-only refinements here,
    gated behind `@media (min-width: 900px)`. Phones get opaque surfaces.
  - Animate `transform` and `opacity` only.
- `@view-transition { navigation: auto }` was removed too, but note it was *not*
  the cause of the slow navigation — that was a wrong guess, corrected by the
  fact that removing it changed nothing. It is simply not worth re-adding.

## The hero field

`assets/js/site.js` draws a synthetic single-cell embedding behind the home-page
hero: seeded Gaussian clusters, short-range neighbourhood edges, and
perturbation waves that displace and re-colour the cells they pass through
(auto-firing every ~5.4 s, plus pointer proximity and click).

It is deliberately defensive: it repaints synchronously inside `resize()`,
watches the hero with a `ResizeObserver`, and falls back to window dimensions,
because a hero measured at zero (background tab, prerender, bfcache) would
otherwise leave the canvas permanently blank. `prefers-reduced-motion` freezes
the simulation rather than hiding it.

## Verification note

The in-app preview browser runs its tab permanently hidden: `requestAnimationFrame`
never fires and `innerWidth` reports 0, so the canvas cannot be judged there.
Use the real-Chrome tools for anything involving the hero field or motion.
Screenshots also catch scroll reveals mid-transition — inject
`[data-reveal]{opacity:1!important;transform:none!important;transition:none!important}`
before capturing.
