# Developing

## Configuration (config.js)
To run the test server a `config.js` file is required in the root folder.  You'll need to supply your own token for your particular configuration. You can copy and edit `config.example.js` to use as your own `config.js`.

## Building test files
Start by installing the dependencies with `npm install`. Then create a config with a dataforsyningen.dk token in the root folder (see `config.example.js` for an example config). After that you can build the test files with `npm run test` which will run a server that serves all the test html files at `localhost:8000/test/`.

## Building glyphs from fonts
To build glyphs from the fonts in the `fonts` folder, install the depedencies with `npm install` and then run `npm run build-glyphs`. This only needs to be run if new fonts are added to the repository.

## Creating a new release
Follow the below steps for creating a new release:
- Document any changes in `CHANGELOG.md`.
- Bump the version in package.json and run `npm i` to automatically update the `package-lock.json`.
    - If in doubt about what the new version number should be, refer to [this](https://docs.npmjs.com/about-semantic-versioning#incrementing-semantic-versions-in-published-packages).
- Create a new release with a version tag and name consisting of the version number prefixed by a `v`. For instance, for version number `0.2.1` the tag and name should be `v0.2.1`.
- Build the `assets` repo (not public) to deploy the cdn at `https://cdn.dataforsyningen.dk/assets/vector_tiles_assets`.
