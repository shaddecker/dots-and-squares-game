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
    this.dotSize = 3;
    this.squareSize = 40;
    this.boardBoundryUpper = gameBoardCanvas.top;
    this.boardBoundryRight = gameBoardCanvas.right - 10;
    this.boardBoundryBottom = gameBoardCanvas.bottom - 10;
    this.boardBoundryLeft = gameBoardCanvas.left;
  }
  changePlayer() {
    if (this.playerTurn === 1) {
      this.playerTurn = 2;
    } else {
      this.playerTurn = 1;
    }
  }
}

let playerOneScoreBoard = document.querySelector(".player1");
let playerTwoScoreBoard = document.querySelector(".player2");
let gameBoardElement = document.querySelector("canvas");
let gameBoardCanvas = gameBoardElement.getBoundingClientRect();
let gameStartButton = document.querySelector(".buttons");
let clickSound = new Audio("click.mp3");
const myGame = new Game();

//function to clear all variables and reset the game
function clearVariables() {
  playerOneScoreBoard.innerText = "Player 1: 0";
  playerOneScoreBoard.style.backgroundColor = "sandybrown";
  playerTwoScoreBoard.innerText = "Player 2: 0";
  playerTwoScoreBoard.style.backgroundColor = "dodgerblue";
  myGame.gameSquares = [];
  myGame.player1Score = 0;
  myGame.player2Score = 0;
  myGame.playerTurn = 1;
  myGame.locationX = 0;
  myGame.locationY = 0;
}

//function to update each squares boundries
//this is a setup function to help define boundries
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
        ctx.closePath();
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
  // console.log(`row: ${row} column: ${column}`);
  // console.log(`square # ${square}`);
  return square;
}

//draw a square side
function drawLine(theSquare, theSide) {
  //draw the square side
  let pointOne;
  let pointTwo;
  let shortage = 5;
  // console.log(theSquare, theSide);
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
      // console.log(pointOne);
      break;
    }
  }
  // console.log(theSquare, pointOne, pointTwo);
  var ctx = gameBoardElement.getContext("2d");
  ctx.beginPath();
  ctx.moveTo(pointOne[0], pointOne[1]);
  ctx.lineTo(pointTwo[0], pointTwo[1]);
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.closePath();
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

  // console.log(`row: ${rowFound} and column: ${columnFound}`);
  // console.log(`exact X: ${myGame.locationX} and exact Y: ${myGame.locationY}`);
  return [rowFound, columnFound];
}

//function to determine which side the user clicked on
function findSide(currentSquare, rowAndColumn) {
  let theSquare = myGame.gameSquares[currentSquare];
  if (myGame.locationX >= theSquare.upperRight[0] - 10 && myGame.locationX <= theSquare.upperRight[0] + 10) {
    // console.log("right side");
    drawLine(theSquare, "right");
    theSquare.sideRight = true;
    myGame.gameSquares[currentSquare + 6].sideLeft = true;
  } else if (myGame.locationY >= theSquare.lowerRight[1] - 10 && myGame.locationY <= theSquare.lowerRight[1] + 10) {
    // console.log("bottom side");
    drawLine(theSquare, "bottom");
    theSquare.sideBottom = true;
    myGame.gameSquares[currentSquare + 1].sideTop = true;
  }
}

//this function loops through defined squares and fills in any that are closed
//there should be only 1 square to fill each time
function checkSides() {
  for (j = 1; j < myGame.gameSquares.length; j++) {
    let theSquare = myGame.gameSquares[j];
    // console.log(
    //   `square ${j} sideTop: ${theSquare.sideTop} sideBottom: ${theSquare.sideBottom} sideLeft: ${theSquare.sideLeft} sideRight: ${theSquare.sideRight} `
    // );
    // console.log(theSquare);
    if (!theSquare.closed) {
      if (theSquare.sideLeft && theSquare.sideTop && theSquare.sideRight && theSquare.sideBottom) {
        theSquare.owner = myGame.playerTurn;
        var ctx = gameBoardElement.getContext("2d");
        ctx.beginPath();
        if (myGame.playerTurn === 1) {
          ctx.fillStyle = "sandybrown";
        } else {
          ctx.fillStyle = "dodgerblue";
        }
        ctx.fillRect(theSquare.upperLeft[0] - 6, theSquare.upperLeft[1] - 6, 44, 44);
        // ctx.fill();
        ctx.closePath();
        theSquare.closed = true;
        //because a square was closed
        return true;
      }
    }
  }
  //no squares were closed
  return false;
}

//loop through all squares to determine if there is a winner
//handle the winner notification
function checkForWinner() {
  let bolWinner = true;
  for (j = 1; j <= myGame.gameSquares.length - 1; j++) {
    if (!myGame.gameSquares[j].closed) {
      bolWinner = false;
    }
  }
  if (bolWinner) {
    gameBoardElement.removeEventListener("click", clickHandler);
    if (myGame.player1Score > myGame.player2Score) {
      playerOneScoreBoard.style.backgroundColor = "lightgreen";
      playerTwoScoreBoard.style.backgroundColor = "white";
    } else if (myGame.player2Score > myGame.player1Score) {
      playerOneScoreBoard.style.backgroundColor = "white";
      playerTwoScoreBoard.style.backgroundColor = "lightgreen";
    } else if (myGame.player1Score === myGame.player2Score) {
      playerOneScoreBoard.style.backgroundColor = "lightgreen";
      playerTwoScoreBoard.style.backgroundColor = "lightgreen";
    }
  }
}

//function to handle the click event on the canvas
function clickHandler() {
  // console.log(myGame.playerTurn);
  clickSound.play();
  setXAndYPosition();
  let rowAndColumn = getRowAndColumn();
  let square = findSquare(rowAndColumn[0], rowAndColumn[1]);
  let side = findSide(square, rowAndColumn);
  if (checkSides(myGame.gameSquares[square])) {
    switch (myGame.playerTurn) {
      case 1:
        myGame.player1Score++;
        break;
      case 2:
        myGame.player2Score++;
        break;
    }
    playerOneScoreBoard.innerText = `Player 1: ${myGame.player1Score}`;
    playerTwoScoreBoard.innerText = `Player 2: ${myGame.player2Score}`;
  } else {
    myGame.changePlayer();
  }
  checkForWinner();
}

//function to initialize the game and handles the click on the reset/start game button
function setUpBoard() {
  clickSound.play();
  gameBoardElement.removeEventListener("click", clickHandler);
  clearVariables();
  var ctx = gameBoardElement.getContext("2d");
  ctx.beginPath();
  ctx.clearRect(0, 0, gameBoardCanvas.width, gameBoardCanvas.height, false);
  drawDots();
  gameBoardElement.addEventListener("click", clickHandler);
}

gameStartButton.addEventListener("click", setUpBoard);
