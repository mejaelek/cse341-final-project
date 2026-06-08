# W05 Final Project Part 1 – Video Script
## Runtime Target: 5–8 minutes

---

### [0:00 – 0:30] INTRO

"Hello, my name is [Name], and this is our CSE341 Final Project Part 1 submission.
Today I'll be walking through our Books and Authors REST API — covering our file structure,
both collections with full CRUD operations, error handling, and our live Swagger documentation
deployed on Render. Let's get started."

---

### [0:30 – 1:30] GITHUB REPO & FILE STRUCTURE

**[Screen: GitHub repo root]**

"Here is our GitHub repository at github.com/[org]/cse341-final-project.

Our project is organized as follows:
- `server.js` — the Express entry point where we connect to MongoDB, register all middleware,
  mount routes, and start listening.
- `config/` — holds our database connection helper and our full Swagger OpenAPI 3.0 specification
  including all component schemas.
- `models/` — two Mongoose schemas: `Book.js` and `Author.js`. Both include field-level validation
  directly in the schema.
- `controllers/` — `booksController.js` and `authorsController.js`. All async controller functions
  use try/catch and pass errors to the centralized error handler.
- `routes/` — `books.js` and `authors.js`. Each route file contains the express-validator rules
  and the Swagger JSDoc comments that generate our live documentation.
- `middleware/` — `validate.js` processes express-validator results and returns a 422 with
  structured field errors. `errorHandler.js` is our centralized error handler that handles
  Mongoose CastErrors, duplicate key errors, and validation errors consistently."

---

### [1:30 – 2:30] MODELS & SCHEMA DESIGN

**[Screen: models/Book.js and models/Author.js in editor]**

"Let me show you our two Mongoose models.

The **Book** model has these required fields: title, authorId, genre, publishedYear, and isbn.
Notice that `authorId` is typed as an ObjectId referencing the Author collection — this
creates a proper relationship between collections. The isbn field has a regex validator ensuring
proper ISBN-10 or ISBN-13 format, and it is marked unique. `publishedYear` has min and max
validation using the current year dynamically.

The **Author** model requires: firstName, lastName, email, nationality, and birthYear.
Email is unique, lowercase, and validated with a regex. The `deathYear` field has a custom
validator ensuring it is never less than `birthYear`. Both models use `{ timestamps: true }`
which automatically adds `createdAt` and `updatedAt` fields."

---

### [2:30 – 4:00] CRUD ENDPOINTS DEMO

**[Screen: Swagger UI at /api-docs on Render]**

"Our Swagger documentation is live at [render-url]/api-docs. Let me demonstrate each operation.

**GET /books** — I'll execute this now. [Click Try it out → Execute]
We get a 200 with an array of all books, each populated with the author's name.

**GET /books/:id** — Let me copy an ID and test a single book fetch. [Execute]
200 — book returned. Now let me test with a bad ID — I'll type 'abc'. [Execute]
We get a 400 with the message 'Invalid book ID format'. Now a valid ObjectId format for a
non-existent record. [Execute] — 404, 'Book not found'. Error handling is working correctly.

**POST /books** — [Fill in the request body in Swagger] I'll create a new book.
201 created — the full document is returned including the auto-generated _id and timestamps.
Now let me try posting without the required `isbn` field. [Execute]
422 — we get a structured errors array: `[{ field: 'isbn', message: 'isbn is required' }]`.

**PUT /books/:id** — I'll update the title of the book we just created. [Execute]
200 — updated document returned.

**DELETE /books/:id** — [Execute] 200 — 'Book deleted successfully' with the id confirmed.

Now quickly for Authors — same pattern. [Demo GET /authors, POST /authors with body,
attempt duplicate email → 409, PUT /authors/:id, DELETE /authors/:id]"

---

### [4:00 – 5:00] ERROR HANDLING DEEP-DIVE

**[Screen: middleware/errorHandler.js]**

"I want to specifically highlight our error handling strategy, which was a core focus of this assignment.

We have three layers:

**Layer 1 — express-validator** runs on every POST and PUT route before the controller is
ever called. If any field fails, the validate middleware returns a 422 with an array of
`{ field, message }` objects — never a 500.

**Layer 2 — Controller-level guards** check for valid MongoDB ObjectId format using
`mongoose.Types.ObjectId.isValid()` before any database call. This prevents Mongoose from
even attempting a query with a bad ID.

**Layer 3 — Central errorHandler middleware** catches anything that escapes the controllers
via `next(err)`. It specifically handles:
- Mongoose CastError → 400 'Invalid ID format'
- Mongo duplicate key error (code 11000) → 409 with a friendly field name
- Mongoose ValidationError → 422 structured errors
- Everything else → 500

This means the API never leaks stack traces to the client."

---

### [5:00 – 5:45] RENDER DEPLOYMENT

**[Screen: Render dashboard, then live URL]**

"The API is deployed on Render. Here is the dashboard showing our web service. We have set
the MONGODB_URI and PORT environment variables in the Render Environment tab — the .env file
is gitignored and never committed to the repo.

The live base URL is [render-url] and the Swagger docs are at [render-url]/api-docs,
exactly as required by the rubric."

---

### [5:45 – 6:30] INDIVIDUAL CONTRIBUTIONS

"Here are the two documented contributions from each team member this week:

**[Member A]:**
1. Designed and implemented the Books Mongoose model with all schema validation rules,
   and wrote the booksController with all five CRUD functions and proper error delegation.
2. Wrote the Books router including all express-validator chains for POST and PUT,
   and authored all Swagger JSDoc annotations for the /books endpoints.

**[Member B]:**
1. Designed and implemented the Authors Mongoose model including the custom deathYear validator,
   and wrote the authorsController with all five CRUD functions.
2. Wrote the Authors router with express-validator chains, Swagger JSDoc annotations,
   and set up the centralized errorHandler and validate middleware used across both collections."

---

### [6:30 – 7:00] CLOSING

"To summarize: we have two fully operational collections — Books and Authors — each with
GET all, GET by ID, POST, PUT, and DELETE endpoints. All routes include input validation,
consistent error responses with appropriate HTTP status codes, and are fully documented in
Swagger UI published to Render.

Links submitted in Canvas:
- GitHub: github.com/[org]/cse341-final-project
- Render: [render-url]
- This video

Thank you for watching."

---

## Rubric Coverage Checklist

- [x] Two collections with CRUD (GET, POST, PUT, DELETE for Books and Authors)
- [x] Error handling and validation on all endpoints
- [x] Swagger documentation deployed to Render at /api-docs
- [x] Each team member documents two individual contributions
- [x] GitHub repo link
- [x] Render site link
- [x] YouTube video link
- [x] Video is 5–8 minutes
