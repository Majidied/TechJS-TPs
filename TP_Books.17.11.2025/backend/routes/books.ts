import { Router, Request, Response } from 'express';
import Book, { BookDocument } from '../models/book';

const router = Router();

/**
 * GET /api/books - Retrieve all books from the library
 * 
 * This endpoint fetches all books stored in the database and returns them
 * sorted by creation date in descending order (newest books first).
 * 
 * @route GET /api/books
 * @returns {Array<Book>} Array of book objects with all properties
 * @throws {500} Internal server error if database query fails
 */
router.get('/', async (req: Request, res: Response) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching books', error });
    }
});

/**
 * GET /api/books/stats - Calculate and return reading statistics
 * 
 * This endpoint aggregates data across all books to provide insights into
 * reading habits and progress. It calculates:
 * - Total number of finished books (where finished = true)
 * - Total pages read across all books
 * - Total number of books in the library
 * 
 * @route GET /api/books/stats
 * @returns {Object} Statistics object containing totalBooksFinished, totalPagesRead, and totalBooks
 * @throws {500} Internal server error if database query fails
 */
router.get('/stats', async (req: Request, res: Response) => {
    try {
        const books = await Book.find();

        const totalBooksFinished = books.filter(book => book.finished).length;
        const totalPagesRead = books.reduce((sum, book) => sum + book.pagesRead, 0);

        res.json({
            totalBooksFinished,
            totalPagesRead,
            totalBooks: books.length
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching statistics', error });
    }
});

/**
 * POST /api/books - Add a new book to the library
 * 
 * This endpoint creates a new book entry in the database with the provided details.
 * It performs validation to ensure data integrity and automatically sets the 'finished'
 * flag based on reading progress.
 * 
 * Validation Rules:
 * - pagesRead must not exceed total pages
 * - All required fields must be provided (title, author, pages, status, price, pagesRead, format)
 * - finished flag is automatically set to true if pagesRead >= pages
 * 
 * @route POST /api/books
 * @param {Object} req.body - Book data object
 * @param {string} req.body.title - The title of the book
 * @param {string} req.body.author - The author of the book
 * @param {number} req.body.pages - Total number of pages in the book
 * @param {StatusEnum} req.body.status - Current reading status
 * @param {number} req.body.price - Price of the book
 * @param {number} req.body.pagesRead - Number of pages read so far
 * @param {FormatEnum} req.body.format - Format of the book (Print, PDF, Ebook, AudioBook)
 * @param {string} [req.body.suggestedBy] - Person or source that suggested the book (optional)
 * @returns {Object} The newly created book object with MongoDB _id
 * @throws {400} Bad request if validation fails or pagesRead exceeds pages
 * @throws {500} Internal server error if database operation fails
 */
router.post('/', async (req: Request, res: Response) => {
    try {
        const { title, author, pages, status, price, pagesRead, format, suggestedBy } = req.body;

        // Validation: Ensure pages read doesn't exceed total pages
        if (pagesRead > pages) {
            return res.status(400).json({ message: 'Pages read cannot exceed total pages' });
        }

        // Create new book instance with automatic finished calculation
        const book = new Book({
            title,
            author,
            pages,
            status,
            price,
            pagesRead,
            format,
            suggestedBy,
            finished: pagesRead >= pages
        });

        const savedBook = await book.save();
        res.status(201).json(savedBook);
    } catch (error) {
        res.status(400).json({ message: 'Error creating book', error });
    }
});

/**
 * PUT /api/books/:id - Update book reading progress
 * 
 * This endpoint updates the reading progress for a specific book, primarily
 * used to track how many pages have been read. The 'finished' status is
 * automatically recalculated when pages read is updated.
 * 
 * Use Cases:
 * - User finishes reading more pages and wants to update progress
 * - Correcting accidentally logged progress
 * 
 * @route PUT /api/books/:id
 * @param {string} req.params.id - MongoDB ObjectId of the book to update
 * @param {Object} req.body - Update data object
 * @param {number} [req.body.pagesRead] - New pages read value
 * @returns {Object} The updated book object with new pagesRead and finished status
 * @throws {400} Bad request if pagesRead exceeds total pages
 * @throws {404} Not found if book with specified ID doesn't exist
 * @throws {500} Internal server error if database operation fails
 */
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { pagesRead } = req.body;
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        if (pagesRead !== undefined) {
            // Validate that pages read doesn't exceed total pages
            if (pagesRead > book.pages) {
                return res.status(400).json({ message: 'Pages read cannot exceed total pages' });
            }
            book.pagesRead = pagesRead;
            // Automatically update finished status
            book.finished = pagesRead >= book.pages;
        }

        const updatedBook = await book.save();
        res.json(updatedBook);
    } catch (error) {
        res.status(400).json({ message: 'Error updating book', error });
    }
});

/**
 * DELETE /api/books/:id - Remove a book from the library
 * 
 * This endpoint permanently deletes a book from the database. This action
 * cannot be undone. Use with caution.
 * 
 * Use Cases:
 * - User added a book by mistake
 * - Removing duplicate entries
 * - Cleaning up unwanted books from the library
 * 
 * @route DELETE /api/books/:id
 * @param {string} req.params.id - MongoDB ObjectId of the book to delete
 * @returns {Object} Success message confirming deletion
 * @throws {404} Not found if book with specified ID doesn't exist
 * @throws {500} Internal server error if database operation fails
 */
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);

        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting book', error });
    }
});

export default router;

