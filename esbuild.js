import esbuild from 'esbuild'
import { copy } from 'esbuild-plugin-copy'
import { open, readdir, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'

// Variables
const outdir = 'test'
const srcDir = 'styles'
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
  const templateHtml = await readHTML(`src/test/${framework}.html`)
  const topFolders = await readdir(srcDir)
  for(const topFolder of topFolders) {
    const projections = await readdir(`${srcDir}/${topFolder}`)
    for(const projection of projections) {
      const files = await readdir(`${srcDir}/${topFolder}/${projection}`)
      for(const file of files) {
        try {
          const filePath = `/${srcDir}/${topFolder}/${projection}/${file}`
          const title = `${framework}_${projection}_${file}`
          const dir = `${outdir}/${framework}/${topFolder}/${projection}`
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
    ol: 'src/test/ol.js',
    ml: 'src/test/ml.js'
  },
  outdir: outdir,
  bundle: true,
  splitting: true,
  format: 'esm',
  loader: {
    '.json': 'copy'
  },
  plugins: [
    copy({
      resolveFrom: 'cwd',
      assets: {
        from: ['./styles/**/*'],
        to: ['./test/styles']
      },
      watch: true
    })
  ]
})
.then((result) => {
  result.serve({
    servedir: outdir,
  }).then(({ host, port }) => {
    console.log('Serving at localhost:' + port)
  })
})