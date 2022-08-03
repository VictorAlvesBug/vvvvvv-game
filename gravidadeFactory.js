import { direcaoEnum, colisaoEnum } from './utilEnums.js';
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
          case colisaoEnum.SEM_COLISAO:
            podeAlterarGravidade = false;
            movimentoPersonagem.moverParaDirecao(direcaoGravidade);
            break;
          case colisaoEnum.COLISAO_SEM_DANO:
            podeAlterarGravidade = true;
    
            break;
          case colisaoEnum.COLISAO_COM_DANO:
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