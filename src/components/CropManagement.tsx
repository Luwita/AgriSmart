import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye, Calendar, Droplets, Thermometer, Sun, AlertTriangle } from 'lucide-react';

interface Crop {
  id: string;
  name: string;
  variety: string;
  plantingDate: string;
  expectedHarvest: string;
  area: number;
  status: 'planted' | 'growing' | 'flowering' | 'ready' | 'harvested';
  health: 'excellent' | 'good' | 'fair' | 'poor';
  soilMoisture: number;
  temperature: number;
  sunlight: number;
  notes: string;
}

const CropManagement: React.FC = () => {
  const [crops, setCrops] = useState<Crop[]>([
    {
      id: '1',
      name: 'Maize',
      variety: 'SC627',
      plantingDate: '2024-01-15',
      expectedHarvest: '2024-05-15',
      area: 2.5,
      status: 'growing',
      health: 'good',
      soilMoisture: 65,
      temperature: 28,
      sunlight: 85,
      notes: 'Regular watering schedule maintained'
    },
    {
      id: '2',
      name: 'Tomatoes',
      variety: 'Roma',
      plantingDate: '2024-02-01',
      expectedHarvest: '2024-04-30',
      area: 1.0,
      status: 'flowering',
      health: 'excellent',
      soilMoisture: 70,
      temperature: 25,
      sunlight: 90,
      notes: 'Pest control applied last week'
    },
    {
      id: '3',
      name: 'Beans',
      variety: 'Navy Beans',
      plantingDate: '2024-01-20',
      expectedHarvest: '2024-04-20',
      area: 1.5,
      status: 'ready',
      health: 'good',
      soilMoisture: 60,
      temperature: 26,
      sunlight: 80,
      notes: 'Ready for harvest next week'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const [newCrop, setNewCrop] = useState<Partial<Crop>>({
    name: '',
    variety: '',
    plantingDate: '',
    expectedHarvest: '',
    area: 0,
    status: 'planted',
    health: 'good',
    notes: ''
  });

  const filteredCrops = crops.filter(crop => {
    const matchesSearch = crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         crop.variety.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || crop.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleAddCrop = () => {
    if (newCrop.name && newCrop.variety && newCrop.plantingDate) {
      const crop: Crop = {
        id: Date.now().toString(),
        name: newCrop.name!,
        variety: newCrop.variety!,
        plantingDate: newCrop.plantingDate!,
        expectedHarvest: newCrop.expectedHarvest!,
        area: newCrop.area || 0,
        status: newCrop.status as Crop['status'] || 'planted',
        health: newCrop.health as Crop['health'] || 'good',
        soilMoisture: Math.floor(Math.random() * 40) + 40,
        temperature: Math.floor(Math.random() * 10) + 20,
        sunlight: Math.floor(Math.random() * 30) + 60,
        notes: newCrop.notes || ''
      };
      setCrops([...crops, crop]);
      setNewCrop({
        name: '',
        variety: '',
        plantingDate: '',
        expectedHarvest: '',
        area: 0,
        status: 'planted',
        health: 'good',
        notes: ''
      });
      setShowAddModal(false);
    }
  };

  const handleDeleteCrop = (id: string) => {
    setCrops(crops.filter(crop => crop.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planted': return 'bg-blue-100 text-blue-800';
      case 'growing': return 'bg-green-100 text-green-800';
      case 'flowering': return 'bg-yellow-100 text-yellow-800';
      case 'ready': return 'bg-orange-100 text-orange-800';
      case 'harvested': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'fair': return 'text-yellow-600';
      case 'poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Crop Management</h1>
          <p className="text-gray-600 mt-1">Monitor and manage your crops</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Crop
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search crops..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
          >
            <option value="all">All Status</option>
            <option value="planted">Planted</option>
            <option value="growing">Growing</option>
            <option value="flowering">Flowering</option>
            <option value="ready">Ready</option>
            <option value="harvested">Harvested</option>
          </select>
        </div>
      </div>

      {/* Crops Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCrops.map((crop) => (
          <div key={crop.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{crop.name}</h3>
                <p className="text-gray-600">{crop.variety}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectedCrop(crop);
                    setShowDetailsModal(true);
                  }}
                  className="text-blue-600 hover:text-blue-800 p-1"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteCrop(crop.id)}
                  className="text-red-600 hover:text-red-800 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Status:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(crop.status)}`}>
                  {crop.status.charAt(0).toUpperCase() + crop.status.slice(1)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Health:</span>
                <span className={`text-sm font-medium ${getHealthColor(crop.health)}`}>
                  {crop.health.charAt(0).toUpperCase() + crop.health.slice(1)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Area:</span>
                <span className="text-sm font-medium">{crop.area} hectares</span>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-4">
                <div className="text-center">
                  <Droplets className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                  <div className="text-xs text-gray-600">Moisture</div>
                  <div className="text-sm font-medium">{crop.soilMoisture}%</div>
                </div>
                <div className="text-center">
                  <Thermometer className="w-5 h-5 text-red-500 mx-auto mb-1" />
                  <div className="text-xs text-gray-600">Temp</div>
                  <div className="text-sm font-medium">{crop.temperature}°C</div>
                </div>
                <div className="text-center">
                  <Sun className="w-5 h-5 text-yellow-500 mx-auto mb-1" />
                  <div className="text-xs text-gray-600">Light</div>
                  <div className="text-sm font-medium">{crop.sunlight}%</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Crop Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add New Crop</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Crop Name</label>
                <input
                  type="text"
                  value={newCrop.name || ''}
                  onChange={(e) => setNewCrop({ ...newCrop, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., Maize, Tomatoes"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Variety</label>
                <input
                  type="text"
                  value={newCrop.variety || ''}
                  onChange={(e) => setNewCrop({ ...newCrop, variety: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., SC627, Roma"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Planting Date</label>
                <input
                  type="date"
                  value={newCrop.plantingDate || ''}
                  onChange={(e) => setNewCrop({ ...newCrop, plantingDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expected Harvest</label>
                <input
                  type="date"
                  value={newCrop.expectedHarvest || ''}
                  onChange={(e) => setNewCrop({ ...newCrop, expectedHarvest: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Area (hectares)</label>
                <input
                  type="number"
                  step="0.1"
                  value={newCrop.area || ''}
                  onChange={(e) => setNewCrop({ ...newCrop, area: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="0.0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  value={newCrop.notes || ''}
                  onChange={(e) => setNewCrop({ ...newCrop, notes: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={3}
                  placeholder="Additional notes..."
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCrop}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Add Crop
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Crop Details Modal */}
      {showDetailsModal && selectedCrop && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">{selectedCrop.name}</h2>
                <p className="text-gray-600">{selectedCrop.variety}</p>
              </div>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedCrop.status)}`}>
                    {selectedCrop.status.charAt(0).toUpperCase() + selectedCrop.status.slice(1)}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Health</label>
                  <span className={`text-sm font-medium ${getHealthColor(selectedCrop.health)}`}>
                    {selectedCrop.health.charAt(0).toUpperCase() + selectedCrop.health.slice(1)}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Area</label>
                  <p className="text-sm">{selectedCrop.area} hectares</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Planting Date</label>
                  <p className="text-sm">{new Date(selectedCrop.plantingDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Expected Harvest</label>
                  <p className="text-sm">{new Date(selectedCrop.expectedHarvest).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Environmental Conditions</label>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Droplets className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">Soil Moisture</span>
                      </div>
                      <span className="text-sm font-medium">{selectedCrop.soilMoisture}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Thermometer className="w-4 h-4 text-red-500" />
                        <span className="text-sm">Temperature</span>
                      </div>
                      <span className="text-sm font-medium">{selectedCrop.temperature}°C</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sun className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm">Sunlight</span>
                      </div>
                      <span className="text-sm font-medium">{selectedCrop.sunlight}%</span>
                    </div>
                  </div>
                </div>

                {selectedCrop.notes && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{selectedCrop.notes}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CropManagement;