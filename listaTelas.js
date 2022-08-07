import GlobalVariables from './src/GlobalVariables/GlobalVariables.js';

const globalVariables = new GlobalVariables();

const listaTelas = [];

listaTelas.push({
  id: 2,
  grid:
    '111001111111111' +
    '111001211111211' +
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
    '111001311111111' +
    '111001111111111',
  corPrincipal: '#edf190',
  corInimigo: '#f2f012',
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
  listaCheckpoints: [
    {
      id: globalVariables.gerarId(),
      posicaoX: 284,
      posicaoY: 244,
    },
    {
      id: globalVariables.gerarId(),
      posicaoX: 284,
      posicaoY: 452,
    },
  ],
  idTelaCima: 2,
  idTelaBaixo: 2,
});

listaTelas.forEach(tela => {
    globalVariables.listaTodosCheckpoints.concat(tela.listaCheckpoints)
});

export default listaTelas;
