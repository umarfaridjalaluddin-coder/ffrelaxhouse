# FF Relaxhouse website

Public information website for **FF Relaxhouse**, a homestay at Mirai Residence Kajang 2,
Kajang, Selangor, Malaysia. It tells prospective guests what the stay offers, the check-in
and check-out times, the security deposit, the house rules and how to contact the host.

The site does not take bookings or payments.

## Technology

Plain HTML5, CSS3 and vanilla JavaScript. No framework, no build step, no server, no
database. It runs as-is on GitHub Pages.

## File structure

```
ffrelaxhouse/
├── index.html            Home page (all main sections)
├── privacy.html          Privacy page
├── terms.html            Terms and house rules
├── 404.html              Not-found page
├── assets/
│   ├── css/styles.css    All styling (colours are variables at the top)
│   ├── js/config.js      Contact details, links, photos, languages  <- edit this
│   ├── js/main.js        Menu, links, photos, language switching
│   ├── i18n/ms.json      Bahasa Malaysia text (starter, not yet enabled)
│   └── images/           Photos and favicon (see images/README.md)
├── robots.txt
├── sitemap.xml
├── .nojekyll             Tells GitHub Pages to serve files as-is
└── .gitignore
```

## Local preview

```
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Updating the site

Edit files, then:

```
git add -A
git commit -m "Describe the change"
git push
```

GitHub Pages redeploys automatically after each push to `main` (usually within a minute or two).

### Contact details and links

Edit `assets/js/config.js`:

- `email` updates every email link on the site. The HTML also contains the address as a
  fallback for visitors without JavaScript and in the structured data in `index.html`, so
  when changing it for good, also search and replace `ffrelaxhouse@gmail.com` across the project.
- `whatsapp`, `bookingUrl`, `instagramUrl`, `facebookUrl` are empty by default, which keeps
  those buttons hidden. Fill one in and its button appears in the Contact section.

### Photos

1. Add photos to `assets/images/` using the filenames in `assets/images/README.md`.
2. List each filename in `photos` in `assets/js/config.js`, e.g. `photos: ["hero.jpg", "bedroom.jpg"]`.

Anything not listed shows a neutral placeholder, so the site always renders correctly.
Use only genuine photos of the property, and check them for private details first.

### Business information

Times, charges, deposit amounts, facilities and rules are written directly in
`index.html` and `terms.html`. If a fact changes, update it in both files
(the FAQ in `index.html` repeats several of them).

### Adding Bahasa Malaysia

Text elements carry a `data-i18n="key"` attribute. English stays in the HTML.

1. Add `data-i18n` keys to any further elements you want translated.
2. Add the matching keys and translations to `assets/i18n/ms.json`.
3. In `assets/js/config.js` set `languages: ["en", "ms"]`. A language switch then appears in the menu.

Currently only the navigation, hero headline and hero text carry keys.

## Deployment (GitHub Pages)

Repository **Settings → Pages → Build and deployment → Deploy from a branch → `main` / `(root)`**.

Expected address: `https://umarfaridjalaluddin-coder.github.io/ffrelaxhouse/`

## Custom domain (later)

Do this only after the domain is registered.

1. Add the domain under **Settings → Pages → Custom domain**. GitHub creates a `CNAME` file in the repository.
2. Create the DNS records listed in GitHub's current documentation:
   <https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site>
3. When DNS has propagated, tick **Enforce HTTPS**.
4. Replace `https://umarfaridjalaluddin-coder.github.io/ffrelaxhouse/` with the new address in
   `index.html`, `privacy.html`, `terms.html`, `robots.txt` and `sitemap.xml`.

GitHub Pages does not provide email. A domain email address needs a separate service.

## What must never go in this repository

This repository is public. Do not commit passwords, tokens, bank details, guest names or
identification, reservation numbers, registration form links or responses, the unit number,
parking bay details, access-card or lock information, or any other building access instructions.
