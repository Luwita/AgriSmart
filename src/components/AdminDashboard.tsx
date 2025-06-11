import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Building, 
  Sprout, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Settings,
  Shield,
  Database,
  Activity,
  Globe,
  MessageCircle,
  Package,
  Cpu,
  DollarSign,
  Calendar,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  RefreshCw,
  MapPin,
  Star,
  Clock,
  Award,
  Target,
  Zap,
  Lock,
  Bell,
  FileText,
  Server,
  HardDrive,
  Layers,
  Save,
  X,
  Wifi,
  Droplets,
  Thermometer,
  Wind,
  Cloud,
  Truck,
  Leaf
} from 'lucide-react';
import { adminAPI } from '../services/api';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [userFilters, setUserFilters] = useState({
    role: 'all',
    province: 'all',
    status: 'all'
  });
  
  // Additional state for managing different entities
  const [farms, setFarms] = useState<any[]>([]);
  const [crops, setCrops] = useState<any[]>([]);
  const [devices, setDevices] = useState<any[]>([]);
  const [inventory, setInventory] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [systemHealth, setSystemHealth] = useState<any>(null);
  
  // Modal states
  const [showUserModal, setShowUserModal] = useState(false);
  const [showFarmModal, setShowFarmModal] = useState(false);
  const [showCropModal, setShowCropModal] = useState(false);
  const [showDeviceModal, setShowDeviceModal] = useState(false);
  const [showInventoryModal, setShowInventoryModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [modalMode, setModalMode] = useState<'view' | 'edit' | 'create'>('view');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load dashboard stats
      const dashboardResponse = await adminAPI.getDashboard();
      setStats(dashboardResponse.data.stats);
      
      // Load users
      const usersResponse = await adminAPI.getUsers();
      setUsers(usersResponse.data.users);
      
      // Load analytics
      const analyticsResponse = await adminAPI.getAnalytics();
      setAnalytics(analyticsResponse.data.analytics);
      
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      
      // Fallback to mock data if API fails
      const mockStats = {
        users: {
          total: 1247,
          farmers: 1089,
          extensionOfficers: 45,
          cooperatives: 23,
          newThisMonth: 156
        },
        farms: {
          total: 892,
          totalArea: 45678,
          byProvince: [
            { _id: 'Lusaka Province', count: 234, totalArea: 12456 },
            { _id: 'Central Province', count: 189, totalArea: 9876 },
            { _id: 'Eastern Province', count: 156, totalArea: 8234 },
            { _id: 'Copperbelt Province', count: 134, totalArea: 7123 },
            { _id: 'Southern Province', count: 179, totalArea: 7989 }
          ]
        },
        crops: {
          total: 2456,
          byCrop: [
            { _id: 'Maize', count: 1234, totalArea: 23456 },
            { _id: 'Soybeans', count: 567, totalArea: 8901 },
            { _id: 'Groundnuts', count: 345, totalArea: 4567 },
            { _id: 'Sunflower', count: 234, totalArea: 3456 },
            { _id: 'Cotton', count: 76, totalArea: 1234 }
          ],
          totalYield: 156789
        },
        iot: {
          total: 456,
          online: 389,
          byType: [
            { _id: 'Soil Monitor', count: 156 },
            { _id: 'Weather Monitor', count: 89 },
            { _id: 'Irrigation System', count: 67 },
            { _id: 'Pest Monitor', count: 45 },
            { _id: 'Aerial Monitor', count: 23 }
          ]
        },
        community: {
          totalPosts: 2345,
          totalReplies: 5678,
          activeUsers: 456
        },
        inventory: {
          totalItems: 12456,
          totalValue: 2345678,
          lowStock: 234
        }
      };

      const mockUsers = [
        {
          _id: '1',
          name: 'James Mwanza',
          email: 'james@example.com',
          role: 'farmer',
          farmProfile: {
            location: 'Chongwe',
            province: 'Lusaka Province',
            totalArea: 25
          },
          stats: {
            reputation: 245,
            postsCreated: 23
          },
          isActive: true,
          createdAt: '2024-01-15',
          lastLogin: '2024-12-15'
        },
        {
          _id: '2',
          name: 'Mary Banda',
          email: 'mary@example.com',
          role: 'extension_officer',
          farmProfile: {
            location: 'Lusaka',
            province: 'Lusaka Province'
          },
          stats: {
            reputation: 567,
            postsCreated: 89
          },
          isActive: true,
          createdAt: '2023-08-20',
          lastLogin: '2024-12-14'
        }
      ];
      
      setStats(mockStats);
      setUsers(mockUsers);
    } finally {
      setLoading(false);
    }
  };

  const handleUserAction = async (userId: string, action: string) => {
    try {
      switch (action) {
        case 'deactivate':
          await adminAPI.deactivateUser(userId);
          break;
        case 'activate':
          await adminAPI.updateUser(userId, { isActive: true });
          break;
      }
      loadDashboardData();
    } catch (error) {
      console.error('Error performing user action:', error);
    }
  };
  
  const loadFarms = async () => {
    try {
      // In a real implementation, this would call an admin API endpoint
      // For now, we'll use mock data
      setFarms([
        {
          _id: '1',
          name: 'Mwanza Family Farm',
          owner: { name: 'James Mwanza' },
          location: 'Chongwe District',
          province: 'Lusaka Province',
          totalArea: 25,
          farmingType: 'Mixed farming',
          isActive: true
        },
        {
          _id: '2',
          name: 'Banda Cooperative',
          owner: { name: 'Mary Banda' },
          location: 'Kafue District',
          province: 'Lusaka Province',
          totalArea: 120,
          farmingType: 'Commercial',
          isActive: true
        }
      ]);
    } catch (error) {
      console.error('Error loading farms:', error);
    }
  };
  
  const loadCrops = async () => {
    try {
      // In a real implementation, this would call an admin API endpoint
      setCrops([
        {
          _id: '1',
          name: 'Maize',
          variety: 'SC627',
          farm: { name: 'Mwanza Family Farm' },
          owner: { name: 'James Mwanza' },
          area: 10,
          plantingDate: '2024-11-15',
          status: 'excellent',
          health: 92,
          isActive: true
        },
        {
          _id: '2',
          name: 'Soybeans',
          variety: 'Soprano',
          farm: { name: 'Mwanza Family Farm' },
          owner: { name: 'James Mwanza' },
          area: 8,
          plantingDate: '2024-12-01',
          status: 'good',
          health: 87,
          isActive: true
        }
      ]);
    } catch (error) {
      console.error('Error loading crops:', error);
    }
  };
  
  const loadDevices = async () => {
    try {
      // In a real implementation, this would call an admin API endpoint
      setDevices([
        {
          _id: '1',
          name: 'Soil Sensor A1',
          type: 'Soil Monitor',
          farm: { name: 'Mwanza Family Farm' },
          owner: { name: 'James Mwanza' },
          status: 'online',
          battery: 87,
          lastUpdate: '2 minutes ago',
          isActive: true
        },
        {
          _id: '2',
          name: 'Weather Station B1',
          type: 'Weather Monitor',
          farm: { name: 'Mwanza Family Farm' },
          owner: { name: 'James Mwanza' },
          status: 'online',
          battery: 92,
          lastUpdate: '1 minute ago',
          isActive: true
        }
      ]);
    } catch (error) {
      console.error('Error loading devices:', error);
    }
  };
  
  const loadInventory = async () => {
    try {
      // In a real implementation, this would call an admin API endpoint
      setInventory([
        {
          _id: '1',
          name: 'D-Compound Fertilizer',
          category: 'fertilizers',
          farm: { name: 'Mwanza Family Farm' },
          owner: { name: 'James Mwanza' },
          quantity: 25,
          unit: 'bags',
          status: 'in_stock',
          isActive: true
        },
        {
          _id: '2',
          name: 'SC627 Maize Seeds',
          category: 'seeds',
          farm: { name: 'Mwanza Family Farm' },
          owner: { name: 'James Mwanza' },
          quantity: 15,
          unit: 'bags',
          status: 'in_stock',
          isActive: true
        }
      ]);
    } catch (error) {
      console.error('Error loading inventory:', error);
    }
  };
  
  const loadPosts = async () => {
    try {
      // In a real implementation, this would call an admin API endpoint
      setPosts([
        {
          _id: '1',
          title: 'Best practices for fall armyworm control?',
          author: { name: 'James Mwanza' },
          category: 'pests',
          views: 45,
          replies: 1,
          likes: 0,
          status: 'active',
          createdAt: '2024-12-10',
          isActive: true
        },
        {
          _id: '2',
          title: 'FRA maize purchase program 2024-2025',
          author: { name: 'Mary Banda' },
          category: 'market',
          views: 120,
          replies: 0,
          likes: 1,
          status: 'pinned',
          createdAt: '2024-12-08',
          isActive: true
        }
      ]);
    } catch (error) {
      console.error('Error loading posts:', error);
    }
  };
  
  const loadSystemHealth = async () => {
    try {
      // In a real implementation, this would call an admin API endpoint
      setSystemHealth({
        database: {
          status: 'connected',
          responseTime: '< 50ms',
          connections: 5
        },
        api: {
          status: 'healthy',
          uptime: '99.9%',
          requestsPerMinute: 150
        },
        storage: {
          used: '2.3GB',
          available: '47.7GB',
          usage: '4.6%'
        },
        performance: {
          cpuUsage: '12%',
          memoryUsage: '34%',
          diskUsage: '15%'
        },
        lastChecked: new Date()
      });
    } catch (error) {
      console.error('Error loading system health:', error);
    }
  };
  
  // Load data when tab changes
  useEffect(() => {
    switch (activeTab) {
      case 'farms':
        loadFarms();
        break;
      case 'crops':
        loadCrops();
        break;
      case 'devices':
        loadDevices();
        break;
      case 'inventory':
        loadInventory();
        break;
      case 'content':
        loadPosts();
        break;
      case 'system':
        loadSystemHealth();
        break;
    }
  }, [activeTab]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = userFilters.role === 'all' || user.role === userFilters.role;
    const matchesProvince = userFilters.province === 'all' || 
                           user.farmProfile?.province === userFilters.province;
    const matchesStatus = userFilters.status === 'all' || 
                         (userFilters.status === 'active' ? user.isActive : !user.isActive);
    
    return matchesSearch && matchesRole && matchesProvince && matchesStatus;
  });
  
  // Helper function to open modal with selected item
  const openModal = (type: string, item: any = null, mode: 'view' | 'edit' | 'create' = 'view') => {
    setSelectedItem(item);
    setModalMode(mode);
    
    switch (type) {
      case 'user':
        setShowUserModal(true);
        break;
      case 'farm':
        setShowFarmModal(true);
        break;
      case 'crop':
        setShowCropModal(true);
        break;
      case 'device':
        setShowDeviceModal(true);
        break;
      case 'inventory':
        setShowInventoryModal(true);
        break;
      case 'post':
        setShowPostModal(true);
        break;
    }
  };
  
  // Function to handle post moderation
  const moderatePost = async (postId: string, status: string, reason: string) => {
    try {
      await adminAPI.moderatePost(postId, { status, reason });
      loadPosts();
      setShowPostModal(false);
    } catch (error) {
      console.error('Error moderating post:', error);
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-emerald-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Shield className="w-6 h-6 mr-2 text-purple-600" />
            Admin Dashboard
          </h1>
          <p className="text-gray-600 mt-1">System administration and management</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-2">
          <button 
            onClick={loadDashboardData}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
          <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Admin Context */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-lg shadow-sm text-white p-6">
        <h3 className="text-lg font-bold mb-3">🇿🇲 AgriSmart System Administration</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-semibold mb-1">System Status</h4>
            <p className="text-sm opacity-90">All services operational</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-semibold mb-1">Data Storage</h4>
            <p className="text-sm opacity-90">Local storage active</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-semibold mb-1">API Status</h4>
            <p className="text-sm opacity-90">Frontend API - 100% uptime</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-semibold mb-1">Last Sync</h4>
            <p className="text-sm opacity-90">Real-time updates</p>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stats.users.total.toLocaleString()}</p>
                <p className="text-sm text-emerald-600 mt-1">+{stats.users.newThisMonth} this month</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Farms</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stats.farms.total.toLocaleString()}</p>
                <p className="text-sm text-green-600 mt-1">{stats.farms.totalArea.toLocaleString()} hectares</p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-full">
                <Building className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Crops</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stats.crops.total.toLocaleString()}</p>
                <p className="text-sm text-yellow-600 mt-1">{stats.crops.totalYield.toLocaleString()} tons yield</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Sprout className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">IoT Devices</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stats.iot.total.toLocaleString()}</p>
                <p className="text-sm text-purple-600 mt-1">{stats.iot.online} online</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Cpu className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200 overflow-x-auto">
          <nav className="flex space-x-4 px-6">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'users', label: 'User Management', icon: Users },
              { id: 'farms', label: 'Farms', icon: Building },
              { id: 'crops', label: 'Crops', icon: Sprout },
              { id: 'devices', label: 'IoT Devices', icon: Cpu },
              { id: 'inventory', label: 'Inventory', icon: Package },
              { id: 'content', label: 'Content', icon: MessageCircle },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
              { id: 'system', label: 'System', icon: Server },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-3 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && stats && (
            <div className="space-y-6">
              {/* System Health */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">User Distribution</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Farmers</span>
                      <span className="font-semibold">{stats.users.farmers.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Extension Officers</span>
                      <span className="font-semibold">{stats.users.extensionOfficers.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Cooperatives</span>
                      <span className="font-semibold">{stats.users.cooperatives.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Provinces by Farms</h3>
                  <div className="space-y-3">
                    {stats.farms.byProvince.slice(0, 5).map((province: any, index: number) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-gray-600">{province._id}</span>
                        <span className="font-semibold">{province.count} farms</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Crop Distribution */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Crop Distribution</h3>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {stats.crops.byCrop.map((crop: any, index: number) => (
                    <div key={index} className="text-center">
                      <div className="bg-emerald-100 rounded-lg p-4 mb-2">
                        <Sprout className="w-8 h-8 text-emerald-600 mx-auto" />
                      </div>
                      <h4 className="font-semibold text-gray-900">{crop._id}</h4>
                      <p className="text-sm text-gray-600">{crop.count} crops</p>
                      <p className="text-xs text-gray-500">{crop.totalArea.toLocaleString()} ha</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* IoT Device Status */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">IoT Device Types</h3>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {stats.iot.byType.map((device: any, index: number) => (
                    <div key={index} className="text-center">
                      <div className="bg-purple-100 rounded-lg p-4 mb-2">
                        <Cpu className="w-8 h-8 text-purple-600 mx-auto" />
                      </div>
                      <h4 className="font-semibold text-gray-900">{device._id}</h4>
                      <p className="text-sm text-gray-600">{device.count} devices</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <button 
                    onClick={() => setActiveTab('users')}
                    className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors flex flex-col items-center"
                  >
                    <Users className="w-8 h-8 mb-2" />
                    <span>Manage Users</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('content')}
                    className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-colors flex flex-col items-center"
                  >
                    <MessageCircle className="w-8 h-8 mb-2" />
                    <span>Moderate Content</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('analytics')}
                    className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 transition-colors flex flex-col items-center"
                  >
                    <BarChart3 className="w-8 h-8 mb-2" />
                    <span>View Analytics</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('system')}
                    className="bg-orange-600 text-white p-4 rounded-lg hover:bg-orange-700 transition-colors flex flex-col items-center"
                  >
                    <Server className="w-8 h-8 mb-2" />
                    <span>System Health</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
              {/* User Filters */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex flex-wrap gap-4">
                  <select
                    value={userFilters.role}
                    onChange={(e) => setUserFilters({...userFilters, role: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="all">All Roles</option>
                    <option value="farmer">Farmers</option>
                    <option value="extension_officer">Extension Officers</option>
                    <option value="cooperative">Cooperatives</option>
                    <option value="admin">Administrators</option>
                  </select>

                  <select
                    value={userFilters.province}
                    onChange={(e) => setUserFilters({...userFilters, province: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="all">All Provinces</option>
                    <option value="Lusaka Province">Lusaka Province</option>
                    <option value="Central Province">Central Province</option>
                    <option value="Eastern Province">Eastern Province</option>
                    <option value="Copperbelt Province">Copperbelt Province</option>
                    <option value="Southern Province">Southern Province</option>
                  </select>

                  <select
                    value={userFilters.status}
                    onChange={(e) => setUserFilters({...userFilters, status: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  <button 
                    onClick={() => openModal('user', null, 'create')}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add User</span>
                  </button>
                </div>
              </div>

              {/* Users Table */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stats</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredUsers.map((user) => (
                        <tr key={user._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                                <Users className="w-6 h-6 text-emerald-600" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                              user.role === 'extension_officer' ? 'bg-blue-100 text-blue-800' :
                              user.role === 'cooperative' ? 'bg-orange-100 text-orange-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {user.role.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                              {user.farmProfile?.location}, {user.farmProfile?.province}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center">
                                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                                {user.stats?.reputation || 0}
                              </div>
                              <div className="flex items-center">
                                <MessageCircle className="w-4 h-4 text-blue-400 mr-1" />
                                {user.stats?.postsCreated || 0}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {user.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => openModal('user', user, 'view')}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => openModal('user', user, 'edit')}
                                className="text-emerald-600 hover:text-emerald-900"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleUserAction(user._id, user.isActive ? 'deactivate' : 'activate')}
                                className={user.isActive ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}
                              >
                                {user.isActive ? <Trash2 className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'farms' && (
            <div className="space-y-6">
              {/* Farm Filters and Add Button */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex flex-wrap gap-4">
                  <select
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="all">All Provinces</option>
                    <option value="Lusaka Province">Lusaka Province</option>
                    <option value="Central Province">Central Province</option>
                    <option value="Eastern Province">Eastern Province</option>
                    <option value="Copperbelt Province">Copperbelt Province</option>
                    <option value="Southern Province">Southern Province</option>
                  </select>
                  
                  <select
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="all">All Farming Types</option>
                    <option value="Subsistence">Subsistence</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Mixed farming">Mixed Farming</option>
                    <option value="Organic">Organic</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search farms..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  <button 
                    onClick={() => openModal('farm', null, 'create')}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Farm</span>
                  </button>
                </div>
              </div>
              
              {/* Farms Table */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <h3 className="text-lg font-semibold text-gray-900">Farm Management</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Farm</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Area</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {farms.map((farm) => (
                        <tr key={farm._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                                <Building className="w-6 h-6 text-emerald-600" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{farm.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {farm.owner.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                              {farm.location}, {farm.province}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {farm.totalArea} hectares
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                              {farm.farmingType}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => openModal('farm', farm, 'view')}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => openModal('farm', farm, 'edit')}
                                className="text-emerald-600 hover:text-emerald-900"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'crops' && (
            <div className="space-y-6">
              {/* Crop Filters and Add Button */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex flex-wrap gap-4">
                  <select
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="all">All Crops</option>
                    <option value="Maize">Maize</option>
                    <option value="Soybeans">Soybeans</option>
                    <option value="Groundnuts">Groundnuts</option>
                    <option value="Sunflower">Sunflower</option>
                    <option value="Cotton">Cotton</option>
                  </select>
                  
                  <select
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="all">All Status</option>
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                    <option value="poor">Poor</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search crops..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  <button 
                    onClick={() => openModal('crop', null, 'create')}
                    className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Crop</span>
                  </button>
                </div>
              </div>
              
              {/* Crops Table */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <h3 className="text-lg font-semibold text-gray-900">Crop Management</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crop</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Farm</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Area</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Health</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {crops.map((crop) => (
                        <tr key={crop._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                                <Sprout className="w-6 h-6 text-yellow-600" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{crop.name}</div>
                                <div className="text-sm text-gray-500">{crop.variety}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {crop.farm.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {crop.owner.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {crop.area} hectares
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <div className="flex items-center">
                              <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    crop.health > 90 ? 'bg-emerald-500' : 
                                    crop.health > 75 ? 'bg-yellow-500' : 
                                    'bg-red-500'
                                  }`}
                                  style={{ width: `${crop.health}%` }}
                                ></div>
                              </div>
                              <span>{crop.health}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              crop.status === 'excellent' ? 'bg-emerald-100 text-emerald-800' :
                              crop.status === 'good' ? 'bg-blue-100 text-blue-800' :
                              crop.status === 'fair' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {crop.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => openModal('crop', crop, 'view')}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => openModal('crop', crop, 'edit')}
                                className="text-emerald-600 hover:text-emerald-900"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'devices' && (
            <div className="space-y-6">
              {/* Device Filters and Add Button */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex flex-wrap gap-4">
                  <select
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="all">All Device Types</option>
                    <option value="Soil Monitor">Soil Monitor</option>
                    <option value="Weather Monitor">Weather Monitor</option>
                    <option value="Irrigation System">Irrigation System</option>
                    <option value="Pest Monitor">Pest Monitor</option>
                    <option value="Aerial Monitor">Aerial Monitor</option>
                  </select>
                  
                  <select
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="all">All Status</option>
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search devices..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  <button 
                    onClick={() => openModal('device', null, 'create')}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Device</span>
                  </button>
                </div>
              </div>
              
              {/* Devices Table */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <h3 className="text-lg font-semibold text-gray-900">IoT Device Management</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Farm</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Battery</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Update</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {devices.map((device) => (
                        <tr key={device._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                <Cpu className="w-6 h-6 text-purple-600" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{device.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {device.type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {device.farm.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {device.owner.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              device.status === 'online' ? 'bg-emerald-100 text-emerald-800' :
                              device.status === 'offline' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {device.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <div className="flex items-center">
                              <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    device.battery > 60 ? 'bg-emerald-500' : 
                                    device.battery > 30 ? 'bg-yellow-500' : 
                                    'bg-red-500'
                                  }`}
                                  style={{ width: `${device.battery}%` }}
                                ></div>
                              </div>
                              <span>{device.battery}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {device.lastUpdate}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => openModal('device', device, 'view')}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => openModal('device', device, 'edit')}
                                className="text-emerald-600 hover:text-emerald-900"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'inventory' && (
            <div className="space-y-6">
              {/* Inventory Filters and Add Button */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex flex-wrap gap-4">
                  <select
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="all">All Categories</option>
                    <option value="seeds">Seeds</option>
                    <option value="fertilizers">Fertilizers</option>
                    <option value="pesticides">Pesticides</option>
                    <option value="equipment">Equipment</option>
                    <option value="fuel">Fuel</option>
                  </select>
                  
                  <select
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="all">All Status</option>
                    <option value="in_stock">In Stock</option>
                    <option value="low_stock">Low Stock</option>
                    <option value="critical">Critical</option>
                    <option value="out_of_stock">Out of Stock</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search inventory..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  <button 
                    onClick={() => openModal('inventory', null, 'create')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Item</span>
                  </button>
                </div>
              </div>
              
              {/* Inventory Table */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <h3 className="text-lg font-semibold text-gray-900">Inventory Management</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Farm</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {inventory.map((item) => (
                        <tr key={item._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <Package className="w-6 h-6 text-blue-600" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{item.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              item.category === 'seeds' ? 'bg-yellow-100 text-yellow-800' :
                              item.category === 'fertilizers' ? 'bg-green-100 text-green-800' :
                              item.category === 'pesticides' ? 'bg-red-100 text-red-800' :
                              item.category === 'equipment' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {item.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.farm.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.owner.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.quantity} {item.unit}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              item.status === 'in_stock' ? 'bg-emerald-100 text-emerald-800' :
                              item.status === 'low_stock' ? 'bg-yellow-100 text-yellow-800' :
                              item.status === 'critical' ? 'bg-orange-100 text-orange-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {item.status.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => openModal('inventory', item, 'view')}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => openModal('inventory', item, 'edit')}
                                className="text-emerald-600 hover:text-emerald-900"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Content Moderation</h3>
                <p className="text-gray-600">Manage community posts and user-generated content</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                  <MessageCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{posts.length}</div>
                  <div className="text-sm text-gray-600">Total Posts</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                  <AlertTriangle className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">2</div>
                  <div className="text-sm text-gray-600">Pending Review</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                  <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{posts.length - 2}</div>
                  <div className="text-sm text-gray-600">Approved</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                  <Trash2 className="w-8 h-8 text-red-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">0</div>
                  <div className="text-sm text-gray-600">Removed</div>
                </div>
              </div>
              
              {/* Content Filters */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex flex-wrap gap-4">
                  <select
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="all">All Categories</option>
                    <option value="crops">Crops</option>
                    <option value="pests">Pests</option>
                    <option value="irrigation">Irrigation</option>
                    <option value="market">Market</option>
                    <option value="general">General</option>
                  </select>
                  
                  <select
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="pinned">Pinned</option>
                    <option value="pending">Pending Review</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search posts..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>

              {/* Posts Table */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <h3 className="text-lg font-semibold text-gray-900">Community Posts</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Post</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Engagement</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {posts.map((post) => (
                        <tr key={post._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">{post.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {post.author.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              post.category === 'pests' ? 'bg-red-100 text-red-800' :
                              post.category === 'market' ? 'bg-blue-100 text-blue-800' :
                              post.category === 'crops' ? 'bg-green-100 text-green-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {post.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center">
                                <Eye className="w-4 h-4 text-gray-400 mr-1" />
                                {post.views}
                              </div>
                              <div className="flex items-center">
                                <MessageCircle className="w-4 h-4 text-blue-400 mr-1" />
                                {post.replies}
                              </div>
                              <div className="flex items-center">
                                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                                {post.likes}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              post.status === 'active' ? 'bg-emerald-100 text-emerald-800' :
                              post.status === 'pinned' ? 'bg-blue-100 text-blue-800' :
                              post.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {post.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(post.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => openModal('post', post, 'view')}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => openModal('post', post, 'edit')}
                                className="text-emerald-600 hover:text-emerald-900"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Pending Review */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
                  <span className="text-yellow-800">2 posts are pending moderation review</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">System Analytics</h3>
                <p className="text-gray-600">Comprehensive system performance and usage analytics</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100">System Uptime</p>
                      <p className="text-3xl font-bold">99.9%</p>
                      <p className="text-blue-200">Last 30 days</p>
                    </div>
                    <Activity className="w-12 h-12 text-blue-200" />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg text-white p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-emerald-100">API Requests</p>
                      <p className="text-3xl font-bold">2.4M</p>
                      <p className="text-emerald-200">This month</p>
                    </div>
                    <Database className="w-12 h-12 text-emerald-200" />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg text-white p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">Data Storage</p>
                      <p className="text-3xl font-bold">1.2TB</p>
                      <p className="text-purple-200">Total used</p>
                    </div>
                    <Package className="w-12 h-12 text-purple-200" />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600">156ms</div>
                    <div className="text-sm text-gray-600">Avg Response Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">99.2%</div>
                    <div className="text-sm text-gray-600">Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">1,247</div>
                    <div className="text-sm text-gray-600">Active Sessions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">23GB</div>
                    <div className="text-sm text-gray-600">Daily Data Transfer</div>
                  </div>
                </div>
              </div>
              
              {/* User Growth Chart */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth</h3>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">User growth chart visualization would appear here</p>
                </div>
              </div>
              
              {/* Regional Distribution */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Regional Distribution</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-3">Users by Province</h4>
                    <div className="space-y-3">
                      {stats.farms.byProvince.slice(0, 5).map((province: any, index: number) => (
                        <div key={index} className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${(province.count / stats.farms.byProvince[0].count) * 100}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between w-40">
                            <span className="text-sm text-gray-600">{province._id}</span>
                            <span className="text-sm font-medium">{province.count}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-3">Crops by Type</h4>
                    <div className="space-y-3">
                      {stats.crops.byCrop.slice(0, 5).map((crop: any, index: number) => (
                        <div key={index} className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-emerald-500 h-2 rounded-full"
                              style={{ width: `${(crop.count / stats.crops.byCrop[0].count) * 100}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between w-40">
                            <span className="text-sm text-gray-600">{crop._id}</span>
                            <span className="text-sm font-medium">{crop.count}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'system' && systemHealth && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">System Health</h3>
                <p className="text-gray-600">Monitor system performance and resource usage</p>
              </div>
              
              {/* System Status Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">Database</h4>
                    <div className={`p-2 rounded-full ${
                      systemHealth.database.status === 'connected' ? 'bg-emerald-100' : 'bg-red-100'
                    }`}>
                      <Database className={`w-5 h-5 ${
                        systemHealth.database.status === 'connected' ? 'text-emerald-600' : 'text-red-600'
                      }`} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Status</span>
                      <span className={`text-sm font-medium ${
                        systemHealth.database.status === 'connected' ? 'text-emerald-600' : 'text-red-600'
                      }`}>
                        {systemHealth.database.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Response Time</span>
                      <span className="text-sm font-medium">{systemHealth.database.responseTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Connections</span>
                      <span className="text-sm font-medium">{systemHealth.database.connections}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">API</h4>
                    <div className={`p-2 rounded-full ${
                      systemHealth.api.status === 'healthy' ? 'bg-emerald-100' : 'bg-red-100'
                    }`}>
                      <Globe className={`w-5 h-5 ${
                        systemHealth.api.status === 'healthy' ? 'text-emerald-600' : 'text-red-600'
                      }`} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Status</span>
                      <span className={`text-sm font-medium ${
                        systemHealth.api.status === 'healthy' ? 'text-emerald-600' : 'text-red-600'
                      }`}>
                        {systemHealth.api.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Uptime</span>
                      <span className="text-sm font-medium">{systemHealth.api.uptime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Requests/min</span>
                      <span className="text-sm font-medium">{systemHealth.api.requestsPerMinute}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">Storage</h4>
                    <div className="p-2 rounded-full bg-blue-100">
                      <HardDrive className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Used</span>
                      <span className="text-sm font-medium">{systemHealth.storage.used}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Available</span>
                      <span className="text-sm font-medium">{systemHealth.storage.available}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Usage</span>
                      <span className="text-sm font-medium">{systemHealth.storage.usage}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">Performance</h4>
                    <div className="p-2 rounded-full bg-purple-100">
                      <Activity className="w-5 h-5 text-purple-600" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">CPU Usage</span>
                      <span className="text-sm font-medium">{systemHealth.performance.cpuUsage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Memory Usage</span>
                      <span className="text-sm font-medium">{systemHealth.performance.memoryUsage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Disk Usage</span>
                      <span className="text-sm font-medium">{systemHealth.performance.diskUsage}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* System Logs */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <h3 className="text-lg font-semibold text-gray-900">System Logs</h3>
                </div>
                <div className="p-6">
                  <div className="bg-gray-900 text-gray-200 p-4 rounded-lg font-mono text-sm h-64 overflow-y-auto">
                    <div className="text-green-400">[2024-12-15 08:12:34] INFO: System started successfully</div>
                    <div className="text-blue-400">[2024-12-15 08:15:22] INFO: User login: admin@agrismart.zm</div>
                    <div className="text-blue-400">[2024-12-15 09:23:45] INFO: New user registered: farmer@example.com</div>
                    <div className="text-yellow-400">[2024-12-15 10:34:12] WARN: High API request rate detected</div>
                    <div className="text-blue-400">[2024-12-15 11:45:23] INFO: Database backup completed</div>
                    <div className="text-red-400">[2024-12-15 12:56:34] ERROR: Failed login attempt: unknown@example.com</div>
                    <div className="text-blue-400">[2024-12-15 13:12:45] INFO: New farm created: ID #12345</div>
                    <div className="text-blue-400">[2024-12-15 14:23:56] INFO: New crop added: Maize, ID #67890</div>
                    <div className="text-yellow-400">[2024-12-15 15:34:12] WARN: Low storage space (15% remaining)</div>
                    <div className="text-blue-400">[2024-12-15 16:45:23] INFO: System update scheduled for 2024-12-16</div>
                  </div>
                </div>
              </div>
              
              {/* System Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Backup & Restore</h4>
                  <div className="space-y-4">
                    <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                      <Download className="w-4 h-4" />
                      <span>Create Backup</span>
                    </button>
                    <button className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center space-x-2">
                      <Upload className="w-4 h-4" />
                      <span>Restore from Backup</span>
                    </button>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">System Maintenance</h4>
                  <div className="space-y-4">
                    <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2">
                      <RefreshCw className="w-4 h-4" />
                      <span>Clear Cache</span>
                    </button>
                    <button className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center space-x-2">
                      <Database className="w-4 h-4" />
                      <span>Optimize Database</span>
                    </button>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">System Updates</h4>
                  <div className="space-y-4">
                    <button className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2">
                      <Zap className="w-4 h-4" />
                      <span>Check for Updates</span>
                    </button>
                    <div className="text-center text-sm text-gray-600">
                      <p>Current Version: 1.0.0</p>
                      <p>Last Updated: 2024-12-01</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">System Settings</h3>
                <p className="text-gray-600">Configure system-wide settings and preferences</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">General Settings</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Maintenance Mode</span>
                      <button className="bg-gray-200 rounded-full w-12 h-6 flex items-center">
                        <div className="bg-white w-5 h-5 rounded-full shadow transform transition-transform"></div>
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">User Registration</span>
                      <button className="bg-emerald-500 rounded-full w-12 h-6 flex items-center justify-end">
                        <div className="bg-white w-5 h-5 rounded-full shadow transform transition-transform"></div>
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Email Notifications</span>
                      <button className="bg-emerald-500 rounded-full w-12 h-6 flex items-center justify-end">
                        <div className="bg-white w-5 h-5 rounded-full shadow transform transition-transform"></div>
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Demo Mode</span>
                      <button className="bg-emerald-500 rounded-full w-12 h-6 flex items-center justify-end">
                        <div className="bg-white w-5 h-5 rounded-full shadow transform transition-transform"></div>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Security Settings</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Two-Factor Authentication</span>
                      <button className="bg-emerald-500 rounded-full w-12 h-6 flex items-center justify-end">
                        <div className="bg-white w-5 h-5 rounded-full shadow transform transition-transform"></div>
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">API Rate Limiting</span>
                      <button className="bg-emerald-500 rounded-full w-12 h-6 flex items-center justify-end">
                        <div className="bg-white w-5 h-5 rounded-full shadow transform transition-transform"></div>
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Audit Logging</span>
                      <button className="bg-emerald-500 rounded-full w-12 h-6 flex items-center justify-end">
                        <div className="bg-white w-5 h-5 rounded-full shadow transform transition-transform"></div>
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Session Timeout (minutes)</span>
                      <input 
                        type="number" 
                        className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        defaultValue="60"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Email Configuration</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Host</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        defaultValue="smtp.gmail.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Port</label>
                      <input 
                        type="number" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        defaultValue="587"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email From</label>
                      <input 
                        type="email" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        defaultValue="noreply@agrismart.zm"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">API Configuration</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Weather API Key</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        defaultValue="••••••••••••••••"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Market API Key</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        defaultValue="••••••••••••••••"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">API Request Limit</label>
                      <input 
                        type="number" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        defaultValue="1000"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  Save Settings
                </button>
              </div>
            </div>
          )}
          
          {/* Weather Management Tab */}
          {activeTab === 'weather' && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Weather Management</h3>
                <p className="text-gray-600">Manage weather data and alerts for all provinces</p>
              </div>
              
              {/* Weather Alerts Management */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Weather Alerts</h3>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Create Alert</span>
                  </button>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="border border-red-200 bg-red-50 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-red-800">Heavy Rains Expected - Northern Provinces</h4>
                          <p className="text-sm text-red-700 mt-1">Expect 40-80mm of rainfall in Northern, Luapula, and Muchinga provinces. Risk of flooding in low-lying areas.</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            <span className="px-2 py-1 bg-white bg-opacity-50 rounded text-xs text-red-800">Northern Province</span>
                            <span className="px-2 py-1 bg-white bg-opacity-50 rounded text-xs text-red-800">Luapula Province</span>
                            <span className="px-2 py-1 bg-white bg-opacity-50 rounded text-xs text-red-800">Muchinga Province</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-1 text-blue-600 hover:text-blue-900">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-red-600 hover:text-red-900">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-red-700 mt-2">
                        <span>Severity: High</span>
                        <span>Valid until: Dec 16, 2024</span>
                      </div>
                    </div>
                    
                    <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-blue-800">Optimal Spraying Conditions - Central Regions</h4>
                          <p className="text-sm text-blue-700 mt-1">Low wind conditions (< 10 km/h) expected in Central and Eastern provinces. Ideal for pesticide application.</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            <span className="px-2 py-1 bg-white bg-opacity-50 rounded text-xs text-blue-800">Central Province</span>
                            <span className="px-2 py-1 bg-white bg-opacity-50 rounded text-xs text-blue-800">Eastern Province</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-1 text-blue-600 hover:text-blue-900">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-red-600 hover:text-red-900">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-blue-700 mt-2">
                        <span>Severity: Low</span>
                        <span>Valid until: Dec 15, 2024</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Provincial Weather Data */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <h3 className="text-lg font-semibold text-gray-900">Provincial Weather Data</h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-900">Lusaka Province</h4>
                        <Cloud className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center">
                          <Thermometer className="w-4 h-4 text-red-500 mr-1" />
                          <span className="text-gray-700">28°C</span>
                        </div>
                        <div className="flex items-center">
                          <Droplets className="w-4 h-4 text-blue-500 mr-1" />
                          <span className="text-gray-700">65%</span>
                        </div>
                        <div className="flex items-center">
                          <Wind className="w-4 h-4 text-gray-500 mr-1" />
                          <span className="text-gray-700">12 km/h</span>
                        </div>
                        <div className="flex items-center">
                          <Umbrella className="w-4 h-4 text-blue-500 mr-1" />
                          <span className="text-gray-700">2.5 mm</span>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between">
                        <span className="text-xs text-gray-600">Partly Cloudy</span>
                        <button className="text-xs text-blue-600 hover:text-blue-800">Edit</button>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-900">Copperbelt Province</h4>
                        <Cloud className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center">
                          <Thermometer className="w-4 h-4 text-red-500 mr-1" />
                          <span className="text-gray-700">25°C</span>
                        </div>
                        <div className="flex items-center">
                          <Droplets className="w-4 h-4 text-blue-500 mr-1" />
                          <span className="text-gray-700">75%</span>
                        </div>
                        <div className="flex items-center">
                          <Wind className="w-4 h-4 text-gray-500 mr-1" />
                          <span className="text-gray-700">8 km/h</span>
                        </div>
                        <div className="flex items-center">
                          <Umbrella className="w-4 h-4 text-blue-500 mr-1" />
                          <span className="text-gray-700">8.1 mm</span>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between">
                        <span className="text-xs text-gray-600">Cloudy</span>
                        <button className="text-xs text-blue-600 hover:text-blue-800">Edit</button>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-900">Central Province</h4>
                        <Sun className="w-6 h-6 text-yellow-500" />
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center">
                          <Thermometer className="w-4 h-4 text-red-500 mr-1" />
                          <span className="text-gray-700">29°C</span>
                        </div>
                        <div className="flex items-center">
                          <Droplets className="w-4 h-4 text-blue-500 mr-1" />
                          <span className="text-gray-700">60%</span>
                        </div>
                        <div className="flex items-center">
                          <Wind className="w-4 h-4 text-gray-500 mr-1" />
                          <span className="text-gray-700">15 km/h</span>
                        </div>
                        <div className="flex items-center">
                          <Umbrella className="w-4 h-4 text-blue-500 mr-1" />
                          <span className="text-gray-700">1.2 mm</span>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between">
                        <span className="text-xs text-gray-600">Sunny</span>
                        <button className="text-xs text-blue-600 hover:text-blue-800">Edit</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Weather API Configuration */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Weather API Configuration</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Weather API Provider</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                      <option>OpenWeatherMap</option>
                      <option>AccuWeather</option>
                      <option>Weather.com</option>
                      <option>Zambia Meteorological Department</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      defaultValue="••••••••••••••••"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Update Frequency (minutes)</label>
                    <input 
                      type="number" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      defaultValue="30"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Save Configuration
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Market Management Tab */}
          {activeTab === 'market' && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Market Management</h3>
                <p className="text-gray-600">Manage market prices, buyers, and market analysis</p>
              </div>
              
              {/* Crop Prices Management */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Crop Prices</h3>
                  <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2">
                    <Edit className="w-4 h-4" />
                    <span>Update Prices</span>
                  </button>
                </div>
                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crop</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Price</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FRA Price</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Export Price</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                                <Sprout className="w-6 h-6 text-yellow-600" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">Maize</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ZMW 4,250
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center text-emerald-600">
                              <TrendingUp className="w-4 h-4 mr-1" />
                              <span>+12.5%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ZMW 4,000
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ZMW 4,800
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button className="text-emerald-600 hover:text-emerald-900">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="text-blue-600 hover:text-blue-900">
                                <TrendingUp className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                                <Sprout className="w-6 h-6 text-yellow-600" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">Soybeans</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ZMW 6,800
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center text-red-600">
                              <TrendingDown className="w-4 h-4 mr-1" />
                              <span>-3.2%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            N/A
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ZMW 7,200
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button className="text-emerald-600 hover:text-emerald-900">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="text-blue-600 hover:text-blue-900">
                                <TrendingUp className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              
              {/* Buyer Management */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Buyer Management</h3>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Add Buyer</span>
                  </button>
                </div>
                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buyer</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crops Wanted</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price Offered</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Verified</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <Building className="w-6 h-6 text-blue-600" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">Zambeef Products PLC</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                              processor
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            Lusaka
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <div className="flex flex-wrap gap-1">
                              <span className="px-2 py-1 bg-yellow-100 rounded text-xs text-yellow-800">maize</span>
                              <span className="px-2 py-1 bg-green-100 rounded text-xs text-green-800">soybeans</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ZMW 4,500
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <CheckCircle className="w-5 h-5 text-emerald-600" />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-900">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="text-emerald-600 hover:text-emerald-900">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <Building className="w-6 h-6 text-blue-600" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">Food Reserve Agency (FRA)</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                              government
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            Multiple Locations
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <div className="flex flex-wrap gap-1">
                              <span className="px-2 py-1 bg-yellow-100 rounded text-xs text-yellow-800">maize</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ZMW 4,000
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <CheckCircle className="w-5 h-5 text-emerald-600" />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-900">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="text-emerald-600 hover:text-emerald-900">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              
              {/* Market Insights Management */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Insights Management</h3>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">FRA Purchase Program</h4>
                        <p className="text-sm text-gray-700 mt-1">Government guaranteed purchase at ZMW 4,000/ton</p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-1 text-blue-600 hover:text-blue-900">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-red-600 hover:text-red-900">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>Impact: Positive</span>
                      <span>Recommendation: Prepare quality certificates</span>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">DRC Export Opportunity</h4>
                        <p className="text-sm text-gray-700 mt-1">Democratic Republic of Congo offering 15% premium for quality white maize</p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-1 text-blue-600 hover:text-blue-900">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-red-600 hover:text-red-900">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>Impact: High</span>
                      <span>Recommendation: Contact COMESA trade office</span>
                    </div>
                  </div>
                  
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Add Market Insight</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* User Modal */}
      {showUserModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                {modalMode === 'view' ? 'User Details' : 
                 modalMode === 'edit' ? 'Edit User' : 'Create User'}
              </h3>
              <button 
                onClick={() => setShowUserModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {/* User details form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    {modalMode === 'view' ? (
                      <p className="text-gray-900">{selectedItem.name}</p>
                    ) : (
                      <input 
                        type="text" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        defaultValue={selectedItem.name}
                      />
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    {modalMode === 'view' ? (
                      <p className="text-gray-900">{selectedItem.email}</p>
                    ) : (
                      <input 
                        type="email" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        defaultValue={selectedItem.email}
                      />
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                    {modalMode === 'view' ? (
                      <p className="text-gray-900 capitalize">{selectedItem.role.replace('_', ' ')}</p>
                    ) : (
                      <select 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        defaultValue={selectedItem.role}
                      >
                        <option value="farmer">Farmer</option>
                        <option value="extension_officer">Extension Officer</option>
                        <option value="cooperative">Cooperative</option>
                        <option value="admin">Administrator</option>
                      </select>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    {modalMode === 'view' ? (
                      <p className={`text-${selectedItem.isActive ? 'emerald' : 'red'}-600`}>
                        {selectedItem.isActive ? 'Active' : 'Inactive'}
                      </p>
                    ) : (
                      <select 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        defaultValue={selectedItem.isActive ? 'active' : 'inactive'}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    )}
                  </div>
                </div>
                
                {/* Farm Profile */}
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Farm Profile</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      {modalMode === 'view' ? (
                        <p className="text-gray-900">{selectedItem.farmProfile?.location}</p>
                      ) : (
                        <input 
                          type="text" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          defaultValue={selectedItem.farmProfile?.location}
                        />
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Province</label>
                      {modalMode === 'view' ? (
                        <p className="text-gray-900">{selectedItem.farmProfile?.province}</p>
                      ) : (
                        <select 
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          defaultValue={selectedItem.farmProfile?.province}
                        >
                          <option value="Lusaka Province">Lusaka Province</option>
                          <option value="Central Province">Central Province</option>
                          <option value="Eastern Province">Eastern Province</option>
                          <option value="Copperbelt Province">Copperbelt Province</option>
                          <option value="Southern Province">Southern Province</option>
                        </select>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* User Stats */}
                {modalMode === 'view' && (
                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-900 mb-3">User Statistics</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <p className="text-sm text-gray-600">Reputation</p>
                        <p className="text-lg font-semibold text-gray-900">{selectedItem.stats?.reputation || 0}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <p className="text-sm text-gray-600">Posts</p>
                        <p className="text-lg font-semibold text-gray-900">{selectedItem.stats?.postsCreated || 0}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <p className="text-sm text-gray-600">Joined</p>
                        <p className="text-lg font-semibold text-gray-900">{new Date(selectedItem.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <p className="text-sm text-gray-600">Last Login</p>
                        <p className="text-lg font-semibold text-gray-900">{new Date(selectedItem.lastLogin).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex space-x-3 mt-6">
                <button 
                  onClick={() => setShowUserModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  {modalMode === 'view' ? 'Close' : 'Cancel'}
                </button>
                {modalMode !== 'view' && (
                  <button 
                    className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    {modalMode === 'edit' ? 'Save Changes' : 'Create User'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Post Moderation Modal */}
      {showPostModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                {modalMode === 'view' ? 'Post Details' : 
                 modalMode === 'edit' ? 'Moderate Post' : 'Create Post'}
              </h3>
              <button 
                onClick={() => setShowPostModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {/* Post details */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  {modalMode === 'view' ? (
                    <p className="text-gray-900 font-medium">{selectedItem.title}</p>
                  ) : (
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      defaultValue={selectedItem.title}
                    />
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                  <p className="text-gray-900">{selectedItem.author.name}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                  {modalMode === 'view' ? (
                    <div className="bg-gray-50 p-4 rounded-lg text-gray-900">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
                    </div>
                  ) : (
                    <textarea 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      rows={6}
                      defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl."
                    />
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    {modalMode === 'view' ? (
                      <p className="text-gray-900">{selectedItem.category}</p>
                    ) : (
                      <select 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        defaultValue={selectedItem.category}
                      >
                        <option value="crops">Crops</option>
                        <option value="pests">Pests</option>
                        <option value="irrigation">Irrigation</option>
                        <option value="market">Market</option>
                        <option value="general">General</option>
                      </select>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    {modalMode === 'view' ? (
                      <p className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        selectedItem.status === 'active' ? 'bg-emerald-100 text-emerald-800' :
                        selectedItem.status === 'pinned' ? 'bg-blue-100 text-blue-800' :
                        selectedItem.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {selectedItem.status}
                      </p>
                    ) : (
                      <select 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        defaultValue={selectedItem.status}
                      >
                        <option value="active">Active</option>
                        <option value="pinned">Pinned</option>
                        <option value="pending">Pending Review</option>
                        <option value="closed">Closed</option>
                        <option value="deleted">Deleted</option>
                      </select>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <p className="text-gray-900">{new Date(selectedItem.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                
                {/* Engagement Stats */}
                {modalMode === 'view' && (
                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Engagement</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <p className="text-sm text-gray-600">Views</p>
                        <p className="text-lg font-semibold text-gray-900">{selectedItem.views}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <p className="text-sm text-gray-600">Replies</p>
                        <p className="text-lg font-semibold text-gray-900">{selectedItem.replies}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <p className="text-sm text-gray-600">Likes</p>
                        <p className="text-lg font-semibold text-gray-900">{selectedItem.likes}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Moderation Options */}
                {modalMode === 'edit' && (
                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Moderation</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Moderation Reason</label>
                        <textarea 
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          rows={3}
                          placeholder="Enter reason for moderation (if applicable)"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button 
                          onClick={() => moderatePost(selectedItem._id, 'active', '')}
                          className="bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors"
                        >
                          Approve
                        </button>
                        <button 
                          onClick={() => moderatePost(selectedItem._id, 'pinned', 'Important information for farmers')}
                          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Pin Post
                        </button>
                        <button 
                          onClick={() => moderatePost(selectedItem._id, 'deleted', 'Violates community guidelines')}
                          className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex space-x-3 mt-6">
                <button 
                  onClick={() => setShowPostModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  {modalMode === 'view' ? 'Close' : 'Cancel'}
                </button>
                {modalMode !== 'view' && (
                  <button 
                    className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    {modalMode === 'edit' ? 'Save Changes' : 'Create Post'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;