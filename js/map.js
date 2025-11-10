var stage = document.querySelector('#stage');
stage.addEventListener('click', movePlayer);
window.addEventListener('resize', render);

// map for clear and blocked tiles, weapons, & potions.
var map = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

// map for the players
var gameObjects = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

// map tile values
var CLEAR = 0;
var BLOCKED = 1;

// weapon values
var DAGGER = 2;
var HAMMER = 3;
var QUIVER = 4;
var SWORD = 5;

// potions values
var POTION1 = 6;
var POTION2 = 7;

// player values
var PLAYER1 = 8;
var PLAYER2 = 9;

// size of each cell
var SIZE = function() {
  var stageSize1 = getComputedStyle(stage);
  return parseInt(stageSize1.width) / 10;
};

// number of rows and columns
var ROWS = map.length;
var COLUMNS = map[0].length;

// turn controller
var turn = {
  control: Math.round(Math.random()),
  fight: true,
  defend: false
};

// initialize tiles
randomCells(15, map, BLOCKED, false);
randomCells(1, map, DAGGER, false);
randomCells(1, map, HAMMER, false);
randomCells(1, map, QUIVER, false);
randomCells(1, map, SWORD, false);
randomCells(1, map, POTION1, false);
randomCells(1, map, POTION2, false);
randomCells(1, gameObjects, PLAYER1, false);

// Find the players start positions
var player1Row;
var player1Column;
for (var row = 0; row < ROWS; row++) {
  for (var column = 0; column < COLUMNS; column++) {
    if (gameObjects[row][column] === PLAYER1) {
      player1Row = row;
      player1Column = column;
    }
  }
}

randomCells(1, gameObjects, PLAYER2, true);
var player2Row;
var player2Column;
for (var row = 0; row < ROWS; row++) {
  for (var column = 0; column < COLUMNS; column++) {
    if (gameObjects[row][column] === PLAYER2) {
      player2Row = row;
      player2Column = column;
    }
  }
}

// game variables
var player1Health = 100;
var player1Power = [10];
var player2Health = 100;
var player2Power = [10];

// variables for tile animations
var playerOne;
var playerTwo;

render();

// randomize blocked tiles, weapons, potions and players
function randomCells(numberOfCells, mapType, cellType, player2control) {
  // pick random function using row || column length
  var random = function(number) {
    return Math.floor(Math.random() * number);
  };

  // loops until number of cells requested is zero
  while (numberOfCells--) {
    var randomRow = random(ROWS);
    var randomColumn = random(COLUMNS);

    // if map tile is clear, assigned it to its type
    if (!map[randomRow][randomColumn] && !player2control) {
      mapType[randomRow][randomColumn] = cellType;

      // is random tile clear && not player 1
    } else if (
      !map[randomRow][randomColumn] &&
      gameObjects[randomRow][randomColumn] !== PLAYER1 &&
      player2control
    ) {
      // is random tile away at least +1/-1 from player 1
      if (
        randomRow > player1Row + 1 ||
        randomRow < player1Row - 1 ||
        randomColumn > player1Column + 1 ||
        randomColumn < player1Column - 1
      ) {
        // assign location to player 2
        gameObjects[randomRow][randomColumn] = PLAYER2;

        // if random tile is close to player 1 reloop
      } else {
        numberOfCells++;
      }

      // if map tile is not clear, try again
    } else {
      numberOfCells++;
    }
  }
}

function render() {
  if (stage.firstElementChild) {
    for (var i = 0; i < ROWS * COLUMNS; i++) {
      stage.firstElementChild.remove();
    }
  }

  for (var row = 0; row < ROWS; row++) {
    for (var column = 0; column < COLUMNS; column++) {
      var cell = document.createElement('img');
      cell.setAttribute('class', 'cell');
      cell.setAttribute('id', row * 10 + column + 1 + '');
      stage.appendChild(cell);

      switch (map[row][column]) {
        case CLEAR:
          cell.src = 'images/clear.png';
          break;
        case BLOCKED:
          cell.src = 'images/blocked.png';
          break;
        case DAGGER:
          cell.src = 'images/dagger.png';
          break;
        case HAMMER:
          cell.src = 'images/hammer.png';
          break;
        case QUIVER:
          cell.src = 'images/quiver.png';
          break;
        case SWORD:
          cell.src = 'images/sword.png';
          break;
        case POTION1:
          cell.src = 'images/potion1.png';
          break;
        case POTION2:
          cell.src = 'images/potion2.png';
          break;
      }

      switch (gameObjects[row][column]) {
        case PLAYER1:
          if (player1Health < 1) {
            cell.src = 'images/player1dead.png';
            player1Health = 0;
          } else {
            cell.src = 'images/player1.png';
          }
          cell.classList.add('playerOne');
          playerOne = Number(document.querySelector('.cell.playerOne').id);
          break;
        case PLAYER2:
          if (player2Health < 1) {
            cell.src = 'images/player2dead.png';
            player2Health = 0;
            undefined;
          } else {
            cell.src = 'images/player2.png';
          }
          cell.classList.add('playerTwo');
          playerTwo = Number(document.querySelector('.cell.playerTwo').id);
          break;
      }

      cell.style.top = row * SIZE() + 'px';
      cell.style.left = column * SIZE() + 'px';
    }
  }

  availableTiles();
  updateTurnIndicator();

  if (player1Health < 1 || player2Health < 1) {
    let winner = '';
    if (player1Health < 1) {
      player1Health = 0;
      document.getElementById('p1healthBar').style.width = '0%';
      document.getElementById('p1health').textContent = '0';
      winner = 'Player 2';
    }
    if (player2Health < 1) {
      player2Health = 0;
      document.getElementById('p2healthBar').style.width = '0%';
      document.getElementById('p2health').textContent = '0';
      winner = 'Player 1';
    }

    // Show game over modal
    const gameOverText = document.getElementById('gameOverText');
    if (gameOverText) {
      gameOverText.textContent = `🎉 ${winner} wins! Would you like to play again?`;
    }

    if (window.modalManager) {
      window.modalManager.openModal('lostGame');
    }
  } else {
    // Update UI
    document.getElementById('p1power').textContent = player1Power[0];
    document.getElementById('p2power').textContent = player2Power[0];
    document.getElementById('p1health').textContent = player1Health;
    document.getElementById('p2health').textContent = player2Health;
    document.getElementById('p1healthBar').style.width = player1Health + '%';
    document.getElementById('p2healthBar').style.width = player2Health + '%';
  }
}

// Update turn indicator
function updateTurnIndicator() {
  const turnText = document.getElementById('turnText');
  const turnIndicator = document.getElementById('turnIndicator');

  if (turnText && turnIndicator) {
    if (turn.control) {
      turnText.textContent = "👑 Player 1's Turn";
      turnIndicator.style.background = 'linear-gradient(90deg, #4fc3f7, #0288d1)';
    } else {
      turnText.textContent = "🏰 Player 2's Turn";
      turnIndicator.style.background = 'linear-gradient(90deg, #ba68c8, #8e24aa)';
    }
  }
}
