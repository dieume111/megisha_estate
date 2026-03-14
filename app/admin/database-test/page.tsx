'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Database, CheckCircle, XCircle, AlertCircle, RefreshCw, BarChart3, Table, Settings } from 'lucide-react';

interface TestResult {
  database: boolean;
  tables: {
    plots: boolean;
    residentials: boolean;
    commercial: boolean;
    villas: boolean;
    apartments: boolean;
  };
  errors: string[];
}

export default function DatabaseTestPage() {
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastTestTime, setLastTestTime] = useState<string>('');

  const runDatabaseTest = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/test-connection');
      const result = await response.json();
      setTestResult(result);
      setLastTestTime(new Date().toLocaleString());
    } catch (error) {
      console.error('Test failed:', error);
      setTestResult({
        database: false,
        tables: {
          plots: false,
          residentials: false,
          commercial: false,
          villas: false,
          apartments: false
        },
        errors: ['Failed to run database test']
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runDatabaseTest();
  }, []);

  const getStatusIcon = (status: boolean) => {
    return status ? (
      <CheckCircle className="w-5 h-5 text-green-500" />
    ) : (
      <XCircle className="w-5 h-5 text-[#771D1D]" />
    );
  };

  const getStatusColor = (status: boolean) => {
    return status ? 'text-green-600 bg-green-50' : 'text-[#771D1D] bg-[#771D1D]/5';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <Database className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">Database Connection Test</h1>
            </div>
            <button
              onClick={runDatabaseTest}
              disabled={loading}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>{loading ? 'Testing...' : 'Test Again'}</span>
            </button>
          </div>

          {lastTestTime && (
            <div className="mb-6 text-sm text-gray-500">
              Last test: {lastTestTime}
            </div>
          )}

          {testResult && (
            <div className="space-y-6">
              {/* Overall Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`p-6 rounded-lg border-2 ${
                  testResult.database ? 'border-green-200 bg-green-50' : 'border-[#771D1D]/20 bg-[#771D1D]/5'
                }`}>
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(testResult.database)}
                    <div>
                      <h3 className="font-semibold text-lg">Database Connection</h3>
                      <p className="text-sm text-gray-600">
                        {testResult.database ? 'Connected successfully' : 'Connection failed'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-lg border-2 border-gray-200 bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <Table className="w-5 h-5 text-gray-600" />
                    <div>
                      <h3 className="font-semibold text-lg">Tables Status</h3>
                      <p className="text-sm text-gray-600">
                        {Object.values(testResult.tables).filter(Boolean).length}/5 tables ready
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Individual Table Status */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Individual Table Status
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(testResult.tables).map(([tableName, status]) => (
                    <motion.div
                      key={tableName}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 }}
                      className={`p-4 rounded-lg border ${getStatusColor(status)}`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold capitalize">{tableName}</h4>
                          <p className="text-sm">
                            {status ? 'Ready' : 'Not found'}
                          </p>
                        </div>
                        {getStatusIcon(status)}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Errors */}
              {testResult.errors.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2 text-[#771D1D]" />
                    Errors Found
                  </h3>
                  <div className="space-y-2">
                    {testResult.errors.map((error, index) => (
                      <div key={index} className="p-3 bg-[#771D1D]/5 border border-[#771D1D]/20 rounded-lg">
                        <p className="text-sm text-[#771D1D]">{error}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Success Message */}
              {testResult.database && Object.values(testResult.tables).every(Boolean) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-6 bg-green-50 border border-green-200 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <div>
                      <h3 className="font-semibold text-green-900">All Systems Ready!</h3>
                      <p className="text-green-700">
                        Your database is fully connected and all tables are ready for use.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Next Steps */}
              <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-3">Next Steps</h3>
                <div className="space-y-2 text-sm text-blue-700">
                  <p>• Visit <a href="/admin" className="underline">/admin</a> to see the dashboard with real data</p>
                  <p>• Test CRUD operations on each property type</p>
                  <p>• Verify search and filter functionality</p>
                  <p>• Check that all admin pages load correctly</p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
