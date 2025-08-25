const pool = require("../db");

// Approve donation item
const approveDonation = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "UPDATE donor_items SET approved = true WHERE id = $1 RETURNING *",
      [id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Approve receiver
const approveReceiver = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "UPDATE receiver SET authentication = true WHERE id = $1 RETURNING *",
      [id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Get all pending donations
const getPendingDonations = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT di.id, d.name AS donor_name, di.item_name, di.count, di.approved
       FROM donor_items di
       JOIN donor d ON di.d_id = d.id
       WHERE di.approved = false`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Get all pending receivers
const getPendingReceivers = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM receiver WHERE authentication = false"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = { approveDonation, approveReceiver, getPendingDonations, getPendingReceivers };
