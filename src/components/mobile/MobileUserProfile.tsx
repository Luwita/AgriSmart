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
  ChevronRight,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const MobileUserProfile: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [showPasswordChange, setShowPasswordChange] = useState(false);

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
    { id: 3, name: 'Community Helper', description: '50+ helpful forum answers', icon: Users, earned: false, date: null },
    { id: 4, name: 'Profit Optimizer', description: '35%+ profit margin achieved', icon: DollarSign, earned: true, date: '2024-08-25' },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="p-4 space-y-4 pb-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl text-white p-5">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <button className="absolute bottom-0 right-0 bg-white text-emerald-600 p-1 rounded-full">
              <Camera className="w-3 h-3" />
            </button>
          </div>
          <div>
            <h2 className="text-xl font-bold">{user?.name}</h2>
            <p className="text-emerald-100 capitalize text-sm">{user?.role}</p>
            <div className="flex items-center space-x-2 mt-1 text-xs">
              <MapPin className="w-3 h-3" />
              <span>{user?.farmProfile?.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
        <div className="flex border-b border-gray-200">
          {[
            { id: 'profile', label: 'Profile' },
            { id: 'farm', label: 'Farm' },
            { id: 'achievements', label: 'Achievements' },
            { id: 'settings', label: 'Settings' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 text-center text-sm font-medium ${
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
          {activeTab === 'profile' && (
            <div className="space-y-4">
              {/* Personal Information */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
                  <p className="text-sm text-gray-900 p-2 bg-gray-50 rounded-lg">{user?.name}</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Email Address</label>
                  <p className="text-sm text-gray-900 p-2 bg-gray-50 rounded-lg">{user?.email}</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Phone Number</label>
                  <p className="text-sm text-gray-900 p-2 bg-gray-50 rounded-lg">{user?.phone}</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Role</label>
                  <p className="text-sm text-gray-900 capitalize p-2 bg-gray-50 rounded-lg">{user?.role}</p>
                </div>
              </div>

              {/* User Statistics */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-emerald-50 rounded-lg p-3 text-center">
                  <p className="text-xl font-bold text-emerald-600">{userStats.postsCreated}</p>
                  <p className="text-xs text-emerald-700">Posts Created</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <p className="text-xl font-bold text-blue-600">{userStats.helpfulAnswers}</p>
                  <p className="text-xs text-blue-700">Helpful Answers</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-3 text-center">
                  <p className="text-xl font-bold text-purple-600">{userStats.coursesCompleted}</p>
                  <p className="text-xs text-purple-700">Courses Completed</p>
                </div>
                <div className="bg-yellow-50 rounded-lg p-3 text-center">
                  <p className="text-xl font-bold text-yellow-600">{userStats.certificationsEarned}</p>
                  <p className="text-xs text-yellow-700">Certifications</p>
                </div>
              </div>

              {/* Password Change */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">Password & Security</h3>
                    <p className="text-xs text-gray-600">Manage your account security</p>
                  </div>
                  <button 
                    onClick={() => setShowPasswordChange(true)}
                    className="bg-blue-600 text-white px-3 py-1 rounded-lg text-xs"
                  >
                    Change
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'farm' && (
            <div className="space-y-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Farm Name</label>
                  <p className="text-sm text-gray-900 p-2 bg-gray-50 rounded-lg">{user?.farmProfile?.farmName}</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Province</label>
                  <p className="text-sm text-gray-900 p-2 bg-gray-50 rounded-lg">{user?.farmProfile?.province}</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Location/District</label>
                  <p className="text-sm text-gray-900 p-2 bg-gray-50 rounded-lg">{user?.farmProfile?.location}</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Total Area</label>
                  <p className="text-sm text-gray-900 p-2 bg-gray-50 rounded-lg">{user?.farmProfile?.totalArea} hectares</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Soil Type</label>
                  <p className="text-sm text-gray-900 p-2 bg-gray-50 rounded-lg">{user?.farmProfile?.soilType}</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Water Source</label>
                  <p className="text-sm text-gray-900 p-2 bg-gray-50 rounded-lg">{user?.farmProfile?.waterSource}</p>
                </div>
              </div>

              {/* Farm Performance Summary */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Farm Performance</h3>
                <div className="grid grid-cols-1 gap-3">
                  <div className="bg-emerald-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs font-medium text-emerald-800">Total Yield</span>
                    </div>
                    <p className="text-lg font-bold text-emerald-600">{userStats.totalYield} tons</p>
                    <p className="text-xs text-emerald-700">This season</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <DollarSign className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-medium text-blue-800">Profit Margin</span>
                    </div>
                    <p className="text-lg font-bold text-blue-600">{userStats.profitMargin}%</p>
                    <p className="text-xs text-blue-700">Above average</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Sprout className="w-4 h-4 text-green-600" />
                      <span className="text-xs font-medium text-green-800">Sustainability</span>
                    </div>
                    <p className="text-lg font-bold text-green-600">{userStats.sustainabilityScore}/100</p>
                    <p className="text-xs text-green-700">Excellent rating</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="space-y-4">
              <div className="text-center mb-4">
                <h3 className="text-sm font-semibold text-gray-900">Your Achievements</h3>
                <p className="text-xs text-gray-600">Unlock badges by reaching farming milestones</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {achievements.map((achievement) => {
                  const Icon = achievement.icon;
                  return (
                    <div key={achievement.id} className={`border rounded-lg p-3 ${
                      achievement.earned 
                        ? 'border-emerald-200 bg-emerald-50' 
                        : 'border-gray-200 bg-gray-50'
                    }`}>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className={`p-1 rounded-full ${
                          achievement.earned 
                            ? 'bg-emerald-100 text-emerald-600' 
                            : 'bg-gray-200 text-gray-400'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className={`font-medium text-xs ${
                            achievement.earned ? 'text-emerald-800' : 'text-gray-600'
                          }`}>
                            {achievement.name}
                          </h4>
                        </div>
                      </div>
                      <p className={`text-xs ${
                        achievement.earned ? 'text-emerald-700' : 'text-gray-600'
                      }`}>
                        {achievement.description}
                      </p>
                      {achievement.earned && achievement.date && (
                        <p className="text-xs text-emerald-600 mt-1">
                          Earned {new Date(achievement.date).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Community Ranking */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Community Ranking</h3>
                <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg text-white p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-xs">Your Rank</p>
                      <p className="text-2xl font-bold">#{userStats.communityRank}</p>
                      <p className="text-purple-200 text-xs">out of 1,247 farmers</p>
                    </div>
                    <div className="text-right">
                      <p className="text-purple-100 text-xs">Reputation</p>
                      <p className="text-xl font-bold">{userStats.reputation}</p>
                      <p className="text-purple-200 text-xs">Top 5% performer</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-4">
              {/* Preferences */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Preferences</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Language</p>
                      <p className="text-xs text-gray-600">{user?.preferences?.language}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Currency</p>
                      <p className="text-xs text-gray-600">{user?.preferences?.currency}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Theme</p>
                      <p className="text-xs text-gray-600">{user?.preferences?.theme}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Notification Settings */}
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Weather Alerts</p>
                      <p className="text-xs text-gray-600">Receive alerts about weather conditions</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={true}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Market Updates</p>
                      <p className="text-xs text-gray-600">Get notified about market price changes</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={true}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Logout Button */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center space-x-2 bg-red-100 text-red-600 py-3 px-4 rounded-xl hover:bg-red-200 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="font-medium">Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordChange && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col">
          <div className="bg-white rounded-t-2xl mt-auto w-full">
            <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>
              <button 
                onClick={() => setShowPasswordChange(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                <input
                  type="password"
                  className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <input
                  type="password"
                  className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                <input
                  type="password"
                  className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button 
                  onClick={() => setShowPasswordChange(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-xl hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setShowPasswordChange(false)}
                  className="flex-1 bg-emerald-600 text-white py-3 px-4 rounded-xl hover:bg-emerald-700 transition-colors"
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

export default MobileUserProfile;