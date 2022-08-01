import createGame from './gameFactory.js';

const gameBoard = document.querySelector('#game-board')
const game = createGame(gameBoard);

const image = new Image();
image.src = "./sprites.png";

const personagem = document.querySelector('#personagem')
//teste.src = "./sprites.png";
//context.clearRect(0, 0, 600, 600);
//context.drawImage(image, 0, 0, 700, 700, 0, 0, 600, 600)

let comandosPressionados = {};

document.addEventListener('keydown', ({code}) => {
    comandosPressionados[code] = game[code];
})

document.addEventListener('keyup', ({code}) => {
    comandosPressionados[code] = null;
})

const loopInterval = setInterval(() => {
    Object.values(comandosPressionados).forEach(comando => {
        if(comando){
            comando()
        }
    })

    ///context.clearRect(0, 0, 600, 600);
    //ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
    ///context.drawImage(image, 5, 0, 15, 30, 0, 0, 50, 100)
    //context.drawImage(image, 0, 0, 700, 700, 0, 0, 600, 600)

    drawOnImage(image)




}, 10)


function drawOnImage(image) {
    const canvasElement = document.getElementById("sprites");
    const context = canvasElement.getContext("2d");
  
      const imageWidth = image.width;
      const imageHeight = image.height;
  
      // rescaling the canvas element
      canvasElement.width = imageWidth;
      canvasElement.height = imageHeight;
  
    context.clearRect(0, 0, 600, 600);
    
    const {left, top} = personagem.getBoundingClientRect();

    context.drawImage(image, 5, 0, 30 , 30, left, top, 50, 100)
  
  
    
  }