import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  BarChart3, 
  Globe,
  Calendar,
  MapPin,
  AlertCircle,
  Target,
  Truck,
  Building,
  Phone,
  Mail,
  User,
  Star,
  Clock,
  CheckCircle,
  X,
  Search,
  Filter,
  MessageCircle
} from 'lucide-react';
import { zambianMarkets, zambianCropPrices, zambianBuyers, zambianExportMarkets } from '../data/zambianData';

const MarketAnalysis: React.FC = () => {
  const [selectedCrop, setSelectedCrop] = useState('maize');
  const [selectedMarket, setSelectedMarket] = useState('local');
  const [showBuyerModal, setShowBuyerModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedBuyer, setSelectedBuyer] = useState<any>(null);
  const [buyerFilters, setBuyerFilters] = useState({
    cropType: 'all',
    location: 'all',
    buyerType: 'all',
    minPrice: ''
  });

  const cropPrices = zambianCropPrices;
  const marketData = zambianMarkets;
  const buyers = zambianBuyers;
  const exportMarkets = zambianExportMarkets;

  const priceHistory = [
    { month: 'Jul 2024', price: 3600 },
    { month: 'Aug 2024', price: 3750 },
    { month: 'Sep 2024', price: 3900 },
    { month: 'Oct 2024', price: 4000 },
    { month: 'Nov 2024', price: 4150 },
    { month: 'Dec 2024', price: 4250 },
  ];

  const marketInsights = [
    {
      title: 'DRC Export Opportunity',
      description: 'Democratic Republic of Congo offering 15% premium for quality white maize',
      impact: 'High',
      timeframe: 'Next 30 days',
      action: 'Contact COMESA trade office',
      contact: '+260 211 254 894'
    },
    {
      title: 'FRA Purchase Program',
      description: 'Food Reserve Agency accepting maize at guaranteed ZMW 4,000/ton',
      impact: 'Medium',
      timeframe: 'Until March 2025',
      action: 'Prepare quality certificates',
      contact: '+260 211 123 456'
    },
    {
      title: 'Cotton Ginning Season',
      description: 'Cotton companies offering premium prices for early delivery',
      impact: 'High',
      timeframe: 'Next 60 days',
      action: 'Contact Dunavant/Cargill',
      contact: '+260 212 345 678'
    },
    {
      title: 'Soybean Processing Demand',
      description: 'Tiger Feeds and Zambeef increasing soybean procurement by 40%',
      impact: 'High',
      timeframe: 'Immediate',
      action: 'Contact processors directly',
      contact: '+260 211 987 654'
    }
  ];

  const crops = ['maize', 'soybeans', 'groundnuts', 'sunflower', 'cotton'];
  const markets = ['local', 'regional', 'export'];

  const currentPrice = cropPrices[selectedCrop as keyof typeof cropPrices];

  const getDemandColor = (demand: string) => {
    switch (demand.toLowerCase()) {
      case 'high': return 'text-emerald-600 bg-emerald-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-red-600 bg-red-100';
      case 'guaranteed': return 'text-blue-600 bg-blue-100';
      case 'urgent': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case 'high': return 'border-emerald-200 bg-emerald-50';
      case 'medium': return 'border-yellow-200 bg-yellow-50';
      case 'low': return 'border-blue-200 bg-blue-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getBuyerTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'processor': return 'bg-blue-100 text-blue-800';
      case 'exporter': return 'bg-green-100 text-green-800';
      case 'government': return 'bg-purple-100 text-purple-800';
      case 'cooperative': return 'bg-orange-100 text-orange-800';
      case 'trader': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredBuyers = buyers.filter(buyer => {
    if (buyerFilters.cropType !== 'all' && !buyer.cropsWanted.includes(buyerFilters.cropType)) return false;
    if (buyerFilters.location !== 'all' && buyer.location !== buyerFilters.location) return false;
    if (buyerFilters.buyerType !== 'all' && buyer.type !== buyerFilters.buyerType) return false;
    if (buyerFilters.minPrice && buyer.priceOffered < parseInt(buyerFilters.minPrice)) return false;
    return true;
  });

  const handleContactBuyer = (buyer: any) => {
    setSelectedBuyer(buyer);
    setShowContactModal(true);
  };

  const handleSendMessage = () => {
    // Here you would integrate with SMS/WhatsApp/Email service
    alert(`Message sent to ${selectedBuyer.name}! They will contact you within 24 hours.`);
    setShowContactModal(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Market Analysis</h1>
          <p className="text-gray-600 mt-1">Real-time Zambian market prices and demand forecasting</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-2">
          <button 
            onClick={() => setShowBuyerModal(true)}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
          >
            <Truck className="w-4 h-4" />
            <span>Find Buyers</span>
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <BarChart3 className="w-4 h-4" />
            <span>Price Alerts</span>
          </button>
        </div>
      </div>

      {/* Zambian Market Context */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-lg shadow-sm text-white p-6">
        <h3 className="text-lg font-bold mb-3">🇿🇲 Zambian Market Update</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-semibold mb-1">Currency</h4>
            <p className="text-sm opacity-90">All prices in Zambian Kwacha (ZMW)</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-semibold mb-1">FRA Program</h4>
            <p className="text-sm opacity-90">Government guaranteed purchase at ZMW 4,000/ton</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-semibold mb-1">Export Markets</h4>
            <p className="text-sm opacity-90">DRC, Tanzania, Malawi - Premium prices available</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-semibold mb-1">Active Buyers</h4>
            <p className="text-sm opacity-90">{buyers.length} verified buyers seeking crops</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Crop</label>
            <div className="flex flex-wrap gap-2">
              {crops.map((crop) => (
                <button
                  key={crop}
                  onClick={() => setSelectedCrop(crop)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors capitalize ${
                    selectedCrop === crop
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {crop}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Market Scope</label>
            <div className="flex flex-wrap gap-2">
              {markets.map((market) => (
                <button
                  key={market}
                  onClick={() => setSelectedMarket(market)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors capitalize ${
                    selectedMarket === market
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {market}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Price Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Current Price</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                ZMW {currentPrice.current.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600 mt-1">{currentPrice.unit}</p>
            </div>
            <div className="p-3 bg-emerald-100 rounded-full">
              <DollarSign className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Price Change</p>
              <div className="flex items-center mt-2">
                {currentPrice.trend === 'up' ? (
                  <TrendingUp className="w-5 h-5 text-emerald-600 mr-1" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-red-600 mr-1" />
                )}
                <p className={`text-2xl font-bold ${
                  currentPrice.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
                }`}>
                  {currentPrice.change > 0 ? '+' : ''}{currentPrice.change}%
                </p>
              </div>
              <p className="text-sm text-gray-600 mt-1">vs last month</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">FRA Price</p>
              <p className="text-2xl font-bold text-blue-600 mt-2">
                {currentPrice.fraPrice ? `ZMW ${currentPrice.fraPrice.toLocaleString()}` : 'N/A'}
              </p>
              <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-2">
                GUARANTEED
              </span>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Building className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Export Price</p>
              <p className="text-2xl font-bold text-purple-600 mt-2">
                {currentPrice.exportPrice ? `ZMW ${currentPrice.exportPrice.toLocaleString()}` : 'N/A'}
              </p>
              <p className="text-sm text-gray-600 mt-1">Regional markets</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Globe className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Market Locations */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            Zambian Markets & Trading Centers
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {marketData.map((market, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">{market.market}</h4>
                    <p className="text-sm text-gray-600 flex items-center mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      {market.location} • {market.distance}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDemandColor(market.demand)}`}>
                    {market.demand}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-sm text-gray-600">Price (ZMW)</p>
                    <p className="font-semibold text-lg text-emerald-600">ZMW {market.price.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Last Updated</p>
                    <p className="font-medium text-gray-900">{market.lastUpdate}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="w-4 h-4 mr-1" />
                    {market.contact}
                  </div>
                  <button className="bg-emerald-600 text-white px-3 py-1 rounded text-sm hover:bg-emerald-700 transition-colors">
                    Contact
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Export Markets */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Globe className="w-5 h-5 mr-2" />
            Regional Export Markets
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exportMarkets.map((market, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">{market.country}</h4>
                  <span className="text-2xl">{market.flag}</span>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Premium:</span>
                    <span className="font-semibold text-emerald-600">{market.premium}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Volume:</span>
                    <span className="font-medium">{market.volume}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Requirements:</span>
                    <span className="font-medium">{market.requirements}</span>
                  </div>
                </div>
                
                <button className="w-full mt-3 bg-blue-600 text-white py-2 rounded text-sm hover:bg-blue-700 transition-colors">
                  Export Inquiry
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Price History Chart */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Price Trend - {selectedCrop.charAt(0).toUpperCase() + selectedCrop.slice(1)} (ZMW/ton)</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {priceHistory.map((data, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 w-20">{data.month}</span>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-emerald-500 h-3 rounded-full"
                      style={{ width: `${(data.price / 5000) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-sm text-gray-600 min-w-[5rem] text-right">ZMW {data.price.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Market Insights */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Globe className="w-5 h-5 mr-2" />
            Zambian Market Insights & Opportunities
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {marketInsights.map((insight, index) => (
              <div key={index} className={`border rounded-lg p-4 ${getImpactColor(insight.impact)}`}>
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    insight.impact === 'High' ? 'bg-emerald-100 text-emerald-800' :
                    insight.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {insight.impact}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-3">{insight.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">{insight.timeframe}</span>
                  <div className="flex space-x-2">
                    <button className="text-xs bg-gray-900 text-white px-2 py-1 rounded hover:bg-gray-800 transition-colors">
                      {insight.action}
                    </button>
                    <button className="text-xs bg-emerald-600 text-white px-2 py-1 rounded hover:bg-emerald-700 transition-colors flex items-center space-x-1">
                      <Phone className="w-3 h-3" />
                      <span>Call</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Find Buyers Modal */}
      {showBuyerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Find Verified Buyers in Zambia</h3>
              <button 
                onClick={() => setShowBuyerModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Buyer Filters */}
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Crop Type</label>
                  <select 
                    value={buyerFilters.cropType}
                    onChange={(e) => setBuyerFilters({...buyerFilters, cropType: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="all">All Crops</option>
                    <option value="maize">Maize</option>
                    <option value="soybeans">Soybeans</option>
                    <option value="groundnuts">Groundnuts</option>
                    <option value="sunflower">Sunflower</option>
                    <option value="cotton">Cotton</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <select 
                    value={buyerFilters.location}
                    onChange={(e) => setBuyerFilters({...buyerFilters, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="all">All Locations</option>
                    <option value="Lusaka">Lusaka</option>
                    <option value="Ndola">Ndola</option>
                    <option value="Kitwe">Kitwe</option>
                    <option value="Chipata">Chipata</option>
                    <option value="Livingstone">Livingstone</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Buyer Type</label>
                  <select 
                    value={buyerFilters.buyerType}
                    onChange={(e) => setBuyerFilters({...buyerFilters, buyerType: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="all">All Types</option>
                    <option value="processor">Processor</option>
                    <option value="exporter">Exporter</option>
                    <option value="government">Government</option>
                    <option value="cooperative">Cooperative</option>
                    <option value="trader">Trader</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min Price (ZMW)</label>
                  <input 
                    type="number"
                    value={buyerFilters.minPrice}
                    onChange={(e) => setBuyerFilters({...buyerFilters, minPrice: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    placeholder="Minimum price"
                  />
                </div>
              </div>
            </div>

            {/* Buyers List */}
            <div className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-gray-600">{filteredBuyers.length} buyers found</p>
                <div className="flex items-center space-x-2">
                  <Search className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-500">Verified buyers only</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredBuyers.map((buyer, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{buyer.name}</h4>
                        <p className="text-sm text-gray-600 flex items-center mt-1">
                          <MapPin className="w-4 h-4 mr-1" />
                          {buyer.location}
                        </p>
                        <div className="flex items-center mt-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBuyerTypeColor(buyer.type)}`}>
                            {buyer.type}
                          </span>
                          {buyer.verified && (
                            <CheckCircle className="w-4 h-4 text-emerald-600 ml-2" />
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < buyer.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{buyer.rating}/5 rating</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Crops Wanted:</span>
                        <span className="font-medium">{buyer.cropsWanted.join(', ')}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Price Offered:</span>
                        <span className="font-semibold text-emerald-600">ZMW {buyer.priceOffered.toLocaleString()}/ton</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Quantity Needed:</span>
                        <span className="font-medium">{buyer.quantityNeeded}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Payment Terms:</span>
                        <span className="font-medium text-blue-600">{buyer.paymentTerms}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleContactBuyer(buyer)}
                        className="flex-1 bg-emerald-600 text-white py-2 px-3 rounded text-sm hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-1"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Connect</span>
                      </button>
                      <button className="p-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors">
                        <Phone className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors">
                        <Mail className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Buyer Modal */}
      {showContactModal && selectedBuyer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Contact {selectedBuyer.name}</h3>
              <button 
                onClick={() => setShowContactModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 mb-2">Buyer Information</h4>
                <div className="bg-gray-50 rounded-lg p-3 space-y-1 text-sm">
                  <p><strong>Company:</strong> {selectedBuyer.name}</p>
                  <p><strong>Location:</strong> {selectedBuyer.location}</p>
                  <p><strong>Type:</strong> {selectedBuyer.type}</p>
                  <p><strong>Price:</strong> ZMW {selectedBuyer.priceOffered.toLocaleString()}/ton</p>
                  <p><strong>Payment:</strong> {selectedBuyer.paymentTerms}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  rows={4}
                  placeholder="Hello, I have quality maize available for sale. I'm interested in your offer..."
                  defaultValue={`Hello ${selectedBuyer.name},

I have quality ${selectedCrop} available for sale. I'm interested in your offer of ZMW ${selectedBuyer.priceOffered.toLocaleString()}/ton.

Please contact me to discuss details.

Best regards,
[Your Name]`}
                />
              </div>
              
              <div className="flex space-x-3">
                <button 
                  onClick={() => setShowContactModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSendMessage}
                  className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketAnalysis;