import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const app = express();
app.use(express.json());

const JWT_SECRET = "mysecret"; //  use env var in real apps

//  Dummy Database
let users = [
    { email: "faculty@ngo.org", password: bcrypt.hashSync("faculty123", 8), role: "faculty" },
    { email: "admin@ngo.org", password: bcrypt.hashSync("admin123", 8), role: "admin" }
];

//  Signup (only for donors, faculty/admin should be pre-created)
app.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    // prevent using restricted domain
    if (email.endsWith("@ngo.org")) {
        return res.status(403).json({ message: "Faculty/Admin must be created by NGO, not signup" });
    }

    const hashed = await bcrypt.hash(password, 8);
    users.push({ email, password: hashed, role: "donor" });
    res.json({ message: "Donor registered successfully" });
});

//  Login (all roles)
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);

    if (!user) return res.status(404).json({ message: "User not found" });

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(401).json({ message: "Invalid password" });

    // include role in token
    const token = jwt.sign({ email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
});

//  Middleware for role-based access
function authorizeRole(role) {
    return (req, res, next) => {
        const authHeader = req.headers["authorization"];
        if (!authHeader) return res.status(401).json({ message: "No token" });

        const token = authHeader.split(" ")[1];
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            if (decoded.role !== role) {
                return res.status(403).json({ message: "Access denied" });
            }
            req.user = decoded;
            next();
        } catch {
            return res.status(403).json({ message: "Invalid token" });
        }
    };
}

// 🎯 Protected Routes
app.get("/donor-dashboard", authorizeRole("donor"), (req, res) => {
    res.json({ message: `Welcome Donor ${req.user.email}` });
});

app.get("/faculty-dashboard", authorizeRole("faculty"), (req, res) => {
    res.json({ message: `Welcome Faculty ${req.user.email}` });
});

app.get("/admin-dashboard", authorizeRole("admin"), (req, res) => {
    res.json({ message: `Welcome Admin ${req.user.email}` });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
