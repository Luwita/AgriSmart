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
  Zap,
  ChevronRight,
  Filter,
  Search
} from 'lucide-react';

const MobileFinancialManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [transactionFilter, setTransactionFilter] = useState('all');

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
    { id: 'fertilizer', name: 'Fertilizer', icon: Droplets, color: 'blue' },
    { id: 'pesticides', name: 'Pesticides', icon: AlertCircle, color: 'yellow' },
    { id: 'labor', name: 'Labor & Wages', icon: Building, color: 'purple' },
    { id: 'fuel', name: 'Fuel & Energy', icon: Zap, color: 'orange' }
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
      description: 'Soybean sale to Tiger Feeds',
      date: '2024-12-12',
      paymentMethod: 'bank_transfer',
      status: 'pending'
    }
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
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-emerald-600 bg-emerald-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'overdue': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryIcon = (categoryId: string, type: string) => {
    if (type === 'expense') {
      const category = expenseCategories.find(c => c.id === categoryId);
      return category ? category.icon : Receipt;
    }
    return Sprout; // Default for revenue
  };

  const filteredTransactions = transactionFilter === 'all' 
    ? transactions 
    : transactions.filter(t => t.type === transactionFilter);

  return (
    <div className="p-4 space-y-4 pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Financial Management</h1>
          <p className="text-gray-600 text-sm">Track income, expenses, and profit</p>
        </div>
        <button 
          onClick={() => setShowAddTransaction(true)}
          className="bg-emerald-600 text-white p-2 rounded-xl hover:bg-emerald-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Zambian Financial Context */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-xl text-white p-4">
        <h3 className="font-bold mb-2">🇿🇲 Zambian Agricultural Finance</h3>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-white bg-opacity-20 rounded-lg p-2">
            <p className="font-medium">Currency</p>
            <p className="opacity-90">All amounts in ZMW</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-2">
            <p className="font-medium">Tax Year</p>
            <p className="opacity-90">January - December 2024</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
        <div className="flex border-b border-gray-200">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'transactions', label: 'Transactions' },
            { id: 'budget', label: 'Budget' },
            { id: 'loans', label: 'Loans' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 text-center text-xs font-medium ${
                activeTab === tab.id
                  ? 'border-b-2 border-emerald-500 text-emerald-600'
                  : 'text-gray-500'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-4">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              {/* Financial Overview Cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-600">Revenue</p>
                      <p className="text-lg font-bold text-emerald-600 mt-1">
                        ZMW {financialSummary.totalRevenue.toLocaleString()}
                      </p>
                      <div className="flex items-center mt-1">
                        <TrendingUp className="w-3 h-3 text-emerald-600 mr-1" />
                        <span className="text-xs text-emerald-600">+{financialSummary.monthlyChange}%</span>
                      </div>
                    </div>
                    <div className="p-2 bg-emerald-100 rounded-full">
                      <TrendingUp className="w-5 h-5 text-emerald-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-600">Expenses</p>
                      <p className="text-lg font-bold text-red-600 mt-1">
                        ZMW {financialSummary.totalExpenses.toLocaleString()}
                      </p>
                      <div className="flex items-center mt-1">
                        <TrendingDown className="w-3 h-3 text-red-600 mr-1" />
                        <span className="text-xs text-red-600">-5.2%</span>
                      </div>
                    </div>
                    <div className="p-2 bg-red-100 rounded-full">
                      <TrendingDown className="w-5 h-5 text-red-600" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-600">Net Profit</p>
                      <p className="text-lg font-bold text-blue-600 mt-1">
                        ZMW {financialSummary.netProfit.toLocaleString()}
                      </p>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-blue-600">{financialSummary.profitMargin}% margin</span>
                      </div>
                    </div>
                    <div className="p-2 bg-blue-100 rounded-full">
                      <DollarSign className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-600">Cash Flow</p>
                      <p className="text-lg font-bold text-purple-600 mt-1">
                        ZMW {financialSummary.cashFlow.toLocaleString()}
                      </p>
                      <div className="flex items-center mt-1">
                        <Wallet className="w-3 h-3 text-purple-600 mr-1" />
                        <span className="text-xs text-purple-600">Available</span>
                      </div>
                    </div>
                    <div className="p-2 bg-purple-100 rounded-full">
                      <Wallet className="w-5 h-5 text-purple-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Key Metrics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">ROI (Return on Investment)</span>
                    <span className="text-xs font-semibold text-emerald-600">62%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Cost per Hectare</span>
                    <span className="text-xs font-semibold">ZMW 1,692</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Revenue per Hectare</span>
                    <span className="text-xs font-semibold">ZMW 2,740</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Break-even Point</span>
                    <span className="text-xs font-semibold">3.2 tons/ha</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="space-y-4">
              {/* Transaction Filters */}
              <div className="flex items-center space-x-2">
                <select
                  value={transactionFilter}
                  onChange={(e) => setTransactionFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="all">All Transactions</option>
                  <option value="revenue">Revenue Only</option>
                  <option value="expense">Expenses Only</option>
                </select>
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Transactions List */}
              <div className="space-y-3">
                {filteredTransactions.map((transaction) => {
                  const Icon = getCategoryIcon(transaction.category, transaction.type);
                  return (
                    <div key={transaction.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-full ${
                            transaction.type === 'revenue' ? 'bg-emerald-100' : 'bg-red-100'
                          }`}>
                            <Icon className={`w-4 h-4 ${
                              transaction.type === 'revenue' ? 'text-emerald-600' : 'text-red-600'
                            }`} />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                            <p className="text-xs text-gray-500">
                              {new Date(transaction.date).toLocaleDateString()} • {transaction.paymentMethod.replace('_', ' ')}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${
                            transaction.type === 'revenue' ? 'text-emerald-600' : 'text-red-600'
                          }`}>
                            {transaction.type === 'revenue' ? '+' : '-'}ZMW {transaction.amount.toLocaleString()}
                          </p>
                          <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(transaction.status)}`}>
                            {transaction.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'budget' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold text-gray-900">Budget Management</h3>
                <button className="bg-emerald-600 text-white px-3 py-1 rounded-lg text-xs">
                  Update
                </button>
              </div>

              <div className="space-y-3">
                {expenseCategories.map((category) => {
                  const Icon = category.icon;
                  const budgetAmount = 5000; // Mock budget amount
                  const spent = Math.floor(budgetAmount * 0.6); // Mock spent amount
                  const percentage = (spent / budgetAmount) * 100;

                  return (
                    <div key={category.id} className="bg-white border border-gray-200 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className={`p-1.5 bg-${category.color}-100 rounded-lg`}>
                            <Icon className={`w-4 h-4 text-${category.color}-600`} />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 text-sm">{category.name}</h4>
                            <p className="text-xs text-gray-500">Monthly Budget</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600">Spent</span>
                          <span className="font-medium">ZMW {spent.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600">Budget</span>
                          <span className="font-medium">ZMW {budgetAmount.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full ${
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
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-600">Outstanding</p>
                      <p className="text-lg font-bold text-red-600 mt-1">
                        ZMW {financialSummary.outstandingLoans.toLocaleString()}
                      </p>
                    </div>
                    <div className="p-2 bg-red-100 rounded-full">
                      <CreditCard className="w-5 h-5 text-red-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-600">Next Payment</p>
                      <p className="text-lg font-bold text-yellow-600 mt-1">
                        ZMW {financialSummary.nextPayment.toLocaleString()}
                      </p>
                    </div>
                    <div className="p-2 bg-yellow-100 rounded-full">
                      <Clock className="w-5 h-5 text-yellow-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Loans List */}
              <div className="space-y-3">
                {loans.map((loan) => (
                  <div key={loan.id} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">{loan.lender}</h4>
                        <p className="text-xs text-gray-600">{loan.type}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        loan.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {loan.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 text-xs mb-3">
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
                    
                    <div className="mt-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Repayment Progress</span>
                        <span>{((loan.principal - loan.outstanding) / loan.principal * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-emerald-500 h-1.5 rounded-full"
                          style={{ width: `${(loan.principal - loan.outstanding) / loan.principal * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Transaction Modal */}
      {showAddTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col">
          <div className="bg-white rounded-t-2xl mt-auto max-h-[90vh] overflow-y-auto w-full">
            <div className="sticky top-0 bg-white px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Add Transaction</h3>
              <button 
                onClick={() => setShowAddTransaction(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Transaction Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <button className="p-3 rounded-lg border-2 border-emerald-500 bg-emerald-50 text-emerald-700">
                    <TrendingUp className="w-5 h-5 mx-auto mb-1" />
                    <span className="text-sm font-medium">Revenue</span>
                  </button>
                  <button className="p-3 rounded-lg border-2 border-gray-200 hover:border-gray-300">
                    <TrendingDown className="w-5 h-5 mx-auto mb-1" />
                    <span className="text-sm font-medium">Expense</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                  <option value="">Select category</option>
                  <option value="maize">Maize Sales</option>
                  <option value="soybeans">Soybean Sales</option>
                  <option value="groundnuts">Groundnut Sales</option>
                  <option value="other">Other Income</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount (ZMW)</label>
                <input
                  type="number"
                  className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <input
                  type="text"
                  className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                  <select className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                    <option value="cash">Cash</option>
                    <option value="bank_transfer">Bank Transfer</option>
                    <option value="mobile_money">Mobile Money</option>
                    <option value="check">Check</option>
                  </select>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button 
                  onClick={() => setShowAddTransaction(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-xl hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setShowAddTransaction(false)}
                  className="flex-1 bg-emerald-600 text-white py-3 px-4 rounded-xl hover:bg-emerald-700 transition-colors"
                >
                  Add Transaction
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileFinancialManagement;