import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'farmer' | 'extension_officer' | 'cooperative' | 'admin';
  farmProfile?: {
    farmName: string;
    location: string;
    province: string;
    totalArea: number;
    coordinates: string;
    soilType: string;
    waterSource: string;
    establishedYear: number;
    certification?: string;
  };
  preferences: {
    language: string;
    currency: string;
    notifications: boolean;
    theme: string;
  };
  subscription: {
    plan: 'free' | 'basic' | 'premium';
    expiresAt?: string;
  };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: any) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for stored authentication
    const storedUser = localStorage.getItem('agrismart_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check for admin login
      if (email === 'admin@agrismart.zm' && password === 'admin123') {
        const adminUser: User = {
          id: 'admin',
          name: 'System Administrator',
          email: email,
          phone: '+260 211 000 000',
          role: 'admin',
          preferences: {
            language: 'English',
            currency: 'ZMW',
            notifications: true,
            theme: 'light'
          },
          subscription: {
            plan: 'premium'
          }
        };

        setUser(adminUser);
        setIsAuthenticated(true);
        localStorage.setItem('agrismart_user', JSON.stringify(adminUser));
        return true;
      }
      
      // Mock user data - in production, this would come from your backend
      const mockUser: User = {
        id: '1',
        name: 'James Mwanza',
        email: email,
        phone: '+260 977 123 456',
        role: 'farmer',
        farmProfile: {
          farmName: 'Mwanza Family Farm',
          location: 'Chongwe District',
          province: 'Lusaka Province',
          totalArea: 25,
          coordinates: '-15.4067, 28.2871',
          soilType: 'Sandy loam',
          waterSource: 'Borehole + Seasonal streams',
          establishedYear: 2010,
          certification: 'Organic certified'
        },
        preferences: {
          language: 'English',
          currency: 'ZMW',
          notifications: true,
          theme: 'light'
        },
        subscription: {
          plan: 'basic',
          expiresAt: '2025-12-31'
        }
      };

      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('agrismart_user', JSON.stringify(mockUser));
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const register = async (userData: any): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        role: userData.role,
        farmProfile: userData.farmProfile,
        preferences: {
          language: userData.language || 'English',
          currency: 'ZMW',
          notifications: true,
          theme: 'light'
        },
        subscription: {
          plan: 'free'
        }
      };

      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem('agrismart_user', JSON.stringify(newUser));
      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('agrismart_user');
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('agrismart_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      register,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};