import React, { useState } from 'react';
import { 
  TrendingUp, 
  Droplets, 
  Thermometer, 
  DollarSign, 
  Sprout,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  Plus,
  Bell,
  Menu,
  ChevronRight,
  Sun,
  CloudRain,
  Wind
} from 'lucide-react';
import { zambianCrops } from '../../data/zambianData';

const MobileDashboard: React.FC = () => {
  const [showQuickActions, setShowQuickActions] = useState(false);

  const stats = [
    {
      label: 'Total Yield',
      value: '14.8 tons',
      change: '+18%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'emerald'
    },
    {
      label: 'Revenue',
      value: 'ZMW 68.5K',
      change: '+25%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'green'
    },
    {
      label: 'Water Usage',
      value: '2,450L',
      change: '-12%',
      changeType: 'positive',
      icon: Droplets,
      color: 'blue'
    },
    {
      label: 'Avg Temp',
      value: '28°C',
      change: '+2°C',
      changeType: 'neutral',
      icon: Thermometer,
      color: 'orange'
    }
  ];

  const recentActivities = [
    { id: 1, action: 'D-Compound fertilizer applied', field: 'Block A', time: '2h ago', status: 'completed', icon: CheckCircle, color: 'emerald' },
    { id: 2, action: 'Fall armyworm monitoring', field: 'Block B', time: '4h ago', status: 'pending', icon: Clock, color: 'yellow' },
    { id: 3, action: 'Maize harvest completed', field: 'Block C', time: '1d ago', status: 'completed', icon: CheckCircle, color: 'emerald' },
    { id: 4, action: 'Weather alert received', field: 'All fields', time: '2d ago', status: 'alert', icon: AlertTriangle, color: 'red' },
  ];

  const quickActions = [
    { id: 'add-crop', label: 'Add Crop', icon: Sprout, color: 'emerald' },
    { id: 'check-weather', label: 'Weather', icon: CloudRain, color: 'blue' },
    { id: 'market-prices', label: 'Prices', icon: TrendingUp, color: 'purple' },
    { id: 'add-activity', label: 'Log Activity', icon: Plus, color: 'orange' },
  ];

  const weatherSummary = {
    temperature: 28,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 12,
    rainfall: 2.5
  };

  return (
    <div className="p-4 space-y-6 pb-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold">Good morning! 🌅</h2>
            <p className="text-emerald-100 text-sm">James Mwanza</p>
            <div className="flex items-center mt-2 text-emerald-200 text-xs">
              <MapPin className="w-3 h-3 mr-1" />
              <span>Chongwe, Lusaka Province</span>
            </div>
          </div>
          <button className="p-2 bg-white bg-opacity-20 rounded-full">
            <Bell className="w-5 h-5" />
          </button>
        </div>
        
        {/* Quick Weather */}
        <div className="bg-white bg-opacity-20 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Sun className="w-8 h-8 text-yellow-300" />
              <div>
                <p className="text-lg font-bold">{weatherSummary.temperature}°C</p>
                <p className="text-xs text-emerald-100">{weatherSummary.condition}</p>
              </div>
            </div>
            <div className="text-right text-xs text-emerald-100">
              <div className="flex items-center space-x-1 mb-1">
                <Droplets className="w-3 h-3" />
                <span>{weatherSummary.humidity}%</span>
              </div>
              <div className="flex items-center space-x-1">
                <Wind className="w-3 h-3" />
                <span>{weatherSummary.windSpeed} km/h</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-5 h-5 text-${stat.color}-600`} />
                <span className={`text-xs px-2 py-1 rounded-full ${
                  stat.changeType === 'positive' ? 'bg-emerald-100 text-emerald-600' : 
                  stat.changeType === 'negative' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                }`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-lg font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-600">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Quick Actions</h3>
          <button 
            onClick={() => setShowQuickActions(!showQuickActions)}
            className="p-1 text-gray-400"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                className={`flex flex-col items-center p-3 rounded-xl bg-${action.color}-50 hover:bg-${action.color}-100 transition-colors`}
              >
                <Icon className={`w-6 h-6 text-${action.color}-600 mb-2`} />
                <span className="text-xs font-medium text-gray-700 text-center leading-tight">
                  {action.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Crop Health Overview */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Crop Health</h3>
          <button className="text-emerald-600 text-sm font-medium">View All</button>
        </div>
        <div className="space-y-3">
          {zambianCrops.slice(0, 3).map((crop, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Sprout className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">{crop.name}</p>
                  <p className="text-xs text-gray-600">{crop.localName} • {crop.area}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-emerald-600">{crop.health}%</p>
                <div className="w-12 bg-gray-200 rounded-full h-1.5 mt-1">
                  <div
                    className="bg-emerald-500 h-1.5 rounded-full"
                    style={{ width: `${crop.health}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Recent Activities</h3>
          <button className="text-emerald-600 text-sm font-medium">View All</button>
        </div>
        <div className="space-y-3">
          {recentActivities.map((activity) => {
            const Icon = activity.icon;
            return (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg bg-${activity.color}-100`}>
                  <Icon className={`w-4 h-4 text-${activity.color}-600`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-600">{activity.field} • {activity.time}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 mt-1" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Zambian Context Alert */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl text-white p-4">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-yellow-300 mt-0.5" />
          <div>
            <h4 className="font-semibold text-sm mb-1">🇿🇲 Fall Armyworm Alert</h4>
            <p className="text-xs text-orange-100 leading-relaxed">
              High risk detected in Central Province. Apply Emamectin benzoate to maize crops within 48 hours.
            </p>
            <button className="mt-2 text-xs bg-white bg-opacity-20 px-3 py-1 rounded-full">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileDashboard;