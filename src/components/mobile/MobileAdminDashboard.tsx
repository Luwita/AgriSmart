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
  MoreVertical
} from 'lucide-react';

interface AdminStats {
  totalUsers: number;
  activeFarms: number;
  systemAlerts: number;
  revenue: number;
}

interface SystemAlert {
  id: string;
  type: 'warning' | 'error' | 'info';
  message: string;
  timestamp: string;
}

const MobileAdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    activeFarms: 0,
    systemAlerts: 0,
    revenue: 0
  });
  
  const [alerts, setAlerts] = useState<SystemAlert[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'system'>('overview');

  useEffect(() => {
    // Simulate loading admin data
    setStats({
      totalUsers: 1247,
      activeFarms: 892,
      systemAlerts: 3,
      revenue: 45230
    });

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
  }, []);

  const StatCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    value: string | number;
    change?: string;
    color: string;
  }> = ({ icon, title, value, change, color }) => (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2 rounded-lg ${color}`}>
          {icon}
        </div>
        {change && (
          <span className="text-xs text-green-600 font-medium">
            {change}
          </span>
        )}
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-600">{title}</p>
      </div>
    </div>
  );

  const AlertItem: React.FC<{ alert: SystemAlert }> = ({ alert }) => (
    <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
      <div className={`p-1 rounded-full ${
        alert.type === 'error' ? 'bg-red-100' :
        alert.type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
      }`}>
        <AlertTriangle className={`w-4 h-4 ${
          alert.type === 'error' ? 'text-red-600' :
          alert.type === 'warning' ? 'text-yellow-600' : 'text-blue-600'
        }`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900">{alert.message}</p>
        <p className="text-xs text-gray-500">{alert.timestamp}</p>
      </div>
      <button className="p-1">
        <MoreVertical className="w-4 h-4 text-gray-400" />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-sm text-gray-600">System Overview</p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-lg bg-gray-100">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 rounded-lg bg-gray-100">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 px-4">
        <div className="flex space-x-6">
          {[
            { key: 'overview', label: 'Overview' },
            { key: 'users', label: 'Users' },
            { key: 'system', label: 'System' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.key
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-6">
        {activeTab === 'overview' && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <StatCard
                icon={<Users className="w-5 h-5 text-blue-600" />}
                title="Total Users"
                value={stats.totalUsers.toLocaleString()}
                change="+12%"
                color="bg-blue-100"
              />
              <StatCard
                icon={<TrendingUp className="w-5 h-5 text-green-600" />}
                title="Active Farms"
                value={stats.activeFarms.toLocaleString()}
                change="+8%"
                color="bg-green-100"
              />
              <StatCard
                icon={<AlertTriangle className="w-5 h-5 text-yellow-600" />}
                title="System Alerts"
                value={stats.systemAlerts}
                color="bg-yellow-100"
              />
              <StatCard
                icon={<BarChart3 className="w-5 h-5 text-purple-600" />}
                title="Revenue"
                value={`$${stats.revenue.toLocaleString()}`}
                change="+15%"
                color="bg-purple-100"
              />
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                {[
                  { icon: <Users className="w-5 h-5" />, label: 'Manage Users', color: 'text-blue-600' },
                  { icon: <Database className="w-5 h-5" />, label: 'Database Status', color: 'text-green-600' },
                  { icon: <Shield className="w-5 h-5" />, label: 'Security Settings', color: 'text-red-600' },
                  { icon: <Activity className="w-5 h-5" />, label: 'System Monitoring', color: 'text-purple-600' }
                ].map((action, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={action.color}>
                        {action.icon}
                      </div>
                      <span className="font-medium text-gray-900">{action.label}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Alerts */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Alerts</h3>
                <button className="text-sm text-green-600 font-medium">View All</button>
              </div>
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <AlertItem key={alert.id} alert={alert} />
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'users' && (
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
              <div className="flex items-center space-x-2">
                <button className="p-2 rounded-lg bg-gray-100">
                  <Search className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-2 rounded-lg bg-gray-100">
                  <Filter className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">1,247</p>
                  <p className="text-sm text-blue-600">Total Users</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">892</p>
                  <p className="text-sm text-green-600">Active Today</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-600">45</p>
                  <p className="text-sm text-yellow-600">New This Week</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {[
                  { name: 'John Farmer', email: 'john@farm.com', status: 'Active', farms: 3 },
                  { name: 'Mary Grower', email: 'mary@grow.com', status: 'Active', farms: 2 },
                  { name: 'David Crops', email: 'david@crops.com', status: 'Inactive', farms: 1 }
                ].map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user.status}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{user.farms} farms</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'system' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
              <div className="space-y-4">
                {[
                  { name: 'Server Status', status: 'Healthy', color: 'green' },
                  { name: 'Database', status: 'Healthy', color: 'green' },
                  { name: 'API Response', status: 'Warning', color: 'yellow' },
                  { name: 'Storage', status: 'Healthy', color: 'green' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
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

            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">System Logs</h3>
              <div className="space-y-2 text-sm">
                {[
                  { time: '14:32', message: 'User authentication successful', type: 'info' },
                  { time: '14:28', message: 'Database backup completed', type: 'success' },
                  { time: '14:15', message: 'High memory usage detected', type: 'warning' },
                  { time: '14:02', message: 'System startup completed', type: 'info' }
                ].map((log, index) => (
                  <div key={index} className="flex items-start space-x-3 p-2 rounded border border-gray-100">
                    <span className="text-gray-500 font-mono">{log.time}</span>
                    <span className={`flex-1 ${
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
  );
};

export default MobileAdminDashboard;