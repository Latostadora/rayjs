#!/usr/bin/env bash

echo "concatenating ray files into a single file into /dist/ray.js..."
cat src/*.js >dist/ray.js
echo "minifying ray file into /dist/ray-min.js..."
uglifyjs dist/ray.js --compress --mangle --output dist/ray-min.js
echo "done!"