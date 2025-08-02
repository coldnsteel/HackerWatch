#!/bin/bash
echo "🔄 CLONING HACKERWATCH PLATFORM"

# Backup current version
cp -r public public-backup-$(date +%Y%m%d-%H%M%S)

# Clone to new location
read -p "Enter clone destination: " dest
mkdir -p $dest
cp -r public/* $dest/

echo "✅ Platform cloned to $dest"
echo "✅ Backup created: public-backup-$(date +%Y%m%d-%H%M%S)"
