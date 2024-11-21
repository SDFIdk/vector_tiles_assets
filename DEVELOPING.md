# Developing

## Configuration (config.js)
To run the test server a `config.js` file is required in the root folder.  You'll need to supply your own token for your particular configuration. You can copy and edit `config.example.js` to use as your own `config.js`.

## Building test files
Start by installing the dependencies with `npm install`. Then create a config with a dataforsyningen.dk token in the root folder (see `config.example.js` for an example config). After that you can build the test files with `npm run test` which will run a server that serves all the test html files at `localhost:8000/test/`.

## Building glyphs from fonts
To build glyphs from the fonts in the `fonts` folder, install the depedencies with `npm install` and then run `npm run build-glyphs`. This only needs to be run if new fonts are added to the repository.
