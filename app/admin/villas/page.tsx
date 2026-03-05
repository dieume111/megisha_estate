'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, MapPin, Home, DollarSign, Tag, Eye, Search, Filter, Download, Upload, BarChart3, Building, Users, Settings, Bell, LogOut, Award, Star, Car, Shield } from 'lucide-react';

interface Villa {
  id: number;
  title: string;
  description: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  land_area: string;
  price: number;
  currency: string;
  image_url: string;
  featured: boolean;
  status: 'available' | 'sold' | 'pending';
  amenities: string[];
  luxury_features: string[];
  created_at: string;
  updated_at: string;
}

export default function AdminVillasPage() {
  const [villas, setVillas] = useState<Villa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingVilla, setEditingVilla] = useState<Villa | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [formData, setFormData] = useState<Partial<Villa>>({
    title: '',
    description: '',
    location: '',
    bedrooms: 0,
    bathrooms: 0,
    area: '',
    land_area: '',
    price: 0,
    currency: 'RWF',
    image_url: '',
    featured: false,
    status: 'available',
    amenities: [],
    luxury_features: []
  });

  useEffect(() => {
    fetchVillas();
  }, []);

  const fetchVillas = async () => {
    try {
      setLoading(true);
      // Try to fetch from API first
      const response = await fetch('/api/villas');
      
      if (response.ok) {
        const data = await response.json();
        setVillas(data);
        setError(null);
      } else {
        throw new Error('API not available');
      }
    } catch (err) {
      console.log('Villas API not available, using mock data');
      // Fallback to mock data
      const mockData: Villa[] = [
        {
          id: 1,
          title: "Luxury Villa with Pool",
          description: "Stunning luxury villa with panoramic views and premium finishes",
          location: "Kigali, Nyarutarama",
          bedrooms: 6,
          bathrooms: 5,
          area: "450 sqm",
          land_area: "1200 sqm",
          price: 120000000,
          currency: "RWF",
          image_url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
          featured: true,
          status: "available",
          amenities: ["Swimming Pool", "Garden", "Garage", "Security", "Gym"],
          luxury_features: ["Home Theater", "Wine Cellar", "Smart Home", "Rooftop Terrace"],
          created_at: "2024-01-15T10:30:00Z",
          updated_at: "2024-01-15T10:30:00Z"
        },
        {
          id: 2,
          title: "Modern Executive Villa",
          description: "Contemporary executive villa with state-of-the-art facilities",
          location: "Kigali, Kacyiru",
          bedrooms: 5,
          bathrooms: 4,
          area: "380 sqm",
          land_area: "800 sqm",
          price: 95000000,
          currency: "RWF",
          image_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
          featured: false,
          status: "available",
          amenities: ["Garden", "Double Garage", "Security", "Modern Kitchen"],
          luxury_features: ["Home Office", "Spa Bathroom", "Outdoor Kitchen"],
          created_at: "2024-01-14T14:20:00Z",
          updated_at: "2024-01-14T14:20:00Z"
        }
      ];
      setVillas(mockData);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (villa: Villa) => {
    setEditingVilla(villa);
    setFormData(villa);
  };

  const handleCreate = () => {
    setIsCreating(true);
    setFormData({
      title: '',
      description: '',
      location: '',
      bedrooms: 0,
      bathrooms: 0,
      area: '',
      land_area: '',
      price: 0,
      currency: 'RWF',
      image_url: '',
      featured: false,
      status: 'available',
      amenities: [],
      luxury_features: []
    });
  };

  const handleSave = async () => {
    try {
      const url = editingVilla ? `/api/villas/${editingVilla.id}` : '/api/villas';
      const method = editingVilla ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchVillas();
        setEditingVilla(null);
        setIsCreating(false);
        setFormData({});
      } else {
        // Fallback to mock save if API fails
        if (editingVilla) {
          setVillas(villas.map(v => v.id === editingVilla.id ? { ...formData, id: editingVilla.id } as Villa : v));
        } else {
          const newVilla = { ...formData, id: Date.now() } as Villa;
          setVillas([...villas, newVilla]);
        }
        setEditingVilla(null);
        setIsCreating(false);
        setFormData({});
      }
    } catch (err) {
      console.error('Error saving villa:', err);
      alert('Failed to save villa');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this villa?')) {
      return;
    }

    try {
      const response = await fetch(`/api/villas/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchVillas();
      } else {
        // Fallback to mock delete if API fails
        setVillas(villas.filter(v => v.id !== id));
      }
    } catch (err) {
      console.error('Error deleting villa:', err);
      alert('Failed to delete villa');
    }
  };

  const handleCancel = () => {
    setEditingVilla(null);
    setIsCreating(false);
    setFormData({});
  };

  const handleAmenityChange = (index: number, value: string, type: 'amenities' | 'luxury_features') => {
    const items = [...(formData[type] || [])];
    if (value) {
      items[index] = value;
    } else {
      items.splice(index, 1);
    }
    setFormData({ ...formData, [type]: items });
  };

  const addAmenity = (type: 'amenities' | 'luxury_features') => {
    const items = [...(formData[type] || [])];
    items.push('');
    setFormData({ ...formData, [type]: items });
  };

  const formatCurrency = (price: number, currency: string) => {
    return new Intl.NumberFormat('rw-RW', {
      style: 'currency',
      currency: currency === 'RWF' ? 'RWF' : 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const filteredVillas = villas.filter(villa => {
    const matchesSearch = villa.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         villa.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || villa.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Award className="w-8 h-8 text-blue-600 animate-pulse" />
            </div>
          </div>
          <p className="mt-4 text-gray-600 font-medium">Loading Villas Management...</p>
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
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Villas Management</h1>
                  <p className="text-sm text-gray-500">Manage luxury villa properties</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search villas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64 px-4 py-2 pl-10 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              </div>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Home className="w-5 h-5 text-gray-500" />
              <span>Residentials</span>
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
              className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-yellow-50 to-orange-50 text-yellow-600 rounded-lg font-medium"
            >
              <Award className="w-5 h-5" />
              <div className="flex-1">
                <div className="font-medium">Villas</div>
                <div className="text-xs text-gray-500">{villas.length} properties</div>
              </div>
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
                <h2 className="text-xl font-bold text-gray-900">Villas Inventory</h2>
                <p className="text-gray-500 text-sm">Manage your luxury villa properties</p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
                <button
                  onClick={handleCreate}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-lg hover:from-yellow-600 hover:to-orange-700 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Villa</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Create/Edit Form */}
          {(isCreating || editingVilla) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100"
            >
              <h2 className="text-xl font-semibold mb-6">
                {isCreating ? 'Create New Villa' : 'Edit Villa'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={formData.location || ''}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                  <input
                    type="number"
                    value={formData.bedrooms || ''}
                    onChange={(e) => setFormData({ ...formData, bedrooms: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms</label>
                  <input
                    type="number"
                    value={formData.bathrooms || ''}
                    onChange={(e) => setFormData({ ...formData, bathrooms: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Building Area</label>
                  <input
                    type="text"
                    value={formData.area || ''}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="e.g., 450 sqm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Land Area</label>
                  <input
                    type="text"
                    value={formData.land_area || ''}
                    onChange={(e) => setFormData({ ...formData, land_area: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="e.g., 1200 sqm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                  <input
                    type="number"
                    value={formData.price || ''}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                  <select
                    value={formData.currency || 'RWF'}
                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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
                          onChange={(e) => handleAmenityChange(index, e.target.value, 'amenities')}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          placeholder="e.g., Swimming Pool, Garden, Garage"
                        />
                        <button
                          type="button"
                          onClick={() => handleAmenityChange(index, '', 'amenities')}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addAmenity('amenities')}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Add Amenity
                    </button>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Luxury Features</label>
                  <div className="space-y-2">
                    {(formData.luxury_features || []).map((feature, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => handleAmenityChange(index, e.target.value, 'luxury_features')}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          placeholder="e.g., Home Theater, Wine Cellar, Smart Home"
                        />
                        <button
                          type="button"
                          onClick={() => handleAmenityChange(index, '', 'luxury_features')}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addAmenity('luxury_features')}
                      className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                    >
                      Add Luxury Feature
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
                    <span className="text-sm font-medium text-gray-700">Featured Villa</span>
                  </label>
                </div>
              </div>
              
              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-lg hover:from-yellow-600 hover:to-orange-700 transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Villa</span>
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

          {/* Villas Table */}
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
                      Villa Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Bedrooms/Bathrooms
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
                  {filteredVillas.map((villa) => (
                    <tr key={villa.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{villa.title}</div>
                          {villa.featured && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                              Featured
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                          {villa.location}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            <Home className="w-3 h-3 mr-1 text-yellow-500" />
                            <span>{villa.bedrooms} beds</span>
                          </div>
                          <div className="flex items-center">
                            <Shield className="w-3 h-3 mr-1 text-blue-500" />
                            <span>{villa.bathrooms} baths</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {formatCurrency(villa.price, villa.currency)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          villa.status === 'available' ? 'bg-green-100 text-green-800' :
                          villa.status === 'sold' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {villa.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button
                            onClick={() => window.open(`/properties/villas`, '_blank')}
                            className="text-blue-600 hover:text-blue-900 p-1"
                            title="View on website"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(villa)}
                            className="text-indigo-600 hover:text-indigo-900 p-1"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(villa.id)}
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
