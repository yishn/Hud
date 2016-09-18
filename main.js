const {app, BrowserWindow} = require('electron')

let window = null

// Quit when all windows are closed.
app.on('window-all-closed', () => app.quit())

app.on('ready', () => {
    window = new BrowserWindow({
        width: 1000,
        height: 1000,
        resizable: false,
        skipTaskbar: true,
        show: false,
        frame: false,
        transparent: true
    })

    // window.toggleDevTools()

    window.setIgnoreMouseEvents(true)
    window.once('ready-to-show', () => window.show())
    window.on('closed', () => { window = null })
    window.loadURL(`file://${__dirname}/index.html`)
})
