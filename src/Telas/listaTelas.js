import GlobalVariables from '../GlobalVariables/GlobalVariables.js';

const globalVariables = new GlobalVariables();
const geradorId = globalVariables.gerarId();

const listaCoresChao = [
  { corPrincipal: '#fef3a3', corBorda: '#cbc070' },
  { corPrincipal: '#e65b79', corBorda: '#b32846' },
  { corPrincipal: '#fef3a3', corBorda: '#cbc070' },
  { corPrincipal: '#6ff5f8', corBorda: '#3cc2c5' },
  { corPrincipal: '#e53335', corBorda: '#b20002' },
  { corPrincipal: '#837fb3', corBorda: '#504c80' },
  { corPrincipal: '#000000', corBorda: '#01c8f7' },
  { corPrincipal: '#a6454e', corBorda: '#e65f6b' },
  { corPrincipal: '#639d3b', corBorda: '#9fff5d' },
];

let indiceCorChao;

const listaTelas = [];

indiceCorChao = Math.floor(Math.random() * listaCoresChao.length);
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
  corPrincipalChao: listaCoresChao[indiceCorChao].corPrincipal,
  corBordaChao: listaCoresChao[indiceCorChao].corBorda,
  corInimigo: '#f2f012',
  listaInimigos: [
    {
      id: geradorId.next().value,
      posicaoA: {
        X: 812,
        Y: 200,
      },
      posicaoB: {
        X: 812,
        Y: 700,
      },
      porcentagemCaminhoInicio: 0,
      velocidade: 1,
    },
    {
      id: geradorId.next().value,
      posicaoA: {
        X: 1611,
        Y: 200,
      },
      posicaoB: {
        X: 1611,
        Y: 1500,
      },
      porcentagemCaminhoInicio: 0.4,
      velocidade: 1,
    },
    {
      id: geradorId.next().value,
      posicaoA: {
        X: 1211,
        Y: 1040,
      },
      posicaoB: {
        X: 1211,
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
      posicaoY: 787,
    },
    {
      id: geradorId.next().value,
      posicaoX: 500,
      posicaoY: 1136,
    },
  ],
  idTelaCima: 2,
  idTelaBaixo: 6,
});

indiceCorChao = Math.floor(Math.random() * listaCoresChao.length);
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
  corPrincipalChao: listaCoresChao[indiceCorChao].corPrincipal,
  corBordaChao: listaCoresChao[indiceCorChao].corBorda,
  corInimigo: '#f2f012',
  listaInimigos: [
    {
      id: geradorId.next().value,
      funcaoPosicao: (seed) => {
        /// Exemplo linha reta
        //let x, y;
        //const xInicio = 1100;
        //const yInicio = 400;
        //const xTermino = 1500;
        //const yTermino = 600;
        //if(seed <= 0.5){
        //  x = globalVariables.mapValue(seed, 0, 0.5, xInicio, xTermino);
        //  y = globalVariables.mapValue(seed, 0, 0.5, yInicio, yTermino);
        //}
        //else{
        //  x = globalVariables.mapValue(seed, 1, 0.5, xInicio, xTermino);
        //  y = globalVariables.mapValue(seed, 1, 0.5, yInicio, yTermino);
        //}
        //return [x, y];

        /// Exemplo elipse
        let x, y;
        const xCentro = 1300;
        const yCentro = 930;
        const xRaio = 135;
        const yRaio = 240;
        const anguloRadianos = globalVariables.mapValue(
          seed,
          0,
          1,
          0,
          2 * Math.PI
        );

        x = xCentro + xRaio * Math.cos(anguloRadianos);
        y = yCentro + yRaio * Math.sin(anguloRadianos);

        return [x, y];
      },
      porcentagemCaminhoInicio: 1,
      velocidade: 1,
    },
    {
      id: geradorId.next().value,
      funcaoPosicao: (seed) => {
        /// Exemplo elipse
        let x, y;
        const xCentro = 980;
        const yCentro = 930;
        const xRaio = 135;
        const yRaio = 240;
        const anguloRadianos = globalVariables.mapValue(
          seed,
          0,
          1,
          2 * Math.PI,
          0
        );

        x = xCentro + xRaio * Math.cos(anguloRadianos);
        y = yCentro + yRaio * Math.sin(anguloRadianos);

        return [x, y];
      },
      porcentagemCaminhoInicio: 1,
      velocidade: 1,
    },
  ],
  listaCheckpoints: [],
  idTelaDireita: 3,
  idTelaBaixo: 1,
});

