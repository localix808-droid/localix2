// Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing dashboard...');
    // Initialize dashboard
    initDashboard();
});

function initDashboard() {
    // Navigation functionality
    initNavigation();
    
    // Theme customization
    initThemeCustomization();
    
    // Form handling
    initForms();
    
    // Notifications
    initNotifications();

    // Consulting chat
    initConsultingChat();

    // Charts
    initInsightsCharts();

    // Social automation
    initSocialAutomation();
}

// Global function to switch to a specific section
function switchToSection(targetId) {
    console.log('Switching to section:', targetId);
    
    const sections = document.querySelectorAll('.dashboard-section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Remove active class from all sections
    sections.forEach(s => {
        s.classList.remove('active');
        s.style.display = 'none';
        console.log('Hiding section:', s.id);
    });
    
    // Remove active class from all nav links
    navLinks.forEach(l => l.parentElement.classList.remove('active'));
    
    // Show target section
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
        targetSection.classList.add('active');
        targetSection.style.display = 'block';
        console.log('Section activated:', targetId);
        
        // Force the display and opacity
        setTimeout(() => {
            targetSection.style.opacity = '1';
            targetSection.style.transform = 'translateY(0)';
        }, 10);
    } else {
        console.error('Section not found:', targetId);
    }
    
    // Update sidebar navigation
    const navLink = document.querySelector(`.nav-link[href="#${targetId}"]`);
    if (navLink) {
        navLink.parentElement.classList.add('active');
    }
    
    // Update navigation status
    const statusElement = document.getElementById('nav-status');
    const currentSectionSpan = document.getElementById('current-section');
    if (statusElement && currentSectionSpan) {
        currentSectionSpan.textContent = targetId.charAt(0).toUpperCase() + targetId.slice(1);
        statusElement.style.background = '#e8f5e8';
        statusElement.style.borderColor = '#4caf50';
        statusElement.style.color = '#2e7d32';
    }
}

// Navigation
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.dashboard-section');
const sidebarToggle = document.querySelector('.sidebar-toggle');
const sidebar = document.querySelector('.sidebar');

    console.log('Navigation initialized:', navLinks.length, 'nav links found');
    console.log('Sections found:', sections.length);
    sections.forEach(s => console.log('Section:', s.id, 'display:', s.style.display, 'classes:', s.className));

    // Sidebar navigation click handlers
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href') || '';
            if (!href.startsWith('#')) {
                return; // allow normal navigation for external links
            }
            e.preventDefault();
            const targetId = href.substring(1);
            if (!targetId) {
                console.warn('Empty hash link clicked');
                return;
            }
            console.log('Sidebar nav clicked:', targetId);
            switchToSection(targetId);
        });
    });

    // Mobile sidebar toggle
if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });
}

// Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
    if (window.innerWidth <= 1024) {
        if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    }
});
}

// Theme Customization
function initThemeCustomization() {
    const themeCards = document.querySelectorAll('.theme-card');
    const colorInputs = document.querySelectorAll('input[type="color"]');
    const fontSelects = document.querySelectorAll('select');

    // Theme selection
    themeCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all cards
            themeCards.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked card
            this.classList.add('active');
            
            // Update button text
            const button = this.querySelector('button');
            if (button) {
                button.textContent = 'Active';
                button.className = 'btn btn-primary';
            }
            
            // Apply theme
            applyTheme(this);
    });
});

    // Color customization
    colorInputs.forEach(input => {
        input.addEventListener('change', function() {
            updateColorScheme(this);
        });
    });

    // Font selection
    fontSelects.forEach(select => {
        select.addEventListener('change', function() {
            if (this.previousElementSibling && this.previousElementSibling.textContent.includes('Font Family')) {
                updateFontFamily(this.value);
            } else if (this.previousElementSibling && this.previousElementSibling.textContent.includes('Font Size')) {
                updateFontSize(this.value);
            }
        });
    });
}

function applyTheme(themeCard) {
    const themeName = themeCard.querySelector('h4').textContent;
    
    // Apply theme-specific styles
    switch(themeName) {
        case 'Dark Theme':
            document.body.classList.add('dark-theme');
            document.body.classList.remove('light-theme', 'custom-theme');
            break;
        case 'Light Theme':
            document.body.classList.add('light-theme');
            document.body.classList.remove('dark-theme', 'custom-theme');
            break;
        case 'Custom Theme':
            document.body.classList.add('custom-theme');
            document.body.classList.remove('dark-theme', 'light-theme');
            break;
    }
    
    // Save theme preference
    localStorage.setItem('selectedTheme', themeName);
}

