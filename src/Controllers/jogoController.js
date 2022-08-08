import direcaoEnum from './../Enums/direcaoEnum.js';
import criarTela from './telaController.js';
import criarPersonagem from './personagemController.js';

function criarJogo(gameBoard) {
  const personagem = criarPersonagem(gameBoard);

  // Define quantas vezes serão executados os comando de 'aplicarGravidade' e 
  // 'andar' para que a movimentação seja mais rápida, porém não exigindo que
  // a atualização do canvas seja executada na mesma frequência. 
  const velocidadeGravidade = 30;
  const velocidadeAndar = 8;

  const tela = criarTela(gameBoard);

  const atualizar = () => {
    tela.atualizar(personagem.atributos);
    for (let i = 0; i < velocidadeGravidade; i++) {
      personagem.aplicarGravidade();
    }
  };

  return {
    controles: {
      Space: personagem.alternarGravidade,
      ArrowUp: personagem.alternarGravidade,
      ArrowDown: personagem.alternarGravidade,
      ArrowLeft: () => {
        for (let i = 0; i < velocidadeAndar; i++) {
          personagem.andar(direcaoEnum.ESQUERDA);
        }
      },
      ArrowRight: () => {
        for (let i = 0; i < velocidadeAndar; i++) {
          personagem.andar(direcaoEnum.DIREITA);
        }
      },
    },
    atualizar,
  };
}

export default criarJogo;
