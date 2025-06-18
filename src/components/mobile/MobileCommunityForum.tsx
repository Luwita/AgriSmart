import React, { useState } from 'react';
import { 
  Users, 
  MessageSquare, 
  Plus, 
  Search, 
  Filter, 
  ThumbsUp, 
  MessageCircle, 
  User, 
  Calendar, 
  MapPin, 
  Award, 
  ChevronRight, 
  X, 
  Send, 
  Image, 
  Paperclip, 
  Heart, 
  Share2, 
  MoreVertical, 
  Clock, 
  CheckCircle, 
  AlertTriangle
} from 'lucide-react';

const MobileCommunityForum: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [showPostDetails, setShowPostDetails] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Forum categories
  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'crops', name: 'Crops' },
    { id: 'pests', name: 'Pests' },
    { id: 'market', name: 'Market' },
    { id: 'weather', name: 'Weather' },
    { id: 'equipment', name: 'Equipment' }
  ];

  // Sample forum posts
  const posts = [
    {
      id: 1,
      author: {
        id: 1,
        name: 'James Mwanza',
        location: 'Chongwe, Lusaka Province',
        reputation: 245,
        role: 'farmer'
      },
      title: 'Best practices for fall armyworm control?',
      content: 'I\'ve noticed some fall armyworm damage in my maize crop. What are the most effective control methods that other farmers are using this season?',
      category: 'pests',
      tags: ['maize', 'pests', 'fall armyworm'],
      likes: 12,
      replies: [
        {
          author: {
            id: 2,
            name: 'Mary Banda',
            location: 'Lusaka',
            reputation: 567,
            role: 'extension_officer'
          },
          content: 'For fall armyworm, I recommend using Emamectin benzoate at 200g/ha. Apply early morning or late evening for best results. Also consider crop rotation next season.',
          date: new Date(Date.now() - 12 * 60 * 60 * 1000),
          likes: 8
        }
      ],
      views: 45,
      status: 'active',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    },
    {
      id: 2,
      author: {
        id: 2,
        name: 'Mary Banda',
        location: 'Lusaka',
        reputation: 567,
        role: 'extension_officer'
      },
      title: 'FRA maize purchase program 2024-2025',
      content: 'The Food Reserve Agency has announced the maize purchase program for the 2024-2025 season. The price is set at ZMW 4,000 per ton. Registration starts next week at all district offices.',
      category: 'market',
      tags: ['maize', 'FRA', 'market'],
      likes: 35,
      replies: [],
      views: 120,
      status: 'pinned',
      createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
    },
    {
      id: 3,
      author: {
        id: 3,
        name: 'Peter Mulenga',
        location: 'Mkushi, Central Province',
        reputation: 189,
        role: 'farmer'
      },
      title: 'Recommended soybean varieties for Central Province?',
      content: 'I\'m planning to plant soybeans next season in Mkushi. Which varieties have performed well in Central Province? Looking for high yield and disease resistance.',
      category: 'crops',
      tags: ['soybeans', 'varieties', 'central province'],
      likes: 8,
      replies: [
        {
          author: {
            id: 4,
            name: 'Grace Tembo',
            location: 'Kabwe',
            reputation: 423,
            role: 'extension_officer'
          },
          content: 'For Central Province, I recommend Soprano or Hernon 147 varieties. Both have shown good performance in our trials with yields of 2.2-2.5 tons/ha when properly managed.',
          date: new Date(Date.now() - 36 * 60 * 60 * 1000),
          likes: 5
        },
        {
          author: {
            id: 5,
            name: 'John Phiri',
            location: 'Mkushi',
            reputation: 156,
            role: 'farmer'
          },
          content: 'I\'ve had great results with Soprano in Mkushi for the past two seasons. Good resistance to rust and pod shattering.',
          date: new Date(Date.now() - 24 * 60 * 60 * 1000),
          likes: 3
        }
      ],
      views: 67,
      status: 'active',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
    }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  const handleViewPost = (post: any) => {
    setSelectedPost(post);
    setShowPostDetails(true);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'extension_officer': return 'bg-blue-100 text-blue-800';
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'cooperative': return 'bg-orange-100 text-orange-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pinned': return 'text-purple-600 bg-purple-100';
      case 'active': return 'text-emerald-600 bg-emerald-100';
      case 'closed': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="p-4 space-y-4 pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Community</h1>
          <p className="text-gray-600 text-sm">Connect with Zambian farmers</p>
        </div>
        <button 
          onClick={() => setShowNewPostModal(true)}
          className="bg-emerald-600 text-white p-2 rounded-xl hover:bg-emerald-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Zambian Community Context */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl text-white p-4">
        <h3 className="font-bold mb-2">🇿🇲 Zambian Farming Community</h3>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-white bg-opacity-20 rounded-lg p-2">
            <p className="font-medium">Active Members</p>
            <p className="opacity-90">1,247 farmers across Zambia</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-2">
            <p className="font-medium">Expert Support</p>
            <p className="opacity-90">Extension officers available</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm"
        >
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </button>
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search discussions..."
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
      </div>

      {showFilters && (
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <h3 className="font-medium text-gray-900 mb-3 text-sm">Category</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Forum Posts */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <div 
            key={post.id} 
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            onClick={() => handleViewPost(post)}
          >
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <MapPin className="w-3 h-3 mr-1" />
                      <span>{post.author.location}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(post.author.role)}`}>
                    {post.author.role.replace('_', ' ')}
                  </span>
                  {post.status === 'pinned' && (
                    <span className="text-xs text-purple-600 mt-1 flex items-center">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Pinned
                    </span>
                  )}
                </div>
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-2">{post.title}</h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{post.content}</p>
              
              <div className="flex flex-wrap gap-1 mb-3">
                {post.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                    #{tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <ThumbsUp className="w-3 h-3 mr-1" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="w-3 h-3 mr-1" />
                    <span>{post.replies.length}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Post Details Modal */}
      {showPostDetails && selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col">
          <div className="bg-white rounded-t-2xl mt-auto max-h-[90vh] overflow-y-auto w-full">
            <div className="sticky top-0 bg-white px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 truncate">{selectedPost.title}</h3>
              <button 
                onClick={() => setShowPostDetails(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              {/* Author Info */}
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="font-medium text-gray-900">{selectedPost.author.name}</p>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getRoleColor(selectedPost.author.role)}`}>
                      {selectedPost.author.role.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span>{selectedPost.author.location}</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <Award className="w-3 h-3 mr-1" />
                    <span>{selectedPost.author.reputation} reputation</span>
                  </div>
                </div>
              </div>
              
              {/* Post Content */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-3">{selectedPost.title}</h4>
                <p className="text-sm text-gray-700 mb-3">{selectedPost.content}</p>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {selectedPost.tags.map((tag: string, index: number) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>{new Date(selectedPost.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <Eye className="w-3 h-3 mr-1" />
                      <span>{selectedPost.views} views</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button className="flex-1 bg-emerald-100 text-emerald-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-emerald-200 transition-colors flex items-center justify-center space-x-1">
                  <ThumbsUp className="w-4 h-4" />
                  <span>Like ({selectedPost.likes})</span>
                </button>
                <button className="flex-1 bg-blue-100 text-blue-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors flex items-center justify-center space-x-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>Reply</span>
                </button>
                <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
              
              {/* Replies */}
              <div className="border-t border-gray-200 pt-4">
                <h4 className="font-medium text-gray-900 mb-3 text-sm">
                  Replies ({selectedPost.replies.length})
                </h4>
                <div className="space-y-4">
                  {selectedPost.replies.map((reply: any, index: number) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-start space-x-3 mb-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="font-medium text-gray-900 text-sm">{reply.author.name}</p>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getRoleColor(reply.author.role)}`}>
                              {reply.author.role.replace('_', ' ')}
                            </span>
                          </div>
                          <div className="flex items-center text-xs text-gray-500 mt-0.5">
                            <Clock className="w-3 h-3 mr-1" />
                            <span>{new Date(reply.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-700 mb-3">{reply.content}</p>
                      
                      <div className="flex items-center space-x-3 text-xs">
                        <button className="flex items-center text-gray-500 hover:text-emerald-600">
                          <ThumbsUp className="w-3 h-3 mr-1" />
                          <span>{reply.likes}</span>
                        </button>
                        <button className="flex items-center text-gray-500 hover:text-blue-600">
                          <MessageCircle className="w-3 h-3 mr-1" />
                          <span>Reply</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Reply Input */}
              <div className="border-t border-gray-200 pt-4">
                <div className="relative">
                  <textarea 
                    className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Write your reply..."
                    rows={3}
                  ></textarea>
                  <div className="absolute bottom-3 right-3 flex space-x-2">
                    <button className="p-1.5 text-gray-400 hover:text-gray-600">
                      <Image className="w-5 h-5" />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-gray-600">
                      <Paperclip className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <button className="mt-3 w-full bg-emerald-600 text-white py-3 px-4 rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2">
                  <Send className="w-4 h-4" />
                  <span>Post Reply</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Post Modal */}
      {showNewPostModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col">
          <div className="bg-white rounded-t-2xl mt-auto max-h-[90vh] overflow-y-auto w-full">
            <div className="sticky top-0 bg-white px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Create New Post</h3>
              <button 
                onClick={() => setShowNewPostModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input 
                  type="text"
                  className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter a descriptive title for your post"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                  <option value="">Select category</option>
                  <option value="crops">Crops</option>
                  <option value="pests">Pests</option>
                  <option value="market">Market</option>
                  <option value="weather">Weather</option>
                  <option value="equipment">Equipment</option>
                  <option value="general">General</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <textarea 
                  className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Describe your question or share information..."
                  rows={5}
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma separated)</label>
                <input 
                  type="text"
                  className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="e.g., maize, fertilizer, central province"
                />
              </div>

              <div className="flex items-center space-x-3 text-sm">
                <button className="flex items-center space-x-1 text-gray-600">
                  <Image className="w-4 h-4" />
                  <span>Add Image</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-600">
                  <Paperclip className="w-4 h-4" />
                  <span>Attach File</span>
                </button>
              </div>

              <div className="flex space-x-3 pt-4">
                <button 
                  onClick={() => setShowNewPostModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-xl hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setShowNewPostModal(false)}
                  className="flex-1 bg-emerald-600 text-white py-3 px-4 rounded-xl hover:bg-emerald-700 transition-colors"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Community Experts */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
        <h3 className="font-medium text-gray-900 mb-3 flex items-center">
          <Award className="w-4 h-4 mr-2 text-yellow-600" />
          Community Experts
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Mary Banda</p>
                <div className="flex items-center text-xs text-gray-500">
                  <MapPin className="w-3 h-3 mr-1" />
                  <span>Lusaka</span>
                </div>
                <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">
                  Extension Officer
                </span>
              </div>
            </div>
            <button className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
              <MessageCircle className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Dr. Grace Tembo</p>
                <div className="flex items-center text-xs text-gray-500">
                  <MapPin className="w-3 h-3 mr-1" />
                  <span>Kabwe</span>
                </div>
                <span className="inline-block mt-1 px-2 py-0.5 bg-purple-100 text-purple-800 rounded-full text-xs">
                  Plant Protection Specialist
                </span>
              </div>
            </div>
            <button className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
              <MessageCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileCommunityForum;