// controllers/authorsController.js
const mongoose = require('mongoose');
const Author = require('../models/Author');

// ─── GET all authors ──────────────────────────────────────────────────────────
const getAllAuthors = async (req, res, next) => {
  try {
    const authors = await Author.find().sort({ lastName: 1 });
    res.status(200).json(authors);
  } catch (err) {
    next(err);
  }
};

// ─── GET single author by ID ──────────────────────────────────────────────────
const getAuthorById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid author ID format' });
    }

    const author = await Author.findById(id);

    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }

    res.status(200).json(author);
  } catch (err) {
    next(err);
  }
};

// ─── POST create an author ────────────────────────────────────────────────────
const createAuthor = async (req, res, next) => {
  try {
    const { firstName, lastName, email, nationality, birthYear, deathYear, biography, website } =
      req.body;

    const author = new Author({
      firstName,
      lastName,
      email,
      nationality,
      birthYear,
      deathYear,
      biography,
      website,
    });

    const saved = await author.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

// ─── PUT update an author ─────────────────────────────────────────────────────
const updateAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid author ID format' });
    }

    const updated = await Author.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Author not found' });
    }

    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

// ─── DELETE an author ─────────────────────────────────────────────────────────
const deleteAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid author ID format' });
    }

    const deleted = await Author.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Author not found' });
    }

    res.status(200).json({ message: 'Author deleted successfully', id });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor };
