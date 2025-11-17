# Book Tracker Application

A full-stack web application for tracking your personal book reading collection. Manage your books, track reading progress, and visualize your reading statistics through an intuitive dashboard interface.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [Application Screenshots](#application-screenshots)
- [Database Schema](#database-schema)
- [API Documentation](#api-documentation)
- [Frontend Pages](#frontend-pages)
- [Usage Guide](#usage-guide)
- [Author](#author)

---

## 🎯 Overview

Book Tracker is a personal library management system that helps you keep track of books you're reading, have read, or want to read. The application provides a clean, modern interface for adding books, tracking reading progress, and viewing statistics about your reading habits.

The application consists of:
- **Backend API**: Node.js/Express RESTful API with MongoDB database
- **Frontend**: Responsive HTML pages styled with Tailwind CSS
- **Real-time Updates**: Dynamic statistics and progress tracking

---

## ✨ Features

### Book Management
- **Add new books** with complete details (title, author, pages, price, format, status)
- **Update reading progress** by tracking pages read
- **Delete books** from your library
- **Automatic completion detection** when pages read equals total pages

### Reading Statistics
- Total books finished
- Total pages read across all books
- Total number of books in library

### Book Information Tracking
- Reading status (Read, Currently reading, Want to read, Re-read, DNF, Returned Unread)
- Book format (Print, PDF, Ebook, AudioBook)
- Price tracking
- Book recommendations (who suggested the book)
- Reading progress percentage
- Completion status

### User Interface
- Clean, modern design with Tailwind CSS
- Responsive layout for all screen sizes
- Visual progress bars for each book
- Color-coded status badges
- Real-time form validation
- Modal for updating progress

---

## 🛠 Technology Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js 5.x** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **TypeScript 5.x** - Type-safe JavaScript
- **dotenv** - Environment variable management
- **CORS** - Cross-origin resource sharing

### Frontend
- **HTML5** - Markup structure
- **Tailwind CSS** - Utility-first CSS framework (via CDN)
- **Vanilla JavaScript** - Client-side interactivity
- **Fetch API** - HTTP requests to backend

### Development Tools
- **tsx** - TypeScript execution for development
- **nodemon** - Auto-restart on file changes

---

## 📁 Project Structure

```
TP/
│
├── backend/                    # Backend API server
│   ├── config/
│   │   └── db.ts              # MongoDB connection configuration
│   ├── models/
│   │   ├── book.ts            # Mongoose book schema and model
│   │   └── interface/
│   │       └── book.ts        # TypeScript book interface
│   ├── routes/
│   │   ├── books.ts           # Book API route handlers
│   │   └── index.ts           # Route aggregator (empty)
│   ├── tools/
│   │   ├── formatEnum.ts      # Book format enumeration
│   │   └── statusEnum.ts      # Reading status enumeration
│   ├── server.ts              # Express server entry point
│   ├── package.json           # Backend dependencies
│   ├── tsconfig.json          # TypeScript configuration
│   └── .env                   # Environment variables (not in git)
│
├── frontend/                   # Frontend web pages
│   ├── index.html             # Add new book form page
│   ├── dashboard.html         # Books dashboard page
│   ├── css/
│   │   └── styles.css         # Custom styles (if any)
│   └── js/
│       ├── form.js            # Form handling logic
│       ├── book.js            # Book class and utilities
│       └── dashboard.js       # Dashboard functionality
│
├── docs/
│   └── Tasks.md               # Project tasks and todos
│
└── README.md                  # This file
```

---

## ⚙️ Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - Either:
  - Local installation - [Download](https://www.mongodb.com/try/download/community)
  - MongoDB Atlas account (cloud) - [Sign up](https://www.mongodb.com/cloud/atlas)
- **npm** - Comes with Node.js

---

## 📦 Installation & Setup

### 1. Clone or Download the Project

```bash
cd Desktop
# Your project is already at TP/
```

### 2. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd TP/backend
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the `backend/` directory:

```env
MONGODB_URI=mongodb://localhost:27017/booktracker
PORT=3000
```

**For MongoDB Atlas (cloud):**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/booktracker
PORT=3000
```

Replace `username`, `password`, and `cluster` with your actual MongoDB Atlas credentials.

### 4. Frontend Setup

No installation needed for the frontend - it uses CDN for Tailwind CSS.

---

## 🚀 Running the Application

### Start the Backend Server

From the `backend/` directory:

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3000`

You should see:
```
MongoDB connected
Server listening on http://localhost:3000
```

### Access the Frontend

Open the HTML files in your web browser:

1. **Add Book Page**: Open `frontend/index.html`
2. **Dashboard**: Open `frontend/dashboard.html`

Or use a local server:
```bash
cd frontend
# Using Python
python -m http.server 8080

# Using Node.js http-server
npx http-server -p 8080
```

Then visit:
- Add Book: `http://localhost:8080/index.html`
- Dashboard: `http://localhost:8080/dashboard.html`

---

## 📸 Application Screenshots

### Dashboard View

![Dashboard Screenshot](./docs/screenshots/dashboard.png)

### Add New Book Form

![Add Book Screenshot](./docs/screenshots/add-book.png)

---

## 🗄️ Database Schema

### Books Collection

The MongoDB database contains a single collection called `books` with the following structure:

```javascript
{
  _id: ObjectId,              // MongoDB auto-generated ID
  title: String,              // Book title (required, trimmed)
  author: String,             // Author name (required)
  pages: Number,              // Total pages (required, min: 1)
  status: String,             // Reading status (enum)
  price: Number,              // Book price (required, min: 0)
  pagesRead: Number,          // Pages read so far (required, min: 0)
  format: String,             // Book format (enum)
  suggestedBy: String,        // Recommendation source (optional)
  finished: Boolean,          // Auto-calculated completion flag
  createdAt: Date,            // Auto-generated timestamp
  updatedAt: Date             // Auto-updated timestamp
}
```

### Database Diagram

![Database Screenshot](./docs/screenshots/database.png)

```
┌─────────────────────────────────────────┐
│           Books Collection              │
├─────────────────────────────────────────┤
│ _id: ObjectId (PK)                      │
│ title: String                           │
│ author: String                          │
│ pages: Number                           │
│ status: Enum [                          │
│   'Read',                               │
│   'Re-read',                            │
│   'DNF',                                │
│   'Currently reading',                  │
│   'Returned Unread',                    │
│   'Want to read'                        │
│ ]                                       │
│ price: Number                           │
│ pagesRead: Number                       │
│ format: Enum [                          │
│   'Print',                              │
│   'PDF',                                │
│   'Ebook',                              │
│   'AudioBook'                           │
│ ]                                       │
│ suggestedBy: String                     │
│ finished: Boolean (auto-calculated)     │
│ createdAt: Date (auto)                  │
│ updatedAt: Date (auto)                  │
└─────────────────────────────────────────┘
```

### Field Validations
- `pages` must be at least 1
- `price` must be 0 or greater
- `pagesRead` cannot exceed `pages`
- `finished` is automatically set to `true` when `pagesRead >= pages`

---

## 🔌 API Documentation

Base URL: `http://localhost:3000/api/books`

### Endpoints

#### 1. Get All Books
```
GET /api/books
```
**Description**: Retrieves all books, sorted by creation date (newest first)

**Response**: `200 OK`
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "pages": 464,
    "status": "Currently reading",
    "price": 34.99,
    "pagesRead": 120,
    "format": "Ebook",
    "suggestedBy": "Colleague",
    "finished": false,
    "createdAt": "2025-11-17T10:00:00.000Z",
    "updatedAt": "2025-11-17T10:00:00.000Z"
  }
]
```

#### 2. Get Reading Statistics
```
GET /api/books/stats
```
**Description**: Returns aggregated reading statistics

**Response**: `200 OK`
```json
{
  "totalBooksFinished": 15,
  "totalPagesRead": 4523,
  "totalBooks": 23
}
```

#### 3. Create New Book
```
POST /api/books
Content-Type: application/json
```
**Description**: Adds a new book to the library

**Request Body**:
```json
{
  "title": "The Pragmatic Programmer",
  "author": "Andrew Hunt",
  "pages": 352,
  "status": "Want to read",
  "price": 29.99,
  "pagesRead": 0,
  "format": "Print",
  "suggestedBy": "Friend"
}
```

**Response**: `201 Created`
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "The Pragmatic Programmer",
  ...
  "finished": false
}
```

**Errors**:
- `400 Bad Request`: Validation error (e.g., pagesRead > pages)

#### 4. Update Book Progress
```
PUT /api/books/:id
Content-Type: application/json
```
**Description**: Updates reading progress for a specific book

**Request Body**:
```json
{
  "pagesRead": 250
}
```

**Response**: `200 OK`
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "pagesRead": 250,
  "finished": false,
  ...
}
```

**Errors**:
- `400 Bad Request`: pagesRead exceeds total pages
- `404 Not Found`: Book doesn't exist

#### 5. Delete Book
```
DELETE /api/books/:id
```
**Description**: Permanently removes a book from the library

**Response**: `200 OK`
```json
{
  "message": "Book deleted successfully"
}
```

**Errors**:
- `404 Not Found`: Book doesn't exist

---

## 🌐 Frontend Pages

### 1. Add New Book (`index.html`)

**Purpose**: Form for adding new books to the library

**Features**:
- Input fields for all book properties
- Real-time validation (pages read cannot exceed total pages)
- Automatic finished status calculation
- Success/error message display
- Form reset after successful submission

**Form Fields**:
- Title (required)
- Author (required)
- Number of Pages (required, min: 1)
- Price (required, min: 0)
- Status (dropdown, required)
- Pages Read (required, min: 0)
- Format (dropdown, required)
- Suggested By (optional)
- Finished (auto-calculated, read-only)

### 2. Dashboard (`dashboard.html`)

**Purpose**: Main view for managing and viewing your book collection

**Features**:
- Statistics cards showing:
  - Books Finished (with checkmark icon)
  - Total Pages Read (with book icon)
  - Total Books (with library icon)
- Book list with cards displaying:
  - Book title and author
  - Format icon and reading status badge
  - Progress bar with percentage
  - Price and completion status
  - Update Progress button
  - Delete button
- Update Progress Modal:
  - Input for new pages read value
  - Validation against total pages
  - Submit and cancel actions

---

## 📖 Usage Guide

### Adding Your First Book

1. Open `index.html` in your browser
2. Fill in all required fields:
   - Enter the book title
   - Enter the author name
   - Specify total number of pages
   - Set the price
   - Choose reading status from dropdown
   - Enter pages read so far
   - Select book format
   - (Optional) Add who suggested the book
3. The "Finished" status will update automatically
4. Click "Add Book"
5. You'll see a success message if the book was added

### Viewing Your Library

1. Open `dashboard.html` in your browser
2. The dashboard loads automatically with:
   - Current statistics at the top
   - All your books listed below
3. Each book shows:
   - Basic information (title, author, format)
   - Reading status badge
   - Progress bar showing completion percentage
   - Price and finished status

### Updating Reading Progress

1. In the dashboard, find the book you want to update
2. Click the "Update Progress" button
3. A modal window appears
4. Enter the new number of pages read
5. Click "Update" to save
6. The progress bar and statistics update automatically

### Deleting a Book

1. In the dashboard, find the book to delete
2. Click the "Delete" button
3. Confirm the deletion in the popup
4. The book is removed and statistics update

---

## 👤 Author

**majidi**

---

## 📝 Notes

- Make sure the backend server is running before using the frontend
- All data is stored in MongoDB database
- The application uses CORS to allow frontend-backend communication
- Statistics are calculated in real-time from the database
- The `finished` status is automatically managed by the application