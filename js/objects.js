// pickup & replace objects from map
function renderObjects() {
  if (!turn.control) {
    // find out what kind of cell the player is on
    switch (map[player1Row][player1Column]) {
      case CLEAR:
        break;
      case DAGGER:
        player1Power.push(20);
        var newValue = player1Power.shift();
        if (newValue == 22) {
          map[player1Row][player1Column] = HAMMER;
        } else if (newValue == 24) {
          map[player1Row][player1Column] = QUIVER;
        } else if (newValue == 26) {
          map[player1Row][player1Column] = SWORD;
        } else {
          map[player1Row][player1Column] = CLEAR;
        }
        break;
      case HAMMER:
        player1Power.push(22);
        var newValue = player1Power.shift();
        if (newValue == 20) {
          map[player1Row][player1Column] = DAGGER;
        } else if (newValue == 24) {
          map[player1Row][player1Column] = QUIVER;
        } else if (newValue == 26) {
          map[player1Row][player1Column] = SWORD;
        } else {
          map[player1Row][player1Column] = CLEAR;
        }
        break;
      case QUIVER:
        player1Power.push(24);
        var newValue = player1Power.shift();
        if (newValue == 20) {
          map[player1Row][player1Column] = DAGGER;
        } else if (newValue == 22) {
          map[player1Row][player1Column] = HAMMER;
        } else if (newValue == 26) {
          map[player1Row][player1Column] = SWORD;
        } else {
          map[player1Row][player1Column] = CLEAR;
        }
        break;
      case SWORD:
        player1Power.push(26);
        var newValue = player1Power.shift();
        if (newValue == 20) {
          map[player1Row][player1Column] = DAGGER;
        } else if (newValue == 22) {
          map[player1Row][player1Column] = HAMMER;
        } else if (newValue == 24) {
          map[player1Row][player1Column] = QUIVER;
        } else {
          map[player1Row][player1Column] = CLEAR;
        }
        break;
      case POTION1:
        if (player1Health < 50) {
          player1Health += 30;
          map[player1Row][player1Column] = CLEAR;
        }
        break;
      case POTION2:
        if (player1Health < 50) {
          player1Health += 30;
          map[player1Row][player1Column] = CLEAR;
        }
        break;
    }
  } else {
    // find out what kind of cell the player is on
    switch (map[player2Row][player2Column]) {
      case CLEAR:
        break;
      case DAGGER:
        player2Power.push(20);
        var newValue = player2Power.shift();
        if (newValue == 22) {
          map[player2Row][player2Column] = HAMMER;
        } else if (newValue == 24) {
          map[player2Row][player2Column] = QUIVER;
        } else if (newValue == 26) {
          map[player2Row][player2Column] = SWORD;
        } else {
          map[player2Row][player2Column] = CLEAR;
        }
        break;
      case HAMMER:
        player2Power.push(22);
        var newValue = player2Power.shift();
        if (newValue == 20) {
          map[player2Row][player2Column] = DAGGER;
        } else if (newValue == 24) {
          map[player2Row][player2Column] = QUIVER;
        } else if (newValue == 26) {
          map[player2Row][player2Column] = SWORD;
        } else {
          map[player2Row][player2Column] = CLEAR;
        }
        break;
      case QUIVER:
        player2Power.push(24);
        var newValue = player2Power.shift();
        if (newValue == 20) {
          map[player2Row][player2Column] = DAGGER;
        } else if (newValue == 22) {
          map[player2Row][player2Column] = HAMMER;
        } else if (newValue == 26) {
          map[player2Row][player2Column] = SWORD;
        } else {
          map[player2Row][player2Column] = CLEAR;
        }
        break;
      case SWORD:
        player2Power.push(26);
        var newValue = player2Power.shift();
        if (newValue == 20) {
          map[player2Row][player2Column] = DAGGER;
        } else if (newValue == 22) {
          map[player2Row][player2Column] = HAMMER;
        } else if (newValue == 24) {
          map[player2Row][player2Column] = QUIVER;
        } else {
          map[player2Row][player2Column] = CLEAR;
        }
        break;
      case POTION1:
        if (player2Health < 50) {
          player2Health += 30;
          map[player2Row][player2Column] = CLEAR;
        }
        break;
      case POTION2:
        if (player2Health < 50) {
          player2Health += 30;
          map[player2Row][player2Column] = CLEAR;
        }
        break;
    }
  }

  if (
    (player1Row === player2Row - 1 && player1Column === player2Column) ||
    (player1Row === player2Row + 1 && player1Column === player2Column) ||
    (player1Row === player2Row && player1Column === player2Column - 1) ||
    (player1Row === player2Row && player1Column === player2Column + 1)
  ) {
    if (turn.fight === turn.control) {
      if (window.modalManager) {
        window.modalManager.openModal('fight');
      }
    } else {
      render();
    }
  } else {
    render();
  }
}
