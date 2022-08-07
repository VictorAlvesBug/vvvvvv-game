import direcaoEnum from './../Enums/direcaoEnum.js';
import criarMovimento from './movimentoController.js';

function criarPersonagem(gameBoard) {
  let atributos = {
    corVivo: '#8fc0c6',
    corMorto: '#8b1e1e',
    posicaoX: 360,
    posicaoY: 250,
    largura: 20,
    altura: 50,
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
