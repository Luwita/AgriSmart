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
  MapPin
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
      color: 'emerald',
      subtitle: 'Above Zambian average'
    },
    {
      label: 'Water Usage',
      value: '2,450L',
      change: '-12%',
      changeType: 'positive',
      icon: Droplets,
      color: 'blue',
      subtitle: 'Efficient irrigation'
    },
    {
      label: 'Avg Temperature',
      value: '28°C',
      change: '+2°C',
      changeType: 'neutral',
      icon: Thermometer,
      color: 'orange',
      subtitle: 'Optimal for maize'
    },
    {
      label: 'Revenue',
      value: 'ZMW 68,500',
      change: '+25%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'green',
      subtitle: 'Including FRA sales'
    }
  ];

  const recentActivities = [
    { id: 1, action: 'D-Compound fertilizer applied', field: 'Chongwe Farm Block A', time: '2 hours ago', status: 'completed' },
    { id: 2, action: 'Fall armyworm monitoring', field: 'Mkushi Farm Block B', time: '4 hours ago', status: 'pending' },
    { id: 3, action: 'Maize harvest completed', field: 'Eastern Province Block C', time: '1 day ago', status: 'completed' },
    { id: 4, action: 'Treadle pump irrigation', field: 'Central Province Block D', time: '2 days ago', status: 'completed' },
  ];

  const cropHealth = zambianCrops.map(crop => ({
    crop: `${crop.name} (${crop.localName})`,
    health: crop.health,
    area: crop.area,
    status: crop.status,
    location: crop.field
  }));

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Farm Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's your Zambian farm overview today.</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <span className="text-sm text-gray-500">Last updated: </span>
          <span className="text-sm font-medium text-gray-900">2 minutes ago</span>
        </div>
      </div>

      {/* Zambian Context Banner */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-lg shadow-sm text-white p-6">
        <h3 className="text-lg font-bold mb-3">🇿🇲 Zambian Agricultural Update</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-semibold mb-1">Season Status</h4>
            <p className="text-sm opacity-90">Rainy season - Peak growing period</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-semibold mb-1">FRA Program</h4>
            <p className="text-sm opacity-90">Maize purchase at ZMW 4,000/ton</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-semibold mb-1">Weather Alert</h4>
            <p className="text-sm opacity-90">Fall armyworm risk - Monitor crops</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className={`text-sm mt-2 ${
                    stat.changeType === 'positive' ? 'text-emerald-600' : 
                    stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {stat.change} from last month
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>
                </div>
                <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Crop Health Overview */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Crop Health Overview</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {cropHealth.map((crop, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <Sprout className="w-8 h-8 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">{crop.crop}</h4>
                      <p className="text-sm text-gray-600">{crop.area}</p>
                      <div className="flex items-center text-xs text-blue-600 mt-1">
                        <MapPin className="w-3 h-3 mr-1" />
                        {crop.location}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">{crop.health}%</p>
                      <p className={`text-xs capitalize ${
                        crop.health >= 90 ? 'text-emerald-600' :
                        crop.health >= 80 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {crop.status}
                      </p>
                    </div>
                    <div className="w-12 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          crop.health >= 90 ? 'bg-emerald-500' :
                          crop.health >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${crop.health}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {activity.status === 'completed' ? (
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                    ) : activity.status === 'pending' ? (
                      <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    ) : (
                      <Clock className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.field}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI Recommendations - Zambian Context */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg shadow-sm">
        <div className="px-6 py-8 text-white">
          <h3 className="text-xl font-bold mb-4">🤖 AI Smart Recommendations for Zambian Farmers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Fall Armyworm Prevention</h4>
              <p className="text-sm opacity-90">Weather conditions favor fall armyworm development. Apply Emamectin benzoate to maize crops in Chongwe Farm within 24 hours.</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <h4 className="font-semibold mb-2">FRA Marketing Strategy</h4>
              <p className="text-sm opacity-90">Prepare 15 tons of maize for FRA delivery. Ensure moisture content is below 12.5% for guaranteed ZMW 4,000/ton price.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;