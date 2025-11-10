const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authors: [String],
  ISBN: { type: String, unique: true, required: true },
  genre: String,
  totalCopies: { type: Number, default: 0 },
  availableCopies: { type: Number, default: 10},
  description: String,
  coverUrl: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Book', BookSchema);
