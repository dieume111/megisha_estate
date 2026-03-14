'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Home, 
  Building, 
  MapPin, 
  Users, 
  TrendingUp, 
  DollarSign, 
  Eye, 
  Edit2, 
  Trash2, 
  Plus,
  BarChart3,
  PieChart,
  Activity,
  Settings,
  LogOut,
  Bell,
  Search,
  Filter,
  Download,
  Upload,
  Calendar,
  Clock,
  Star,
  Award,
  Target,
  Zap,
  Shield,
  FileText,
  Database,
  Globe,
  Heart,
  MessageSquare,
  Mail,
  Phone,
  ArrowRight
} from 'lucide-react';

interface DashboardStats {
  totalProperties: number;
  availableProperties: number;
  soldProperties: number;
  pendingProperties: number;
  totalRevenue: number;
  monthlyRevenue: number;
  totalViews: number;
  newInquiries: number;
}

interface RecentActivity {
  id: number;
  type: 'property_added' | 'property_sold' | 'inquiry_received' | 'property_updated';
  title: string;
  description: string;
  timestamp: string;
  icon: any;
  color: string;
}

interface PropertyType {
  name: string;
  icon: any;
  count: number;
  color: string;
  route: string;
  description: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({
    totalProperties: 0,
    availableProperties: 0,
    soldProperties: 0,
    pendingProperties: 0,
    totalRevenue: 0,
    monthlyRevenue: 0,
    totalViews: 0,
    newInquiries: 0
  });

  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [propertyTypes, setPropertyTypes] = useState<PropertyType[]>([
    {
      name: 'Plots',
      icon: MapPin,
      count: 0,
      color: 'from-green-500 to-emerald-600',
      route: '/admin/plots',
      description: 'Land and plot properties'
    },
    {
      name: 'Residentials',
      icon: Home,
      count: 0,
      color: 'from-blue-500 to-indigo-600',
      route: '/admin/residentials',
      description: 'Houses and apartments'
    },
    {
      name: 'Commercial',
      icon: Building,
      count: 0,
      color: 'from-purple-500 to-pink-600',
      route: '/admin/commercial',
      description: 'Office and retail spaces'
    },
    {
      name: 'Villas',
      icon: Award,
      count: 0,
      color: 'from-yellow-500 to-orange-600',
      route: '/admin/villas',
      description: 'Luxury villa properties'
    },
    {
      name: 'Apartments',
      icon: Building,
      count: 0,
      color: 'from-cyan-500 to-teal-600',
      route: '/admin/apartments',
      description: 'Apartment complexes'
    }
  ]);

