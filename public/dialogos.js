const Dialogos = [
    {
        id: 0,
        personagem: "Narrador",
        personagemImagem: "p1.jpeg",
        texto: "Tancredo, cavalga sem rumo após ser traido pela sua amada. Após um tempo cavalgando, ele cai no chão prestes a morrer, quando Túlio um escravo leva para a casa de Luísa B.",
        direita:{
            dialogo: `...`,
            buscar: 1
        },
        esquerda: {
            dialogo: `...`,
            buscar: 1
        }
    },
    {
        id: 1,
        personagem: "Narrador",
        personagemImagem: "p1.jpeg",
        texto: "Tancredo se recupera a conciência e ao encontrar Úrsula ambos se apaixonam e prometem se casar, porém após ele se recuperar totalmente ele teria que sair, mas antes ele paga a alforria de Tulio, que decide segui-lo",
        direita: {
            dialogo: `...`,
            buscar: 2,
        },
        esquerda: {
            dialogo: `...`,
            buscar: 2,
        }
    },
    {
        id:2,
        personagem: "Narrador",
        personagemImagem: "p1.jpeg",
        texto: "Fernando, tio de Úrsula, um homem controlador que contém odio contra a familia de Luiza B, encontra Úrsula e decide que ela seria a sua esposa",
        direita: {
            dialogo: `...`,
            buscar: 3,
        },
        esquerda: {
            dialogo: `...`,
            buscar: 3,
        }
    },
    {
        id: 3,
        personagem: "Narrador",
        personagemImagem: "p1.jpeg",
        texto: "Luiza B depois de tempos enfermo morre, e quando Úrsula estava no cemiterio sozinha, Tancredo e Túlio a encontram no regresso de sua viagem. E após um tempo a promessa iria acontecer",
        direita: {
            dialogo: `...`,
            buscar: 4,
        },
        esquerda: {
            dialogo: `...`,
            buscar: 4,
        }
    },
    {
        id: 4,
        personagem: "Narrador",
        personagemImagem: "p1.jpeg",
        texto: "O Casamento, e na manhã seguinte...",
        direita: {
            dialogo: `...`,
            buscar: 5,
        },
        esquerda: {
            dialogo: `...`,
            buscar: 5,
        }
    },
    {
        id: 5,
        personagem: "Túlio",
        personagemImagem: "p1.jpeg",
        texto: `Hoje o dia tá tão bonito - Falo abrindo a janela, e vendo o horizonte"`,
        direita: {
            dialogo: `...`,
            buscar: 6,
        },
        esquerda: {
            dialogo: `...`,
            buscar: 6,
        }
    },
    {
        id: 6,
        personagem: "Túlio",
        personagemImagem: "p1.jpeg",
        texto: `Bom dia Tancredo!`,
        direita: {
            dialogo: `Tudo preparado para hoje à noite?`,
            buscar: 7,
        },
        esquerda: {
            dialogo: `Ansioso por hoje?`,
            buscar: 8,
        }
    },
    {
        id: 7,
        personagem: "Tâncredo",
        personagemImagem: "p1.jpeg",
        texto: `Bom dia Túlio! Espero que sim, todos estão fazendo um ótimo trabalho com a cerimônia.`,
        direita: {
            dialogo: `Espero que dê tudo certo sim, mas tenho um mal pressentimento`,
            buscar: 9,
        },
        esquerda: {
            dialogo: `É claro que vai, você ama Úrsula`,
            buscar: 10
        }
    },
    { 
        id: 8,
        personagem: "Tâncredo",
        personagemImagem: "p1.jpeg",
        texto: `Bom dia Túlio! Meu coração arde de ansiedade, porém espero que tudo dê certo!`,
        direita: {
            dialogo: `Espero que dê tudo certo sim, mas tenho um mal pressentimento`,
            buscar: 9,
        },
        esquerda: {
            dialogo: `É claro que vai, você ama Úrsula`,
            buscar: 10
        }
    },
    {
        id: 9,
        personagem: "Tâncredo",
        personagemImagem: "p1.jpeg",
        texto: `Pare de falar essas coisas ruins Túlio! Nada de errado irá acontecer.`,
        direita: {
            dialogo: `Tens de estar certo, melhor eu parar de falar isso...`, 
            buscar: 11, 
        },
        esquerda: {
            dialogo: `Tens de estar certo, melhor eu parar de falar isso...`,
            buscar: 11,   
        },
    },
    {
        id: 10,
        personagem: "Tâncredo",
        personagemImagem: "p1.jpeg",
        texto: `Realmente amo, não sei como viveria sem ela`,
        direita:{ 
            dialogo: `Vocês irão formar uma bela família, amigo`,
            buscar: 11,
        },
        esquerda:{ 
            dialogo: `Vocês irão formar uma bela família, amigo`,
            buscar: 11,
        },
    },
    {
        id: 11,
        personagem: "Tâncredo",
        personagemImagem: "p1.jpeg",
        texto: `Mas amigo, preciso decidir o que usar. [Tancredo fala pegando duas roupas]`,
        direita: {
            dialogo: `Imagino que o terno branco seja melhor para essa situação`,
            buscar: 12,
        },
        esquerda: {
            dialogo: `Claramente o terno preto vai ser melhor.`,
            buscar: 12,
        }
    },
    {
        id: 12,
        personagem: "Tâncredo",
        personagemImagem: "p1.jpeg",
        texto: `A sua palavra vale de muito para mim, vou com esse terno mesmo! Mas e você, já sabe o que usar?`,
        direita: {
            dialogo: `Acho que irei com aquele terno que você me deu`,
            buscar: 13,
        },
        esquerda: {
            dialogo: `Acho que irei com minha roupa normal, não é muito o que um escravo negro pode escolher!`,
            buscar: 14,
        }
    },
    {
        id: 13,
        personagem: "Tâncredo",
        personagemImagem: "p1.jpeg",
        texto: `Ótima escolha! Você fica ótimo usando ele.`,
        direita: {
            dialogo: `Obrigado amigo, é claro que eu fico bem com algo que você me deu`,  
            buscar: 15,
        }, 
        esquerda: {
            dialogo: `Obrigado amigo, é claro que eu fico bem com algo que você me deu`,
            buscar: 15,
        }
    },
    {
        id: 14,
        personagem: "Tâncredo",
        personagemImagem: "p1.jpeg",
        texto: `Pare com isso amigo, é claro que você deve usar o que quer!"`,
        direita: {
            dialogo: `Então tudo bem, acho que irei com aquele terno que você me deu.`, 
            buscar: 15,
        }, 
        esquerda: {
            dialogo: `Então tudo bem, acho que irei com aquele terno que você me deu.`, 
            buscar: 15,
        }, 
    },
    {
        id: 15,
        personagem: "Tâncredo",
        personagemImagem: "p1.jpeg",
        texto: `Então estamos prontos, acho que já vou indo para arrumar minhas coisas`,
        direita: {
            dialogo:`Tudo bem amigo, pode ir. Preciso resolver algumas coisas da casa antes, mas prometo não atrasar!`,
            buscar: 16
        },
        esquerda: {
            dialogo:`Tudo bem amigo, pode ir. Preciso resolver algumas coisas da casa antes, mas prometo não atrasar!`,
            buscar: 16
        },
    },
    {
        id: 16,
        personagem: "Tâncredo",
        personagemImagem: "p1.jpeg",
        texto: `Tenho certeza de que o casamento será um sucesso, o que será que eu faço primeiro agora? [Falo enquanto vou tomando meu café]`,
        direita: {
            dialogo: `Vou cortar a grama.`,
            buscar: 17,
        },
        esquerda: {
            dialogo: `Vou ver os animais.`,
            buscar: 17,
        }
    },
    {
        id: 17,
        personagem: "Narrador",
        personagemImagem: "p1.jpeg",
        texto: `Opa que bom ver você aqui, o jogo ainda não acabou, porém a história parou.`,
        direita: {
            dialogo: `Ver o layout Final`
        },
        esquerda: {
            dialogo: `Ver o layout Final`
        }
    },
]
