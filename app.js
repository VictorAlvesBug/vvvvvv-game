import criarJogo from './src/Controllers/jogoController.js';

const gameBoard = document.querySelector('#game-board')
const jogo = criarJogo(gameBoard);

let comandosPressionados = {};

document.addEventListener('keydown', ({code}) => {
    comandosPressionados[code] = jogo.controles[code];
})

document.addEventListener('keyup', ({code}) => {
    comandosPressionados[code] = null;
})

const loopInterval = setInterval(() => {
    Object.values(comandosPressionados).forEach(comando => {
        if(comando){
            comando();
        }
    })

    jogo.atualizar();

}, 10)
