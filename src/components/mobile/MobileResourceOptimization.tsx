import React, { useState } from 'react';
import { 
  Droplets, 
  Zap, 
  Leaf, 
  TrendingDown, 
  Target,
  Calculator,
  BarChart3,
  Save,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  Truck,
  Users,
  Wrench,
  Thermometer,
  Wind,
  Sun,
  Recycle,
  X,
  Calendar,
  DollarSign,
  Clock,
  Phone,
  MapPin,
  Info,
  ChevronRight,
  Filter
} from 'lucide-react';

const MobileResourceOptimization: React.FC = () => {
  const [selectedResource, setSelectedResource] = useState('water');
  const [showImplementModal, setShowImplementModal] = useState(false);
  const [selectedImplementation, setSelectedImplementation] = useState<any>(null);

  const resources = {
    water: {
      name: 'Water Management',
      icon: Droplets,
      current: '2,450 L/day',
      target: '2,100 L/day',
      efficiency: 87,
      savings: '14%',
      cost: 'ZMW 125/month',
      color: 'blue',
      unit: 'Liters'
    },
    fertilizer: {
      name: 'Fertilizer Usage',
      icon: Leaf,
      current: '45 kg/ha',
      target: '38 kg/ha',
      efficiency: 82,
      savings: '16%',
      cost: 'ZMW 890/month',
      color: 'green',
      unit: 'Kilograms'
    },
    energy: {
      name: 'Energy Consumption',
      icon: Zap,
      current: '340 kWh/month',
      target: '285 kWh/month',
      efficiency: 91,
      savings: '16%',
      cost: 'ZMW 245/month',
      color: 'yellow',
      unit: 'kWh'
    },
    fuel: {
      name: 'Fuel Consumption',
      icon: Truck,
      current: '180 L/month',
      target: '150 L/month',
      efficiency: 83,
      savings: '17%',
      cost: 'ZMW 1,200/month',
      color: 'orange',
      unit: 'Liters'
    }
  };

  const optimizationTips = [
    // Water Management
    {
      resource: 'water',
      title: 'Smart Irrigation Scheduling',
      description: 'Use soil moisture sensors and weather data to optimize irrigation timing',
      potential: '20% water savings',
      difficulty: 'Easy',
      impact: 'High',
      cost: 'ZMW 2,500',
      timeframe: '2 weeks',
      contractor: 'IrriSmart Zambia'
    },
    {
      resource: 'water',
      title: 'Drip Irrigation System',
      description: 'Install drip irrigation for targeted water delivery directly to plant roots',
      potential: '30% water savings',
      difficulty: 'Medium',
      impact: 'High',
      cost: 'ZMW 15,000',
      timeframe: '4 weeks',
      contractor: 'AgroTech Solutions'
    },
    
    // Fertilizer Management
    {
      resource: 'fertilizer',
      title: 'Precision Fertilizer Application',
      description: 'Apply fertilizer based on soil test results and GPS mapping',
      potential: '25% fertilizer savings',
      difficulty: 'Medium',
      impact: 'High',
      cost: 'ZMW 5,500',
      timeframe: '2 weeks',
      contractor: 'PrecisionAg Zambia'
    },
    {
      resource: 'fertilizer',
      title: 'Organic Composting Program',
      description: 'Create compost from farm waste to reduce synthetic fertilizer dependency',
      potential: '15% cost savings',
      difficulty: 'Easy',
      impact: 'Medium',
      cost: 'ZMW 1,200',
      timeframe: '6 weeks',
      contractor: 'EcoFarm Zambia'
    },

    // Energy Management
    {
      resource: 'energy',
      title: 'Solar-Powered Irrigation',
      description: 'Install solar panels to power irrigation pumps and reduce electricity dependency',
      potential: '40% energy savings',
      difficulty: 'Hard',
      impact: 'High',
      cost: 'ZMW 25,000',
      timeframe: '6 weeks',
      contractor: 'SolarAg Zambia'
    },
    {
      resource: 'energy',
      title: 'LED Lighting Upgrade',
      description: 'Replace traditional lighting with energy-efficient LEDs',
      potential: '60% lighting costs',
      difficulty: 'Easy',
      impact: 'Medium',
      cost: 'ZMW 3,500',
      timeframe: '1 week',
      contractor: 'ElectroSave Zambia'
    },

    // Fuel Management
    {
      resource: 'fuel',
      title: 'GPS Fleet Tracking',
      description: 'Install GPS tracking to optimize routes and reduce fuel consumption',
      potential: '20% fuel savings',
      difficulty: 'Easy',
      impact: 'High',
      cost: 'ZMW 4,500',
      timeframe: '1 week',
      contractor: 'FleetTrack Zambia'
    },
    {
      resource: 'fuel',
      title: 'Equipment Maintenance Program',
      description: 'Implement regular maintenance schedule to improve fuel efficiency',
      potential: '15% fuel savings',
      difficulty: 'Easy',
      impact: 'Medium',
      cost: 'ZMW 2,800',
      timeframe: '2 weeks',
      contractor: 'MaintainPro Zambia'
    }
  ];

  const currentResource = resources[selectedResource as keyof typeof resources];
  const filteredTips = optimizationTips.filter(tip => tip.resource === selectedResource);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'bg-emerald-100 text-emerald-800';
      case 'Medium': return 'bg-blue-100 text-blue-800';
      case 'Low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleImplement = (tip: any) => {
    setSelectedImplementation(tip);
    setShowImplementModal(true);
  };

  return (
    <div className="p-4 space-y-4 pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Resource Optimization</h1>
          <p className="text-gray-600 text-sm">Maximize efficiency, minimize waste</p>
        </div>
        <button className="bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 transition-colors">
          <Calculator className="w-5 h-5" />
        </button>
      </div>

      {/* Zambian Resource Context */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-700 rounded-xl text-white p-4">
        <h3 className="font-bold mb-2">🇿🇲 Zambian Resource Optimization</h3>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-white bg-opacity-20 rounded-lg p-2">
            <p className="font-medium">Local Contractors</p>
            <p className="opacity-90">Certified contractors available</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-2">
            <p className="font-medium">Government Support</p>
            <p className="opacity-90">FISP subsidies available</p>
          </div>
        </div>
      </div>

      {/* Resource Selection */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
        <h3 className="font-medium text-gray-900 mb-3 text-sm">Select Resource Type</h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(resources).map(([key, resource]) => {
            const Icon = resource.icon;
            return (
              <button
                key={key}
                onClick={() => setSelectedResource(key)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center space-x-1 ${
                  selectedResource === key
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{resource.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Resource Overview */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">Current Usage</p>
              <p className="text-lg font-bold text-gray-900 mt-1">{currentResource.current}</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-full">
              <currentResource.icon className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">Target Usage</p>
              <p className="text-lg font-bold text-emerald-600 mt-1">{currentResource.target}</p>
            </div>
            <div className="p-2 bg-emerald-100 rounded-full">
              <Target className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">Efficiency</p>
              <p className="text-lg font-bold text-blue-600 mt-1">{currentResource.efficiency}%</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-full">
              <BarChart3 className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">Monthly Cost</p>
              <p className="text-lg font-bold text-gray-900 mt-1">{currentResource.cost}</p>
              <p className="text-xs text-emerald-600">-{currentResource.savings}</p>
            </div>
            <div className="p-2 bg-green-100 rounded-full">
              <TrendingDown className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Optimization Recommendations */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
        <h3 className="font-medium text-gray-900 mb-3 flex items-center">
          <Lightbulb className="w-4 h-4 mr-2 text-yellow-600" />
          Optimization Recommendations
        </h3>
        <div className="space-y-4">
          {filteredTips.map((tip, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-sm font-semibold text-gray-900">{tip.title}</h4>
                <div className="flex space-x-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(tip.difficulty)}`}>
                    {tip.difficulty}
                  </span>
                </div>
              </div>
              
              <p className="text-xs text-gray-700 mb-3">{tip.description}</p>
              
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="bg-emerald-50 rounded-lg p-2">
                  <div className="flex items-center space-x-1 mb-1">
                    <TrendingDown className="w-3 h-3 text-emerald-600" />
                    <span className="text-xs font-medium text-emerald-800">Savings</span>
                  </div>
                  <p className="text-sm font-bold text-emerald-600">{tip.potential}</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-2">
                  <div className="flex items-center space-x-1 mb-1">
                    <DollarSign className="w-3 h-3 text-blue-600" />
                    <span className="text-xs font-medium text-blue-800">Investment</span>
                  </div>
                  <p className="text-sm font-bold text-blue-600">{tip.cost}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>Timeframe: {tip.timeframe}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-3 h-3" />
                  <span>{tip.contractor}</span>
                </div>
              </div>
              
              <button 
                onClick={() => handleImplement(tip)}
                className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg text-xs hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-1"
              >
                <Save className="w-3 h-3" />
                <span>Implement</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Implementation Modal */}
      {showImplementModal && selectedImplementation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col">
          <div className="bg-white rounded-t-2xl mt-auto max-h-[90vh] overflow-y-auto w-full">
            <div className="sticky top-0 bg-white px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Schedule Implementation</h3>
              <button 
                onClick={() => setShowImplementModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              {/* Project Overview */}
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                <h4 className="font-medium text-emerald-800 mb-2 text-sm">{selectedImplementation.title}</h4>
                <p className="text-xs text-emerald-700 mb-3">{selectedImplementation.description}</p>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-emerald-700">Potential Savings:</span>
                    <span className="font-medium ml-1">{selectedImplementation.potential}</span>
                  </div>
                  <div>
                    <span className="text-emerald-700">Estimated Cost:</span>
                    <span className="font-medium ml-1">{selectedImplementation.cost}</span>
                  </div>
                  <div>
                    <span className="text-emerald-700">Timeframe:</span>
                    <span className="font-medium ml-1">{selectedImplementation.timeframe}</span>
                  </div>
                  <div>
                    <span className="text-emerald-700">Difficulty:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ml-1 ${getDifficultyColor(selectedImplementation.difficulty)}`}>
                      {selectedImplementation.difficulty}
                    </span>
                  </div>
                </div>
              </div>

              {/* Implementation Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <input 
                    type="date"
                    className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Budget (ZMW)</label>
                  <input 
                    type="number"
                    className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Enter budget amount"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Contractor</label>
                  <select className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                    <option value="">Select contractor</option>
                    <option value={selectedImplementation.contractor}>{selectedImplementation.contractor} (Recommended)</option>
                    <option value="AgroTech Solutions">AgroTech Solutions</option>
                    <option value="SolarAg Zambia">SolarAg Zambia</option>
                    <option value="PrecisionAg Zambia">PrecisionAg Zambia</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority Level</label>
                  <select className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                  <textarea 
                    className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    rows={3}
                    placeholder="Any specific requirements or notes..."
                  />
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button 
                  onClick={() => setShowImplementModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-xl hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setShowImplementModal(false)}
                  className="flex-1 bg-emerald-600 text-white py-3 px-4 rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedule</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Zambian Support */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl text-white p-4">
        <h3 className="font-bold mb-2">🇿🇲 Zambian Support Services</h3>
        <div className="space-y-2">
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-medium text-sm mb-1">Local Technicians</h4>
            <p className="text-xs opacity-90">Certified technicians available in Lusaka, Ndola, and Kitwe for installation and maintenance.</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-medium text-sm mb-1">24/7 Support</h4>
            <p className="text-xs opacity-90">Call +260 977 IoT-HELP for emergency assistance.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileResourceOptimization;