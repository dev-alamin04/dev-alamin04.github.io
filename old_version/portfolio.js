// DOM Elements
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const navLinks = document.querySelectorAll('.nav-link');
const menuToggle = document.querySelector('.menu-toggle');
const hamburger = document.querySelector('.hamburger');
const navLinksContainer = document.querySelector('.nav-links');
const backToTop = document.querySelector('.back-to-top');
const skillItems = document.querySelectorAll('.skill-item');
const projectCards = document.querySelectorAll('.project-card');
const contactForm = document.getElementById('contactForm');
const submitBtn = document.querySelector('.btn-submit');
const filterBtns = document.querySelectorAll('.filter-btn');
const statNumbers = document.querySelectorAll('.stat-number');
const letters = document.querySelectorAll('.letter');
const formGroups = document.querySelectorAll('.form-group');

// Custom Cursor
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

// Cursor effects on hover
const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-item, .info-card');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
        cursorFollower.style.transform = 'scale(1.5)';
        cursor.style.backgroundColor = 'var(--primary)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
        cursor.style.backgroundColor = 'var(--primary)';
    });
});

// Particle Background
if (document.getElementById('particles-js')) {
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#6366f1" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#6366f1",
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" }
            }
        }
    });
}

// Typing Animation
const typingWords = [
    'Jr. Laravel Developer',
    'Backend Specialist',
    'API Developer',
    'Problem Solver',
    'Database Planner'
];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isEnd = false;

function typeEffect() {
    const currentWord = typingWords[wordIndex];
    const typingElement = document.querySelector('.typing-text');
    
    if (!typingElement) return;
    
    if (isDeleting) {
        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentWord.length) {
        isEnd = true;
        isDeleting = true;
        setTimeout(typeEffect, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        isEnd = false;
        wordIndex = (wordIndex + 1) % typingWords.length;
        setTimeout(typeEffect, 500);
    } else {
        const typingSpeed = isDeleting ? 50 : 100;
        setTimeout(typeEffect, typingSpeed);
    }
}

// Letter Animation
letters.forEach(letter => {
    letter.style.animationDelay = `calc(${letter.style.getPropertyValue('--i')} * 0.1s)`;
});

// Smooth Scrolling
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (!targetSection) return;
        
        // Close mobile menu
        navLinksContainer.classList.remove('active');
        hamburger.classList.remove('active');
        
        // Smooth scroll
        window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
        });
        
        // Update active link
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        link.classList.add('active');
    });
});

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navLinksContainer.contains(e.target)) {
        navLinksContainer.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Back to Top Button
window.addEventListener('scroll', () => {
    // Show/hide back to top
    if (window.scrollY > 500) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
    
    // Update active nav link
    const sections = document.querySelectorAll('section');
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
    
    // Animate skill bars on scroll
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const skillsSectionTop = skillsSection.offsetTop;
        const skillsSectionHeight = skillsSection.clientHeight;
        
        if (window.scrollY >= skillsSectionTop - 500 && 
            window.scrollY <= skillsSectionTop + skillsSectionHeight) {
            animateSkillBars();
        }
    }
    
    // Animate stats
    const heroSection = document.querySelector('.hero');
    if (window.scrollY < heroSection.clientHeight) {
        animateStats();
    }
});

// Animate Skill Bars
function animateSkillBars() {
    skillItems.forEach(item => {
        const progressBar = item.querySelector('.skill-progress');
        const percentElement = item.querySelector('.skill-percent');
        const percent = item.getAttribute('data-level');
        
        if (!progressBar.style.width || progressBar.style.width === '0%') {
            progressBar.style.width = percent + '%';
            
            // Animate percentage count
            let currentPercent = 0;
            const interval = setInterval(() => {
                currentPercent++;
                percentElement.textContent = currentPercent + '%';
                
                if (currentPercent >= percent) {
                    clearInterval(interval);
                }
            }, 2000 / percent);
        }
    });
}

// Animate Stats
function animateStats() {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        
        let current = 0;
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current);
        }, 16);
    });
}

// Projects Filter
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Form Validation and Submission
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');
        const btnIcon = submitBtn.querySelector('.fa-paper-plane');
        
        // Show loading state
        btnText.style.opacity = '0';
        btnLoader.style.opacity = '1';
        btnIcon.style.opacity = '0';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <span>Message sent successfully! I'll get back to you soon.</span>
            `;
            successMessage.style.cssText = `
                position: fixed;
                top: 100px;
                right: 30px;
                background: var(--gradient);
                color: white;
                padding: 1rem 2rem;
                border-radius: var(--border-radius);
                display: flex;
                align-items: center;
                gap: 10px;
                box-shadow: var(--shadow-lg);
                z-index: 10000;
                animation: slideIn 0.5s ease;
            `;
            
            document.body.appendChild(successMessage);
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.style.animation = 'slideOut 0.5s ease';
                setTimeout(() => successMessage.remove(), 500);
            }, 5000);
            
            // Reset form
            contactForm.reset();
            
            // Reset button state
            btnText.style.opacity = '1';
            btnLoader.style.opacity = '0';
            btnIcon.style.opacity = '1';
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Form Input Effects
formGroups.forEach(group => {
    const input = group.querySelector('input, textarea');
    const label = group.querySelector('label');
    
    input.addEventListener('focus', () => {
        label.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            label.classList.remove('focused');
        }
    });
    
    // Check initial value
    if (input.value) {
        label.classList.add('focused');
    }
});

// Project Card 3D Effect
projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateY = (x - centerX) / 25;
        const rotateX = (centerY - y) / 25;
        
        card.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateZ(10px)
        `;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    // Start typing animation
    setTimeout(typeEffect, 1000);
    
    // Start stats animation
    animateStats();
    
    // Add hover effect to social icons
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'translateY(-5px) scale(1.1)';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (hero && heroContent && heroImage) {
        heroContent.style.transform = `translateY(${scrolled * 0.1}px)`;
        heroImage.style.transform = `translateY(${scrolled * 0.05}px)`;
    }
});

// Initialize AOS-like animations
function initScrollAnimations() {
    const elements = document.querySelectorAll('.skill-category, .project-card, .timeline-content, .info-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(el => observer.observe(el));
}

 document.getElementById("year").textContent = new Date().getFullYear();
// Start scroll animations
initScrollAnimations();