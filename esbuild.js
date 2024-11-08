import esbuild from 'esbuild'
import { open, readdir, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'

// Variables
const srcDir = 'src/test'
const outDir = 'test'
const styleDir = 'styles'
const frameworks = [
  'ol',
  'ml'
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

// Start building html files
console.log('---------------------')
console.log('Building test HTML')
for(const framework of frameworks) {
  const templateHtml = await readHTML(`${srcDir}/${framework}.html`)
  const topFolders = await readdir(styleDir)
  for(const topFolder of topFolders) {
    const projections = await readdir(`${styleDir}/${topFolder}`)
    for(const projection of projections) {
      const files = await readdir(`${styleDir}/${topFolder}/${projection}`)
      for(const file of files) {
        try {
          const filePath = `/${styleDir}/${topFolder}/${projection}/${file}`
          const title = `${framework}_${projection}_${file}`
          const dir = `${outDir}/${framework}/${topFolder}/${projection}`
          const content = templateHtml
            .replace('InsertYourStylefileHere', filePath)
            .replace('InsertYourTitleHere', title)
            .replace('InsertYourProjectionHere', projection)
          if (!await existsSync(dir)){
            await mkdir(dir, { recursive: true })
          }
          await writeHTML(`${dir}/${file}.html`, content)
        } catch (err) {
          console.error(err)
        }
      }
    }
  }
}

// TODO: copy styles, glyphs and sprites to the test folder.
// Serve the test pages
console.log('---------------------')
console.log('Running test server')
esbuild.context({
  entryPoints: {
    'ol/main': `${srcDir}/ol.js`,
    'ol/style': `${srcDir}/ol.css`,
    'ml/main': `${srcDir}/ml.js`,
    'ml/style': `${srcDir}/ml.css`,
  },
  outdir: outDir,
  bundle: true,
  splitting: true,
  format: 'esm',
  loader: {
    '.json': 'copy'
  }
})
.then((result) => {
  result.serve({
    servedir: './',
  }).then(({ host, port }) => {
    console.log('Serving at localhost:' + port)
  })
})