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
  Award
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { zambianProvinces } from '../data/zambianData';

const Authentication: React.FC = () => {
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
    // Personal Information
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'farmer',
    language: 'English',
    
    // Farm Profile
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-600 rounded-full mb-4">
            <Sprout className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AgriSmart</h1>
          <p className="text-gray-600">🇿🇲 Smart Agriculture for Zambian Farmers</p>
        </div>

        {/* Auth Toggle */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex">
            <button
              onClick={() => {
                setIsLogin(true);
                setCurrentStep(1);
              }}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                isLogin 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
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
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </button>

                <div className="text-center">
                  <a href="#" className="text-sm text-emerald-600 hover:text-emerald-700">
                    Forgot your password?
                  </a>
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
                        <div className={`w-12 h-1 mx-2 ${
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
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
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
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
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
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
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
                          className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
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
                          className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
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
                      className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                    >
                      Next: Security
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
                          className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="Create a strong password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="Confirm your password"
                        />
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={nextStep}
                        className="flex-1 bg-emerald-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                      >
                        Next: Farm Profile
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="e.g., Mwanza Family Farm"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Province</label>
                        <select
                          value={registerForm.farmProfile.province}
                          onChange={(e) => setRegisterForm({
                            ...registerForm,
                            farmProfile: {...registerForm.farmProfile, province: e.target.value}
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
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
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="e.g., Chongwe District"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Total Area (hectares)</label>
                        <input
                          type="number"
                          value={registerForm.farmProfile.totalArea}
                          onChange={(e) => setRegisterForm({
                            ...registerForm,
                            farmProfile: {...registerForm.farmProfile, totalArea: e.target.value}
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="25"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Established Year</label>
                        <input
                          type="number"
                          value={registerForm.farmProfile.establishedYear}
                          onChange={(e) => setRegisterForm({
                            ...registerForm,
                            farmProfile: {...registerForm.farmProfile, establishedYear: e.target.value}
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="2010"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Soil Type</label>
                        <select
                          value={registerForm.farmProfile.soilType}
                          onChange={(e) => setRegisterForm({
                            ...registerForm,
                            farmProfile: {...registerForm.farmProfile, soilType: e.target.value}
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        >
                          <option value="">Select Soil Type</option>
                          {soilTypes.map(soil => (
                            <option key={soil} value={soil}>{soil}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Water Source</label>
                        <select
                          value={registerForm.farmProfile.waterSource}
                          onChange={(e) => setRegisterForm({
                            ...registerForm,
                            farmProfile: {...registerForm.farmProfile, waterSource: e.target.value}
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        >
                          <option value="">Select Water Source</option>
                          {waterSources.map(source => (
                            <option key={source} value={source}>{source}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Main Crops</label>
                      <div className="grid grid-cols-2 gap-2">
                        {cropOptions.map(crop => (
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

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Farming Type</label>
                        <select
                          value={registerForm.farmProfile.farmingType}
                          onChange={(e) => setRegisterForm({
                            ...registerForm,
                            farmProfile: {...registerForm.farmProfile, farmingType: e.target.value}
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        >
                          <option value="">Select Type</option>
                          {farmingTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Certification</label>
                        <select
                          value={registerForm.farmProfile.certification}
                          onChange={(e) => setRegisterForm({
                            ...registerForm,
                            farmProfile: {...registerForm.farmProfile, certification: e.target.value}
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        >
                          {certifications.map(cert => (
                            <option key={cert} value={cert}>{cert}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-emerald-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? 'Creating Account...' : 'Create Account'}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Features Preview */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">🌾 AgriSmart Features</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Sprout className="w-4 h-4 text-emerald-600" />
              <span>Crop Management</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4 text-blue-600" />
              <span>Weather Monitoring</span>
            </div>
            <div className="flex items-center space-x-2">
              <Building className="w-4 h-4 text-purple-600" />
              <span>Market Analysis</span>
            </div>
            <div className="flex items-center space-x-2">
              <TreePine className="w-4 h-4 text-green-600" />
              <span>Sustainability</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-600">
          <p>🇿🇲 Proudly serving Zambian farmers since 2024</p>
          <p className="mt-1">Available in English, Bemba, Nyanja & Tonga</p>
        </div>
      </div>
    </div>
  );
};

export default Authentication;