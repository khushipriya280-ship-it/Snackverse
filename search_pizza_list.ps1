$csvPath = "IndianFoodDatasetCSV.csv"

$count = 0
Import-Csv -Path $csvPath | ForEach-Object {
    $row = $_
    $name = $row.RecipeName
    $transName = $row.TranslatedRecipeName
    if ($name -like "*pizza*" -or $transName -like "*pizza*") {
        $count++
        Write-Host "$($count): $($transName) (Cuisine: $($row.Cuisine))"
    }
}
