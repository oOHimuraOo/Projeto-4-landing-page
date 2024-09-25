const alturaDoLogo = -325

var distanciaDoLogoDoPaddingBottom = 0

document.addEventListener('DOMContentLoaded', function() {

    const container = document.querySelector('.particles-container')
    const startMenu = document.querySelector('[data-menu-open]')
    const audio = document.querySelector('[data-audio]')
    const fullscren = document.querySelector('[data-fullscren]')
    const twitterHover = document.querySelector('[data-set-hover]')
    const qtdParticles = 500
    
    var count = 0
    var audioState = true
    var fullscrenState = false
    var categoriaAtual = 'jaegar'
    
    distanciaDoLogoDoPaddingBottom = window.getComputedStyle(document.querySelector('[data-logo]')).bottom 
    //HEADER -> inicia a musica no carregamento da pagina
    iniciarMusica(audioState)
    
    //DESIGN -> inicia rotação do banner
    modificarConteudo(categoriaAtual)
    
    //HEADER -> abre e fecha o menu
    startMenu.addEventListener('click', function() {
        const menuItens = document.querySelector('[data-menu-itens]')
        const menuSeta = document.querySelector('[data-set-seta]')
        const cima = 'img/seta_cima.png'
        const baixo = 'img/seta_baixo.png'

        if (menuItens.classList.contains('header__menu__item__itens--is-closed')) {
            menuItens.classList.remove('header__menu__item__itens--is-closed')
            menuSeta.src = cima
        } else {
            menuItens.classList.add('header__menu__item__itens--is-closed')
            menuSeta.src = baixo
        }
    })

    //HEADER -> Toggla o audio entre on e off
    audio.addEventListener('click', function(button) {
        const audioOFF = 'img/audio-off.svg'
        const audioON = 'img/audio.svg'

        if (audioState) {
            button.target.src = audioOFF
            audioState = false
            iniciarMusica(audioState)
        } else {
            button.target.src = audioON
            audioState = true
            iniciarMusica(audioState)
        }
    })

    //HEADER -> Toggla a tela entre fullscren e windowed
    fullscren.addEventListener('click', function(button) {
        if (fullscrenState) {
            solcitar_fullscren_exit()
            fullscrenState = false
        } else {
            solicitar_fullscren()
            fullscrenState = true
        }
    })

    //GLOBAL -> inicia as particulas
    while (count < qtdParticles) {
        count++
        container.appendChild(createParticle());
    }

    //INFOS -> detecta o tamanho do viewport e ajusta o tamanho da area do container de acordo com isso
    TamanhoTelaAnterior = window.innerHeight
    ajustar_altura()

    window.addEventListener('resize', function(){
        distanciaDoLogoDoPaddingBottom = window.getComputedStyle(document.querySelector('[data-logo]')).bottom 

        ajustar_altura()
    })
    
    //INFOS -> ajusta comportamento do hover do logo twiterr
    twitterHover.addEventListener('mouseenter', function(button) {
        var novoSrc = 'img/twitter-svgrepo-com copy.svg'
        button.target.querySelector('img').src = novoSrc
    })
    twitterHover.addEventListener('mouseleave', function(button) {
        var novoSrc = 'img/twitter-svgrepo-com.svg'
        button.target.querySelector('img').src = novoSrc
    })
})

function createParticle() {
    const particle = document.createElement('div')
    particle.classList.add('particle')
    
    var sizeX = Math.random() * 5
    sizeX = Math.floor(sizeX + 1)
    var sizeY = Math.random() * 5
    sizeY = Math.floor(sizeY + 1)

    particle.style.width = `${sizeX}px`
    particle.style.height = `${sizeY}px`

    const posX = Math.random() * window.innerWidth;
    const posY = Math.random() * window.innerHeight;
    
    particle.style.left = `${posX}px`;
    particle.style.top = `${posY}px`;
    
    const duration = (Math.random() * 3) + 3;
    const delay = Math.random() * 2;
    
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;
    
    return particle;
}

function iniciarMusica(iniciar) {
    if (iniciar) {
        console.log("iniciei a musica")
    } else {
        console.log("parei a musica")
    }
}

function solicitar_fullscren() {
    var elemento = document.documentElement

    if (elemento.requestFullscreen) {
        elemento.requestFullscreen(); // Para navegadores modernos
    } else if (elemento.mozRequestFullScreen) { // Para Firefox
        elemento.mozRequestFullScreen();
    } else if (elemento.webkitRequestFullscreen) { // Para Safari e Chrome
        elemento.webkitRequestFullscreen();
    } else if (elemento.msRequestFullscreen) { // Para Internet Explorer/Edge
        elemento.msRequestFullscreen();
    }
}

function solcitar_fullscren_exit() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Para Firefox
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Para Safari e Chrome
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // Para Internet Explorer/Edge
        document.msExitFullscreen();
    }
}

function ajustar_altura() {
    const infosContainer = document.querySelector('[data-set-height]')
    const logo = document.querySelector('[data-logo]').getBoundingClientRect().top
    
    var offset = convertToFloat(distanciaDoLogoDoPaddingBottom)  
    var nova_altura_calculada = logo + offset

    if (infosContainer.style.height < window.innerHeight) {
        infosContainer.style.setProperty('height', `${nova_altura_calculada}px`)
    }
}

function modificarConteudo(categoria) {
    if (categoria == 'jaegar') {
        const item_atual = document.querySelector('[data-set-item=jaegar]')
        const item_anterior = document.querySelector('[data-set-item=kaiju]')
        const texto_atual = document.querySelector('[data-set-texto]')
        const novo_texto = "jaegar's designs"

        item_anterior.classList.remove('design__lista__item--is-visible')
        item_atual.classList.add('design__lista__item--is-visible')
        texto_atual.innerText = novo_texto

        setTimeout(() => modificarConteudo('kaiju'), 10000)
        
    } else if (categoria == 'kaiju') {
        const item_atual = document.querySelector('[data-set-item=kaiju]')
        const item_anterior = document.querySelector('[data-set-item=jaegar]')
        const texto_atual = document.querySelector('[data-set-texto]')
        const novo_texto = "kaiju's analises"

        item_anterior.classList.remove('design__lista__item--is-visible')
        item_atual.classList.add('design__lista__item--is-visible')
        texto_atual.innerText = novo_texto

        setTimeout(() => modificarConteudo('jaegar'), 10000)
    }
}

function convertToFloat(value) {
    var novo_valor = value
    for (var x = 0; x < value.lenght; x++) {
        if (isNaN(value[x])) {
            novo_valor.replace(value[x], "")
        }
    }

    return parseFloat(novo_valor)
}