import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  Calendar, 
  Receipt, 
  PieChart,
  BarChart3,
  CreditCard,
  Wallet,
  Target,
  AlertCircle,
  CheckCircle,
  Clock,
  Download,
  Upload,
  Filter,
  Search,
  X,
  Edit,
  Trash2,
  Eye,
  Calculator,
  FileText,
  Building,
  Truck,
  Sprout,
  Droplets,
  Zap
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, BarChart, Bar, Pie } from 'recharts';

const FinancialManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [transactionFilter, setTransactionFilter] = useState('all');

  const [newTransaction, setNewTransaction] = useState({
    type: 'expense',
    category: '',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    paymentMethod: 'cash',
    receipt: null as File | null
  });

  const [budget, setBudget] = useState({
    seeds: 5000,
    fertilizer: 8000,
    pesticides: 3000,
    labor: 12000,
    equipment: 4000,
    fuel: 2500,
    other: 2000
  });

  // Financial Overview Data
  const financialSummary = {
    totalRevenue: 68500,
    totalExpenses: 42300,
    netProfit: 26200,
    profitMargin: 38.2,
    monthlyChange: 12.5,
    cashFlow: 15800,
    outstandingLoans: 85000,
    nextPayment: 4200
  };

  // Transaction Categories
  const expenseCategories = [
    { id: 'seeds', name: 'Seeds & Planting', icon: Sprout, color: 'emerald' },
    { id: 'fertilizer', name: 'Fertilizer & Nutrients', icon: Droplets, color: 'blue' },
    { id: 'pesticides', name: 'Pesticides & Chemicals', icon: AlertCircle, color: 'yellow' },
    { id: 'labor', name: 'Labor & Wages', icon: Building, color: 'purple' },
    { id: 'equipment', name: 'Equipment & Tools', icon: Truck, color: 'indigo' },
    { id: 'fuel', name: 'Fuel & Energy', icon: Zap, color: 'orange' },
    { id: 'maintenance', name: 'Maintenance & Repairs', icon: Truck, color: 'red' },
    { id: 'insurance', name: 'Insurance', icon: CheckCircle, color: 'green' },
    { id: 'other', name: 'Other Expenses', icon: Receipt, color: 'gray' }
  ];

  const revenueCategories = [
    { id: 'maize', name: 'Maize Sales', icon: Sprout, color: 'emerald' },
    { id: 'soybeans', name: 'Soybean Sales', icon: Sprout, color: 'green' },
    { id: 'groundnuts', name: 'Groundnut Sales', icon: Sprout, color: 'yellow' },
    { id: 'cotton', name: 'Cotton Sales', icon: Sprout, color: 'blue' },
    { id: 'livestock', name: 'Livestock Sales', icon: Building, color: 'brown' },
    { id: 'other', name: 'Other Income', icon: DollarSign, color: 'gray' }
  ];

  // Sample Transactions
  const transactions = [
    {
      id: 1,
      type: 'revenue',
      category: 'maize',
      amount: 25000,
      description: 'Maize sale to FRA - 6 tons',
      date: '2024-12-15',
      paymentMethod: 'bank_transfer',
      status: 'completed'
    },
    {
      id: 2,
      type: 'expense',
      category: 'fertilizer',
      amount: 3200,
      description: 'D-Compound fertilizer - 10 bags',
      date: '2024-12-14',
      paymentMethod: 'cash',
      status: 'completed'
    },
    {
      id: 3,
      type: 'expense',
      category: 'labor',
      amount: 1800,
      description: 'Weeding labor - 3 days',
      date: '2024-12-13',
      paymentMethod: 'mobile_money',
      status: 'completed'
    },
    {
      id: 4,
      type: 'revenue',
      category: 'soybeans',
      amount: 18500,
      description: 'Soybean sale to Tiger Feeds - 2.5 tons',
      date: '2024-12-12',
      paymentMethod: 'bank_transfer',
      status: 'pending'
    },
    {
      id: 5,
      type: 'expense',
      category: 'fuel',
      amount: 850,
      description: 'Diesel for tractor',
      date: '2024-12-11',
      paymentMethod: 'cash',
      status: 'completed'
    }
  ];

  // Monthly Financial Data
  const monthlyData = [
    { month: 'Jul', revenue: 45000, expenses: 32000, profit: 13000 },
    { month: 'Aug', revenue: 52000, expenses: 35000, profit: 17000 },
    { month: 'Sep', revenue: 48000, expenses: 38000, profit: 10000 },
    { month: 'Oct', revenue: 65000, expenses: 42000, profit: 23000 },
    { month: 'Nov', revenue: 58000, expenses: 39000, profit: 19000 },
    { month: 'Dec', revenue: 68500, expenses: 42300, profit: 26200 }
  ];

  // Expense Breakdown
  const expenseBreakdown = [
    { name: 'Labor', value: 12000, color: '#8B5CF6' },
    { name: 'Fertilizer', value: 8000, color: '#3B82F6' },
    { name: 'Seeds', value: 5000, color: '#10B981' },
    { name: 'Equipment', value: 4000, color: '#6366F1' },
    { name: 'Pesticides', value: 3000, color: '#F59E0B' },
    { name: 'Fuel', value: 2500, color: '#F97316' },
    { name: 'Other', value: 2000, color: '#6B7280' }
  ];

  // Loans and Credit
  const loans = [
    {
      id: 1,
      lender: 'Zambia National Commercial Bank',
      type: 'Agricultural Loan',
      principal: 100000,
      outstanding: 85000,
      interestRate: 18.5,
      monthlyPayment: 4200,
      nextPayment: '2025-01-15',
      status: 'active'
    },
    {
      id: 2,
      lender: 'FISP Input Loan',
      type: 'Input Credit',
      principal: 15000,
      outstanding: 8500,
      interestRate: 12.0,
      monthlyPayment: 850,
      nextPayment: '2025-01-20',
      status: 'active'
    }
  ];

  const handleAddTransaction = () => {
    // Add transaction logic
    console.log('Adding transaction:', newTransaction);
    setShowAddTransaction(false);
    setNewTransaction({
      type: 'expense',
      category: '',
      amount: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      paymentMethod: 'cash',
      receipt: null
    });
  };

  const handleUpdateBudget = () => {
    console.log('Updating budget:', budget);
    setShowBudgetModal(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-emerald-600 bg-emerald-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'overdue': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryIcon = (categoryId: string, type: string) => {
    const categories = type === 'expense' ? expenseCategories : revenueCategories;
    const category = categories.find(c => c.id === categoryId);
    return category ? category.icon : Receipt;
  };

  const filteredTransactions = transactionFilter === 'all' 
    ? transactions 
    : transactions.filter(t => t.type === transactionFilter);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Financial Management</h1>
          <p className="text-gray-600 mt-1">Track income, expenses, and farm profitability</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-2">
          <button 
            onClick={() => setShowAddTransaction(true)}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Transaction</span>
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Zambian Financial Context */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-lg shadow-sm text-white p-6">
        <h3 className="text-lg font-bold mb-3">🇿🇲 Zambian Agricultural Finance</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-semibold mb-1">Currency</h4>
            <p className="text-sm opacity-90">All amounts in Zambian Kwacha (ZMW)</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-semibold mb-1">Tax Year</h4>
            <p className="text-sm opacity-90">January - December 2024</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-semibold mb-1">FISP Support</h4>
            <p className="text-sm opacity-90">Government input subsidies tracked</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-semibold mb-1">Bank Integration</h4>
            <p className="text-sm opacity-90">ZANACO, FNB, Stanbic supported</p>
          </div>
        </div>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-emerald-600 mt-2">
                ZMW {financialSummary.totalRevenue.toLocaleString()}
              </p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-emerald-600 mr-1" />
                <span className="text-sm text-emerald-600">+{financialSummary.monthlyChange}%</span>
              </div>
            </div>
            <div className="p-3 bg-emerald-100 rounded-full">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Expenses</p>
              <p className="text-2xl font-bold text-red-600 mt-2">
                ZMW {financialSummary.totalExpenses.toLocaleString()}
              </p>
              <div className="flex items-center mt-2">
                <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                <span className="text-sm text-red-600">-5.2%</span>
              </div>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <TrendingDown className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Net Profit</p>
              <p className="text-2xl font-bold text-blue-600 mt-2">
                ZMW {financialSummary.netProfit.toLocaleString()}
              </p>
              <div className="flex items-center mt-2">
                <span className="text-sm text-blue-600">{financialSummary.profitMargin}% margin</span>
              </div>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Cash Flow</p>
              <p className="text-2xl font-bold text-purple-600 mt-2">
                ZMW {financialSummary.cashFlow.toLocaleString()}
              </p>
              <div className="flex items-center mt-2">
                <Wallet className="w-4 h-4 text-purple-600 mr-1" />
                <span className="text-sm text-purple-600">Available</span>
              </div>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Wallet className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'transactions', label: 'Transactions', icon: Receipt },
              { id: 'budget', label: 'Budget', icon: Target },
              { id: 'loans', label: 'Loans & Credit', icon: CreditCard },
              { id: 'reports', label: 'Reports', icon: FileText }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Financial Trends Chart */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Trends (Last 6 Months)</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyData}>
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

              {/* Expense Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Expense Breakdown</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <RechartsPieChart>
                      <Pie
                        data={expenseBreakdown}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {expenseBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`ZMW ${value.toLocaleString()}`, '']} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Metrics</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">ROI (Return on Investment)</span>
                      <span className="font-semibold text-emerald-600">62%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Cost per Hectare</span>
                      <span className="font-semibold">ZMW 1,692</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Revenue per Hectare</span>
                      <span className="font-semibold">ZMW 2,740</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Break-even Point</span>
                      <span className="font-semibold">3.2 tons/ha</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Debt-to-Income Ratio</span>
                      <span className="font-semibold text-yellow-600">24%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="space-y-6">
              {/* Transaction Filters */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div className="flex space-x-4">
                  <select
                    value={transactionFilter}
                    onChange={(e) => setTransactionFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="all">All Transactions</option>
                    <option value="revenue">Revenue Only</option>
                    <option value="expense">Expenses Only</option>
                  </select>
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="quarter">This Quarter</option>
                    <option value="year">This Year</option>
                  </select>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Transactions List */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {filteredTransactions.map((transaction) => {
                    const Icon = getCategoryIcon(transaction.category, transaction.type);
                    return (
                      <div key={transaction.id} className="px-6 py-4 hover:bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className={`p-2 rounded-full ${
                              transaction.type === 'revenue' ? 'bg-emerald-100' : 'bg-red-100'
                            }`}>
                              <Icon className={`w-5 h-5 ${
                                transaction.type === 'revenue' ? 'text-emerald-600' : 'text-red-600'
                              }`} />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{transaction.description}</p>
                              <p className="text-sm text-gray-500">
                                {new Date(transaction.date).toLocaleDateString()} • {transaction.paymentMethod.replace('_', ' ')}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <p className={`font-semibold ${
                                transaction.type === 'revenue' ? 'text-emerald-600' : 'text-red-600'
                              }`}>
                                {transaction.type === 'revenue' ? '+' : '-'}ZMW {transaction.amount.toLocaleString()}
                              </p>
                              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(transaction.status)}`}>
                                {transaction.status}
                              </span>
                            </div>
                            <div className="flex space-x-2">
                              <button className="p-1 text-gray-400 hover:text-blue-600">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-1 text-gray-400 hover:text-emerald-600">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="p-1 text-gray-400 hover:text-red-600">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'budget' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Budget Management</h3>
                <button 
                  onClick={() => setShowBudgetModal(true)}
                  className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Update Budget
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {expenseCategories.map((category) => {
                  const budgetAmount = budget[category.id as keyof typeof budget] || 0;
                  const spent = Math.floor(budgetAmount * (0.3 + Math.random() * 0.6)); // Mock spent amount
                  const percentage = (spent / budgetAmount) * 100;
                  const Icon = category.icon;

                  return (
                    <div key={category.id} className="bg-white border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 bg-${category.color}-100 rounded-lg`}>
                            <Icon className={`w-5 h-5 text-${category.color}-600`} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{category.name}</h4>
                            <p className="text-sm text-gray-500">Monthly Budget</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Spent</span>
                          <span className="font-medium">ZMW {spent.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Budget</span>
                          <span className="font-medium">ZMW {budgetAmount.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              percentage > 90 ? 'bg-red-500' : 
                              percentage > 75 ? 'bg-yellow-500' : 'bg-emerald-500'
                            }`}
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className={`font-medium ${
                            percentage > 90 ? 'text-red-600' : 
                            percentage > 75 ? 'text-yellow-600' : 'text-emerald-600'
                          }`}>
                            {percentage.toFixed(1)}% used
                          </span>
                          <span className="text-gray-500">
                            ZMW {(budgetAmount - spent).toLocaleString()} left
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'loans' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Outstanding</p>
                      <p className="text-2xl font-bold text-red-600 mt-2">
                        ZMW {financialSummary.outstandingLoans.toLocaleString()}
                      </p>
                    </div>
                    <div className="p-3 bg-red-100 rounded-full">
                      <CreditCard className="w-6 h-6 text-red-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Next Payment</p>
                      <p className="text-2xl font-bold text-yellow-600 mt-2">
                        ZMW {financialSummary.nextPayment.toLocaleString()}
                      </p>
                    </div>
                    <div className="p-3 bg-yellow-100 rounded-full">
                      <Clock className="w-6 h-6 text-yellow-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Credit Score</p>
                      <p className="text-2xl font-bold text-emerald-600 mt-2">Good</p>
                    </div>
                    <div className="p-3 bg-emerald-100 rounded-full">
                      <CheckCircle className="w-6 h-6 text-emerald-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Loans List */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <h3 className="text-lg font-semibold text-gray-900">Active Loans</h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {loans.map((loan) => (
                    <div key={loan.id} className="px-6 py-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-gray-900">{loan.lender}</h4>
                          <p className="text-sm text-gray-600">{loan.type}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          loan.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {loan.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Outstanding</p>
                          <p className="font-semibold text-red-600">ZMW {loan.outstanding.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Interest Rate</p>
                          <p className="font-semibold">{loan.interestRate}% p.a.</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Monthly Payment</p>
                          <p className="font-semibold">ZMW {loan.monthlyPayment.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Next Payment</p>
                          <p className="font-semibold">{new Date(loan.nextPayment).toLocaleDateString()}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span>Repayment Progress</span>
                          <span>{((loan.principal - loan.outstanding) / loan.principal * 100).toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-emerald-500 h-2 rounded-full"
                            style={{ width: `${(loan.principal - loan.outstanding) / loan.principal * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: 'Profit & Loss Statement', description: 'Comprehensive P&L for tax filing', icon: FileText },
                  { name: 'Cash Flow Report', description: 'Monthly cash flow analysis', icon: TrendingUp },
                  { name: 'Tax Summary', description: 'Annual tax preparation report', icon: Calculator },
                  { name: 'ROI Analysis', description: 'Return on investment by crop', icon: Target },
                  { name: 'Budget vs Actual', description: 'Budget performance analysis', icon: BarChart3 },
                  { name: 'Loan Summary', description: 'All loans and payment schedules', icon: CreditCard }
                ].map((report, index) => {
                  const Icon = report.icon;
                  return (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="p-3 bg-emerald-100 rounded-lg">
                          <Icon className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{report.name}</h4>
                          <p className="text-sm text-gray-600">{report.description}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="flex-1 bg-emerald-600 text-white py-2 px-3 rounded text-sm hover:bg-emerald-700 transition-colors">
                          Generate
                        </button>
                        <button className="p-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Transaction Modal */}
      {showAddTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Add Transaction</h3>
              <button 
                onClick={() => setShowAddTransaction(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Transaction Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setNewTransaction({...newTransaction, type: 'revenue'})}
                      className={`p-3 rounded-lg border-2 transition-colors ${
                        newTransaction.type === 'revenue'
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <TrendingUp className="w-5 h-5 mx-auto mb-1" />
                      <span className="text-sm font-medium">Revenue</span>
                    </button>
                    <button
                      onClick={() => setNewTransaction({...newTransaction, type: 'expense'})}
                      className={`p-3 rounded-lg border-2 transition-colors ${
                        newTransaction.type === 'expense'
                          ? 'border-red-500 bg-red-50 text-red-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <TrendingDown className="w-5 h-5 mx-auto mb-1" />
                      <span className="text-sm font-medium">Expense</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={newTransaction.category}
                    onChange={(e) => setNewTransaction({...newTransaction, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="">Select category</option>
                    {(newTransaction.type === 'expense' ? expenseCategories : revenueCategories).map((category) => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amount (ZMW)</label>
                  <input
                    type="number"
                    value={newTransaction.amount}
                    onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <input
                    type="text"
                    value={newTransaction.description}
                    onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Enter description"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <input
                      type="date"
                      value={newTransaction.date}
                      onChange={(e) => setNewTransaction({...newTransaction, date: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                    <select
                      value={newTransaction.paymentMethod}
                      onChange={(e) => setNewTransaction({...newTransaction, paymentMethod: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="cash">Cash</option>
                      <option value="bank_transfer">Bank Transfer</option>
                      <option value="mobile_money">Mobile Money</option>
                      <option value="check">Check</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Receipt (Optional)</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click to upload receipt</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button 
                  onClick={() => setShowAddTransaction(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddTransaction}
                  className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Add Transaction
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Budget Modal */}
      {showBudgetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Update Monthly Budget</h3>
              <button 
                onClick={() => setShowBudgetModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {expenseCategories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <div key={category.id} className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                        <Icon className={`w-4 h-4 text-${category.color}-600`} />
                        <span>{category.name}</span>
                      </label>
                      <input
                        type="number"
                        value={budget[category.id as keyof typeof budget]}
                        onChange={(e) => setBudget({...budget, [category.id]: parseInt(e.target.value) || 0})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="0"
                      />
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900">Total Monthly Budget:</span>
                  <span className="text-xl font-bold text-emerald-600">
                    ZMW {Object.values(budget).reduce((sum, amount) => sum + amount, 0).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button 
                  onClick={() => setShowBudgetModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleUpdateBudget}
                  className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Update Budget
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialManagement;