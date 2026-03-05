'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, MapPin, Home, DollarSign, Tag, Eye, Search, Filter, Download, Upload, BarChart3, Bed, Bath, Building, Users, Settings, Bell, LogOut, Award } from 'lucide-react';

interface Residential {
  id: number;
  title: string;
  description: string;
  location: string;
  beds: number;
  baths: number;
  area: string;
  price: number;
  currency: string;
  image_url: string;
  featured: boolean;
  status: 'available' | 'sold' | 'pending';
  amenities: string[];
  created_at: string;
  updated_at: string;
}

export default function AdminResidentialsPage() {
  const [residentials, setResidentials] = useState<Residential[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingResidential, setEditingResidential] = useState<Residential | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [formData, setFormData] = useState<Partial<Residential>>({
    title: '',
    description: '',
    location: '',
    beds: 0,
    baths: 0,
    area: '',
    price: 0,
    currency: 'RWF',
    image_url: '',
    featured: false,
    status: 'available',
    amenities: []
  });

  useEffect(() => {
    fetchResidentials();
  }, []);

  const fetchResidentials = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/residentials');
      
      if (!response.ok) {
        throw new Error('Failed to fetch residentials');
      }
      
      const data = await response.json();
      setResidentials(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching residentials:', err);
      // Fallback to mock data if API fails
      const mockData: Residential[] = [
        {
          id: 1,
          title: "Modern Family Home",
          description: "Beautiful family home with garden and garage",
          location: "Kigali, Kacyiru",
          beds: 4,
          baths: 3,
          area: "250 sqm",
          price: 45000000,
          currency: "RWF",
          image_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
          featured: true,
          status: "available",
          amenities: ["Garden", "Garage", "Security", "Modern Kitchen"],
          created_at: "2024-01-15T10:30:00Z",
          updated_at: "2024-01-15T10:30:00Z"
        },
        {
          id: 2,
          title: "Cozy Apartment",
          description: "Perfect starter home in quiet neighborhood",
          location: "Kigali, Nyamirambo",
          beds: 2,
          baths: 1,
          area: "120 sqm",
          price: 25000000,
          currency: "RWF",
          image_url: "https://images.unsplash.com/photo-1600607217924-79b2d4e4c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
          featured: false,
          status: "available",
          amenities: ["Parking", "Security", "Balcony"],
          created_at: "2024-01-14T14:20:00Z",
          updated_at: "2024-01-14T14:20:00Z"
        }
      ];
      setResidentials(mockData);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (residential: Residential) => {
    setEditingResidential(residential);
    setFormData(residential);
  };

  const handleCreate = () => {
    setIsCreating(true);
    setFormData({
      title: '',
      description: '',
      location: '',
      beds: 0,
      baths: 0,
      area: '',
      price: 0,
      currency: 'RWF',
      image_url: '',
      featured: false,
      status: 'available',
      amenities: []
    });
  };

  const handleSave = async () => {
    try {
      const url = editingResidential ? `/api/residentials/${editingResidential.id}` : '/api/residentials';
      const method = editingResidential ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save residential');
      }

      await fetchResidentials();
      setEditingResidential(null);
      setIsCreating(false);
      setFormData({});
    } catch (err) {
      console.error('Error saving residential:', err);
      alert('Failed to save residential');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this residential property?')) {
      return;
    }

    try {
      const response = await fetch(`/api/residentials/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete residential');
      }

      await fetchResidentials();
    } catch (err) {
      console.error('Error deleting residential:', err);
      alert('Failed to delete residential');
    }
  };

  const handleCancel = () => {
    setEditingResidential(null);
    setIsCreating(false);
    setFormData({});
  };

  const handleAmenityChange = (index: number, value: string) => {
    const amenities = [...(formData.amenities || [])];
    if (value) {
      amenities[index] = value;
    } else {
      amenities.splice(index, 1);
    }
    setFormData({ ...formData, amenities });
  };

  const addAmenity = () => {
    const amenities = [...(formData.amenities || [])];
    amenities.push('');
    setFormData({ ...formData, amenities });
  };

  const formatCurrency = (price: number, currency: string) => {
    return new Intl.NumberFormat('rw-RW', {
      style: 'currency',
      currency: currency === 'RWF' ? 'RWF' : 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const filteredResidentials = residentials.filter(residential => {
    const matchesSearch = residential.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         residential.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || residential.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Home className="w-8 h-8 text-blue-600 animate-pulse" />
            </div>
          </div>
          <p className="mt-4 text-gray-600 font-medium">Loading Residentials Management...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-lg border-b border-gray-200"
      >
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Residentials Management</h1>
                  <p className="text-sm text-gray-500">Manage houses and apartment properties</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search residentials..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64 px-4 py-2 pl-10 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              </div>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="available">Available</option>
                <option value="sold">Sold</option>
                <option value="pending">Pending</option>
              </select>
              
              <button className="relative p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              
              <a
                href="/admin"
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all"
              >
                <BarChart3 className="w-4 h-4" />
                <span>Dashboard</span>
              </a>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="flex">
        {/* Sidebar */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="w-64 bg-white shadow-lg h-screen sticky top-0"
        >
          <nav className="p-4 space-y-2">
            <a
              href="/admin"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <BarChart3 className="w-5 h-5 text-gray-500" />
              <span>Dashboard</span>
            </a>
            
            <div className="pt-4 pb-2">
              <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Properties</h3>
            </div>
            
            <a
              href="/admin/plots"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <MapPin className="w-5 h-5 text-gray-500" />
              <span>Plots</span>
            </a>
            
            <a
              href="/admin/residentials"
              className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 rounded-lg font-medium"
            >
              <Home className="w-5 h-5" />
              <div className="flex-1">
                <div className="font-medium">Residentials</div>
                <div className="text-xs text-gray-500">{residentials.length} properties</div>
              </div>
            </a>
            
            <a
              href="/admin/commercial"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Building className="w-5 h-5 text-gray-500" />
              <span>Commercial</span>
            </a>
            
            <a
              href="/admin/villas"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Award className="w-5 h-5 text-gray-500" />
              <span>Villas</span>
            </a>
            
            <a
              href="/admin/apartments"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Building className="w-5 h-5 text-gray-500" />
              <span>Apartments</span>
            </a>
          </nav>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Actions Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Residentials Inventory</h2>
                <p className="text-gray-500 text-sm">Manage your houses and apartment properties</p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
                <button
                  onClick={handleCreate}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Residential</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Create/Edit Form */}
          {(isCreating || editingResidential) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100"
            >
              <h2 className="text-xl font-semibold mb-6">
                {isCreating ? 'Create New Residential' : 'Edit Residential'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={formData.location || ''}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                  <input
                    type="number"
                    value={formData.beds || ''}
                    onChange={(e) => setFormData({ ...formData, beds: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms</label>
                  <input
                    type="number"
                    value={formData.baths || ''}
                    onChange={(e) => setFormData({ ...formData, baths: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Area</label>
                  <input
                    type="text"
                    value={formData.area || ''}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 250 sqm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                  <input
                    type="number"
                    value={formData.price || ''}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                  <select
                    value={formData.currency || 'RWF'}
                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="RWF">RWF</option>
                    <option value="USD">USD</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={formData.status || 'available'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="available">Available</option>
                    <option value="sold">Sold</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                  <input
                    type="url"
                    value={formData.image_url || ''}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
                  <div className="space-y-2">
                    {(formData.amenities || []).map((amenity, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={amenity}
                          onChange={(e) => handleAmenityChange(index, e.target.value)}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g., Swimming Pool, Garden, Garage"
                        />
                        <button
                          type="button"
                          onClick={() => handleAmenityChange(index, '')}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addAmenity}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Add Amenity
                    </button>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.featured || false}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium text-gray-700">Featured Property</span>
                  </label>
                </div>
              </div>
              
              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Residential</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center space-x-2 px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* Residentials Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
          >
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Property Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Beds/Baths
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredResidentials.map((residential) => (
                    <tr key={residential.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{residential.title}</div>
                          {residential.featured && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                              Featured
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                          {residential.location}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            <Bed className="w-3 h-3 mr-1 text-purple-500" />
                            <span>{residential.beds}</span>
                          </div>
                          <div className="flex items-center">
                            <Bath className="w-3 h-3 mr-1 text-cyan-500" />
                            <span>{residential.baths}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {formatCurrency(residential.price, residential.currency)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          residential.status === 'available' ? 'bg-green-100 text-green-800' :
                          residential.status === 'sold' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {residential.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button
                            onClick={() => window.open(`/properties/residentials`, '_blank')}
                            className="text-blue-600 hover:text-blue-900 p-1"
                            title="View on website"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(residential)}
                            className="text-indigo-600 hover:text-indigo-900 p-1"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(residential.id)}
                            className="text-red-600 hover:text-red-900 p-1"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
