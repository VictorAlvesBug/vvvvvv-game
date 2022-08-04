import { direcaoEnum, tipoObjetoEnum } from './utilEnums.js';
import createMovimentoPersonagem from './movimentoPersonagemFactory.js';
import GlobalVariables from './GlobalVariables.js';

function createGravidade(gameBoard){

    const movimentoPersonagem = createMovimentoPersonagem(gameBoard);
    const globalVariables = new GlobalVariables();
    let gravidadeInvertida = false;
    let podeAlterarGravidade = true;

    const alternarGravidade = () => {
      if (podeAlterarGravidade) {
        gravidadeInvertida = !gravidadeInvertida;
      }
    };

    const aplicarAcaoGravidade = () => {
        const direcaoGravidade = gravidadeInvertida
          ? direcaoEnum.CIMA
          : direcaoEnum.BAIXO;
    
        const colisao = movimentoPersonagem.direcaoEstaDisponivel(direcaoGravidade);
        switch (colisao) {
          case tipoObjetoEnum.NADA:
            case tipoObjetoEnum.CHECKPOINT:
            podeAlterarGravidade = false;
            movimentoPersonagem.moverParaDirecao(direcaoGravidade);
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
        aplicarAcaoGravidade
      };
}

export default createGravidade;