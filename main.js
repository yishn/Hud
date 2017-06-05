const {app, BrowserWindow} = require('electron')

let window = null

// Quit when all windows are closed.
app.on('window-all-closed', () => app.quit())

app.on('ready', () => {
    window = new BrowserWindow({
        width: 1,
        height: 1,
        resizable: false,
        skipTaskbar: true,
        frame: false,
        transparent: true
    })

    // window.toggleDevTools()

    window.setIgnoreMouseEvents(true)
    window.on('closed', () => { window = null })
    window.loadURL(`file://${__dirname}/index.html`)
})
