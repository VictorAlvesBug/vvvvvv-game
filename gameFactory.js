function createGame(gameBoard) {
  const personagem = gameBoard.querySelector('#personagem');

  const passoAndar = 8;


  const alternarGravidade = () => {
    if (personagem.classList.contains('alternando')) {
      return;
    }
    personagem.classList.toggle('gravidade-invertida');
    personagem.classList.add('alternando');

    setTimeout(() => {
      personagem.classList.remove('alternando');
    }, 250);
  };

  const andarEsquerda = () => {
    let personagemX = +personagem.style.left.replace('px', '');
    personagemX -= passoAndar;
    personagem.style.left = `${personagemX}px`;
  };

  const andarDireita = () => {
    let personagemX = +personagem.style.left.replace('px', '');
    personagemX += passoAndar;
    personagem.style.left = `${personagemX}px`;
  };

  return {
    Space: alternarGravidade,
    ArrowUp: alternarGravidade,
    ArrowDown: alternarGravidade,
    ArrowLeft: andarEsquerda,
    ArrowRight: andarDireita,
  };
}

export default createGame;
