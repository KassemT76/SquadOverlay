const { ipcRenderer } = require('electron');

// DOM elements
const messageDisplay = document.getElementById('messageDisplay');

// Initialize overlay
function initOverlay() {
    console.log('SquadOverlay initialized');
    messageDisplay.textContent = 'Ready to receive messages...';
}

// Handle messages from parent window
ipcRenderer.on('message-from-parent', (event, message) => {
    console.log('Received message from parent:', message);
    messageDisplay.textContent = `Message: ${message}`;
});

// Initialize when window loads
window.addEventListener('load', () => {
    initOverlay();
});