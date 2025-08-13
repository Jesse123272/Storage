// DOM Elements
const loginForm = document.getElementById('loginForm');
const signupBtn = document.getElementById('signupBtn');
const forgotLink = document.querySelector('.forgot-link');

// Navigation to signup page
signupBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = 'signup.html';
});

// Form submission handler
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form elements
    const usernameInput = loginForm.querySelector('input[type="text"]');
    const passwordInput = loginForm.querySelector('input[type="password"]');
    const rememberCheckbox = loginForm.querySelector('input[type="checkbox"]');
    
    // Get form values
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    const remember = rememberCheckbox.checked;
    
    // Clear previous error states
    clearErrors();
    
    // Validate form
    let isValid = true;
    
    if (!username) {
        showError(usernameInput, 'Username is required');
        isValid = false;
    }
    
    if (!password) {
        showError(passwordInput, 'Password is required');
        isValid = false;
    } else if (password.length < 6) {
        showError(passwordInput, 'Password must be at least 6 characters');
        isValid = false;
    }
    
    if (!isValid) {
        return;
    }
    
    // Show loading state
    showLoadingState();
    
    // Simulate API call
    setTimeout(() => {
        // Hide loading state
        hideLoadingState();
        
        // Here you would typically send data to your server
        console.log('Login attempt:', { username, password, remember });
        
        // Show success message
        showSuccessMessage('Login successful! Redirecting...');
        
        // Simulate redirect after success
        setTimeout(() => {
            // window.location.href = 'dashboard.html';
            alert('Login successful! (Redirect to dashboard)');
        }, 1500);
        
    }, 2000); // Simulate 2 second API call
});

// Error handling functions
function showError(inputElement, message) {
    inputElement.classList.add('input-error');
    
    // Create or update error message
    let errorDiv = inputElement.parentNode.querySelector('.error-message');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        inputElement.parentNode.appendChild(errorDiv);
    }
    
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}

function clearErrors() {
    // Remove error classes
    document.querySelectorAll('.input-error').forEach(input => {
        input.classList.remove('input-error');
    });
    
    // Hide error messages
    document.querySelectorAll('.error-message').forEach(error => {
        error.style.display = 'none';
    });
    
    // Hide success message
    const successMessage = document.querySelector('.success-message');
    if (successMessage) {
        successMessage.style.display = 'none';
    }
}

function showSuccessMessage(message) {
    let successDiv = document.querySelector('.success-message');
    if (!successDiv) {
        successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        loginForm.appendChild(successDiv);
    }
    
    successDiv.textContent = message;
    successDiv.style.display = 'block';
}

// Loading state functions
function showLoadingState() {
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
    submitBtn.style.opacity = '0.7';
}

function hideLoadingState() {
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Sign In';
    submitBtn.style.opacity = '1';
}

// Input field enhancements
document.querySelectorAll('input').forEach(input => {
    // Clear errors on input
    input.addEventListener('input', function() {
        if (this.classList.contains('input-error')) {
            this.classList.remove('input-error');
            const errorMessage = this.parentNode.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.style.display = 'none';
            }
        }
    });
    
    // Add focus effects
    input.addEventListener('focus', function() {
        this.parentNode.style.transform = 'scale(1.02)';
        this.parentNode.style.transition = 'transform 0.2s ease';
    });
    
    input.addEventListener('blur', function() {
        this.parentNode.style.transform = 'scale(1)';
    });
});

// Forgot password functionality
forgotLink.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Simple prompt for demo - in real app, this would open a modal or redirect
    const email = prompt('Enter your email address to reset password:');
    
    if (email && isValidEmail(email)) {
        alert('Password reset link sent to ' + email);
    } else if (email) {
        alert('Please enter a valid email address');
    }
});

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Submit form with Ctrl+Enter
    if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault();
        loginForm.dispatchEvent(new Event('submit'));
    }
    
    // Navigate to signup with Ctrl+S
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        window.location.href = 'signup.html';
    }
});

// Auto-focus first input on page load
document.addEventListener('DOMContentLoaded', () => {
    const firstInput = document.querySelector('input[type="text"]');
    if (firstInput) {
        firstInput.focus();
    }
});

// Show/hide password functionality (optional enhancement)
function addPasswordToggle() {
    const passwordInput = document.querySelector('input[type="password"]');
    const toggleIcon = document.createElement('i');
    toggleIcon.className = 'fas fa-eye';
    toggleIcon.style.cssText = `
        position: absolute;
        right: 1rem;
        top: 50%;
        transform: translateY(-50%);
        color: rgba(255, 255, 255, 0.6);
        cursor: pointer;
        z-index: 10;
    `;
    
    passwordInput.parentNode.appendChild(toggleIcon);
    
    toggleIcon.addEventListener('click', () => {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            toggleIcon.className = 'fas fa-eye-slash';
        } else {
            passwordInput.type = 'password';
            toggleIcon.className = 'fas fa-eye';
        }
    });
}

// Initialize password toggle
addPasswordToggle();