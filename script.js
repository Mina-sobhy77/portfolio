document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       Theme Toggle (Dark/Light Mode)
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    const htmlElement = document.documentElement;
    
    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }
    
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        if (theme === 'light') {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }

    /* ==========================================================================
       Mobile Navigation Menu
       ========================================================================== */
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');
    
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close mobile menu when a link is clicked
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    /* ==========================================================================
       Scroll Reveal Animations
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const revealObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        });
    }, revealOptions);
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    /* ==========================================================================
       Active Navigation State on Scroll
       ========================================================================== */
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollY = window.scrollY;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100; // Offset for fixed header
            const sectionId = current.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.nav-links a[href*=' + sectionId + ']').classList.add('active');
            } else {
                const link = document.querySelector('.nav-links a[href*=' + sectionId + ']');
                if(link) {
                    link.classList.remove('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);

    /* ==========================================================================
       Back to Top Button Visibility
       ========================================================================== */
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    /* ==========================================================================
       Form Submission Prevention (Placeholder)
       ========================================================================== */
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Just a visual feedback since there's no backend
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = 'Message Sent! <i class="fas fa-check"></i>';
            submitBtn.style.backgroundColor = '#10b981'; // Green color
            submitBtn.style.borderColor = '#10b981';
            
            contactForm.reset();
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.backgroundColor = '';
                submitBtn.style.borderColor = '';
            }, 3000);
        });
    }
});
