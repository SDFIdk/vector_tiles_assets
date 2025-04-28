# Change Log
All notable changes to this project will be documented in this file.
 
The format is based on [Keep a Changelog](http://keepachangelog.com/).

## [0.3.0] - 2025-04-28

### Added

- Added sprites.

## [0.2.2] - 2025-03-06

### Fixed

- Fixed token being added to the header if it was already included as a URL parameter.
- Fixed token being added to mapLibre and leaflet for calls that was not to dataforsyningen.dk.

## [0.2.1] - 2024-11-20

### Added

- Assets are now available as a cdn at `https://cdn.dataforsyningen.dk/assets/vector_tiles_assets/`.
- extent changed, so the extent now follows the EEZ
from:
Xmin: 120000
xmax: 958860.8
Ymin: 5661139.2
Ymax: 6500000
to:
Xmin: 139000
xmax: 977860.8
Ymin: 5661139.2
Ymax: 6500000
- EPSG 3857 (webmercator) available at `https://cdn.dataforsyningen.dk/assets/vector_tiles_assets/tree/main/styles/official`.
