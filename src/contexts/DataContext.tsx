import React, { createContext, useContext, useState, useEffect } from 'react';

interface DataContextType {
  farmData: any;
  updateFarmData: (data: any) => void;
  syncData: () => Promise<void>;
  isOnline: boolean;
  lastSync: Date | null;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [farmData, setFarmData] = useState({});
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [lastSync, setLastSync] = useState<Date | null>(null);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const updateFarmData = (data: any) => {
    setFarmData(prev => ({ ...prev, ...data }));
    // Store locally for offline access
    localStorage.setItem('agrismart_farm_data', JSON.stringify({ ...farmData, ...data }));
  };

  const syncData = async () => {
    if (isOnline) {
      try {
        // Simulate API sync
        await new Promise(resolve => setTimeout(resolve, 2000));
        setLastSync(new Date());
      } catch (error) {
        console.error('Sync failed:', error);
      }
    }
  };

  return (
    <DataContext.Provider value={{
      farmData,
      updateFarmData,
      syncData,
      isOnline,
      lastSync
    }}>
      {children}
    </DataContext.Provider>
  );
};