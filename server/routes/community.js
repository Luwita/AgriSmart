import express from 'express';
import CommunityPost from '../models/CommunityPost.js';
import User from '../models/User.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get all community posts
router.get('/posts', auth, async (req, res) => {
  try {
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

    res.json({ 
      posts,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalPosts / parseInt(limit)),
        totalPosts
      }
    });
  } catch (error) {
    console.error('Get community posts error:', error);
    res.status(500).json({ message: 'Failed to get community posts', error: error.message });
  }
});

// Get single community post
router.get('/posts/:id', auth, async (req, res) => {
  try {
    const post = await CommunityPost.findById(req.params.id)
      .populate('author', 'name farmProfile.location farmProfile.province stats.reputation')
      .populate('replies.author', 'name farmProfile.location stats.reputation');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Increment view count
    post.views += 1;
    await post.save();

    res.json({ post });
  } catch (error) {
    console.error('Get community post error:', error);
    res.status(500).json({ message: 'Failed to get community post', error: error.message });
  }
});

// Create new community post
router.post('/posts', auth, async (req, res) => {
  try {
    const { title, content, category, tags } = req.body;

    const post = new CommunityPost({
      author: req.userId,
      title,
      content,
      category,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : []
    });

    await post.save();

    // Update user stats
    await User.findByIdAndUpdate(req.userId, {
      $inc: { 'stats.postsCreated': 1 }
    });

    const populatedPost = await CommunityPost.findById(post._id)
      .populate('author', 'name farmProfile.location farmProfile.province stats.reputation');

    res.status(201).json({
      message: 'Post created successfully',
      post: populatedPost
    });
  } catch (error) {
    console.error('Create community post error:', error);
    res.status(500).json({ message: 'Failed to create post', error: error.message });
  }
});

// Like/unlike a post
router.post('/posts/:id/like', auth, async (req, res) => {
  try {
    const post = await CommunityPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
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

    res.json({
      message: existingLike ? 'Post unliked' : 'Post liked',
      likesCount: post.likes.length
    });
  } catch (error) {
    console.error('Like post error:', error);
    res.status(500).json({ message: 'Failed to like post', error: error.message });
  }
});

// Add reply to post
router.post('/posts/:id/replies', auth, async (req, res) => {
  try {
    const { content } = req.body;

    const post = await CommunityPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
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

    res.json({
      message: 'Reply added successfully',
      post: populatedPost
    });
  } catch (error) {
    console.error('Add reply error:', error);
    res.status(500).json({ message: 'Failed to add reply', error: error.message });
  }
});

// Get community experts
router.get('/experts', auth, async (req, res) => {
  try {
    const experts = await User.find({
      role: { $in: ['extension_officer', 'admin'] },
      isActive: true
    }).select('name farmProfile.location stats.reputation stats.helpfulAnswers role');

    res.json({ experts });
  } catch (error) {
    console.error('Get experts error:', error);
    res.status(500).json({ message: 'Failed to get experts', error: error.message });
  }
});

export default router;