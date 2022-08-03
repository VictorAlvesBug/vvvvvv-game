import { direcaoEnum, colisaoEnum } from './utilEnums.js';
import GlobalVariables from './GlobalVariables.js';

Number.prototype.estaEntre = function (minimo, maximo) {
  return this >= minimo && this <= maximo;
};

function createMovimentoPersonagem(gameBoard) {
  const globalVariables = new GlobalVariables();
  const personagem = gameBoard.querySelector('#personagem');
  const incrementoMovimento = 1;

  const andar = (direcao) => {
      const colisao = direcaoEstaDisponivel(direcao);

      switch (colisao) {
        case colisaoEnum.SEM_COLISAO:
          moverParaDirecao(direcao);
          break;
        case colisaoEnum.COLISAO_COM_DANO:
          globalVariables.gameOver();
          break;
    }
  };

  const posicaoEstaDisponivel = ({
    left: personagemLeft,
    top: personagemTop,
  }) => {
    const { width, height } = personagem.getBoundingClientRect();

    const personagemRight = personagemLeft + width;
    const personagemBottom = personagemTop + height;

    let colisao = colisaoEnum.SEM_COLISAO;
    globalVariables.listaObstaculos.forEach((obstaculo) => {
      const obstaculoLeft = obstaculo.posicaoX;
      const obstaculoRight = obstaculo.posicaoX + obstaculo.largura;
      const obstaculoTop = obstaculo.posicaoY;
      const obstaculoBottom = obstaculo.posicaoY + obstaculo.altura;

      let colidiu = true;
      colidiu &&=
        personagemLeft.estaEntre(obstaculoLeft, obstaculoRight) ||
        personagemRight.estaEntre(obstaculoLeft, obstaculoRight);
      colidiu &&=
        personagemTop.estaEntre(obstaculoTop, obstaculoBottom) ||
        personagemBottom.estaEntre(obstaculoTop, obstaculoBottom);
      if (colidiu) {
        if (obstaculo.provocaDanoAoEncostar) {
          colisao = colisaoEnum.COLISAO_COM_DANO;
        }

        if (colisao !== colisaoEnum.COLISAO_COM_DANO) {
          colisao = colisaoEnum.COLISAO_SEM_DANO;
        }
      }
    });

    return colisao;
  };

  const direcaoEstaDisponivel = (direcao) => {
    let { left, top } = personagem.getBoundingClientRect();

    switch (direcao) {
      case direcaoEnum.CIMA:
        top -= incrementoMovimento;
        break;
      case direcaoEnum.BAIXO:
        top += incrementoMovimento;
        break;
      case direcaoEnum.ESQUERDA:
        left -= incrementoMovimento;
        break;
      case direcaoEnum.DIREITA:
        left += incrementoMovimento;
        break;
    }

    return posicaoEstaDisponivel({ left, top });
  };

  const moverParaDirecao = (direcao) => {
    let {
      left: personagemLeft,
      top: personagemTop,
      width: larguraPersonagem,
      height: alturaPersonagem,
    } = personagem.getBoundingClientRect();

    switch (direcao) {
      case direcaoEnum.CIMA:
        personagemTop -= incrementoMovimento;
        break;
      case direcaoEnum.BAIXO:
        personagemTop += incrementoMovimento;
        break;
      case direcaoEnum.ESQUERDA:
        personagemLeft -= incrementoMovimento;
        break;
      case direcaoEnum.DIREITA:
        personagemLeft += incrementoMovimento;
        break;
    }

    const {
      left: telaLeft,
      top: telaTop,
      width: larguraTela,
      height: alturaTela,
    } = gameBoard.getBoundingClientRect();

    if (personagemLeft + larguraPersonagem < 0) {
      personagemLeft = telaLeft + larguraTela;
    }

    if (personagemLeft > telaLeft + larguraTela) {
      personagemLeft = -larguraPersonagem;
    }

    if (personagemTop + alturaPersonagem < 0) {
      personagemTop = telaTop + alturaTela;
    }

    if (personagemTop > telaTop + alturaTela) {
      personagemTop = -alturaPersonagem;
    }

    personagem.style.left = `${personagemLeft}px`;
    personagem.style.top = `${personagemTop}px`;
  };

  return {
    andar,
    direcaoEstaDisponivel,
    moverParaDirecao
  };
}

export default createMovimentoPersonagem;
