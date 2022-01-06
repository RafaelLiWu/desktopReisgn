// Jogo
// ==============================================================================================

// Variaveis
var carta,
    itemX = 0,
    itemY = 0,
    positionX_inicial,
    positionY_inicial,
    direction = "",
    fase = 0,
    temporizador = [],
    ponteiro = 0,
    badges = [],
    volume = 1

const CartaLocal = new Audio(path.join(__dirname, "audios", "CartaLocal.wav"))
const CartaJogada = new Audio(path.join(__dirname, "audios", "CartaJogada.wav"))
let somAtual = CartaLocal
let somMusic = CartaJogada

// Utils
function playSound(music){
    if(somAtual != null) {
        if(somAtual.currentTime != 0){
            stopSound()
        }
    }
    somAtual = music
    somAtual.volume = volume
    somAtual.play()
}
function stopSound() {
    if(somAtual != null) {
        somAtual.pause()
        somAtual.currentTime = 0
        somAtual = null
    }
    
}
const porcentagem = Math.round(100 / (Dialogos.length - 1))
function badge(item) { badges.push( item ) }













function nextFase(i) {
    
    if(i == 6) {
        s(".guia").style.opacity = "0%"
    }

    if (i != 0) s(".progress-bar").style.width = (porcentagem * i)+"%"
    
    if (temporizador.length > 0) {
        for (let z = 0; z<temporizador.length; z++) 
            clearTimeout(temporizador[z])
    }
    let nomePersonagem = Dialogos[i].personagem
    let textoDialogo = Dialogos[i].texto
    let textoDireita = Dialogos[i].direita.dialogo
    let fotoPersonagem = `url('./personagens/${Dialogos[i].personagemImagem}')`
    let textoEsquerda = Dialogos[i].esquerda.dialogo
    let html = 
    `
    <div class="carta" id="carta-${i}">
        <div class="carta-direita">
            ${textoDireita}
        </div>    
        <div class="carta-esquerda">
            ${textoEsquerda}
        </div>
        <div class="carta-sombra-topo"></div>
    </div>
    `
    s(".fundo-carta").innerHTML = html

    positionY_inicial = document.getElementById(`carta-${i}`).offsetLeft
    positionX_inicial = document.getElementById(`carta-${i}`).offsetTop
    carta = document.getElementById(`carta-${i}`)
    carta.style.transition = "0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
    carta.style.opacity = 1
    temporizador.push(setTimeout(()=>{
        carta.style.transform = "rotateY(0deg)"
        setTimeout(()=>{
            carta.addEventListener("mousedown", dragStart)
        }, 250)
        setTimeout(()=>{
            carta.style.transition = "none"
        },400)
    },50))
    s(".personagem-nome").innerHTML = nomePersonagem 
    carta.style.backgroundImage = fotoPersonagem      
    s(".texto").innerHTML = textoDialogo  
    
    direction = ""
}

function dragStart(e) {
    playSound(CartaLocal)



    itemX = e.pageX - carta.offsetLeft;
    itemY = e.pageY - carta.offsetTop;
    direction = ""
    if (temporizador.length > 0) {
        for (let z = 0; z<temporizador.length; z++) 
            clearTimeout(temporizador[z])
    }
    carta.style.opacity = 1
    carta.style.transition = "none"

    if (window.getSelection) window.getSelection().removeAllRanges();

    addEventListener("mousemove", dragMove);
    addEventListener("mouseup", dragEnd);
}

function dragMove(e) {
    carta.removeEventListener("mousedown", dragStart)
    carta.style.left = (e.pageX - itemX) + 'px';

    if ((e.pageY - itemY) > -43 && (e.pageY - itemY) < 90) {
        carta.style.top = (e.pageY - itemY) + 'px';
    }
    if (e.pageX - itemX > 40)
        carta.style.transform = "rotate(" + ((e.pageX - itemX) * 0.2) + "deg)"
    else if (e.pageX - itemX < 40)
        carta.style.transform = "rotate(" + ((e.pageX - itemX) * 0.2) + "deg)"

    let opacity = (e.pageX - itemX) * 0.03

    if (e.pageX - itemX < 0) {
        s('.carta-esquerda').style.opacity = opacity * (-1)
        s('.carta-sombra-topo').style.opacity = opacity * (-1)
        s('.carta-direita').style.opacity = 0
    }
    else if (e.pageX - itemX > 0) {
        s('.carta-direita').style.opacity = opacity
        s('.carta-sombra-topo').style.opacity = opacity
        s('.carta-esquerda').style.opacity = 0
    }

    if (e.pageX - itemX < -35) {
        direction = 'esquerda'
    }
    else if (e.pageX - itemX > 35) {
        direction = 'direita'
    }
    else {
        direction = ''
    }
}

