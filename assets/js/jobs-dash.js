// Jobs Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Get the job filter dropdown and all job cards
  const jobFilter = document.getElementById('jobFilter');
  const jobCards = document.querySelectorAll('.job-card');
  
  // Add event listener to the filter dropdown
  if (jobFilter) {
    jobFilter.addEventListener('change', function() {
      const selectedCategory = this.value;
      
      // Loop through all job cards
      jobCards.forEach(card => {
        if (selectedCategory === 'all') {
          // Show all cards if 'all' is selected
          card.style.display = 'block';
        } else {
          // Show/hide cards based on their category
          if (card.dataset.category === selectedCategory) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        }
      });
    });
  }
  
  // Add hover effects to job cards
  jobCards.forEach(card => {
    // Add hover effect
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
      this.style.boxShadow = 'var(--shadow-lg)';
      this.style.borderColor = 'var(--color-primary)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = 'var(--shadow)';
      this.style.borderColor = 'var(--color-border)';
    });

    // Prevent card click when clicking buttons
    const buttons = card.querySelectorAll('button');
    buttons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.stopPropagation();
      });
    });
  });
  
  // Add click handlers for view and apply buttons
  const viewButtons = document.querySelectorAll('.btn-view');
  const applyButtons = document.querySelectorAll('.btn-apply');
  
  viewButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.stopPropagation();
      const jobId = this.getAttribute('data-job-id');
      if (jobId) {
        window.location.href = `./job-details.html?job=${jobId}`;
      }
    });
  });
  
  applyButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.stopPropagation();
      const jobId = this.getAttribute('data-job-id');
      if (jobId) {
        window.location.href = `./job-apply.html?job=${jobId}`;
      }
    });
  });
  
  // Add click handler for job cards to view details
  jobCards.forEach(card => {
    card.addEventListener('click', function(e) {
      // Don't navigate if clicking on buttons
      if (e.target.closest('.job-actions')) {
        return;
      }
      
      const jobId = this.getAttribute('data-job-id');
      if (jobId) {
        window.location.href = `./job-details.html?job=${jobId}`;
      }
    });
  });
  
  // Add CSS animation for fade-in effect
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .job-card {
      animation: fadeIn 0.5s ease-out forwards;
    }
    
    .job-card:nth-child(2) { animation-delay: 0.1s; }
    .job-card:nth-child(3) { animation-delay: 0.2s; }
    .job-card:nth-child(4) { animation-delay: 0.3s; }
    .job-card:nth-child(5) { animation-delay: 0.4s; }
    .job-card:nth-child(6) { animation-delay: 0.5s; }
    .job-card:nth-child(7) { animation-delay: 0.6s; }
    .job-card:nth-child(8) { animation-delay: 0.7s; }
    .job-card:nth-child(9) { animation-delay: 0.8s; }
  `;
  document.head.appendChild(style);
}); 