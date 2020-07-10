console.log("script linked");

//variables
class Square {
  constructor(upperLeft, upperRight, lowerLeft, lowerRight) {
    this.upperLeft = upperLeft;
    this.upperRight = upperRight;
    this.lowerLeft = lowerLeft;
    this.lowerRight = lowerRight;
    this.closed = false;
    this.owner = "";
  }
}
class Game {
  constructor() {
    this.playerTurn = 1;
    this.player1Score = 0;
    this.player2Score = 0;
    this.locationX = 0;
    this.locationY = 0;
    this.gameSquares = [];
    this.dotSize = 5;
    this.squareSize = 40;
  }
}
const myGame = new Game();
let gameBoardElement = document.querySelector("canvas");
let gameBoardCanvas = gameBoardElement.getBoundingClientRect();

//function to update the gameboard to the current clicked location
function setPosition() {
  myGame.locationX = event.clientX - gameBoardCanvas.left; // x == the location of the click in the document - the location (relative to the left) of the canvas in the document
  myGame.locationY = event.clientY - gameBoardCanvas.top; // y == the location of the click in the document - the location (relative to the top) of the canvas in the document
}

//function to update each squares boundries
function defineSquare(upperLeft, upperRight, lowerLeft, lowerRight) {
  tmpSquare = new Square(upperLeft, upperRight, lowerLeft, lowerRight);
  myGame.gameSquares.push(tmpSquare);
}

//set up function to draw all the dots on the game board
function drawDots() {
  var ctx = gameBoardElement.getContext("2d");
  ctx.fillStyle = "#000000";
  for (j = 1; j <= 5; j++) {
    for (k = 1; k <= 5; k++) {
      locationX = (gameBoardCanvas.left + myGame.squareSize) * j;
      locationY = (gameBoardCanvas.top + myGame.squareSize) * k;
      //draw the dot
      ctx.beginPath();
      ctx.arc(locationX, locationY, myGame.dotSize, 0, Math.PI * 2, true); // Draw a point using the arc function of the canvas with a point structure.
      ctx.fill(); // Close the path and fill.
      //calculate and add new square dimensions to the class
      let upperLeft = [locationX - myGame.squareSize, locationY - myGame.squareSize];
      let upperRight = [locationX, locationY - myGame.squareSize];
      let lowerLeft = [locationX - myGame.squareSize, locationY];
      let lowerRight = [locationX, locationY];
      defineSquare(upperLeft, upperRight, lowerLeft, lowerRight);
    }
  }
}

//function to initialize the game
function setUpBoard() {
  drawDots();
  gameBoardElement.addEventListener("click", setPosition);
}

setUpBoard();
