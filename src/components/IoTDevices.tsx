import React, { useState } from 'react';
import { 
  Wifi, 
  WifiOff, 
  Battery, 
  Thermometer, 
  Droplets, 
  Sun, 
  Wind,
  Plus,
  Settings,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  RefreshCw
} from 'lucide-react';

interface IoTDevice {
  id: string;
  name: string;
  type: 'sensor' | 'actuator' | 'gateway' | 'camera';
  status: 'online' | 'offline' | 'warning';
  location: string;
  batteryLevel: number;
  lastUpdate: string;
  data?: {
    temperature?: number;
    humidity?: number;
    soilMoisture?: number;
    lightLevel?: number;
    windSpeed?: number;
  };
}

const IoTDevices: React.FC = () => {
  const [devices, setDevices] = useState<IoTDevice[]>([
    {
      id: '1',
      name: 'Field Sensor A1',
      type: 'sensor',
      status: 'online',
      location: 'North Field',
      batteryLevel: 85,
      lastUpdate: '2 minutes ago',
      data: {
        temperature: 24.5,
        humidity: 65,
        soilMoisture: 42,
        lightLevel: 850
      }
    },
    {
      id: '2',
      name: 'Irrigation Controller',
      type: 'actuator',
      status: 'online',
      location: 'South Field',
      batteryLevel: 92,
      lastUpdate: '5 minutes ago'
    },
    {
      id: '3',
      name: 'Weather Station',
      type: 'sensor',
      status: 'warning',
      location: 'Central Area',
      batteryLevel: 23,
      lastUpdate: '15 minutes ago',
      data: {
        temperature: 26.2,
        humidity: 58,
        windSpeed: 12.5
      }
    },
    {
      id: '4',
      name: 'Gateway Hub',
      type: 'gateway',
      status: 'online',
      location: 'Main Building',
      batteryLevel: 100,
      lastUpdate: '1 minute ago'
    },
    {
      id: '5',
      name: 'Security Camera 1',
      type: 'camera',
      status: 'offline',
      location: 'East Gate',
      batteryLevel: 0,
      lastUpdate: '2 hours ago'
    },
    {
      id: '6',
      name: 'Soil Monitor B2',
      type: 'sensor',
      status: 'online',
      location: 'West Field',
      batteryLevel: 67,
      lastUpdate: '3 minutes ago',
      data: {
        temperature: 23.8,
        humidity: 72,
        soilMoisture: 38
      }
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showAddDevice, setShowAddDevice] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<IoTDevice | null>(null);

  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || device.type === filterType;
    const matchesStatus = filterStatus === 'all' || device.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'offline':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      default:
        return <XCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'sensor':
        return <Thermometer className="w-6 h-6 text-blue-500" />;
      case 'actuator':
        return <Settings className="w-6 h-6 text-purple-500" />;
      case 'gateway':
        return <Wifi className="w-6 h-6 text-green-500" />;
      case 'camera':
        return <Sun className="w-6 h-6 text-orange-500" />;
      default:
        return <Settings className="w-6 h-6 text-gray-500" />;
    }
  };

  const getBatteryColor = (level: number) => {
    if (level > 50) return 'text-green-500';
    if (level > 20) return 'text-yellow-500';
    return 'text-red-500';
  };

  const handleAddDevice = (deviceData: any) => {
    const newDevice: IoTDevice = {
      id: (devices.length + 1).toString(),
      name: deviceData.name,
      type: deviceData.type,
      status: 'online',
      location: deviceData.location,
      batteryLevel: 100,
      lastUpdate: 'Just now'
    };
    setDevices([...devices, newDevice]);
    setShowAddDevice(false);
  };

  const refreshDevices = () => {
    // Simulate refresh by updating last update times
    setDevices(devices.map(device => ({
      ...device,
      lastUpdate: 'Just now'
    })));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">IoT Devices</h1>
          <p className="text-gray-600 mt-1">Monitor and manage your connected devices</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={refreshDevices}
            className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
          <button
            onClick={() => setShowAddDevice(true)}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Device
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Devices</p>
              <p className="text-2xl font-bold text-gray-900">{devices.length}</p>
            </div>
            <Settings className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Online</p>
              <p className="text-2xl font-bold text-green-600">
                {devices.filter(d => d.status === 'online').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Warnings</p>
              <p className="text-2xl font-bold text-yellow-600">
                {devices.filter(d => d.status === 'warning').length}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Offline</p>
              <p className="text-2xl font-bold text-red-600">
                {devices.filter(d => d.status === 'offline').length}
              </p>
            </div>
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search devices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="sensor">Sensors</option>
                <option value="actuator">Actuators</option>
                <option value="gateway">Gateways</option>
                <option value="camera">Cameras</option>
              </select>
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
              <option value="warning">Warning</option>
            </select>
          </div>
        </div>
      </div>

      {/* Devices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDevices.map((device) => (
          <div
            key={device.id}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedDevice(device)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getTypeIcon(device.type)}
                <div>
                  <h3 className="font-semibold text-gray-900">{device.name}</h3>
                  <p className="text-sm text-gray-500 capitalize">{device.type}</p>
                </div>
              </div>
              {getStatusIcon(device.status)}
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Location:</span>
                <span className="font-medium">{device.location}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Battery:</span>
                <div className="flex items-center space-x-1">
                  <Battery className={`w-4 h-4 ${getBatteryColor(device.batteryLevel)}`} />
                  <span className={`font-medium ${getBatteryColor(device.batteryLevel)}`}>
                    {device.batteryLevel}%
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Last Update:</span>
                <span className="font-medium">{device.lastUpdate}</span>
              </div>
            </div>

            {device.data && (
              <div className="border-t pt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Sensor Data:</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {device.data.temperature && (
                    <div className="flex items-center space-x-1">
                      <Thermometer className="w-3 h-3 text-red-500" />
                      <span>{device.data.temperature}°C</span>
                    </div>
                  )}
                  {device.data.humidity && (
                    <div className="flex items-center space-x-1">
                      <Droplets className="w-3 h-3 text-blue-500" />
                      <span>{device.data.humidity}%</span>
                    </div>
                  )}
                  {device.data.soilMoisture && (
                    <div className="flex items-center space-x-1">
                      <Droplets className="w-3 h-3 text-green-500" />
                      <span>{device.data.soilMoisture}% SM</span>
                    </div>
                  )}
                  {device.data.lightLevel && (
                    <div className="flex items-center space-x-1">
                      <Sun className="w-3 h-3 text-yellow-500" />
                      <span>{device.data.lightLevel} lux</span>
                    </div>
                  )}
                  {device.data.windSpeed && (
                    <div className="flex items-center space-x-1">
                      <Wind className="w-3 h-3 text-gray-500" />
                      <span>{device.data.windSpeed} km/h</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Device Modal */}
      {showAddDevice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-md w-full mx-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Device</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                handleAddDevice({
                  name: formData.get('name'),
                  type: formData.get('type'),
                  location: formData.get('location')
                });
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Device Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter device name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Device Type
                </label>
                <select
                  name="type"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select type</option>
                  <option value="sensor">Sensor</option>
                  <option value="actuator">Actuator</option>
                  <option value="gateway">Gateway</option>
                  <option value="camera">Camera</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter location"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddDevice(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Add Device
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Device Details Modal */}
      {selectedDevice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Device Details</h2>
              <button
                onClick={() => setSelectedDevice(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 mb-4">
                {getTypeIcon(selectedDevice.type)}
                <div>
                  <h3 className="font-semibold text-gray-900">{selectedDevice.name}</h3>
                  <p className="text-sm text-gray-500 capitalize">{selectedDevice.type}</p>
                </div>
                {getStatusIcon(selectedDevice.status)}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Status</p>
                  <p className={`text-sm font-semibold capitalize ${
                    selectedDevice.status === 'online' ? 'text-green-600' :
                    selectedDevice.status === 'warning' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {selectedDevice.status}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Location</p>
                  <p className="text-sm font-semibold">{selectedDevice.location}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Battery Level</p>
                  <div className="flex items-center space-x-1">
                    <Battery className={`w-4 h-4 ${getBatteryColor(selectedDevice.batteryLevel)}`} />
                    <span className={`text-sm font-semibold ${getBatteryColor(selectedDevice.batteryLevel)}`}>
                      {selectedDevice.batteryLevel}%
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Last Update</p>
                  <p className="text-sm font-semibold">{selectedDevice.lastUpdate}</p>
                </div>
              </div>

              {selectedDevice.data && (
                <div className="border-t pt-4">
                  <p className="text-sm font-medium text-gray-700 mb-3">Sensor Readings:</p>
                  <div className="space-y-3">
                    {selectedDevice.data.temperature && (
                      <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Thermometer className="w-4 h-4 text-red-500" />
                          <span className="text-sm font-medium">Temperature</span>
                        </div>
                        <span className="text-sm font-bold text-red-600">
                          {selectedDevice.data.temperature}°C
                        </span>
                      </div>
                    )}
                    {selectedDevice.data.humidity && (
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Droplets className="w-4 h-4 text-blue-500" />
                          <span className="text-sm font-medium">Humidity</span>
                        </div>
                        <span className="text-sm font-bold text-blue-600">
                          {selectedDevice.data.humidity}%
                        </span>
                      </div>
                    )}
                    {selectedDevice.data.soilMoisture && (
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Droplets className="w-4 h-4 text-green-500" />
                          <span className="text-sm font-medium">Soil Moisture</span>
                        </div>
                        <span className="text-sm font-bold text-green-600">
                          {selectedDevice.data.soilMoisture}%
                        </span>
                      </div>
                    )}
                    {selectedDevice.data.lightLevel && (
                      <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Sun className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm font-medium">Light Level</span>
                        </div>
                        <span className="text-sm font-bold text-yellow-600">
                          {selectedDevice.data.lightLevel} lux
                        </span>
                      </div>
                    )}
                    {selectedDevice.data.windSpeed && (
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Wind className="w-4 h-4 text-gray-500" />
                          <span className="text-sm font-medium">Wind Speed</span>
                        </div>
                        <span className="text-sm font-bold text-gray-600">
                          {selectedDevice.data.windSpeed} km/h
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex space-x-3 pt-6">
              <button
                onClick={() => setSelectedDevice(null)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Configure
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IoTDevices;