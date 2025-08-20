// Authentication JavaScript

// Password toggle functionality
document.querySelectorAll('.password-toggle').forEach(toggle => {
    toggle.addEventListener('click', function() {
        const input = this.previousElementSibling;
        const icon = this.querySelector('i');
        
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });
});

// Form validation functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

function validatePhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

function showFieldError(field, message) {
    const formGroup = field.closest('.form-group');
    formGroup.classList.add('error');
    
    // Remove existing error message
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    formGroup.appendChild(errorMessage);
}

function clearFieldError(field) {
    const formGroup = field.closest('.form-group');
    formGroup.classList.remove('error');
    
    const errorMessage = formGroup.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function showFieldSuccess(field) {
    const formGroup = field.closest('.form-group');
    formGroup.classList.add('success');
    formGroup.classList.remove('error');
    
    const errorMessage = formGroup.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// Real-time validation
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('blur', function() {
        validateField(this);
    });
    
    input.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            validateField(this);
        }
    });
});

function validateField(field) {
    const value = field.value.trim();
    
    switch (field.type) {
        case 'email':
            if (!value) {
                showFieldError(field, 'Email is required');
            } else if (!validateEmail(value)) {
                showFieldError(field, 'Please enter a valid email address');
            } else {
                showFieldSuccess(field);
            }
            break;
            
        case 'password':
            if (!value) {
                showFieldError(field, 'Password is required');
            } else if (!validatePassword(value)) {
                showFieldError(field, 'Password must be at least 8 characters with uppercase, lowercase, and number');
            } else {
                showFieldSuccess(field);
            }
            break;
            
        case 'tel':
            if (!value) {
                showFieldError(field, 'Phone number is required');
            } else if (!validatePhone(value)) {
                showFieldError(field, 'Please enter a valid phone number');
            } else {
                showFieldSuccess(field);
            }
            break;
            
        default:
            if (!value) {
                showFieldError(field, 'This field is required');
            } else {
                showFieldSuccess(field);
            }
    }
}

// Signup form handling
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        const fields = this.querySelectorAll('input[required]');
        let isValid = true;
        
        fields.forEach(field => {
            validateField(field);
            if (field.closest('.form-group').classList.contains('error')) {
                isValid = false;
            }
        });
        
        // Check password confirmation
        const password = this.querySelector('#password');
        const confirmPassword = this.querySelector('#confirmPassword');
        
        if (password.value !== confirmPassword.value) {
            showFieldError(confirmPassword, 'Passwords do not match');
            isValid = false;
        }
        
        // Check terms agreement
        const terms = this.querySelector('#terms');
        if (!terms.checked) {
            showNotification('Please agree to the Terms of Service and Privacy Policy', 'error');
            isValid = false;
        }
        
        if (isValid) {
            // Show loading state
            const submitBtn = this.querySelector('.auth-btn');
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                showNotification('Account created successfully! Redirecting to dashboard...', 'success');
                
                // Redirect to dashboard after 2 seconds
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 2000);
            }, 1500);
        }
    });
}

// Login form handling
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        const fields = this.querySelectorAll('input[required]');
        let isValid = true;
        
        fields.forEach(field => {
            validateField(field);
            if (field.closest('.form-group').classList.contains('error')) {
                isValid = false;
            }
        });
        
        if (isValid) {
            // Show loading state
            const submitBtn = this.querySelector('.auth-btn');
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                showNotification('Login successful! Redirecting to dashboard...', 'success');
                
                // Redirect to dashboard after 2 seconds
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 2000);
            }, 1500);
        }
    });
}

// Social authentication buttons
document.querySelectorAll('.btn-social').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const provider = this.classList.contains('btn-google') ? 'Google' : 'Microsoft';
        showNotification(`Connecting to ${provider}...`, 'info');
        
        // Simulate social auth
        setTimeout(() => {
            showNotification(`Successfully connected with ${provider}!`, 'success');
        }, 2000);
    });
});

// Forgot password functionality
const forgotPasswordLink = document.querySelector('.forgot-password');
if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener('click', function(e) {
        e.preventDefault();
        
        const email = document.querySelector('#email').value;
        if (!email || !validateEmail(email)) {
            showNotification('Please enter a valid email address first', 'error');
            return;
        }
        
        showNotification('Password reset link sent to your email!', 'success');
    });
}

// Enhanced notification system for auth pages
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
        font-family: 'DM Sans', sans-serif;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add smooth animations to form elements
document.addEventListener('DOMContentLoaded', () => {
    const formGroups = document.querySelectorAll('.form-group');
    
    formGroups.forEach((group, index) => {
        group.style.opacity = '0';
        group.style.transform = 'translateY(20px)';
        group.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            group.style.opacity = '1';
            group.style.transform = 'translateY(0)';
        }, 100 + index * 100);
    });
});

// Add focus effects
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const activeElement = document.activeElement;
        if (activeElement.tagName === 'INPUT') {
            const form = activeElement.closest('form');
            if (form) {
                const submitBtn = form.querySelector('button[type="submit"]');
                if (submitBtn && !submitBtn.disabled) {
                    submitBtn.click();
                }
            }
        }
    }
});











