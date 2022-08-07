class GlobalVariables {
  constructor() {
    if (GlobalVariables.instancia instanceof GlobalVariables) {
      return GlobalVariables.instancia;
    }

    this.listaObjetos = [];

    this.listaTodosCheckpoints = [];

    this.idUltimoCheckpoint;
    this.gravidadeUltimoCheckpoint;
    this.idTelaUltimoCheckpoint;

    this.idTelaAtual = 1;

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

    this.gameOver = (personagem) => {
      personagem.vivo = false;

      setTimeout(() => {
        let ultimoCheckpoint = this.listaTodosCheckpoints.find(
          (cp) => cp.id === this.idUltimoCheckpoint
        );
        if (!ultimoCheckpoint) {
          ultimoCheckpoint = this.listaTodosCheckpoints[0];
        }
        personagem.posicaoX = ultimoCheckpoint.posicaoX;
        personagem.posicaoY = ultimoCheckpoint.posicaoY;
        personagem.vivo = true;
        
        this.idTelaAtual = this.idTelaUltimoCheckpoint;
      }, 300)
      
      return this.gravidadeUltimoCheckpoint;
    };

    GlobalVariables.instancia = this;
  }
}

export default GlobalVariables;
