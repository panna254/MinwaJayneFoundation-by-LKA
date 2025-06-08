// Page Speed Optimization Script

// Function to load CSS asynchronously
function loadCSS(href) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.type = 'text/css';
    link.media = 'none';
    link.onload = () => {
        link.media = 'all';
    };
    document.head.appendChild(link);
}

// Function to defer loading of non-critical CSS
function deferCSS() {
    const criticalCSS = [
        'assets/vendor/bootstrap/css/bootstrap.min.css',
        'assets/css/image-optimization.css'
    ];

    const nonCriticalCSS = [
        'assets/vendor/aos/aos.css',
        'assets/vendor/glightbox/css/glightbox.min.css',
        'assets/vendor/swiper/swiper-bundle.min.css',
        'assets/css/main.css'
    ];

    // Load critical CSS immediately
    criticalCSS.forEach(css => {
        loadCSS(css);
    });

    // Load non-critical CSS after page load
    window.addEventListener('load', () => {
        nonCriticalCSS.forEach(css => {
            loadCSS(css);
        });
    });
}

// Function to optimize JavaScript loading
function optimizeJS() {
    const scripts = [
        'assets/vendor/bootstrap/js/bootstrap.bundle.min.js',
        'assets/vendor/aos/aos.js',
        'assets/vendor/glightbox/js/glightbox.min.js',
        'assets/vendor/isotope-layout/isotope.pkgd.min.js',
        'assets/vendor/waypoints/noframework.waypoints.js',
        'assets/vendor/swiper/swiper-bundle.min.js',
        'assets/js/canonical.js',
        'assets/js/image-optimizer.js'
    ];

    // Add async attribute to all scripts
    scripts.forEach(script => {
        const scriptElement = document.createElement('script');
        scriptElement.src = script;
        scriptElement.async = true;
        document.body.appendChild(scriptElement);
    });
}

// Function to implement lazy loading for non-critical assets
function lazyLoadAssets() {
    const lazyElements = document.querySelectorAll('img[loading="lazy"], iframe, video');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.src = entry.target.dataset.src;
                entry.target.removeAttribute('data-src');
                observer.unobserve(entry.target);
            }
        });
    });

    lazyElements.forEach(element => {
        if (!element.src && element.dataset.src) {
            observer.observe(element);
        }
    });
}

// Function to optimize images
function optimizeImages() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Add width and height attributes if missing
        if (!img.width && !img.height) {
            const naturalWidth = img.naturalWidth || 800;
            const naturalHeight = img.naturalHeight || 600;
            img.width = naturalWidth;
            img.height = naturalHeight;
        }

        // Add loading="lazy" if missing
        if (!img.loading) {
            img.loading = 'lazy';
        }
    });
}

// Initialize page speed optimizations
document.addEventListener('DOMContentLoaded', () => {
    deferCSS();
    optimizeJS();
    lazyLoadAssets();
    optimizeImages();
});
