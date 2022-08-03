import GlobalVariables from './GlobalVariables.js';

const globalVariables = new GlobalVariables();

const listaTelas = [];

listaTelas.push({
  id: 2,
  gridChao:
    '111001111111111' +
    '111001011111011' +
    '111001011111011' +
    '111000000000001' +
    '111000000000001' +
    '111000000000001' +
    '111111111011001' +
    '111111111011001' +
    '111000000000001' +
    '111000000000001' +
    '111000000000001' +
    '111001011111111' +
    '111001011111111' +
    '111001111111111',
  listaInimigos: [
    {
      id: globalVariables.gerarId(),
      posicaoA: {
        X: 6,
        Y: 1,
      },
      posicaoB: {
        X: 6,
        Y: 5,
      },
      porcentagemCaminhoInicio: 0,
      velocidade: 1,
    },
    {
      id: globalVariables.gerarId(),
      posicaoA: {
        X: 12,
        Y: 1,
      },
      posicaoB: {
        X: 12,
        Y: 5,
      },
      porcentagemCaminhoInicio: 0.4,
      velocidade: 1,
    },
    {
      id: globalVariables.gerarId(),
      posicaoA: {
        X: 9,
        Y: 3,
      },
      posicaoB: {
        X: 9,
        Y: 5,
      },
      porcentagemCaminhoInicio: 1,
      velocidade: 1,
    },
    {
      id: globalVariables.gerarId(),
      posicaoA: {
        X: 9,
        Y: 10,
      },
      posicaoB: {
        X: 9,
        Y: 8,
      },
      porcentagemCaminhoInicio: 1,
      velocidade: 1,
    },
  ],
  listaCheckPoints: [
    {
      id: globalVariables.gerarId(),
      X: 3.5,
      Y: 5
    },
    {
      id: globalVariables.gerarId(),
      X: 3.5,
      Y: 8
    },
  ],
  idTelaCima: 2,
  idTelaBaixo: 2,
});

listaTelas.forEach(tela => {
    globalVariables.listaTodosCheckPoints.concat(tela.listaCheckPoints)
});

export default listaTelas;
