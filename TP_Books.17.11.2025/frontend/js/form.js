// Form handling for the new book form
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('bookForm');
    const pagesInput = document.getElementById('pages');
    const pagesReadInput = document.getElementById('pagesRead');
    const finishedStatus = document.getElementById('finishedStatus');
    const pagesError = document.getElementById('pagesError');
    const submitBtn = document.getElementById('submitBtn');
    const messageDiv = document.getElementById('message');

    // Update finished status when pages read changes
    function updateFinishedStatus() {
        const pages = parseInt(pagesInput.value) || 0;
        const pagesRead = parseInt(pagesReadInput.value) || 0;

        if (pagesRead >= pages && pages > 0) {
            finishedStatus.textContent = 'Yes';
            finishedStatus.className = 'px-3 py-2 bg-green-100 border border-green-300 rounded-md text-green-700';
        } else {
            finishedStatus.textContent = 'No';
            finishedStatus.className = 'px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700';
        }
    }

    // Validate pages read doesn't exceed total pages
    function validatePages() {
        const pages = parseInt(pagesInput.value) || 0;
        const pagesRead = parseInt(pagesReadInput.value) || 0;

        if (pagesRead > pages && pages > 0) {
            pagesError.classList.remove('hidden');
            pagesReadInput.setCustomValidity('Pages read cannot exceed total pages');
            return false;
        } else {
            pagesError.classList.add('hidden');
            pagesReadInput.setCustomValidity('');
            return true;
        }
    }

    // Event listeners
    pagesInput.addEventListener('input', () => {
        updateFinishedStatus();
        validatePages();
    });

    pagesReadInput.addEventListener('input', () => {
        updateFinishedStatus();
        validatePages();
    });

    // Form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!validatePages()) {
            return;
        }

        // Disable submit button
        submitBtn.disabled = true;
        submitBtn.textContent = 'Adding Book...';

        // Collect form data
        const formData = new FormData(form);
        const bookData = {
            title: formData.get('title'),
            author: formData.get('author'),
            pages: parseInt(formData.get('pages')),
            status: formData.get('status'),
            price: parseFloat(formData.get('price')),
            pagesRead: parseInt(formData.get('pagesRead')),
            format: formData.get('format'),
            suggestedBy: formData.get('suggestedBy') || ''
        };

        try {
            const response = await fetch('http://localhost:3000/api/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookData)
            });

            const result = await response.json();

            if (response.ok) {
                // Success
                messageDiv.className = 'mt-4 p-4 rounded-md bg-green-100 border border-green-400 text-green-700';
                messageDiv.textContent = 'Book added successfully!';
                messageDiv.classList.remove('hidden');

                // Reset form
                form.reset();
                updateFinishedStatus();
            } else {
                // Error
                messageDiv.className = 'mt-4 p-4 rounded-md bg-red-100 border border-red-400 text-red-700';
                messageDiv.textContent = result.message || 'Error adding book';
                messageDiv.classList.remove('hidden');
            }
        } catch (error) {
            console.error('Error:', error);
            messageDiv.className = 'mt-4 p-4 rounded-md bg-red-100 border border-red-400 text-red-700';
            messageDiv.textContent = 'Network error. Please check if the server is running.';
            messageDiv.classList.remove('hidden');
        } finally {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Add Book';
        }
    });

    // Initialize finished status
    updateFinishedStatus();
});
