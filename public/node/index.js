const { 
	ipcRenderer, 
	desktopCapturer,
	dialog
} = require("electron")
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
		$(".nav-opcoes").css("background-color", "black")
		navOpcoes = false
	})
})

$(".psaiba-pessoa-sociais-openPlat").each( (index, item) => {
	item.addEventListener("click", () => {
		let open = item.getAttribute("open")
		if(open) 
			ipcRenderer.send("openSocial", open)


		$('.nav-opcoes-items').css("display", "none")
		$(".nav-opcoes").css("background-color", "black")
		navOpcoes = false
	})
})
document.querySelector(".screenshot").addEventListener("click", () => {
	ipcRenderer.send("screenshot")
});



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