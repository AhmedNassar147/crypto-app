const { app, BrowserWindow, Menu, shell, ipcMain } = require('electron')
const path = require('path')
const url = require('url')

let window

const createWindow = () => {
  window = new BrowserWindow({ width: 800, height: 600, backgroundColor: "#ccccc" })
  window.loadURL(url.format({
    pathname: path.join(__dirname, 'src/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  window.on('closed', () => window === null)

  const menue = Menu.buildFromTemplate([
    {
      label: 'Menue',
      submenu: [
        { label: 'Adjust notification Value' },
        {
          label: 'coinMarketCap',
          click() {
            shell.openExternal('http://coinmarketcap.com')
          }
        },
        {
          type: 'separator',
        },
        {
          label: 'Exit',
          click() {
            app.quit()
          }
        },
      ]
    },
    {
      label: 'Info'
    }
  ])
  Menu.setApplicationMenu(menue)
}

app.on('ready', createWindow)

app.on('window-all-closed', () => process.platform !== 'darwin' && app.quit())

app.on('activate', () => window === null && createWindow())

ipcMain.on('update-notify-value', (event, arg) => window.webContents.send('targetPriceVal', arg))