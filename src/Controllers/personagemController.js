import direcaoEnum from './../Enums/direcaoEnum.js';
import criarMovimento from './movimentoController.js';

function criarPersonagem(gameBoard) {
  let atributos = {
    corVivo: '#8fc0c6',
    corMorto: '#8b1e1e',
    posicaoX: 720,
    posicaoY: 500,
    largura: 40,
    altura: 100,
    vivo: true,
  };

  const movimento = criarMovimento(gameBoard);

  const aplicarGravidade = () => {
    if (atributos.vivo) {
      movimento.tentarMover(direcaoEnum.GRAVIDADE, atributos);
    }
  };

  const alternarGravidade = () => {
    if (atributos.vivo) {
      movimento.alternarGravidade(atributos);
    }
  };

  const andar = (direcao) => {
    if (atributos.vivo) {
      movimento.tentarMover(direcao, atributos);
    }
  };

  return {
    atributos,
    aplicarGravidade,
    alternarGravidade,
    andar
  };
}

export default criarPersonagem;
