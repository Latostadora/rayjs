#!/usr/bin/env bash
echo
echo "****************** INIT *******************"

echo "Step 1: Concatenating ray lib files into a single file into /dist/ray.js..."
cat lib/lodash.js >dist/ray.js
cat lib/postal.min.js >>dist/ray.js

echo "Step 2: Concatenating ray source files into a single file into /dist/ray.js..."
cat src/*.js >>dist/ray.js

echo "Step 3: Minifying ray file into /dist/ray-min.js..."
uglifyjs dist/ray.js --compress --mangle --output dist/ray-min.js

echo "****************** DONE *******************"