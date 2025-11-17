// Status and Format enums for JavaScript
const StatusEnum = {
    Read: 'Read',
    ReRead: 'Re-read',
    DNF: 'DNF',
    CurrentlyReading: 'Currently reading',
    ReturnedUnread: 'Returned Unread',
    WantToRead: 'Want to read'
};

const FormatEnum = {
    Print: 'Print',
    PDF: 'PDF',
    Ebook: 'Ebook',
    AudioBook: 'AudioBook'
};

export default class Book {
    constructor(
        title,
        author,
        pages,
        status,
        price,
        pagesRead,
        format,
        suggestedBy = ''
    ) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
        this.price = price;
        this.pagesRead = pagesRead;
        this.format = format;
        this.suggestedBy = suggestedBy;
        this.finished = pagesRead >= pages;
    }

    /**
     * Returns the current reading progress as a percentage
     */
    currentlyAt() {
        return Math.round((this.pagesRead / this.pages) * 100);
    }

    /**
     * Deletes the book from the backend
     */
    async deleteBook() {
        try {
            const response = await fetch(`http://localhost:3000/api/books/${this.id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error deleting book:', error);
            return false;
        }
    }

    /**
     * Updates the pages read and recalculates finished status
     */
    updateProgress(pagesRead) {
        if (pagesRead > this.pages) {
            throw new Error('Pages read cannot exceed total pages');
        }

        this.pagesRead = pagesRead;
        this.finished = pagesRead >= this.pages;
    }
}

// Export enums for use in other files
export { StatusEnum, FormatEnum };
