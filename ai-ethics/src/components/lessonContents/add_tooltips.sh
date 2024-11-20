#!/bin/bash

# File paths
LESSON_FILE="module1/introsec1.js"
UPDATED_FILE="module1/introsec1_update.js"
GLOSSARY_FILE="../../constants.js"

# Check if files exist
if [[ ! -f "$LESSON_FILE"  ]]; then
  echo "Error: Lesson file not found!"
  exit 1
fi

if [[ ! -f "$GLOSSARY_FILE" ]]; then
  echo "Error: glossary file not found!"
  exit 1
fi

# export PATH=$PATH:/c/ProgramData/chocolatey/lib/jq/tools


# Read glossary words and create sed commands
sed_commands=""
while read -r word; do
  # Escape special characters for sed
  escaped_word=$(echo "$word" | sed 's/[&/\]/\\&/g')
  sed_commands+="s/\\b$escaped_word\\b/<GlossaryTooltip glossaryWord=\"$escaped_word\" \/>/g;"
done < <(jq -r '.[].title' "$GLOSSARY_FILE")

# Apply sed commands to the lesson file
sed -E "$sed_commands" "$LESSON_FILE" > "$UPDATED_FILE"

echo "Glossary tooltips added. Updated content saved to $UPDATED_FILE."
