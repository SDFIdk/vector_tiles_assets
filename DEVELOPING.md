# Developing

## Building test files
Start by installing the dependencies with `npm install`. Then create a config with a dataforsyningen.dk token in the root folder (see `config.example.js` for an example config). After that you can build the test files with `npm run test` which will run a server that serves all the test html files at `localhost:8000/test/`.

## Building glyphs from fonts
To build glyphs from the fonts in the `fonts` folder, install the depedencies with `npm install` and then run `npm run build-glyphs`.
