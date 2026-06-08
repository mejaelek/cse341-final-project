# CSE341 Final Project – Books & Authors API

A RESTful API built with **Node.js**, **Express**, and **MongoDB** supporting full CRUD operations on two collections: **Books** and **Authors**.

---

## 🔗 Live Links

| Resource | URL |
|---|---|
| Render (live API) | `https://cse341-code-student.onrender.com` |
| Swagger Docs | `https://cse341-code-student.onrender.com/api-docs` |
| GitHub Repo | `https://github.com/<your-org>/cse341-final-project` |

---

## 📁 Project Structure

```
cse341-final-project/
├── config/
│   ├── db.js              # MongoDB connection
│   └── swagger.js         # Swagger/OpenAPI 3.0 spec + schemas
├── controllers/
│   ├── booksController.js    # CRUD logic for Books
│   └── authorsController.js  # CRUD logic for Authors
├── middleware/
│   ├── errorHandler.js    # Central error handling middleware
│   └── validate.js        # express-validator result handler
├── models/
│   ├── Book.js            # Mongoose schema & model for Books
│   └── Author.js          # Mongoose schema & model for Authors
├── routes/
│   ├── books.js           # /books routes + Swagger JSDoc
│   └── authors.js         # /authors routes + Swagger JSDoc
├── .env.example           # Environment variable template
├── .gitignore
├── package.json
└── server.js              # Express app entry point
```

---

## 🚀 Getting Started Locally

### 1. Clone the repo
```bash
git clone https://github.com/<your-org>/cse341-final-project.git
cd cse341-final-project
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
```bash
cp .env.example .env
```
Edit `.env` and fill in your `MONGODB_URI` from MongoDB Atlas.

### 4. Run the development server
```bash
npm run dev
```

Server starts at `http://localhost:3000`  
Swagger UI at `http://localhost:3000/api-docs`

---

## 📋 Collections & Endpoints

### Books (`/books`)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/books` | Get all books |
| GET | `/books/:id` | Get a book by ID |
| POST | `/books` | Create a new book |
| PUT | `/books/:id` | Update a book |
| DELETE | `/books/:id` | Delete a book |

**Required fields for POST:** `title`, `authorId`, `genre`, `publishedYear`, `isbn`

---

### Authors (`/authors`)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/authors` | Get all authors |
| GET | `/authors/:id` | Get an author by ID |
| POST | `/authors` | Create a new author |
| PUT | `/authors/:id` | Update an author |
| DELETE | `/authors/:id` | Delete an author |

**Required fields for POST:** `firstName`, `lastName`, `email`, `nationality`, `birthYear`

---

## ⚠️ Error Handling

The API returns consistent JSON error responses across all endpoints:

| Status | Scenario |
|---|---|
| 400 | Invalid MongoDB ObjectId format |
| 404 | Resource not found |
| 409 | Duplicate unique field (isbn / email) |
| 422 | Validation failure — returns array of `{ field, message }` |
| 500 | Internal server error |

---

## 🛠 Tech Stack

- **Runtime:** Node.js 18+
- **Framework:** Express 4
- **Database:** MongoDB Atlas via Mongoose 8
- **Validation:** express-validator
- **Documentation:** swagger-jsdoc + swagger-ui-express
- **Deployment:** Render

---

## 👥 Team Contributions

| Member | Contribution 1 | Contribution 2 |
|---|---|---|
| Member A | Books model & controller | Books routes + Swagger docs |
| Member B | Authors model & controller | Authors routes + Swagger docs |

---

## 📄 License
MIT
