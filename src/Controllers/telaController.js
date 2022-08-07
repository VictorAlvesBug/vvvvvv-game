import tipoObjetoEnum from './../Enums/tipoObjetoEnum.js';
import GlobalVariables from './../GlobalVariables/GlobalVariables.js';
import listaTelas from '../../listaTelas.js';

const mapValue = (value, minIn, maxIn, minOut, maxOut) => {
  return ((value - minIn) / (maxIn - minIn)) * (maxOut - minOut) + minOut;
};

const criarTela = (gameBoard) => {
  const canvas = gameBoard.querySelector('#canvas');
  const contexto = canvas.getContext('2d');

const globalVariables = new GlobalVariables();
let geradorIdFrame = globalVariables.gerarIdFrame();
let idFrame = geradorIdFrame.next().value;

  // Tela inicial possui id = 2
  let telaAtual = listaTelas.find((tela) => tela.id === 2);

  const definirTela = (idTela) => {
    const novaTela = listaTelas.find((tela) => tela.id === idTela);

    if(!novaTela){
      return console.error(`Tela de ID = ${idTela} não encontrada.`);
    }
    telaAtual = novaTela;
    geradorIdFrame = globalVariables.gerarIdFrame();
  };

  const redimensionarCanvas = () => {
    canvas.width = gameBoard.getBoundingClientRect().width;
    canvas.height = gameBoard.getBoundingClientRect().height;
  };

  const limparCanvas = () => {
    contexto.clearRect(0, 0, canvas.width, canvas.height);
  };

  const limparListaObjetos = () => {
    globalVariables.listaObjetos = [];
  };

  const desenharPersonagem = (personagem) => {
    contexto.fillStyle = personagem.cor;
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
      x1,
      y1,
      x2,
      y2,
      x3,
      y3,
    };
  };

  const desenharEstruturaTela = () => {
    const qtdeColunas = 15;
    const qtdeLinhas = 14;

    const larguraBloco = canvas.width / (qtdeColunas - 1);
    const alturaBloco = canvas.height / (qtdeLinhas - 1);

    for (let linha = 0; linha < qtdeLinhas; linha++) {
      for (let coluna = 0; coluna < qtdeColunas; coluna++) {
        const indiceGrid = linha * qtdeColunas + coluna;
        const enumBloco = Number(telaAtual.grid[indiceGrid]);
        const posicaoX = -0.5 * larguraBloco + larguraBloco * coluna;
        const posicaoY = -0.5 * alturaBloco + alturaBloco * linha;

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
              id: globalVariables.gerarId(),
              posicaoX: posicaoX,
              posicaoY: posicaoY,
              largura: larguraBloco,
              altura: alturaBloco,
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
            contexto.beginPath();
            contexto.moveTo(coords.x1, coords.y1);
            contexto.lineTo(coords.x2, coords.y2);
            contexto.lineTo(coords.x3, coords.y3);
            contexto.lineTo(coords.x1, coords.y1);
            contexto.stroke();
            globalVariables.listaObjetos.push({
              id: globalVariables.gerarId(),
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
    const qtdeColunas = 15;
    const qtdeLinhas = 14;

    const larguraBloco = canvas.width / (qtdeColunas - 1);
    const alturaBloco = canvas.height / (qtdeLinhas - 1);

    const largura = larguraBloco * 0.8;
    const altura = alturaBloco * 0.8;

    telaAtual.listaInimigos.forEach((inimigo) => {
      let posicaoAtualInimigo = {};

      const frameInimigo =
        (200 * inimigo.porcentagemCaminhoInicio + idFrame) % 200;

      if (frameInimigo < 100) {
        posicaoAtualInimigo.X = mapValue(
          frameInimigo % 100,
          0,
          100,
          inimigo.posicaoA.X,
          inimigo.posicaoB.X
        );

        posicaoAtualInimigo.Y = mapValue(
          frameInimigo % 100,
          0,
          100,
          inimigo.posicaoA.Y,
          inimigo.posicaoB.Y
        );
      } else {
        posicaoAtualInimigo.X = mapValue(
          frameInimigo % 100,
          0,
          100,
          inimigo.posicaoB.X,
          inimigo.posicaoA.X
        );

        posicaoAtualInimigo.Y = mapValue(
          frameInimigo % 100,
          0,
          100,
          inimigo.posicaoB.Y,
          inimigo.posicaoA.Y
        );
      }

      const posicaoX =
        -0.4 * larguraBloco + larguraBloco * posicaoAtualInimigo.X;
      const posicaoY =
        -0.4 * alturaBloco + alturaBloco * posicaoAtualInimigo.Y;

      contexto.fillStyle = telaAtual.corInimigo;
      contexto.beginPath();
      contexto.rect(
        posicaoX,
        posicaoY,
        largura,
        altura
      );
      contexto.fill();
      globalVariables.listaObjetos.push({
        id: inimigo.id,
        posicaoX: posicaoX,
        posicaoY: posicaoY,
        largura: largura,
        altura: altura,
        tipo: tipoObjetoEnum.INIMIGO,
      });
    });
  };

  const desenharCheckpoints = () => {
    const qtdeColunas = 15;
    const qtdeLinhas = 14;

    const larguraBloco = canvas.width / (qtdeColunas - 1);
    const alturaBloco = canvas.height / (qtdeLinhas - 1);
    
    const largura = larguraBloco * 0.3;
  const altura = alturaBloco * 0.3;

  telaAtual.listaCheckpoints.forEach((checkpoint) => {
    contexto.fillStyle = '#eeeeee';
    contexto.beginPath();
    contexto.rect(
      checkpoint.posicaoX,
      checkpoint.posicaoY,
      largura,
      altura
    );
    //contexto.stroke();
    contexto.fill();
    globalVariables.listaObjetos.push({
      id: checkpoint.id,
      posicaoX: checkpoint.left,
      posicaoY: checkpoint.top,
      largura: largura,
      altura: altura,
      tipo: tipoObjetoEnum.CHECKPOINT,
    });
  });
  };

  const atualizar = (personagem) => {
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
    definirTela
  }
};

export default criarTela;
