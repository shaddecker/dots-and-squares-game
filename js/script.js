console.log("script linked");

//variables
class Square {
  constructor(upperLeft, upperRight, lowerLeft, lowerRight) {
    this.upperLeft = upperLeft;
    this.upperRight = upperRight;
    this.lowerLeft = lowerLeft;
    this.lowerRight = lowerRight;
    this.sideTop = false;
    this.sideRight = false;
    this.sideBottom = false;
    this.sideLeft = false;
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
    this.boardBoundryUpper = gameBoardCanvas.top;
    this.boardBoundryRight = gameBoardCanvas.right - 10;
    this.boardBoundryBottom = gameBoardCanvas.bottom - 10;
    this.boardBoundryLeft = gameBoardCanvas.left;
  }
}

let gameBoardElement = document.querySelector("canvas");
let gameBoardCanvas = gameBoardElement.getBoundingClientRect();
const myGame = new Game();

//function to update each squares boundries
function defineSquare(upperLeft, upperRight, lowerLeft, lowerRight) {
  tmpSquare = new Square(upperLeft, upperRight, lowerLeft, lowerRight);
  if (upperLeft[1] === myGame.boardBoundryUpper) {
    tmpSquare.sideTop = true;
  }
  if (lowerLeft[1] === myGame.boardBoundryBottom) {
    tmpSquare.sideBottom = true;
  }
  if (upperLeft[0] === myGame.boardBoundryLeft) {
    tmpSquare.sideLeft = true;
  }
  if (upperRight[0] === myGame.boardBoundryRight) {
    tmpSquare.sideRight = true;
  }
  myGame.gameSquares.push(tmpSquare);
}

//set up function to draw all the dots on the game board
function drawDots() {
  var ctx = gameBoardElement.getContext("2d");
  ctx.fillStyle = "#000000";
  for (j = 1; j <= 6; j++) {
    for (k = 1; k <= 6; k++) {
      locationX = (gameBoardCanvas.left + myGame.squareSize) * j;
      locationY = (gameBoardCanvas.top + myGame.squareSize) * k;
      if (j < 6 && k < 6) {
        //draw the dot
        ctx.beginPath();
        ctx.arc(locationX, locationY, myGame.dotSize, 0, Math.PI * 2, true); // Draw a point using the arc function of the canvas with a point structure.
        ctx.fill(); // Close the path and fill.
      }
      //calculate and add new square dimensions to the class
      let upperLeft = [locationX - myGame.squareSize, locationY - myGame.squareSize];
      let upperRight = [locationX, locationY - myGame.squareSize];
      let lowerLeft = [locationX - myGame.squareSize, locationY];
      let lowerRight = [locationX, locationY];
      defineSquare(upperLeft, upperRight, lowerLeft, lowerRight);
    }
  }
}

function findSquare(row, column) {
  console.log("fined square");
  let square = null;
  let column1 = [0, 1, 2, 3, 4, 5];
  let column2 = [6, 7, 8, 9, 10, 11];
  let column3 = [12, 13, 14, 15, 16, 17];
  let column4 = [18, 19, 20, 21, 22, 23];
  let column5 = [23, 24, 25, 26, 27, 28];
  let column6 = [29, 30, 31, 32, 34, 35];
  switch (column) {
    case 1: {
      square = column1[row];
      break;
    }
    case 2: {
      square = column2[row];
      break;
    }
    case 3: {
      square = column3[row];
      break;
    }
    case 4: {
      square = column4[row];
      break;
    }
    case 5: {
      square = column5[row];
      break;
    }
  }
  return square;
}

function drawLine(pointOne, pointTwo) {
  console.log("pointOne");
  //draw the square side
  var ctx = gameBoardElement.getContext("2d");
  ctx.beginPath();
  ctx.moveTo(pointOne[0], pointOne[1]);
  ctx.lineTo(pointTwo[0], pointTwo[1]);
  ctx.lineWidth = 5;
  ctx.stroke();
}

//function to update the gameboard to the current clicked location
function setPosition() {
  myGame.locationX = event.clientX - gameBoardCanvas.left; // x == the location of the click in the document - the location (relative to the left) of the canvas in the document
  myGame.locationY = event.clientY - gameBoardCanvas.top; // y == the location of the click in the document - the location (relative to the top) of the canvas in the document
}
//function to determine if they clicked a side of a square
function verifyClickPosition() {
  let columnFound = 0;
  let rowFound = 0;
  for (j = 1; j <= 6; j++) {
    if (
      myGame.locationX >= (gameBoardCanvas.left + myGame.squareSize) * j - 10 &&
      myGame.locationX <= (gameBoardCanvas.left + myGame.squareSize) * j + 10
    ) {
      columnFound = j;
    }
    if (
      myGame.locationY >= (gameBoardCanvas.top + myGame.squareSize) * j - 10 &&
      myGame.locationY <= (gameBoardCanvas.top + myGame.squareSize) * j + 10
    ) {
      rowFound = j;
    }
  }
  if (rowFound > 0) {
    let count = 1;
    while (count <= 6) {
      if (48 * count >= myGame.locationX) {
        columnFound = count;
        break;
      } else {
        count++;
      }
    }
  } else if (columnFound > 0) {
    let count = 1;
    while (count <= 6) {
      if (48 * count >= myGame.locationY) {
        rowFound = count;
        break;
      } else {
        count++;
      }
    }
  }
  console.log(`row: ${rowFound} and column: ${columnFound}`);
  console.log(`exact X: ${myGame.locationX} and exact Y: ${myGame.locationY}`);
  let square = findSquare(rowFound, columnFound);

  drawLine(myGame.gameSquares[square].lowerRight, myGame.gameSquares[square].upperRight);
}

//function to handle the click event
function clickHandler() {
  setPosition();
  verifyClickPosition();
}

//function to initialize the game
function setUpBoard() {
  drawDots();
  gameBoardElement.addEventListener("click", clickHandler);
}

setUpBoard();
