#!/usr/bin/env bash

cat src/*.js >dist/ray.js
uglifyjs dist/ray.js --compress --mangle --output dist/ray-min.js