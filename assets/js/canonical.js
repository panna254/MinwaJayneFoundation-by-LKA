function addCanonicalURL() {
    const canonicalURL = document.createElement('link');
    canonicalURL.rel = 'canonical';
    
    // Get the current page URL without query parameters
    let currentPage = window.location.pathname;
    if (currentPage === '/') {
        currentPage = '/index.html';
    }
    
    // Add the base URL
    const baseURL = 'https://www.minwajaynefoundation.org';
    canonicalURL.href = baseURL + currentPage;
    
    // Add to head
    document.head.appendChild(canonicalURL);
}

// Run when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    addCanonicalURL();
});
