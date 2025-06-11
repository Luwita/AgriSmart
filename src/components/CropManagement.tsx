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
  Building
} from 'lucide-react';
import { zambianCrops, zambianProvinces, zambianAgriculturalZones, zambianFertilizers, zambianPests } from '../data/zambianData';

const CropManagement: React.FC = () => {
  const [selectedField, setSelectedField] = useState('all');
  const [showAddCropModal, setShowAddCropModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState<any>(null);
  const [newCrop, setNewCrop] = useState({
    name: '',
    localName: '',
    variety: '',
    field: '',
    area: '',
    plantingDate: '',
    province: '',
    zone: '',
    soilType: '',
    irrigationType: ''
  });

  const crops = zambianCrops;
  const fields = ['all', 'Chongwe Farm Block A', 'Mkushi Farm Block B', 'Eastern Province Block C', 'Central Province Block D', 'Southern Province Block E'];

  const zambianFarmLocations = [
    {
      name: 'Chongwe Commercial Farm',
      province: 'Lusaka Province',
      zone: 'Zone IIa',
      area: '500 hectares',
      soilType: 'Sandy loam',
      waterSource: 'Chongwe River',
      mainCrops: ['Maize', 'Soybeans', 'Wheat'],
      coordinates: '-15.3333, 28.6833',
      established: '1995',
      certification: 'Organic certified'
    },
    {
      name: 'Mkushi Block Farm',
      province: 'Central Province',
      zone: 'Zone IIb',
      area: '1,200 hectares',
      soilType: 'Red clay loam',
      waterSource: 'Mkushi River + Boreholes',
      mainCrops: ['Maize', 'Soybeans', 'Cotton'],
      coordinates: '-13.6167, 29.3833',
      established: '1987',
      certification: 'COMESA certified'
    },
    {
      name: 'Eastern Province Smallholder',
      province: 'Eastern Province',
      zone: 'Zone IIb',
      area: '25 hectares',
      soilType: 'Alluvial soil',
      waterSource: 'Seasonal streams',
      mainCrops: ['Maize', 'Groundnuts', 'Sunflower'],
      coordinates: '-13.5333, 32.3833',
      established: '2010',
      certification: 'FRA registered'
    },
    {
      name: 'Central Province Cooperative',
      province: 'Central Province',
      zone: 'Zone IIa',
      area: '800 hectares',
      soilType: 'Sandy clay',
      waterSource: 'Kafue River irrigation',
      mainCrops: ['Maize', 'Cotton', 'Vegetables'],
      coordinates: '-14.5000, 28.2833',
      established: '2005',
      certification: 'Cooperative registered'
    },
    {
      name: 'Southern Province Ranch',
      province: 'Southern Province',
      zone: 'Zone I',
      area: '2,000 hectares',
      soilType: 'Sandy soil',
      waterSource: 'Boreholes + Dam',
      mainCrops: ['Maize', 'Sorghum', 'Cattle'],
      coordinates: '-16.8000, 27.8500',
      established: '1978',
      certification: 'Export certified'
    }
  ];

  const cropVarieties = {
    'Maize': ['SC627', 'SC719', 'PAN 67', 'ZM 623', 'MM 604'],
    'Soybeans': ['Soprano', 'Hernon 147', 'Solitaire', 'Tikolore'],
    'Groundnuts': ['Chalimbana', 'Nyanda', 'Msandile', 'Baka'],
    'Sunflower': ['Pannar 7351', 'Pannar 7049', 'Hysun 33'],
    'Cotton': ['Chureza', 'Albar 85', 'Deltapine 90']
  };

  const filteredCrops = selectedField === 'all' 
    ? crops 
    : crops.filter(crop => crop.field === selectedField);

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

  const handleAddCrop = () => {
    // Here you would typically save to database
    console.log('Adding new crop:', newCrop);
    setShowAddCropModal(false);
    setNewCrop({
      name: '',
      localName: '',
      variety: '',
      field: '',
      area: '',
      plantingDate: '',
      province: '',
      zone: '',
      soilType: '',
      irrigationType: ''
    });
  };

  const handleViewDetails = (crop: any) => {
    setSelectedCrop(crop);
    setShowDetailsModal(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Crop Management</h1>
          <p className="text-gray-600 mt-1">Monitor and manage your crops across Zambian farming regions</p>
        </div>
        <button 
          onClick={() => setShowAddCropModal(true)}
          className="mt-4 sm:mt-0 bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-emerald-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Crop</span>
        </button>
      </div>

      {/* Zambian Agricultural Context */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-lg shadow-sm text-white p-6">
        <h3 className="text-lg font-bold mb-3">🇿🇲 Zambian Agricultural Season Update</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-semibold mb-1">Current Season</h4>
            <p className="text-sm opacity-90">Rainy Season (November - April)</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-semibold mb-1">Planting Window</h4>
            <p className="text-sm opacity-90">Peak planting: November - December</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-semibold mb-1">FRA Price</h4>
            <p className="text-sm opacity-90">Maize: ZMW 4,000/ton guaranteed</p>
          </div>
        </div>
      </div>

      {/* Farm Locations Overview */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-emerald-600" />
            Zambian Farm Locations
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {zambianFarmLocations.map((location, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">{location.name}</h4>
                    <p className="text-sm text-blue-600">{location.province}</p>
                  </div>
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full">
                    {location.zone}
                  </span>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Building className="w-4 h-4 mr-2" />
                    <span>{location.area}</span>
                  </div>
                  <div className="flex items-center">
                    <Droplets className="w-4 h-4 mr-2" />
                    <span>{location.waterSource}</span>
                  </div>
                  <div className="flex items-center">
                    <Leaf className="w-4 h-4 mr-2" />
                    <span>{location.soilType}</span>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-500">Main crops: {location.mainCrops.join(', ')}</p>
                  <p className="text-xs text-emerald-600 mt-1">{location.certification}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-gray-700 py-2">Filter by farm location:</span>
          {fields.map((field) => (
            <button
              key={field}
              onClick={() => setSelectedField(field)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedField === field
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {field === 'all' ? 'All Locations' : field}
            </button>
          ))}
        </div>
      </div>

      {/* Crop Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCrops.map((crop) => (
          <div key={crop.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            {/* Crop Image */}
            <div className="relative h-48">
              <img 
                src={crop.image} 
                alt={crop.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(crop.status)}`}>
                  {crop.status.toUpperCase()}
                </span>
              </div>
              <div className="absolute bottom-4 left-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStageColor(crop.growthStage)}`}>
                  {crop.growthStage}
                </span>
              </div>
            </div>

            {/* Crop Info */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{crop.name}</h3>
                  <p className="text-sm text-emerald-600 font-medium">{crop.localName}</p>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    {crop.field} • {crop.area}
                  </div>
                  <div className="flex items-center text-xs text-blue-600 mt-1">
                    <Info className="w-3 h-3 mr-1" />
                    Variety: {crop.variety}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-emerald-600">{crop.health}%</div>
                  <div className="text-xs text-gray-500">Health</div>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    Yield Prediction
                  </div>
                  <div className="font-semibold text-gray-900">{crop.yieldPrediction}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <Calendar className="w-4 h-4 mr-1" />
                    Days to Harvest
                  </div>
                  <div className="font-semibold text-gray-900">{crop.daysToHarvest} days</div>
                </div>
              </div>

              {/* Timeline */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
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
              <div className="text-sm text-gray-600 mb-4">
                <strong>Last activity:</strong> {crop.lastActivity}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleViewDetails(crop)}
                  className="flex-1 bg-emerald-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-1"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Details</span>
                </button>
                <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                  <Droplets className="w-4 h-4" />
                </button>
                <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                  <Bug className="w-4 h-4" />
                </button>
                <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                  <Scissors className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Crop Modal */}
      {showAddCropModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Add New Crop - Zambian Farm</h3>
              <button 
                onClick={() => setShowAddCropModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Crop Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Crop Type</label>
                  <select 
                    value={newCrop.name}
                    onChange={(e) => setNewCrop({...newCrop, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="">Select crop type</option>
                    <option value="Maize">Maize (Chimanga)</option>
                    <option value="Soybeans">Soybeans (Soya)</option>
                    <option value="Groundnuts">Groundnuts (Mtedza)</option>
                    <option value="Sunflower">Sunflower (Mpendadzuwa)</option>
                    <option value="Cotton">Cotton (Thonje)</option>
                  </select>
                </div>

                {/* Variety */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Variety</label>
                  <select 
                    value={newCrop.variety}
                    onChange={(e) => setNewCrop({...newCrop, variety: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    disabled={!newCrop.name}
                  >
                    <option value="">Select variety</option>
                    {newCrop.name && cropVarieties[newCrop.name as keyof typeof cropVarieties]?.map((variety) => (
                      <option key={variety} value={variety}>{variety}</option>
                    ))}
                  </select>
                </div>

                {/* Province */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Province</label>
                  <select 
                    value={newCrop.province}
                    onChange={(e) => setNewCrop({...newCrop, province: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="">Select province</option>
                    {zambianProvinces.map((province) => (
                      <option key={province} value={province}>{province}</option>
                    ))}
                  </select>
                </div>

                {/* Agricultural Zone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Agricultural Zone</label>
                  <select 
                    value={newCrop.zone}
                    onChange={(e) => setNewCrop({...newCrop, zone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="">Select zone</option>
                    {Object.keys(zambianAgriculturalZones).map((zone) => (
                      <option key={zone} value={zone}>{zone}</option>
                    ))}
                  </select>
                </div>

                {/* Field/Block */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Field/Block Name</label>
                  <input 
                    type="text"
                    value={newCrop.field}
                    onChange={(e) => setNewCrop({...newCrop, field: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="e.g., Chongwe Farm Block A"
                  />
                </div>

                {/* Area */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Area (hectares)</label>
                  <input 
                    type="number"
                    value={newCrop.area}
                    onChange={(e) => setNewCrop({...newCrop, area: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Enter area in hectares"
                  />
                </div>

                {/* Planting Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Planting Date</label>
                  <input 
                    type="date"
                    value={newCrop.plantingDate}
                    onChange={(e) => setNewCrop({...newCrop, plantingDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                {/* Soil Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Soil Type</label>
                  <select 
                    value={newCrop.soilType}
                    onChange={(e) => setNewCrop({...newCrop, soilType: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="">Select soil type</option>
                    <option value="Sandy loam">Sandy loam</option>
                    <option value="Clay loam">Clay loam</option>
                    <option value="Red clay">Red clay</option>
                    <option value="Alluvial">Alluvial</option>
                    <option value="Sandy">Sandy</option>
                  </select>
                </div>
              </div>

              {/* Zone Information */}
              {newCrop.zone && zambianAgriculturalZones[newCrop.zone as keyof typeof zambianAgriculturalZones] && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Zone {newCrop.zone} Information</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p><strong>Rainfall:</strong> {zambianAgriculturalZones[newCrop.zone as keyof typeof zambianAgriculturalZones].rainfall}</p>
                    <p><strong>Suitable Crops:</strong> {zambianAgriculturalZones[newCrop.zone as keyof typeof zambianAgriculturalZones].suitableCrops.join(', ')}</p>
                    <p><strong>Characteristics:</strong> {zambianAgriculturalZones[newCrop.zone as keyof typeof zambianAgriculturalZones].characteristics}</p>
                  </div>
                </div>
              )}

              <div className="flex space-x-3 mt-6">
                <button 
                  onClick={() => setShowAddCropModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddCrop}
                  className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Add Crop
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {showDetailsModal && selectedCrop && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedCrop.name} ({selectedCrop.localName}) - Detailed View
              </h3>
              <button 
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Crop Image and Basic Info */}
                <div>
                  <img 
                    src={selectedCrop.image} 
                    alt={selectedCrop.name}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                  <div className="bg-gray-50 rounded-lg p-4">
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
                </div>

                {/* Detailed Metrics */}
                <div className="space-y-6">
                  {/* Growth Timeline */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                      <Calendar className="w-5 h-5 mr-2" />
                      Growth Timeline
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-blue-700">Planted:</span>
                        <span className="text-sm font-medium">{new Date(selectedCrop.plantingDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-blue-700">Expected Harvest:</span>
                        <span className="text-sm font-medium">{new Date(selectedCrop.expectedHarvest).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-blue-700">Days to Harvest:</span>
                        <span className="text-sm font-medium text-orange-600">{selectedCrop.daysToHarvest} days</span>
                      </div>
                      <div className="w-full bg-blue-200 rounded-full h-3 mt-3">
                        <div
                          className="bg-blue-600 h-3 rounded-full"
                          style={{
                            width: `${Math.max(10, 100 - (selectedCrop.daysToHarvest / 120 * 100))}%`
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Yield Prediction */}
                  <div className="bg-emerald-50 rounded-lg p-4">
                    <h4 className="font-semibold text-emerald-900 mb-3 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
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
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Recent Activities</h4>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{selectedCrop.lastActivity}</p>
                          <p className="text-xs text-gray-500">2 days ago</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Soil moisture monitoring</p>
                          <p className="text-xs text-gray-500">5 days ago</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Fall armyworm inspection due</p>
                          <p className="text-xs text-gray-500">Scheduled for tomorrow</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommended Actions */}
              <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-3">🌾 Recommended Actions</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-3">
                    <h5 className="font-medium text-gray-900 mb-1">Pest Management</h5>
                    <p className="text-sm text-gray-600">Monitor for fall armyworm. Apply Emamectin benzoate if threshold exceeded.</p>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <h5 className="font-medium text-gray-900 mb-1">Fertilizer Application</h5>
                    <p className="text-sm text-gray-600">Apply top dressing with Urea (46-0-0) at 200kg/ha during vegetative stage.</p>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <h5 className="font-medium text-gray-900 mb-1">Water Management</h5>
                    <p className="text-sm text-gray-600">Maintain soil moisture at 60-70% field capacity during tasseling stage.</p>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <h5 className="font-medium text-gray-900 mb-1">Market Preparation</h5>
                    <p className="text-sm text-gray-600">Prepare storage facilities. Register with FRA for guaranteed purchase.</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button 
                  onClick={() => setShowDetailsModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
                <button className="bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>Contact Extension Officer</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Crop Insights - Zambian Context */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-sm">
        <div className="px-6 py-8 text-white">
          <h3 className="text-xl font-bold mb-4">🌱 AI Crop Insights for Zambian Farmers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Fall Armyworm Alert</h4>
              <p className="text-sm opacity-90">High risk detected in Central Province. Apply Emamectin benzoate to maize crops within 48 hours.</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <h4 className="font-semibold mb-2">FRA Marketing</h4>
              <p className="text-sm opacity-90">Food Reserve Agency accepting maize at ZMW 4,000/ton. Ensure moisture content below 12.5%.</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Rainfall Forecast</h4>
              <p className="text-sm opacity-90">Above-normal rains expected. Consider drainage in low-lying fields to prevent waterlogging.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropManagement;