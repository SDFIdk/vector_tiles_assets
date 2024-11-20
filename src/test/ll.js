import '@maplibre/maplibre-gl-leaflet'
import { map, maplibreGL } from 'leaflet'

import { projectionDefaults } from './constants'

// get defaults from config
const mapElement = document.getElementById('map')
const projConfig = projectionDefaults[mapElement.dataset.projection]
const projConfigLatLong = projectionDefaults['4326']
const extent = projConfigLatLong.extent
const stylefile = mapElement.dataset.stylefile

// Custom transformRequest to add a header with a token
const transformRequest = (url, resourceType) => {
  const headers = resourceType === 'Tile' ? { 'token': config.API_TOKEN } : {}
  return {
    url,
    headers
  }
}

// Create the ll map
const llMap = map('map', {
  minZoom: 0,
  maxZoom: projConfig.maxZoom,
  center: [projConfigLatLong.center[1], projConfigLatLong.center[0]],
  zoom: projConfig.zoom,
  maxBounds: [[extent[1], extent[0]], [extent[3], extent[2]]],
  attributionControl: false
})

const gl = maplibreGL({
  transformRequest,
  style: stylefile
}).addTo(llMap)
