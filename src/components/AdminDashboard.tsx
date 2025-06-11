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
  Zap
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

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // For demo purposes, use mock data if API is not available
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
      
      // Try to load real data if API is available
      try {
        const dashboardResponse = await adminAPI.getDashboard();
        setStats(dashboardResponse.data.stats);
        
        const usersResponse = await adminAPI.getUsers();
        setUsers(usersResponse.data.users);
      } catch (apiError) {
        console.log('Using mock data - API not available');
      }
      
    } catch (error) {
      console.error('Error loading dashboard data:', error);
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
            <h4 className="font-semibold mb-1">Database</h4>
            <p className="text-sm opacity-90">Connected and synchronized</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-semibold mb-1">API Status</h4>
            <p className="text-sm opacity-90">Healthy - 99.9% uptime</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-semibold mb-1">Last Backup</h4>
            <p className="text-sm opacity-90">2 hours ago</p>
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
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'users', label: 'User Management', icon: Users },
              { id: 'analytics', label: 'System Analytics', icon: TrendingUp },
              { id: 'content', label: 'Content Moderation', icon: MessageCircle },
              { id: 'settings', label: 'System Settings', icon: Settings }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
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
                              <button className="text-blue-600 hover:text-blue-900">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="text-emerald-600 hover:text-emerald-900">
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
                  <div className="text-2xl font-bold text-gray-900">2,345</div>
                  <div className="text-sm text-gray-600">Total Posts</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                  <AlertTriangle className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">23</div>
                  <div className="text-sm text-gray-600">Pending Review</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                  <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">2,298</div>
                  <div className="text-sm text-gray-600">Approved</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                  <Trash2 className="w-8 h-8 text-red-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">24</div>
                  <div className="text-sm text-gray-600">Removed</div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
                  <span className="text-yellow-800">23 posts are pending moderation review</span>
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
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;