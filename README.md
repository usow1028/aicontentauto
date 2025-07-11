# AI Content Auto

Simple demo to generate AI content using a mock pipeline.

## Run locally

1. Install dependencies:

	npm install

2. Build the bundle:

	npx esbuild aicontentauto.tsx --bundle --outfile=bundle.js --format=esm --jsx=automatic --loader:.tsx=tsx --target=es2018

3. Start a local server (e.g. with serve):

	npx serve

Then open http://localhost:3000 in your browser.

