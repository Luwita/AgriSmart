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
  Edit,
  Trash2,
  Signal,
  Clock,
  Info,
  Zap,
  Bug,
  Camera
} from 'lucide-react';

const IoTDevices: React.FC = () => {
  const [selectedDevice, setSelectedDevice] = useState<any>(null);
  const [showAddDeviceModal, setShowAddDeviceModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [newDevice, setNewDevice] = useState({
    name: '',
    type: '',
    location: '',
    field: '',
    coordinates: '',
    installationDate: '',
    manufacturer: '',
    model: '',
    serialNumber: '',
    networkType: 'WiFi',
    powerSource: 'Battery',
    maintenanceSchedule: 'Monthly'
  });

  const devices = [
    {
      id: 1,
      name: 'Soil Sensor A1',
      type: 'Soil Monitor',
      location: 'Field A - North Section',
      status: 'online',
      battery: 87,
      lastUpdate: '2 minutes ago',
      installDate: '2024-01-15',
      manufacturer: 'AgroTech Solutions',
      model: 'ST-2000',
      serialNumber: 'ST2000-001-ZM',
      networkType: 'LoRaWAN',
      signalStrength: 85,
      dataPoints: 2847,
      coordinates: '-15.4067, 28.2871',
      readings: {
        moisture: 68,
        temperature: 24,
        pH: 6.8,
        nutrients: 'Good'
      },
      alerts: 1,
      maintenanceDate: '2024-12-20',
      calibrationDate: '2024-11-01',
      firmware: 'v2.1.3',
      powerSource: 'Solar + Battery'
    },
    {
      id: 2,
      name: 'Weather Station B1',
      type: 'Weather Monitor',
      location: 'Field B - Central',
      status: 'online',
      battery: 92,
      lastUpdate: '1 minute ago',
      installDate: '2024-02-10',
      manufacturer: 'WeatherPro Zambia',
      model: 'WP-500',
      serialNumber: 'WP500-002-ZM',
      networkType: '4G LTE',
      signalStrength: 92,
      dataPoints: 4521,
      coordinates: '-15.3333, 28.6833',
      readings: {
        temperature: 28,
        humidity: 65,
        windSpeed: 12,
        rainfall: 2.5
      },
      alerts: 0,
      maintenanceDate: '2024-12-25',
      calibrationDate: '2024-10-15',
      firmware: 'v3.0.1',
      powerSource: 'Mains + UPS'
    },
    {
      id: 3,
      name: 'Irrigation Controller C1',
      type: 'Irrigation System',
      location: 'Field C - South Section',
      status: 'active',
      battery: 78,
      lastUpdate: '5 minutes ago',
      installDate: '2024-03-05',
      manufacturer: 'IrriSmart Zambia',
      model: 'IS-300',
      serialNumber: 'IS300-003-ZM',
      networkType: 'WiFi',
      signalStrength: 78,
      dataPoints: 1892,
      coordinates: '-15.5000, 28.3000',
      readings: {
        flowRate: 150,
        pressure: 2.3,
        volume: 2450,
        status: 'Irrigating'
      },
      alerts: 0,
      maintenanceDate: '2024-12-30',
      calibrationDate: '2024-11-10',
      firmware: 'v1.8.2',
      powerSource: 'Solar Panel'
    },
    {
      id: 4,
      name: 'Pest Detector D1',
      type: 'Pest Monitor',
      location: 'Field D - East Section',
      status: 'offline',
      battery: 23,
      lastUpdate: '2 hours ago',
      installDate: '2024-01-20',
      manufacturer: 'PestGuard Africa',
      model: 'PG-100',
      serialNumber: 'PG100-004-ZM',
      networkType: 'LoRaWAN',
      signalStrength: 0,
      dataPoints: 956,
      coordinates: '-15.4500, 28.4000',
      readings: {
        motionDetected: 12,
        trapStatus: 'Active',
        pestCount: 8,
        lastTrigger: '45 mins ago'
      },
      alerts: 2,
      maintenanceDate: 'Overdue',
      calibrationDate: '2024-09-15',
      firmware: 'v1.2.1',
      powerSource: 'Battery (Low)'
    },
    {
      id: 5,
      name: 'Camera Drone E1',
      type: 'Aerial Monitor',
      location: 'Mobile - Field Coverage',
      status: 'charging',
      battery: 15,
      lastUpdate: '1 hour ago',
      installDate: '2024-04-12',
      manufacturer: 'AgroDrone Zambia',
      model: 'AD-Pro',
      serialNumber: 'ADPRO-005-ZM',
      networkType: '4G LTE',
      signalStrength: 88,
      dataPoints: 342,
      coordinates: 'Mobile Unit',
      readings: {
        flightTime: '2.5 hours',
        coverage: '85%',
        imagesCollected: 247,
        batteryHealth: 'Good'
      },
      alerts: 1,
      maintenanceDate: '2024-12-15',
      calibrationDate: '2024-10-30',
      firmware: 'v2.3.0',
      powerSource: 'Rechargeable Battery'
    },
    {
      id: 6,
      name: 'Nutrient Sensor F1',
      type: 'Soil Nutrient',
      location: 'Field F - West Section',
      status: 'online',
      battery: 95,
      lastUpdate: '3 minutes ago',
      installDate: '2024-02-28',
      manufacturer: 'NutriSense Zambia',
      model: 'NS-400',
      serialNumber: 'NS400-006-ZM',
      networkType: 'WiFi',
      signalStrength: 91,
      dataPoints: 3156,
      coordinates: '-15.3800, 28.1500',
      readings: {
        nitrogen: 42,
        phosphorus: 28,
        potassium: 156,
        organic: 'High'
      },
      alerts: 0,
      maintenanceDate: '2024-12-28',
      calibrationDate: '2024-11-05',
      firmware: 'v1.9.4',
      powerSource: 'Solar + Battery'
    }
  ];

  const deviceTypeOptions = [
    { value: 'Soil Monitor', icon: Droplets, description: 'Monitor soil moisture, pH, and nutrients' },
    { value: 'Weather Monitor', icon: Wind, description: 'Track weather conditions and forecasts' },
    { value: 'Irrigation System', icon: Gauge, description: 'Control and monitor irrigation systems' },
    { value: 'Pest Monitor', icon: Bug, description: 'Detect and monitor pest activity' },
    { value: 'Aerial Monitor', icon: Camera, description: 'Drone-based crop monitoring' },
    { value: 'Soil Nutrient', icon: Thermometer, description: 'Analyze soil nutrient levels' }
  ];

  const zambianFields = [
    'Chongwe Farm Block A',
    'Mkushi Farm Block B', 
    'Eastern Province Block C',
    'Central Province Block D',
    'Southern Province Block E',
    'Lusaka Farm Block F',
    'Copperbelt Block G',
    'Northern Province Block H'
  ];

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
      case 'online': return <CheckCircle className="w-4 h-4" />;
      case 'active': return <Wifi className="w-4 h-4" />;
      case 'charging': return <Battery className="w-4 h-4" />;
      case 'offline': return <WifiOff className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getBatteryColor = (battery: number) => {
    if (battery > 60) return 'text-emerald-600';
    if (battery > 30) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSignalStrength = (strength: number) => {
    if (strength > 80) return { color: 'text-emerald-600', bars: 4 };
    if (strength > 60) return { color: 'text-yellow-600', bars: 3 };
    if (strength > 40) return { color: 'text-orange-600', bars: 2 };
    if (strength > 0) return { color: 'text-red-600', bars: 1 };
    return { color: 'text-gray-400', bars: 0 };
  };

  const deviceTypes = [
    { type: 'Soil Monitor', icon: Droplets, count: devices.filter(d => d.type === 'Soil Monitor' || d.type === 'Soil Nutrient').length },
    { type: 'Weather Monitor', icon: Wind, count: devices.filter(d => d.type === 'Weather Monitor').length },
    { type: 'Irrigation System', icon: Gauge, count: devices.filter(d => d.type === 'Irrigation System').length },
    { type: 'Pest Monitor', icon: AlertTriangle, count: devices.filter(d => d.type === 'Pest Monitor').length },
    { type: 'Aerial Monitor', icon: Cpu, count: devices.filter(d => d.type === 'Aerial Monitor').length },
    { type: 'Other Devices', icon: Thermometer, count: devices.filter(d => !['Soil Monitor', 'Weather Monitor', 'Irrigation System', 'Pest Monitor', 'Aerial Monitor', 'Soil Nutrient'].includes(d.type)).length }
  ];

  const handleAddDevice = () => {
    // Here you would typically save to database
    console.log('Adding new device:', newDevice);
    setShowAddDeviceModal(false);
    setNewDevice({
      name: '',
      type: '',
      location: '',
      field: '',
      coordinates: '',
      installationDate: '',
      manufacturer: '',
      model: '',
      serialNumber: '',
      networkType: 'WiFi',
      powerSource: 'Battery',
      maintenanceSchedule: 'Monthly'
    });
    alert('Device added successfully! It will appear in your dashboard once activated.');
  };

  const handleViewDetails = (device: any) => {
    setSelectedDevice(device);
    setShowDetailsModal(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">IoT Device Management</h1>
          <p className="text-gray-600 mt-1">Monitor and control your smart farming devices across Zambian farms</p>
        </div>
        <button 
          onClick={() => setShowAddDeviceModal(true)}
          className="mt-4 sm:mt-0 bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-emerald-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Device</span>
        </button>
      </div>

      {/* Zambian IoT Context */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg shadow-sm text-white p-6">
        <h3 className="text-lg font-bold mb-3">🇿🇲 Zambian Smart Agriculture Network</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-semibold mb-1">Network Coverage</h4>
            <p className="text-sm opacity-90">MTN, Airtel, Zamtel 4G/LTE available</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-semibold mb-1">Local Support</h4>
            <p className="text-sm opacity-90">Zambian IoT technicians available</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-semibold mb-1">Power Solutions</h4>
            <p className="text-sm opacity-90">Solar panels ideal for rural areas</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-semibold mb-1">Data Storage</h4>
            <p className="text-sm opacity-90">Local servers in Lusaka & Ndola</p>
          </div>
        </div>
      </div>

      {/* Device Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {deviceTypes.map((type, index) => {
          const Icon = type.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <Icon className="w-5 h-5 text-emerald-600" />
                <span className="text-xl font-bold text-gray-900">{type.count}</span>
              </div>
              <p className="text-sm text-gray-600">{type.type}</p>
            </div>
          );
        })}
      </div>

      {/* System Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Devices</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{devices.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Cpu className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Online</p>
              <p className="text-2xl font-bold text-emerald-600 mt-2">
                {devices.filter(d => d.status === 'online' || d.status === 'active').length}
              </p>
            </div>
            <div className="p-3 bg-emerald-100 rounded-full">
              <Wifi className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Alerts</p>
              <p className="text-2xl font-bold text-yellow-600 mt-2">
                {devices.reduce((sum, device) => sum + device.alerts, 0)}
              </p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Battery</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {Math.round(devices.reduce((sum, device) => sum + device.battery, 0) / devices.length)}%
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Battery className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Device Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {devices.map((device) => {
          const signal = getSignalStrength(device.signalStrength);
          return (
            <div key={device.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              {/* Device Header */}
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{device.name}</h3>
                    <p className="text-sm text-gray-600">{device.type}</p>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      {device.location}
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
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
              <div className="px-6 py-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Battery className={`w-4 h-4 ${getBatteryColor(device.battery)}`} />
                    <span className="text-sm text-gray-600">Battery:</span>
                    <span className={`text-sm font-medium ${getBatteryColor(device.battery)}`}>
                      {device.battery}%
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Signal className={`w-4 h-4 ${signal.color}`} />
                    <span className="text-sm text-gray-600">Signal:</span>
                    <span className={`text-sm font-medium ${signal.color}`}>
                      {device.signalStrength}%
                    </span>
                  </div>
                </div>

                <div className="text-right mb-4">
                  <span className="text-xs text-gray-500">Last update</span>
                  <p className="text-sm font-medium text-gray-900">{device.lastUpdate}</p>
                </div>

                {/* Device Readings */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-gray-700">Current Readings</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(device.readings).map(([key, value], index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-600 capitalize mb-1">
                          {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                        </p>
                        <p className="text-sm font-semibold text-gray-900">
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
                <div className="flex space-x-2 mt-4">
                  <button 
                    onClick={() => handleViewDetails(device)}
                    className="flex-1 bg-emerald-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-1"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Details</span>
                  </button>
                  <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Device Modal */}
      {showAddDeviceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Add New IoT Device - Zambian Farm</h3>
              <button 
                onClick={() => setShowAddDeviceModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h4>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Device Name</label>
                    <input 
                      type="text"
                      value={newDevice.name}
                      onChange={(e) => setNewDevice({...newDevice, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="e.g., Soil Sensor G1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Device Type</label>
                    <select 
                      value={newDevice.type}
                      onChange={(e) => setNewDevice({...newDevice, type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="">Select device type</option>
                      {deviceTypeOptions.map((option) => (
                        <option key={option.value} value={option.value}>{option.value}</option>
                      ))}
                    </select>
                    {newDevice.type && (
                      <p className="text-sm text-gray-600 mt-1">
                        {deviceTypeOptions.find(opt => opt.value === newDevice.type)?.description}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Farm Field/Block</label>
                    <select 
                      value={newDevice.field}
                      onChange={(e) => setNewDevice({...newDevice, field: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="">Select field/block</option>
                      {zambianFields.map((field) => (
                        <option key={field} value={field}>{field}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Specific Location</label>
                    <input 
                      type="text"
                      value={newDevice.location}
                      onChange={(e) => setNewDevice({...newDevice, location: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="e.g., North Section, Near Borehole"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">GPS Coordinates</label>
                    <input 
                      type="text"
                      value={newDevice.coordinates}
                      onChange={(e) => setNewDevice({...newDevice, coordinates: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="e.g., -15.4067, 28.2871"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Installation Date</label>
                    <input 
                      type="date"
                      value={newDevice.installationDate}
                      onChange={(e) => setNewDevice({...newDevice, installationDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Technical Specifications */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Technical Specifications</h4>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Manufacturer</label>
                    <input 
                      type="text"
                      value={newDevice.manufacturer}
                      onChange={(e) => setNewDevice({...newDevice, manufacturer: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="e.g., AgroTech Solutions"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Model Number</label>
                    <input 
                      type="text"
                      value={newDevice.model}
                      onChange={(e) => setNewDevice({...newDevice, model: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="e.g., ST-2000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Serial Number</label>
                    <input 
                      type="text"
                      value={newDevice.serialNumber}
                      onChange={(e) => setNewDevice({...newDevice, serialNumber: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="e.g., ST2000-007-ZM"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Network Type</label>
                    <select 
                      value={newDevice.networkType}
                      onChange={(e) => setNewDevice({...newDevice, networkType: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="WiFi">WiFi</option>
                      <option value="4G LTE">4G LTE (MTN/Airtel/Zamtel)</option>
                      <option value="LoRaWAN">LoRaWAN</option>
                      <option value="Bluetooth">Bluetooth</option>
                      <option value="Ethernet">Ethernet</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Power Source</label>
                    <select 
                      value={newDevice.powerSource}
                      onChange={(e) => setNewDevice({...newDevice, powerSource: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="Battery">Battery Only</option>
                      <option value="Solar + Battery">Solar Panel + Battery</option>
                      <option value="Mains + UPS">Mains Power + UPS</option>
                      <option value="Solar Panel">Solar Panel Only</option>
                      <option value="Rechargeable Battery">Rechargeable Battery</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Maintenance Schedule</label>
                    <select 
                      value={newDevice.maintenanceSchedule}
                      onChange={(e) => setNewDevice({...newDevice, maintenanceSchedule: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="Weekly">Weekly</option>
                      <option value="Monthly">Monthly</option>
                      <option value="Quarterly">Quarterly</option>
                      <option value="Semi-Annual">Semi-Annual</option>
                      <option value="Annual">Annual</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Zambian IoT Information */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">🇿🇲 Zambian IoT Deployment Guide</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
                  <div>
                    <p><strong>Network Coverage:</strong> MTN and Airtel provide best 4G coverage in rural areas</p>
                    <p><strong>Power Solutions:</strong> Solar panels recommended for remote locations</p>
                  </div>
                  <div>
                    <p><strong>Local Support:</strong> Zambian IoT technicians available in major cities</p>
                    <p><strong>Import Duties:</strong> Agricultural IoT devices may qualify for duty exemptions</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button 
                  onClick={() => setShowAddDeviceModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddDevice}
                  className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Add Device
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {showDetailsModal && selectedDevice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedDevice.name} - Detailed Information
              </h3>
              <button 
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Device Overview */}
                <div className="lg:col-span-1">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Device Overview</h4>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedDevice.status)}`}>
                          {selectedDevice.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium">{selectedDevice.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Location:</span>
                        <span className="font-medium">{selectedDevice.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Coordinates:</span>
                        <span className="font-medium text-blue-600">{selectedDevice.coordinates}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Battery:</span>
                        <span className={`font-medium ${getBatteryColor(selectedDevice.battery)}`}>
                          {selectedDevice.battery}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Signal:</span>
                        <span className={`font-medium ${getSignalStrength(selectedDevice.signalStrength).color}`}>
                          {selectedDevice.signalStrength}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Network:</span>
                        <span className="font-medium">{selectedDevice.networkType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Power:</span>
                        <span className="font-medium">{selectedDevice.powerSource}</span>
                      </div>
                    </div>
                  </div>

                  {/* Technical Specifications */}
                  <div className="bg-blue-50 rounded-lg p-6 mt-6">
                    <h4 className="font-semibold text-blue-900 mb-4">Technical Specifications</h4>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-blue-700">Manufacturer:</span>
                        <span className="font-medium">{selectedDevice.manufacturer}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">Model:</span>
                        <span className="font-medium">{selectedDevice.model}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">Serial Number:</span>
                        <span className="font-medium">{selectedDevice.serialNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">Firmware:</span>
                        <span className="font-medium">{selectedDevice.firmware}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">Install Date:</span>
                        <span className="font-medium">{new Date(selectedDevice.installDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">Data Points:</span>
                        <span className="font-medium">{selectedDevice.dataPoints.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Current Readings & Performance */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Current Readings */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <Activity className="w-5 h-5 mr-2 text-emerald-600" />
                      Current Readings
                    </h4>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Object.entries(selectedDevice.readings).map(([key, value], index) => (
                        <div key={index} className="bg-emerald-50 rounded-lg p-4 text-center">
                          <p className="text-sm text-emerald-700 capitalize mb-1">
                            {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                          </p>
                          <p className="text-lg font-bold text-emerald-800">
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

                  {/* Maintenance Information */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <Settings className="w-5 h-5 mr-2 text-blue-600" />
                      Maintenance & Service
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-yellow-50 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <Calendar className="w-4 h-4 text-yellow-600 mr-2" />
                          <span className="text-sm font-medium text-yellow-800">Next Maintenance</span>
                        </div>
                        <p className="text-lg font-bold text-yellow-900">{selectedDevice.maintenanceDate}</p>
                      </div>
                      
                      <div className="bg-purple-50 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <Clock className="w-4 h-4 text-purple-600 mr-2" />
                          <span className="text-sm font-medium text-purple-800">Last Calibration</span>
                        </div>
                        <p className="text-lg font-bold text-purple-900">{new Date(selectedDevice.calibrationDate).toLocaleDateString()}</p>
                      </div>
                      
                      <div className="bg-green-50 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                          <span className="text-sm font-medium text-green-800">Uptime</span>
                        </div>
                        <p className="text-lg font-bold text-green-900">99.2%</p>
                      </div>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-indigo-600" />
                      Performance Metrics (Last 30 Days)
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-indigo-600">98.5%</p>
                        <p className="text-sm text-gray-600">Data Accuracy</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">99.1%</p>
                        <p className="text-sm text-gray-600">Uptime</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">2,847</p>
                        <p className="text-sm text-gray-600">Data Points</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-600">15 min</p>
                        <p className="text-sm text-gray-600">Avg Response</p>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Recent Activity</h4>
                    
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Data transmission successful</p>
                          <p className="text-xs text-gray-500">2 minutes ago</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Calibration completed</p>
                          <p className="text-xs text-gray-500">2 days ago</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Low battery warning cleared</p>
                          <p className="text-xs text-gray-500">1 week ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 mt-6 pt-6 border-t border-gray-200">
                <button 
                  onClick={() => setShowDetailsModal(false)}
                  className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
                <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                  <Edit className="w-4 h-4" />
                  <span>Edit Settings</span>
                </button>
                <button className="bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2">
                  <Settings className="w-4 h-4" />
                  <span>Configure</span>
                </button>
                <button className="bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition-colors flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Schedule Maintenance</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Alerts */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-yellow-600" />
            Recent Device Alerts
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-red-800">Critical: Device Offline</h4>
                <p className="text-sm text-red-700 mt-1">Pest Detector D1 has been offline for 2 hours. Check power supply and network connection.</p>
                <p className="text-xs text-red-600 mt-2">2 hours ago • Field D - East Section</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <Battery className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-yellow-800">Low Battery Warning</h4>
                <p className="text-sm text-yellow-700 mt-1">Camera Drone E1 battery at 15%. Return to charging station immediately.</p>
                <p className="text-xs text-yellow-600 mt-2">1 hour ago • Mobile Unit</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <Droplets className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-blue-800">Soil Moisture Alert</h4>
                <p className="text-sm text-blue-700 mt-1">Soil Sensor A1 detected moisture level at 85%. Consider reducing irrigation schedule.</p>
                <p className="text-xs text-blue-600 mt-2">4 hours ago • Field A - North Section</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-green-800">Maintenance Completed</h4>
                <p className="text-sm text-green-700 mt-1">Weather Station B1 routine maintenance and calibration completed successfully.</p>
                <p className="text-xs text-green-600 mt-2">1 day ago • Field B - Central</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Zambian IoT Support */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg shadow-sm text-white p-6">
        <h3 className="text-lg font-bold mb-3">🇿🇲 Zambian IoT Support & Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-semibold mb-1">Local Technicians</h4>
            <p className="text-sm opacity-90">Certified IoT technicians available in Lusaka, Ndola, and Kitwe for device installation and maintenance.</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-semibold mb-1">24/7 Support</h4>
            <p className="text-sm opacity-90">Remote monitoring and support available. Call +260 977 IoT-HELP for emergency assistance.</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-semibold mb-1">Training Programs</h4>
            <p className="text-sm opacity-90">Free training sessions for farmers on IoT device operation and data interpretation.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IoTDevices;