import React, { useState, useEffect } from 'react';
import { 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  Settings,
  BarChart3,
  Shield,
  Database,
  Activity,
  ChevronRight,
  Bell,
  Search,
  Filter,
  MoreVertical,
  Plus,
  Edit,
  Trash2,
  Eye,
  X,
  MapPin,
  Phone,
  Mail,
  Building,
  Calendar,
  CheckCircle
} from 'lucide-react';

interface AdminStats {
  totalUsers: number;
  activeFarms: number;
  systemAlerts: number;
  revenue: number;
  newUsersThisMonth: number;
  usersByRole: Array<{ _id: string; count: number }>;
  farmsByProvince: Array<{ _id: string; count: number }>;
}

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  farmProfile?: {
    location: string;
    province: string;
  };
  isActive: boolean;
  createdAt: string;
}

interface Farm {
  _id: string;
  farmName: string;
  owner: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
  location: string;
  province: string;
  totalArea: number;
  mainCrops: string[];
  isActive: boolean;
  createdAt: string;
}

interface SystemAlert {
  id: string;
  type: 'warning' | 'error' | 'info';
  message: string;
  timestamp: string;
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    activeFarms: 0,
    systemAlerts: 0,
    revenue: 0,
    newUsersThisMonth: 0,
    usersByRole: [],
    farmsByProvince: []
  });
  
  const [users, setUsers] = useState<User[]>([]);
  const [farms, setFarms] = useState<Farm[]>([]);
  const [alerts, setAlerts] = useState<SystemAlert[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'farms' | 'system'>('overview');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showAddFarmModal, setShowAddFarmModal] = useState(false);
  const [showFarmDetailsModal, setShowFarmDetailsModal] = useState(false);
  const [selectedFarm, setSelectedFarm] = useState<Farm | null>(null);
  const [loading, setLoading] = useState(false);

  // Form states
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'farmer',
    location: '',
    province: ''
  });

  const [newFarm, setNewFarm] = useState({
    farmName: '',
    owner: '',
    location: '',
    province: '',
    totalArea: '',
    soilType: '',
    waterSource: '',
    mainCrops: [] as string[]
  });

  const zambianProvinces = [
    'Central Province',
    'Copperbelt Province', 
    'Eastern Province',
    'Luapula Province',
    'Lusaka Province',
    'Muchinga Province',
    'Northern Province',
    'North-Western Province',
    'Southern Province',
    'Western Province'
  ];

  const cropOptions = ['Maize', 'Soybeans', 'Groundnuts', 'Sunflower', 'Cotton', 'Tobacco', 'Cassava'];

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Load stats
      const statsResponse = await fetch('/api/admin/stats', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData);
      }

      // Load users
      const usersResponse = await fetch('/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (usersResponse.ok) {
        const usersData = await usersResponse.json();
        setUsers(usersData.users || []);
      }

      // Load farms
      const farmsResponse = await fetch('/api/admin/farms', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (farmsResponse.ok) {
        const farmsData = await farmsResponse.json();
        setFarms(farmsData.farms || []);
      }

      // Mock alerts
      setAlerts([
        {
          id: '1',
          type: 'warning',
          message: 'High server load detected',
          timestamp: '2 minutes ago'
        },
        {
          id: '2',
          type: 'error',
          message: 'Database backup failed',
          timestamp: '15 minutes ago'
        },
        {
          id: '3',
          type: 'info',
          message: 'System maintenance scheduled',
          timestamp: '1 hour ago'
        }
      ]);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newUser)
      });

      if (response.ok) {
        setShowAddUserModal(false);
        setNewUser({
          name: '',
          email: '',
          phone: '',
          password: '',
          role: 'farmer',
          location: '',
          province: ''
        });
        loadDashboardData();
        alert('User added successfully!');
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to add user');
      }
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Failed to add user');
    } finally {
      setLoading(false);
    }
  };

  const handleAddFarm = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admin/farms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newFarm)
      });

      if (response.ok) {
        setShowAddFarmModal(false);
        setNewFarm({
          farmName: '',
          owner: '',
          location: '',
          province: '',
          totalArea: '',
          soilType: '',
          waterSource: '',
          mainCrops: []
        });
        loadDashboardData();
        alert('Farm added successfully!');
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to add farm');
      }
    } catch (error) {
      console.error('Error adding farm:', error);
      alert('Failed to add farm');
    } finally {
      setLoading(false);
    }
  };

  const handleViewFarmDetails = async (farm: Farm) => {
    try {
      const response = await fetch(`/api/admin/farms/${farm._id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const farmData = await response.json();
        setSelectedFarm(farmData.farm);
        setShowFarmDetailsModal(true);
      }
    } catch (error) {
      console.error('Error fetching farm details:', error);
    }
  };

  const toggleCrop = (crop: string) => {
    const currentCrops = newFarm.mainCrops;
    if (currentCrops.includes(crop)) {
      setNewFarm({
        ...newFarm,
        mainCrops: currentCrops.filter(c => c !== crop)
      });
    } else {
      setNewFarm({
        ...newFarm,
        mainCrops: [...currentCrops, crop]
      });
    }
  };

  const StatCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    value: string | number;
    change?: string;
    color: string;
  }> = ({ icon, title, value, change, color }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          {icon}
        </div>
        {change && (
          <span className="text-sm text-green-600 font-medium">
            {change}
          </span>
        )}
      </div>
      <div>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        <p className="text-gray-600">{title}</p>
      </div>
    </div>
  );

  const AlertItem: React.FC<{ alert: SystemAlert }> = ({ alert }) => (
    <div className="flex items-start space-x-3 p-4 bg-white rounded-lg border border-gray-200">
      <div className={`p-2 rounded-full ${
        alert.type === 'error' ? 'bg-red-100' :
        alert.type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
      }`}>
        <AlertTriangle className={`w-5 h-5 ${
          alert.type === 'error' ? 'text-red-600' :
          alert.type === 'warning' ? 'text-yellow-600' : 'text-blue-600'
        }`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900">{alert.message}</p>
        <p className="text-sm text-gray-500">{alert.timestamp}</p>
      </div>
      <button className="p-1">
        <MoreVertical className="w-4 h-4 text-gray-400" />
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">System Overview & Management</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50">
            <Bell className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50">
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="flex border-b border-gray-200">
          {[
            { key: 'overview', label: 'Overview' },
            { key: 'users', label: 'Users' },
            { key: 'farms', label: 'Farms' },
            { key: 'system', label: 'System' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`py-4 px-6 border-b-2 font-medium ${
                activeTab === tab.key
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  icon={<Users className="w-6 h-6 text-blue-600" />}
                  title="Total Users"
                  value={stats.totalUsers.toLocaleString()}
                  change="+12%"
                  color="bg-blue-100"
                />
                <StatCard
                  icon={<TrendingUp className="w-6 h-6 text-green-600" />}
                  title="Active Farms"
                  value={stats.activeFarms.toLocaleString()}
                  change="+8%"
                  color="bg-green-100"
                />
                <StatCard
                  icon={<AlertTriangle className="w-6 h-6 text-yellow-600" />}
                  title="System Alerts"
                  value={stats.systemAlerts}
                  color="bg-yellow-100"
                />
                <StatCard
                  icon={<BarChart3 className="w-6 h-6 text-purple-600" />}
                  title="Revenue"
                  value={`$${stats.revenue.toLocaleString()}`}
                  change="+15%"
                  color="bg-purple-100"
                />
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <button 
                    onClick={() => setShowAddUserModal(true)}
                    className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                  >
                    <Plus className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-blue-600">Add User</span>
                  </button>
                  <button 
                    onClick={() => setShowAddFarmModal(true)}
                    className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
                  >
                    <Plus className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-600">Add Farm</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
                    <Database className="w-5 h-5 text-purple-600" />
                    <span className="font-medium text-purple-600">Database</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-red-500 hover:bg-red-50 transition-colors">
                    <Shield className="w-5 h-5 text-red-600" />
                    <span className="font-medium text-red-600">Security</span>
                  </button>
                </div>
              </div>

              {/* Recent Alerts */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Alerts</h3>
                  <button className="text-green-600 font-medium hover:text-green-700">View All</button>
                </div>
                <div className="space-y-3">
                  {alerts.map((alert) => (
                    <AlertItem key={alert.id} alert={alert} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <button 
                    onClick={() => setShowAddUserModal(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add User</span>
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center p-6 bg-blue-50 rounded-lg">
                  <p className="text-3xl font-bold text-blue-600">{stats.totalUsers}</p>
                  <p className="text-blue-600">Total Users</p>
                </div>
                <div className="text-center p-6 bg-green-50 rounded-lg">
                  <p className="text-3xl font-bold text-green-600">{users.filter(u => u.isActive).length}</p>
                  <p className="text-green-600">Active Users</p>
                </div>
                <div className="text-center p-6 bg-yellow-50 rounded-lg">
                  <p className="text-3xl font-bold text-yellow-600">{stats.newUsersThisMonth}</p>
                  <p className="text-yellow-600">New This Month</p>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="font-medium text-gray-900">{user.name}</div>
                              <div className="text-gray-500">{user.email}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                            {user.farmProfile?.location || 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {user.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button className="text-blue-600 hover:text-blue-900">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="text-green-600 hover:text-green-900">
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

          {activeTab === 'farms' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Farm Management</h3>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search farms..."
                      className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <button 
                    onClick={() => setShowAddFarmModal(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Farm</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {farms.map((farm) => (
                  <div key={farm._id} className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900">{farm.farmName}</h4>
                        <p className="text-sm text-gray-600">{farm.owner.name}</p>
                      </div>
                      <button 
                        onClick={() => handleViewFarmDetails(farm)}
                        className="text-green-600 hover:text-green-700"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {farm.location}, {farm.province}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Building className="w-4 h-4 mr-2" />
                        {farm.totalArea} hectares
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(farm.createdAt).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        farm.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {farm.isActive ? 'Active' : 'Inactive'}
                      </span>
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'system' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { name: 'Server Status', status: 'Healthy', color: 'green' },
                    { name: 'Database', status: 'Healthy', color: 'green' },
                    { name: 'API Response', status: 'Warning', color: 'yellow' },
                    { name: 'Storage', status: 'Healthy', color: 'green' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-900">{item.name}</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        item.color === 'green' ? 'bg-green-100 text-green-800' :
                        item.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">System Logs</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {[
                    { time: '14:32', message: 'User authentication successful', type: 'info' },
                    { time: '14:28', message: 'Database backup completed', type: 'success' },
                    { time: '14:15', message: 'High memory usage detected', type: 'warning' },
                    { time: '14:02', message: 'System startup completed', type: 'info' }
                  ].map((log, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded border border-gray-100">
                      <span className="text-gray-500 font-mono text-sm">{log.time}</span>
                      <span className={`flex-1 text-sm ${
                        log.type === 'success' ? 'text-green-700' :
                        log.type === 'warning' ? 'text-yellow-700' :
                        'text-gray-700'
                      }`}>
                        {log.message}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Add New User</h3>
              <button 
                onClick={() => setShowAddUserModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleAddUser} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  required
                  value={newUser.phone}
                  onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={newUser.password}
                  onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="farmer">Farmer</option>
                  <option value="extension_officer">Extension Officer</option>
                  <option value="cooperative">Cooperative</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Province</label>
                <select
                  value={newUser.province}
                  onChange={(e) => setNewUser({...newUser, province: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Select Province</option>
                  {zambianProvinces.map(province => (
                    <option key={province} value={province}>{province}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={newUser.location}
                  onChange={(e) => setNewUser({...newUser, location: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="District/Area"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Adding...' : 'Add User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Farm Modal */}
      {showAddFarmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Add New Farm</h3>
              <button 
                onClick={() => setShowAddFarmModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleAddFarm} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Farm Name</label>
                  <input
                    type="text"
                    required
                    value={newFarm.farmName}
                    onChange={(e) => setNewFarm({...newFarm, farmName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Owner</label>
                  <select
                    required
                    value={newFarm.owner}
                    onChange={(e) => setNewFarm({...newFarm, owner: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Select Owner</option>
                    {users.filter(u => u.role === 'farmer').map(user => (
                      <option key={user._id} value={user._id}>{user.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Province</label>
                  <select
                    required
                    value={newFarm.province}
                    onChange={(e) => setNewFarm({...newFarm, province: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Select Province</option>
                    {zambianProvinces.map(province => (
                      <option key={province} value={province}>{province}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    required
                    value={newFarm.location}
                    onChange={(e) => setNewFarm({...newFarm, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="District/Area"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Area (hectares)</label>
                  <input
                    type="number"
                    required
                    value={newFarm.totalArea}
                    onChange={(e) => setNewFarm({...newFarm, totalArea: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Soil Type</label>
                  <input
                    type="text"
                    value={newFarm.soilType}
                    onChange={(e) => setNewFarm({...newFarm, soilType: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Main Crops</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {cropOptions.map(crop => (
                    <label key={crop} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newFarm.mainCrops.includes(crop)}
                        onChange={() => toggleCrop(crop)}
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700">{crop}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowAddFarmModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Adding...' : 'Add Farm'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Farm Details Modal */}
      {showFarmDetailsModal && selectedFarm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Farm Details</h3>
              <button 
                onClick={() => setShowFarmDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Farm Information</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-600">Farm Name</label>
                      <p className="font-medium">{selectedFarm.farmName}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Location</label>
                      <p className="font-medium">{selectedFarm.location}, {selectedFarm.province}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Total Area</label>
                      <p className="font-medium">{selectedFarm.totalArea} hectares</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Status</label>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        selectedFarm.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {selectedFarm.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Owner Information</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-600">Name</label>
                      <p className="font-medium">{selectedFarm.owner.name}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Email</label>
                      <p className="font-medium">{selectedFarm.owner.email}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Phone</label>
                      <p className="font-medium">{selectedFarm.owner.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Role</label>
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {selectedFarm.owner.role || 'Farmer'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {selectedFarm.mainCrops && selectedFarm.mainCrops.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Main Crops</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedFarm.mainCrops.map((crop, index) => (
                      <span key={index} className="inline-flex px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800">
                        {crop}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Created: {new Date(selectedFarm.createdAt).toLocaleDateString()}</span>
                  <div className="flex items-center space-x-4">
                    <button className="text-blue-600 hover:text-blue-700 flex items-center space-x-1">
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                    <button className="text-red-600 hover:text-red-700 flex items-center space-x-1">
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;