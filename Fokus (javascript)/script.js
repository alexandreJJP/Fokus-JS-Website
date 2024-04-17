const html = document.querySelector('html')

function log(texto){
    console.log(texto)
}

// VARIÁVEIS BOTÕES
const mainButton = document.querySelector('#start-pause')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const botoes = document.querySelectorAll('.app__card-button')
const botaoMusica = document.querySelector('#alternar-musica')

// VARIÁVEIS ELEMENTOS
const displayTemporizador = document.querySelector('.app__card-timer')
const imagemPrincipal = document.querySelector('.app__image')
const tituloPrincipal = document.querySelector('.app__title')
const imagemBotao = document.querySelector('.app__card-primary-butto-icon')
const tempoNaTela = document.querySelector('#timer')

// VÁRIAVEIS SONS
const musica = new Audio("/sons/luna-rise-part-one.mp3")
musica.loop = true

const AudioTempoFinalizado = new Audio("/sons/beep.mp3")
AudioTempoFinalizado.volume = 0.3;

const AudioPlay = new Audio("/sons/play.wav")

const AudioPause = new Audio("/sons/pause.mp3")


// VARIÁVEIS DE TEMPO
let tempoDecorridoEmSegundos = 5
let intervaloId = null

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

function changeMainButton(texto, icone){
    mainButton.innerHTML = `<img class="app__card-primary-butto-icon" src="/imagens/${icone}.png" alt="">
    <span>${texto}</span>`
}

function contagemRegressiva(){
    if (tempoDecorridoEmSegundos == 0){
        //AudioTempoFinalizado.play()
        musica.pause()
        pausar()

        alert('Tempo finalizado!')
        tempoDecorridoEmSegundos = 5
        changeMainButton('Começar', 'play_arrow')
        
        return
    }

    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

function iniciar(){
    if (intervaloId){
        pausar()
        return
    }
    changeMainButton('Pausar', 'pause')
    AudioPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    
}

function pausar(){
    changeMainButton('Continuar', 'play_arrow')
    AudioPause.play()
    clearInterval(intervaloId)
    intervaloId = null
}

function mostrarTempo(){
    const tempo = tempoDecorridoEmSegundos
    tempoNaTela.innerHTML = `${tempo}`

}

mostrarTempo()

// EVENTOS

mainButton.addEventListener('click', iniciar)

botaoMusica.addEventListener('change', () => {
    if(musica.paused){
        musica.play()
    } else {
        musica.pause()
    }
})

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



