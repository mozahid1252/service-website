// One-off generator: extracts the owner's standalone HTML landing-page
// design (upload/Pasted Content_1785587295929.txt) into the three content
// files consumed by the existing MozIntelligence Package 07 route:
//
//   src/app/meta-ads-performance-audit/landing.css        <- <style> block
//   src/app/meta-ads-performance-audit/landing-body.html  <- <body> markup (sans <script>)
//   src/app/meta-ads-performance-audit/landing-script.js  <- <script> block
//
// The existing page.tsx reads these three files from disk at request time
// and hands them to landing-content.tsx, which injects the HTML via
// dangerouslySetInnerHTML and runs the script via new Function(). So
// swapping these three files is all that's required to replace the landing
// page — no React/component changes needed.
//
// Run: node scripts/gen-meta-ads-landing.mjs

import fs from 'node:fs'
import path from 'node:path'

const SRC = '/home/z/my-project/upload/Pasted Content_1785587295929.txt'
const DEST_DIR = '/home/z/mozint/service-website/src/app/meta-ads-performance-audit'

const raw = fs.readFileSync(SRC, 'utf8')

// --- Extract CSS (between <style> and </style>) ---
const styleOpen = raw.indexOf('<style>')
const styleClose = raw.indexOf('</style>')
if (styleOpen < 0 || styleClose < 0) throw new Error('Could not locate <style> block')
const css = raw.slice(styleOpen + '<style>'.length, styleClose).replace(/^\n+/, '')

// --- Extract body inner HTML (between <body> and </body>) ---
const bodyOpen = raw.indexOf('<body>')
const bodyClose = raw.lastIndexOf('</body>')
if (bodyOpen < 0 || bodyClose < 0) throw new Error('Could not locate <body> block')
let bodyInner = raw.slice(bodyOpen + '<body>'.length, bodyClose)

// --- Extract the <script> block from the body and remove it from the HTML ---
const scriptOpen = bodyInner.indexOf('<script>')
const scriptClose = bodyInner.indexOf('</script>')
let script = ''
if (scriptOpen >= 0 && scriptClose >= 0) {
  script = bodyInner.slice(scriptOpen + '<script>'.length, scriptClose)
  bodyInner =
    bodyInner.slice(0, scriptOpen) +
    bodyInner.slice(scriptClose + '</script>'.length)
  // Tidy trailing blank lines
  bodyInner = bodyInner.replace(/\n[ \t]*\n[ \t]*$/g, '\n')
}

// Tidy leading newline on the body HTML
bodyInner = bodyInner.replace(/^\n+/, '')
script = script.replace(/^\n+/, '').replace(/\s+$/, '')

// --- Write the three files ---
const targets = [
  ['landing.css', css],
  ['landing-body.html', bodyInner],
  ['landing-script.js', script],
]

for (const [name, content] of targets) {
  const fp = path.join(DEST_DIR, name)
  fs.writeFileSync(fp, content, 'utf8')
  console.log(`wrote ${name}  (${content.length} bytes)`)
}
console.log('done.')
