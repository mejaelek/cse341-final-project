// routes/books.js
const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const validate = require('../middleware/validate');
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require('../controllers/booksController');

// ─── Reusable validators ──────────────────────────────────────────────────────
const bookBodyValidators = [
  body('title').notEmpty().withMessage('title is required').trim(),
  body('authorId')
    .notEmpty()
    .withMessage('authorId is required')
    .isMongoId()
    .withMessage('authorId must be a valid MongoDB ObjectId'),
  body('genre').notEmpty().withMessage('genre is required').trim(),
  body('publishedYear')
    .notEmpty()
    .withMessage('publishedYear is required')
    .isInt({ min: 1000, max: new Date().getFullYear() })
    .withMessage(`publishedYear must be between 1000 and ${new Date().getFullYear()}`),
  body('isbn').notEmpty().withMessage('isbn is required').trim(),
  body('pages').optional().isInt({ min: 1 }).withMessage('pages must be a positive integer'),
  body('language').optional().trim(),
  body('description').optional().trim(),
];

const bookUpdateValidators = [
  body('title').optional().notEmpty().withMessage('title cannot be empty').trim(),
  body('authorId').optional().isMongoId().withMessage('authorId must be a valid MongoDB ObjectId'),
  body('genre').optional().notEmpty().withMessage('genre cannot be empty').trim(),
  body('publishedYear')
    .optional()
    .isInt({ min: 1000, max: new Date().getFullYear() })
    .withMessage(`publishedYear must be between 1000 and ${new Date().getFullYear()}`),
  body('pages').optional().isInt({ min: 1 }).withMessage('pages must be a positive integer'),
  body('language').optional().trim(),
  body('description').optional().trim(),
];

// ─── Routes ───────────────────────────────────────────────────────────────────

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Retrieve all books
 *     tags: [Books]
 *     description: Returns an array of all books, populated with author name.
 *     responses:
 *       200:
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', getAllBooks);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Retrieve a single book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the book
 *         schema:
 *           type: string
 *           example: 665a1f2e3b4c5d6e7f8a9b0c
 *     responses:
 *       200:
 *         description: Book found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Invalid ID format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getBookById);

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BookInput'
 *     responses:
 *       201:
 *         description: Book created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Invalid authorId format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Duplicate ISBN
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       422:
 *         description: Validation errors
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       500:
 *         description: Internal server error
 */
router.post('/', bookBodyValidators, validate, createBook);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update an existing book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the book
 *         schema:
 *           type: string
 *           example: 665a1f2e3b4c5d6e7f8a9b0c
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BookInput'
 *     responses:
 *       200:
 *         description: Book updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Book not found
 *       409:
 *         description: Duplicate ISBN
 *       422:
 *         description: Validation errors
 *       500:
 *         description: Internal server error
 */
router.put('/:id', bookUpdateValidators, validate, updateBook);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the book
 *         schema:
 *           type: string
 *           example: 665a1f2e3b4c5d6e7f8a9b0c
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Book deleted successfully
 *                 id:
 *                   type: string
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', deleteBook);

module.exports = router;
