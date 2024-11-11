export const projectionDefaults = {
  'epsg25832': {
    name: 'EPSG:25832',
    projection: '+proj=utm +zone=32 +ellps=GRS80 +units=m +no_defs',
    extent: [120000, 5661139.2, 958860.8, 6500000],
    center: [566100, 6217900],
    resolutions: [3276.8, 1638.4, 819.2, 409.6, 204.8, 102.4, 51.2, 25.6, 12.8, 6.4, 3.2, 1.6, 0.8, 0.4, 0.2, 0.1],
    zoom: 7,
    maxZoom: 15
  },
  'epsg3857': {
    name: 'EPSG:3857',
    projection: '+proj=merc +a=6378137 +b=6378137 +lat_ts=0 +lon_0=0 +x_0=0 +y_0=0 +k=1 +units=m +nadgrids=@null +wktext +no_defs +type=crs',
    extent: [665307, 7200979, 1839380, 7959234],
    center: [1120169, 7578674],
    resolutions: [156543.03392804076, 78271.51696402022, 39135.75848201011, 19567.879241005117, 9783.939620502542, 4891.969810251271, 2445.9849051256383, 1222.9924525628178, 611.4962262814075, 305.7481131407024, 152.8740565703523, 76.43702828517615, 38.21851414258808, 19.10925707129404, 9.55462853564699, 4.777314267823495, 2.388657133911756, 1.1943285669558765, 0.5971642834779383, 0.2985821417389691, 0.1492910708694846, 0.0746455354347422, 0.0373227677173711, 0.0186613838586856, 0.0093306919293428],
    zoom: 10,
    maxZoom: 24
  },
  'epsg4326': {
    name: 'EPSG:4326',
    projection: '+proj=longlat +datum=WGS84 +no_defs +type=crs',
    extent: [3.3201605, 53.1136553, 17.5577711, 58.3539706],
    center: [10.129395, 56.127184],
    resolutions: [3276.8, 1638.4, 819.2, 409.6, 204.8, 102.4, 51.2, 25.6, 12.8, 6.4, 3.2, 1.6, 0.8, 0.4, 0.2, 0.1],
    zoom: 10,
    maxZoom: 24
  }
}