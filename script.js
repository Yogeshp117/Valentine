// Get all screens and elements
const landingScreen = document.getElementById('landing-screen');
const proposalScreen = document.getElementById('proposal-screen');
const celebrationScreen = document.getElementById('celebration-screen');

const nameInput = document.getElementById('name-input');
const startBtn = document.getElementById('start-btn');
const displayName = document.getElementById('display-name');

const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const restartBtn = document.getElementById('restart-btn');

let userName = '';
let noBtnClickAttempts = 0;

// ════════════════════════════════════════════════════════
// 📊 VISITOR TRACKING SYSTEM
// ════════════════════════════════════════════════════════

// Function to log visitor names
function logVisitor(name) {
    const timestamp = new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'medium',
        timeStyle: 'medium'
    });

    // Get existing visitors from localStorage
    let visitors = JSON.parse(localStorage.getItem('valentineVisitors') || '[]');

    // Add new visitor
    const visitorEntry = {
        name: name,
        timestamp: timestamp,
        date: new Date().toISOString()
    };

    visitors.push(visitorEntry);

    // Save back to localStorage
    localStorage.setItem('valentineVisitors', JSON.stringify(visitors));

    // Log to console with style
    console.log('%c🎀 New Visitor Entered!', 'color: #ff69b4; font-size: 16px; font-weight: bold;');
    console.log('%c👤 Name: ' + name, 'color: #f093fb; font-size: 14px;');
    console.log('%c⏰ Time: ' + timestamp, 'color: #667eea; font-size: 12px;');
    console.log('%c📊 Total Visitors: ' + visitors.length, 'color: #38ef7d; font-size: 12px;');
    console.log('─────────────────────────────────');

    return visitors;
}

// Function to view all visitors (call in console: showAllVisitors())
window.showAllVisitors = function () {
    const visitors = JSON.parse(localStorage.getItem('valentineVisitors') || '[]');

    console.log('%c═══════════════════════════════════', 'color: #ff69b4;');
    console.log('%c💕 VALENTINE WEBSITE VISITOR LOG 💕', 'color: #ff69b4; font-size: 18px; font-weight: bold;');
    console.log('%c═══════════════════════════════════', 'color: #ff69b4;');

    if (visitors.length === 0) {
        console.log('%cNo visitors yet!', 'color: #999;');
    } else {
        visitors.forEach((visitor, index) => {
            console.log(`%c${index + 1}. ${visitor.name}`, 'color: #f093fb; font-weight: bold;', `- ${visitor.timestamp}`);
        });
        console.log('%c═══════════════════════════════════', 'color: #ff69b4;');
        console.log(`%cTotal: ${visitors.length} visitor(s)`, 'color: #38ef7d; font-size: 14px; font-weight: bold;');
    }

    return visitors;
};

// Function to clear visitor log (call in console: clearVisitorLog())
window.clearVisitorLog = function () {
    localStorage.removeItem('valentineVisitors');
    console.log('%c✅ Visitor log cleared!', 'color: #38ef7d; font-size: 14px; font-weight: bold;');
};

// ════════════════════════════════════════════════════════
// 💚 YES RESPONSES TRACKING SYSTEM
// ════════════════════════════════════════════════════════

// Function to log when someone says YES
function logYesResponse(name) {
    const timestamp = new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'medium',
        timeStyle: 'medium'
    });

    // Get existing yes responses from localStorage
    let yesResponses = JSON.parse(localStorage.getItem('valentineYesResponses') || '[]');

    // Add new yes response
    const yesEntry = {
        name: name,
        timestamp: timestamp,
        date: new Date().toISOString()
    };

    yesResponses.push(yesEntry);

    // Save back to localStorage
    localStorage.setItem('valentineYesResponses', JSON.stringify(yesResponses));

    // Log to console with style
    console.log('%c💚 Someone said YES!', 'color: #38ef7d; font-size: 16px; font-weight: bold;');
    console.log('%c👤 Name: ' + name, 'color: #11998e; font-size: 14px;');
    console.log('%c⏰ Time: ' + timestamp, 'color: #38ef7d; font-size: 12px;');
    console.log('%c💕 Total Yes Responses: ' + yesResponses.length, 'color: #ff69b4; font-size: 12px;');
    console.log('─────────────────────────────────');

    return yesResponses;
}

// Function to view all YES responses (call in console: showYesResponses())
window.showYesResponses = function () {
    const yesResponses = JSON.parse(localStorage.getItem('valentineYesResponses') || '[]');

    console.log('%c═══════════════════════════════════', 'color: #38ef7d;');
    console.log('%c💚 WHO ANSWERED "YES" 💚', 'color: #38ef7d; font-size: 18px; font-weight: bold;');
    console.log('%c═══════════════════════════════════', 'color: #38ef7d;');

    if (yesResponses.length === 0) {
        console.log('%cNo one has said yes yet! 😢', 'color: #999;');
    } else {
        yesResponses.forEach((response, index) => {
            console.log(`%c${index + 1}. ${response.name}`, 'color: #11998e; font-weight: bold;', `- ${response.timestamp}`);
        });
        console.log('%c═══════════════════════════════════', 'color: #38ef7d;');
        console.log(`%c💕 Total: ${yesResponses.length} people said YES!`, 'color: #ff69b4; font-size: 14px; font-weight: bold;');
    }

    return yesResponses;
};

