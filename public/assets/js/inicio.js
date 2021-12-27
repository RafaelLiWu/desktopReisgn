const s = e => document.querySelector(e)

function startGame() {
    s(".inicio").style.margin = "414px"
    nextFase(fase)
}

function recomecar() {
    fase = 0 
    s(".progress-bar").style.width = "0%"
    nextFase(fase)
    s(".final").style.marginTop = "700px"
}