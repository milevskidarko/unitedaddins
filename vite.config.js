import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { PAGES, LANGS, SITE, localize } from './src/seo.js'

const escape = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

// After the build, write one HTML file per page and language (dist/foxit/index.html,
// dist/de/foxit/index.html, ...) with that page's title, description, canonical and
// hreflang tags — so Google and link previews (LinkedIn, WhatsApp...) get the right
// text for every URL without running JavaScript. Also regenerates sitemap.xml.
function prerenderMeta() {
  let outDir = 'dist'
  return {
    name: 'prerender-meta',
    apply: 'build',
    configResolved(c) {
      outDir = path.resolve(c.root, c.build.outDir)
    },
    closeBundle() {
      const template = fs.readFileSync(path.join(outDir, 'index.html'), 'utf8')
      const urls = []
      for (const page of Object.values(PAGES)) {
        for (const lang of LANGS) {
          const meta = page[lang]
          const route = localize(page.path, lang)
          const url = SITE + route
          urls.push({ url, alternates: LANGS.map((l) => [l, SITE + localize(page.path, l)]) })
          let html = template
            .replace(/<html lang="[^"]*"/, `<html lang="${lang}"`)
            .replace(/<title>[^<]*<\/title>/, `<title>${escape(meta.title)}</title>`)
            .replace(/(<meta name="description" content=")[^"]*"/, `$1${escape(meta.description)}"`)
            .replace(/(<link rel="canonical" href=")[^"]*"/, `$1${url}"`)
            .replace(/(<meta property="og:url" content=")[^"]*"/, `$1${url}"`)
            .replace(/(<meta property="og:title" content=")[^"]*"/, `$1${escape(meta.title)}"`)
            .replace(/(<meta property="og:description" content=")[^"]*"/, `$1${escape(meta.description)}"`)
            .replace(/(<meta property="og:locale" content=")[^"]*"/, `$1${lang === 'de' ? 'de_DE' : 'en_US'}"`)
          for (const l of LANGS) {
            html = html.replace(
              new RegExp(`(<link rel="alternate" hreflang="${l}" href=")[^"]*"`),
              `$1${SITE + localize(page.path, l)}"`
            )
          }
          html = html.replace(/(<link rel="alternate" hreflang="x-default" href=")[^"]*"/, `$1${SITE + page.path}"`)
          const file = route === '/' ? path.join(outDir, 'index.html') : path.join(outDir, route.slice(1), 'index.html')
          fs.mkdirSync(path.dirname(file), { recursive: true })
          fs.writeFileSync(file, html)
        }
      }
      const sitemap =
        '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
        urls
          .map(
            (u) =>
              `  <url>\n    <loc>${u.url}</loc>\n` +
              u.alternates.map(([l, href]) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${href}" />\n`).join('') +
              '  </url>'
          )
          .join('\n') +
        '\n</urlset>\n'
      fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap)
    },
  }
}

export default defineConfig({
  plugins: [react(), prerenderMeta()],
})
