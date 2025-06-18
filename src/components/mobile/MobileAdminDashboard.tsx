import React, { useState } from 'react';
import { 
  Users, 
  Sprout, 
  Cpu, 
  Package, 
  Shield, 
  BarChart3, 
  Search, 
  Filter, 
  ChevronRight, 
  User, 
  MapPin, 
  Building, 
  Calendar, 
  CheckCircle, 
  X, 
  Edit, 
  Trash2, 
  Eye,
  Plus,
  Mail,
  Phone,
  Lock,
  Save
} from 'lucide-react';

const MobileAdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showFarmDetails, setShowFarmDetails] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedFarm, setSelectedFarm] = useState<any>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showAddFarmModal, setShowAddFarmModal] = useState(false);

  // New user form state
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'farmer',
    location: '',
    province: ''
  });

  // New farm form state
  const [newFarm, setNewFarm] = useState({
    name: '',
    owner: '',
    location: '',
    province: '',
    totalArea: '',
    crops: [] as string[]
  });

  // Admin dashboard stats
  const adminStats = {
    users: {
      total: 1247,
      farmers: 1180,
      extensionOfficers: 45,
      cooperatives: 22,
      newThisMonth: 87
    },
    farms: {
      total: 1350,
      totalArea: 28500,
      byProvince: [
        { province: 'Lusaka Province', count: 320, totalArea: 6800 },
        { province: 'Central Province', count: 280, totalArea: 7200 },
        { province: 'Eastern Province', count: 210, totalArea: 4500 }
      ]
    },
    crops: {
      total: 3850,
      byCrop: [
        { crop: 'Maize', count: 1850, totalArea: 15600 },
        { crop: 'Soybeans', count: 780, totalArea: 6200 },
        { crop: 'Groundnuts', count: 620, totalArea: 3100 }
      ],
      totalYield: 24680
    },
    iot: {
      total: 875,
      online: 780,
      byType: [
        { type: 'Soil Monitor', count: 420 },
        { type: 'Weather Monitor', count: 180 },
        { type: 'Irrigation System', count: 150 }
      ]
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
      farmers: 45,
      regions: ['Lusaka Province', 'Central Province']
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
      farmers: 32,
      regions: ['Central Province']
    },
    {
      id: 5,
      name: 'John Phiri',
      email: 'john@example.com',
      phone: '+260 966 567 890',
      role: 'farmer',
      location: 'Chipata',
      province: 'Eastern Province',
      joinDate: '2024-03-20',
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
      location: 'Chongwe',
      province: 'Lusaka Province',
      totalArea: 25,
      crops: ['Maize', 'Soybeans', 'Groundnuts'],
      status: 'active',
      soilType: 'Sandy loam',
      waterSource: 'Borehole + Seasonal streams',
      establishedYear: 2010,
      certification: 'Organic certified',
      performance: {
        totalYield: 156.8,
        profitMargin: 38.2,
        sustainabilityScore: 81,
        efficiency: 85
      }
    },
    {
      id: 2,
      name: 'Mkushi Commercial Farm',
      owner: 'Peter Mulenga',
      location: 'Mkushi',
      province: 'Central Province',
      totalArea: 120,
      crops: ['Maize', 'Wheat', 'Soybeans'],
      status: 'active',
      soilType: 'Red clay loam',
      waterSource: 'Mkushi River + Boreholes',
      establishedYear: 1987,
      certification: 'COMESA certified',
      performance: {
        totalYield: 780.5,
        profitMargin: 42.1,
        sustainabilityScore: 75,
        efficiency: 88
      }
    },
    {
      id: 3,
      name: 'Eastern Cooperative',
      owner: 'Chipata Cooperative',
      location: 'Chipata',
      province: 'Eastern Province',
      totalArea: 350,
      crops: ['Maize', 'Groundnuts', 'Cotton'],
      status: 'active',
      soilType: 'Alluvial soil',
      waterSource: 'Seasonal streams',
      establishedYear: 2005,
      certification: 'Cooperative registered',
      performance: {
        totalYield: 1250.2,
        profitMargin: 35.8,
        sustainabilityScore: 72,
        efficiency: 80
      }
    }
  ];

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

  const cropOptions = ['Maize', 'Soybeans', 'Groundnuts', 'Sunflower', 'Cotton', 'Tobacco', 'Cassava', 'Sweet potatoes'];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'extension_officer': return 'bg-blue-100 text-blue-800';
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

  const handleViewFarm = (farm: any) => {
    setSelectedFarm(farm);
    setShowFarmDetails(true);
  };

  const handleAddUser = () => {
    // Here you would typically save to database
    console.log('Adding new user:', newUser);
    
    // Add user to the list (in a real app, this would be an API call)
    const newId = users.length + 1;
    const userToAdd = {
      id: newId,
      ...newUser,
      joinDate: new Date().toISOString().split('T')[0],
      status: 'active',
      farms: 0,
      crops: 0
    };
    
    // In a real app, you would update the state with the new user
    // users.push(userToAdd);
    
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
    
    alert('User added successfully!');
  };

  const handleAddFarm = () => {
    // Here you would typically save to database
    console.log('Adding new farm:', newFarm);
    
    // Add farm to the list (in a real app, this would be an API call)
    const newId = farms.length + 1;
    const farmToAdd = {
      id: newId,
      ...newFarm,
      status: 'active',
      establishedYear: new Date().getFullYear(),
      performance: {
        totalYield: 0,
        profitMargin: 0,
        sustainabilityScore: 0,
        efficiency: 0
      }
    };
    
    // In a real app, you would update the state with the new farm
    // farms.push(farmToAdd);
    
    setShowAddFarmModal(false);
    setNewFarm({
      name: '',
      owner: '',
      location: '',
      province: '',
      totalArea: '',
      crops: []
    });
    
    alert('Farm added successfully!');
  };

  const toggleCrop = (crop: string) => {
    const currentCrops = newFarm.crops;
    if (currentCrops.includes(crop)) {
      setNewFarm({
        ...newFarm,
        crops: currentCrops.filter(c => c !== crop)
      });
    } else {
      setNewFarm({
        ...newFarm,
        crops: [...currentCrops, crop]
      });
    }
  };

  return (
    <div className="p-4 space-y-4 pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 text-sm">System management and analytics</p>
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
            <p className="opacity-90">All services operational</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
        <div className="flex border-b border-gray-200">
          {[
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'users', label: 'Users' },
            { id: 'farms', label: 'Farms' },
            { id: 'system', label: 'System' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 text-center text-xs font-medium ${
                activeTab === tab.id
                  ? 'border-b-2 border-purple-500 text-purple-600'
                  : 'text-gray-500'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-4">
          {activeTab === 'dashboard' && (
            <div className="space-y-4">
              {/* Stats Overview */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-600">Total Users</p>
                      <p className="text-lg font-bold text-gray-900 mt-1">{adminStats.users.total}</p>
                    </div>
                    <div className="p-2 bg-blue-100 rounded-full">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-600">Total Farms</p>
                      <p className="text-lg font-bold text-emerald-600 mt-1">{adminStats.farms.total}</p>
                    </div>
                    <div className="p-2 bg-emerald-100 rounded-full">
                      <Building className="w-5 h-5 text-emerald-600" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-600">Total Crops</p>
                      <p className="text-lg font-bold text-green-600 mt-1">{adminStats.crops.total}</p>
                    </div>
                    <div className="p-2 bg-green-100 rounded-full">
                      <Sprout className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-600">IoT Devices</p>
                      <p className="text-lg font-bold text-purple-600 mt-1">{adminStats.iot.total}</p>
                    </div>
                    <div className="p-2 bg-purple-100 rounded-full">
                      <Cpu className="w-5 h-5 text-purple-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* User Breakdown */}
              <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                <h3 className="font-medium text-gray-900 mb-3 text-sm">User Breakdown</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Farmers</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-green-500 h-1.5 rounded-full"
                          style={{ width: `${(adminStats.users.farmers / adminStats.users.total) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {adminStats.users.farmers}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Extension Officers</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-blue-500 h-1.5 rounded-full"
                          style={{ width: `${(adminStats.users.extensionOfficers / adminStats.users.total) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {adminStats.users.extensionOfficers}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Cooperatives</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-orange-500 h-1.5 rounded-full"
                          style={{ width: `${(adminStats.users.cooperatives / adminStats.users.total) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {adminStats.users.cooperatives}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* System Health */}
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl text-white p-4">
                <h3 className="font-bold mb-2 flex items-center">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  System Health
                </h3>
                <div className="space-y-2">
                  <div className="bg-white bg-opacity-20 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-sm">Database</h4>
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs">Healthy</span>
                    </div>
                    <p className="text-xs opacity-90 mt-1">Response time: < 50ms</p>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-sm">API Services</h4>
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs">Operational</span>
                    </div>
                    <p className="text-xs opacity-90 mt-1">Uptime: 99.9%</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-4">
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
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                        <option value="all">All Roles</option>
                        <option value="farmer">Farmers</option>
                        <option value="extension_officer">Extension Officers</option>
                        <option value="cooperative">Cooperatives</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Province</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                        <option value="all">All Provinces</option>
                        <option value="Lusaka Province">Lusaka Province</option>
                        <option value="Central Province">Central Province</option>
                        <option value="Eastern Province">Eastern Province</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                        <option value="all">All Statuses</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="pending">Pending</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* User List */}
              <div className="space-y-3">
                {users.map((user) => (
                  <div key={user.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4">
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
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleViewUser(user)}
                            className="p-1.5 bg-purple-100 text-purple-700 rounded-lg"
                          >
                            <Eye className="w-3 h-3" />
                          </button>
                          <button className="p-1.5 bg-blue-100 text-blue-700 rounded-lg">
                            <Edit className="w-3 h-3" />
                          </button>
                          <button className="p-1.5 bg-red-100 text-red-700 rounded-lg">
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add User Button */}
              <button 
                onClick={() => setShowAddUserModal(true)}
                className="w-full bg-purple-600 text-white py-3 px-4 rounded-xl hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add New User</span>
              </button>
            </div>
          )}

          {activeTab === 'farms' && (
            <div className="space-y-4">
              {/* Farm Filters */}
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
                    placeholder="Search farms..."
                    className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Farm List */}
              <div className="space-y-3">
                {farms.map((farm) => (
                  <div key={farm.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-medium text-gray-900">{farm.name}</p>
                          <p className="text-xs text-gray-600">Owner: {farm.owner}</p>
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <MapPin className="w-3 h-3 mr-1" />
                            <span>{farm.location}, {farm.province}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-emerald-600">{farm.totalArea} ha</p>
                          <span className={`mt-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(farm.status)}`}>
                            {farm.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {farm.crops.map((crop, index) => (
                          <span key={index} className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                            {crop}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center">
                          <Sprout className="w-3 h-3 mr-1" />
                          <span>{farm.crops.length} crops</span>
                        </div>
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleViewFarm(farm)}
                            className="p-1.5 bg-purple-100 text-purple-700 rounded-lg"
                          >
                            <Eye className="w-3 h-3" />
                          </button>
                          <button className="p-1.5 bg-blue-100 text-blue-700 rounded-lg">
                            <Edit className="w-3 h-3" />
                          </button>
                          <button className="p-1.5 bg-red-100 text-red-700 rounded-lg">
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Farm Button */}
              <button 
                onClick={() => setShowAddFarmModal(true)}
                className="w-full bg-emerald-600 text-white py-3 px-4 rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Farm</span>
              </button>
            </div>
          )}

          {activeTab === 'system' && (
            <div className="space-y-4">
              {/* System Health */}
              <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                <h3 className="font-medium text-gray-900 mb-3 text-sm">System Health</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">Database</p>
                      <p className="text-xs text-gray-600">MongoDB Connection</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                      <span className="text-xs font-medium text-emerald-600">Healthy</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">API Services</p>
                      <p className="text-xs text-gray-600">REST Endpoints</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                      <span className="text-xs font-medium text-emerald-600">Operational</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">Storage</p>
                      <p className="text-xs text-gray-600">File System</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                      <span className="text-xs font-medium text-emerald-600">4.6% Used</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* System Maintenance */}
              <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                <h3 className="font-medium text-gray-900 mb-3 text-sm">System Maintenance</h3>
                <div className="space-y-3">
                  <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                    <Package className="w-4 h-4" />
                    <span>Backup Database</span>
                  </button>
                  <button className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2">
                    <BarChart3 className="w-4 h-4" />
                    <span>Generate System Report</span>
                  </button>
                  <button className="w-full bg-yellow-600 text-white py-3 px-4 rounded-lg hover:bg-yellow-700 transition-colors flex items-center justify-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Run System Diagnostics</span>
                  </button>
                </div>
              </div>

              {/* System Logs */}
              <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                <h3 className="font-medium text-gray-900 mb-3 text-sm">Recent System Logs</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  <div className="p-2 bg-gray-50 rounded-lg text-xs">
                    <span className="text-emerald-600 font-medium">[INFO]</span> User login successful - james@example.com (2 minutes ago)
                  </div>
                  <div className="p-2 bg-gray-50 rounded-lg text-xs">
                    <span className="text-emerald-600 font-medium">[INFO]</span> New crop added - Maize, Mwanza Family Farm (15 minutes ago)
                  </div>
                  <div className="p-2 bg-yellow-50 rounded-lg text-xs">
                    <span className="text-yellow-600 font-medium">[WARN]</span> High API request rate detected (30 minutes ago)
                  </div>
                  <div className="p-2 bg-gray-50 rounded-lg text-xs">
                    <span className="text-emerald-600 font-medium">[INFO]</span> Database backup completed successfully (1 hour ago)
                  </div>
                  <div className="p-2 bg-red-50 rounded-lg text-xs">
                    <span className="text-red-600 font-medium">[ERROR]</span> Failed login attempt - unknown@example.com (2 hours ago)
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
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{selectedUser.name}</h4>
                  <p className="text-sm text-gray-600">{selectedUser.email}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getRoleColor(selectedUser.role)}`}>
                      {selectedUser.role.replace('_', ' ')}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedUser.status)}`}>
                      {selectedUser.status}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Phone:</span>
                  <span className="text-sm font-medium text-gray-900">{selectedUser.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Location:</span>
                  <span className="text-sm font-medium text-gray-900">{selectedUser.location}, {selectedUser.province}</span>
                </div>
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
                  <>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Farmers Supported:</span>
                      <span className="text-sm font-medium text-gray-900">{selectedUser.farmers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Regions:</span>
                      <span className="text-sm font-medium text-gray-900">{selectedUser.regions.join(', ')}</span>
                    </div>
                  </>
                )}
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                  <Edit className="w-4 h-4" />
                  <span>Edit User</span>
                </button>
                <button className="flex-1 bg-red-600 text-white py-3 px-4 rounded-xl hover:bg-red-700 transition-colors flex items-center justify-center space-x-2">
                  <Trash2 className="w-4 h-4" />
                  <span>Deactivate</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Farm Details Modal */}
      {showFarmDetails && selectedFarm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col">
          <div className="bg-white rounded-t-2xl mt-auto max-h-[90vh] overflow-y-auto w-full">
            <div className="sticky top-0 bg-white px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Farm Details</h3>
              <button 
                onClick={() => setShowFarmDetails(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-emerald-100 rounded-full">
                  <Building className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{selectedFarm.name}</h4>
                  <p className="text-sm text-gray-600">Owner: {selectedFarm.owner}</p>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Location:</span>
                  <span className="text-sm font-medium text-gray-900">{selectedFarm.location}, {selectedFarm.province}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Area:</span>
                  <span className="text-sm font-medium text-gray-900">{selectedFarm.totalArea} hectares</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Soil Type:</span>
                  <span className="text-sm font-medium text-gray-900">{selectedFarm.soilType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Water Source:</span>
                  <span className="text-sm font-medium text-gray-900">{selectedFarm.waterSource}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Established:</span>
                  <span className="text-sm font-medium text-gray-900">{selectedFarm.establishedYear}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Certification:</span>
                  <span className="text-sm font-medium text-gray-900">{selectedFarm.certification}</span>
                </div>
              </div>
              
              <div className="bg-emerald-50 rounded-xl p-4">
                <h4 className="font-medium text-emerald-800 mb-3 text-sm">Crops</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedFarm.crops.map((crop: string, index: number) => (
                    <span key={index} className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs">
                      {crop}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-xl p-4">
                <h4 className="font-medium text-blue-800 mb-3 text-sm">Performance Metrics</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-blue-700">Total Yield:</p>
                    <p className="text-sm font-semibold text-blue-900">{selectedFarm.performance.totalYield} tons</p>
                  </div>
                  <div>
                    <p className="text-xs text-blue-700">Profit Margin:</p>
                    <p className="text-sm font-semibold text-blue-900">{selectedFarm.performance.profitMargin}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-blue-700">Sustainability:</p>
                    <p className="text-sm font-semibold text-blue-900">{selectedFarm.performance.sustainabilityScore}/100</p>
                  </div>
                  <div>
                    <p className="text-xs text-blue-700">Efficiency:</p>
                    <p className="text-sm font-semibold text-blue-900">{selectedFarm.performance.efficiency}%</p>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                  <Edit className="w-4 h-4" />
                  <span>Edit Farm</span>
                </button>
                <button className="flex-1 bg-red-600 text-white py-3 px-4 rounded-xl hover:bg-red-700 transition-colors flex items-center justify-center space-x-2">
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
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={newUser.name}
                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Enter full name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Enter email address"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    value={newUser.phone}
                    onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="+260 977 123 456"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Create password"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                  className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="farmer">Farmer</option>
                  <option value="extension_officer">Extension Officer</option>
                  <option value="cooperative">Cooperative</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location/District</label>
                  <input
                    type="text"
                    value={newUser.location}
                    onChange={(e) => setNewUser({...newUser, location: e.target.value})}
                    className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="e.g., Chongwe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Province</label>
                  <select
                    value={newUser.province}
                    onChange={(e) => setNewUser({...newUser, province: e.target.value})}
                    className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="">Select Province</option>
                    {zambianProvinces.map(province => (
                      <option key={province} value={province}>{province}</option>
                    ))}
                  </select>
                </div>
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
                  className="flex-1 bg-purple-600 text-white py-3 px-4 rounded-xl hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Add User</span>
                </button>
              </div>
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
                  value={newFarm.name}
                  onChange={(e) => setNewFarm({...newFarm, name: e.target.value})}
                  className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="e.g., Mwanza Family Farm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Owner</label>
                <select
                  value={newFarm.owner}
                  onChange={(e) => setNewFarm({...newFarm, owner: e.target.value})}
                  className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">Select Owner</option>
                  {users.filter(user => user.role === 'farmer').map(user => (
                    <option key={user.id} value={user.name}>{user.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location/District</label>
                  <input
                    type="text"
                    value={newFarm.location}
                    onChange={(e) => setNewFarm({...newFarm, location: e.target.value})}
                    className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="e.g., Chongwe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Province</label>
                  <select
                    value={newFarm.province}
                    onChange={(e) => setNewFarm({...newFarm, province: e.target.value})}
                    className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="">Select Province</option>
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
                  value={newFarm.totalArea}
                  onChange={(e) => setNewFarm({...newFarm, totalArea: e.target.value})}
                  className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="e.g., 25"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Crops</label>
                <div className="grid grid-cols-2 gap-2">
                  {cropOptions.slice(0, 6).map(crop => (
                    <label key={crop} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newFarm.crops.includes(crop)}
                        onChange={() => toggleCrop(crop)}
                        className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
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
                  onClick={handleAddFarm}
                  className="flex-1 bg-emerald-600 text-white py-3 px-4 rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Add Farm</span>
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