# SquadOverlay

A bare-bones Electron application that provides a game overlay system with a parent control window and an overlay window.

## Features

### Parent Window (Control Panel)
- **Compact Design**: Small window with essential controls
- **Overlay Controls**: Show/hide overlay functionality
- **Settings**: Opacity and scale controls for the overlay
- **Message System**: Send messages to the overlay window
- **Status Display**: Real-time status and error messaging

### Overlay Window
- **Transparent Overlay**: Semi-transparent background with blur effect
- **Always On Top**: Stays above other applications
- **Multiple Panels**: 
  - Top panel: Game info and timer
  - Bottom panel: Player list with online/offline status
  - Side panel: Quick stats (K/D, Wins, Rank)
  - Center panel: Important messages and notifications
- **Interactive Elements**: Hover effects and responsive design
- **Demo Mode**: Simulated game data for testing

## Installation & Usage

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run the Application**:
   ```bash
   npm start
   ```

3. **Development Mode**:
   ```bash
   npm run dev
   ```

## File Structure

```
SquadOverlay/
├── index.js          # Main Electron process
├── parent.html       # Parent window HTML
├── parent.css        # Parent window styles
├── parent.js         # Parent window logic
├── overlay.html      # Overlay window HTML
├── overlay.css       # Overlay window styles
├── overlay.js        # Overlay window logic
├── package.json      # Project configuration
└── README.md         # This file
```

## Controls

### Parent Window
- **Show Overlay**: Makes the overlay window visible
- **Hide Overlay**: Hides the overlay window
- **Send Message**: Sends a message to the overlay (appears in center panel)
- **Opacity Slider**: Controls overlay transparency (placeholder)
- **Scale Slider**: Controls overlay size (placeholder)

### Overlay Window
- **Automatic Demo**: Simulates game updates every few seconds
- **Message Display**: Shows messages from parent window
- **Timer**: Displays elapsed time since overlay started

## Future Development

This is a bare-bones implementation. Future enhancements could include:

1. **Window Detection**: Detect and attach to specific game windows
2. **Game Integration**: Connect to actual game APIs or memory reading
3. **Customization**: More overlay customization options
4. **Hotkeys**: Keyboard shortcuts for common actions
5. **Persistence**: Save settings between sessions
6. **Themes**: Multiple visual themes
7. **Performance**: Optimize for minimal game impact

## Technical Notes

- Uses Electron's IPC (Inter-Process Communication) for window communication
- Overlay window is transparent and always-on-top
- Parent window controls overlay visibility and messaging
- CSS includes backdrop-filter for modern blur effects
- Responsive design adapts to different screen sizes

## Requirements

- Node.js
- Electron (already included in devDependencies)
- Modern browser supporting CSS backdrop-filter (for blur effects)
