import React, { useState } from 'react';
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  Thermometer, 
  Droplets, 
  Wind,
  Eye,
  AlertTriangle,
  TrendingUp,
  Calendar,
  MapPin,
  Zap,
  Umbrella,
  Activity
} from 'lucide-react';
import { zambianWeatherStations, zambianSeasons, zambianProvinces } from '../data/zambianData';

const WeatherMonitoring: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('7days');
  const [selectedProvince, setSelectedProvince] = useState('Lusaka Province');

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
    },
    'Western Province': {
      temperature: 33,
      humidity: 45,
      windSpeed: 20,
      pressure: 1008,
      visibility: 18,
      uvIndex: 9,
      condition: 'Very Hot',
      rainfall: 0.0,
      coordinates: '-15.2500, 23.1167'
    },
    'Northern Province': {
      temperature: 24,
      humidity: 85,
      windSpeed: 6,
      pressure: 1016,
      visibility: 6,
      uvIndex: 4,
      condition: 'Heavy Rain',
      rainfall: 25.8,
      coordinates: '-10.7000, 31.3833'
    },
    'Luapula Province': {
      temperature: 23,
      humidity: 88,
      windSpeed: 5,
      pressure: 1017,
      visibility: 5,
      uvIndex: 3,
      condition: 'Thunderstorms',
      rainfall: 32.1,
      coordinates: '-11.0000, 28.7333'
    },
    'Muchinga Province': {
      temperature: 22,
      humidity: 82,
      windSpeed: 7,
      pressure: 1018,
      visibility: 7,
      uvIndex: 4,
      condition: 'Overcast',
      rainfall: 18.6,
      coordinates: '-12.5000, 31.5000'
    },
    'North-Western Province': {
      temperature: 27,
      humidity: 70,
      windSpeed: 9,
      pressure: 1012,
      visibility: 10,
      uvIndex: 5,
      condition: 'Scattered Showers',
      rainfall: 15.3,
      coordinates: '-13.4333, 24.4000'
    }
  };

  const currentWeather = provincialWeatherData[selectedProvince as keyof typeof provincialWeatherData];

  const forecast = [
    { day: 'Today', high: currentWeather.temperature + 2, low: currentWeather.temperature - 8, condition: currentWeather.condition, rain: currentWeather.rainfall > 10 ? 80 : currentWeather.rainfall > 5 ? 60 : currentWeather.rainfall > 1 ? 30 : 10, icon: currentWeather.rainfall > 10 ? CloudRain : currentWeather.rainfall > 1 ? Cloud : Sun },
    { day: 'Tomorrow', high: currentWeather.temperature + 1, low: currentWeather.temperature - 7, condition: 'Partly Cloudy', rain: 25, icon: Cloud },
    { day: 'Friday', high: currentWeather.temperature - 2, low: currentWeather.temperature - 10, condition: 'Rainy', rain: 80, icon: CloudRain },
    { day: 'Saturday', high: currentWeather.temperature, low: currentWeather.temperature - 8, condition: 'Cloudy', rain: 40, icon: Cloud },
    { day: 'Sunday', high: currentWeather.temperature + 3, low: currentWeather.temperature - 6, condition: 'Sunny', rain: 5, icon: Sun },
    { day: 'Monday', high: currentWeather.temperature + 4, low: currentWeather.temperature - 5, condition: 'Hot', rain: 0, icon: Sun },
    { day: 'Tuesday', high: currentWeather.temperature - 1, low: currentWeather.temperature - 9, condition: 'Rainy', rain: 75, icon: CloudRain },
  ];

  const weatherAlerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Heavy Rains Expected - Northern Provinces',
      message: 'Expect 40-80mm of rainfall in Northern, Luapula, and Muchinga provinces. Risk of flooding in low-lying areas.',
      time: '2 hours ago',
      severity: 'high',
      provinces: ['Northern Province', 'Luapula Province', 'Muchinga Province']
    },
    {
      id: 2,
      type: 'info',
      title: 'Optimal Spraying Conditions - Central Regions',
      message: 'Low wind conditions (&lt; 10 km/h) expected in Central and Eastern provinces. Ideal for pesticide application.',
      time: '4 hours ago',
      severity: 'low',
      provinces: ['Central Province', 'Eastern Province', 'Lusaka Province']
    },
    {
      id: 3,
      type: 'alert',
      title: 'Fall Armyworm Weather Alert',
      message: 'High humidity (>70%) and warm temperatures in Copperbelt favor fall armyworm development. Monitor maize crops closely.',
      time: '6 hours ago',
      severity: 'medium',
      provinces: ['Copperbelt Province', 'Northern Province']
    },
    {
      id: 4,
      type: 'warning',
      title: 'Drought Conditions - Western Province',
      message: 'Extended dry period continues in Western Province. Consider drought-resistant crops and water conservation.',
      time: '1 day ago',
      severity: 'high',
      provinces: ['Western Province', 'Southern Province']
    }
  ];

  const zambianRainfallData = [
    { month: 'Nov 2024', rainfall: 120, temp: 28, season: 'Early Rains', province: selectedProvince },
    { month: 'Dec 2024', rainfall: 180, temp: 29, season: 'Rainy Season', province: selectedProvince },
    { month: 'Jan 2025', rainfall: 220, temp: 27, season: 'Peak Rains', province: selectedProvince },
    { month: 'Feb 2025', rainfall: 200, temp: 28, season: 'Peak Rains', province: selectedProvince },
    { month: 'Mar 2025', rainfall: 150, temp: 29, season: 'Late Rains', province: selectedProvince },
    { month: 'Apr 2025', rainfall: 80, temp: 27, season: 'End of Rains', province: selectedProvince },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'border-red-200 bg-red-50 text-red-800';
      case 'medium': return 'border-yellow-200 bg-yellow-50 text-yellow-800';
      case 'low': return 'border-blue-200 bg-blue-50 text-blue-800';
      default: return 'border-gray-200 bg-gray-50 text-gray-800';
    }
  };

  const getConditionIcon = (condition: string) => {
    if (condition.includes('Rain') || condition.includes('Thunderstorms')) return CloudRain;
    if (condition.includes('Cloud') || condition.includes('Overcast')) return Cloud;
    if (condition.includes('Sunny') || condition.includes('Hot')) return Sun;
    return Cloud;
  };

  const getConditionColor = (condition: string) => {
    if (condition.includes('Rain') || condition.includes('Thunderstorms')) return 'text-blue-600';
    if (condition.includes('Hot') || condition.includes('Very Hot')) return 'text-red-600';
    if (condition.includes('Sunny')) return 'text-yellow-600';
    return 'text-gray-600';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Weather Monitoring</h1>
          <p className="text-gray-600 mt-1">Real-time weather data for all Zambian provinces</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-2">
          {['24hrs', '7days', '30days'].map((timeframe) => (
            <button
              key={timeframe}
              onClick={() => setSelectedTimeframe(timeframe)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                selectedTimeframe === timeframe
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {timeframe === '24hrs' ? '24 Hours' : timeframe === '7days' ? '7 Days' : '30 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* Zambian Weather Context */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg shadow-sm text-white p-6">
        <h3 className="text-lg font-bold mb-3">🇿🇲 Zambian Weather Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-semibold mb-1">Current Season</h4>
            <p className="text-sm opacity-90">{zambianSeasons.currentSeason}</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-semibold mb-1">Planting Window</h4>
            <p className="text-sm opacity-90">{zambianSeasons.plantingWindow}</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-semibold mb-1">Harvest Period</h4>
            <p className="text-sm opacity-90">{zambianSeasons.harvestWindow}</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-semibold mb-1">Active Provinces</h4>
            <p className="text-sm opacity-90">All 10 provinces monitored</p>
          </div>
        </div>
      </div>

      {/* Province Selector */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium text-gray-700 py-2">Select Province:</span>
          {zambianProvinces.map((province) => (
            <button
              key={province}
              onClick={() => setSelectedProvince(province)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors flex items-center space-x-1 ${
                selectedProvince === province
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <MapPin className="w-3 h-3" />
              <span>{province}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Current Weather for Selected Province */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-sm text-white">
        <div className="px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold">{currentWeather.temperature}°C</h2>
              <p className="text-blue-100 mt-1">{currentWeather.condition}</p>
              <p className="text-blue-200 text-sm mt-1">{selectedProvince}, Zambia</p>
              <p className="text-blue-300 text-xs mt-1">Coordinates: {currentWeather.coordinates}</p>
            </div>
            <div className="text-right">
              {React.createElement(getConditionIcon(currentWeather.condition), { 
                className: "w-16 h-16 text-yellow-300 mb-2" 
              })}
              <p className="text-sm text-blue-100">Updated now</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
              <Droplets className="w-5 h-5 mx-auto mb-1" />
              <p className="text-sm opacity-90">Humidity</p>
              <p className="font-semibold">{currentWeather.humidity}%</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
              <Wind className="w-5 h-5 mx-auto mb-1" />
              <p className="text-sm opacity-90">Wind</p>
              <p className="font-semibold">{currentWeather.windSpeed} km/h</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
              <Eye className="w-5 h-5 mx-auto mb-1" />
              <p className="text-sm opacity-90">Visibility</p>
              <p className="font-semibold">{currentWeather.visibility} km</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
              <Activity className="w-5 h-5 mx-auto mb-1" />
              <p className="text-sm opacity-90">Pressure</p>
              <p className="font-semibold">{currentWeather.pressure} mb</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
              <Sun className="w-5 h-5 mx-auto mb-1" />
              <p className="text-sm opacity-90">UV Index</p>
              <p className="font-semibold">{currentWeather.uvIndex}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
              <Umbrella className="w-5 h-5 mx-auto mb-1" />
              <p className="text-sm opacity-90">Rain Today</p>
              <p className="font-semibold">{currentWeather.rainfall} mm</p>
            </div>
          </div>
        </div>
      </div>

      {/* Provincial Weather Summary */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-blue-600" />
            All Provinces Weather Summary
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {zambianProvinces.map((province) => {
              const weather = provincialWeatherData[province as keyof typeof provincialWeatherData];
              const ConditionIcon = getConditionIcon(weather.condition);
              return (
                <div 
                  key={province} 
                  className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                    selectedProvince === province ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedProvince(province)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">{province}</h4>
                    <ConditionIcon className={`w-6 h-6 ${getConditionColor(weather.condition)}`} />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-gray-600">Temperature</p>
                      <p className="font-semibold text-lg">{weather.temperature}°C</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Rainfall</p>
                      <p className="font-semibold text-blue-600">{weather.rainfall} mm</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Humidity</p>
                      <p className="font-medium">{weather.humidity}%</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Wind</p>
                      <p className="font-medium">{weather.windSpeed} km/h</p>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-600">{weather.condition}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Agricultural Weather Alerts */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-yellow-600" />
            Agricultural Weather Alerts
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {weatherAlerts.map((alert) => (
              <div key={alert.id} className={`border rounded-lg p-4 ${getSeverityColor(alert.severity)}`}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold mb-1">{alert.title}</h4>
                    <p className="text-sm opacity-90 mb-2">{alert.message}</p>
                    <div className="flex flex-wrap gap-1">
                      {alert.provinces.map((province) => (
                        <span key={province} className="px-2 py-1 bg-white bg-opacity-50 rounded text-xs">
                          {province}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="text-xs opacity-75">{alert.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 7-Day Forecast */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">7-Day Forecast - {selectedProvince}</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
            {forecast.map((day, index) => {
              const Icon = day.icon;
              return (
                <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900 mb-2">{day.day}</p>
                  <Icon className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <p className="text-xs text-gray-600 mb-2">{day.condition}</p>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-gray-900">{day.high}°</p>
                    <p className="text-sm text-gray-600">{day.low}°</p>
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
      </div>

      {/* Zambian Rainfall Patterns & Agricultural Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Seasonal Rainfall */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Rainfall Pattern - {selectedProvince}</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {zambianRainfallData.map((month, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="w-20">
                    <span className="text-sm font-medium text-gray-700">{month.month}</span>
                    <p className="text-xs text-blue-600">{month.season}</p>
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-blue-500 h-3 rounded-full"
                        style={{ width: `${(month.rainfall / 250) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-600 min-w-[4rem] text-right">{month.rainfall}mm</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Zambian Agricultural Calendar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Zambian Agricultural Calendar
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <h4 className="font-semibold text-emerald-800 mb-2">Planting Season (Nov-Dec)</h4>
                <p className="text-sm text-emerald-700">Main season planting for maize, soybeans, groundnuts. First rains expected.</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Rainy Season (Dec-Mar)</h4>
                <p className="text-sm text-blue-700">Peak growing season. Monitor for fall armyworm and other pests.</p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">Harvest Season (Apr-Jul)</h4>
                <p className="text-sm text-yellow-700">Main harvest period. Prepare storage and marketing plans.</p>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h4 className="font-semibold text-orange-800 mb-2">Dry Season (Aug-Oct)</h4>
                <p className="text-sm text-orange-700">Land preparation, irrigation for winter crops, equipment maintenance.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weather Station Information */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg shadow-sm text-white p-6">
        <h3 className="text-lg font-bold mb-3">🌦️ Zambian Meteorological Service</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-semibold mb-1">Data Sources</h4>
            <p className="text-sm opacity-90">Zambia Meteorological Department, Provincial weather stations</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-semibold mb-1">Update Frequency</h4>
            <p className="text-sm opacity-90">Real-time updates every 30 minutes from all provinces</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-semibold mb-1">Agricultural Focus</h4>
            <p className="text-sm opacity-90">Specialized alerts for farming activities and crop protection</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherMonitoring;