export const projectionDefaults = [
  {
    name: 'EPSG:25832',
    projection: '+proj=utm +zone=32 +ellps=GRS80 +units=m +no_defs',
    extent: [120000, 5661139.2, 958860.8, 6500000],
    center: [566100, 6217900],
    resolutions: [3276.8, 1638.4, 819.2, 409.6, 204.8, 102.4, 51.2, 25.6, 12.8, 6.4, 3.2, 1.6, 0.8, 0.4, 0.2, 0.1],
    zoom: 7,
    maxZoom: 15
  },
  {
    name: 'EPSG:3857',
    projection: '+proj=merc +a=6378137 +b=6378137 +lat_ts=0 +lon_0=0 +x_0=0 +y_0=0 +k=1 +units=m +nadgrids=@null +wktext +no_defs +type=crs',
    extent: [665307, 7200979, 1839380, 7959234],
    center: [1193640, 7499389],
    resolutions: [3276.8, 1638.4, 819.2, 409.6, 204.8, 102.4, 51.2, 25.6, 12.8, 6.4, 3.2, 1.6, 0.8, 0.4, 0.2, 0.1],
    zoom: 10,
    maxZoom: 15
  }
]
