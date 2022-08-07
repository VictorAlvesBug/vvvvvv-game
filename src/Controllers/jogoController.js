import direcaoEnum from './../Enums/direcaoEnum.js';
import criarTela from './telaController.js';
import criarPersonagem from './personagemController.js';

function criarJogo(gameBoard) {
  const personagem = criarPersonagem();

  // Define quantas vezes serão executados os comando de 'aplicarGravidade' e 
  // 'andar' para que a movimentação seja mais rápida, porém não exigindo que
  // a atualização do canvas seja executada na mesma frequência. 
  const qtdeVezesIterar = 8;

  const tela = criarTela(gameBoard);

  const atualizar = () => {
    tela.atualizar(personagem);
    for (let i = 0; i < qtdeVezesIterar; i++) {
      personagem.aplicarGravidade();
    }
  };

  return {
    controles: {
      Space: personagem.alternarGravidade,
      ArrowUp: personagem.alternarGravidade,
      ArrowDown: personagem.alternarGravidade,
      ArrowLeft: () => {
        for (let i = 0; i < qtdeVezesIterar; i++) {
          personagem.andar(direcaoEnum.ESQUERDA);
        }
      },
      ArrowRight: () => {
        for (let i = 0; i < qtdeVezesIterar; i++) {
          personagem.andar(direcaoEnum.DIREITA);
        }
      },
    },
    atualizar,
  };
}

export default criarJogo;
