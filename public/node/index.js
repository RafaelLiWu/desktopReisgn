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
		ipcRenderer.send("openPlat", item.getAttribute("plat"))
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
		$(".nav-opcoes").css("background-color", "rgb(35,32,36)")
	} else {
		navOpcoes = true
		$('.nav-opcoes-items').css("display", "block")
		$(".nav-opcoes").css("background-color", "rgb(55, 51, 58)")
	}
})	




