const { ipcRenderer } = require("electron")
const $ = require("jquery")
const { path } = require("path")
let navOpcoes = false;

// IPC
// ===========================================================================================

$(".nav-close").on("click", () => {
	ipcRenderer.send("windowClose")
})

$(".nav-minimize").on("click", () => {
	ipcRenderer.send("windowMinimize")
})

$(".nav-item").each( (index, item) => {
	item.addEventListener("click", () => {
		let plat = item.getAttribute("plat")
		if(plat) 
			ipcRenderer.send("openPlat", plat)
		else if(item.getAttribute("info"))
			ipcRenderer.send("openInfo")


		$('.nav-opcoes-items').css("display", "none")
		$(".nav-opcoes").css("background-color", "rgb(35,32,36)")
		navOpcoes = false
	})
})





// Title Bar
// ===========================================================================================

$(".nav-opcoes").on("click", () => {
	if(navOpcoes) {
		navOpcoes = false 
		$('.nav-opcoes-items').css("display", "none")
		$(".nav-opcoes").css("background-color", "black")
	} else {
		navOpcoes = true
		$('.nav-opcoes-items').css("display", "block")
		$(".nav-opcoes").css("background-color", "rgb(27, 27, 27)")
	}
})	




