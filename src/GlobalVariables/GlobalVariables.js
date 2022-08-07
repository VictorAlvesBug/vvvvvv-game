class GlobalVariables {
  constructor() {
    if (GlobalVariables.instancia instanceof GlobalVariables) {
      return GlobalVariables.instancia;
    }

    this.listaObjetos = [];

    this.listaTodosCheckpoints = [];

    this.idUltimoCheckpoint;

    this.gerarId = function* () {
      let id = 1;
      while (true) {
        yield ++id;
      }
    };

    this.gerarIdFrame = function* () {
      let frame = 1;
      while (true) {
        yield ++frame;
      }
    };

    this.gameOver = () => {
      console.log('GAME OVER');

      let ultimoCheckpoint = this.listaTodosCheckpoints.find(cp => cp.id === this.idUltimoCheckpoint)
      if(ultimoCheckpoint){
        ultimoCheckpoint = this.listaTodosCheckpoints[0];
        this.personagem.left = ultimoCheckpoint.left;
        this.personagem.top = ultimoCheckpoint.top;
        return;
      }

      this.personagem.left = 400;
      this.personagem.top = 200;
    }

    GlobalVariables.instancia = this;
  }
}

export default GlobalVariables;
