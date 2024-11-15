import esbuild from 'esbuild'
import { open, readdir } from 'node:fs/promises'
import { existsSync, mkdirSync } from 'node:fs'

// Variables
const srcDir = 'src/test'
const outDir = 'test'
const styleDir = 'styles'
const frameworks = [
  {
    name: 'ml',
    longName: 'MapLibre',
    projections: ['3857'] // Only create test files for the given projection.
  },
  {
    name: 'ol', // If no projections array, create test files for all projections.
    longName: 'OpenLayers'
  }
]

// Helper functions
async function readHTML(file) {
  let filehandle
  let html = ''
  try {
    filehandle = await open(file, 'r+')
    filehandle.readFile('utf8').then(function(contents) {
      html += contents
    })
  } catch (error) {
    console.error('there was an error:', error.message)
  } finally {
    await filehandle?.close()
    return html
  }
}
async function writeHTML(file, html) {
  let filehandle
  try {
    filehandle = await open(file, 'w')
    filehandle.writeFile(html, 'utf8')
  } catch (error) {
    console.error('there was an error:', error.message)
  } finally {
    await filehandle?.close()
  }
}

// Start building html test files
console.log('---------------------')
console.log('Building test HTML')
if (!existsSync(outDir)){
  mkdirSync(outDir)
}
for(const framework of frameworks) {
  const templateHtml = await readHTML(`${srcDir}/${framework.name}.html`)
  const topFolders = await readdir(styleDir)
  framework.files = []
  for(const topFolder of topFolders) {
    const files = await readdir(`${styleDir}/${topFolder}/`)
    for(const file of files) {
      const fileName = file.slice(0, -5)
      const projection = file.match(/^[^_]+/)[0]
      if (!framework.projections || framework.projections.includes(projection)) {
        try {
          const filePath = `/${styleDir}/${topFolder}//${file}`
          const title = `${framework.name}_${fileName}`
          const dir = `${outDir}/${framework.name}/${topFolder}`
          const content = templateHtml
            .replace('InsertYourStylefileHere', filePath)
            .replace('InsertYourTitleHere', title)
            .replace('InsertYourProjectionHere', projection)
          if (!existsSync(dir)){
            mkdirSync(dir, { recursive: true })
          }
          const testPath = `${dir}/${fileName}.html`
          await writeHTML(testPath, content)
          framework.files.push({ name: fileName, link: testPath })
        } catch (err) {
          console.error(err)
        }
      }
    }
  }
}

// Build test index.html
let templateHtml = await readHTML(`${srcDir}/index.html`)
const regex = RegExp('id="test-files">', 'g')
regex.exec(templateHtml)
let writeIndex = regex.lastIndex
const writeToFile = (content)=> {
  templateHtml = templateHtml.slice(0, writeIndex) + content + templateHtml.slice(writeIndex)
  writeIndex += content.length
}
for(const framework of frameworks) {
  const frameworkSectionStart = `\n<section>\n<h2>${framework.longName}</h2>\n<ul>\n`
  const frameworkSectionEnd = `</ul>\n</section>\n`
  writeToFile(frameworkSectionStart)
  for(const file of framework.files) {
    writeToFile(`<li><a href="/${file.link}">${file.name}</a></li>\n`)
  }
  writeToFile(frameworkSectionEnd)
}
await writeHTML(`${outDir}/index.html`, templateHtml)

// Serve the test pages
console.log('---------------------')
console.log('Running test server')
esbuild.context({
  entryPoints: {
    'style': `${srcDir}/index.css`,
    'ol/main': `${srcDir}/ol.js`,
    'ol/style': `${srcDir}/ol.css`,
    'ml/main': `${srcDir}/ml.js`,
    'ml/style': `${srcDir}/ml.css`,
  },
  outdir: outDir,
  bundle: true,
  splitting: true,
  format: 'esm'
})
.then((result) => {
  result.serve({
    servedir: './',
  }).then(({ host, port }) => {
    console.log('Serving at localhost:' + port)
  })
})