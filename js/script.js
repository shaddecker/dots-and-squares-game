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
    this.squareNumber = null;
    this.row = null;
    this.column = null;
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
function defineSquare(squareNumber, row, column, upperLeft, upperRight, lowerLeft, lowerRight) {
  if (myGame.gameSquares.length === 0) {
    //first game square data should be null
    emptySquare = new Square([], [], [], []);
    myGame.gameSquares.push(emptySquare);
  }
  //create a new game sqaure
  tmpSquare = new Square(upperLeft, upperRight, lowerLeft, lowerRight);
  tmpSquare.squareNumber = squareNumber;
  tmpSquare.row = row;
  tmpSquare.column = column;
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
  for (column = 1; column <= 6; column++) {
    for (row = 1; row <= 6; row++) {
      locationX = (gameBoardCanvas.left + myGame.squareSize) * column;
      locationY = (gameBoardCanvas.top + myGame.squareSize) * row;
      if (column < 6 && row < 6) {
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

      defineSquare(findSquare(row, column), row, column, upperLeft, upperRight, lowerLeft, lowerRight);
    }
  }
}

//using row and column define which square this is
function findSquare(row, column) {
  let square = 0;
  let column1 = [1, 2, 3, 4, 5, 6];
  let column2 = [7, 8, 9, 10, 11, 12];
  let column3 = [13, 14, 15, 16, 17, 18];
  let column4 = [19, 20, 21, 22, 23, 24];
  let column5 = [25, 26, 27, 28, 29, 30];
  let column6 = [31, 32, 33, 34, 35, 36];
  switch (column) {
    case 1: {
      square = column1[row - 1];
      break;
    }
    case 2: {
      square = column2[row - 1];
      break;
    }
    case 3: {
      square = column3[row - 1];
      break;
    }
    case 4: {
      square = column4[row - 1];
      break;
    }
    case 5: {
      square = column5[row - 1];
      break;
    }
    case 6: {
      square = column6[row - 1];
      break;
    }
  }
  console.log(`row: ${row} column: ${column}`);
  console.log(`square # ${square}`);
  return square;
}

//draw a square side
function drawLine(theSquare, theSide) {
  //draw the square side
  let pointOne = [];
  let pointTwo = [];
  let shortage = 5;
  console.log(theSquare, theSide);
  switch (theSide) {
    case "left": {
      pointOne = theSquare.lowerLeft;
      pointTwo = theSquare.upperLeft;
      pointTwo[1] = pointTwo[1] - shortage;
      break;
    }
    case "right": {
      pointOne = theSquare.lowerRight;
      pointTwo = theSquare.upperRight;
      pointTwo[1] = pointTwo[1] - shortage;
      break;
    }
    case "top": {
      pointOne = theSquare.upperLeft;
      pointTwo = theSquare.upperRight;
      pointOne[0] = pointOne[0] - shortage;
      break;
    }
    case "bottom": {
      pointOne = theSquare.lowerLeft;
      pointTwo = theSquare.lowerRight;
      pointOne[0] = pointOne[0] - shortage;
      break;
    }
  }
  console.log(pointOne, pointTwo);
  var ctx = gameBoardElement.getContext("2d");
  ctx.beginPath();
  ctx.moveTo(pointOne[0], pointOne[1]);
  ctx.lineTo(pointTwo[0], pointTwo[1]);
  ctx.lineWidth = 5;
  ctx.stroke();
}

//function to update the gameboard to the current clicked location
function setXAndYPosition() {
  myGame.locationX = event.clientX - gameBoardCanvas.left; // x == the location of the click in the document - the location (relative to the left) of the canvas in the document
  myGame.locationY = event.clientY - gameBoardCanvas.top; // y == the location of the click in the document - the location (relative to the top) of the canvas in the document
}

//function to determine if they clicked a side of a square
function getRowAndColumn() {
  let columnFound = 0;
  let rowFound = 0;
  for (j = 0; j <= 6; j++) {
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
  //console.log(rowFound, columnFound);
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
  return [rowFound, columnFound];
}

function findSide(currentSquare, rowAndColumn) {
  let theSquare = myGame.gameSquares[currentSquare];
  if (myGame.locationX >= theSquare.upperRight[0] - 10 && myGame.locationX <= theSquare.upperRight[0] + 10) {
    console.log("right side");
    drawLine(theSquare, "right");
    theSquare.sideRight = true;
  } else if (myGame.locationY >= theSquare.lowerRight[1] - 10 && myGame.locationY <= theSquare.lowerRight[1] + 10) {
    console.log("bottom side");
    drawLine(theSquare, "bottom");
    theSquare.sideBottom = true;
    myGame.gameSquares[currentSquare + 1].sideTop = true;
  }
}

function checkSides(theSquare) {
  if (theSquare.sideLeft && theSquare.sideTop && theSquare.sideRight && theSquare.sideBottom) {
    theSquare.owner = myGame.playerTurn;
    ctx.beginPath();
    ctx.rect(the.upperLeft, theSquare.upperRight, theSquare.lowerRight, theSquare.lowerLeft);
    if (myGame.playerTurn === "Player 1") {
      ctx.fillStyle = "red";
    } else {
      ctx.fillStyle = "blue";
    }
    ctx.fill();
    if (myGame.playerTurn === "Player 1") {
      myGame.playerTurn = "Player 2";
    } else {
      myGame.playerTurn = "Player 1";
    }
  }
}

//function to handle the click event
function clickHandler() {
  setXAndYPosition();
  let rowAndColumn = getRowAndColumn();
  let square = findSquare(rowAndColumn[0], rowAndColumn[1]);
  let side = findSide(square, rowAndColumn);
  // checkSides(myGame.gameSquares[square]);
}

//function to initialize the game
function setUpBoard() {
  drawDots();
  gameBoardElement.addEventListener("click", clickHandler);
}

setUpBoard();