function updateColorScheme(colorInput) {
    const color = colorInput.value;
    const label = colorInput.previousElementSibling.textContent;
    
    // Update CSS custom properties
    switch(label) {
        case 'Primary Color':
            document.documentElement.style.setProperty('--primary-color', color);
            break;
        case 'Secondary Color':
            document.documentElement.style.setProperty('--secondary-color', color);
            break;
        case 'Accent Color':
            document.documentElement.style.setProperty('--accent-color', color);
            break;
    }
    
    // Save color preferences
    saveColorPreferences();
}

function updateFontFamily(fontFamily) {
    document.body.style.fontFamily = fontFamily;
    localStorage.setItem('selectedFont', fontFamily);
}

function updateFontSize(fontSize) {
    document.body.style.fontSize = fontSize;
    localStorage.setItem('selectedFontSize', fontSize);
}

function saveColorPreferences() {
    const colors = {
        primary: getComputedStyle(document.documentElement).getPropertyValue('--primary-color'),
        secondary: getComputedStyle(document.documentElement).getPropertyValue('--secondary-color'),
        accent: getComputedStyle(document.documentElement).getPropertyValue('--accent-color')
    };
    localStorage.setItem('colorPreferences', JSON.stringify(colors));
}

// Form handling
function initForms() {
    const profileForm = document.querySelector('.profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveProfile(this);
        });
    }
}

function saveProfile(form) {
    const formData = new FormData(form);
    const profileData = {};
    
    // Collect form data
    form.querySelectorAll('input, textarea').forEach(input => {
        profileData[input.name || input.id] = input.value;
    });
    
    // Save to localStorage
    localStorage.setItem('userProfile', JSON.stringify(profileData));
    
    // Show success message
    showNotification('Profile updated successfully!', 'success');
}

// Notifications
function initNotifications() {
    // Initialize notification functionality
    updateNotificationBadge();
}

function toggleNotifications() {
    const dropdown = document.getElementById('notificationsDropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
    }
}

function markAsRead(button) {
    const notificationItem = button.closest('.notification-item');
    if (notificationItem) {
        notificationItem.classList.remove('unread');
        updateNotificationBadge();
    }
}

function markAllAsRead() {
    const unreadNotifications = document.querySelectorAll('.notification-item.unread');
    unreadNotifications.forEach(notification => {
        notification.classList.remove('unread');
    });
    updateNotificationBadge();
}

function clearAllNotifications() {
    const notifications = document.querySelectorAll('.notification-item');
    if (confirm('Are you sure you want to clear all notifications?')) {
        notifications.forEach(notification => {
            notification.style.animation = 'slideOut 0.3s ease forwards';
        });
        
        setTimeout(() => {
            notifications.forEach(notification => notification.remove());
            updateNotificationBadge();
        }, 300);
    }
}

function updateNotificationBadge() {
    const unreadCount = document.querySelectorAll('.notification-item.unread').length;
    const badge = document.querySelector('.notification-badge');
    
    if (badge) {
        if (unreadCount === 0) {
            badge.style.display = 'none';
            } else {
            badge.style.display = 'inline';
            badge.textContent = unreadCount;
        }
    }
}

function showAllNotifications() {
    // This function can be expanded to show all notifications in a modal or new page
    console.log('Show all notifications clicked');
}

