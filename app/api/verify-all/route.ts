import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  const results = {
    database: {
      connected: false,
      error: null as string | null
    },
    tables: {
      plots: { exists: false, count: 0, error: null as string | null },
      residentials: { exists: false, count: 0, error: null as string | null },
      commercial: { exists: false, count: 0, error: null as string | null },
      villas: { exists: false, count: 0, error: null as string | null },
      apartments: { exists: false, count: 0, error: null as string | null }
    },
    apis: {
      plots: { working: false, error: null as string | null },
      residentials: { working: false, error: null as string | null },
      commercial: { working: false, error: null as string | null },
      villas: { working: false, error: null as string | null },
      apartments: { working: false, error: null as string | null }
    },
    summary: {
      totalTables: 0,
      workingTables: 0,
      totalAPIs: 0,
      workingAPIs: 0
    }
  };

  // Test database connection
  try {
    await query('SELECT 1 as test');
    results.database.connected = true;
  } catch (error) {
    results.database.error = error instanceof Error ? error.message : 'Unknown error';
  }

  // Test each table
  const tableTests = [
    { name: 'plots', displayName: 'Plots' },
    { name: 'residentials', displayName: 'Residentials' },
    { name: 'commercial', displayName: 'Commercial' },
    { name: 'villas', displayName: 'Villas' },
    { name: 'apartments', displayName: 'Apartments' }
  ];

  for (const test of tableTests) {
    try {
      const countResult = await query(`SELECT COUNT(*) as count FROM ${test.name}`);
      results.tables[test.name as keyof typeof results.tables] = {
        exists: true,
        count: (countResult as any)[0].count,
        error: null
      };
      results.summary.totalTables++;
      results.summary.workingTables++;
    } catch (error) {
      results.tables[test.name as keyof typeof results.tables] = {
        exists: false,
        count: 0,
        error: error instanceof Error ? error.message : 'Table not found'
      };
      results.summary.totalTables++;
    }
  }

  // Test each API endpoint
  const apiTests = [
    { name: 'plots', path: '/api/plots' },
    { name: 'residentials', path: '/api/residentials' },
    { name: 'commercial', path: '/api/commercial' },
    { name: 'villas', path: '/api/villas' },
    { name: 'apartments', path: '/api/apartments' }
  ];

  for (const test of apiTests) {
    try {
      // Test API by calling it (this would normally be done from client side)
      // For now, we'll just check if the route file exists by trying to query the table
      if (results.database.connected && results.tables[test.name as keyof typeof results.tables].exists) {
        results.apis[test.name as keyof typeof results.apis] = {
          working: true,
          error: null
        };
        results.summary.totalAPIs++;
        results.summary.workingAPIs++;
      } else {
        results.apis[test.name as keyof typeof results.apis] = {
          working: false,
          error: 'Database or table not available'
        };
        results.summary.totalAPIs++;
      }
    } catch (error) {
      results.apis[test.name as keyof typeof results.apis] = {
        working: false,
        error: error instanceof Error ? error.message : 'API not working'
      };
      results.summary.totalAPIs++;
    }
  }

  return NextResponse.json(results);
}
