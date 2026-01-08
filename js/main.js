// Main JavaScript for general site functionality

// Mobile menu toggle
function toggleMobileMenu() {
    // This would be implemented for a mobile menu dropdown
    console.log('Mobile menu toggled');
}

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal anchors
            if (href !== '#' && href.startsWith('#')) {
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Add fade-in animation to elements as they scroll into view
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

    // Observe elements with fade-in class
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add animation to cards on hover
document.addEventListener('DOMContentLoaded', function() {
    const hoverCards = document.querySelectorAll('.hover-scale, .card-hover');
    
    hoverCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
});

// Notification system (placeholder)
function showNotification(message, type = 'info') {
    // This would show a toast notification
    console.log(`${type}: ${message}`);
}

// Save to dashboard functionality (placeholder)
function saveToProfile(item) {
    showNotification('Saved to your profile!', 'success');
    console.log('Saved:', item);
}

// Share functionality (placeholder)
function shareContent(content) {
    if (navigator.share) {
        navigator.share({
            title: 'Aptiva',
            text: content,
            url: window.location.href
        }).catch(err => console.log('Error sharing:', err));
    } else {
        // Fallback - copy to clipboard
        navigator.clipboard.writeText(window.location.href);
        showNotification('Link copied to clipboard!', 'success');
    }
}

// Form validation helper
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('border-red-500');
        } else {
            input.classList.remove('border-red-500');
        }
    });
    
    return isValid;
}

// Loading state helper
function setLoadingState(element, isLoading) {
    if (isLoading) {
        element.disabled = true;
        element.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Loading...';
    } else {
        element.disabled = false;
    }
}

// Initialize tooltips (if needed)
document.addEventListener('DOMContentLoaded', function() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltipText = this.getAttribute('data-tooltip');
            // Create and show tooltip
            console.log('Tooltip:', tooltipText);
        });
    });
});

// Local storage helpers
const Storage = {
    set: function(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Storage error:', e);
            return false;
        }
    },
    
    get: function(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error('Storage error:', e);
            return null;
        }
    },
    
    remove: function(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('Storage error:', e);
            return false;
        }
    }
};

// Save quiz results to local storage
function saveQuizResults(results) {
    Storage.set('quizResults', {
        ...results,
        timestamp: new Date().toISOString()
    });
}

// Get saved quiz results
function getQuizResults() {
    return Storage.get('quizResults');
}

// Track user interactions (analytics placeholder)
function trackEvent(category, action, label) {
    console.log('Event tracked:', { category, action, label });
    // This would integrate with analytics service
}

// Page load animations
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        toggleMobileMenu,
        showNotification,
        saveToProfile,
        shareContent,
        validateForm,
        setLoadingState,
        Storage,
        trackEvent
    };
}
