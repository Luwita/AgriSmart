import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import CropManagement from './components/CropManagement';
import WeatherMonitoring from './components/WeatherMonitoring';
import MarketAnalysis from './components/MarketAnalysis';
import IoTDevices from './components/IoTDevices';
import ResourceOptimization from './components/ResourceOptimization';
import SustainablePractices from './components/SustainablePractices';
import FinancialManagement from './components/FinancialManagement';
import InventoryManagement from './components/InventoryManagement';
import CommunityForum from './components/CommunityForum';
import Analytics from './components/Analytics';
import UserProfile from './components/UserProfile';
import AdminDashboard from './components/AdminDashboard';
import Authentication from './components/Authentication';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { NotificationProvider } from './contexts/NotificationContext';

type ActiveSection = 'dashboard' | 'crops' | 'weather' | 'market' | 'iot' | 'resources' | 'sustainability' | 'financial' | 'inventory' | 'community' | 'analytics' | 'profile' | 'admin';

function AppContent() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Authentication />;
  }

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'crops':
        return <CropManagement />;
      case 'weather':
        return <WeatherMonitoring />;
      case 'market':
        return <MarketAnalysis />;
      case 'iot':
        return <IoTDevices />;
      case 'resources':
        return <ResourceOptimization />;
      case 'sustainability':
        return <SustainablePractices />;
      case 'financial':
        return <FinancialManagement />;
      case 'inventory':
        return <InventoryManagement />;
      case 'community':
        return <CommunityForum />;
      case 'analytics':
        return <Analytics />;
      case 'profile':
        return <UserProfile />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200 lg:hidden">
          <div className="px-4 py-3 flex items-center justify-between">
            <h1 className="text-xl font-bold text-emerald-600">AgriSmart</h1>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-emerald-600 hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          {renderActiveSection()}
        </main>
      </div>
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