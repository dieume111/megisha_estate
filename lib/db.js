import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';

// Database connection configuration
const dbConfig = {
  host: process.env.DB_HOST || 'megisha-real-estate-database-eoc-database.d.aivencloud.com',
  port: parseInt(process.env.DB_PORT || '28030'),
  user: process.env.DB_USER || 'avnadmin',
  password: process.env.DB_PASSWORD || 'AVNS_dZawUIZYiFHwuHExxSg',
  database: process.env.DB_NAME || 'defaultdb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    ca: fs.readFileSync(path.join(process.cwd(), 'ca.pem')),
    rejectUnauthorized: true
  }
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
