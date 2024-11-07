import Map from 'ol/Map'
import View from 'ol/View'
import { get as getProjection } from 'ol/proj'
import { register } from 'ol/proj/proj4'
import proj4 from 'proj4/dist/proj4'
import { apply } from 'ol-mapbox-style'

import TileLayer from 'ol/layer/Tile'
import WMTS from 'ol/source/WMTS'
import TileWMS from 'ol/source/TileWMS'
import LayerGroup from 'ol/layer/Group'

// get defaults from config
const mapElement = document.getElementById('map')
const projConfig = projectionDefaults[mapElement.dataset.projection]
const stylefile = mapElement.dataset.stylefile

// define proj4
proj4.defs(projConfig.name, projConfig.projection)
register(proj4)
const projection = getProjection(projConfig.name)
projection.setExtent(projConfig.extent)

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
    projection,
    maxZoom: projConfig.maxZoom
  })
})

map.addLayer(new TileLayer({
  opacity: 1.0,
  visible: true,
  source: new TileWMS({
    crossOrigin: 'Anonymous',
    url: 'https://api.dataforsyningen.dk/dagi_DAF?service=WMS&request=GetCapabilities&token=' + config.API_TOKEN,
    params: {
      'LAYERS': 'Kommuneinddeling',
      'VERSION': '1.3.0',
      'TRANSPARENT': 'TRUE'
    }
  })
}))

console.log(projConfig)

const vectorLayerGroup = new LayerGroup()
// Apply the style and add token header
apply(vectorLayerGroup, stylefile, { resolutions: projConfig.resolutions, projection: projConfig.name })
.then(layerGroup => {
  layerGroup.getLayers().forEach(layer => {
    const url = layer?.getSource()?.urls ? layer.getSource().urls[0] : ''
    if (url?.includes('api.dataforsyningen.dk')) {
      layer.getSource().setTileLoadFunction(tileLoadFunctionWithTokenHeader)
    }
  })
  map.addLayer(layerGroup)
  console.log(layerGroup.getLayers().getArray()[0].getSource())
})
