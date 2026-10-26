# portfolio

a directory of the things i build, in the style of personalsit.es. plain html and css, no build step.

## files

- `index.html` — the page and its content
- `certifications.html` — the certificate page linked from the main page
- `app.js` — the list of projects (the `sites` array) and the card markup
- `motion.js` — the typed name and the fade-in
- `no-js.css` — reveals the page when javascript is off
- `styles.css` — all the styling
- `assets/` — screenshots, certificates, the lecture photo, the favicon, and the Playfair Display font with its license
- `serve.py` — local server that sends the same security headers as `_headers`
- `_headers` — the security headers to apply when this is hosted (cloudflare pages, netlify)

## run it

```bash
python3 serve.py          # http://localhost:4321
python3 serve.py 8080     # or any other port
```

## adding a project

add an object to the `sites` array in `app.js`, then drop the screenshot in `assets/`:

```js
{
  name: "thing",
  url: "https://github.com/RajdeepSaiPutta/thing",
  shown: "github.com/RajdeepSaiPutta/thing",
  shot: "assets/thing.png",
  access: "public",        // or "private", that is the label on the card
  desc: "one line about it.",
  tags: ["python", "ai"],
}
```

the cards render in the order they appear in that array, so the top of the list is the first item.

## security

the page has no forms, no cookies, no third party scripts and no analytics. the csp allows only
its own html, css, js, fonts and images. `python3 serve.py` sends the same headers locally that
`_headers` sets on a host, so a scan here matches what a scan of the deployed site would say.

## deploy

cloudflare pages: no framework preset, no build command, output directory `/`. the `_headers` file is applied automatically.
