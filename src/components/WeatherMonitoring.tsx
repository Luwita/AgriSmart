import React, { useState, useEffect } from 'react';
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye, 
  Gauge,
  TrendingUp,
  TrendingDown,
  Calendar,
  MapPin,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';

interface WeatherData {
  id: string;
  location: string;
  current: {
    temperature: number;
    humidity: number;
    windSpeed: number;
    visibility: number;
    pressure: number;
    condition: 'sunny' | 'cloudy' | 'rainy' | 'stormy';
    description: string;
  };
  forecast: Array<{
    date: string;
    high: number;
    low: number;
    condition: 'sunny' | 'cloudy' | 'rainy' | 'stormy';
    precipitation: number;
  }>;
  alerts: Array<{
    id: string;
    type: 'warning' | 'watch' | 'advisory';
    title: string;
    description: string;
    severity: 'low' | 'medium' | 'high';
  }>;
}

interface WeatherStation {
  id: string;
  name: string;
  location: string;
  coordinates: { lat: number; lng: number };
  status: 'active' | 'inactive' | 'maintenance';
  lastUpdate: string;
  sensors: {
    temperature: boolean;
    humidity: boolean;
    rainfall: boolean;
    windSpeed: boolean;
    soilMoisture: boolean;
  };
}

const WeatherMonitoring: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [weatherStations, setWeatherStations] = useState<WeatherStation[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [showAddStation, setShowAddStation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadWeatherData();
    loadWeatherStations();
  }, []);

  const loadWeatherData = () => {
    // Simulated weather data
    const mockWeatherData: WeatherData[] = [
      {
        id: '1',
        location: 'Lusaka',
        current: {
          temperature: 28,
          humidity: 65,
          windSpeed: 12,
          visibility: 10,
          pressure: 1013,
          condition: 'sunny',
          description: 'Clear skies'
        },
        forecast: [
          { date: '2024-01-15', high: 30, low: 18, condition: 'sunny', precipitation: 0 },
          { date: '2024-01-16', high: 29, low: 19, condition: 'cloudy', precipitation: 10 },
          { date: '2024-01-17', high: 26, low: 17, condition: 'rainy', precipitation: 80 },
          { date: '2024-01-18', high: 25, low: 16, condition: 'rainy', precipitation: 60 },
          { date: '2024-01-19', high: 28, low: 18, condition: 'cloudy', precipitation: 20 }
        ],
        alerts: [
          {
            id: '1',
            type: 'advisory',
            title: 'High UV Index',
            description: 'UV index expected to reach 9. Take precautions when working outdoors.',
            severity: 'medium'
          }
        ]
      },
      {
        id: '2',
        location: 'Ndola',
        current: {
          temperature: 26,
          humidity: 72,
          windSpeed: 8,
          visibility: 8,
          pressure: 1015,
          condition: 'cloudy',
          description: 'Partly cloudy'
        },
        forecast: [
          { date: '2024-01-15', high: 28, low: 16, condition: 'cloudy', precipitation: 20 },
          { date: '2024-01-16', high: 27, low: 17, condition: 'rainy', precipitation: 70 },
          { date: '2024-01-17', high: 24, low: 15, condition: 'rainy', precipitation: 90 },
          { date: '2024-01-18', high: 23, low: 14, condition: 'stormy', precipitation: 95 },
          { date: '2024-01-19', high: 26, low: 16, condition: 'cloudy', precipitation: 30 }
        ],
        alerts: [
          {
            id: '2',
            type: 'warning',
            title: 'Heavy Rain Expected',
            description: 'Heavy rainfall expected over the next 48 hours. Monitor crop drainage.',
            severity: 'high'
          }
        ]
      }
    ];
    setWeatherData(mockWeatherData);
  };

  const loadWeatherStations = () => {
    const mockStations: WeatherStation[] = [
      {
        id: '1',
        name: 'Central Farm Station',
        location: 'Lusaka Province',
        coordinates: { lat: -15.4067, lng: 28.2871 },
        status: 'active',
        lastUpdate: '2024-01-15T10:30:00Z',
        sensors: {
          temperature: true,
          humidity: true,
          rainfall: true,
          windSpeed: true,
          soilMoisture: true
        }
      },
      {
        id: '2',
        name: 'Northern Fields Station',
        location: 'Copperbelt Province',
        coordinates: { lat: -12.9714, lng: 28.6336 },
        status: 'active',
        lastUpdate: '2024-01-15T10:25:00Z',
        sensors: {
          temperature: true,
          humidity: true,
          rainfall: true,
          windSpeed: false,
          soilMoisture: true
        }
      },
      {
        id: '3',
        name: 'Eastern Valley Station',
        location: 'Eastern Province',
        coordinates: { lat: -13.5432, lng: 32.8493 },
        status: 'maintenance',
        lastUpdate: '2024-01-14T15:20:00Z',
        sensors: {
          temperature: true,
          humidity: false,
          rainfall: true,
          windSpeed: true,
          soilMoisture: true
        }
      }
    ];
    setWeatherStations(mockStations);
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return <Sun className="w-8 h-8 text-yellow-500" />;
      case 'cloudy':
        return <Cloud className="w-8 h-8 text-gray-500" />;
      case 'rainy':
        return <CloudRain className="w-8 h-8 text-blue-500" />;
      case 'stormy':
        return <CloudRain className="w-8 h-8 text-purple-500" />;
      default:
        return <Sun className="w-8 h-8 text-yellow-500" />;
    }
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 border-red-200 text-red-800';
      case 'medium':
        return 'bg-yellow-100 border-yellow-200 text-yellow-800';
      case 'low':
        return 'bg-blue-100 border-blue-200 text-blue-800';
      default:
        return 'bg-gray-100 border-gray-200 text-gray-800';
    }
  };

  const refreshWeatherData = () => {
    setIsLoading(true);
    setTimeout(() => {
      loadWeatherData();
      setIsLoading(false);
    }, 1000);
  };

  const filteredWeatherData = selectedLocation === 'all' 
    ? weatherData 
    : weatherData.filter(data => data.location.toLowerCase().includes(selectedLocation.toLowerCase()));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Weather Monitoring</h1>
          <p className="text-gray-600 mt-1">Real-time weather data and forecasts for your farms</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={refreshWeatherData}
            disabled={isLoading}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button
            onClick={() => setShowAddStation(true)}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <MapPin className="w-4 h-4 mr-2" />
            Add Station
          </button>
        </div>
      </div>

      {/* Location Filter */}
      <div className="flex items-center space-x-4">
        <label className="text-sm font-medium text-gray-700">Filter by Location:</label>
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Locations</option>
          <option value="lusaka">Lusaka</option>
          <option value="ndola">Ndola</option>
          <option value="kitwe">Kitwe</option>
        </select>
      </div>

      {/* Weather Alerts */}
      {weatherData.some(data => data.alerts.length > 0) && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-orange-500" />
            Weather Alerts
          </h2>
          <div className="space-y-3">
            {weatherData.flatMap(data => data.alerts).map(alert => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border ${getAlertColor(alert.severity)}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{alert.title}</h3>
                    <p className="text-sm mt-1">{alert.description}</p>
                  </div>
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-white bg-opacity-50">
                    {alert.type.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Current Weather Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredWeatherData.map(weather => (
          <div key={weather.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{weather.location}</h3>
                <p className="text-gray-600">{weather.current.description}</p>
              </div>
              {getWeatherIcon(weather.current.condition)}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">{weather.current.temperature}°C</div>
                <div className="text-sm text-gray-600">Temperature</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Droplets className="w-4 h-4 text-blue-500 mr-2" />
                    <span className="text-sm text-gray-600">Humidity</span>
                  </div>
                  <span className="text-sm font-medium">{weather.current.humidity}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Wind className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">Wind</span>
                  </div>
                  <span className="text-sm font-medium">{weather.current.windSpeed} km/h</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Gauge className="w-4 h-4 text-purple-500 mr-2" />
                    <span className="text-sm text-gray-600">Pressure</span>
                  </div>
                  <span className="text-sm font-medium">{weather.current.pressure} hPa</span>
                </div>
              </div>
            </div>

            {/* 5-Day Forecast */}
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-3">5-Day Forecast</h4>
              <div className="space-y-2">
                {weather.forecast.map((day, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center space-x-3">
                      {getWeatherIcon(day.condition)}
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                        </div>
                        <div className="text-xs text-gray-600">{day.precipitation}% rain</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{day.high}°/{day.low}°</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Weather Stations */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Weather Stations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {weatherStations.map(station => (
            <div key={station.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-medium text-gray-900">{station.name}</h3>
                  <p className="text-sm text-gray-600">{station.location}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  station.status === 'active' ? 'bg-green-100 text-green-800' :
                  station.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {station.status}
                </span>
              </div>
              
              <div className="text-xs text-gray-500 mb-3">
                Last update: {new Date(station.lastUpdate).toLocaleString()}
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-700">Active Sensors:</div>
                <div className="flex flex-wrap gap-1">
                  {Object.entries(station.sensors).map(([sensor, active]) => (
                    <span
                      key={sensor}
                      className={`px-2 py-1 text-xs rounded-full ${
                        active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {sensor.replace(/([A-Z])/g, ' $1').toLowerCase()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Station Modal */}
      {showAddStation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Weather Station</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Station Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter station name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter location"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
                  <input
                    type="number"
                    step="any"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.0000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
                  <input
                    type="number"
                    step="any"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.0000"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sensors</label>
                <div className="space-y-2">
                  {['Temperature', 'Humidity', 'Rainfall', 'Wind Speed', 'Soil Moisture'].map(sensor => (
                    <label key={sensor} className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-2 text-sm text-gray-700">{sensor}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddStation(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Station
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherMonitoring;