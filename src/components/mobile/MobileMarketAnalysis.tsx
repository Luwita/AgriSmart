import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  BarChart3, 
  Globe,
  Calendar,
  MapPin,
  AlertTriangle,
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
  MessageCircle,
  ChevronRight,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { zambianCropPrices, zambianMarkets, zambianBuyers } from '../../data/zambianData';

const MobileMarketAnalysis: React.FC = () => {
  const [selectedCrop, setSelectedCrop] = useState('maize');
  const [showBuyerModal, setShowBuyerModal] = useState(false);
  const [selectedBuyer, setSelectedBuyer] = useState<any>(null);
  const [showBuyerDetails, setShowBuyerDetails] = useState(false);
  const [expandedMarket, setExpandedMarket] = useState<number | null>(null);

  const cropPrices = zambianCropPrices;
  const markets = zambianMarkets;
  const buyers = zambianBuyers;

  const crops = ['maize', 'soybeans', 'groundnuts', 'sunflower', 'cotton'];

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

  const handleViewBuyer = (buyer: any) => {
    setSelectedBuyer(buyer);
    setShowBuyerDetails(true);
  };

  const toggleMarketExpand = (index: number) => {
    setExpandedMarket(expandedMarket === index ? null : index);
  };

  return (
    <div className="p-4 space-y-4 pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Market Prices</h1>
          <p className="text-gray-600 text-sm">Real-time Zambian market data</p>
        </div>
        <button 
          onClick={() => setShowBuyerModal(true)}
          className="bg-emerald-600 text-white p-2 rounded-xl hover:bg-emerald-700 transition-colors"
        >
          <Truck className="w-5 h-5" />
        </button>
      </div>

      {/* Zambian Market Context */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl text-white p-4">
        <h3 className="font-bold mb-2">🇿🇲 Zambian Market Update</h3>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-white bg-opacity-20 rounded-lg p-2">
            <p className="font-medium">FRA Program</p>
            <p className="opacity-90">ZMW 4,000/ton guaranteed</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-2">
            <p className="font-medium">Export Markets</p>
            <p className="opacity-90">DRC, Tanzania, Malawi</p>
          </div>
        </div>
      </div>

      {/* Crop Selector */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
        <h3 className="font-medium text-gray-900 mb-3">Select Crop</h3>
        <div className="flex flex-wrap gap-2">
          {crops.map((crop) => (
            <button
              key={crop}
              onClick={() => setSelectedCrop(crop)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                selectedCrop === crop
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {crop}
            </button>
          ))}
        </div>
      </div>

      {/* Price Overview */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">Current Price</p>
              <p className="text-xl font-bold text-gray-900 mt-1">
                ZMW {currentPrice.current.toLocaleString()}
              </p>
              <p className="text-xs text-gray-600 mt-1">{currentPrice.unit}</p>
            </div>
            <div className="p-2 bg-emerald-100 rounded-full">
              <DollarSign className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">Price Change</p>
              <div className="flex items-center mt-1">
                {currentPrice.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 text-emerald-600 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                )}
                <p className={`text-xl font-bold ${
                  currentPrice.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
                }`}>
                  {currentPrice.change > 0 ? '+' : ''}{currentPrice.change}%
                </p>
              </div>
              <p className="text-xs text-gray-600 mt-1">vs last month</p>
            </div>
          </div>
        </div>
      </div>

      {/* FRA & Export Prices */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">FRA Price</p>
              <p className="text-lg font-bold text-blue-600 mt-1">
                {currentPrice.fraPrice ? `ZMW ${currentPrice.fraPrice.toLocaleString()}` : 'N/A'}
              </p>
              {currentPrice.fraPrice && (
                <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                  GUARANTEED
                </span>
              )}
            </div>
            <div className="p-2 bg-blue-100 rounded-full">
              <Building className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">Export Price</p>
              <p className="text-lg font-bold text-purple-600 mt-1">
                {currentPrice.exportPrice ? `ZMW ${currentPrice.exportPrice.toLocaleString()}` : 'N/A'}
              </p>
              <p className="text-xs text-gray-600 mt-1">Regional markets</p>
            </div>
            <div className="p-2 bg-purple-100 rounded-full">
              <Globe className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Market Locations */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
        <h3 className="font-medium text-gray-900 mb-3 flex items-center">
          <MapPin className="w-4 h-4 mr-2" />
          Zambian Markets
        </h3>
        <div className="space-y-3">
          {markets.slice(0, 4).map((market, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <div 
                className="p-3 flex items-start justify-between cursor-pointer"
                onClick={() => toggleMarketExpand(index)}
              >
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">{market.market}</h4>
                  <p className="text-xs text-gray-600 flex items-center mt-1">
                    <MapPin className="w-3 h-3 mr-1" />
                    {market.location} • {market.distance}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDemandColor(market.demand)}`}>
                    {market.demand}
                  </span>
                  {expandedMarket === index ? (
                    <ChevronUp className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              </div>
              
              {expandedMarket === index && (
                <div className="p-3 border-t border-gray-200 bg-gray-50">
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <p className="text-xs text-gray-600">Price (ZMW)</p>
                      <p className="font-semibold text-emerald-600">ZMW {market.price.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Last Updated</p>
                      <p className="font-medium text-gray-900">{market.lastUpdate}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-600">
                      <Phone className="w-3 h-3 mr-1" />
                      {market.contact}
                    </div>
                    <button className="bg-emerald-600 text-white px-3 py-1 rounded text-xs">
                      Contact
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Market Insights */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
        <h3 className="font-medium text-gray-900 mb-3 flex items-center">
          <Globe className="w-4 h-4 mr-2" />
          Market Insights
        </h3>
        <div className="space-y-3">
          <div className="border border-emerald-200 bg-emerald-50 rounded-lg p-3">
            <h4 className="font-medium text-emerald-800 mb-1 text-sm">DRC Export Opportunity</h4>
            <p className="text-xs text-emerald-700">Democratic Republic of Congo offering 15% premium for quality white maize.</p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-emerald-600">High Impact</span>
              <button className="text-xs bg-emerald-600 text-white px-2 py-1 rounded">
                Details
              </button>
            </div>
          </div>
          <div className="border border-blue-200 bg-blue-50 rounded-lg p-3">
            <h4 className="font-medium text-blue-800 mb-1 text-sm">FRA Purchase Program</h4>
            <p className="text-xs text-blue-700">Food Reserve Agency accepting maize at guaranteed ZMW 4,000/ton.</p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-blue-600">Medium Impact</span>
              <button className="text-xs bg-blue-600 text-white px-2 py-1 rounded">
                Details
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Find Buyers Modal */}
      {showBuyerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col">
          <div className="bg-white rounded-t-2xl mt-auto max-h-[90vh] overflow-y-auto w-full">
            <div className="sticky top-0 bg-white px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Find Buyers</h3>
              <button 
                onClick={() => setShowBuyerModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              {/* Search & Filter */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search buyers..."
                  className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              
              <div className="flex overflow-x-auto space-x-2 pb-2">
                <button className="px-3 py-2 bg-emerald-600 text-white rounded-lg text-xs whitespace-nowrap">
                  All Buyers
                </button>
                <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-xs whitespace-nowrap">
                  Maize
                </button>
                <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-xs whitespace-nowrap">
                  Soybeans
                </button>
                <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-xs whitespace-nowrap">
                  Lusaka
                </button>
                <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-xs whitespace-nowrap">
                  Processors
                </button>
              </div>

              {/* Buyers List */}
              <div className="space-y-3">
                {buyers.slice(0, 5).map((buyer, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">{buyer.name}</h4>
                        <p className="text-xs text-gray-600 flex items-center mt-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          {buyer.location}
                        </p>
                        <div className="flex items-center mt-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBuyerTypeColor(buyer.type)}`}>
                            {buyer.type}
                          </span>
                          {buyer.verified && (
                            <CheckCircle className="w-3 h-3 text-emerald-600 ml-2" />
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < buyer.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-1 mb-3">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Crops:</span>
                        <span className="font-medium">{buyer.cropsWanted.join(', ')}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Price:</span>
                        <span className="font-semibold text-emerald-600">ZMW {buyer.priceOffered.toLocaleString()}/ton</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Quantity:</span>
                        <span className="font-medium">{buyer.quantityNeeded}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleViewBuyer(buyer)}
                        className="flex-1 bg-emerald-600 text-white py-2 px-3 rounded-lg text-xs font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-1"
                      >
                        <MessageCircle className="w-3 h-3" />
                        <span>Connect</span>
                      </button>
                      <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                        <Phone className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Buyer Details Modal */}
      {showBuyerDetails && selectedBuyer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col">
          <div className="bg-white rounded-t-2xl mt-auto max-h-[90vh] overflow-y-auto w-full">
            <div className="sticky top-0 bg-white px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Buyer Details</h3>
              <button 
                onClick={() => setShowBuyerDetails(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-emerald-100 rounded-full">
                  <Building className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{selectedBuyer.name}</h4>
                  <p className="text-sm text-gray-600">{selectedBuyer.type}</p>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Location:</span>
                  <span className="text-sm font-medium text-gray-900">{selectedBuyer.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Price Offered:</span>
                  <span className="text-sm font-semibold text-emerald-600">ZMW {selectedBuyer.priceOffered.toLocaleString()}/ton</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Quantity Needed:</span>
                  <span className="text-sm font-medium text-gray-900">{selectedBuyer.quantityNeeded}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Payment Terms:</span>
                  <span className="text-sm font-medium text-blue-600">{selectedBuyer.paymentTerms}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Crops Wanted:</span>
                  <span className="text-sm font-medium text-gray-900">{selectedBuyer.cropsWanted.join(', ')}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-900">{selectedBuyer.contact}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-900">{selectedBuyer.email}</span>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-xl p-4">
                <h5 className="font-medium text-blue-800 mb-2 text-sm">Requirements</h5>
                <p className="text-xs text-blue-700">{selectedBuyer.requirements}</p>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button className="flex-1 bg-emerald-600 text-white py-3 px-4 rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
                <button className="p-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors">
                  <Phone className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMarketAnalysis;