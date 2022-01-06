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

    let dimensions = s(".size-item-active").textContent.split("x")

    let audioValue = s("#range").value
    let configPessoal = require(path.join(__dirname, "mecanismo", 'configPessoal.json'))
    configPessoal.audioValue = audioValue
    configPessoal.width = parseInt(dimensions[0].toString().trim())
    configPessoal.height = parseInt(dimensions[1].toString().trim())
    try{
        fs.writeFile(path.join(__dirname, "mecanismo", "configPessoal.json"),
            JSON.stringify(configPessoal, null, 2), (err) => {
                if (err) throw err;
            })} catch(err){
                ipcRenderer.send("error", ["Error, não foi possivel salvar as configurações no computador"])
    }
}

function closeSaiba() {
    s(".psaiba").style.marginTop = pagesMarginTop
}