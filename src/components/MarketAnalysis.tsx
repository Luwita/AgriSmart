import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Calendar, MapPin, Search, Filter, RefreshCw, AlertTriangle, Info } from 'lucide-react';

interface MarketPrice {
  id: string;
  crop: string;
  variety: string;
  currentPrice: number;
  previousPrice: number;
  change: number;
  changePercent: number;
  market: string;
  location: string;
  date: string;
  volume: number;
  quality: 'Premium' | 'Standard' | 'Low';
  trend: 'up' | 'down' | 'stable';
}

interface MarketTrend {
  crop: string;
  period: string;
  data: { date: string; price: number; volume: number }[];
  forecast: { date: string; predictedPrice: number; confidence: number }[];
}

interface MarketAlert {
  id: string;
  type: 'price_spike' | 'price_drop' | 'high_demand' | 'low_supply';
  crop: string;
  message: string;
  severity: 'high' | 'medium' | 'low';
  date: string;
}

const MarketAnalysis: React.FC = () => {
  const [marketPrices, setMarketPrices] = useState<MarketPrice[]>([]);
  const [marketTrends, setMarketTrends] = useState<MarketTrend[]>([]);
  const [marketAlerts, setMarketAlerts] = useState<MarketAlert[]>([]);
  const [selectedCrop, setSelectedCrop] = useState<string>('all');
  const [selectedMarket, setSelectedMarket] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'prices' | 'trends' | 'alerts'>('prices');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadMarketData();
  }, []);

  const loadMarketData = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setMarketPrices([
        {
          id: '1',
          crop: 'Maize',
          variety: 'White Maize',
          currentPrice: 2500,
          previousPrice: 2300,
          change: 200,
          changePercent: 8.7,
          market: 'Lusaka Central Market',
          location: 'Lusaka',
          date: '2024-01-15',
          volume: 1500,
          quality: 'Premium',
          trend: 'up'
        },
        {
          id: '2',
          crop: 'Soybeans',
          variety: 'Standard',
          currentPrice: 4200,
          previousPrice: 4500,
          change: -300,
          changePercent: -6.7,
          market: 'Ndola Market',
          location: 'Ndola',
          date: '2024-01-15',
          volume: 800,
          quality: 'Standard',
          trend: 'down'
        },
        {
          id: '3',
          crop: 'Groundnuts',
          variety: 'Valencia',
          currentPrice: 6800,
          previousPrice: 6750,
          change: 50,
          changePercent: 0.7,
          market: 'Chipata Market',
          location: 'Chipata',
          date: '2024-01-15',
          volume: 600,
          quality: 'Premium',
          trend: 'stable'
        },
        {
          id: '4',
          crop: 'Cotton',
          variety: 'Upland',
          currentPrice: 3200,
          previousPrice: 2900,
          change: 300,
          changePercent: 10.3,
          market: 'Kabwe Market',
          location: 'Kabwe',
          date: '2024-01-15',
          volume: 400,
          quality: 'Standard',
          trend: 'up'
        }
      ]);

      setMarketAlerts([
        {
          id: '1',
          type: 'price_spike',
          crop: 'Cotton',
          message: 'Cotton prices have increased by 10.3% in the last week due to high export demand.',
          severity: 'high',
          date: '2024-01-15'
        },
        {
          id: '2',
          type: 'price_drop',
          crop: 'Soybeans',
          message: 'Soybean prices dropped 6.7% following increased supply from neighboring regions.',
          severity: 'medium',
          date: '2024-01-14'
        },
        {
          id: '3',
          type: 'high_demand',
          crop: 'Maize',
          message: 'High demand for white maize expected to continue through the month.',
          severity: 'medium',
          date: '2024-01-13'
        }
      ]);

      setIsLoading(false);
    }, 1000);
  };

  const filteredPrices = marketPrices.filter(price => {
    const matchesCrop = selectedCrop === 'all' || price.crop.toLowerCase() === selectedCrop.toLowerCase();
    const matchesMarket = selectedMarket === 'all' || price.market.toLowerCase().includes(selectedMarket.toLowerCase());
    const matchesSearch = price.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         price.variety.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCrop && matchesMarket && matchesSearch;
  });

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <BarChart3 className="w-4 h-4 text-gray-500" />;
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'price_spike':
        return <TrendingUp className="w-5 h-5 text-green-500" />;
      case 'price_drop':
        return <TrendingDown className="w-5 h-5 text-red-500" />;
      case 'high_demand':
        return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Market Analysis</h1>
          <p className="text-gray-600 mt-1">Monitor crop prices, trends, and market opportunities</p>
        </div>
        <button
          onClick={loadMarketData}
          disabled={isLoading}
          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search crops or varieties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">All Crops</option>
            <option value="maize">Maize</option>
            <option value="soybeans">Soybeans</option>
            <option value="groundnuts">Groundnuts</option>
            <option value="cotton">Cotton</option>
          </select>

          <select
            value={selectedMarket}
            onChange={(e) => setSelectedMarket(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">All Markets</option>
            <option value="lusaka">Lusaka</option>
            <option value="ndola">Ndola</option>
            <option value="chipata">Chipata</option>
            <option value="kabwe">Kabwe</option>
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'prices', label: 'Current Prices', icon: DollarSign },
              { id: 'trends', label: 'Market Trends', icon: BarChart3 },
              { id: 'alerts', label: 'Market Alerts', icon: AlertTriangle }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'prices' && (
            <div className="space-y-4">
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <RefreshCw className="w-8 h-8 animate-spin text-green-600" />
                </div>
              ) : (
                <div className="grid gap-4">
                  {filteredPrices.map((price) => (
                    <div key={price.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {price.crop} - {price.variety}
                            </h3>
                            {getTrendIcon(price.trend)}
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              price.quality === 'Premium' ? 'bg-green-100 text-green-800' :
                              price.quality === 'Standard' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {price.quality}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{price.market}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{price.date}</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">
                            K{price.currentPrice.toLocaleString()}
                          </div>
                          <div className={`text-sm font-medium ${
                            price.change >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {price.change >= 0 ? '+' : ''}K{price.change} ({price.changePercent >= 0 ? '+' : ''}{price.changePercent}%)
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Volume: {price.volume} tons
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'trends' && (
            <div className="text-center py-12">
              <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Market Trends Analysis</h3>
              <p className="text-gray-600">
                Historical price trends and forecasting data will be displayed here.
              </p>
            </div>
          )}

          {activeTab === 'alerts' && (
            <div className="space-y-4">
              {marketAlerts.map((alert) => (
                <div key={alert.id} className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)}`}>
                  <div className="flex items-start space-x-3">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{alert.crop}</h4>
                        <span className="text-xs">{alert.date}</span>
                      </div>
                      <p className="text-sm mt-1">{alert.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketAnalysis;