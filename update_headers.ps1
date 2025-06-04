$htmlFiles = Get-ChildItem -Path "*.html" -File

$header = @"
  <header id="header" class="header d-flex align-items-center sticky-top">
    <div class="container position-relative d-flex align-items-center justify-content-between flex-row flex-nowrap w-100">
      <a href="index.html" class="logo d-flex align-items-center justify-content-start me-auto" style="min-width:0;">
        <img src="assets/img/logo.png" alt="MinwaJayne Foundation Logo" class="header-logo-img" />
        <h1 class="sitename mb-0 ms-2">MINWAJAYNE FOUNDATION BY LKA</h1>
      </a>
      <div class="header-social-links d-flex align-items-center mx-2 order-2 order-md-3">
        <a href="#" class="twitter"><i class="bi bi-twitter-x"></i></a>
        <a href="#" class="facebook"><i class="bi bi-facebook"></i></a>
        <a href="#" class="instagram"><i class="bi bi-instagram"></i></a>
      </div>
      <nav id="navmenu" class="navmenu order-3 order-md-2">
        <ul>
          <li><a href="#hero">Home</a></li>
          <li class="dropdown"><a href="about.html"><span>About</span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>
            <ul>
              <li><a href="team.html">Meet the Founder</a></li>
              <li><a href="testimonials.html">Program Highlights</a></li>
              <li><a href="services.html">Our Programs</a></li>
              <li><a href="contact.html">Contact Us</a></li>
            </ul>
          </li>
          <li><a href="services.html">Services</a></li>
          <li><a href="portfolio.html">Portfolio</a></li>
          <li><a href="pricing.html">Pricing</a></li>
          <li><a href="blog.html">Blog</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </nav>
      <div class="d-flex align-items-center order-4 order-md-4">
        <i class="mobile-nav-toggle d-xl-none bi bi-list ms-2"></i>
      </div>
    </div>
  </header>
"@

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw
    
    # Replace the header section
    $newContent = $content -replace '(?s)<header.*?</header>', $header
    
    # Save the updated content
    Set-Content -Path $file.FullName -Value $newContent
    
    Write-Host "Updated header in $($file.Name)"
}
