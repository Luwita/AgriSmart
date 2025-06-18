import React from 'react';
import { 
  Home, 
  Sprout, 
  CloudRain, 
  TrendingUp, 
  User
} from 'lucide-react';

interface MobileNavigationProps {
  activeSection: string;
  setActiveSection: (section: any) => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ 
  activeSection, 
  setActiveSection 
}) => {
  const mainNavItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'crops', label: 'Crops', icon: Sprout },
    { id: 'weather', label: 'Weather', icon: CloudRain },
    { id: 'market', label: 'Market', icon: TrendingUp },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-50">
      <div className="flex justify-around">
        {mainNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors min-w-0 flex-1 ${
                isActive
                  ? 'text-emerald-600 bg-emerald-50'
                  : 'text-gray-600'
              }`}
            >
              <Icon className={`w-5 h-5 mb-1 ${isActive ? 'text-emerald-600' : 'text-gray-600'}`} />
              <span className={`text-xs font-medium truncate ${
                isActive ? 'text-emerald-600' : 'text-gray-600'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNavigation;