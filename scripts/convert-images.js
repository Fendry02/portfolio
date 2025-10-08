#!/usr/bin/env node

const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const publicDir = path.join(__dirname, '..', 'public')

const convertToWebP = async (inputPath, outputPath) => {
  try {
    await sharp(inputPath)
      .webp({
        quality: 85,
        effort: 6,
      })
      .toFile(outputPath)

    const originalSize = fs.statSync(inputPath).size
    const newSize = fs.statSync(outputPath).size
    const reduction = (((originalSize - newSize) / originalSize) * 100).toFixed(
      1,
    )

    console.log(
      `✅ ${path.basename(inputPath)} → ${path.basename(outputPath)} (${reduction}% de réduction)`,
    )
    return true
  } catch (error) {
    console.error(
      `❌ Erreur lors de la conversion de ${inputPath}:`,
      error.message,
    )
    return false
  }
}

const processDirectory = async (dir) => {
  const items = fs.readdirSync(dir)

  for (const item of items) {
    const fullPath = path.join(dir, item)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      await processDirectory(fullPath)
    } else if (item.toLowerCase().endsWith('.png')) {
      const webpPath = fullPath.replace(/\.png$/i, '.webp')

      if (!fs.existsSync(webpPath)) {
        await convertToWebP(fullPath, webpPath)
      } else {
        console.log(`⏭️  ${path.basename(fullPath)} déjà converti en WebP`)
      }
    }
  }
}

const main = async () => {
  console.log('🚀 Début de la conversion des images PNG vers WebP...\n')

  try {
    await processDirectory(publicDir)
    console.log('\n✨ Conversion terminée !')
    console.log('\n📝 Prochaines étapes :')
    console.log('1. Mettre à jour les imports dans vos composants')
    console.log('2. Tester que tout fonctionne correctement')
    console.log('3. Supprimer les anciens fichiers PNG si souhaité')
  } catch (error) {
    console.error('❌ Erreur lors de la conversion:', error)
    process.exit(1)
  }
}

main()
