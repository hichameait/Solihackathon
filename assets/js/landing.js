document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle) {
      mobileMenuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        document.body.classList.toggle('menu-open');
      });
    }
    
    // Accordion functionality
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
      const header = item.querySelector('.accordion-header');
      
      header.addEventListener('click', () => {
        // Close all other accordion items
        accordionItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
          }
        });
        
        // Toggle current accordion item
        item.classList.toggle('active');
      });
    });
    
    // Play button for video
    const playButton = document.querySelector('.play-button');
    const videoWrapper = document.querySelector('.video-wrapper');
    
    if (playButton && videoWrapper) {
      playButton.addEventListener('click', function() {
        // This would normally create and play a video
        // For this example, we'll just show an alert
        alert('Video would play here in a real implementation');
        
        // In a real implementation, you might do something like:
        // const videoThumbnail = videoWrapper.querySelector('img');
        // const video = document.createElement('video');
        // video.src = 'path/to/video.mp4';
        // video.controls = true;
        // video.autoplay = true;
        // videoWrapper.replaceChild(video, videoThumbnail);
        // playButton.style.display = 'none';
      });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Offset for header
            behavior: 'smooth'
          });
          
          // Close mobile menu if open
          if (mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            document.body.classList.remove('menu-open');
          }
        }
      });
    });
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const formValues = Object.fromEntries(formData.entries());
        
        // In a real implementation, you would send this data to your server
        console.log('Form submitted with values:', formValues);
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        contactForm.reset();
      });
    }
    
    // Add active class to current section in navigation
    const sections = document.querySelectorAll('section[id]');
    
    function highlightCurrentSection() {
      const scrollPosition = window.scrollY;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          document.querySelector(`.main-nav a[href="#${sectionId}"]`)?.classList.add('active');
        } else {
          document.querySelector(`.main-nav a[href="#${sectionId}"]`)?.classList.remove('active');
        }
      });
    }
    
    window.addEventListener('scroll', highlightCurrentSection);
    
    // Initialize page
    highlightCurrentSection();
    
    // Add CSS for active nav links
    const style = document.createElement('style');
    style.textContent = `
      .main-nav a.active {
        color: var(--color-primary);
      }
      
      .main-nav.active {
        display: flex;
        position: absolute;
        top: 4rem;
        left: 0;
        right: 0;
        background-color: var(--color-background);
        padding: 1rem;
        flex-direction: column;
        border-bottom: 1px solid var(--color-border);
      }
      
      @media (max-width: 767px) {
        body.menu-open {
          overflow: hidden;
        }
      }
    `;
    document.head.appendChild(style);
  });