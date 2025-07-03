# 📚 Book Management REST API  
A file-based CRUD API for managing books with JWT authentication — built using Node.js and Express.

# 📚 Book Management API (File-Based with JWT Authentication)

This is a Node.js Express API for managing books, with authentication and file-based persistence using `users.json` and `books.json`.

---

## 🔧 Tech Stack

* Node.js
* Express.js
* JWT Authentication
* bcrypt (password hashing)
* JSON File Persistence (no database)
* Custom Middleware for Logger & Auth

---

## 📁 Folder Structure

```
project-root/
|
├── data/
│   ├── users.json
│   └── books.json
|
├── src/
│   ├── controllers/
│   ├── models/
│   ├── middlewares/
│   └── routes/
|
├── utils/
│   └── filehelper.js
├── .env
├── package.json
├── README.md
└── index.js
```

---

## 🚀 Setup Instructions

1. **Clone the repo**

```bash
git clone https://github.com/Neeraj-rajauriya/BookStore.git
cd BookStore
```

2. **Install dependencies**

```bash
npm install
```

3. **Create `.env` file**

```env
PORT=5000
JWT_SECRET=K@9f!nZ3rV8&uT7$LpQ2^xM1*aB6!dR

```

4. **Create data folder if not present**

```bash
mkdir data
echo "[]" > data/users.json
echo "[]" > data/books.json
```

5. **Run the server**

```bash
npm start
```

---

Base URL: http://localhost:5001/api

## 🔐 Authentication

* You must register and login to get a JWT token.
* Include this token in headers for all book-related routes.

### Example Header:

```
Authorization: Bearer <your_token>
```

---

## 🧪 Testing Endpoints (via Postman or curl)

### ✅ Register

```
POST /api/auth/register
Body: { "email": "test@example.com", "password": "123456" }
```

### ✅ Login

```
POST /api/auth/login
Body: { "email": "test@example.com", "password": "123456" }
```

Response:

```json
{
  "Success": true,
  "token": "<JWT Token>"
}
```

---

### 📚 Books (use JWT token in headers)

| Method | Endpoint                             | Description           |
| ------ | ------------------------------------ | --------------------- |
| POST   | `/api/book/books`                    | Add a new book        |
| GET    | `/api/book/books`                    | Get all books         |
| GET    | `/api/book/books/:id`                | Get book by ID        |
| PUT    | `/api/book/books/:id`                | Update a book         |
| DELETE | `/api/book/books/:id`                | Delete a book         |
| GET    | `/api/book/search?genre=fiction`     | Filter books by genre |
| GET    | `/api/book/paginated?page=1&limit=5` | Paginated books       |

---

## 📒 Sample Book Schema

```json
{
  "id": "uuid",
  "title": "Book Title",
  "author": "Author Name",
  "genre": "Fiction",
  "publishedYear": 2023,
  "userId": "user-uuid"
}
```

---

## 📋 Submission Summary

* ✅ All code is pushed to public GitHub.
* ✅ Includes custom auth, file persistence, logger.
* ✅ README includes setup & test instructions.

---

## ✨ Author

[Neeraj Rajauriya](https://www.linkedin.com/in/neeraj-rajauriya-3830b6210/)
[GitHub Profile](https://github.com/Neeraj-rajauriya)
