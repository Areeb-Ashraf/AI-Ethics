# Define paths
$glossaryPath = "glossary.json"
$inputFilePath = "module1/introsec1.js"
$outputFilePath = "module1/introsec1_new.js"

# Check if glossary file exists
if (!(Test-Path $glossaryPath)) {
    Write-Error "Glossary file not found at $glossaryPath."
    exit 1
}

# Load glossary JSON
try {
    $glossary = Get-Content $glossaryPath | ConvertFrom-Json
} catch {
    Write-Error "Failed to parse glossary.json: $_"
    exit 1
}

# Check if input file exists
if (!(Test-Path $inputFilePath)) {
    Write-Error "Input file not found at $inputFilePath."
    exit 1
}

# Read input file
try {
    $content = Get-Content $inputFilePath -Raw
} catch {
    Write-Error "Failed to read input file: $_"
    exit 1
}

# Process glossary terms
foreach ($entry in $glossary.glossary) {
    $term = [regex]::Escape($entry.term) # Escape special regex characters in term
    $definition = $entry.definition

    # Replace terms with tooltip-wrapped terms
    $tooltip = "<span class='tooltip' title='$definition'>$term</span>"
    $content = $content -replace "\b$term\b", $tooltip
}

# Save updated content to output file
try {
    Set-Content -Path $outputFilePath -Value $content
    Write-Output "Glossary tooltips added. Updated content saved to $outputFilePath."
} catch {
    Write-Error "Failed to save updated content: $_"
    exit 1
}
