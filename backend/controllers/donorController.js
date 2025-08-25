const pool = require("../db");

// Add donor
const addDonor = async (req, res) => {
  const { d_id, name, address, mobileno } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO donor (d_id, name, address, mobileno) VALUES ($1, $2, $3, $4) RETURNING *",
      [d_id, name, address, mobileno]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Add donation item with image
const addDonationItem = async (req, res) => {
  const { d_id, item_name, count } = req.body;
  const imagePath = req.file ? req.file.path : null;
  try {
    const result = await pool.query(
      "INSERT INTO donor_items (d_id, item_name, count, approved, image) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [d_id, item_name, count, false, imagePath]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Get approved donations
const getApprovedDonations = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT di.id, d.name AS donor_name, di.item_name, di.count, di.approved, di.image
      FROM donor_items di
      JOIN donor d ON di.d_id = d.id
      WHERE di.approved = true
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = { addDonor, addDonationItem, getApprovedDonations };