function dragEnd() {
    if (direction === "direita") {
        playSound(CartaJogada)

        if(Dialogos[fase].direita.buscar != undefined || Dialogos[fase].direita.buscar != null) { 
            if(Dialogos[fase].direita.badge != undefined || Dialogos[fase].direita.badge != null) badge(Dialogos[fase].direita.badge)
            
            direction = ''
            carta.removeEventListener("mousedown", dragStart)
            direction = ''
            fase = Dialogos[fase].direita.buscar
            carta.style.transition = "all ease .3s"
            temporizador.push(setTimeout(()=>{
                carta.style.left = (parseInt(carta.style.left) + 25) + "px" 
                carta.style.top = (parseInt(carta.style.top) + 25) + "px"
                carta.style.opacity = 0
                setTimeout(()=>{
                    carta.style.transform = "rotateY(180deg)"
                    s('.carta-esquerda').style.opacity = 0 
                    s('.carta-direita').style.opacity = 0
                    setTimeout(() => {
                        nextFase(fase)
                    }, 100)
                },300)
            },100))
        } else {
            let html = ""
            badges.forEach(element => {
                html += `<div class="badge-final ${element[1]}">${element[0]}</div>`  
            });
            s(".final-badges").innerHTML = html
            s(".final").style.marginTop = '0px'
        }
    } else if (direction === "esquerda") {
        playSound(CartaJogada)




        direction = ''
        if(Dialogos[fase].esquerda.buscar != undefined || Dialogos[fase].esquerda.buscar != null) {
            if(Dialogos[fase].esquerda.badge != undefined || Dialogos[fase].esquerda.badge != null) badge(Dialogos[fase].esquerda.badge)

            fase = Dialogos[fase].esquerda.buscar
            carta.style.transition = "all ease .3s"
            temporizador.push(setTimeout(()=>{
                carta.style.left = (parseInt(carta.style.left) - 25) + "px" 
                carta.style.top = (parseInt(carta.style.top) + 25) + "px"
                carta.style.opacity = 0
                setTimeout(()=>{
                    carta.style.transform = "rotateY(180deg)"
                    s('.carta-esquerda').style.opacity = 0 
                    s('.carta-direita').style.opacity = 0
                    setTimeout(() => {
                        nextFase(fase)
                    }, 100)
                },300)
            },100))
        } else {
            let html = ""
            badges.forEach(element => {
                html += `<div class="badge-final ${element[1]}">${element[0]}</div>` 
            });
            s(".final-badges").innerHTML = html
            s(".final").style.marginTop = '0px'
        }
    } else {
        playSound(CartaJogada)


        carta.style.transition = "all ease .2s"
        temporizador.push(setTimeout(() => {
            carta.style.top = positionY_inicial
            carta.style.left = positionX_inicial
            carta.style.transform = "rotate(0deg)"
            s('.carta-esquerda').style.opacity = 0
            s('.carta-direita').style.opacity = 0
            setTimeout(() => {
                carta.addEventListener("mousedown", dragStart)
                carta.style.transition = "none"
            }, 200);
        }, 50))
    }


    removeEventListener("mousemove", dragMove)
    removeEventListener("mouseup", dragEnd)
}
















// Template
// ======================================================================
setInterval(()=>{

    document.querySelectorAll(".fa-chevron-right")[0].style.marginLeft = "4px"
    document.querySelectorAll(".fa-chevron-right")[1].style.marginLeft = "3px"
    document.querySelectorAll(".fa-chevron-right")[2].style.marginLeft = "1px"
    document.querySelectorAll(".fa-chevron-right")[2].style.opacity = "60%"
    document.querySelectorAll(".fa-chevron-right")[1].style.opacity = "40%"
    document.querySelectorAll(".fa-chevron-right")[0].style.opacity = "20%"

    document.querySelectorAll(".fa-chevron-left")[0].style.marginRight = "1px"
    document.querySelectorAll(".fa-chevron-left")[1].style.marginRight = "3px"
    document.querySelectorAll(".fa-chevron-left")[2].style.marginRight = "4px"
    document.querySelectorAll(".fa-chevron-left")[0].style.opacity = "60%"
    document.querySelectorAll(".fa-chevron-left")[1].style.opacity = "40%"
    document.querySelectorAll(".fa-chevron-left")[2].style.opacity = "20%"

    setTimeout(()=>{
        document.querySelectorAll(".fa-chevron-right")[0].style.marginLeft = "0px"
        document.querySelectorAll(".fa-chevron-right")[1].style.marginLeft = "0px"
        document.querySelectorAll(".fa-chevron-right")[2].style.marginLeft = "0px"
        document.querySelectorAll(".fa-chevron-right")[2].style.opacity = "100%"
        document.querySelectorAll(".fa-chevron-right")[1].style.opacity = "80%"
        document.querySelectorAll(".fa-chevron-right")[0].style.opacity = "60%"

        document.querySelectorAll(".fa-chevron-left")[0].style.marginRight = "0px"
        document.querySelectorAll(".fa-chevron-left")[1].style.marginRight = "0px"
        document.querySelectorAll(".fa-chevron-left")[2].style.marginRight = "0px"
        document.querySelectorAll(".fa-chevron-left")[0].style.opacity = "100%"
        document.querySelectorAll(".fa-chevron-left")[1].style.opacity = "80%"
        document.querySelectorAll(".fa-chevron-left")[2].style.opacity = "60%"
    },500)

},1000)