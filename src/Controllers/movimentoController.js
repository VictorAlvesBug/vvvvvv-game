import direcaoEnum from './../Enums/direcaoEnum.js';
import tipoObjetoEnum from './../Enums/tipoObjetoEnum.js';
import GlobalVariables from './../GlobalVariables/GlobalVariables.js';
import listaTelas from '../Telas/listaTelas.js';

Number.prototype.estaEntre = function (minimo, maximo) {
  return this >= minimo && this <= maximo;
};

function criarMovimento(gameBoard) {
  const globalVariables = new GlobalVariables();
  const incrementoMovimento = 1;
  let gravidadeInvertida = false;
  let podeAlterarGravidade = true;

  let telaAtual = listaTelas.find(
    (tela) => tela.id === globalVariables.idTelaAtual
  );

  const retornarDirecaoGravidade = () => {
    return gravidadeInvertida ? direcaoEnum.CIMA : direcaoEnum.BAIXO;
  };

  const retornarDirecaoContraria = (direcao) => {
    switch (direcao) {
      case direcaoEnum.CIMA:
        return direcaoEnum.BAIXO;
      case direcaoEnum.BAIXO:
        return direcaoEnum.CIMA;
      case direcaoEnum.ESQUERDA:
        return direcaoEnum.DIREITA;
      case direcaoEnum.DIREITA:
        return direcaoEnum.ESQUERDA;
    }
  };

  const alternarGravidade = (personagem) => {
    if (podeAlterarGravidade && !atravessouChao(personagem)) {
      gravidadeInvertida = !gravidadeInvertida;
      podeAlterarGravidade = false;
    }
  };

  const tentarMover = (direcao, personagem) => {
    let ehDirecaoGravidade = false;
    if (direcao === direcaoEnum.GRAVIDADE) {
      direcao = retornarDirecaoGravidade();
      ehDirecaoGravidade = true;
    }

    const personagemNovaPosicao = simularMovimentoNaDirecao(
      direcao,
      personagem
    );
    const listaObjetosEmContato = retornarObjetosEmContato(
      personagemNovaPosicao
    );

    const estaNoChao = listaObjetosEmContato.some((obj) => {
      const tiposConsiderar = [tipoObjetoEnum.CHAO, tipoObjetoEnum.PLATAFORMA];
      return tiposConsiderar.includes(obj.tipo);
    });

    const sofreuDano = listaObjetosEmContato.some((obj) => {
      const tiposConsiderar = [
        tipoObjetoEnum.ESPINHO_CIMA,
        tipoObjetoEnum.ESPINHO_BAIXO,
        tipoObjetoEnum.ESPINHO_ESQUERDA,
        tipoObjetoEnum.ESPINHO_DIREITA,
        tipoObjetoEnum.INIMIGO,
      ];
      return tiposConsiderar.includes(obj.tipo);
    });

    const checkpointEmContato = listaObjetosEmContato.find((obj) => {
      const tiposConsiderar = [tipoObjetoEnum.CHECKPOINT];
      return tiposConsiderar.includes(obj.tipo);
    });

    if (estaNoChao) {
      if (atravessouChao(personagem)) {
        const direcaoContraria = retornarDirecaoContraria(direcao);
        moverParaDirecao(direcaoContraria, personagem);
        podeAlterarGravidade = false;
      } else if (ehDirecaoGravidade) {
        podeAlterarGravidade = true;
      }
    }

    if (!estaNoChao && !sofreuDano) {
      moverParaDirecao(direcao, personagem);
      if (ehDirecaoGravidade) {
        podeAlterarGravidade = false;
      }
    }

    if (sofreuDano) {
      gravidadeInvertida = globalVariables.gameOver(personagem);
    }

    if (
      checkpointEmContato &&
      podeAlterarGravidade &&
      globalVariables.idUltimoCheckpoint !== checkpointEmContato.id
    ) {
      globalVariables.idUltimoCheckpoint = checkpointEmContato.id;
      globalVariables.gravidadeUltimoCheckpoint = gravidadeInvertida;
      globalVariables.idTelaUltimoCheckpoint = globalVariables.idTelaAtual;
    }
  };

  const atravessouChao = (personagem) => {
    const estaSobreChao = retornarObjetosEmContato(personagem).some(
      (obj) => obj.tipo === tipoObjetoEnum.CHAO
    );

    return estaSobreChao && telaAtual.id === globalVariables.idTelaAtual;
  };

  const simularMovimentoNaDirecao = (direcao, personagem) => {
    const personagemNovaPosicao = { ...personagem };
    switch (direcao) {
      case direcaoEnum.CIMA:
        personagemNovaPosicao.posicaoY -= incrementoMovimento;
        break;
      case direcaoEnum.BAIXO:
        personagemNovaPosicao.posicaoY += incrementoMovimento;
        break;
      case direcaoEnum.ESQUERDA:
        personagemNovaPosicao.posicaoX -= incrementoMovimento;
        break;
      case direcaoEnum.DIREITA:
        personagemNovaPosicao.posicaoX += incrementoMovimento;
        break;
    }

    return personagemNovaPosicao;
  };

  const retornarObjetosEmContato = (personagem) => {
    const personagemRight = personagem.posicaoX + personagem.largura;
    const personagemBottom = personagem.posicaoY + personagem.altura;

    let listaObjetosEmContato = [];
    globalVariables.listaObjetos.forEach((objeto) => {
      const objetoRight = objeto.posicaoX + objeto.largura;
      const objetoBottom = objeto.posicaoY + objeto.altura;

      let estaEmContato =
        ((personagem.posicaoX.estaEntre(objeto.posicaoX, objetoRight) ||
          personagemRight.estaEntre(objeto.posicaoX, objetoRight)) &&
          (personagem.posicaoY.estaEntre(objeto.posicaoY, objetoBottom) ||
            personagemBottom.estaEntre(objeto.posicaoY, objetoBottom))) ||
        ((objeto.posicaoX.estaEntre(personagem.posicaoX, personagemRight) ||
          objetoRight.estaEntre(personagem.posicaoX, personagemRight)) &&
          (objeto.posicaoY.estaEntre(personagem.posicaoY, personagemBottom) ||
            objetoBottom.estaEntre(personagem.posicaoY, personagemBottom)));

      if (estaEmContato) {
        listaObjetosEmContato.push(objeto);
      }
    });

    return listaObjetosEmContato;
  };

  const moverParaDirecao = (direcao, personagem) => {
    switch (direcao) {
      case direcaoEnum.CIMA:
        personagem.posicaoY -= incrementoMovimento;
        break;
      case direcaoEnum.BAIXO:
        personagem.posicaoY += incrementoMovimento;
        break;
      case direcaoEnum.ESQUERDA:
        personagem.posicaoX -= incrementoMovimento;
        break;
      case direcaoEnum.DIREITA:
        personagem.posicaoX += incrementoMovimento;
        break;
    }

    const { width: larguraTela, height: alturaTela } =
      gameBoard.querySelector('#canvas');

    telaAtual = listaTelas.find(
      (tela) => tela.id === globalVariables.idTelaAtual
    );

    if (personagem.posicaoX + personagem.largura < 0) {
      personagem.posicaoX = 0 + larguraTela;
      globalVariables.idTelaAtual = telaAtual.idTelaEsquerda;
    }
    else if (personagem.posicaoX > 0 + larguraTela) {
      personagem.posicaoX = -personagem.largura;
      globalVariables.idTelaAtual = telaAtual.idTelaDireita;
    }
    else if (personagem.posicaoY + personagem.altura < 0) {
      personagem.posicaoY = 0 + alturaTela;
      globalVariables.idTelaAtual = telaAtual.idTelaCima;
    }
    else if (personagem.posicaoY > 0 + alturaTela) {
      personagem.posicaoY = -personagem.altura;
      globalVariables.idTelaAtual = telaAtual.idTelaBaixo;
    }
    
    return personagem;
  };

  return {
    alternarGravidade,
    tentarMover,
    moverParaDirecao,
    atravessouChao,
  };
}

export default criarMovimento;
