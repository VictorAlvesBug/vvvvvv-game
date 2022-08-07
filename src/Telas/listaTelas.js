import GlobalVariables from '../GlobalVariables/GlobalVariables.js';

const globalVariables = new GlobalVariables();
const geradorId = globalVariables.gerarId();

const listaTelas = [];

listaTelas.push({
  id: 1,
  grid:
    '111111000011111111111111111111' +
    '111111000011221111111111221111' +
    '111111000011001111111111001111' +
    '111111000011001111111111001111' +
    '111111000011001111111111001111' +
    '111111000000000000000000000011' +
    '111111000000000000000000000011' +
    '111111000000000000000000000011' +
    '111111000000000000000000000011' +
    '111111000000000000000000000011' +
    '111111000000000000000000000011' +
    '111111000000000000000000000011' +
    '111111000000000000000000000011' +
    '111111111111111111001111000011' +
    '111111111111111111001111000011' +
    '111111111111111111001111000011' +
    '111111111111111111001111000011' +
    '111111000000000000000000000011' +
    '111111000000000000000000000011' +
    '111111000000000000000000000011' +
    '111111000000000000000000000011' +
    '111111000000000000000000000011' +
    '111111000000000000000000000011' +
    '111111000000000000000000000011' +
    '111111000000000000000000000011' +
    '111111000011001111111111111111' +
    '111111000011001111111111111111' +
    '111111000011001111111111111111' +
    '111111000011331111111111111111' +
    '111111000011111111111111111111',
  corPrincipal: '#edf190',
  corInimigo: '#f2f012',
  listaInimigos: [
    {
      id: geradorId.next().value,
      posicaoA: {
        X: 840,
        Y: 240,
      },
      posicaoB: {
        X: 840,
        Y: 780,
      },
      porcentagemCaminhoInicio: 0,
      velocidade: 1,
    },
    {
      id: geradorId.next().value,
      posicaoA: {
        X: 1638,
        Y: 240,
      },
      posicaoB: {
        X: 1638,
        Y: 1500,
      },
      porcentagemCaminhoInicio: 0.4,
      velocidade: 1,
    },
    {
      id: geradorId.next().value,
      posicaoA: {
        X: 1240,
        Y: 1040,
      },
      posicaoB: {
        X: 1240,
        Y: 1500,
      },
      porcentagemCaminhoInicio: 1,
      velocidade: 1,
    },
  ],
  listaCheckpoints: [
    {
      id: geradorId.next().value,
      posicaoX: 500,
      posicaoY: 778,
    },
    {
      id: geradorId.next().value,
      posicaoX: 500,
      posicaoY: 1144,
    },
  ],
  idTelaCima: 2,
  idTelaBaixo: 6,
});

listaTelas.push({
  id: 2,
  grid:
    '111111111111111111111111111111' +
    '111111111111111111111111111111' +
    '111111111111111111111111111111' +
    '111111111111111111111111111111' +
    '111111111111111111111111111111' +
    '111111111111111111111111111111' +
    '111111111111111111111111111111' +
    '111111111111111111111111111111' +
    '111111111111111111111111111111' +
    '111111111111111111111111111111' +
    '111111000000000000000000000000' +
    '111111000000000000000000000000' +
    '111111000000000000000000000000' +
    '111111000000000000000000000000' +
    '111111000000000000000000000000' +
    '111111000000000000000000000000' +
    '111111000000000000000000000000' +
    '111111000000000000000000000000' +
    '111111000000000000000000000000' +
    '111111000000000000000000000000' +
    '111111000011111111111111111111' +
    '111111000011111111111111111111' +
    '111111000011111111111111111111' +
    '111111000011111111111111111111' +
    '111111000011111111111111111111' +
    '111111000011111111111111111111' +
    '111111000011111111111111111111' +
    '111111000011111111111111111111' +
    '111111000011111111111111111111' +
    '111111000011111111111111111111',
  corPrincipal: '#d54a68',
  corInimigo: '#f2f012',
  listaInimigos: [],
  listaCheckpoints: [],
  idTelaDireita: 3,
  idTelaBaixo: 1,
});

listaTelas.push({
  id: 3,
  grid:
    '111111111111111111111111111111' +
    '111111111111111111111111111111' +
    '111111111111111111111111111111' +
    '111111111111111111111111111111' +
    '111111111111111111111111111111' +
    '111111111111111111111111111111' +
    '111111111111111111111111111111' +
    '111111111111111111111111111111' +
    '111111111111111111111111111111' +
    '111111111111111111111111111111' +
    '000000000000000000000000111111' +
    '000000000000000000000000111111' +
    '000000000000000000000000111111' +
    '000000000000000000000000111111' +
    '000000000000000000000000111111' +
    '000000000000000000000000111111' +
    '000000000000000000000000111111' +
    '000000000000000000000000111111' +
    '000000000000000000000000111111' +
    '000000000000000000000000111111' +
    '111111111111111111110000111111' +
    '111111111111111111110000111111' +
    '111111111111111111110000111111' +
    '111111111111111111110000111111' +
    '111111111111111111110000111111' +
    '111111111111111111110000111111' +
    '111111111111111111110000111111' +
    '111111111111111111110000111111' +
    '111111111111111111110000111111' +
    '111111111111111111110000111111',
  corPrincipal: '#edf190',
  corInimigo: '#f2f012',
  listaInimigos: [],
  listaCheckpoints: [],
  idTelaEsquerda: 2,
  idTelaBaixo: 4,
});

