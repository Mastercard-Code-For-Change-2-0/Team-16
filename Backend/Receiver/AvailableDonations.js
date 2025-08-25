const express = require("express");
const app = express();

app.use(express.json());

// Dummy Donations Dataset
const donations = [
    { donation_id: "D001", item: "Canned Food", quantity: 50, donor_name: "John Doe", location: "City A", date: "2025-08-20", status: "available" },
    { donation_id: "D002", item: "Blankets", quantity: 20, donor_name: "Jane Smith", location: "City B", date: "2025-08-21", status: "matched" }
];

// Dummy Demands Dataset
const demands = [
    { demand_id: "R001", item: "Blankets", quantity: 10, requester: "Relief Center 1", location: "City B", date: "2025-08-22", status: "open" },
    { demand_id: "R002", item: "Canned Food", quantity: 30, requester: "Relief Center 2", location: "City A", date: "2025-08-20", status: "fulfilled" }
];

// -------------------- FILTER HELPERS --------------------
function filterDonations(query) {
    return donations.filter(d => {
        return (!query.item || d.item.toLowerCase().includes(query.item.toLowerCase())) &&
            (!query.location || d.location.toLowerCase() === query.location.toLowerCase()) &&
            (!query.status || d.status === query.status);
    });
}

function filterDemands(query) {
    return demands.filter(r => {
        return (!query.item || r.item.toLowerCase().includes(query.item.toLowerCase())) &&
            (!query.location || r.location.toLowerCase() === query.location.toLowerCase()) &&
            (!query.status || r.status === query.status);
    });
}

// -------------------- ROUTES --------------------

// Fetch donations with filters
// Example: GET /donations?item=Blanket&location=City B&status=available
app.get("/donations", (req, res) => {
    const filtered = filterDonations(req.query);
    res.json(filtered);
});

// Fetch demands with filters
// Example: GET /demands?item=Canned&location=City A&status=open
app.get("/demands", (req, res) => {
    const filtered = filterDemands(req.query);
    res.json(filtered);
});

app.listen(5000, () => {
    console.log("Server running at http://localhost:5000");
});

