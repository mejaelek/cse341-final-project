// routes/authors.js
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} = require('../controllers/authorsController');

// ─── Reusable validators ──────────────────────────────────────────────────────
const authorBodyValidators = [
  body('firstName').notEmpty().withMessage('firstName is required').trim(),
  body('lastName').notEmpty().withMessage('lastName is required').trim(),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('email must be a valid email address')
    .normalizeEmail(),
  body('nationality').notEmpty().withMessage('nationality is required').trim(),
  body('birthYear')
    .notEmpty()
    .withMessage('birthYear is required')
    .isInt({ min: 1000, max: new Date().getFullYear() })
    .withMessage(`birthYear must be between 1000 and ${new Date().getFullYear()}`),
  body('deathYear')
    .optional({ nullable: true })
    .isInt({ min: 1000, max: new Date().getFullYear() })
    .withMessage('deathYear must be a valid year'),
  body('biography').optional().trim(),
  body('website')
    .optional({ nullable: true })
    .isURL()
    .withMessage('website must be a valid URL'),
];

const authorUpdateValidators = [
  body('firstName').optional().notEmpty().withMessage('firstName cannot be empty').trim(),
  body('lastName').optional().notEmpty().withMessage('lastName cannot be empty').trim(),
  body('email')
    .optional()
    .isEmail()
    .withMessage('email must be a valid email address')
    .normalizeEmail(),
  body('nationality').optional().notEmpty().withMessage('nationality cannot be empty').trim(),
  body('birthYear')
    .optional()
    .isInt({ min: 1000, max: new Date().getFullYear() })
    .withMessage(`birthYear must be between 1000 and ${new Date().getFullYear()}`),
  body('deathYear')
    .optional({ nullable: true })
    .isInt({ min: 1000, max: new Date().getFullYear() })
    .withMessage('deathYear must be a valid year'),
  body('biography').optional().trim(),
  body('website').optional({ nullable: true }).isURL().withMessage('website must be a valid URL'),
];

// ─── Routes ───────────────────────────────────────────────────────────────────

/**
 * @swagger
 * /authors:
 *   get:
 *     summary: Retrieve all authors
 *     tags: [Authors]
 *     description: Returns an array of all authors sorted by last name.
 *     responses:
 *       200:
 *         description: A list of authors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Author'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', getAllAuthors);

/**
 * @swagger
 * /authors/{id}:
 *   get:
 *     summary: Retrieve a single author by ID
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the author
 *         schema:
 *           type: string
 *           example: 665a1f2e3b4c5d6e7f8a9b0d
 *     responses:
 *       200:
 *         description: Author found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Author not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getAuthorById);

/**
 * @swagger
 * /authors:
 *   post:
 *     summary: Create a new author
 *     tags: [Authors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthorInput'
 *     responses:
 *       201:
 *         description: Author created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       409:
 *         description: Duplicate email
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
router.post('/', authorBodyValidators, validate, createAuthor);

/**
 * @swagger
 * /authors/{id}:
 *   put:
 *     summary: Update an existing author
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the author
 *         schema:
 *           type: string
 *           example: 665a1f2e3b4c5d6e7f8a9b0d
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthorInput'
 *     responses:
 *       200:
 *         description: Author updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Author not found
 *       409:
 *         description: Duplicate email
 *       422:
 *         description: Validation errors
 *       500:
 *         description: Internal server error
 */
router.put('/:id', authorUpdateValidators, validate, updateAuthor);

/**
 * @swagger
 * /authors/{id}:
 *   delete:
 *     summary: Delete an author
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the author
 *         schema:
 *           type: string
 *           example: 665a1f2e3b4c5d6e7f8a9b0d
 *     responses:
 *       200:
 *         description: Author deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Author deleted successfully
 *                 id:
 *                   type: string
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Author not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', deleteAuthor);

module.exports = router;
