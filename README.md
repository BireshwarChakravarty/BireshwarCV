# Bireshwar Chakravarty — CV site

A single-page CV site in plain HTML, CSS and JS, with no build step.

```
index.html                 the page (styles and script are inline)
assets/
  portrait-640.webp/.jpg   hero + contact photo (responsive; WebP with JPEG fallback)
  portrait-768.webp/.jpg
  portrait-1024.webp/.jpg
  og.jpg                   1200×630 link-preview image (LinkedIn, WhatsApp, X)
  favicon-v2.svg/.ico      browser tab icons (versioned filenames so browsers fetch the new icon)
  favicon-32-v2.png        PNG tab icon (Safari)
  apple-touch-icon-v2.png  home-screen icon
backup/
  index-original-2026-10-12.html   untouched copy of the page before the 2026-10 audit fixes
```

Fonts (Playfair Display, Outfit, Space Mono) are self-hosted in `assets/fonts/`, so the page doesn't depend on Google Fonts and never flashes a fallback font.

## Editing

- **Text:** edit `index.html` directly. The headline numbers (`data-count`) hold their final value in the HTML, and the count-up animation reads that value.
- **Photo:** replace the six `assets/portrait-*` files (640, 768 and 1024px wide, each as WebP and JPEG), keeping the same names and a 2:3 portrait crop.
- **Year:** anything marked `data-year` updates to the current year automatically.
- **Site URL:** the canonical, Open Graph and structured-data URLs assume
  `https://bireshwarchakravarty.github.io/BireshwarCV/`. If the site moves to a custom domain, search-and-replace that URL in `index.html`.

## Restoring the original

```
cp backup/index-original-2026-10-12.html index.html
```

The original is also in git history (commit `1c4e4da`).

## Resume PDF

`assets/Bireshwar_Chakravarty_Resume_2026.pdf` is generated from `resume/resume.html`, styled to match the site.
Edit the HTML, then rebuild with:

```
node resume/build.js
```

The script needs the `playwright` package. It refuses to write the PDF if either page's content runs past the A4 sheet.
