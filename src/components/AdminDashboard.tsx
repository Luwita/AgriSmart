import React, { useState } from 'react';
import { Users, Settings, BarChart3, Shield, Database, Bell, Globe, DollarSign, TrendingUp, AlertTriangle, CheckCircle, Clock, Eye, Edit, Trash2, Plus, Search, Filter, Download, Upload, X, Save, RefreshCw, Mail, Phone, MapPin, Calendar, Star, Award, Building, Sprout, Activity, FileText, Lock, Unlock, Ban, UserCheck, MessageSquare, Zap, Server, HardDrive, Wifi, Monitor, Cpu, MemoryStick, Network, Bug, PenTool as Tool, Target, Lightbulb, BookOpen, Video, Image, Link, Share2, Heart, ThumbsUp, Flag, Archive, Bookmark } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTimeframe, setSelectedTimeframe] = useState('30days');
  const [showUserModal, setShowUserModal] = useState(false);
  const [showContentModal, setShowContentModal] = useState(false);
  const [showSystemModal, setShowSystemModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [userFilter, setUserFilter] = useState('all');
  const [contentFilter, setContentFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Admin Overview Statistics
  const adminStats = {
    totalUsers: 1247,
    activeUsers: 892,
    newUsersToday: 23,
    totalFarms: 1156,
    totalRevenue: 125600,
    monthlyGrowth: 18.5,
    systemUptime: 99.8,
    supportTickets: 45,
    contentItems: 2341,
    storageUsed: 78.5
  };

  // User Management Data
  const users = [
    {
      id: 1,
      name: 'James Mwanza',
      email: 'james.mwanza@email.com',
      phone: '+260 977 123 456',
      role: 'farmer',
      province: 'Lusaka Province',
      farmSize: '25 hectares',
      joinDate: '2024-01-15',
      lastActive: '2 hours ago',
      status: 'active',
      subscription: 'basic',
      totalPosts: 23,
      reputation: 245,
      verified: true,
      revenue: 4500
    },
    {
      id: 2,
      name: 'Mary Banda',
      email: 'mary.banda@email.com',
      phone: '+260 966 234 567',
      role: 'farmer',
      province: 'Central Province',
      farmSize: '45 hectares',
      joinDate: '2023-08-20',
      lastActive: '1 day ago',
      status: 'active',
      subscription: 'premium',
      totalPosts: 67,
      reputation: 456,
      verified: true,
      revenue: 8900
    },
    {
      id: 3,
      name: 'Dr. Michael Chisanga',
      email: 'dr.chisanga@agriculture.gov.zm',
      phone: '+260 955 345 678',
      role: 'extension_officer',
      province: 'Multiple',
      farmSize: 'N/A',
      joinDate: '2023-05-10',
      lastActive: '30 minutes ago',
      status: 'active',
      subscription: 'free',
      totalPosts: 156,
      reputation: 1250,
      verified: true,
      revenue: 0
    },
    {
      id: 4,
      name: 'Peter Mulenga',
      email: 'peter.mulenga@email.com',
      phone: '+260 979 456 789',
      role: 'farmer',
      province: 'Eastern Province',
      farmSize: '15 hectares',
      joinDate: '2024-03-22',
      lastActive: '1 week ago',
      status: 'inactive',
      subscription: 'free',
      totalPosts: 8,
      reputation: 89,
      verified: false,
      revenue: 1200
    },
    {
      id: 5,
      name: 'Grace Tembo',
      email: 'grace.tembo@znfu.org.zm',
      phone: '+260 966 567 890',
      role: 'cooperative',
      province: 'Southern Province',
      farmSize: '200 hectares',
      joinDate: '2023-11-05',
      lastActive: '3 hours ago',
      status: 'active',
      subscription: 'premium',
      totalPosts: 89,
      reputation: 678,
      verified: true,
      revenue: 15600
    }
  ];

  // Content Management Data
  const contentItems = [
    {
      id: 1,
      title: 'Sustainable Maize Farming in Zambia',
      type: 'video',
      author: 'Dr. James Mwanza',
      category: 'crops',
      status: 'published',
      views: 12500,
      likes: 456,
      comments: 89,
      createdDate: '2024-11-15',
      lastModified: '2024-12-01',
      language: 'English/Bemba',
      duration: '15:30',
      featured: true
    },
    {
      id: 2,
      title: 'Fall Armyworm Control Methods',
      type: 'article',
      author: 'Mary Banda',
      category: 'pest_management',
      status: 'published',
      views: 8900,
      likes: 234,
      comments: 67,
      createdDate: '2024-12-10',
      lastModified: '2024-12-12',
      language: 'English',
      duration: 'N/A',
      featured: false
    },
    {
      id: 3,
      title: 'Organic Farming Certification Guide',
      type: 'guide',
      author: 'AgriSmart Team',
      category: 'sustainability',
      status: 'draft',
      views: 0,
      likes: 0,
      comments: 0,
      createdDate: '2024-12-14',
      lastModified: '2024-12-15',
      language: 'English/Nyanja',
      duration: 'N/A',
      featured: false
    },
    {
      id: 4,
      title: 'Water Conservation Techniques',
      type: 'video',
      author: 'Peter Mulenga',
      category: 'water_management',
      status: 'review',
      views: 0,
      likes: 0,
      comments: 0,
      createdDate: '2024-12-13',
      lastModified: '2024-12-14',
      language: 'English/Tonga',
      duration: '12:45',
      featured: false
    }
  ];

  // System Analytics Data
  const userGrowthData = [
    { month: 'Jul', users: 856, active: 645, revenue: 89500 },
    { month: 'Aug', users: 923, active: 698, revenue: 95200 },
    { month: 'Sep', users: 987, active: 742, revenue: 102300 },
    { month: 'Oct', users: 1045, active: 789, revenue: 108900 },
    { month: 'Nov', users: 1156, active: 834, revenue: 118700 },
    { month: 'Dec', users: 1247, active: 892, revenue: 125600 }
  ];

  const subscriptionData = [
    { name: 'Free', value: 756, color: '#6B7280' },
    { name: 'Basic', value: 345, color: '#3B82F6' },
    { name: 'Premium', value: 146, color: '#10B981' }
  ];

  const provinceData = [
    { province: 'Lusaka', users: 234, farms: 198 },
    { province: 'Central', users: 189, farms: 167 },
    { province: 'Copperbelt', users: 156, farms: 134 },
    { province: 'Eastern', users: 145, farms: 128 },
    { province: 'Southern', users: 134, farms: 119 },
    { province: 'Northern', users: 98, farms: 87 },
    { province: 'Western', users: 87, farms: 76 },
    { province: 'Luapula', users: 76, farms: 65 },
    { province: 'Muchinga', users: 67, farms: 58 },
    { province: 'North-Western', users: 61, farms: 54 }
  ];

  // System Health Data
  const systemMetrics = {
    serverUptime: 99.8,
    responseTime: 245, // ms
    errorRate: 0.02,
    activeConnections: 1456,
    cpuUsage: 34.5,
    memoryUsage: 67.8,
    diskUsage: 78.5,
    networkTraffic: 2.3, // GB/hour
    databaseSize: 15.6, // GB
    backupStatus: 'completed',
    lastBackup: '2024-12-15 02:00:00'
  };

  // Support Tickets
  const supportTickets = [
    {
      id: 1,
      title: 'Cannot access weather data',
      user: 'James Mwanza',
      priority: 'high',
      status: 'open',
      category: 'technical',
      created: '2024-12-15 09:30',
      lastUpdate: '2024-12-15 14:20'
    },
    {
      id: 2,
      title: 'Payment processing issue',
      user: 'Mary Banda',
      priority: 'urgent',
      status: 'in_progress',
      category: 'billing',
      created: '2024-12-15 11:15',
      lastUpdate: '2024-12-15 15:45'
    },
    {
      id: 3,
      title: 'Feature request: Crop calendar',
      user: 'Peter Mulenga',
      priority: 'low',
      status: 'open',
      category: 'feature',
      created: '2024-12-14 16:20',
      lastUpdate: '2024-12-14 16:20'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-emerald-600 bg-emerald-100';
      case 'inactive': return 'text-red-600 bg-red-100';
      case 'suspended': return 'text-yellow-600 bg-yellow-100';
      case 'published': return 'text-emerald-600 bg-emerald-100';
      case 'draft': return 'text-gray-600 bg-gray-100';
      case 'review': return 'text-yellow-600 bg-yellow-100';
      case 'open': return 'text-blue-600 bg-blue-100';
      case 'in_progress': return 'text-yellow-600 bg-yellow-100';
      case 'closed': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSubscriptionColor = (subscription: string) => {
    switch (subscription) {
      case 'free': return 'text-gray-600 bg-gray-100';
      case 'basic': return 'text-blue-600 bg-blue-100';
      case 'premium': return 'text-emerald-600 bg-emerald-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesFilter = userFilter === 'all' || user.role === userFilter || user.status === userFilter;
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.province.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filteredContent = contentItems.filter(item => {
    const matchesFilter = contentFilter === 'all' || item.type === contentFilter || item.status === contentFilter;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleUserAction = (action: string, userId: number) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      switch (action) {
        case 'view':
          setSelectedUser(user);
          setShowUserModal(true);
          break;
        case 'suspend':
          alert(`User ${user.name} has been suspended`);
          break;
        case 'activate':
          alert(`User ${user.name} has been activated`);
          break;
        case 'delete':
          if (confirm(`Are you sure you want to delete user ${user.name}?`)) {
            alert(`User ${user.name} has been deleted`);
          }
          break;
        case 'message':
          alert(`Opening message composer for ${user.name}`);
          break;
      }
    }
  };

  const handleContentAction = (action: string, contentId: number) => {
    const content = contentItems.find(c => c.id === contentId);
    if (content) {
      switch (action) {
        case 'publish':
          alert(`Content "${content.title}" has been published`);
          break;
        case 'unpublish':
          alert(`Content "${content.title}" has been unpublished`);
          break;
        case 'feature':
          alert(`Content "${content.title}" has been featured`);
          break;
        case 'delete':
          if (confirm(`Are you sure you want to delete "${content.title}"?`)) {
            alert(`Content "${content.title}" has been deleted`);
          }
          break;
      }
    }
  };

  const handleSystemAction = (action: string) => {
    switch (action) {
      case 'backup':
        alert('System backup initiated');
        break;
      case 'maintenance':
        setShowSystemModal(true);
        break;
      case 'restart':
        if (confirm('Are you sure you want to restart the system?')) {
          alert('System restart initiated');
        }
        break;
      case 'update':
        alert('System update check initiated');
        break;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage AgriSmart platform and users</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-2">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="year">This Year</option>
          </select>
          <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Admin Context Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-lg shadow-sm text-white p-6">
        <h3 className="text-lg font-bold mb-3">🛡️ AgriSmart Admin Control Center</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-semibold mb-1">Platform Status</h4>
            <p className="text-sm opacity-90">All systems operational - {systemMetrics.serverUptime}% uptime</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-semibold mb-1">Active Users</h4>
            <p className="text-sm opacity-90">{adminStats.activeUsers} farmers online across Zambia</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-semibold mb-1">Revenue</h4>
            <p className="text-sm opacity-90">ZMW {adminStats.totalRevenue.toLocaleString()} this month</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-semibold mb-1">Support Queue</h4>
            <p className="text-sm opacity-90">{adminStats.supportTickets} tickets pending response</p>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{adminStats.totalUsers.toLocaleString()}</p>
              <p className="text-sm text-emerald-600 mt-1">+{adminStats.newUsersToday} today</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Farms</p>
              <p className="text-2xl font-bold text-emerald-600 mt-2">{adminStats.totalFarms.toLocaleString()}</p>
              <p className="text-sm text-emerald-600 mt-1">+{adminStats.monthlyGrowth}% growth</p>
            </div>
            <div className="p-3 bg-emerald-100 rounded-full">
              <Sprout className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
              <p className="text-2xl font-bold text-green-600 mt-2">ZMW {adminStats.totalRevenue.toLocaleString()}</p>
              <p className="text-sm text-green-600 mt-1">+{adminStats.monthlyGrowth}% vs last month</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">System Uptime</p>
              <p className="text-2xl font-bold text-purple-600 mt-2">{adminStats.systemUptime}%</p>
              <p className="text-sm text-purple-600 mt-1">Excellent performance</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Activity className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Content Items</p>
              <p className="text-2xl font-bold text-indigo-600 mt-2">{adminStats.contentItems.toLocaleString()}</p>
              <p className="text-sm text-indigo-600 mt-1">{adminStats.storageUsed}% storage used</p>
            </div>
            <div className="p-3 bg-indigo-100 rounded-full">
              <FileText className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'users', label: 'User Management', icon: Users },
              { id: 'content', label: 'Content Management', icon: FileText },
              { id: 'system', label: 'System Health', icon: Server },
              { id: 'support', label: 'Support', icon: MessageSquare },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-emerald-500 text-emerald-600'
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
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Analytics Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth & Revenue</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={userGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="users" stroke="#3B82F6" strokeWidth={2} name="Total Users" />
                      <Line type="monotone" dataKey="active" stroke="#10B981" strokeWidth={2} name="Active Users" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Subscription Distribution</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={subscriptionData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {subscriptionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Provincial Distribution */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Users by Province</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={provinceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="province" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="users" fill="#3B82F6" name="Users" />
                    <Bar dataKey="farms" fill="#10B981" name="Farms" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Recent Activity */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Platform Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">New user registration spike</p>
                      <p className="text-xs text-gray-500">23 new farmers joined today from Central Province</p>
                      <p className="text-xs text-gray-400">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">High support ticket volume</p>
                      <p className="text-xs text-gray-500">15 new tickets submitted in the last hour</p>
                      <p className="text-xs text-gray-400">1 hour ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Revenue milestone reached</p>
                      <p className="text-xs text-gray-500">Monthly revenue exceeded ZMW 125,000</p>
                      <p className="text-xs text-gray-400">3 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
              {/* User Filters */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex flex-wrap gap-2">
                  {['all', 'farmer', 'extension_officer', 'cooperative', 'active', 'inactive'].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setUserFilter(filter)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors capitalize ${
                        userFilter === filter
                          ? 'bg-emerald-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {filter.replace('_', ' ')}
                    </button>
                  ))}
                </div>

                <div className="flex space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Add User</span>
                  </button>
                </div>
              </div>

              {/* Users Table */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">User</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Role</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Location</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Subscription</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Revenue</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                                <Users className="w-4 h-4 text-emerald-600" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{user.name}</p>
                                <p className="text-sm text-gray-500">{user.email}</p>
                                <div className="flex items-center space-x-2 mt-1">
                                  {user.verified && (
                                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                                  )}
                                  <span className="text-xs text-gray-400">Rep: {user.reputation}</span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="capitalize text-gray-700">{user.role.replace('_', ' ')}</span>
                            {user.farmSize !== 'N/A' && (
                              <p className="text-xs text-gray-500">{user.farmSize}</p>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <p className="text-gray-700">{user.province}</p>
                            <p className="text-xs text-gray-500">{user.phone}</p>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                              {user.status}
                            </span>
                            <p className="text-xs text-gray-500 mt-1">{user.lastActive}</p>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getSubscriptionColor(user.subscription)}`}>
                              {user.subscription}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <p className="font-medium text-gray-900">ZMW {user.revenue.toLocaleString()}</p>
                            <p className="text-xs text-gray-500">{user.totalPosts} posts</p>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => handleUserAction('view', user.id)}
                                className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleUserAction('message', user.id)}
                                className="p-1 text-green-600 hover:bg-green-100 rounded"
                              >
                                <Mail className="w-4 h-4" />
                              </button>
                              {user.status === 'active' ? (
                                <button 
                                  onClick={() => handleUserAction('suspend', user.id)}
                                  className="p-1 text-yellow-600 hover:bg-yellow-100 rounded"
                                >
                                  <Ban className="w-4 h-4" />
                                </button>
                              ) : (
                                <button 
                                  onClick={() => handleUserAction('activate', user.id)}
                                  className="p-1 text-emerald-600 hover:bg-emerald-100 rounded"
                                >
                                  <UserCheck className="w-4 h-4" />
                                </button>
                              )}
                              <button 
                                onClick={() => handleUserAction('delete', user.id)}
                                className="p-1 text-red-600 hover:bg-red-100 rounded"
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
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div className="space-y-6">
              {/* Content Filters */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex flex-wrap gap-2">
                  {['all', 'video', 'article', 'guide', 'published', 'draft', 'review'].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setContentFilter(filter)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors capitalize ${
                        contentFilter === filter
                          ? 'bg-emerald-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>

                <div className="flex space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search content..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  <button 
                    onClick={() => setShowContentModal(true)}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Content</span>
                  </button>
                </div>
              </div>

              {/* Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredContent.map((item) => (
                  <div key={item.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          {item.type === 'video' && <Video className="w-5 h-5 text-blue-600" />}
                          {item.type === 'article' && <FileText className="w-5 h-5 text-green-600" />}
                          {item.type === 'guide' && <BookOpen className="w-5 h-5 text-purple-600" />}
                          <span className="text-sm font-medium text-gray-600 capitalize">{item.type}</span>
                        </div>
                        <div className="flex space-x-1">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                          {item.featured && (
                            <Star className="w-4 h-4 text-yellow-500" />
                          )}
                        </div>
                      </div>
                      
                      <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">{item.title}</h4>
                      <p className="text-sm text-gray-600 mb-3">By {item.author}</p>
                      
                      <div className="grid grid-cols-3 gap-2 text-xs text-gray-500 mb-4">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-3 h-3" />
                          <span>{item.views.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ThumbsUp className="w-3 h-3" />
                          <span>{item.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageSquare className="w-3 h-3" />
                          <span>{item.comments}</span>
                        </div>
                      </div>
                      
                      <div className="text-xs text-gray-500 mb-4">
                        <p>Created: {new Date(item.createdDate).toLocaleDateString()}</p>
                        <p>Language: {item.language}</p>
                        {item.duration !== 'N/A' && <p>Duration: {item.duration}</p>}
                      </div>
                      
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleContentAction('publish', item.id)}
                          className="flex-1 bg-emerald-600 text-white py-1 px-2 rounded text-xs hover:bg-emerald-700 transition-colors"
                        >
                          {item.status === 'published' ? 'Unpublish' : 'Publish'}
                        </button>
                        <button 
                          onClick={() => handleContentAction('feature', item.id)}
                          className="p-1 bg-yellow-100 text-yellow-600 rounded hover:bg-yellow-200 transition-colors"
                        >
                          <Star className="w-3 h-3" />
                        </button>
                        <button 
                          onClick={() => handleContentAction('delete', item.id)}
                          className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
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
              {/* System Health Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Server Uptime</p>
                      <p className="text-2xl font-bold text-emerald-600 mt-2">{systemMetrics.serverUptime}%</p>
                    </div>
                    <div className="p-3 bg-emerald-100 rounded-full">
                      <Server className="w-6 h-6 text-emerald-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Response Time</p>
                      <p className="text-2xl font-bold text-blue-600 mt-2">{systemMetrics.responseTime}ms</p>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-full">
                      <Zap className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Connections</p>
                      <p className="text-2xl font-bold text-purple-600 mt-2">{systemMetrics.activeConnections.toLocaleString()}</p>
                    </div>
                    <div className="p-3 bg-purple-100 rounded-full">
                      <Network className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Error Rate</p>
                      <p className="text-2xl font-bold text-green-600 mt-2">{systemMetrics.errorRate}%</p>
                    </div>
                    <div className="p-3 bg-green-100 rounded-full">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Resource Usage */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Resource Usage</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="flex items-center space-x-2">
                          <Cpu className="w-4 h-4 text-blue-600" />
                          <span>CPU Usage</span>
                        </span>
                        <span>{systemMetrics.cpuUsage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${systemMetrics.cpuUsage}%` }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="flex items-center space-x-2">
                          <MemoryStick className="w-4 h-4 text-green-600" />
                          <span>Memory Usage</span>
                        </span>
                        <span>{systemMetrics.memoryUsage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: `${systemMetrics.memoryUsage}%` }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="flex items-center space-x-2">
                          <HardDrive className="w-4 h-4 text-yellow-600" />
                          <span>Disk Usage</span>
                        </span>
                        <span>{systemMetrics.diskUsage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${systemMetrics.diskUsage}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">System Information</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Database Size:</span>
                      <span className="font-medium">{systemMetrics.databaseSize} GB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Network Traffic:</span>
                      <span className="font-medium">{systemMetrics.networkTraffic} GB/hour</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Backup:</span>
                      <span className="font-medium">{systemMetrics.lastBackup}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Backup Status:</span>
                      <span className="font-medium text-emerald-600 capitalize">{systemMetrics.backupStatus}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* System Actions */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">System Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <button 
                    onClick={() => handleSystemAction('backup')}
                    className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors flex flex-col items-center space-y-2"
                  >
                    <Database className="w-6 h-6" />
                    <span className="text-sm font-medium">Backup Now</span>
                  </button>
                  <button 
                    onClick={() => handleSystemAction('maintenance')}
                    className="bg-yellow-600 text-white p-4 rounded-lg hover:bg-yellow-700 transition-colors flex flex-col items-center space-y-2"
                  >
                    <Tool className="w-6 h-6" />
                    <span className="text-sm font-medium">Maintenance</span>
                  </button>
                  <button 
                    onClick={() => handleSystemAction('update')}
                    className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 transition-colors flex flex-col items-center space-y-2"
                  >
                    <RefreshCw className="w-6 h-6" />
                    <span className="text-sm font-medium">Check Updates</span>
                  </button>
                  <button 
                    onClick={() => handleSystemAction('restart')}
                    className="bg-red-600 text-white p-4 rounded-lg hover:bg-red-700 transition-colors flex flex-col items-center space-y-2"
                  >
                    <Zap className="w-6 h-6" />
                    <span className="text-sm font-medium">Restart System</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'support' && (
            <div className="space-y-6">
              {/* Support Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Open Tickets</p>
                      <p className="text-2xl font-bold text-blue-600 mt-2">{supportTickets.filter(t => t.status === 'open').length}</p>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-full">
                      <MessageSquare className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">In Progress</p>
                      <p className="text-2xl font-bold text-yellow-600 mt-2">{supportTickets.filter(t => t.status === 'in_progress').length}</p>
                    </div>
                    <div className="p-3 bg-yellow-100 rounded-full">
                      <Clock className="w-6 h-6 text-yellow-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Urgent</p>
                      <p className="text-2xl font-bold text-red-600 mt-2">{supportTickets.filter(t => t.priority === 'urgent').length}</p>
                    </div>
                    <div className="p-3 bg-red-100 rounded-full">
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Avg Response</p>
                      <p className="text-2xl font-bold text-emerald-600 mt-2">2.5h</p>
                    </div>
                    <div className="p-3 bg-emerald-100 rounded-full">
                      <Target className="w-6 h-6 text-emerald-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Support Tickets */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <h3 className="text-lg font-semibold text-gray-900">Support Tickets</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Ticket</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">User</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Priority</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Category</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Created</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {supportTickets.map((ticket) => (
                        <tr key={ticket.id} className="hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <p className="font-medium text-gray-900">#{ticket.id}</p>
                            <p className="text-sm text-gray-600">{ticket.title}</p>
                          </td>
                          <td className="py-3 px-4">
                            <p className="text-gray-700">{ticket.user}</p>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(ticket.priority)}`}>
                              {ticket.priority}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(ticket.status)}`}>
                              {ticket.status.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="capitalize text-gray-700">{ticket.category}</span>
                          </td>
                          <td className="py-3 px-4">
                            <p className="text-sm text-gray-700">{ticket.created}</p>
                            <p className="text-xs text-gray-500">Updated: {ticket.lastUpdate}</p>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <button className="p-1 text-blue-600 hover:bg-blue-100 rounded">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-1 text-green-600 hover:bg-green-100 rounded">
                                <MessageSquare className="w-4 h-4" />
                              </button>
                              <button className="p-1 text-gray-600 hover:bg-gray-100 rounded">
                                <Archive className="w-4 h-4" />
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

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Platform Name</label>
                    <input
                      type="text"
                      defaultValue="AgriSmart"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Default Language</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                      <option value="English">English</option>
                      <option value="Bemba">Bemba</option>
                      <option value="Nyanja">Nyanja</option>
                      <option value="Tonga">Tonga</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Default Currency</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                      <option value="ZMW">Zambian Kwacha (ZMW)</option>
                      <option value="USD">US Dollar (USD)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                      <option value="Africa/Lusaka">Africa/Lusaka (CAT)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-600">Require 2FA for admin accounts</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Session Timeout</p>
                      <p className="text-sm text-gray-600">Auto-logout inactive admin sessions</p>
                    </div>
                    <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                      <option value="30">30 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="120">2 hours</option>
                      <option value="240">4 hours</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Email Notifications</p>
                      <p className="text-sm text-gray-600">Send admin alerts via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">SMS Alerts</p>
                      <p className="text-sm text-gray-600">Critical system alerts via SMS</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2">
                  <Save className="w-4 h-4" />
                  <span>Save Settings</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* User Details Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">User Details</h3>
              <button 
                onClick={() => setShowUserModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Personal Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium">{selectedUser.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium">{selectedUser.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phone:</span>
                      <span className="font-medium">{selectedUser.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Role:</span>
                      <span className="font-medium capitalize">{selectedUser.role.replace('_', ' ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Province:</span>
                      <span className="font-medium">{selectedUser.province}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Join Date:</span>
                      <span className="font-medium">{new Date(selectedUser.joinDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Account Status</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedUser.status)}`}>
                        {selectedUser.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subscription:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSubscriptionColor(selectedUser.subscription)}`}>
                        {selectedUser.subscription}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Verified:</span>
                      <span className="font-medium">{selectedUser.verified ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Active:</span>
                      <span className="font-medium">{selectedUser.lastActive}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Reputation:</span>
                      <span className="font-medium">{selectedUser.reputation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Posts:</span>
                      <span className="font-medium">{selectedUser.totalPosts}</span>
                    </div>
                  </div>
                </div>
              </div>

              {selectedUser.farmSize !== 'N/A' && (
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Farm Information</h4>
                  <div className="bg-emerald-50 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-emerald-700">Farm Size:</span>
                        <span className="font-medium">{selectedUser.farmSize}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-emerald-700">Revenue:</span>
                        <span className="font-medium">ZMW {selectedUser.revenue.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex space-x-3 mt-6">
                <button 
                  onClick={() => setShowUserModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
                <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
                <button className="bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2">
                  <Edit className="w-4 h-4" />
                  <span>Edit User</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Modal */}
      {showContentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Add New Content</h3>
              <button 
                onClick={() => setShowContentModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Content Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                    <option value="video">Video</option>
                    <option value="article">Article</option>
                    <option value="guide">Guide</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Enter content title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                    <option value="crops">Crops</option>
                    <option value="pest_management">Pest Management</option>
                    <option value="sustainability">Sustainability</option>
                    <option value="water_management">Water Management</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                    <option value="English">English</option>
                    <option value="English/Bemba">English/Bemba</option>
                    <option value="English/Nyanja">English/Nyanja</option>
                    <option value="English/Tonga">English/Tonga</option>
                  </select>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button 
                  onClick={() => setShowContentModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    alert('Content created successfully!');
                    setShowContentModal(false);
                  }}
                  className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Create Content
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* System Maintenance Modal */}
      {showSystemModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">System Maintenance</h3>
              <button 
                onClick={() => setShowSystemModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Maintenance Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                    <option value="scheduled">Scheduled Maintenance</option>
                    <option value="emergency">Emergency Maintenance</option>
                    <option value="update">System Update</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
                  <input
                    type="number"
                    defaultValue="30"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notification Message</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    rows={3}
                    placeholder="System will be under maintenance..."
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="notify-users" className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                  <label htmlFor="notify-users" className="text-sm text-gray-700">Notify all users</label>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button 
                  onClick={() => setShowSystemModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    alert('Maintenance mode activated!');
                    setShowSystemModal(false);
                  }}
                  className="flex-1 bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  Start Maintenance
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;