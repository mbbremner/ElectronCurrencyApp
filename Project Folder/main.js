/*===================================================================*/
/*-----------------------------  MAIN  ------------------------------
/*----------------------------  Group 10  ---------------------------
/*===================================================================*/


const {app, BrowserWindow, Menu} = require('electron')
const path = require('path')
const url = require('url')
const shell = require('electron').shell
const ipc = require('electron').ipcMain



  // Global window reference
  let win
  
  // Create initial window 
  function createWindow () {
    // Create  browser window.
    win = new BrowserWindow({width: 700, height: 1000})
  
    // Load index.html
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'src/index.html'),
        protocol: 'file:',
        slashes: true,

    }))
  
    // Open the DevTools.
    win.webContents.openDevTools()
  
    // Emitted when the window is closed.
    win.on('closed', () => {
      // Dereference window object
      win = null
    })

    var menu = Menu.buildFromTemplate([
    {
        label: 'Menu',
        submenu: [
            {label: 'Adjust Notification Value'}, //shift alt down arrow
            {
                label: 'CurrencyMarketCap',
                click(){
                    shell.openExternal('http://rates.fxcm.com/RatesXML')
                }
            }, 
            {type: 'separator'},
            {
                label: 'Exit',
                click(){
                    app.quit()
                }
            }
        ]
     },
     {label: 'Info'}
    ])

    Menu.setApplicationMenu(menu);    
  }

  app.on('ready', createWindow)
  
  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  
  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow()
    }
  })
  