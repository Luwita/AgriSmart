import React, { useState } from 'react';
import { 
  Users, 
  MessageCircle, 
  Plus, 
  Search, 
  Filter, 
  Heart,
  Share2,
  Bookmark,
  Eye,
  ThumbsUp,
  MessageSquare,
  Clock,
  MapPin,
  Star,
  Award,
  Sprout,
  Bug,
  Droplets,
  TrendingUp,
  Calendar,
  Phone,
  Mail,
  Globe,
  Video,
  FileText,
  Image,
  Send,
  X,
  Edit,
  Trash2,
  Flag,
  MoreHorizontal,
  CheckCircle,
  AlertTriangle,
  Info,
  UserPlus,
  UserCheck,
  UserX,
  ExternalLink,
  Download,
  Bell,
  QrCode,
  DollarSign
} from 'lucide-react';

const CommunityForum: React.FC = () => {
  const [activeTab, setActiveTab] = useState('discussions');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showNewPost, setShowNewPost] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [joinedEvents, setJoinedEvents] = useState<number[]>([2]); // User has joined event 2
  const [showJoinConfirmation, setShowJoinConfirmation] = useState(false);
  const [eventToJoin, setEventToJoin] = useState<any>(null);

  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: '',
    tags: '',
    attachments: [] as File[]
  });

  // Forum Categories
  const categories = [
    { id: 'all', name: 'All Topics', icon: MessageCircle, color: 'gray' },
    { id: 'crops', name: 'Crop Management', icon: Sprout, color: 'emerald' },
    { id: 'pests', name: 'Pest & Disease', icon: Bug, color: 'red' },
    { id: 'irrigation', name: 'Irrigation & Water', icon: Droplets, color: 'blue' },
    { id: 'market', name: 'Market & Prices', icon: TrendingUp, color: 'green' },
    { id: 'equipment', name: 'Equipment & Tools', icon: Award, color: 'purple' },
    { id: 'weather', name: 'Weather & Climate', icon: Calendar, color: 'yellow' },
    { id: 'general', name: 'General Discussion', icon: Users, color: 'indigo' }
  ];

  // Sample Forum Posts
  const forumPosts = [
    {
      id: 1,
      title: 'Fall Armyworm Control in Maize - Effective Methods',
      content: 'Fellow farmers, I\'ve been dealing with fall armyworm in my maize fields in Central Province. After trying several methods, I found that Emamectin benzoate works best when applied early morning or evening. Has anyone tried biological control methods?',
      author: {
        name: 'James Mwanza',
        avatar: null,
        location: 'Central Province',
        reputation: 245,
        verified: true,
        joinDate: '2023-05-15'
      },
      category: 'pests',
      tags: ['fall-armyworm', 'maize', 'pesticides', 'central-province'],
      timestamp: '2024-12-15T10:30:00Z',
      likes: 23,
      replies: 8,
      views: 156,
      isLiked: false,
      isBookmarked: true,
      attachments: [
        { type: 'image', name: 'armyworm_damage.jpg', url: '#' }
      ],
      status: 'active'
    },
    {
      id: 2,
      title: 'Best Maize Varieties for Zone IIa - 2024 Season',
      content: 'Planning for the next season and looking for recommendations on maize varieties that perform well in Zone IIa. Currently growing SC627 but want to diversify. What are your experiences with PAN 67 and ZM 623?',
      author: {
        name: 'Mary Banda',
        avatar: null,
        location: 'Lusaka Province',
        reputation: 189,
        verified: true,
        joinDate: '2023-08-20'
      },
      category: 'crops',
      tags: ['maize', 'varieties', 'zone-iia', 'planning'],
      timestamp: '2024-12-14T15:45:00Z',
      likes: 31,
      replies: 12,
      views: 203,
      isLiked: true,
      isBookmarked: false,
      attachments: [],
      status: 'active'
    },
    {
      id: 3,
      title: 'Drip Irrigation Setup - Cost and Benefits',
      content: 'Considering installing drip irrigation on my 10-hectare farm. Looking for advice on costs, suppliers in Zambia, and actual water savings achieved. Any recommendations for reliable suppliers?',
      author: {
        name: 'Peter Mulenga',
        avatar: null,
        location: 'Eastern Province',
        reputation: 156,
        verified: false,
        joinDate: '2024-01-10'
      },
      category: 'irrigation',
      tags: ['drip-irrigation', 'water-management', 'suppliers'],
      timestamp: '2024-12-14T09:20:00Z',
      likes: 18,
      replies: 6,
      views: 134,
      isLiked: false,
      isBookmarked: false,
      attachments: [],
      status: 'active'
    },
    {
      id: 4,
      title: 'FRA Maize Prices 2024 - Registration Process',
      content: 'Food Reserve Agency has announced ZMW 4,000 per ton for white maize. Has anyone completed the registration process? What documents are required and how long does it take?',
      author: {
        name: 'Grace Tembo',
        avatar: null,
        location: 'Southern Province',
        reputation: 298,
        verified: true,
        joinDate: '2022-11-05'
      },
      category: 'market',
      tags: ['fra', 'maize-prices', 'registration', 'government'],
      timestamp: '2024-12-13T14:15:00Z',
      likes: 45,
      replies: 15,
      views: 287,
      isLiked: true,
      isBookmarked: true,
      attachments: [
        { type: 'document', name: 'FRA_Registration_Guide.pdf', url: '#' }
      ],
      status: 'pinned'
    },
    {
      id: 5,
      title: 'Organic Farming Certification in Zambia',
      content: 'Looking to transition to organic farming. Can anyone share their experience with the certification process in Zambia? Which certification body did you use and what were the costs involved?',
      author: {
        name: 'Joseph Mwale',
        avatar: null,
        location: 'Copperbelt Province',
        reputation: 134,
        verified: false,
        joinDate: '2024-03-22'
      },
      category: 'general',
      tags: ['organic-farming', 'certification', 'sustainable'],
      timestamp: '2024-12-13T11:30:00Z',
      likes: 22,
      replies: 9,
      views: 178,
      isLiked: false,
      isBookmarked: false,
      attachments: [],
      status: 'active'
    }
  ];

  // Expert Contributors
  const experts = [
    {
      id: 1,
      name: 'Dr. Michael Chisanga',
      title: 'Agricultural Extension Officer',
      organization: 'Ministry of Agriculture',
      location: 'Lusaka',
      specialization: 'Crop Management & Pest Control',
      reputation: 1250,
      posts: 89,
      helpfulAnswers: 156,
      verified: true,
      avatar: null,
      contact: {
        phone: '+260 977 123 456',
        email: 'm.chisanga@agriculture.gov.zm'
      }
    },
    {
      id: 2,
      name: 'Prof. Sarah Phiri',
      title: 'Agricultural Researcher',
      organization: 'University of Zambia',
      location: 'Lusaka',
      specialization: 'Soil Science & Fertilizer Management',
      reputation: 980,
      posts: 67,
      helpfulAnswers: 134,
      verified: true,
      avatar: null,
      contact: {
        phone: '+260 966 234 567',
        email: 's.phiri@unza.zm'
      }
    },
    {
      id: 3,
      name: 'Charles Banda',
      title: 'Agricultural Economist',
      organization: 'Zambia National Farmers Union',
      location: 'Lusaka',
      specialization: 'Market Analysis & Farm Business',
      reputation: 876,
      posts: 45,
      helpfulAnswers: 98,
      verified: true,
      avatar: null,
      contact: {
        phone: '+260 955 345 678',
        email: 'c.banda@znfu.org.zm'
      }
    }
  ];

  // Upcoming Events with enhanced details
  const upcomingEvents = [
    {
      id: 1,
      title: 'Sustainable Farming Workshop',
      date: '2024-12-20',
      time: '09:00 AM',
      endTime: '04:00 PM',
      location: 'Lusaka Agricultural Training Center',
      address: 'Great East Road, Lusaka',
      organizer: 'Ministry of Agriculture',
      organizerContact: '+260 211 254 894',
      type: 'workshop',
      attendees: 45,
      maxAttendees: 60,
      price: 'Free',
      description: 'Learn about sustainable farming practices and organic certification. This comprehensive workshop covers soil health, water conservation, and integrated pest management.',
      agenda: [
        '09:00 - Registration & Welcome',
        '09:30 - Soil Health Management',
        '11:00 - Water Conservation Techniques',
        '12:30 - Lunch Break',
        '13:30 - Organic Certification Process',
        '15:00 - Q&A Session',
        '16:00 - Closing Remarks'
      ],
      requirements: ['Bring notebook and pen', 'Farming experience preferred', 'Valid ID required'],
      benefits: ['Certificate of attendance', 'Free lunch', 'Networking opportunities', 'Resource materials'],
      tags: ['sustainable', 'organic', 'certification', 'soil-health'],
      image: 'https://images.pexels.com/photos/2252618/pexels-photo-2252618.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      title: 'Fall Armyworm Management Seminar',
      date: '2024-12-22',
      time: '02:00 PM',
      endTime: '05:00 PM',
      location: 'Online (Zoom)',
      address: 'Virtual Event',
      organizer: 'CIMMYT Zambia',
      organizerContact: '+260 211 789 456',
      type: 'webinar',
      attendees: 128,
      maxAttendees: 200,
      price: 'Free',
      description: 'Expert-led session on integrated fall armyworm management strategies for Zambian farmers. Learn the latest techniques and biological control methods.',
      agenda: [
        '14:00 - Welcome & Introductions',
        '14:15 - Fall Armyworm Biology & Lifecycle',
        '15:00 - Integrated Management Strategies',
        '15:45 - Break',
        '16:00 - Biological Control Methods',
        '16:30 - Q&A Session',
        '17:00 - Closing'
      ],
      requirements: ['Stable internet connection', 'Zoom app installed', 'Pre-registration required'],
      benefits: ['Expert insights', 'Digital resources', 'Recording access', 'Follow-up materials'],
      tags: ['fall-armyworm', 'pest-management', 'webinar', 'cimmyt'],
      image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      title: 'Maize Marketing Conference',
      date: '2024-12-28',
      time: '08:30 AM',
      endTime: '05:00 PM',
      location: 'Mulungushi International Conference Centre',
      address: 'Independence Avenue, Lusaka',
      organizer: 'Zambia National Farmers Union',
      organizerContact: '+260 211 456 789',
      type: 'conference',
      attendees: 234,
      maxAttendees: 500,
      price: 'ZMW 150',
      description: 'Annual conference on maize marketing and value chain development. Connect with buyers, learn about market trends, and explore export opportunities.',
      agenda: [
        '08:30 - Registration & Breakfast',
        '09:00 - Opening Ceremony',
        '09:30 - Market Trends & Outlook',
        '10:30 - Export Opportunities',
        '12:00 - Lunch & Networking',
        '13:30 - Value Addition Strategies',
        '15:00 - Buyer-Seller Meetings',
        '16:30 - Panel Discussion',
        '17:00 - Closing Ceremony'
      ],
      requirements: ['Conference fee payment', 'Business registration (for traders)', 'Valid ID'],
      benefits: ['Market insights', 'Networking opportunities', 'Buyer connections', 'Conference materials', 'Lunch included'],
      tags: ['maize', 'marketing', 'conference', 'znfu', 'export'],
      image: 'https://images.pexels.com/photos/1459339/pexels-photo-1459339.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 4,
      title: 'Smart Irrigation Technology Demo',
      date: '2024-12-30',
      time: '10:00 AM',
      endTime: '03:00 PM',
      location: 'AgroTech Demo Farm, Chongwe',
      address: 'Chongwe District, Lusaka Province',
      organizer: 'AgroTech Solutions Zambia',
      organizerContact: '+260 977 123 456',
      type: 'demonstration',
      attendees: 32,
      maxAttendees: 50,
      price: 'ZMW 50',
      description: 'Hands-on demonstration of smart irrigation systems including drip irrigation, soil sensors, and automated controls. See the technology in action.',
      agenda: [
        '10:00 - Welcome & Farm Tour',
        '10:30 - Drip Irrigation Setup',
        '11:30 - Soil Sensor Installation',
        '12:30 - Lunch Break',
        '13:30 - Automation Systems',
        '14:30 - Cost-Benefit Analysis',
        '15:00 - Q&A & Closing'
      ],
      requirements: ['Comfortable walking shoes', 'Sun protection', 'Transport to venue'],
      benefits: ['Hands-on experience', 'Technology demonstration', 'Cost analysis', 'Supplier contacts', 'Lunch provided'],
      tags: ['irrigation', 'technology', 'demonstration', 'smart-farming'],
      image: 'https://images.pexels.com/photos/4022092/pexels-photo-4022092.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const filteredPosts = forumPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'recent': return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      case 'popular': return b.likes - a.likes;
      case 'replies': return b.replies - a.replies;
      case 'views': return b.views - a.views;
      default: return 0;
    }
  });

  const handleCreatePost = () => {
    console.log('Creating post:', newPost);
    setShowNewPost(false);
    setNewPost({
      title: '',
      content: '',
      category: '',
      tags: '',
      attachments: []
    });
  };

  const handleJoinEvent = (event: any) => {
    setEventToJoin(event);
    setShowJoinConfirmation(true);
  };

  const confirmJoinEvent = () => {
    if (eventToJoin) {
      setJoinedEvents(prev => [...prev, eventToJoin.id]);
      setShowJoinConfirmation(false);
      setEventToJoin(null);
      
      // Show success message
      alert(`Successfully registered for "${eventToJoin.title}"! You will receive a confirmation email with event details.`);
    }
  };

  const handleLeaveEvent = (eventId: number) => {
    setJoinedEvents(prev => prev.filter(id => id !== eventId));
    alert('You have successfully unregistered from this event.');
  };

  const handleViewEventDetails = (event: any) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - postTime.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return postTime.toLocaleDateString();
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'workshop': return 'bg-emerald-100 text-emerald-800';
      case 'webinar': return 'bg-blue-100 text-blue-800';
      case 'conference': return 'bg-purple-100 text-purple-800';
      case 'demonstration': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'workshop': return Award;
      case 'webinar': return Video;
      case 'conference': return Users;
      case 'demonstration': return Eye;
      default: return Calendar;
    }
  };

  const isEventFull = (event: any) => event.attendees >= event.maxAttendees;
  const isEventPast = (event: any) => new Date(event.date) < new Date();
  const isUserJoined = (eventId: number) => joinedEvents.includes(eventId);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Community Forum</h1>
          <p className="text-gray-600 mt-1">Connect with fellow Zambian farmers and agricultural experts</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-2">
          <button 
            onClick={() => setShowNewPost(true)}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Post</span>
          </button>
          <button 
            onClick={() => setActiveTab('events')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Calendar className="w-4 h-4" />
            <span>View Events</span>
          </button>
        </div>
      </div>

      {/* Zambian Community Context */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-lg shadow-sm text-white p-6">
        <h3 className="text-lg font-bold mb-3">🇿🇲 Zambian Farmers Community</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-semibold mb-1">Active Members</h4>
            <p className="text-sm opacity-90">1,247 farmers across all provinces</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-semibold mb-1">Expert Support</h4>
            <p className="text-sm opacity-90">Agricultural extension officers available</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-semibold mb-1">Local Languages</h4>
            <p className="text-sm opacity-90">English, Bemba, Nyanja, Tonga supported</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <h4 className="font-semibold mb-1">Upcoming Events</h4>
            <p className="text-sm opacity-90">{upcomingEvents.length} events this month</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'discussions', label: 'Discussions', icon: MessageCircle },
              { id: 'experts', label: 'Expert Network', icon: Award },
              { id: 'events', label: 'Events & Training', icon: Calendar },
              { id: 'success', label: 'Success Stories', icon: Star }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {tab.id === 'events' && (
                    <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1">
                      {upcomingEvents.length}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'discussions' && (
            <div className="space-y-6">
              {/* Search and Filters */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors flex items-center space-x-1 ${
                          selectedCategory === category.id
                            ? 'bg-emerald-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <Icon className="w-3 h-3" />
                        <span>{category.name}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search discussions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="recent">Most Recent</option>
                    <option value="popular">Most Popular</option>
                    <option value="replies">Most Replies</option>
                    <option value="views">Most Views</option>
                  </select>
                </div>
              </div>

              {/* Forum Posts */}
              <div className="space-y-4">
                {sortedPosts.map((post) => {
                  const category = categories.find(c => c.id === post.category);
                  const Icon = category?.icon || MessageCircle;
                  
                  return (
                    <div key={post.id} className={`bg-white border rounded-lg p-6 hover:shadow-md transition-shadow ${
                      post.status === 'pinned' ? 'border-emerald-200 bg-emerald-50' : 'border-gray-200'
                    }`}>
                      {/* Post Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                            <Users className="w-6 h-6 text-emerald-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
                              {post.author.verified && (
                                <CheckCircle className="w-4 h-4 text-blue-600" />
                              )}
                              <span className="text-sm text-gray-500">•</span>
                              <span className="text-sm text-gray-500">{post.author.location}</span>
                              <span className="text-sm text-gray-500">•</span>
                              <span className="text-sm text-gray-500">{getTimeAgo(post.timestamp)}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Icon className={`w-4 h-4 text-${category?.color}-600`} />
                              <span className="text-sm text-gray-600">{category?.name}</span>
                              <span className="text-sm text-gray-500">•</span>
                              <span className="text-sm text-gray-500">{post.author.reputation} reputation</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {post.status === 'pinned' && (
                            <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full">
                              Pinned
                            </span>
                          )}
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Post Content */}
                      <div className="mb-4">
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h2>
                        <p className="text-gray-700 leading-relaxed">{post.content}</p>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Attachments */}
                      {post.attachments.length > 0 && (
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-2">
                            {post.attachments.map((attachment, index) => (
                              <div key={index} className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2">
                                {attachment.type === 'image' ? (
                                  <Image className="w-4 h-4 text-gray-600" />
                                ) : (
                                  <FileText className="w-4 h-4 text-gray-600" />
                                )}
                                <span className="text-sm text-gray-700">{attachment.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Post Actions */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div className="flex items-center space-x-6">
                          <button className={`flex items-center space-x-2 text-sm ${
                            post.isLiked ? 'text-emerald-600' : 'text-gray-600 hover:text-emerald-600'
                          }`}>
                            <ThumbsUp className="w-4 h-4" />
                            <span>{post.likes}</span>
                          </button>
                          <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-600">
                            <MessageSquare className="w-4 h-4" />
                            <span>{post.replies}</span>
                          </button>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Eye className="w-4 h-4" />
                            <span>{post.views}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className={`p-2 rounded-lg ${
                            post.isBookmarked ? 'text-yellow-600 bg-yellow-100' : 'text-gray-400 hover:text-yellow-600 hover:bg-yellow-100'
                          }`}>
                            <Bookmark className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-100 rounded-lg">
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'experts' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {experts.map((expert) => (
                  <div key={expert.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Award className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-gray-900">{expert.name}</h3>
                          {expert.verified && (
                            <CheckCircle className="w-4 h-4 text-blue-600" />
                          )}
                        </div>
                        <p className="text-sm text-blue-600">{expert.title}</p>
                        <p className="text-sm text-gray-600">{expert.organization}</p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {expert.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Sprout className="w-4 h-4 mr-2" />
                        {expert.specialization}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                      <div>
                        <p className="text-lg font-bold text-emerald-600">{expert.reputation}</p>
                        <p className="text-xs text-gray-600">Reputation</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-blue-600">{expert.posts}</p>
                        <p className="text-xs text-gray-600">Posts</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-purple-600">{expert.helpfulAnswers}</p>
                        <p className="text-xs text-gray-600">Helpful</p>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button className="flex-1 bg-emerald-600 text-white py-2 px-3 rounded text-sm hover:bg-emerald-700 transition-colors">
                        Ask Question
                      </button>
                      <button className="p-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors">
                        <Phone className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors">
                        <Mail className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'events' && (
            <div className="space-y-6">
              {/* Events Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Upcoming Events & Training</h3>
                  <p className="text-gray-600">Join agricultural events and training sessions across Zambia</p>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{joinedEvents.length} events joined</span>
                </div>
              </div>

              {/* Events Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {upcomingEvents.map((event) => {
                  const EventIcon = getEventTypeIcon(event.type);
                  const isJoined = isUserJoined(event.id);
                  const isFull = isEventFull(event);
                  const isPast = isEventPast(event);
                  
                  return (
                    <div key={event.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      {/* Event Image */}
                      <div className="relative h-48">
                        <img 
                          src={event.image} 
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 right-4">
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${getEventTypeColor(event.type)}`}>
                            {event.type}
                          </span>
                        </div>
                        <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm font-medium">
                              {new Date(event.date).toLocaleDateString()} at {event.time}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Event Content */}
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-2">{event.title}</h4>
                            <div className="space-y-1 text-sm text-gray-600">
                              <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-2" />
                                {event.location}
                              </div>
                              <div className="flex items-center">
                                <Users className="w-4 h-4 mr-2" />
                                {event.organizer}
                              </div>
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-2" />
                                {event.time} - {event.endTime}
                              </div>
                              {event.price !== 'Free' && (
                                <div className="flex items-center">
                                  <DollarSign className="w-4 h-4 mr-2" />
                                  {event.price}
                                </div>
                              )}
                            </div>
                          </div>
                          <EventIcon className="w-8 h-8 text-gray-400" />
                        </div>

                        <p className="text-gray-700 text-sm mb-4 line-clamp-3">{event.description}</p>

                        {/* Event Tags */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {event.tags.slice(0, 3).map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                              #{tag}
                            </span>
                          ))}
                          {event.tags.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                              +{event.tags.length - 3} more
                            </span>
                          )}
                        </div>

                        {/* Attendee Progress */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">{event.attendees}</span> / {event.maxAttendees} attendees
                          </div>
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                isFull ? 'bg-red-500' : 'bg-emerald-500'
                              }`}
                              style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Event Status Messages */}
                        {isPast && (
                          <div className="mb-4 p-3 bg-gray-100 border border-gray-200 rounded-lg">
                            <div className="flex items-center text-gray-600">
                              <Clock className="w-4 h-4 mr-2" />
                              <span className="text-sm">This event has ended</span>
                            </div>
                          </div>
                        )}

                        {isFull && !isPast && !isJoined && (
                          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <div className="flex items-center text-red-600">
                              <AlertTriangle className="w-4 h-4 mr-2" />
                              <span className="text-sm">Event is full - Join waitlist</span>
                            </div>
                          </div>
                        )}

                        {isJoined && (
                          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                            <div className="flex items-center text-emerald-600">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              <span className="text-sm">You're registered for this event</span>
                            </div>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex space-x-2">
                          {!isPast && (
                            <>
                              {isJoined ? (
                                <button 
                                  onClick={() => handleLeaveEvent(event.id)}
                                  className="flex-1 bg-red-600 text-white py-2 px-3 rounded text-sm hover:bg-red-700 transition-colors flex items-center justify-center space-x-1"
                                >
                                  <UserX className="w-4 h-4" />
                                  <span>Leave Event</span>
                                </button>
                              ) : (
                                <button 
                                  onClick={() => handleJoinEvent(event)}
                                  disabled={isFull}
                                  className={`flex-1 py-2 px-3 rounded text-sm transition-colors flex items-center justify-center space-x-1 ${
                                    isFull 
                                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                      : 'bg-emerald-600 text-white hover:bg-emerald-700'
                                  }`}
                                >
                                  <UserPlus className="w-4 h-4" />
                                  <span>{isFull ? 'Join Waitlist' : 'Join Event'}</span>
                                </button>
                              )}
                            </>
                          )}
                          
                          <button 
                            onClick={() => handleViewEventDetails(event)}
                            className="px-4 py-2 bg-gray-100 text-gray-600 rounded text-sm hover:bg-gray-200 transition-colors flex items-center space-x-1"
                          >
                            <Eye className="w-4 h-4" />
                            <span>Details</span>
                          </button>
                          
                          <button className="p-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors">
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'success' && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Success Stories</h3>
                <p className="text-gray-600">Inspiring stories from fellow Zambian farmers</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[
                  {
                    farmer: 'John Phiri',
                    location: 'Eastern Province',
                    achievement: 'Increased maize yield by 45%',
                    story: 'By implementing precision farming techniques and using improved seeds, I was able to increase my maize yield from 4 tons/ha to 5.8 tons/ha.',
                    image: 'https://images.pexels.com/photos/2252618/pexels-photo-2252618.jpeg?auto=compress&cs=tinysrgb&w=400'
                  },
                  {
                    farmer: 'Ruth Mwanza',
                    location: 'Central Province',
                    achievement: 'Reduced input costs by 30%',
                    story: 'Through organic farming and composting, I reduced my fertilizer costs while maintaining good yields and improving soil health.',
                    image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=400'
                  }
                ].map((story, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <img src={story.image} alt={story.achievement} className="w-full h-48 object-cover" />
                    <div className="p-6">
                      <div className="flex items-center space-x-2 mb-3">
                        <Star className="w-5 h-5 text-yellow-500" />
                        <h3 className="font-semibold text-gray-900">{story.farmer}</h3>
                        <span className="text-sm text-gray-500">• {story.location}</span>
                      </div>
                      <h4 className="font-medium text-emerald-600 mb-2">{story.achievement}</h4>
                      <p className="text-gray-700 text-sm">{story.story}</p>
                      <button className="mt-4 text-emerald-600 text-sm font-medium hover:text-emerald-700">
                        Read Full Story →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Join Event Confirmation Modal */}
      {showJoinConfirmation && eventToJoin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Confirm Event Registration</h3>
              <button 
                onClick={() => setShowJoinConfirmation(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 mb-2">{eventToJoin.title}</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(eventToJoin.date).toLocaleDateString()} at {eventToJoin.time}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {eventToJoin.location}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    {eventToJoin.organizer}
                  </div>
                  {eventToJoin.price !== 'Free' && (
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-2" />
                      {eventToJoin.price}
                    </div>
                  )}
                </div>
              </div>

              {eventToJoin.requirements && eventToJoin.requirements.length > 0 && (
                <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h5 className="font-semibold text-yellow-800 mb-2">Requirements:</h5>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    {eventToJoin.requirements.map((req: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2">•</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {eventToJoin.benefits && eventToJoin.benefits.length > 0 && (
                <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <h5 className="font-semibold text-emerald-800 mb-2">What you'll get:</h5>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    {eventToJoin.benefits.map((benefit: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <div className="flex items-start space-x-2">
                  <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-blue-700">
                    <p>You will receive a confirmation email with event details, location directions, and any additional instructions.</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button 
                  onClick={() => setShowJoinConfirmation(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmJoinEvent}
                  className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Confirm Registration</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Event Details Modal */}
      {showEventModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Event Details</h3>
              <button 
                onClick={() => setShowEventModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              {/* Event Header */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-2">
                  <img 
                    src={selectedEvent.image} 
                    alt={selectedEvent.title}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedEvent.title}</h2>
                  <p className="text-gray-700 leading-relaxed">{selectedEvent.description}</p>
                </div>

                <div className="space-y-4">
                  {/* Event Info Card */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Event Information</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-3 text-gray-600" />
                        <div>
                          <p className="font-medium">{new Date(selectedEvent.date).toLocaleDateString()}</p>
                          <p className="text-gray-600">{selectedEvent.time} - {selectedEvent.endTime}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <MapPin className="w-4 h-4 mr-3 text-gray-600 mt-0.5" />
                        <div>
                          <p className="font-medium">{selectedEvent.location}</p>
                          <p className="text-gray-600">{selectedEvent.address}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-3 text-gray-600" />
                        <div>
                          <p className="font-medium">{selectedEvent.organizer}</p>
                          <p className="text-gray-600">{selectedEvent.organizerContact}</p>
                        </div>
                      </div>
                      {selectedEvent.price !== 'Free' && (
                        <div className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-3 text-gray-600" />
                          <p className="font-medium">{selectedEvent.price}</p>
                        </div>
                      )}
                      <div className="flex items-center">
                        <UserCheck className="w-4 h-4 mr-3 text-gray-600" />
                        <p>{selectedEvent.attendees} / {selectedEvent.maxAttendees} attendees</p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-2">
                    {!isEventPast(selectedEvent) && (
                      <>
                        {isUserJoined(selectedEvent.id) ? (
                          <button 
                            onClick={() => handleLeaveEvent(selectedEvent.id)}
                            className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
                          >
                            <UserX className="w-4 h-4" />
                            <span>Leave Event</span>
                          </button>
                        ) : (
                          <button 
                            onClick={() => handleJoinEvent(selectedEvent)}
                            disabled={isEventFull(selectedEvent)}
                            className={`w-full py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 ${
                              isEventFull(selectedEvent)
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-emerald-600 text-white hover:bg-emerald-700'
                            }`}
                          >
                            <UserPlus className="w-4 h-4" />
                            <span>{isEventFull(selectedEvent) ? 'Join Waitlist' : 'Join Event'}</span>
                          </button>
                        )}
                      </>
                    )}
                    
                    <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>Add to Calendar</span>
                    </button>
                    
                    <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2">
                      <Share2 className="w-4 h-4" />
                      <span>Share Event</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Event Agenda */}
              {selectedEvent.agenda && selectedEvent.agenda.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Event Agenda</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="space-y-3">
                      {selectedEvent.agenda.map((item: string, index: number) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
                            {index + 1}
                          </div>
                          <p className="text-gray-700">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Requirements and Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedEvent.requirements && selectedEvent.requirements.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Requirements</h4>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <ul className="space-y-2">
                        {selectedEvent.requirements.map((req: string, index: number) => (
                          <li key={index} className="flex items-start text-sm text-yellow-700">
                            <AlertTriangle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {selectedEvent.benefits && selectedEvent.benefits.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">What You'll Get</h4>
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                      <ul className="space-y-2">
                        {selectedEvent.benefits.map((benefit: string, index: number) => (
                          <li key={index} className="flex items-start text-sm text-emerald-700">
                            <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Post Modal */}
      {showNewPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Create New Post</h3>
              <button 
                onClick={() => setShowNewPost(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={newPost.title}
                    onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Enter a descriptive title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={newPost.category}
                    onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="">Select category</option>
                    {categories.filter(c => c.id !== 'all').map((category) => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                  <textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    rows={6}
                    placeholder="Share your question, experience, or knowledge with the community..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                  <input
                    type="text"
                    value={newPost.tags}
                    onChange={(e) => setNewPost({...newPost, tags: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Enter tags separated by commas (e.g., maize, fertilizer, zone-iia)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Attachments (Optional)</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <div className="space-y-2">
                      <div className="flex justify-center space-x-2">
                        <Image className="w-6 h-6 text-gray-400" />
                        <FileText className="w-6 h-6 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-600">Click to upload images or documents</p>
                      <p className="text-xs text-gray-500">Max 5MB per file</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button 
                  onClick={() => setShowNewPost(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleCreatePost}
                  className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Post to Community</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityForum;