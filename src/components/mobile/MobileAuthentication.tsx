import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Lock, 
  Phone, 
  MapPin, 
  Sprout,
  Eye,
  EyeOff,
  Globe,
  Building,
  Calendar,
  Droplets,
  TreePine,
  Award,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { zambianProvinces } from '../../data/zambianData';

const MobileAuthentication: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const { login, register } = useAuth();

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'farmer',
    language: 'English',
    farmProfile: {
      farmName: '',
      location: '',
      province: '',
      totalArea: '',
      coordinates: '',
      soilType: '',
      waterSource: '',
      establishedYear: '',
      certification: '',
      mainCrops: [] as string[],
      farmingType: ''
    }
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const success = await login(loginForm.email, loginForm.password);
      if (!success) {
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      alert('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerForm.password !== registerForm.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setLoading(true);
    
    try {
      const success = await register(registerForm);
      if (!success) {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      alert('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const soilTypes = ['Sandy loam', 'Clay loam', 'Red clay', 'Alluvial', 'Sandy', 'Black cotton'];
  const waterSources = ['Borehole', 'River', 'Dam', 'Seasonal streams', 'Irrigation canal', 'Rain-fed only'];
  const cropOptions = ['Maize', 'Soybeans', 'Groundnuts', 'Sunflower', 'Cotton', 'Tobacco', 'Cassava', 'Sweet potatoes'];
  const farmingTypes = ['Subsistence', 'Commercial', 'Mixed farming', 'Organic', 'Contract farming'];
  const certifications = ['None', 'Organic certified', 'FRA registered', 'Export certified', 'COMESA certified'];

  const toggleCrop = (crop: string) => {
    const currentCrops = registerForm.farmProfile.mainCrops;
    if (currentCrops.includes(crop)) {
      setRegisterForm({
        ...registerForm,
        farmProfile: {
          ...registerForm.farmProfile,
          mainCrops: currentCrops.filter(c => c !== crop)
        }
      });
    } else {
      setRegisterForm({
        ...registerForm,
        farmProfile: {
          ...registerForm.farmProfile,
          mainCrops: [...currentCrops, crop]
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-blue-50 flex flex-col">
      {/* Mobile Header */}
      <div className="text-center pt-12 pb-8 px-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-600 rounded-full mb-4">
          <Sprout className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">AgriSmart</h1>
        <p className="text-gray-600 text-sm">🇿🇲 Smart Agriculture for Zambian Farmers</p>
      </div>

      {/* Auth Toggle */}
      <div className="px-4 mb-6">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex">
            <button
              onClick={() => {
                setIsLogin(true);
                setCurrentStep(1);
              }}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                isLogin 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                setCurrentStep(1);
              }}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                !isLogin 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              Register
            </button>
          </div>

          <div className="p-6">
            {isLogin ? (
              /* Login Form */
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      required
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-emerald-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </button>

                <div className="text-center">
                  <a href="#" className="text-sm text-emerald-600">
                    Forgot your password?
                  </a>
                </div>

                {/* Demo Credentials */}
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-blue-800 font-medium mb-2">Demo Credentials:</p>
                  <p className="text-xs text-blue-700">Email: james@example.com</p>
                  <p className="text-xs text-blue-700">Password: password</p>
                  <p className="text-xs text-blue-700 mt-1">Admin: admin@agrismart.zm / admin123</p>
                </div>
              </form>
            ) : (
              /* Registration Form */
              <form onSubmit={handleRegister} className="space-y-4">
                {/* Step Indicator */}
                <div className="flex items-center justify-center mb-6">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        currentStep >= step 
                          ? 'bg-emerald-600 text-white' 
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {step}
                      </div>
                      {step < 3 && (
                        <div className={`w-8 h-1 mx-2 ${
                          currentStep > step ? 'bg-emerald-600' : 'bg-gray-200'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>

                {currentStep === 1 && (
                  /* Step 1: Personal Information */
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          required
                          value={registerForm.name}
                          onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="email"
                          required
                          value={registerForm.email}
                          onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="tel"
                          required
                          value={registerForm.phone}
                          onChange={(e) => setRegisterForm({...registerForm, phone: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="+260 977 123 456"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                        <select
                          value={registerForm.role}
                          onChange={(e) => setRegisterForm({...registerForm, role: e.target.value})}
                          className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        >
                          <option value="farmer">Farmer</option>
                          <option value="extension_officer">Extension Officer</option>
                          <option value="cooperative">Cooperative</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                        <select
                          value={registerForm.language}
                          onChange={(e) => setRegisterForm({...registerForm, language: e.target.value})}
                          className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        >
                          <option value="English">English</option>
                          <option value="Bemba">Bemba</option>
                          <option value="Nyanja">Nyanja</option>
                          <option value="Tonga">Tonga</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={nextStep}
                      className="w-full bg-emerald-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <span>Next: Security</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {currentStep === 2 && (
                  /* Step 2: Security */
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Security</h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={registerForm.password}
                          onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                          className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="Create a strong password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={registerForm.confirmPassword}
                          onChange={(e) => setRegisterForm({...registerForm, confirmPassword: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="Confirm your password"
                        />
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-xl font-medium hover:bg-gray-300 transition-colors flex items-center justify-center space-x-2"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Back</span>
                      </button>
                      <button
                        type="button"
                        onClick={nextStep}
                        className="flex-1 bg-emerald-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2"
                      >
                        <span>Next: Farm</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  /* Step 3: Farm Profile */
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Farm Profile</h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Farm Name</label>
                      <input
                        type="text"
                        value={registerForm.farmProfile.farmName}
                        onChange={(e) => setRegisterForm({
                          ...registerForm,
                          farmProfile: {...registerForm.farmProfile, farmName: e.target.value}
                        })}
                        className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="e.g., Mwanza Family Farm"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Province</label>
                        <select
                          value={registerForm.farmProfile.province}
                          onChange={(e) => setRegisterForm({
                            ...registerForm,
                            farmProfile: {...registerForm.farmProfile, province: e.target.value}
                          })}
                          className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        >
                          <option value="">Select Province</option>
                          {zambianProvinces.map(province => (
                            <option key={province} value={province}>{province}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Location/District</label>
                        <input
                          type="text"
                          value={registerForm.farmProfile.location}
                          onChange={(e) => setRegisterForm({
                            ...registerForm,
                            farmProfile: {...registerForm.farmProfile, location: e.target.value}
                          })}
                          className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="e.g., Chongwe District"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Area (ha)</label>
                        <input
                          type="number"
                          value={registerForm.farmProfile.totalArea}
                          onChange={(e) => setRegisterForm({
                            ...registerForm,
                            farmProfile: {...registerForm.farmProfile, totalArea: e.target.value}
                          })}
                          className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="25"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Est. Year</label>
                        <input
                          type="number"
                          value={registerForm.farmProfile.establishedYear}
                          onChange={(e) => setRegisterForm({
                            ...registerForm,
                            farmProfile: {...registerForm.farmProfile, establishedYear: e.target.value}
                          })}
                          className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="2010"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Main Crops</label>
                      <div className="grid grid-cols-2 gap-2">
                        {cropOptions.slice(0, 6).map(crop => (
                          <label key={crop} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={registerForm.farmProfile.mainCrops.includes(crop)}
                              onChange={() => toggleCrop(crop)}
                              className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                            />
                            <span className="text-sm text-gray-700">{crop}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-xl font-medium hover:bg-gray-300 transition-colors flex items-center justify-center space-x-2"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Back</span>
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-emerald-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50"
                      >
                        {loading ? 'Creating...' : 'Create Account'}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Features Preview */}
      <div className="px-4 pb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">🌾 AgriSmart Mobile Features</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Sprout className="w-4 h-4 text-emerald-600" />
              <span>Crop Management</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4 text-blue-600" />
              <span>Weather Alerts</span>
            </div>
            <div className="flex items-center space-x-2">
              <Building className="w-4 h-4 text-purple-600" />
              <span>Market Prices</span>
            </div>
            <div className="flex items-center space-x-2">
              <TreePine className="w-4 h-4 text-green-600" />
              <span>Sustainability</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pb-8 px-4 text-sm text-gray-600">
        <p>🇿🇲 Proudly serving Zambian farmers</p>
        <p className="mt-1">Available in English, Bemba, Nyanja & Tonga</p>
      </div>
    </div>
  );
};

export default MobileAuthentication;