import React, { useState } from 'react';
import { 
  Package, 
  Plus, 
  Search, 
  Filter, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  TrendingDown,
  TrendingUp,
  BarChart3,
  Calendar,
  MapPin,
  Thermometer,
  Droplets,
  Bug,
  Sprout,
  Truck,
  Building,
  Eye,
  Edit,
  Trash2,
  X,
  Download,
  Upload,
  QrCode,
  Bell,
  Target,
  Zap,
  Wrench,
  Camera,
  FileText,
  Save,
  Scan,
  Settings,
  Database,
  Activity,
  Info,
  Mail,
  Phone
} from 'lucide-react';

const InventoryManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddItem, setShowAddItem] = useState(false);
  const [showScanModal, setShowScanModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAlertsModal, setShowAlertsModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showBulkImportModal, setShowBulkImportModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [scanResult, setScanResult] = useState<string>('');
  const [isScanning, setIsScanning] = useState(false);

  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    quantity: '',
    unit: '',
    costPerUnit: '',
    supplier: '',
    purchaseDate: '',
    expiryDate: '',
    location: '',
    minStockLevel: '',
    description: '',
    batchNumber: ''
  });

  const [alertSettings, setAlertSettings] = useState({
    lowStockThreshold: 10,
    expiryWarningDays: 30,
    emailNotifications: true,
    smsNotifications: false,
    alertFrequency: 'daily'
  });

  const [exportSettings, setExportSettings] = useState({
    format: 'csv',
    includeImages: false,
    dateRange: 'all',
    categories: ['all']
  });

  const [bulkImportData, setBulkImportData] = useState<File | null>(null);

  // Inventory Categories
  const categories = [
    { id: 'seeds', name: 'Seeds & Planting Material', icon: Sprout, color: 'emerald' },
    { id: 'fertilizers', name: 'Fertilizers & Nutrients', icon: Droplets, color: 'blue' },
    { id: 'pesticides', name: 'Pesticides & Chemicals', icon: Bug, color: 'yellow' },
    { id: 'equipment', name: 'Equipment & Tools', icon: Wrench, color: 'purple' },
    { id: 'fuel', name: 'Fuel & Energy', icon: Zap, color: 'orange' },
    { id: 'spare_parts', name: 'Spare Parts', icon: Truck, color: 'indigo' },
    { id: 'storage', name: 'Storage Materials', icon: Package, color: 'gray' },
    { id: 'harvest', name: 'Harvested Crops', icon: Building, color: 'green' }
  ];

  // Sample Inventory Data
  const inventoryItems = [
    {
      id: 1,
      name: 'SC627 Maize Seeds',
      category: 'seeds',
      quantity: 150,
      unit: 'kg',
      costPerUnit: 45,
      totalValue: 6750,
      supplier: 'Seed Co Zambia',
      purchaseDate: '2024-10-15',
      expiryDate: '2025-10-15',
      location: 'Storage Room A',
      minStockLevel: 50,
      status: 'in_stock',
      batchNumber: 'SC627-2024-10',
      description: 'High-yield white maize variety suitable for Zone IIa',
      lastUpdated: '2024-12-15',
      qrCode: 'QR001-SC627-2024',
      image: 'https://images.pexels.com/photos/2252618/pexels-photo-2252618.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      name: 'D-Compound Fertilizer',
      category: 'fertilizers',
      quantity: 25,
      unit: 'bags (50kg)',
      costPerUnit: 280,
      totalValue: 7000,
      supplier: 'Zambia Fertilizer Company',
      purchaseDate: '2024-11-20',
      expiryDate: '2026-11-20',
      location: 'Fertilizer Store',
      minStockLevel: 10,
      status: 'low_stock',
      batchNumber: 'DC-2024-11',
      description: '10-20-10 NPK compound fertilizer for basal application',
      lastUpdated: '2024-12-14',
      qrCode: 'QR002-DC-2024',
      image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      name: 'Emamectin Benzoate',
      category: 'pesticides',
      quantity: 5,
      unit: 'liters',
      costPerUnit: 120,
      totalValue: 600,
      supplier: 'Crop Protection Zambia',
      purchaseDate: '2024-12-01',
      expiryDate: '2025-12-01',
      location: 'Chemical Store',
      minStockLevel: 3,
      status: 'low_stock',
      batchNumber: 'EMB-2024-12',
      description: 'Insecticide for fall armyworm control',
      lastUpdated: '2024-12-15',
      qrCode: 'QR003-EMB-2024',
      image: 'https://images.pexels.com/photos/4022092/pexels-photo-4022092.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 4,
      name: 'Tractor Fuel Filter',
      category: 'spare_parts',
      quantity: 8,
      unit: 'pieces',
      costPerUnit: 85,
      totalValue: 680,
      supplier: 'Massey Ferguson Zambia',
      purchaseDate: '2024-11-10',
      expiryDate: null,
      location: 'Workshop',
      minStockLevel: 2,
      status: 'in_stock',
      batchNumber: 'MF-FF-2024',
      description: 'Fuel filter for MF 385 tractor',
      lastUpdated: '2024-12-10',
      qrCode: 'QR004-MF-2024',
      image: 'https://images.pexels.com/photos/1459339/pexels-photo-1459339.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 5,
      name: 'Diesel Fuel',
      category: 'fuel',
      quantity: 500,
      unit: 'liters',
      costPerUnit: 18.5,
      totalValue: 9250,
      supplier: 'Total Zambia',
      purchaseDate: '2024-12-10',
      expiryDate: null,
      location: 'Fuel Tank',
      minStockLevel: 200,
      status: 'in_stock',
      batchNumber: 'TZ-D-2024-12',
      description: 'Diesel fuel for farm machinery',
      lastUpdated: '2024-12-15',
      qrCode: 'QR005-TZ-2024',
      image: 'https://images.pexels.com/photos/33044/sunflower-sun-summer-yellow.jpg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 6,
      name: 'Harvested Maize',
      category: 'harvest',
      quantity: 45,
      unit: 'tons',
      costPerUnit: 0,
      totalValue: 0,
      supplier: 'Own Production',
      purchaseDate: '2024-05-15',
      expiryDate: null,
      location: 'Grain Store 1',
      minStockLevel: 0,
      status: 'in_stock',
      batchNumber: 'HM-2024-05',
      description: 'White maize from Block A harvest',
      lastUpdated: '2024-12-15',
      qrCode: 'QR006-HM-2024',
      image: 'https://images.pexels.com/photos/2252618/pexels-photo-2252618.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const zambianSuppliers = [
    'Seed Co Zambia',
    'Zambia Fertilizer Company',
    'Nitrogen Chemicals Zambia',
    'Crop Protection Zambia',
    'Massey Ferguson Zambia',
    'Total Zambia',
    'Shell Zambia',
    'IrriTech Zambia',
    'AgroTech Solutions',
    'Farm Supply Zambia'
  ];

  const units = [
    'kg', 'tons', 'bags (50kg)', 'bags (25kg)', 'liters', 'pieces', 'meters', 'boxes', 'packets'
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_stock': return 'text-emerald-600 bg-emerald-100';
      case 'low_stock': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      case 'out_of_stock': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStockStatus = (item: any) => {
    if (item.quantity === 0) return 'out_of_stock';
    if (item.quantity <= item.minStockLevel * 0.5) return 'critical';
    if (item.quantity <= item.minStockLevel) return 'low_stock';
    return 'in_stock';
  };

  const filteredItems = inventoryItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'name': return a.name.localeCompare(b.name);
      case 'quantity': return b.quantity - a.quantity;
      case 'value': return b.totalValue - a.totalValue;
      case 'expiry': 
        if (!a.expiryDate && !b.expiryDate) return 0;
        if (!a.expiryDate) return 1;
        if (!b.expiryDate) return -1;
        return new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime();
      default: return 0;
    }
  });

  const inventoryStats = {
    totalItems: inventoryItems.length,
    totalValue: inventoryItems.reduce((sum, item) => sum + item.totalValue, 0),
    lowStockItems: inventoryItems.filter(item => getStockStatus(item) === 'low_stock' || getStockStatus(item) === 'critical').length,
    expiringItems: inventoryItems.filter(item => {
      if (!item.expiryDate) return false;
      const daysUntilExpiry = Math.ceil((new Date(item.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
      return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
    }).length
  };

  // Scan functionality
  const handleScan = () => {
    setIsScanning(true);
    // Simulate scanning process
    setTimeout(() => {
      const mockQRCode = 'QR001-SC627-2024';
      setScanResult(mockQRCode);
      const scannedItem = inventoryItems.find(item => item.qrCode === mockQRCode);
      if (scannedItem) {
        setSelectedItem(scannedItem);
        setShowViewModal(true);
      }
      setIsScanning(false);
      setShowScanModal(false);
    }, 3000);
  };

  // Export functionality
  const handleExport = () => {
    const dataToExport = filteredItems.map(item => ({
      Name: item.name,
      Category: item.category,
      Quantity: item.quantity,
      Unit: item.unit,
      'Cost Per Unit': item.costPerUnit,
      'Total Value': item.totalValue,
      Supplier: item.supplier,
      'Purchase Date': item.purchaseDate,
      'Expiry Date': item.expiryDate || 'N/A',
      Location: item.location,
      'Min Stock Level': item.minStockLevel,
      Status: getStockStatus(item),
      'Batch Number': item.batchNumber,
      Description: item.description
    }));

    if (exportSettings.format === 'csv') {
      const csvContent = [
        Object.keys(dataToExport[0]).join(','),
        ...dataToExport.map(row => Object.values(row).join(','))
      ].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `inventory_export_${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
    } else if (exportSettings.format === 'json') {
      const jsonContent = JSON.stringify(dataToExport, null, 2);
      const blob = new Blob([jsonContent], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `inventory_export_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
    }

    setShowExportModal(false);
    alert('Inventory data exported successfully!');
  };

  // View item functionality
  const handleViewItem = (item: any) => {
    setSelectedItem(item);
    setShowViewModal(true);
  };

  // Edit item functionality
  const handleEditItem = (item: any) => {
    setSelectedItem(item);
    setNewItem({
      name: item.name,
      category: item.category,
      quantity: item.quantity.toString(),
      unit: item.unit,
      costPerUnit: item.costPerUnit.toString(),
      supplier: item.supplier,
      purchaseDate: item.purchaseDate,
      expiryDate: item.expiryDate || '',
      location: item.location,
      minStockLevel: item.minStockLevel.toString(),
      description: item.description,
      batchNumber: item.batchNumber
    });
    setShowEditModal(true);
  };

  // Save edited item
  const handleSaveEdit = () => {
    console.log('Saving edited item:', newItem);
    setShowEditModal(false);
    alert('Item updated successfully!');
  };

  // Set alerts functionality
  const handleSetAlerts = () => {
    console.log('Alert settings saved:', alertSettings);
    setShowAlertsModal(false);
    alert('Alert settings saved successfully! You will receive notifications based on your preferences.');
  };

  // Usage report functionality
  const handleGenerateReport = () => {
    const reportData = {
      totalItems: inventoryStats.totalItems,
      totalValue: inventoryStats.totalValue,
      lowStockItems: inventoryStats.lowStockItems,
      expiringItems: inventoryStats.expiringItems,
      categoryBreakdown: categories.map(cat => ({
        category: cat.name,
        items: inventoryItems.filter(item => item.category === cat.id).length,
        value: inventoryItems.filter(item => item.category === cat.id).reduce((sum, item) => sum + item.totalValue, 0)
      })),
      generatedAt: new Date().toISOString()
    };

    const reportContent = `
INVENTORY USAGE REPORT
Generated: ${new Date().toLocaleDateString()}

SUMMARY:
- Total Items: ${reportData.totalItems}
- Total Value: ZMW ${reportData.totalValue.toLocaleString()}
- Low Stock Items: ${reportData.lowStockItems}
- Expiring Items: ${reportData.expiringItems}

CATEGORY BREAKDOWN:
${reportData.categoryBreakdown.map(cat => 
  `- ${cat.category}: ${cat.items} items (ZMW ${cat.value.toLocaleString()})`
).join('\n')}

RECOMMENDATIONS:
- Reorder items with low stock levels
- Monitor expiring items closely
- Consider bulk purchasing for frequently used items
    `;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inventory_usage_report_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();

    setShowReportModal(false);
    alert('Usage report generated and downloaded successfully!');
  };

  // Bulk import functionality
  const handleBulkImport = () => {
    if (!bulkImportData) {
      alert('Please select a file to import');
      return;
    }

    // Simulate file processing
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const lines = content.split('\n');
        const headers = lines[0].split(',');
        const importedItems = lines.slice(1).filter(line => line.trim()).map(line => {
          const values = line.split(',');
          return headers.reduce((obj, header, index) => {
            obj[header.trim()] = values[index]?.trim() || '';
            return obj;
          }, {} as any);
        });

        console.log('Imported items:', importedItems);
        setShowBulkImportModal(false);
        setBulkImportData(null);
        alert(`Successfully imported ${importedItems.length} items!`);
      } catch (error) {
        alert('Error processing file. Please check the format and try again.');
      }
    };
    reader.readAsText(bulkImportData);
  };

  const handleAddItem = () => {
    console.log('Adding inventory item:', newItem);
    setShowAddItem(false);
    setNewItem({
      name: '',
      category: '',
      quantity: '',
      unit: '',
      costPerUnit: '',
      supplier: '',
      purchaseDate: '',
      expiryDate: '',
      location: '',
      minStockLevel: '',
      description: '',
      batchNumber: ''
    });
    alert('Item added successfully!');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600 mt-1">Track seeds, fertilizers, equipment, and harvested crops</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-2">
          <button 
            onClick={() => setShowAddItem(true)}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Item</span>
          </button>
          <button 
            onClick={() => setShowScanModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <QrCode className="w-4 h-4" />
            <span>Scan</span>
          </button>
          <button 
            onClick={() => setShowExportModal(true)}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Zambian Inventory Context */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-lg shadow-sm text-white p-6">
        <h3 className="text-lg font-bold mb-3">🇿🇲 Zambian Farm Inventory System</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-semibold mb-1">Local Suppliers</h4>
            <p className="text-sm opacity-90">Integrated with Zambian agro-dealers</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-semibold mb-1">FISP Integration</h4>
            <p className="text-sm opacity-90">Track government input subsidies</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-semibold mb-1">Storage Conditions</h4>
            <p className="text-sm opacity-90">Optimized for Zambian climate</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-semibold mb-1">Quality Standards</h4>
            <p className="text-sm opacity-90">ZABS certified products tracked</p>
          </div>
        </div>
      </div>

      {/* Inventory Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Items</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{inventoryStats.totalItems}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-emerald-600 mt-2">
                ZMW {inventoryStats.totalValue.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-emerald-100 rounded-full">
              <BarChart3 className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Low Stock Alerts</p>
              <p className="text-2xl font-bold text-yellow-600 mt-2">{inventoryStats.lowStockItems}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Expiring Soon</p>
              <p className="text-2xl font-bold text-red-600 mt-2">{inventoryStats.expiringItems}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <Clock className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Categories
            </button>
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors flex items-center space-x-1 ${
                    selectedCategory === category.id
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>

          <div className="flex space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search inventory..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="name">Sort by Name</option>
              <option value="quantity">Sort by Quantity</option>
              <option value="value">Sort by Value</option>
              <option value="expiry">Sort by Expiry</option>
            </select>
          </div>
        </div>
      </div>

      {/* Inventory Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {sortedItems.map((item) => {
          const category = categories.find(c => c.id === item.category);
          const Icon = category?.icon || Package;
          const status = getStockStatus(item);
          const isExpiringSoon = item.expiryDate && 
            Math.ceil((new Date(item.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) <= 30;

          return (
            <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              {/* Item Header */}
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 bg-${category?.color}-100 rounded-lg`}>
                      <Icon className={`w-5 h-5 text-${category?.color}-600`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">{category?.name}</p>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(status)}`}>
                      {status.replace('_', ' ').toUpperCase()}
                    </span>
                    {isExpiringSoon && (
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-800">
                        EXPIRING
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Item Details */}
              <div className="px-6 py-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Quantity</p>
                    <p className="font-semibold text-lg">{item.quantity} {item.unit}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Value</p>
                    <p className="font-semibold text-lg text-emerald-600">
                      ZMW {item.totalValue.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Supplier:</span>
                    <span className="font-medium">{item.supplier}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium">{item.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Batch:</span>
                    <span className="font-medium">{item.batchNumber}</span>
                  </div>
                  {item.expiryDate && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Expires:</span>
                      <span className={`font-medium ${isExpiringSoon ? 'text-orange-600' : ''}`}>
                        {new Date(item.expiryDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>

                {/* Stock Level Indicator */}
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Stock Level</span>
                    <span className="font-medium">
                      {item.quantity} / {item.minStockLevel} min
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        status === 'critical' ? 'bg-red-500' :
                        status === 'low_stock' ? 'bg-yellow-500' : 'bg-emerald-500'
                      }`}
                      style={{ 
                        width: `${Math.min((item.quantity / (item.minStockLevel * 2)) * 100, 100)}%` 
                      }}
                    ></div>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-4">
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 mt-4">
                  <button 
                    onClick={() => handleViewItem(item)}
                    className="flex-1 bg-emerald-600 text-white py-2 px-3 rounded text-sm hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-1"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View</span>
                  </button>
                  <button 
                    onClick={() => handleEditItem(item)}
                    className="p-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors">
                    <QrCode className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg shadow-sm text-white p-6">
        <h3 className="text-lg font-bold mb-4">🚀 Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button 
            onClick={() => setShowAlertsModal(true)}
            className="bg-white bg-opacity-20 rounded-lg p-4 hover:bg-opacity-30 transition-colors"
          >
            <Bell className="w-6 h-6 mx-auto mb-2" />
            <p className="text-sm font-medium">Set Alerts</p>
          </button>
          <button 
            onClick={() => setShowAddItem(true)}
            className="bg-white bg-opacity-20 rounded-lg p-4 hover:bg-opacity-30 transition-colors"
          >
            <Target className="w-6 h-6 mx-auto mb-2" />
            <p className="text-sm font-medium">Record Items</p>
          </button>
          <button 
            onClick={() => setShowReportModal(true)}
            className="bg-white bg-opacity-20 rounded-lg p-4 hover:bg-opacity-30 transition-colors"
          >
            <BarChart3 className="w-6 h-6 mx-auto mb-2" />
            <p className="text-sm font-medium">Usage Report</p>
          </button>
          <button 
            onClick={() => setShowBulkImportModal(true)}
            className="bg-white bg-opacity-20 rounded-lg p-4 hover:bg-opacity-30 transition-colors"
          >
            <Upload className="w-6 h-6 mx-auto mb-2" />
            <p className="text-sm font-medium">Bulk Import</p>
          </button>
        </div>
      </div>

      {/* Scan Modal */}
      {showScanModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Scan QR Code</h3>
              <button 
                onClick={() => setShowScanModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="text-center">
                <div className="w-48 h-48 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  {isScanning ? (
                    <div className="animate-spin">
                      <Scan className="w-12 h-12 text-blue-600" />
                    </div>
                  ) : (
                    <Camera className="w-12 h-12 text-gray-400" />
                  )}
                </div>
                <p className="text-gray-600 mb-4">
                  {isScanning ? 'Scanning QR code...' : 'Position QR code within the frame'}
                </p>
                {scanResult && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 mb-4">
                    <p className="text-emerald-800 font-medium">Scanned: {scanResult}</p>
                  </div>
                )}
              </div>

              <div className="flex space-x-3">
                <button 
                  onClick={() => setShowScanModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleScan}
                  disabled={isScanning}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isScanning ? 'Scanning...' : 'Start Scan'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Export Inventory Data</h3>
              <button 
                onClick={() => setShowExportModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Export Format</label>
                  <select
                    value={exportSettings.format}
                    onChange={(e) => setExportSettings({...exportSettings, format: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="csv">CSV (Excel Compatible)</option>
                    <option value="json">JSON</option>
                    <option value="pdf">PDF Report</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                  <select
                    value={exportSettings.dateRange}
                    onChange={(e) => setExportSettings({...exportSettings, dateRange: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="all">All Time</option>
                    <option value="month">This Month</option>
                    <option value="quarter">This Quarter</option>
                    <option value="year">This Year</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="includeImages"
                    checked={exportSettings.includeImages}
                    onChange={(e) => setExportSettings({...exportSettings, includeImages: e.target.checked})}
                    className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <label htmlFor="includeImages" className="ml-2 text-sm text-gray-700">
                    Include item images
                  </label>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button 
                  onClick={() => setShowExportModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleExport}
                  className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Item Modal */}
      {showViewModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Item Details</h3>
              <button 
                onClick={() => setShowViewModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <img 
                    src={selectedItem.image} 
                    alt={selectedItem.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">QR Code Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">QR Code:</span>
                        <span className="font-medium">{selectedItem.qrCode}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last Scanned:</span>
                        <span className="font-medium">Never</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Basic Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Name:</span>
                        <span className="font-medium">{selectedItem.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Category:</span>
                        <span className="font-medium">{selectedItem.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Quantity:</span>
                        <span className="font-medium">{selectedItem.quantity} {selectedItem.unit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Cost per Unit:</span>
                        <span className="font-medium">ZMW {selectedItem.costPerUnit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Value:</span>
                        <span className="font-medium text-emerald-600">ZMW {selectedItem.totalValue.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Supply Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Supplier:</span>
                        <span className="font-medium">{selectedItem.supplier}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Purchase Date:</span>
                        <span className="font-medium">{new Date(selectedItem.purchaseDate).toLocaleDateString()}</span>
                      </div>
                      {selectedItem.expiryDate && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Expiry Date:</span>
                          <span className="font-medium">{new Date(selectedItem.expiryDate).toLocaleDateString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-600">Batch Number:</span>
                        <span className="font-medium">{selectedItem.batchNumber}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Storage Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Location:</span>
                        <span className="font-medium">{selectedItem.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Min Stock Level:</span>
                        <span className="font-medium">{selectedItem.minStockLevel} {selectedItem.unit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(getStockStatus(selectedItem))}`}>
                          {getStockStatus(selectedItem).replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                <p className="text-gray-700">{selectedItem.description}</p>
              </div>

              <div className="flex space-x-3 mt-6">
                <button 
                  onClick={() => setShowViewModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
                <button 
                  onClick={() => {
                    setShowViewModal(false);
                    handleEditItem(selectedItem);
                  }}
                  className="bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit Item</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Item Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Edit Item</h3>
              <button 
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Item Name</label>
                  <input
                    type="text"
                    value={newItem.name}
                    onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={newItem.category}
                    onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="">Select category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                  <input
                    type="number"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem({...newItem, quantity: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                  <select
                    value={newItem.unit}
                    onChange={(e) => setNewItem({...newItem, unit: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="">Select unit</option>
                    {units.map((unit) => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cost per Unit (ZMW)</label>
                  <input
                    type="number"
                    value={newItem.costPerUnit}
                    onChange={(e) => setNewItem({...newItem, costPerUnit: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Supplier</label>
                  <select
                    value={newItem.supplier}
                    onChange={(e) => setNewItem({...newItem, supplier: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="">Select supplier</option>
                    {zambianSuppliers.map((supplier) => (
                      <option key={supplier} value={supplier}>{supplier}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Purchase Date</label>
                  <input
                    type="date"
                    value={newItem.purchaseDate}
                    onChange={(e) => setNewItem({...newItem, purchaseDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date (Optional)</label>
                  <input
                    type="date"
                    value={newItem.expiryDate}
                    onChange={(e) => setNewItem({...newItem, expiryDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Storage Location</label>
                  <input
                    type="text"
                    value={newItem.location}
                    onChange={(e) => setNewItem({...newItem, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Stock Level</label>
                  <input
                    type="number"
                    value={newItem.minStockLevel}
                    onChange={(e) => setNewItem({...newItem, minStockLevel: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Batch Number</label>
                  <input
                    type="text"
                    value={newItem.batchNumber}
                    onChange={(e) => setNewItem({...newItem, batchNumber: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={newItem.description}
                    onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button 
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveEdit}
                  className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Set Alerts Modal */}
      {showAlertsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Set Inventory Alerts</h3>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Low Stock Threshold (%)</label>
                  <input
                    type="number"
                    value={alertSettings.lowStockThreshold}
                    onChange={(e) => setAlertSettings({...alertSettings, lowStockThreshold: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    min="1"
                    max="100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Warning (Days)</label>
                  <input
                    type="number"
                    value={alertSettings.expiryWarningDays}
                    onChange={(e) => setAlertSettings({...alertSettings, expiryWarningDays: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    min="1"
                    max="365"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Alert Frequency</label>
                  <select
                    value={alertSettings.alertFrequency}
                    onChange={(e) => setAlertSettings({...alertSettings, alertFrequency: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="emailNotifications"
                      checked={alertSettings.emailNotifications}
                      onChange={(e) => setAlertSettings({...alertSettings, emailNotifications: e.target.checked})}
                      className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <label htmlFor="emailNotifications" className="ml-2 text-sm text-gray-700">
                      Email notifications
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="smsNotifications"
                      checked={alertSettings.smsNotifications}
                      onChange={(e) => setAlertSettings({...alertSettings, smsNotifications: e.target.checked})}
                      className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <label htmlFor="smsNotifications" className="ml-2 text-sm text-gray-700">
                      SMS notifications
                    </label>
                  </div>
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
                  onClick={handleSetAlerts}
                  className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Bell className="w-4 h-4" />
                  <span>Save Alerts</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Usage Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Generate Usage Report</h3>
              <button 
                onClick={() => setShowReportModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="text-center mb-6">
                <BarChart3 className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Inventory Usage Report</h4>
                <p className="text-gray-600">Generate a comprehensive report of your inventory usage patterns and recommendations.</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h5 className="font-semibold text-gray-900 mb-2">Report will include:</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Total inventory value and count</li>
                  <li>• Low stock and expiring items</li>
                  <li>• Category breakdown and analysis</li>
                  <li>• Usage patterns and trends</li>
                  <li>• Reorder recommendations</li>
                  <li>• Cost optimization suggestions</li>
                </ul>
              </div>

              <div className="flex space-x-3">
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

      {/* Bulk Import Modal */}
      {showBulkImportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Bulk Import Items</h3>
              <button 
                onClick={() => setShowBulkImportModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="text-center mb-6">
                <Upload className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Import Inventory Data</h4>
                <p className="text-gray-600">Upload a CSV file to add multiple items at once.</p>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select CSV File</label>
                <input
                  type="file"
                  accept=".csv"
                  onChange={(e) => setBulkImportData(e.target.files?.[0] || null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h5 className="font-semibold text-blue-900 mb-2">CSV Format Requirements:</h5>
                <p className="text-sm text-blue-700 mb-2">Your CSV file should include these columns:</p>
                <div className="text-xs text-blue-600 font-mono bg-white p-2 rounded">
                  Name,Category,Quantity,Unit,Cost,Supplier,Location,MinStock,Description
                </div>
              </div>

              <div className="flex space-x-3">
                <button 
                  onClick={() => setShowBulkImportModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleBulkImport}
                  disabled={!bulkImportData}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  <Database className="w-4 h-4" />
                  <span>Import Data</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Item Modal */}
      {showAddItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Add Inventory Item</h3>
              <button 
                onClick={() => setShowAddItem(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Item Name</label>
                  <input
                    type="text"
                    value={newItem.name}
                    onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Enter item name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={newItem.category}
                    onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="">Select category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                  <input
                    type="number"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem({...newItem, quantity: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                  <select
                    value={newItem.unit}
                    onChange={(e) => setNewItem({...newItem, unit: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="">Select unit</option>
                    {units.map((unit) => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cost per Unit (ZMW)</label>
                  <input
                    type="number"
                    value={newItem.costPerUnit}
                    onChange={(e) => setNewItem({...newItem, costPerUnit: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Supplier</label>
                  <select
                    value={newItem.supplier}
                    onChange={(e) => setNewItem({...newItem, supplier: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="">Select supplier</option>
                    {zambianSuppliers.map((supplier) => (
                      <option key={supplier} value={supplier}>{supplier}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Purchase Date</label>
                  <input
                    type="date"
                    value={newItem.purchaseDate}
                    onChange={(e) => setNewItem({...newItem, purchaseDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date (Optional)</label>
                  <input
                    type="date"
                    value={newItem.expiryDate}
                    onChange={(e) => setNewItem({...newItem, expiryDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Storage Location</label>
                  <input
                    type="text"
                    value={newItem.location}
                    onChange={(e) => setNewItem({...newItem, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="e.g., Storage Room A"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Stock Level</label>
                  <input
                    type="number"
                    value={newItem.minStockLevel}
                    onChange={(e) => setNewItem({...newItem, minStockLevel: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Batch Number</label>
                  <input
                    type="text"
                    value={newItem.batchNumber}
                    onChange={(e) => setNewItem({...newItem, batchNumber: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Enter batch number"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={newItem.description}
                    onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    rows={3}
                    placeholder="Enter item description"
                  />
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button 
                  onClick={() => setShowAddItem(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddItem}
                  className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Add Item
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryManagement;