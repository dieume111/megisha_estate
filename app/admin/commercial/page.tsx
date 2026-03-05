'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, MapPin, Home, DollarSign, Tag, Eye, Search, Filter, Download, Upload, BarChart3, Building, Users, Settings, Bell, LogOut, Square, Car, Briefcase, Award } from 'lucide-react';

interface Commercial {
  id: number;
  title: string;
  description: string;
  location: string;
  area: string;
  price: number;
  currency: string;
  property_type: 'office' | 'retail' | 'warehouse' | 'industrial' | 'mixed';
  floors: number;
  parking_spaces: number;
  image_url: string;
  featured: boolean;
  status: 'available' | 'sold' | 'leased' | 'pending';
  amenities: string[];
  created_at: string;
  updated_at: string;
}

export default function AdminCommercialPage() {
  const [commercial, setCommercial] = useState<Commercial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingCommercial, setEditingCommercial] = useState<Commercial | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [formData, setFormData] = useState<Partial<Commercial>>({
    title: '',
    description: '',
    location: '',
    area: '',
    price: 0,
    currency: 'RWF',
    property_type: 'office',
    floors: 1,
    parking_spaces: 0,
    image_url: '',
    featured: false,
    status: 'available',
    amenities: []
  });

  useEffect(() => {
    fetchCommercial();
  }, []);

  const fetchCommercial = async () => {
    try {
      setLoading(true);
      // Try to fetch from API first
      const response = await fetch('/api/commercial');
      
      if (response.ok) {
        const data = await response.json();
        setCommercial(data);
        setError(null);
      } else {
        throw new Error('API not available');
      }
    } catch (err) {
      console.log('Commercial API not available, using mock data');
      // Fallback to mock data
      const mockData: Commercial[] = [
        {
          id: 1,
          title: "Modern Office Complex",
          description: "Prime office space in city center with modern amenities",
          location: "Kigali, City Center",
          area: "500 sqm",
          price: 85000000,
          currency: "RWF",
          property_type: "office",
          floors: 3,
          parking_spaces: 20,
          image_url: "https://images.unsplash.com/photo-1497366216546-3f970773e440?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
          featured: true,
          status: "available",
          amenities: ["Elevator", "Parking", "Security", "Conference Rooms", "Kitchen"],
          created_at: "2024-01-15T10:30:00Z",
          updated_at: "2024-01-15T10:30:00Z"
        },
        {
          id: 2,
          title: "Retail Space in Shopping Mall",
          description: "High-traffic retail location with excellent visibility",
          location: "Kigali, Kiyovu",
          area: "200 sqm",
          price: 45000000,
          currency: "RWF",
          property_type: "retail",
          floors: 1,
          parking_spaces: 10,
          image_url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
          featured: false,
          status: "available",
          amenities: ["Display Windows", "Storage", "Security", "Parking"],
          created_at: "2024-01-14T14:20:00Z",
          updated_at: "2024-01-14T14:20:00Z"
        }
      ];
      setCommercial(mockData);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (commercial: Commercial) => {
    setEditingCommercial(commercial);
    setFormData(commercial);
  };

  const handleCreate = () => {
    setIsCreating(true);
    setFormData({
      title: '',
      description: '',
      location: '',
      area: '',
      price: 0,
      currency: 'RWF',
      property_type: 'office',
      floors: 1,
      parking_spaces: 0,
      image_url: '',
      featured: false,
      status: 'available',
      amenities: []
    });
  };

  const handleSave = async () => {
    try {
      const url = editingCommercial ? `/api/commercial/${editingCommercial.id}` : '/api/commercial';
      const method = editingCommercial ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchCommercial();
        setEditingCommercial(null);
        setIsCreating(false);
        setFormData({});
      } else {
        // Fallback to mock save if API fails
        if (editingCommercial) {
          setCommercial(commercial.map(c => c.id === editingCommercial.id ? { ...formData, id: editingCommercial.id } as Commercial : c));
        } else {
          const newCommercial = { ...formData, id: Date.now() } as Commercial;
          setCommercial([...commercial, newCommercial]);
        }
        setEditingCommercial(null);
        setIsCreating(false);
        setFormData({});
      }
    } catch (err) {
      console.error('Error saving commercial property:', err);
      alert('Failed to save commercial property');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this commercial property?')) {
      return;
    }

    try {
      const response = await fetch(`/api/commercial/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchCommercial();
      } else {
        // Fallback to mock delete if API fails
        setCommercial(commercial.filter(c => c.id !== id));
      }
    } catch (err) {
      console.error('Error deleting commercial property:', err);
      alert('Failed to delete commercial property');
    }
  };

  const handleCancel = () => {
    setEditingCommercial(null);
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

  const filteredCommercial = commercial.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || property.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Building className="w-8 h-8 text-blue-600 animate-pulse" />
            </div>
          </div>
          <p className="mt-4 text-gray-600 font-medium">Loading Commercial Management...</p>
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
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Commercial Management</h1>
                  <p className="text-sm text-gray-500">Manage office and retail properties</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search commercial properties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64 px-4 py-2 pl-10 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              </div>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="available">Available</option>
                <option value="sold">Sold</option>
                <option value="leased">Leased</option>
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
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Home className="w-5 h-5 text-gray-500" />
              <span>Residentials</span>
            </a>
            
            <a
              href="/admin/commercial"
              className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-600 rounded-lg font-medium"
            >
              <Building className="w-5 h-5" />
              <div className="flex-1">
                <div className="font-medium">Commercial</div>
                <div className="text-xs text-gray-500">{commercial.length} properties</div>
              </div>
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
                <h2 className="text-xl font-bold text-gray-900">Commercial Inventory</h2>
                <p className="text-gray-500 text-sm">Manage your office and retail properties</p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
                <button
                  onClick={handleCreate}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Commercial</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Create/Edit Form */}
          {(isCreating || editingCommercial) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100"
            >
              <h2 className="text-xl font-semibold mb-6">
                {isCreating ? 'Create New Commercial Property' : 'Edit Commercial Property'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={formData.location || ''}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Area</label>
                  <input
                    type="text"
                    value={formData.area || ''}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., 500 sqm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                  <input
                    type="number"
                    value={formData.price || ''}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                  <select
                    value={formData.currency || 'RWF'}
                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="RWF">RWF</option>
                    <option value="USD">USD</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                  <select
                    value={formData.property_type || 'office'}
                    onChange={(e) => setFormData({ ...formData, property_type: e.target.value as any })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="office">Office</option>
                    <option value="retail">Retail</option>
                    <option value="warehouse">Warehouse</option>
                    <option value="industrial">Industrial</option>
                    <option value="mixed">Mixed Use</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Floors</label>
                  <input
                    type="number"
                    value={formData.floors || ''}
                    onChange={(e) => setFormData({ ...formData, floors: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Parking Spaces</label>
                  <input
                    type="number"
                    value={formData.parking_spaces || ''}
                    onChange={(e) => setFormData({ ...formData, parking_spaces: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={formData.status || 'available'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="available">Available</option>
                    <option value="sold">Sold</option>
                    <option value="leased">Leased</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                  <input
                    type="url"
                    value={formData.image_url || ''}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="e.g., Elevator, Parking, Security"
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
                  className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Commercial</span>
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

          {/* Commercial Properties Table */}
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
                      Type
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
                  {filteredCommercial.map((property) => (
                    <tr key={property.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{property.title}</div>
                          {property.featured && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                              Featured
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                          {property.location}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            <Building className="w-3 h-3 mr-1 text-purple-500" />
                            <span>{property.property_type}</span>
                          </div>
                          <div className="flex items-center">
                            <Square className="w-3 h-3 mr-1 text-blue-500" />
                            <span>{property.area}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {formatCurrency(property.price, property.currency)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          property.status === 'available' ? 'bg-green-100 text-green-800' :
                          property.status === 'sold' ? 'bg-red-100 text-red-800' :
                          property.status === 'leased' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {property.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button
                            onClick={() => window.open(`/properties/commercial`, '_blank')}
                            className="text-blue-600 hover:text-blue-900 p-1"
                            title="View on website"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(property)}
                            className="text-indigo-600 hover:text-indigo-900 p-1"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(property.id)}
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