listaTelas.push({
  id: 4,
  grid:
    '111111111111111111110000111111' +
    '111111111111111111110000111111' +
    '111111111111111111110000111111' +
    '111111111111111111110000111111' +
    '111111111111111111110000111111' +
    '111111111111111111110000111111' +
    '111111111111111111110000111111' +
    '111111111111111111110000111111' +
    '111111111111111111110000111111' +
    '111111111111111111110000111111' +
    '111111000000000000000000111111' +
    '111111000000000000000000111111' +
    '111111000000000000000000111111' +
    '111111000000000000000000111111' +
    '111111000000000000000000111111' +
    '111111000000000000000000111111' +
    '111111000000000000000000111111' +
    '111111000000000000000000111111' +
    '111111000000000000000000111111' +
    '111111000000000000000000111111' +
    '111111000011111111111111111111' +
    '111111000011111111111111111111' +
    '111111000011111111111111111111' +
    '111111000011111111111111111111' +
    '111111000011111111111111111111' +
    '111111000011111111111111111111' +
    '111111000011111111111111111111' +
    '111111000011111111111111111111' +
    '111111000011111111111111111111' +
    '111111000011111111111111111111',
  corPrincipal: '#5ee4e7',
  corInimigo: '#f2f012',
  listaInimigos: [],
  listaCheckpoints: [],
  idTelaBaixo: 5,
  idTelaCima: 3,
});

listaTelas.push({
  id: 5,
  grid:
    '111111000011111111111111111111' +
    '111111000011111111111111111111' +
    '111111000011111111111111111111' +
    '111111000011111111111111111111' +
    '111111000011111111111111111111' +
    '111111000011111111111111111111' +
    '111111000011111111111111111111' +
    '111111000011111111111111111111' +
    '111111000011111111111111111111' +
    '111111000011111111111111111111' +
    '000000000011111111111111111111' +
    '000000000011111111111111111111' +
    '000000000011111111111111111111' +
    '000000000011111111111111111111' +
    '000000000011111111111111111111' +
    '000000000011111111111111111111' +
    '000000000011111111111111111111' +
    '000000000011111111111111111111' +
    '000000000011111111111111111111' +
    '000000000011111111111111111111' +
    '111111111111111111111111111111' +
    '111111111111111111111111111111' +
    '111111111111111111111111111111' +
    '111111111111111111111111111111' +
    '111111111111111111111111111111' +
    '111111111111111111111111111111' +
    '111111111111111111111111111111' +
    '111111111111111111111111111111' +
    '111111111111111111111111111111' +
    '111111111111111111111111111111',
  corPrincipal: '#d42204',
  corInimigo: '#f2f012',
  listaInimigos: [],
  listaCheckpoints: [],
  idTelaEsquerda: 6,
  idTelaCima: 4,
});

listaTelas.push({
  id: 6,
  grid:
    '111111000011111111111111111111' +
    '111111000011111111111111111111' +
    '111111000011111111111111111111' +
    '111111000011111111111111111111' +
    '111111000011111111111111111111' +
    '111111000011111111111111111111' +
    '111111000011111111111111111111' +
    '111111000011111111111111111111' +
    '111111000011111111111111111111' +
    '111111000011111111111111111111' +
    '111111000000000000000000000000' +
    '111111000000000000000000000000' +
    '111111000000000000000000000000' +
    '111111000000000000000000000000' +
    '111111000000000000000000000000' +
    '111111000000000000000000000000' +
    '111111000000000000000000000000' +
    '111111000000000000000000000000' +
    '111111000000000000000000000000' +
    '111111000000000000000000000000' +
    '111111111111111111111111111111' +
    '111111111111111111111111111111' +
    '111111111111111111111111111111' +
    '111111111111111111111111111111' +
    '111111111111111111111111111111' +
    '111111111111111111111111111111' +
    '111111111111111111111111111111' +
    '111111111111111111111111111111' +
    '111111111111111111111111111111' +
    '111111111111111111111111111111',
  corPrincipal: '#726fa1',
  corInimigo: '#f2f012',
  listaInimigos: [],
  listaCheckpoints: [],
  idTelaDireita: 5,
  idTelaCima: 1,
});

listaTelas.forEach(tela => {
  globalVariables.listaTodosCheckpoints = 
    globalVariables.listaTodosCheckpoints.concat(tela.listaCheckpoints);
});

export default listaTelas;
