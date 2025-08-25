import csv

def match_donations_to_demands(donations_file, demands_file, output_file):
    donations = []
    with open(donations_file, 'r', newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            donations.append(row)

    demands = []
    with open(demands_file, 'r', newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            demands.append(row)

    matches = []
    # A simple example: find donations that can fulfill a demand
    # This logic will need to be adapted for your specific criteria
    for demand in demands:
        for donation in donations:
            if demand['ItemType'] == donation['ItemType'] and int(donation['Quantity']) >= int(demand['NeededQuantity']):
                matches.append({
                    "DemandID": demand['DemandID'],
                    "DonationID": donation['DonationID'],
                    "ItemType": demand['ItemType'],
                    "MatchedQuantity": min(int(demand['NeededQuantity']), int(donation['Quantity'])),
                    "DemandLocation": demand['Location']
                })
                # You might want to "consume" the donation quantity here
                # For simplicity, this example doesn't update quantities

    # Write the matches to a new CSV file
    fieldnames = ['DemandID', 'DonationID', 'ItemType', 'MatchedQuantity', 'DemandLocation']
    with open(output_file, 'w', newline='') as outfile:
        writer = csv.DictWriter(outfile, fieldnames=fieldnames)
        writer.writeheader()
        for match in matches:
            writer.writerow(match)

# Example Usage:
match_donations_to_demands('donations.csv', 'demands.csv', 'matched_pairs.csv')