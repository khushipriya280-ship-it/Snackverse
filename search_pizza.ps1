$csvPath = "IndianFoodDatasetCSV.csv"

# Read the first line to get headers
$headersLine = Get-Content -Path $csvPath -TotalCount 1
Write-Host "Headers: $headersLine"

# Import CSV. We will select rows where any field contains "pizza"
$count = 0
Import-Csv -Path $csvPath | ForEach-Object {
    $row = $_
    $rowStr = ($row | Out-String).ToLower()
    if ($rowStr -like "*pizza*") {
        $count++
        # Get recipe name and translated recipe name if they exist
        $name = $row.RecipeName
        $transName = $row.TranslatedRecipeName
        $url = $row.URL
        Write-Host "Match $($count): $($name) | $($transName)"
        if ($count -ge 30) {
            Write-Host "Found enough matches. Stopping."
            break
        }
    }
}
Write-Host "Total matching rows: $count"
