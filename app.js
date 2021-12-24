const { 
	app, 
	BrowserWindow, 
	Menu, 
	ipcMain
} = require("electron")
const path = require("path")
const publicPath = path.join(__dirname, "public")
function createWindow() {
	const win = new BrowserWindow({
		width: 414,
		height: 698,
		fullscreenable: false,
		simpleFullscreen: false,
		resizable: false,
		frame: false,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			devTools: false
		},
		icon: publicPath+"/icon.png",
		title: "A Libertação",
		show: false
	})
	win.loadFile(publicPath+"/index.html")
	win.setIcon(publicPath+"/icon.png")
	win.setTitle("A Libertação")
	win.once("ready-to-show", ()=>{win.show()})
	
	// IPC

	ipcMain.on("windowClose", (event, args) => {
		win.close()
	})

	ipcMain.on("windowMinimize", (event, args) => {
		win.minimize()
	})

}

ipcMain.on("openPlat", (event, args) => {
	if(args == "github")
		require('electron').shell.openExternal(`https://github.com/CrIFFInformatica`)
	else if (args == "instagram")
		require('electron').shell.openExternal(`https://www.instagram.com/criffitaperuna/`)
	else 
		require('electron').shell.openExternal(`http://criff.000webhostapp.com/`)

})

app.whenReady().then(()=>{
	createWindow()
	app.on('activate', () => {
	    if (BrowserWindow.getAllWindows().length === 0) {
    		createWindow()
		}
	})
})


// Menu
// ===========================================================================================
const templateMenu = []
const menu = Menu.buildFromTemplate(templateMenu)
Menu.setApplicationMenu(menu)


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