// Utility function to show notifications
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification-toast ${type}`;
    notification.textContent = message;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Social media automation
function initSocialAutomation() {
    const composer = document.getElementById('socialComposer');
    const addMediaBtn = document.getElementById('addMediaBtn');
    const mediaInput = document.getElementById('mediaInput');
    const mediaPreview = document.getElementById('mediaPreview');
    const scheduleInputs = document.querySelectorAll('input[name="when"]');
    const scheduleTime = document.getElementById('scheduleTime');
    const queueList = document.getElementById('queueList');
    const saveDraftBtn = document.getElementById('saveDraftBtn');
    const postText = document.getElementById('postText');
    const charCount = document.getElementById('charCount');
    const hashtagChips = document.querySelectorAll('.hashtag-chip');
    const previewText = document.getElementById('previewText');
    const previewMedia = document.getElementById('previewMedia');
    const platformToggle = document.getElementById('platformToggle');

    if (!composer) return;

    addMediaBtn.addEventListener('click', function() {
        mediaInput.click();
    });

    mediaInput.addEventListener('change', function() {
        mediaPreview.innerHTML = '';
        previewMedia.innerHTML = '';
        Array.from(mediaInput.files).forEach(file => {
            const url = URL.createObjectURL(file);
            const img = document.createElement('img');
            img.src = url;
            img.className = 'thumb';
            mediaPreview.appendChild(img);

            // preview tile
            const tile = document.createElement('img');
            tile.src = url;
            previewMedia.appendChild(tile);
        });
    });

    scheduleInputs.forEach(r => {
        r.addEventListener('change', function() {
            if (this.value === 'schedule') {
                scheduleTime.style.display = 'inline-block';
                scheduleTime.required = true;
            } else {
                scheduleTime.style.display = 'none';
                scheduleTime.required = false;
                scheduleTime.value = '';
            }
        });
    });

    composer.addEventListener('submit', function(e) {
        e.preventDefault();
        const text = (postText.value || '').trim();
        if (!text && (!mediaInput.files || mediaInput.files.length === 0)) {
            showNotification('Add text or media before publishing', 'error');
            return;
        }

        const when = document.querySelector('input[name="when"]:checked').value;
        if (when === 'schedule' && !scheduleTime.value) {
            showNotification('Select a schedule time', 'error');
            return;
        }

        const item = document.createElement('div');
        item.className = 'queue-item';
        const whenLabel = when === 'now' ? 'Now' : new Date(scheduleTime.value).toLocaleString();
        item.innerHTML = `
            <div>
                <strong>${whenLabel}</strong>
                <div style="color: var(--text-light); font-size: 0.9rem; max-width: 520px;">${escapeHtml(text).slice(0, 140)}${text.length > 140 ? '…' : ''}</div>
            </div>
            <div>
                <button class="btn btn-secondary btn-sm">Edit</button>
                <button class="btn btn-danger btn-sm">Cancel</button>
            </div>
        `;

        queueList.classList.remove('empty');
        queueList.appendChild(item);
        composer.reset();
        mediaPreview.innerHTML = '';
        previewMedia.innerHTML = '';
        scheduleTime.style.display = 'none';
        showNotification(when === 'now' ? 'Post published!' : 'Post scheduled', 'success');
    });

    saveDraftBtn.addEventListener('click', function() {
        const text = (postText.value || '').trim();
        localStorage.setItem('socialDraft', text);
        showNotification('Draft saved', 'success');
    });

    // Restore draft if available
    const draft = localStorage.getItem('socialDraft');
    if (draft) postText.value = draft;

    // character counter + live preview
    function updateTextMeta() {
        const text = postText.value || '';
        charCount.textContent = `${text.length}/2200`;
        previewText.textContent = text.trim() ? text : 'Your caption will appear here…';
    }
    postText.addEventListener('input', updateTextMeta);
    updateTextMeta();

    hashtagChips.forEach(chip => {
        chip.addEventListener('click', function() {
            const insertion = this.textContent.trim();
            if (!postText.value.includes(insertion)) {
                postText.value = (postText.value + ' ' + insertion).trim();
                postText.dispatchEvent(new Event('input'));
            }
        });
    });
    
    // toggle pill visual state
    platformToggle.querySelectorAll('.pill input[type="checkbox"]').forEach(input => {
        input.addEventListener('change', function() {
            const pill = this.closest('.pill');
            if (this.checked) pill.classList.add('active'); else pill.classList.remove('active');
    });
});

    // best time hint when scheduling
    document.querySelectorAll('input[name="when"]').forEach(r => {
        r.addEventListener('change', function() {
            const hint = document.getElementById('bestTimeHint');
            hint.style.display = (this.value === 'schedule') ? 'inline' : 'none';
        });
    });
}

function escapeHtml(str) {
    return str.replace(/[&<>"]?/g, function(c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c] || c;
    });
}

// Business Insights Charts
function initInsightsCharts() {
    if (typeof Chart === 'undefined') return;

    // Inline helper
    function makeChart(ctxId, type, data, options = {}) {
        const ctx = document.getElementById(ctxId);
        if (!ctx) return null;
        return new Chart(ctx, { type, data, options });
    }

    const labels12 = Array.from({ length: 12 }, (_, i) => `W${i + 1}`);
    const labels6 = Array.from({ length: 6 }, (_, i) => `W${i + 1}`);

    // Overview cards
    makeChart('revChart', 'line', {
        labels: labels6,
        datasets: [{
            label: 'Revenue',
            data: [6.2, 6.8, 7.4, 7.9, 8.1, 8.45],
            borderColor: getCssVar('--primary-color'),
            backgroundColor: hexToRgba(getCssVar('--primary-color'), 0.1),
            fill: true,
            tension: 0.35,
        }]
    }, baseLineOptions());

    makeChart('custChart', 'bar', {
        labels: labels6,
        datasets: [{
            label: 'New Customers',
            data: [12, 15, 18, 20, 21, 23],
            backgroundColor: getCssVar('--primary-color')
        }]
    }, baseBarOptions());

    makeChart('apptChart', 'line', {
        labels: labels6,
        datasets: [{
            label: 'Appointments',
            data: [32, 35, 38, 41, 45, 47],
            borderColor: getCssVar('--accent-color'),
            backgroundColor: hexToRgba(getCssVar('--accent-color'), 0.1),
            fill: true,
            tension: 0.35,
        }]
    }, baseLineOptions());

    // Insights tab
    makeChart('insightsRevenue', 'line', {
        labels: labels12,
        datasets: [{
            label: 'Revenue ($k)',
            data: [4.2, 4.8, 5.1, 5.4, 5.9, 6.3, 6.5, 6.9, 7.4, 7.9, 8.2, 8.5],
            borderColor: getCssVar('--primary-color'),
            backgroundColor: hexToRgba(getCssVar('--primary-color'), 0.1),
            fill: true,
            tension: 0.35,
        }]
    }, baseLineOptions());

    makeChart('insightsCustomers', 'bar', {
        labels: labels12,
        datasets: [{
            label: 'New Customers',
            data: [8, 10, 9, 12, 14, 13, 16, 15, 18, 20, 21, 23],
            backgroundColor: getCssVar('--primary-color')
        }]
    }, baseBarOptions());

    makeChart('insightsRating', 'line', {
        labels: labels12,
        datasets: [{
            label: 'Avg Rating',
            data: [4.4, 4.5, 4.5, 4.6, 4.6, 4.7, 4.7, 4.7, 4.8, 4.8, 4.8, 4.8],
            borderColor: getCssVar('--secondary-color'),
            backgroundColor: hexToRgba(getCssVar('--secondary-color'), 0.1),
            fill: true,
            tension: 0.35,
        }]
    }, baseLineOptions());

    function baseLineOptions() {
        return {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { display: false } },
                y: { grid: { color: getCssVar('--gray-200') } }
            }
        };
    }

    function baseBarOptions() {
        return {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { display: false } },
                y: { grid: { color: getCssVar('--gray-200') } }
            }
        };
    }
}

function getCssVar(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function hexToRgba(hex, alpha) {
    const c = hex.replace('#', '');
    const bigint = parseInt(c.length === 3 ? c.split('').map(x => x + x).join('') : c, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Consulting chat logic
function initConsultingChat() {
    const chatForm = document.getElementById('chatForm');
    const chatField = document.getElementById('chatField');
    const chatMessages = document.getElementById('chatMessages');
    const topicButtons = document.querySelectorAll('.topic-btn');
    const endSessionBtn = document.getElementById('endSessionBtn');

    if (!chatMessages) {
        return;
    }

    function appendMessage(text, sender = 'user') {
        const wrapper = document.createElement('div');
        wrapper.className = `message ${sender}`;

        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.textContent = text;
        wrapper.appendChild(bubble);

        const time = document.createElement('span');
        time.className = 'time';
        time.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        wrapper.appendChild(time);

        chatMessages.appendChild(wrapper);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function simulateBotReply(userText) {
        const responses = [
            'Thanks for sharing. Here are 3 steps you can take this week: 1) Offer a weekday promo, 2) Post a before/after reel, 3) Ask for reviews at checkout.',
            'Great question. From similar shops, this playbook works best: loyalty points + online booking reminders + upsell add-ons.',
            'Let’s make it practical. I’ll outline a one-week action plan you can try immediately. Want that?',
        ];
        const reply = responses[Math.floor(Math.random() * responses.length)];
        setTimeout(() => appendMessage(reply, 'bot'), 600);
    }

    if (chatForm && chatField) {
        chatForm.addEventListener('submit', function(e) {
        e.preventDefault();
            const text = (chatField.value || '').trim();
            if (!text) return;
            appendMessage(text, 'user');
            chatField.value = '';
            simulateBotReply(text);
        });
    }

    topicButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const text = this.getAttribute('data-template') || this.textContent;
            appendMessage(text, 'user');
            simulateBotReply(text);
    });
});

    if (endSessionBtn) {
        endSessionBtn.addEventListener('click', function() {
            appendMessage('Session ended. You can start a new chat anytime.', 'bot');
        });
    }
}

// Debug function - can be called from console
function debugNavigation() {
    console.log('=== Navigation Debug ===');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.dashboard-section');
    
    console.log('Nav links found:', navLinks.length);
    navLinks.forEach((link, index) => {
        console.log(`Link ${index}:`, link.getAttribute('href'), link.textContent.trim());
    });
    
    console.log('Sections found:', sections.length);
    sections.forEach((section, index) => {
        console.log(`Section ${index}:`, section.id, section.className, section.style.display);
    });
}

// Test navigation function
function testNavigation() {
    console.log('=== Testing Navigation ===');
    
    // Test switching to different sections
    const testSections = ['overview', 'appearance', 'profile'];
    
    testSections.forEach((sectionId, index) => {
            setTimeout(() => {
            console.log(`Testing section: ${sectionId}`);
            switchToSection(sectionId);
        }, index * 1000);
    });
}

