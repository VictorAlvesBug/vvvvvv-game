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
    canvas.width = 2000;
    canvas.height = 2000;
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

    const adicionalPonta = 50;

    switch (enumEspinho) {
      case tipoObjetoEnum.ESPINHO_CIMA:
        // Espinho em cima, apontando para baixo
        x1 = posicaoX;
        y1 = posicaoY;
        x2 = posicaoX + largura;
        y2 = posicaoY;
        x3 = posicaoX + largura / 2;
        y3 = posicaoY + altura + adicionalPonta;
        break;
      case tipoObjetoEnum.ESPINHO_BAIXO:
        // Espinho em baixo, apontando para cima
        x1 = posicaoX;
        y1 = posicaoY + altura;
        x2 = posicaoX + largura;
        y2 = posicaoY + altura;
        x3 = posicaoX + largura / 2;
        y3 = posicaoY - adicionalPonta;
        break;
      case tipoObjetoEnum.ESPINHO_ESQUERDA:
        // Espinho na esquerda, apontando para a direita
        x1 = posicaoX;
        y1 = posicaoY;
        x2 = posicaoX;
        y2 = posicaoY + altura;
        x3 = posicaoX + largura + adicionalPonta;
        y3 = posicaoY + altura / 2;
        break;
      case tipoObjetoEnum.ESPINHO_DIREITA:
        // Espinho na direita, apontando para a esquerda
        x1 = posicaoX + largura;
        y1 = posicaoY;
        x2 = posicaoX + largura;
        y2 = posicaoY + altura;
        x3 = posicaoX - adicionalPonta;
        y3 = posicaoY + altura / 2;
        break;

      default:
        return console.error(
          'Tipo de objeto não esperado, favor passar o tipo espinho.'
        );
    }

    return {
      x1: Math.round(x1),
      y1: Math.round(y1),
      x2: Math.round(x2),
      y2: Math.round(y2),
      x3: Math.round(x3),
      y3: Math.round(y3),
      xMin: Math.min(x1, x2, x3),
      xMax: Math.max(x1, x2, x3),
      yMin: Math.min(y1, y2, y3),
      yMax: Math.max(y1, y2, y3),
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
            contexto.fillStyle = telaAtual.corPrincipalChao;
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
            contexto.fillStyle = telaAtual.corBordaChao;
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
            contexto.fill();
            globalVariables.listaObjetos.push({
              id: geradorId.next().value,
              posicaoX: coords.xMin,
              posicaoY: coords.yMin,
              largura: coords.xMax - coords.xMin,
              altura: coords.yMax - coords.yMin,
              tipo: enumBloco,
            });
            break;
        }
      }
    }

    // Desenhando bordas
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

        if (enumBloco === tipoObjetoEnum.CHAO) {
          let indiceGridCima = indiceGrid;
          let indiceGridBaixo = indiceGrid;
          let indiceGridEsquerda = indiceGrid;
          let indiceGridDireita = indiceGrid;
          let indiceGridCimaEsquerda = indiceGrid;
          let indiceGridBaixoEsquerda = indiceGrid;
          let indiceGridCimaDireita = indiceGrid;
          let indiceGridBaixoDireita = indiceGrid;

          if (linha - 1 >= 0) {
            indiceGridCima = (linha - 1) * qtdeColunas + coluna;
          }

          if (linha + 1 < qtdeLinhas) {
            indiceGridBaixo = (linha + 1) * qtdeColunas + coluna;
          }

          if (coluna - 1 >= 0) {
            indiceGridEsquerda = linha * qtdeColunas + (coluna - 1);
          }

          if (coluna + 1 < qtdeColunas) {
            indiceGridDireita = linha * qtdeColunas + (coluna + 1);
          }

          if (linha - 1 >= 0 && coluna - 1 >= 0) {
            indiceGridCimaEsquerda = (linha - 1) * qtdeColunas + (coluna - 1);
          }

          if (linha + 1 < qtdeLinhas && coluna - 1 >= 0) {
            indiceGridBaixoEsquerda = (linha + 1) * qtdeColunas + (coluna - 1);
          }

          if (linha - 1 >= 0 && coluna + 1 < qtdeColunas) {
            indiceGridCimaDireita = (linha - 1) * qtdeColunas + (coluna + 1);
          }

          if (linha + 1 < qtdeLinhas && coluna + 1 < qtdeColunas) {
            indiceGridBaixoDireita = (linha + 1) * qtdeColunas + (coluna + 1);
          }

          const espessuraBordaVertical = 9;
          const espessuraBordaHorizontal = 16;

          if (Number(telaAtual.grid[indiceGridCima]) !== tipoObjetoEnum.CHAO) {
            contexto.fillStyle = telaAtual.corBordaChao;
            contexto.beginPath();
            contexto.rect(
              posicaoX,
              posicaoY,
              larguraBloco + 1,
              espessuraBordaHorizontal + 1
            );
            contexto.fill();
          }

          if (Number(telaAtual.grid[indiceGridBaixo]) !== tipoObjetoEnum.CHAO) {
            contexto.fillStyle = telaAtual.corBordaChao;
            contexto.beginPath();
            contexto.rect(
              posicaoX,
              posicaoY + (alturaBloco - espessuraBordaHorizontal),
              larguraBloco + 1,
              espessuraBordaHorizontal + 1
            );
            contexto.fill();
          }

          if (
            Number(telaAtual.grid[indiceGridEsquerda]) !== tipoObjetoEnum.CHAO
          ) {
            contexto.fillStyle = telaAtual.corBordaChao;
            contexto.beginPath();
            contexto.rect(
              posicaoX,
              posicaoY,
              espessuraBordaVertical + 1,
              alturaBloco + 1
            );
            contexto.fill();
          }

          if (
            Number(telaAtual.grid[indiceGridDireita]) !== tipoObjetoEnum.CHAO
          ) {
            contexto.fillStyle = telaAtual.corBordaChao;
            contexto.beginPath();
            contexto.rect(
              posicaoX + (larguraBloco - espessuraBordaVertical),
              posicaoY,
              espessuraBordaVertical + 1,
              alturaBloco + 1
            );
            contexto.fill();
          }

          if (
            Number(telaAtual.grid[indiceGridCimaEsquerda]) !==
            tipoObjetoEnum.CHAO
          ) {
            contexto.fillStyle = telaAtual.corBordaChao;
            contexto.beginPath();
            contexto.rect(
              posicaoX,
              posicaoY,
              espessuraBordaVertical + 1,
              espessuraBordaHorizontal + 1
            );
            contexto.fill();
          }

          if (
            Number(telaAtual.grid[indiceGridBaixoEsquerda]) !==
            tipoObjetoEnum.CHAO
          ) {
            contexto.fillStyle = telaAtual.corBordaChao;
            contexto.beginPath();
            contexto.rect(
              posicaoX,
              posicaoY + (alturaBloco - espessuraBordaHorizontal),
              espessuraBordaVertical + 1,
              espessuraBordaHorizontal + 1
            );
            contexto.fill();
          }

          if (
            Number(telaAtual.grid[indiceGridCimaDireita]) !==
            tipoObjetoEnum.CHAO
          ) {
            contexto.fillStyle = telaAtual.corBordaChao;
            contexto.beginPath();
            contexto.rect(
              posicaoX + (larguraBloco - espessuraBordaVertical),
              posicaoY,
              espessuraBordaVertical + 1,
              espessuraBordaHorizontal + 1
            );
            contexto.fill();
          }

          if (
            Number(telaAtual.grid[indiceGridBaixoDireita]) !==
            tipoObjetoEnum.CHAO
          ) {
            contexto.fillStyle = telaAtual.corBordaChao;
            contexto.beginPath();
            contexto.rect(
              posicaoX + (larguraBloco - espessuraBordaVertical),
              posicaoY + (alturaBloco - espessuraBordaHorizontal),
              espessuraBordaVertical + 1,
              espessuraBordaHorizontal + 1
            );
            contexto.fill();
          }
        }
      }
    }
  };

  const desenharInimigos = () => {
    const qtdeColunas = 30;
    const qtdeLinhas = 30;

    const larguraBloco = canvas.width / (qtdeColunas - 1);
    const alturaBloco = canvas.height / (qtdeLinhas - 1);

    const largura = larguraBloco * 1.6;
    const altura = alturaBloco * 2;

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
    const larguraCheckpoint = 35;
    const alturaCheckpoint = 80;

    telaAtual.listaCheckpoints.forEach((checkpoint) => {
      const ehUltimoCheckpoint =
        checkpoint.id === globalVariables.idUltimoCheckpoint;
      contexto.fillStyle = ehUltimoCheckpoint ? '#bbbbbb' : '#555555';
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
    desenharEstruturaTela();
    desenharInimigos();
    desenharCheckpoints();
    desenharPersonagem(personagem);
  };

  return {
    atualizar,
  };
};

export default criarTela;
