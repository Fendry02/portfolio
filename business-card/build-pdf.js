/* Generates a Vistaprint-ready PDF from business-card/index.html.
 *
 * Output: business-card/benoit-bruynbroeck-card.pdf
 *   - Page 1 = recto
 *   - Page 2 = verso
 *   - Each page 91 × 61 mm (85 × 55 mm trim + 3 mm bleed)
 *   - Fonts embedded
 *   - Background colors preserved
 *
 * Run with:   node business-card/build-pdf.js
 */

const path = require('path')
const puppeteer = require('puppeteer')

async function main() {
  const htmlPath = path.join(__dirname, 'index.html')
  const outPath = path.join(__dirname, 'benoit-bruynbroeck-card.pdf')

  const browser = await puppeteer.launch({ headless: true })
  try {
    const page = await browser.newPage()
    await page.goto('file://' + htmlPath, { waitUntil: 'networkidle0' })

    // Make sure all webfonts (Inter, Caveat, Instrument Serif) are fully loaded
    // before printing — otherwise glyphs may fall back.
    await page.evaluate(() => document.fonts.ready)

    await page.pdf({
      path: outPath,
      width: '91mm',
      height: '61mm',
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      preferCSSPageSize: true,
    })

    console.log('Generated', path.relative(process.cwd(), outPath))
  } finally {
    await browser.close()
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
