// controllers/booksController.js
const mongoose = require('mongoose');
const Book = require('../models/Book');

// ─── GET all books ────────────────────────────────────────────────────────────
const getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find().populate('authorId', 'firstName lastName').sort({ createdAt: -1 });
    res.status(200).json(books);
  } catch (err) {
    next(err);
  }
};

// ─── GET single book by ID ────────────────────────────────────────────────────
const getBookById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid book ID format' });
    }

    const book = await Book.findById(id).populate('authorId', 'firstName lastName');

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json(book);
  } catch (err) {
    next(err);
  }
};

// ─── POST create a book ───────────────────────────────────────────────────────
const createBook = async (req, res, next) => {
  try {
    const { title, authorId, genre, publishedYear, isbn, description, pages, language } = req.body;

    if (!mongoose.Types.ObjectId.isValid(authorId)) {
      return res.status(400).json({ message: 'Invalid authorId format' });
    }

    const book = new Book({ title, authorId, genre, publishedYear, isbn, description, pages, language });
    const saved = await book.save();

    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

// ─── PUT update a book ────────────────────────────────────────────────────────
const updateBook = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid book ID format' });
    }

    const { authorId } = req.body;
    if (authorId && !mongoose.Types.ObjectId.isValid(authorId)) {
      return res.status(400).json({ message: 'Invalid authorId format' });
    }

    const updated = await Book.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

// ─── DELETE a book ────────────────────────────────────────────────────────────
const deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid book ID format' });
    }

    const deleted = await Book.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json({ message: 'Book deleted successfully', id });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllBooks, getBookById, createBook, updateBook, deleteBook };
