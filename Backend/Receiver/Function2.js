// server.js
import express from "express";
import bodyParser from "body-parser";
import { Pool } from "pg";

const app = express();
app.use(bodyParser.json());

// PostgreSQL connection pool
const pool = new Pool({
    user: "postgres",       // change this to your username
    host: "localhost",      // or your DB host
    database: "ngo_system", // change this to your DB name
    password: "yourpassword", // change this to your DB password
    port: 5432,
});

// ---------------- Donations Endpoint ----------------
app.get("/donations", async (req, res) => {
    try {
        const { item, location, status } = req.query;

        let query = "SELECT * FROM donations WHERE 1=1";
        let values = [];
        let count = 1;

        if (item) {
            query += ` AND LOWER(item) LIKE $${count}`;
            values.push(`%${item.toLowerCase()}%`);
            count++;
        }
        if (location) {
            query += ` AND LOWER(location) = $${count}`;
            values.push(location.toLowerCase());
            count++;
        }
        if (status) {
            query += ` AND status = $${count}`;
            values.push(status.toLowerCase());
            count++;
        }

        query += " ORDER BY date DESC"; // latest first

        const result = await pool.query(query, values);
        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching donations:", err);
        res.status(500).json({ error: "Database error" });
    }
});

// ---------------- Demands Endpoint ----------------
app.get("/demands", async (req, res) => {
    try {
        const { item, location, status } = req.query;

        let query = "SELECT * FROM demands WHERE 1=1";
        let values = [];
        let count = 1;

        if (item) {
            query += ` AND LOWER(item) LIKE $${count}`;
            values.push(`%${item.toLowerCase()}%`);
            count++;
        }
        if (location) {
            query += ` AND LOWER(location) = $${count}`;
            values.push(location.toLowerCase());
            count++;
        }
        if (status) {
            query += ` AND status = $${count}`;
            values.push(status.toLowerCase());
            count++;
        }

        query += " ORDER BY date DESC";

        const result = await pool.query(query, values);
        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching demands:", err);
        res.status(500).json({ error: "Database error" });
    }
});

// ---------------- Server Start ----------------
app.listen(5000, () => {
    console.log("✅ Server running on http://localhost:5000");
});



