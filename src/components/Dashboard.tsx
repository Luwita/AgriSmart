import React from 'react';
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
  Bell,
  Sun,
  CloudRain,
  Wind
} from 'lucide-react';
import { zambianCrops } from '../data/zambianData';

const Dashboard: React.FC = () => {
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

  const weatherSummary = {
    temperature: 28,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 12,
    rainfall: 2.5
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Good morning! 🌅</h1>
          <p className="text-gray-600 mt-1">James Mwanza</p>
          <div className="flex items-center mt-2 text-gray-500 text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            <span>Chongwe, Lusaka Province</span>
          </div>
        </div>
        <button className="p-3 bg-white rounded-full shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
          <Bell className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <Icon className={`w-8 h-8 text-${stat.color}-600`} />
                <span className={`text-sm px-3 py-1 rounded-full ${
                  stat.changeType === 'positive' ? 'bg-emerald-100 text-emerald-600' : 
                  stat.changeType === 'negative' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                }`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weather Card */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl text-white p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">{weatherSummary.temperature}°C</h2>
              <p className="text-blue-100 mt-1">{weatherSummary.condition}</p>
              <p className="text-blue-200 text-sm mt-1">Lusaka Province</p>
            </div>
            <Sun className="w-12 h-12 text-yellow-300" />
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
              <Droplets className="w-5 h-5 mx-auto mb-1" />
              <p className="text-xs opacity-90">Humidity</p>
              <p className="font-semibold">{weatherSummary.humidity}%</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
              <Wind className="w-5 h-5 mx-auto mb-1" />
              <p className="text-xs opacity-90">Wind</p>
              <p className="font-semibold">{weatherSummary.windSpeed} km/h</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
              <CloudRain className="w-5 h-5 mx-auto mb-1" />
              <p className="text-xs opacity-90">Rain</p>
              <p className="font-semibold">{weatherSummary.rainfall} mm</p>
            </div>
          </div>
        </div>

        {/* Crop Health Overview */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Crop Health</h3>
            <button className="text-emerald-600 text-sm font-medium hover:text-emerald-700">View All</button>
          </div>
          <div className="space-y-4">
            {zambianCrops.slice(0, 3).map((crop, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Sprout className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{crop.name}</p>
                    <p className="text-sm text-gray-600">{crop.localName} • {crop.area}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-emerald-600">{crop.health}%</p>
                  <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                    <div
                      className="bg-emerald-500 h-2 rounded-full"
                      style={{ width: `${crop.health}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
            <button className="text-emerald-600 text-sm font-medium hover:text-emerald-700">View All</button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg bg-${activity.color}-100`}>
                    <Icon className={`w-4 h-4 text-${activity.color}-600`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.field} • {activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Zambian Context Alert */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl text-white p-6">
        <div className="flex items-start space-x-4">
          <AlertTriangle className="w-6 h-6 text-yellow-300 mt-1" />
          <div>
            <h4 className="font-semibold mb-2">🇿🇲 Fall Armyworm Alert</h4>
            <p className="text-orange-100 leading-relaxed">
              High risk detected in Central Province. Apply Emamectin benzoate to maize crops within 48 hours.
            </p>
            <button className="mt-4 bg-white bg-opacity-20 px-4 py-2 rounded-lg text-sm font-medium hover:bg-opacity-30 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;