// Image Optimization Script
function optimizeImages() {
    // Add lazy loading to all images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Add loading="lazy" attribute for lazy loading
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }

        // Add alt text if missing
        if (!img.alt) {
            // Try to generate alt text from filename or parent element
            let altText = img.src.split('/').pop().split('.')[0];
            altText = altText.replace(/-/g, ' ').replace(/_/g, ' ');
            
            // If image is in a figure with a caption, use that as alt text
            const figure = img.closest('figure');
            if (figure && figure.querySelector('figcaption')) {
                altText = figure.querySelector('figcaption').textContent;
            }
            
            img.alt = altText;
        }

        // Add width and height attributes if missing
        if (!img.width && !img.height) {
            const naturalWidth = img.naturalWidth || 800;
            const naturalHeight = img.naturalHeight || 600;
            img.width = naturalWidth;
            img.height = naturalHeight;
        }
    });

    // Optimize hero carousel images
    const carouselImages = document.querySelectorAll('.hero-carousel img');
    carouselImages.forEach(img => {
        // Add responsive sizes
        img.sizes = '(max-width: 768px) 100vw, 768px';
        
        // Add webp support
        if (img.src.endsWith('.jpg') || img.src.endsWith('.jpeg')) {
            const webpSrc = img.src.replace(/\.(jpg|jpeg)$/, '.webp');
            if (supportsWebP()) {
                img.src = webpSrc;
            }
        }
    });
}

// Check for WebP support
function supportsWebP() {
    return document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0;
}

// Run optimization when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    optimizeImages();
});
