#!/bin/bash
# Runs BEFORE every Edit/Write tool call
# BLOCKS edits to root HTML files that have source equivalents
# This prevents the #1 recurring mistake: editing built output instead of source
set -e

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

# Check if this is a root-level HTML file in complete_website (not in src/)
case "$FILE_PATH" in
  */complete_website/*.html|*/complete_website/blog/*.html|*/complete_website/events/*.html|*/complete_website/industries/*.html|*/complete_website/products/*.html|*/complete_website/partner-program/*.html)
    # Skip if it's already a source file
    case "$FILE_PATH" in
      */src/*) exit 0 ;;
    esac

    # Derive the source path
    ROOT_DIR="/Users/peterlo/digiwin_webpage_2026/complete_website"
    REL_PATH="${FILE_PATH#$ROOT_DIR/}"
    SRC_PATH="$ROOT_DIR/src/pages/$REL_PATH"

    if [ -f "$SRC_PATH" ]; then
      echo "BLOCKED: Edit the source file instead: src/pages/$REL_PATH" >&2
      echo "Root files are overwritten by build.js. Your edit would be lost." >&2
      exit 2
    fi
    ;;
esac

exit 0
