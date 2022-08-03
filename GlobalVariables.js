class GlobalVariables {
  constructor() {
    if (GlobalVariables.instancia instanceof GlobalVariables) {
      return GlobalVariables.instancia;
    }

    this.listaObstaculos = [];

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
      }

      
    }

    GlobalVariables.instancia = this;
  }
}

export default GlobalVariables;
