# Wyte Studio — clean website folder

This is the simplified VS Code version of the current Wyte Studio website. The old Bootstrap template files, unused page copies, legacy PHP file, Mac metadata, and embedded Git repository were removed because the current `index.html` does not depend on them.

## Folder structure

```text
index.html              Page content, sections, navigation, text and case studies
css/style.css           Colors, typography, spacing, layout, responsive breakpoints and visual effects
js/main.js              Mobile menu, service accordion, scroll reveals, testimonials and case-study modal
assets/images/logo1.png Uploaded Wyte Studio logo used by the header and footer
CNAME                   Custom domain declaration for wytestudio.com
```

## How to edit in VS Code

Open this folder in VS Code and use a local preview extension such as Live Server, or open `index.html` directly in a browser.

To change the page text, section content, navigation labels, service names, case studies, testimonials, or contact details, edit `index.html`.

To change the main brand colors, edit the variables near the top of `css/style.css`. The most important values are `--ink` for dark sections, `--paper` for light sections, and `--warm` for the Wyte orange accent.

To change spacing, search `padding`, `margin`, `gap`, and `width` in `css/style.css`. The main section spacing is controlled by rules such as `.about`, `.services`, `.work`, `.approach`, `.testimonials`, and `.contact`.

To replace the logo, overwrite `assets/images/logo1.png` with another PNG using the same filename. Header and footer sizing is controlled by `.brand-logo-image` in `css/style.css`.

To change the decorative case-study visuals or add image assets, edit the `.case-visual` blocks in `index.html` and the related `.visual-*` rules in `css/style.css`.

To change interactions, edit `js/main.js`. The file contains the mobile menu, service accordion, scroll reveal, testimonial controls, cursor glow, and case-study modal behavior.

## Important note

The current homepage is intentionally a self-contained single-page site. The old files such as `Services.html`, `Gallery.html`, `about us.html`, and project pages were not copied because the current homepage does not reference them. When you provide those pages for redesign, they can be added back using the same design system in `css/style.css`.
