class GlobalVariables {
  constructor() {
    if (GlobalVariables.instancia instanceof GlobalVariables) {
      return GlobalVariables.instancia;
    }

    this.personagem = {
      cor: '#8fc0c6',
      largura: 30,
      altura: 60,
      left: 400,
      top: 200
    }

    this.listaObjetos = [];

    this.listaTodosCheckPoints = [];

    this.idUltimoCheckPoint;

    this.gerarId = function* () {
      let id = 1;
      while (true) {
        yield ++id;
      }
    };

    this.gerarNumeroFrame = function* () {
      let numeroFrame = 1;
      while (true) {
        yield ++numeroFrame;
      }
    };

    this.gameOver = () => {
      console.log('GAME OVER');

      let ultimoCheckPoint = this.listaTodosCheckPoints.find(cp => cp.id === this.idUltimoCheckPoint)
      if(ultimoCheckPoint){
        ultimoCheckPoint = this.listaTodosCheckPoints[0];
        this.personagem.left = ultimoCheckPoint.left;
        this.personagem.top = ultimoCheckPoint.top;
        return;
      }

      this.personagem.left = 400;
      this.personagem.top = 200;
    }

    GlobalVariables.instancia = this;
  }
}

export default GlobalVariables;
