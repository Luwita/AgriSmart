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
  Mail,
  MapPin,
  ChevronRight,
  Heart,
  Share2,
  Bookmark
} from 'lucide-react';

const SustainablePractices: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [completedPractices, setCompletedPractices] = useState<number[]>([1, 3, 5]);
  const [showLearningCenter, setShowLearningCenter] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [videoCategory, setVideoCategory] = useState('all');
  const [favoriteVideos, setFavoriteVideos] = useState<number[]>([1, 3, 7]);

  const categories = [
    { id: 'all', name: 'All Practices', icon: Leaf },
    { id: 'soil', name: 'Soil Health', icon: TreePine },
    { id: 'water', name: 'Water Conservation', icon: Droplets },
    { id: 'energy', name: 'Renewable Energy', icon: Sun },
    { id: 'waste', name: 'Waste Management', icon: Recycle },
  ];

  const videoCategories = [
    { id: 'all', name: 'All Videos' },
    { id: 'soil', name: 'Soil Management' },
    { id: 'water', name: 'Water Conservation' },
    { id: 'energy', name: 'Renewable Energy' },
    { id: 'waste', name: 'Waste Management' },
    { id: 'crops', name: 'Crop Management' },
    { id: 'livestock', name: 'Livestock' },
    { id: 'business', name: 'Farm Business' }
  ];

  // Free Agricultural Videos Database
  const agriculturalVideos = [
    {
      id: 1,
      title: 'Sustainable Maize Farming in Zambia',
      description: 'Learn modern techniques for growing maize sustainably in Zambian conditions',
      duration: '15:30',
      category: 'crops',
      instructor: 'Dr. James Mwanza - University of Zambia',
      views: 12500,
      rating: 4.8,
      language: 'English/Bemba',
      thumbnail: 'https://images.pexels.com/photos/2252618/pexels-photo-2252618.jpeg?auto=compress&cs=tinysrgb&w=400',
      videoUrl: 'https://www.youtube.com/watch?v=example1',
      topics: ['Crop rotation', 'Fertilizer management', 'Pest control'],
      level: 'Beginner',
      downloadable: true,
      subtitles: true
    },
    {
      id: 2,
      title: 'Water Conservation Techniques for Small Farms',
      description: 'Practical water saving methods for Zambian smallholder farmers',
      duration: '12:45',
      category: 'water',
      instructor: 'Mary Banda - Agricultural Extension Officer',
      views: 8900,
      rating: 4.6,
      language: 'English/Nyanja',
      thumbnail: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=400',
      videoUrl: 'https://www.youtube.com/watch?v=example2',
      topics: ['Drip irrigation', 'Rainwater harvesting', 'Mulching'],
      level: 'Intermediate',
      downloadable: true,
      subtitles: true
    },
    {
      id: 3,
      title: 'Composting for Better Soil Health',
      description: 'Step-by-step guide to creating nutrient-rich compost from farm waste',
      duration: '18:20',
      category: 'soil',
      instructor: 'Peter Mulenga - Organic Farming Expert',
      views: 15600,
      rating: 4.9,
      language: 'English/Tonga',
      thumbnail: 'https://images.pexels.com/photos/1459339/pexels-photo-1459339.jpeg?auto=compress&cs=tinysrgb&w=400',
      videoUrl: 'https://www.youtube.com/watch?v=example3',
      topics: ['Organic matter', 'Decomposition', 'Soil nutrients'],
      level: 'Beginner',
      downloadable: true,
      subtitles: true
    },
    {
      id: 4,
      title: 'Solar Power for Rural Farms',
      description: 'Installing and maintaining solar systems for agricultural use',
      duration: '22:15',
      category: 'energy',
      instructor: 'Engineer Sarah Phiri - Solar Solutions Zambia',
      views: 6700,
      rating: 4.7,
      language: 'English',
      thumbnail: 'https://images.pexels.com/photos/33044/sunflower-sun-summer-yellow.jpg?auto=compress&cs=tinysrgb&w=400',
      videoUrl: 'https://www.youtube.com/watch?v=example4',
      topics: ['Solar panels', 'Battery storage', 'Irrigation pumps'],
      level: 'Advanced',
      downloadable: false,
      subtitles: true
    },
    {
      id: 5,
      title: 'Integrated Pest Management',
      description: 'Natural and sustainable pest control methods for Zambian crops',
      duration: '16:40',
      category: 'crops',
      instructor: 'Dr. Grace Tembo - Plant Protection Research',
      views: 11200,
      rating: 4.8,
      language: 'English/Bemba',
      thumbnail: 'https://images.pexels.com/photos/4022092/pexels-photo-4022092.jpeg?auto=compress&cs=tinysrgb&w=400',
      videoUrl: 'https://www.youtube.com/watch?v=example5',
      topics: ['Biological control', 'Companion planting', 'Natural pesticides'],
      level: 'Intermediate',
      downloadable: true,
      subtitles: true
    },
    {
      id: 6,
      title: 'Biogas Production from Farm Waste',
      description: 'Convert animal waste and crop residues into clean cooking gas',
      duration: '20:30',
      category: 'waste',
      instructor: 'Joseph Mwale - Renewable Energy Specialist',
      views: 9400,
      rating: 4.5,
      language: 'English/Nyanja',
      thumbnail: 'https://images.pexels.com/photos/2252618/pexels-photo-2252618.jpeg?auto=compress&cs=tinysrgb&w=400',
      videoUrl: 'https://www.youtube.com/watch?v=example6',
      topics: ['Biogas digester', 'Methane production', 'Slurry fertilizer'],
      level: 'Advanced',
      downloadable: true,
      subtitles: false
    },
    {
      id: 7,
      title: 'Climate-Smart Agriculture Practices',
      description: 'Adapting farming practices to climate change in Zambia',
      duration: '25:10',
      category: 'crops',
      instructor: 'Prof. Michael Chisanga - Climate Research',
      views: 18900,
      rating: 4.9,
      language: 'English',
      thumbnail: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=400',
      videoUrl: 'https://www.youtube.com/watch?v=example7',
      topics: ['Drought resistance', 'Weather forecasting', 'Crop diversification'],
      level: 'Intermediate',
      downloadable: true,
      subtitles: true
    },
    {
      id: 8,
      title: 'Small-Scale Livestock Management',
      description: 'Sustainable practices for raising chickens, goats, and cattle',
      duration: '19:45',
      category: 'livestock',
      instructor: 'Dr. Ruth Mwanza - Animal Husbandry',
      views: 7800,
      rating: 4.6,
      language: 'English/Bemba',
      thumbnail: 'https://images.pexels.com/photos/1459339/pexels-photo-1459339.jpeg?auto=compress&cs=tinysrgb&w=400',
      videoUrl: 'https://www.youtube.com/watch?v=example8',
      topics: ['Animal health', 'Feed management', 'Housing'],
      level: 'Beginner',
      downloadable: true,
      subtitles: true
    },
    {
      id: 9,
      title: 'Farm Business Planning and Marketing',
      description: 'Building a profitable and sustainable farm business',
      duration: '28:30',
      category: 'business',
      instructor: 'Charles Banda - Agricultural Economist',
      views: 13400,
      rating: 4.7,
      language: 'English',
      thumbnail: 'https://images.pexels.com/photos/33044/sunflower-sun-summer-yellow.jpg?auto=compress&cs=tinysrgb&w=400',
      videoUrl: 'https://www.youtube.com/watch?v=example9',
      topics: ['Business planning', 'Market analysis', 'Financial management'],
      level: 'Advanced',
      downloadable: false,
      subtitles: true
    },
    {
      id: 10,
      title: 'Organic Certification Process in Zambia',
      description: 'Step-by-step guide to obtaining organic certification',
      duration: '14:20',
      category: 'business',
      instructor: 'Agnes Mulenga - Organic Certification Board',
      views: 5600,
      rating: 4.4,
      language: 'English/Nyanja',
      thumbnail: 'https://images.pexels.com/photos/4022092/pexels-photo-4022092.jpeg?auto=compress&cs=tinysrgb&w=400',
      videoUrl: 'https://www.youtube.com/watch?v=example10',
      topics: ['Certification standards', 'Documentation', 'Inspection process'],
      level: 'Intermediate',
      downloadable: true,
      subtitles: true
    }
  ];

  const learningResources = [
    {
      title: 'Zambian Sustainable Agriculture Handbook',
      type: 'PDF Guide',
      description: 'Comprehensive 120-page guide covering all aspects of sustainable farming in Zambia',
      downloadUrl: '#',
      size: '15 MB',
      language: 'English/Bemba'
    },
    {
      title: 'Crop Calendar for Zambian Provinces',
      type: 'Interactive Tool',
      description: 'Province-specific planting and harvesting calendars with weather data',
      downloadUrl: '#',
      size: 'Web App',
      language: 'Multiple'
    },
    {
      title: 'Soil Testing Kit Instructions',
      type: 'Video Series',
      description: 'How to use soil testing kits and interpret results',
      downloadUrl: '#',
      size: '45 minutes',
      language: 'English/Local'
    },
    {
      title: 'Sustainable Farming Checklist',
      type: 'Printable Checklist',
      description: 'Monthly and seasonal checklists for sustainable farm management',
      downloadUrl: '#',
      size: '2 MB',
      language: 'English/Nyanja'
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
      relatedVideos: [1, 3, 7]
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
      relatedVideos: [2, 6]
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
      relatedVideos: [3, 6]
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
    },
    {
      id: 5,
      title: 'Cover Crop Integration',
      category: 'soil',
      difficulty: 'Medium',
      impact: 'High',
      duration: '1 Season',
      description: 'Plant cover crops during off-season to protect and improve soil health.',
      benefits: ['Soil erosion prevention', 'Nitrogen fixation', 'Weed suppression'],
      steps: [
        'Select appropriate cover crop species',
        'Plant after main crop harvest',
        'Manage cover crop growth',
        'Incorporate into soil before next planting'
      ],
      carbonSaving: '2.1 tons CO₂/year',
      costSaving: 'ZMW 450/season',
      relatedVideos: [1, 3, 7]
    },
    {
      id: 6,
      title: 'Precision Fertilizer Application',
      category: 'soil',
      difficulty: 'Medium',
      impact: 'High',
      duration: '1 Month',
      description: 'Use soil testing and GPS technology for targeted fertilizer application.',
      benefits: ['Reduced chemical usage', 'Better crop nutrition', 'Cost savings'],
      steps: [
        'Soil testing across fields',
        'Create nutrient maps',
        'Apply variable rate fertilization',
        'Monitor crop response'
      ],
      carbonSaving: '1.9 tons CO₂/year',
      costSaving: 'ZMW 750/season',
      relatedVideos: [1, 5]
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

  const filteredVideos = agriculturalVideos.filter(video => {
    const matchesCategory = videoCategory === 'all' || video.category === videoCategory;
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

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
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sustainable Practices</h1>
          <p className="text-gray-600 mt-1">Implement eco-friendly farming methods for long-term success</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button 
            onClick={() => setShowLearningCenter(true)}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
          >
            <BookOpen className="w-4 h-4" />
            <span>Learning Center</span>
          </button>
        </div>
      </div>

      {/* Zambian Sustainability Context */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-lg shadow-sm text-white p-6">
        <h3 className="text-lg font-bold mb-3">🇿🇲 Zambian Sustainable Agriculture Initiative</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-semibold mb-1">Free Training</h4>
            <p className="text-sm opacity-90">{agriculturalVideos.length} free videos in local languages</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-semibold mb-1">Government Support</h4>
            <p className="text-sm opacity-90">FISP subsidies for sustainable practices</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-semibold mb-1">Climate Adaptation</h4>
            <p className="text-sm opacity-90">Practices adapted for Zambian climate</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-semibold mb-1">Community Network</h4>
            <p className="text-sm opacity-90">1,200+ farmers sharing knowledge</p>
          </div>
        </div>
      </div>

      {/* Sustainability Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Carbon Saved</p>
              <p className="text-2xl font-bold text-emerald-600 mt-2">{sustainabilityMetrics.carbonSaved}</p>
            </div>
            <div className="p-3 bg-emerald-100 rounded-full">
              <Leaf className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Water Saved</p>
              <p className="text-2xl font-bold text-blue-600 mt-2">{sustainabilityMetrics.waterSaved}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Droplets className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Cost Saved</p>
              <p className="text-2xl font-bold text-green-600 mt-2">{sustainabilityMetrics.costSaved}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Progress</p>
              <p className="text-2xl font-bold text-purple-600 mt-2">
                {sustainabilityMetrics.practicesCompleted}/{sustainabilityMetrics.totalPractices}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-gray-700 py-2">Filter by category:</span>
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 ${
                  selectedCategory === category.id
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Award className="w-5 h-5 mr-2 text-yellow-600" />
            Sustainability Achievements
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div key={index} className={`border rounded-lg p-4 ${
                  achievement.completed ? 'border-emerald-200 bg-emerald-50' : 'border-gray-200 bg-gray-50'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <Icon className={`w-6 h-6 ${
                      achievement.completed ? 'text-emerald-600' : 'text-gray-400'
                    }`} />
                    {achievement.completed && <CheckCircle className="w-5 h-5 text-emerald-600" />}
                  </div>
                  <h4 className={`font-semibold mb-2 ${
                    achievement.completed ? 'text-emerald-800' : 'text-gray-700'
                  }`}>
                    {achievement.title}
                  </h4>
                  <p className={`text-sm mb-3 ${
                    achievement.completed ? 'text-emerald-700' : 'text-gray-600'
                  }`}>
                    {achievement.description}
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        achievement.completed ? 'bg-emerald-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${achievement.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{achievement.progress}% Complete</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Practices Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPractices.map((practice) => (
          <div key={practice.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Practice Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{practice.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{practice.description}</p>
                </div>
                <div className="flex flex-col space-y-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(practice.difficulty)}`}>
                    {practice.difficulty}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(practice.impact)}`}>
                    {practice.impact} Impact
                  </span>
                </div>
              </div>
            </div>

            {/* Practice Content */}
            <div className="p-6">
              {/* Duration and Savings */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <Clock className="w-5 h-5 mx-auto text-gray-600 mb-1" />
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="font-semibold text-gray-900">{practice.duration}</p>
                </div>
                <div className="text-center">
                  <Leaf className="w-5 h-5 mx-auto text-emerald-600 mb-1" />
                  <p className="text-sm text-gray-600">Carbon</p>
                  <p className="font-semibold text-emerald-600">{practice.carbonSaving}</p>
                </div>
                <div className="text-center">
                  <TrendingUp className="w-5 h-5 mx-auto text-green-600 mb-1" />
                  <p className="text-sm text-gray-600">Savings</p>
                  <p className="font-semibold text-green-600">{practice.costSaving}</p>
                </div>
              </div>

              {/* Benefits */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Benefits:</h4>
                <ul className="space-y-1">
                  {practice.benefits.map((benefit, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center">
                      <CheckCircle className="w-4 h-4 text-emerald-600 mr-2 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Implementation Steps */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Implementation Steps:</h4>
                <div className="space-y-2">
                  {practice.steps.map((step, index) => (
                    <div key={index} className="flex items-start text-sm text-gray-600">
                      <span className="flex-shrink-0 w-5 h-5 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xs font-medium mr-2 mt-0.5">
                        {index + 1}
                      </span>
                      {step}
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Videos */}
              {practice.relatedVideos && practice.relatedVideos.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Related Training Videos:</h4>
                  <div className="flex flex-wrap gap-2">
                    {getRelatedVideos(practice.relatedVideos).map((video) => (
                      <button
                        key={video.id}
                        onClick={() => handleWatchVideo(video)}
                        className="flex items-center space-x-1 px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs hover:bg-blue-200 transition-colors"
                      >
                        <Play className="w-3 h-3" />
                        <span>{video.title.substring(0, 20)}...</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Button */}
              <div className="flex space-x-2">
                <button
                  onClick={() => togglePracticeCompletion(practice.id)}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                    completedPractices.includes(practice.id)
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {completedPractices.includes(practice.id) ? 'Completed' : 'Start Practice'}
                </button>
                <button 
                  onClick={() => setShowLearningCenter(true)}
                  className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Learning Center Modal */}
      {showLearningCenter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-7xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">🇿🇲 Zambian Agricultural Learning Center</h3>
              <button 
                onClick={() => setShowLearningCenter(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              {/* Learning Center Header */}
              <div className="mb-6 bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg text-white p-6">
                <h4 className="text-xl font-bold mb-2">Free Agricultural Training Videos</h4>
                <p className="opacity-90">Learn sustainable farming practices from Zambian experts in your local language</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="bg-white bg-opacity-20 rounded-lg p-3">
                    <h5 className="font-semibold">{agriculturalVideos.length} Free Videos</h5>
                    <p className="text-sm opacity-90">All content completely free</p>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-lg p-3">
                    <h5 className="font-semibold">Local Languages</h5>
                    <p className="text-sm opacity-90">English, Bemba, Nyanja, Tonga</p>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-lg p-3">
                    <h5 className="font-semibold">Expert Instructors</h5>
                    <p className="text-sm opacity-90">University professors & extension officers</p>
                  </div>
                </div>
              </div>

              {/* Search and Filter */}
              <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search videos, topics, or instructors..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>
                <div>
                  <select
                    value={videoCategory}
                    onChange={(e) => setVideoCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    {videoCategories.map((category) => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Video Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {filteredVideos.map((video) => (
                  <div key={video.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleWatchVideo(video)}
                          className="bg-emerald-600 text-white p-3 rounded-full hover:bg-emerald-700 transition-colors"
                        >
                          <Play className="w-6 h-6" />
                        </button>
                      </div>
                      <div className="absolute top-2 right-2">
                        <button
                          onClick={() => toggleVideoFavorite(video.id)}
                          className={`p-2 rounded-full ${
                            favoriteVideos.includes(video.id) 
                              ? 'bg-red-500 text-white' 
                              : 'bg-white bg-opacity-80 text-gray-600'
                          }`}
                        >
                          <Heart className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                        {video.duration}
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-900 text-sm leading-tight">{video.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(video.level)}`}>
                          {video.level}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{video.description}</p>
                      
                      <div className="space-y-2 text-xs text-gray-500">
                        <div className="flex items-center justify-between">
                          <span>👨‍🏫 {video.instructor.split(' - ')[0]}</span>
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            <span>{video.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>👁️ {video.views.toLocaleString()} views</span>
                          <span>🌍 {video.language}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {video.topics.slice(0, 2).map((topic, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 mt-3">
                        <button 
                          onClick={() => handleWatchVideo(video)}
                          className="flex-1 bg-emerald-600 text-white py-2 px-3 rounded text-sm hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-1"
                        >
                          <Play className="w-4 h-4" />
                          <span>Watch</span>
                        </button>
                        {video.downloadable && (
                          <button className="p-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors">
                            <Download className="w-4 h-4" />
                          </button>
                        )}
                        <button className="p-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Learning Resources */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-blue-600" />
                  Additional Learning Resources
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {learningResources.map((resource, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h5 className="font-semibold text-gray-900 mb-2">{resource.title}</h5>
                      <p className="text-sm text-blue-600 mb-2">{resource.type}</p>
                      <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                        <span>📁 {resource.size}</span>
                        <span>🌍 {resource.language}</span>
                      </div>
                      <button className="w-full bg-blue-600 text-white py-2 rounded text-sm hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1">
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {showVideoModal && selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">{selectedVideo.title}</h3>
              <button 
                onClick={() => setShowVideoModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              {/* Video Player Placeholder */}
              <div className="bg-gray-900 rounded-lg mb-6 relative" style={{ paddingBottom: '56.25%' }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-semibold mb-2">{selectedVideo.title}</p>
                    <p className="text-sm opacity-75 mb-4">Duration: {selectedVideo.duration}</p>
                    <button className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2 mx-auto">
                      <ExternalLink className="w-4 h-4" />
                      <span>Watch on YouTube</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Video Details */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">{selectedVideo.title}</h4>
                  <p className="text-gray-700 mb-4">{selectedVideo.description}</p>
                  
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h5 className="font-semibold text-gray-900 mb-2">What you'll learn:</h5>
                    <ul className="space-y-1">
                      {selectedVideo.topics.map((topic, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center">
                          <CheckCircle className="w-4 h-4 text-emerald-600 mr-2" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h5 className="font-semibold text-blue-900 mb-3">Video Details</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-blue-700">Instructor:</span>
                        <span className="font-medium">{selectedVideo.instructor.split(' - ')[0]}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">Duration:</span>
                        <span className="font-medium">{selectedVideo.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">Level:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(selectedVideo.level)}`}>
                          {selectedVideo.level}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">Language:</span>
                        <span className="font-medium">{selectedVideo.language}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">Views:</span>
                        <span className="font-medium">{selectedVideo.views.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">Rating:</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="font-medium">{selectedVideo.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2">
                      <ExternalLink className="w-4 h-4" />
                      <span>Watch Full Video</span>
                    </button>
                    
                    {selectedVideo.downloadable && (
                      <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                        <Download className="w-4 h-4" />
                        <span>Download Video</span>
                      </button>
                    )}
                    
                    <button 
                      onClick={() => toggleVideoFavorite(selectedVideo.id)}
                      className={`w-full py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 ${
                        favoriteVideos.includes(selectedVideo.id)
                          ? 'bg-red-600 text-white hover:bg-red-700'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      <Heart className="w-4 h-4" />
                      <span>{favoriteVideos.includes(selectedVideo.id) ? 'Remove from Favorites' : 'Add to Favorites'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Community Section */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg shadow-sm">
        <div className="px-6 py-8 text-white">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <Users className="w-6 h-6 mr-2" />
            Zambian Sustainability Community
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Knowledge Sharing</h4>
              <p className="text-sm opacity-90">Connect with 1,200+ farmers practicing sustainable agriculture across all 10 Zambian provinces.</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Free Training Programs</h4>
              <p className="text-sm opacity-90">Monthly workshops in Lusaka, Ndola, Kitwe, and Chipata. All training materials in local languages.</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Success Stories</h4>
              <p className="text-sm opacity-90">Learn from farmers who increased yields by 35% and reduced costs by 25% using sustainable methods.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SustainablePractices;