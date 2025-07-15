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
import Authentication from './components/Authentication';
import AdminDashboard from './components/AdminDashboard';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { NotificationProvider } from './contexts/NotificationContext';

type ActiveSection = 'dashboard' | 'crops' | 'weather' | 'market' | 'iot' | 'resources' | 'sustainability' | 'financial' | 'inventory' | 'community' | 'analytics' | 'profile' | 'admin';

function AppContent() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('dashboard');
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
      {/* Desktop Sidebar */}
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        user={user}
      />

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          {renderActiveSection()}
        </div>
      </main>
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