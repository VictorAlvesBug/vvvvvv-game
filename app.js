import criarJogo from './src/Controllers/jogoController.js';
import controlesMobile from './controlesMobile.js';

const gameBoard = document.querySelector('#game-board');
const jogo = criarJogo(gameBoard);

let comandosPressionados = {};

const ehMobile = navigator.userAgentData.mobile;

if (ehMobile) {
  controlesMobile({
    onSwipeLeft: (firstTouch) => {
        if(firstTouch.clientX < document.body.getBoundingClientRect().width/2){
            comandosPressionados['ArrowLeft'] = jogo.controles['ArrowLeft'];
        }
    },
    onSwipeRight: (firstTouch) => {
        if(firstTouch.clientX < document.body.getBoundingClientRect().width/2){
            comandosPressionados['ArrowRight'] = jogo.controles['ArrowRight'];
        }
    },
    onTouchUp: (firstTouch) => {
        if(firstTouch.clientX < document.body.getBoundingClientRect().width/2){
            comandosPressionados['ArrowLeft'] = null;
            comandosPressionados['ArrowRight'] = null;
        }
        else{
            jogo.controles['Space']()
        }
    },
  });
  

} else {
  document.addEventListener('keydown', ({ code }) => {
    comandosPressionados[code] = jogo.controles[code];
  });

document.addEventListener('keyup', ({ code }) => {
    comandosPressionados[code] = null;
  });
}



const loopInterval = setInterval(() => {
  Object.values(comandosPressionados).forEach((comando) => {
    if (comando) {
      comando();
    }
  });

  jogo.atualizar();
}, 10);
