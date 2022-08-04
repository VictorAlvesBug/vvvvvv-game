import { tipoObjetoEnum } from './utilEnums.js';
import GlobalVariables from './GlobalVariables.js';
import listaTelas from './listaTelas.js';

const mapValue = (value, minIn, maxIn, minOut, maxOut) => {
  return ((value - minIn) / (maxIn - minIn)) * (maxOut - minOut) + minOut;
};

const globalVariables = new GlobalVariables();
const geradorNumeroFrame = globalVariables.gerarNumeroFrame();

const desenharTela = (gameBoard) => {
  const numeroFrame = geradorNumeroFrame.next().value;
  const canvas = gameBoard.querySelector('#canvas');
  canvas.width = gameBoard.getBoundingClientRect().width;
  canvas.height = gameBoard.getBoundingClientRect().height;
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);

  const qtdeColunasChao = 15;
  const qtdeLinhasChao = 14;

  const telaAtual = listaTelas.find((tela) => tela.id === 2);
  const larguraChao = canvas.width / (qtdeColunasChao - 1);
  const alturaChao = canvas.height / (qtdeLinhasChao - 1);

  //console.log(globalVariables.personagem)
  context.fillStyle = globalVariables.personagem.cor;
        context.beginPath();
        context.rect(
          globalVariables.personagem.left,
          globalVariables.personagem.top,
          globalVariables.personagem.largura,
          globalVariables.personagem.altura
        );
        context.fill();

  globalVariables.listaObjetos = globalVariables.listaObjetos.filter(
    (obj) => obj.tipo !== tipoObjetoEnum.CHAO
  );

  for (let linha = 0; linha < qtdeLinhasChao; linha++) {
    for (let coluna = 0; coluna < qtdeColunasChao; coluna++) {
      const temChao =
        telaAtual.gridChao[linha * qtdeColunasChao + coluna] === '1';

      if (temChao) {
        const posicaoChaoX = -0.5 * larguraChao + larguraChao * coluna;
        const posicaoChaoY = -0.5 * alturaChao + alturaChao * linha;
        context.fillStyle = '#edf190';
        context.beginPath();
        context.rect(
          posicaoChaoX,
          posicaoChaoY,
          larguraChao + 1,
          alturaChao + 1
        );
        context.fill();
        globalVariables.listaObjetos.push({
          id: globalVariables.gerarId(),
          posicaoX: posicaoChaoX,
          posicaoY: posicaoChaoY,
          largura: larguraChao,
          altura: alturaChao,
          tipo: tipoObjetoEnum.CHAO,
        });
      }
    }
  }

  const larguraInimigo = larguraChao * 0.8;
  const alturaInimigo = alturaChao * 0.8;

  telaAtual.listaInimigos.forEach((inimigo) => {
    globalVariables.listaObjetos = globalVariables.listaObjetos.filter(
      (obj) => obj.id !== inimigo.id
    );

    let posicaoAtualInimigo = {};

    const frameInimigo =
      (200 * inimigo.porcentagemCaminhoInicio + numeroFrame) % 200;

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

    const posicaoInimigoX =
      -0.4 * larguraChao + larguraChao * posicaoAtualInimigo.X;
    const posicaoInimigoY =
      -0.4 * alturaChao + alturaChao * posicaoAtualInimigo.Y;

    context.fillStyle = '#f2f012';
    context.beginPath();
    context.rect(
      posicaoInimigoX,
      posicaoInimigoY,
      larguraInimigo,
      alturaInimigo
    );
    //context.stroke();
    context.fill();
    globalVariables.listaObjetos.push({
      id: inimigo.id,
      posicaoX: posicaoInimigoX,
      posicaoY: posicaoInimigoY,
      largura: larguraInimigo,
      altura: alturaInimigo,
      tipo: tipoObjetoEnum.INIMIGO,
    });
  });
  
  const larguraCheckPoint = larguraChao * 0.3;
  const alturaCheckPoint = alturaChao * 0.3;


  telaAtual.listaCheckPoints.forEach(checkPoint => {
    context.fillStyle = '#eeeeee';
    context.beginPath();
    context.rect(
      checkPoint.left,
      checkPoint.top,
      larguraCheckPoint,
      alturaCheckPoint
    );
    //context.stroke();
    context.fill();
    globalVariables.listaObjetos.push({
      id: checkPoint.id,
      posicaoX: checkPoint.left,
      posicaoY: checkPoint.top,
      largura: larguraCheckPoint,
      altura: alturaCheckPoint,
      tipo: tipoObjetoEnum.CHECKPOINT,
    });
  });
};

export { desenharTela };
