const { ipcRenderer } = require('electron');

// DOM elements
const showOverlayBtn = document.getElementById('showOverlay');
const hideOverlayBtn = document.getElementById('hideOverlay');
const sendMessageBtn = document.getElementById('sendMessage');
const messageInput = document.getElementById('messageInput');
const opacitySlider = document.getElementById('overlayOpacity');
const scaleSlider = document.getElementById('overlayScale');
const opacityValue = document.getElementById('opacityValue');
const scaleValue = document.getElementById('scaleValue');
const statusMessage = document.getElementById('statusMessage');
const errorMessage = document.getElementById('errorMessage');

// Event listeners
showOverlayBtn.addEventListener('click', async () => {
    try {
        const result = await ipcRenderer.invoke('show-overlay');
        showStatus(`Overlay: ${result}`, 'success');
    } catch (error) {
        showError(`Failed to show overlay: ${error.message}`);
    }
});

hideOverlayBtn.addEventListener('click', async () => {
    try {
        const result = await ipcRenderer.invoke('hide-overlay');
        showStatus(`Overlay: ${result}`, 'success');
    } catch (error) {
        showError(`Failed to hide overlay: ${error.message}`);
    }
});

sendMessageBtn.addEventListener('click', async () => {
    const message = messageInput.value.trim();
    if (!message) {
        showError('Please enter a message');
        return;
    }
    
    try {
        const result = await ipcRenderer.invoke('send-message-to-overlay', message);
        showStatus(`Message: ${result}`, 'success');
        messageInput.value = '';
    } catch (error) {
        showError(`Failed to send message: ${error.message}`);
    }
});

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessageBtn.click();
    }
});

opacitySlider.addEventListener('input', (e) => {
    const value = Math.round(e.target.value * 100);
    opacityValue.textContent = `${value}%`;
    // In a real implementation, you'd send this to the overlay window
    showStatus(`Opacity set to ${value}%`, 'info');
});

scaleSlider.addEventListener('input', (e) => {
    const value = Math.round(e.target.value * 100);
    scaleValue.textContent = `${value}%`;
    // In a real implementation, you'd send this to the overlay window
    showStatus(`Scale set to ${value}%`, 'info');
});

// Utility functions
function showStatus(message, type = 'info') {
    statusMessage.textContent = message;
    statusMessage.className = 'status-message';
    
    if (type === 'error') {
        statusMessage.style.background = '#ffebee';
        statusMessage.style.borderColor = '#f44336';
        statusMessage.style.color = '#c62828';
    } else if (type === 'success') {
        statusMessage.style.background = '#e8f5e8';
        statusMessage.style.borderColor = '#4CAF50';
        statusMessage.style.color = '#2e7d32';
    } else {
        statusMessage.style.background = '#e3f2fd';
        statusMessage.style.borderColor = '#2196F3';
        statusMessage.style.color = '#1565c0';
    }
    
    // Hide any existing error message
    errorMessage.style.display = 'none';
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    statusMessage.textContent = 'Error occurred';
    statusMessage.className = 'status-message';
    statusMessage.style.background = '#ffebee';
    statusMessage.style.borderColor = '#f44336';
    statusMessage.style.color = '#c62828';
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    showStatus('SquadOverlay Control Panel Ready', 'success');
});
