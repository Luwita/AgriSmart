import React, { useState } from 'react';
import { 
  Package, 
  Plus, 
  Filter, 
  Search, 
  ChevronRight, 
  X, 
  AlertTriangle, 
  CheckCircle, 
  Truck, 
  Calendar, 
  DollarSign, 
  Droplets, 
  Sprout, 
  Zap, 
  Wrench, 
  Edit, 
  Trash2, 
  Eye
} from 'lucide-react';

const MobileInventoryManagement: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showItemDetails, setShowItemDetails] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Inventory categories
  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'seeds', name: 'Seeds', icon: Sprout },
    { id: 'fertilizers', name: 'Fertilizers', icon: Droplets },
    { id: 'pesticides', name: 'Pesticides', icon: AlertTriangle },
    { id: 'equipment', name: 'Equipment', icon: Wrench },
    { id: 'fuel', name: 'Fuel', icon: Zap }
  ];

  // Sample inventory data
  const inventoryItems = [
    {
      id: 1,
      name: 'D-Compound Fertilizer',
      category: 'fertilizers',
      quantity: 25,
      unit: 'bags',
      costPerUnit: 280,
      totalValue: 7000,
      supplier: 'Zambia Fertilizer Company',
      purchaseDate: '2024-10-15',
      expiryDate: '2025-10-15',
      location: 'Main Storage',
      minStockLevel: 10,
      status: 'in_stock',
      transactions: [
        {
          type: 'purchase',
          quantity: 25,
          date: '2024-10-15',
          reference: 'PO-2024-001',
          notes: 'Initial purchase'
        }
      ]
    },
    {
      id: 2,
      name: 'SC627 Maize Seeds',
      category: 'seeds',
      quantity: 15,
      unit: 'bags',
      costPerUnit: 250,
      totalValue: 3750,
      supplier: 'Seed Co',
      purchaseDate: '2024-10-10',
      expiryDate: '2025-10-10',
      location: 'Seed Storage',
      minStockLevel: 5,
      status: 'in_stock',
      transactions: [
        {
          type: 'purchase',
          quantity: 25,
          date: '2024-10-10',
          reference: 'PO-2024-002',
          notes: 'Initial purchase'
        },
        {
          type: 'usage',
          quantity: 10,
          date: '2024-11-15',
          reference: 'USE-2024-001',
          notes: 'Block A planting'
        }
      ]
    },
    {
      id: 3,
      name: 'Emamectin Benzoate',
      category: 'pesticides',
      quantity: 8,
      unit: 'bottles',
      costPerUnit: 180,
      totalValue: 1440,
      supplier: 'AgroChemicals Ltd',
      purchaseDate: '2024-11-05',
      expiryDate: '2026-11-05',
      location: 'Chemical Storage',
      minStockLevel: 3,
      status: 'in_stock',
      transactions: [
        {
          type: 'purchase',
          quantity: 10,
          date: '2024-11-05',
          reference: 'PO-2024-003',
          notes: 'Fall armyworm control'
        },
        {
          type: 'usage',
          quantity: 2,
          date: '2024-11-20',
          reference: 'USE-2024-002',
          notes: 'Applied to maize field'
        }
      ]
    },
    {
      id: 4,
      name: 'Diesel Fuel',
      category: 'fuel',
      quantity: 120,
      unit: 'liters',
      costPerUnit: 18,
      totalValue: 2160,
      supplier: 'Total Filling Station',
      purchaseDate: '2024-12-01',
      expiryDate: null,
      location: 'Fuel Storage',
      minStockLevel: 50,
      status: 'in_stock',
      transactions: [
        {
          type: 'purchase',
          quantity: 200,
          date: '2024-12-01',
          reference: 'PO-2024-004',
          notes: 'Monthly fuel purchase'
        },
        {
          type: 'usage',
          quantity: 80,
          date: '2024-12-10',
          reference: 'USE-2024-003',
          notes: 'Tractor operations'
        }
      ]
    },
    {
      id: 5,
      name: 'Treadle Pump',
      category: 'equipment',
      quantity: 2,
      unit: 'units',
      costPerUnit: 850,
      totalValue: 1700,
      supplier: 'Farm Equipment Ltd',
      purchaseDate: '2024-09-15',
      expiryDate: null,
      location: 'Equipment Shed',
      minStockLevel: 1,
      status: 'in_stock',
      transactions: [
        {
          type: 'purchase',
          quantity: 2,
          date: '2024-09-15',
          reference: 'PO-2024-005',
          notes: 'Irrigation equipment'
        }
      ]
    }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? inventoryItems 
    : inventoryItems.filter(item => item.category === selectedCategory);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_stock': return 'text-emerald-600 bg-emerald-100';
      case 'low_stock': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-orange-600 bg-orange-100';
      case 'out_of_stock': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'seeds': return Sprout;
      case 'fertilizers': return Droplets;
      case 'pesticides': return AlertTriangle;
      case 'equipment': return Wrench;
      case 'fuel': return Zap;
      default: return Package;
    }
  };

  const handleViewItem = (item: any) => {
    setSelectedItem(item);
    setShowItemDetails(true);
  };

  return (
    <div className="p-4 space-y-4 pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Inventory</h1>
          <p className="text-gray-600 text-sm">Manage your farm supplies</p>
        </div>
        <button 
          onClick={() => setShowAddItemModal(true)}
          className="bg-emerald-600 text-white p-2 rounded-xl hover:bg-emerald-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Zambian Context Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-xl text-white p-4">
        <h3 className="font-bold mb-2">🇿🇲 Zambian Inventory Management</h3>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-white bg-opacity-20 rounded-lg p-2">
            <p className="font-medium">Local Suppliers</p>
            <p className="opacity-90">Verified agricultural suppliers</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-2">
            <p className="font-medium">FISP Program</p>
            <p className="opacity-90">Track subsidized inputs</p>
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
            placeholder="Search inventory..."
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
      </div>

      {showFilters && (
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <h3 className="font-medium text-gray-900 mb-3 text-sm">Category</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Inventory Summary */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">Total Items</p>
              <p className="text-lg font-bold text-gray-900 mt-1">{inventoryItems.length}</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-full">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">Total Value</p>
              <p className="text-lg font-bold text-emerald-600 mt-1">
                ZMW {inventoryItems.reduce((sum, item) => sum + item.totalValue, 0).toLocaleString()}
              </p>
            </div>
            <div className="p-2 bg-emerald-100 rounded-full">
              <DollarSign className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Inventory Items */}
      <div className="space-y-4">
        {filteredItems.map((item) => {
          const Icon = getCategoryIcon(item.category);
          return (
            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-xs text-gray-600 capitalize">{item.category}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                    {item.status.replace('_', ' ')}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <p className="text-xs text-gray-600">Quantity</p>
                    <p className="text-sm font-semibold text-gray-900">{item.quantity} {item.unit}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Value</p>
                    <p className="text-sm font-semibold text-emerald-600">ZMW {item.totalValue.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
                  <div className="flex items-center space-x-1">
                    <Truck className="w-3 h-3" />
                    <span>{item.supplier}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(item.purchaseDate).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleViewItem(item)}
                    className="flex-1 bg-emerald-600 text-white py-2 px-3 rounded-lg text-xs font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-1"
                  >
                    <Eye className="w-3 h-3" />
                    <span>Details</span>
                  </button>
                  <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Item Details Modal */}
      {showItemDetails && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col">
          <div className="bg-white rounded-t-2xl mt-auto max-h-[90vh] overflow-y-auto w-full">
            <div className="sticky top-0 bg-white px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Item Details</h3>
              <button 
                onClick={() => setShowItemDetails(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gray-100 rounded-lg">
                  {React.createElement(getCategoryIcon(selectedItem.category), { className: "w-6 h-6 text-gray-600" })}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{selectedItem.name}</h4>
                  <p className="text-sm text-gray-600 capitalize">{selectedItem.category}</p>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Quantity:</span>
                  <span className="text-sm font-medium text-gray-900">{selectedItem.quantity} {selectedItem.unit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Cost per Unit:</span>
                  <span className="text-sm font-medium text-gray-900">ZMW {selectedItem.costPerUnit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Value:</span>
                  <span className="text-sm font-medium text-emerald-600">ZMW {selectedItem.totalValue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Supplier:</span>
                  <span className="text-sm font-medium text-gray-900">{selectedItem.supplier}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Location:</span>
                  <span className="text-sm font-medium text-gray-900">{selectedItem.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Purchase Date:</span>
                  <span className="text-sm font-medium text-gray-900">{new Date(selectedItem.purchaseDate).toLocaleDateString()}</span>
                </div>
                {selectedItem.expiryDate && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Expiry Date:</span>
                    <span className="text-sm font-medium text-gray-900">{new Date(selectedItem.expiryDate).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
              
              {/* Transaction History */}
              <div>
                <h5 className="font-medium text-gray-900 mb-3 text-sm">Transaction History</h5>
                <div className="space-y-3">
                  {selectedItem.transactions.map((transaction: any, index: number) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          transaction.type === 'purchase' ? 'bg-blue-100 text-blue-800' : 
                          transaction.type === 'usage' ? 'bg-orange-100 text-orange-800' : 
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {transaction.type}
                        </span>
                        <span className="text-xs text-gray-600">{new Date(transaction.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Quantity:</span>
                        <span className="font-medium text-gray-900">{transaction.quantity} {selectedItem.unit}</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{transaction.notes}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button className="flex-1 bg-emerald-600 text-white py-3 px-4 rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Add Transaction</span>
                </button>
                <button className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                  <Edit className="w-4 h-4" />
                  <span>Edit Item</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Item Modal */}
      {showAddItemModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col">
          <div className="bg-white rounded-t-2xl mt-auto max-h-[90vh] overflow-y-auto w-full">
            <div className="sticky top-0 bg-white px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Add Inventory Item</h3>
              <button 
                onClick={() => setShowAddItemModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Item Name</label>
                <input 
                  type="text"
                  className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="e.g., D-Compound Fertilizer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                  <option value="">Select category</option>
                  <option value="seeds">Seeds</option>
                  <option value="fertilizers">Fertilizers</option>
                  <option value="pesticides">Pesticides</option>
                  <option value="equipment">Equipment</option>
                  <option value="fuel">Fuel</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                  <input 
                    type="number"
                    className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                  <select className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                    <option value="bags">Bags</option>
                    <option value="kg">Kilograms</option>
                    <option value="liters">Liters</option>
                    <option value="units">Units</option>
                    <option value="bottles">Bottles</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cost per Unit (ZMW)</label>
                  <input 
                    type="number"
                    className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Supplier</label>
                  <input 
                    type="text"
                    className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Supplier name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Purchase Date</label>
                  <input 
                    type="date"
                    className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date (if applicable)</label>
                  <input 
                    type="date"
                    className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Storage Location</label>
                <input 
                  type="text"
                  className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="e.g., Main Storage"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button 
                  onClick={() => setShowAddItemModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-xl hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setShowAddItemModal(false)}
                  className="flex-1 bg-emerald-600 text-white py-3 px-4 rounded-xl hover:bg-emerald-700 transition-colors"
                >
                  Add Item
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Low Stock Alerts */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
        <h3 className="font-medium text-gray-900 mb-3 flex items-center">
          <AlertTriangle className="w-4 h-4 mr-2 text-yellow-600" />
          Low Stock Alerts
        </h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-medium text-yellow-800 text-sm">Low Stock: Diesel Fuel</h4>
              <p className="text-xs text-yellow-700 mt-1">Current: 120 liters (Min: 50 liters)</p>
              <button className="mt-2 text-xs bg-yellow-600 text-white px-3 py-1 rounded-lg">
                Reorder
              </button>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-medium text-red-800 text-sm">Critical: Urea Fertilizer</h4>
              <p className="text-xs text-red-700 mt-1">Current: 2 bags (Min: 10 bags)</p>
              <button className="mt-2 text-xs bg-red-600 text-white px-3 py-1 rounded-lg">
                Reorder Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileInventoryManagement;