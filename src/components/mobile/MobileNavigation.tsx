import React, { useState } from 'react';
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
  Menu,
  X,
  Shield
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface MobileNavigationProps {
  activeSection: string;
  setActiveSection: (section: any) => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ 
  activeSection, 
  setActiveSection 
}) => {
  const [showFullMenu, setShowFullMenu] = useState(false);
  const { user } = useAuth();

  const mainNavItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'crops', label: 'Crops', icon: Sprout },
    { id: 'weather', label: 'Weather', icon: CloudRain },
    { id: 'market', label: 'Market', icon: TrendingUp },
    { id: 'menu', label: 'More', icon: Menu, action: () => setShowFullMenu(true) }
  ];

  const fullMenuItems = [
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
    fullMenuItems.push({ id: 'admin', label: 'Admin', icon: Shield });
  }

  const handleNavigation = (itemId: string) => {
    if (itemId === 'menu') {
      return; // This is handled by the action property
    }
    setActiveSection(itemId);
    setShowFullMenu(false);
  };

  return (
    <>
      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-50">
        <div className="flex justify-around">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => item.action ? item.action() : handleNavigation(item.id)}
                className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors min-w-0 flex-1 ${
                  isActive && item.id !== 'menu'
                    ? 'text-emerald-600 bg-emerald-50'
                    : 'text-gray-600'
                }`}
              >
                <Icon className={`w-5 h-5 mb-1 ${isActive && item.id !== 'menu' ? 'text-emerald-600' : 'text-gray-600'}`} />
                <span className={`text-xs font-medium truncate ${
                  isActive && item.id !== 'menu' ? 'text-emerald-600' : 'text-gray-600'
                }`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Full Menu Modal */}
      {showFullMenu && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col">
          <div className="bg-white rounded-t-2xl mt-auto max-h-[80vh] overflow-y-auto w-full">
            <div className="sticky top-0 bg-white px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Menu</h3>
              <button 
                onClick={() => setShowFullMenu(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4">
              <div className="grid grid-cols-3 gap-4">
                {fullMenuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavigation(item.id)}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl transition-colors ${
                        isActive
                          ? 'bg-emerald-100 text-emerald-600'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className={`w-6 h-6 mb-2 ${isActive ? 'text-emerald-600' : 'text-gray-600'}`} />
                      <span className="text-xs font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNavigation;