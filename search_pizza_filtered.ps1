$csvPath = "IndianFoodDatasetCSV.csv"

$count = 0
Import-Csv -Path $csvPath | ForEach-Object {
    $row = $_
    $name = $row.RecipeName
    $transName = $row.TranslatedRecipeName
    if ($name -like "*pizza*" -or $transName -like "*pizza*") {
        $count++
        Write-Host "Match $($count):"
        Write-Host "  RecipeName: $($name)"
        Write-Host "  TranslatedRecipeName: $($transName)"
        Write-Host "  PrepTimeInMins: $($row.PrepTimeInMins)"
        Write-Host "  CookTimeInMins: $($row.CookTimeInMins)"
        Write-Host "  TotalTimeInMins: $($row.TotalTimeInMins)"
        Write-Host "  Servings: $($row.Servings)"
        Write-Host "  Cuisine: $($row.Cuisine)"
        Write-Host "  Course: $($row.Course)"
        Write-Host "  Diet: $($row.Diet)"
        Write-Host "  Ingredients: $($row.TranslatedIngredients)"
        Write-Host "  Instructions: $($row.TranslatedInstructions)"
        Write-Host "----------------------------------------"
    }
}
Write-Host "Total strictly matching pizza recipes: $($count)"
