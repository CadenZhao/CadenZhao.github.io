# Xiangjie Zhao — Academic Website

Personal academic website for Xiangjie Zhao, a postdoctoral researcher at UNC
Chapel Hill working in perturbation genomics, single-cell and spatial
multi-omics, and cardiovascular biology.

Live at <https://cadenzhao.github.io>.

## Updating content

Content is data, not markup. To add a paper, a news item, or a resource, edit
the matching file in `_data/` — the pages rebuild themselves around it.

```
_data/publications.yml   peer-reviewed work  (selected: true → also on home page)
_data/news.yml           updates, newest first
_data/resources.yml      atlases, databases, pipelines (featured: true → home page)
_data/research.yml       the three research themes
_data/cv.yml             CV sections and entries
_data/archive.yml        earlier projects and talks
_data/methods.yml        the technique ticker under the hero
_config.yml              name, role, navigation, social links
```

## Structure

```
_layouts/default.html    shell: ambience, masthead, main, footer
_includes/               head, header, footer, page hero, inline SVG diagrams
css/main.scss            the whole design system (tokens first, then components)
assets/js/site.js        theme, navigation, scroll choreography, hero field
assets/fonts/            self-hosted Inter, Instrument Serif, JetBrains Mono
assets/images/           photographs and scientific figures
```

## Local preview

Requires Jekyll 3.9 — the version GitHub Pages runs.

```bash
./bin/dev-build.sh
```

Then serve the generated `_site/` directory:

```bash
python3 -m http.server 4321 --directory _site
```

Bump `assets_version` in `_config.yml` whenever `css/main.scss` or
`assets/js/site.js` changes; it is the cache-buster for the deployed site.

## Design

Dark-first, with a fully designed light theme; the toggle remembers your choice
and otherwise follows the system preference. Self-hosted fonts, no framework, no
trackers, no external requests. The accent palette is lifted from the
postnatal-stage colours of the cardiac snATAC atlas. Motion respects
`prefers-reduced-motion`, and every page stays readable with JavaScript
disabled.

When a downloadable academic CV is ready, add the PDF to `files/` and link it
from `cv.md`.
