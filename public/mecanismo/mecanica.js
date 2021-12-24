var carta = document.getElementById("carta"),
    itemX = 0,
    itemY = 0,
    positionX_inicial,
    positionY_inicial,
    direction = "",
    fase = 0

const s = e => document.querySelector(e)

nextFase(fase)

function nextFase(i) {
    let nomePersonagem = Dialogos[i].personagem
    let fotoPersonagem = `url('./personagens/${Dialogos[i].personagemImagem}')`
    let textoDialogo = Dialogos[i].texto
    let textoDireita = Dialogos[i].direita.dialogo
    let textoEsquerda = Dialogos[i].esquerda.dialogo
    carta.style.transition = "0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
    carta.style.opacity = 1
    setTimeout(()=>{
        carta.style.transform = "rotateY(0deg)"
        setTimeout(()=>{
            carta.style.transition = "none"
        },600)
    },100)
    s(".personagem-nome").innerHTML = nomePersonagem 
    carta.style.backgroundImage = fotoPersonagem      
    s(".texto").innerHTML = textoDialogo  
    s(".carta-direita").innerHTML = textoDireita
    s(".carta-esquerda").innerHTML = textoEsquerda
    carta.addEventListener("mousedown", dragStart)
}

function dragStart(e) {
    itemX = e.pageX - carta.offsetLeft;
    itemY = e.pageY - carta.offsetTop;

    positionX_inicial = document.getElementById("fundo-carta").offsetLeft
    positionY_inicial = document.getElementById("fundo-carta").offsetTop
    carta.style.opacity = 1
    carta.style.transition = "none"

    addEventListener("mousemove", dragMove);
    addEventListener("mouseup", dragEnd);
}

function dragMove(e) {
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
        document.querySelector('.carta-direita').style.opacity = opacity * (-1)
        document.querySelector('.carta-esquerda').style.opacity = 0
    }
    else if (e.pageX - itemX > 0) {
        document.querySelector('.carta-esquerda').style.opacity = opacity
        document.querySelector('.carta-direita').style.opacity = 0
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
            fase = Dialogos[fase].direita.buscar
            carta.style.transition = "all ease .3s"
            setTimeout(()=>{
                carta.style.left = (parseInt(carta.style.left) - 25) + "px" 
                carta.style.top = (parseInt(carta.style.top) + 25) + "px"
                carta.style.opacity = 0
                setTimeout(()=>{
                    carta.style.top = positionY_inicial
                    carta.style.left = positionX_inicial
                    carta.style.transform = "rotateY(180deg)"
                    s('.carta-esquerda').style.opacity = 0 
                    s('.carta-direita').style.opacity = 0
                    nextFase(fase)
                },300)
            },100)
        }
    } else if (direction === "esquerda") {
        if(Dialogos[fase].esquerda.buscar != undefined || Dialogos[fase].esquerda.buscar != null) {
            fase = Dialogos[fase].esquerda.buscar
            carta.style.transition = "all ease .3s"
            setTimeout(()=>{
                carta.style.left = (parseInt(carta.style.left) - 25) + "px" 
                carta.style.top = (parseInt(carta.style.top) + 25) + "px"
                carta.style.opacity = 0
                setTimeout(()=>{
                    carta.style.top = positionY_inicial
                    carta.style.left = positionX_inicial
                    carta.style.transform = "rotateY(180deg)"
                    s('.carta-esquerda').style.opacity = 0 
                    s('.carta-direita').style.opacity = 0
                    nextFase(fase)
                },300)
            },100)
        }
    } else {
        carta.style.transition = "all ease .4s"
        setTimeout(() => {
            carta.style.top = positionY_inicial
            carta.style.left = positionX_inicial
            carta.style.transform = "rotate(0deg)"
            setTimeout(() => {
                carta.style.transition = "none"
            }, 400);
            s('.carta-esquerda').style.opacity = 0
            s('.carta-direita').style.opacity = 0
        }, 100);
    }


    removeEventListener("mousemove", dragMove)
    removeEventListener("mouseup", dragEnd)
}