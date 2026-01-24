const express = require('express');
const authMiddleware = require('../classwork-backend/Middleware/authMiddleware.js');  // Adjust path
const Post = require('../../model/post');

const router = express.Router();

// Fetch posts (GET /api/posts) - protected, user-specific
router.get('/', authMiddleware, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id })
      .sort({ createdAt: -1 })  // Newest first
      .limit(5);  // Match your frontend slice(0,5)
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create post (POST /api/posts) - protected
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, body, image } = req.body;
    const post = new Post({ title, body, image, user: req.user.id });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export const post = router;