const pool = require('./db/db');

async function testConnection() {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    console.log('Database connected successfully:', rows[0].result); // Should print 2
  } catch (err) {
    console.error('Database connection failed:', err.message);
  }
}

testConnection();