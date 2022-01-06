const { 
	ipcRenderer, 
	desktopCapturer,
	dialog
} = require("electron")
const $ = require("jquery")
const path = require("path")
const fs = require("fs")


let navOpcoes = false;

// IPC
// ===========================================================================================

$(".nav-close").on("click", () => {
	ipcRenderer.send("windowClose")
})

$(".nav-minimize").on("click", () => {
	ipcRenderer.send("windowMinimize")
})

$(".screenshot").on("click", () => {
	ipcRenderer.send("screenshot")
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

ipcRenderer.on("resize-full", (event, args) => {
    setTimeout(()=>{
      s(".size-active").addEventListener("click", ActionClickSizes)
    }, 300)
    SizeModDom(args[0])
  })

ipcRenderer.on("error", (event, args) => {
	ActiveAlert(args[0])
})

ipcRenderer.on("resize-error", (event, args) => {
	s(".size-active").addEventListener("click", ActionClickSizes)
	ActiveAlert(args[0])
	sizesDropdown = true
	s(".nonActive-size-item").style.display = "flex"
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