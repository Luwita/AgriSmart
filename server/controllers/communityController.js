import CommunityPost from '../models/CommunityPost.js';
import User from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendResponse, sendError } from '../utils/apiResponse.js';

// @desc    Get all community posts
// @route   GET /api/community/posts
// @access  Private
export const getPosts = asyncHandler(async (req, res) => {
  const { category, sortBy = 'recent', limit = 20, page = 1 } = req.query;

  let filter = { isActive: true };
  if (category && category !== 'all') {
    filter.category = category;
  }

  let sortOption = {};
  switch (sortBy) {
    case 'popular':
      sortOption = { 'likes.length': -1 };
      break;
    case 'replies':
      sortOption = { 'replies.length': -1 };
      break;
    case 'views':
      sortOption = { views: -1 };
      break;
    default:
      sortOption = { createdAt: -1 };
  }

  const posts = await CommunityPost.find(filter)
    .populate('author', 'name farmProfile.location farmProfile.province stats.reputation')
    .sort(sortOption)
    .limit(parseInt(limit))
    .skip((parseInt(page) - 1) * parseInt(limit));

  const totalPosts = await CommunityPost.countDocuments(filter);

  sendResponse(res, 200, {
    posts,
    pagination: {
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalPosts / parseInt(limit)),
      totalPosts
    }
  }, 'Community posts retrieved successfully');
});

// @desc    Get single community post
// @route   GET /api/community/posts/:id
// @access  Private
export const getPost = asyncHandler(async (req, res) => {
  const post = await CommunityPost.findById(req.params.id)
    .populate('author', 'name farmProfile.location farmProfile.province stats.reputation')
    .populate('replies.author', 'name farmProfile.location stats.reputation');

  if (!post) {
    return sendError(res, 404, 'Post not found');
  }

  // Increment view count
  post.views += 1;
  await post.save();

  sendResponse(res, 200, { post }, 'Post retrieved successfully');
});

// @desc    Create new community post
// @route   POST /api/community/posts
// @access  Private
export const createPost = asyncHandler(async (req, res) => {
  const { title, content, category, tags } = req.body;

  const post = await CommunityPost.create({
    author: req.userId,
    title,
    content,
    category,
    tags: tags ? tags.split(',').map(tag => tag.trim()) : []
  });

  // Update user stats
  await User.findByIdAndUpdate(req.userId, {
    $inc: { 'stats.postsCreated': 1 }
  });

  const populatedPost = await CommunityPost.findById(post._id)
    .populate('author', 'name farmProfile.location farmProfile.province stats.reputation');

  sendResponse(res, 201, { post: populatedPost }, 'Post created successfully');
});

// @desc    Like/unlike a post
// @route   POST /api/community/posts/:id/like
// @access  Private
export const likePost = asyncHandler(async (req, res) => {
  const post = await CommunityPost.findById(req.params.id);
  if (!post) {
    return sendError(res, 404, 'Post not found');
  }

  const existingLike = post.likes.find(like => like.user.toString() === req.userId);

  if (existingLike) {
    // Unlike
    post.likes = post.likes.filter(like => like.user.toString() !== req.userId);
  } else {
    // Like
    post.likes.push({ user: req.userId });
  }

  await post.save();

  sendResponse(res, 200, {
    likesCount: post.likes.length
  }, existingLike ? 'Post unliked' : 'Post liked');
});

// @desc    Add reply to post
// @route   POST /api/community/posts/:id/replies
// @access  Private
export const addReply = asyncHandler(async (req, res) => {
  const { content } = req.body;

  const post = await CommunityPost.findById(req.params.id);
  if (!post) {
    return sendError(res, 404, 'Post not found');
  }

  post.replies.push({
    author: req.userId,
    content
  });

  await post.save();

  // Update user stats
  await User.findByIdAndUpdate(req.userId, {
    $inc: { 'stats.helpfulAnswers': 1, 'stats.reputation': 5 }
  });

  const populatedPost = await CommunityPost.findById(post._id)
    .populate('author', 'name farmProfile.location farmProfile.province stats.reputation')
    .populate('replies.author', 'name farmProfile.location stats.reputation');

  sendResponse(res, 200, { post: populatedPost }, 'Reply added successfully');
});

// @desc    Get community experts
// @route   GET /api/community/experts
// @access  Private
export const getExperts = asyncHandler(async (req, res) => {
  const experts = await User.find({
    role: { $in: ['extension_officer', 'admin'] },
    isActive: true
  }).select('name farmProfile.location stats.reputation stats.helpfulAnswers role');

  sendResponse(res, 200, { experts }, 'Experts retrieved successfully');
});

// @desc    Update post
// @route   PUT /api/community/posts/:id
// @access  Private
export const updatePost = asyncHandler(async (req, res) => {
  const post = await CommunityPost.findOne({
    _id: req.params.id,
    author: req.userId
  });

  if (!post) {
    return sendError(res, 404, 'Post not found or unauthorized');
  }

  const updatedPost = await CommunityPost.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  ).populate('author', 'name farmProfile.location farmProfile.province stats.reputation');

  sendResponse(res, 200, { post: updatedPost }, 'Post updated successfully');
});

// @desc    Delete post
// @route   DELETE /api/community/posts/:id
// @access  Private
export const deletePost = asyncHandler(async (req, res) => {
  const post = await CommunityPost.findOne({
    _id: req.params.id,
    author: req.userId
  });

  if (!post) {
    return sendError(res, 404, 'Post not found or unauthorized');
  }

  post.isActive = false;
  await post.save();

  sendResponse(res, 200, null, 'Post deleted successfully');
});