// config/swagger.js
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CSE341 Final Project – Books & Authors API',
      version: '1.0.0',
      description:
        'A RESTful API for managing Books and Authors built with Node.js, Express, and MongoDB. ' +
        'This API supports full CRUD operations on two collections: **Books** and **Authors**.',
      contact: {
        name: 'CSE341 Team',
      },
    },
    servers: [
      {
        url: 'https://cse341-code-student.onrender.com',
        description: 'Production (Render)',
      },
      {
        url: 'http://localhost:3000',
        description: 'Local Development',
      },
    ],
    tags: [
      {
        name: 'Books',
        description: 'Endpoints for managing the Books collection',
      },
      {
        name: 'Authors',
        description: 'Endpoints for managing the Authors collection',
      },
    ],
    components: {
      schemas: {
        Book: {
          type: 'object',
          required: ['title', 'authorId', 'genre', 'publishedYear', 'isbn'],
          properties: {
            _id: {
              type: 'string',
              description: 'Auto-generated MongoDB ObjectId',
              example: '665a1f2e3b4c5d6e7f8a9b0c',
            },
            title: {
              type: 'string',
              description: 'Title of the book',
              example: 'The Great Gatsby',
            },
            authorId: {
              type: 'string',
              description: 'MongoDB ObjectId referencing an Author',
              example: '665a1f2e3b4c5d6e7f8a9b0d',
            },
            genre: {
              type: 'string',
              description: 'Genre of the book',
              example: 'Fiction',
            },
            publishedYear: {
              type: 'integer',
              description: 'Year the book was published',
              example: 1925,
            },
            isbn: {
              type: 'string',
              description: 'Unique ISBN-13 identifier',
              example: '978-0-7432-7356-5',
            },
            description: {
              type: 'string',
              description: 'Short description of the book',
              example: 'A novel set in the Jazz Age on Long Island.',
            },
            pages: {
              type: 'integer',
              description: 'Number of pages',
              example: 180,
            },
            language: {
              type: 'string',
              description: 'Language the book is written in',
              example: 'English',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        BookInput: {
          type: 'object',
          required: ['title', 'authorId', 'genre', 'publishedYear', 'isbn'],
          properties: {
            title: { type: 'string', example: 'The Great Gatsby' },
            authorId: { type: 'string', example: '665a1f2e3b4c5d6e7f8a9b0d' },
            genre: { type: 'string', example: 'Fiction' },
            publishedYear: { type: 'integer', example: 1925 },
            isbn: { type: 'string', example: '978-0-7432-7356-5' },
            description: {
              type: 'string',
              example: 'A novel set in the Jazz Age on Long Island.',
            },
            pages: { type: 'integer', example: 180 },
            language: { type: 'string', example: 'English' },
          },
        },
        Author: {
          type: 'object',
          required: ['firstName', 'lastName', 'email', 'nationality', 'birthYear'],
          properties: {
            _id: {
              type: 'string',
              description: 'Auto-generated MongoDB ObjectId',
              example: '665a1f2e3b4c5d6e7f8a9b0d',
            },
            firstName: { type: 'string', example: 'F. Scott' },
            lastName: { type: 'string', example: 'Fitzgerald' },
            email: {
              type: 'string',
              format: 'email',
              example: 'fscott@example.com',
            },
            nationality: { type: 'string', example: 'American' },
            birthYear: { type: 'integer', example: 1896 },
            deathYear: { type: 'integer', example: 1940, nullable: true },
            biography: {
              type: 'string',
              example: 'An American novelist known for The Great Gatsby.',
            },
            website: {
              type: 'string',
              format: 'uri',
              example: 'https://example.com/fscott',
            },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        AuthorInput: {
          type: 'object',
          required: ['firstName', 'lastName', 'email', 'nationality', 'birthYear'],
          properties: {
            firstName: { type: 'string', example: 'F. Scott' },
            lastName: { type: 'string', example: 'Fitzgerald' },
            email: { type: 'string', format: 'email', example: 'fscott@example.com' },
            nationality: { type: 'string', example: 'American' },
            birthYear: { type: 'integer', example: 1896 },
            deathYear: { type: 'integer', example: 1940, nullable: true },
            biography: {
              type: 'string',
              example: 'An American novelist known for The Great Gatsby.',
            },
            website: { type: 'string', format: 'uri', example: 'https://example.com/fscott' },
          },
        },
        ValidationError: {
          type: 'object',
          properties: {
            errors: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  field: { type: 'string', example: 'isbn' },
                  message: { type: 'string', example: 'isbn is required' },
                },
              },
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Resource not found' },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js'],
};

module.exports = swaggerJsdoc(options);
