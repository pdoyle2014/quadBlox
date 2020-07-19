// reminder - boardStatus[0] is an array of 10 boolean value - reflect top row
//boardStatus[0][0] reflects status of board tile in upper left corner

var boardStatus = [];
var counter = 1000;
var curPos;
var curPiece = 0;
var curOrientation;
var pieces = [];
var score = 0;


var boardColor = '#3b2e5a';
var redColor = '#c85a5a';
var blueColor = '#5a81c8';
var yellowColor = '#f6e860';
var greenColor = '#5c795d';
var orangeColor = '#c8985a';
var purpleColor = '#8c5ac8';
var whiteColor = '#dfdfdf';



var Piece = function(color) {
  this.color = color;
}





//This function is used to evaluate a position array calculated by a rotation.
//cantFit() will return a 1 if the rotation exceeds the boundaries of the game boardRow
//or includes a cell with boardStatus not equal to 0
function cantFit(newPos) {
  for (i = 0; i < newPos.length; i++) {

    if ((newPos[i][0] < 0) ||
      (newPos[i][0] > 19) ||
      (newPos[i][1] < 0) ||
      (newPos[i][1] > 9)
    ) {
      console.log('out of bounds!')
      return 1;
    } else if ((boardStatus[newPos[i][0]][newPos[i][1]] != 0)) {
      console.log('no room for that here!')
      return 1;
    }
  }
  return 0;
}




//This function returns a boolean: 1=obstacle below and piece rests; 0=clear below;
function checkBelow() {
  for (i = 0; i < curPos.length; i++) {
    //Check to see if the cell is on the bottom row
    if (curPos[i][0] === 19) {
      return 1
    }
    //check to see if cell below is occupied
    else if (boardStatus[curPos[i][0] + 1][curPos[i][1]] != 0) {
      return 1;
    } else {}
  }
  return 0;
};




//This function references the boardStatus array to determine whether any rows have been completed.
//It should be executed after setPiece() function.
//The function returns an array containing the index/indicies of any full row(s)
function checkFullRow() {
  var fullRows = [];

  for (i = 0; i < 20; i++) {
    if (boardStatus[i].includes(0) === false) {
      console.log('Row ' + i + ' is completely full');
      fullRows.push(i);
    }
  }
  return fullRows;
};





//This function receives a "pos" array which is returned by getPos() and a piece type (obj).
//It updates the color of all the cells that are currently occupied. This function
//should be executed each time the piece takes a step.
function displayPiece() {
  for (i = 0; i < curPos.length; i++) {
    var idString = 'cell' + curPos[i][0] + '-' + curPos[i][1];
    document.getElementById(idString).setAttribute('style', 'background-color: ' + curPiece.color + '; outline: 1px solid black')
  }
};







//This function receives a pos array of 4 coordinate pair arrays. It erases the current piece
//from the game board, and resets the value of curPiece, curPos variables.
function downARow() {
  erasePiece();
  for (i = 0; i < curPos.length; i++) {
    var idString = 'cell' + curPos[i][0] + '-' + curPos[i][1];
    curPos[i][0]++;
  }
  displayPiece();
}




function erasePiece() {
  for (i = 0; i < curPos.length; i++) {
    var idString = 'cell' + curPos[i][0] + '-' + curPos[i][1];
    document.getElementById(idString).setAttribute('style', 'background-color:' + boardColor + '; outline: none')
  }
};




