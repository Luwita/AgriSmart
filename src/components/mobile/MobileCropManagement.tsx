import React, { useState } from 'react';
import { 
  Sprout, 
  Calendar, 
  MapPin, 
  TrendingUp, 
  Droplets,
  Sun,
  Bug,
  Scissors,
  Plus,
  Eye,
  Info,
  X,
  CheckCircle,
  AlertTriangle,
  Thermometer,
  Leaf,
  DollarSign,
  Phone,
  Building,
  ChevronRight,
  Filter,
  Search
} from 'lucide-react';
import { zambianCrops, zambianProvinces } from '../../data/zambianData';

const MobileCropManagement: React.FC = () => {
  const [selectedField, setSelectedField] = useState('all');
  const [showAddCropModal, setShowAddCropModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState<any>(null);
  const [showFilters, setShowFilters] = useState(false);

  const crops = zambianCrops;
  const fields = ['all', 'Block A', 'Block B', 'Block C', 'Block D'];

  const filteredCrops = selectedField === 'all' 
    ? crops 
    : crops.filter(crop => crop.field.includes(selectedField));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-emerald-600 bg-emerald-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'fair': return 'text-yellow-600 bg-yellow-100';
      case 'poor': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStageColor = (stage: string) => {
    const stages = {
      'Germination': 'bg-yellow-100 text-yellow-800',
      'Vegetative': 'bg-green-100 text-green-800',
      'Tasseling': 'bg-blue-100 text-blue-800',
      'Pod Development': 'bg-purple-100 text-purple-800',
      'Pegging': 'bg-orange-100 text-orange-800',
      'Flowering': 'bg-pink-100 text-pink-800',
      'Maturity': 'bg-gray-100 text-gray-800'
    };
    return stages[stage as keyof typeof stages] || 'bg-gray-100 text-gray-800';
  };

  const handleViewDetails = (crop: any) => {
    setSelectedCrop(crop);
    setShowDetailsModal(true);
  };

  return (
    <div className="p-4 space-y-4 pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Crop Management</h1>
          <p className="text-gray-600 text-sm">Monitor your crops across fields</p>
        </div>
        <button 
          onClick={() => setShowAddCropModal(true)}
          className="bg-emerald-600 text-white p-2 rounded-xl hover:bg-emerald-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Zambian Context Banner */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-xl text-white p-4">
        <h3 className="font-bold mb-2">🇿🇲 Zambian Season Update</h3>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-white bg-opacity-20 rounded-lg p-2">
            <p className="font-medium">Current Season</p>
            <p className="opacity-90">Rainy Season</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-2">
            <p className="font-medium">FRA Price</p>
            <p className="opacity-90">ZMW 4,000/ton</p>
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
            placeholder="Search crops..."
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
      </div>

      {showFilters && (
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-gray-700">Field:</span>
            {fields.map((field) => (
              <button
                key={field}
                onClick={() => setSelectedField(field)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  selectedField === field
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {field === 'all' ? 'All Fields' : field}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Crop Cards */}
      <div className="space-y-4">
        {filteredCrops.map((crop) => (
          <div key={crop.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Crop Image */}
            <div className="relative h-32">
              <img 
                src={crop.image} 
                alt={crop.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(crop.status)}`}>
                  {crop.status.toUpperCase()}
                </span>
              </div>
              <div className="absolute bottom-3 left-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStageColor(crop.growthStage)}`}>
                  {crop.growthStage}
                </span>
              </div>
            </div>

            {/* Crop Info */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{crop.name}</h3>
                  <p className="text-sm text-emerald-600 font-medium">{crop.localName}</p>
                  <div className="flex items-center text-xs text-gray-600 mt-1">
                    <MapPin className="w-3 h-3 mr-1" />
                    {crop.field} • {crop.area}
                  </div>
                  <div className="flex items-center text-xs text-blue-600 mt-1">
                    <Info className="w-3 h-3 mr-1" />
                    Variety: {crop.variety}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-emerald-600">{crop.health}%</div>
                  <div className="text-xs text-gray-500">Health</div>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="bg-gray-50 rounded-lg p-2">
                  <div className="flex items-center text-xs text-gray-600 mb-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Yield Prediction
                  </div>
                  <div className="font-semibold text-gray-900 text-sm">{crop.yieldPrediction}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-2">
                  <div className="flex items-center text-xs text-gray-600 mb-1">
                    <Calendar className="w-3 h-3 mr-1" />
                    Days to Harvest
                  </div>
                  <div className="font-semibold text-gray-900 text-sm">{crop.daysToHarvest} days</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                  <span>Planted: {new Date(crop.plantingDate).toLocaleDateString()}</span>
                  <span>Harvest: {new Date(crop.expectedHarvest).toLocaleDateString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-emerald-500 h-2 rounded-full"
                    style={{
                      width: `${Math.max(10, 100 - (crop.daysToHarvest / 120 * 100))}%`
                    }}
                  ></div>
                </div>
              </div>

              {/* Last Activity */}
              <div className="text-xs text-gray-600 mb-3">
                <strong>Last activity:</strong> {crop.lastActivity}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleViewDetails(crop)}
                  className="flex-1 bg-emerald-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-1"
                >
                  <Eye className="w-4 h-4" />
                  <span>Details</span>
                </button>
                <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                  <Droplets className="w-4 h-4" />
                </button>
                <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                  <Bug className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View Details Modal */}
      {showDetailsModal && selectedCrop && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white rounded-t-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedCrop.name} Details
              </h3>
              <button 
                onClick={() => setShowDetailsModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              {/* Crop Image */}
              <img 
                src={selectedCrop.image} 
                alt={selectedCrop.name}
                className="w-full h-48 object-cover rounded-xl"
              />

              {/* Basic Info */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Basic Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Variety:</span>
                    <span className="font-medium">{selectedCrop.variety}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium">{selectedCrop.field}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Area:</span>
                    <span className="font-medium">{selectedCrop.area}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Growth Stage:</span>
                    <span className="font-medium">{selectedCrop.growthStage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Health Score:</span>
                    <span className="font-medium text-emerald-600">{selectedCrop.health}%</span>
                  </div>
                </div>
              </div>

              {/* Growth Timeline */}
              <div className="bg-blue-50 rounded-xl p-4">
                <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Growth Timeline
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-700">Planted:</span>
                    <span className="font-medium">{new Date(selectedCrop.plantingDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Expected Harvest:</span>
                    <span className="font-medium">{new Date(selectedCrop.expectedHarvest).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Days to Harvest:</span>
                    <span className="font-medium text-orange-600">{selectedCrop.daysToHarvest} days</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2 mt-3">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${Math.max(10, 100 - (selectedCrop.daysToHarvest / 120 * 100))}%`
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Yield & Economics */}
              <div className="bg-emerald-50 rounded-xl p-4">
                <h4 className="font-semibold text-emerald-900 mb-3 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Yield & Economics
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-emerald-700">Predicted Yield:</span>
                    <span className="font-medium">{selectedCrop.yieldPrediction}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-700">Total Expected:</span>
                    <span className="font-medium">
                      {(parseFloat(selectedCrop.yieldPrediction) * parseFloat(selectedCrop.area)).toFixed(1)} tons
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-700">FRA Value:</span>
                    <span className="font-medium text-green-600">
                      ZMW {((parseFloat(selectedCrop.yieldPrediction) * parseFloat(selectedCrop.area)) * 4000).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Recent Activities */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Recent Activities</h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{selectedCrop.lastActivity}</p>
                      <p className="text-xs text-gray-500">2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Soil moisture monitoring</p>
                      <p className="text-xs text-gray-500">5 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Fall armyworm inspection due</p>
                      <p className="text-xs text-gray-500">Scheduled for tomorrow</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommended Actions */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <h4 className="font-semibold text-yellow-800 mb-3">🌾 Recommended Actions</h4>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-3">
                    <h5 className="font-medium text-gray-900 mb-1 text-sm">Pest Management</h5>
                    <p className="text-xs text-gray-600">Monitor for fall armyworm. Apply Emamectin benzoate if threshold exceeded.</p>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <h5 className="font-medium text-gray-900 mb-1 text-sm">Fertilizer Application</h5>
                    <p className="text-xs text-gray-600">Apply top dressing with Urea (46-0-0) at 200kg/ha during vegetative stage.</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4">
                <button className="flex-1 bg-emerald-600 text-white py-3 px-4 rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>Contact Expert</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Crop Modal */}
      {showAddCropModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white rounded-t-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Add New Crop</h3>
              <button 
                onClick={() => setShowAddCropModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Crop Type</label>
                <select className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                  <option value="">Select crop type</option>
                  <option value="Maize">Maize (Chimanga)</option>
                  <option value="Soybeans">Soybeans (Soya)</option>
                  <option value="Groundnuts">Groundnuts (Mtedza)</option>
                  <option value="Sunflower">Sunflower (Mpendadzuwa)</option>
                  <option value="Cotton">Cotton (Thonje)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Field/Block</label>
                <select className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                  <option value="">Select field</option>
                  <option value="Block A">Block A</option>
                  <option value="Block B">Block B</option>
                  <option value="Block C">Block C</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Area (hectares)</label>
                  <input 
                    type="number"
                    className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Planting Date</label>
                  <input 
                    type="date"
                    className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button 
                  onClick={() => setShowAddCropModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-xl hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setShowAddCropModal(false)}
                  className="flex-1 bg-emerald-600 text-white py-3 px-4 rounded-xl hover:bg-emerald-700 transition-colors"
                >
                  Add Crop
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white p-4">
        <h3 className="font-bold mb-2">🤖 AI Crop Insights</h3>
        <div className="space-y-2">
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-medium text-sm mb-1">Fall Armyworm Alert</h4>
            <p className="text-xs opacity-90">High risk detected in Central Province. Apply Emamectin benzoate to maize crops within 48 hours.</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-medium text-sm mb-1">FRA Marketing</h4>
            <p className="text-xs opacity-90">Food Reserve Agency accepting maize at ZMW 4,000/ton. Ensure moisture content below 12.5%.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileCropManagement;