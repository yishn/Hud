var app = require('app')
var BrowserWindow = require('browser-window')

var window = null

// Quit when all windows are closed.
app.on('window-all-closed', function() { app.quit() })

app.on('ready', function() {
    window = new BrowserWindow({
        'width': 1000,
        'height': 1000,
        'resizable': false,
        'skip-taskbar': true,
        'show': false,
        'frame': false,
        'transparent': true
    })

    // window.toggleDevTools()

    window.on('closed', function() { window = null })
    window.webContents.on('did-finish-load', function() { window.show() })
    window.webContents.on('will-navigate', function(e) { e.preventDefault() })

    window.loadUrl('file://' + __dirname + '/index.html')
})
