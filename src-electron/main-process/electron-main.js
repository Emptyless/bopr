import { app, BrowserWindow, Menu, MenuItem } from 'electron'
import { autoUpdater } from 'electron-updater'
const logger = require('electron-log')

/**
 * Set `__statics` path to static files in production;
 * The reason we are setting it here is that the path needs to be evaluated at runtime
 */
if (process.env.PROD) {
  global.__statics = require('path').join(__dirname, 'statics').replace(/\\/g, '\\\\')
}

let mainWindow

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    useContentSize: true
  })

  mainWindow.loadURL(process.env.APP_URL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  console.log('autoUpdater checking for updates...')
  autoUpdater.checkForUpdatesAndNotify()
  autoUpdater.logger = logger
  autoUpdater.logger['transports'].file.level = 'debug'
}

function createMenu () {
  const menu = new Menu()

  menu.append(new MenuItem({
    label: 'Console',
    click: () => {
      mainWindow.webContents.toggleDevTools()
    }
  }))

  Menu.setApplicationMenu(menu)
}

app.on('ready', () => {
  createWindow()
  createMenu()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
