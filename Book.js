// models/Book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Book title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author',
      required: [true, 'Author ID is required'],
    },
    genre: {
      type: String,
      required: [true, 'Genre is required'],
      trim: true,
      maxlength: [100, 'Genre cannot exceed 100 characters'],
    },
    publishedYear: {
      type: Number,
      required: [true, 'Published year is required'],
      min: [1000, 'Published year must be a valid year'],
      max: [new Date().getFullYear(), `Published year cannot be in the future`],
    },
    isbn: {
      type: String,
      required: [true, 'ISBN is required'],
      unique: true,
      trim: true,
      match: [/^(97[89][-\s]?[\d\s-]{10,17})$|^\d{9}[\dXx]$/, 'Please provide a valid ISBN'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    pages: {
      type: Number,
      min: [1, 'Pages must be at least 1'],
    },
    language: {
      type: String,
      trim: true,
      default: 'English',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Book', bookSchema);
