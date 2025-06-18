import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  Calendar, 
  Download, 
  Filter, 
  ChevronRight, 
  Sprout, 
  DollarSign, 
  Droplets, 
  Leaf, 
  Target, 
  AlertTriangle, 
  CheckCircle, 
  X, 
  FileText, 
  Mail, 
  Bell
} from 'lucide-react';

const MobileAnalytics: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');
  const [selectedAnalytics, setSelectedAnalytics] = useState('dashboard');
  const [showReportModal, setShowReportModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);

  // Analytics types
  const analyticsTypes = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'crops', name: 'Crops', icon: Sprout },
    { id: 'financial', name: 'Financial', icon: DollarSign },
    { id: 'reports', name: 'Reports', icon: FileText }
  ];

  // Sample analytics data
  const analyticsData = {
    overview: {
      totalFarms: 2,
      totalCrops: 5,
      totalArea: 25,
      totalYield: 14.8
    },
    performance: {
      averageYield: 5.2,
      profitMargin: 38.2,
      efficiency: 85.4,
      sustainabilityScore: 78.9
    },
    inventory: {
      totalItems: 12,
      totalValue: 16050,
      lowStockItems: 2
    },
    trends: {
      yieldTrend: 'increasing',
      profitTrend: 'stable',
      efficiencyTrend: 'increasing'
    }
  };

  // Crop analytics
  const cropAnalytics = [
    {
      name: 'Maize',
      area: 15,
      health: 92,
      yieldPrediction: 6.5,
      status: 'excellent'
    },
    {
      name: 'Soybeans',
      area: 8,
      health: 87,
      yieldPrediction: 2.2,
      status: 'good'
    },
    {
      name: 'Groundnuts',
      area: 5,
      health: 78,
      yieldPrediction: 1.8,
      status: 'fair'
    }
  ];

  // Financial analytics
  const financialAnalytics = {
    summary: {
      totalRevenue: 68500,
      totalCosts: 42300,
      totalProfit: 26200,
      profitMargin: 38.2,
      inventoryValue: 15600
    },
    breakdown: {
      expensesByCategory: {
        seeds: 5000,
        fertilizers: 8000,
        pesticides: 3000,
        labor: 12000,
        equipment: 4000,
        fuel: 2500,
        other: 2000
      }
    }
  };

  // Report templates
  const reportTemplates = [
    { id: 1, name: 'Profit & Loss Statement', description: 'Comprehensive P&L for tax filing' },
    { id: 2, name: 'Cash Flow Report', description: 'Monthly cash flow analysis' },
    { id: 3, name: 'Crop Performance Report', description: 'Yield and profitability by crop' },
    { id: 4, name: 'Sustainability Report', description: 'Environmental impact metrics' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-emerald-600 bg-emerald-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'fair': return 'text-yellow-600 bg-yellow-100';
      case 'poor': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'increasing': return 'text-emerald-600';
      case 'decreasing': return 'text-red-600';
      case 'stable': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="p-4 space-y-4 pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 text-sm">Farm performance insights</p>
        </div>
        <button 
          onClick={() => setShowReportModal(true)}
          className="bg-emerald-600 text-white p-2 rounded-xl hover:bg-emerald-700 transition-colors"
        >
          <Download className="w-5 h-5" />
        </button>
      </div>

      {/* Zambian Analytics Context */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-xl text-white p-4">
        <h3 className="font-bold mb-2">🇿🇲 Zambian Farm Analytics</h3>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-white bg-opacity-20 rounded-lg p-2">
            <p className="font-medium">Regional Comparison</p>
            <p className="opacity-90">Compare with Zambian averages</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-2">
            <p className="font-medium">AI Predictions</p>
            <p className="opacity-90">Customized for Zambian climate</p>
          </div>
        </div>
      </div>

      {/* Analytics Type Selector */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
        <div className="flex overflow-x-auto pb-2 space-x-2">
          {analyticsTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => setSelectedAnalytics(type.id)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center space-x-1 whitespace-nowrap ${
                  selectedAnalytics === type.id
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{type.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Timeframe Selector */}
      <div className="flex space-x-2">
        {['week', 'month', 'quarter', 'year'].map((timeframe) => (
          <button
            key={timeframe}
            onClick={() => setSelectedTimeframe(timeframe)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              selectedTimeframe === timeframe
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
          </button>
        ))}
      </div>

      {/* Dashboard Analytics */}
      {selectedAnalytics === 'dashboard' && (
        <div className="space-y-4">
          {/* Overview Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-xl p-3 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600">Total Crops</p>
                  <p className="text-lg font-bold text-gray-900 mt-1">{analyticsData.overview.totalCrops}</p>
                </div>
                <div className="p-2 bg-emerald-100 rounded-full">
                  <Sprout className="w-5 h-5 text-emerald-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-3 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600">Total Yield</p>
                  <p className="text-lg font-bold text-blue-600 mt-1">{analyticsData.overview.totalYield} tons</p>
                </div>
                <div className="p-2 bg-blue-100 rounded-full">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-xl p-3 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600">Profit Margin</p>
                  <p className="text-lg font-bold text-green-600 mt-1">{analyticsData.performance.profitMargin}%</p>
                </div>
                <div className="p-2 bg-green-100 rounded-full">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-3 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600">Efficiency</p>
                  <p className="text-lg font-bold text-purple-600 mt-1">{analyticsData.performance.efficiency}%</p>
                </div>
                <div className="p-2 bg-purple-100 rounded-full">
                  <Target className="w-5 h-5 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Performance Trends */}
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <h3 className="font-medium text-gray-900 mb-3 text-sm">Performance Trends</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Sprout className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm text-gray-700">Yield Trend</span>
                </div>
                <div className="flex items-center">
                  <TrendingUp className={`w-4 h-4 mr-1 ${getTrendColor(analyticsData.trends.yieldTrend)}`} />
                  <span className={`text-sm font-medium ${getTrendColor(analyticsData.trends.yieldTrend)}`}>
                    {analyticsData.trends.yieldTrend}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Profit Trend</span>
                </div>
                <div className="flex items-center">
                  <TrendingUp className={`w-4 h-4 mr-1 ${getTrendColor(analyticsData.trends.profitTrend)}`} />
                  <span className={`text-sm font-medium ${getTrendColor(analyticsData.trends.profitTrend)}`}>
                    {analyticsData.trends.profitTrend}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-gray-700">Efficiency Trend</span>
                </div>
                <div className="flex items-center">
                  <TrendingUp className={`w-4 h-4 mr-1 ${getTrendColor(analyticsData.trends.efficiencyTrend)}`} />
                  <span className={`text-sm font-medium ${getTrendColor(analyticsData.trends.efficiencyTrend)}`}>
                    {analyticsData.trends.efficiencyTrend}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Insights */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-white p-4">
            <h3 className="font-bold mb-2 flex items-center">
              <Target className="w-4 h-4 mr-2" />
              AI Insights
            </h3>
            <div className="space-y-2">
              <div className="bg-white bg-opacity-20 rounded-lg p-3">
                <h4 className="font-medium text-sm mb-1">Yield Optimization</h4>
                <p className="text-xs opacity-90">Increase D-Compound application in Block A by 15% to improve maize yield potential.</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-3">
                <h4 className="font-medium text-sm mb-1">Cost Reduction</h4>
                <p className="text-xs opacity-90">Switch to drip irrigation to reduce water usage by 30% and save ZMW 450/month.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Crop Analytics */}
      {selectedAnalytics === 'crops' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <h3 className="font-medium text-gray-900 mb-3 text-sm">Crop Performance</h3>
            <div className="space-y-3">
              {cropAnalytics.map((crop, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <Sprout className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{crop.name}</p>
                      <p className="text-xs text-gray-600">{crop.area} hectares</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-emerald-600">{crop.health}%</p>
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(crop.status)}`}>
                      {crop.status}
                    </span>
                    <div className="w-12 bg-gray-200 rounded-full h-1.5 mt-1">
                      <div
                        className="bg-emerald-500 h-1.5 rounded-full"
                        style={{ width: `${crop.health}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <h3 className="font-medium text-gray-900 mb-3 text-sm">Yield Predictions</h3>
            <div className="space-y-3">
              {cropAnalytics.map((crop, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{crop.name}</p>
                    <p className="text-xs text-gray-600">{crop.area} hectares</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-blue-600">{crop.yieldPrediction} tons/ha</p>
                    <p className="text-xs text-gray-600">Total: {(crop.yieldPrediction * crop.area).toFixed(1)} tons</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <h3 className="font-medium text-yellow-800 mb-3 text-sm flex items-center">
              <Leaf className="w-4 h-4 mr-2" />
              Crop Recommendations
            </h3>
            <div className="space-y-2">
              <div className="bg-white rounded-lg p-3">
                <h4 className="font-medium text-gray-900 mb-1 text-sm">Maize Management</h4>
                <p className="text-xs text-gray-600">Apply top dressing fertilizer within the next 7 days for optimal yield.</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <h4 className="font-medium text-gray-900 mb-1 text-sm">Pest Control</h4>
                <p className="text-xs text-gray-600">Monitor for fall armyworm in maize fields. Early detection is critical.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Financial Analytics */}
      {selectedAnalytics === 'financial' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-xl p-3 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600">Total Revenue</p>
                  <p className="text-lg font-bold text-emerald-600 mt-1">
                    ZMW {financialAnalytics.summary.totalRevenue.toLocaleString()}
                  </p>
                </div>
                <div className="p-2 bg-emerald-100 rounded-full">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-3 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600">Total Costs</p>
                  <p className="text-lg font-bold text-red-600 mt-1">
                    ZMW {financialAnalytics.summary.totalCosts.toLocaleString()}
                  </p>
                </div>
                <div className="p-2 bg-red-100 rounded-full">
                  <DollarSign className="w-5 h-5 text-red-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-xl p-3 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600">Net Profit</p>
                  <p className="text-lg font-bold text-blue-600 mt-1">
                    ZMW {financialAnalytics.summary.totalProfit.toLocaleString()}
                  </p>
                </div>
                <div className="p-2 bg-blue-100 rounded-full">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-3 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600">Profit Margin</p>
                  <p className="text-lg font-bold text-purple-600 mt-1">
                    {financialAnalytics.summary.profitMargin}%
                  </p>
                </div>
                <div className="p-2 bg-purple-100 rounded-full">
                  <PieChart className="w-5 h-5 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Expense Breakdown */}
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <h3 className="font-medium text-gray-900 mb-3 text-sm">Expense Breakdown</h3>
            <div className="space-y-3">
              {Object.entries(financialAnalytics.breakdown.expensesByCategory).map(([category, amount], index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 capitalize">{category}</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-24 bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-blue-500 h-1.5 rounded-full"
                        style={{ width: `${(amount as number / financialAnalytics.summary.totalCosts) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      ZMW {(amount as number).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Insights */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white p-4">
            <h3 className="font-bold mb-2 flex items-center">
              <DollarSign className="w-4 h-4 mr-2" />
              Financial Insights
            </h3>
            <div className="space-y-2">
              <div className="bg-white bg-opacity-20 rounded-lg p-3">
                <h4 className="font-medium text-sm mb-1">Cost Optimization</h4>
                <p className="text-xs opacity-90">Bulk purchase of fertilizer could save up to ZMW 1,200 next season.</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-3">
                <h4 className="font-medium text-sm mb-1">Revenue Opportunity</h4>
                <p className="text-xs opacity-90">Selling to export markets could increase maize revenue by 15%.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reports */}
      {selectedAnalytics === 'reports' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <h3 className="font-medium text-gray-900 mb-3 text-sm">Report Templates</h3>
            <div className="space-y-3">
              {reportTemplates.map((template) => (
                <div key={template.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{template.name}</p>
                    <p className="text-xs text-gray-600">{template.description}</p>
                  </div>
                  <button className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <h3 className="font-medium text-gray-900 mb-3 text-sm">Configure Alerts</h3>
            <button 
              onClick={() => setShowAlertModal(true)}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Bell className="w-4 h-4" />
              <span>Set Up New Alert</span>
            </button>
          </div>

          {/* Active Alerts */}
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <h3 className="font-medium text-gray-900 mb-3 text-sm">Active Alerts</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <AlertTriangle className="w-4 h-4 text-blue-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-blue-800 text-sm">Price Alert</h4>
                  <p className="text-xs text-blue-700 mt-1">Alert when maize price exceeds ZMW 4,500/ton</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-yellow-800 text-sm">Inventory Alert</h4>
                  <p className="text-xs text-yellow-700 mt-1">Alert when fertilizer stock falls below 10 bags</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Generate Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col">
          <div className="bg-white rounded-t-2xl mt-auto max-h-[90vh] overflow-y-auto w-full">
            <div className="sticky top-0 bg-white px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Generate Report</h3>
              <button 
                onClick={() => setShowReportModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Report Title</label>
                <input 
                  type="text"
                  className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="e.g., Farm Performance Report"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                <select className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                  <option value="">Select report type</option>
                  <option value="profit_loss">Profit & Loss Statement</option>
                  <option value="cash_flow">Cash Flow Report</option>
                  <option value="crop_performance">Crop Performance Report</option>
                  <option value="sustainability">Sustainability Report</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
                <select className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                  <option value="month">Current Month</option>
                  <option value="quarter">Current Quarter</option>
                  <option value="year">Current Year</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                <div className="grid grid-cols-2 gap-3">
                  <button className="p-3 rounded-lg border-2 border-emerald-500 bg-emerald-50 text-emerald-700">
                    <FileText className="w-5 h-5 mx-auto mb-1" />
                    <span className="text-sm font-medium">PDF</span>
                  </button>
                  <button className="p-3 rounded-lg border-2 border-gray-200 hover:border-gray-300">
                    <FileText className="w-5 h-5 mx-auto mb-1" />
                    <span className="text-sm font-medium">Excel</span>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="includeCharts"
                    className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    defaultChecked
                  />
                  <label htmlFor="includeCharts" className="ml-2 text-sm text-gray-700">
                    Include charts and visualizations
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="includeComparison"
                    className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    defaultChecked
                  />
                  <label htmlFor="includeComparison" className="ml-2 text-sm text-gray-700">
                    Include regional comparison
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="includeRecommendations"
                    className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    defaultChecked
                  />
                  <label htmlFor="includeRecommendations" className="ml-2 text-sm text-gray-700">
                    Include AI recommendations
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Report To</label>
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="email"
                      className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Enter email address"
                    />
                  </div>
                  <button className="bg-blue-600 text-white px-3 py-2 rounded-xl hover:bg-blue-700 transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button 
                  onClick={() => setShowReportModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-xl hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setShowReportModal(false)}
                  className="flex-1 bg-emerald-600 text-white py-3 px-4 rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Generate Report</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Configure Alert Modal */}
      {showAlertModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col">
          <div className="bg-white rounded-t-2xl mt-auto max-h-[90vh] overflow-y-auto w-full">
            <div className="sticky top-0 bg-white px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Configure Alert</h3>
              <button 
                onClick={() => setShowAlertModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Alert Type</label>
                <select className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                  <option value="">Select alert type</option>
                  <option value="price">Price Alert</option>
                  <option value="weather">Weather Alert</option>
                  <option value="inventory">Inventory Alert</option>
                  <option value="crop">Crop Health Alert</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Metric</label>
                <select className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                  <option value="">Select metric</option>
                  <option value="maize_price">Maize Price</option>
                  <option value="soybean_price">Soybean Price</option>
                  <option value="fertilizer_stock">Fertilizer Stock</option>
                  <option value="rainfall">Rainfall</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
                  <select className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                    <option value="above">Above</option>
                    <option value="below">Below</option>
                    <option value="equal">Equal to</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Threshold Value</label>
                  <input 
                    type="number"
                    className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="e.g., 4500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notification Method</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="notifyApp"
                      className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      defaultChecked
                    />
                    <label htmlFor="notifyApp" className="ml-2 text-sm text-gray-700">
                      In-app notification
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="notifyEmail"
                      className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      defaultChecked
                    />
                    <label htmlFor="notifyEmail" className="ml-2 text-sm text-gray-700">
                      Email notification
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="notifySMS"
                      className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <label htmlFor="notifySMS" className="ml-2 text-sm text-gray-700">
                      SMS notification
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button 
                  onClick={() => setShowAlertModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-xl hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setShowAlertModal(false)}
                  className="flex-1 bg-emerald-600 text-white py-3 px-4 rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Bell className="w-4 h-4" />
                  <span>Set Alert</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileAnalytics;