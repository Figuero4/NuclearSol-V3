# INS — Design System & Navbar

Foundation layer for the International Nuclear Solutions site. No framework, no
build step. `build.py` only flattens everything into one file for preview.

## Deploying this site

This is a pure static site — no build step, no server, no dependencies. Any
static host works:

- **Drag-and-drop hosts** (Netlify, Vercel, Cloudflare Pages): drop the whole
  `ins-site` folder (or a zip of it) onto the dashboard. Done.
- **GitHub Pages**: push this folder to a repo, enable Pages on the `main`
  branch, root folder.
- **Traditional hosting / cPanel**: upload the contents of `ins-site/`
  (everything *inside* the folder, not the folder itself) to `public_html/`
  via FTP or the file manager.
- **`index.html` must stay at the site root** relative to the `assets/`
  folder — the CSS/JS links are relative paths (`assets/css/...`), so as long
  as `index.html` and `assets/` are copied together into the same directory,
  it works unmodified at any path or domain.

`build.py` and this README are project documentation, not part of the live
site — they don't need to be uploaded, though leaving them won't break
anything either.

Before going live:
- Swap the placeholder SVG scenes for real photography (see the `<!-- MEDIA
  SLOT -->` comment in the Hero, and the `.solution__media` / `.tech-module__media`
  containers elsewhere) — every image container already has `object-fit` and
  `aspect-ratio` set, so this is a drop-in swap with no CSS changes needed.
- Replace the placeholder form endpoint in `index.html`
  (`action="https://formspree.io/f/YOUR_FORM_ID"`) with a real one — see the
  header comment in `assets/js/contact.js` for exactly what changes.
- Point `/careers`, `/legal`, `/privacy` and the various `/services/...`,
  `/technology/...`, `/projects/...` links at real pages once they exist.


```
index.html                     page shell + navbar markup
assets/css/design-system.css   tokens, glass, buttons, media, motion
assets/css/navbar.css          navbar component
assets/js/i18n.js              EN/ES engine
assets/js/navbar.js            scroll progress, mobile panel, a11y
build.py                       → ../ins-preview.html (self-contained)
```

## Rules for every section that follows

1. **Never hardcode a value that exists as a token.** Use `var(--space-8)`, not
   `40px`. If a new value is genuinely needed, add a token.
2. **Glass comes from `.glass-card` / `.glass-card--sm`.** Don't re-declare
   `backdrop-filter` locally.
3. **Radii carry hierarchy:** 28px primary cards, 20px secondary, 14–16px
   controls. Same radius everywhere flattens the hierarchy.
4. **The accent is rationed.** CTA, focus rings, active indicators, hairlines.
   Never body text, never large fills.
5. **Section wrapper:** `<section class="section"><div class="container">`.
   Keeps every section aligned to the same 1360px grid.

## Motion

| Token             | Duration    | Use                          |
| ----------------- | ----------- | ---------------------------- |
| `--dur-micro`     | 150ms       | hover, press                 |
| `--dur-ui`        | 300ms       | menus, state changes         |
| `--dur-reveal`    | 620ms       | section reveals              |
| `--dur-cinematic` | 1000ms      | hero / full-viewport moments |

Easing is `--ease` (`cubic-bezier(.22,1,.36,1)`) unless there's a reason.
Only `opacity`, `transform`, `filter` and `clip-path` are animated — never
layout properties. `prefers-reduced-motion` is handled globally in
design-system.css; components only override their own stagger delays.

Scroll reveals: add `.reveal` and set `--reveal-delay` for stagger. The
IntersectionObserver that adds `.is-visible` ships with the first content
section.

## i18n

Mark text with `data-i18n="key"`; the engine swaps `textContent`, `aria-label`
(`data-i18n-aria`), `placeholder`, `title` and the document title/description.
Preference persists in `localStorage` under `ins-lang`; first visit falls back
to browser language.

Adding keys from another file, so `i18n.js` stays owned by the foundation:

```js
INS_I18N.extend({
  en: { "services.title": "Services" },
  es: { "services.title": "Servicios" }
});
```

Listen for `document.addEventListener("ins:langchange", …)` if a component
needs to re-render on language change (counters, charts, date formats).

## Navbar

The capsule is driven by `--p`, a 0→1 value `navbar.js` writes on scroll over
the first 120px. Background opacity, blur radius, padding and top offset all
interpolate from it, so the transition tracks the scroll instead of snapping at
a threshold. To change the distance, edit `THRESHOLD` in `navbar.js`.

Breakpoint for the mobile panel is 1024px, declared in both `navbar.css`
(`max-width: 1023px`) and `navbar.js` (`DESKTOP` media query). Change both.

Accessibility built in: skip link, `aria-expanded` / `aria-controls`, Esc to
close, focus trap inside the panel, focus returned to the trigger on close,
scroll lock with scrollbar compensation, visible focus rings on every control.
