#!/usr/bin/env node

const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const publicDir = path.join(__dirname, '..', 'public')

const responsiveSizes = [
  { width: 640, suffix: '-sm' },
  { width: 768, suffix: '-md' },
  { width: 1024, suffix: '-lg' },
  { width: 1280, suffix: '-xl' },
  { width: 1920, suffix: '-2xl' },
]

const generateResponsiveImages = async (inputPath) => {
  const dir = path.dirname(inputPath)
  const ext = path.extname(inputPath)
  const basename = path.basename(inputPath, ext)

  console.log(
    `\n🔄 Génération des images responsives pour ${basename}${ext}...`,
  )

  for (const size of responsiveSizes) {
    const outputPath = path.join(dir, `${basename}${size.suffix}${ext}`)

    if (fs.existsSync(outputPath)) {
      console.log(`⏭️  ${path.basename(outputPath)} existe déjà`)
      continue
    }

    try {
      await sharp(inputPath)
        .resize(size.width, null, {
          withoutEnlargement: true,
          fit: 'inside',
        })
        .webp({
          quality: 85,
          effort: 6,
        })
        .toFile(outputPath)

      const originalSize = fs.statSync(inputPath).size
      const newSize = fs.statSync(outputPath).size
      const reduction = (
        ((originalSize - newSize) / originalSize) *
        100
      ).toFixed(1)

      console.log(
        `✅ ${path.basename(outputPath)} (${size.width}px) - ${reduction}% de réduction`,
      )
    } catch (error) {
      console.error(
        `❌ Erreur lors de la génération de ${outputPath}:`,
        error.message,
      )
    }
  }
}

const processDirectory = async (dir) => {
  const items = fs.readdirSync(dir)

  for (const item of items) {
    const fullPath = path.join(dir, item)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      await processDirectory(fullPath)
    } else if (
      item.toLowerCase().endsWith('.webp') &&
      !item.includes('-sm') &&
      !item.includes('-md') &&
      !item.includes('-lg') &&
      !item.includes('-xl') &&
      !item.includes('-2xl')
    ) {
      await generateResponsiveImages(fullPath)
    }
  }
}

const main = async () => {
  console.log('🚀 Génération des images responsives...\n')

  try {
    await processDirectory(publicDir)
    console.log('\n✨ Génération des images responsives terminée !')
    console.log('\n📝 Utilisation dans vos composants :')
    console.log(
      'Vous pouvez maintenant utiliser les images responsives avec srcSet :',
    )
    console.log(
      'const srcSet = `/images/photo-sm.webp 640w, /images/photo-md.webp 768w, /images/photo-lg.webp 1024w`;',
    )
  } catch (error) {
    console.error('❌ Erreur lors de la génération:', error)
    process.exit(1)
  }
}

main()
