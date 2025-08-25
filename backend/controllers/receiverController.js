const pool = require("../db");

// Add receiver
const addReceiver = async (req, res) => {
  const { r_id, name, address, mobno, organiser, authentication, priority } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO receiver (r_id, name, address, mobno, organiser, authentication, priority) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [r_id, name, address, mobno, organiser, authentication, priority]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Add receiver requirement
const addReceiverItem = async (req, res) => {
  const { r_id, requirement_name, count, status } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO receiver_items (r_id, requirement_name, count, status) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [r_id, requirement_name, count, status]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Fetch receiver requests (with optional filters)
const getReceiverRequests = async (req, res) => {
  const { priority } = req.query;
  try {
    let query = `
      SELECT r.name AS receiver_name, ri.requirement_name, ri.count, ri.status, r.priority
      FROM receiver_items ri
      JOIN receiver r ON ri.r_id = r.id
    `;
    if (priority) query += ` WHERE r.priority = '${priority}'`;

    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = { addReceiver, addReceiverItem, getReceiverRequests };
