// ========================================
// Portfolio Website JavaScript
// Jacob Jayen Pillai - Frontend Developer
// ========================================

// EmailJS Configuration - CONFIGURED ✅
const EMAILJS_SERVICE_ID = 'service_oq04ybe'; // Gmail Service
const EMAILJS_TEMPLATE_ID = 'template_73m38z2'; // Contact Us Template
const EMAILJS_PUBLIC_KEY = 'gJ-E18JRSDyKcCUpy'; // Public Key

// Initialize EmailJS using the public key - FIXED: Updated for EmailJS v3+ ✅
(function() {
    emailjs.init(EMAILJS_PUBLIC_KEY);
})();

// ========================================
// Navigation & Scroll Effects
// ========================================

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('mainNavbar');
    const scrollToTop = document.getElementById('scrollToTop');
    
    if (window.scrollY > 100) {
        navbar.classList.add('navbar-scrolled');
        if (scrollToTop) {
            scrollToTop.classList.add('show');
        }
    } else {
        navbar.classList.remove('navbar-scrolled');
        if (scrollToTop) {
            scrollToTop.classList.remove('show');
        }
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// Theme Toggle
// ========================================

const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
let isDarkMode = false;

if (themeToggle && themeIcon) {
    themeToggle.addEventListener('click', function() {
        isDarkMode = !isDarkMode;
        
        if (isDarkMode) {
            document.body.classList.add('dark-theme');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            document.body.classList.remove('dark-theme');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
        
        // Save theme preference
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });
    
    // Load saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        themeToggle.click();
    }
}

// ========================================
// Video Thumbnail Clicks
// ========================================

document.querySelectorAll('.video-card').forEach(card => {
    card.addEventListener('click', function() {
        const videoId = this.dataset.videoId;
        if (videoId) {
            window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
        }
    });
});

// ========================================
// Contact Form Handling
// ========================================

const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const btnText = document.getElementById('btnText');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        submitBtn.disabled = true;
        btnText.textContent = 'Sending...';
        submitBtn.classList.add('loading');
        
        // Get form data - FIXED: Match exact template variables from EmailJS dashboard
        const formData = {
            name: document.getElementById('name').value,        // {{name}} in template
            email: document.getElementById('email').value,      // {{email}} in template  
            title: document.getElementById('subject').value,    // {{title}} in template subject
            message: document.getElementById('message').value   // {{message}} in template
        };
        
        // Debug: Log what we're sending
        console.log('📧 EmailJS Debug Info:');
        console.log('Service ID:', EMAILJS_SERVICE_ID);
        console.log('Template ID:', EMAILJS_TEMPLATE_ID);
        console.log('Form Data:', formData);
        
        // Send email using EmailJS - ENHANCED ERROR HANDLING ✅
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formData)
            .then(function(response) {
                console.log('✅ EmailJS SUCCESS:', response.status, response.text);
                showFormStatus('success', 'Message sent successfully! I\'ll get back to you soon.');
                contactForm.reset();
            })
            .catch(function(error) {
                console.error('❌ EmailJS FAILED - Full Error Details:', error);
                console.error('Error Status:', error.status);
                console.error('Error Text:', error.text);
                
                // More specific error messages
                if (error.status === 400) {
                    showFormStatus('error', 'Configuration Error: Please check your EmailJS template variables.');
                } else if (error.status === 401) {
                    showFormStatus('error', 'Authentication Error: Please check your EmailJS credentials.');
                } else {
                    showFormStatus('error', 'Failed to send message. Please try again or contact me directly.');
                }
            })
            .finally(function() {
                // Reset button state - CONFIGURED ✅
                submitBtn.disabled = false;
                btnText.textContent = 'Send Message';
                submitBtn.classList.remove('loading');
            });
    });
}

function showFormStatus(type, message) {
    if (formStatus) {
        formStatus.innerHTML = `
            <div class="alert alert-${type === 'success' ? 'success' : 'danger'} alert-dismissible fade show" role="alert">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'} me-2"></i>
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            const alert = formStatus.querySelector('.alert');
            if (alert) {
                alert.classList.remove('show');
                setTimeout(() => {
                    alert.remove();
                }, 150);
            }
        }, 5000);
    }
}

// ========================================
// Scroll to Top Button
// ========================================

const scrollToTopBtn = document.getElementById('scrollToTop');
if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========================================
// Active Navigation Link
// ========================================

// Update active navigation link based on scroll position
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ========================================
// Animation on Scroll (Optional)
// ========================================

// Simple fade-in animation for elements as they come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements that should animate in
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ========================================
// Skills Progress Animation
// ========================================

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.progress-bar');
    
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = width;
            bar.style.transition = 'width 1.5s ease-in-out';
        }, 300);
    });
}

// Trigger skill bar animation when skills section comes into view
const skillsSection = document.getElementById('skills');
if (skillsSection) {
    const skillsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillsObserver.observe(skillsSection);
}

// ========================================
// Console Message (Easter Egg)
// ========================================

console.log(`
🚀 Jacob Jayen Pillai - Frontend Developer Portfolio
📧 Contact: jacobjayenpillai@gmail.com
🔗 LinkedIn: https://www.linkedin.com/in/jacob-jayen-pillai-130a6233b/
💻 GitHub: https://github.com/JacobPillai
🎥 YouTube: https://www.youtube.com/@jacobpillai

Thanks for checking out the console! 
Built with HTML, CSS, JavaScript, Bootstrap & EmailJS
`);

// ========================================
// Form Validation Enhancement
// ========================================

// Real-time form validation
function validateForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    
    if (name && email && subject && message) {
        [name, email, subject, message].forEach(field => {
            field.addEventListener('blur', function() {
                validateField(this);
            });
            
            field.addEventListener('input', function() {
                if (this.classList.contains('is-invalid')) {
                    validateField(this);
                }
            });
        });
    }
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    
    // Remove existing validation classes
    field.classList.remove('is-valid', 'is-invalid');
    
    // Validate based on field type
    switch(field.type) {
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(value);
            break;
        case 'text':
        case 'textarea':
            isValid = value.length >= 2;
            break;
        default:
            isValid = value.length > 0;
    }
    
    // Add appropriate validation class
    field.classList.add(isValid ? 'is-valid' : 'is-invalid');
    
    return isValid;
}

// Initialize form validation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    validateForm();
});

// ========================================
// Mobile Menu Enhancement
// ========================================

// Close mobile menu when clicking on a link
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', function() {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
        }
    });
});

// ========================================
// Performance Optimization
// ========================================

// Preload images for better performance
function preloadImages() {
    const imageUrls = [
        './image/jacob.jpg',
        'https://img.youtube.com/vi/ZIgk-ZD0mB0/maxresdefault.jpg',
        'https://img.youtube.com/vi/ibxrZUSMny4/maxresdefault.jpg',
        'https://img.youtube.com/vi/ygAJTwzMLAw/maxresdefault.jpg',
        'https://img.youtube.com/vi/gDOzmTmSBM8/maxresdefault.jpg',
        'https://img.youtube.com/vi/NMq1B9GY3ZM/maxresdefault.jpg'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Preload images after page load
window.addEventListener('load', preloadImages);
