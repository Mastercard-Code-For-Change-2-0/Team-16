const express = require("express");
const multer = require("multer");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const donorRoutes = require("./routes/donorRoutes");
const receiverRoutes = require("./routes/receiverRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
app.use(express.json());
app.use("/uploads", express.static("uploads")); // serve images

// Routes
app.use("/donors", donorRoutes);
app.use("/receivers", receiverRoutes);
app.use("/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
