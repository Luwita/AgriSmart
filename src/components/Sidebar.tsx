import React from 'react';
import { 
  Home, 
  Sprout, 
  CloudRain, 
  TrendingUp, 
  User,
  Cpu,
  Droplets,
  Leaf,
  DollarSign,
  Package,
  Users,
  BarChart3,
  Shield,
  LogOut
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: any) => void;
  user: any;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeSection, 
  setActiveSection,
  user 
}) => {
  const { logout } = useAuth();

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'crops', label: 'Crop Management', icon: Sprout },
    { id: 'weather', label: 'Weather', icon: CloudRain },
    { id: 'market', label: 'Market Analysis', icon: TrendingUp },
    { id: 'iot', label: 'IoT Devices', icon: Cpu },
    { id: 'resources', label: 'Resources', icon: Droplets },
    { id: 'sustainability', label: 'Sustainability', icon: Leaf },
    { id: 'financial', label: 'Financial', icon: DollarSign },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  // Add admin menu item for admin users
  if (user?.role === 'admin') {
    navigationItems.push({ id: 'admin', label: 'Admin', icon: Shield });
  }

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg border-r border-gray-200 z-50">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">🌱</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">AgriSmart</h1>
            <p className="text-xs text-gray-600">🇿🇲 Smart Agriculture Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  isActive
                    ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-600' : 'text-gray-500'}`} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* User Profile & Logout */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
            <span className="text-white font-medium">
              {user?.name?.charAt(0) || 'U'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
            <p className="text-xs text-gray-600 capitalize">{user?.role}</p>
          </div>
        </div>
        
        <button
          onClick={logout}
          className="w-full flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;