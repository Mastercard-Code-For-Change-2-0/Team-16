const express = require('express');
const cors = require('cors');
const db = require('./db/connection');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Test DB connection
app.get('/api/health', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT 1 as test');
    res.json({ 
      status: 'ok', 
      message: 'Donation Portal API running',
      database: 'connected'
    });
  } catch (error) {
    res.json({ 
      status: 'ok', 
      message: 'API running',
      database: 'connection failed'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});