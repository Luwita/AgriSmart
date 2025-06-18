import React, { useState } from 'react';
import { 
  Cpu, 
  Wifi, 
  Battery, 
  Thermometer, 
  Droplets, 
  Wind,
  Gauge,
  MapPin,
  Settings,
  Plus,
  AlertTriangle,
  CheckCircle,
  WifiOff,
  X,
  Calendar,
  Activity,
  TrendingUp,
  Eye,
  Signal,
  Clock,
  Info,
  ChevronRight,
  Filter,
  Search
} from 'lucide-react';

const MobileIoTDevices: React.FC = () => {
  const [selectedDevice, setSelectedDevice] = useState<any>(null);
  const [showAddDeviceModal, setShowAddDeviceModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [deviceTypeFilter, setDeviceTypeFilter] = useState('all');

  const devices = [
    {
      id: 1,
      name: 'Soil Sensor A1',
      type: 'Soil Monitor',
      location: 'Field A - North',
      status: 'online',
      battery: 87,
      lastUpdate: '2m ago',
      readings: {
        moisture: 68,
        temperature: 24,
        pH: 6.8,
        nutrients: 'Good'
      },
      alerts: 1
    },
    {
      id: 2,
      name: 'Weather Station B1',
      type: 'Weather Monitor',
      location: 'Field B - Central',
      status: 'online',
      battery: 92,
      lastUpdate: '1m ago',
      readings: {
        temperature: 28,
        humidity: 65,
        windSpeed: 12,
        rainfall: 2.5
      },
      alerts: 0
    },
    {
      id: 3,
      name: 'Irrigation Controller C1',
      type: 'Irrigation System',
      location: 'Field C - South',
      status: 'active',
      battery: 78,
      lastUpdate: '5m ago',
      readings: {
        flowRate: 150,
        pressure: 2.3,
        volume: 2450,
        status: 'Irrigating'
      },
      alerts: 0
    },
    {
      id: 4,
      name: 'Pest Detector D1',
      type: 'Pest Monitor',
      location: 'Field D - East',
      status: 'offline',
      battery: 23,
      lastUpdate: '2h ago',
      readings: {
        motionDetected: 12,
        trapStatus: 'Active',
        pestCount: 8,
        lastTrigger: '45m ago'
      },
      alerts: 2
    }
  ];

  const deviceTypes = [
    { type: 'all', label: 'All Devices' },
    { type: 'Soil Monitor', label: 'Soil Sensors' },
    { type: 'Weather Monitor', label: 'Weather Stations' },
    { type: 'Irrigation System', label: 'Irrigation' },
    { type: 'Pest Monitor', label: 'Pest Detectors' }
  ];

  const filteredDevices = deviceTypeFilter === 'all' 
    ? devices 
    : devices.filter(device => device.type === deviceTypeFilter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-emerald-600 bg-emerald-100';
      case 'active': return 'text-blue-600 bg-blue-100';
      case 'charging': return 'text-yellow-600 bg-yellow-100';
      case 'offline': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <CheckCircle className="w-3 h-3" />;
      case 'active': return <Wifi className="w-3 h-3" />;
      case 'charging': return <Battery className="w-3 h-3" />;
      case 'offline': return <WifiOff className="w-3 h-3" />;
      default: return <AlertTriangle className="w-3 h-3" />;
    }
  };

  const getBatteryColor = (battery: number) => {
    if (battery > 60) return 'text-emerald-600';
    if (battery > 30) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleViewDetails = (device: any) => {
    setSelectedDevice(device);
    setShowDetailsModal(true);
  };

  return (
    <div className="p-4 space-y-4 pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">IoT Devices</h1>
          <p className="text-gray-600 text-sm">Monitor your smart farm devices</p>
        </div>
        <button 
          onClick={() => setShowAddDeviceModal(true)}
          className="bg-emerald-600 text-white p-2 rounded-xl hover:bg-emerald-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Zambian IoT Context */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl text-white p-4">
        <h3 className="font-bold mb-2">🇿🇲 Smart Agriculture Network</h3>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-white bg-opacity-20 rounded-lg p-2">
            <p className="font-medium">Network Coverage</p>
            <p className="opacity-90">MTN, Airtel, Zamtel 4G/LTE</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-2">
            <p className="font-medium">Power Solutions</p>
            <p className="opacity-90">Solar panels for rural areas</p>
          </div>
        </div>
      </div>

      {/* Filters */}
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
            placeholder="Search devices..."
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
      </div>

      {showFilters && (
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <h3 className="font-medium text-gray-900 mb-3 text-sm">Device Type</h3>
          <div className="flex flex-wrap gap-2">
            {deviceTypes.map((type) => (
              <button
                key={type.type}
                onClick={() => setDeviceTypeFilter(type.type)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  deviceTypeFilter === type.type
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* System Status Overview */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">Total Devices</p>
              <p className="text-xl font-bold text-gray-900 mt-1">{devices.length}</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-full">
              <Cpu className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">Online</p>
              <p className="text-xl font-bold text-emerald-600 mt-1">
                {devices.filter(d => d.status === 'online' || d.status === 'active').length}
              </p>
            </div>
            <div className="p-2 bg-emerald-100 rounded-full">
              <Wifi className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Device Cards */}
      <div className="space-y-4">
        {filteredDevices.map((device) => (
          <div key={device.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Device Header */}
            <div className="px-4 py-3 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{device.name}</h3>
                  <p className="text-xs text-gray-600">{device.type}</p>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <MapPin className="w-3 h-3 mr-1" />
                    {device.location}
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(device.status)}`}>
                    {getStatusIcon(device.status)}
                    <span className="ml-1 capitalize">{device.status}</span>
                  </span>
                  {device.alerts > 0 && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-600">
                      {device.alerts} Alert{device.alerts > 1 ? 's' : ''}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Device Status */}
            <div className="p-4">
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="flex items-center space-x-2">
                  <Battery className={`w-4 h-4 ${getBatteryColor(device.battery)}`} />
                  <span className="text-xs text-gray-600">Battery:</span>
                  <span className={`text-xs font-medium ${getBatteryColor(device.battery)}`}>
                    {device.battery}%
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-600" />
                  <span className="text-xs text-gray-600">Updated:</span>
                  <span className="text-xs font-medium text-gray-900">
                    {device.lastUpdate}
                  </span>
                </div>
              </div>

              {/* Device Readings */}
              <div className="space-y-2">
                <h4 className="text-xs font-medium text-gray-700">Current Readings</h4>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(device.readings).slice(0, 4).map(([key, value], index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-2">
                      <p className="text-xs text-gray-600 capitalize mb-1">
                        {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                      </p>
                      <p className="text-sm font-medium text-gray-900">
                        {typeof value === 'number' 
                          ? key.includes('temperature') ? `${value}°C`
                          : key.includes('moisture') || key.includes('humidity') ? `${value}%`
                          : key.includes('pH') ? value.toFixed(1)
                          : key.includes('pressure') ? `${value} bar`
                          : key.includes('flowRate') ? `${value} L/min`
                          : key.includes('windSpeed') ? `${value} km/h`
                          : key.includes('rainfall') || key.includes('volume') ? `${value} L`
                          : value
                          : value
                        }
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 mt-3">
                <button 
                  onClick={() => handleViewDetails(device)}
                  className="flex-1 bg-emerald-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-1"
                >
                  <Eye className="w-4 h-4" />
                  <span>Details</span>
                </button>
                <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View Details Modal */}
      {showDetailsModal && selectedDevice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col">
          <div className="bg-white rounded-t-2xl mt-auto max-h-[90vh] overflow-y-auto w-full">
            <div className="sticky top-0 bg-white px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedDevice.name}
              </h3>
              <button 
                onClick={() => setShowDetailsModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              {/* Device Overview */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-medium text-gray-900 mb-3 text-sm">Device Overview</h4>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-600">Status:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedDevice.status)}`}>
                      {selectedDevice.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-600">Type:</span>
                    <span className="text-xs font-medium">{selectedDevice.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-600">Location:</span>
                    <span className="text-xs font-medium">{selectedDevice.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-600">Battery:</span>
                    <span className={`text-xs font-medium ${getBatteryColor(selectedDevice.battery)}`}>
                      {selectedDevice.battery}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-600">Last Update:</span>
                    <span className="text-xs font-medium">{selectedDevice.lastUpdate}</span>
                  </div>
                </div>
              </div>

              {/* Current Readings */}
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <h4 className="font-medium text-gray-900 mb-3 text-sm flex items-center">
                  <Activity className="w-4 h-4 mr-2 text-emerald-600" />
                  Current Readings
                </h4>
                
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(selectedDevice.readings).map(([key, value], index) => (
                    <div key={index} className="bg-emerald-50 rounded-lg p-3 text-center">
                      <p className="text-xs text-emerald-700 capitalize mb-1">
                        {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                      </p>
                      <p className="text-sm font-bold text-emerald-800">
                        {typeof value === 'number' 
                          ? key.includes('temperature') ? `${value}°C`
                          : key.includes('moisture') || key.includes('humidity') ? `${value}%`
                          : key.includes('pH') ? value.toFixed(1)
                          : key.includes('pressure') ? `${value} bar`
                          : key.includes('flowRate') ? `${value} L/min`
                          : key.includes('windSpeed') ? `${value} km/h`
                          : key.includes('rainfall') || key.includes('volume') ? `${value} L`
                          : value
                          : value
                        }
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <h4 className="font-medium text-gray-900 mb-3 text-sm">Recent Activity</h4>
                
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Data transmission successful</p>
                      <p className="text-xs text-gray-500">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Info className="w-4 h-4 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Calibration completed</p>
                      <p className="text-xs text-gray-500">2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Low battery warning cleared</p>
                      <p className="text-xs text-gray-500">1 week ago</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4">
                <button className="flex-1 bg-emerald-600 text-white py-3 px-4 rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2">
                  <Settings className="w-4 h-4" />
                  <span>Configure</span>
                </button>
                <button className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Schedule</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Device Modal */}
      {showAddDeviceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col">
          <div className="bg-white rounded-t-2xl mt-auto max-h-[90vh] overflow-y-auto w-full">
            <div className="sticky top-0 bg-white px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Add New Device</h3>
              <button 
                onClick={() => setShowAddDeviceModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Device Name</label>
                <input 
                  type="text"
                  className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="e.g., Soil Sensor G1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Device Type</label>
                <select className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                  <option value="">Select device type</option>
                  <option value="Soil Monitor">Soil Monitor</option>
                  <option value="Weather Monitor">Weather Monitor</option>
                  <option value="Irrigation System">Irrigation System</option>
                  <option value="Pest Monitor">Pest Monitor</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input 
                  type="text"
                  className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="e.g., Field A - North Section"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Network Type</label>
                  <select className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                    <option value="WiFi">WiFi</option>
                    <option value="4G LTE">4G LTE</option>
                    <option value="LoRaWAN">LoRaWAN</option>
                    <option value="Bluetooth">Bluetooth</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Power Source</label>
                  <select className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                    <option value="Battery">Battery</option>
                    <option value="Solar">Solar + Battery</option>
                    <option value="Mains">Mains Power</option>
                  </select>
                </div>
              </div>

              {/* Zambian IoT Information */}
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl">
                <h4 className="font-medium text-blue-800 mb-2 text-sm">🇿🇲 Zambian IoT Guide</h4>
                <div className="text-xs text-blue-700">
                  <p><strong>Network:</strong> MTN and Airtel provide best 4G coverage</p>
                  <p><strong>Power:</strong> Solar panels recommended for remote locations</p>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button 
                  onClick={() => setShowAddDeviceModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-xl hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setShowAddDeviceModal(false)}
                  className="flex-1 bg-emerald-600 text-white py-3 px-4 rounded-xl hover:bg-emerald-700 transition-colors"
                >
                  Add Device
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Alerts */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
        <h3 className="font-medium text-gray-900 mb-3 flex items-center">
          <AlertTriangle className="w-4 h-4 mr-2 text-yellow-600" />
          Recent Alerts
        </h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-medium text-red-800 text-sm">Device Offline</h4>
              <p className="text-xs text-red-700 mt-1">Pest Detector D1 has been offline for 2 hours.</p>
              <p className="text-xs text-red-600 mt-1">2h ago • Field D - East</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <Battery className="w-4 h-4 text-yellow-600 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-medium text-yellow-800 text-sm">Low Battery</h4>
              <p className="text-xs text-yellow-700 mt-1">Pest Detector D1 battery at 23%.</p>
              <p className="text-xs text-yellow-600 mt-1">2h ago • Field D - East</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileIoTDevices;