// Jogo
// ==============================================================================================
var carta,
    itemX = 0,
    itemY = 0,
    positionX_inicial,
    positionY_inicial,
    direction = "",
    fase = 0,
    temporizador = []

function nextFase(i) {
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
    <div class="carta" id="carta-${i}" style="background-image: url(${fotoPersonagem})">
        <div class="carta-direita">
            ${textoDireita}
        </div>    
        <div class="carta-esquerda">
            ${textoEsquerda}
        </div>
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
        document.querySelector('.carta-esquerda').style.opacity = opacity * (-1)
        document.querySelector('.carta-direita').style.opacity = 0
    }
    else if (e.pageX - itemX > 0) {
        document.querySelector('.carta-direita').style.opacity = opacity
        document.querySelector('.carta-esquerda').style.opacity = 0
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
        if(Dialogos[fase].direita.buscar != undefined || Dialogos[fase].direita.buscar != null) {
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
        }
    } else if (direction === "esquerda") {
        direction = ''
        if(Dialogos[fase].esquerda.buscar != undefined || Dialogos[fase].esquerda.buscar != null) {    
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
        }
    } else {
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