//This function executes each time the player completes a row.
//This function accepts as an input an array of integers corresponding to full rows
//This function will set the boardStatus of each cell of each completed row to zero.
//It will set the background color of each cell of each completed row to grey.
//For each row that is deleted, the board will shift down each row above the deleted row
function eraseRow(fullRow) {
  if(fullRow.length > 0){
    counter = counter - 50;
  }

  for (i = 0; i < fullRow.length; i++) {
    //Update boardStatus array for each cell in each completed row
    for (j = 0; j < 10; j++) {
      boardStatus[fullRow[i]][j] = 0;
      var idString = 'cell' + fullRow[i] + '-' + j;
      document.getElementById(idString).setAttribute('style', 'background-color: ' + boardColor);
    }
    score++;
    document.querySelector('.score').textContent = score.toString();
    console.log('Row ' + fullRow[i] + ' has been erased!')

    //k is the row being shifted into (the lower row) - starting with the just-cleared row
    for (k = fullRow[i]; k > 0; k--) {
      for (j = 0; j < 10; j++) {
        boardStatus[k][j] = boardStatus[k - 1][j];

        //check to see if the cell shifting downward is occupied
        if (boardStatus[k][j] != 0) {

          //color the lower cell (row k) to match the upper cell (k-1)
          var idString = 'cell' + k + '-' + j;
          var newColor = pieces[boardStatus[k - 1][j] - 1].color;
          document.getElementById(idString).setAttribute('style', 'background-color: ' + newColor + '; outline: 1px solid black');

          //color the upper cell (k-1) to grey
          var upperCell = 'cell' + (k - 1) + '-' + j;
          document.getElementById(upperCell).setAttribute('style', 'background-color: ' + boardColor);
        }
      }
    }
  }
};




//This function initializes the game boardRow
//it creates 20 rows, with 10 columns in each row
//it populates boardStatus array and sets all cells to vacant (0)
function initGameBoard() {
  document.querySelector('.title').remove();

  document.getElementById('startBtn').remove();

  var board = document.querySelector('.gameboard');
  board.setAttribute("id", "liveBoard");

  console.log("game board has been initialized");
  // This for loop creates 20 rows in the gameboard
  for (i = 0; i < 20; i++) {
    var boardRow = document.createElement("div");
    boardRow.setAttribute("class", "row boardRow");
    boardRow.setAttribute("id", "row" + i);


    document.getElementById("liveBoard").appendChild(boardRow);
    boardStatus.push([]);

    // This for loop creates 10 cells in each row
    for (j = 0; j < 10; j++) {
      var rowCell = document.createElement("div");
      rowCell.setAttribute("class", "col-sm")
      rowCell.setAttribute("id", "cell" + i + "-" + j);

      document.getElementById("row" + i).appendChild(rowCell)
      boardStatus[i].push(0);
    }
  }

  var scoreBoard = document.createElement("div");
  scoreBoard.setAttribute("class", "scoreBoard");
  document.body.appendChild(scoreBoard);
  document.querySelector('.scoreBoard').innerHTML = '<p class="scoreLabel"> SCORE </p>';

  var scoreDisp = document.createElement("div");
  scoreDisp.setAttribute("class", "score")
  document.querySelector('.scoreBoard').appendChild(scoreDisp)
  document.querySelector('.score').innerHTML = '0';

}




function initPieces(){
  //add green LONGSKINNY piece
  pieces.push(new Piece(greenColor));
  //add blue ESS piece
  pieces.push(new Piece(blueColor));
  //add red ESS2 piece
  pieces.push(new Piece(redColor));
  //add yellow TEE piece
  pieces.push(new Piece(yellowColor));
  //add orange ELL piece
  pieces.push(new Piece(orangeColor));
  //add purple JAY piece
  pieces.push(new Piece(purpleColor));
  //add white BLOCK piece
  pieces.push(new Piece(whiteColor));
}



//This function inserts a piece into the gameboard
// var pieceIndex = 0;
function insertPiece() {
  var pieceIndex = Math.floor(Math.random() * 7);
  // var pieceIndex = 6;


  console.log('new piece is: ' + pieceIndex);
  curPiece = pieces[pieceIndex];

  if(pieceIndex === 0){
    curPos = [
      [3, 4],
      [2, 4],
      [1, 4],
      [0, 4]
    ];
  } else if(pieceIndex === 1){
    curPos = [
      [1, 4],
      [1, 5],
      [0, 5],
      [0, 6]
    ];
  } else if(pieceIndex === 2){
    curPos = [
      [1, 5],
      [1, 6],
      [0, 4],
      [0, 5]
    ];
  } else if(pieceIndex === 3){
    curPos = [
      [1, 4],
      [1, 5],
      [1, 6],
      [0, 5]
    ];
  } else if(pieceIndex === 4){
    curPos = [
      [2, 4],
      [2, 5],
      [1, 4],
      [0, 4]
    ];
  } else if(pieceIndex === 5){
    curPos = [
      [2, 4],
      [2, 5],
      [1, 5],
      [0, 5]
    ];
  } else if(pieceIndex === 6){
    curPos = [
      [1, 4],
      [1, 5],
      [0, 4],
      [0, 5]
    ];
  }

  curOrientation = 0;
  displayPiece();
}




