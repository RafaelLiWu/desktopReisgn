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
		icon: publicPath + "/icon.png",
		title: "A Libertação",
		show: false
	})
	win.loadFile(publicPath + "/index.html")
	win.setIcon(publicPath + "/icon.png")
	win.setTitle("A Libertação")
	win.once("ready-to-show", () => { win.show() })

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
				width: 414,
				height: 698,
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
					});
			})
			.catch((err) => {
			});
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

