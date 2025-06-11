import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Download, 
  Filter,
  Target,
  DollarSign,
  Sprout,
  Droplets,
  Zap,
  Users,
  AlertTriangle,
  CheckCircle,
  Eye,
  RefreshCw,
  Settings,
  Share2,
  FileText,
  PieChart,
  Activity,
  MapPin,
  Clock,
  Award,
  Lightbulb,
  Bell,
  Plus,
  X,
  Save,
  Send,
  Mail,
  MessageCircle,
  Smartphone,
  Globe,
  Edit,
  Trash2,
  Search,
  Copy,
  ExternalLink,
  Printer,
  Upload
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  PieChart as RechartsPieChart, 
  Cell, 
  Pie,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

const Analytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('year');
  const [selectedMetric, setSelectedMetric] = useState('all');
  const [comparisonMode, setComparisonMode] = useState(false);
  
  // New state for functionality
  const [showReportModal, setShowReportModal] = useState(false);
  const [showAlertsModal, setShowAlertsModal] = useState(false);
  const [showTargetsModal, setShowTargetsModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [reportType, setReportType] = useState('comprehensive');
  const [shareMethod, setShareMethod] = useState('email');

  // Report generation state
  const [reportConfig, setReportConfig] = useState({
    title: 'Farm Performance Report',
    period: 'monthly',
    includeCharts: true,
    includeComparisons: true,
    includeRecommendations: true,
    format: 'pdf',
    recipients: '',
    schedule: 'manual'
  });

  // Alert configuration state
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      name: 'Low Yield Alert',
      metric: 'yield',
      condition: 'below',
      threshold: 5.0,
      unit: 'tons/ha',
      enabled: true,
      frequency: 'immediate',
      recipients: ['farmer@example.com'],
      lastTriggered: '2024-12-10'
    },
    {
      id: 2,
      name: 'High Profit Margin',
      metric: 'profit_margin',
      condition: 'above',
      threshold: 40,
      unit: '%',
      enabled: true,
      frequency: 'weekly',
      recipients: ['manager@example.com'],
      lastTriggered: null
    },
    {
      id: 3,
      name: 'Water Usage Spike',
      metric: 'water_usage',
      condition: 'above',
      threshold: 3000,
      unit: 'L/day',
      enabled: false,
      frequency: 'daily',
      recipients: ['irrigation@example.com'],
      lastTriggered: '2024-12-08'
    }
  ]);

  // Target setting state
  const [targets, setTargets] = useState([
    {
      id: 1,
      name: 'Annual Yield Target',
      metric: 'total_yield',
      target: 200,
      current: 156.8,
      unit: 'tons',
      deadline: '2024-12-31',
      progress: 78.4,
      status: 'on_track'
    },
    {
      id: 2,
      name: 'Profit Margin Goal',
      metric: 'profit_margin',
      target: 45,
      current: 38.2,
      unit: '%',
      deadline: '2024-12-31',
      progress: 84.9,
      status: 'on_track'
    },
    {
      id: 3,
      name: 'Water Efficiency Target',
      metric: 'water_efficiency',
      target: 90,
      current: 87,
      unit: '%',
      deadline: '2024-12-31',
      progress: 96.7,
      status: 'excellent'
    },
    {
      id: 4,
      name: 'Carbon Reduction Goal',
      metric: 'carbon_footprint',
      target: 10,
      current: 12.8,
      unit: 'tons CO₂',
      deadline: '2024-12-31',
      progress: 78.1,
      status: 'behind'
    }
  ]);

  // New alert form state
  const [newAlert, setNewAlert] = useState({
    name: '',
    metric: 'yield',
    condition: 'below',
    threshold: '',
    unit: 'tons/ha',
    frequency: 'immediate',
    recipients: ''
  });

  // New target form state
  const [newTarget, setNewTarget] = useState({
    name: '',
    metric: 'yield',
    target: '',
    unit: 'tons/ha',
    deadline: ''
  });

  // Share insights state
  const [shareConfig, setShareConfig] = useState({
    title: 'Farm Analytics Insights',
    message: 'Here are the latest analytics insights from our farm operations.',
    includeCharts: true,
    includeRecommendations: true,
    recipients: '',
    platform: 'email'
  });

  // Analytics Data (existing data remains the same)
  const performanceMetrics = {
    totalYield: { value: 156.8, unit: 'tons', change: 18.5, trend: 'up' },
    revenue: { value: 685000, unit: 'ZMW', change: 25.3, trend: 'up' },
    profitMargin: { value: 38.2, unit: '%', change: 5.7, trend: 'up' },
    efficiency: { value: 87.4, unit: '%', change: 12.1, trend: 'up' },
    waterUsage: { value: 2450, unit: 'L/day', change: -15.2, trend: 'down' },
    carbonFootprint: { value: 12.8, unit: 'tons CO₂', change: -22.4, trend: 'down' }
  };

  // Yield Analysis Data
  const yieldData = [
    { month: 'Jan', maize: 0, soybeans: 0, groundnuts: 0, sunflower: 0 },
    { month: 'Feb', maize: 0, soybeans: 0, groundnuts: 0, sunflower: 0 },
    { month: 'Mar', maize: 0, soybeans: 0, groundnuts: 0, sunflower: 8.5 },
    { month: 'Apr', maize: 0, soybeans: 22.5, groundnuts: 14.2, sunflower: 0 },
    { month: 'May', maize: 65.8, soybeans: 0, groundnuts: 0, sunflower: 0 },
    { month: 'Jun', maize: 45.2, soybeans: 0, groundnuts: 0, sunflower: 0 },
    { month: 'Jul', maize: 0, soybeans: 0, groundnuts: 0, sunflower: 0 },
    { month: 'Aug', maize: 0, soybeans: 0, groundnuts: 0, sunflower: 0 },
    { month: 'Sep', maize: 0, soybeans: 0, groundnuts: 0, sunflower: 0 },
    { month: 'Oct', maize: 0, soybeans: 0, groundnuts: 0, sunflower: 0 },
    { month: 'Nov', maize: 0, soybeans: 0, groundnuts: 0, sunflower: 0 },
    { month: 'Dec', maize: 45.8, soybeans: 0, groundnuts: 0, sunflower: 0 }
  ];

  // Financial Performance
  const financialData = [
    { month: 'Jan', revenue: 45000, expenses: 32000, profit: 13000 },
    { month: 'Feb', revenue: 52000, expenses: 35000, profit: 17000 },
    { month: 'Mar', revenue: 48000, expenses: 38000, profit: 10000 },
    { month: 'Apr', revenue: 65000, expenses: 42000, profit: 23000 },
    { month: 'May', revenue: 125000, expenses: 55000, profit: 70000 },
    { month: 'Jun', revenue: 95000, expenses: 48000, profit: 47000 },
    { month: 'Jul', revenue: 35000, expenses: 28000, profit: 7000 },
    { month: 'Aug', revenue: 42000, expenses: 31000, profit: 11000 },
    { month: 'Sep', revenue: 38000, expenses: 29000, profit: 9000 },
    { month: 'Oct', revenue: 55000, expenses: 35000, profit: 20000 },
    { month: 'Nov', revenue: 48000, expenses: 32000, profit: 16000 },
    { month: 'Dec', revenue: 85000, expenses: 45000, profit: 40000 }
  ];

  // Resource Efficiency
  const resourceData = [
    { resource: 'Water', efficiency: 87, target: 90, usage: 2450 },
    { resource: 'Fertilizer', efficiency: 82, target: 85, usage: 45 },
    { resource: 'Energy', efficiency: 91, target: 88, usage: 340 },
    { resource: 'Labor', efficiency: 78, target: 80, usage: 25 },
    { resource: 'Equipment', efficiency: 89, target: 85, usage: 85 },
    { resource: 'Seeds', efficiency: 94, target: 90, usage: 25 }
  ];

  // Crop Performance Comparison
  const cropComparison = [
    { crop: 'Maize', yield: 6.5, target: 6.0, revenue: 325000, area: 50 },
    { crop: 'Soybeans', yield: 2.2, target: 2.5, revenue: 185000, area: 25 },
    { crop: 'Groundnuts', yield: 1.8, target: 2.0, revenue: 95000, area: 15 },
    { crop: 'Sunflower', yield: 1.5, target: 1.4, revenue: 80000, area: 10 }
  ];

  // Sustainability Metrics
  const sustainabilityData = [
    { metric: 'Carbon Sequestration', value: 85, max: 100 },
    { metric: 'Water Conservation', value: 78, max: 100 },
    { metric: 'Soil Health', value: 92, max: 100 },
    { metric: 'Biodiversity', value: 67, max: 100 },
    { metric: 'Energy Efficiency', value: 89, max: 100 },
    { metric: 'Waste Reduction', value: 73, max: 100 }
  ];

  // Regional Comparison Data
  const regionalData = [
    { province: 'Your Farm', yield: 6.5, efficiency: 87, profit: 38.2 },
    { province: 'Lusaka Avg', yield: 5.8, efficiency: 82, profit: 32.1 },
    { province: 'Central Avg', yield: 6.1, efficiency: 84, profit: 35.4 },
    { province: 'Eastern Avg', yield: 5.5, efficiency: 79, profit: 29.8 },
    { province: 'National Avg', yield: 5.2, efficiency: 78, profit: 28.5 }
  ];

  // Predictive Analytics
  const predictions = [
    {
      title: 'Next Season Yield Forecast',
      prediction: '7.2 tons/ha',
      confidence: 89,
      factors: ['Weather patterns', 'Soil health', 'Input quality'],
      recommendation: 'Increase planting area by 15%'
    },
    {
      title: 'Market Price Projection',
      prediction: 'ZMW 4,500/ton',
      confidence: 76,
      factors: ['Regional demand', 'Export opportunities', 'Government policy'],
      recommendation: 'Consider forward contracts'
    },
    {
      title: 'Resource Optimization',
      prediction: '25% cost reduction',
      confidence: 82,
      factors: ['Precision agriculture', 'Efficient irrigation', 'Smart fertilization'],
      recommendation: 'Implement IoT monitoring'
    }
  ];

  const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

  const getMetricColor = (change: number, trend: string) => {
    if (trend === 'up') return change > 0 ? 'text-emerald-600' : 'text-red-600';
    if (trend === 'down') return change < 0 ? 'text-emerald-600' : 'text-red-600';
    return 'text-gray-600';
  };

  const getMetricIcon = (trend: string) => {
    return trend === 'up' ? TrendingUp : TrendingDown;
  };

  const getTargetStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-emerald-600 bg-emerald-100';
      case 'on_track': return 'text-blue-600 bg-blue-100';
      case 'behind': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // Handler functions
  const handleGenerateReport = () => {
    console.log('Generating report with config:', reportConfig);
    // Simulate report generation
    alert(`${reportConfig.format.toUpperCase()} report "${reportConfig.title}" generated successfully! 
    
Report includes:
- Performance metrics and charts
- ${reportConfig.includeComparisons ? 'Regional comparisons' : 'No comparisons'}
- ${reportConfig.includeRecommendations ? 'AI recommendations' : 'No recommendations'}
- Period: ${reportConfig.period}

${reportConfig.recipients ? `Sent to: ${reportConfig.recipients}` : 'Ready for download'}`);
    setShowReportModal(false);
  };

  const handleSaveAlert = () => {
    const alert = {
      id: Date.now(),
      ...newAlert,
      threshold: parseFloat(newAlert.threshold),
      enabled: true,
      lastTriggered: null,
      recipients: newAlert.recipients.split(',').map(email => email.trim())
    };
    setAlerts([...alerts, alert]);
    setNewAlert({
      name: '',
      metric: 'yield',
      condition: 'below',
      threshold: '',
      unit: 'tons/ha',
      frequency: 'immediate',
      recipients: ''
    });
    setShowAlertsModal(false);
    alert(`Alert "${alert.name}" created successfully! You'll be notified when ${alert.metric} goes ${alert.condition} ${alert.threshold} ${alert.unit}.`);
  };

  const handleSaveTarget = () => {
    const target = {
      id: Date.now(),
      ...newTarget,
      target: parseFloat(newTarget.target),
      current: 0,
      progress: 0,
      status: 'new'
    };
    setTargets([...targets, target]);
    setNewTarget({
      name: '',
      metric: 'yield',
      target: '',
      unit: 'tons/ha',
      deadline: ''
    });
    setShowTargetsModal(false);
    alert(`Target "${target.name}" set successfully! Target: ${target.target} ${target.unit} by ${target.deadline}.`);
  };

  const handleShareInsights = () => {
    console.log('Sharing insights with config:', shareConfig);
    
    let shareMessage = '';
    switch (shareConfig.platform) {
      case 'email':
        shareMessage = `Email sent to: ${shareConfig.recipients}`;
        break;
      case 'whatsapp':
        shareMessage = 'WhatsApp message prepared (opens WhatsApp)';
        break;
      case 'sms':
        shareMessage = `SMS sent to: ${shareConfig.recipients}`;
        break;
      case 'social':
        shareMessage = 'Social media post prepared';
        break;
      case 'link':
        shareMessage = 'Shareable link generated and copied to clipboard';
        break;
    }

    alert(`Insights shared successfully!

${shareMessage}

Content includes:
- ${shareConfig.title}
- Performance metrics and key insights
- ${shareConfig.includeCharts ? 'Visual charts and graphs' : 'Text summary only'}
- ${shareConfig.includeRecommendations ? 'AI recommendations' : 'Data only'}

Message: "${shareConfig.message}"`);
    
    setShowShareModal(false);
  };

  const toggleAlert = (alertId: number) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, enabled: !alert.enabled } : alert
    ));
  };

  const deleteAlert = (alertId: number) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
  };

  const deleteTarget = (targetId: number) => {
    setTargets(targets.filter(target => target.id !== targetId));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Advanced Analytics</h1>
          <p className="text-gray-600 mt-1">Comprehensive farm performance analysis and insights</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
            <option value="custom">Custom Range</option>
          </select>
          <button 
            onClick={() => setShowReportModal(true)}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
          >
            <FileText className="w-4 h-4" />
            <span>Generate Report</span>
          </button>
          <button 
            onClick={() => setShowShareModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Insights</span>
          </button>
        </div>
      </div>

      {/* Zambian Analytics Context */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-lg shadow-sm text-white p-6">
        <h3 className="text-lg font-bold mb-3">🇿🇲 Zambian Agricultural Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-semibold mb-1">AI-Powered Insights</h4>
            <p className="text-sm opacity-90">Machine learning optimized for Zambian conditions</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-semibold mb-1">Regional Benchmarks</h4>
            <p className="text-sm opacity-90">Compare with provincial and national averages</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-semibold mb-1">Predictive Models</h4>
            <p className="text-sm opacity-90">Weather and market forecasting</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-semibold mb-1">ROI Optimization</h4>
            <p className="text-sm opacity-90">Maximize returns on agricultural investments</p>
          </div>
        </div>
      </div>

      {/* Key Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Object.entries(performanceMetrics).map(([key, metric]) => {
          const Icon = getMetricIcon(metric.trend);
          return (
            <div key={key} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </h3>
                <Icon className={`w-4 h-4 ${getMetricColor(metric.change, metric.trend)}`} />
              </div>
              <div className="space-y-1">
                <p className="text-xl font-bold text-gray-900">
                  {typeof metric.value === 'number' && metric.value > 1000 
                    ? metric.value.toLocaleString() 
                    : metric.value}
                  <span className="text-sm font-normal text-gray-500 ml-1">{metric.unit}</span>
                </p>
                <p className={`text-sm font-medium ${getMetricColor(metric.change, metric.trend)}`}>
                  {metric.change > 0 ? '+' : ''}{metric.change}%
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Yield Performance */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Yield Performance by Crop</h3>
            <button className="text-emerald-600 hover:text-emerald-700">
              <Eye className="w-4 h-4" />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={yieldData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value} tons`, '']} />
              <Area type="monotone" dataKey="maize" stackId="1" stroke="#10B981" fill="#10B981" />
              <Area type="monotone" dataKey="soybeans" stackId="1" stroke="#3B82F6" fill="#3B82F6" />
              <Area type="monotone" dataKey="groundnuts" stackId="1" stroke="#F59E0B" fill="#F59E0B" />
              <Area type="monotone" dataKey="sunflower" stackId="1" stroke="#EF4444" fill="#EF4444" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Financial Performance */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Financial Performance</h3>
            <button className="text-emerald-600 hover:text-emerald-700">
              <DollarSign className="w-4 h-4" />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={financialData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`ZMW ${value.toLocaleString()}`, '']} />
              <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} name="Revenue" />
              <Line type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={2} name="Expenses" />
              <Line type="monotone" dataKey="profit" stroke="#3B82F6" strokeWidth={2} name="Profit" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Resource Efficiency */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Resource Efficiency</h3>
            <button className="text-emerald-600 hover:text-emerald-700">
              <Target className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4">
            {resourceData.map((resource, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-700">{resource.resource}</span>
                  <span className="text-gray-600">{resource.efficiency}% / {resource.target}%</span>
                </div>
                <div className="flex space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        resource.efficiency >= resource.target ? 'bg-emerald-500' : 'bg-yellow-500'
                      }`}
                      style={{ width: `${(resource.efficiency / 100) * 100}%` }}
                    ></div>
                  </div>
                  <div className="w-16 text-xs text-gray-500 text-right">
                    {resource.efficiency >= resource.target ? (
                      <CheckCircle className="w-3 h-3 text-emerald-500 inline" />
                    ) : (
                      <AlertTriangle className="w-3 h-3 text-yellow-500 inline" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Crop Performance Comparison */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Crop Performance vs Targets</h3>
            <button className="text-emerald-600 hover:text-emerald-700">
              <Sprout className="w-4 h-4" />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={cropComparison}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="crop" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="yield" fill="#10B981" name="Actual Yield (tons/ha)" />
              <Bar dataKey="target" fill="#E5E7EB" name="Target Yield (tons/ha)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Targets Dashboard */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Target className="w-5 h-5 mr-2 text-emerald-600" />
            Performance Targets
          </h3>
          <button 
            onClick={() => setShowTargetsModal(true)}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Set Target</span>
          </button>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {targets.map((target) => (
              <div key={target.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">{target.name}</h4>
                  <div className="flex space-x-1">
                    <button 
                      onClick={() => deleteTarget(target.id)}
                      className="text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Current:</span>
                    <span className="font-medium">{target.current} {target.unit}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Target:</span>
                    <span className="font-medium">{target.target} {target.unit}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Deadline:</span>
                    <span className="font-medium">{new Date(target.deadline).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">{target.progress.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        target.status === 'excellent' ? 'bg-emerald-500' :
                        target.status === 'on_track' ? 'bg-blue-500' :
                        target.status === 'behind' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.min(target.progress, 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTargetStatusColor(target.status)}`}>
                  {target.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alerts Dashboard */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Bell className="w-5 h-5 mr-2 text-yellow-600" />
            Analytics Alerts
          </h3>
          <button 
            onClick={() => setShowAlertsModal(true)}
            className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Configure Alert</span>
          </button>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold text-gray-900">{alert.name}</h4>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        alert.enabled ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {alert.enabled ? 'Active' : 'Disabled'}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Condition:</span>
                        <p className="font-medium capitalize">{alert.metric.replace('_', ' ')} {alert.condition} {alert.threshold} {alert.unit}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Frequency:</span>
                        <p className="font-medium capitalize">{alert.frequency}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Recipients:</span>
                        <p className="font-medium">{alert.recipients.length} contact(s)</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Last Triggered:</span>
                        <p className="font-medium">{alert.lastTriggered ? new Date(alert.lastTriggered).toLocaleDateString() : 'Never'}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 ml-4">
                    <button 
                      onClick={() => toggleAlert(alert.id)}
                      className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                        alert.enabled 
                          ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' 
                          : 'bg-emerald-600 text-white hover:bg-emerald-700'
                      }`}
                    >
                      {alert.enabled ? 'Disable' : 'Enable'}
                    </button>
                    <button 
                      onClick={() => deleteAlert(alert.id)}
                      className="text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sustainability Dashboard */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Sustainability Metrics</h3>
          <div className="flex space-x-2">
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-sm rounded-full">
              Overall Score: 81/100
            </span>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={sustainabilityData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar name="Score" dataKey="value" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
            <div className="space-y-4">
              {sustainabilityData.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700">{item.metric}</span>
                    <span className="text-gray-600">{item.value}/100</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        item.value >= 80 ? 'bg-emerald-500' : 
                        item.value >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${item.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Regional Benchmarking */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            Regional Performance Comparison
          </h3>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Region</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Avg Yield (tons/ha)</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Efficiency (%)</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Profit Margin (%)</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Ranking</th>
                </tr>
              </thead>
              <tbody>
                {regionalData.map((region, index) => (
                  <tr key={index} className={`border-b border-gray-100 ${
                    region.province === 'Your Farm' ? 'bg-emerald-50' : ''
                  }`}>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <span className={`font-medium ${
                          region.province === 'Your Farm' ? 'text-emerald-600' : 'text-gray-900'
                        }`}>
                          {region.province}
                        </span>
                        {region.province === 'Your Farm' && (
                          <Award className="w-4 h-4 text-emerald-600" />
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-700">{region.yield}</td>
                    <td className="py-3 px-4 text-gray-700">{region.efficiency}</td>
                    <td className="py-3 px-4 text-gray-700">{region.profit}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        index === 0 ? 'bg-emerald-100 text-emerald-800' :
                        index === 1 ? 'bg-blue-100 text-blue-800' :
                        index === 2 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        #{index + 1}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Predictive Analytics */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">AI Predictive Analytics</h3>
          <div className="flex items-center space-x-2">
            <RefreshCw className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-500">Updated 2 hours ago</span>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {predictions.map((prediction, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">{prediction.title}</h4>
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-2xl font-bold text-emerald-600">{prediction.prediction}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="w-16 bg-gray-200 rounded-full h-1">
                        <div
                          className="bg-emerald-500 h-1 rounded-full"
                          style={{ width: `${prediction.confidence}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500">{prediction.confidence}% confidence</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Key Factors:</p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {prediction.factors.map((factor, idx) => (
                        <li key={idx} className="flex items-center space-x-1">
                          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                          <span>{factor}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-2 border-t border-gray-200">
                    <p className="text-sm font-medium text-blue-600">{prediction.recommendation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg shadow-sm text-white p-6">
        <h3 className="text-lg font-bold mb-4">📊 Analytics Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button 
            onClick={() => setShowReportModal(true)}
            className="bg-white bg-opacity-20 rounded-lg p-4 hover:bg-opacity-30 transition-colors"
          >
            <FileText className="w-6 h-6 mx-auto mb-2" />
            <p className="text-sm font-medium">Generate Report</p>
          </button>
          <button 
            onClick={() => setShowAlertsModal(true)}
            className="bg-white bg-opacity-20 rounded-lg p-4 hover:bg-opacity-30 transition-colors"
          >
            <Bell className="w-6 h-6 mx-auto mb-2" />
            <p className="text-sm font-medium">Configure Alerts</p>
          </button>
          <button 
            onClick={() => setShowTargetsModal(true)}
            className="bg-white bg-opacity-20 rounded-lg p-4 hover:bg-opacity-30 transition-colors"
          >
            <Target className="w-6 h-6 mx-auto mb-2" />
            <p className="text-sm font-medium">Set Targets</p>
          </button>
          <button 
            onClick={() => setShowShareModal(true)}
            className="bg-white bg-opacity-20 rounded-lg p-4 hover:bg-opacity-30 transition-colors"
          >
            <Share2 className="w-6 h-6 mx-auto mb-2" />
            <p className="text-sm font-medium">Share Insights</p>
          </button>
        </div>
      </div>

      {/* Generate Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Generate Analytics Report</h3>
              <button 
                onClick={() => setShowReportModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Report Title</label>
                  <input
                    type="text"
                    value={reportConfig.title}
                    onChange={(e) => setReportConfig({...reportConfig, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Enter report title"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
                    <select
                      value={reportConfig.period}
                      onChange={(e) => setReportConfig({...reportConfig, period: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                      <option value="yearly">Yearly</option>
                      <option value="custom">Custom Range</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                    <select
                      value={reportConfig.format}
                      onChange={(e) => setReportConfig({...reportConfig, format: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="pdf">PDF</option>
                      <option value="excel">Excel</option>
                      <option value="powerpoint">PowerPoint</option>
                      <option value="csv">CSV Data</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Include in Report</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={reportConfig.includeCharts}
                        onChange={(e) => setReportConfig({...reportConfig, includeCharts: e.target.checked})}
                        className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Charts and Visualizations</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={reportConfig.includeComparisons}
                        onChange={(e) => setReportConfig({...reportConfig, includeComparisons: e.target.checked})}
                        className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Regional Comparisons</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={reportConfig.includeRecommendations}
                        onChange={(e) => setReportConfig({...reportConfig, includeRecommendations: e.target.checked})}
                        className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">AI Recommendations</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Recipients (Optional)</label>
                  <input
                    type="text"
                    value={reportConfig.recipients}
                    onChange={(e) => setReportConfig({...reportConfig, recipients: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="email1@example.com, email2@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Schedule</label>
                  <select
                    value={reportConfig.schedule}
                    onChange={(e) => setReportConfig({...reportConfig, schedule: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="manual">Generate Now</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button 
                  onClick={() => setShowReportModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleGenerateReport}
                  className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>Generate Report</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Configure Alerts Modal */}
      {showAlertsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Configure Alert</h3>
              <button 
                onClick={() => setShowAlertsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Alert Name</label>
                  <input
                    type="text"
                    value={newAlert.name}
                    onChange={(e) => setNewAlert({...newAlert, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Enter alert name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Metric</label>
                    <select
                      value={newAlert.metric}
                      onChange={(e) => setNewAlert({...newAlert, metric: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="yield">Yield</option>
                      <option value="profit_margin">Profit Margin</option>
                      <option value="water_usage">Water Usage</option>
                      <option value="efficiency">Efficiency</option>
                      <option value="revenue">Revenue</option>
                      <option value="expenses">Expenses</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
                    <select
                      value={newAlert.condition}
                      onChange={(e) => setNewAlert({...newAlert, condition: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="above">Above</option>
                      <option value="below">Below</option>
                      <option value="equals">Equals</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Threshold</label>
                    <input
                      type="number"
                      value={newAlert.threshold}
                      onChange={(e) => setNewAlert({...newAlert, threshold: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                    <select
                      value={newAlert.unit}
                      onChange={(e) => setNewAlert({...newAlert, unit: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="tons/ha">tons/ha</option>
                      <option value="%">%</option>
                      <option value="L/day">L/day</option>
                      <option value="ZMW">ZMW</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
                  <select
                    value={newAlert.frequency}
                    onChange={(e) => setNewAlert({...newAlert, frequency: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="immediate">Immediate</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Recipients</label>
                  <input
                    type="text"
                    value={newAlert.recipients}
                    onChange={(e) => setNewAlert({...newAlert, recipients: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="email1@example.com, email2@example.com"
                  />
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button 
                  onClick={() => setShowAlertsModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveAlert}
                  className="flex-1 bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Bell className="w-4 h-4" />
                  <span>Save Alert</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Set Targets Modal */}
      {showTargetsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Set Performance Target</h3>
              <button 
                onClick={() => setShowTargetsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Target Name</label>
                  <input
                    type="text"
                    value={newTarget.name}
                    onChange={(e) => setNewTarget({...newTarget, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Enter target name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Metric</label>
                  <select
                    value={newTarget.metric}
                    onChange={(e) => setNewTarget({...newTarget, metric: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="yield">Total Yield</option>
                    <option value="profit_margin">Profit Margin</option>
                    <option value="efficiency">Efficiency</option>
                    <option value="revenue">Revenue</option>
                    <option value="sustainability">Sustainability Score</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Target Value</label>
                    <input
                      type="number"
                      value={newTarget.target}
                      onChange={(e) => setNewTarget({...newTarget, target: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                    <select
                      value={newTarget.unit}
                      onChange={(e) => setNewTarget({...newTarget, unit: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="tons">tons</option>
                      <option value="tons/ha">tons/ha</option>
                      <option value="%">%</option>
                      <option value="ZMW">ZMW</option>
                      <option value="score">score</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Deadline</label>
                  <input
                    type="date"
                    value={newTarget.deadline}
                    onChange={(e) => setNewTarget({...newTarget, deadline: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button 
                  onClick={() => setShowTargetsModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveTarget}
                  className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Target className="w-4 h-4" />
                  <span>Set Target</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share Insights Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Share Analytics Insights</h3>
              <button 
                onClick={() => setShowShareModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Share Title</label>
                  <input
                    type="text"
                    value={shareConfig.title}
                    onChange={(e) => setShareConfig({...shareConfig, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Enter share title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    value={shareConfig.message}
                    onChange={(e) => setShareConfig({...shareConfig, message: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    rows={3}
                    placeholder="Enter your message"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Share Method</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { id: 'email', label: 'Email', icon: Mail },
                      { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
                      { id: 'sms', label: 'SMS', icon: Smartphone },
                      { id: 'social', label: 'Social Media', icon: Globe },
                      { id: 'link', label: 'Share Link', icon: Copy },
                      { id: 'print', label: 'Print', icon: Printer }
                    ].map((method) => {
                      const Icon = method.icon;
                      return (
                        <button
                          key={method.id}
                          onClick={() => setShareConfig({...shareConfig, platform: method.id})}
                          className={`p-3 border rounded-lg transition-colors flex flex-col items-center space-y-1 ${
                            shareConfig.platform === method.id
                              ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="text-xs font-medium">{method.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {(shareConfig.platform === 'email' || shareConfig.platform === 'sms') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {shareConfig.platform === 'email' ? 'Email Recipients' : 'Phone Numbers'}
                    </label>
                    <input
                      type="text"
                      value={shareConfig.recipients}
                      onChange={(e) => setShareConfig({...shareConfig, recipients: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder={shareConfig.platform === 'email' ? 'email1@example.com, email2@example.com' : '+260977123456, +260966234567'}
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Include</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={shareConfig.includeCharts}
                        onChange={(e) => setShareConfig({...shareConfig, includeCharts: e.target.checked})}
                        className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Charts and Visualizations</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={shareConfig.includeRecommendations}
                        onChange={(e) => setShareConfig({...shareConfig, includeRecommendations: e.target.checked})}
                        className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">AI Recommendations</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button 
                  onClick={() => setShowShareModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleShareInsights}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Share Insights</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;