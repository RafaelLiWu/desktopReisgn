const s = e => document.querySelector(e)
let pagesMarginTop = window.getComputedStyle(document.body).getPropertyValue("--pages-margin-top");

function startGame() {
    s(".inicio").style.marginTop = `${pagesMarginTop}`
    nextFase(fase)
}

function recomecar() {
    fase = 0 
    badges = []
    s(".guia").style.opacity = "100%"
    s(".progress-bar").style.width = "0%"
    nextFase(fase)
    s(".final").style.marginTop = pagesMarginTop
}

function openConfig() {
    s(".pconfig").style.marginTop = "0px"
}

function openSaiba() {
    s(".psaiba").style.marginTop = "0px"
}

function closeConfig() {
    s(".pconfig").style.marginTop = pagesMarginTop
}

function closeSaiba() {
    s(".psaiba").style.marginTop = pagesMarginTop
}