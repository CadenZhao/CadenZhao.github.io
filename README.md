# Xiangjie Zhao — Academic Website

Personal academic website for Xiangjie Zhao, a postdoctoral researcher at UNC Chapel Hill working in perturbation genomics, single-cell and spatial multi-omics, and cardiovascular biology.

## Site structure

- `index.md` — homepage and research positioning
- `research.md` — three-theme research program
- `resources.md` — Cardiac snATAC Atlas and HOHC
- `publications.md` — peer-reviewed work
- `cv.md` — verified web CV
- `news.md` — selected research updates
- `contact.md` — collaboration and contact information
- `projects.md` and `talks.md` — legacy content archives
- `_layouts/default.html` — shared navigation, metadata, and footer
- `css/main.scss` — responsive visual system and color themes
- `assets/site.js` — theme and mobile-navigation controls

## Local preview

This is a standard Jekyll site compatible with GitHub Pages.

```sh
jekyll build
jekyll serve
```

The design uses system fonts, has no front-end framework dependency, respects reduced-motion preferences, and supports light and dark color themes.

## Updating content

Primary navigation is configured in `_config.yml`. Add future lab pages—such as People, Join, Mentoring, and Teaching—to the navigation only when substantive content is ready.

When a current downloadable academic CV is ready, add the PDF to `files/` and link it from `cv.md`.
