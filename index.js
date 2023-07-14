
const {app, BrowserWindow,screen, ipcMain } = require('electron')
const path = require("path")



let tabs=[]
const createWindow = () => {
  const {width, height} = screen.getPrimaryDisplay().workAreaSize

    const win = new BrowserWindow({
      width,
      height,
      frame:false,
      webPreferences:{
         webviewTag:true,
         nodeIntegration:false,
         preload: path.join(app.getAppPath(), 'preload.js')
      }
    })

    //win.loadURL("http://localhost:5000")
    let ses=win.webContents.session.clearCache()
    
   win.loadFile('frdist/index.html')
  }

  ipcMain.on('close', () => {
    app.quit()
  })

  app.whenReady().then(() => {



    createWindow()


  })