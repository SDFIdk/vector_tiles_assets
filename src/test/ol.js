import Map from 'ol/Map'
import View from 'ol/View'
import MVT from 'ol/format/MVT'
import { get as getProjection } from 'ol/proj'
import { register } from 'ol/proj/proj4'
import proj4 from 'proj4/dist/proj4'
import { apply } from 'ol-mapbox-style'

import { projectionDefaults } from './constants'

// get defaults from config
const mapElement = document.getElementById('map')
const projConfig = projectionDefaults[mapElement.dataset.projection]
const stylefile = mapElement.dataset.stylefile

// define proj4
proj4.defs(projConfig.name, projConfig.projection)
register(proj4)
const projection = getProjection(projConfig.name)
if (projConfig.name !== 'EPSG:3857') {
  projection.setExtent(projConfig.extent)
}

const format = new MVT()
// Custom setTileLoadFunction to add a header with a token
const tileLoadFunctionWithTokenHeader = (tile, src) => {
  tile.setLoader((ext, res, proj) => {
    const client = new XMLHttpRequest()
    client.open('GET', src)
    client.responseType = 'arraybuffer'
    if (config.API_TOKEN) client.setRequestHeader('token', config.API_TOKEN)
    client.onload = () => {
      try {
        const source = client.response
        tile.onLoad.bind(tile)(
          (
            format.readFeatures(source, {
              extent: ext,
              featureProjection: proj,
            })
          ),
          format.readProjection(source)
        )
      } catch {
        tile.onError.bind(tile)()
      }
    }
    client.onerror = () => {
      tile.onError.bind(tile)()
    }
    client.send()
  })
}

// Create the ol map
const map = new Map({
  layers: [],
  target: 'map',
  view: new View({
    extent: projConfig.extent,
    center: projConfig.center,
    zoom: projConfig.zoom,
    maxZoom: projConfig.maxZoom,
    projection
  })
})

// Apply the style and add token header
apply(map, stylefile, { resolutions: projConfig.resolutions, projection: projConfig.name })
.then(layerGroup => {
  layerGroup.getLayers().forEach(layer => {
    const url = layer?.getSource()?.urls ? layer.getSource().urls[0] : ''
    if (url?.includes('api.dataforsyningen.dk') && !url?.includes('token')) {
      layer.getSource().setTileLoadFunction(tileLoadFunctionWithTokenHeader)
    }
  })
})
