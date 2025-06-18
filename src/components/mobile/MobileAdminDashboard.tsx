import React, { useState } from 'react';
import { 
  Users, 
  Sprout, 
  Cpu, 
  Package, 
  MessageSquare, 
  Shield, 
  TrendingUp, 
  User, 
  MapPin, 
  Calendar, 
  CheckCircle, 
  X, 
  Edit, 
  Trash2, 
  Search, 
  Filter, 
  ChevronRight, 
  AlertTriangle, 
  Activity, 
  Database, 
  Server,
  Plus,
  Phone,
  Mail,
  Save,
  RefreshCw,
  Building
} from 'lucide-react';

const MobileAdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showAddFarmModal, setShowAddFarmModal] = useState(false);
  const [userFilter, setUserFilter] = useState('all');
  const [provinceFilter, setProvinceFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // New user form state
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'farmer',
    location: '',
    province: 'Lusaka Province',
    password: '',
    confirmPassword: ''
  });

  // Edit user form state
  const [editUser, setEditUser] = useState<any>({});

  // Admin tabs
  const adminTabs = [
    { id: 'dashboard', name: 'Dashboard', icon: TrendingUp },
    { id: 'users', name: 'Users', icon: Users },
    { id: 'farms', name: 'Farms', icon: Building },
    { id: 'analytics', name: 'Analytics', icon: Activity },
    { id: 'system', name: 'System', icon: Server }
  ];

  // Sample admin dashboard data
  const adminStats = {
    users: {
      total: 1247,
      farmers: 1156,
      extensionOfficers: 78,
      cooperatives: 13,
      newThisMonth: 42
    },
    farms: {
      total: 1389,
      totalArea: 28456,
      byProvince: [
        { province: 'Lusaka Province', count: 342, totalArea: 6890 },
        { province: 'Central Province', count: 287, totalArea: 8245 },
        { province: 'Eastern Province', count: 256, totalArea: 5120 }
      ]
    },
    crops: {
      total: 3567,
      byCrop: [
        { crop: 'Maize', count: 1245, totalArea: 12450 },
        { crop: 'Soybeans', count: 856, totalArea: 6848 },
        { crop: 'Groundnuts', count: 678, totalArea: 3390 }
      ],
      totalYield: 18456
    },
    iot: {
      total: 856,
      online: 789,
      byType: [
        { type: 'Soil Monitor', count: 345 },
        { type: 'Weather Monitor', count: 234 },
        { type: 'Irrigation System', count: 156 }
      ]
    },
    community: {
      totalPosts: 3456,
      totalReplies: 12567,
      activeUsers: 876
    }
  };

  // Sample users
  const users = [
    {
      id: 1,
      name: 'James Mwanza',
      email: 'james@example.com',
      phone: '+260 977 123 456',
      role: 'farmer',
      location: 'Chongwe',
      province: 'Lusaka Province',
      joinDate: '2024-01-15',
      status: 'active',
      farms: 2,
      crops: 5
    },
    {
      id: 2,
      name: 'Mary Banda',
      email: 'mary@example.com',
      phone: '+260 966 789 012',
      role: 'extension_officer',
      location: 'Lusaka',
      province: 'Lusaka Province',
      joinDate: '2023-08-20',
      status: 'active',
      expertise: 'Crop diseases, Soil management'
    },
    {
      id: 3,
      name: 'Peter Mulenga',
      email: 'peter@example.com',
      phone: '+260 955 345 678',
      role: 'farmer',
      location: 'Mkushi',
      province: 'Central Province',
      joinDate: '2024-02-10',
      status: 'active',
      farms: 1,
      crops: 3
    },
    {
      id: 4,
      name: 'Grace Tembo',
      email: 'grace@example.com',
      phone: '+260 977 456 789',
      role: 'extension_officer',
      location: 'Kabwe',
      province: 'Central Province',
      joinDate: '2023-11-05',
      status: 'active',
      expertise: 'Pest management, Crop varieties'
    },
    {
      id: 5,
      name: 'John Phiri',
      email: 'john@example.com',
      phone: '+260 966 234 567',
      role: 'farmer',
      location: 'Mkushi',
      province: 'Central Province',
      joinDate: '2024-03-15',
      status: 'active',
      farms: 1,
      crops: 2
    }
  ];

  // Sample farms
  const farms = [
    {
      id: 1,
      name: 'Mwanza Family Farm',
      owner: 'James Mwanza',
      location: 'Chongwe District',
      province: 'Lusaka Province',
      totalArea: 25,
      crops: ['Maize', 'Soybeans'],
      status: 'active'
    },
    {
      id: 2,
      name: 'Mkushi Block Farm',
      owner: 'Peter Mulenga',
      location: 'Mkushi District',
      province: 'Central Province',
      totalArea: 120,
      crops: ['Maize', 'Cotton', 'Groundnuts'],
      status: 'active'
    },
    {
      id: 3,
      name: 'Eastern Cooperative',
      owner: 'Eastern Farmers Cooperative',
      location: 'Chipata District',
      province: 'Eastern Province',
      totalArea: 450,
      crops: ['Maize', 'Soybeans', 'Sunflower'],
      status: 'active'
    }
  ];

  // System health data
  const systemHealth = {
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
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'extension_officer': return 'bg-blue-100 text-blue-800';
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'cooperative': return 'bg-orange-100 text-orange-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-emerald-600 bg-emerald-100';
      case 'inactive': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleViewUser = (user: any) => {
    setSelectedUser(user);
    setShowUserDetails(true);
  };

  const handleEditUser = (user: any) => {
    setEditUser({...user});
    setShowEditUserModal(true);
    setShowUserDetails(false);
  };

  const handleDeleteUser = (user: any) => {
    setSelectedUser(user);
    setShowDeleteConfirmation(true);
    setShowUserDetails(false);
  };

  const handleAddUser = () => {
    if (newUser.password !== newUser.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    
    // Here you would typically make an API call to add the user
    console.log('Adding new user:', newUser);
    
    // Reset form and close modal
    setNewUser({
      name: '',
      email: '',
      phone: '',
      role: 'farmer',
      location: '',
      province: 'Lusaka Province',
      password: '',
      confirmPassword: ''
    });
    setShowAddUserModal(false);
    
    // Show success message
    alert('User added successfully!');
  };

  const handleUpdateUser = () => {
    // Here you would typically make an API call to update the user
    console.log('Updating user:', editUser);
    
    // Close modal
    setShowEditUserModal(false);
    
    // Show success message
    alert('User updated successfully!');
  };

  const handleConfirmDelete = () => {
    // Here you would typically make an API call to delete/deactivate the user
    console.log('Deactivating user:', selectedUser);
    
    // Close modal
    setShowDeleteConfirmation(false);
    
    // Show success message
    alert('User deactivated successfully!');
  };

  // Filter users based on search term, role, and province
  const filteredUsers = users.filter(user => {
    const matchesSearch = searchTerm === '' || 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = userFilter === 'all' || user.role === userFilter;
    const matchesProvince = provinceFilter === 'all' || user.province === provinceFilter;
    
    return matchesSearch && matchesRole && matchesProvince;
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

  return (
    <div className="p-4 space-y-4 pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 text-sm">System management</p>
        </div>
        <div className="p-2 bg-purple-100 rounded-full">
          <Shield className="w-5 h-5 text-purple-600" />
        </div>
      </div>

      {/* Admin Context Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-xl text-white p-4">
        <h3 className="font-bold mb-2">🇿🇲 AgriSmart Administration</h3>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-white bg-opacity-20 rounded-lg p-2">
            <p className="font-medium">Total Users</p>
            <p className="opacity-90">{adminStats.users.total.toLocaleString()} registered users</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-2">
            <p className="font-medium">System Status</p>
            <p className="opacity-90">All systems operational</p>
          </div>
        </div>
      </div>

      {/* Admin Tab Navigation */}
      <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {adminTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 text-center text-xs font-medium whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-b-2 border-purple-500 text-purple-600'
                    : 'text-gray-500'
                }`}
              >
                <Icon className={`w-4 h-4 mx-auto mb-1 ${activeTab === tab.id ? 'text-purple-600' : 'text-gray-500'}`} />
                {tab.name}
              </button>
            );
          })}
        </div>

        <div className="p-4">
          {activeTab === 'dashboard' && (
            <div className="space-y-4">
              {/* User Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-600">Total Users</p>
                      <p className="text-lg font-bold text-purple-600 mt-1">{adminStats.users.total.toLocaleString()}</p>
                    </div>
                    <div className="p-2 bg-purple-100 rounded-full">
                      <Users className="w-5 h-5 text-purple-600" />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-600">New This Month</p>
                      <p className="text-lg font-bold text-emerald-600 mt-1">{adminStats.users.newThisMonth}</p>
                    </div>
                    <div className="p-2 bg-emerald-100 rounded-full">
                      <User className="w-5 h-5 text-emerald-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Crop & Farm Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-600">Total Crops</p>
                      <p className="text-lg font-bold text-emerald-600 mt-1">{adminStats.crops.total.toLocaleString()}</p>
                    </div>
                    <div className="p-2 bg-emerald-100 rounded-full">
                      <Sprout className="w-5 h-5 text-emerald-600" />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-600">Total Farms</p>
                      <p className="text-lg font-bold text-blue-600 mt-1">{adminStats.farms.total.toLocaleString()}</p>
                    </div>
                    <div className="p-2 bg-blue-100 rounded-full">
                      <MapPin className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* IoT & Community Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-600">IoT Devices</p>
                      <p className="text-lg font-bold text-indigo-600 mt-1">{adminStats.iot.total}</p>
                      <p className="text-xs text-emerald-600 mt-1">{adminStats.iot.online} online</p>
                    </div>
                    <div className="p-2 bg-indigo-100 rounded-full">
                      <Cpu className="w-5 h-5 text-indigo-600" />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-600">Community</p>
                      <p className="text-lg font-bold text-orange-600 mt-1">{adminStats.community.totalPosts}</p>
                      <p className="text-xs text-gray-600 mt-1">{adminStats.community.totalReplies} replies</p>
                    </div>
                    <div className="p-2 bg-orange-100 rounded-full">
                      <MessageSquare className="w-5 h-5 text-orange-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                <h3 className="font-medium text-gray-900 mb-3 text-sm">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Farm Area</span>
                    <span className="font-semibold text-gray-900">{adminStats.farms.totalArea.toLocaleString()} hectares</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Yield</span>
                    <span className="font-semibold text-gray-900">{adminStats.crops.totalYield.toLocaleString()} tons</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Active Users</span>
                    <span className="font-semibold text-gray-900">{adminStats.community.activeUsers} users</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-4">
              {/* Add User Button */}
              <button 
                onClick={() => setShowAddUserModal(true)}
                className="w-full bg-purple-600 text-white py-3 px-4 rounded-xl hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add New User</span>
              </button>

              {/* User Filters */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm"
                >
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </button>
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>

              {showFilters && (
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <h3 className="font-medium text-gray-900 mb-3 text-sm">Filter Users</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Role</label>
                      <select 
                        value={userFilter}
                        onChange={(e) => setUserFilter(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      >
                        <option value="all">All Roles</option>
                        <option value="farmer">Farmers</option>
                        <option value="extension_officer">Extension Officers</option>
                        <option value="cooperative">Cooperatives</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Province</label>
                      <select 
                        value={provinceFilter}
                        onChange={(e) => setProvinceFilter(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      >
                        <option value="all">All Provinces</option>
                        {zambianProvinces.map(province => (
                          <option key={province} value={province}>{province}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* User List */}
              <div className="space-y-3">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <div 
                      key={user.id} 
                      className="bg-white rounded-xl shadow-sm border border-gray-200 p-4"
                      onClick={() => handleViewUser(user)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-gray-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{user.name}</p>
                            <p className="text-xs text-gray-600">{user.email}</p>
                            <div className="flex items-center text-xs text-gray-500 mt-1">
                              <MapPin className="w-3 h-3 mr-1" />
                              <span>{user.location}, {user.province}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                            {user.role.replace('_', ' ')}
                          </span>
                          <span className={`mt-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                            {user.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          <span>Joined: {new Date(user.joinDate).toLocaleDateString()}</span>
                        </div>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-gray-50 rounded-xl p-6 text-center">
                    <p className="text-gray-500">No users found matching your filters</p>
                    <button 
                      onClick={() => {
                        setSearchTerm('');
                        setUserFilter('all');
                        setProvinceFilter('all');
                      }}
                      className="mt-2 text-purple-600 text-sm font-medium"
                    >
                      Clear filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'farms' && (
            <div className="space-y-4">
              {/* Add Farm Button */}
              <button 
                onClick={() => setShowAddFarmModal(true)}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Farm</span>
              </button>

              {/* Farm Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search farms..."
                  className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              {/* Farm List */}
              <div className="space-y-3">
                {farms.map((farm) => (
                  <div 
                    key={farm.id} 
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-4"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{farm.name}</h4>
                        <p className="text-xs text-gray-600">Owner: {farm.owner}</p>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          <span>{farm.location}, {farm.province}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-blue-600">{farm.totalArea} ha</p>
                        <span className={`mt-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(farm.status)}`}>
                          {farm.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {farm.crops.map((crop, index) => (
                        <span key={index} className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs">
                          {crop}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>View Details</span>
                      </button>
                      <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-4">
              {/* User Growth */}
              <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                <h3 className="font-medium text-gray-900 mb-3 text-sm">User Growth</h3>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Total Users</span>
                  <span className="font-semibold text-gray-900">{adminStats.users.total.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-500 h-2 rounded-full"
                    style={{ width: '75%' }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Target: 2,000</span>
                  <span>75% achieved</span>
                </div>
              </div>

              {/* Farm Performance */}
              <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                <h3 className="font-medium text-gray-900 mb-3 text-sm">Farm Performance by Province</h3>
                <div className="space-y-3">
                  {adminStats.farms.byProvince.map((province, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">{province.province}</span>
                      <div className="flex items-center space-x-3">
                        <div className="w-24 bg-gray-200 rounded-full h-1.5">
                          <div
                            className="bg-blue-500 h-1.5 rounded-full"
                            style={{ width: `${(province.count / adminStats.farms.total) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {province.count} farms
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Crop Distribution */}
              <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                <h3 className="font-medium text-gray-900 mb-3 text-sm">Crop Distribution</h3>
                <div className="space-y-3">
                  {adminStats.crops.byCrop.map((crop, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">{crop.crop}</span>
                      <div className="flex items-center space-x-3">
                        <div className="w-24 bg-gray-200 rounded-full h-1.5">
                          <div
                            className="bg-emerald-500 h-1.5 rounded-full"
                            style={{ width: `${(crop.count / adminStats.crops.total) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {crop.count}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'system' && (
            <div className="space-y-4">
              {/* System Health */}
              <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900 text-sm">System Health</h3>
                  <button className="p-1.5 bg-gray-100 rounded-lg text-gray-600">
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-emerald-100 rounded-lg">
                        <Database className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">Database</p>
                        <p className="text-xs text-gray-600">MongoDB</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-emerald-600">{systemHealth.database.status}</p>
                      <p className="text-xs text-gray-600">{systemHealth.database.responseTime}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-emerald-100 rounded-lg">
                        <Activity className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">API</p>
                        <p className="text-xs text-gray-600">Express.js</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-emerald-600">{systemHealth.api.status}</p>
                      <p className="text-xs text-gray-600">{systemHealth.api.uptime} uptime</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-emerald-100 rounded-lg">
                        <Server className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">Storage</p>
                        <p className="text-xs text-gray-600">File System</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-emerald-600">{systemHealth.storage.usage}</p>
                      <p className="text-xs text-gray-600">{systemHealth.storage.used} / {systemHealth.storage.available}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* System Maintenance */}
              <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                <h3 className="font-medium text-gray-900 mb-3 text-sm">System Maintenance</h3>
                <div className="space-y-3">
                  <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                    <Database className="w-4 h-4" />
                    <span>Backup Database</span>
                  </button>
                  <button className="w-full bg-purple-600 text-white py-3 px-4 rounded-xl hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2">
                    <Activity className="w-4 h-4" />
                    <span>View System Logs</span>
                  </button>
                  <button className="w-full bg-emerald-600 text-white py-3 px-4 rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2">
                    <Server className="w-4 h-4" />
                    <span>Check for Updates</span>
                  </button>
                </div>
              </div>

              {/* Recent System Alerts */}
              <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                <h3 className="font-medium text-gray-900 mb-3 text-sm">Recent System Alerts</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-medium text-yellow-800 text-sm">High API Usage</h4>
                      <p className="text-xs text-yellow-700 mt-1">API requests exceeded 200/min threshold at 14:35.</p>
                      <p className="text-xs text-yellow-600 mt-1">2 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-medium text-emerald-800 text-sm">Database Backup Completed</h4>
                      <p className="text-xs text-emerald-700 mt-1">Daily backup completed successfully. Size: 1.2GB</p>
                      <p className="text-xs text-emerald-600 mt-1">6 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* User Details Modal */}
      {showUserDetails && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col">
          <div className="bg-white rounded-t-2xl mt-auto max-h-[90vh] overflow-y-auto w-full">
            <div className="sticky top-0 bg-white px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">User Details</h3>
              <button 
                onClick={() => setShowUserDetails(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              {/* User Profile */}
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-gray-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{selectedUser.name}</h4>
                  <p className="text-sm text-gray-600">{selectedUser.email}</p>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <Phone className="w-3 h-3 mr-1" />
                    <span>{selectedUser.phone}</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span>{selectedUser.location}, {selectedUser.province}</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(selectedUser.role)}`}>
                      {selectedUser.role.replace('_', ' ')}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedUser.status)}`}>
                      {selectedUser.status}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* User Details */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-medium text-gray-900 mb-3 text-sm">Account Details</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Join Date:</span>
                    <span className="text-sm font-medium text-gray-900">{new Date(selectedUser.joinDate).toLocaleDateString()}</span>
                  </div>
                  {selectedUser.role === 'farmer' && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Farms:</span>
                        <span className="text-sm font-medium text-gray-900">{selectedUser.farms}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Crops:</span>
                        <span className="text-sm font-medium text-gray-900">{selectedUser.crops}</span>
                      </div>
                    </>
                  )}
                  {selectedUser.role === 'extension_officer' && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Expertise:</span>
                      <span className="text-sm font-medium text-gray-900">{selectedUser.expertise}</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Admin Actions */}
              <div className="flex space-x-3 pt-4">
                <button 
                  onClick={() => handleEditUser(selectedUser)}
                  className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit User</span>
                </button>
                <button 
                  onClick={() => handleDeleteUser(selectedUser)}
                  className="flex-1 bg-red-600 text-white py-3 px-4 rounded-xl hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Deactivate</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col">
          <div className="bg-white rounded-t-2xl mt-auto max-h-[90vh] overflow-y-auto w-full">
            <div className="sticky top-0 bg-white px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Add New User</h3>
              <button 
                onClick={() => setShowAddUserModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input 
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input 
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter email address"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input 
                  type="tel"
                  value={newUser.phone}
                  onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                  className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="e.g., +260 977 123 456"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <select 
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                  className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  required
                >
                  <option value="farmer">Farmer</option>
                  <option value="extension_officer">Extension Officer</option>
                  <option value="cooperative">Cooperative</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input 
                    type="text"
                    value={newUser.location}
                    onChange={(e) => setNewUser({...newUser, location: e.target.value})}
                    className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="e.g., Chongwe"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Province</label>
                  <select 
                    value={newUser.province}
                    onChange={(e) => setNewUser({...newUser, province: e.target.value})}
                    className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    required
                  >
                    {zambianProvinces.map(province => (
                      <option key={province} value={province}>{province}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input 
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                  className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter password"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <input 
                  type="password"
                  value={newUser.confirmPassword}
                  onChange={(e) => setNewUser({...newUser, confirmPassword: e.target.value})}
                  className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Confirm password"
                  required
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button 
                  onClick={() => setShowAddUserModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-xl hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddUser}
                  className="flex-1 bg-purple-600 text-white py-3 px-4 rounded-xl hover:bg-purple-700 transition-colors"
                >
                  Add User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col">
          <div className="bg-white rounded-t-2xl mt-auto max-h-[90vh] overflow-y-auto w-full">
            <div className="sticky top-0 bg-white px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Edit User</h3>
              <button 
                onClick={() => setShowEditUserModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input 
                  type="text"
                  value={editUser.name || ''}
                  onChange={(e) => setEditUser({...editUser, name: e.target.value})}
                  className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input 
                  type="email"
                  value={editUser.email || ''}
                  onChange={(e) => setEditUser({...editUser, email: e.target.value})}
                  className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input 
                  type="tel"
                  value={editUser.phone || ''}
                  onChange={(e) => setEditUser({...editUser, phone: e.target.value})}
                  className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <select 
                  value={editUser.role || ''}
                  onChange={(e) => setEditUser({...editUser, role: e.target.value})}
                  className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="farmer">Farmer</option>
                  <option value="extension_officer">Extension Officer</option>
                  <option value="cooperative">Cooperative</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input 
                    type="text"
                    value={editUser.location || ''}
                    onChange={(e) => setEditUser({...editUser, location: e.target.value})}
                    className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Province</label>
                  <select 
                    value={editUser.province || ''}
                    onChange={(e) => setEditUser({...editUser, province: e.target.value})}
                    className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {zambianProvinces.map(province => (
                      <option key={province} value={province}>{province}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select 
                  value={editUser.status || ''}
                  onChange={(e) => setEditUser({...editUser, status: e.target.value})}
                  className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
              </div>

              <div className="flex space-x-3 pt-4">
                <button 
                  onClick={() => setShowEditUserModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-xl hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleUpdateUser}
                  className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmation && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-6">
            <div className="text-center mb-6">
              <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Deactivate User</h3>
              <p className="text-sm text-gray-600">
                Are you sure you want to deactivate {selectedUser.name}? This action can be reversed later.
              </p>
            </div>
            
            <div className="flex space-x-3">
              <button 
                onClick={() => setShowDeleteConfirmation(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-xl hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmDelete}
                className="flex-1 bg-red-600 text-white py-3 px-4 rounded-xl hover:bg-red-700 transition-colors"
              >
                Deactivate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Farm Modal */}
      {showAddFarmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col">
          <div className="bg-white rounded-t-2xl mt-auto max-h-[90vh] overflow-y-auto w-full">
            <div className="sticky top-0 bg-white px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Add New Farm</h3>
              <button 
                onClick={() => setShowAddFarmModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Farm Name</label>
                <input 
                  type="text"
                  className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Mwanza Family Farm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Owner</label>
                <select 
                  className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select farm owner</option>
                  {users.filter(user => user.role === 'farmer').map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input 
                    type="text"
                    className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Chongwe District"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Province</label>
                  <select 
                    className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    {zambianProvinces.map(province => (
                      <option key={province} value={province}>{province}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Total Area (hectares)</label>
                <input 
                  type="number"
                  className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 25"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Main Crops</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Maize', 'Soybeans', 'Groundnuts', 'Sunflower', 'Cotton', 'Tobacco'].map(crop => (
                    <label key={crop} className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{crop}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button 
                  onClick={() => setShowAddFarmModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-xl hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    alert('Farm added successfully!');
                    setShowAddFarmModal(false);
                  }}
                  className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Add Farm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileAdminDashboard;