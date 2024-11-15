import esbuild from 'esbuild'
import { copy } from 'esbuild-plugin-copy'
import { open, readdir } from 'node:fs/promises'
import { existsSync, mkdirSync } from 'node:fs'

// Variables
const repoPrefix = '/vector_tiles_assets'
const srcDir = 'src/test'
const outDir = 'test'
const styleDir = 'styles'
const entryPoints = {
  'style': `${srcDir}/index.css`,
  'ol/main': `${srcDir}/ol.js`,
  'ol/style': `${srcDir}/ol.css`,
  'ml/main': `${srcDir}/ml.js`,
  'ml/style': `${srcDir}/ml.css`,
}
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
          const filePath = `${process.env.NODE_ENV === 'production' ? repoPrefix : ''}/${styleDir}/${topFolder}/${file}`
          const title = `${framework.name}_${fileName}`
          const dir = `${outDir}/${framework.name}`
          const content = templateHtml
            .replace('InsertYourStylefileHere', filePath)
            .replace('InsertYourTitleHere', title)
            .replace('InsertYourProjectionHere', projection)
          if (!existsSync(dir)){
            mkdirSync(dir, { recursive: true })
          }
          await writeHTML(`${dir}/${fileName}.html`, content)
          framework.files.push({ name: fileName, link: `${framework.name}/${fileName}.html` })
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
    writeToFile(`<li><a href="${file.link}">${file.name}</a></li>\n`)
  }
  writeToFile(frameworkSectionEnd)
}
await writeHTML(`${outDir}/index.html`, templateHtml)

// Create config.js from local config.js or with token from github secret.
if (existsSync(`config.js`)) {
  const template = await readHTML(`config.js`)
  writeHTML(`${outDir}/config.js`, template)
} else {
  const template = await readHTML(`config.example.js`)
  const content = template.replace('[ INSERT TOKEN ]', process.env.API_TOKEN)
  writeHTML(`${outDir}/config.js`, content)
}

// Adjust link to glyphs and copy stylefiles.
if (process.env.NODE_ENV === 'production') {
  const topFolders = await readdir(styleDir)
  for(const topFolder in topFolders) {
    const files = await readdir(`${styleDir}/${topFolder}/`)
    for(const file of files) {
      const template = await readHTML(`${topFolder}/${file}`)
      const content = template.replace('/glyphs/', `${repoPrefix}/glyphs/`)
      writeHTML(`${outDir}/config.js`, content)
    }
  }
}

// If prod build, copy assets over to test folder.
if (process.env.NODE_ENV === 'production') {
  console.log('---------------------')
  console.log('ESBuild and copying assets')
  esbuild.build({
    entryPoints,
    outdir: outDir,
    bundle: true,
    splitting: true,
    format: 'esm',
    plugins: [
      copy({
        assets: [
          {
            from: ['./glyphs/**/*'],
            to: ['./glyphs']
          }
        ]
      })
    ]
  })
} else { // Test, serve the test pages.
  console.log('---------------------')
  console.log('Running test server')
  esbuild.context({
    entryPoints,
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
}
