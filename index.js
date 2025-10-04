const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let parentWindow;
let overlayWindow;

function createParentWindow() {
  parentWindow = new BrowserWindow({
    width: 400,
    height: 300,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    title: 'SquadOverlay - Control Panel',
    resizable: true,
    minimizable: true,
    maximizable: false
  });

  parentWindow.loadFile('parent.html');

  // Open DevTools for debugging (remove in production)
  parentWindow.webContents.openDevTools();

  parentWindow.on('closed', () => {
    parentWindow = null;
    // Close overlay when parent closes
    if (overlayWindow) {
      overlayWindow.close();
    }
  });
}

function createOverlayWindow() {
  overlayWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    title: 'SquadOverlay - Overlay',
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: false,
    minimizable: false,
    maximizable: false,
    show: false // Don't show until we attach to a window
  });

  overlayWindow.loadFile('overlay.html');

  // Open DevTools for debugging (remove in production)
  overlayWindow.webContents.openDevTools();

  overlayWindow.on('closed', () => {
    overlayWindow = null;
  });
}

// App event handlers
app.whenReady().then(() => {
  createParentWindow();
  createOverlayWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createParentWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC handlers for communication between windows
ipcMain.handle('show-overlay', () => {
  if (overlayWindow) {
    overlayWindow.show();
    return 'Overlay shown';
  }
  return 'Overlay not available';
});

ipcMain.handle('hide-overlay', () => {
  if (overlayWindow) {
    overlayWindow.hide();
    return 'Overlay hidden';
  }
  return 'Overlay not available';
});

ipcMain.handle('send-message-to-overlay', (event, message) => {
  if (overlayWindow) {
    overlayWindow.webContents.send('message-from-parent', message);
    return 'Message sent';
  }
  return 'Overlay not available';
});