  useEffect(() => {
    // Load real data from APIs
    const loadDashboardData = async () => {
      try {
        // Fetch data from all property APIs
        const [plotsResponse, residentialsResponse, commercialResponse, villasResponse, apartmentsResponse] = await Promise.all([
          fetch('/api/plots'),
          fetch('/api/residentials'),
          fetch('/api/commercial'),
          fetch('/api/villas'),
          fetch('/api/apartments')
        ]);

        let plotsData = [];
        let residentialsData = [];
        let commercialData = [];
        let villasData = [];
        let apartmentsData = [];

        // Get plots data
        if (plotsResponse.ok) {
          plotsData = await plotsResponse.json();
        }

        // Get residentials data
        if (residentialsResponse.ok) {
          residentialsData = await residentialsResponse.json();
        }

        // Get commercial data
        if (commercialResponse.ok) {
          commercialData = await commercialResponse.json();
        }

        // Get villas data
        if (villasResponse.ok) {
          villasData = await villasResponse.json();
        }

        // Get apartments data
        if (apartmentsResponse.ok) {
          apartmentsData = await apartmentsResponse.json();
        }

        // Calculate stats
        const totalProperties = plotsData.length + residentialsData.length + commercialData.length + villasData.length + apartmentsData.length;
        const availableProperties = [
          ...plotsData.filter((p: any) => p.status === 'available'),
          ...residentialsData.filter((p: any) => p.status === 'available'),
          ...commercialData.filter((p: any) => p.status === 'available'),
          ...villasData.filter((p: any) => p.status === 'available'),
          ...apartmentsData.filter((p: any) => p.status === 'available')
        ].length;
        const soldProperties = [
          ...plotsData.filter((p: any) => p.status === 'sold'),
          ...residentialsData.filter((p: any) => p.status === 'sold'),
          ...commercialData.filter((p: any) => p.status === 'sold'),
          ...villasData.filter((p: any) => p.status === 'sold'),
          ...apartmentsData.filter((p: any) => p.status === 'sold')
        ].length;
        const pendingProperties = [
          ...plotsData.filter((p: any) => p.status === 'pending'),
          ...residentialsData.filter((p: any) => p.status === 'pending'),
          ...commercialData.filter((p: any) => p.status === 'pending'),
          ...villasData.filter((p: any) => p.status === 'pending'),
          ...apartmentsData.filter((p: any) => p.status === 'pending')
        ].length;

        // Calculate revenue (sum of all sold properties)
        const soldPropertiesAll = [
          ...plotsData.filter((p: any) => p.status === 'sold'),
          ...residentialsData.filter((p: any) => p.status === 'sold'),
          ...commercialData.filter((p: any) => p.status === 'sold'),
          ...villasData.filter((p: any) => p.status === 'sold'),
          ...apartmentsData.filter((p: any) => p.status === 'sold')
        ];
        const totalRevenue = soldPropertiesAll.reduce((sum: number, p: any) => sum + (p.price || 0), 0);

        // Update property types with real counts
        const updatedPropertyTypes = propertyTypes.map(type => {
          switch (type.name) {
            case 'Plots':
              return { ...type, count: plotsData.length };
            case 'Residentials':
              return { ...type, count: residentialsData.length };
            case 'Commercial':
              return { ...type, count: commercialData.length };
            case 'Villas':
              return { ...type, count: villasData.length };
            case 'Apartments':
              return { ...type, count: apartmentsData.length };
            default:
              return type;
          }
        });

        setStats({
          totalProperties,
          availableProperties,
          soldProperties,
          pendingProperties,
          totalRevenue,
          monthlyRevenue: Math.floor(totalRevenue * 0.1), // Estimate 10% of total as monthly
          totalViews: Math.floor(Math.random() * 5000) + 10000, // Mock data
          newInquiries: Math.floor(Math.random() * 20) + 10 // Mock data
        });

        // Update property types
        setPropertyTypes(updatedPropertyTypes);

        // Set recent activity (mock data for now)
        setRecentActivity([
          {
            id: 1,
            type: 'property_added',
            title: 'New Plot Added',
            description: 'Modern Family Home in Kacyiru',
            timestamp: '2 hours ago',
            icon: Plus,
            color: 'text-green-500'
          },
          {
            id: 2,
            type: 'property_sold',
            title: 'Property Sold',
            description: 'Luxury Villa in Nyarutarama',
            timestamp: '5 hours ago',
            icon: DollarSign,
            color: 'text-blue-500'
          },
          {
            id: 3,
            type: 'inquiry_received',
            title: 'New Inquiry',
            description: 'Interested in Commercial Property',
            timestamp: '1 day ago',
            icon: MessageSquare,
            color: 'text-purple-500'
          },
          {
            id: 4,
            type: 'property_updated',
            title: 'Property Updated',
            description: 'Price updated for Apartment Complex',
            timestamp: '2 days ago',
            icon: Edit2,
            color: 'text-orange-500'
          }
        ]);

      } catch (error) {
        console.error('Error loading dashboard data:', error);
        // Fallback to mock data if APIs fail
        setStats({
          totalProperties: 40,
          availableProperties: 28,
          soldProperties: 8,
          pendingProperties: 4,
          totalRevenue: 450000000,
          monthlyRevenue: 45000000,
          totalViews: 12500,
          newInquiries: 23
        });
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('rw-RW', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Database className="w-8 h-8 text-blue-600 animate-pulse" />
            </div>
          </div>
          <p className="mt-4 text-gray-600 font-medium">Loading Admin Dashboard...</p>
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
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                  <p className="text-sm text-gray-500">Megisha Estate Management System</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search properties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64 px-4 py-2 pl-10 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              </div>
              
              <button className="relative p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#771D1D] rounded-full"></span>
              </button>
              
              <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all">
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
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
              onClick={(e) => {
                e.preventDefault();
                router.push('/admin');
              }}
              className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 rounded-lg font-medium"
            >
              <BarChart3 className="w-5 h-5" />
              <span>Dashboard</span>
            </a>
            
            <div className="pt-4 pb-2">
              <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Properties</h3>
            </div>
            
            {propertyTypes.map((type) => (
              <a
                key={type.name}
                href={type.route}
                onClick={(e) => {
                  e.preventDefault();
                  router.push(type.route);
                }}
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <type.icon className="w-5 h-5 text-gray-500" />
                <div className="flex-1">
                  <div className="font-medium">{type.name}</div>
                  <div className="text-xs text-gray-500">{type.count} properties</div>
                </div>
              </a>
            ))}
            
            <div className="pt-4 pb-2">
              <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Management</h3>
            </div>
            
            <a
              href="/admin/inquiries"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <MessageSquare className="w-5 h-5 text-gray-500" />
              <span>Inquiries</span>
              <span className="ml-auto bg-[#771D1D]/10 text-[#771D1D] text-xs px-2 py-1 rounded-full">23</span>
            </a>
            
            <a
              href="/admin/users"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Users className="w-5 h-5 text-gray-500" />
              <span>Users</span>
            </a>
            
            <div className="pt-4 pb-2">
              <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">System</h3>
            </div>
            
            <a
              href="/admin/database-test"
              onClick={(e) => {
                e.preventDefault();
                router.push('/admin/database-test');
              }}
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Database className="w-5 h-5 text-gray-500" />
              <div className="flex-1">
                <div className="font-medium">Database Test</div>
                <div className="text-xs text-gray-500">Check connection</div>
              </div>
            </a>
            
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
              }}
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Settings className="w-5 h-5 text-gray-500" />
              <span>Settings</span>
            </a>
          </nav>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm text-green-600 font-medium">+12%</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{stats.totalProperties}</h3>
              <p className="text-gray-500 text-sm">Total Properties</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm text-green-600 font-medium">+8%</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{stats.availableProperties}</h3>
              <p className="text-gray-500 text-sm">Available</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm text-green-600 font-medium">+24%</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</h3>
              <p className="text-gray-500 text-sm">Total Revenue</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-[#771D1D] rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm text-green-600 font-medium">+5</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{stats.newInquiries}</h3>
              <p className="text-gray-500 text-sm">New Inquiries</p>
            </div>
          </motion.div>

          {/* Property Types Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">Property Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {propertyTypes.map((type, index) => (
                <motion.a
                  key={type.name}
                  href={type.route}
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(type.route);
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${type.color} rounded-lg flex items-center justify-center`}>
                      <type.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold text-gray-900">{type.count}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{type.name}</h3>
                  <p className="text-gray-500 text-sm mb-4">{type.description}</p>
                  <div className="flex items-center text-blue-600 font-medium">
                    <span>Manage</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className={`w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center ${activity.color}`}>
                      <activity.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{activity.title}</h4>
                      <p className="text-sm text-gray-500">{activity.description}</p>
                      <p className="text-xs text-gray-400 mt-1">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all">
                  <Plus className="w-4 h-4" />
                  <span>Add Property</span>
                </button>
                <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all">
                  <Download className="w-4 h-4" />
                  <span>Export Data</span>
                </button>
                <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all">
                  <Upload className="w-4 h-4" />
                  <span>Import Data</span>
                </button>
                <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-orange-500 to-[#771D1D] text-white rounded-lg hover:from-orange-600 hover:to-[#771D1D] transition-all">
                  <FileText className="w-4 h-4" />
                  <span>Generate Report</span>
                </button>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
