/* Generates two Vistaprint-ready PDFs from business-card/index.html.
 *
 * Output:
 *   business-card/benoit-bruynbroeck-recto.pdf  (page 1 only — recto)
 *   business-card/benoit-bruynbroeck-verso.pdf  (page 2 only — verso)
 *
 * Both at 91 × 61 mm (85 × 55 mm trim + 3 mm bleed each side), fonts
 * embedded, CSS backgrounds preserved. Upload to the matching front/back
 * slot on Vistaprint.
 *
 * Run with:   npm run build:card
 */

const path = require('path')
const puppeteer = require('puppeteer')

async function main() {
  const htmlPath = path.join(__dirname, 'index.html')
  const rectoPath = path.join(__dirname, 'benoit-bruynbroeck-recto.pdf')
  const versoPath = path.join(__dirname, 'benoit-bruynbroeck-verso.pdf')

  const browser = await puppeteer.launch({ headless: true })
  try {
    const page = await browser.newPage()
    await page.goto('file://' + htmlPath, { waitUntil: 'networkidle0' })

    // Make sure all webfonts are fully loaded before printing.
    await page.evaluate(() => document.fonts.ready)

    const baseOpts = {
      width: '91mm',
      height: '61mm',
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      preferCSSPageSize: true,
    }

    await page.pdf({ ...baseOpts, path: rectoPath, pageRanges: '1' })
    await page.pdf({ ...baseOpts, path: versoPath, pageRanges: '2' })

    console.log('Generated', path.relative(process.cwd(), rectoPath))
    console.log('Generated', path.relative(process.cwd(), versoPath))
  } finally {
    await browser.close()
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
