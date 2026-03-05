'use client';

import { useState, useEffect } from 'react';
import { Database, CheckCircle, XCircle, AlertTriangle, RefreshCw } from 'lucide-react';

interface VerificationResult {
  database: {
    connected: boolean;
    error: string | null;
  };
  tables: {
    plots: { exists: boolean; count: number; error: string | null };
    residentials: { exists: boolean; count: number; error: string | null };
    commercial: { exists: boolean; count: number; error: string | null };
    villas: { exists: boolean; count: number; error: string | null };
    apartments: { exists: boolean; count: number; error: string | null };
  };
  apis: {
    plots: { working: boolean; error: string | null };
    residentials: { working: boolean; error: string | null };
    commercial: { working: boolean; error: string | null };
    villas: { working: boolean; error: string | null };
    apartments: { working: boolean; error: string | null };
  };
  summary: {
    totalTables: number;
    workingTables: number;
    totalAPIs: number;
    workingAPIs: number;
  };
}

export default function TestConnectionsPage() {
  const [results, setResults] = useState<VerificationResult | null>(null);
  const [loading, setLoading] = useState(false);

  const runTest = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/verify-all');
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Test failed:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runTest();
  }, []);

  const getStatusIcon = (status: boolean) => {
    if (status) return <CheckCircle className="w-5 h-5 text-green-500" />;
    return <XCircle className="w-5 h-5 text-red-500" />;
  };

  const getWarningIcon = () => {
    return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <Database className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">Database Connection Test</h1>
            </div>
            <button
              onClick={runTest}
              disabled={loading}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>{loading ? 'Testing...' : 'Run Test'}</span>
            </button>
          </div>

          {results && (
            <div className="space-y-6">
              {/* Database Status */}
              <div className={`p-4 rounded-lg border ${
                results.database.connected ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
              }`}>
                <div className="flex items-center space-x-3">
                  {getStatusIcon(results.database.connected)}
                  <div>
                    <h3 className="font-semibold">Database Connection</h3>
                    <p className="text-sm text-gray-600">
                      {results.database.connected ? 'Connected successfully' : results.database.error}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tables Status */}
              <div>
                <h3 className="font-semibold mb-3">Tables Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.entries(results.tables).map(([name, table]) => (
                    <div key={name} className={`p-3 rounded-lg border ${
                      table.exists ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium capitalize">{name}</h4>
                          <p className="text-sm text-gray-600">
                            {table.exists ? `${table.count} records` : table.error}
                          </p>
                        </div>
                        {getStatusIcon(table.exists)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* APIs Status */}
              <div>
                <h3 className="font-semibold mb-3">API Endpoints Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.entries(results.apis).map(([name, api]) => (
                    <div key={name} className={`p-3 rounded-lg border ${
                      api.working ? 'border-green-200 bg-green-50' : 'border-yellow-200 bg-yellow-50'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium capitalize">{name} API</h4>
                          <p className="text-sm text-gray-600">
                            {api.working ? 'Working' : api.error}
                          </p>
                        </div>
                        {api.working ? getStatusIcon(true) : getWarningIcon()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-semibold mb-2">Summary</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Tables:</span> {results.summary.workingTables}/{results.summary.totalTables} working
                  </div>
                  <div>
                    <span className="font-medium">APIs:</span> {results.summary.workingAPIs}/{results.summary.totalAPIs} working
                  </div>
                </div>
              </div>

              {/* Success Message */}
              {results.database.connected && results.summary.workingTables === 5 && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <div>
                      <h3 className="font-semibold text-green-900">All Systems Ready!</h3>
                      <p className="text-green-700">
                        Your database is fully connected and all tables are ready.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Next Steps */}
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <h3 className="font-semibold mb-2">Next Steps</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Visit <a href="/admin" className="text-blue-600 underline">Admin Dashboard</a></li>
                  <li>• Test CRUD operations on each property type</li>
                  <li>• Verify search and filter functionality</li>
                  <li>• Check that all admin pages load correctly</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
