import React from 'react';
import { 
  LayoutDashboard, 
  Sprout, 
  CloudRain, 
  TrendingUp, 
  Cpu, 
  Droplets,
  Leaf,
  X,
  DollarSign,
  Package,
  Users,
  BarChart3,
  User,
  Bell,
  LogOut,
  Shield
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: any) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeSection, 
  setActiveSection, 
  isMobileMenuOpen, 
  setIsMobileMenuOpen 
}) => {
  const { user, logout } = useAuth();
  const { unreadCount } = useNotifications();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
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
  ];

  // Add admin menu item for admin users
  if (user?.role === 'admin') {
    menuItems.push({ id: 'admin', label: 'Admin', icon: Shield });
  }

  const handleItemClick = (itemId: string) => {
    setActiveSection(itemId);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Sprout className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">AgriSmart</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-emerald-600 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Profile Section */}
        <div className="px-4 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
            <button
              onClick={() => handleItemClick('profile')}
              className="p-1 rounded-md text-gray-400 hover:text-emerald-600"
            >
              <User className="w-4 h-4" />
            </button>
          </div>
        </div>

        <nav className="mt-4 px-4 flex-1">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleItemClick(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-colors duration-200 ${
                      activeSection === item.id
                        ? 'bg-emerald-100 text-emerald-700 border-r-4 border-emerald-600'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-emerald-600'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                    {item.id === 'community' && unreadCount > 0 && (
                      <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1">
                        {unreadCount}
                      </span>
                    )}
                    {item.id === 'admin' && (
                      <span className="ml-auto bg-purple-500 text-white text-xs rounded-full px-2 py-1">
                        Admin
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-gray-200">
          <div className="bg-emerald-50 rounded-lg p-4 mb-4">
            <h4 className="text-sm font-semibold text-emerald-800">🌱 Smart Farming Tip</h4>
            <p className="text-xs text-emerald-600 mt-1">
              Monitor soil moisture levels daily for optimal irrigation timing.
            </p>
          </div>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;