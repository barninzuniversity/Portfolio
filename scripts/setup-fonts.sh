#!/bin/bash

# Create the public/fonts directory
mkdir -p public/fonts

# Create a simple placeholder file (will need to be replaced with the actual font)
echo '{
  "familyName": "Inter",
  "styleName": "Bold",
  "glyphs": []
}' > public/fonts/Inter_Bold.json

echo "Font directory and placeholder created. Replace with actual font JSON when available."