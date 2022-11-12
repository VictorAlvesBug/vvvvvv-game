import tipoObjetoEnum from './../Enums/tipoObjetoEnum.js';
import GlobalVariables from './../GlobalVariables/GlobalVariables.js';
import listaTelas from '../Telas/listaTelas.js';

function regexIndexOf(texto, regex, offsetInicio) {
  var indice = texto.slice(offsetInicio).search(regex);
  return indice < 0 ? indice : indice + offsetInicio;
}

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

    const larguraBloco = canvas.width / (qtdeColunas - 0);
    const alturaBloco = canvas.height / (qtdeLinhas - 0);

    // Desenha blocos de chão, de forma que 2 ou mais blocos consecutivos sejam
    // representados por um mesmo retângulo
    for (let linha = 0; linha < qtdeLinhas; linha++) {
      // Define onde o retângulo vai começar verticalmente
      const posicaoY = globalVariables.mapValue(linha, 0, qtdeLinhas, 0, canvas.height);

      // Recupera apenas o trecho do grid que representa esta linha de blocos da tela
      const indiceInicio = linha * qtdeColunas;
      const indiceTermino = (linha + 1) * qtdeColunas;
      let blocosLinha = telaAtual.grid.slice(indiceInicio, indiceTermino);
      // Substitui tudo que NÃO for 1 para 0
      blocosLinha = blocosLinha.replaceAll(/[^1]/g, '0');

      // Enquanto existir algum bloco de chão não desenhado
      while (blocosLinha.includes('1')) {
        // Recupera os índices inicial e final do primeiro conjunto de chão
        const indiceInicioChao = regexIndexOf(blocosLinha, '1', 0);
        let indiceTerminoChao = regexIndexOf(blocosLinha, '10', 0);

        // Caso não tenha encontrado o índice final quer dizer que o último
        // bloco da linha é um chão, então usa o índice do último bloco da linha
        if (indiceTerminoChao === -1) {
          indiceTerminoChao = indiceTermino - 1;
        }

        // Calcula a quantidade de blocos de chão que o conjunto possui
        const qtdeBlocosChao = indiceTerminoChao - indiceInicioChao + 1;

        // Define onde o retângulo vai começar horizontalmente
        const posicaoX = globalVariables.mapValue(
          indiceInicioChao,
          0,
          qtdeColunas,
          0,
          canvas.width
        );

        // Desenha um retângulo único para o conjunto de chão's consecutivos
        contexto.fillStyle = telaAtual.corPrincipalChao;
        contexto.beginPath();
        contexto.rect(
          posicaoX,
          posicaoY,
          qtdeBlocosChao * larguraBloco + 1,
          alturaBloco + 1
        );
        contexto.fill();

        // Adiciona objeto de chão
        globalVariables.listaObjetos.push({
          id: geradorId.next().value,
          posicaoX: posicaoX,
          posicaoY: posicaoY,
          largura: qtdeBlocosChao * larguraBloco + 1,
          altura: alturaBloco + 1,
          tipo: tipoObjetoEnum.CHAO,
        });

        // Substituindo caracteres do trecho já desenhado para '0',
        // para ser desconsiderado na próxima iteração
        const trechoAntesChao = blocosLinha.slice(0, indiceInicioChao);
        const trechoChao = '0'.repeat(qtdeBlocosChao);
        const trechoDepoisChao = blocosLinha.slice(indiceTerminoChao + 1);
        blocosLinha = trechoAntesChao + trechoChao + trechoDepoisChao;
      }
    }

    // Desenha blocos de espinho
    for (let linha = 0; linha < qtdeLinhas; linha++) {
      const posicaoY = globalVariables.mapValue(linha, 0, qtdeLinhas, 0, canvas.height);

      for (let coluna = 0; coluna < qtdeColunas; coluna++) {
        const indiceGrid = linha * qtdeColunas + coluna;
        const enumBloco = Number(telaAtual.grid[indiceGrid]);
        const posicaoX = globalVariables.mapValue(coluna, 0, qtdeColunas, 0, canvas.width);

        switch (enumBloco) {
          case tipoObjetoEnum.ESPINHO_CIMA:
          case tipoObjetoEnum.ESPINHO_BAIXO:
          case tipoObjetoEnum.ESPINHO_ESQUERDA:
          case tipoObjetoEnum.ESPINHO_DIREITA:
            const coords = retornarCoordenadasEspinho(
              posicaoX,
              posicaoY,
              larguraBloco,
              alturaBloco,
              enumBloco
            );
            contexto.fillStyle = telaAtual.corBordaChao;
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

    // Desenha bordas do chão, de forma que a borda de 2 ou mais blocos sejam
    // representadas por um mesmo retângulo, desde que estejam alinhadas

    const espessuraBordaVertical = 9;
    const espessuraBordaHorizontal = 16;

    // Desenhando bordas superiores
    for (let linha = 1; linha < qtdeLinhas; linha++) {
      // Define onde o retângulo vai começar verticalmente
      const posicaoY = globalVariables.mapValue(linha, 0, qtdeLinhas, 0, canvas.height);

      // Recupera apenas o trecho do grid que representa esta linha
      const indiceInicio = linha * qtdeColunas;
      const indiceTermino = (linha + 1) * qtdeColunas;
      let blocosLinha = telaAtual.grid.slice(indiceInicio, indiceTermino);
      // Substitui tudo que NÃO for 1 para 0
      blocosLinha = blocosLinha.replaceAll(/[^1]/g, '0');

      // Recupera apenas o trecho do grid que representa a linha acima
      const indiceInicioCima = (linha - 1) * qtdeColunas;
      const indiceTerminoCima = linha * qtdeColunas;
      let blocosLinhaCima = telaAtual.grid.slice(
        indiceInicioCima,
        indiceTerminoCima
      );
      // Substitui tudo que NÃO for 1 para 0
      blocosLinhaCima = blocosLinhaCima.replaceAll(/[^1]/g, '0');

      while (blocosLinha.includes('1')) {
        let indiceInicioBorda = -1;
        let indiceTerminoBorda = -1;
        let anterioresTinhamBorda = false;

        for (let coluna = 0; coluna < qtdeColunas; coluna++) {
          const strBlocoAtual = blocosLinha[coluna];
          const strBlocoCima = blocosLinhaCima[coluna];
          if (strBlocoAtual === '1' && strBlocoCima === '0') {
            if (indiceInicioBorda === -1) {
              indiceInicioBorda = coluna;
              anterioresTinhamBorda = true;
            }
            if (anterioresTinhamBorda) {
              indiceTerminoBorda = coluna;
            }
          } else {
            anterioresTinhamBorda = false;
          }
        }

        // Calcula a quantidade de blocos de chão que o conjunto possui
        const qtdeBlocosBorda = indiceTerminoBorda - indiceInicioBorda + 1;

        // Define onde o retângulo vai começar horizontalmente
        const posicaoX = globalVariables.mapValue(
          indiceInicioBorda,
          0,
          qtdeColunas,
          0,
          canvas.width
        );
        if (indiceInicioBorda !== -1 && indiceTerminoBorda !== -1) {
          // Desenha um retângulo único para o conjunto de chão's consecutivos
          contexto.fillStyle = telaAtual.corBordaChao;
          contexto.beginPath();
          contexto.rect(
            posicaoX,
            posicaoY,
            qtdeBlocosBorda * larguraBloco + 1,
            espessuraBordaHorizontal + 1
          );
          contexto.fill();
        }

        let indiceInicioZerar = indiceInicioBorda;
        let indiceTerminoZerar = indiceTerminoBorda;
        let qtdeBlocosZerar = qtdeBlocosBorda;

        // Caso não tenha nenhuma borda para ser desenhada nessa linha
        if (indiceInicioBorda === -1 && indiceTerminoBorda === -1) {
          indiceInicioZerar = 0;
          indiceTerminoZerar = qtdeColunas;
          qtdeBlocosZerar = 30;
        }

        // Substituindo trecho já desenhado para '0',
        // para ser desconsiderado na próxima iteração
        const trechoBorda = '0'.repeat(indiceInicioZerar + qtdeBlocosZerar);
        const trechoDepoisBorda = blocosLinha.slice(indiceTerminoZerar + 1);
        blocosLinha = trechoBorda + trechoDepoisBorda;
      }
    }

    // Desenhando bordas inferiores
    for (let linha = 0; linha < qtdeLinhas - 1; linha++) {
      // Define onde o retângulo vai começar verticalmente
      const posicaoY =
      globalVariables.mapValue(linha + 1, 0, qtdeLinhas, 0, canvas.height) -
        espessuraBordaHorizontal;

      // Recupera apenas o trecho do grid que representa esta linha
      const indiceInicio = linha * qtdeColunas;
      const indiceTermino = (linha + 1) * qtdeColunas;
      let blocosLinha = telaAtual.grid.slice(indiceInicio, indiceTermino);
      // Substitui tudo que NÃO for 1 para 0
      blocosLinha = blocosLinha.replaceAll(/[^1]/g, '0');

      // Recupera apenas o trecho do grid que representa a linha abaixo
      const indiceInicioBaixo = (linha + 1) * qtdeColunas;
      const indiceTerminoBaixo = (linha + 2) * qtdeColunas;
      let blocosLinhaBaixo = telaAtual.grid.slice(
        indiceInicioBaixo,
        indiceTerminoBaixo
      );
      // Substitui tudo que NÃO for 1 para 0
      blocosLinhaBaixo = blocosLinhaBaixo.replaceAll(/[^1]/g, '0');

      while (blocosLinha.includes('1')) {
        let indiceInicioBorda = -1;
        let indiceTerminoBorda = -1;
        let anterioresTinhamBorda = false;

        for (let coluna = 0; coluna < qtdeColunas; coluna++) {
          const strBlocoAtual = blocosLinha[coluna];
          const strBlocoBaixo = blocosLinhaBaixo[coluna];
          if (strBlocoAtual === '1' && strBlocoBaixo === '0') {
            if (indiceInicioBorda === -1) {
              indiceInicioBorda = coluna;
              anterioresTinhamBorda = true;
            }
            if (anterioresTinhamBorda) {
              indiceTerminoBorda = coluna;
            }
          } else {
            anterioresTinhamBorda = false;
          }
        }

        // Calcula a quantidade de blocos de chão que o conjunto possui
        const qtdeBlocosBorda = indiceTerminoBorda - indiceInicioBorda + 1;

        // Define onde o retângulo vai começar horizontalmente
        const posicaoX = globalVariables.mapValue(
          indiceInicioBorda,
          0,
          qtdeColunas,
          0,
          canvas.width
        );

        if (indiceInicioBorda !== -1 && indiceTerminoBorda !== -1) {
          // Desenha um retângulo único para o conjunto de chão's consecutivos
          contexto.fillStyle = telaAtual.corBordaChao;
          contexto.beginPath();
          contexto.rect(
            posicaoX,
            posicaoY,
            qtdeBlocosBorda * larguraBloco + 1,
            espessuraBordaHorizontal + 1
          );
          contexto.fill();
        }

        let indiceInicioZerar = indiceInicioBorda;
        let indiceTerminoZerar = indiceTerminoBorda;
        let qtdeBlocosZerar = qtdeBlocosBorda;

        // Caso não tenha nenhuma borda para ser desenhada nessa linha
        if (indiceInicioBorda === -1 && indiceTerminoBorda === -1) {
          indiceInicioZerar = 0;
          indiceTerminoZerar = qtdeColunas;
          qtdeBlocosZerar = 30;
        }

        // Substituindo trecho já desenhado para '0',
        // para ser desconsiderado na próxima iteração
        const trechoBorda = '0'.repeat(indiceInicioZerar + qtdeBlocosZerar);
        const trechoDepoisBorda = blocosLinha.slice(indiceTerminoZerar + 1);
        blocosLinha = trechoBorda + trechoDepoisBorda;
      }
    }

    // Desenhando bordas da esquerda
    for (let linha = 0; linha < qtdeLinhas; linha++) {
      // Define onde o retângulo vai começar verticalmente
      const posicaoY = globalVariables.mapValue(linha, 0, qtdeLinhas, 0, canvas.height);

      for (let coluna = 1; coluna < qtdeColunas; coluna++) {
        const blocoAtual = telaAtual.grid[linha * qtdeColunas + coluna];
        const blocoEsquerda =
          telaAtual.grid[linha * qtdeColunas + (coluna - 1)];

        if (blocoAtual === '1' && blocoEsquerda !== '1') {
          // Define onde o retângulo vai começar verticalmente
          const posicaoX = globalVariables.mapValue(coluna, 0, qtdeColunas, 0, canvas.width);

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
      }
    }

    // Desenhando bordas da direita
    for (let linha = 0; linha < qtdeLinhas; linha++) {
      // Define onde o retângulo vai começar verticalmente
      const posicaoY = globalVariables.mapValue(linha, 0, qtdeLinhas, 0, canvas.height);

      for (let coluna = 0; coluna < qtdeColunas - 1; coluna++) {
        const blocoAtual = telaAtual.grid[linha * qtdeColunas + coluna];
        const blocoDireita = telaAtual.grid[linha * qtdeColunas + (coluna + 1)];

        if (blocoAtual === '1' && blocoDireita !== '1') {
          // Define onde o retângulo vai começar verticalmente
          const posicaoX = globalVariables.mapValue(coluna, 0, qtdeColunas, 0, canvas.width);

          contexto.fillStyle = telaAtual.corBordaChao;
          contexto.beginPath();
          contexto.rect(
            posicaoX + larguraBloco - espessuraBordaVertical,
            posicaoY,
            espessuraBordaVertical + 1,
            alturaBloco + 1
          );
          contexto.fill();
        }
      }
    }

    // Desenhando bordas
    contexto.fillStyle = telaAtual.corBordaChao;

    for (let linha = 0; linha < qtdeLinhas; linha++) {
      for (let coluna = 0; coluna < qtdeColunas; coluna++) {
        const indiceGrid = linha * qtdeColunas + coluna;
        const enumBloco = Number(telaAtual.grid[indiceGrid]);
        const posicaoX = globalVariables.mapValue(coluna, 0, qtdeColunas, 0, canvas.width);
        const posicaoY = globalVariables.mapValue(linha, 0, qtdeLinhas, 0, canvas.height);

        if (enumBloco === tipoObjetoEnum.CHAO) {
          let indiceGridCimaEsquerda = indiceGrid;
          let indiceGridBaixoEsquerda = indiceGrid;
          let indiceGridCimaDireita = indiceGrid;
          let indiceGridBaixoDireita = indiceGrid;

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

          if (telaAtual.grid[indiceGridCimaEsquerda] !== '1') {
            contexto.beginPath();
            contexto.rect(
              posicaoX,
              posicaoY,
              espessuraBordaVertical + 1,
              espessuraBordaHorizontal + 1
            );
            contexto.fill();
          }

          if (telaAtual.grid[indiceGridBaixoEsquerda] !== '1') {
            contexto.beginPath();
            contexto.rect(
              posicaoX,
              posicaoY + (alturaBloco - espessuraBordaHorizontal),
              espessuraBordaVertical + 1,
              espessuraBordaHorizontal + 1
            );
            contexto.fill();
          }

          if (telaAtual.grid[indiceGridCimaDireita] !== '1') {
            contexto.beginPath();
            contexto.rect(
              posicaoX + (larguraBloco - espessuraBordaVertical),
              posicaoY,
              espessuraBordaVertical + 1,
              espessuraBordaHorizontal + 1
            );
            contexto.fill();
          }

          if (telaAtual.grid[indiceGridBaixoDireita] !== '1') {
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

        if(inimigo.funcaoPosicao)
        {
          let [x, y] = inimigo.funcaoPosicao(frameInimigo/200)
          posicaoAtualInimigo.X = x;
          posicaoAtualInimigo.Y = y;
        }
        else
        {
          if (frameInimigo < 100) {
            posicaoAtualInimigo.X = Math.round(
              globalVariables.mapValue(
                frameInimigo % 100,
                0,
                100,
                inimigo.posicaoA.X,
                inimigo.posicaoB.X
              )
            );

            posicaoAtualInimigo.Y = Math.round(
              globalVariables.mapValue(
                frameInimigo % 100,
                0,
                100,
                inimigo.posicaoA.Y,
                inimigo.posicaoB.Y
              )
            );
          } else {
            posicaoAtualInimigo.X = Math.round(
              globalVariables.mapValue(
                frameInimigo % 100,
                0,
                100,
                inimigo.posicaoB.X,
                inimigo.posicaoA.X
              )
            );

            posicaoAtualInimigo.Y = Math.round(
              globalVariables.mapValue(
                frameInimigo % 100,
                0,
                100,
                inimigo.posicaoB.Y,
                inimigo.posicaoA.Y
              )
            );
          }
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
