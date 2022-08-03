import { direcaoEnum } from './utilEnums.js';
import { desenharTela } from './telaFactory.js';
import createMovimentoPersonagem from './movimentoPersonagemFactory.js';
import createGravidade from './gravidadeFactory.js';

function createGame(gameBoard) {
  const movimentoPersonagem = createMovimentoPersonagem(gameBoard);
  const gravidade = createGravidade(gameBoard);
  const qtdeVezesIterar = 8;

  const atualizar = () => {
    desenharTela(gameBoard);
    for (let i = 0; i < qtdeVezesIterar; i++) {
      gravidade.aplicarAcaoGravidade();
    }
  };

  return {
    controles: {
      Space: gravidade.alternarGravidade,
      ArrowUp: gravidade.alternarGravidade,
      ArrowDown: gravidade.alternarGravidade,
      ArrowLeft: () => {
        for (let i = 0; i < qtdeVezesIterar; i++) {
        movimentoPersonagem.andar(direcaoEnum.ESQUERDA);
        }
      },
      ArrowRight: () => {
        for (let i = 0; i < qtdeVezesIterar; i++) {
        movimentoPersonagem.andar(direcaoEnum.DIREITA);
        }
      },
    },
    atualizar,
  };
}

export default createGame;
