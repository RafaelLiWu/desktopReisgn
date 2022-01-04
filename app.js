const electron = require("electron")
const {
	app,
	BrowserWindow,
	Menu,
	ipcMain,
	dialog
} = require("electron")
const path = require("path")
const { title } = require("process")
const publicPath = path.join(__dirname, "public")
const fs = require("fs");
const screen = electron.screen	
let width
let height
function createWindow() {
	const mainScreen = screen.getPrimaryDisplay()
	const dimensionsMScreen = mainScreen.size
	const MainWidth = dimensionsMScreen.width 
	const MainHeight = dimensionsMScreen.height
	
	if(MainWidth <= 1280) {
		width = 375
		height = 660
	} else if(MainWidth <= 1360 || MainWidth <= 1366) {
		width = 414
		height = 698
	} else {
		width = 450
		height = 750
	}

	const win = new BrowserWindow({
		width,
		height,
		backgroundColor: "#000000",
		fullscreenable: false,
		simpleFullscreen: false,
		resizable: false,
		frame: false,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			devTools: false
		},
		icon: publicPath + "/icon.png",
		title: "A Libertação",
		show: false
	})
	win.loadFile(publicPath + "/index.html")
	win.setIcon(publicPath + "/icon.png")
	win.setTitle("AL")
	win.once("ready-to-show", () => { win.show() })
	win.removeMenu()

	// IPC

	ipcMain.on("windowClose", (event, args) => {
		win.close()
	})

	ipcMain.on("windowMinimize", (event, args) => {
		win.minimize()
	})

	ipcMain.on("openInfo", (event, args) => {
		dialog.showMessageBox(win, {
			title: "Informações",
			message: "A Versão 2 está em fases de desenvolvimentos inciais, logo haverá atualizações..",
			buttons: [
				"Ok"
			]
		})
	})

	ipcMain.on("screenshot", (event, args) => {
		win.webContents
			.capturePage({
				x: 0,
				y: 0,
				width,
				height,
			})
			.then((img) => {
				dialog
					.showSaveDialog({
						title: "Selecione aonde deseja salvar o arquivo",
						defaultPath: path.join(__dirname,
							"../assets/image.png"),
						buttonLabel: "Salvar",
						filters: [
							{
								name: "Image Files",
								extensions: ["png", "jpeg", "jpg"],
							},
						],
						properties: [],
					})
					.then((file) => {
						if (!file.canceled) {
							fs.writeFile(file.filePath.toString(),
								img.toPNG(), "base64", function (err) {
									if (err) throw err;
								});
						}
					})
					.catch((err) => {
						event.reply("error", ["Erro na hora de salvar, porfavor tente novamente ou nos avise via email <criff@gmail.com>"])
					});
			})
			.catch((err) => {
				event.reply("error", ["Erro no screenshot, porfavor tente novamente ou nos avise via email <criff@gmail.com>"])
			});
	})

	ipcMain.on("resize", (event, args) => {
		try{
			width = parseInt(args[0].trim())
			height = parseInt(args[1].trim())
			win.setSize(width, height)
			win.setMinimumSize(300, 300, true)
			event.reply("resize-full", [width, height])
		} catch (e) {
			event.reply("resize-error", ["Ocorreu um erro, porfavor insira novamente a resolução."])
		}
	})
}

ipcMain.on("openPlat", (event, args) => {
	if (args == "github")
		require('electron').shell.openExternal(`https://github.com/CrIFFInformatica`)
	else if (args == "instagram")
		require('electron').shell.openExternal(`https://www.instagram.com/criffitaperuna/`)
	else
		require('electron').shell.openExternal(`http://criffitaperuna.000webhostapp.com/`)
})

ipcMain.on("openSocial", (event, args) => {
	if(args) require("electron").shell.openExternal(args)
})

app.whenReady().then(() => {
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