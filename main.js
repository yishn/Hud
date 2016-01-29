var app = require('electron').app
var BrowserWindow = require('electron').BrowserWindow

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
    window.loadURL('file://' + __dirname + '/index.html')
})
