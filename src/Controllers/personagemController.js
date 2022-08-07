import criarMovimento from './movimentoController.js';
import criarGravidade from './gravidadeController.js';

function criarPersonagem(gameBoard) {

    const posicaoInicialX = 400;
    const posicaoInicialY = 200;

  const movimento = criarMovimento(gameBoard);
  const gravidade = criarGravidade(gameBoard);
  
  return {
    cor: '#8fc0c6',
    largura: 30,
    altura: 60,
    posicaoX: posicaoInicialX,
    posicaoY: posicaoInicialY,
    aplicarGravidade: gravidade.aplicarGravidade,
    alternarGravidade: gravidade.alternarGravidade,
    andar: movimento.andar,
  };
}

export default criarPersonagem;
