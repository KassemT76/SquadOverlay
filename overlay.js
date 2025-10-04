const { ipcRenderer } = require('electron');

// DOM elements
const gameTimeElement = document.getElementById('gameTime');
const centerPanel = document.getElementById('centerPanel');
const centerMessage = document.getElementById('centerMessage');

// Game time simulation
let gameStartTime = Date.now();
let gameTimeInterval;

// Initialize overlay
function initOverlay() {
    startGameTimer();
    showWelcomeMessage();
}

// Start the game timer
function startGameTimer() {
    gameTimeInterval = setInterval(() => {
        const elapsed = Date.now() - gameStartTime;
        const minutes = Math.floor(elapsed / 60000);
        const seconds = Math.floor((elapsed % 60000) / 1000);
        gameTimeElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

// Show welcome message
function showWelcomeMessage() {
    centerMessage.textContent = 'SquadOverlay Ready!';
    centerPanel.style.display = 'block';
    
    setTimeout(() => {
        centerPanel.style.display = 'none';
    }, 3000);
}

// Show center message
function showCenterMessage(message, duration = 3000) {
    centerMessage.textContent = message;
    centerPanel.style.display = 'block';
    
    setTimeout(() => {
        centerPanel.style.display = 'none';
    }, duration);
}

// Update player list (placeholder for future game integration)
function updatePlayerList(players) {
    // This would be implemented when connecting to actual game data
    console.log('Updating player list:', players);
}

// Update game stats (placeholder for future game integration)
function updateGameStats(stats) {
    // This would be implemented when connecting to actual game data
    console.log('Updating game stats:', stats);
}

// Handle messages from parent window
ipcRenderer.on('message-from-parent', (event, message) => {
    console.log('Received message from parent:', message);
    showCenterMessage(`Message: ${message}`);
});

// Simulate some dynamic updates for demo purposes
function simulateGameUpdates() {
    // Simulate player status changes
    const playerItems = document.querySelectorAll('.player-item');
    setInterval(() => {
        const randomPlayer = playerItems[Math.floor(Math.random() * playerItems.length)];
        const statusElement = randomPlayer.querySelector('.player-status');
        
        if (statusElement.classList.contains('online')) {
            statusElement.classList.remove('online');
            statusElement.classList.add('offline');
            statusElement.textContent = 'Offline';
        } else {
            statusElement.classList.remove('offline');
            statusElement.classList.add('online');
            statusElement.textContent = 'Online';
        }
    }, 10000); // Change every 10 seconds
    
    // Simulate score updates
    setInterval(() => {
        const scoreElements = document.querySelectorAll('.player-score');
        scoreElements.forEach(scoreEl => {
            const currentScore = parseInt(scoreEl.textContent);
            const newScore = currentScore + Math.floor(Math.random() * 50);
            scoreEl.textContent = newScore;
        });
    }, 5000); // Update every 5 seconds
}

// Handle window events
window.addEventListener('load', () => {
    initOverlay();
    simulateGameUpdates();
});

// Clean up on window close
window.addEventListener('beforeunload', () => {
    if (gameTimeInterval) {
        clearInterval(gameTimeInterval);
    }
});

// Example function to demonstrate overlay functionality
function demonstrateOverlayFeatures() {
    const messages = [
        'Player joined the game!',
        'Enemy eliminated!',
        'Objective completed!',
        'Team victory!',
        'New high score!'
    ];
    
    let messageIndex = 0;
    setInterval(() => {
        if (centerPanel.style.display === 'none') {
            showCenterMessage(messages[messageIndex % messages.length]);
            messageIndex++;
        }
    }, 8000);
}

// Start demonstration after a delay
setTimeout(demonstrateOverlayFeatures, 5000);
