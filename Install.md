# Site Status Checker - Local Installation Guide

## Prerequisites
- Firefox Browser (version 57.0 or higher)
- The extension files downloaded to your computer

## Project Structure
Make sure your extension files are organized as follows:
```
site-status-checker/
├── manifest.json
├── background.js
└── icon.png
```

## Installation Steps

1. **Open Firefox Browser**

2. **Enter Debug Mode**
   - Type `about:debugging` in the Firefox address bar
   - Click on "This Firefox" in the left sidebar

3. **Load the Extension**
   - Click on "Load Temporary Add-on"
   - Navigate to your extension folder
   - Select the `manifest.json` file
   - Click "Open"

4. **Verify Installation**
   - You should see a notification saying "Website Status Checker is now active"
   - The extension should appear in the list of temporary add-ons

## Configuration

1. **API Key Setup**
   - Get your API key from RapidAPI (check-if-website-is-up-or-down API)
   - Replace `YOUR_API_KEY` in background.js with your actual API key

## Testing the Extension

1. Try visiting a non-existent website (e.g., `http://www.example.invalid`)
2. You should receive a notification indicating whether the site is down for everyone or just you
3. Check your downloads folder for the log file if logging is enabled

## Troubleshooting

- If you don't see the extension loaded:
  - Make sure all files are in the correct location
  - Check the browser console for any error messages
  - Verify that your manifest.json is properly formatted

- If notifications don't appear:
  - Ensure Firefox has permission to show notifications
  - Check if notifications are enabled in your system settings

## Notes

- This is a temporary installation that will be removed when Firefox is closed
- The extension will need to be reloaded each time Firefox starts
- For permanent installation, the extension should be signed and installed through Firefox Add-ons

## Uninstalling

1. Go to `about:debugging#/runtime/this-firefox`
2. Find "Site Status Checker" in the temporary extensions list
3. Click "Remove" to uninstall