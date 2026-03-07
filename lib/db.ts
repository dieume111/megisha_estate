import mysql from 'mysql2/promise';

// Database connection configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'megisha_estate',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // Add connection timeout and retry options
  connectTimeout: 10000,
  acquireTimeout: 10000,
  timeout: 60000,
};

// Create connection pool
let pool: mysql.Pool;

try {
  pool = mysql.createPool(dbConfig);
} catch (error) {
  console.error('Failed to create database pool:', error);
  // Create a mock pool that will throw errors
  pool = {} as mysql.Pool;
}

// Export query function
export async function query(sql: string, params?: any[]): Promise<any> {
  try {
    if (!pool || !('execute' in pool)) {
      throw new Error('Database pool not available');
    }
    
    const [rows] = await pool.execute(sql, params);
    return rows;
  } catch (error) {
    // Log the error but don't crash the application
    console.error('Database query error:', error);
    
    // Re-throw the error so the API can handle fallback
    throw error;
  }
}

// Test connection function
export async function testConnection(): Promise<boolean> {
  try {
    await query('SELECT 1');
    return true;
  } catch (error) {
    console.error('Database connection test failed:', error);
    return false;
  }
}

export default pool;
