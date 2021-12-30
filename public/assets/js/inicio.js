const s = e => document.querySelector(e)

function startGame() {
    s(".inicio").style.margin = "414px"
    nextFase(fase)
}

function recomecar() {
    fase = 0 
    badges = []
    s(".guia").style.opacity = "100%"
    s(".progress-bar").style.width = "0%"
    nextFase(fase)
    s(".final").style.marginTop = "700px"
}

function openConfig() {
    s(".pconfig").style.marginTop = "0px"
}

function openSaiba() {
    s(".psaiba").style.marginTop = "0px"
}

function closeConfig() {
    s(".pconfig").style.marginTop = "700px"
}

function closeSaiba() {
    s(".psaiba").style.marginTop = "700px"
}