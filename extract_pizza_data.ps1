$csvPath = "IndianFoodDatasetCSV.csv"
$targets = @(
    "Cheesy Vegetarian Pizza Muffins Recipe",
    "Sweet and Spicy Pineapple Paneer Tikka Tawa Pizza Recipe",
    "Tandoori Paneer Tikka Skillet Pizza Recipe",
    "Khakhra Pizza Recipe With Cheese Spread & Roasted Vegetables",
    "Pav Bhaji Pizza Recipe",
    "Cheesy Tawa Pizza Recipe With Corn And Broccoli",
    "Pull Apart Mini Pizza Boats Recipe",
    "Bread Waffle Pizza Recipe",
    "Mini Bread Pizza Recipe - Cheesy Canapes",
    "Gujarati Dhokla Pizza Recipe"
)

$recipes = @()
$csv = Import-Csv -Path $csvPath

foreach ($row in $csv) {
    $transName = $row.TranslatedRecipeName
    # Check if this row is one of our targets
    foreach ($target in $targets) {
        if ($transName -eq $target) {
            $recipe = [PSCustomObject]@{
                RecipeName = $row.RecipeName
                TranslatedRecipeName = $row.TranslatedRecipeName
                PrepTimeInMins = $row.PrepTimeInMins
                CookTimeInMins = $row.CookTimeInMins
                TotalTimeInMins = $row.TotalTimeInMins
                Servings = $row.Servings
                Cuisine = $row.Cuisine
                Course = $row.Course
                Diet = $row.Diet
                Ingredients = $row.TranslatedIngredients
                Instructions = $row.TranslatedInstructions
                URL = $row.URL
            }
            $recipes += $recipe
            break
        }
    }
}

# Convert to JSON and save
$recipes | ConvertTo-Json -Depth 5 | Out-File -FilePath "pizza_recipes.json" -Encoding utf8
Write-Host "Extracted $($recipes.Count) recipes to pizza_recipes.json"
