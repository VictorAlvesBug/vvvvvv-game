import { direcaoEnum, tipoObjetoEnum } from './utilEnums.js';
import GlobalVariables from './GlobalVariables.js';

Number.prototype.estaEntre = function (minimo, maximo) {
  return this >= minimo && this <= maximo;
};

function createMovimentoPersonagem(gameBoard) {
  const globalVariables = new GlobalVariables();
  const incrementoMovimento = 1;

  const andar = (direcao) => {
    const colisao = direcaoEstaDisponivel(direcao);

    switch (colisao) {
      case tipoObjetoEnum.NADA:
        case tipoObjetoEnum.CHECKPOINT:
        moverParaDirecao(direcao);
        break;
      case tipoObjetoEnum.INIMIGO:
      case tipoObjetoEnum.ESPINHO:
        globalVariables.gameOver();
        break;
    }
  };

  const posicaoEstaDisponivel = ({
    left: personagemLeft,
    top: personagemTop,
  }) => {
    const { largura, altura } = globalVariables.personagem;

    const personagemRight = personagemLeft + largura;
    const personagemBottom = personagemTop + altura;

    let colisao = tipoObjetoEnum.NADA;
    globalVariables.listaObjetos.forEach((objeto) => {
      const objetoLeft = objeto.posicaoX;
      const objetoRight = objeto.posicaoX + objeto.largura;
      const objetoTop = objeto.posicaoY;
      const objetoBottom = objeto.posicaoY + objeto.altura;

      let colidiu =
      ((personagemLeft.estaEntre(objetoLeft, objetoRight) 
      || personagemRight.estaEntre(objetoLeft, objetoRight)) 
      && (personagemTop.estaEntre(objetoTop, objetoBottom) 
      || personagemBottom.estaEntre(objetoTop, objetoBottom))) 
      || 
      ((objetoLeft.estaEntre(personagemLeft, personagemRight) 
      || objetoRight.estaEntre(personagemLeft, personagemRight)) 
      && (objetoLeft.estaEntre(personagemTop, personagemBottom) 
      || objetoRight.estaEntre(personagemTop, personagemBottom)));
      if (colidiu) {
        switch (objeto.tipo) {
          case tipoObjetoEnum.CHAO: 
          if (colisao !== tipoObjetoEnum.INIMIGO) {
            colisao = objeto.tipo;
          }
          break;
          
          case tipoObjetoEnum.INIMIGO: 
            colisao = objeto.tipo;
          break;
          
          case tipoObjetoEnum.PLATAFORMA: 
          break;
          
          case tipoObjetoEnum.ESPINHO: 
          break;
          
          case tipoObjetoEnum.CHECKPOINT: 
          if (colisao !== tipoObjetoEnum.INIMIGO) {
            colisao = objeto.tipo;
            globalVariables.idUltimoCheckPoint = objeto.id;
          }
          break;
        }
/*
        if (objeto.tipo === tipoObjetoEnum.INIMIGO) {
          colisao = objeto.tipo;
        } else if (
          objeto.tipo === tipoObjetoEnum.CHAO &&
          colisao !== tipoObjetoEnum.INIMIGO
        ) {
          colisao = tipoObjetoEnum.CHAO;
        }*/
      }
    });

    return colisao;
  };

  const direcaoEstaDisponivel = (direcao) => {
    let { left, top } = globalVariables.personagem;

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
      largura: larguraPersonagem,
      altura: alturaPersonagem,
    } = globalVariables.personagem;

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

    globalVariables.personagem.left = personagemLeft;
    globalVariables.personagem.top = personagemTop;
  };

  return {
    andar,
    direcaoEstaDisponivel,
    moverParaDirecao,
  };
}

export default createMovimentoPersonagem;
