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
  Info
} from 'lucide-react';

const ResourceOptimization: React.FC = () => {
  const [selectedResource, setSelectedResource] = useState('water');
  const [calculatorMode, setCalculatorMode] = useState(false);
  const [showImplementModal, setShowImplementModal] = useState(false);
  const [selectedImplementation, setSelectedImplementation] = useState<any>(null);
  const [implementationForm, setImplementationForm] = useState({
    startDate: '',
    budget: '',
    contractor: '',
    notes: '',
    priority: 'medium'
  });

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
    },
    labor: {
      name: 'Labor Efficiency',
      icon: Users,
      current: '25 hours/ha',
      target: '20 hours/ha',
      efficiency: 80,
      savings: '20%',
      cost: 'ZMW 2,500/month',
      color: 'purple',
      unit: 'Hours'
    },
    equipment: {
      name: 'Equipment Usage',
      icon: Wrench,
      current: '85% utilization',
      target: '95% utilization',
      efficiency: 89,
      savings: '12%',
      cost: 'ZMW 450/month',
      color: 'indigo',
      unit: 'Percentage'
    },
    seeds: {
      name: 'Seed Efficiency',
      icon: Sun,
      current: '25 kg/ha',
      target: '22 kg/ha',
      efficiency: 88,
      savings: '12%',
      cost: 'ZMW 320/season',
      color: 'amber',
      unit: 'Kilograms'
    },
    waste: {
      name: 'Waste Management',
      icon: Recycle,
      current: '15% recycled',
      target: '40% recycled',
      efficiency: 38,
      savings: '25%',
      cost: 'ZMW 180/month',
      color: 'emerald',
      unit: 'Percentage'
    }
  };

  const optimizationTips = [
    // Water Management
    {
      resource: 'water',
      title: 'Smart Irrigation Scheduling',
      description: 'Use soil moisture sensors and weather data to optimize irrigation timing and reduce water waste',
      potential: '20% water savings',
      difficulty: 'Easy',
      impact: 'High',
      cost: 'ZMW 2,500',
      timeframe: '2 weeks',
      contractor: 'IrriSmart Zambia',
      steps: ['Install soil moisture sensors', 'Set up automated scheduling', 'Train operators', 'Monitor and adjust'],
      requirements: 'Existing irrigation system, WiFi connectivity'
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
      contractor: 'AgroTech Solutions',
      steps: ['Site survey and design', 'Install main lines', 'Install drip lines', 'System testing'],
      requirements: 'Water source, pressure pump, field preparation'
    },
    {
      resource: 'water',
      title: 'Rainwater Harvesting',
      description: 'Collect and store rainwater for irrigation during dry periods',
      potential: '25% cost reduction',
      difficulty: 'Medium',
      impact: 'High',
      cost: 'ZMW 8,500',
      timeframe: '3 weeks',
      contractor: 'Water Solutions Zambia',
      steps: ['Install collection system', 'Set up storage tanks', 'Connect distribution', 'Maintenance training'],
      requirements: 'Roof area, storage space, basic plumbing'
    },

    // Fertilizer Management
    {
      resource: 'fertilizer',
      title: 'Precision Fertilizer Application',
      description: 'Apply fertilizer based on soil test results and GPS mapping for optimal crop nutrition',
      potential: '25% fertilizer savings',
      difficulty: 'Medium',
      impact: 'High',
      cost: 'ZMW 5,500',
      timeframe: '2 weeks',
      contractor: 'PrecisionAg Zambia',
      steps: ['Soil testing across fields', 'Create nutrient maps', 'Calibrate equipment', 'Apply variable rates'],
      requirements: 'GPS equipment, soil testing, spreader calibration'
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
      contractor: 'EcoFarm Zambia',
      steps: ['Set up composting area', 'Collect organic materials', 'Manage composting process', 'Apply finished compost'],
      requirements: 'Space for composting, organic waste materials'
    },
    {
      resource: 'fertilizer',
      title: 'Crop Rotation Planning',
      description: 'Implement nitrogen-fixing legumes in rotation to naturally improve soil fertility',
      potential: '20% fertilizer reduction',
      difficulty: 'Easy',
      impact: 'High',
      cost: 'ZMW 800',
      timeframe: '1 season',
      contractor: 'AgriConsult Zambia',
      steps: ['Plan rotation schedule', 'Select legume varieties', 'Plant cover crops', 'Monitor soil improvement'],
      requirements: 'Crop planning, legume seeds'
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
      contractor: 'SolarAg Zambia',
      steps: ['Energy audit', 'Solar system design', 'Panel installation', 'System integration'],
      requirements: 'Adequate sunlight, electrical infrastructure'
    },
    {
      resource: 'energy',
      title: 'LED Lighting Upgrade',
      description: 'Replace traditional lighting with energy-efficient LEDs in storage and processing areas',
      potential: '60% lighting costs',
      difficulty: 'Easy',
      impact: 'Medium',
      cost: 'ZMW 3,500',
      timeframe: '1 week',
      contractor: 'ElectroSave Zambia',
      steps: ['Audit current lighting', 'Purchase LED fixtures', 'Install new lighting', 'Monitor savings'],
      requirements: 'Existing electrical system'
    },
    {
      resource: 'energy',
      title: 'Energy-Efficient Motors',
      description: 'Upgrade to high-efficiency motors for pumps and processing equipment',
      potential: '25% motor energy savings',
      difficulty: 'Medium',
      impact: 'Medium',
      cost: 'ZMW 12,000',
      timeframe: '3 weeks',
      contractor: 'MotorTech Zambia',
      steps: ['Motor efficiency audit', 'Select replacement motors', 'Install new motors', 'Performance monitoring'],
      requirements: 'Existing motor systems, electrical expertise'
    },

    // Fuel Management
    {
      resource: 'fuel',
      title: 'GPS Fleet Tracking',
      description: 'Install GPS tracking to optimize routes and reduce unnecessary fuel consumption',
      potential: '20% fuel savings',
      difficulty: 'Easy',
      impact: 'High',
      cost: 'ZMW 4,500',
      timeframe: '1 week',
      contractor: 'FleetTrack Zambia',
      steps: ['Install GPS devices', 'Set up monitoring system', 'Train drivers', 'Optimize routes'],
      requirements: 'Vehicle fleet, mobile connectivity'
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
      contractor: 'MaintainPro Zambia',
      steps: ['Create maintenance schedule', 'Train technicians', 'Implement program', 'Track improvements'],
      requirements: 'Maintenance tools, spare parts inventory'
    },

    // Labor Efficiency
    {
      resource: 'labor',
      title: 'Mechanization Program',
      description: 'Introduce appropriate machinery to reduce manual labor and increase efficiency',
      potential: '30% labor reduction',
      difficulty: 'Hard',
      impact: 'High',
      cost: 'ZMW 45,000',
      timeframe: '8 weeks',
      contractor: 'MechFarm Zambia',
      steps: ['Assess mechanization needs', 'Select appropriate machinery', 'Train operators', 'Implement gradually'],
      requirements: 'Capital investment, operator training'
    },
    {
      resource: 'labor',
      title: 'Worker Training Program',
      description: 'Train workers in efficient farming techniques and modern practices',
      potential: '25% productivity increase',
      difficulty: 'Easy',
      impact: 'High',
      cost: 'ZMW 3,200',
      timeframe: '3 weeks',
      contractor: 'SkillUp Zambia',
      steps: ['Assess training needs', 'Develop curriculum', 'Conduct training sessions', 'Monitor performance'],
      requirements: 'Training materials, qualified instructors'
    },

    // Equipment Optimization
    {
      resource: 'equipment',
      title: 'Equipment Sharing Cooperative',
      description: 'Join or form cooperative to share expensive equipment and increase utilization',
      potential: '40% equipment cost reduction',
      difficulty: 'Medium',
      impact: 'High',
      cost: 'ZMW 1,500',
      timeframe: '4 weeks',
      contractor: 'CoopShare Zambia',
      steps: ['Identify cooperative partners', 'Establish sharing agreement', 'Create usage schedule', 'Implement system'],
      requirements: 'Neighboring farmers, legal agreements'
    },
    {
      resource: 'equipment',
      title: 'Predictive Maintenance',
      description: 'Use sensors and data to predict equipment failures before they occur',
      potential: '30% maintenance cost reduction',
      difficulty: 'Medium',
      impact: 'Medium',
      cost: 'ZMW 8,500',
      timeframe: '4 weeks',
      contractor: 'PredictMaint Zambia',
      steps: ['Install monitoring sensors', 'Set up data analysis', 'Train maintenance staff', 'Implement predictions'],
      requirements: 'IoT sensors, data connectivity'
    },

    // Seed Efficiency
    {
      resource: 'seeds',
      title: 'Precision Seeding Technology',
      description: 'Use GPS-guided seeders for optimal plant spacing and seed placement',
      potential: '15% seed savings',
      difficulty: 'Medium',
      impact: 'Medium',
      cost: 'ZMW 18,000',
      timeframe: '2 weeks',
      contractor: 'SeedTech Zambia',
      steps: ['Calibrate seeding equipment', 'Map field zones', 'Implement precision seeding', 'Monitor germination'],
      requirements: 'GPS-enabled seeder, field mapping'
    },
    {
      resource: 'seeds',
      title: 'Seed Treatment Program',
      description: 'Treat seeds with fungicides and nutrients to improve germination rates',
      potential: '20% germination improvement',
      difficulty: 'Easy',
      impact: 'High',
      cost: 'ZMW 1,800',
      timeframe: '1 week',
      contractor: 'SeedCare Zambia',
      steps: ['Select appropriate treatments', 'Apply seed treatments', 'Plant treated seeds', 'Monitor results'],
      requirements: 'Seed treatment chemicals, application equipment'
    },

    // Waste Management
    {
      resource: 'waste',
      title: 'Biogas Production System',
      description: 'Convert organic waste into biogas for cooking and heating',
      potential: '50% waste reduction',
      difficulty: 'Hard',
      impact: 'High',
      cost: 'ZMW 12,000',
      timeframe: '6 weeks',
      contractor: 'BiogasZam',
      steps: ['Design biogas system', 'Install digester', 'Connect gas lines', 'Train operators'],
      requirements: 'Organic waste source, gas appliances'
    },
    {
      resource: 'waste',
      title: 'Crop Residue Management',
      description: 'Convert crop residues into mulch and soil amendments',
      potential: '35% waste reduction',
      difficulty: 'Easy',
      impact: 'Medium',
      cost: 'ZMW 2,500',
      timeframe: '2 weeks',
      contractor: 'ResidueMax Zambia',
      steps: ['Collect crop residues', 'Process into mulch', 'Apply to fields', 'Monitor soil improvement'],
      requirements: 'Crop residues, processing equipment'
    }
  ];

  const usageData = {
    water: [
      { month: 'Jan', usage: 2200, target: 2100 },
      { month: 'Feb', usage: 2350, target: 2100 },
      { month: 'Mar', usage: 2450, target: 2100 },
      { month: 'Apr', usage: 2600, target: 2100 },
      { month: 'May', usage: 2400, target: 2100 },
      { month: 'Jun', usage: 2450, target: 2100 },
    ],
    fertilizer: [
      { month: 'Jan', usage: 40, target: 38 },
      { month: 'Feb', usage: 42, target: 38 },
      { month: 'Mar', usage: 45, target: 38 },
      { month: 'Apr', usage: 48, target: 38 },
      { month: 'May', usage: 44, target: 38 },
      { month: 'Jun', usage: 45, target: 38 },
    ],
    energy: [
      { month: 'Jan', usage: 320, target: 285 },
      { month: 'Feb', usage: 335, target: 285 },
      { month: 'Mar', usage: 340, target: 285 },
      { month: 'Apr', usage: 355, target: 285 },
      { month: 'May', usage: 338, target: 285 },
      { month: 'Jun', usage: 340, target: 285 },
    ],
    fuel: [
      { month: 'Jan', usage: 170, target: 150 },
      { month: 'Feb', usage: 185, target: 150 },
      { month: 'Mar', usage: 180, target: 150 },
      { month: 'Apr', usage: 190, target: 150 },
      { month: 'May', usage: 175, target: 150 },
      { month: 'Jun', usage: 180, target: 150 },
    ],
    labor: [
      { month: 'Jan', usage: 24, target: 20 },
      { month: 'Feb', usage: 26, target: 20 },
      { month: 'Mar', usage: 25, target: 20 },
      { month: 'Apr', usage: 28, target: 20 },
      { month: 'May', usage: 23, target: 20 },
      { month: 'Jun', usage: 25, target: 20 },
    ],
    equipment: [
      { month: 'Jan', usage: 82, target: 95 },
      { month: 'Feb', usage: 87, target: 95 },
      { month: 'Mar', usage: 85, target: 95 },
      { month: 'Apr', usage: 89, target: 95 },
      { month: 'May', usage: 84, target: 95 },
      { month: 'Jun', usage: 85, target: 95 },
    ],
    seeds: [
      { month: 'Jan', usage: 24, target: 22 },
      { month: 'Feb', usage: 26, target: 22 },
      { month: 'Mar', usage: 25, target: 22 },
      { month: 'Apr', usage: 27, target: 22 },
      { month: 'May', usage: 23, target: 22 },
      { month: 'Jun', usage: 25, target: 22 },
    ],
    waste: [
      { month: 'Jan', usage: 12, target: 40 },
      { month: 'Feb', usage: 15, target: 40 },
      { month: 'Mar', usage: 15, target: 40 },
      { month: 'Apr', usage: 18, target: 40 },
      { month: 'May', usage: 14, target: 40 },
      { month: 'Jun', usage: 15, target: 40 },
    ]
  };

  const zambianContractors = [
    { name: 'AgroTech Solutions', speciality: 'Irrigation & Water Management', contact: '+260 977 123 456', location: 'Lusaka' },
    { name: 'SolarAg Zambia', speciality: 'Solar Energy Systems', contact: '+260 966 234 567', location: 'Ndola' },
    { name: 'PrecisionAg Zambia', speciality: 'Precision Agriculture', contact: '+260 955 345 678', location: 'Kitwe' },
    { name: 'EcoFarm Zambia', speciality: 'Sustainable Farming', contact: '+260 979 456 789', location: 'Chipata' },
    { name: 'MechFarm Zambia', speciality: 'Farm Mechanization', contact: '+260 966 567 890', location: 'Lusaka' },
    { name: 'FleetTrack Zambia', speciality: 'GPS & Fleet Management', contact: '+260 977 678 901', location: 'Livingstone' }
  ];

  const currentResource = resources[selectedResource as keyof typeof resources];
  const currentUsageData = usageData[selectedResource as keyof typeof usageData];
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleImplement = (tip: any) => {
    setSelectedImplementation(tip);
    setShowImplementModal(true);
  };

  const handleSubmitImplementation = () => {
    // Here you would typically save to database and schedule implementation
    console.log('Implementation scheduled:', {
      tip: selectedImplementation,
      form: implementationForm
    });
    
    alert(`Implementation scheduled successfully! 
    
Project: ${selectedImplementation.title}
Start Date: ${implementationForm.startDate}
Budget: ZMW ${implementationForm.budget}
Contractor: ${implementationForm.contractor}
Priority: ${implementationForm.priority.toUpperCase()}

You will receive updates on the implementation progress.`);
    
    setShowImplementModal(false);
    setImplementationForm({
      startDate: '',
      budget: '',
      contractor: '',
      notes: '',
      priority: 'medium'
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Resource Optimization</h1>
          <p className="text-gray-600 mt-1">Maximize efficiency and minimize waste across all farming operations</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-2">
          <button 
            onClick={() => setCalculatorMode(!calculatorMode)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Calculator className="w-4 h-4" />
            <span>Calculator</span>
          </button>
        </div>
      </div>

      {/* Zambian Resource Context */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-700 rounded-lg shadow-sm text-white p-6">
        <h3 className="text-lg font-bold mb-3">🇿🇲 Zambian Resource Optimization</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-semibold mb-1">Local Contractors</h4>
            <p className="text-sm opacity-90">{zambianContractors.length} certified contractors available</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-semibold mb-1">Government Support</h4>
            <p className="text-sm opacity-90">FISP subsidies for efficiency improvements</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-semibold mb-1">Climate Adaptation</h4>
            <p className="text-sm opacity-90">Solutions for Zambian weather patterns</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-semibold mb-1">ROI Tracking</h4>
            <p className="text-sm opacity-90">Average 25% cost reduction achieved</p>
          </div>
        </div>
      </div>

      {/* Resource Selection */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-gray-700 py-2">Select Resource Type:</span>
          {Object.entries(resources).map(([key, resource]) => {
            const Icon = resource.icon;
            return (
              <button
                key={key}
                onClick={() => setSelectedResource(key)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 ${
                  selectedResource === key
                    ? `bg-${resource.color}-600 text-white`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{resource.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Resource Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Current Usage</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{currentResource.current}</p>
            </div>
            <div className={`p-3 bg-${currentResource.color}-100 rounded-full`}>
              <currentResource.icon className={`w-6 h-6 text-${currentResource.color}-600`} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Target Usage</p>
              <p className="text-2xl font-bold text-emerald-600 mt-2">{currentResource.target}</p>
            </div>
            <div className="p-3 bg-emerald-100 rounded-full">
              <Target className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Efficiency</p>
              <p className="text-2xl font-bold text-blue-600 mt-2">{currentResource.efficiency}%</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Monthly Cost</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{currentResource.cost}</p>
              <p className="text-sm text-emerald-600 mt-1">-{currentResource.savings} potential</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <TrendingDown className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Usage Trends */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Usage Trends vs Targets - {currentResource.name}</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {currentUsageData.map((data, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 w-12">{data.month}</span>
                <div className="flex-1 mx-4 relative">
                  {/* Target line */}
                  <div className="w-full bg-gray-200 rounded-full h-4 relative">
                    <div
                      className={`bg-${currentResource.color}-500 h-4 rounded-full relative`}
                      style={{ width: `${Math.min((data.usage / Math.max(...currentUsageData.map(d => d.usage))) * 100, 100)}%` }}
                    >
                      {data.usage > data.target && (
                        <div className="absolute top-0 right-0 w-2 h-4 bg-red-500 rounded-r-full"></div>
                      )}
                    </div>
                    {/* Target indicator */}
                    <div 
                      className="absolute top-0 h-4 w-1 bg-emerald-600 z-10"
                      style={{ left: `${(data.target / Math.max(...currentUsageData.map(d => d.usage))) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-right min-w-[8rem]">
                  <span className="text-sm text-gray-900 font-medium">{data.usage} {currentResource.unit.toLowerCase()}</span>
                  <span className="text-xs text-emerald-600 ml-2">Target: {data.target}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Optimization Recommendations */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Lightbulb className="w-5 h-5 mr-2 text-yellow-600" />
            Optimization Recommendations - {currentResource.name}
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredTips.map((tip, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-900">{tip.title}</h4>
                  <div className="flex space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(tip.difficulty)}`}>
                      {tip.difficulty}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(tip.impact)}`}>
                      {tip.impact} Impact
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">{tip.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-emerald-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <TrendingDown className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm font-medium text-emerald-800">Potential Savings</span>
                    </div>
                    <p className="text-lg font-bold text-emerald-600">{tip.potential}</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <DollarSign className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">Investment</span>
                    </div>
                    <p className="text-lg font-bold text-blue-600">{tip.cost}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-600">Timeframe: {tip.timeframe}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-600">{tip.contractor}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h5 className="text-sm font-semibold text-gray-700 mb-2">Implementation Steps:</h5>
                  <ul className="space-y-1">
                    {tip.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="text-sm text-gray-600 flex items-start">
                        <span className="flex-shrink-0 w-5 h-5 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xs font-medium mr-2 mt-0.5">
                          {stepIndex + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <h5 className="text-sm font-semibold text-gray-700 mb-1">Requirements:</h5>
                  <p className="text-sm text-gray-600">{tip.requirements}</p>
                </div>
                
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleImplement(tip)}
                    className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-1"
                  >
                    <Save className="w-4 h-4" />
                    <span>Implement</span>
                  </button>
                  <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                    <Info className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Implementation Modal */}
      {showImplementModal && selectedImplementation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Schedule Implementation</h3>
              <button 
                onClick={() => setShowImplementModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              {/* Project Overview */}
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                <h4 className="font-semibold text-emerald-800 mb-2">{selectedImplementation.title}</h4>
                <p className="text-sm text-emerald-700 mb-3">{selectedImplementation.description}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-emerald-700">Potential Savings:</span>
                    <span className="font-semibold ml-2">{selectedImplementation.potential}</span>
                  </div>
                  <div>
                    <span className="text-emerald-700">Estimated Cost:</span>
                    <span className="font-semibold ml-2">{selectedImplementation.cost}</span>
                  </div>
                  <div>
                    <span className="text-emerald-700">Timeframe:</span>
                    <span className="font-semibold ml-2">{selectedImplementation.timeframe}</span>
                  </div>
                  <div>
                    <span className="text-emerald-700">Difficulty:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ml-2 ${getDifficultyColor(selectedImplementation.difficulty)}`}>
                      {selectedImplementation.difficulty}
                    </span>
                  </div>
                </div>
              </div>

              {/* Implementation Form */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                    <input 
                      type="date"
                      value={implementationForm.startDate}
                      onChange={(e) => setImplementationForm({...implementationForm, startDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Budget (ZMW)</label>
                    <input 
                      type="number"
                      value={implementationForm.budget}
                      onChange={(e) => setImplementationForm({...implementationForm, budget: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Enter budget amount"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Contractor</label>
                  <select 
                    value={implementationForm.contractor}
                    onChange={(e) => setImplementationForm({...implementationForm, contractor: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="">Select contractor</option>
                    <option value={selectedImplementation.contractor}>{selectedImplementation.contractor} (Recommended)</option>
                    {zambianContractors.filter(c => c.name !== selectedImplementation.contractor).map((contractor) => (
                      <option key={contractor.name} value={contractor.name}>
                        {contractor.name} - {contractor.speciality}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority Level</label>
                  <select 
                    value={implementationForm.priority}
                    onChange={(e) => setImplementationForm({...implementationForm, priority: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                  <textarea 
                    value={implementationForm.notes}
                    onChange={(e) => setImplementationForm({...implementationForm, notes: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    rows={3}
                    placeholder="Any specific requirements or notes..."
                  />
                </div>
              </div>

              {/* Contractor Information */}
              {implementationForm.contractor && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Contractor Information</h4>
                  {zambianContractors.find(c => c.name === implementationForm.contractor) && (
                    <div className="text-sm text-blue-700">
                      <p><strong>Speciality:</strong> {zambianContractors.find(c => c.name === implementationForm.contractor)?.speciality}</p>
                      <p><strong>Location:</strong> {zambianContractors.find(c => c.name === implementationForm.contractor)?.location}</p>
                      <p><strong>Contact:</strong> {zambianContractors.find(c => c.name === implementationForm.contractor)?.contact}</p>
                    </div>
                  )}
                </div>
              )}

              <div className="flex space-x-3 mt-6">
                <button 
                  onClick={() => setShowImplementModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSubmitImplementation}
                  className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedule Implementation</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Calculator Modal */}
      {calculatorMode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Resource Calculator</h3>
              <button 
                onClick={() => setCalculatorMode(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Field Area (hectares)</label>
                  <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="Enter area" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Crop Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                    <option>Maize</option>
                    <option>Soybeans</option>
                    <option>Groundnuts</option>
                    <option>Sunflower</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Resource Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                    {Object.entries(resources).map(([key, resource]) => (
                      <option key={key} value={key}>{resource.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="bg-emerald-50 rounded-lg p-4">
                  <h4 className="font-semibold text-emerald-800 mb-2">Recommended Usage</h4>
                  <div className="space-y-1 text-sm text-emerald-700">
                    <p>Water: 25 L/day per hectare</p>
                    <p>Fertilizer: 40 kg/ha</p>
                    <p>Expected Savings: 15-25%</p>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button 
                  onClick={() => setCalculatorMode(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors">
                  Calculate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Zambian Contractors Directory */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Users className="w-5 h-5 mr-2 text-blue-600" />
            Certified Zambian Contractors
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {zambianContractors.map((contractor, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">{contractor.name}</h4>
                <p className="text-sm text-blue-600 mb-2">{contractor.speciality}</p>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{contractor.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    <span>{contractor.contact}</span>
                  </div>
                </div>
                <button className="w-full mt-3 bg-emerald-600 text-white py-2 rounded text-sm hover:bg-emerald-700 transition-colors">
                  Contact Contractor
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Resource Optimization */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg shadow-sm">
        <div className="px-6 py-8 text-white">
          <h3 className="text-xl font-bold mb-4">🤖 AI Resource Optimization for Zambian Farms</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Smart Scheduling</h4>
              <p className="text-sm opacity-90">AI suggests optimal timing for irrigation, fertilization, and harvesting based on weather and soil conditions.</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Cost Optimization</h4>
              <p className="text-sm opacity-90">Machine learning identifies the most cost-effective resource combinations for maximum yield.</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Predictive Analytics</h4>
              <p className="text-sm opacity-90">Predict resource needs and potential savings based on historical data and weather patterns.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceOptimization;