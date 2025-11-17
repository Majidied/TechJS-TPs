// Dashboard functionality
document.addEventListener('DOMContentLoaded', () => {
    const booksContainer = document.getElementById('booksContainer');
    const totalFinished = document.getElementById('totalFinished');
    const totalPagesRead = document.getElementById('totalPagesRead');
    const totalBooks = document.getElementById('totalBooks');
    const updateModal = document.getElementById('updateModal');
    const updateForm = document.getElementById('updateForm');
    const updatePagesRead = document.getElementById('updatePagesRead');
    const updatePagesError = document.getElementById('updatePagesError');
    const cancelUpdate = document.getElementById('cancelUpdate');

    let currentBookId = null;
    let currentBookPages = 0;

    // Load books and statistics
    async function loadDashboard() {
        try {
            // Load books
            const booksResponse = await fetch('http://localhost:3000/api/books');
            const books = await booksResponse.json();

            // Load statistics
            const statsResponse = await fetch('http://localhost:3000/api/books/stats');
            const stats = await statsResponse.json();

            // Update statistics
            totalFinished.textContent = stats.totalBooksFinished;
            totalPagesRead.textContent = stats.totalPagesRead;
            totalBooks.textContent = stats.totalBooks;

            // Display books
            displayBooks(books);

        } catch (error) {
            console.error('Error loading dashboard:', error);
            booksContainer.innerHTML = `
                <div class="text-center py-8">
                    <p class="text-red-600 mb-4">Error loading books. Please check if the server is running.</p>
                    <button onclick="loadDashboard()" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                        Try Again
                    </button>
                </div>
            `;
        }
    }

    // Display books in cards
    function displayBooks(books) {
        if (books.length === 0) {
            booksContainer.innerHTML = `
                <div class="text-center py-8">
                    <p class="text-gray-500 mb-4">No books yet. Start by adding your first book!</p>
                    <a href="index.html" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                        Add New Book
                    </a>
                </div>
            `;
            return;
        }

        const booksHTML = books.map(book => {
            const progress = Math.round((book.pagesRead / book.pages) * 100);
            const statusColor = getStatusColor(book.status);
            const formatIcon = getFormatIcon(book.format);

            return `
                <div class="bg-gray-50 rounded-lg p-6 mb-4 border border-gray-200">
                    <div class="flex justify-between items-start mb-4">
                        <div class="flex-1">
                            <h3 class="text-xl font-semibold text-gray-900 mb-1">${book.title}</h3>
                            <p class="text-gray-600 mb-2">by ${book.author}</p>
                            <div class="flex items-center space-x-4 text-sm text-gray-500">
                                <span class="flex items-center">
                                    ${formatIcon}
                                    <span class="ml-1">${book.format}</span>
                                </span>
                                <span class="px-2 py-1 rounded-full text-xs font-medium ${statusColor}">
                                    ${book.status}
                                </span>
                                ${book.suggestedBy ? `<span>Suggested by: ${book.suggestedBy}</span>` : ''}
                            </div>
                        </div>
                        <div class="flex space-x-2">
                            <button onclick="openUpdateModal('${book._id}', ${book.pagesRead}, ${book.pages})"
                                    class="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600 transition duration-200">
                                Update Progress
                            </button>
                            <button onclick="deleteBook('${book._id}')"
                                    class="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition duration-200">
                                Delete
                            </button>
                        </div>
                    </div>

                    <div class="mb-4">
                        <div class="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Progress: ${book.pagesRead} / ${book.pages} pages</span>
                            <span>${progress}%</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2">
                            <div class="bg-blue-600 h-2 rounded-full transition-all duration-300" style="width: ${progress}%"></div>
                        </div>
                    </div>

                    <div class="flex items-center justify-between">
                        <div class="text-sm text-gray-600">
                            <span class="font-medium">Price:</span> $${book.price}
                        </div>
                        <div class="flex items-center">
                            <span class="text-sm text-gray-600 mr-2">Finished:</span>
                            <span class="px-2 py-1 rounded-full text-xs font-medium ${book.finished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
                                ${book.finished ? 'Yes' : 'No'}
                            </span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        booksContainer.innerHTML = booksHTML;
    }

    // Get status color classes
    function getStatusColor(status) {
        const colors = {
            'Read': 'bg-green-100 text-green-800',
            'Re-read': 'bg-blue-100 text-blue-800',
            'DNF': 'bg-red-100 text-red-800',
            'Currently reading': 'bg-yellow-100 text-yellow-800',
            'Returned Unread': 'bg-gray-100 text-gray-800',
            'Want to read': 'bg-purple-100 text-purple-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    }

    // Get format icon
    function getFormatIcon(format) {
        const icons = {
            'Print': '📖',
            'PDF': '📄',
            'Ebook': '📱',
            'AudioBook': '🎧'
        };
        return icons[format] || '📚';
    }

    // Open update modal
    window.openUpdateModal = function(bookId, currentPagesRead, totalPages) {
        currentBookId = bookId;
        currentBookPages = totalPages;
        updatePagesRead.value = currentPagesRead;
        updateModal.classList.remove('hidden');
        updatePagesError.classList.add('hidden');
    };

    // Close update modal
    cancelUpdate.addEventListener('click', () => {
        updateModal.classList.add('hidden');
        currentBookId = null;
    });

    // Handle update form submission
    updateForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const pagesRead = parseInt(updatePagesRead.value);

        if (pagesRead > currentBookPages) {
            updatePagesError.classList.remove('hidden');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/books/${currentBookId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ pagesRead })
            });

            if (response.ok) {
                updateModal.classList.add('hidden');
                loadDashboard(); // Refresh the dashboard
            } else {
                const error = await response.json();
                alert('Error updating book: ' + error.message);
            }
        } catch (error) {
            console.error('Error updating book:', error);
            alert('Network error. Please try again.');
        }
    });

    // Delete book
    window.deleteBook = async function(bookId) {
        if (!confirm('Are you sure you want to delete this book?')) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/books/${bookId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                loadDashboard(); // Refresh the dashboard
            } else {
                alert('Error deleting book');
            }
        } catch (error) {
            console.error('Error deleting book:', error);
            alert('Network error. Please try again.');
        }
    };

    // Initial load
    loadDashboard();
});
