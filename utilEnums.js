const direcaoEnum = {
  CIMA: 1,
  BAIXO: 2,
  ESQUERDA: 3,
  DIREITA: 4,
};

const colisaoEnum = {
  SEM_COLISAO: 1,
  COLISAO_SEM_DANO: 2,
  COLISAO_COM_DANO: 3,
};

const tipoObstaculoEnum = {
  CHAO: 1,
  INIMIGO: 2,
  PLATAFORMA: 3,
  ESPINHO: 4,
  CHECKPOINT: 5
};

export { direcaoEnum, colisaoEnum, tipoObstaculoEnum };