indiceCorChao = Math.floor(Math.random() * listaCoresChao.length);
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
  corPrincipalChao: listaCoresChao[indiceCorChao].corPrincipal,
  corBordaChao: listaCoresChao[indiceCorChao].corBorda,
  corInimigo: '#f2f012',
  listaInimigos: [
    {
      id: geradorId.next().value,
      funcaoPosicao: (seed) => {
        /// Exemplo simbolo infinito
        let x, y;
        const xCentro = 980;
        const yCentro = 930;
        const xRaio = 270;
        const yRaio = 240;
        const anguloRadianos = globalVariables.mapValue(
          seed,
          0,
          1,
          2 * Math.PI,
          0
        );

        x = xCentro + xRaio * Math.cos(anguloRadianos);
        y = yCentro + yRaio * Math.sin(anguloRadianos * 2);

        return [x, y];
      },
      porcentagemCaminhoInicio: 1,
      velocidade: 1,
    },
  ],
  listaCheckpoints: [],
  idTelaEsquerda: 2,
  idTelaBaixo: 4,
});

indiceCorChao = Math.floor(Math.random() * listaCoresChao.length);
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
    '111111000011133113311111111111' +
    '111111000011111111111111111111' +
    '111111000011111111111111111111' +
    '111111000011111111111111111111' +
    '111111000011111111111111111111' +
    '111111000011111111111111111111' +
    '111111000011111111111111111111' +
    '111111000011111111111111111111' +
    '111111000011111111111111111111' +
    '111111000011111111111111111111',
  corPrincipalChao: listaCoresChao[indiceCorChao].corPrincipal,
  corBordaChao: listaCoresChao[indiceCorChao].corBorda,
  corInimigo: '#f2f012',
  listaInimigos: [
    {
      id: geradorId.next().value,
      funcaoPosicao: (seed) => {
        /// Exemplo retângulo
        let x, y;
        const xCentro = 1020;
        const yCentro = 900;
        const xRaio = 90;
        const yRaio = 160;

        if (seed < 0.25) {
          x = globalVariables.mapValue(
            seed % 0.25,
            0,
            0.25,
            xCentro - xRaio,
            xCentro + xRaio
          );
          y = yCentro - yRaio;
        } else if (seed < 0.5) {
          x = xCentro + xRaio;
          y = globalVariables.mapValue(
            seed % 0.25,
            0,
            0.25,
            yCentro - yRaio,
            yCentro + yRaio
          );
        } else if (seed < 0.75) {
          x = globalVariables.mapValue(
            seed % 0.25,
            0,
            0.25,
            xCentro + xRaio,
            xCentro - xRaio
          );
          y = yCentro + yRaio;
        } else {
          x = xCentro - xRaio;
          y = globalVariables.mapValue(
            seed % 0.25,
            0,
            0.25,
            yCentro + yRaio,
            yCentro - yRaio
          );
        }

        return [x, y];
      },
      porcentagemCaminhoInicio: 1,
      velocidade: 1,
    },
    {
      id: geradorId.next().value,
      funcaoPosicao: (seed) => {
        /// Exemplo retângulo
        let x, y;
        const xCentro = 1020;
        const yCentro = 900;
        const xRaio = 90;
        const yRaio = 160;

        if (seed < 0.25) {
          x = globalVariables.mapValue(
            seed % 0.25,
            0,
            0.25,
            xCentro + xRaio,
            xCentro - xRaio
          );
          y = yCentro + yRaio;
        } else if (seed < 0.5) {
          x = xCentro - xRaio;
          y = globalVariables.mapValue(
            seed % 0.25,
            0,
            0.25,
            yCentro + yRaio,
            yCentro - yRaio
          );
        } else if (seed < 0.75) {
          x = globalVariables.mapValue(
            seed % 0.25,
            0,
            0.25,
            xCentro - xRaio,
            xCentro + xRaio
          );
          y = yCentro - yRaio;
        } else {
          x = xCentro + xRaio;
          y = globalVariables.mapValue(
            seed % 0.25,
            0,
            0.25,
            yCentro - yRaio,
            yCentro + yRaio
          );
        }

        return [x, y];
      },
      porcentagemCaminhoInicio: 1,
      velocidade: 1,
    },
  ],
  listaCheckpoints: [
    {
      id: geradorId.next().value,
      posicaoX: 1450,
      posicaoY: 1250,
    },
  ],
  idTelaBaixo: 5,
  idTelaCima: 3,
});

indiceCorChao = Math.floor(Math.random() * listaCoresChao.length);
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
  corPrincipalChao: listaCoresChao[indiceCorChao].corPrincipal,
  corBordaChao: listaCoresChao[indiceCorChao].corBorda,
  corInimigo: '#f2f012',
  listaInimigos: [],
  listaCheckpoints: [],
  idTelaEsquerda: 6,
  idTelaCima: 4,
});

indiceCorChao = Math.floor(Math.random() * listaCoresChao.length);
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
  corPrincipalChao: listaCoresChao[indiceCorChao].corPrincipal,
  corBordaChao: listaCoresChao[indiceCorChao].corBorda,
  corInimigo: '#f2f012',
  listaInimigos: [],
  listaCheckpoints: [],
  idTelaDireita: 5,
  idTelaCima: 1,
});

listaTelas.forEach((tela) => {
  globalVariables.listaTodosCheckpoints =
    globalVariables.listaTodosCheckpoints.concat(tela.listaCheckpoints);
});

export default listaTelas;
