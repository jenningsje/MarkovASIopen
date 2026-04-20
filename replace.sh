#!/usr/bin/env bash

set -e

TARGET_DIR="backend"
BACKUP_DIR="backend_backup_$(date +%s)"

echo "📦 Creating backup at $BACKUP_DIR"
cp -r "$TARGET_DIR" "$BACKUP_DIR"

echo "🔍 Replacing executor.Run(...) → runnerclient.Client{}.Run(...)"

find "$TARGET_DIR" -type f -name "*.go" | while read -r file; do
    sed -i '' 's/executor\.Run(/runnerclient.Client{}.Run(/g' "$file"
done

echo "✅ Done. Backup stored at $BACKUP_DIR"
