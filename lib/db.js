import mysql from 'mysql2/promise';

// Database connection configuration
const dbConfig = {
  host: 'localhost',
  user: 'root', // Change this to your MySQL username
  password: '', // Change this to your MySQL password
  database: 'megishadata',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Helper function to execute queries
export async function query(sql, params = []) {
  try {
    const [rows] = await pool.execute(sql, params);
    return rows;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

// Test connection
export async function testConnection() {
  try {
    const rows = await query('SELECT 1 as test');
    console.log('Database connected successfully');
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}

export default pool;
