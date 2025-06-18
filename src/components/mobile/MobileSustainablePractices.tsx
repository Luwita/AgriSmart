import React, { useState } from 'react';
import { 
  Leaf, 
  Recycle, 
  Sun, 
  TreePine,
  Droplets,
  Target,
  Award,
  BookOpen,
  Users,
  Calendar,
  TrendingUp,
  CheckCircle,
  Clock,
  Star,
  X,
  Play,
  Download,
  ExternalLink,
  Search,
  Filter,
  Video,
  FileText,
  Globe,
  Phone,
  ChevronRight,
  Heart,
  Share2,
  Bookmark
} from 'lucide-react';

const MobileSustainablePractices: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [completedPractices, setCompletedPractices] = useState<number[]>([1, 3, 5]);
  const [showLearningCenter, setShowLearningCenter] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [favoriteVideos, setFavoriteVideos] = useState<number[]>([1, 3, 7]);

  const categories = [
    { id: 'all', name: 'All', icon: Leaf },
    { id: 'soil', name: 'Soil', icon: TreePine },
    { id: 'water', name: 'Water', icon: Droplets },
    { id: 'energy', name: 'Energy', icon: Sun },
    { id: 'waste', name: 'Waste', icon: Recycle },
  ];

  // Free Agricultural Videos Database
  const agriculturalVideos = [
    {
      id: 1,
      title: 'Sustainable Maize Farming in Zambia',
      description: 'Learn modern techniques for growing maize sustainably in Zambian conditions',
      duration: '15:30',
      category: 'crops',
      instructor: 'Dr. James Mwanza',
      views: 12500,
      rating: 4.8,
      language: 'English/Bemba',
      thumbnail: 'https://images.pexels.com/photos/2252618/pexels-photo-2252618.jpeg?auto=compress&cs=tinysrgb&w=400',
      topics: ['Crop rotation', 'Fertilizer management', 'Pest control'],
      level: 'Beginner'
    },
    {
      id: 2,
      title: 'Water Conservation Techniques',
      description: 'Practical water saving methods for Zambian smallholder farmers',
      duration: '12:45',
      category: 'water',
      instructor: 'Mary Banda',
      views: 8900,
      rating: 4.6,
      language: 'English/Nyanja',
      thumbnail: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=400',
      topics: ['Drip irrigation', 'Rainwater harvesting', 'Mulching'],
      level: 'Intermediate'
    },
    {
      id: 3,
      title: 'Composting for Better Soil Health',
      description: 'Step-by-step guide to creating nutrient-rich compost from farm waste',
      duration: '18:20',
      category: 'soil',
      instructor: 'Peter Mulenga',
      views: 15600,
      rating: 4.9,
      language: 'English/Tonga',
      thumbnail: 'https://images.pexels.com/photos/1459339/pexels-photo-1459339.jpeg?auto=compress&cs=tinysrgb&w=400',
      topics: ['Organic matter', 'Decomposition', 'Soil nutrients'],
      level: 'Beginner'
    },
    {
      id: 4,
      title: 'Solar Power for Rural Farms',
      description: 'Installing and maintaining solar systems for agricultural use',
      duration: '22:15',
      category: 'energy',
      instructor: 'Engineer Sarah Phiri',
      views: 6700,
      rating: 4.7,
      language: 'English',
      thumbnail: 'https://images.pexels.com/photos/33044/sunflower-sun-summer-yellow.jpg?auto=compress&cs=tinysrgb&w=400',
      topics: ['Solar panels', 'Battery storage', 'Irrigation pumps'],
      level: 'Advanced'
    }
  ];

  const practices = [
    {
      id: 1,
      title: 'Crop Rotation Implementation',
      category: 'soil',
      difficulty: 'Medium',
      impact: 'High',
      duration: '1 Season',
      description: 'Rotate between nitrogen-fixing legumes and cereal crops to maintain soil fertility naturally.',
      benefits: ['Improved soil fertility', 'Reduced pest problems', 'Better yield sustainability'],
      steps: [
        'Plan rotation schedule for next 3 seasons',
        'Select complementary crop varieties',
        'Implement gradual transition',
        'Monitor soil health improvements'
      ],
      carbonSaving: '2.5 tons CO₂/year',
      costSaving: 'ZMW 850/season',
      relatedVideos: [1, 3]
    },
    {
      id: 2,
      title: 'Rainwater Harvesting System',
      category: 'water',
      difficulty: 'Hard',
      impact: 'High',
      duration: '3 Months',
      description: 'Install rainwater collection and storage system for irrigation during dry periods.',
      benefits: ['Reduced water costs', 'Drought resilience', 'Sustainable water supply'],
      steps: [
        'Assess rainfall patterns and storage needs',
        'Install collection system and tanks',
        'Set up distribution network',
        'Regular maintenance schedule'
      ],
      carbonSaving: '1.8 tons CO₂/year',
      costSaving: 'ZMW 1,200/year',
      relatedVideos: [2]
    },
    {
      id: 3,
      title: 'Composting Program',
      category: 'waste',
      difficulty: 'Easy',
      impact: 'Medium',
      duration: '2 Months',
      description: 'Convert farm organic waste into nutrient-rich compost for soil enhancement.',
      benefits: ['Reduced fertilizer costs', 'Waste reduction', 'Enhanced soil organic matter'],
      steps: [
        'Set up composting area',
        'Collect organic materials',
        'Maintain proper composting conditions',
        'Apply finished compost to fields'
      ],
      carbonSaving: '3.2 tons CO₂/year',
      costSaving: 'ZMW 650/year',
      relatedVideos: [3]
    },
    {
      id: 4,
      title: 'Solar-Powered Irrigation',
      category: 'energy',
      difficulty: 'Hard',
      impact: 'High',
      duration: '4 Months',
      description: 'Install solar panels to power irrigation pumps and reduce electricity dependency.',
      benefits: ['Lower energy costs', 'Reliable power supply', 'Reduced carbon footprint'],
      steps: [
        'Energy audit and system sizing',
        'Solar panel installation',
        'Connect to irrigation system',
        'Monitor performance and savings'
      ],
      carbonSaving: '4.5 tons CO₂/year',
      costSaving: 'ZMW 1,800/year',
      relatedVideos: [4]
    }
  ];

  const achievements = [
    {
      title: 'Sustainability Starter',
      description: 'Complete your first sustainable practice',
      icon: Star,
      completed: true,
      progress: 100
    },
    {
      title: 'Soil Guardian',
      description: 'Implement 3 soil health practices',
      icon: TreePine,
      completed: true,
      progress: 100
    },
    {
      title: 'Water Warrior',
      description: 'Save 1000L+ water monthly',
      icon: Droplets,
      completed: false,
      progress: 65
    },
    {
      title: 'Carbon Champion',
      description: 'Reduce carbon footprint by 10 tons/year',
      icon: Leaf,
      completed: false,
      progress: 78
    }
  ];

  const sustainabilityMetrics = {
    carbonSaved: '12.8 tons CO₂',
    waterSaved: '24,500 L',
    costSaved: 'ZMW 4,250',
    practicesCompleted: completedPractices.length,
    totalPractices: practices.length
  };

  const filteredPractices = selectedCategory === 'all' 
    ? practices 
    : practices.filter(practice => practice.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'bg-emerald-100 text-emerald-800';
      case 'Medium': return 'bg-blue-100 text-blue-800';
      case 'Low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const togglePracticeCompletion = (practiceId: number) => {
    if (completedPractices.includes(practiceId)) {
      setCompletedPractices(prev => prev.filter(id => id !== practiceId));
    } else {
      setCompletedPractices(prev => [...prev, practiceId]);
    }
  };

  const toggleVideoFavorite = (videoId: number) => {
    if (favoriteVideos.includes(videoId)) {
      setFavoriteVideos(prev => prev.filter(id => id !== videoId));
    } else {
      setFavoriteVideos(prev => [...prev, videoId]);
    }
  };

  const handleWatchVideo = (video: any) => {
    setSelectedVideo(video);
    setShowVideoModal(true);
  };

  const getRelatedVideos = (videoIds: number[]) => {
    return agriculturalVideos.filter(video => videoIds.includes(video.id));
  };

  return (
    <div className="p-4 space-y-4 pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Sustainable Practices</h1>
          <p className="text-gray-600 text-sm">Eco-friendly farming methods</p>
        </div>
        <button 
          onClick={() => setShowLearningCenter(true)}
          className="bg-emerald-600 text-white p-2 rounded-xl hover:bg-emerald-700 transition-colors"
        >
          <BookOpen className="w-5 h-5" />
        </button>
      </div>

      {/* Zambian Sustainability Context */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-xl text-white p-4">
        <h3 className="font-bold mb-2">🇿🇲 Zambian Sustainable Agriculture</h3>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-white bg-opacity-20 rounded-lg p-2">
            <p className="font-medium">Free Training</p>
            <p className="opacity-90">Videos in local languages</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-2">
            <p className="font-medium">Government Support</p>
            <p className="opacity-90">FISP subsidies available</p>
          </div>
        </div>
      </div>

      {/* Sustainability Overview */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">Carbon Saved</p>
              <p className="text-lg font-bold text-emerald-600 mt-1">{sustainabilityMetrics.carbonSaved}</p>
            </div>
            <div className="p-2 bg-emerald-100 rounded-full">
              <Leaf className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">Water Saved</p>
              <p className="text-lg font-bold text-blue-600 mt-1">{sustainabilityMetrics.waterSaved}</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-full">
              <Droplets className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
        <div className="flex overflow-x-auto pb-2 space-x-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center space-x-1 whitespace-nowrap ${
                  selectedCategory === category.id
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
        <h3 className="font-medium text-gray-900 mb-3 flex items-center">
          <Award className="w-4 h-4 mr-2 text-yellow-600" />
          Achievements
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {achievements.slice(0, 2).map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <div key={index} className={`border rounded-lg p-3 ${
                achievement.completed ? 'border-emerald-200 bg-emerald-50' : 'border-gray-200 bg-gray-50'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-4 h-4 ${
                    achievement.completed ? 'text-emerald-600' : 'text-gray-400'
                  }`} />
                  {achievement.completed && <CheckCircle className="w-4 h-4 text-emerald-600" />}
                </div>
                <h4 className={`text-xs font-medium mb-1 ${
                  achievement.completed ? 'text-emerald-800' : 'text-gray-700'
                }`}>
                  {achievement.title}
                </h4>
                <p className={`text-xs mb-2 ${
                  achievement.completed ? 'text-emerald-700' : 'text-gray-600'
                }`}>
                  {achievement.description}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full ${
                      achievement.completed ? 'bg-emerald-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${achievement.progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{achievement.progress}%</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Practices */}
      <div className="space-y-4">
        {filteredPractices.map((practice) => (
          <div key={practice.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Practice Header */}
            <div className="px-4 py-3 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">{practice.title}</h3>
                  <p className="text-xs text-gray-600 mt-1">{practice.description}</p>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(practice.difficulty)}`}>
                    {practice.difficulty}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(practice.impact)}`}>
                    {practice.impact}
                  </span>
                </div>
              </div>
            </div>

            {/* Practice Content */}
            <div className="p-4">
              {/* Duration and Savings */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="text-center">
                  <Clock className="w-4 h-4 mx-auto text-gray-600 mb-1" />
                  <p className="text-xs text-gray-600">Duration</p>
                  <p className="text-xs font-semibold text-gray-900">{practice.duration}</p>
                </div>
                <div className="text-center">
                  <Leaf className="w-4 h-4 mx-auto text-emerald-600 mb-1" />
                  <p className="text-xs text-gray-600">Carbon</p>
                  <p className="text-xs font-semibold text-emerald-600">{practice.carbonSaving}</p>
                </div>
                <div className="text-center">
                  <TrendingUp className="w-4 h-4 mx-auto text-green-600 mb-1" />
                  <p className="text-xs text-gray-600">Savings</p>
                  <p className="text-xs font-semibold text-green-600">{practice.costSaving}</p>
                </div>
              </div>

              {/* Benefits */}
              <div className="mb-3">
                <h4 className="text-xs font-semibold text-gray-700 mb-1">Key Benefits:</h4>
                <ul className="space-y-1">
                  {practice.benefits.slice(0, 2).map((benefit, index) => (
                    <li key={index} className="text-xs text-gray-600 flex items-center">
                      <CheckCircle className="w-3 h-3 text-emerald-600 mr-1 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Related Videos */}
              {practice.relatedVideos && practice.relatedVideos.length > 0 && (
                <div className="mb-3">
                  <h4 className="text-xs font-semibold text-gray-700 mb-1">Training Videos:</h4>
                  <div className="flex flex-wrap gap-1">
                    {getRelatedVideos(practice.relatedVideos).map((video) => (
                      <button
                        key={video.id}
                        onClick={() => handleWatchVideo(video)}
                        className="flex items-center space-x-1 px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                      >
                        <Play className="w-3 h-3" />
                        <span>{video.title.substring(0, 15)}...</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Button */}
              <button
                onClick={() => togglePracticeCompletion(practice.id)}
                className={`w-full py-2 px-4 rounded-lg text-xs font-medium transition-colors ${
                  completedPractices.includes(practice.id)
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {completedPractices.includes(practice.id) ? 'Completed' : 'Start Practice'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Learning Center Modal */}
      {showLearningCenter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col">
          <div className="bg-white rounded-t-2xl mt-auto max-h-[90vh] overflow-y-auto w-full">
            <div className="sticky top-0 bg-white px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">🇿🇲 Learning Center</h3>
              <button 
                onClick={() => setShowLearningCenter(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              {/* Learning Center Header */}
              <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl text-white p-4">
                <h4 className="font-bold mb-2">Free Agricultural Training</h4>
                <p className="text-xs opacity-90">Learn sustainable farming practices from Zambian experts in your local language</p>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <div className="bg-white bg-opacity-20 rounded-lg p-2">
                    <h5 className="font-medium text-sm">{agriculturalVideos.length} Free Videos</h5>
                    <p className="text-xs opacity-90">All content free</p>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-lg p-2">
                    <h5 className="font-medium text-sm">Local Languages</h5>
                    <p className="text-xs opacity-90">English, Bemba, Nyanja, Tonga</p>
                  </div>
                </div>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search videos, topics..."
                  className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              {/* Video Grid */}
              <div className="space-y-3">
                {agriculturalVideos.map((video) => (
                  <div key={video.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div className="relative">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleWatchVideo(video)}
                          className="bg-emerald-600 text-white p-2 rounded-full"
                        >
                          <Play className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="absolute top-2 right-2">
                        <button
                          onClick={() => toggleVideoFavorite(video.id)}
                          className={`p-1.5 rounded-full ${
                            favoriteVideos.includes(video.id) 
                              ? 'bg-red-500 text-white' 
                              : 'bg-white bg-opacity-80 text-gray-600'
                          }`}
                        >
                          <Heart className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-0.5 rounded text-xs">
                        {video.duration}
                      </div>
                    </div>
                    
                    <div className="p-3">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="font-medium text-gray-900 text-sm leading-tight">{video.title}</h4>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getLevelColor(video.level)}`}>
                          {video.level}
                        </span>
                      </div>
                      
                      <p className="text-xs text-gray-600 mb-2 line-clamp-2">{video.description}</p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{video.instructor}</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span>{video.rating}</span>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => handleWatchVideo(video)}
                        className="w-full bg-emerald-600 text-white py-2 px-3 rounded-lg text-xs mt-2 hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-1"
                      >
                        <Play className="w-3 h-3" />
                        <span>Watch Video</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {showVideoModal && selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex flex-col">
          <div className="bg-white rounded-t-2xl mt-auto max-h-[90vh] overflow-y-auto w-full">
            <div className="sticky top-0 bg-white px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-900 truncate">{selectedVideo.title}</h3>
              <button 
                onClick={() => setShowVideoModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              {/* Video Player Placeholder */}
              <div className="bg-gray-900 rounded-lg relative" style={{ paddingBottom: '56.25%' }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Video className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm font-medium mb-2">{selectedVideo.title}</p>
                    <p className="text-xs opacity-75 mb-3">Duration: {selectedVideo.duration}</p>
                    <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm flex items-center space-x-2 mx-auto">
                      <ExternalLink className="w-4 h-4" />
                      <span>Watch on YouTube</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Video Details */}
              <div>
                <h4 className="text-base font-bold text-gray-900 mb-2">{selectedVideo.title}</h4>
                <p className="text-sm text-gray-700 mb-3">{selectedVideo.description}</p>
                
                <div className="bg-gray-50 rounded-lg p-3 mb-3">
                  <h5 className="font-medium text-gray-900 mb-2 text-sm">What you'll learn:</h5>
                  <ul className="space-y-1">
                    {selectedVideo.topics.map((topic: string, index: number) => (
                      <li key={index} className="text-xs text-gray-600 flex items-center">
                        <CheckCircle className="w-3 h-3 text-emerald-600 mr-1" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-3">
                <h5 className="font-medium text-blue-900 mb-2 text-sm">Video Details</h5>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-blue-700">Instructor:</span>
                    <span className="font-medium">{selectedVideo.instructor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Duration:</span>
                    <span className="font-medium">{selectedVideo.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Level:</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getLevelColor(selectedVideo.level)}`}>
                      {selectedVideo.level}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Language:</span>
                    <span className="font-medium">{selectedVideo.language}</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 pt-2">
                <button 
                  onClick={() => toggleVideoFavorite(selectedVideo.id)}
                  className={`flex-1 py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 text-sm ${
                    favoriteVideos.includes(selectedVideo.id)
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  <Heart className="w-4 h-4" />
                  <span>{favoriteVideos.includes(selectedVideo.id) ? 'Remove Favorite' : 'Add to Favorites'}</span>
                </button>
                <button className="p-2 bg-gray-200 text-gray-700 rounded-lg">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Community Section */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white p-4">
        <h3 className="font-bold mb-2 flex items-center">
          <Users className="w-4 h-4 mr-2" />
          Zambian Sustainability Community
        </h3>
        <div className="space-y-2">
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-medium text-sm mb-1">Knowledge Sharing</h4>
            <p className="text-xs opacity-90">Connect with 1,200+ farmers practicing sustainable agriculture across Zambia.</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-medium text-sm mb-1">Free Training</h4>
            <p className="text-xs opacity-90">Monthly workshops in Lusaka, Ndola, Kitwe, and Chipata.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSustainablePractices;