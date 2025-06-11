import React, { useState } from 'react';
import { 
  User, 
  Edit, 
  Save, 
  X, 
  Camera, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Award, 
  Settings, 
  Bell, 
  Shield, 
  Globe, 
  Download, 
  Upload, 
  Trash2,
  Eye,
  EyeOff,
  CheckCircle,
  AlertTriangle,
  Building,
  Sprout,
  TrendingUp,
  DollarSign,
  Target,
  Clock,
  Star,
  Users,
  FileText,
  CreditCard,
  Smartphone,
  Wifi,
  Database,
  Lock
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { zambianProvinces } from '../data/zambianData';

const UserProfile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);

  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    farmProfile: {
      farmName: user?.farmProfile?.farmName || '',
      location: user?.farmProfile?.location || '',
      province: user?.farmProfile?.province || '',
      totalArea: user?.farmProfile?.totalArea || 0,
      coordinates: user?.farmProfile?.coordinates || '',
      soilType: user?.farmProfile?.soilType || '',
      waterSource: user?.farmProfile?.waterSource || '',
      establishedYear: user?.farmProfile?.establishedYear || 0,
      certification: user?.farmProfile?.certification || ''
    },
    preferences: {
      language: user?.preferences?.language || 'English',
      currency: user?.preferences?.currency || 'ZMW',
      notifications: user?.preferences?.notifications || true,
      theme: user?.preferences?.theme || 'light'
    }
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notifications, setNotifications] = useState({
    weatherAlerts: true,
    marketUpdates: true,
    cropReminders: true,
    systemUpdates: false,
    communityMessages: true,
    expertAdvice: true,
    priceAlerts: true,
    maintenanceReminders: true
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    shareLocation: true,
    shareYieldData: false,
    allowMessages: true,
    showInDirectory: true
  });

  // User Statistics
  const userStats = {
    joinDate: user?.farmProfile?.establishedYear || 2024,
    postsCreated: 23,
    helpfulAnswers: 45,
    reputation: 245,
    coursesCompleted: 8,
    certificationsEarned: 3,
    totalYield: 156.8,
    profitMargin: 38.2,
    sustainabilityScore: 81,
    communityRank: 12
  };

  // Achievements
  const achievements = [
    { id: 1, name: 'Sustainability Champion', description: 'Achieved 80+ sustainability score', icon: Sprout, earned: true, date: '2024-11-15' },
    { id: 2, name: 'High Yield Master', description: 'Exceeded 6 tons/ha yield', icon: TrendingUp, earned: true, date: '2024-10-20' },
    { id: 3, name: 'Community Helper', description: '50+ helpful forum answers', icon: Users, earned: true, date: '2024-09-10' },
    { id: 4, name: 'Profit Optimizer', description: '35%+ profit margin achieved', icon: DollarSign, earned: true, date: '2024-08-25' },
    { id: 5, name: 'Innovation Adopter', description: 'Implemented 5+ smart farming practices', icon: Target, earned: false, date: null },
    { id: 6, name: 'Expert Contributor', description: '100+ forum posts created', icon: Star, earned: false, date: null }
  ];

  // Subscription Plans
  const subscriptionPlans = [
    {
      name: 'Free',
      price: 0,
      features: ['Basic crop tracking', 'Weather updates', 'Community access', 'Limited analytics'],
      current: user?.subscription?.plan === 'free'
    },
    {
      name: 'Basic',
      price: 50,
      features: ['Advanced analytics', 'IoT integration', 'Expert consultation', 'Priority support'],
      current: user?.subscription?.plan === 'basic'
    },
    {
      name: 'Premium',
      price: 120,
      features: ['AI predictions', 'Custom reports', 'API access', 'White-label options'],
      current: user?.subscription?.plan === 'premium'
    }
  ];

  const handleSaveProfile = () => {
    updateProfile(editForm);
    setIsEditing(false);
  };

  const handlePasswordChange = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Handle password change logic
    console.log('Changing password...');
    setShowPasswordChange(false);
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const handlePrivacyChange = (key: string, value: any) => {
    setPrivacy(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Profile</h1>
          <p className="text-gray-600 mt-1">Manage your account settings and farm information</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-2">
          {!isEditing ? (
            <button 
              onClick={() => setIsEditing(true)}
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
            >
              <Edit className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
          ) : (
            <div className="flex space-x-2">
              <button 
                onClick={handleSaveProfile}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
              <button 
                onClick={() => setIsEditing(false)}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors flex items-center space-x-2"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Profile Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg shadow-sm text-white p-6">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-white" />
            </div>
            <button className="absolute bottom-0 right-0 bg-white text-emerald-600 p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{user?.name}</h2>
            <p className="text-emerald-100 capitalize">{user?.role}</p>
            <div className="flex items-center space-x-4 mt-2 text-sm">
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{user?.farmProfile?.location}, {user?.farmProfile?.province}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Member since {userStats.joinDate}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Award className="w-4 h-4" />
                <span>{userStats.reputation} reputation</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'profile', label: 'Profile Info', icon: User },
              { id: 'farm', label: 'Farm Details', icon: Building },
              { id: 'achievements', label: 'Achievements', icon: Award },
              { id: 'settings', label: 'Settings', icon: Settings },
              { id: 'subscription', label: 'Subscription', icon: CreditCard },
              { id: 'privacy', label: 'Privacy', icon: Shield }
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
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  ) : (
                    <p className="text-gray-900">{user?.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  ) : (
                    <p className="text-gray-900">{user?.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editForm.phone}
                      onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  ) : (
                    <p className="text-gray-900">{user?.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                  <p className="text-gray-900 capitalize">{user?.role}</p>
                </div>
              </div>

              {/* User Statistics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-emerald-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-emerald-600">{userStats.postsCreated}</p>
                  <p className="text-sm text-emerald-700">Posts Created</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-blue-600">{userStats.helpfulAnswers}</p>
                  <p className="text-sm text-blue-700">Helpful Answers</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-purple-600">{userStats.coursesCompleted}</p>
                  <p className="text-sm text-purple-700">Courses Completed</p>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-yellow-600">{userStats.certificationsEarned}</p>
                  <p className="text-sm text-yellow-700">Certifications</p>
                </div>
              </div>

              {/* Password Change */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Password & Security</h3>
                    <p className="text-sm text-gray-600">Manage your account security settings</p>
                  </div>
                  <button 
                    onClick={() => setShowPasswordChange(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'farm' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Farm Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.farmProfile.farmName}
                      onChange={(e) => setEditForm({
                        ...editForm,
                        farmProfile: {...editForm.farmProfile, farmName: e.target.value}
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  ) : (
                    <p className="text-gray-900">{user?.farmProfile?.farmName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Province</label>
                  {isEditing ? (
                    <select
                      value={editForm.farmProfile.province}
                      onChange={(e) => setEditForm({
                        ...editForm,
                        farmProfile: {...editForm.farmProfile, province: e.target.value}
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      {zambianProvinces.map(province => (
                        <option key={province} value={province}>{province}</option>
                      ))}
                    </select>
                  ) : (
                    <p className="text-gray-900">{user?.farmProfile?.province}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location/District</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.farmProfile.location}
                      onChange={(e) => setEditForm({
                        ...editForm,
                        farmProfile: {...editForm.farmProfile, location: e.target.value}
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  ) : (
                    <p className="text-gray-900">{user?.farmProfile?.location}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Total Area (hectares)</label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editForm.farmProfile.totalArea}
                      onChange={(e) => setEditForm({
                        ...editForm,
                        farmProfile: {...editForm.farmProfile, totalArea: parseInt(e.target.value)}
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  ) : (
                    <p className="text-gray-900">{user?.farmProfile?.totalArea} hectares</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Soil Type</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.farmProfile.soilType}
                      onChange={(e) => setEditForm({
                        ...editForm,
                        farmProfile: {...editForm.farmProfile, soilType: e.target.value}
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  ) : (
                    <p className="text-gray-900">{user?.farmProfile?.soilType}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Water Source</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.farmProfile.waterSource}
                      onChange={(e) => setEditForm({
                        ...editForm,
                        farmProfile: {...editForm.farmProfile, waterSource: e.target.value}
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  ) : (
                    <p className="text-gray-900">{user?.farmProfile?.waterSource}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Established Year</label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editForm.farmProfile.establishedYear}
                      onChange={(e) => setEditForm({
                        ...editForm,
                        farmProfile: {...editForm.farmProfile, establishedYear: parseInt(e.target.value)}
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  ) : (
                    <p className="text-gray-900">{user?.farmProfile?.establishedYear}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Certification</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.farmProfile.certification}
                      onChange={(e) => setEditForm({
                        ...editForm,
                        farmProfile: {...editForm.farmProfile, certification: e.target.value}
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  ) : (
                    <p className="text-gray-900">{user?.farmProfile?.certification}</p>
                  )}
                </div>
              </div>

              {/* Farm Performance Summary */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Farm Performance Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-emerald-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-emerald-600" />
                      <span className="font-medium text-emerald-800">Total Yield</span>
                    </div>
                    <p className="text-2xl font-bold text-emerald-600">{userStats.totalYield} tons</p>
                    <p className="text-sm text-emerald-700">This season</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <DollarSign className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-blue-800">Profit Margin</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-600">{userStats.profitMargin}%</p>
                    <p className="text-sm text-blue-700">Above average</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Sprout className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-green-800">Sustainability</span>
                    </div>
                    <p className="text-2xl font-bold text-green-600">{userStats.sustainabilityScore}/100</p>
                    <p className="text-sm text-green-700">Excellent rating</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Achievements</h3>
                <p className="text-gray-600">Unlock badges by reaching farming milestones</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.map((achievement) => {
                  const Icon = achievement.icon;
                  return (
                    <div key={achievement.id} className={`border rounded-lg p-4 ${
                      achievement.earned 
                        ? 'border-emerald-200 bg-emerald-50' 
                        : 'border-gray-200 bg-gray-50'
                    }`}>
                      <div className="flex items-center space-x-3 mb-3">
                        <div className={`p-2 rounded-full ${
                          achievement.earned 
                            ? 'bg-emerald-100 text-emerald-600' 
                            : 'bg-gray-200 text-gray-400'
                        }`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className={`font-semibold ${
                            achievement.earned ? 'text-emerald-800' : 'text-gray-600'
                          }`}>
                            {achievement.name}
                          </h4>
                          {achievement.earned && achievement.date && (
                            <p className="text-sm text-emerald-600">
                              Earned {new Date(achievement.date).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                      <p className={`text-sm ${
                        achievement.earned ? 'text-emerald-700' : 'text-gray-600'
                      }`}>
                        {achievement.description}
                      </p>
                      {achievement.earned && (
                        <div className="mt-2">
                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Community Ranking */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Community Ranking</h3>
                <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg text-white p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">Your Rank</p>
                      <p className="text-3xl font-bold">#{userStats.communityRank}</p>
                      <p className="text-purple-200">out of 1,247 farmers</p>
                    </div>
                    <div className="text-right">
                      <p className="text-purple-100">Reputation Score</p>
                      <p className="text-2xl font-bold">{userStats.reputation}</p>
                      <p className="text-purple-200">Top 5% performer</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              {/* Preferences */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferences</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                    <select
                      value={editForm.preferences.language}
                      onChange={(e) => setEditForm({
                        ...editForm,
                        preferences: {...editForm.preferences, language: e.target.value}
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="English">English</option>
                      <option value="Bemba">Bemba</option>
                      <option value="Nyanja">Nyanja</option>
                      <option value="Tonga">Tonga</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                    <select
                      value={editForm.preferences.currency}
                      onChange={(e) => setEditForm({
                        ...editForm,
                        preferences: {...editForm.preferences, currency: e.target.value}
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="ZMW">Zambian Kwacha (ZMW)</option>
                      <option value="USD">US Dollar (USD)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                    <select
                      value={editForm.preferences.theme}
                      onChange={(e) => setEditForm({
                        ...editForm,
                        preferences: {...editForm.preferences, theme: e.target.value}
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="auto">Auto</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Notification Settings */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Settings</h3>
                <div className="space-y-4">
                  {Object.entries(notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                        </p>
                        <p className="text-sm text-gray-600">
                          {key === 'weatherAlerts' && 'Receive alerts about weather conditions'}
                          {key === 'marketUpdates' && 'Get notified about market price changes'}
                          {key === 'cropReminders' && 'Reminders for crop management activities'}
                          {key === 'systemUpdates' && 'System maintenance and feature updates'}
                          {key === 'communityMessages' && 'Messages from community members'}
                          {key === 'expertAdvice' && 'Advice and tips from agricultural experts'}
                          {key === 'priceAlerts' && 'Alerts when crop prices reach target levels'}
                          {key === 'maintenanceReminders' && 'Equipment maintenance reminders'}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) => handleNotificationChange(key, e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'subscription' && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Subscription Plans</h3>
                <p className="text-gray-600">Choose the plan that best fits your farming needs</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {subscriptionPlans.map((plan, index) => (
                  <div key={index} className={`border rounded-lg p-6 ${
                    plan.current ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200'
                  }`}>
                    <div className="text-center mb-4">
                      <h4 className="text-xl font-bold text-gray-900">{plan.name}</h4>
                      <p className="text-3xl font-bold text-emerald-600 mt-2">
                        ZMW {plan.price}
                        <span className="text-sm font-normal text-gray-600">/month</span>
                      </p>
                    </div>
                    
                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <button className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                      plan.current 
                        ? 'bg-emerald-600 text-white cursor-default' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}>
                      {plan.current ? 'Current Plan' : 'Upgrade'}
                    </button>
                  </div>
                ))}
              </div>

              {/* Billing Information */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing Information</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Next billing date</p>
                      <p className="text-sm text-gray-600">January 15, 2025</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">Amount</p>
                      <p className="text-sm text-gray-600">ZMW 50.00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Profile Visibility</p>
                      <p className="text-sm text-gray-600">Control who can see your profile information</p>
                    </div>
                    <select
                      value={privacy.profileVisibility}
                      onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="public">Public</option>
                      <option value="community">Community Only</option>
                      <option value="private">Private</option>
                    </select>
                  </div>

                  {Object.entries(privacy).filter(([key]) => key !== 'profileVisibility').map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                        </p>
                        <p className="text-sm text-gray-600">
                          {key === 'shareLocation' && 'Allow others to see your farm location'}
                          {key === 'shareYieldData' && 'Share your yield data for research purposes'}
                          {key === 'allowMessages' && 'Allow community members to message you'}
                          {key === 'showInDirectory' && 'Show your profile in the farmer directory'}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={value as boolean}
                          onChange={(e) => handlePrivacyChange(key, e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Data Export */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Management</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Export Your Data</p>
                      <p className="text-sm text-gray-600">Download all your farm data and activity</p>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                      <Download className="w-4 h-4" />
                      <span>Export</span>
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Delete Account</p>
                      <p className="text-sm text-gray-600">Permanently delete your account and all data</p>
                    </div>
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2">
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordChange && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>
              <button 
                onClick={() => setShowPasswordChange(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                  <input
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                  <input
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button 
                  onClick={() => setShowPasswordChange(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handlePasswordChange}
                  className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;