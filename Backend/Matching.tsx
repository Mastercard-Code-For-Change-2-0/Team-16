import express, { Request, Response } from "express";

const app = express();
app.use(express.json());

// Dummy Donations Dataset
interface Donation {
    donation_id: string;
    item: string;
    quantity: number;
    donor_name: string;
    location: string;
    date: string;
}

// Dummy Demands Dataset
interface Demand {
    demand_id: string;
    item: string;
    quantity: number;
    requester: string;
    location: string;
    date: string;
}

// Sample data (you can replace with DB fetch later)
const donations: Donation[] = [
    { donation_id: "D001", item: "Canned Food", quantity: 50, donor_name: "John Doe", location: "City A", date: "2025-08-20" },
    { donation_id: "D002", item: "Blankets", quantity: 20, donor_name: "Jane Smith", location: "City B", date: "2025-08-21" },
];

const demands: Demand[] = [
    { demand_id: "R001", item: "Blankets", quantity: 10, requester: "Relief Center 1", location: "City B", date: "2025-08-22" },
    { demand_id: "R002", item: "Canned Food", quantity: 30, requester: "Relief Center 2", location: "City A", date: "2025-08-20" },
];

// Matching logic
function matchDonations() {
    const matches: any[] = [];

    donations.forEach(donation => {
        demands.forEach(demand => {
            if (donation.item.toLowerCase() === demand.item.toLowerCase() &&
                donation.location.toLowerCase() === demand.location.toLowerCase()) {

                const matchedQuantity = Math.min(donation.quantity, demand.quantity);

                matches.push({
                    donation_id: donation.donation_id,
                    demand_id: demand.demand_id,
                    item: donation.item,
                    location: donation.location,
                    matchedQuantity,
                    donor: donation.donor_name,
                    requester: demand.requester
                });
            }
        });
    });

    return matches;
}

// API endpoint
app.get("/match", (req: Request, res: Response) => {
    const results = matchDonations();
    res.json(results);
});

app.listen(4000, () => console.log("Server running on http://localhost:4000"));
