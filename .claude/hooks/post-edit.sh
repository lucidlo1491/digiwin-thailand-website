#!/bin/bash
# Runs after every Edit/Write tool call
# Auto-builds if a source file was changed, then audits
set -e

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

# Only trigger on HTML/CSS files in the project
case "$FILE_PATH" in
  */complete_website/src/pages/*.html|*/complete_website/src/partials/*.html|*/complete_website/styles.css)
    cd /Users/peterlo/digiwin_webpage_2026/complete_website
    node build.js 2>&1 | tail -1
    node audit.js 2>&1 | tail -3
    ;;
  *)
    # Not a source file, skip
    ;;
esac

exit 0