//This function receives "pos" - an array containing a coordinate pair of
//the lower-left corner - as well as piece object and current orientation.
//It returns an array of arrays, with 4 coordinate pairs reflecting the location of
//each cell after rotation
//NEED TO RETURN AN UPDATED ORIENTATION AS WELL!!!
function rotatePiece() {

  if (curOrientation === 0) {
    if (curPiece === pieces[0]) {
      // console.log('Rotating a long skinny FROM orientation 0')
      newPos = [
        [curPos[0][0], curPos[0][1]],
        [curPos[1][0] + 1, curPos[1][1] + 1],
        [curPos[2][0] + 2, curPos[2][1] + 2],
        [curPos[3][0] + 3, curPos[3][1] + 3]
      ];
      if (cantFit(newPos) === 0) {
        erasePiece();
        curOrientation++;
        curPos = newPos;
        displayPiece()
      };
      return;
    } else if (curPiece === pieces[1]) {
      // console.log('Rotating an ess FROM orientation 0')
      newPos = [
        [curPos[0][0], curPos[0][1] + 1],
        [curPos[1][0] - 1, curPos[1][1] - 1],
        [curPos[2][0], curPos[2][1]],
        [curPos[3][0] - 1, curPos[3][1] - 2]
      ];
      if (cantFit(newPos) === 0) {
        erasePiece();
        curOrientation++;
        curPos = newPos;
        displayPiece()
      }
      return;
    } else if (curPiece === pieces[2]) {
      // console.log('Rotating an ess2 FROM orientation 0')
      newPos = [
        [curPos[0][0], curPos[0][1] - 1],
        [curPos[1][0] - 1, curPos[1][1] - 2],
        [curPos[2][0], curPos[2][1] + 1],
        [curPos[3][0] - 1, curPos[3][1]]
      ];
      if (cantFit(newPos) === 0) {
        erasePiece();
        curOrientation++;
        curPos = newPos;
        displayPiece()
      }
      return;
    } else if (curPiece === pieces[3]) {
      // console.log('Rotating a tee FROM orientation 0')
      newPos = [
        [curPos[0][0], curPos[0][1] + 1],
        [curPos[1][0] - 1, curPos[1][1] - 1],
        [curPos[2][0] - 1, curPos[2][1] - 1],
        [curPos[3][0] - 1, curPos[3][1]]
      ];
      if (cantFit(newPos) === 0) {
        erasePiece();
        curOrientation++;
        curPos = newPos;
        displayPiece()
      }
      return;
    } else if(curPiece === pieces[4]){
      console.log('Rotating an ELL from orientation 0')
      newPos = [
        [curPos[0][0], curPos[0][1]],
        [curPos[1][0], curPos[1][1]],
        [curPos[2][0]+1, curPos[2][1]+2],
        [curPos[3][0]+1, curPos[3][1]+2]
      ];
      if (cantFit(newPos) === 0) {
        erasePiece();
        curOrientation++;
        curPos = newPos;
        displayPiece()
      }
      return;
    } else if(curPiece === pieces[5]){
      console.log('Rotating a JAY from orientation 0')
      newPos = [
        [curPos[0][0], curPos[0][1]+2],
        [curPos[1][0]-1, curPos[1][1]-1],
        [curPos[2][0], curPos[2][1]],
        [curPos[3][0]+1, curPos[3][1]+1]
      ];
      if (cantFit(newPos) === 0) {
        erasePiece();
        curOrientation++;
        curPos = newPos;
        displayPiece()
      }
      return;
    }
  } else if (curOrientation === 1) {
    if (curPiece === pieces[0]) {
      // console.log('Rotating a long skinny FROM orientation 1')
      newPos = [
        [curPos[0][0], curPos[0][1]],
        [curPos[1][0] - 1, curPos[1][1] - 1],
        [curPos[2][0] - 2, curPos[2][1] - 2],
        [curPos[3][0] - 3, curPos[3][1] - 3]
      ];
      if (cantFit(newPos) === 0) {
        erasePiece();
        curOrientation--;
        curPos = newPos;
        displayPiece()
      }
      return;
    } else if (curPiece === pieces[1]) {
      // console.log('Rotating an ess FROM orientation 1')
      newPos = [
        [curPos[0][0], curPos[0][1] - 1],
        [curPos[1][0] + 1, curPos[1][1] + 1],
        [curPos[2][0], curPos[2][1]],
        [curPos[3][0] + 1, curPos[3][1] + 2]
      ];
      console.log(newPos);
      if (cantFit(newPos) === 0) {
        erasePiece();
        curOrientation--;
        curPos = newPos;
        displayPiece()
      }
      return;
    } else if (curPiece === pieces[2]) {
      // console.log('Rotating an ess2 FROM orientation 1')
      newPos = [
        [curPos[0][0], curPos[0][1] + 1],
        [curPos[1][0] + 1, curPos[1][1] + 2],
        [curPos[2][0], curPos[2][1] - 1],
        [curPos[3][0] + 1, curPos[3][1]]
      ];
      if (cantFit(newPos) === 0) {
        erasePiece();
        curOrientation--;
        curPos = newPos;
        displayPiece()
      }
      return;
    } else if (curPiece === pieces[3]) {
      // console.log('Rotating a tee FROM orientation 1')
      newPos = [
        [curPos[0][0], curPos[0][1]],
        [curPos[1][0], curPos[1][1]],
        [curPos[2][0], curPos[2][1]],
        [curPos[3][0] + 1, curPos[3][1] + 1]
      ];
      if (cantFit(newPos) === 0) {
        erasePiece();
        curOrientation++;
        curPos = newPos;
        displayPiece()
      }
      return;
    } else if (curPiece === pieces[4]) {
      console.log('Rotating an ELL FROM orientation 1')
      newPos = [
        [curPos[0][0], curPos[0][1]+1],
        [curPos[1][0]-1, curPos[1][1]],
        [curPos[2][0]-2, curPos[2][1]-2],
        [curPos[3][0]-1, curPos[3][1]-1]
      ];
      if (cantFit(newPos) === 0) {
        erasePiece();
        curOrientation++;
        curPos = newPos;
        displayPiece()
      }
      return;
    } else if (curPiece === pieces[5]) {
      console.log('Rotating a JAY FROM orientation 1')
      newPos = [
        [curPos[0][0], curPos[0][1]-2],
        [curPos[1][0], curPos[1][1]],
        [curPos[2][0]-1, curPos[2][1]-1],
        [curPos[3][0]-1, curPos[3][1]-1]
      ];
      if (cantFit(newPos) === 0) {
        erasePiece();
        curOrientation++;
        curPos = newPos;
        displayPiece()
      }
      return;
    }





  } else if (curOrientation === 2) {
    if (curPiece === pieces[3]) {
      // console.log('Rotating a tee FROM orientation 2')
      newPos = [
        [curPos[0][0], curPos[0][1] - 1],
        [curPos[1][0], curPos[1][1]],
        [curPos[2][0], curPos[2][1]],
        [curPos[3][0] - 1, curPos[3][1] - 2]
      ];
      if (cantFit(newPos) === 0) {
        erasePiece();
        curOrientation++;
        curPos = newPos;
        displayPiece()
      }
      return;
    } else if (curPiece === pieces[4]) {
       console.log('Rotating an ELL FROM orientation 2')
      newPos = [
        [curPos[0][0], curPos[0][1] - 1],
        [curPos[1][0], curPos[1][1]-1],
        [curPos[2][0]+1, curPos[2][1]+1],
        [curPos[3][0]+1, curPos[3][1]+1]
      ];
      if (cantFit(newPos) === 0) {
        erasePiece();
        curOrientation++;
        curPos = newPos;
        displayPiece()
      }
      return;
    } else if (curPiece === pieces[5]) {
       console.log('Rotating a JAY FROM orientation 2')
      newPos = [
        [curPos[0][0], curPos[0][1]],
        [curPos[1][0]+1, curPos[1][1]+1],
        [curPos[2][0]+2, curPos[2][1]+2],
        [curPos[3][0]+1, curPos[3][1]-1]
      ];
      if (cantFit(newPos) === 0) {
        erasePiece();
        curOrientation++;
        curPos = newPos;
        displayPiece()
      }
      return;
    }
  } else if (curOrientation === 3) {
    if (curPiece === pieces[3]) {
      // console.log('Rotating a tee FROM orientation 3')
      newPos = [
        [curPos[0][0], curPos[0][1]],
        [curPos[1][0] + 1, curPos[1][1] + 1],
        [curPos[2][0] + 1, curPos[2][1] + 1],
        [curPos[3][0] + 1, curPos[3][1] + 1]
      ];
      if (cantFit(newPos) === 0) {
        erasePiece();
        curOrientation = 0;
        curPos = newPos;
        displayPiece()
      }
      return;
    } else if (curPiece === pieces[4]) {
      console.log('Rotating an ELL FROM orientation 3')
      newPos = [
        [curPos[0][0], curPos[0][1]],
        [curPos[1][0] + 1, curPos[1][1] + 1],
        [curPos[2][0], curPos[2][1] - 1],
        [curPos[3][0] - 1, curPos[3][1] - 2]
      ];
      if (cantFit(newPos) === 0) {
        erasePiece();
        curOrientation = 0;
        curPos = newPos;
        displayPiece()
      }
      return;
    } else if (curPiece === pieces[5]) {
      console.log('Rotating a JAY FROM orientation 3')
      newPos = [
        [curPos[0][0], curPos[0][1]],
        [curPos[1][0], curPos[1][1]],
        [curPos[2][0]-1, curPos[2][1] - 1],
        [curPos[3][0] - 1, curPos[3][1] + 1]
      ];
      if (cantFit(newPos) === 0) {
        erasePiece();
        curOrientation = 0;
        curPos = newPos;
        displayPiece()
      }
      return;
    }
  }
};



