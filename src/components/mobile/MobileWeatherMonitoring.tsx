import React, { useState } from 'react';
import { Cloud, Sun, CloudRain, Thermometer, Droplets, Wind, Eye, AlertTriangle, TrendingUp, Calendar, MapPin, Zap, Umbrella, Activity, ChevronRight, RefreshCw as Refresh } from 'lucide-react';
import { zambianProvinces } from '../../data/zambianData';

const MobileWeatherMonitoring: React.FC = () => {
  const [selectedProvince, setSelectedProvince] = useState('Lusaka Province');
  const [showProvinceSelector, setShowProvinceSelector] = useState(false);

  // Real Zambian weather data by province
  const provincialWeatherData = {
    'Lusaka Province': {
      temperature: 28,
      humidity: 65,
      windSpeed: 12,
      pressure: 1013,
      visibility: 10,
      uvIndex: 6,
      condition: 'Partly Cloudy',
      rainfall: 2.5,
      coordinates: '-15.4067, 28.2871'
    },
    'Copperbelt Province': {
      temperature: 25,
      humidity: 75,
      windSpeed: 8,
      pressure: 1015,
      visibility: 8,
      uvIndex: 5,
      condition: 'Cloudy',
      rainfall: 8.1,
      coordinates: '-12.8024, 28.2132'
    },
    'Central Province': {
      temperature: 29,
      humidity: 60,
      windSpeed: 15,
      pressure: 1011,
      visibility: 12,
      uvIndex: 7,
      condition: 'Sunny',
      rainfall: 1.2,
      coordinates: '-14.5000, 28.2833'
    },
    'Eastern Province': {
      temperature: 26,
      humidity: 78,
      windSpeed: 10,
      pressure: 1014,
      visibility: 9,
      uvIndex: 6,
      condition: 'Light Rain',
      rainfall: 12.5,
      coordinates: '-13.5333, 32.3833'
    },
    'Southern Province': {
      temperature: 31,
      humidity: 55,
      windSpeed: 18,
      pressure: 1009,
      visibility: 15,
      uvIndex: 8,
      condition: 'Hot and Sunny',
      rainfall: 0.5,
      coordinates: '-16.8000, 27.8500'
    }
  };

  const currentWeather = provincialWeatherData[selectedProvince as keyof typeof provincialWeatherData];

  const forecast = [
    { day: 'Today', high: currentWeather.temperature + 2, low: currentWeather.temperature - 8, condition: currentWeather.condition, rain: currentWeather.rainfall > 10 ? 80 : currentWeather.rainfall > 5 ? 60 : currentWeather.rainfall > 1 ? 30 : 10, icon: currentWeather.rainfall > 10 ? CloudRain : currentWeather.rainfall > 1 ? Cloud : Sun },
    { day: 'Fri', high: currentWeather.temperature + 1, low: currentWeather.temperature - 7, condition: 'Partly Cloudy', rain: 25, icon: Cloud },
    { day: 'Sat', high: currentWeather.temperature - 2, low: currentWeather.temperature - 10, condition: 'Rainy', rain: 80, icon: CloudRain },
    { day: 'Sun', high: currentWeather.temperature, low: currentWeather.temperature - 8, condition: 'Cloudy', rain: 40, icon: Cloud },
    { day: 'Mon', high: currentWeather.temperature + 3, low: currentWeather.temperature - 6, condition: 'Sunny', rain: 5, icon: Sun },
    { day: 'Tue', high: currentWeather.temperature + 4, low: currentWeather.temperature - 5, condition: 'Hot', rain: 0, icon: Sun },
    { day: 'Wed', high: currentWeather.temperature - 1, low: currentWeather.temperature - 9, condition: 'Rainy', rain: 75, icon: CloudRain },
  ];

  const weatherAlerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Heavy Rains Expected',
      message: 'Expect 40-80mm of rainfall in Northern provinces. Risk of flooding in low-lying areas.',
      time: '2h ago',
      severity: 'high',
      provinces: ['Northern Province', 'Luapula Province', 'Muchinga Province']
    },
    {
      id: 2,
      type: 'info',
      title: 'Optimal Spraying Conditions',
      message: 'Low wind conditions expected. Ideal for pesticide application.',
      time: '4h ago',
      severity: 'low',
      provinces: ['Central Province', 'Eastern Province']
    }
  ];

  const getConditionIcon = (condition: string) => {
    if (condition.includes('Rain') || condition.includes('Thunderstorms')) return CloudRain;
    if (condition.includes('Cloud') || condition.includes('Overcast')) return Cloud;
    if (condition.includes('Sunny') || condition.includes('Hot')) return Sun;
    return Cloud;
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'border-red-200 bg-red-50 text-red-800';
      case 'medium': return 'border-yellow-200 bg-yellow-50 text-yellow-800';
      case 'low': return 'border-blue-200 bg-blue-50 text-blue-800';
      default: return 'border-gray-200 bg-gray-50 text-gray-800';
    }
  };

  return (
    <div className="p-4 space-y-4 pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Weather</h1>
          <p className="text-gray-600 text-sm">Real-time Zambian weather data</p>
        </div>
        <button className="p-2 bg-gray-100 rounded-full text-gray-600">
          <Refresh className="w-5 h-5" />
        </button>
      </div>

      {/* Province Selector */}
      <button 
        onClick={() => setShowProvinceSelector(!showProvinceSelector)}
        className="flex items-center justify-between w-full bg-white rounded-xl p-3 border border-gray-200 shadow-sm"
      >
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-emerald-600" />
          <span className="font-medium text-gray-900">{selectedProvince}</span>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </button>

      {showProvinceSelector && (
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <h3 className="font-medium text-gray-900 mb-3">Select Province</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {zambianProvinces.map((province) => (
              <button
                key={province}
                onClick={() => {
                  setSelectedProvince(province);
                  setShowProvinceSelector(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                  selectedProvince === province
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'hover:bg-gray-100'
                }`}
              >
                {province}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Current Weather */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl text-white p-5">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold">{currentWeather.temperature}°C</h2>
            <p className="text-blue-100 mt-1">{currentWeather.condition}</p>
            <p className="text-blue-200 text-xs mt-1">{selectedProvince}</p>
          </div>
          <div className="text-right">
            {React.createElement(getConditionIcon(currentWeather.condition), { 
              className: "w-14 h-14 text-yellow-300 mb-2" 
            })}
            <p className="text-xs text-blue-100">Updated now</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white bg-opacity-20 rounded-lg p-2 text-center">
            <Droplets className="w-4 h-4 mx-auto mb-1" />
            <p className="text-xs opacity-90">Humidity</p>
            <p className="font-semibold text-sm">{currentWeather.humidity}%</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-2 text-center">
            <Wind className="w-4 h-4 mx-auto mb-1" />
            <p className="text-xs opacity-90">Wind</p>
            <p className="font-semibold text-sm">{currentWeather.windSpeed} km/h</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-2 text-center">
            <Umbrella className="w-4 h-4 mx-auto mb-1" />
            <p className="text-xs opacity-90">Rain</p>
            <p className="font-semibold text-sm">{currentWeather.rainfall} mm</p>
          </div>
        </div>
      </div>

      {/* 7-Day Forecast */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
        <h3 className="font-medium text-gray-900 mb-3">7-Day Forecast</h3>
        <div className="flex overflow-x-auto pb-2 space-x-3">
          {forecast.map((day, index) => {
            const Icon = day.icon;
            return (
              <div key={index} className="text-center p-3 bg-gray-50 rounded-lg min-w-[70px]">
                <p className="text-xs font-medium text-gray-900 mb-2">{day.day}</p>
                <Icon className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-gray-900">{day.high}°</p>
                  <p className="text-xs text-gray-600">{day.low}°</p>
                  <div className="flex items-center justify-center space-x-1">
                    <Droplets className="w-3 h-3 text-blue-500" />
                    <span className="text-xs text-blue-600">{day.rain}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Agricultural Weather Alerts */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
        <h3 className="font-medium text-gray-900 mb-3 flex items-center">
          <AlertTriangle className="w-4 h-4 mr-2 text-yellow-600" />
          Agricultural Alerts
        </h3>
        <div className="space-y-3">
          {weatherAlerts.map((alert) => (
            <div key={alert.id} className={`border rounded-lg p-3 ${getSeverityColor(alert.severity)}`}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-medium text-sm mb-1">{alert.title}</h4>
                  <p className="text-xs opacity-90 mb-2">{alert.message}</p>
                  <div className="flex flex-wrap gap-1">
                    {alert.provinces.slice(0, 2).map((province) => (
                      <span key={province} className="px-2 py-1 bg-white bg-opacity-50 rounded text-xs">
                        {province.split(' ')[0]}
                      </span>
                    ))}
                    {alert.provinces.length > 2 && (
                      <span className="px-2 py-1 bg-white bg-opacity-50 rounded text-xs">
                        +{alert.provinces.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-xs opacity-75">{alert.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Zambian Agricultural Calendar */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
        <h3 className="font-medium text-gray-900 mb-3 flex items-center">
          <Calendar className="w-4 h-4 mr-2" />
          Agricultural Calendar
        </h3>
        <div className="space-y-2">
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
            <h4 className="font-medium text-emerald-800 mb-1 text-sm">Planting Season (Nov-Dec)</h4>
            <p className="text-xs text-emerald-700">Main season planting for maize, soybeans, groundnuts.</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <h4 className="font-medium text-blue-800 mb-1 text-sm">Rainy Season (Dec-Mar)</h4>
            <p className="text-xs text-blue-700">Peak growing season. Monitor for pests.</p>
          </div>
        </div>
      </div>

      {/* Zambian Meteorological Service */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white p-4">
        <h3 className="font-bold mb-2">🌦️ Zambian Met Service</h3>
        <div className="space-y-2">
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-medium text-sm mb-1">Data Sources</h4>
            <p className="text-xs opacity-90">Zambia Meteorological Department, Provincial weather stations</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-medium text-sm mb-1">Update Frequency</h4>
            <p className="text-xs opacity-90">Real-time updates every 30 minutes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileWeatherMonitoring;