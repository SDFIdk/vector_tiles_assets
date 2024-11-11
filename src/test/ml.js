import { Map } from 'maplibre-gl'

import { projectionDefaults } from './constants'

// get defaults from config
const mapElement = document.getElementById('map')
const projConfig = projectionDefaults[mapElement.dataset.projection]
const projConfigLatLong = projectionDefaults['4326']
const extent = projConfigLatLong.extent
const stylefile = mapElement.dataset.stylefile

// Custom transformRequest to add a header with a token
const transformRequest = (url, resourceType) => {
  return {
    url: url,
    headers: { 'token': config.API_TOKEN }
  }
}

// Create the ml map
const map = new Map({
  container: 'map',
  minZoom: 0,
  maxZoom: projConfig.maxZoom,
  style: stylefile,
  maxBounds: [[extent[0], extent[1]], [extent[2], extent[3]]],
  center: projConfigLatLong.center,
  zoom: projConfig.zoom,
  attributionControl: false,
  transformRequest
})