// Function to clear YES responses log (call in console: clearYesResponses())
window.clearYesResponses = function () {
    localStorage.removeItem('valentineYesResponses');
    console.log('%c✅ Yes responses log cleared!', 'color: #38ef7d; font-size: 14px; font-weight: bold;');
};

// Log instructions on page load
console.log('%c💕 Valentine Visitor Tracker Active!', 'color: #ff69b4; font-size: 16px; font-weight: bold;');
console.log('%cTo view all visitors, type: showAllVisitors()', 'color: #667eea; font-size: 12px;');
console.log('%cTo view who said YES, type: showYesResponses()', 'color: #38ef7d; font-size: 12px;');
console.log('%cTo clear the log, type: clearVisitorLog()', 'color: #667eea; font-size: 12px;');
console.log('─────────────────────────────────');

// Start button - Move to proposal screen
startBtn.addEventListener('click', () => {
    userName = nameInput.value.trim();

    if (userName === '') {
        nameInput.style.borderColor = 'rgba(255, 100, 100, 0.8)';
        nameInput.placeholder = 'Please enter your name! 💕';
        return;
    }

    // Log the visitor
    logVisitor(userName);

    displayName.textContent = userName;
    switchScreen(landingScreen, proposalScreen);
});

// Enter key on name input
nameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        startBtn.click();
    }
});

// Reset border color on input
nameInput.addEventListener('input', () => {
    nameInput.style.borderColor = 'rgba(255, 255, 255, 0.3)';
});

// Yes button - Show celebration
yesBtn.addEventListener('click', () => {
    // Log the YES response
    logYesResponse(userName);
    switchScreen(proposalScreen, celebrationScreen);
});

// No button evasion logic
let isNoButtonEvading = false;

// Track mouse movement for evasion
document.addEventListener('mousemove', (e) => {
    if (!proposalScreen.classList.contains('active')) return;

    const noBtnRect = noBtn.getBoundingClientRect();
    const noBtnCenterX = noBtnRect.left + noBtnRect.width / 2;
    const noBtnCenterY = noBtnRect.top + noBtnRect.height / 2;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Calculate distance between mouse and button center
    const distance = Math.sqrt(
        Math.pow(mouseX - noBtnCenterX, 2) +
        Math.pow(mouseY - noBtnCenterY, 2)
    );

    // Evasion threshold - button runs away when mouse gets close
    const threshold = 150;

    if (distance < threshold && !isNoButtonEvading) {
        evadeNoButton();
    }
});

// No button click attempt - also trigger evasion
noBtn.addEventListener('mouseenter', () => {
    evadeNoButton();
});

noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    evadeNoButton();
});

// Function to make No button evade
function evadeNoButton() {
    if (isNoButtonEvading) return;
    isNoButtonEvading = true;

    noBtnClickAttempts++;

    // Get container dimensions
    const container = proposalScreen.querySelector('.content-box');
    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    // Calculate safe boundaries (keep button in visible area)
    const maxX = containerRect.width - btnRect.width - 40;
    const maxY = containerRect.height - btnRect.height - 40;

    // Random new position
    const newX = Math.random() * maxX - maxX / 2;
    const newY = Math.random() * maxY - maxY / 2;

    // Apply new position
    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;

    // Shrink the button progressively
    const newScale = Math.max(0.5, 1 - (noBtnClickAttempts * 0.1));
    noBtn.style.transform = `scale(${newScale})`;

    // Make Yes button bigger to encourage clicking it
    const yesScale = Math.min(1.3, 1 + (noBtnClickAttempts * 0.05));
    yesBtn.style.transform = `scale(${yesScale})`;

    // Add fun messages based on attempts
    const hintText = document.querySelector('.hint-text');
    if (noBtnClickAttempts === 1) {
        hintText.textContent = "Hey! That button is shy! 😏";
    } else if (noBtnClickAttempts === 3) {
        hintText.textContent = "You know you want to click YES! 💖";
    } else if (noBtnClickAttempts === 5) {
        hintText.textContent = "Come on, just say yes already! 😘";
    } else if (noBtnClickAttempts > 7) {
        hintText.textContent = "I think the universe wants you to say YES! ✨";
    }

    // Reset evading flag after animation
    setTimeout(() => {
        isNoButtonEvading = false;
    }, 300);
}

// Restart button - Go back to landing
restartBtn.addEventListener('click', () => {
    // Reset everything
    nameInput.value = '';
    noBtnClickAttempts = 0;
    noBtn.style.left = '';
    noBtn.style.top = '';
    noBtn.style.transform = '';
    yesBtn.style.transform = '';
    document.querySelector('.hint-text').textContent = "Choose wisely... 😉";

    switchScreen(celebrationScreen, landingScreen);
});

// Helper function to switch screens
function switchScreen(fromScreen, toScreen) {
    fromScreen.classList.remove('active');
    setTimeout(() => {
        toScreen.classList.add('active');
    }, 300);
}

// Add some extra magic - random heart color variations
const hearts = document.querySelectorAll('.heart');
const heartColors = [
    'rgba(255, 105, 180, 0.5)',
    'rgba(255, 20, 147, 0.5)',
    'rgba(255, 192, 203, 0.5)',
    'rgba(219, 112, 147, 0.5)'
];

hearts.forEach(heart => {
    const randomColor = heartColors[Math.floor(Math.random() * heartColors.length)];
    heart.style.background = randomColor;

    const beforeAfter = heart.querySelectorAll('::before, ::after');
    heart.addEventListener('animationiteration', () => {
        heart.style.background = heartColors[Math.floor(Math.random() * heartColors.length)];
    });
});
