const html = document.querySelector('html')

function log(texto){
    console.log(texto)
}

// VARIÁVEIS BOTÕES
const mainButton = document.getElementById('start-pause')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const botoes = document.querySelectorAll('.app__card-button')
const musicaInput = document.querySelector('#alternar-musica')

// VARIÁVEIS ELEMENTOS GRÁFICOS
const displayTemporizador = document.querySelector('.app__card-timer')
const imagemPrincipal = document.querySelector('.app__image')
const tituloPrincipal = document.querySelector('.app__title')

// VARIÁVEIS DE TEMPO
const tempoFoco = 1500
const tempoDescanso = 300
const tempoLongo = 900

// FUNÇÕES

function alterarContexto(contexto){
    // retira classe do botao
    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })

    html.setAttribute('data-contexto', contexto)
    imagemPrincipal.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case 'foco':
            tituloPrincipal.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case 'descanso-curto':
            tituloPrincipal.innerHTML = `
            Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;
        case 'descanso-longo':
            tituloPrincipal.innerHTML = `
            Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;
        default:
            break;
    }
}

// EVENTOS

focoBt.addEventListener('click', () =>{
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})



