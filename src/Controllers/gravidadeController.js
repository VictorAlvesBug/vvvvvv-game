import direcaoEnum from './../Enums/direcaoEnum.js';
import tipoObjetoEnum from './../Enums/tipoObjetoEnum.js';
import criarMovimento from './movimentoController.js';
import GlobalVariables from './../GlobalVariables/GlobalVariables.js';

function criarGravidade(gameBoard){

    const movimento = criarMovimento(gameBoard);
    const globalVariables = new GlobalVariables();
    let gravidadeInvertida = false;
    let podeAlterarGravidade = true;

    const alternarGravidade = () => {
      if (podeAlterarGravidade) {
        gravidadeInvertida = !gravidadeInvertida;
      }
    };

    const aplicarGravidade = () => {
        const direcaoGravidade = gravidadeInvertida
          ? direcaoEnum.CIMA
          : direcaoEnum.BAIXO;
    
        const colisao = movimento.direcaoEstaDisponivel(direcaoGravidade);
        switch (colisao) {
          case tipoObjetoEnum.NADA:
            case tipoObjetoEnum.CHECKPOINT:
            podeAlterarGravidade = false;
            movimento.moverParaDirecao(direcaoGravidade);
            break;

          case tipoObjetoEnum.CHAO:
            podeAlterarGravidade = true;
            break;

            case tipoObjetoEnum.INIMIGO:
              podeAlterarGravidade = true;
              globalVariables.gameOver();
              break;
              
        }
      };

      return {
        alternarGravidade,
        aplicarGravidade
      };
}

export default criarGravidade;