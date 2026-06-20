import csv

csv_path = 'IndianFoodDatasetCSV.csv'

with open(csv_path, 'r', encoding='utf-8') as f:
    reader = csv.reader(f)
    headers = next(reader)
    print("Headers:", headers)
    
    count = 0
    pizza_rows = []
    for idx, row in enumerate(reader):
        # Let's search all columns for the word 'pizza'
        row_str = ' '.join(row).lower()
        if 'pizza' in row_str:
            count += 1
            # print(idx, row[1] if len(row) > 1 else row[0])
            pizza_rows.append((idx, row))
            if count <= 20:
                print(f"Match {count}: Row {idx} - Title: {row[1] if len(row) > 1 else 'N/A'}")
    print(f"Total rows matching 'pizza': {count}")
