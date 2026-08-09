// Store active timezones
let activeTimezones = [];
let availableTimezones = [];

// Initialize the clock on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchAvailableTimezones();
    loadClocks();
    // Update clocks every second
    setInterval(loadClocks, 1000);
});

// Fetch all available timezones
async function fetchAvailableTimezones() {
    try {
        const response = await fetch('/api/timezones');
        const data = await response.json();
        availableTimezones = data.timezones;
    } catch (error) {
        console.error('Error fetching timezones:', error);
    }
}

// Load and display clocks
async function loadClocks() {
    try {
        const response = await fetch('/api/times');
        const data = await response.json();
        
        if (activeTimezones.length === 0) {
            activeTimezones = data.times.map(t => t.timezone);
        }

        renderClocks(data.times);
    } catch (error) {
        console.error('Error loading times:', error);
        showError('Failed to load times. Please try again.');
    }
}

// Render clock cards
function renderClocks(times) {
    const clockGrid = document.getElementById('clockGrid');
    
    // Filter times to only show active timezones
    const filteredTimes = times.filter(t => activeTimezones.includes(t.timezone));
    
    clockGrid.innerHTML = filteredTimes.map(item => {
        if (item.error) {
            return `
                <div class="clock-card error-card">
                    <button class="remove-btn" onclick="removeTimezone('${item.timezone}')" title="Remove">×</button>
                    <div class="error-message">${item.error}</div>
                </div>
            `;
        }

        return `
            <div class="clock-card">
                <button class="remove-btn" onclick="removeTimezone('${item.timezone}')" title="Remove">×</button>
                <div class="timezone-name">
                    <span>${formatTimezoneName(item.timezone)}</span>
                    <span class="offset" title="UTC Offset">${item.offset}</span>
                </div>
                <div class="time-display">${item.time}</div>
                <div class="date-display">${item.date}</div>
                <div class="day-display">${extractDay(item.displayName)}</div>
            </div>
        `;
    }).join('');
}

// Format timezone name for display
function formatTimezoneName(tz) {
    return tz.replace(/_/g, ' ')
             .split('/')
             .map(part => part.charAt(0).toUpperCase() + part.slice(1))
             .join(' • ');
}

// Extract day from display name
function extractDay(displayName) {
    return displayName.split(',')[0];
}

// Add a new timezone
async function addTimezone() {
    const input = document.getElementById('timezoneInput');
    const timezone = input.value.trim();

    if (!timezone) {
        showError('Please enter a timezone.');
        return;
    }

    if (activeTimezones.includes(timezone)) {
        showError('This timezone is already added.');
        input.value = '';
        return;
    }

    if (!availableTimezones.includes(timezone)) {
        showError(`Invalid timezone: "${timezone}". Check the spelling and try again.`);
        input.value = '';
        return;
    }

    activeTimezones.push(timezone);
    input.value = '';
    
    // Fetch and display the new timezone
    try {
        const response = await fetch(`/api/time/${timezone}`);
        if (response.ok) {
            loadClocks();
        } else {
            showError(`Failed to load timezone: ${timezone}`);
            activeTimezones = activeTimezones.filter(t => t !== timezone);
        }
    } catch (error) {
        console.error('Error adding timezone:', error);
        showError('Error adding timezone.');
        activeTimezones = activeTimezones.filter(t => t !== timezone);
    }
}

// Remove a timezone
function removeTimezone(timezone) {
    activeTimezones = activeTimezones.filter(t => t !== timezone);
    loadClocks();
}

// Reset to default timezones
function resetToDefault() {
    activeTimezones = [];
    loadClocks();
}

// Show error message
function showError(message) {
    const clockGrid = document.getElementById('clockGrid');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    clockGrid.insertBefore(errorDiv, clockGrid.firstChild);

    // Remove error after 5 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Allow adding timezone by pressing Enter
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('timezoneInput');
    if (input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addTimezone();
            }
        });
    }
});
