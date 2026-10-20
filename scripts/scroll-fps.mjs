// Scrolls each page from top to bottom and reports its frame times.
//
//   npm run build && npm start
//   PERF_BASE_URL=http://localhost:3000 npm run perf:scroll
//
// The wheel events are dispatched inside the page, so they go through Lenis
// and nothing waits on DevTools round trips (driving the wheel over CDP
// delays frames and reports drops the site does not have). Each page runs at
// desktop and phone width, at normal speed and with the CPU slowed 4×.
// Set CHROME_PATH to use a Chrome other than Puppeteer's own.
import puppeteer from 'puppeteer'

const baseUrl = (process.env.PERF_BASE_URL ?? 'http://localhost:3000').replace(
  /\/$/,
  '',
)
const pages = [
  '/',
  '/services',
  '/services/creation-site-web-lyon',
  '/services/automatisation-n8n-lyon',
  '/services/formation-ia-lyon',
  '/services/application-web-sur-mesure-lyon',
  '/realisations',
  '/realisations/electreau-lyon',
  '/blog',
  '/blog/prix-site-vitrine-lyon',
  '/jobs',
]
const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'phone', width: 390, height: 844 },
]
const cpuRates = [1, 4]
// A frame over 25 ms means at least one missed vsync at 60 Hz.
const slowFrameMs = 25

const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH,
  headless: true,
})
let failures = 0

for (const viewport of viewports) {
  for (const rate of cpuRates) {
    console.log(`\n${viewport.name} ${viewport.width}px · CPU ×${rate}`)

    for (const path of pages) {
      const page = await browser.newPage()
      await page.setViewport(viewport)
      const session = await page.createCDPSession()
      await session.send('Emulation.setCPUThrottlingRate', { rate })
      await page.goto(baseUrl + path, { waitUntil: 'networkidle0' })
      await new Promise((resolve) => setTimeout(resolve, 800))

      const result = await page.evaluate(scrollToBottom)
      await page.close()

      const sorted = [...result.frames].sort((a, b) => a - b)
      const average =
        result.frames.reduce((sum, frame) => sum + frame, 0) /
        result.frames.length
      const slow = result.frames.filter((frame) => frame > slowFrameMs).length
      const slowShare = slow / result.frames.length

      // Up to 2% slow frames passes: one-off hitches are not jank.
      if (slowShare > 0.02 || result.longTasks > 0) failures += 1

      console.log(
        `${slowShare > 0.02 ? 'SLOW' : 'OK  '} ${path.padEnd(42)} ${Math.round(
          1000 / average,
        )} fps · p95 ${sorted[Math.floor(sorted.length * 0.95)].toFixed(
          1,
        )} ms · ${slow}/${result.frames.length} frames > ${slowFrameMs} ms · ${
          result.longTasks
        } long tasks`,
      )
    }
  }
}

await browser.close()

if (failures > 0) {
  console.log(`\n${failures} run(s) dropped frames.`)
  process.exit(1)
}

console.log('\nEvery page scrolled at 60 fps.')

async function scrollToBottom() {
  const frames = []
  let longTasks = 0
  let last = performance.now()
  let running = true

  new PerformanceObserver((list) => {
    longTasks += list.getEntries().length
  }).observe({ type: 'longtask' })

  const tick = (time) => {
    frames.push(time - last)
    last = time
    if (running) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)

  const bottom = document.documentElement.scrollHeight - innerHeight
  const start = performance.now()

  await new Promise((resolve) => {
    const id = setInterval(() => {
      window.dispatchEvent(
        new WheelEvent('wheel', {
          deltaY: 60,
          bubbles: true,
          cancelable: true,
        }),
      )
      if (scrollY >= bottom - 2 || performance.now() - start > 15000) {
        clearInterval(id)
        resolve()
      }
    }, 16)
  })
  await new Promise((resolve) => setTimeout(resolve, 800))
  running = false

  return { frames: frames.slice(5), longTasks }
}
