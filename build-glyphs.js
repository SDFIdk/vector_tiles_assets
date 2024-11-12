import fontnik from 'fontnik'
import { queue } from 'd3-queue'
import os from 'os'
import { existsSync, writeFileSync, readdirSync, readFileSync, mkdirSync } from 'node:fs'

const fontDir = 'fonts'
const outDir = 'glyphs'
const licenseFileNames = ['OFL.txt' || 'LICENSE']

function writeGlyphs(opts, done) {
  fontnik.range(opts, (err, zdata) => {
    if (err) {
        console.warn(err.toString())
        process.exit(1)
    }
    writeFileSync(`${opts.outDir}/${opts.start}-${opts.end}.pbf`, zdata)
    done()
  })
}

if (!existsSync(outDir)) {
  console.warn('Error: Directory %s does not exist', outDir)
  process.exit(1)
}

const q = queue(Math.max(4, os.cpus().length))

const topFolders = readdirSync(fontDir)
for(const topFolder of topFolders) {
  const fonts = readdirSync(`${fontDir}/${topFolder}/`)
  const license = fonts.find(font => licenseFileNames.includes(font))
  const licenseBuffer = readFileSync(`${fontDir}/${topFolder}/${license}`)
  for(const font of fonts) {
    if (font.match(/[^.]+$/)[0] === 'ttf') {
      const fontBuffer = readFileSync(`${fontDir}/${topFolder}/${font}`)
      fontnik.load(fontBuffer, (err, faces) => {
        const filePath = `${outDir}/${faces[0].family_name} ${faces[0].style_name}`
        if (!existsSync(filePath)){
          mkdirSync(filePath, { recursive: true })
        }
        writeFileSync(`${filePath}/LICENSE`, licenseBuffer)
        for (let i = 0; i < 65536; (i = i + 256)) {
          q.defer(writeGlyphs, {
            outDir: filePath,
            font: fontBuffer,
            start: i,
            end: Math.min(i + 255, 65535)
          })
        }
      })
    }
  }
}
