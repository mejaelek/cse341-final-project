// models/Author.js
const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      maxlength: [100, 'First name cannot exceed 100 characters'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      maxlength: [100, 'Last name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    nationality: {
      type: String,
      required: [true, 'Nationality is required'],
      trim: true,
    },
    birthYear: {
      type: Number,
      required: [true, 'Birth year is required'],
      min: [1000, 'Birth year must be valid'],
      max: [new Date().getFullYear(), 'Birth year cannot be in the future'],
    },
    deathYear: {
      type: Number,
      default: null,
      min: [1000, 'Death year must be valid'],
      max: [new Date().getFullYear(), 'Death year cannot be in the future'],
      validate: {
        validator: function (value) {
          if (value == null) return true;
          return value >= this.birthYear;
        },
        message: 'Death year must be greater than or equal to birth year',
      },
    },
    biography: {
      type: String,
      trim: true,
      maxlength: [2000, 'Biography cannot exceed 2000 characters'],
    },
    website: {
      type: String,
      trim: true,
      match: [/^https?:\/\/.+/, 'Website must be a valid URL starting with http or https'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Author', authorSchema);
