import express from 'express';
import {
  getPosts,
  getPost,
  createPost,
  likePost,
  addReply,
  getExperts,
  updatePost,
  deletePost
} from '../controllers/communityController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.route('/posts')
  .get(auth, getPosts)
  .post(auth, createPost);

router.route('/posts/:id')
  .get(auth, getPost)
  .put(auth, updatePost)
  .delete(auth, deletePost);

router.post('/posts/:id/like', auth, likePost);
router.post('/posts/:id/replies', auth, addReply);
router.get('/experts', auth, getExperts);

export default router;