//This function executes when the checkBelow() function returns a 1, indicating
//the current piece cannot fall downward another row.
//This function updates the boardStatus array to reflect that the cells in curPos
//are occupied
function setPiece() {
  var pieceIndex = pieces.indexOf(curPiece);
  console.log('Current piece is: ' + pieceIndex);

  for (i = 0; i < curPos.length; i++) {
    boardStatus[curPos[i][0]][curPos[i][1]] = pieceIndex + 1;
  }
};


//This function is executed when the user hits the down arrow
function shiftDown() {
  for (i = 0; i < curPos.length; i++) {
    if (checkBelow() === 1) {
      console.log('You cant go down!')
      return
    }
  };

  downARow();
}

function shiftLeft() {
  var newPos = [
    [curPos[0][0], curPos[0][1] - 1],
    [curPos[1][0], curPos[1][1] - 1],
    [curPos[2][0], curPos[2][1] - 1],
    [curPos[3][0], curPos[3][1] - 1]
  ];

  if (cantFit(newPos) === 0) {
    erasePiece()
    curPos = newPos;
    displayPiece()
    return
  }
  console.log('You cant go left!');
};

function shiftRight() {
  var newPos = [
    [curPos[0][0], curPos[0][1] + 1],
    [curPos[1][0], curPos[1][1] + 1],
    [curPos[2][0], curPos[2][1] + 1],
    [curPos[3][0], curPos[3][1] + 1]
  ];

  if (cantFit(newPos) === 0) {
    erasePiece()
    curPos = newPos;
    displayPiece()
    return
  }
  console.log('You cant go right!');
};




// MASTER game play functions here
var gameFunc = function() {
  if (checkBelow() === 0) {
    downARow()
  } else if (checkBelow() === 1) {
    setPiece();
    eraseRow(checkFullRow());
    insertPiece();

    if(cantFit(curPos) === 1){
      alert('Game over!')
      return
    }
  }

  setTimeout(gameFunc, counter)
};

var startGame = function() {
  initGameBoard();
  setTimeout(insertPiece, 1000);
  setTimeout(gameFunc, 1000);
}



document.addEventListener("keydown", function(e) {
  if (e.key === 'ArrowLeft') {
    shiftLeft();
  } else if (e.key === 'ArrowRight') {
    shiftRight()
  } else if (e.key === 'ArrowUp') {
    rotatePiece()
  } else if (e.key === "ArrowDown") {
    shiftDown();
  }
});

document.getElementById('startBtn').addEventListener('click', startGame);

// document.body.onload = initGameBoard();
document.body.onload = initPieces();
