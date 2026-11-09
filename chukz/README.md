# Chukz Tech Services website

A static website (HTML, CSS and vanilla JavaScript). No build step, no backend, no database.
Open `index.html` by double-clicking it, or host the folder on any static host.

## Files

```
index.html  about.html  services.html  expertise.html  projects.html
request-quote.html  contact.html  faq.html  privacy.html  404.html
css/styles.css      all styling (colours are CSS variables at the top)
js/main.js          navigation, tabs, accordion, modal, project data, forms
assets/             logo.svg, favicon.svg, og-image.svg, icons.svg (master icon set)
sitemap.xml  robots.txt
```

Every page contains its own copy of the header, footer and icon set, so each file works on its own.

## Replace before launch (checklist)

1. **Logo**: replace `assets/logo.svg` (keep the file name, or edit the `<img>` tags). Replace `assets/favicon.svg` too.
2. **Social preview image**: export `assets/og-image.svg` as a 1200 x 630 PNG named `assets/og-image.png`. Facebook and WhatsApp previews do not show SVG images.
3. **Domain**: in every file, replace `https://www.example.com` with the real domain (canonical links, Open Graph tags, JSON-LD, `sitemap.xml`, `robots.txt`). Use your editor's find-and-replace across the folder.
4. **Source wording**: copy on About (Who We Are, Mission, Vision, values), Services ("What this typically involves"), Expertise (tab bullets) and Home (Why Choose Us) was written conservatively from the service names. Compare with your own text. These blocks are marked `OWNER: confirm`.
5. **Real projects and photos**: see "Add a project" below. Home page project teaser cards are placeholders too.
6. **Team / founder profile**: `about.html`, search for `Team / founder profile`.
7. **Business hours**: `contact.html`, search for `Business hours`.
8. **Social links**: the footer has a commented block in every page. Uncomment it and add real URLs.
9. **Privacy page**: set the "Last updated" date, add a privacy contact if you have one, and have the page reviewed. Update it if you add analytics or a form service.
10. Search all files for `OWNER` to find every remaining placeholder.

## Where to edit things

- **Text**: open the page's `.html` file in any text editor.
- **Phone, WhatsApp, email**: used in many places. Use find-and-replace across all files for `+2348032377009`, `2348032377009`, `+234 803 237 7009` and `Info@chukstech.com`. Also change the `CONFIG` block at the top of `js/main.js`.
- **Colours and fonts**: the `:root` block at the top of `css/styles.css`. Keep text and background pairs at WCAG AA contrast.
- **Projects**: top of `js/main.js`.

### Add a project

Open `js/main.js`, find `PROJECTS`, and add one object (the schema and a commented example are in the file). Set `placeholder: false`. Delete the placeholder entries when you have enough real ones. The cards, filters and pop-up details update automatically. Put photos in `assets/projects/` and list them in the `photos` field. When no placeholders remain, the "Project case studies are being added" banner disappears.

### Icons

Icons are inlined in each page because browsers block external icon sprites on `file://`. To add or change an icon, edit `assets/icons.svg` and paste the updated `<symbol>` into each page's inline sprite (find-and-replace works).

### Forms

The quote and contact forms show a summary, then the visitor chooses "Send via Email" (opens their mail app), "Send on WhatsApp" or "Copy summary". Nothing is sent automatically. To send submissions to a service such as Formspree or Netlify Forms instead, see the commented instructions in `request-quote.html`.

## Free hosting

**Netlify**: sign in at netlify.com, choose "Add new site", then "Deploy manually", and drag the whole folder in. Your site is live at a `netlify.app` address. Netlify serves `404.html` automatically.

**GitHub Pages**: create a repository, upload the files (the `index.html` must be at the top level), then go to Settings, Pages, choose the main branch and the root folder, and save. Pages serves `404.html` automatically.

**Cloudflare Pages**: choose "Create a project", then "Direct Upload", and upload the folder (or connect the repository with no build command and `/` as the output directory).

### Custom domain

Buy the domain from a registrar, then in your host's dashboard add it as a custom domain (Netlify: Domain management; GitHub Pages: Settings, Pages, Custom domain; Cloudflare Pages: Custom domains). The host shows the DNS records to create at your registrar, usually a CNAME for `www` and either an A/ALIAS record or nameservers for the bare domain. HTTPS is provided free once DNS is connected. Afterwards, update the domain placeholders (checklist item 3).

### 404 page

Because paths are relative (so the site works from `file://`), a 404 shown at a deep URL such as `/a/b/` may appear without styles. This only affects mistyped nested addresses. If it bothers you, add `<base href="/">` to `404.html` only, when the site lives at the root of its domain.

## Notes

- Cisco, HP and Dell are trademarks of their respective owners. They are mentioned only to describe equipment the company works with. Do not add their logos.
- External requests: Google Fonts (Inter, Sora) and, on the Contact page, a Google Maps embed. Nothing else.
- Tested in Chromium opened from `file://`: no JavaScript errors, no horizontal scrolling at 360px, and the quote wizard, tabs, accordion, project pop-up and mobile menu all worked.
