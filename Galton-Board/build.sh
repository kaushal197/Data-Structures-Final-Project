#!/bin/bash

if [ -d "node_modules" ]; then
  npm i --save-dev babel-cli babel-preset-es2015
fi

cp src/p5.* dist/.
sass src/styles.sass dist/styles.css
babel src/script.js --presets=es2015 -o dist/script.js
pug -o dist src/index.pug 

