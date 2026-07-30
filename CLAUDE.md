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
