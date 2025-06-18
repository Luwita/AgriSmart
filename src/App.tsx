import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MobileNavigation from './components/mobile/MobileNavigation';
import MobileDashboard from './components/mobile/MobileDashboard';
import MobileCropManagement from './components/mobile/MobileCropManagement';
import MobileWeatherMonitoring from './components/mobile/MobileWeatherMonitoring';
import MobileMarketAnalysis from './components/mobile/MobileMarketAnalysis';
import MobileIoTDevices from './components/mobile/MobileIoTDevices';
import MobileResourceOptimization from './components/mobile/MobileResourceOptimization';
import MobileSustainablePractices from './components/mobile/MobileSustainablePractices';
import MobileFinancialManagement from './components/mobile/MobileFinancialManagement';
import MobileInventoryManagement from './components/mobile/MobileInventoryManagement';
import MobileCommunityForum from './components/mobile/MobileCommunityForum';
import MobileAnalytics from './components/mobile/MobileAnalytics';
import MobileUserProfile from './components/mobile/MobileUserProfile';
import MobileAuthentication from './components/mobile/MobileAuthentication';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { NotificationProvider } from './contexts/NotificationContext';

type ActiveSection = 'dashboard' | 'crops' | 'weather' | 'market' | 'iot' | 'resources' | 'sustainability' | 'financial' | 'inventory' | 'community' | 'analytics' | 'profile';

function AppContent() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('dashboard');
  const { user, isAuthenticated } = useAuth();

  // Mobile-specific viewport handling
  useEffect(() => {
    // Set viewport height for mobile browsers
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);

    return () => {
      window.removeEventListener('resize', setVH);
      window.removeEventListener('orientationchange', setVH);
    };
  }, []);

  if (!isAuthenticated) {
    return <MobileAuthentication />;
  }

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <MobileDashboard />;
      case 'crops':
        return <MobileCropManagement />;
      case 'weather':
        return <MobileWeatherMonitoring />;
      case 'market':
        return <MobileMarketAnalysis />;
      case 'iot':
        return <MobileIoTDevices />;
      case 'resources':
        return <MobileResourceOptimization />;
      case 'sustainability':
        return <MobileSustainablePractices />;
      case 'financial':
        return <MobileFinancialManagement />;
      case 'inventory':
        return <MobileInventoryManagement />;
      case 'community':
        return <MobileCommunityForum />;
      case 'analytics':
        return <MobileAnalytics />;
      case 'profile':
        return <MobileUserProfile />;
      default:
        return <MobileDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" style={{ minHeight: 'calc(var(--vh, 1vh) * 100)' }}>
      {/* Mobile Header */}
      <header className="bg-emerald-600 text-white px-4 py-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <span className="text-emerald-600 font-bold text-sm">🌱</span>
          </div>
          <h1 className="text-lg font-bold">AgriSmart</h1>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs bg-emerald-500 px-2 py-1 rounded-full">🇿🇲</span>
          <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {user?.name?.charAt(0) || 'U'}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto pb-20">
        {renderActiveSection()}
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileNavigation
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <DataProvider>
          <NotificationProvider>
            <AppContent />
          </NotificationProvider>
        </DataProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;