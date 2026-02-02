document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Back to Top Button Logic
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 2. Smooth Scrolling for Sidebar Links
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 3. Simple fade-in animation on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target); // Stop watching once it's visible
        }
    });
}, observerOptions);

    const sections = document.querySelectorAll('.fade-in');
    sections.forEach(section => {
        // Initial state for JS animation
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });
});


// 4. Contact Email Reveal & Copy Logic
    const contactBtn = document.getElementById('contactBtn');
    const feedback = document.getElementById('copyFeedback');

    if (contactBtn) {
        contactBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Stop it from jumping to top or opening mail immediately
            
            const email = contactBtn.getAttribute('data-email');
            const btnText = contactBtn.querySelector('.btn-text');

            // Copy to clipboard
            navigator.clipboard.writeText(email).then(() => {
                // Change button look
                contactBtn.classList.add('revealed');
                btnText.textContent = email;
                
                // Show "Copied" feedback
                feedback.classList.add('visible');
                
                // Reset feedback message after 2 seconds
                setTimeout(() => {
                    feedback.classList.remove('visible');
                }, 2000);

                // Optional: Change href to mailto after reveal, 
                // so a second click opens the email app
                contactBtn.href = `mailto:${email}`;
            }).catch(err => {
                console.error('Failed to copy: ', err);
                // Fallback if clipboard fails
                contactBtn.href = `mailto:${email}`;
                window.location.href = `mailto:${email}`;
            });
        });
    }
