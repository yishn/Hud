const {app, BrowserWindow} = require('electron')

let window = null

app.on('window-all-closed', () => app.quit())

app.on('ready', () => {
    window = new BrowserWindow({
        width: 1,
        height: 1,
        resizable: false,
        skipTaskbar: true,
        frame: false,
        transparent: true,
        show: false
    })

    // window.webContents.openDevTools({mode: 'detach'})

    window.setIgnoreMouseEvents(true)
    window.on('closed', () => window = null)
    window.loadURL(`file://${__dirname}/index.html`)
})
