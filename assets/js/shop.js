document.addEventListener("DOMContentLoaded", function() {
    const cardsPerPage = 10;  // Number of cards per page
    const cards = document.querySelectorAll('.card-1');  // Get all product cards
    const paginationContainer = document.querySelector('.pagination');  // Pagination container
    const nextButton = document.querySelector('.next-button');  // Next button
    const prevButton = document.querySelector('button:not(.next-button)');  // Previous button
    let currentPage = 1;  // Start with the first page

    const totalPages = Math.ceil(cards.length / cardsPerPage);  // Total number of pages
    const pageNumbersContainer = paginationContainer.querySelector('.page-number');  // Page number elements

    // Function to render the current page of cards
    function renderPage(page) {
        // Hide all cards
        cards.forEach((card, index) => {
            card.style.display = 'none';
        });

        // Show cards for the current page
        const start = (page - 1) * cardsPerPage;
        const end = start + cardsPerPage;
        for (let i = start; i < end && i < cards.length; i++) {
            cards[i].style.display = 'block';
        }

        // Update page numbers and buttons
        updatePagination(page);
    }

    // Function to update pagination buttons and active page number
    function updatePagination(page) {
        // Update the active page number
        const pageNumbers = paginationContainer.querySelectorAll('.page-number');
        pageNumbers.forEach((pageNumber, index) => {
            if (index + 1 === page) {
                pageNumber.classList.add('active');
            } else {
                pageNumber.classList.remove('active');
            }
        });

        // Enable/Disable next and previous buttons based on current page
        prevButton.disabled = page === 1;
        nextButton.disabled = page === totalPages;
    }

    // Create page numbers dynamically
    function createPageNumbers() {
        // Clear existing page numbers
        paginationContainer.innerHTML = '';
        
        // Create page number buttons
        for (let i = 1; i <= totalPages; i++) {
            const pageNumber = document.createElement('div');
            pageNumber.classList.add('page-number');
            pageNumber.textContent = i;
            pageNumber.addEventListener('click', function() {
                currentPage = i;
                renderPage(currentPage);
            });
            paginationContainer.appendChild(pageNumber);
        }

        // Add next and previous buttons
        const prevButton = document.createElement('button');
        prevButton.textContent = 'Previous';
        prevButton.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                renderPage(currentPage);
            }
        });
        paginationContainer.appendChild(prevButton);

        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.addEventListener('click', function() {
            if (currentPage < totalPages) {
                currentPage++;
                renderPage(currentPage);
            }
        });
        paginationContainer.appendChild(nextButton);
    }

    // Initial page render
    createPageNumbers();
    renderPage(currentPage);
});
