import pandas as pd

def perform_matching(donations_file, demands_file):
    donations_df = pd.read_csv(donations_file)
    demands_df = pd.read_csv(demands_file)

    matched_records = []

    # Iterate through each demand
    for index_demand, demand in demands_df.iterrows():
        item_needed = demand['item']
        quantity_needed = demand['quantity_needed']
        location_demand = demand['location']

        # Find suitable donations
        suitable_donations = donations_df[
            (donations_df['item'] == item_needed) &
            (donations_df['location'] == location_demand) &
            (donations_df['quantity'] > 0) # Ensure donation has remaining quantity
        ].sort_values(by='date') # Prioritize older donations

        for index_donation, donation in suitable_donations.iterrows():
            if quantity_needed <= 0:
                break # Demand is fully met

            donation_quantity_available = donation['quantity']
            quantity_to_match = min(quantity_needed, donation_quantity_available)

            matched_records.append({
                'demand_id': demand['demand_id'],
                'donation_id': donation['donation_id'],
                'item': item_needed,
                'matched_quantity': quantity_to_match,
                'demand_location': location_demand,
                'donation_location': donation['location'],
                'date_matched': pd.to_datetime('today').strftime('%Y-%m-%d')
            })

            # Update quantities
            donations_df.at[index_donation, 'quantity'] -= quantity_to_match
            quantity_needed -= quantity_to_match

    return pd.DataFrame(matched_records)

# Example usage:
matched_df = perform_matching('donation_dataset_500k.csv', 'demand_dataset_500k.csv')
matched_df.to_csv('matched_donations.csv', index=False)
