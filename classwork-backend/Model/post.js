const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  image: { type: String, required: true },  // Optional: add image upload with Multer later
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Link to logged-in user
}, { timestamps: true });

export const post = mongoose.model('Post', postSchema);