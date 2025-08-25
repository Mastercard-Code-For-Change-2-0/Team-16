const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors()); // allow frontend to connect

const JWT_SECRET = "super_secret_key"; // ⚠️ use env var in real app

// ------------------ In-memory DB (replace with Mongo/Postgres later) ------------------
let users = [
    { email: "admin@ngo.org", password: bcrypt.hashSync("admin123", 8), role: "admin" },
    { email: "faculty@ngo.org", password: bcrypt.hashSync("faculty123", 8), role: "faculty" }
];

let donations = [
    { donation_id: "D001", item: "Canned Food", quantity: 50, donor_name: "John Doe", location: "City A", date: "2025-08-20", status: "available" },
    { donation_id: "D002", item: "Blankets", quantity: 20, donor_name: "Jane Smith", location: "City B", date: "2025-08-21", status: "matched" }
];

let demands = [
    { demand_id: "R001", item: "Blankets", quantity: 10, requester: "Relief Center 1", location: "City B", date: "2025-08-22", status: "open" },
    { demand_id: "R002", item: "Canned Food", quantity: 30, requester: "Relief Center 2", location: "City A", date: "2025-08-20", status: "fulfilled" }
];

// ------------------ Auth Helpers ------------------
function generateToken(user) {
    return jwt.sign({ email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "1h" });
}

function authMiddleware(req, res, next) {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ message: "No token" });

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid token" });
    }
}

function authorizeRole(role) {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ message: "Access denied" });
        }
        next();
    };
}

// ------------------ Routes ------------------

// Signup (only donors & receivers can self-signup)
app.post("/signup", async (req, res) => {
    const { email, password, role } = req.body;

    if (email.endsWith("@ngo.org") && role !== "donor" && role !== "receiver") {
        return res.status(403).json({ message: "Faculty/Admin accounts are invite-only" });
    }

    const hashed = await bcrypt.hash(password, 8);
    users.push({ email, password: hashed, role });
    res.json({ message: "User registered successfully" });
});

// Login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);

    if (!user) return res.status(404).json({ message: "User not found" });

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(401).json({ message: "Invalid password" });

    const token = generateToken(user);
    res.json({ token, role: user.role });
});

// Fetch Donations with filters
app.get("/donations", (req, res) => {
    const { item, location, status } = req.query;
    const filtered = donations.filter(d => {
        return (!item || d.item.toLowerCase().includes(item.toLowerCase())) &&
            (!location || d.location.toLowerCase() === location.toLowerCase()) &&
            (!status || d.status === status);
    });
    res.json(filtered);
});

// Fetch Demands with filters
app.get("/demands", (req, res) => {
    const { item, location, status } = req.query;
    const filtered = demands.filter(r => {
        return (!item || r.item.toLowerCase().includes(item.toLowerCase())) &&
            (!location || r.location.toLowerCase() === location.toLowerCase()) &&
            (!status || r.status === status);
    });
    res.json(filtered);
});

// Protected Admin Route (example)
app.get("/admin/users", authMiddleware, authorizeRole("admin"), (req, res) => {
    res.json(users);
});

// ------------------ Start Server ------------------
app.listen(5000, () => {
    console.log("✅ Server running at http://localhost:5000");
});
