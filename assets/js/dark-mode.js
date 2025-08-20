// Simple Dark Mode Toggle
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, setting up dark mode');
    
    // Get the toggle button
    const themeToggle = document.getElementById('themeToggle');
    
    // Get current theme from localStorage or default to light
    let currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply the current theme
    function applyTheme(theme) {
        console.log('Applying theme:', theme);
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        currentTheme = theme;
        
        // Update toggle button state
        if (themeToggle) {
            if (theme === 'dark') {
                themeToggle.classList.add('active');
            } else {
                themeToggle.classList.remove('active');
            }
        }
    }
    
    // Toggle between light and dark
    function toggleTheme() {
        console.log('Toggling theme from:', currentTheme);
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    }
    
    // Add click event to toggle button
    if (themeToggle) {
        console.log('Found theme toggle, adding event listener');
        themeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Theme toggle clicked!');
            toggleTheme();
        });
    } else {
        console.warn('Theme toggle button not found!');
    }
    
    // Apply initial theme
    applyTheme(currentTheme);
    
    // Make toggleTheme available globally for onclick handlers
    window.toggleTheme = toggleTheme;
    
    console.log('Dark mode setup complete');
});
