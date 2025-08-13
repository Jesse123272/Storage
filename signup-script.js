signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const email = signupForm.querySelector('input[type="email"]').value;
    const username = signupForm.querySelector('input[type="text"]').value;
    const passwords = signupForm.querySelectorAll('input[type="password"]');
    const password = passwords[0].value;
    const confirmPassword = passwords[1].value;
    const termsAccepted = signupForm.querySelector('input[type="checkbox"]').checked;
    
    // Basic validation
    if (!email || !username || !password || !confirmPassword) {
        alert('Please fill in all required fields.');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }
    
    if (!termsAccepted) {
        alert('Please accept the Terms & Conditions.');
        return;
    }
    
    // Here you would typically send data to your server
    console.log('Signup attempt:', { email, username, password });
    alert('Signup form submitted successfully!');
});
