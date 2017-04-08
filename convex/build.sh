#!/bin/bash
cd src
zip -9 -D convex.love *
mv convex.love ../dist/.
cd ../dist
cat love.exe convex.love > convex.exe
