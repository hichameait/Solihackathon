// Add hover effects and interactive elements
document.querySelectorAll('.course-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
        card.style.transition = 'transform 0.3s ease';
        card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'none';
    });
    
    card.addEventListener('click', () => {
        // Simulate course selection
        console.log('Course selected:', card.querySelector('.course-title').textContent);
    });
});

// Navigation link hover effect
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.color = 'white';
        link.style.transition = 'color 0.2s ease';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.color = '';
    });
});


// filter 

// const filterSelect = document.getElementById('course-filter');
//     const courseCards = document.querySelectorAll('.course-card');

//     filterSelect.addEventListener('change', () => {
//         const selectedCategory = filterSelect.value;

//         courseCards.forEach(card => {
//             const category = card.getAttribute('data-category');
//             if (selectedCategory === 'all' || category === selectedCategory) {
//                 card.style.display = 'block';
//             } else {
//                 card.style.display = 'none';
//             }
//         });
//     });