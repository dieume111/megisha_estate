import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  const results = {
    database: false,
    tables: {
      plots: false,
      residentials: false,
      commercial: false,
      villas: false,
      apartments: false
    },
    errors: [] as string[]
  };

  try {
    // Test database connection
    await query('SELECT 1 as test');
    results.database = true;
    
    // Test each table
    const tableTests = [
      { name: 'plots', query: 'SELECT COUNT(*) as count FROM plots LIMIT 1' },
      { name: 'residentials', query: 'SELECT COUNT(*) as count FROM residentials LIMIT 1' },
      { name: 'commercial', query: 'SELECT COUNT(*) as count FROM commercial LIMIT 1' },
      { name: 'villas', query: 'SELECT COUNT(*) as count FROM villas LIMIT 1' },
      { name: 'apartments', query: 'SELECT COUNT(*) as count FROM apartments LIMIT 1' }
    ];

    for (const test of tableTests) {
      try {
        await query(test.query);
        results.tables[test.name as keyof typeof results.tables] = true;
      } catch (error) {
        results.errors.push(`Table ${test.name}: ${error}`);
      }
    }

  } catch (error) {
    results.errors.push(`Database connection: ${error}`);
  }

  return NextResponse.json(results);
}
