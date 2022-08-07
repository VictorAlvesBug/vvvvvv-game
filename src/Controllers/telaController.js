import tipoObjetoEnum from './../Enums/tipoObjetoEnum.js';
import GlobalVariables from './../GlobalVariables/GlobalVariables.js';
import listaTelas from '../Telas/listaTelas.js';

const mapValue = (value, minIn, maxIn, minOut, maxOut) => {
  return ((value - minIn) / (maxIn - minIn)) * (maxOut - minOut) + minOut;
};

const criarTela = (gameBoard) => {
  const canvas = gameBoard.querySelector('#canvas');
  const contexto = canvas.getContext('2d');

  const globalVariables = new GlobalVariables();
  let geradorIdFrame = globalVariables.gerarIdFrame();
  const geradorId = globalVariables.gerarId();
  let idFrame = geradorIdFrame.next().value;

  let telaAtual = listaTelas.find(
    (tela) => tela.id === globalVariables.idTelaAtual
  );

  const redimensionarCanvas = () => {
    //canvas.width = gameBoard.getBoundingClientRect().width;
    //canvas.height = gameBoard.getBoundingClientRect().height;
    canvas.width = 1000;
    canvas.height = 1000;
  };

  const limparCanvas = () => {
    contexto.clearRect(0, 0, canvas.width, canvas.height);
  };

  const limparListaObjetos = () => {
    globalVariables.listaObjetos = [];
  };

  const desenharPersonagem = (personagem) => {
    contexto.fillStyle = personagem.vivo
      ? personagem.corVivo
      : personagem.corMorto;
    contexto.beginPath();
    contexto.rect(
      personagem.posicaoX,
      personagem.posicaoY,
      personagem.largura,
      personagem.altura
    );
    contexto.fill();
  };

  const retornarCoordenadasEspinho = (
    posicaoX,
    posicaoY,
    largura,
    altura,
    enumEspinho
  ) => {
    let x1, y1, x2, y2, x3, y3;

    switch (enumEspinho) {
      case tipoObjetoEnum.ESPINHO_CIMA:
        // Espinho em cima, apontando para baixo
        x1 = posicaoX;
        y1 = posicaoY;
        x2 = posicaoX + largura;
        y2 = posicaoY;
        x3 = posicaoX + largura / 2;
        y3 = posicaoY + altura;
        break;
      case tipoObjetoEnum.ESPINHO_BAIXO:
        // Espinho em baixo, apontando para cima
        x1 = posicaoX;
        y1 = posicaoY + altura;
        x2 = posicaoX + largura;
        y2 = posicaoY + altura;
        x3 = posicaoX + largura / 2;
        y3 = posicaoY;
        break;
      case tipoObjetoEnum.ESPINHO_ESQUERDA:
        // Espinho na esquerda, apontando para a direita
        x1 = posicaoX;
        y1 = posicaoY;
        x2 = posicaoX;
        y2 = posicaoY + altura;
        x3 = posicaoX + largura;
        y3 = posicaoY + altura / 2;
        break;
      case tipoObjetoEnum.ESPINHO_DIREITA:
        // Espinho na direita, apontando para a esquerda
        x1 = posicaoX + largura;
        y1 = posicaoY;
        x2 = posicaoX + largura;
        y2 = posicaoY + altura;
        x3 = posicaoX;
        y3 = posicaoY + altura / 2;
        break;

      default:
        return console.error(
          'Tipo de objeto não esperado, favor passar o tipo espinho.'
        );
        break;
    }

    return {
      x1: Math.round(x1),
      y1: Math.round(y1),
      x2: Math.round(x2),
      y2: Math.round(y2),
      x3: Math.round(x3),
      y3: Math.round(y3),
    };
  };

  const desenharEstruturaTela = () => {
    const qtdeColunas = 30;
    const qtdeLinhas = 30;

    const larguraBloco = Math.round(canvas.width / (qtdeColunas - 0));
    const alturaBloco = Math.round(canvas.height / (qtdeLinhas - 0));

    for (let linha = 0; linha < qtdeLinhas; linha++) {
      for (let coluna = 0; coluna < qtdeColunas; coluna++) {
        const indiceGrid = linha * qtdeColunas + coluna;
        const enumBloco = Number(telaAtual.grid[indiceGrid]);
        const posicaoX = Math.round(
          mapValue(coluna, 0, qtdeColunas, 0, canvas.width)
        );
        const posicaoY = Math.round(
          mapValue(linha, 0, qtdeLinhas, 0, canvas.height)
        );

        switch (enumBloco) {
          case tipoObjetoEnum.CHAO:
            contexto.fillStyle = telaAtual.corPrincipal;
            contexto.beginPath();
            contexto.rect(
              posicaoX,
              posicaoY,
              larguraBloco + 1,
              alturaBloco + 1
            );
            contexto.fill();
            globalVariables.listaObjetos.push({
              id: geradorId.next().value,
              posicaoX: posicaoX,
              posicaoY: posicaoY,
              largura: larguraBloco + 1,
              altura: alturaBloco + 1,
              tipo: enumBloco,
            });
            break;
          case tipoObjetoEnum.ESPINHO_CIMA:
          case tipoObjetoEnum.ESPINHO_BAIXO:
          case tipoObjetoEnum.ESPINHO_ESQUERDA:
          case tipoObjetoEnum.ESPINHO_DIREITA:
            contexto.strokeStyle = telaAtual.corPrincipal;
            const coords = retornarCoordenadasEspinho(
              posicaoX,
              posicaoY,
              larguraBloco,
              alturaBloco,
              enumBloco
            );
            contexto.lineWidth = 2;
            contexto.beginPath();
            contexto.moveTo(coords.x1, coords.y1);
            contexto.lineTo(coords.x2, coords.y2);
            contexto.lineTo(coords.x3, coords.y3);
            contexto.lineTo(coords.x1, coords.y1);
            contexto.stroke();
            globalVariables.listaObjetos.push({
              id: geradorId.next().value,
              posicaoX: posicaoX,
              posicaoY: posicaoY,
              largura: larguraBloco,
              altura: alturaBloco,
              tipo: enumBloco,
            });
            break;
        }
      }
    }
  };

  const desenharInimigos = () => {
    const qtdeColunas = 30;
    const qtdeLinhas = 30;

    const larguraBloco = canvas.width / (qtdeColunas - 1);
    const alturaBloco = canvas.height / (qtdeLinhas - 1);

    const largura = larguraBloco * 0.8;
    const altura = alturaBloco * 0.8;

    telaAtual.listaInimigos.forEach((inimigo) => {
      let posicaoAtualInimigo = {};

      const frameInimigo =
        (200 * inimigo.porcentagemCaminhoInicio + idFrame) % 200;

      if (frameInimigo < 100) {
        posicaoAtualInimigo.X = Math.round(
          mapValue(
            frameInimigo % 100,
            0,
            100,
            inimigo.posicaoA.X,
            inimigo.posicaoB.X
          )
        );

        posicaoAtualInimigo.Y = Math.round(
          mapValue(
            frameInimigo % 100,
            0,
            100,
            inimigo.posicaoA.Y,
            inimigo.posicaoB.Y
          )
        );
      } else {
        posicaoAtualInimigo.X = Math.round(
          mapValue(
            frameInimigo % 100,
            0,
            100,
            inimigo.posicaoB.X,
            inimigo.posicaoA.X
          )
        );

        posicaoAtualInimigo.Y = Math.round(
          mapValue(
            frameInimigo % 100,
            0,
            100,
            inimigo.posicaoB.Y,
            inimigo.posicaoA.Y
          )
        );
      }

      contexto.fillStyle = telaAtual.corInimigo;
      contexto.beginPath();
      contexto.rect(
        posicaoAtualInimigo.X,
        posicaoAtualInimigo.Y,
        largura,
        altura
      );
      contexto.fill();
      globalVariables.listaObjetos.push({
        id: inimigo.id,
        posicaoX: posicaoAtualInimigo.X,
        posicaoY: posicaoAtualInimigo.Y,
        largura: largura,
        altura: altura,
        tipo: tipoObjetoEnum.INIMIGO,
      });
    });
  };

  const desenharCheckpoints = () => {
    const larguraCheckpoint = 20;
    const alturaCheckpoint = 40;

    telaAtual.listaCheckpoints.forEach((checkpoint) => {
      const ehUltimoCheckpoint =
        checkpoint.id === globalVariables.idUltimoCheckpoint;
      contexto.fillStyle = ehUltimoCheckpoint ? '#dddddd' : '#666666';
      contexto.beginPath();
      contexto.rect(
        checkpoint.posicaoX,
        checkpoint.posicaoY,
        larguraCheckpoint,
        alturaCheckpoint
      );
      contexto.fill();
      globalVariables.listaObjetos.push({
        id: checkpoint.id,
        posicaoY: checkpoint.posicaoY,
        posicaoX: checkpoint.posicaoX,
        largura: larguraCheckpoint,
        altura: alturaCheckpoint,
        tipo: tipoObjetoEnum.CHECKPOINT,
      });
    });
  };

  const atualizar = (personagem) => {
    telaAtual = listaTelas.find(
      (tela) => tela.id === globalVariables.idTelaAtual
    );
    idFrame = geradorIdFrame.next().value;
    redimensionarCanvas();
    limparCanvas();
    limparListaObjetos();
    desenharPersonagem(personagem);
    desenharEstruturaTela();
    desenharInimigos();
    desenharCheckpoints();
  };

  return {
    atualizar,
  };
};

export default criarTela;
